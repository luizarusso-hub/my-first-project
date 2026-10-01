// CorvidzzPuzzles website script, shared by every page.
// Each part only runs when its piece is on the page.

// ===== Shared drawings (stars, raven, moon and the garland pieces) =====
// Added once here so every page can use <svg><use href="#star"/></svg>.
(function () {
  const holder = document.createElement("div");
  holder.innerHTML = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <symbol id="raven" viewBox="0 0 110 100">
        <path fill="currentColor" d="M105 31 L89 24 C85 18 77 15 70 17 C61 19 55 26 51 34 C43 46 31 58 21 70 L5 90 L13 93 L30 81 C38 79 47 77 55 75 L57 83 L51 93 L55 93 L59 85 L61 93 L65 93 L62 81 C69 73 75 63 76 55 C80 49 84 42 87 35 Z"/>
        <circle cx="79" cy="24" r="1.7" fill="#efe4c6"/>
        <g fill="none" stroke="#efe4c6" stroke-linecap="round" opacity=".45">
          <path d="M55 38 C60 50 56 62 36 76" stroke-width="1.2"/>
          <path d="M50 50 C48 58 42 66 30 74" stroke-width=".9"/>
          <path d="M45 58 C40 66 34 70 24 76" stroke-width=".8"/>
        </g>
      </symbol>
      <symbol id="star" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 0l2.6 7.8L22 5.5l-4.7 6.5L22 18.5l-7.4-2.3L12 24l-2.6-7.8L2 18.5l4.7-6.5L2 5.5l7.4 2.3z"/>
      </symbol>
      <!-- Long eight-pointed storybook star -->
      <symbol id="sparkle" viewBox="-50 -50 100 100">
        <path fill="currentColor" stroke="#8a6420" stroke-width=".8" d="M0.0 -50.0L1.2 -3.0L9.2 -9.2L3.0 -1.2L32.0 0.0L3.0 1.2L9.2 9.2L1.2 3.0L0.0 50.0L-1.2 3.0L-9.2 9.2L-3.0 1.2L-32.0 0.0L-3.0 -1.2L-9.2 -9.2L-1.2 -3.0Z"/>
      </symbol>
      <!-- Engraved garland pieces (sepia line art) -->
      <symbol id="g-rose" viewBox="-13 -13 26 26" overflow="visible">
        <g fill="#efe2c2" stroke="#6e5230" stroke-width=".9" stroke-linejoin="round">
          <path d="M0 -11 C6 -12 11 -7 11 -1 C12 5 7 11 0 11 C-7 11 -12 5 -11 -1 C-11 -7 -6 -12 0 -11Z"/>
          <path d="M-7 -3 C-6 -8 6 -8 7 -3 C8 3 3 7 0 7 C-4 7 -8 3 -7 -3Z"/>
          <path d="M-3 -1 C-3 -4 3 -4 3 -1 C3 2 0 3 -1 2" fill="none"/>
          <path d="M-9 4 C-6 8 -2 9 0 9 M9 4 C6 8 2 9 0 9" fill="none" stroke-width=".6"/>
        </g>
      </symbol>
      <symbol id="g-blossom" viewBox="-10 -10 20 20" overflow="visible">
        <g fill="#efe2c2" stroke="#6e5230" stroke-width=".85">
          <ellipse cx="0" cy="-5" rx="3.4" ry="4.6"/>
          <ellipse cx="0" cy="-5" rx="3.4" ry="4.6" transform="rotate(72)"/>
          <ellipse cx="0" cy="-5" rx="3.4" ry="4.6" transform="rotate(144)"/>
          <ellipse cx="0" cy="-5" rx="3.4" ry="4.6" transform="rotate(216)"/>
          <ellipse cx="0" cy="-5" rx="3.4" ry="4.6" transform="rotate(288)"/>
          <circle r="2.4" fill="#c9a869"/>
        </g>
      </symbol>
      <symbol id="g-grapes" viewBox="-8 -4 16 22" overflow="visible">
        <g fill="#e3d0a4" stroke="#6e5230" stroke-width=".8">
          <circle cx="-4" cy="0" r="3"/><circle cx="2" cy="0" r="3"/><circle cx="-1" cy="4.6" r="3"/>
          <circle cx="5" cy="4.6" r="3"/><circle cx="-5" cy="4.6" r="3"/><circle cx="2" cy="9.2" r="3"/>
          <circle cx="-3" cy="9.2" r="3"/><circle cx="-0.5" cy="13.6" r="3"/>
        </g>
      </symbol>
      <symbol id="g-leaf" viewBox="0 -5 18 10" overflow="visible">
        <path d="M0 0 C4 -5 12 -5 18 0 C12 5 4 5 0 0Z" fill="#e6d6ad" stroke="#6e5230" stroke-width=".8"/>
        <path d="M1 0 L16 0 M6 0 L9 -2.6 M10 0 L13 -2.2 M6 0 L9 2.6 M10 0 L13 2.2" fill="none" stroke="#6e5230" stroke-width=".55"/>
      </symbol>
      <symbol id="g-bud" viewBox="-4 -10 8 12" overflow="visible">
        <path d="M0 -9 C4 -6 4 -1 0 1 C-4 -1 -4 -6 0 -9Z" fill="#efe2c2" stroke="#6e5230" stroke-width=".8"/>
        <path d="M-3 0 L0 -3 L3 0" fill="none" stroke="#6e5230" stroke-width=".6"/>
      </symbol>

      <symbol id="flourish" viewBox="0 0 80 22">
        <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <path d="M2 11 C14 2 24 20 34 11"/><path d="M78 11 C66 2 56 20 46 11"/>
        </g>
        <path fill="currentColor" d="M40 3 l2.2 6 6 2 -6 2 -2.2 6 -2.2 -6 -6 -2 6 -2z"/>
      </symbol>
      <symbol id="moon" viewBox="0 0 60 60">
        <path fill="currentColor" d="M34 6a24 24 0 1 0 20 34A20 20 0 1 1 34 6z"/>
        <path fill="currentColor" d="M44 12l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z"/>
        <path fill="currentColor" d="M52 26l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1z"/>
      </symbol>
    </defs>
  </svg>
`;
  document.body.prepend(holder.firstElementChild);
})();

// ===== Engraved flower garland =====
// Draws a climbing vine of roses, blossoms, grapes, buds and leaves just inside
// each panel's edge (up the sides and over the arch), sized to the panel.
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const PIECES = ["g-rose", "g-blossom", "g-grapes", "g-blossom", "g-bud"];

  function rng(seed) {
    return function () {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  }

  function el(name, attrs) {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function draw(panel, index) {
    const W = panel.clientWidth, H = panel.clientHeight;
    if (!W || !H) return;
    const small = W < 460;
    const d = small ? 14 : 24;          // inset from the edge
    const k = small ? 0.8 : 1.3;        // size of flowers and leaves
    const arch = panel.classList.contains("arch");
    const ry = arch ? parseFloat(getComputedStyle(panel).getPropertyValue("--arch")) || 300 : 0;

    let svg = panel.querySelector(":scope > .garland");
    if (!svg) {
      svg = el("svg", { class: "garland", "aria-hidden": "true" });
      panel.prepend(svg);
    }
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.replaceChildren();

    const bottom = H - d - 6;
    let guide;
    if (arch) {
      const r = Math.min(ry, H * 0.6);
      guide = `M${d} ${bottom} L${d} ${r} A${W / 2 - d} ${r - d} 0 0 1 ${W - d} ${r} L${W - d} ${bottom}`;
    } else {
      const c = 16;
      guide = `M${d} ${bottom} L${d} ${d + c} Q${d} ${d} ${d + c} ${d} L${W - d - c} ${d} Q${W - d} ${d} ${W - d} ${d + c} L${W - d} ${bottom}`;
    }
    const g = el("path", { d: guide, fill: "none" });
    svg.appendChild(g);
    const L = g.getTotalLength();

    const at = (s) => {
      const p = g.getPointAtLength(Math.max(0, Math.min(L, s)));
      const q = g.getPointAtLength(Math.max(0, Math.min(L, s + 1)));
      const len = Math.hypot(q.x - p.x, q.y - p.y) || 1;
      const tx = (q.x - p.x) / len, ty = (q.y - p.y) / len;
      return { x: p.x, y: p.y, tx, ty, nx: -ty, ny: tx, a: Math.atan2(ty, tx) * 180 / Math.PI };
    };

    // Two intertwined wavy stems
    for (const phase of [0, Math.PI]) {
      let dStr = "";
      for (let s = 0; s <= L; s += 4) {
        const p = at(s);
        const off = Math.sin(s / (38 * k) + phase) * 5 * k;
        dStr += (s ? "L" : "M") + (p.x + p.nx * off).toFixed(1) + " " + (p.y + p.ny * off).toFixed(1);
      }
      svg.appendChild(el("path", { d: dStr, class: "vine" }));
    }

    const rand = rng(1234 + index * 97);
    const leaves = el("g", {}), flowers = el("g", {}), tendrils = el("g", {});
    let n = 0;
    for (let s = 10; s < L - 6; s += 11 * k, n++) {
      const p = at(s);
      const side = n % 2 ? 1 : -1;
      // leaf on alternating sides of the stem
      const la = p.a + side * (48 + rand() * 20);
      leaves.appendChild(el("use", {
        href: "#g-leaf",
        width: 18, height: 10,
        transform: `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${la.toFixed(1)}) scale(${(k * (0.8 + rand() * 0.45)).toFixed(2)}) translate(0 -5)`
      }));
      // a flower, grape cluster or bud every few leaves
      if (n % 2 === 1) {
        const piece = PIECES[Math.floor(rand() * PIECES.length)];
        const inward = 4 + rand() * 6;
        const fx = p.x + p.nx * inward * k, fy = p.y + p.ny * inward * k;
        const size = piece === "g-rose" ? 26 : piece === "g-grapes" ? 16 : piece === "g-bud" ? 8 : 20;
        const h = piece === "g-grapes" ? 22 : piece === "g-bud" ? 12 : size;
        const sc = k * (0.85 + rand() * 0.35);
        flowers.appendChild(el("use", {
          href: "#" + piece,
          width: size, height: h,
          transform: `translate(${fx.toFixed(1)} ${fy.toFixed(1)}) rotate(${(p.a + 90 + (rand() - 0.5) * 60).toFixed(1)}) scale(${sc.toFixed(2)}) translate(${-size / 2} ${-h / 2})`
        }));
      }
      // curling tendrils now and then
      if (n % 7 === 3) {
        const r = 7 * k;
        const sx = p.x, sy = p.y;
        const ex = sx + p.nx * r * 2 + p.tx * r, ey = sy + p.ny * r * 2 + p.ty * r;
        tendrils.appendChild(el("path", {
          class: "tendril",
          d: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${(sx + p.nx * r * 2.6).toFixed(1)} ${(sy + p.ny * r * 2.6).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)} q${(p.tx * r * 0.8).toFixed(1)} ${(p.ty * r * 0.8).toFixed(1)} ${(-p.nx * r * 0.6).toFixed(1)} ${(-p.ny * r * 0.6).toFixed(1)}`
        }));
      }
    }
    svg.append(tendrils, leaves, flowers);
  }

  const panels = [...document.querySelectorAll("[data-garland]")];
  const redraw = () => panels.forEach(draw);
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver((entries) => entries.forEach((e) => draw(e.target, panels.indexOf(e.target))));
    panels.forEach((p) => ro.observe(p));
  } else {
    window.addEventListener("resize", redraw);
  }
  redraw();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
})();

