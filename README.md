# CorvidzzPuzzles: Waiting List Page

The "coming soon" page for **corvidzz.com**. It collects waiting-list sign-ups for the CorvidzzPuzzles puzzle books.

The page is `index.html` plus the pictures in `assets/img/`: `cover-frame.jpg` (the teal antique book cover with the gold-tooled border, made in the owner's Canva account), `cloth.jpg` (a seamless piece of the same teal cloth, used as the page background), `logo.png` (the round logo), `favicon.png` and `apple-touch-icon.png` (browser-tab and phone home-screen icons) and `share-preview.jpg` (the picture shown when the link is shared). The full-size logo files for social media are in `brand/`. There's no build step.

## What's on the page

The whole page sits on the teal book cloth. The top section and the sign-up are each set inside the antique book cover, with the gold corners kept in shape however long the text is (the cover is used as a CSS border image). The riddle and puzzle cards are parchment with gold, vermilion and black borders, and the buttons are vermilion with gold edges. Fonts are IM Fell English, Cinzel and Cinzel Decorative, with the UnifrakturMaguntia wordmark. To change the cover, replace `assets/img/cover-frame.jpg` with a picture of the same shape (834 × 1274).

- **Header:** the logo, the CorvidzzPuzzles wordmark and Instagram and TikTok buttons.
- **The book cover at the top:** the round logo, "Volume I · Coming Soon", the title "Remember that book you finished and just wanted more?", the line "Sign up here, and that feeling might be gone for good. A fairy-tale book of crossword puzzles, riddles and ciphers about what's happening right now…", and a "Join the Waitlist" button that scrolls down to the sign-up.
- **Ancient Riddles, Modern Answers:** six parchment cards with old-fashioned riddles. Tapping "Reveal the modern answer" shows it (a smartphone, doomscrolling, binge-watching, the song of the summer, a viral video, celebrity drama online).
- **The sign-up, in the middle of the page:** a second book cover, headed "The Ravens' Waiting List" and "Want More of What You Just Read?", with "Try this: a whole book of crossword puzzles, riddles and ciphers, written like an ancient tale but hiding what everyone is talking about right now. Leave your name and email and be the first to get Volume I." Then **Name** and **Email** and the "Join the Waitlist" button. Only the email is required.
- **A Bestiary of Puzzles:** nine puzzle types (crossword, cryptic crossword, word search, rebus, rune sudoku, truth-teller and liar, Caesar cipher, quest map, the ravens' secret).
- **The Raven Is Waiting:** the round logo and a "Join the Waitlist" button that scrolls to the sign-up and puts the cursor in the Name box.
- **Footer:** corvidzzpuzzles@gmail.com, Instagram, TikTok.

After signing up, the sign-up book opens: the teal cover swings open (on a computer the book first slides into the middle, then opens into a two-page spread; on a phone the cover swings away and the two pages are stacked). Both pages are drawn like the owner's printed puzzle page (`ACOTAR – puzzle` PDF): cream paper inside the engraved black vine border with spiral corners (`assets/img/page-frame.jpg`, taken from that page and used as a border image), page numbers in a rounded tab, and ink-black IM Fell English type. The left page shows the mountain vignette (`page-mountains.webp`), a "You're on the list" stamp, the person's number, a welcome and "While you wait, here is a page from Volume I". The right page has the raven medallion with laurels and mountains (`page-emblem.webp`), the title "The Raven's Library", "Fill in the crossword using the clues below.", a short sample crossword drawn with only the answer squares, and Across and Down clues in two columns with a rule between them (one column on phones). Its five answers come from famous book series: HOGWARTS (Harry Potter), HOBBIT (The Lord of the Rings) and RHYSAND (A Court of Thorns and Roses) across, KATNISS (The Hunger Games) and ASLAN (Narnia) down. There's a "Stuck? The raven will lend a letter" hint and a message when it's solved. To change the puzzle, edit `XW` (grid rows, word positions and clues) in the script in `index.html`.

The background is a scene made from the owner's pictures, each cut out of its white background: a green sky, the hollow tree trunk at the left edge, the willow tree, the castle, the starry clouds, the flock of birds (drifting slowly), gold stars (glinting) and the grassy hill across the front.

## QR codes

`brand/qr/` has three QR codes, all opening the site: `corvidzz-qr-instagram.png` (opens `https://www.corvidzz.com/?from=instagram`), `corvidzz-qr-tiktok.png` (`?from=tiktok`) and `corvidzz-qr-bookstore.png` (`?from=bookstore`, for shelf cards and posters in bookstores), as branded 1080×1350 posters, plus `-square` versions with only the code and seal. For printing large, use the `-plain.svg` files, which stay sharp at any size. The `-transparent.png` files are just the code, with no background or logo (2250×2250), for placing on your own designs; put them on a light background so they scan. The page reads `?from=` (or `utm_source=`) and sends it with each sign-up as `came_from`, so you can count sign-ups per platform. Anyone arriving without a tag is recorded as `direct`. People who scanned a code also have their answer to "Where didst thou find us?" ticked for them. For Reddit posts, link to `https://www.corvidzz.com/?from=reddit` and "Reddit" is ticked the same way.

## Looping social video

`brand/video/corvidzz-loop-instagram.mp4` and `corvidzz-loop-tiktok.mp4` are 12-second vertical videos (1080×1920, 30 fps) for Reels, Stories and TikTok. The site's night sky moves behind the QR poster, and every animation repeats a whole number of times in 12 seconds, so the video loops seamlessly. To change and re-render: edit `brand/video/scene.html`, then run `node brand/video/render.js <frames folder> <path to ffmpeg>` (needs Playwright).

## The numbered list (Google Sheet)

Each sign-up is also saved to a Google Sheet owned by corvidzzpuzzles@gmail.com, through the script in `google-sheet/Code.gs`. The sheet gives each new email the next number and sends it back, so the page shows the person's place, for example "No. 0042 · You're the 42nd to join the waiting list". A returning email gets its original number back. Setup steps are in [SETUP-GOOGLE-SHEET.md](SETUP-GOOGLE-SHEET.md); the web app URL goes in `SHEET_ENDPOINT` in `index.html`. Until it's set, sign-ups still go to Formspree, just without a number. Whenever `Code.gs` changes (it last gained the `found_us` column), paste the new version into Apps Script and choose **Deploy → Manage deployments → Edit → Version: New version**; the sheet adds the new column heading by itself.

## What each sign-up sends to Formspree

| Field | Example |
|---|---|
| `name`, `email` | Morgan, morgan@example.com |
| `access` | waiting list (kept so the Google Sheet columns stay the same) |
| `came_from` | instagram, tiktok, bookstore (from the QR codes) *or* direct |

(The Google Sheet still has the old interest, puzzle and found_us columns; they now stay empty. `came_from` still records instagram, tiktok, reddit or bookstore from the QR codes and links.) Export the submissions from Formspree as CSV to sort and count them in a spreadsheet.

## 1. Connect the sign-up form (free)

The page needs somewhere to send sign-ups. It uses [Formspree](https://formspree.io), which is free for up to 50 sign-ups a month.

1. Sign up at Formspree with **corvidzzpuzzles@gmail.com** and click **New form**.
2. Copy the endpoint it gives you, which looks like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `FORM_ENDPOINT` near the bottom and replace `https://formspree.io/f/YOUR_FORM_ID` with your endpoint.

Each sign-up arrives by email and in the Formspree dashboard, and you can export the list to CSV. You can later import that CSV into Shopify's customer list, or into any email tool, for the launch announcement.

Until the endpoint is set, the form shows "Sign-ups are not open yet" and nothing is lost silently.

## 2. Put it on corvidzz.com (GoDaddy domain)

### Option A: GitHub Pages (free, uses this repo)

1. On GitHub, open this repo's **Settings → Pages**. Set Source to *Deploy from a branch*, choose the main branch and `/ (root)`, and save.
2. On the same page, enter `www.corvidzz.com` under **Custom domain** and save.
3. In GoDaddy, go to **My Products → corvidzz.com → DNS** and add:
   - A **CNAME** record: name `www`, value `<your-github-username>.github.io`
   - Four **A** records: name `@`, values `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - Remove any existing GoDaddy "parked" A record for `@` first.
4. Once GitHub shows the domain as verified (this can take up to a day), tick **Enforce HTTPS**.

GitHub Pages needs a public repo on a free GitHub account.

### Option B: Netlify (free, drag and drop)

Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag in the whole project folder (with `index.html` and `assets`). Then open **Domain management → Add a domain**, enter `corvidzz.com`, and add the DNS records Netlify shows you in GoDaddy.

## Preview locally

Double-click `index.html` to open it in a browser. Keep the `assets` folder next to it.
