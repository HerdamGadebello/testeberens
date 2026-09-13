/* ===================== TEMA ===================== */
(function () {
  const t = document.querySelector('[data-theme-toggle]'),
    r = document.documentElement;
  const sol =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const lua =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  const pinta = () => {
    r.setAttribute('data-theme', d);
    t.innerHTML = d === 'dark' ? sol : lua;
    t.setAttribute('aria-label', d === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
  };
  pinta();
  t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    pinta();
  });
})();

/* ===================== ESTADO ===================== */
const estado = {
  ordem: [],
  indice: 0,
  respostas: {},
  overrides: {},
  tipoCfg: { calibragem: 'universal' },
};

const el = (id) => document.getElementById(id);
const telas = {
  intro: el('tela-intro'),
  teste: el('tela-teste'),
  resultado: el('tela-resultado'),
};

function mostrar(nome) {
  Object.values(telas).forEach((t) => t.classList.remove('ativa'));
  telas[nome].classList.add('ativa');
  if (nome !== 'resultado') aplicarOrnamentos(null);
  aoTopo();
}

/* rolagem instantanea: com scroll-behavior smooth, um scrollTo enquanto a
   tela ainda esta vazia nao chega ao topo depois que o conteudo cresce */
function aoTopo() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function todosItens() {
  return EIXOS.flatMap((e) => e.itens.map((i) => ({ ...i, eixoId: e.id, eixoNome: e.nome })));
}

function embaralhar(a) {
  const c = a.slice();
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

/* ===================== INTRO ===================== */
aplicarOrnamentos(null);

(function grade() {
  el('grade-eixos').innerHTML = EIXOS.map(
    (e) => `<article class="cartao-eixo">
      <h3>${e.nome}</h3>
      <p class="par-polos"><span class="neg">${e.neg.code}</span><span class="sep">/</span><span class="pos">${e.pos.code}</span></p>
    </article>`,
  ).join('');
})();

el('btn-comecar').addEventListener('click', () => {
  estado.ordem = embaralhar(todosItens());
  estado.indice = 0;
  estado.respostas = {};
  mostrar('teste');
  renderQuestao();
});

el('btn-simular').addEventListener('click', () => {
  const itens = todosItens();
  const vals = [-3, -2, -1, 1, 2, 3];
  estado.respostas = {};
  itens.forEach((i) => {
    estado.respostas[i.id] = vals[Math.floor(Math.random() * 6)];
  });
  estado.ordem = itens;
  irParaResultado();
});

el('btn-sair').addEventListener('click', () => mostrar('intro'));
el('btn-refazer').addEventListener('click', () => {
  estado.overrides = {};
  el('btn-comecar').click();
});

/* ===================== QUESTAO ===================== */
let ornEixoAtual = null;
function renderQuestao() {
  const item = estado.ordem[estado.indice];
  if (!item) return irParaResultado();

  el('chip-eixo').textContent = item.eixoNome;
  el('contador').textContent = `${estado.indice + 1} / ${estado.ordem.length}`;
  el('afirmacao').textContent = item.texto;
  // a moldura de bracos remistura os temperamentos a cada troca de eixo
  if (item.eixoId !== ornEixoAtual) {
    ornEixoAtual = item.eixoId;
    aplicarOrnamentos(null);
  }
  el('barra').style.width = `${(estado.indice / estado.ordem.length) * 100}%`;
  el('btn-voltar').disabled = estado.indice === 0;

  const atual = estado.respostas[item.id];
  const trilha = el('trilha');
  trilha.innerHTML = '';

  ESCALA.forEach((op, i) => {
    if (i === 3) trilha.appendChild(Object.assign(document.createElement('div'), { className: 'divisor' }));
    const b = document.createElement('button');
    b.className = `bolinha ${op.id.toLowerCase()}`;
    b.dataset.lado = op.lado;
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', atual === op.valor ? 'true' : 'false');
    b.setAttribute('aria-label', `${op.rotulo} (${op.id})`);
    b.title = `${op.rotulo} — ${op.id}`;
    b.innerHTML = `<span class="n">${i + 1}</span>`;
    b.addEventListener('click', () => responder(item, op.valor));
    trilha.appendChild(b);
  });
}

function responder(item, valor) {
  estado.respostas[item.id] = valor;
  renderQuestao();
  setTimeout(() => {
    if (estado.indice < estado.ordem.length - 1) {
      estado.indice++;
      renderQuestao();
    } else {
      irParaResultado();
    }
  }, 190);
}

el('btn-voltar').addEventListener('click', () => {
  if (estado.indice > 0) {
    estado.indice--;
    renderQuestao();
  }
});

document.addEventListener('keydown', (e) => {
  if (!telas.teste.classList.contains('ativa')) return;
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= 6) {
    responder(estado.ordem[estado.indice], ESCALA[n - 1].valor);
  } else if (e.key === 'ArrowLeft') {
    el('btn-voltar').click();
  } else if (e.key === 'ArrowRight' && estado.indice < estado.ordem.length - 1) {
    estado.indice++;
    renderQuestao();
  }
});