// ===== The night sky: searching ravens, butterflies, fireflies =====
(function () {
  const sky = document.getElementById("sky");
  if (!sky) return;
  const RAVEN = '<img src="assets/img/raven.svg" alt="">';
  [["c1", RAVEN], ["c2", RAVEN], ["c3", RAVEN], ["c6", RAVEN]].forEach(([cls, art]) => {
    const d = document.createElement("div");
    d.className = "creature " + cls;
    d.innerHTML = art;
    sky.appendChild(d);
  });
  // butterflies: each wanders its own slow path, mostly beside the panel
  const side = (i) => (i % 2 ? 78 + Math.random() * 18 : 2 + Math.random() * 16);
  for (let i = 0; i < 8; i++) {
    const b = document.createElement("div");
    b.className = "bfly";
    b.innerHTML = '<img src="assets/img/butterfly.svg" alt="">';
    const st = b.style, base = side(i);
    for (let k = 0; k < 5; k++) {
      const x = Math.min(97, Math.max(0, base + (Math.random() * 14 - 7)));
      st.setProperty("--x" + k, x.toFixed(1) + "vw");
      st.setProperty("--y" + k, (20 + Math.random() * 72).toFixed(1) + "vh");
    }
    st.setProperty("--s", (24 + Math.random() * 16).toFixed(0) + "px");
    st.setProperty("--d", (18 + Math.random() * 16).toFixed(1) + "s");
    st.setProperty("--delay", (-Math.random() * 30).toFixed(1) + "s");
    st.setProperty("--f", (0.22 + Math.random() * 0.18).toFixed(2) + "s");
    st.setProperty("--r", (Math.random() * 40 - 20).toFixed(0) + "deg");
    st.opacity = (0.55 + Math.random() * 0.4).toFixed(2);
    sky.appendChild(b);
  }
  for (let i = 0; i < 18; i++) {
    const f = document.createElement("span");
    f.className = "firefly";
    f.style.left = Math.random() * 100 + "vw";
    f.style.top = 40 + Math.random() * 60 + "vh";
    f.style.setProperty("--d", 10 + Math.random() * 14 + "s");
    f.style.setProperty("--g", 2 + Math.random() * 4 + "s");
    f.style.setProperty("--x", (Math.random() * 120 - 60).toFixed(0) + "px");
    f.style.setProperty("--y", (Math.random() * -120).toFixed(0) + "px");
    f.style.animationDelay = (-Math.random() * 10).toFixed(1) + "s, " + (-Math.random() * 4).toFixed(1) + "s";
    sky.appendChild(f);
  }
})();

