/* =========================================================================
   BANCO DE ITENS — 6 dicotomias x 7 afirmacoes
   -------------------------------------------------------------------------
   pole: "pos" | "neg"  -> a qual polo a CONCORDANCIA empurra
   peso: "mor" (1.5) | "neutra" (1.0) | "mid" (0.5)
   nota: justificativa da calibragem (aparece no painel de pesos)
   ========================================================================= */

const PESOS = { mor: 1.5, neutra: 1.0, mid: 0.5 };

const ESCALA = [
  { id: 'B3', valor: -3, lado: 'neg', rotulo: 'Discordo totalmente' },
  { id: 'B2', valor: -2, lado: 'neg', rotulo: 'Discordo' },
  { id: 'B1', valor: -1, lado: 'neg', rotulo: 'Discordo um pouco' },
  { id: 'A1', valor: 1, lado: 'pos', rotulo: 'Concordo um pouco' },
  { id: 'A2', valor: 2, lado: 'pos', rotulo: 'Concordo' },
  { id: 'A3', valor: 3, lado: 'pos', rotulo: 'Concordo totalmente' },
];

const EIXOS = [
  {
    id: 'orientacao',
    nome: 'Orientação',
    pos: {
      code: 'INICIADOR',
      desc: 'Puxa o movimento da interação. Pensa falando, entra na conversa, ocupa espaço e dispara assunto antes de processar.',
    },
    neg: {
      code: 'RESPONDEDOR',
      desc: 'Recebe antes de emitir. Guarda, processa e devolve; prefere concluir a linha de raciocínio a abrir uma nova.',
    },
    itens: [
      {
        id: 'or1',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Geralmente, durante uma conversa, quando algo me vem à cabeça, não consigo me conter e acabo interrompendo a outra pessoa para falar sobre isso.',
        nota: 'Marcador comportamental direto e difícil de falsear (interromper é ato observável). Núcleo do polo.',
      },
      {
        id: 'or2',
        pole: 'neg',
        peso: 'mid',
        texto:
          'Quase sempre não me importo se alguém está desinformado sobre algo; não é meu problema se ela está desatualizada.',
        nota: 'Mede não-iniciar informação, mas está contaminado por empatia/indiferença social. Muita gente respondedora discorda disso.',
      },
      {
        id: 'or3',
        pole: 'neg',
        peso: 'neutra',
        texto:
          'Usualmente, durante uma conversa, prefiro terminar minha linha de pensamento, extraindo o que é possível sobre o tema; não gosto de mudança repentina de assunto.',
        nota: 'Bom item, mas divide variância com POSTURA (controlado) — quem é metódico concorda por outro motivo.',
      },
      {
        id: 'or4',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Minha maior tendência é escutar o que os outros têm a me dizer; é natural para mim guardar e processar o que me dizem antes de expor o que eu penso.',
        nota: 'Definição canônica do polo: receber → processar → emitir. Item-âncora.',
      },
      {
        id: 'or5',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Geralmente sou muito inquieto, tenho uma propensão a participar ativamente das coisas, adoro compartilhar assuntos, participar de conversas e frequentemente não percebo que posso estar incomodando.',
        nota: 'Item-âncora. Ponto de atenção: é multi-cláusula ("inquieto" + "compartilho" + "não percebo") — vale quebrar em dois no futuro.',
      },
      {
        id: 'or6',
        pole: 'neg',
        peso: 'mid',
        texto:
          'Posso até ser uma pessoa bem comunicativa, mas isso vai depender do meu nível de intimidade com os outros.',
        nota: 'Condicional e quase universal — mede timidez situacional, não orientação. Baixo poder discriminativo.',
      },
      {
        id: 'or7',
        pole: 'pos',
        peso: 'neutra',
        texto:
          'Durante uma conversa, ideias e histórias relacionadas me vêm à mente na hora; fico ansioso para compartilhá-las e, às vezes, perco o foco no que a outra pessoa está dizendo.',
        nota: 'Quase gêmeo do or1. Mantido para confiabilidade, mas com peso menor para não contar o mesmo comportamento duas vezes em força máxima.',
      },
    ],
  },

  {
    id: 'postura',
    nome: 'Postura',
    pos: {
      code: 'MOVIMENTADO',
      desc: 'Começa para descobrir. Prioriza andamento, improvisa, corrige a rota no percurso.',
    },
    neg: {
      code: 'CONTROLADO',
      desc: 'Prepara para acertar. Prioriza padrão de qualidade, estrutura antes de executar, aceita levar mais tempo.',
    },
    itens: [
      {
        id: 'po1',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Sou mais orientado à ação: prefiro colocar a mão na massa e dar andamento às coisas em vez de perder tempo planejando ou esperando.',
        nota: 'Enunciado direto do polo. O termo "perder tempo" já carrega o juízo de valor do movimentado — ótimo discriminador.',
      },
      {
        id: 'po2',
        pole: 'pos',
        peso: 'mid',
        texto:
          'Tendo a ser mais flexível, isso me ajuda a adaptar minhas ações conforme os problemas forem surgindo, e acho melhor contornar os obstáculos do percurso.',
        nota: '"Flexível" é socialmente desejável — quase ninguém se declara rígido. Além disso pega variância do ENFOQUE (interessado).',
      },
      {
        id: 'po3',
        pole: 'neg',
        peso: 'neutra',
        texto:
          'Sou uma pessoa que preza pelo primor; na escola, meus cadernos eram muito caprichados, meu estojo tinha cores de caneta para cada parte do texto.',
        nota: 'Concreto e vívido, mas ancorado num contexto escolar antigo e com viés de gênero/geração na resposta.',
      },
      {
        id: 'po4',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Tenho uma abordagem orientada ao detalhe, preferindo desacelerar na preparação e estruturação do trabalho para entregar um resultado com alto padrão de qualidade.',
        nota: 'Espelho exato do po1 (par invertido). Item-âncora do polo.',
      },
      {
        id: 'po5',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Nas apresentações dos trabalhos da escola, eu geralmente não me preparava muito: estudava um pouco antes da aula e improvisava na hora a partir de algumas coisas que eu já sabia.',
        nota: 'Comportamento passado, específico e não-desejável socialmente — quem concorda está se entregando de verdade.',
      },
      {
        id: 'po6',
        pole: 'neg',
        peso: 'neutra',
        texto:
          'Em oficinas ou projetos que participo, geralmente eu sou uma das últimas pessoas a entregar o que eu faço, pois demoro um pouco mais para executar, no entanto, meus trabalhos são sempre bem elogiados pelos outros.',
        nota: 'O trecho "sempre bem elogiados" é autoelogio e pode fazer alguém concordar pelo motivo errado. Sem isso, seria mor.',
      },
      {
        id: 'po7',
        pole: 'neg',
        peso: 'mid',
        texto:
          'Sou quase sempre uma referência no quesito viagem, meus amigos e familiares logo me chamam para ir junto pois sabem que eu sou ótimo em planejar os roteiros e o que fazer, com isso conseguimos tirar muito mais proveito das viagens.',
        nota: 'Depende de circunstância de vida (quem viaja, quem tem grupo) e mede planejamento = sobreposição forte com ENFOQUE sistemático.',
      },
    ],
  },

  {
    id: 'enfoque',
    nome: 'Enfoque',
    pos: {
      code: 'SISTEMÁTICO',
      desc: 'Segue o método e a sequência antes de adaptar. Confia em estrutura, protocolo e formalização.',
    },
    neg: {
      code: 'INTERESSADO',
      desc: 'Segue o interesse e o objetivo do momento. Pula etapas, reorganiza conforme a vontade e improvisa o caminho.',
    },
    itens: [
      {
        id: 'en1',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Minha rotina é bem estruturada e organizada, com horários certos para treinar, comer e cuidar da casa. Mesmo trabalhando em home office, posso até fazer pequenos ajustes, mas minha prioridade é não furar essa estrutura.',
        nota: 'Rotina autoimposta sem cobrança externa é o melhor indicador do polo. Item-âncora.',
      },
      {
        id: 'en2',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Quando preciso estudar para alguma coisa, geralmente começo pelas partes que eu mais gosto e acho interessante. Muitas vezes até pulo o que eu acho chato; além disso, estudo mais quando bate uma vontade ou curiosidade.',
        nota: 'Pular o chato e estudar por impulso de curiosidade é a definição operacional de "interessado". Item-âncora.',
      },
      {
        id: 'en3',
        pole: 'pos',
        peso: 'neutra',
        texto:
          'Na cozinha, costumo seguir as receitas ao pé da letra para não desperdiçar ingredientes. Só depois que pego a prática e entendo o processo é que me sinto seguro para fazer adaptações e inovar.',
        nota: 'Excelente item concreto, porém a justificativa econômica ("não desperdiçar") dá uma saída racional a quem não é sistemático.',
      },
      {
        id: 'en4',
        pole: 'neg',
        peso: 'neutra',
        texto:
          'Sou o tipo de pessoa que resolve as coisas na conversa. Uso um pouco de lábia improvisada para guiar as situações para um bom desfecho, fazendo com que o processo pareça totalmente espontâneo para os outros.',
        nota: 'Subiu de mid para neutra na revisão: tirar "carismo" e deixar "lábia improvisada" deslocou o item de influência social para improviso de método, que é o que o eixo mede. Ainda não é mor porque "espontâneo para os outros" é autoimagem, não comportamento.',
      },
      {
        id: 'en5',
        pole: 'neg',
        peso: 'neutra',
        texto:
          'Minha gestão financeira não é engessada: adapto meu orçamento conforme meus objetivos do momento. Se a meta for viajar, trocar de carro ou investir, reorganizo meus gastos para fazer acontecer.',
        nota: 'Boa tradução do polo para o domínio dinheiro, mas "adapto conforme objetivos" soa competente e atrai concordância indevida.',
      },
      {
        id: 'en6',
        pole: 'pos',
        peso: 'mid',
        texto:
          'Entendo que o diploma não define ninguém, mas, para construir uma carreira sólida e respeitada, considero fundamental ter certificados que comprovem a qualificação. Formações alternativas são ótimos complementos, mas não substituem a educação formal.',
        nota: 'Mede crença institucional/ideológica, não hábito pessoal. Muito sensível a classe, área e idade.',
      },
      {
        id: 'en7',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Não costumo levar lista de compras ao mercado. Prefiro passar por todos os corredores, vendo o que está faltando em casa e tendo ideias do que cozinhar ali na hora.',
        nota: 'Comportamento binário, cotidiano e neutro em desejabilidade social. Um dos itens mais limpos do teste.',
      },
    ],
  },

  {
    id: 'organizacao',
    nome: 'Organização',
    pos: {
      code: 'PRAGMÁTICO',
      desc: 'Organiza em torno do resultado. Passa por cima do protocolo e do clima do grupo quando preciso entregar.',
    },
    neg: {
      code: 'AFILIATIVO',
      desc: 'Organiza em torno do vínculo. Constrói junto, cede na decisão e preserva a permanência do grupo.',
    },
    itens: [
      {
        id: 'og1',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Embora eu respeite os protocolos da empresa, entendo que eles têm limites. Sempre que surge um impasse, não hesito em usar soluções alternativas e técnicas próprias para garantir o resultado.',
        nota: 'Núcleo do polo: resultado acima da norma acordada. Item-âncora.',
      },
      {
        id: 'og2',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Valorizo a troca com a equipe para aprimorar nossos processos; costumamos construir nossas próprias orientações a partir do que aprendemos no dia a dia.',
        nota: 'Coautoria da norma pelo grupo = definição do afiliativo. Item-âncora.',
      },
      {
        id: 'og3',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Às vezes, por buscar garantir que as coisas funcionem, posso soar um pouco ríspido(a) na maneira de tratar as pessoas, não é muito natural para mim embelezar as palavras ou fingir simpatia.',
        nota: 'Custo social assumido em nome da entrega. Alta validade porque é socialmente indesejável.',
      },
      {
        id: 'og4',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Quando saio com meus amigos e estamos demorando muito para decidir onde comer, gosto de sugerir uma votação para escolhermos. Muitas vezes sou voto vencido, mas eu topo ir mesmo assim porque o que me importa é conversar e estar com o pessoal.',
        nota: 'Isola bem o afiliativo: aceita perder a decisão para manter o vínculo. Item-âncora.',
      },
      {
        id: 'og5',
        pole: 'neg',
        peso: 'neutra',
        texto:
          'Sempre que a galera fica em dúvida sobre para onde ir ou o que assistir, costumo dizer "vocês que decidem". Tenho facilidade para me adaptar e geralmente ajudo a encontrar a alternativa que funciona para o grupo inteiro.',
        nota: 'Sobrepõe-se ao og4 e também à ORIENTAÇÃO (respondedor) — "vocês que decidem" pode ser só passividade.',
      },
      {
        id: 'og6',
        pole: 'pos',
        peso: 'neutra',
        texto:
          'O que realmente conta é o resultado final. As pessoas nem sempre percebem que, para o bem de todos, certas decisões precisam ser tomadas, mesmo que sejam impopulares no momento.',
        nota: 'É crença abstrata, não comportamento, e está formulada de um jeito que é fácil concordar ("para o bem de todos").',
      },
      {
        id: 'og7',
        pole: 'pos',
        peso: 'neutra',
        texto:
          'Nos trabalhos em grupo, sempre trago sugestões e aponto os furos nas outras ideias. Se percebo que minhas contribuições foram ignoradas e o grupo insiste nas ideias que eu julgo "burras", prefiro me afastar e fazer o projeto sozinho a gastar energia tentando convencer os outros.',
        nota: 'Ótimo comportamento-alvo, mas tão extremo que gera falsa discordância; a palavra "burras" faz a pessoa recuar por imagem.',
      },
    ],
  },

  {
    id: 'comunicacao',
    nome: 'Comunicação',
    pos: {
      code: 'INFORMATIVO',
      desc: 'Entrega contexto, rodeio e nuance. A intenção aparece pelo caminho, não no início.',
    },
    neg: {
      code: 'DIRECIONADO',
      desc: 'Entrega a intenção primeiro. Declara o ponto, o pedido e o objetivo de forma explícita.',
    },
    itens: [
      {
        id: 'cm1',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Gosto de instigar as pessoas quando estou conversando com elas; acho mais interessante fazer um "charminho" em vez de chegar já deixando claras minhas intenções.',
        nota: 'Contraste explícito com "deixar claras minhas intenções" — o item já contém a dicotomia. Item-âncora.',
      },
      {
        id: 'cm2',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Quando conheço alguém, jogo limpo desde o início. Prefiro deixar minhas intenções claras logo de cara em vez de cair no clássico "vamos ver no que dá". Se, no meio do caminho, o que eu sinto ou quero mudar, também faço questão de avisar a pessoa.',
        nota: 'Espelho do cm1. Item-âncora. Cuidado: "jogo limpo" é elogioso e puxa concordância — vale trocar por termo neutro.',
      },
      {
        id: 'cm3',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Meus amigos e colegas costumam falar que eu passo muito uma vibe "professor"; isso porque eu normalmente trago muito contexto na minha comunicação e descrevo muito as coisas de que falo.',
        nota: 'Excesso de contexto é a assinatura do informativo, e vem validado por observação externa ("costumam falar"). Item-âncora.',
      },
      {
        id: 'cm4',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Ao dar um feedback negativo, costumo abrir com elogios genéricos apenas para amaciar o terreno, pois meu objetivo principal é ir direto aos pontos que deram errado e às entregas que a pessoa deixou de cumprir.',
        nota: 'Cenário de alta pressão, onde o estilo real aparece. Item-âncora, mas é duplo: o elogio-de-fachada e a ida ao ponto poderiam ser itens separados.',
      },
      {
        id: 'cm5',
        pole: 'pos',
        peso: 'mid',
        texto:
          'Minha forma de expressar ideias combina seriedade e humor de maneira muito fluida. Por ser uma oscilação sutil, é comum que os outros não percebam a ironia e interpretem a mensagem de forma errada, dando às vezes até uma ideia errada de ser "sem noção".',
        nota: 'Mede estilo irônico, que é periférico ao eixo. Ironia também aparece em gente muito direcionada.',
      },
      {
        id: 'cm6',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Não tenho o hábito de rodear quando escrevo para alguém. Disparo o pedido ou o veredito primeiro e só explico os motivos se a pessoa me pedir esclarecimentos.',
        nota: 'Item novo, entrou no lugar do "descubro o que vou falar no mesmo instante" (que media ORIENTAÇÃO disfarçada). Descreve a ordem da mensagem — pedido antes do contexto — que é a assinatura operacional do polo. Item-âncora.',
      },
      {
        id: 'cm7',
        pole: 'pos',
        peso: 'mid',
        texto:
          'Pedir algo a alguém é um desafio para mim. Acabo me travando ao planejar como vou falar, em vez de simplesmente chegar e fazer minha solicitação, acontece que eu tenho receio de parecer rude ou grosseiro.',
        nota: 'Polaridade duvidosa: mede inibição/ansiedade social, e quem planeja muito a fala pode ser justamente direcionado. Principal candidato a reescrita.',
      },
    ],
  },

  {
    id: 'interpretacao',
    nome: 'Interpretação',
    pos: {
      code: 'MATERIALISTA',
      desc: 'Lê o mundo pelo concreto: evidência, acabamento, funcionamento, o que se pode inspecionar.',
    },
    neg: {
      code: 'IMATERIALISTA',
      desc: 'Lê o mundo pelo significado: símbolo, projeção, princípio, o que a coisa representa.',
    },
    itens: [
      {
        id: 'in1',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Tendo a ser uma pessoa mais cética, bem mais pé no chão. É muito raro eu cair nesse papinho de signo e outras coisas afins.',
        nota: 'Discrimina muito bem, mas o tom ("papinho") deprecia o polo oposto e pode inflar a discordância de quem é imaterialista.',
      },
      {
        id: 'in2',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Tenho o hábito de guardar objetos que não têm mais utilidade prática só pelo valor sentimental. Se o item me conecta a uma pessoa querida ou a um momento marcante da minha vida, eu simplesmente não consigo me desfazer dele.',
        nota: 'Item novo, entrou no lugar do "exemplo, historinha ou anedota" (que era ambíguo entre os dois polos). Coloca significado contra utilidade prática num comportamento verificável. Item-âncora.',
      },
      {
        id: 'in3',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Ao presentear meus amigos e familiares prefiro dar coisas simbólicas do que utilidades que a pessoa pode querer, quero um presente que ao bater o olho a pessoa veja a nossa amizade e o quanto ela é importante.',
        nota: 'Símbolo escolhido explicitamente contra utilidade. Item-âncora do polo.',
      },
      {
        id: 'in4',
        pole: 'pos',
        peso: 'mid',
        texto:
          'Posso até não comentar nada por educação, mas é inevitável notar o ambiente ao meu redor quando vou visitar alguém: presto muita atenção na organização e no padrão das coisas da casa, e até se o copo de água oferecido está bem lavado.',
        nota: 'Forte sobreposição com POSTURA (controlado) e com traço de higiene/ansiedade; a atenção ao padrão não é exclusiva do eixo.',
      },
      {
        id: 'in5',
        pole: 'neg',
        peso: 'neutra',
        texto:
          'Costumo ser uma pessoa precavida; é natural para mim elucubrar coisas que podem me acometer e já me preparo mentalmente para lidar com elas.',
        nota: 'Boa captura do "ensaio mental do que não existe ainda", mas se confunde com ansiedade antecipatória e com POSTURA controlado.',
      },
      {
        id: 'in6',
        pole: 'pos',
        peso: 'mor',
        texto:
          'Sou extremamente criterioso na hora de comprar roupas. Preciso testar o caimento, checar a composição do tecido, ver os cuidados de lavagem e inspecionar a qualidade das costuras. Jamais compro pela internet só porque a peça é bonitinha na foto.',
        nota: 'Subiu para mor na revisão: com a saída do item de "exemplo/anedota", o polo MATERIALISTA ficou com só uma âncora. É o item mais concreto do teste em inspeção de matéria (tecido, costura, caimento), então assume a segunda âncora.',
      },
      {
        id: 'in7',
        pole: 'neg',
        peso: 'mor',
        texto:
          'Minha alimentação não é baseada em matemática. Dispenso a contagem rígida de nutrientes; minha verdadeira prioridade é consumir aquilo que faz bem para a minha saúde e que respeita a forma como eu enxergo o mundo.',
        nota: 'Rejeita a medida em favor do princípio — exatamente o núcleo do polo. Item-âncora.',
      },
    ],
  },
];

/* Próximas trocas sugeridas (não entram no cálculo) */
const SUGESTOES = [
  {
    eixo: 'comunicacao',
    polo: 'DIRECIONADO',
    substitui: 'cm7',
    texto:
      'Em reunião, se percebo que a conversa está dando voltas, corto o assunto e pergunto na cara o que exatamente se espera de mim.',
    razao:
      'Entraria no lugar do "pedir algo é um desafio para mim", que mede inibição social e tem polaridade duvidosa — quem planeja muito a fala pode ser justamente direcionado.',
  },
  {
    eixo: 'interpretacao',
    polo: 'MATERIALISTA',
    substitui: 'in4',
    texto:
      'Quando alguém me explica uma ideia, minha primeira pergunta é sempre como aquilo funciona na prática; se não der para ver o mecanismo, perco o interesse.',
    razao:
      'Entraria no lugar do "copo de água bem lavado", que divide variância com POSTURA (controlado) e com traço de higiene. O polo MATERIALISTA ganharia uma âncora que não depende de consumo nem de limpeza.',
  },
];
