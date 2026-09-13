# Sistema de perfil por dicotomias — especificação

Instrumento de 6 eixos dicotômicos, 7 afirmações por eixo (42 no total), escala forçada de 6 pontos, pesos por item, porcentagem por eixo e montagem de tipo psicológico sobre uma tabela de 16 assinaturas.

## 1. Escala de resposta

Seis bolinhas, sem centro: a pessoa é obrigada a escolher um lado.

| Bolinha | Posição | Valor | r = valor ÷ 3 | Significado |
| --- | --- | --- | --- | --- |
| B3 | 1ª (esquerda) | -3 | -1,000 | Discordo totalmente |
| B2 | 2ª (esquerda) | -2 | -0,667 | Discordo |
| B1 | 3ª (esquerda) | -1 | -0,333 | Discordo um pouco |
| A1 | 4ª (direita) | +1 | 0,333 | Concordo um pouco |
| A2 | 5ª (direita) | +2 | 0,667 | Concordo |
| A3 | 6ª (direita) | +3 | 1,000 | Concordo totalmente |

## 2. Pesos por afirmação

| Marcação | Peso | Critério de atribuição |
| --- | --- | --- |
| `mid` | 0,5 | Mede o eixo de forma indireta, é socialmente desejável, é condicional ("depende"), ou divide variância com outro eixo. |
| `neutra` | 1,0 | Item válido e concreto, mas ancorado num contexto específico (escola, viagem, cozinha) ou com justificativa embutida que dá rota de fuga. |
| `mor` | 1,5 | Descreve o comportamento-núcleo do polo, é observável e concordar com ele custa algo socialmente. Todo polo precisa de pelo menos um. |

## 3. Cálculo do eixo

Média ponderada **separada por polo**, não soma única. Isso corrige de uma vez o desbalanceamento de itens entre os lados e a aquiescência (a pessoa que concorda com tudo).

\[ M^{+} = \frac{\sum_{i \in polo^{+}} w_i \cdot r_i}{\sum_{i \in polo^{+}} w_i} \qquad M^{-} = \frac{\sum_{i \in polo^{-}} w_i \cdot r_i}{\sum_{i \in polo^{-}} w_i} \]

\[ X = \frac{M^{+} - M^{-}}{2} \quad \in [-1,\,+1] \]

\[ \%polo^{+} = \frac{X + 1}{2} \times 100 \qquad \%polo^{-} = 100 - \%polo^{+} \]

Os dois polos sempre somam 100%.

### Indicadores de qualidade

- **Intensidade** = \( |X| \) — o quanto o perfil está definido naquele eixo.
- **Aquiescência** = \( (M^{+} + M^{-}) / 2 \) — tendência a concordar (ou discordar) com tudo, independente de polo. Fora de ±0,45 o resultado deve ser considerado suspeito.

| Intensidade | Faixa | Leitura |
| --- | --- | --- |
| 0 – 0,07 | Indiferenciado | Os dois polos aparecem quase igualmente. Trate como não definido. |
| 0,07 – 0,20 | Leve | Tendência discreta. Pode mudar de lado em outra aplicação. |
| 0,20 – 0,45 | Moderado | Tendência clara e estável. |
| 0,45 – 0,70 | Marcante | Polo dominante, aparece na maioria dos contextos. |
| 0,70 – 1,00 | Extremo | Polo quase puro. Verifique se não houve resposta em bloco. |

## 4. Calibragem item por item

### Orientação — INICIADOR / RESPONDEDOR

3 itens INICIADOR contra 4 RESPONDEDOR.

| # | Polo | Peso | Afirmação | Por que este peso |
| --- | --- | --- | --- | --- |
| 1 | INICIADOR | `mor` | Geralmente, durante uma conversa, quando algo me vem à cabeça, não consigo me conter e acabo interrompendo a outra pessoa para falar sobre isso. | Marcador comportamental direto e difícil de falsear (interromper é ato observável). Núcleo do polo. |
| 2 | RESPONDEDOR | `mid` | Quase sempre não me importo se alguém está desinformado sobre algo; não é meu problema se ela está desatualizada. | Mede não-iniciar informação, mas está contaminado por empatia/indiferença social. Muita gente respondedora discorda disso. |
| 3 | RESPONDEDOR | `neutra` | Usualmente, durante uma conversa, prefiro terminar minha linha de pensamento, extraindo o que é possível sobre o tema; não gosto de mudança repentina de assunto. | Bom item, mas divide variância com POSTURA (controlado) — quem é metódico concorda por outro motivo. |
| 4 | RESPONDEDOR | `mor` | Minha maior tendência é escutar o que os outros têm a me dizer; é natural para mim guardar e processar o que me dizem antes de expor o que eu penso. | Definição canônica do polo: receber → processar → emitir. Item-âncora. |
| 5 | INICIADOR | `mor` | Geralmente sou muito inquieto, tenho uma propensão a participar ativamente das coisas, adoro compartilhar assuntos, participar de conversas e frequentemente não percebo que posso estar incomodando. | Item-âncora. Ponto de atenção: é multi-cláusula ("inquieto" + "compartilho" + "não percebo") — vale quebrar em dois no futuro. |
| 6 | RESPONDEDOR | `mid` | Posso até ser uma pessoa bem comunicativa, mas isso vai depender do meu nível de intimidade com os outros. | Condicional e quase universal — mede timidez situacional, não orientação. Baixo poder discriminativo. |
| 7 | INICIADOR | `neutra` | Durante uma conversa, ideias e histórias relacionadas me vêm à mente na hora; fico ansioso para compartilhá-las e, às vezes, perco o foco no que a outra pessoa está dizendo. | Quase gêmeo do or1. Mantido para confiabilidade, mas com peso menor para não contar o mesmo comportamento duas vezes em força máxima. |

