# Guia de redação do Awhuuu!

Vale para tudo o que o site publica: matérias, legendas, carrosséis, agenda, casas, newsletter. Também vale para quem escrever com a gente no futuro, e para as rotinas automáticas.

## 1. A diversidade mora em todas as editorias

- Não existe "editoria da diversidade". As histórias de gente negra, indígena, LGBTQIA+, de mulheres, da periferia e de pessoas com deficiência entram na Rota 666, na Hora do Lobo, no Mondo Bizarro, na Pedrada, no Remendo, em As Imortais e em todas as outras.
- Meta de pauta: **pelo menos uma matéria por mês** que traga uma dessas histórias para o centro. O calendário está em `docs/PAUTAS-DIVERSIDADE.md`.
- Fita Gasta: toda playlist temática passa por uma pergunta antes de fechar: quem está faltando aqui?

## 2. Como chamar as pessoas

- **Do jeito que elas se chamam.** Nome, pronomes e identidade que a própria pessoa usa hoje. Pessoa trans: só o nome atual, inclusive quando se fala do passado. Não citar o nome antigo.
- **Orientação e identidade só quando importam para a história**, e com fonte: a pessoa falou publicamente sobre isso. Nunca especular sobre a vida de ninguém.
- **Povos indígenas pelo nome do povo**: Xavante, Guarani Kaiowá, Kaingang, Maori. Dizer "indígena" (e não "índio") quando o termo for geral.
- **Raça com precisão**: "negro", "pessoa negra", "artista negra". Nada de eufemismo ("de cor", "moreno") nem de destaque gratuito.
- **Deficiência**: "pessoa com deficiência", e só quando for parte da história. Ninguém é "exemplo de superação" por existir.

## 3. Como contar a história

- **A música vem primeiro.** Ninguém entra na matéria só como "a primeira X do rock". O que a pessoa tocou, gravou, inventou?
- **Nada de exotismo.** Cultura indígena, periferia ou religião de matriz africana não são cenário nem fantasia.
- **Diga quem ficou com o crédito e com o dinheiro.** Quando uma música de artista negro virou sucesso na voz de um branco, a matéria conta isso.
- **Ouça e cite vozes de dentro**: artistas, pesquisadoras e pesquisadores, jornalistas e veículos das próprias comunidades.
- **Temas pesados** (violência, racismo, morte, doença) com cuidado: fato com fonte, sem detalhe gratuito, sem tom de piada.

## 4. Palavras

| Use | Evite |
|---|---|
| pessoa negra, artista negra | de cor, moreno (como eufemismo), "mulata" |
| indígena, povo Xavante, Guarani Kaiowá | índio, tribo (no sentido de "atrasado"), "aldeia" como xingamento |
| pessoa trans, mulher trans, homem trans | "travesti" como ofensa, "nasceu homem/mulher", nome antigo |
| pessoa LGBTQIA+, gay, lésbica, bi | "opção sexual", "homossexualismo" |
| pessoa com deficiência | deficiente, portador, "aleijado", "doente" |
| periferia, quebrada (quando a própria cena usa) | "comunidade carente" como rótulo genérico |
| mulher no rock, guitarrista | "guitarrista mulher" como se fosse exceção, comentários sobre aparência |

## 5. Imagens e personagens

- Os monstros (o lobo, a vampira, a criatura costurada) são os de fora que viraram anfitriões. Eles nunca riem de quem está de fora.
- Ilustrações com pessoas: variedade de corpos, cores e estilos, sem caricatura.

## 6. Antes de publicar

- [ ] A matéria chama cada pessoa como ela se chama?
- [ ] Algum termo da coluna "Evite" escapou?
- [ ] Se fala de uma comunidade, cita pelo menos uma fonte dessa comunidade?
- [ ] A música está no centro, e não só o rótulo?
- [ ] Alguém dessa história leria e se reconheceria com respeito?

## 7. Errou?

Corrige no ato, com uma linha no fim da matéria dizendo o que mudou e quando. A página pública `/pra-quem/` convida o leitor a apontar os erros.

## Vídeos e fotos no meio do texto

Para pôr um vídeo do YouTube entre dois parágrafos, numa linha sozinha:

    {% video "LINK-OU-CÓDIGO-DO-VÍDEO", "Legenda curta dizendo o que é", "canal oficial de Fulano" %}

Prefira o canal oficial da banda, da gravadora ou do programa de TV. Upload de fã só quando não houver outro.

Para pôr uma foto com crédito:

    {% figura "LINK-DA-IMAGEM", "Legenda", "Autor, licença", "link da página da foto" %}

Fotos de lugares, objetos e documentos de licença livre (Wikimedia Commons) entram sempre com autor e licença. Fotos de divulgação das bandas: só as que a própria banda distribui para imprensa, com o crédito que ela pede.
