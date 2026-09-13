/* ===================================================================
   DESCRICOES.JS — texto de cada um dos 16 tipos, derivado das dicotomias.
   Cada texto percorre os seis eixos da assinatura na mesma ordem
   (Orientacao + Comunicacao, Interpretacao + Organizacao, Enfoque + Postura)
   e fecha comparando o tipo com os outros quinze da tabela.
   Cada tipo tem tres apontamentos de onde rende e tres de onde custa.
   =================================================================== */

const DESCRICOES = {
  INFJ: {
    titulo: 'O intérprete de intenção declarada',
    texto:
      'Você não abre a conversa, mas quando entra, entra pelo ponto: guarda, processa e devolve o pedido ou o veredito sem rodeio nem aquecimento. Lê as situações pelo significado — o princípio em jogo, o que a cena representa — e organiza a vida em torno do vínculo, então toda decisão passa pelo que acontece com as pessoas que ficam. No dia a dia segue o interesse do momento em vez do protocolo, e começa antes de ter o caminho pronto, corrigindo a rota em movimento. Comparado aos outros quinze, é o mais reservado dos tipos que falam por veredito: tem a frontalidade do INTJ sem a frieza dele, e a leitura afetiva do INFP sem o rodeio.',
    rende: [
      'Diz a coisa difícil sem enrolar e ainda preserva a relação.',
      'Percebe a intenção real atrás do que foi dito na reunião.',
      'Sustenta uma posição impopular quando o princípio está claro.',
    ],
    custa: [
      'O que não mobiliza afetivamente fica para trás, mesmo com prazo.',
      'Improviso e interesse juntos deixam a execução irregular.',
      'Guarda a leitura por tempo demais e só entrega o veredito no fim.',
    ],
  },
  INFP: {
    titulo: 'O narrador de mundo interno',
    texto:
      'Recebe antes de emitir e, quando emite, entrega contexto: a intenção aparece pelo caminho, quase nunca na primeira frase. Lê tudo pelo símbolo e pelo valor sentimental, e organiza a vida em torno do vínculo — cede na decisão para não romper o que já existe. Prepara antes de executar e aceita levar mais tempo até atingir o próprio padrão, mas escolhe o que fazer pelo interesse, não pela sequência prevista. Comparado aos outros quinze, é o mais difícil de apressar: divide com o ISFP o ritmo próprio e a recusa ao comando externo, mas ancora no princípio abstrato onde o ISFP ancora no concreto, e no vínculo onde o INTP ancora no resultado.',
    rende: [
      'Fidelidade ao próprio critério, sem precisar de plateia.',
      'Escreve e explica o que os outros só conseguem sentir.',
      'Aguenta ambiguidade longa sem precisar fechar a questão.',
    ],
    custa: [
      'Contexto demais antes do pedido faz a mensagem central se perder.',
      'Preparo sem pressão externa vira revisão sem fim.',
      'Cede na decisão para manter a paz e depois carrega a conta.',
    ],
  },
  ENFJ: {
    titulo: 'O articulador que declara o pedido',
    texto:
      'Puxa o movimento da interação e declara o que quer no começo — inicia e direciona na mesma frase. Lê as situações pelo significado e organiza em torno do vínculo, então o pedido quase sempre vem embalado num propósito coletivo. Prepara antes de executar e mantém padrão de qualidade, mas o que entra na agenda é o que interessa, não o que estava na lista. Comparado aos outros quinze, é o que mais mobiliza sem mandar: tem o comando frontal do ENTJ com o vínculo no lugar da entrega, e a leitura de significado do INFJ com iniciativa em vez de espera. É o único tipo afiliativo que abre a conversa já com o pedido explícito.',
    rende: [
      'Move gente sem empurrar, porque já explicitou o porquê.',
      'Nomeia em público o combinado que ninguém tinha assumido.',
      'Puxa um grupo novo do zero sem esperar autorização.',
    ],
    custa: [
      'Iniciar e controlar juntos deixam pouco espaço para a pauta alheia.',
      'O propósito coletivo às vezes cobre um pedido que é pessoal.',
      'Trocar a lista pelo que interessa desorganiza quem depende de você.',
    ],
  },
  ENFP: {
    titulo: 'O ignitor de conversa',
    texto:
      'Pensa falando: abre assunto, ocupa espaço e vai encontrando a intenção no meio do caminho, porque comunica por contexto e não por veredito. Lê o mundo pelo símbolo e organiza pelo vínculo — a rede de pessoas é a própria estrutura. Começa para descobrir, corrige a rota no percurso e escolhe o que fazer pelo interesse do momento, não pela sequência. Comparado aos outros quinze, é o mais volátil da tabela: cinco dos seis eixos apontam para abertura e a única âncora firme é o compromisso afetivo. Onde o ENTP testa hipótese para ver o que resiste, você abre possibilidade para ver quem vem junto.',
    rende: [
      'Gera possibilidade e movimento onde estava tudo parado.',
      'Conecta pessoas que não se encontrariam sem você.',
      'Recupera o ânimo do grupo depois de um tropeço.',
    ],
    custa: [
      'Sem prazo externo nem combinado explícito, o começo não vira conclusão.',
      'Cinco frentes abertas ao mesmo tempo e nenhuma fechada.',
      'A intenção demora a aparecer e o outro decide antes de entender.',
    ],
  },
  INTJ: {
    titulo: 'O planejador de resposta curta',
    texto:
      'Guarda, processa e devolve o veredito pronto: a intenção vem primeiro, sem embalagem. Lê pelo princípio e não pelo objeto, e organiza em torno do resultado — passa por cima do protocolo e do clima quando a entrega exige. Confia em método e sequência, mas começa antes de ter tudo mapeado, ajustando a rota enquanto anda. Comparado aos outros quinze, é o que mais decide sozinho: constrói o modelo inteiro por dentro e só a conclusão aparece do lado de fora. Divide com o ENTJ a frontalidade e o foco em resultado, mas sem a necessidade de abrir a conversa; divide com o INTP o método, e resolve onde o INTP ainda verifica.',
    rende: [
      'Constrói o modelo inteiro antes de qualquer um ver a primeira peça.',
      'Decide com informação incompleta sem travar.',
      'Corta o que não serve ao resultado, inclusive o próprio plano.',
    ],
    custa: [
      'O veredito sem contexto soa como sentença e o outro reage ao tom.',
      'Pouca emissão faz o grupo descobrir a decisão já tomada.',
      'Passar por cima do clima cria resistência que atrasa a entrega.',
    ],
  },
  INTP: {
    titulo: 'O verificador de premissa',
    texto:
      'Recebe muito antes de emitir e, quando emite, entrega nuance e ressalva — a intenção fica implícita na explicação. Lê pelo princípio abstrato e organiza pelo resultado, o que significa que a coerência interna pesa mais do que a concordância dos outros. Prepara para acertar, segue método e sequência, aceita levar mais tempo. Comparado aos outros quinze, é o mais interno: quatro dos seis eixos empurram para dentro e a posição só sai quando a premissa sobrevive ao teste. Onde o INTJ fecha e entrega, você mantém a questão aberta mais um turno; onde o INFP ancora no valor, você ancora na consistência do argumento.',
    rende: [
      'Encontra o furo do argumento que todo mundo aceitou sem olhar.',
      'Reconstrói um problema mal formulado antes de tentar resolvê-lo.',
      'Muda de posição quando o dado muda, sem defender orgulho.',
    ],
    custa: [
      'Método e preparo sem pressão externa viram revisão infinita.',
      'A ressalva no meio da frase faz a conclusão passar batida.',
      'Coerência interna acima do combinado trava decisões do grupo.',
    ],
  },
  ENTJ: {
    titulo: 'O executor de plano declarado',
    texto:
      'Abre a interação já com o pedido na mesa: inicia e direciona, sem rodeio e sem aquecimento. Lê pelo modelo e organiza pelo resultado, então protocolo e clima cedem quando a entrega está em jogo. Prepara antes, segue o método e mantém o padrão — a estrutura é instrumento, não formalidade. Comparado aos outros quinze, é a combinação mais frontal da tabela: cinco eixos alinhados para comando, e o peso recai sobre quem recebe, que fica sabendo rápido o que se espera. Tem o resultado do INTJ com a iniciativa que o INTJ não tem, e o comando do ESTJ aplicado a modelo em vez de procedimento.',
    rende: [
      'Transforma uma ideia em plano com responsável e prazo na mesma conversa.',
      'Assume o comando quando ninguém quer assumir.',
      'Mantém o padrão sob pressão, sem afrouxar o critério.',
    ],
    custa: [
      'Direção e controle juntos apagam objeções que às vezes estavam certas.',
      'O time entrega o combinado e para de trazer alternativa.',
      'Clima tratado como acessório cobra o preço no prazo seguinte.',
    ],
  },
  ENTP: {
    titulo: 'O testador de hipótese em voz alta',
    texto:
      'Abre o assunto e argumenta por contexto: a tese vem embrulhada em exemplo, ressalva e contraexemplo, e a intenção só fica clara no fim. Lê pelo princípio e organiza pelo resultado, então o critério é se a ideia funciona, não se agrada. Segue método e sequência, mas começa antes de ter o caminho fechado e corrige em movimento. Comparado aos outros quinze, é o que mais pensa em público: onde o INTP testa a premissa por dentro e em silêncio, você testa no meio da conversa e usa o outro como bancada. Divide com o ENFP a abertura, e substitui o vínculo pelo argumento.',
    rende: [
      'Acha a saída lateral que ninguém tinha considerado.',
      'Debate sem levar para o pessoal e muda de lado quando perde.',
      'Faz protótipo antes de a discussão terminar.',
    ],
    custa: [
      'Testar em voz alta soa como decisão tomada para quem ouve.',
      'A hipótese nova mata a anterior antes de ela ser verificada.',
      'Muito contexto antes da tese esgota a paciência da sala.',
    ],
  },
  ISTJ: {
    titulo: 'O cumpridor de combinado',
    texto:
      'Não puxa a interação, mas responde ao ponto: o pedido ou o veredito vem na frente, sem preâmbulo. Lê o mundo pelo concreto — evidência, acabamento, funcionamento — e organiza em torno do vínculo e da permanência do grupo: o combinado vale porque foi combinado. Confia em método e sequência e, ainda assim, prefere começar e ajustar no caminho a esperar o mapa completo. Comparado aos outros quinze, é o mais confiável em silêncio: pouca fala, entrega verificável. Onde o ISFJ informa e acomoda, você responde e cobra; onde o ESTJ assume o comando, você sustenta o que já foi combinado sem precisar aparecer.',
    rende: [
      'O que você diz que vai fazer, você faz — e dá para conferir.',
      'Mantém o registro e a sequência que o grupo perdeu.',
      'Responde direto quando perguntam, sem embalagem.',
    ],
    custa: [
      'Combinado mudado sem aviso vira quebra de acordo, não mudança de contexto.',
      'A resposta seca soa como reprovação.',
      'Sustenta processo que já perdeu função porque ele é o acordado.',
    ],
  },
  ISFJ: {
    titulo: 'O mantenedor atento',
    texto:
      'Recebe antes de emitir e comunica por contexto: informa, situa e o pedido vem por último — às vezes não vem. Lê pelo concreto, repara no detalhe material do ambiente e organiza pelo vínculo, cedendo na decisão para preservar o grupo. Prepara antes de executar, segue o padrão e aceita levar mais tempo. Comparado aos outros quinze, é o mais cuidadoso da tabela: sustenta a rotina dos outros e raramente cobra crédito por isso. Divide com o INFP o ritmo próprio e a recusa ao atropelo, mas ancora no que é palpável em vez do simbólico; divide com o ISTJ a confiabilidade, e acomoda onde o ISTJ cobra.',
    rende: [
      'Percebe a necessidade concreta antes de ela ser pedida.',
      'Lembra do detalhe que faz a coisa funcionar de verdade.',
      'Segura o clima do grupo em semana ruim.',
    ],
    custa: [
      'Comunicação informativa somada a afiliação quase nunca produz um "não".',
      'Acumula tarefa invisível e depois não sabe delegar.',
      'O incômodo aparece tarde, já como mágoa acumulada.',
    ],
  },
  ESTJ: {
    titulo: 'O organizador que assume o comando',
    texto:
      'Inicia a interação e declara o pedido de saída: quem faz, até quando, em que formato. Lê pelo concreto e organiza em torno do vínculo e da estrutura do grupo — o procedimento existe para o conjunto não depender de improviso. Prepara antes de executar, segue o método e mantém o padrão, aceitando levar mais tempo para entregar certo. Comparado aos outros quinze, é o mais institucional: onde o ENTJ organiza em torno do modelo e do resultado, você organiza em torno da regra que mantém o grupo de pé. Tem a iniciativa que o ISTJ não tem, aplicada ao mesmo respeito pelo combinado.',
    rende: [
      'Transforma intenção difusa em processo com dono e prazo.',
      'Organiza logística que os outros acham chata e ninguém faz.',
      'Cobra o combinado na hora, não depois.',
    ],
    custa: [
      'Direção e controle juntos deixam a sala sem espaço para discordar.',
      'Procedimento mantido por hábito engessa o que mudou.',
      'Quem trabalha diferente é lido como desorganizado.',
    ],
  },
  ESFJ: {
    titulo: 'O anfitrião que puxa o grupo',
    texto:
      'Abre a conversa, ocupa espaço e comunica por contexto: entrega o assunto, a nuance e o clima, e a intenção aparece no caminho. Lê pelo concreto — quem chegou, quem faltou, o que está faltando na mesa — e organiza em torno do vínculo. Segue método e protocolo, mas começa antes de o plano estar fechado e corrige em movimento. Comparado aos outros quinze, é o que mais mantém grupos existindo: alguém precisa marcar a data, e é você. Divide com o ENFJ a iniciativa afiliativa, sem declarar o pedido; divide com o ESTJ a estrutura, sem transformá-la em comando.',
    rende: [
      'Faz o grupo acontecer no mundo real, não só no combinado.',
      'Percebe rápido quem ficou de fora e traz de volta.',
      'Resolve o concreto da ocasião enquanto conversa.',
    ],
    custa: [
      'Iniciar por todos e comunicar por rodeio deixa o próprio pedido em último lugar.',
      'Harmonia acima da verdade adia o assunto difícil.',
      'Presença constante cansa quem precisa de silêncio.',
    ],
  },
  ISTP: {
    titulo: 'O resolvedor de problema concreto',
    texto:
      'Responde quando é acionado, e responde curto: a intenção primeiro, sem embalagem. Lê pelo mecanismo — como aquilo funciona, o que está solto — e organiza pelo resultado, cortando protocolo e clima que não ajudam a resolver. Segue o interesse do momento em vez da sequência, e começa a mexer antes de ter diagnóstico completo. Comparado aos outros quinze, é o mais econômico: nenhum eixo empurra para explicação ou cerimônia. Onde o INTP testa a premissa abstrata, você testa a peça na mão; onde o ISFP ajusta ao próprio padrão, você ajusta ao que faz a coisa voltar a funcionar.',
    rende: [
      'Diagnostica mexendo, não teorizando.',
      'Mantém a calma na hora em que o problema aparece.',
      'Improvisa solução com o que está disponível.',
    ],
    custa: [
      'Resposta curta e pouco contexto deixam o outro sem saber o que você achou.',
      'Interesse no momento derruba o que ficou pela metade.',
      'Resolve o sintoma e não volta para a causa.',
    ],
  },
  ISFP: {
    titulo: 'O artesão de padrão próprio',
    texto:
      'Espera para entrar e comunica por contexto: informa o que viu e sentiu, e o pedido raramente vem em forma de pedido. Lê pelo concreto, pela textura e pelo acabamento das coisas, e organiza pelo resultado que você mesmo reconhece como bom — nem o protocolo nem o clima do grupo mudam esse critério. Prepara para acertar, aceita levar mais tempo e escolhe o que fazer pelo interesse do momento. Comparado aos outros quinze, é o que menos depende de aprovação: onde o ISTP resolve para funcionar, você trabalha até ficar do jeito certo, e esse jeito é o seu.',
    rende: [
      'Entrega qualidade de acabamento sem ninguém precisar cobrar.',
      'Diz não ao que fere o próprio critério, mesmo sob pressão.',
      'Repara no detalhe sensorial que muda a experiência inteira.',
    ],
    custa: [
      'Padrão próprio sem prazo externo empurra a entrega indefinidamente.',
      'O incômodo fica implícito e o outro não percebe que houve um.',
      'Interesse do momento troca a prioridade combinada.',
    ],
  },
  ESTP: {
    titulo: 'O negociador de resultado imediato',
    texto:
      'Abre a interação e declara o que quer: direto, na hora, sem aquecimento. Lê pelo concreto — o que está em jogo agora, quanto custa, quem decide — e organiza pelo resultado, dispensando protocolo e clima que atrasem o fechamento. Prepara o suficiente para acertar e escolhe pelo interesse imediato em vez da sequência prevista. Comparado aos outros quinze, é o mais rápido do ponto zero ao acordo: tem a frontalidade do ENTJ aplicada à situação em vez do modelo, e a leitura prática do ISTP com a iniciativa que o ISTP não usa. Onde o ESFP anima a mesa, você fecha o negócio nela.',
    rende: [
      'Fecha na hora o que viraria três reuniões.',
      'Lê a sala e ajusta a oferta em tempo real.',
      'Age sob pressão sem precisar de plano escrito.',
    ],
    custa: [
      'Resultado imediato acima da sequência queima ponte para o prazo longo.',
      'Direto demais faz o outro sentir que foi atropelado.',
      'O que não decide hoje perde o seu interesse.',
    ],
  },
  ESFP: {
    titulo: 'O animador de presença física',
    texto:
      'Puxa a interação e comunica por contexto: conta a cena, o detalhe, o clima, e o pedido aparece depois — quando aparece. Lê pelo concreto, pelo corpo e pelo ambiente, e organiza pelo resultado prático, passando por cima do protocolo quando ele trava a hora. Segue o interesse do momento e começa antes de ter plano, corrigindo em movimento. Comparado aos outros quinze, é o mais presente no agora: onde o ENFP abre possibilidade no campo das ideias, você abre no campo do que está acontecendo na sala. Divide com o ESTP a leitura prática, e troca o fechamento pela experiência.',
    rende: [
      'Levanta o astral de um ambiente pesado em minutos.',
      'Age no concreto enquanto os outros ainda discutem.',
      'Faz as pessoas se sentirem vistas na hora.',
    ],
    custa: [
      'Plano nenhum somado a interesse volátil deixa rastro de pendência.',
      'O pedido não declarado se perde no meio da história.',
      'Compromisso longe no calendário compete mal com o agora.',
    ],
  },
};