/* ===================== RESULTADO ===================== */
function irParaResultado() {
  mostrar('resultado');
  renderResultado();
  ativarAba('tipo');
  aoTopo();
}

function pct(n) {
  return `${n.toFixed(1).replace('.', ',')}%`;
}

function renderResultado() {
  const res = calcularTudo(estado.respostas, estado.overrides);
  const tip = tiparPerfil(res.eixos, estado.tipoCfg);
  estado.ultimo = { res, tip };

  // titulo / resumo
  const codigo = res.eixos
    .map((r) => (r.intensidade < 0.07 ? '—' : r.dominante === 'pos' ? r.eixo.pos.code : r.eixo.neg.code))
    .join(' · ');
  el('titulo-perfil').innerHTML =
    `${tip.vencedor.tipo} <span class="tit-temp">${tip.temperamentoDoTipo.nome} · ${tip.temperamentoDoTipo.sigla}</span>`;

  const definidos = res.eixos.filter((r) => r.intensidade >= 0.2).length;
  el('resumo-perfil').innerHTML =
    `<span class="assinatura">${codigo}</span><br>` +
    `${definidos} de 6 eixos vieram com tendência clara (intensidade moderada ou acima). ` +
    `Eixos marcados com “—” ficaram indiferenciados: os dois polos apareceram praticamente empatados.`;

  const alerta = el('alerta-aquiescencia');
  if (res.alerta) {
    alerta.textContent = res.alerta;
    alerta.hidden = false;
  } else alerta.hidden = true;

  // painel perfil
  el('lista-eixos').innerHTML = res.eixos
    .map((r) => {
      const venceEsq = r.dominante === 'neg';
      const dom = venceEsq ? r.eixo.neg : r.eixo.pos;
      return `<article class="res-eixo">
        <div class="res-cabeca">
          <span class="res-nome">${r.eixo.nome}</span>
          <span class="res-faixa">${r.faixa.rotulo} &nbsp;·&nbsp; X = ${r.X.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="res-polos">
          <div class="res-polo esq ${venceEsq ? 'vence' : ''}">
            <span class="res-pct">${pct(r.pctNeg)}</span>
            <span class="res-label">${r.eixo.neg.code}</span>
          </div>
          <div class="res-polo dir ${!venceEsq ? 'vence' : ''}">
            <span class="res-pct">${pct(r.pctPos)}</span>
            <span class="res-label">${r.eixo.pos.code}</span>
          </div>
        </div>
        <div class="res-trilha">
          <span class="res-marcador" style="left:${r.pctPos.toFixed(1)}%;background:${
            venceEsq ? 'var(--color-neg)' : 'var(--color-pos)'
          }"></span>
        </div>
        <p class="res-desc"><strong>${dom.code}.</strong> ${dom.desc} <em>${r.faixa.nota}</em></p>
      </article>`;
    })
    .join('');

  // painel item por item
  el('lista-itens').innerHTML = res.eixos
    .map((r) => {
      const linhas = r.detalhes
        .map((d) => {
          const op = ESCALA.find((o) => o.valor === d.valor);
          const cor = d.empurra === 'pos' ? 'var(--color-pos)' : 'var(--color-neg)';
          const largura = Math.min(100, Math.abs(d.r) * d.influencia * 200) + '%';
          const polo = d.item.pole === 'pos' ? r.eixo.pos.code : r.eixo.neg.code;
          return `<div class="linha-item">
            <div>
              <p class="li-texto">${d.item.texto}</p>
              <div class="li-meta">
                <span class="li-polo ${d.item.pole}">${polo}</span>
                <span class="tag tag-${d.peso}">${d.peso} ${PESOS[d.peso].toFixed(1).replace('.', ',')}</span>
                <span class="res-faixa">influência máx. ${(d.influencia * 100).toFixed(0)}% do eixo</span>
              </div>
            </div>
            <div class="li-resposta">
              <span class="val">${d.valor === null ? '—' : (d.valor > 0 ? '+' : '') + d.valor}</span>
              ${op ? op.rotulo : 'sem resposta'}
              <div class="mini-barra"><span style="background:${cor};width:${largura};${
                d.empurra === 'pos' ? 'right:0' : 'left:0'
              }"></span></div>
            </div>
          </div>`;
        })
        .join('');
      return `<div class="grupo"><h3 class="grupo-titulo">${r.eixo.nome} — ${r.eixo.neg.code} / ${r.eixo.pos.code}</h3>${linhas}</div>`;
    })
    .join('');

  renderPilula(tip);
  renderTipo(tip, res);
  renderGaleria(tip.vencedor.tipo);
  aplicarOrnamentos(tip.temperamentoDoTipo.sigla);
}

