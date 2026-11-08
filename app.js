const phone = '5511967443239';
const products = [
  ['Conjunto SIVIE Cinza', 'conjunto', 'Conjunto em malha', '002'], ['Look Essencial', 'essencial', 'Leve para o dia a dia', '008'],
  ['Conjunto Paula', 'conjunto', 'Conforto em movimento', '015'], ['Tons terrosos', 'casual', 'Texturas naturais', '023'],
  ['Alfaiataria SIVIE', 'alfaiataria', 'Caimento leve', '033'], ['Conjunto natural', 'conjunto', 'Escolhas que acolhem', '043'],
  ['Essenciais da estação', 'essencial', 'Para viver o agora', '057'], ['Look em movimento', 'casual', 'Leveza cotidiana', '066'],
  ['Conjunto rosa antigo', 'alfaiataria', 'Presença e suavidade', '079'], ['Peça especial SIVIE', 'casual', 'Detalhes que contam', '087'],
  ['Essencial neutro', 'essencial', 'Atemporal por natureza', '095'], ['Conjunto em malha', 'conjunto', 'Conforto SIVIE', '100']
];
let filter = 'all'; let visible = 8; let bag = [];
const grid = document.querySelector('#product-grid');
const oldCheckout = document.querySelector('#checkout');
const checkout = document.createElement('a');
checkout.id = 'checkout';
checkout.textContent = oldCheckout.textContent;
checkout.style.cssText = 'display:block;background:#272522;color:#fff;padding:17px;text-align:center;text-decoration:none;font:600 10px DM Sans,Arial,sans-serif;letter-spacing:.1em;cursor:pointer';
oldCheckout.replaceWith(checkout);
const pad = n => String(n).padStart(3, '0');
const matching = () => filter === 'all' ? products : products.filter(item => item[1] === filter);
const whatsapp = message => `https://wa.me/${phone}?text=${encodeURIComponent(`Olá, SIVIE! ${message}.`)}`;

function render() {
  grid.innerHTML = matching().slice(0, visible).map(item => `<article class="product"><div class="photo"><img src="assets/catalogo/sivie-${pad(item[3])}.jpeg" alt="${item[0]}" loading="lazy"><button class="add" data-add="${item[0]}">ADICIONAR À SACOLA</button></div><div class="info"><h3>${item[0]}</h3><p>${item[2]}</p></div></article>`).join('');
  document.querySelector('#show-more').hidden = visible >= matching().length;
}

function updateBag() {
  const count = bag.length;
  document.querySelector('#bag-count').textContent = count;
  document.querySelector('#bag-title-count').textContent = `(${count})`;
  document.querySelector('#bag-items').innerHTML = count ? bag.map((item, index) => `<article class="bag-item"><img src="assets/catalogo/sivie-${pad(item[3])}.jpeg" alt="${item[0]}"><div><h3>${item[0]}</h3><p>${item[2]}</p></div><button data-remove="${index}">REMOVER</button></article>`).join('') : '<p class="empty">Sua sacola está vazia.<br>Escolha uma peça para continuar.</p>';
  checkout.href = count ? whatsapp(`quero finalizar meu pedido: ${bag.map(item => item[0]).join(', ')}`) : '#';
  checkout.style.opacity = count ? '1' : '.35';
  checkout.style.pointerEvents = count ? 'auto' : 'none';
}

function openBag() { document.querySelector('#bag').classList.add('open'); document.querySelector('#overlay').classList.add('open'); }
function closeBag() { document.querySelector('#bag').classList.remove('open'); document.querySelector('#overlay').classList.remove('open'); }

document.addEventListener('click', event => {
  const add = event.target.closest('[data-add]');
  const remove = event.target.closest('[data-remove]');
  if (add) {
    bag.push(products.find(item => item[0] === add.dataset.add)); updateBag();
    const toast = document.querySelector('#toast'); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200);
  }
  if (remove) { bag.splice(Number(remove.dataset.remove), 1); updateBag(); }
});
document.querySelectorAll('[data-filter]').forEach(link => link.onclick = event => {
  event.preventDefault(); filter = link.dataset.filter; visible = 8;
  document.querySelector('#filter-label').textContent = `${link.textContent} ⌄`; render(); document.querySelector('#novidades').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('#show-more').onclick = () => { visible = matching().length; render(); };
document.querySelector('.bag-trigger').onclick = openBag;
document.querySelector('#close').onclick = closeBag;
document.querySelector('#overlay').onclick = closeBag;
document.querySelector('.menu').onclick = event => { const nav = document.querySelector('nav'); nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open')); };

// Link nativo: abre sem depender de pop-ups, inclusive no GitHub Pages.
document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsapp(link.dataset.whatsapp); });
document.querySelector('#year').textContent = new Date().getFullYear();
render(); updateBag();
