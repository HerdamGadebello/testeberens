/* =========================================================================
   TIPOLOGIA — 16 tipos, 4 temperamentos
   -------------------------------------------------------------------------
   A tabela e um LOOKUP: cada tipo e uma assinatura de 6 polos.
   Ninguem precisa bater 6/6 — o tipo e escolhido pela melhor aproximacao,
   respeitando a ordem de prioridade dos eixos.
   ========================================================================= */

const TEMPERAMENTOS = {
  SJ: {
    nome: 'Sentinelas',
    sigla: 'SJ',
    desc: 'Materialista + Afiliativo + Sistemático. Sustentam o que já existe: a estrutura, o combinado, o grupo.',
  },
  SP: {
    nome: 'Artesãos',
    sigla: 'SP',
    desc: 'Materialista + Pragmático + Interessado. Operam sobre o concreto agora, com a ferramenta que estiver à mão.',
  },
  NF: {
    nome: 'Catalisadores',
    sigla: 'NF',
    desc: 'Imaterialista + Afiliativo + Interessado. Movem pessoas por significado, não por procedimento.',
  },
  NT: {
    nome: 'Teóricos',
    sigla: 'NT',
    desc: 'Imaterialista + Pragmático + Sistemático. Constroem o modelo e depois cobram que a realidade o siga.',
  },
};

/* EXPRESSAO = Orientacao x Comunicacao (e a Postura, que a tabela deriva
   desse mesmo par). Cada expressao reune quatro tipos, um de cada
   temperamento. */
const EXPRESSOES = {
  DIR: {
    nome: 'Diretores',
    sigla: 'DIR',
    orientacao: 'INICIADOR',
    postura: 'CONTROLADO',
    comunicacao: 'DIRECIONADO',
    desc: 'Iniciador + Controlado + Direcionado. Puxam o movimento, preparam antes e dizem o que querem.',
  },
  ANI: {
    nome: 'Animadores',
    sigla: 'ANI',
    orientacao: 'INICIADOR',
    postura: 'MOVIMENTADO',
    comunicacao: 'INFORMATIVO',
    desc: 'Iniciador + Movimentado + Informativo. Puxam o movimento, começam logo e contam o contexto.',
  },
  RES: {
    nome: 'Resolutores',
    sigla: 'RES',
    orientacao: 'RESPONDEDOR',
    postura: 'MOVIMENTADO',
    comunicacao: 'DIRECIONADO',
    desc: 'Respondedor + Movimentado + Direcionado. Esperam a vez, agem rápido e falam pelo ponto.',
  },
  REG: {
    nome: 'Reguladores',
    sigla: 'REG',
    orientacao: 'RESPONDEDOR',
    postura: 'CONTROLADO',
    comunicacao: 'INFORMATIVO',
    desc: 'Respondedor + Controlado + Informativo. Observam, preparam e explicam o contexto.',
  },
};

function siglaExpressao(obs) {
  const ini = obs.orientacao === 'INICIADOR';
  const dir = obs.comunicacao === 'DIRECIONADO';
  if (ini) return dir ? 'DIR' : 'ANI';
  return dir ? 'RES' : 'REG';
}

/* Ordem de prioridade declarada e pesos de decisao.
   Pesos em potencias de 2: um eixo vence a soma de todos os de baixo,
   desde que a pessoa esteja de fato definida nele. */