### Postura — MOVIMENTADO / CONTROLADO

3 itens MOVIMENTADO contra 4 CONTROLADO.

| # | Polo | Peso | Afirmação | Por que este peso |
| --- | --- | --- | --- | --- |
| 1 | MOVIMENTADO | `mor` | Sou mais orientado à ação: prefiro colocar a mão na massa e dar andamento às coisas em vez de perder tempo planejando ou esperando. | Enunciado direto do polo. O termo "perder tempo" já carrega o juízo de valor do movimentado — ótimo discriminador. |
| 2 | MOVIMENTADO | `mid` | Tendo a ser mais flexível, isso me ajuda a adaptar minhas ações conforme os problemas forem surgindo, e acho melhor contornar os obstáculos do percurso. | "Flexível" é socialmente desejável — quase ninguém se declara rígido. Além disso pega variância do ENFOQUE (interessado). |
| 3 | CONTROLADO | `neutra` | Sou uma pessoa que preza pelo primor; na escola, meus cadernos eram muito caprichados, meu estojo tinha cores de caneta para cada parte do texto. | Concreto e vívido, mas ancorado num contexto escolar antigo e com viés de gênero/geração na resposta. |
| 4 | CONTROLADO | `mor` | Tenho uma abordagem orientada ao detalhe, preferindo desacelerar na preparação e estruturação do trabalho para entregar um resultado com alto padrão de qualidade. | Espelho exato do po1 (par invertido). Item-âncora do polo. |
| 5 | MOVIMENTADO | `mor` | Nas apresentações dos trabalhos da escola, eu geralmente não me preparava muito: estudava um pouco antes da aula e improvisava na hora a partir de algumas coisas que eu já sabia. | Comportamento passado, específico e não-desejável socialmente — quem concorda está se entregando de verdade. |
| 6 | CONTROLADO | `neutra` | Em oficinas ou projetos que participo, geralmente eu sou uma das últimas pessoas a entregar o que eu faço, pois demoro um pouco mais para executar, no entanto, meus trabalhos são sempre bem elogiados pelos outros. | O trecho "sempre bem elogiados" é autoelogio e pode fazer alguém concordar pelo motivo errado. Sem isso, seria mor. |
| 7 | CONTROLADO | `mid` | Sou quase sempre uma referência no quesito viagem, meus amigos e familiares logo me chamam para ir junto pois sabem que eu sou ótimo em planejar os roteiros e o que fazer, com isso conseguimos tirar muito mais proveito das viagens. | Depende de circunstância de vida (quem viaja, quem tem grupo) e mede planejamento = sobreposição forte com ENFOQUE sistemático. |

### Enfoque — SISTEMÁTICO / INTERESSADO

3 itens SISTEMÁTICO contra 4 INTERESSADO.

| # | Polo | Peso | Afirmação | Por que este peso |
| --- | --- | --- | --- | --- |
| 1 | SISTEMÁTICO | `mor` | Minha rotina é bem estruturada e organizada, com horários certos para treinar, comer e cuidar da casa. Mesmo trabalhando em home office, posso até fazer pequenos ajustes, mas minha prioridade é não furar essa estrutura. | Rotina autoimposta sem cobrança externa é o melhor indicador do polo. Item-âncora. |
| 2 | INTERESSADO | `mor` | Quando preciso estudar para alguma coisa, geralmente começo pelas partes que eu mais gosto e acho interessante. Muitas vezes até pulo o que eu acho chato; além disso, estudo mais quando bate uma vontade ou curiosidade. | Pular o chato e estudar por impulso de curiosidade é a definição operacional de "interessado". Item-âncora. |
| 3 | SISTEMÁTICO | `neutra` | Na cozinha, costumo seguir as receitas ao pé da letra para não desperdiçar ingredientes. Só depois que pego a prática e entendo o processo é que me sinto seguro para fazer adaptações e inovar. | Excelente item concreto, porém a justificativa econômica ("não desperdiçar") dá uma saída racional a quem não é sistemático. |
| 4 | INTERESSADO | `neutra` | Sou o tipo de pessoa que resolve as coisas na conversa. Uso um pouco de lábia improvisada para guiar as situações para um bom desfecho, fazendo com que o processo pareça totalmente espontâneo para os outros. | Subiu de mid para neutra na revisão: tirar "carismo" e deixar "lábia improvisada" deslocou o item de influência social para improviso de método, que é o que o eixo mede. Ainda não é mor porque "espontâneo para os outros" é autoimagem, não comportamento. |
| 5 | INTERESSADO | `neutra` | Minha gestão financeira não é engessada: adapto meu orçamento conforme meus objetivos do momento. Se a meta for viajar, trocar de carro ou investir, reorganizo meus gastos para fazer acontecer. | Boa tradução do polo para o domínio dinheiro, mas "adapto conforme objetivos" soa competente e atrai concordância indevida. |
| 6 | SISTEMÁTICO | `mid` | Entendo que o diploma não define ninguém, mas, para construir uma carreira sólida e respeitada, considero fundamental ter certificados que comprovem a qualificação. Formações alternativas são ótimos complementos, mas não substituem a educação formal. | Mede crença institucional/ideológica, não hábito pessoal. Muito sensível a classe, área e idade. |
| 7 | INTERESSADO | `mor` | Não costumo levar lista de compras ao mercado. Prefiro passar por todos os corredores, vendo o que está faltando em casa e tendo ideias do que cozinhar ali na hora. | Comportamento binário, cotidiano e neutro em desejabilidade social. Um dos itens mais limpos do teste. |

