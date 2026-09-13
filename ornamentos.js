/* ===================================================================
   ORNAMENTOS.JS — os bracos que saem das bordas da pagina.
   Cada arquivo original nasce apontando da esquerda para o centro
   (base na esquerda, mao na direita). Todas as outras direcoes sao
   espelhamentos e giros dessa mesma arte, feitos em CSS.

   Durante a navegacao os quatro temperamentos aparecem misturados.
   Na tela de resultado todos os bracos passam a ser do temperamento
   do tipo que saiu.
   =================================================================== */

const ORN_POR_TEMP = {
  SJ: ['SJesquerdo', 'SJesquerdo1', 'SJesquerdo2', 'SJesquerdo3'],
  SP: ['SPesquerdo', 'SPesquerdo1', 'SPesquerdo2', 'SPesquerdo3'],
  NF: ['NFesquerdo', 'NFesquerdo1', 'NFesquerdo2', 'NFesquerdo3'],
  NT: ['NTesquerdo', 'NTesquerdo1', 'NTesquerdo2', 'NTesquerdo3'],
};

/* Arquivos ainda nao enviados para o projeto. Saem da lista para nao
   virar imagem quebrada; quando chegarem, basta esvaziar este array. */
const ORN_FALTANDO = ['NFesquerdo', 'NFesquerdo1', 'NTesquerdo', 'NTesquerdo1', 'NTesquerdo2', 'NTesquerdo3'];

const ORN_CAMINHO = (nome) => `img/orn/${nome}.png`;

function ornamentosDe(temp) {
  const lista = (ORN_POR_TEMP[temp] || []).filter((n) => !ORN_FALTANDO.includes(n));
  if (lista.length) return lista;
  // temperamento sem arte propria ainda: usa o acervo inteiro disponivel
  return Object.values(ORN_POR_TEMP)
    .flat()
    .filter((n) => !ORN_FALTANDO.includes(n));
}

/* Posicoes na moldura da pagina. lado define o giro/espelho aplicado. */
const ORN_SLOTS = [
  { lado: 'esq', css: 'top:4vh;   left:-5rem;    width:clamp(96px, 13vw, 210px)' },
  { lado: 'esq', css: 'top:46vh;  left:-3.5rem;  width:clamp(86px, 11vw, 190px)' },
  { lado: 'esq', css: 'top:82vh;  left:-2rem;    width:clamp(80px, 10vw, 170px)' },
  { lado: 'dir', css: 'top:16vh;  right:-5rem;  width:clamp(96px, 13vw, 210px)' },
  { lado: 'dir', css: 'top:58vh;  right:-2.5rem; width:clamp(86px, 11vw, 190px)' },
  { lado: 'dir', css: 'top:90vh;  right:-3.5rem; width:clamp(80px, 10vw, 170px)' },
  { lado: 'topo', css: 'top:1.5rem;   left:11vw;  width:clamp(80px, 9vw, 155px)' },
  { lado: 'topo', css: 'top:2rem;     right:13vw; width:clamp(80px, 9vw, 155px)' },
  { lado: 'base', css: 'bottom:-3rem; left:16vw;  width:clamp(80px, 9vw, 155px)' },
  { lado: 'base', css: 'bottom:-2.5rem; right:9vw; width:clamp(80px, 9vw, 155px)' },
];

let ornCamada = null;
let ornGiro = 0;

function garantirCamada() {
  if (ornCamada) return ornCamada;
  ornCamada = document.createElement('div');
  ornCamada.className = 'orn-camada';
  ornCamada.setAttribute('aria-hidden', 'true');
  document.body.prepend(ornCamada);
  return ornCamada;
}

/* Sorteio sem repeticao imediata: embaralha o pool e vai consumindo. */
function embaralhar(a) {
  const c = a.slice();
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

/**
 * @param {string|null} temp  sigla do temperamento (SJ/SP/NF/NT) para
 *   fixar todos os bracos; null mistura os quatro.
 */
function aplicarOrnamentos(temp) {
  const camada = garantirCamada();
  const temps = Object.keys(ORN_POR_TEMP);
  let pool = temp ? embaralhar(ornamentosDe(temp)) : [];
  let mistura = embaralhar(temps);

  const html = ORN_SLOTS.map((s, i) => {
    let nome;
    if (temp) {
      if (!pool.length) pool = embaralhar(ornamentosDe(temp));
      nome = pool.pop();
    } else {
      if (!mistura.length) mistura = embaralhar(temps);
      const t = mistura.pop();
      const lista = ornamentosDe(t);
      nome = lista[(i + ornGiro) % lista.length];
    }
    return `<img class="orn orn-${s.lado}" style="${s.css}" src="${ORN_CAMINHO(nome)}" alt="" data-slot="${i}">`;
  }).join('');

  ornGiro++;
  camada.classList.toggle('orn-fixa', !!temp);
  camada.innerHTML = html;
}
