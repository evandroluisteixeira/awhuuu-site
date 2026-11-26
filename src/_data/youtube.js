// Busca, na hora do build, o que tem no canal do YouTube (não precisa de chave):
// - os vídeos mais novos, pelo feed público do canal;
// - as playlists: as que aparecem na aba Playlists do canal, mais as que estão
//   no campo youtube_playlist das matérias, mais as de site.json > youtube.playlists_extras.
// A capa de cada playlist é a miniatura do primeiro vídeo dela.
// O canal fica em site.json > youtube.canal_id.
import { readFile, readdir } from "node:fs/promises";

const UA = { "user-agent": "Mozilla/5.0 (compatible; AwhuuuBot/1.0; +https://awhuuu.com.br)" };
const tira = (t) => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

async function baixa(url) {
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

// playlists que a aba Playlists do canal mostra (título e id), na ordem do canal
async function playlistsDoCanal(canal) {
  try {
    const html = await baixa(`https://www.youtube.com/channel/${canal}/playlists?hl=pt-BR`);
    const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
    if (!m) return [];
    const lista = [];
    const anda = (o) => {
      if (!o || typeof o !== "object") return;
      if (o.lockupViewModel && o.lockupViewModel.contentType === "LOCKUP_CONTENT_TYPE_PLAYLIST") {
        const l = o.lockupViewModel;
        lista.push({ id: l.contentId, titulo: l.metadata?.lockupMetadataViewModel?.title?.content || "" });
      }
      if (o.gridPlaylistRenderer) {
        const g = o.gridPlaylistRenderer;
        lista.push({ id: g.playlistId, titulo: g.title?.runs?.[0]?.text || g.title?.simpleText || "" });
      }
      for (const k in o) anda(o[k]);
    };
    anda(JSON.parse(m[1]));
    return lista;
  } catch {
    return [];
  }
}

// playlists citadas nas matérias (inclusive as de data futura), com a data da matéria
async function playlistsDasMaterias() {
  const pasta = new URL("../materias/", import.meta.url);
  const lista = [];
  try {
    for (const nome of await readdir(pasta)) {
      if (!nome.endsWith(".md")) continue;
      const txt = await readFile(new URL(nome, pasta), "utf8");
      const fm = txt.split(/^---\s*$/m)[1] || "";
      const id = fm.match(/^youtube_playlist:\s*["']?([\w-]+)/m)?.[1];
      if (!id) continue;
      const data = fm.match(/^date:\s*["']?([^"'\n]+)/m)?.[1];
      const titulo = fm.match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1] || "";
      lista.push({ id, materia: nome.replace(/\.md$/, ""), data_materia: data ? new Date(data).toISOString() : null, titulo_materia: titulo });
    }
  } catch {}
  return lista;
}

// capa (primeiro vídeo) e título de uma playlist, pelo feed público dela
async function detalhes(id) {
  try {
    const xml = await baixa(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`);
    const titulo = tira(xml.match(/<title>([^<]*)/)?.[1] || "");
    const ids = [...xml.matchAll(/<yt:videoId>([^<]+)/g)].map((m) => m[1]);
    return { titulo, capa: ids[0] ? `https://i.ytimg.com/vi/${ids[0]}/hqdefault.jpg` : null, faixas: ids.length };
  } catch {
    return null;
  }
}

export default async function () {
  if (process.env.SEM_PREVIA) return { videos: [], playlists: [] };
  let cfg = {};
  try { cfg = JSON.parse(await readFile(new URL("./site.json", import.meta.url), "utf8")).youtube || {}; } catch {}
  if (!cfg.canal_id) return { videos: [], playlists: [] };

  let videos = [];
  try {
    const xml = await baixa(`https://www.youtube.com/feeds/videos.xml?channel_id=${cfg.canal_id}`);
    videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
      const e = m[1];
      const id = e.match(/<yt:videoId>([^<]+)/)?.[1];
      const titulo = tira(e.match(/<title>([^<]*)/)?.[1] || "");
      const data = e.match(/<published>([^<]+)/)?.[1] || "";
      const link = e.match(/<link[^>]+href="([^"]+)"/)?.[1] || "";
      return id ? { id, titulo, data, short: /\/shorts\//.test(link) } : null;
    }).filter(Boolean);
  } catch {}

  // junta as três fontes sem repetir, na ordem: canal, matérias, extras
  const mapa = new Map();
  const junta = (p) => mapa.set(p.id, { ...(mapa.get(p.id) || {}), ...Object.fromEntries(Object.entries(p).filter(([, v]) => v)) });
  (await playlistsDoCanal(cfg.canal_id)).forEach(junta);
  (await playlistsDasMaterias()).forEach(junta);
  (cfg.playlists_extras || []).forEach((p) => p && p.id && junta(p));
  for (const id of cfg.playlists_ocultas || []) mapa.delete(id);

  const playlists = (await Promise.all([...mapa.values()].map(async (p) => {
    const d = await detalhes(p.id);
    if (!d) return null; // playlist privada, apagada ou fora do ar: não entra
    return { ...p, titulo: p.titulo || d.titulo, capa: d.capa, faixas: d.faixas };
  }))).filter(Boolean);

  console.log(`[youtube] ${videos.length} vídeos e ${playlists.length} playlists no canal`);
  return { videos, playlists };
}