### Organização — PRAGMÁTICO / AFILIATIVO

4 itens PRAGMÁTICO contra 3 AFILIATIVO.

| # | Polo | Peso | Afirmação | Por que este peso |
| --- | --- | --- | --- | --- |
| 1 | PRAGMÁTICO | `mor` | Embora eu respeite os protocolos da empresa, entendo que eles têm limites. Sempre que surge um impasse, não hesito em usar soluções alternativas e técnicas próprias para garantir o resultado. | Núcleo do polo: resultado acima da norma acordada. Item-âncora. |
| 2 | AFILIATIVO | `mor` | Valorizo a troca com a equipe para aprimorar nossos processos; costumamos construir nossas próprias orientações a partir do que aprendemos no dia a dia. | Coautoria da norma pelo grupo = definição do afiliativo. Item-âncora. |
| 3 | PRAGMÁTICO | `mor` | Às vezes, por buscar garantir que as coisas funcionem, posso soar um pouco ríspido(a) na maneira de tratar as pessoas, não é muito natural para mim embelezar as palavras ou fingir simpatia. | Custo social assumido em nome da entrega. Alta validade porque é socialmente indesejável. |
| 4 | AFILIATIVO | `mor` | Quando saio com meus amigos e estamos demorando muito para decidir onde comer, gosto de sugerir uma votação para escolhermos. Muitas vezes sou voto vencido, mas eu topo ir mesmo assim porque o que me importa é conversar e estar com o pessoal. | Isola bem o afiliativo: aceita perder a decisão para manter o vínculo. Item-âncora. |
| 5 | AFILIATIVO | `neutra` | Sempre que a galera fica em dúvida sobre para onde ir ou o que assistir, costumo dizer "vocês que decidem". Tenho facilidade para me adaptar e geralmente ajudo a encontrar a alternativa que funciona para o grupo inteiro. | Sobrepõe-se ao og4 e também à ORIENTAÇÃO (respondedor) — "vocês que decidem" pode ser só passividade. |
| 6 | PRAGMÁTICO | `neutra` | O que realmente conta é o resultado final. As pessoas nem sempre percebem que, para o bem de todos, certas decisões precisam ser tomadas, mesmo que sejam impopulares no momento. | É crença abstrata, não comportamento, e está formulada de um jeito que é fácil concordar ("para o bem de todos"). |
| 7 | PRAGMÁTICO | `neutra` | Nos trabalhos em grupo, sempre trago sugestões e aponto os furos nas outras ideias. Se percebo que minhas contribuições foram ignoradas e o grupo insiste nas ideias que eu julgo "burras", prefiro me afastar e fazer o projeto sozinho a gastar energia tentando convencer os outros. | Ótimo comportamento-alvo, mas tão extremo que gera falsa discordância; a palavra "burras" faz a pessoa recuar por imagem. |

### Comunicação — INFORMATIVO / DIRECIONADO

4 itens INFORMATIVO contra 3 DIRECIONADO.

| # | Polo | Peso | Afirmação | Por que este peso |
| --- | --- | --- | --- | --- |
| 1 | INFORMATIVO | `mor` | Gosto de instigar as pessoas quando estou conversando com elas; acho mais interessante fazer um "charminho" em vez de chegar já deixando claras minhas intenções. | Contraste explícito com "deixar claras minhas intenções" — o item já contém a dicotomia. Item-âncora. |
| 2 | DIRECIONADO | `mor` | Quando conheço alguém, jogo limpo desde o início. Prefiro deixar minhas intenções claras logo de cara em vez de cair no clássico "vamos ver no que dá". Se, no meio do caminho, o que eu sinto ou quero mudar, também faço questão de avisar a pessoa. | Espelho do cm1. Item-âncora. Cuidado: "jogo limpo" é elogioso e puxa concordância — vale trocar por termo neutro. |
| 3 | INFORMATIVO | `mor` | Meus amigos e colegas costumam falar que eu passo muito uma vibe "professor"; isso porque eu normalmente trago muito contexto na minha comunicação e descrevo muito as coisas de que falo. | Excesso de contexto é a assinatura do informativo, e vem validado por observação externa ("costumam falar"). Item-âncora. |
| 4 | DIRECIONADO | `mor` | Ao dar um feedback negativo, costumo abrir com elogios genéricos apenas para amaciar o terreno, pois meu objetivo principal é ir direto aos pontos que deram errado e às entregas que a pessoa deixou de cumprir. | Cenário de alta pressão, onde o estilo real aparece. Item-âncora, mas é duplo: o elogio-de-fachada e a ida ao ponto poderiam ser itens separados. |
| 5 | INFORMATIVO | `mid` | Minha forma de expressar ideias combina seriedade e humor de maneira muito fluida. Por ser uma oscilação sutil, é comum que os outros não percebam a ironia e interpretem a mensagem de forma errada, dando às vezes até uma ideia errada de ser "sem noção". | Mede estilo irônico, que é periférico ao eixo. Ironia também aparece em gente muito direcionada. |
| 6 | DIRECIONADO | `mor` | Não tenho o hábito de rodear quando escrevo para alguém. Disparo o pedido ou o veredito primeiro e só explico os motivos se a pessoa me pedir esclarecimentos. | Item novo, entrou no lugar do "descubro o que vou falar no mesmo instante" (que media ORIENTAÇÃO disfarçada). Descreve a ordem da mensagem — pedido antes do contexto — que é a assinatura operacional do polo. Item-âncora. |
| 7 | INFORMATIVO | `mid` | Pedir algo a alguém é um desafio para mim. Acabo me travando ao planejar como vou falar, em vez de simplesmente chegar e fazer minha solicitação, acontece que eu tenho receio de parecer rude ou grosseiro. | Polaridade duvidosa: mede inibição/ansiedade social, e quem planeja muito a fala pode ser justamente direcionado. Principal candidato a reescrita. |

