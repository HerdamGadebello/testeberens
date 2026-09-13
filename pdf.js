/* ===================================================================
   PDF.JS — gera o PDF do resultado (jsPDF, sem dependencia de layout)
   Conteudo: capa com sigla, imagem e texto do tipo; os seis eixos com
   porcentagem e intensidade; como o tipo foi escolhido; checagens;
   ranking; e a explicacao do metodo.
   =================================================================== */

const PDF_COR = {
  tinta: [16, 32, 44], //  texto
  fraca: [106, 99, 84], //  apoio
  linha: [207, 181, 142], //  areia escura
  pos: [5, 38, 69], //  #052645 marinho
  neg: [82, 20, 23], //  #521417 vinho
  destaque: [239, 56, 60], //  #ef383c vermelho
  fundo: [247, 239, 226], //  #f7efe2 papel
};

const PDF_M = 18; // margem em mm
const PDF_GUT = 3; // respiro entre colunas de tabela, em mm

/* jsPDF escreve nas fontes padrao em WinAnsi. Caracteres fora dessa tabela
   (ex.: o sinal de menos U+2212) quebram a medicao de linha e saem embaralhados.
   Aqui trocamos por equivalentes seguros antes de desenhar. */
const PDF_WINANSI_EXTRA = new Set([
  8364, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 381, 8216, 8217, 8220, 8221, 8226, 8211,
  8212, 732, 8482, 353, 8250, 339, 382, 376,
]);
const PDF_TROCA = {
  8722: '-', // minus
  8721: 'soma',
  8804: '<=',
  8805: '>=',
  8800: '!=',
  8594: '->',
  8592: '<-',
  8776: '~',
  8901: '.',
  8729: '.',
};

function pdfTxt(s) {
  return String(s)
    .split('')
    .map((ch) => {
      const c = ch.charCodeAt(0);
      if (c < 256 || PDF_WINANSI_EXTRA.has(c)) return ch;
      return PDF_TROCA[c] !== undefined ? PDF_TROCA[c] : '-';
    })
    .join('');
}
const PDF_L = 210 - PDF_M * 2; // largura util

async function imagemBase64(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('imagem ' + resp.status);
  const mime = /\.png(\?|$)/i.test(url) ? 'image/png' : 'image/jpeg';
  const buf = await resp.arrayBuffer();
  let bin = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 8192) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
  }
  return `data:${mime};base64,` + btoa(bin);
}

/* ---------- ornamentos no PDF ----------
   Sem espelhamento: a arte nasce apontando para a direita, entao o braco
   da margem esquerda usa giro 0 e o da direita usa giro 180. Espelhar
   exigiria canvas, que fica contaminado dentro do iframe do preview. */
async function ornamentosPdf(sigla) {
  const nomes = ornamentosDe(sigla).slice(0, 6);
  const out = [];
  for (const n of nomes) {
    try {
      const dados = await imagemBase64(ORN_CAMINHO(n));
      const dim = await new Promise((ok, err) => {
        const im = new Image();
        im.onload = () => ok({ w: im.naturalWidth, h: im.naturalHeight });
        im.onerror = err;
        im.src = dados;
      });
      out.push({ nome: n, dados, prop: dim.h / dim.w });
    } catch (e) {
      /* arte ausente: a moldura simplesmente fica mais vazia */
    }
  }
  return out;
}

