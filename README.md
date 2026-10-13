# CorvidzzPuzzles: Waiting List Page

The "coming soon" page for **corvidzz.com**. It collects waiting-list sign-ups for the CorvidzzPuzzles puzzle books.

The page is `index.html` plus the pictures in `assets/img/`: `forest-night.jpg` (the painted night forest used as the fixed page background), `library-card.png` (the vintage library card that frames the sign-up form), `logo.png` (the round logo in the header, main panel and footer), `favicon.png` and `apple-touch-icon.png` (browser-tab and phone home-screen icons) and `share-preview.jpg` (the picture shown when the link is shared). The full-size logo files for social media are in `brand/`. There's no build step.

The content sits on arched parchment panels with an engraved-style sepia garland of roses, blossoms, grapes, buds and leaves climbing up the sides and over the arch. The long gold eight-pointed stars, the raven, the moon and the icons are all drawn in code on the page. The garland redraws itself to fit each panel on any screen size.

## What's on the page

It's deliberately a single, mysterious page. Behind everything, raven silhouettes (`assets/img/raven.svg`, generated in the owner's Canva account and traced into a vector shape) fly slowly over the night forest, circling back as if searching. Small pale-gold butterflies (`assets/img/butterfly.svg`, made the same way) flutter and wander along the sides, with drifting fog and fireflies. The words fade in one by one on arrival.

- **Header:** the logo, the CorvidzzPuzzles name and Instagram and TikTok links
- **The arch panel:** "Volume I · Coming Soon", the title "What is the raven hiding?" and "The ledger of early readers is sealed. Solve the raven's crossword to break the seal and claim early access."
- **The raven's crossword:** the only puzzle, a small crossword with plain-English clues about this week's pop culture: DAKOTA (Dakota Johnson hosted Saturday Night Live) and VERITY (the Colleen Hoover thriller in cinemas) across, JACKIE (Catherine Zeta-Jones's series *Kill Jackie*) and DIGGER (Tom Cruise's new film) down. Swap the answers as the news changes to keep the puzzle current. Each word turns green when it's right. "Stuck? The raven will lend a letter" fills in one correct letter per tap, so nobody is locked out. Solving it shows the "seal is broken" message, which explains the book is about today's pop culture, and unseals the library card. The grid and clues are in the hero section of `index.html`, and the answer positions are in `WORDS` in the crossword script.
- **The library card sign-up:** the same layout as before, headed "Early Access · The Ravens' Ledger". Until the crossword is solved it sits blurred under a red wax seal and can't be used. Once open, it has name and email, tap-to-choose names grouped into Shows & movies, Music, Creators & internet, Games, Sports and Celebrities, an optional "Not listed?" box, tap-to-choose puzzle types, "Where didst thou find us?" (tap one: Instagram, TikTok, A bookstore, A friend, Google search, Somewhere else) and a "Claim Early Access" button. Only the email is required. To change the names, edit the chips inside each `<details class="group">` in `index.html`.
- **"Not one for riddles?" link:** under the card, "Join the waiting list instead" opens the card without the puzzle, as the ordinary waiting list (header "The Ravens' Waiting List", button "Join the Waitlist"). Solving the crossword still gives early access.
- **Footer:** corvidzzpuzzles@gmail.com, Instagram, TikTok

To swap the background or the card, replace the file in `assets/img/` with another picture of the same name. The card frame is sliced from the picture's edges (top 116px, sides 50px, bottom 62px of a 336×528 image), so a replacement card should have a similar layout.

## QR codes

`brand/qr/` has three QR codes, all opening the site: `corvidzz-qr-instagram.png` (opens `https://www.corvidzz.com/?from=instagram`), `corvidzz-qr-tiktok.png` (`?from=tiktok`) and `corvidzz-qr-bookstore.png` (`?from=bookstore`, for shelf cards and posters in bookstores), as branded 1080×1350 posters, plus `-square` versions with only the code and seal. For printing large, use the `-plain.svg` files, which stay sharp at any size. The `-transparent.png` files are just the code, with no background or logo (2250×2250), for placing on your own designs; put them on a light background so they scan. The page reads `?from=` (or `utm_source=`) and sends it with each sign-up as `came_from`, so you can count sign-ups per platform. Anyone arriving without a tag is recorded as `direct`. People who scanned a code also have their answer to "Where didst thou find us?" ticked for them.

## Looping social video

`brand/video/corvidzz-loop-instagram.mp4` and `corvidzz-loop-tiktok.mp4` are 12-second vertical videos (1080×1920, 30 fps) for Reels, Stories and TikTok. The site's night sky moves behind the QR poster, and every animation repeats a whole number of times in 12 seconds, so the video loops seamlessly. To change and re-render: edit `brand/video/scene.html`, then run `node brand/video/render.js <frames folder> <path to ffmpeg>` (needs Playwright).

