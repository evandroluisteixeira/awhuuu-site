// Busca, na hora do build, os vídeos mais novos do canal no feed público do YouTube
// (não precisa de chave). O canal fica em site.json > youtube.canal_id.
import { readFile } from "node:fs/promises";

export default async function () {
  if (process.env.SEM_PREVIA) return { videos: [] };
  let cfg = {};
  try { cfg = JSON.parse(await readFile(new URL("./site.json", import.meta.url), "utf8")).youtube || {}; } catch {}
  if (!cfg.canal_id) return { videos: [] };
  try {
    const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${cfg.canal_id}`, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; AwhuuuBot/1.0; +https://awhuuu.com.br)" },
      signal: AbortSignal.timeout(8000)
    });
    if (!r.ok) return { videos: [] };
    const xml = await r.text();
    const tira = (t) => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
      const e = m[1];
      const id = e.match(/<yt:videoId>([^<]+)/)?.[1];
      const titulo = tira(e.match(/<title>([^<]*)/)?.[1] || "");
      const data = e.match(/<published>([^<]+)/)?.[1] || "";
      const link = e.match(/<link[^>]+href="([^"]+)"/)?.[1] || "";
      return id ? { id, titulo, data, short: /\/shorts\//.test(link) } : null;
    }).filter(Boolean);
    console.log(`[youtube] ${videos.length} vídeos no canal`);
    return { videos };
  } catch {
    return { videos: [] };
  }
}