### Interpretação — MATERIALISTA / IMATERIALISTA

3 itens MATERIALISTA contra 4 IMATERIALISTA.

| # | Polo | Peso | Afirmação | Por que este peso |
| --- | --- | --- | --- | --- |
| 1 | MATERIALISTA | `mor` | Tendo a ser uma pessoa mais cética, bem mais pé no chão. É muito raro eu cair nesse papinho de signo e outras coisas afins. | Discrimina muito bem, mas o tom ("papinho") deprecia o polo oposto e pode inflar a discordância de quem é imaterialista. |
| 2 | IMATERIALISTA | `mor` | Tenho o hábito de guardar objetos que não têm mais utilidade prática só pelo valor sentimental. Se o item me conecta a uma pessoa querida ou a um momento marcante da minha vida, eu simplesmente não consigo me desfazer dele. | Item novo, entrou no lugar do "exemplo, historinha ou anedota" (que era ambíguo entre os dois polos). Coloca significado contra utilidade prática num comportamento verificável. Item-âncora. |
| 3 | IMATERIALISTA | `mor` | Ao presentear meus amigos e familiares prefiro dar coisas simbólicas do que utilidades que a pessoa pode querer, quero um presente que ao bater o olho a pessoa veja a nossa amizade e o quanto ela é importante. | Símbolo escolhido explicitamente contra utilidade. Item-âncora do polo. |
| 4 | MATERIALISTA | `mid` | Posso até não comentar nada por educação, mas é inevitável notar o ambiente ao meu redor quando vou visitar alguém: presto muita atenção na organização e no padrão das coisas da casa, e até se o copo de água oferecido está bem lavado. | Forte sobreposição com POSTURA (controlado) e com traço de higiene/ansiedade; a atenção ao padrão não é exclusiva do eixo. |
| 5 | IMATERIALISTA | `neutra` | Costumo ser uma pessoa precavida; é natural para mim elucubrar coisas que podem me acometer e já me preparo mentalmente para lidar com elas. | Boa captura do "ensaio mental do que não existe ainda", mas se confunde com ansiedade antecipatória e com POSTURA controlado. |
| 6 | MATERIALISTA | `mor` | Sou extremamente criterioso na hora de comprar roupas. Preciso testar o caimento, checar a composição do tecido, ver os cuidados de lavagem e inspecionar a qualidade das costuras. Jamais compro pela internet só porque a peça é bonitinha na foto. | Subiu para mor na revisão: com a saída do item de "exemplo/anedota", o polo MATERIALISTA ficou com só uma âncora. É o item mais concreto do teste em inspeção de matéria (tecido, costura, caimento), então assume a segunda âncora. |
| 7 | IMATERIALISTA | `mor` | Minha alimentação não é baseada em matemática. Dispenso a contagem rígida de nutrientes; minha verdadeira prioridade é consumir aquilo que faz bem para a minha saúde e que respeita a forma como eu enxergo o mundo. | Rejeita a medida em favor do princípio — exatamente o núcleo do polo. Item-âncora. |

## 5. Montagem do tipo psicológico

A assinatura de 6 polos é comparada com as 16 linhas da tabela. Como 6 eixos binários geram 64 combinações e a tabela só cobre 16, a maioria das pessoas **não** bate 6 de 6 — o tipo sai da melhor aproximação.

### Score de ajuste

Para cada tipo candidato, soma-se ao longo dos 6 eixos:

\[ S = \sum_{k=1}^{6} p_k \cdot a_k \qquad a_k = \frac{\%\,no\,polo\,que\,o\,tipo\,pede - 50}{50} \]

onde \( p_k \) é o peso de prioridade do eixo — **32, 16, 8, 4, 2, 1** na ordem de prioridade — e \( a_k \in [-1, +1] \).

Duas propriedades importantes desse desenho:

1. **A prioridade é quase lexicográfica.** 32 > 16+8+4+2+1, então um eixo de prioridade alta vence a soma de todos os de baixo — desde que a pessoa esteja de fato definida nele.
2. **O alinhamento é contínuo, não binário.** Um eixo em que a pessoa ficou 51/49 contribui com 0,02 × peso, praticamente nada. Um eixo indiferenciado não decide tipo, o que é o comportamento correto.

