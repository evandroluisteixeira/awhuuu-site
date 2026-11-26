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
  eleventyConfig.addFilter("casasAtivas", (casas) => ((casas && casas.casas) || []).filter((c) => c.ativa !== false));

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
