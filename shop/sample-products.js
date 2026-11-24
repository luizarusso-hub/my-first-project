// ===== Sample product (preview mode only) =====
// Shown while config.js has no Shopify details. Once Shopify is connected, the product,
// price and photos come from your Shopify admin instead and this file is ignored.
// The name, prices and description here are placeholders to replace.
//
// Each product: handle (its web address), title, kicker (small line on the cover),
// descriptionHtml, images (leave empty to draw the teal book cover), variants (formats).
window.CORVIDZZ_SAMPLE_PRODUCTS = [
  {
    handle: "volume-i",
    title: "Worlds You've Read: Volume I",
    kicker: "Volume I",
    badge: "New",
    descriptionHtml:
      "<p>Remember that book you finished and just wished there were more? Volume I is a whole book of crosswords set in the worlds you can't stop thinking about.</p>" +
      "<ul><li>Puzzles from 35 worlds: books, shows &amp; films, music and curious things</li>" +
      "<li>Clues only a true fan will crack</li><li>Answers at the back, for when you're truly stuck</li></ul>" +
      "<p><em>Sample text. Replace it with the real description in Shopify.</em></p>",
    images: [],
    variants: [
      { id: "sample-vol1-paperback", title: "Paperback", note: "Shipped to you", price: 27.99, currency: "USD", available: true }
    ]
  }
];