function moldurarPaginas(doc, orns) {
  if (!orns.length) return;
  /* Faixas seguras: a coluna de texto vai de 18 a 192 mm. Os bracos da
     esquerda entram em x = -13 (borda direita da arte em 17 mm) e os da
     direita em x = 221 com rotacao de 180 (borda esquerda em 194 mm).
     Nenhum deles toca o texto. */
  const slots = [
    { lado: 'e', y: 16, w: 30 },
    { lado: 'd', y: 86, w: 26 },
    { lado: 'e', y: 104, w: 24 },
    { lado: 'd', y: 176, w: 30 },
    { lado: 'e', y: 198, w: 28 },
    { lado: 'd', y: 268, w: 25 },
  ];
  const total = doc.internal.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    slots.forEach((sl, i) => {
      const o = orns[(p * 3 + i) % orns.length];
      const h = sl.w * o.prop;
      if (sl.lado === 'e') {
        doc.addImage(o.dados, 'PNG', -13, sl.y, sl.w, h, `orn-e${i}-${p}`, 'FAST', 0);
      } else {
        doc.addImage(o.dados, 'PNG', 221, sl.y + h, sl.w, h, `orn-d${i}-${p}`, 'FAST', 180);
      }
    });
  }
}

function criarPdfCtx(doc) {
  const ctx = { doc, y: PDF_M, pagina: 1 };

  ctx.espaco = (mm, minimo) => {
    if (ctx.y + (minimo || mm) > 297 - PDF_M - 8) ctx.novaPagina();
    else ctx.y += mm;
  };

  ctx.novaPagina = () => {
    ctx.rodape();
    doc.addPage();
    ctx.pagina += 1;
    ctx.y = PDF_M;
  };

  ctx.rodape = () => {
    doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor(...PDF_COR.fraca);
    doc.text('Teste Berens — 6 eixos, 42 afirmações, 16 tipos, 4 temperamentos, 4 expressões', PDF_M, 297 - 10);
    doc.text(String(ctx.pagina), 210 - PDF_M, 297 - 10, { align: 'right' });
  };

  ctx.texto = (txt, opt) => {
    const o = Object.assign({ tam: 10, estilo: 'normal', cor: PDF_COR.tinta, lh: 1.45, largura: PDF_L, x: PDF_M }, opt);
    doc.setFont('helvetica', o.estilo).setFontSize(o.tam).setTextColor(...o.cor);
    const linhas = doc.splitTextToSize(pdfTxt(txt), o.largura);
    const alturaLinha = (o.tam * o.lh) / 2.83465; // pt -> mm
    linhas.forEach((l) => {
      if (ctx.y + alturaLinha > 297 - PDF_M - 8) ctx.novaPagina();
      doc.text(l, o.x, ctx.y + alturaLinha * 0.75);
      ctx.y += alturaLinha;
    });
  };

  ctx.olho = (txt) => {
    ctx.espaco(0, 14);
    doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor(...PDF_COR.fraca);
    doc.text(pdfTxt(txt).toUpperCase(), PDF_M, ctx.y + 3, { charSpace: 0.5 });
    ctx.y += 6;
  };

  ctx.titulo = (txt, tam, cor, x) => {
    ctx.espaco(0, 18);
    const o = { tam: tam || 15, estilo: 'bold', lh: 1.25, cor: cor || PDF_COR.tinta };
    if (x !== undefined) {
      o.x = x;
      o.largura = (PDF_L - 8) / 2;
    }
    ctx.texto(txt, o);
    ctx.y += 2;
  };

  ctx.regua = () => {
    doc.setDrawColor(...PDF_COR.linha).setLineWidth(0.2);
    doc.line(PDF_M, ctx.y, 210 - PDF_M, ctx.y);
    ctx.y += 4;
  };

  /* tabela simples: cols = [{t, w, al}], rows = [[...]] com celula string
     ou {v, cor, estilo} */
  ctx.tabela = (cols, rows) => {
    const alturaCabec = 7;
    const desenharCabec = () => {
      doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor(...PDF_COR.fraca);
      let x = PDF_M;
      cols.forEach((c) => {
        doc.text(pdfTxt(c.t).toUpperCase(), c.al === 'right' ? x + c.w - PDF_GUT : x, ctx.y + 4.4, {
          align: c.al || 'left',
        });
        x += c.w;
      });
      ctx.y += alturaCabec - 2;
      doc.setDrawColor(...PDF_COR.linha).setLineWidth(0.2);
      doc.line(PDF_M, ctx.y, 210 - PDF_M, ctx.y);
      ctx.y += 1.5;
    };
    if (ctx.y + alturaCabec + 14 > 297 - PDF_M - 8) ctx.novaPagina();
    desenharCabec();

    rows.forEach((r) => {
      // altura da linha = maior numero de linhas quebradas entre as celulas
      let nLinhas = 1;
      const celulas = cols.map((c, i) => {
        const cel = typeof r[i] === 'object' && r[i] !== null ? r[i] : { v: String(r[i]) };
        doc.setFont('helvetica', cel.estilo || 'normal').setFontSize(9);
        const ls = doc.splitTextToSize(pdfTxt(cel.v), c.w - PDF_GUT);
        nLinhas = Math.max(nLinhas, ls.length);
        return { cel, ls, c };
      });
      const alt = nLinhas * 4.2 + 3;
      if (ctx.y + alt > 297 - PDF_M - 8) {
        ctx.novaPagina();
        desenharCabec();
      }
      let x = PDF_M;
      celulas.forEach(({ cel, ls, c }) => {
        doc.setFont('helvetica', cel.estilo || 'normal').setFontSize(9);
        doc.setTextColor(...(cel.cor || PDF_COR.tinta));
        ls.forEach((l, j) => {
          doc.text(l, c.al === 'right' ? x + c.w - PDF_GUT : x, ctx.y + 3.4 + j * 4.2, { align: c.al || 'left' });
        });
        x += c.w;
      });
      ctx.y += alt;
      doc.setDrawColor(...PDF_COR.linha).setLineWidth(0.1);
      doc.line(PDF_M, ctx.y - 1.5, 210 - PDF_M, ctx.y - 1.5);
    });
    ctx.y += 3;
  };

  return ctx;
}