## Crossword generator (for the Canva books)

`crossword/index.html` (at `corvidzz.com/crossword/` once the site is live) turns a list of words and clues into crossword grids ready to place on the book's Canva pages. Type one per line, the answer then the clue, separated by a colon, a dash with spaces, a tab or `|`:

```
Raven: A large black bird of omen
Ice cream - A frozen treat
```

Press **Make the crossword** and it finds an interlocking layout, numbers the squares and sorts the clues into Across and Down. Phrases get letter counts like (3,5). Choose the largest grid allowed (15 × 15 suits a book page), tap **Try another layout** for a different arrangement, and switch between the puzzle and the answer key. If a word can't be joined to the others it's listed, so you can try again, allow a bigger grid or add a connecting word.

**Look for the book:** squares can be see-through (the Canva page design shows inside them), white or parchment; lines and letters can be black, dark sepia, sepia or raven green-black; the numbers and answer letters can be IM Fell English (the website's font), Georgia or Arial; and the empty squares can be filled in the line colour.

**Getting it into Canva:**

1. Click **Puzzle grid (PNG)** and **Answer key grid (PNG)**. They're 300 DPI pictures with a see-through background, each square about 8.5 mm (a third of an inch) wide at full size.
2. In Canva, **Uploads → Upload files**, then drag the PNG onto the page and resize it from a corner.
3. Click **Copy Across clues** and paste into a Canva text box, then do the same with **Copy Down clues**, so the clues use the book's own fonts.
4. Put the answer key PNG on the answers page at the back. **Copy answers list** gives the answers as text too.
5. To update a puzzle, download again and use **Replace** on the picture in Canva so it keeps its size and position.

**Print** gives the puzzle on one page and the answer key on the next, and the SVG downloads are there for other design tools. Your list and look settings are remembered in the browser.

The layout engine is `crossword/crossword.js`. It also runs from the command line: `node crossword/crossword.js words.txt --answers --max 15`.

## The numbered list (Google Sheet)

Each sign-up is also saved to a Google Sheet owned by corvidzzpuzzles@gmail.com, through the script in `google-sheet/Code.gs`. The sheet gives each new email the next number and sends it back, so the library card shows the person's place, for example "No. 0042 · Thou art the 42nd to sign the ledger". A returning email gets its original number back. Setup steps are in [SETUP-GOOGLE-SHEET.md](SETUP-GOOGLE-SHEET.md); the web app URL goes in `SHEET_ENDPOINT` in `index.html`. Until it's set, sign-ups still go to Formspree, just without a number. Whenever `Code.gs` changes (it last gained the `found_us` column), paste the new version into Apps Script and choose **Deploy → Manage deployments → Edit → Version: New version**; the sheet adds the new column heading by itself.

## What each sign-up sends to Formspree

| Field | Example |
|---|---|
| `name`, `email` | Morgan, morgan@example.com |
| `shows_and_movies` | Stranger Things, Squid Game |
| `music` | Taylor Swift, Bad Bunny |
| `creators_and_internet` | MrBeast, BookTok |
| `games` | Minecraft, Pokémon |
| `sports` | Formula 1 |
| `celebrities` | The Royal Family |
| `something_else` | (anything typed in "Not listed?") |
| `puzzles` | Crosswords, Ciphers and codes, Riddles |
| `access` | early access (solved the crossword) *or* waiting list (skipped the crossword) |
| `came_from` | instagram, tiktok, bookstore (from the QR codes) *or* direct |
| `found_us` | Instagram, TikTok, A bookstore, A friend, Google search, Somewhere else *or* (not answered) |

Groups with nothing ticked arrive as "(none chosen)" and an empty "Not listed?" box as "(not answered)". Export the submissions from Formspree as CSV to sort and count them in a spreadsheet.

## 1. Connect the sign-up form (free)

The page needs somewhere to send sign-ups. It uses [Formspree](https://formspree.io), which is free for up to 50 sign-ups a month.

1. Sign up at Formspree with **corvidzzpuzzles@gmail.com** and click **New form**.
2. Copy the endpoint it gives you, which looks like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `FORM_ENDPOINT` near the bottom and replace `https://formspree.io/f/YOUR_FORM_ID` with your endpoint.

Each sign-up arrives by email and in the Formspree dashboard, and you can export the list to CSV. You can later import that CSV into Shopify's customer list, or into any email tool, for the launch announcement.

Until the endpoint is set, the form shows "The ledger is not yet open" and nothing is lost silently.

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
