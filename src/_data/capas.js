// Capas dos discos da Copa do Rock, pelo oEmbed público do Spotify (sem chave).
// A capa sempre aponta de volta para o disco no Spotify, como pedem as regras de uso do Spotify.
import { readFile } from "node:fs/promises";

export default async function () {
  if (process.env.SEM_PREVIA) return {};
  let jogos = {};
  try { jogos = JSON.parse(await readFile(new URL("./jogos.json", import.meta.url), "utf8")); } catch {}
  const ids = [...new Set((jogos.copas || []).flatMap((c) => (c.discos || []).map((d) => d.spotify)).filter(Boolean))];
  const out = {};
  for (let i = 0; i < ids.length; i += 8) {
    await Promise.all(ids.slice(i, i + 8).map(async (id) => {
      try {
        const r = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/album/${id}`, { signal: AbortSignal.timeout(8000) });
        if (!r.ok) return;
        const j = await r.json();
        if (j.thumbnail_url) out[id] = j.thumbnail_url;
      } catch {}
    }));
  }
  console.log(`[capas] ${Object.keys(out).length} de ${ids.length} capas`);
  return out;
}