const CALIBRAGENS = {
  temperamento: {
    id: 'temperamento',
    nome: 'Calibragem por Temperamento',
    curto: 'por Temperamento',
    detalhe: 'Interpretação › Organização › Enfoque › Orientação › Postura › Comunicação',
    ordem: ['interpretacao', 'organizacao', 'enfoque', 'orientacao', 'postura', 'comunicacao'],
    frases: [
      'Esta leitura decide primeiro o seu temperamento e só depois o tipo: Interpretação e Organização mandam, porque é o cruzamento delas que forma Sentinelas, Artesãos, Catalisadores e Teóricos.',
      'Os eixos de contato com as pessoas — Orientação, Postura e Comunicação — entram por último, como ajuste fino dentro do temperamento já definido.',
    ],
  },
  universal: {
    id: 'universal',
    nome: 'Calibragem Universal',
    curto: 'Universal',
    detalhe: 'Harmoniza quatro listas · Orientação › Interpretação › Organização › Comunicação › Enfoque › Postura',
    ordem: null,
    frases: [
      'A leitura analisa os tipos prováveis por meio de quatro listas distintas: polos crus, ordem universal, com o maior peso na avaliação, temperamento e expressão. Essas listas são comparadas para encontrar o tipo com melhor harmonia geral, penalizando discrepâncias entre as classificações.',
    ],
  },
  expressao: {
    id: 'expressao',
    nome: 'Calibragem por Expressão',
    curto: 'por Expressão',
    detalhe: 'Orientação › Postura › Comunicação › Organização › Enfoque › Interpretação',
    ordem: ['orientacao', 'postura', 'comunicacao', 'organizacao', 'enfoque', 'interpretacao'],
    frases: [
      'Esta leitura decide primeiro a sua expressão e só depois o tipo: Orientação, Postura e Comunicação mandam, porque é o cruzamento delas que forma Diretores, Animadores, Resolutores e Reguladores.',
      'Como a expressão é o que aparece de fora, esta é a leitura mais próxima da impressão que você causa — e a que mais pode divergir de como você se sente por dentro.',
    ],
  },
};
/* ordem de exibicao da pilula: a Universal fica no centro */
const CALIBRAGEM_PILULA = ['temperamento', 'universal', 'expressao'];
const PESOS_PRIORIDADE = [32, 16, 8, 4, 2, 1];

/* Ordem de preferencia da Calibragem Universal e pesos de cada uma das quatro
   listas que ela contrapoe. A lista da ordem universal conta dobrado. */
const ORDEM_UNIVERSAL = [
  'orientacao',
  'interpretacao',
  'organizacao',
  'comunicacao',
  'enfoque',
  'postura',
];
const LISTAS_UNIVERSAL = [
  { id: 'polos', nome: 'Polos individuais', peso: 1, detalhe: 'cada eixo pesa o quanto você o marcou' },
  { id: 'universal', nome: 'Ordem universal', peso: 2, detalhe: 'Orientação › Interpretação › Organização › Comunicação › Enfoque › Postura' },
  { id: 'temperamento', nome: 'Leitura por temperamento', peso: 1, detalhe: 'Interpretação › Organização › Enfoque › Orientação › Postura › Comunicação' },
  { id: 'expressao', nome: 'Leitura por expressão', peso: 1, detalhe: 'Orientação › Postura › Comunicação › Organização › Enfoque › Interpretação' },
];
/* desconto aplicado a quem harmoniza mal: distancia entre a melhor e a pior
   posicao do tipo nas quatro listas */
const PENA_DESARMONIA = 0.18;

/* Assinaturas confirmadas pelo autor do instrumento (todos os tipos E sao
   INICIADOR). Cada linha e um lookup de 6 polos. */