Ajuste exibido = \( (S / 63 + 1) / 2 \times 100 \), com 63 = soma dos pesos de prioridade.

### As três calibragens

O resultado não tem uma única leitura: a pílula acima do cartão do tipo permite trocar a hierarquia dos eixos, e o tipo é recalculado na hora. A explicação da leitura em uso aparece logo abaixo da pílula.

| Calibragem | Hierarquia dos eixos |
| --- | --- |
| **Calibragem por Temperamento** | Interpretação › Organização › Enfoque › Orientação › Postura › Comunicação |
| **Calibragem Universal** | Harmoniza quatro listas · Orientação › Interpretação › Organização › Comunicação › Enfoque › Postura |
| **Calibragem por Expressão** | Orientação › Postura › Comunicação › Organização › Enfoque › Interpretação |

A Calibragem Universal é a padrão e não usa uma hierarquia única: ela monta quatro listas independentes dos 16 tipos e depois as contrapõe.

1. **Polos individuais** — cada eixo pesa a própria intensidade da resposta, sem ordem do modelo; é a leitura mais crua dos polos da pessoa.
2. **Ordem universal** — pesos 32/16/8/4/2/1 aplicados na ordem ORIENTAÇÃO › INTERPRETAÇÃO › ORGANIZAÇÃO › COMUNICAÇÃO › ENFOQUE › POSTURA. Esta lista conta com peso dobrado na harmonização.
3. **Leitura por temperamento** — a mesma lista da calibragem por temperamento.
4. **Leitura por expressão** — a mesma lista da calibragem por expressão.

Para cada tipo, cada lista fornece uma posição (de 1º a 16º) e uma compatibilidade. A nota de harmonia é a média ponderada de `0,5 × posição normalizada + 0,5 × compatibilidade` nas quatro listas (pesos 1, 2, 1, 1), menos `0,18 ×` a distância entre a melhor e a pior posição do tipo. O desconto elimina candidatos que aparecem muito bem em uma lista e muito mal em outra: vence quem harmoniza o conjunto, não quem lidera uma leitura isolada.
A tela mostra as quatro listas, o primeiro colocado de cada uma e em que posição o tipo vencedor aparece nelas, além de quantas das quatro apontam o mesmo tipo — de 4 de 4 (tipo sólido por qualquer caminho) a 0 de 4 (vencedor de compromisso).

### Expressões

A expressão sai do cruzamento Orientação × Comunicação — o mesmo par de que a tabela deriva a Postura. Cada expressão reúne quatro tipos, um de cada temperamento:

| Expressão | Polos | Tipos |
| --- | --- | --- |
| Diretores (DIR) | INICIADOR · CONTROLADO · DIRECIONADO | ENFJ, ENTJ, ESTJ, ESTP |
| Animadores (ANI) | INICIADOR · MOVIMENTADO · INFORMATIVO | ENFP, ENTP, ESFJ, ESFP |
| Resolutores (RES) | RESPONDEDOR · MOVIMENTADO · DIRECIONADO | INFJ, INTJ, ISTJ, ISTP |
| Reguladores (REG) | RESPONDEDOR · CONTROLADO · INFORMATIVO | INFP, INTP, ISFJ, ISFP |

### Temperamentos

O temperamento sai do cruzamento Interpretação × Organização, e isso reproduz exatamente os quatro grupos da tabela:

| Interpretação | Organização | Temperamento |
| --- | --- | --- |
| MATERIALISTA | AFILIATIVO | Sentinelas (SJ) |
| MATERIALISTA | PRAGMÁTICO | Artesãos (SP) |
| IMATERIALISTA | AFILIATIVO | Catalisadores (NF) |
| IMATERIALISTA | PRAGMÁTICO | Teóricos (NT) |

### Tabela dos 16 tipos

| Tipo | Temp. | Orientação | Organização | Enfoque | Interpretação | Postura | Comunicação |
| --- | --- | --- | --- | --- | --- | --- | --- |
| INFJ | NF | RESPONDEDOR | AFILIATIVO | INTERESSADO | IMATERIALISTA | MOVIMENTADO | DIRECIONADO |
| INFP | NF | RESPONDEDOR | AFILIATIVO | INTERESSADO | IMATERIALISTA | CONTROLADO | INFORMATIVO |
| ENFJ | NF | INICIADOR | AFILIATIVO | INTERESSADO | IMATERIALISTA | CONTROLADO | DIRECIONADO |
| ENFP | NF | INICIADOR | AFILIATIVO | INTERESSADO | IMATERIALISTA | MOVIMENTADO | INFORMATIVO |
| INTJ | NT | RESPONDEDOR | PRAGMÁTICO | SISTEMÁTICO | IMATERIALISTA | MOVIMENTADO | DIRECIONADO |
| INTP | NT | RESPONDEDOR | PRAGMÁTICO | SISTEMÁTICO | IMATERIALISTA | CONTROLADO | INFORMATIVO |
| ENTJ | NT | INICIADOR | PRAGMÁTICO | SISTEMÁTICO | IMATERIALISTA | CONTROLADO | DIRECIONADO |
| ENTP | NT | INICIADOR | PRAGMÁTICO | SISTEMÁTICO | IMATERIALISTA | MOVIMENTADO | INFORMATIVO |
| ISTJ | SJ | RESPONDEDOR | AFILIATIVO | SISTEMÁTICO | MATERIALISTA | MOVIMENTADO | DIRECIONADO |
| ISFJ | SJ | RESPONDEDOR | AFILIATIVO | SISTEMÁTICO | MATERIALISTA | CONTROLADO | INFORMATIVO |
| ESTJ | SJ | INICIADOR | AFILIATIVO | SISTEMÁTICO | MATERIALISTA | CONTROLADO | DIRECIONADO |
| ESFJ | SJ | INICIADOR | AFILIATIVO | SISTEMÁTICO | MATERIALISTA | MOVIMENTADO | INFORMATIVO |
| ISTP | SP | RESPONDEDOR | PRAGMÁTICO | INTERESSADO | MATERIALISTA | MOVIMENTADO | DIRECIONADO |
| ISFP | SP | RESPONDEDOR | PRAGMÁTICO | INTERESSADO | MATERIALISTA | CONTROLADO | INFORMATIVO |
| ESTP | SP | INICIADOR | PRAGMÁTICO | INTERESSADO | MATERIALISTA | CONTROLADO | DIRECIONADO |
| ESFP | SP | INICIADOR | PRAGMÁTICO | INTERESSADO | MATERIALISTA | MOVIMENTADO | INFORMATIVO |