/* ===================================================================
   TEXTO DE TEMPERAMENTO — aproximadamente 150 palavras cada, com os
   quatro tipos que pertencem ao grupo.
   =================================================================== */

/* Textos de grupo: temperamento (Interpretacao x Organizacao) e
   expressao (Orientacao x Comunicacao). Cerca de 100 palavras cada,
   escritos para quem nunca viu o modelo. */
const DESCRICOES_TEMPERAMENTO = {
  SJ: {
    texto:
      'Se alguma coisa funciona há anos, provavelmente tem um Sentinela cuidando dela. São as pessoas que lembram o combinado, guardam o documento, sabem onde fica a chave e chegam na hora marcada. Você as encontra na coordenação da escola, no financeiro, na enfermagem, no cartório, na cozinha da família e em qualquer lugar onde a bola não pode cair. Confiam no que já deu certo e desconfiam de mudança sem motivo declarado — não por medo, mas porque alguém vai ter que responder pelo estrago. São a parte do mundo que sustenta rotina, registro e continuidade. Sem elas, todo grupo recomeçaria do zero toda semana.',
  },
  SP: {
    texto:
      'São as pessoas que resolvem agora. Enquanto o grupo ainda discute o plano, o Artesão já abriu a tampa, testou e descobriu o que estava travando. Vivem no concreto: a ferramenta, o corpo, o material, o problema que está na mesa. Você os encontra na oficina, na obra, na cozinha profissional, no palco, no esporte, na emergência e em toda profissão onde demorar custa mais caro que errar. Detestam reunião longa, improvisam com o que tem à mão e ficam estranhamente calmos quando todo mundo entra em pânico. O preço é a continuidade: o que perdeu graça fica pela metade.',
  },
  NF: {
    texto:
      'São as pessoas que percebem o clima antes de alguém falar. Reparam em quem ficou de fora, notam o que a frase queria dizer e conseguem nomear o incômodo que o grupo ainda não disse em voz alta. Você as encontra na sala de aula, na terapia, no RH, na arte, na igreja, na causa do bairro — onde o assunto é gente e sentido. Mobilizam sem mandar: as pessoas topam porque acreditaram, não porque foi ordem. Levam a sério o que significa algo e se cansam do que é só procedimento. O preço é o prazo sem afeto envolvido, que fica sempre para depois.',
  },
  NT: {
    texto:
      'São as pessoas que querem entender o mecanismo antes de aceitar a regra. Perguntam por quê, acham a falha do raciocínio e ficam visivelmente desconfortáveis com resposta pronta. Você as encontra na engenharia, no direito, na pesquisa, no diagnóstico, na estratégia, na programação — onde o problema é difícil e a opinião do chefe não resolve sozinha. Constroem um modelo da coisa e depois cobram que a realidade o siga, o que as torna ótimas em planejar e impacientes com o que existe apenas por costume. O preço é a frieza aparente: a análise vem antes do cuidado, e às vezes o outro só queria ser ouvido.',
  },
};

