// script.js - minimal cart behavior
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  const cartCountEl = document.getElementById('cart-count');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const addButtons = document.querySelectorAll('.add-btn');
  const yearEl = document.getElementById('year');
  const mobileToggle = document.getElementById('mobileToggle');

  // simple in-memory cart
  const cart = {};

  function updateCartUI() {
    const ids = Object.keys(cart);
    const totalItems = ids.reduce((s, id) => s + cart[id].qty, 0);
    cartCountEl.textContent = totalItems;
    // render items
    cartItemsEl.innerHTML = '';
    if (ids.length === 0) {
      cartItemsEl.innerHTML = '<p class="muted">Your cart is empty.</p>';
      cartTotalEl.textContent = '฿0';
      return;
    }
    let totalPrice = 0;
    ids.forEach(id => {
      const item = cart[id];
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="https://via.placeholder.com/120x90?text=Img" alt="${escapeHtml(item.name)}">
        <div style="flex:1">
          <div style="font-weight:600">${escapeHtml(item.name)}</div>
          <div style="color:#6b7280; font-size:0.95rem">฿${item.price} x ${item.qty}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700">฿${item.price * item.qty}</div>
          <div style="margin-top:8px">
            <button class="btn small" data-action="dec" data-id="${id}">-</button>
            <button class="btn small" data-action="inc" data-id="${id}">+</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(row);
      totalPrice += item.price * item.qty;
    });
    cartTotalEl.textContent = `฿${totalPrice}`;
    // attach inc/dec listeners
    cartItemsEl.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        if (action === 'inc') cart[id].qty += 1;
        if (action === 'dec') {
          cart[id].qty -= 1;
          if (cart[id].qty <= 0) delete cart[id];
        }
        updateCartUI();
      });
    });
  }

  function openCart() {
    cartSidebar.classList.add('open');
    cartSidebar.setAttribute('aria-hidden', 'false');
  }
  function closeCartFn() {
    cartSidebar.classList.remove('open');
    cartSidebar.setAttribute('aria-hidden', 'true');
  }

  addButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const id = btn.dataset.id || `id-${Math.random().toString(36).slice(2,8)}`;
      const name = btn.dataset.name || (btn.closest('.product-preview') && btn.closest('.product-preview').querySelector('h3')?.textContent) || 'Product';
      const price = Number(btn.dataset.price || 1250);
      if (!cart[id]) cart[id] = { id, name, price, qty: 0 };
      cart[id].qty += 1;
      updateCartUI();
      openCart();
    });
  });

  cartBtn.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartFn);

  // Checkout behavior (demo)
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('This is a demo page. Checkout is not implemented.');
  });

  // mobile toggle (very simple)
  mobileToggle.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    if (nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // set year
  yearEl.textContent = new Date().getFullYear();

  // small utility
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); }
});