Tabela confirmada por você: **todos os oito tipos E são INICIADOR** e todos os oito tipos I são RESPONDEDOR. A variante literal que existia no protótipo (com ESTJ, ESFJ, ESTP e ESFP como RESPONDEDOR) foi removida do sistema.

Verificações automáticas dessa tabela: as 16 assinaturas de seis polos são **únicas** (nenhum par de tipos tem a mesma combinação) e, alimentando o motor com um perfil puro de cada tipo (100% em cada polo que a linha pede), **todos os 16 resolvem para si mesmos** nas duas ordens de prioridade.

## 6. Problemas estruturais encontrados

### 6.1 A tabela tem 6 colunas, mas só 4 dimensões

Conferindo as 16 linhas uma a uma, dois eixos nunca variam por conta própria:

- **Enfoque = Organização × Interpretação.** SISTEMÁTICO aparece exatamente em MATERIALISTA+AFILIATIVO (Sentinelas) e IMATERIALISTA+PRAGMÁTICO (Teóricos); os outros dois cruzamentos dão INTERESSADO. Zero exceções nas 16 linhas — Enfoque é a segunda letra do temperamento, nada mais.
- **Postura = Orientação × Comunicação.** MOVIMENTADO aparece exatamente em RESPONDEDOR+DIRECIONADO e INICIADOR+INFORMATIVO; os outros dois dão CONTROLADO. Zero exceções.

As quatro dimensões que de fato distinguem os 16 tipos são **Orientação, Organização, Interpretação e Comunicação** — o mínimo necessário, já que \( 2^4 = 16 \).

Consequências práticas:

1. **14 das 42 afirmações não adicionam dimensão.** Elas medem de novo, por outro ângulo, o que os outros eixos já mediram. Isso não é desperdício se for intencional: vira teste de consistência. Quando Enfoque ou Postura contradizem o previsto, a resposta foi incoerente — e isso é informação de qualidade da aplicação, não de perfil.
2. **A ordem de prioridade declarada põe um eixo derivado na frente de um independente.** Enfoque está em 3º e Comunicação em 6º, mas Comunicação é uma das 4 dimensões reais e Enfoque não é. Na ordem alternativa, os quatro independentes decidem primeiro e os dois derivados só desempatam.

### 6.2 A primeira letra dos oito tipos extrovertidos — resolvido

Na primeira versão da tabela, os quatro tipos E do bloco materialista (ESTJ, ESFJ, ESTP, ESFP) apareciam como RESPONDEDOR. Isso deixaria **nenhum tipo MATERIALISTA como INICIADOR** e, como Orientação é a prioridade número 1, empurraria toda pessoa iniciadora e materialista para um tipo imaterialista (N). Você confirmou E = INICIADOR nas oito linhas; o problema deixou de existir e a opção literal foi retirada do código.

### 6.3 Itens que ainda merecem revisão

- **Orientação** (`mid`) — "Quase sempre não me importo se alguém está desinformado sobre algo; não é meu problema se ela está…" Mede não-iniciar informação, mas está contaminado por empatia/indiferença social. Muita gente respondedora discorda disso.
- **Orientação** (`mid`) — "Posso até ser uma pessoa bem comunicativa, mas isso vai depender do meu nível de intimidade com os outros." Condicional e quase universal — mede timidez situacional, não orientação. Baixo poder discriminativo.
- **Postura** (`mid`) — "Tendo a ser mais flexível, isso me ajuda a adaptar minhas ações conforme os problemas forem surgindo, e acho…" "Flexível" é socialmente desejável — quase ninguém se declara rígido. Além disso pega variância do ENFOQUE (interessado).
- **Postura** (`mid`) — "Sou quase sempre uma referência no quesito viagem, meus amigos e familiares logo me chamam para ir junto pois…" Depende de circunstância de vida (quem viaja, quem tem grupo) e mede planejamento = sobreposição forte com ENFOQUE sistemático.
- **Enfoque** (`mid`) — "Entendo que o diploma não define ninguém, mas, para construir uma carreira sólida e respeitada, considero…" Mede crença institucional/ideológica, não hábito pessoal. Muito sensível a classe, área e idade.
- **Comunicação** (`mid`) — "Minha forma de expressar ideias combina seriedade e humor de maneira muito fluida. Por ser uma oscilação…" Mede estilo irônico, que é periférico ao eixo. Ironia também aparece em gente muito direcionada.
- **Comunicação** (`mid`) — "Pedir algo a alguém é um desafio para mim. Acabo me travando ao planejar como vou falar, em vez de…" Polaridade duvidosa: mede inibição/ansiedade social, e quem planeja muito a fala pode ser justamente direcionado. Principal candidato a reescrita.
- **Interpretação** (`mid`) — "Posso até não comentar nada por educação, mas é inevitável notar o ambiente ao meu redor quando vou visitar…" Forte sobreposição com POSTURA (controlado) e com traço de higiene/ansiedade; a atenção ao padrão não é exclusiva do eixo.

