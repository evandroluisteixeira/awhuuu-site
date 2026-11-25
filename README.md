# Awhuuu! — site

Site do Awhuuu! (awhuuu.com.br), feito com [Eleventy](https://www.11ty.dev/) e publicado no GitHub Pages.

## Como editar sem código
1. Entre em https://app.pagescms.org com a sua conta do GitHub.
2. Escolha o repositório `awhuuu-site`.
3. Em **Matérias**, crie ou edite uma matéria. Em **Editorias** e **Configurações do site**, ajuste o resto.
4. Salve. O site se atualiza sozinho em um ou dois minutos.

## Regras que o site segue
- Matéria com data futura só aparece no dia e hora marcados. O site é reconstruído todo dia às 20h05 (Brasília).
- Marque **Rascunho** para guardar uma matéria sem publicar.
- Os **Achados** (links de afiliado) só aparecem quando "Mostrar os Achados" estiver ligado nas configurações.
- Sem capa própria, a matéria usa a capa da editoria.

## Onde fica cada coisa
- `src/materias/` — uma matéria por arquivo
- `src/_data/editorias.json` — as editorias
- `src/_data/site.json` — nome, redes, afiliados
- `src/_includes/` — o layout
- `src/css/estilo.css` — cores e tipografia
- `img/posts/` — artes dos posts agendados no Buffer (não mover)

## Para quem mexe no código
```
npm install
MOSTRAR_FUTURO=1 npm run dev   # mostra também as matérias agendadas
```