/* ===================== RETRATO E GALERIA ===================== */
const EIXO_ORDEM_TEXTO = ['orientacao', 'comunicacao', 'interpretacao', 'organizacao', 'enfoque', 'postura'];

function polosDoTipo(t) {
  return EIXO_ORDEM_TEXTO.map((id) => t[id]);
}

function retratoTipo(sigla) {
  const d = DESCRICOES[sigla];
  const t = TIPOS.find((x) => x.tipo === sigla);
  const tmp = TEMPERAMENTOS[t.temp];
  return `<div class="retrato">
    <figure class="retrato-fig">
      <img src="${imagemDoTipo(sigla)}" alt="Ilustração do tipo ${sigla}" width="640" height="640" loading="lazy">
      <figcaption>${sigla} · ${tmp.nome}</figcaption>
    </figure>
    <div class="retrato-txt">
      <h3 class="retrato-titulo">${d.titulo}</h3>
      <p class="retrato-polos">${polosDoTipo(t).join(' · ')}</p>
      <p>${d.texto}</p>
      <div class="retrato-dl">
        <section class="bloco-rc rende">
          <h4>Onde isso rende</h4>
          <ul>${d.rende.map((x) => `<li>${x}</li>`).join('')}</ul>
        </section>
        <section class="bloco-rc custa">
          <h4>Onde isso custa</h4>
          <ul>${d.custa.map((x) => `<li>${x}</li>`).join('')}</ul>
        </section>
      </div>
    </div>
  </div>`;
}

function renderGaleria(atual) {
  el('galeria-tipos').innerHTML = Object.entries(TEMPERAMENTOS)
    .map(([sig, tmp]) => {
      const cards = TIPOS.filter((t) => t.temp === sig)
        .map((t) => {
          const d = DESCRICOES[t.tipo];
          return `<article class="card-tipo ${t.tipo === atual ? 'atual' : ''}">
            <img src="${imagemDoTipo(t.tipo)}" alt="Ilustração do tipo ${t.tipo}" width="640" height="640" loading="lazy">
            <div class="card-corpo">
              <p class="card-sigla">${t.tipo}${t.tipo === atual ? ' <span class="tag tag-neutra">seu tipo</span>' : ''}</p>
              <h4>${d.titulo}</h4>
              <p class="card-polos">${polosDoTipo(t).join(' · ')}</p>
              <p class="card-texto">${d.texto}</p>
              <h5 class="card-rc rende">Onde isso rende</h5>
              <ul class="card-lista">${d.rende.map((x) => `<li>${x}</li>`).join('')}</ul>
              <h5 class="card-rc custa">Onde isso custa</h5>
              <ul class="card-lista">${d.custa.map((x) => `<li>${x}</li>`).join('')}</ul>
            </div>
          </article>`;
        })
        .join('');
      return `<section class="grupo-temp">
        <h3 class="grupo-titulo">${tmp.nome} <span class="tag tag-neutra">${tmp.sigla}</span></h3>
        <p class="painel-intro">${tmp.desc}</p>
        <div class="grade-tipos">${cards}</div>
      </section>`;
    })
    .join('');
}

