# Kit de Componentes de Case — Especificação

Mini design system para os cases do portfólio. Objetivo: melhorar a escaneabilidade quebrando texto corrido em componentes reaproveitáveis, sem decoração. Princípio regente: **forma com função** — cada componente resolve um problema de escaneabilidade específico. Conteúdo que não se encaixa em nenhum padrão continua sendo texto corrido.

São **5 componentes fechados**. Não criar novos sem necessidade real.

Todos devem usar os tokens visuais já existentes no site (acento carmim, Fraunces para display, IBM Plex Mono para detalhes, tokens de motion `--ease` / `--dur-fast` / `--dur-med`). Mobile-first, contraste AA, navegação por teclado, foco visível.

---

## 1. Bloco de destaque (insight)

**Problema que resolve:** a tese central do case fica diluída no meio do texto. O recrutador que escaneia precisa pegá-la num relance.

**Quando usar:** uma vez por case, no máximo. Reservado para a sacada principal.

**Conteúdo:** uma frase curta (a tese). Opcionalmente um rótulo acima ("Insight", "Conclusão").

**Visual:** destaque com acento carmim (borda lateral ou fundo sutil), tipografia maior que o corpo. Deve contrastar claramente com o texto ao redor sem virar banner.

**Exemplos de uso:**
- PDP: "O gargalo não era o CTA, mas a transição entre validação e ação."
- CRM: "Régua que reage a comportamento converte mais que volume de disparo."

---

## 2. Cards de comparação

**Problema que resolve:** comparações ("X vs. Y", "antes/depois") viram parágrafos difíceis de contrastar quando ficam em texto corrido.

**Quando usar:** sempre que o conteúdo for uma comparação entre 2 ou 3 itens paralelos.

**Conteúdo:** 2 a 3 cards lado a lado. Cada card tem um título curto e 2-4 linhas (bullets curtos ou frase).

**Visual:** cards paralelos de largura igual, mesma altura. Em mobile, empilham. Hierarquia clara entre título e conteúdo.

**Exemplos de uso:**
- PDP: os dois perfis de usuário — "Já decidido" vs. "Em validação" (comportamento + conclusão em cada card).
- CRM: "Antes" vs. "Depois" da operação (disparos avulsos vs. régua estruturada).

---

## 3. Fluxo horizontal de etapas

**Problema que resolve:** processos sequenciais em texto corrido escondem a progressão.

**Quando usar:** para métodos ou jornadas com etapas em ordem.

**Conteúdo:** 3 a 6 etapas, cada uma com um rótulo curto e opcionalmente uma linha de descrição.

**Visual:** etapas em linha conectadas (seta ou linha fina), reaproveitando a lógica da timeline horizontal já existente na home. Em mobile, vira vertical. Motion discreto no scroll, alinhado ao sistema de motion do site — nunca decorativo.

**Exemplos de uso:**
- PDP: Diagnóstico → Reposicionamento do problema → Redesign → Produção.
- CRM: etapas da régua (Boas-vindas → ramificação por abertura → nutrição → conversão).

---

## 4. Grid de itens com micro-título

**Problema que resolve:** listas longas de "Entregas" e "Decisões" em bullets cansam e não escaneiam.

**Quando usar:** nos blocos Entregas e Decisões principais, quando há 4+ itens.

**Conteúdo:** grid de cards curtos. Cada card: um micro-título (a entrega/decisão) + uma linha de contexto. Ícone opcional — só se houver um conjunto coerente; não forçar ícone por item.

**Visual:** grid de 2 ou 3 colunas, cards de altura uniforme. Em mobile, 1 coluna. Micro-título em destaque, contexto em corpo menor.

**Exemplos de uso:**
- PDP: as 4 decisões principais como grid.
- CRM: as entregas (réguas, templates HTML, jornadas, newsletter, dashboard) como grid.

---

## 5. Slot de artefato com legenda

**Problema que resolve:** imagem solta não prova nada; imagem sem contexto confunde. Padroniza como artefatos visuais (heatmap, user flow, mapa de governança, peça de e-mail) aparecem.

**Quando usar:** sempre que entrar um artefato visual. Nunca inserir imagem fora deste container.

**Conteúdo:** a imagem + uma legenda de uma linha explicando **o que o artefato prova** (não o que ele é). Regra: imagem sempre acompanhada de racional.

**Visual:** imagem com tratamento consistente (borda/sombra sutil, cantos conforme o sistema). Legenda em IBM Plex Mono ou corpo menor, abaixo. Suporte a imagem clicável para ampliar é desejável, não obrigatório.

**Regra de confidencialidade (obrigatória):** nenhum artefato entra sem anonimização. Remover/borrar: dados pessoais de terceiros (nomes, fotos, registros profissionais), volumes de tráfego/negócio, URLs internas. Marca da empresa e processo podem aparecer.

**Exemplos de uso:**
- PDP: heatmap do Clarity (rosto/dados de terceiros borrados, painel de volume cortado); user flow; mapa de governança de componentes.
- CRM: régua de jornada recriada; peça de e-mail em HTML (sem curso/dado real).

---

## Mapeamento nos blocos do case

| Bloco do case | Componente |
|---|---|
| Hero | (já existe) |
| Contexto, Problema, Restrições | texto corrido — sem componente |
| Insight central | 1 — Bloco de destaque |
| Perfis / antes-depois | 2 — Cards de comparação |
| Processo / método | 3 — Fluxo horizontal |
| Entregas, Decisões | 4 — Grid com micro-título |
| Artefatos visuais | 5 — Slot com legenda |
| CTA / contato | (já existe) |

## Regra de ouro

Texto corrido não é inimigo. Contexto e Problema podem e devem continuar em prosa — são narrativos, não escaneáveis por natureza. Os componentes existem para o conteúdo que **é** estruturado (comparação, sequência, lista, artefato). Não forçar componente onde não há estrutura: isso seria over-design, o oposto do objetivo.