const DESCRICOES_EXPRESSAO = {
  DIR: {
    texto:
      'São os que assumem. Entram na conversa primeiro, preparam antes e dizem o que querem sem embrulhar em rodeio. Em qualquer grupo, é para eles que a turma olha quando é preciso decidir e ninguém decide. Ocupam naturalmente a direção, a gerência, a coordenação, o comando de equipe, a chefia de obra e a frente da sala — posições em que alguém tem que responder pelo resultado. Chegam com plano e prazo, cobram entrega e não têm dificuldade em dizer não. O incômodo que causam é igualmente previsível: soam duros, atropelam quem precisa de tempo e ouvem menos do que deveriam antes de fechar.',
  },
  ANI: {
    texto:
      'São os que puxam o ambiente. Chegam falando, começam antes de ter o caminho pronto e explicam o contexto inteiro no meio do percurso. Em qualquer grupo, é quem quebra o silêncio e faz a coisa sair do papel. Você os encontra em vendas, marketing, eventos, atendimento, comunicação, ensino e na liderança informal de time — posições em que convencer e manter as pessoas juntas vale mais que o procedimento. Improvisam bem, aguentam bagunça e transformam contato em oportunidade. O preço é a regularidade: abrem muitas frentes, deixam pontas soltas e às vezes contam tanto contexto que o pedido nunca fica claro.',
  },
  RES: {
    texto:
      'São os que não fazem barulho e resolvem. Ficam quietos, observam e, quando entram, entram direto pelo ponto — sem aquecimento e sem preâmbulo. Você os encontra na análise, na manutenção, na cirurgia, na perícia, no jurídico, na segurança e no suporte técnico: funções em que se chama alguém justamente quando o problema já estourou. Agem rápido no concreto e falam pouco, o que faz muita gente confundir o silêncio deles com concordância. O preço é a frieza percebida: guardam a leitura por tempo demais e entregam o veredito de uma vez, e o outro recebe aquilo como se viesse do nada.',
  },
  REG: {
    texto:
      'São os que mantêm o padrão. Não disputam espaço na conversa, preparam antes de agir e, quando falam, explicam o contexto todo em vez de simplesmente dar a ordem. Você os encontra na administração, na contabilidade, na biblioteca, no laboratório, na revisão, na docência e na enfermagem: funções em que o cuidado com o detalhe é o próprio serviço. São a régua do grupo — lembram o combinado, revisam o que os outros passaram por cima e entregam com acabamento. O preço é a demora: por cuidar demais do detalhe e evitar impor a própria posição, perdem a janela em que bastava decidir.',
  },
};

/* Caminho da ilustracao de cada tipo. */
function imagemDoTipo(sigla) {
  return `img/${sigla}.jpg`;
}
