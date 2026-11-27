# Modelo de reportagem do Awhuuu!

Copie o bloco abaixo para `src/materias/nome-da-materia.md` e preencha. As regras estão no `docs/GUIA-DE-REDACAO.md` (seção "O padrão da casa"). Os comentários entre `<!-- -->` não aparecem no site; apague-os quando terminar.

Meta de tamanho da reportagem: 1.800 a 2.800 palavras de texto corrido.

```markdown
---
title: "Título com a cena ou a contradição, não com o nome do verbete"
editoria: rota-666
numero: 
assina: evandro
date: 2026-12-07T20:00:00-03:00
resumo: "Duas frases: a cena e a pergunta que a matéria responde."
capa: /img/capas/rota-666.webp
capa_alt: "Descrição da ilustração"
ficha:
  - campo: Quando
    valor: 
  - campo: Onde
    valor: 
  - campo: Quem
    valor: 
  - campo: Os números
    valor: "Diga quando as fontes divergem: de X a Y, conforme a fonte"
fontes:
  - nome: "Título — veículo, ano (fonte da época)"
    url: ""
  - nome: "Entrevista de Fulano a Veículo, ano (fala de quem estava lá)"
    url: ""
pergunta: "Uma pergunta que o leitor responde com uma lembrança ou uma opinião."
lugares:
  - nome: 
    endereco: 
    nota: ""
    lat: 
    lng: 
achados:
  - nome: "Vinil: Nome do disco (Artista) — Amazon"
    url: "https://www.amazon.com.br/dp/CODIGO?tag=awhuuu-20"
  - nome: "Livro: Nome do livro (Autor) — Amazon"
    url: ""
  - nome: "Camiseta Lobo da Lua Cheia (Loja)"
    url: "https://umapenca.com/awhuuu/camiseta/lobo-da-lua-cheia-479410.html"
spotify_playlist: 
youtube_playlist: 
---

<!-- 1. CENA: hora, lugar, clima, gente. Sem "Em 1985, a banda X..." -->
Parágrafo de cena.

<!-- 2. POR QUE IMPORTA: a tese numa frase que o leitor consiga repetir -->
Parágrafo com a tese.

{% video "LINK", "O que é o vídeo", "canal oficial de Fulano" %}

## Intertítulo da primeira ideia

Desenvolvimento, 3 a 6 frases por parágrafo.

{% citacao "Frase curta de quem viveu a história", "Quem disse", "onde e quando", "link" %}

Mais desenvolvimento.

{% box "Enquanto isso, no Brasil" %}
- **Ano:** fato com fonte na lista.
- **Ano:** fato com fonte na lista.
{% endbox %}

## Intertítulo da segunda ideia

<!-- Quando o texto analisa uma música, ela toca aqui -->
{% spotify "LINK DA FAIXA NO SPOTIFY" %}

Desenvolvimento.

{% produto "Vinil: Nome do disco", "link de afiliado", "link da imagem", "Por que ele está aqui" %}

## Intertítulo da terceira ideia

<!-- 4. A INFORMAÇÃO QUE QUASE NINGUÉM CONTA -->
Desenvolvimento.

{% video "LINK", "O que é o vídeo", "canal oficial" %}

{% citacao "Segunda fala, de preferência da época", "Quem", "onde e quando", "link" %}

## Intertítulo da quarta ideia

<!-- 5. BRASIL E SUL NO MAPA, quando a história permitir -->
Desenvolvimento.

{% figura "LINK DA IMAGEM", "Legenda", "Autor, licença", "link da página da foto" %}

{% video "LINK", "O que é o vídeo", "canal oficial" %}

## Intertítulo do fecho

<!-- 6. FECHO que amarra a tese, sem moral da história -->
Fecho.
```

## Conferência rápida do kit

- Ficha, três vídeos no corpo, duas citações, um boxe, uma faixa do Spotify (se analisa música), um ou dois produtos no corpo, de três a seis Achados, as duas playlists, seis fontes, pergunta.
- Algo para ver ou ouvir a cada três ou quatro parágrafos.
- Contagem de palavras (só o texto): `awk 'f>=2; /^---$/{f++}' src/materias/ARQUIVO.md | grep -v '{%' | wc -w`