### 6.4 Redação

- **Juízo de valor embutido.** "perder tempo planejando", "papinho de signo", "ideias burras", "jogo limpo", "sempre bem elogiados" — cada um empurra a resposta pela imagem social, não pelo traço. Trocar por termos simétricos.
- **Uma ideia por afirmação.** Itens com três cláusulas encadeadas viram ruído: a pessoa concorda com uma parte e discorda de outra, e a bolinha escolhida não diz qual.
- **Pares espelhados.** Os eixos mais confiáveis têm um item que afirma o polo A e outro que afirma exatamente o oposto. Quem responde as duas pontas no mesmo sentido revela inconsistência.

## 7. Próximas trocas sugeridas

| Eixo | Polo | Substituiria | Afirmação proposta | Motivo |
| --- | --- | --- | --- | --- |
| Comunicação | DIRECIONADO | `cm7` | Em reunião, se percebo que a conversa está dando voltas, corto o assunto e pergunto na cara o que exatamente se espera de mim. | Entraria no lugar do "pedir algo é um desafio para mim", que mede inibição social e tem polaridade duvidosa — quem planeja muito a fala pode ser justamente direcionado. |
| Interpretação | MATERIALISTA | `in4` | Quando alguém me explica uma ideia, minha primeira pergunta é sempre como aquilo funciona na prática; se não der para ver o mecanismo, perco o interesse. | Entraria no lugar do "copo de água bem lavado", que divide variância com POSTURA (controlado) e com traço de higiene. O polo MATERIALISTA ganharia uma âncora que não depende de consumo nem de limpeza. |

## 8. Descrições dos 16 tipos

Cada tipo tem um texto próprio construído **a partir dos seis polos da sua linha**, não de um retrato genérico: o parágrafo percorre os eixos na ordem de prioridade (Orientação → Organização → Enfoque → Interpretação → Postura → Comunicação) e fecha com o que a combinação produz. Cada tipo traz também um título curto, três apontamentos de *onde isso rende* e três de *onde isso custa*, mais a ilustração correspondente. O texto tem cerca de 110 palavras e fecha comparando o tipo aos outros quinze.

| Tipo | Título | Assinatura de seis polos |
| --- | --- | --- |
| INFJ | O intérprete de intenção declarada | RESPONDEDOR · DIRECIONADO · IMATERIALISTA · AFILIATIVO · INTERESSADO · MOVIMENTADO |
| INFP | O narrador de mundo interno | RESPONDEDOR · INFORMATIVO · IMATERIALISTA · AFILIATIVO · INTERESSADO · CONTROLADO |
| ENFJ | O articulador que declara o pedido | INICIADOR · DIRECIONADO · IMATERIALISTA · AFILIATIVO · INTERESSADO · CONTROLADO |
| ENFP | O ignitor de conversa | INICIADOR · INFORMATIVO · IMATERIALISTA · AFILIATIVO · INTERESSADO · MOVIMENTADO |
| INTJ | O planejador de resposta curta | RESPONDEDOR · DIRECIONADO · IMATERIALISTA · PRAGMÁTICO · SISTEMÁTICO · MOVIMENTADO |
| INTP | O verificador de premissa | RESPONDEDOR · INFORMATIVO · IMATERIALISTA · PRAGMÁTICO · SISTEMÁTICO · CONTROLADO |
| ENTJ | O executor de plano declarado | INICIADOR · DIRECIONADO · IMATERIALISTA · PRAGMÁTICO · SISTEMÁTICO · CONTROLADO |
| ENTP | O testador de hipótese em voz alta | INICIADOR · INFORMATIVO · IMATERIALISTA · PRAGMÁTICO · SISTEMÁTICO · MOVIMENTADO |
| ISTJ | O cumpridor de combinado | RESPONDEDOR · DIRECIONADO · MATERIALISTA · AFILIATIVO · SISTEMÁTICO · MOVIMENTADO |
| ISFJ | O mantenedor atento | RESPONDEDOR · INFORMATIVO · MATERIALISTA · AFILIATIVO · SISTEMÁTICO · CONTROLADO |
| ESTJ | O organizador que assume o comando | INICIADOR · DIRECIONADO · MATERIALISTA · AFILIATIVO · SISTEMÁTICO · CONTROLADO |
| ESFJ | O anfitrião que puxa o grupo | INICIADOR · INFORMATIVO · MATERIALISTA · AFILIATIVO · SISTEMÁTICO · MOVIMENTADO |
| ISTP | O resolvedor de problema concreto | RESPONDEDOR · DIRECIONADO · MATERIALISTA · PRAGMÁTICO · INTERESSADO · MOVIMENTADO |
| ISFP | O artesão de padrão próprio | RESPONDEDOR · INFORMATIVO · MATERIALISTA · PRAGMÁTICO · INTERESSADO · CONTROLADO |
| ESTP | O negociador de resultado imediato | INICIADOR · DIRECIONADO · MATERIALISTA · PRAGMÁTICO · INTERESSADO · CONTROLADO |
| ESFP | O animador de presença física | INICIADOR · INFORMATIVO · MATERIALISTA · PRAGMÁTICO · INTERESSADO · MOVIMENTADO |

