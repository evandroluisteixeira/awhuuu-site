// Lançamentos das bandas cadastradas em bandas.json, buscados na hora do build no MusicBrainz
// (base pública e gratuita). Pega discos e EPs com data de estreia de 120 dias atrás até 1 ano à frente.
import { readFile } from "node:fs/promises";

const UA = "AwhuuuSite/1.0 ( https://awhuuu.com.br )";
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function () {
  if (process.env.SEM_PREVIA) return { itens: [] };
  let bandas = [];
  try { bandas = JSON.parse(await readFile(new URL("./bandas.json", import.meta.url), "utf8")).bandas || []; } catch {}
  const porMb = Object.fromEntries(bandas.filter((b) => b.musicbrainz && b.ativa !== false).map((b) => [b.musicbrainz, b]));
  const ids = Object.keys(porMb);
  if (!ids.length) return { itens: [] };
  const dia = (d) => d.toISOString().slice(0, 10);
  const de = dia(new Date(Date.now() - 120 * 864e5)), ate = dia(new Date(Date.now() + 365 * 864e5));
  const itens = [], vistos = new Set();
  // a busca aceita várias bandas de uma vez; vai em lotes para não estourar o tamanho da consulta
  for (let i = 0; i < ids.length; i += 25) {
    const lote = ids.slice(i, i + 25);
    const q = `(${lote.map((id) => `arid:${id}`).join(" OR ")}) AND firstreleasedate:[${de} TO ${ate}] AND (primarytype:album OR primarytype:ep)`;
    for (let tent = 0; tent < 5; tent++) {
      try {
        const r = await fetch(`https://musicbrainz.org/ws/2/release-group?fmt=json&limit=100&query=${encodeURIComponent(q)}`, {
          headers: { "user-agent": UA }, signal: AbortSignal.timeout(15000)
        });
        if (r.status === 503) { await espera(3500); continue; }
        if (!r.ok) break;
        const j = await r.json();
        for (const g of j["release-groups"] || []) {
          const sec = (g["secondary-types"] || []).map((s) => s.toLowerCase());
          if (sec.some((s) => ["compilation", "live", "remix", "demo", "dj-mix", "mixtape/street"].includes(s))) continue;
          const art = (g["artist-credit"] || []).map((c) => c.artist?.id).find((id) => porMb[id]);
          if (!art || vistos.has(g.id) || !g["first-release-date"]) continue;
          vistos.add(g.id);
          const b = porMb[art];
          itens.push({ titulo: g.title, data: g["first-release-date"], tipo: g["primary-type"] === "EP" ? "EP" : "Disco", banda: b.nome, slug: b.slug, mb: g.id });
        }
        break;
      } catch { await espera(2000); }
    }
    await espera(1200);
  }
  itens.sort((a, b) => a.data.localeCompare(b.data));
  console.log(`[lancamentos] ${itens.length} lançamentos`);
  return { itens };
}
