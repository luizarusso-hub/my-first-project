// CorvidzzPuzzles shop: products, cart and checkout.
// Products come from Shopify (Storefront API) when config.js is filled in,
// otherwise from sample-products.js. The cart is kept in this browser; at checkout
// it is sent to Shopify, which opens its secure checkout page.
(function () {
  const CFG = window.CORVIDZZ_SHOP || {};
  const CONNECTED = !!(CFG.storeDomain && CFG.storefrontToken);
  const CART_KEY = "corvidzz-cart";
  const FROM_KEY = "corvidzz-from";

  // ---------- small helpers ----------
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private window: cart lasts for this page only */ } }
  };
  function money(amount, currency) {
    const n = Number(amount) || 0;
    if (n === 0) return "Free";
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD" }).format(n); }
    catch (e) { return "$" + n.toFixed(2); }
  }

  // remember where people came from (?from=instagram etc.), as on the home page
  (function () {
    const q = new URLSearchParams(location.search);
    const from = q.get("from") || q.get("utm_source");
    if (from) store.set(FROM_KEY, from.slice(0, 40));
  })();

  // ---------- Shopify Storefront API ----------
  async function shopify(query, variables) {
    const res = await fetch("https://" + CFG.storeDomain + "/api/" + (CFG.apiVersion || "2025-07") + "/graphql.json", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": CFG.storefrontToken },
      body: JSON.stringify({ query, variables })
    });
    if (!res.ok) throw new Error("Shopify answered " + res.status);
    const json = await res.json();
    if (json.errors && json.errors.length) throw new Error(json.errors[0].message);
    return json.data;
  }
  const PRODUCT_FIELDS = `
    handle title descriptionHtml availableForSale tags
    images(first: 10) { nodes { url altText } }
    variants(first: 20) { nodes { id title availableForSale price { amount currencyCode } } }`;

  // turn a Shopify product into the same shape as the sample products
  function fromShopify(p) {
    const tags = p.tags || [];
    const badgeTag = tags.find((t) => /^badge:/i.test(t));
    return {
      handle: p.handle,
      title: p.title,
      kicker: "",
      badge: badgeTag ? badgeTag.replace(/^badge:\s*/i, "") : (p.availableForSale ? "" : "Sold out"),
      descriptionHtml: p.descriptionHtml,
      images: p.images.nodes.map((i) => ({ url: i.url, alt: i.altText || p.title })),
      variants: p.variants.nodes.map((v) => ({
        id: v.id,
        title: v.title === "Default Title" ? "" : v.title,
        price: Number(v.price.amount),
        currency: v.price.currencyCode,
        available: v.availableForSale
      }))
    };
  }

  async function getProducts() {
    if (!CONNECTED) return window.CORVIDZZ_SAMPLE_PRODUCTS || [];
    const data = await shopify(`{ products(first: 50, sortKey: BEST_SELLING) { nodes { ${PRODUCT_FIELDS} } } }`);
    return data.products.nodes.map(fromShopify);
  }
  async function getProduct(handle) {
    if (!CONNECTED) return (window.CORVIDZZ_SAMPLE_PRODUCTS || []).find((p) => p.handle === handle) || null;
    const data = await shopify(`query ($h: String!) { product(handle: $h) { ${PRODUCT_FIELDS} } }`, { h: handle });
    return data.product ? fromShopify(data.product) : null;
  }

  // ---------- pictures: a photo, or the teal book cover drawn in CSS ----------
  function art(p, opts) {
    opts = opts || {};
    const img = p.images && p.images[opts.index || 0];
    if (img) return `<img class="photo" src="${esc(img.url)}" alt="${esc(img.alt || p.title)}" loading="lazy">`;
    return `<div class="cover" role="img" aria-label="${esc(p.title)}">
      <img src="${opts.base || ""}../assets/img/logo.png?v=2" alt="">
      ${p.kicker ? `<span class="c-kicker">${esc(p.kicker)}</span>` : ""}
      <span class="c-title">${esc(p.title).replace(/ (\S+)$/, "&nbsp;$1")}</span></div>`;
  }
  function priceRange(p) {
    const prices = p.variants.map((v) => v.price);
    const min = Math.min.apply(null, prices), max = Math.max.apply(null, prices);
    const cur = p.variants[0] && p.variants[0].currency;
    return min === max ? money(min, cur) : "From " + money(min, cur);
  }
  const isAvailable = (p) => p.variants.some((v) => v.available);

  // ---------- the cart (kept in this browser) ----------
  let cart = store.get(CART_KEY, []);
  if (!Array.isArray(cart)) cart = [];
  function saveCart() { store.set(CART_KEY, cart); renderCart(); }
  function addToCart(p, v, qty) {
    const line = cart.find((l) => l.variantId === v.id);
    if (line) line.qty = Math.min(99, line.qty + qty);
    else cart.push({
      variantId: v.id, handle: p.handle, title: p.title, kicker: p.kicker || "", variantTitle: v.title,
      price: v.price, currency: v.currency, image: p.images && p.images[0] ? p.images[0] : null, qty
    });
    saveCart();
  }
  function setQty(variantId, qty) {
    cart = cart.map((l) => l.variantId === variantId ? Object.assign({}, l, { qty }) : l).filter((l) => l.qty > 0);
    saveCart();
  }
  const count = () => cart.reduce((n, l) => n + l.qty, 0);

  // ---------- cart drawer ----------
  function mountCart() {
    const shade = document.createElement("div");
    shade.className = "cart-shade";
    shade.addEventListener("click", closeCart);
    const panel = document.createElement("aside");
    panel.className = "cart";
    panel.setAttribute("aria-label", "Your basket");
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = `
      <div class="cart-head"><h2>Your Basket</h2><button class="close" type="button" aria-label="Close basket">&times;</button></div>
      <div class="rule" aria-hidden="true">&#10022;</div>
      <ul class="cart-lines" id="cart-lines"></ul>
      <div class="cart-foot" id="cart-foot">
        <p class="subtotal"><span>Subtotal</span><span id="cart-subtotal"></span></p>
        <p class="note">Shipping and tax are worked out at checkout.</p>
        <button class="btn block" type="button" id="checkout"><span class="star" aria-hidden="true">&#10022;</span> Checkout <span class="star" aria-hidden="true">&#10022;</span></button>
        <p class="cart-msg" id="cart-msg" role="status" aria-live="polite"></p>
      </div>`;
    document.body.append(shade, panel);
    panel.querySelector(".close").addEventListener("click", closeCart);
    panel.querySelector("#checkout").addEventListener("click", checkout);
    panel.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      const line = cart.find((l) => l.variantId === b.dataset.id);
      if (!line) return;
      if (b.dataset.act === "inc") setQty(line.variantId, Math.min(99, line.qty + 1));
      if (b.dataset.act === "dec") setQty(line.variantId, line.qty - 1);
      if (b.dataset.act === "remove") setQty(line.variantId, 0);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("cart-open")) closeCart(); });
    document.querySelectorAll("[data-open-cart]").forEach((b) => b.addEventListener("click", openCart));
    renderCart();
  }
  let lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    document.body.classList.add("cart-open");
    const panel = document.querySelector(".cart");
    panel.setAttribute("aria-hidden", "false");
    panel.querySelector(".close").focus();
  }
  function closeCart() {
    document.body.classList.remove("cart-open");
    document.querySelector(".cart").setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
  }
  function renderCart() {
    document.querySelectorAll(".cart-count").forEach((el) => { el.textContent = count(); el.dataset.n = count(); });
    const list = document.getElementById("cart-lines");
    if (!list) return;
    const foot = document.getElementById("cart-foot");
    if (!cart.length) {
      list.innerHTML = `<li class="cart-empty"><img src="../assets/img/page-emblem.webp" alt="">Your basket is empty.<br><a href="./">Find your next puzzle</a></li>`;
      foot.hidden = true;
      return;
    }
    foot.hidden = false;
    list.innerHTML = cart.map((l) => `
      <li class="line">
        <a class="thumb" href="product.html?p=${encodeURIComponent(l.handle)}" tabindex="-1">${art({ title: l.title, kicker: l.kicker, images: l.image ? [l.image] : [] })}</a>
        <div>
          <h3>${esc(l.title)}</h3>
          ${l.variantTitle ? `<p class="variant">${esc(l.variantTitle)}</p>` : ""}
          <div class="qty" aria-label="Quantity">
            <button type="button" data-act="dec" data-id="${esc(l.variantId)}" aria-label="One fewer">&minus;</button>
            <span>${l.qty}</span>
            <button type="button" data-act="inc" data-id="${esc(l.variantId)}" aria-label="One more">+</button>
          </div>
        </div>
        <div><p class="amount" style="margin:0">${money(l.price * l.qty, l.currency)}</p>
          <button class="remove" type="button" data-act="remove" data-id="${esc(l.variantId)}">Remove</button></div>
      </li>`).join("");
    const total = cart.reduce((s, l) => s + l.price * l.qty, 0);
    document.getElementById("cart-subtotal").textContent = money(total, cart[0].currency);
  }

  // ---------- checkout: hand the basket to Shopify ----------
  async function checkout() {
    const msg = document.getElementById("cart-msg");
    const btn = document.getElementById("checkout");
    if (!CONNECTED) {
      msg.textContent = "Checkout opens once the shop is connected to Shopify. This is a preview.";
      return;
    }
    btn.disabled = true;
    msg.textContent = "Opening checkout…";
    try {
      const from = store.get(FROM_KEY, "direct");
      const data = await shopify(
        `mutation ($input: CartInput!) { cartCreate(input: $input) { cart { checkoutUrl } userErrors { message } } }`,
        { input: {
          lines: cart.map((l) => ({ merchandiseId: l.variantId, quantity: l.qty })),
          attributes: [{ key: "came_from", value: String(from) }]
        } }
      );
      const r = data.cartCreate;
      if (r.userErrors && r.userErrors.length) throw new Error(r.userErrors[0].message);
      location.href = r.cart.checkoutUrl;
    } catch (e) {
      btn.disabled = false;
      msg.textContent = "Sorry, checkout didn't open (" + e.message + "). Please try again.";
    }
  }

  // ---------- start ----------
  document.addEventListener("DOMContentLoaded", () => {
    mountCart();
    const note = document.getElementById("preview-note");
    if (note) note.hidden = CONNECTED;
  });

  window.CZ = { getProducts, getProduct, art, money, priceRange, isAvailable, addToCart, openCart, esc, CONNECTED };
})();
