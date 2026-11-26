// Busca, na hora do build, a imagem de divulgação que a própria página do evento publica
// (a mesma prévia que aparece quando se cola o link no WhatsApp ou no Instagram).
// Só para shows sem foto no CMS e com link para a página do evento (não para a home de um site).
// Também para as casas de rock sem foto no CMS: aí vale a página oficial da casa (campo pagina_foto).
import { readFile } from "node:fs/promises";

const UA = "Mozilla/5.0 (compatible; AwhuuuBot/1.0; +https://awhuuu.com.br)";

function paginaDeEvento(url) {
  try { const u = new URL(url); return u.pathname.replace(/\/+$/, "").length > 1; } catch { return false; }
}

function achaImagem(html, base) {
  const meta = (prop) => {
    const re = new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*>`, "i");
    const tag = html.match(re)?.[0];
    return tag?.match(/content=["']([^"']+)["']/i)?.[1];
  };
  let img = meta("og:image:secure_url") || meta("og:image") || meta("twitter:image");
  if (!img) {
    for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const d = [].concat(JSON.parse(m[1]));
        const ev = d.find((x) => /Event/i.test(x?.["@type"] || ""));
        const i = ev?.image; img = Array.isArray(i) ? i[0] : (i?.url || i);
        if (img) break;
      } catch {}
    }
  }
  if (!img) return null;
  try {
    const u = new URL(img.replace(/&amp;/g, "&"), base);
    if (u.protocol === "http:") u.protocol = "https:"; // o site é https: imagem http não carregaria
    return u.protocol === "https:" ? u.href : null;
  } catch { return null; }
}

export default async function () {
  if (process.env.SEM_PREVIA) return {};
  let shows = [];
  try { shows = JSON.parse(await readFile(new URL("./agenda.json", import.meta.url), "utf8")).shows || []; } catch { return {}; }
  const hoje = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
  const links = [...new Set(shows
    .filter((s) => !s.cartaz && !s.cartaz_url && String(s.data || "").slice(0, 10) >= hoje)
    .map((s) => s.link_evento || s.link_ingresso)
    .filter((l) => l && paginaDeEvento(l)))];
  let casas = [];
  try { casas = JSON.parse(await readFile(new URL("./casas.json", import.meta.url), "utf8")).casas || []; } catch {}
  for (const c of casas) {
    if (c.ativa !== false && !c.foto && !c.foto_url && c.pagina_foto && !links.includes(c.pagina_foto)) links.push(c.pagina_foto);
  }
  const out = {};
  await Promise.all(links.map(async (link) => {
    try {
      const r = await fetch(link, { headers: { "user-agent": UA, accept: "text/html" }, signal: AbortSignal.timeout(8000), redirect: "follow" });
      if (!r.ok) return;
      const img = achaImagem((await r.text()).slice(0, 600000), r.url);
      if (img) out[link] = img;
    } catch {}
  }));
  if (links.length) console.log(`[previews] ${Object.keys(out).length}/${links.length} fotos de divulgação encontradas`);
  return out;
}