async function gerarPdf() {
  const aviso = el('pdf-aviso');
  const btn = el('btn-pdf');
  if (!window.jspdf || !window.jspdf.jsPDF) {
    aviso.textContent = 'Não foi possível carregar a biblioteca de PDF. Verifique a conexão e tente de novo.';
    return;
  }
  if (!estado.ultimo) return;

  btn.disabled = true;
  const rotuloOriginal = btn.textContent;
  btn.textContent = 'Gerando PDF…';
  aviso.textContent = '';

  try {
    const { res, tip } = estado.ultimo;
    const v = tip.vencedor;
    const d = DESCRICOES[v.tipo];
    const tmp = tip.temperamentoDoTipo;
    const exp = tip.expressaoDoTipo;
    const tipoTab = TIPOS.find((t) => t.tipo === v.tipo);

    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
    const ctx = criarPdfCtx(doc);

    /* ---------- capa ---------- */
    doc.setFillColor(...PDF_COR.fundo);
    doc.rect(0, 0, 210, 52, 'F');

    doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor(...PDF_COR.fraca);
    doc.text('TESTE BERENS · POR HERMES DAMIÃO BELLO', PDF_M, 14, { charSpace: 0.6 });
    doc.text(
      new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      210 - PDF_M,
      14,
      { align: 'right' },
    );

    doc.setFont('helvetica', 'bold').setFontSize(38).setTextColor(...PDF_COR.pos);
    doc.text(pdfTxt(v.tipo), PDF_M, 34);
    doc.setFont('helvetica', 'normal').setFontSize(11).setTextColor(...PDF_COR.tinta);
    doc.text(pdfTxt(`${tmp.nome} · ${tmp.sigla}`), PDF_M, 42);
    doc.setFontSize(9).setTextColor(...PDF_COR.fraca);
    doc.text(pdfTxt(d.titulo), PDF_M, 47.5);

    ctx.y = 60;

    /* imagem + assinatura */
    let imgOk = false;
    try {
      const b64 = await imagemBase64(imagemDoTipo(v.tipo));
      doc.addImage(b64, 'JPEG', PDF_M, ctx.y, 58, 58);
      imgOk = true;
    } catch (e) {
      imgOk = false;
    }

    const xTexto = imgOk ? PDF_M + 66 : PDF_M;
    const wTexto = imgOk ? PDF_L - 66 : PDF_L;
    const yImagem = ctx.y;

    doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor(...PDF_COR.fraca);
    doc.text('SUA ASSINATURA DE SEIS POLOS', xTexto, ctx.y + 3, { charSpace: 0.4 });
    ctx.y += 7;
    ctx.texto(polosDoTipo(tipoTab).join(' · '), { tam: 9, estilo: 'bold', x: xTexto, largura: wTexto, cor: PDF_COR.pos });
    ctx.y += 2;
    ctx.texto(
      `Ajuste à assinatura do tipo: ${pct(v.ajuste)} · ${v.linhas.filter((l) => l.bate).length} de 6 eixos convergem · margem sobre o segundo colocado: ${tip.margem.toFixed(2).replace('.', ',')} de 63 pontos.`,
      { tam: 8.5, x: xTexto, largura: wTexto, cor: PDF_COR.fraca },
    );

    ctx.y = Math.max(ctx.y, yImagem + 58) + 8;

    ctx.olho('O que esse tipo descreve');
    ctx.texto(d.texto, { tam: 10 });
    ctx.y += 5;

    const colL = (PDF_L - 8) / 2;
    const yRC = ctx.y;
    ctx.titulo('Onde isso rende', 11.5, PDF_COR.pos);
    d.rende.forEach((t) => {
      ctx.texto(`- ${t}`, { tam: 9, largura: colL, cor: PDF_COR.fraca });
      ctx.y += 1;
    });
    const yFimRende = ctx.y;

    ctx.y = yRC;
    ctx.titulo('Onde isso custa', 11.5, PDF_COR.neg, PDF_M + colL + 8);
    d.custa.forEach((t) => {
      ctx.texto(`- ${t}`, { tam: 9, largura: colL, x: PDF_M + colL + 8, cor: PDF_COR.fraca });
      ctx.y += 1;
    });
    ctx.y = Math.max(ctx.y, yFimRende) + 4;
    ctx.texto(`Temperamento: ${tmp.nome} (${tmp.sigla}). ${tmp.desc}`, { tam: 9, cor: PDF_COR.fraca });
    ctx.texto(`Expressão: ${exp.nome} (${exp.sigla}). ${exp.desc}`, { tam: 9, cor: PDF_COR.fraca });
    ctx.texto(`Leitura usada: ${tip.calibragem.nome}.`, { tam: 9, cor: PDF_COR.fraca });

    /* ---------- temperamento e expressao ---------- */
    ctx.novaPagina();
    ctx.olho('Seus dois grupos');
    ctx.titulo(`${tmp.nome} — temperamento`);
    ctx.texto(tmp.desc, { tam: 9, cor: PDF_COR.fraca });
    ctx.y += 1;
    ctx.texto(DESCRICOES_TEMPERAMENTO[tmp.sigla].texto, { tam: 9.5 });
    ctx.y += 2;
    ctx.texto(
      `Os quatro tipos deste temperamento: ${TIPOS.filter((t) => t.temp === tmp.sigla)
        .map((t) => t.tipo)
        .join(', ')}.`,
      { tam: 8.5, cor: PDF_COR.fraca },
    );
    ctx.espaco(10, 60);
    ctx.titulo(`${exp.nome} — expressão`);
    ctx.texto(exp.desc, { tam: 9, cor: PDF_COR.fraca });
    ctx.y += 1;
    ctx.texto(DESCRICOES_EXPRESSAO[exp.sigla].texto, { tam: 9.5 });
    ctx.y += 2;
    ctx.texto(
      `Os quatro tipos desta expressão: ${TIPOS.filter((t) => siglaExpressao(t) === exp.sigla)
        .map((t) => t.tipo)
        .join(', ')}.`,
      { tam: 8.5, cor: PDF_COR.fraca },
    );

    /* ---------- os seis eixos ---------- */
    ctx.novaPagina();
    ctx.olho('Os seis eixos');
    ctx.titulo('Sua porcentagem em cada dicotomia');
    ctx.texto(
      'A porcentagem sai da média ponderada de cada polo separadamente, então os dois lados sempre somam 100% — e por isso ela fica naturalmente perto de 50%. O número que diz se o eixo está realmente definido é a distância do empate, na última coluna: abaixo de 7 pontos o eixo é tratado como indiferenciado e recebe um traço no lugar do polo.',
      { tam: 9, cor: PDF_COR.fraca },
    );
    ctx.y += 3;
    ctx.tabela(
      [
        { t: 'Eixo', w: 30 },
        { t: 'Polo dominante', w: 34 },
        { t: 'Força', w: 30 },
        { t: '%', w: 16, al: 'right' },
        { t: 'Outro polo', w: 30 },
        { t: '%', w: 16, al: 'right' },
        { t: 'Do empate', w: 18, al: 'right' },
      ],
      res.eixos.map((r) => {
        const dom = r.dominante === 'pos' ? r.eixo.pos : r.eixo.neg;
        const out = r.dominante === 'pos' ? r.eixo.neg : r.eixo.pos;
        const pDom = r.dominante === 'pos' ? r.pctPos : r.pctNeg;
        /* eixo indiferenciado: espelha o traço da tela e perde o negrito, para
           não sugerir um polo que na prática empatou */
        const mudo = r.intensidade < LIMIAR_INDIFERENCIADO;
        const frouxo = r.intensidade < LIMIAR_CLARO;
        const corDom = mudo ? PDF_COR.fraca : r.dominante === 'pos' ? PDF_COR.pos : PDF_COR.neg;
        return [
          { v: r.eixo.nome, estilo: 'bold' },
          { v: mudo ? `— (${dom.code})` : dom.code, cor: corDom, estilo: mudo ? 'normal' : 'bold' },
          { v: r.faixa.rotulo, cor: frouxo ? PDF_COR.destaque : PDF_COR.fraca, estilo: frouxo ? 'bold' : 'normal' },
          { v: pct(pDom), al: 'right', cor: mudo ? PDF_COR.fraca : PDF_COR.tinta, estilo: mudo ? 'normal' : 'bold' },
          { v: out.code, cor: PDF_COR.fraca },
          { v: pct(100 - pDom), al: 'right', cor: PDF_COR.fraca },
          { v: `${(r.intensidade * 100).toFixed(1).replace('.', ',')}`, al: 'right', cor: PDF_COR.fraca },
        ];
      }),
    );
    ctx.y += 2;
    const frouxos = res.eixos.filter((r) => r.intensidade < LIMIAR_CLARO);
    if (frouxos.length) {
      ctx.texto(
        `Leia com ressalva ${frouxos.length === 1 ? 'o eixo' : 'os eixos'} ${frouxos
          .map((r) => r.eixo.nome)
          .join(', ')}: ${
          frouxos.length === 1 ? 'ficou' : 'ficaram'
        } sem tendência clara, a poucos pontos do empate. ${FAIXAS[1].nota}`,
        { tam: 9, estilo: 'bold', cor: PDF_COR.destaque },
      );
      ctx.y += 2;
    }
    res.eixos.forEach((r) => {
      const dom = r.dominante === 'pos' ? r.eixo.pos : r.eixo.neg;
      if (r.intensidade < LIMIAR_INDIFERENCIADO) {
        ctx.texto(`${r.eixo.nome} — indiferenciado: os dois polos apareceram praticamente empatados.`, {
          tam: 8.5,
          cor: PDF_COR.fraca,
        });
      } else {
        ctx.texto(`${r.eixo.nome} — ${dom.code}: ${dom.desc}`, { tam: 8.5, cor: PDF_COR.fraca });
      }
      ctx.y += 1;
    });
    if (res.alerta) {
      ctx.y += 3;
      ctx.texto('Atenção: ' + res.alerta, { tam: 9, estilo: 'bold', cor: PDF_COR.neg });
    }

    /* ---------- reconciliacao: respostas x tipo x regras ---------- */
    ctx.espaco(10, 40);
    ctx.olho('Como o tipo foi escolhido');
    ctx.titulo('Onde as suas respostas e o seu tipo não coincidem');
    ctx.texto(
      tip.exato
        ? `A sua assinatura bate exatamente com a linha de ${tip.exato.tipo} na tabela dos 16 tipos.`
        : 'A sua assinatura de seis polos não existe na tabela — o caso mais comum, já que a tabela cobre 16 das 64 combinações possíveis. O tipo escolhido é a melhor aproximação, usando a ordem de prioridade dos eixos.',
      { tam: 9, cor: PDF_COR.fraca },
    );
    tip.reconciliacao.forEach((f) => ctx.texto(f, { tam: 9, cor: PDF_COR.fraca }));
    ctx.y += 3;
    const chkPorEixo = {};
    tip.checagens.forEach((c) => (chkPorEixo[c.eixoId] = c));
    ctx.tabela(
      [
        { t: 'Pri.', w: 12 },
        { t: 'Eixo', w: 26 },
        { t: 'Você respondeu', w: 38 },
        { t: `Linha de ${v.tipo}`, w: 34 },
        { t: 'A regra prevê', w: 38, al: 'left' },
        { t: 'Resposta × tipo', w: 26 },
      ],
      v.linhas.map((l) => {
        const c = chkPorEixo[l.eixoId];
        return [
          { v: String(l.prioridade), cor: PDF_COR.fraca },
          { v: l.eixoNome },
          {
            v: `${l.observado} — ${pct(l.pctObservado)}, ${l.faixa.toLowerCase()}`,
            estilo: 'bold',
            cor: l.firme ? PDF_COR.tinta : PDF_COR.destaque,
          },
          { v: `${l.esperado} — ${pct(l.pctEsperado)}`, cor: PDF_COR.fraca },
          { v: c ? c.previsto : 'eixo livre', cor: c ? PDF_COR.tinta : PDF_COR.fraca },
          {
            v: l.indefinido ? 'indiferenciado' : l.bate ? 'coincide' : 'difere',
            cor: l.indefinido ? PDF_COR.fraca : l.bate ? PDF_COR.pos : PDF_COR.neg,
          },
        ];
      }),
    );
    ctx.texto(
      'A última coluna compara a sua resposta com a linha do tipo, não com a regra. A coluna “a regra prevê” só existe nos dois eixos deriváveis, detalhados adiante.',
      { tam: 8.5, cor: PDF_COR.fraca },
    );
    ctx.texto(`${tip.calibragem.nome} — ordem em uso: ${tip.ordemUsada.detalhe}.`, { tam: 8.5, cor: PDF_COR.fraca });
    if (tip.universal) {
      ctx.texto(
        `Contraposição das quatro listas: ${tip.universal.listas
          .map((l) => `${l.nome} 1º ${l.topo}`)
          .join('; ')}. ${tip.universal.concordancia} de ${tip.universal.totalListas} apontam ${tip.vencedor.tipo}.`,
        { tam: 8.5, cor: PDF_COR.fraca },
      );
    }

    /* ---------- os dois eixos derivaveis ---------- */
    ctx.espaco(8, 60);
    ctx.olho('Os dois eixos deriváveis');
    ctx.texto(
      `A tabela tem seis colunas e apenas quatro graus de liberdade: ${tip.checagens
        .map((c) => c.eixoNome)
        .join(
          ' e ',
        )} são previsíveis a partir dos outros quatro em todas as 16 linhas. Abaixo, a previsão de cada regra contra a sua resposta. Isto não avalia o seu tipo — avalia a firmeza das suas respostas.`,
      { tam: 9, cor: PDF_COR.fraca },
    );
    ctx.y += 2;
    tip.checagens.forEach((c) => {
      const tom = c.veredito.tom === 'pos' ? PDF_COR.pos : c.veredito.tom === 'neg' ? PDF_COR.destaque : PDF_COR.fraca;
      ctx.espaco(4, 34);
      ctx.texto(`${c.eixoNome} — ${c.veredito.rotulo}`, { tam: 9.5, estilo: 'bold', cor: tom });
      ctx.texto(
        `A regra prevê ${c.eixoNome} a partir de ${c.entradas
          .map((e) => e.eixoNome)
          .join(' × ')}. As suas respostas nesses eixos dão ${c.entradas
          .map((e) => `${e.polo} em ${e.eixoNome} (${pct(e.pct)}, ${e.faixa.toLowerCase()})`)
          .join(
            ' + ',
          )}, cruzamento que prevê ${c.previsto}; você respondeu ${c.observado} com ${pct(c.pctObservado)}.`,
        { tam: 8.5, cor: PDF_COR.tinta },
      );
      if (c.eloFraco) {
        ctx.texto(
          c.bate
            ? `Bateu, mas ${c.eloFraco.eixoNome} ficou em ${pct(c.eloFraco.pct)} (${c.eloFraco.faixa.toLowerCase()}), então a coincidência diz pouco.`
            : `Elo fraco: ${c.eloFraco.eixoNome}, ${pct(
                c.eloFraco.pct,
              )} — ${c.eloFraco.faixa.toLowerCase()}. É esse eixo que vira a previsão, e ele pode cair do outro lado numa reaplicação.`,
          { tam: 8.5, estilo: 'bold', cor: tom },
        );
      }
      ctx.texto(c.veredito.resumo, { tam: 8.5, cor: PDF_COR.fraca });
      ctx.texto(
        `Na tabela, ${v.tipo} é ${c.tipoAtribuido} nesse eixo e satisfaz a regra — como todas as 16 linhas. ${c.regra}`,
        { tam: 8.5, cor: PDF_COR.fraca },
      );
      ctx.y += 2.5;
    });

    /* ---------- ranking ---------- */
    ctx.espaco(8, 50);
    ctx.olho('Os 16 tipos pelo seu ajuste');
    ctx.tabela(
      [
        { t: '#', w: 12 },
        { t: 'Tipo', w: 24 },
        { t: 'Temperamento', w: 46 },
        { t: 'Ajuste', w: 40, al: 'right' },
        { t: 'Eixos que batem', w: 52, al: 'right' },
      ],
      tip.ranking.map((t, i) => [
        { v: String(i + 1), cor: PDF_COR.fraca },
        { v: t.tipo, estilo: i === 0 ? 'bold' : 'normal' },
        { v: TEMPERAMENTOS[t.temp].nome + ' (' + TEMPERAMENTOS[t.temp].sigla + ')', cor: PDF_COR.fraca },
        { v: pct(t.ajuste), al: 'right', estilo: i === 0 ? 'bold' : 'normal' },
        { v: `${t.batem}/6`, al: 'right', cor: PDF_COR.fraca },
      ]),
    );

    /* ---------- metodo ---------- */
    ctx.novaPagina();
    ctx.olho('Como a pontuação funciona');
    ctx.titulo('Escala de seis pontos, sem centro');
    ctx.texto(
      'Cada afirmação é ancorada em um dos dois polos do eixo. A resposta vai de B3 (discordo totalmente, bolinha mais à esquerda) a A3 (concordo totalmente, bolinha mais à direita), sem opção neutra: B3 = −3, B2 = −2, B1 = −1, A1 = +1, A2 = +2, A3 = +3. O valor é normalizado dividindo por 3.',
      { tam: 9.5 },
    );
    ctx.y += 3;
    ctx.titulo('Pesos por afirmação', 12);
    ctx.tabela(
      [
        { t: 'Marcação', w: 26 },
        { t: 'Peso', w: 18, al: 'right' },
        { t: 'Critério', w: 130 },
      ],
      [
        [{ v: 'mid', estilo: 'bold' }, { v: '0,5', al: 'right' }, { v: 'Mede o eixo de forma indireta, é socialmente desejável, é condicional ou divide variância com outro eixo.' }],
        [{ v: 'neutra', estilo: 'bold' }, { v: '1,0', al: 'right' }, { v: 'Item válido e concreto, mas ancorado num contexto específico ou com justificativa embutida.' }],
        [{ v: 'mor', estilo: 'bold' }, { v: '1,5', al: 'right' }, { v: 'Descreve o comportamento-núcleo do polo, é observável e concordar com ele custa algo socialmente.' }],
      ],
    );
    ctx.y += 2;
    ctx.titulo('A fórmula do eixo', 12);
    ctx.texto(
      'Média ponderada separada por polo: M+ é a média dos itens do polo positivo, M− a do polo negativo. O score do eixo é X = (M+ − M−) / 2, sempre entre −1 e +1, e a porcentagem do polo positivo é (X + 1) / 2 × 100. Separar os polos corrige de uma vez o desbalanceamento de itens entre os lados e a tendência de concordar com tudo.',
      { tam: 9.5 },
    );
    ctx.y += 3;
    ctx.titulo('A escolha do tipo', 12);
    ctx.texto(
      'Cada um dos 16 tipos recebe um score: soma, ao longo dos seis eixos, do peso de prioridade multiplicado pelo alinhamento. O alinhamento é (porcentagem no polo que o tipo pede − 50) / 50, indo de −1 a +1. Os pesos de prioridade são 32, 16, 8, 4, 2 e 1 na ordem de prioridade dos eixos. Como 32 é maior que a soma de todos os pesos abaixo dele, um eixo de prioridade alta decide o tipo — mas só quando a pessoa está de fato definida nele: um eixo em 51/49 contribui com quase nada.',
      { tam: 9.5 },
    );
    ctx.y += 2;
    ctx.texto(
      'A Calibragem Universal não usa uma ordem única: ela monta quatro listas dos 16 tipos — pelos polos individuais, pela ordem universal (Orientação › Interpretação › Organização › Comunicação › Enfoque › Postura, com peso dobrado), pela leitura de temperamento e pela leitura de expressão — e depois contrapõe as quatro. A nota de cada tipo é a média ponderada da posição e da compatibilidade nas quatro listas, com desconto para quem aparece bem em uma e mal em outra: vence o tipo que harmoniza o conjunto.',
      { tam: 9.5 },
    );
    ctx.y += 4;
    ctx.texto(
      'Protótipo de instrumento. Este documento é a leitura da sua resposta pelas regras acima, não um diagnóstico.',
      { tam: 8, cor: PDF_COR.fraca },
    );

    ctx.rodape();

    /* moldura de bracos do temperamento do tipo, em todas as paginas */
    try {
      const orns = await ornamentosPdf(tmp.sigla);
      moldurarPaginas(doc, orns);
      doc.setPage(doc.internal.getNumberOfPages());
    } catch (e) {
      /* a moldura e decorativa: nunca deve impedir o PDF de sair */
    }

    const nome = `perfil-${v.tipo}-${new Date().toISOString().slice(0, 10)}.pdf`;
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    aviso.innerHTML = `PDF gerado: <strong>${nome}</strong>. Se o download não aparecer aqui dentro, abra o app em uma aba própria e clique de novo.`;
  } catch (e) {
    aviso.textContent = 'Falha ao gerar o PDF: ' + e.message;
  } finally {
    btn.disabled = false;
    btn.textContent = rotuloOriginal;
  }
}

el('btn-pdf').addEventListener('click', gerarPdf);