// ===== Menu button (phones and tablets) =====
(function () {
  const btn = document.getElementById("menu-btn");
  const nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

document.querySelectorAll(".year").forEach((n) => { n.textContent = new Date().getFullYear(); });

// ===== Try a page: mini crossword =====
(function () {
  const grid = document.getElementById("xw");
  if (!grid) return;
  const cells = [...grid.querySelectorAll(".cell[data-a]")];
  const inputs = cells.map((c) => c.querySelector("input"));
  inputs.forEach((inp, i) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.replace(/[^a-z]/gi, "").slice(-1).toUpperCase();
      inp.parentElement.classList.remove("ok", "bad");
      if (inp.value && inputs[i + 1]) inputs[i + 1].focus();
    });
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !inp.value && inputs[i - 1]) inputs[i - 1].focus();
    });
  });
  document.getElementById("xw-check").addEventListener("click", () => {
    let right = 0, filled = 0;
    cells.forEach((c) => {
      const v = c.querySelector("input").value;
      c.classList.remove("ok", "bad");
      if (!v) return;
      filled++;
      if (v === c.dataset.a) { right++; c.classList.add("ok"); } else c.classList.add("bad");
    });
    const out = document.getElementById("xw-verdict");
    if (right === cells.length) { out.className = "verdict win"; out.textContent = "Splendid! Every square is true. The ravens are impressed."; }
    else if (!filled) { out.className = "verdict lose"; out.textContent = "The grid is empty. Begin with 1 Across."; }
    else { out.className = "verdict lose"; out.textContent = right + " of " + cells.length + " squares are true. The red ones need another look."; }
  });
})();

