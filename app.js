const WHATSAPP = '5511967443239';
const products = [
  ['Look 01', 'Conjunto em malha', '002'], ['Look 02', 'Essenciais SIVIE', '008'],
  ['Look 03', 'Alfaiataria leve', '015'], ['Look 04', 'Texturas naturais', '023'],
  ['Look 05', 'Tons de terra', '033'], ['Look 06', 'Escolhas SIVIE', '043'],
  ['Look 07', 'Neutros que acolhem', '057'], ['Look 08', 'Para todos os dias', '066'],
  ['Look 09', 'Silhueta livre', '075'], ['Look 10', 'Rosa antigo', '079'],
  ['Look 11', 'Coleção cápsula', '087'], ['Look 12', 'Luz & movimento', '095']
];

function whatsappLink(message) { return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá, SIVIE! ${message}.`)}`; }
function card([name, tag, number], index) {
  return `<article class="product"><div class="product-image"><img src="assets/catalogo/sivie-${number}.jpeg" alt="${name} SIVIE" loading="lazy" /><span class="product-number">${String(index + 1).padStart(2, '0')}</span></div><div class="product-meta"><div><h3 class="product-name">${name}</h3><p class="product-tag">${tag}</p></div><button class="buy" data-product="${name}">Comprar ↗</button></div></article>`;
}
const grid = document.querySelector('#product-grid');
let visible = 8;
function render() { grid.innerHTML = products.slice(0, visible).map(card).join(''); document.querySelector('#show-more').hidden = visible >= products.length; }
render();
document.querySelector('#show-more').addEventListener('click', () => { visible = products.length; render(); });
document.addEventListener('click', event => {
  const product = event.target.closest('[data-product]');
  if (product) window.open(whatsappLink(`quero comprar o ${product.dataset.product}`), '_blank', 'noopener');
});
document.querySelectorAll('[data-whatsapp]').forEach(link => link.href = whatsappLink(link.dataset.whatsapp.replace(/^Olá,?\s*/i, '')));
document.querySelector('#year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
