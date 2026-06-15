# Redesign da Página de Produto orientado por dados

**Diagnóstico comportamental via Clarity e reestruturação da página de produto (PDP) do IBCMED (Inspirali Pós), do discovery ao handoff com os times de produto e tecnologia.**

`UX` · `CRO` · `Análise comportamental` · `Discovery` · `Design System` · `Handoff`

| | |
|---|---|
| **Papel** | Digital Experience & CRO Analyst |
| **Foco** | Diagnóstico de conversão → redesign → execução com time |
| **Ferramentas** | Microsoft Clarity, Miro, AEM, Figma |
| **Tipo** | CRO e redesign de produto orientado por dados |

---

## Contexto

A página de produto (PDP) dos cursos de pós-graduação do IBCMED é a página de decisão da jornada: o usuário já passou da curiosidade genérica e está avaliando valor, reduzindo risco e buscando clareza antes de agir. Seu objetivo é gerar leads qualificados — a conversão principal é o envio do formulário de interesse.

A PDP existente era genérica e idêntica para todos os cursos. Dois problemas estruturais a limitavam: cada modalidade de uma mesma especialização (híbrido, presencial, online) gerava uma página separada, multiplicando o número de PDPs no site e poluindo a própria vitrine; e o conteúdo era apresentado em formato sanfona, obrigando o usuário a uma sequência de cliques para acessar informação essencial à decisão. A leitura de performance, ainda assim, não explicava por que a conversão não acompanhava o tráfego.

## Problema

A página recebia tráfego relevante, mas a conversão não correspondia. Faltava entender o comportamento real antes de mexer no layout — havia esforço sendo investido sem impacto mensurável, com hipóteses baseadas em suposição, não em evidência.

## Meu papel

Conduzi o diagnóstico comportamental e o discovery da nova PDP, e atuei como ponte com os times de produto e tecnologia no handoff e na otimização dos componentes:

- Análise comportamental via Microsoft Clarity (90 dias, mobile e desktop).
- Diagnóstico de padrões de navegação, scroll, cliques e fricções (rage e dead clicks).
- Discovery e estruturação da nova PDP, do mapa de objeções ao user flow.
- Handoff e acompanhamento da execução com produto e tecnologia, otimizando os componentes.
- Implementação de parte das mudanças diretamente no AEM.

## Processo

**Diagnóstico com critério.** A análise no Clarity seguiu critérios para evitar conclusão por caso isolado: analisar múltiplas sessões, diagnosticar padrões e não exceções, separar mobile de desktop e isolar a página específica. O recorte foi feito sobre o curso de maior tráfego, em sessões curtas, médias e longas, com e sem clique.

**Separação entre validação e ação.** O ponto-chave do diagnóstico foi tratar scroll e leitura como microconversões reais — sinais de validação — e separá-los da ação final (envio do formulário). Isso revelou dois perfis de comportamento recorrentes:

- **Já decidido:** vai direto ao formulário, pouco scroll, conversão cedo. O site apenas executa uma decisão tomada fora dele.
- **Em validação:** lê bastante, scroll consistente, pausas longas em seções como "para quem é o curso", "aulas práticas" e "corpo docente". Usa o site para decidir se o curso é para ele.

**O insight central.** O CTA não era o gatilho de decisão — funcionava como mecanismo final de execução para quem já estava decidido. A conversão era resultado de confiança construída ao longo da navegação, não de estímulo isolado. O formulário não era o problema e o CTA não era confuso: o gargalo estava na **transição entre validação e ação**. Depois de consumir o conteúdo de validação, o usuário não recebia orientação explícita do próximo passo, o que gerava hesitação.

**Do diagnóstico ao redesign.** O discovery da nova PDP partiu desse diagnóstico — mapa de objeções, user flow e estrutura final — e resultou em um mapa de governança de componentes que define cada dobra da página (função, autoração, estrutura fixa e reutilização entre PDPs). A nova estrutura resolveu os dois gargalos de origem: consolidou as modalidades de uma especialização em uma página única, eliminando a multiplicação de PDPs, e abandonou a sanfona em favor de um conteúdo mais direto e escaneável, alinhado ao SEO técnico e à estrutura do design system existente.

## Decisões principais

- **Diagnosticar antes de redesenhar:** investir em análise comportamental (Clarity) antes de propor qualquer mudança de layout, para basear a decisão em evidência e não em suposição.
- **Consolidar as modalidades em uma única PDP:** em vez de uma página por modalidade (híbrido, presencial, online) da mesma especialização, uma página única com as variações dentro dela. Reduziu o número de PDPs no site, limpou a vitrine e simplificou a governança e a manutenção.
- **Reduzir a fricção da sanfona:** substituir o padrão que exigia múltiplos cliques para acessar informação essencial por uma estrutura que entrega o conteúdo de validação de forma mais direta e escaneável.
- **Tratar scroll e leitura como microconversões:** medir validação, não só a conversão final, para entender onde a jornada realmente quebrava.
- **Dar contexto ao CTA após o ponto de validação:** reduzir a hesitação conduzindo o usuário do "entendi" para o "quero fazer".
- **Estruturar a PDP como sistema de componentes:** sair de uma página genérica e idêntica para um mapa de governança que define cada dobra, reutilizável entre cursos.

## Entregas

- Análise comportamental completa (Clarity, 90 dias), separando validação de ação e identificando os perfis de usuário.
- Diagnóstico priorizado dos pontos de maior impacto na conversão.
- Discovery da nova PDP: mapa de objeções, user flow e estrutura final.
- Mapa de governança de componentes da PDP, definindo função, autoração e reutilização de cada dobra.
- Handoff e acompanhamento da execução com os times de produto e tecnologia.

## Impacto

> *Impacto qualitativo e de processo.*

- A decisão de redesign passou a ser orientada por evidência comportamental, não por suposição.
- O diagnóstico reposicionou o problema: deixou de ser "o CTA não converte" e passou a ser "falta transição entre validação e ação" — um problema diferente, que muda o que se constrói.
- A PDP saiu de uma página genérica para uma estrutura de componentes governada e reutilizável entre cursos, com as modalidades consolidadas em uma única página.
- A proposta de redesign foi aprovada de primeira pela diretoria.
- O redesign foi implementado em produção, com parte das implementações feitas diretamente por mim no AEM.

> *O redesign foi implementado em produção; a mensuração de conversão pós-implementação seguiu com o time.*

**[Solicitar aprofundamento do processo →](mailto:eddimaicon@gmail.com?subject=Portfólio%20—%20Aprofundamento%20do%20case%20PDP)**

*Diagnóstico completo, artefatos de discovery e mapa de governança apresentados sob solicitação.*

## Aprendizados

- Entender o comportamento antes de mexer no layout evita otimizar o elemento errado: o formulário e o CTA não eram o problema.
- Microconversões (scroll, leitura) contam a história que a taxa de conversão final esconde.
- O papel mais valioso não foi desenhar a tela, mas traduzir dado de comportamento em decisão de produto e levá-la à execução com tech.

## Próximos passos

> *Continuidade projetada.*

- Mensurar a conversão da nova PDP em produção, validando a hipótese de que o fluxo mais longo, porém mais qualificado, melhora a qualidade do lead.
- Refinar os breakpoints de desktop, identificados como o principal risco técnico remanescente.

---

## Contato

Eddi Kochi · [LinkedIn](https://www.linkedin.com/in/edi-maicon-kochi-427625347/) · eddimaicon@gmail.com