/* ===================== TIPO PSICOLOGICO ===================== */
function renderTipo(tip, res) {
  const v = tip.vencedor;
  const batem = v.linhas.filter((l) => l.bate).length;
  const divergem = v.linhas.filter((l) => !l.bate && !l.indefinido);
  const indefinidos = v.linhas.filter((l) => l.indefinido);

  const porEixoChk = {};
  tip.checagens.forEach((c) => (porEixoChk[c.eixoId] = c));

  const linhas = v.linhas
    .map((l) => {
      const cls = l.indefinido ? 'indef' : l.bate ? 'bate' : 'diverge';
      const marca = l.indefinido ? 'indiferenciado' : l.bate ? 'coincide' : 'difere';
      const c = porEixoChk[l.eixoId];
      const regra = c
        ? `<strong>${c.previsto}</strong><span class="res-faixa">derivável de ${c.entradas
            .map((e) => e.eixoNome)
            .join(' + ')}</span>`
        : `<span class="td-vazio" title="Eixo livre: nenhuma regra o prevê">eixo livre</span>`;
      return `<tr class="${cls}">
        <td class="td-pri">${l.prioridade}</td>
        <td><strong>${l.eixoNome}</strong></td>
        <td data-rot="você respondeu"><strong>${l.observado}</strong> <span class="res-faixa">${pct(l.pctObservado)} · ${l.faixa.toLowerCase()}</span></td>
        <td data-rot="linha de ${v.tipo}">${l.esperado} <span class="res-faixa">${pct(l.pctEsperado)} no polo do tipo</span></td>
        <td data-rot="a regra prevê">${regra}</td>
        <td class="td-marca">${marca}</td>
      </tr>`;
    })
    .join('');

  const exato = tip.exato
    ? `<p class="tipo-exato ok">A sua assinatura bate exatamente com a linha de <strong>${tip.exato.tipo}</strong> na tabela.</p>`
    : `<p class="tipo-exato">A sua assinatura de seis polos não existe na tabela — o que é o caso mais comum, já que a tabela cobre 16 das 64 combinações possíveis. O tipo acima é a melhor aproximação.</p>`;

  const chk = tip.checagens
    .map((c) => {
      const ent = c.entradas
        .map((e) => `<strong>${e.polo}</strong> em ${e.eixoNome} (${pct(e.pct)}, ${e.faixa.toLowerCase()})`)
        .join(' + ');
      const elo =
        c.eloFraco && !c.bate
          ? `<p class="chk-elo">Elo fraco: <strong>${c.eloFraco.eixoNome}</strong>, ${pct(
              c.eloFraco.pct,
            )} — ${c.eloFraco.faixa.toLowerCase()}. É esse eixo que vira a previsão, e ele pode cair do outro lado numa reaplicação.</p>`
          : c.eloFraco
            ? `<p class="chk-elo">Bateu, mas <strong>${c.eloFraco.eixoNome}</strong> ficou em ${pct(
                c.eloFraco.pct,
              )} (${c.eloFraco.faixa.toLowerCase()}), então a coincidência diz pouco.</p>`
            : '';
      return `<li class="chk-${c.veredito.tom}">
        <p class="chk-topo"><strong>${c.eixoNome}</strong> <span class="chk-veredito">${c.veredito.rotulo}</span></p>
        <p class="chk-linha">A regra prevê ${c.eixoNome} a partir de ${c.entradas
          .map((e) => e.eixoNome)
          .join(' × ')}. As suas respostas nesses eixos dão ${ent}, cruzamento que prevê
          <strong>${c.previsto}</strong>; você respondeu <strong>${c.observado}</strong> com ${pct(c.pctObservado)}.</p>
        ${elo}
        <p class="chk-nota">${c.veredito.resumo}</p>
        <p class="chk-nota">Na tabela, ${v.tipo} é <strong>${c.tipoAtribuido}</strong> nesse eixo e satisfaz a regra
          — como todas as 16 linhas. ${c.regra}</p>
      </li>`;
    })
    .join('');

  const tmp = tip.temperamentoDoTipo;
  const exp = tip.expressaoDoTipo;
  const d = DESCRICOES[v.tipo];

  el('bloco-tipo').innerHTML = `
    <div class="cartao-tipo">
      <div class="tipo-sigla">${v.tipo}</div>
      <div class="tipo-info">
        <p class="tipo-grupos">
          <span class="selo-grupo" style="--cor: var(--c-${tmp.sigla.toLowerCase()})">${tmp.sigla}</span>
          <span class="selo-grupo" style="--cor: var(--c-${exp.sigla.toLowerCase()})">${exp.sigla}</span>
        </p>
        <p class="tipo-desc">${d.titulo}</p>
        <p class="tipo-ajuste">
          Ajuste à assinatura do tipo: <strong>${pct(v.ajuste)}</strong> · ${batem} de 6 eixos convergem ·
          margem sobre o segundo colocado: ${tip.margem.toFixed(2).replace('.', ',')} de 63 pontos possíveis
        </p>
      </div>
    </div>
    ${quadradosDeGrupo(tip)}
    ${
      tmp.sigla !== tip.temperamento.sigla || exp.sigla !== tip.expressao.sigla
        ? `<p class="painel-intro" style="margin-top:var(--space-5)">Lidos isoladamente, os seus eixos caem em
           <strong>${tip.temperamento.nome}</strong> e <strong>${tip.expressao.nome}</strong>. Os grupos acima são os do
           tipo escolhido por esta calibragem — a diferença vem do eixo que divergiu.</p>`
        : ''
    }
    ${exato}

    <section class="recon">
      <h3 class="recon-titulo">Onde as suas respostas e o seu tipo não coincidem</h3>
      ${tip.reconciliacao.map((f) => `<p class="painel-intro">${f}</p>`).join('')}
      <table class="tab-tipo tab-recon">
        <thead><tr>
          <th>Pri.</th><th>Eixo</th><th>Você respondeu</th><th>Linha de ${v.tipo}</th>
          <th>A regra prevê</th><th>Resposta × tipo</th>
        </tr></thead>
        <tbody>${linhas}</tbody>
      </table>
      ${
        divergem.length
          ? `<p class="painel-intro recon-nota">O tipo foi decidido pelos eixos de prioridade mais alta, que têm peso maior que a soma de todos os de baixo — por isso uma diferença num eixo de prioridade baixa, ou num eixo indiferenciado, quase não muda o resultado.</p>`
          : ''
      }
      <h4 class="recon-sub">Os dois eixos deriváveis, em detalhe</h4>
      <p class="painel-intro">A tabela tem seis colunas e apenas quatro graus de liberdade: ${tip.checagens
        .map((c) => c.eixoNome)
        .join(' e ')} são previsíveis a partir dos outros quatro em todas as 16 linhas. Abaixo, a previsão de cada regra contra a sua resposta. Isto não avalia o seu tipo — avalia a firmeza das suas respostas.</p>
      <ul class="lista-chk">${chk}</ul>
    </section>

    ${retratoTipo(v.tipo)}`;

  // ranking completo
  el('bloco-ranking').innerHTML = `
    <p class="ordem-detalhe">Ordem em uso: ${tip.ordemUsada.detalhe}</p>
    <h3 class="grupo-titulo">Os 16 tipos, ordenados pelo seu ajuste</h3>
    <p class="painel-intro">Score = soma de (peso de prioridade × alinhamento), com alinhamento indo de −1 (100% no polo oposto) a +1 (100% no polo do tipo). Pesos de prioridade: 32, 16, 8, 4, 2 e 1, na ordem acima.</p>
    <div class="ranking">
      ${tip.ranking
        .map(
          (t, i) => `<div class="rank-linha ${i === 0 ? 'top' : ''}">
            <span class="rank-pos">${i + 1}</span>
            <span class="rank-tipo">${t.tipo}</span>
            <span class="rank-temp">${TEMPERAMENTOS[t.temp].sigla}</span>
            <span class="rank-barra"><span style="width:${t.ajuste.toFixed(1)}%"></span></span>
            <span class="rank-num">${pct(t.ajuste)}</span>
            <span class="rank-batem">${t.batem}/6</span>
          </div>`,
        )
        .join('')}
    </div>`;
}

