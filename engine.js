/* =========================================================================
   MOTOR DE PONTUACAO
   -------------------------------------------------------------------------
   1. Cada bolinha vale: B3=-3 B2=-2 B1=-1 | A1=+1 A2=+2 A3=+3
      Normalizado: r = valor / 3  ->  r pertence a [-1, +1]
   2. Cada item tem peso w (mid 0.5 | neutra 1.0 | mor 1.5)
   3. Media ponderada SEPARADA por polo (corrige o desbalanceamento
      de quantidade de itens entre os dois lados e a aquiescencia):
         M+ = SOMA(w*r) dos itens do polo POS / SOMA(w) desses itens
         M- = SOMA(w*r) dos itens do polo NEG / SOMA(w) desses itens
   4. Score do eixo:  X = (M+ - M-) / 2       -> X pertence a [-1, +1]
   5. Porcentagem:    %POS = (X + 1) / 2 * 100    %NEG = 100 - %POS
   6. Extras de qualidade:
         intensidade  = |X|            (quao definido e o perfil)
         aquiescencia = (M+ + M-) / 2  (tendencia a concordar com tudo)
   ========================================================================= */

const FAIXAS = [
  { max: 0.07, rotulo: 'Indiferenciado', nota: 'Os dois polos aparecem quase igualmente. Trate como não definido.' },
  { max: 0.2, rotulo: 'Leve', nota: 'Tendência discreta. Pode mudar de lado em outra aplicação.' },
  { max: 0.45, rotulo: 'Moderado', nota: 'Tendência clara e estável.' },
  { max: 0.7, rotulo: 'Marcante', nota: 'Polo dominante, aparece na maioria dos contextos.' },
  { max: 1.01, rotulo: 'Extremo', nota: 'Polo quase puro. Verifique se não houve resposta em bloco.' },
];

function pesoNominal(item, overrides) {
  const chave = (overrides && overrides[item.id]) || item.peso;
  return { chave, valor: PESOS[chave] };
}

function faixaDe(intensidade) {
  return FAIXAS.find((f) => intensidade < f.max) || FAIXAS[FAIXAS.length - 1];
}

function calcularEixo(eixo, respostas, overrides) {
  let sp = 0,
    wp = 0,
    sn = 0,
    wn = 0;
  const detalhes = [];

  eixo.itens.forEach((item) => {
    const valor = respostas[item.id];
    const { chave, valor: w } = pesoNominal(item, overrides);
    if (valor === undefined || valor === null) {
      detalhes.push({ item, peso: chave, w, valor: null, r: 0, empurra: null, forca: 0 });
      return;
    }
    const r = valor / 3;
    if (item.pole === 'pos') {
      sp += w * r;
      wp += w;
    } else {
      sn += w * r;
      wn += w;
    }
    // para qual polo do eixo este item empurrou, e com que força relativa
    const sinal = item.pole === 'pos' ? 1 : -1;
    detalhes.push({
      item,
      peso: chave,
      w,
      valor,
      r,
      empurra: sinal * r >= 0 ? 'pos' : 'neg',
      forca: Math.abs(r) * w,
    });
  });

  const Mp = wp ? sp / wp : 0;
  const Mn = wn ? sn / wn : 0;
  const X = (Mp - Mn) / 2;
  const pctPos = ((X + 1) / 2) * 100;
  const intensidade = Math.abs(X);

  // peso relativo final de cada item dentro do eixo (para as barras de detalhe)
  detalhes.forEach((d) => {
    const W = d.item.pole === 'pos' ? wp : wn;
    d.influencia = W ? d.w / (2 * W) : 0; // fração máxima de X que este item pode mover
  });

  return {
    eixo,
    Mp,
    Mn,
    X,
    pctPos,
    pctNeg: 100 - pctPos,
    intensidade,
    faixa: faixaDe(intensidade),
    dominante: X >= 0 ? 'pos' : 'neg',
    aquiescencia: (Mp + Mn) / 2,
    somaPesoPos: wp,
    somaPesoNeg: wn,
    detalhes,
  };
}

function calcularTudo(respostas, overrides) {
  const eixos = EIXOS.map((e) => calcularEixo(e, respostas, overrides));
  const aq = eixos.reduce((a, e) => a + e.aquiescencia, 0) / eixos.length;
  return {
    eixos,
    aquiescenciaGlobal: aq,
    alerta:
      Math.abs(aq) > 0.45
        ? aq > 0
          ? 'Concordância alta com quase todas as afirmações. O resultado pode estar achatado — vale reaplicar pedindo para evitar as bolinhas extremas.'
          : 'Discordância alta com quase todas as afirmações. O resultado pode estar achatado.'
        : null,
  };
}
