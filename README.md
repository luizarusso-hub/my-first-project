# CorvidzzPuzzles: Waiting List Page

The "coming soon" page for **corvidzz.com**. It collects waiting-list sign-ups for the CorvidzzPuzzles puzzle books.

The page is `index.html` plus a few pictures in `assets/img/`: `logo.png` (the round logo in the header, on the book cover and in the closing section), `raven.svg` (the two ravens gliding across the background), `favicon.png` and `apple-touch-icon.png` (browser-tab and phone home-screen icons) and `share-preview.jpg` (the picture shown when the link is shared). The full-size logo files for social media are in `brand/`. There's no build step.

## What's on the page

A single landing page in the brand colours (deep green, gold and cream, as on the logo and bookmark), with fonts Cinzel and Cormorant Garamond. The background is drawn in code: a deep-green glow, a faint gold crossword grid, twinkling gold stars and two ravens gliding slowly across.

- **Header:** the logo, CORVIDZZ PUZZLES and round Instagram and TikTok buttons.
- **Top of the page:** "Volume I · Coming soon", the heading "What is the raven hiding?", one line saying what's being sold ("A fairy-tale puzzle book about what's happening right now: the shows, songs, celebrities and trends everyone is talking about"), then the sign-up box with **Name** and **Email** and a "Join the waiting list" button. Only the email is required. Next to it (below it on phones) a 3D book with the logo, "Volume I" and "Old riddles, modern answers", with two gold tags: "Pop culture inside" and "Crosswords · Ciphers · Riddles".
- **Old riddles. Modern answers.:** three parchment cards with riddles written like an old manuscript. Tapping one flips it to show the modern answer (VIRAL, EMOJI, BINGE). The riddles are in the `.riddles` section of `index.html`.
- **Inside Volume I:** Crosswords, Ciphers & codes, Riddles and Word searches, each with a gold drawing and one line.
- **The raven is waiting.:** a closing section with the logo and a button that scrolls back to the sign-up box and puts the cursor in the Name box.
- **Footer:** corvidzzpuzzles@gmail.com, Instagram, TikTok.

After signing up, the sign-up box is replaced by "You're on the list", the person's number (for example "No. 0037"), "Welcome, Ana!" and "We'll email you as soon as Volume I is ready."

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