const TIPOS = [
  { tipo: 'INFJ', temp: 'NF', orientacao: 'RESPONDEDOR', organizacao: 'AFILIATIVO', enfoque: 'INTERESSADO', interpretacao: 'IMATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'INFP', temp: 'NF', orientacao: 'RESPONDEDOR', organizacao: 'AFILIATIVO', enfoque: 'INTERESSADO', interpretacao: 'IMATERIALISTA', postura: 'CONTROLADO', comunicacao: 'INFORMATIVO' },
  { tipo: 'ENFJ', temp: 'NF', orientacao: 'INICIADOR', organizacao: 'AFILIATIVO', enfoque: 'INTERESSADO', interpretacao: 'IMATERIALISTA', postura: 'CONTROLADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'ENFP', temp: 'NF', orientacao: 'INICIADOR', organizacao: 'AFILIATIVO', enfoque: 'INTERESSADO', interpretacao: 'IMATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'INFORMATIVO' },

  { tipo: 'INTJ', temp: 'NT', orientacao: 'RESPONDEDOR', organizacao: 'PRAGMÁTICO', enfoque: 'SISTEMÁTICO', interpretacao: 'IMATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'INTP', temp: 'NT', orientacao: 'RESPONDEDOR', organizacao: 'PRAGMÁTICO', enfoque: 'SISTEMÁTICO', interpretacao: 'IMATERIALISTA', postura: 'CONTROLADO', comunicacao: 'INFORMATIVO' },
  { tipo: 'ENTJ', temp: 'NT', orientacao: 'INICIADOR', organizacao: 'PRAGMÁTICO', enfoque: 'SISTEMÁTICO', interpretacao: 'IMATERIALISTA', postura: 'CONTROLADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'ENTP', temp: 'NT', orientacao: 'INICIADOR', organizacao: 'PRAGMÁTICO', enfoque: 'SISTEMÁTICO', interpretacao: 'IMATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'INFORMATIVO' },

  { tipo: 'ISTJ', temp: 'SJ', orientacao: 'RESPONDEDOR', organizacao: 'AFILIATIVO', enfoque: 'SISTEMÁTICO', interpretacao: 'MATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'ISFJ', temp: 'SJ', orientacao: 'RESPONDEDOR', organizacao: 'AFILIATIVO', enfoque: 'SISTEMÁTICO', interpretacao: 'MATERIALISTA', postura: 'CONTROLADO', comunicacao: 'INFORMATIVO' },
  { tipo: 'ESTJ', temp: 'SJ', orientacao: 'INICIADOR', organizacao: 'AFILIATIVO', enfoque: 'SISTEMÁTICO', interpretacao: 'MATERIALISTA', postura: 'CONTROLADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'ESFJ', temp: 'SJ', orientacao: 'INICIADOR', organizacao: 'AFILIATIVO', enfoque: 'SISTEMÁTICO', interpretacao: 'MATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'INFORMATIVO' },

  { tipo: 'ISTP', temp: 'SP', orientacao: 'RESPONDEDOR', organizacao: 'PRAGMÁTICO', enfoque: 'INTERESSADO', interpretacao: 'MATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'ISFP', temp: 'SP', orientacao: 'RESPONDEDOR', organizacao: 'PRAGMÁTICO', enfoque: 'INTERESSADO', interpretacao: 'MATERIALISTA', postura: 'CONTROLADO', comunicacao: 'INFORMATIVO' },
  { tipo: 'ESTP', temp: 'SP', orientacao: 'INICIADOR', organizacao: 'PRAGMÁTICO', enfoque: 'INTERESSADO', interpretacao: 'MATERIALISTA', postura: 'CONTROLADO', comunicacao: 'DIRECIONADO' },
  { tipo: 'ESFP', temp: 'SP', orientacao: 'INICIADOR', organizacao: 'PRAGMÁTICO', enfoque: 'INTERESSADO', interpretacao: 'MATERIALISTA', postura: 'MOVIMENTADO', comunicacao: 'INFORMATIVO' },
];

/* ---------- utilidades ---------- */

function eixoPorId(id) {
  return EIXOS.find((e) => e.id === id);
}

/* Quanto (em fracao de -1 a +1) a pessoa esta alinhada ao polo esperado.
   +1 = 100% naquele polo, 0 = empate, -1 = 100% no polo oposto. */
function alinhamento(resultadoEixo, poloEsperado) {
  const e = resultadoEixo.eixo;
  const pct = poloEsperado === e.pos.code ? resultadoEixo.pctPos : resultadoEixo.pctNeg;
  return (pct - 50) / 50;
}

/* Temperamento = Interpretacao x Organizacao. Vale para os 16 tipos da tabela. */
function siglaTemperamento(obs) {
  const s = obs.interpretacao === 'MATERIALISTA';
  const afil = obs.organizacao === 'AFILIATIVO';
  if (s) return afil ? 'SJ' : 'SP';
  return afil ? 'NF' : 'NT';
}

function assinaturaObservada(eixos) {
  const a = {};
  eixos.forEach((r) => {
    a[r.eixo.id] = r.dominante === 'pos' ? r.eixo.pos.code : r.eixo.neg.code;
  });
  return a;
}

/* ---------- eixos derivaveis: previsao x resposta ----------
   A tabela dos 16 tipos tem 6 colunas e apenas 4 graus de liberdade: Enfoque e
   Postura sao previsiveis a partir dos outros quatro eixos em TODAS as 16
   linhas (verificado). Logo isso nao e um teste de erro — e uma previsao que
   acerta ou nao. O tipo atribuido satisfaz as duas regras por construcao;
   quem pode divergir sao os POLOS CRUS da pessoa.
   ========================================================================= */

/* limiares vindos de FAIXAS (engine.js) — fonte unica */
const LIMIAR_INDIFERENCIADO = FAIXAS[0].max; // < 0,07 -> empate pratico
const LIMIAR_CLARO = FAIXAS[1].max; // >= 0,2 -> tendencia clara

const DERIVAVEIS = [
  {
    eixoId: 'enfoque',
    deps: ['organizacao', 'interpretacao'],
    regra:
      'Nos 16 tipos, SISTEMÁTICO aparece exatamente nos cruzamentos MATERIALISTA+AFILIATIVO (Sentinelas) e IMATERIALISTA+PRAGMÁTICO (Teóricos); os outros dois cruzamentos dão INTERESSADO.',
    prever: (a) =>
      (a.interpretacao === 'MATERIALISTA') === (a.organizacao === 'AFILIATIVO') ? 'SISTEMÁTICO' : 'INTERESSADO',
  },
  {
    eixoId: 'postura',
    deps: ['orientacao', 'comunicacao'],
    regra:
      'Em todos os 16 tipos, MOVIMENTADO aparece quando RESPONDEDOR+DIRECIONADO ou INICIADOR+INFORMATIVO; os outros dois cruzamentos dão CONTROLADO.',
    prever: (a) =>
      (a.orientacao === 'RESPONDEDOR' && a.comunicacao === 'DIRECIONADO') ||
      (a.orientacao === 'INICIADOR' && a.comunicacao === 'INFORMATIVO')
        ? 'MOVIMENTADO'
        : 'CONTROLADO',
  },
];

/* Quatro estados = veredito x firmeza. "Diverge fragil" e ruido de medicao e
   NAO deve ser pintado de vermelho; so "diverge firme" merece alarme. */
const VEREDITOS = {
  confirma: {
    id: 'confirma',
    rotulo: 'confirma a regra',
    tom: 'pos',
    resumo: 'A regra se sustenta no seu caso, e com eixos firmes o bastante para isso significar algo.',
  },
  'confirma-fraco': {
    id: 'confirma-fraco',
    rotulo: 'confirma sem força',
    tom: 'neutro',
    resumo:
      'A previsão bateu, mas ao menos um dos eixos envolvidos ficou sem tendência clara — então a coincidência tem pouco valor informativo.',
  },
  'diverge-fragil': {
    id: 'diverge-fragil',
    rotulo: 'divergência frágil',
    tom: 'neutro',
    resumo:
      'A previsão caiu no lado oposto, mas por causa de um eixo quase empatado. É ruído de medição, não contradição: esse eixo troca de lado entre duas aplicações do teste.',
  },
  'diverge-firme': {
    id: 'diverge-firme',
    rotulo: 'divergência firme',
    tom: 'neg',
    resumo:
      'A previsão caiu no lado oposto com todos os eixos envolvidos bem definidos. Ou você é exceção real à tabela, ou algum item está mal calibrado.',
  },
};

function pctDoPolo(r, polo) {
  return polo === r.eixo.pos.code ? r.pctPos : r.pctNeg;
}

function pctTxt(n) {
  return `${n.toFixed(1).replace('.', ',')}%`;
}

function checagens(obs, porId, tipoAtribuido) {
  return DERIVAVEIS.map((d) => {
    const previsto = d.prever(obs);
    const observado = obs[d.eixoId];
    const bate = observado === previsto;

    const descreve = (id) => {
      const r = porId[id];
      return {
        eixoId: id,
        eixoNome: r.eixo.nome,
        polo: obs[id],
        pct: pctDoPolo(r, obs[id]),
        intensidade: r.intensidade,
        faixa: r.faixa.rotulo,
        firme: r.intensidade >= LIMIAR_CLARO,
        indiferenciado: r.intensidade < LIMIAR_INDIFERENCIADO,
      };
    };

    const entradas = d.deps.map(descreve);
    const alvo = descreve(d.eixoId);
    const envolvidos = entradas.concat([alvo]);
    const frouxos = envolvidos.filter((e) => !e.firme).sort((a, b) => a.intensidade - b.intensidade);

    const veredito = bate
      ? frouxos.length
        ? VEREDITOS['confirma-fraco']
        : VEREDITOS.confirma
      : frouxos.length
        ? VEREDITOS['diverge-fragil']
        : VEREDITOS['diverge-firme'];

    const poloDoTipo = tipoAtribuido ? tipoAtribuido[d.eixoId] : null;

    return {
      eixoId: d.eixoId,
      eixoNome: alvo.eixoNome,
      nome: `${alvo.eixoNome} × (${entradas.map((e) => e.eixoNome).join(' + ')})`,
      regra: d.regra,
      entradas,
      alvo,
      previsto,
      observado,
      pctObservado: alvo.pct,
      bate,
      veredito,
      eloFraco: frouxos[0] || null,
      /* a linha do tipo atribuido SEMPRE satisfaz a regra — explicito para o
         template poder afirmar isso em vez de deixar o leitor supor o contrario */
      tipoAtribuido: poloDoTipo,
      tipoAtribuidoSatisfaz: tipoAtribuido ? d.prever(tipoAtribuido) === poloDoTipo : true,
      /* compatibilidade com codigo antigo */
      esperado: previsto,
      ok: bate,
    };
  });
}

/* ---------- sintese em prosa do painel de reconciliacao ----------
   Usada identicamente pela tela e pelo PDF, para os dois nunca divergirem. */
function frasesReconciliacao(tip) {
  const v = tip.vencedor;
  const chk = tip.checagens;
  const divergem = v.linhas.filter((l) => !l.bate);
  const batem = v.linhas.length - divergem.length;
  const fr = [];

  fr.push(
    `Dos seis eixos, quatro são livres e dois — ${chk
      .map((c) => c.eixoNome)
      .join(' e ')} — são deriváveis dos outros. O tipo atribuído (${v.tipo}) satisfaz as duas regras de derivação, como todas as 16 linhas da tabela. O que segue compara as regras e a linha do tipo com as suas respostas cruas, não com o seu tipo.`,
  );

  if (!divergem.length) {
    fr.push(`As suas seis respostas coincidem com a linha de ${v.tipo}.`);
  } else {
    const descrever = (ls) =>
      ls
        .map((l) => `${l.eixoNome} (${l.observado}, ${pctTxt(l.pctObservado)}, ${l.faixa.toLowerCase()})`)
        .join(' e ');
    const soltos = divergem.filter((l) => l.indefinido);
    const duros = divergem.filter((l) => !l.indefinido);
    const partes = [`${batem} das suas seis respostas coincidem com a linha de ${v.tipo}.`];
    if (soltos.length) {
      partes.push(
        `${soltos.length === 1 ? 'Um eixo ficou' : `${soltos.length} eixos ficaram`} indiferenciado${
          soltos.length === 1 ? '' : 's'
        } — os dois polos praticamente empatados, sem lado definido a comparar: ${descrever(soltos)}.`,
      );
    }
    if (duros.length) {
      partes.push(
        `${duros.length === 1 ? 'A diferença de fato está' : 'As diferenças de fato estão'} em ${descrever(
          duros,
        )}, com lado definido e contrário ao da linha do tipo.`,
      );
    }
    fr.push(partes.join(' '));
  }

  const fragil = chk.filter((c) => c.veredito.id === 'diverge-fragil');
  const firme = chk.filter((c) => c.veredito.id === 'diverge-firme');

  fragil.forEach((c) => {
    fr.push(
      `A previsão de ${c.eixoNome} caiu no lado oposto ao que você respondeu, e o elo fraco é ${
        c.eloFraco.eixoNome
      }, em ${pctTxt(c.eloFraco.pct)} — ${c.eloFraco.faixa.toLowerCase()}. Um eixo nesse estado troca de lado entre duas aplicações do teste, e foi ele que virou a previsão. Nada aqui contradiz ${
        v.tipo
      }: indica que o eixo ${c.eloFraco.eixoNome} não foi medido com firmeza suficiente e vale reaplicar.`,
    );
  });

  firme.forEach((c) => {
    fr.push(
      `A previsão de ${c.eixoNome} caiu no lado oposto com todos os eixos envolvidos bem definidos: ${c.entradas
        .map((e) => `${e.eixoNome} ${e.polo} (${pctTxt(e.pct)})`)
        .join(' e ')} preveem ${c.previsto}, e você respondeu ${c.observado} com ${pctTxt(
        c.pctObservado,
      )}. Esta é a divergência que vale investigar: ou a sua combinação é uma das 48 que a tabela não cobre, ou algum item desses eixos está medindo outra coisa.`,
    );
  });

  return fr;
}

/* ---------- motor de tipagem ---------- */

function rankear(eixos, porId, ordem, pesos) {
  const somaPesos = pesos.reduce((a, b) => a + b, 0) || 1;
  return TIPOS.map((t) => {
    let bruto = 0;
    const linhas = ordem.map((eixoId, i) => {
      const peso = pesos[i];
      const esperado = t[eixoId];
      const r = porId[eixoId];
      const a = alinhamento(r, esperado);
      bruto += peso * a;
      const observado = r.dominante === 'pos' ? r.eixo.pos.code : r.eixo.neg.code;
      return {
        eixoId,
        eixoNome: r.eixo.nome,
        prioridade: i + 1,
        peso,
        esperado,
        observado,
        pctEsperado: esperado === r.eixo.pos.code ? r.pctPos : r.pctNeg,
        pctObservado: observado === r.eixo.pos.code ? r.pctPos : r.pctNeg,
        intensidade: r.intensidade,
        faixa: r.faixa.rotulo,
        firme: r.intensidade >= LIMIAR_CLARO,
        alinhamento: a,
        bate: esperado === observado,
        indefinido: r.intensidade < LIMIAR_INDIFERENCIADO,
      };
    });
    return {
      ...t,
      linhas,
      bruto,
      somaPesos,
      compat: bruto / somaPesos,
      ajuste: ((bruto / somaPesos + 1) / 2) * 100,
      batem: linhas.filter((l) => l.bate).length,
    };
  }).sort((a, b) => b.bruto - a.bruto);
}

/* ---------- Calibragem Universal: contraposicao de quatro listas ----------
   1. polos individuais  — cada eixo pesa a propria intensidade da resposta
   2. ordem universal    — ORDEM_UNIVERSAL com os pesos de prioridade
   3. leitura por temperamento
   4. leitura por expressao
   Cada lista da uma posicao (Borda) e uma compatibilidade para os 16 tipos.
   O tipo final e o que maximiza a media ponderada das quatro, com desconto
   para quem discorda muito de si mesmo entre as listas. */
function harmonizarUniversal(eixos, porId) {
  const ordemPolos = eixos
    .slice()
    .sort((a, b) => b.intensidade - a.intensidade)
    .map((r) => r.eixo.id);
  const pesosPolos = ordemPolos.map((id) => Math.max(porId[id].intensidade, 0.01));

  const brutas = {
    polos: rankear(eixos, porId, ordemPolos, pesosPolos),
    universal: rankear(eixos, porId, ORDEM_UNIVERSAL, PESOS_PRIORIDADE),
    temperamento: rankear(eixos, porId, CALIBRAGENS.temperamento.ordem, PESOS_PRIORIDADE),
    expressao: rankear(eixos, porId, CALIBRAGENS.expressao.ordem, PESOS_PRIORIDADE),
  };

  const n = TIPOS.length;
  const pos = {};
  const fit = {};
  Object.keys(brutas).forEach((k) => {
    pos[k] = {};
    fit[k] = {};
    brutas[k].forEach((t, i) => {
      pos[k][t.tipo] = i + 1;
      fit[k][t.tipo] = (t.compat + 1) / 2;
    });
  });

  const pesoTotal = LISTAS_UNIVERSAL.reduce((a, l) => a + l.peso, 0);
  const base = brutas.universal;
  const somaPesos = PESOS_PRIORIDADE.reduce((a, b) => a + b, 0);

  const ranking = base
    .map((t) => {
      let soma = 0;
      const posicoes = [];
      LISTAS_UNIVERSAL.forEach((l) => {
        const p = pos[l.id][t.tipo];
        posicoes.push(p);
        const borda = (n - p) / (n - 1);
        soma += l.peso * (0.5 * borda + 0.5 * fit[l.id][t.tipo]);
      });
      const media = soma / pesoTotal;
      const desarmonia = (Math.max(...posicoes) - Math.min(...posicoes)) / (n - 1);
      const score = media - PENA_DESARMONIA * desarmonia;
      const compat = score * 2 - 1;
      return {
        ...t,
        posicoes,
        desarmonia,
        harmonia: score,
        compat,
        ajuste: score * 100,
        bruto: compat * somaPesos,
      };
    })
    .sort((a, b) => b.harmonia - a.harmonia || b.compat - a.compat);

  const vencedor = ranking[0];
  const listas = LISTAS_UNIVERSAL.map((l, i) => ({
    id: l.id,
    nome: l.nome,
    detalhe: l.detalhe,
    peso: l.peso,
    topo: brutas[l.id][0].tipo,
    posicaoDoVencedor: vencedor.posicoes[i],
  }));

  return {
    ranking,
    listas,
    concordancia: listas.filter((l) => l.topo === vencedor.tipo).length,
    totalListas: listas.length,
  };
}

function tiparPerfil(eixos, opcoes) {
  const cfg = Object.assign({ calibragem: 'universal' }, opcoes || {});
  const cal = CALIBRAGENS[cfg.calibragem] || CALIBRAGENS.universal;
  const porId = {};
  eixos.forEach((r) => (porId[r.eixo.id] = r));

  let ranking;
  let universal = null;
  if (cal.ordem) {
    ranking = rankear(eixos, porId, cal.ordem, PESOS_PRIORIDADE);
  } else {
    universal = harmonizarUniversal(eixos, porId);
    ranking = universal.ranking;
  }

  const ordem = cal.ordem || ORDEM_UNIVERSAL;
  const obs = assinaturaObservada(eixos);
  const exato = TIPOS.find((t) => ordem.every((id) => t[id] === obs[id]));

  const vencedor = ranking[0];
  const margem = vencedor.bruto - ranking[1].bruto;
  const chk = checagens(obs, porId, vencedor);

  return {
    vencedor,
    ranking,
    universal,
    exato: exato || null,
    obs,
    margem,
    /* temperamento sai de Interpretacao x Organizacao, independente do tipo escolhido */
    temperamento: TEMPERAMENTOS[siglaTemperamento(obs)],
    temperamentoDoTipo: TEMPERAMENTOS[vencedor.temp],
    expressao: EXPRESSOES[siglaExpressao(obs)],
    expressaoDoTipo: EXPRESSOES[siglaExpressao(vencedor)],
    checagens: chk,
    calibragem: cal,
    ordemUsada: {
      nome: cal.nome,
      detalhe: cal.detalhe,
    },
    get reconciliacao() {
      return frasesReconciliacao(this);
    },
  };
}
