// ===== Sample product (preview mode only) =====
// Shown while config.js has no Shopify details. Once Shopify is connected, the product,
// price and photos come from your Shopify admin instead and this file is ignored.
// The name, prices and description here are placeholders to replace.
//
// Each product: handle (its web address), title, kicker (small line on the cover),
// descriptionHtml, images (leave empty to draw the teal book cover), variants (formats).
window.CORVIDZZ_SAMPLE_PRODUCTS = [
  {
    handle: "from-the-library-of",
    title: "From the Library of…",
    kicker: "The First Issue",
    badge: "New",
    descriptionHtml:
      "<p>Remember that book you finished and just wished there were more? <em>From the Library of…</em> is a storybook puzzle book about the worlds everyone is talking about right now. Old riddles, modern answers.</p>" +
      "<ul><li>30–40 crosswords, the heart of the book</li>" +
      "<li>5–10 wildcard puzzles: ciphers, riddles, logic puzzles, mazes and more</li>" +
      "<li>A progress tracker on the first page: collect points that unlock limited-edition books and prizes</li></ul>" +
      "<p>The topic of this first issue is a secret until the reveal. Follow us on Instagram and TikTok for clues.</p>" +
      "<p><em>Sample text. Replace it with the real description in Shopify.</em></p>",
    images: [],
    variants: [
      { id: "sample-vol1-paperback", title: "Paperback", note: "Shipped to you", price: 27.99, currency: "USD", available: true }
    ]
  }
];
