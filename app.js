/* ============================================================
   ASMAIN COLLECTION — STORE LOGIC
   ============================================================ */

const fmt = n => `${STORE.currency} ${n.toLocaleString()}`;
let cart = JSON.parse(localStorage.getItem('asmain_cart') || '[]');
let activeFilter = 'All';

/* ---------- RENDER PRODUCTS ---------- */
function renderProducts(list){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML = list.map(p => `
    <div class="product">
      <div class="product-img-wrap" onclick="openProduct(${p.id})">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge ${p.badge === 'Sale' ? 'sale' : ''}">${p.badge}</span>` : ''}
        <button class="product-quick" onclick="event.stopPropagation();addToCart(${p.id})">Add to Cart</button>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">
          ${fmt(p.price)}
          ${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s>` : ''}
        </div>
      </div>
    </div>
  `).join('') || '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#888">No products in this category yet.</p>';
}

/* ---------- FILTERS ---------- */
function renderFilters(){
  const wrap = document.getElementById('filters');
  if(!wrap) return;
  const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  wrap.innerHTML = cats.map(c => `
    <button class="filter-btn ${c === activeFilter ? 'active' : ''}"
      onclick="setFilter('${c}')">${c}</button>
  `).join('');
}
function setFilter(cat){
  activeFilter = cat;
  const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  renderProducts(list);
  renderFilters();
}

/* ---------- PRODUCT MODAL ---------- */
function openProduct(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const overlay = document.getElementById('productModal');
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-img"><img src="${p.image}" alt="${p.name}" /></div>
    <div class="modal-body">
      <button class="modal-close" onclick="closeProduct()">×</button>
      <div class="modal-cat">${p.category}</div>
      <h2>${p.name}</h2>
      <div class="modal-price">
        ${fmt(p.price)}
        ${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s>` : ''}
      </div>
      <p class="modal-desc">${p.description || ''}</p>
      <button class="btn" onclick="addToCart(${p.id});closeProduct()">Add to Cart</button>
    </div>
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeProduct(){
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- CART ---------- */
function saveCart(){ localStorage.setItem('asmain_cart', JSON.stringify(cart)); }

function addToCart(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const item = cart.find(x => x.id === id);
  if(item) item.qty++;
  else cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category, qty: 1 });
  saveCart();
  renderCart();
  showToast(`${p.name} added to cart`);
}
function removeItem(id){
  cart = cart.filter(x => x.id !== id);
  saveCart(); renderCart();
}
function changeQty(id, d){
  const it = cart.find(x => x.id === id);
  if(!it) return;
  it.qty += d;
  if(it.qty <= 0) removeItem(id);
  else { saveCart(); renderCart(); }
}

function renderCart(){
  const body = document.getElementById('cartBody');
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const badge = document.getElementById('cartCount');
  if(badge) badge.textContent = count;
  const totalEl = document.getElementById('cartTotal');
  if(totalEl) totalEl.textContent = fmt(total);

  if(!body) return;
  if(cart.length === 0){
    body.innerHTML = '<div class="empty">Your cart is empty</div>';
    return;
  }
  body.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.image}" alt="${i.name}" />
      <div class="cart-item-info">
        <h4>${i.name}</h4>
        <div class="price">${fmt(i.price)}</div>
        <div class="qty">
          <button onclick="changeQty(${i.id},-1)">−</button>
          <span>${i.qty}</span>
          <button onclick="changeQty(${i.id},1)">+</button>
        </div>
        <button class="remove" onclick="removeItem(${i.id})">Remove</button>
      </div>
    </div>
  `).join('');
}

function openCart(){
  document.getElementById('overlay').classList.add('open');
  document.getElementById('drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart(){
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('drawer').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- WHATSAPP CHECKOUT ---------- */
function checkout(){
  if(cart.length === 0){ showToast('Your cart is empty'); return; }
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  let msg = `Hello ASMAIN COLLECTION! 👋\n\nI'd like to order:\n\n`;
  cart.forEach(i => {
    msg += `• ${i.name} (${i.category}) × ${i.qty} — ${fmt(i.price * i.qty)}\n`;
  });
  msg += `\n*Total: ${fmt(total)}*\n\nPlease confirm availability and delivery details. Thank you!`;
  window.open(`${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- MOBILE MENU ---------- */
function openMobileMenu(){ document.getElementById('mobileMenu').classList.add('open'); }
function closeMobileMenu(){ document.getElementById('mobileMenu').classList.remove('open'); }

/* ---------- NEWSLETTER ---------- */
function subscribe(e){
  e.preventDefault();
  e.target.reset();
  showToast('Thank you for subscribing! 💛');
}

/* ---------- NAV SCROLL EFFECT ---------- */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-wrap');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderProducts(PRODUCTS);
  renderCart();
});