# CorvidzzPuzzles: Waiting List Page

The "coming soon" page for **corvidzz.com**. It collects waiting-list sign-ups for the CorvidzzPuzzles puzzle books.

The page is `index.html` plus the pictures in `assets/img/`: `forest-night.jpg` (the painted night forest used as the fixed page background), `library-card.png` (the vintage library card that frames the sign-up form), `logo.png` (the round logo in the header, main panel and footer), `favicon.png` and `apple-touch-icon.png` (browser-tab and phone home-screen icons) and `share-preview.jpg` (the picture shown when the link is shared). The full-size logo files for social media are in `brand/`. There's no build step.

The content sits on arched parchment panels with an engraved-style sepia garland of roses, blossoms, grapes, buds and leaves climbing up the sides and over the arch. The long gold eight-pointed stars, the raven, the moon and the icons are all drawn in code on the page. The garland redraws itself to fit each panel on any screen size.

## What's on the page

It's deliberately a single, mysterious page. Behind everything, raven silhouettes (`assets/img/raven.svg`, generated in the owner's Canva account and traced into a vector shape) fly slowly over the night forest, circling back as if searching. Small pale-gold butterflies (`assets/img/butterfly.svg`, made the same way) flutter and wander along the sides, with drifting fog and fireflies. The words fade in one by one on arrival.

- **Header:** the logo, the CorvidzzPuzzles name and Instagram and TikTok links
- **The arch panel:** "Volume I · Coming Soon", the title "Can you decode this?" and "The ledger of early readers is sealed. Solve the raven's crossword to break the seal and claim early access."
- **The raven's crossword:** the only puzzle, a 5×5 mini crossword with old-fashioned clues and modern answers: VIRAL and EMOJI across, VIBE and LOGIN down. Each word turns green when it's right. "Stuck? The raven will lend a letter" fills in one correct letter per tap, so nobody is locked out. Solving it shows the "seal is broken" message, which explains the book is about today's pop culture, and unseals the library card. The grid and clues are in the hero section of `index.html`, and the answer positions are in `WORDS` in the crossword script.
- **The library card sign-up:** the same layout as before, headed "Early Access · The Ravens' Ledger". Until the crossword is solved it sits blurred under a red wax seal and can't be used. Once open, it has name and email, tap-to-choose names grouped into Shows & movies, Music, Creators & internet, Games, Sports and Celebrities, an optional "Not listed?" box, tap-to-choose puzzle types and a "Claim Early Access" button. Only the email is required. To change the names, edit the chips inside each `<details class="group">` in `index.html`.
- **Footer:** corvidzzpuzzles@gmail.com, Instagram, TikTok

To swap the background or the card, replace the file in `assets/img/` with another picture of the same name. The card frame is sliced from the picture's edges (top 116px, sides 50px, bottom 62px of a 336×528 image), so a replacement card should have a similar layout.

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