/* ===================== PILULA DE CALIBRAGEM ===================== */
function renderPilula(tip) {
  const atual = estado.tipoCfg.calibragem;
  el('pilula-calibragem').innerHTML = CALIBRAGEM_PILULA.map((k) => {
    const c = CALIBRAGENS[k];
    const centro = k === 'universal';
    return `<button class="pilula-parte ${centro ? 'centro' : ''} ${k === atual ? 'ativa' : ''}"
      role="tab" aria-selected="${k === atual}" data-calibragem="${k}">
      <span class="pilula-titulo">${c.nome}</span>
      <span class="pilula-sub">${centro ? 'harmoniza quatro listas' : c.detalhe.split(' › ').slice(0, 2).join(' › ') + ' …'}</span>
    </button>`;
  }).join('');

  const c = CALIBRAGENS[atual];
  let html = c.frases.map((f) => `<p>${f}</p>`).join('');
  const u = tip && tip.universal;
  if (u) {
    const venc = tip.vencedor.tipo;
    html += `<div class="listas-uni">
      <p class="listas-uni-olho">As quatro listas contrapostas — ${u.concordancia} de ${u.totalListas} apontam ${venc}</p>
      <ul class="listas-uni-lista">
        ${u.listas
          .map(
            (l) => `<li>
              <span class="lu-nome">${l.nome}${l.peso > 1 ? ' <em>peso dobrado</em>' : ''}</span>
              <span class="lu-det">${l.detalhe}</span>
              <span class="lu-res">1º ${l.topo} · ${venc} em ${l.posicaoDoVencedor}º</span>
            </li>`,
          )
          .join('')}
      </ul>
      <p class="listas-uni-pe">${
        u.concordancia === u.totalListas
          ? 'As quatro listas concordam: este tipo é sólido por qualquer caminho.'
          : `Como as listas não concordam, ${venc} é o tipo que harmoniza melhor o conjunto — nem sempre é o primeiro de cada lista isolada.`
      }</p>
    </div>`;
  }
  el('calibragem-explica').innerHTML = html;
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-calibragem]');
  if (!b) return;
  estado.tipoCfg.calibragem = b.dataset.calibragem;
  renderResultado();
  ativarAba('tipo');
  document.querySelector('.calibragem').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ===================== QUADRADOS DE GRUPO ===================== */