Na interface isso aparece em três lugares: o retrato do tipo resultante ao fim do teste (ilustração + texto + rende/custa), a aba **Todos os tipos**, que lista as 16 descrições agrupadas por temperamento com o tipo da pessoa destacado, e os dois quadros logo abaixo do cartão do resultado — um de temperamento e um de expressão, cada um com cerca de 100 palavras em linguagem não técnica e as ilustrações dos quatro membros do grupo, em duas colunas de dois.

| Temperamento | Cruzamento | Tipos |
| --- | --- | --- |
| Sentinelas (SJ) | Materialista + Afiliativo + Sistemático. Sustentam o que já existe: a estrutura, o combinado, o grupo. | ISTJ, ISFJ, ESTJ, ESFJ |
| Artesãos (SP) | Materialista + Pragmático + Interessado. Operam sobre o concreto agora, com a ferramenta que estiver à mão. | ISTP, ISFP, ESTP, ESFP |
| Catalisadores (NF) | Imaterialista + Afiliativo + Interessado. Movem pessoas por significado, não por procedimento. | INFJ, INFP, ENFJ, ENFP |
| Teóricos (NT) | Imaterialista + Pragmático + Sistemático. Constroem o modelo e depois cobram que a realidade o siga. | INTJ, INTP, ENTJ, ENTP |

### Ornamentos

Os braços ilustrados são a moldura gráfica do site. Cada temperamento tem quatro peças, desenhadas saindo da borda esquerda em direção ao centro; todas as outras direções são espelhamento e giro da mesma arte, feitos em CSS. Eles aparecem apenas nas quatro bordas da página — laterais, topo e base — e nunca saem de retângulos ou caixas de conteúdo. Durante a introdução e o teste os quatro temperamentos aparecem misturados e a moldura se remistura a cada troca de eixo. Ao chegar no resultado, todos os braços passam a ser do temperamento do tipo que saiu — inclusive no PDF, que traz seis peças por página em faixas fora da coluna de texto.

Todo o conteúdo fica numa folha opaca que cobre o fundo e a moldura: os corpos de texto vivem nessa folha e os braços só aparecem em volta dela, nunca sobre a leitura.

### Exportação em PDF

O botão *Baixar meu resultado em PDF* gera um documento de 5 páginas, montado no navegador (jsPDF, sem servidor):

1. **Capa** — sigla, temperamento, expressão, calibragem usada, título do tipo, ilustração, assinatura de seis polos, ajuste e margem sobre o segundo colocado, texto descritivo, rende/custa.
2. **Seus dois grupos** — o texto de cerca de 100 palavras do temperamento e o da expressão, com os quatro membros de cada grupo.
3. **Os seis eixos** — porcentagem dos dois polos, intensidade e o significado do polo dominante em cada eixo.
4. **Como o tipo foi escolhido** — a resposta contra a linha da tabela, eixo por eixo na ordem de prioridade, mais as duas checagens de coerência.
5. **Ranking e método** — os 16 tipos pelo ajuste e a explicação da escala, dos pesos e das fórmulas.

## 9. Arquivos

| Arquivo | Conteúdo |
| --- | --- |
| `data.js` | Escala, pesos, os 6 eixos com as 42 afirmações (polo, peso, justificativa) e as trocas sugeridas. |
| `engine.js` | Motor de pontuação por eixo: médias por polo, X, porcentagens, intensidade, aquiescência. Sem dependência de interface. |
| `tipologia.js` | Temperamentos, expressões, as três calibragens, tabela dos 16 tipos, score de ajuste, checagens de coerência. |
| `descricoes.js` | Título, texto, três apontamentos de rende e três de custa dos 16 tipos, os textos dos 4 temperamentos e o caminho da ilustração de cada tipo. |
| `app.js` | Interface: fluxo do teste, telas de resultado, retrato do tipo, galeria dos 16, aba de temperamento. |
| `ornamentos.js` | Acervo de braços por temperamento e a moldura da página: posições, giros, espelhos e a mistura durante a navegação. |
| `pdf.js` | Geração do PDF do resultado no próprio navegador, com a moldura de braços do temperamento. |
| `index.html` | Marcação das três telas e das cinco abas de resultado. |
| `img/*.jpg` | As 16 ilustrações de tipo. |
| `img/orn/*.png` | As peças de ornamento, recortadas com fundo transparente. |
| `styles.css` | Tokens de design, tema claro/escuro, escala de bolinhas, tabelas e ranking. |
| `gerar-spec.js` | Gera este documento a partir dos dados, para não sair de sincronia. |

---

Documento gerado a partir dos dados do sistema. 6 eixos, 42 afirmações, 16 tipos.
