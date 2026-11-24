// ===== Sample products (preview mode only) =====
// Shown while config.js has no Shopify details. Once Shopify is connected, products,
// prices and photos come from your Shopify admin instead and this file is ignored.
// Names, prices and descriptions here are placeholders to replace.
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
      { id: "sample-vol1-paperback", title: "Paperback", note: "Shipped to you", price: 24.0, currency: "USD", available: true },
      { id: "sample-vol1-pdf", title: "Printable PDF", note: "Instant download", price: 12.0, currency: "USD", available: true }
    ]
  },
  {
    handle: "first-puzzle-free",
    title: "Your First Puzzle",
    kicker: "Free",
    badge: "Free",
    descriptionHtml:
      "<p>Just one more clue, right? A single printable crossword from Volume I, free, so you can see what you're in for.</p>" +
      "<p><em>Sample text. Replace it with the real description in Shopify.</em></p>",
    images: [],
    variants: [
      { id: "sample-free-pdf", title: "Printable PDF", note: "Instant download", price: 0, currency: "USD", available: true }
    ]
  },
  {
    handle: "fae-courts-pack",
    title: "The Fae Courts Puzzle Pack",
    kicker: "Puzzle Pack",
    descriptionHtml:
      "<p>Enemies to lovers and morally grey villains, as crosswords. A short themed pack of printable puzzles.</p>" +
      "<p><em>Sample text. Replace it with the real description in Shopify.</em></p>",
    images: [],
    variants: [
      { id: "sample-fae-pdf", title: "Printable PDF", note: "Instant download", price: 6.0, currency: "USD", available: true }
    ]
  },
  {
    handle: "raven-bookmark",
    title: "The Raven Bookmark",
    kicker: "Bookmark",
    descriptionHtml:
      "<p>Keep your place between puzzles. The CorvidzzPuzzles raven bookmark, printed on thick card.</p>" +
      "<p><em>Sample text. Replace it with the real description in Shopify.</em></p>",
    images: [{ url: "img/bookmark.webp", alt: "The CorvidzzPuzzles raven bookmark" }],
    variants: [
      { id: "sample-bookmark", title: "Bookmark", note: "Shipped to you", price: 4.0, currency: "USD", available: true }
    ]
  },
  {
    handle: "volume-ii",
    title: "Worlds You've Read: Volume II",
    kicker: "Volume II",
    badge: "Coming soon",
    descriptionHtml:
      "<p>More worlds, more clues. Volume II is being written now.</p>" +
      "<p><em>Sample text. Replace it with the real description in Shopify.</em></p>",
    images: [],
    variants: [
      { id: "sample-vol2-paperback", title: "Paperback", note: "Shipped to you", price: 24.0, currency: "USD", available: false }
    ]
  }
];
