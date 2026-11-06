# CorvidzzPuzzles: Waiting List Page

The "coming soon" page for **corvidzz.com**. It collects waiting-list sign-ups for the CorvidzzPuzzles puzzle books.

The page is `index.html` plus the pictures in `assets/img/`: `cover-frame.jpg` (the teal antique book cover with the gold-tooled border, made in the owner's Canva account), `cloth.jpg` (a seamless piece of the same teal cloth, used as the page background), `logo.png` (the round logo), `favicon.png` and `apple-touch-icon.png` (browser-tab and phone home-screen icons) and `share-preview.jpg` (the picture shown when the link is shared). The full-size logo files for social media are in `brand/`. There's no build step.

## What's on the page

The whole page sits on the teal book cloth. The top section and the sign-up are each set inside the antique book cover, with the gold corners kept in shape however long the text is (the cover is used as a CSS border image). The riddle and puzzle cards are parchment with gold, vermilion and black borders, and the buttons are vermilion with gold edges. Fonts are IM Fell English, Cinzel and Cinzel Decorative, with the UnifrakturMaguntia wordmark. To change the cover, replace `assets/img/cover-frame.jpg` with a picture of the same shape (834 × 1274).

The page holds only one thing: the teal book with the gold-tooled cover, in the middle of the background scene. On its cover are the round logo, "Volume I · Coming Soon", the headline "Remember that book you finished and just wanted more afterwards?", the line four short BookTok-style bullet points (For the book hangover you're still not over; Enemies to lovers and morally grey villains, as crosswords; Clues only a true fan will crack; Your first puzzle is free. Just one more clue, right?)", then **Name** and **Email** and the "Join the Waitlist" button. Only the email is required. There is no header, footer or other section.

After signing up, the sign-up book opens: the teal cover swings open (on a computer the book first slides into the middle, then opens into a two-page spread; on a phone the cover swings away and the two pages are stacked). Both pages are drawn like the owner's printed puzzle page (`ACOTAR – puzzle` PDF): cream paper inside the engraved black vine border with spiral corners (`assets/img/page-frame.jpg`, taken from that page and used as a border image), page numbers in a rounded tab, and ink-black IM Fell English type. The left page shows the mountain vignette (`page-mountains.webp`), a "You're on the list" stamp, the person's number, a welcome and "While you wait, here is a page from Volume I". The right page has the raven medallion with laurels and mountains (`page-emblem.webp`), the title "Worlds You've Read", "Fill in the crossword using the clues below.", a short sample crossword drawn with only the answer squares, and Across and Down clues in two columns with a rule between them (one column on phones). Its five answers come from famous book series: HOGWARTS (Harry Potter), HOBBIT (The Lord of the Rings) and RHYSAND (A Court of Thorns and Roses) across, KATNISS (The Hunger Games) and ASLAN (Narnia) down. There's a "Stuck? Reveal a letter" hint and a "You cracked it! Now imagine a whole book of these." message when it's solved. To change the puzzle, edit `XW` (grid rows, word positions and clues) in the script in `index.html`.

The background is a scene made from the owner's pictures, each cut out of its white background: a green sky, the hollow tree trunk at the left edge, the willow tree, the castle, the starry clouds, the flock of birds (drifting slowly), gold stars (glinting) and the grassy hill across the front.

## QR codes

`brand/qr/` has three QR codes, all opening the site: `corvidzz-qr-instagram.png` (opens `https://www.corvidzz.com/?from=instagram`), `corvidzz-qr-tiktok.png` (`?from=tiktok`) and `corvidzz-qr-bookstore.png` (`?from=bookstore`, for shelf cards and posters in bookstores), as branded 1080×1350 posters, plus `-square` versions with only the code and seal. For printing large, use the `-plain.svg` files, which stay sharp at any size. The `-transparent.png` files are just the code, with no background or logo (2250×2250), for placing on your own designs; put them on a light background so they scan. The page reads `?from=` (or `utm_source=`) and sends it with each sign-up as `came_from`, so you can count sign-ups per platform. Anyone arriving without a tag is recorded as `direct`. People who scanned a code also have their answer to "Where didst thou find us?" ticked for them. For Reddit posts, link to `https://www.corvidzz.com/?from=reddit` and "Reddit" is ticked the same way.

## Looping social video

`brand/video/corvidzz-loop-instagram.mp4` and `corvidzz-loop-tiktok.mp4` are 12-second vertical videos (1080×1920, 30 fps) for Reels, Stories and TikTok. The site's night sky moves behind the QR poster, and every animation repeats a whole number of times in 12 seconds, so the video loops seamlessly. To change and re-render: edit `brand/video/scene.html`, then run `node brand/video/render.js <frames folder> <path to ffmpeg>` (needs Playwright).

## Where sign-ups go (free: Google Sheet)

Every sign-up is saved in a Google Sheet owned by corvidzzpuzzles@gmail.com, through the script in `google-sheet/Code.gs`. It's free and has no monthly limit. The sheet:

- gives each new email the next number and sends it back, so the page shows the person's place, for example "No. 0042 · You're the 42nd to join the waiting list" (a returning email gets its original number back);
- emails corvidzzpuzzles@gmail.com about each new sign-up (number, name, email and where they came from). To stop these emails, set `NOTIFY_EMAIL` to `''` in `Code.gs`.

Setup steps are in [SETUP-GOOGLE-SHEET.md](SETUP-GOOGLE-SHEET.md); the web app URL goes in `SHEET_ENDPOINT` in `index.html`. Whenever `Code.gs` changes, paste the new version into Apps Script and choose **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. The URL stays the same. The first time after adding the emails, Google asks you to allow the script to send email as you; allow it.

To download the list (for example to import into an email tool at launch), open the sheet and choose **File → Download → Comma-separated values (.csv)**.

What each sign-up sends:

| Field | Example |
|---|---|
| `name`, `email` | Morgan, morgan@example.com |
| `access` | waiting list (kept so the sheet's columns stay the same) |
| `came_from` | instagram, tiktok, reddit, bookstore (from the QR codes and links) *or* direct |

(The sheet still has the old interest, puzzle and found_us columns; they now stay empty.)

Formspree is no longer used, because its free trial ended. `FORM_ENDPOINT` in `index.html` is left empty; if you ever want a second copy in Formspree again, paste an endpoint there and each sign-up goes to both.

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
