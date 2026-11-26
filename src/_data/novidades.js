// Últimos vídeos dos canais oficiais das bandas (feed público do YouTube, sem chave).
// Só para bandas com o campo youtube_canal preenchido (o código que começa com UC).
import { readFile } from "node:fs/promises";

const UA = "Mozilla/5.0 (compatible; AwhuuuBot/1.0; +https://awhuuu.com.br)";
const tira = (t) => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export default async function () {
  if (process.env.SEM_PREVIA) return { porBanda: {}, recentes: [] };
  let bandas = [];
  try { bandas = JSON.parse(await readFile(new URL("./bandas.json", import.meta.url), "utf8")).bandas || []; } catch {}
  const alvo = bandas.filter((b) => b.ativa !== false && /^UC[\w-]{22}$/.test(b.youtube_canal || ""));
  const porBanda = {};
  for (let i = 0; i < alvo.length; i += 8) {
    await Promise.all(alvo.slice(i, i + 8).map(async (b) => {
      try {
        const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${b.youtube_canal}`, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(8000) });
        if (!r.ok) return;
        const xml = await r.text();
        porBanda[b.slug] = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 3).map((m) => {
          const e = m[1];
          const id = e.match(/<yt:videoId>([^<]+)/)?.[1];
          const link = e.match(/<link[^>]+href="([^"]+)"/)?.[1] || "";
          return id ? { id, titulo: tira(e.match(/<title>([^<]*)/)?.[1] || ""), data: e.match(/<published>([^<]+)/)?.[1] || "", short: /\/shorts\//.test(link), banda: b.nome, slug: b.slug } : null;
        }).filter(Boolean);
      } catch {}
    }));
  }
  const recentes = Object.values(porBanda).map((l) => l[0]).filter(Boolean).sort((a, b) => b.data.localeCompare(a.data)).slice(0, 8);
  console.log(`[novidades] vídeos de ${Object.keys(porBanda).length} bandas`);
  return { porBanda, recentes };
}