// ===== Try a page: secret code =====
(function () {
  const form = document.getElementById("cipher-form");
  if (!form) return;
  // letters around the small wheel: outer ring plain, inner ring shifted by three
  const g = document.getElementById("wheel-letters");
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * 2 * Math.PI - Math.PI / 2;
    for (const [r, ch, size] of [[60, A[i], 10], [40, A[(i + 3) % 26], 8]]) {
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", (75 + r * Math.cos(a)).toFixed(1));
      t.setAttribute("y", (75 + r * Math.sin(a) + size * 0.35).toFixed(1));
      t.setAttribute("font-size", size);
      t.textContent = ch;
      g.appendChild(t);
    }
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const guess = document.getElementById("cipher-guess").value.toUpperCase().replace(/[^A-Z]/g, "");
    const out = document.getElementById("cipher-verdict");
    if (guess === "LIKEANDSUBSCRIBE") {
      out.className = "verdict win"; out.textContent = "Thou hast cracked it: “Like and subscribe.” Even the ravens are online now.";
    } else {
      out.className = "verdict lose"; out.textContent = "Not quite. Hint: O becomes L, and D becomes A.";
    }
  });
})();

// ===== Countdown to the next secret topic (the first of each month) =====
(function () {
  const box = document.getElementById("countdown");
  if (!box) return;
  const monthName = document.getElementById("next-month");
  const parts = { d: box.querySelector("[data-d]"), h: box.querySelector("[data-h]"), m: box.querySelector("[data-m]"), s: box.querySelector("[data-s]") };
  function tick() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    if (monthName) monthName.textContent = next.toLocaleString("en", { month: "long" });
    let left = Math.max(0, Math.floor((next - now) / 1000));
    parts.d.textContent = Math.floor(left / 86400); left %= 86400;
    parts.h.textContent = String(Math.floor(left / 3600)).padStart(2, "0"); left %= 3600;
    parts.m.textContent = String(Math.floor(left / 60)).padStart(2, "0");
    parts.s.textContent = String(left % 60).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
})();

