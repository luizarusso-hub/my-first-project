# CorvidzzPuzzles: Waiting List Page

The "coming soon" page for **corvidzz.com**. It collects waiting-list sign-ups for the CorvidzzPuzzles puzzle books.

The page is `index.html` plus two pictures in `assets/img/`: `forest-night.jpg`, the painted night forest used as the fixed page background, and `library-card.png`, the vintage library card that frames the sign-up form. There's no build step.

The content sits on arched parchment panels with an engraved-style sepia garland of roses, blossoms, grapes, buds and leaves climbing up the sides and over the arch. The sun with a face, the long gold eight-pointed stars, the raven, the moon and the icons are all drawn in code on the page. The garland redraws itself to fit each panel on any screen size.

## What's on the page

- **Hero:** an arched parchment panel with the sun, the raven, "Can you decode this?" and the sign-up form inside the vintage library card. The form asks for name, email and which puzzle types the person wants to see.
- **Once Upon a Time:** the story behind the name with an illuminated "A", plus the "What am I?" Wi-Fi riddle
- **What Lies Within:** monthly topic votes, the secret topic revealed on the 1st, the puzzle tracker, and points for limited editions
- **A Bestiary of Puzzles:** nine of the planned puzzle types
- **The Ravens Are Gathering:** a closing panel with a button that jumps back to the form
- **Footer:** corvidzzpuzzles@gmail.com, Instagram, TikTok

To swap the background or the card, replace the file in `assets/img/` with another picture of the same name. The card frame is sliced from the picture's edges (top 116px, sides 50px, bottom 62px of a 336×528 image), so a replacement card should have a similar layout.

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