function membrosDeGrupo(tipos, atual) {
  return tipos
    .map(
      (t) => `<figure class="membro ${t.tipo === atual ? 'atual' : ''}">
        <img src="${imagemDoTipo(t.tipo)}" alt="Ilustração do tipo ${t.tipo}" width="640" height="640" loading="lazy">
        <figcaption>${t.tipo}</figcaption>
      </figure>`,
    )
    .join('');
}

function quadradosDeGrupo(tip) {
  const atual = tip.vencedor.tipo;
  const tmp = tip.temperamentoDoTipo;
  const exp = tip.expressaoDoTipo;
  const dt = DESCRICOES_TEMPERAMENTO[tmp.sigla];
  const de = DESCRICOES_EXPRESSAO[exp.sigla];
  const irmaosT = TIPOS.filter((t) => t.temp === tmp.sigla);
  const irmaosE = TIPOS.filter((t) => siglaExpressao(t) === exp.sigla);

  return `<div class="grade-grupos">
    <section class="quadro-grupo" style="--cor: var(--c-${tmp.sigla.toLowerCase()})">
      <p class="quadro-olho">Temperamento</p>
      <h3 class="quadro-nome">${tmp.nome} <span class="quadro-sig">${tmp.sigla}</span></h3>
      <p class="quadro-cruz">${tmp.desc}</p>
      <p class="quadro-texto">${dt.texto}</p>
      <div class="grade-membros">${membrosDeGrupo(irmaosT, atual)}</div>
    </section>
    <section class="quadro-grupo" style="--cor: var(--c-${exp.sigla.toLowerCase()})">
      <p class="quadro-olho">Expressão</p>
      <h3 class="quadro-nome">${exp.nome} <span class="quadro-sig">${exp.sigla}</span></h3>
      <p class="quadro-cruz">${exp.desc}</p>
      <p class="quadro-texto">${de.texto}</p>
      <div class="grade-membros">${membrosDeGrupo(irmaosE, atual)}</div>
    </section>
  </div>`;
}

/* ===================== ABAS ===================== */
function ativarAba(nome) {
  document.querySelectorAll('.aba').forEach((a) => a.classList.toggle('ativa', a.dataset.aba === nome));
  document.querySelectorAll('.painel').forEach((p) => p.classList.toggle('ativo', p.dataset.painel === nome));
}
document.querySelectorAll('.aba').forEach((a) => a.addEventListener('click', () => ativarAba(a.dataset.aba)));