// ===== The shop: products, basket and Shopify checkout =====
(function () {
  // ===== SHOP SETUP =====
  // 1. STORE: your Shopify store address (Shopify admin → Settings → Domains).
  // 2. For each book, fill in the price and its Shopify variant ID.
  //    Find the variant ID in Shopify admin → Products → the book → click the
  //    variant (or the only one): the long number at the end of the page address.
  // Until a book has its price and variant ID it shows "Price coming soon" and
  // can't be added to the basket.
  const SHOP = {
    STORE: "cx1p1x-zq.myshopify.com",
    CURRENCY: "USD",
    PRODUCTS: {
      "volume-1": {
        name: "CorvidzzPuzzles · Volume I",
        price: null,      // e.g. 24.99
        variantId: ""     // e.g. "45123456789012"
      }
    }
  };
  // ======================

  const KEY = "corvidzz-basket";
  const ready = (id) => { const p = SHOP.PRODUCTS[id]; return !!(p && typeof p.price === "number" && /^\d+$/.test(String(p.variantId))); };
  const money = (n) => new Intl.NumberFormat("en", { style: "currency", currency: SHOP.CURRENCY }).format(n);

  let basket = {};
  try { basket = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  for (const id in basket) if (!SHOP.PRODUCTS[id] || !(basket[id] > 0)) delete basket[id];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch (e) {} };

  // prices on the page
  document.querySelectorAll("[data-price]").forEach((el) => {
    const id = el.dataset.price;
    el.textContent = ready(id) ? money(SHOP.PRODUCTS[id].price) : "Price coming soon";
  });

  // the basket drawer, added to every page
  const drawer = document.createElement("div");
  drawer.className = "basket";
  drawer.hidden = true;
  drawer.innerHTML = `
    <div class="basket-shade" data-close-basket></div>
    <aside class="basket-panel" role="dialog" aria-modal="true" aria-labelledby="basket-title">
      <div class="basket-head">
        <h2 id="basket-title">Thy Basket</h2>
        <button type="button" class="basket-x" data-close-basket aria-label="Close the basket">&times;</button>
      </div>
      <div class="basket-items" id="basket-items"></div>
      <div class="basket-foot">
        <p class="basket-total"><span>Subtotal</span><b id="basket-total"></b></p>
        <p class="fine">Shipping and taxes are worked out at checkout.</p>
        <button type="button" class="submit" id="basket-checkout"><span class="star" aria-hidden="true">&#10022;</span><span>Checkout</span><span class="star" aria-hidden="true">&#10022;</span></button>
        <p class="msg" id="basket-msg" role="status" aria-live="polite"></p>
      </div>
    </aside>`;
  document.body.appendChild(drawer);
  const list = drawer.querySelector("#basket-items");
  const total = drawer.querySelector("#basket-total");
  const msg = drawer.querySelector("#basket-msg");
  const checkoutBtn = drawer.querySelector("#basket-checkout");
  let opener = null;

  function render() {
    const ids = Object.keys(basket);
    const count = ids.reduce((n, id) => n + basket[id], 0);
    document.querySelectorAll("[data-basket-count]").forEach((el) => { el.textContent = count; el.hidden = !count; });
    if (!ids.length) {
      list.innerHTML = '<p class="basket-empty">The basket is empty. <a href="shop.html">Visit the shop</a>.</p>';
    } else {
      list.innerHTML = ids.map((id) => {
        const p = SHOP.PRODUCTS[id];
        return `<div class="basket-item">
          <img src="assets/img/logo.png" width="480" height="480" alt="">
          <div>
            <p class="bi-name">${p.name}</p>
            <p class="bi-price">${ready(id) ? money(p.price) : ""}</p>
            <div class="qty small">
              <button type="button" data-step="${id}:-1" aria-label="One fewer">&minus;</button>
              <span aria-label="Quantity">${basket[id]}</span>
              <button type="button" data-step="${id}:1" aria-label="One more">+</button>
            </div>
          </div>
          <button type="button" class="bi-remove" data-remove="${id}">Remove</button>
        </div>`;
      }).join("");
    }
    total.textContent = money(ids.reduce((n, id) => n + (ready(id) ? SHOP.PRODUCTS[id].price * basket[id] : 0), 0));
    checkoutBtn.disabled = !ids.length;
  }

  function open() {
    opener = document.activeElement;
    msg.textContent = "";
    drawer.hidden = false;
    document.body.classList.add("basket-open");
    drawer.querySelector(".basket-x").focus();
  }
  function close() {
    drawer.hidden = true;
    document.body.classList.remove("basket-open");
    if (opener && opener.focus) opener.focus();
  }

  function add(id, qty) {
    if (!ready(id)) {
      open();
      msg.textContent = "This book isn't on sale just yet. (Site owner: set its price and variant ID in js/site.js.)";
      return false;
    }
    basket[id] = Math.min(20, (basket[id] || 0) + qty);
    save(); render();
    return true;
  }

  function qtyFrom(btn) {
    const input = btn.dataset.qtyFrom && document.getElementById(btn.dataset.qtyFrom);
    const n = input ? parseInt(input.value, 10) : 1;
    return Math.max(1, Math.min(20, n || 1));
  }

  function checkout() {
    const ids = Object.keys(basket).filter(ready);
    if (!ids.length) return;
    // Shopify cart link: opens the store's checkout with these books already in it
    location.href = "https://" + SHOP.STORE + "/cart/" + ids.map((id) => SHOP.PRODUCTS[id].variantId + ":" + basket[id]).join(",");
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-buy-now],[data-open-basket],[data-close-basket],[data-step],[data-remove],[data-qty-step]");
    if (!t) return;
    if (t.dataset.add) { if (add(t.dataset.add, qtyFrom(t))) open(); }
    else if (t.dataset.buyNow) { if (add(t.dataset.buyNow, qtyFrom(t))) checkout(); }
    else if (t.hasAttribute("data-open-basket")) open();
    else if (t.hasAttribute("data-close-basket")) close();
    else if (t.dataset.step) {
      const [id, d] = t.dataset.step.split(":");
      basket[id] = Math.min(20, basket[id] + Number(d));
      if (basket[id] < 1) delete basket[id];
      save(); render();
    } else if (t.dataset.remove) { delete basket[t.dataset.remove]; save(); render(); }
    else if (t.dataset.qtyStep) {
      const input = t.parentElement.querySelector("input");
      input.value = Math.max(1, Math.min(20, (parseInt(input.value, 10) || 1) + Number(t.dataset.qtyStep)));
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) close(); });
  checkoutBtn.addEventListener("click", checkout);
  window.addEventListener("storage", (e) => { if (e.key === KEY) { try { basket = JSON.parse(e.newValue) || {}; } catch (err) { basket = {}; } render(); } });

  render();
})();
