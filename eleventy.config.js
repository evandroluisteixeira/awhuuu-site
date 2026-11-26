// Configuração do site Awhuuu! (Eleventy 3)
// Matérias com data futura só aparecem no dia: o site é reconstruído todo dia
// (veja .github/workflows/deploy.yml). Para ver tudo localmente: MOSTRAR_FUTURO=1 npm run dev

const MOSTRAR_FUTURO = process.env.MOSTRAR_FUTURO === "1";

function publicada(item) {
  if (item.data.rascunho) return false;
  if (MOSTRAR_FUTURO) return true;
  return item.date <= new Date();
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/verificacao": "/" });
  eleventyConfig.ignores.add("src/verificacao/**");
  eleventyConfig.addPassthroughCopy({ "node_modules/leaflet/dist/leaflet.js": "vendor/leaflet/leaflet.js" });
  eleventyConfig.addPassthroughCopy({ "node_modules/leaflet/dist/leaflet.css": "vendor/leaflet/leaflet.css" });

  // todas as matérias publicadas, da mais nova para a mais antiga
  eleventyConfig.addCollection("materias", (api) =>
    api.getFilteredByGlob("src/materias/*.md").filter(publicada).sort((a, b) => b.date - a.date)
  );

  // matérias com data futura não geram página (até o dia chegar)
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      const p = data.page && data.page.inputPath;
      if (!p || !p.includes("/materias/") || !p.endsWith(".md")) return data.permalink;
      if (data.rascunho) return false;
      if (!MOSTRAR_FUTURO && data.page.date > new Date()) return false;
      return data.permalink;
    },
  });

  // lugares marcados nas matérias publicadas, para o mapa
  eleventyConfig.addFilter("lugaresDe", (materias, editorias) => {
    const lista = [];
    for (const m of materias || []) {
      for (const l of m.data.lugares || []) {
        const lat = Number(l.lat), lng = Number(l.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
        const ed = (editorias || []).find((e) => e.slug === m.data.editoria) || {};
        lista.push({
          nome: l.nome || m.data.title, endereco: l.endereco || "", nota: l.nota || "",
          aproximado: !!l.aproximado, lat, lng,
          titulo: m.data.title, url: m.url, editoria: ed.nome || "",
        });
      }
    }
    return lista;
  });

  // shows de hoje em diante (horário de Brasília), destaques primeiro
  eleventyConfig.addFilter("futuros", (shows) => {
    const hoje = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
    return (shows || [])
      .filter((s) => s.data && String(s.data).slice(0, 10) >= hoje)
      .sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0) || String(a.data).localeCompare(String(b.data)));
  });
  // casas de rock: liga o "local" de cada show à casa cadastrada (sem acento, sem caixa)
  const norm = (t) => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const casaBate = (casa, local) => {
    const l = norm(local);
    if (!l) return false;
    return [casa.nome, ...(casa.nomes_na_agenda || [])].some((n) => norm(n) && l.includes(norm(n)));
  };
  eleventyConfig.addFilter("casaDoLocal", (local, casas) =>
    ((casas && casas.casas) || []).find((c) => c.ativa !== false && casaBate(c, local)) || null
  );
  eleventyConfig.addFilter("showsDaCasa", (shows, casa) => (shows || []).filter((s) => casaBate(casa, s.local)));
  eleventyConfig.addFilter("mapsLink", (casa) =>
    "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent([casa.nome, String(casa.endereco || "").replace(/ · /g, ", ")].filter(Boolean).join(", "))
  );
  // bandas: liga shows da agenda e matérias a cada banda cadastrada (palavra inteira, sem acento)
  const bandaBate = (banda, texto) => {
    const t = " " + norm(texto) + " ";
    return [banda.nome, ...(banda.nomes_na_agenda || [])].some((n) => norm(n) && t.includes(" " + norm(n) + " "));
  };
  eleventyConfig.addFilter("bandasAtivas", (b) => ((b && b.bandas) || []).filter((x) => x.ativa !== false && x.slug));
  // show de tributo/cover ("Led Zeppelin por Hermettica") não é show da banda original
  const tributo = (nome) => /\b(por|tributo|tribute|cover|covers)\b/.test(norm(nome));
  eleventyConfig.addFilter("showsDaBanda", (shows, banda) => (shows || []).filter((s) => !tributo(s.banda) && bandaBate(banda, s.banda)));
  eleventyConfig.addFilter("bandaDoShow", (nome, bandas) =>
    tributo(nome) ? null : ((bandas && bandas.bandas) || []).find((b) => b.ativa !== false && b.slug && bandaBate(b, nome)) || null
  );
  eleventyConfig.addFilter("materiasDaBanda", (materias, banda) =>
    (materias || []).filter((m) => [].concat(m.data.bandas_relacionadas || []).includes(banda.slug) || bandaBate(banda, m.data.title + " " + (m.data.resumo || "")))
  );
  eleventyConfig.addFilter("lancamentosDe", (itens, slug) => (itens || []).filter((i) => i.slug === slug));
  const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  eleventyConfig.addFilter("dataParcial", (d) => {
    const [a, m, dia] = String(d || "").split("-");
    if (!a) return "";
    if (!m) return a;
    if (!dia) return `${MESES[+m - 1]} de ${a}`;
    return `${+dia} de ${MESES[+m - 1]} de ${a}`;
  });
  // Neste dia no rock: junta a base (Wikidata/MusicBrainz) com os fatos das matérias do Awhuuu!
  eleventyConfig.addFilter("nesteDiaCompleto", (base, extra, materias, bandas) => {
    const porSlug = Object.fromEntries((materias || []).map((m) => [m.fileSlug, m]));
    const fichas = Object.fromEntries(((bandas && bandas.bandas) || []).filter((b) => b.ativa !== false).flatMap((b) => [[b.musicbrainz, b.slug], [b.wikidata, b.slug]]).filter(([k]) => k));
    const out = {};
    for (const [dia, lista] of Object.entries(base || {})) {
      out[dia] = lista.map((e) => ({ ...e, ...(fichas[e.mb] || fichas[e.wd] ? { ficha: "/bandas/" + (fichas[e.mb] || fichas[e.wd]) + "/" } : {}) }));
    }
    for (const e of (extra && extra.itens) || []) {
      if (!e.data || !e.texto) continue;
      const m = porSlug[e.materia];
      (out[e.data] = out[e.data] || []).push({ tipo: "fato", ano: e.ano, texto: e.texto, ...(m ? { url: m.url, titulo: m.data.title } : {}), ...(e.link ? { url: e.link } : {}) });
    }
    for (const d in out) out[d].sort((a, b) => (a.tipo === "fato" ? -1 : 0) - (b.tipo === "fato" ? -1 : 0) || a.ano - b.ano);
    return out;
  });
  eleventyConfig.addFilter("mapaMaterias", (materias) => Object.fromEntries((materias || []).map((m) => [m.fileSlug, { url: m.url, titulo: m.data.title }])));
  // família visual do patch da banda, pelo estilo (só muda a cor do patch; não aparece escrita)
  eleventyConfig.addFilter("familiaEstilo", (estilos) => {
    const t = (estilos || []).join(" ").toLowerCase();
    if (/metal|thrash|grind|doom/.test(t)) return "metal";
    if (/punk|hardcore|riot|ska|oi!/.test(t)) return "punk";
    if (/blues|gospel|rock and roll|rockabilly|r&b|soul|merseybeat/.test(t)) return "raiz";
    if (/grunge|alternative|indie|post-punk|gothic|new wave|shoegaze|noise/.test(t)) return "alt";
    return "rock";
  });
  // linha do tempo da banda: barras dos integrantes e discos num mesmo eixo de anos
  eleventyConfig.addFilter("linhaDoTempo", (b) => {
    const ano = (v) => parseInt(String(v || "").slice(0, 4), 10) || null;
    const hoje = new Date().getFullYear();
    const mem = (b.integrantes || []).filter((i) => ano(i.desde));
    const discos = (b.discografia || []).filter((d) => ano(d.ano));
    const ini = Math.min(...[ano(b.inicio), ...mem.map((i) => ano(i.desde)), ...discos.map((d) => ano(d.ano))].filter(Boolean));
    if (!isFinite(ini)) return null;
    const fim = Math.max(ano(b.fim) || hoje, ...mem.map((i) => ano(i.ate) || 0), ...discos.map((d) => ano(d.ano)));
    const total = fim - ini + 1;
    const pos = (a) => ((a - ini) / total) * 100;
    const marcas = [];
    const passo = total > 45 ? 10 : total > 20 ? 5 : total > 8 ? 2 : 1;
    for (let a = Math.ceil(ini / passo) * passo; a <= fim; a += passo) marcas.push({ ano: a, pos: pos(a) });
    return {
      ini, fim,
      marcas,
      membros: mem.map((i) => {
        const d = ano(i.desde), a = ano(i.ate) || (ano(b.fim) || hoje);
        return { nome: i.nome, funcao: i.funcao, esq: pos(d), larg: Math.max(((a - d + 1) / total) * 100, 1.2), periodo: d + (i.ate ? (ano(i.ate) === d ? "" : "–" + ano(i.ate)) : (b.fim ? "–" + ano(b.fim) : " até hoje")), atual: !i.ate && !b.fim };
      }),
      semData: (b.integrantes || []).filter((i) => !ano(i.desde)),
      discos: discos.map((d) => ({ titulo: d.titulo, ano: ano(d.ano), pos: pos(ano(d.ano)) + 50 / total }))
    };
  });
  // copa em destaque: a que está rolando; senão a próxima; senão a última que acabou
  eleventyConfig.addFilter("copaAtual", (copas) => {
    const hoje = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
    const l = (copas || []).filter((c) => c.rodadas && c.rodadas.length);
    const ini = (c) => c.rodadas[0].inicio, fim = (c) => c.rodadas[c.rodadas.length - 1].fim;
    return l.find((c) => ini(c) <= hoje && hoje <= fim(c)) || l.filter((c) => ini(c) > hoje).sort((a, b) => ini(a).localeCompare(ini(b)))[0] || l.sort((a, b) => fim(b).localeCompare(fim(a)))[0];
  });
  eleventyConfig.addFilter("situacaoCopa", (c) => {
    const hoje = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
    const ini = c.rodadas[0].inicio, fim = c.rodadas[c.rodadas.length - 1].fim;
    return hoje < ini ? "em breve" : hoje > fim ? "encerrada" : "valendo";
  });
  // vídeo do YouTube no meio do texto da matéria: {% video "link ou código", "legenda", "canal" %}
  eleventyConfig.addShortcode("video", (link, legenda = "", canal = "") => {
    const id = (String(link).match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/) || [])[1] || (/^[\w-]{11}$/.test(link) ? link : "");
    if (!id) return "";
    const esc = (t) => String(t || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    return `<figure class="video-materia"><div class="embed video"><button type="button" class="yt-lite" data-id="${id}" aria-label="Tocar o vídeo${legenda ? ": " + esc(legenda) : ""}" style="background-image:url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)"><span aria-hidden="true">▶</span></button></div>${legenda || canal ? `<figcaption>${esc(legenda)}${canal ? ` <span>Vídeo: ${esc(canal)}, no YouTube.</span>` : ""}</figcaption>` : ""}</figure>`;
  });
  // foto no meio do texto, com crédito: {% figura "url", "legenda", "crédito", "link da fonte" %}
  eleventyConfig.addShortcode("figura", (src, legenda = "", credito = "", fonte = "") => {
    const esc = (t) => String(t || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const cred = credito ? (fonte ? `<a href="${esc(fonte)}" target="_blank" rel="noopener">${esc(credito)}</a>` : esc(credito)) : "";
    return `<figure class="figura-materia"><img src="${esc(src)}" alt="${esc(legenda)}" loading="lazy" referrerpolicy="no-referrer">${legenda || cred ? `<figcaption>${esc(legenda)}${cred ? ` <span>Foto: ${cred}.</span>` : ""}</figcaption>` : ""}</figure>`;
  });
  eleventyConfig.addFilter("hojeISO", () => new Date().toISOString().slice(0, 10));
  eleventyConfig.addFilter("casasAtivas", (casas) => ((casas && casas.casas) || []).filter((c) => c.ativa !== false));

  // vídeo a partir do link colado no CMS
  eleventyConfig.addFilter("videoDe", (url) => {
    const u = String(url || "").trim();
    let m;
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/)))
      return { tipo: "youtube", id: m[1], vertical: /\/shorts\//.test(u), url: u };
    if ((m = u.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/))) return { tipo: "tiktok", id: m[1], url: u.split("?")[0] };
    if (/instagram\.com\/(?:reel|p|tv)\//.test(u)) return { tipo: "instagram", url: u.split("?")[0] };
    return { tipo: "", url: u };
  });

  eleventyConfig.addFilter("diaShow", (d) => {
    const dt = new Date(String(d).slice(0, 10) + "T12:00:00Z");
    return dt.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short", timeZone: "UTC" });
  });

  eleventyConfig.addFilter("daEditoria", (materias, slug) =>
    (materias || []).filter((m) => m.data.editoria === slug)
  );
  eleventyConfig.addFilter("editoriaPor", (lista, slug) =>
    (lista || []).find((e) => e.slug === slug) || {}
  );
  eleventyConfig.addFilter("dataBR", (d) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("dataISO", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("limite", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("absoluta", (url, base) => new URL(url, base).href);

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
