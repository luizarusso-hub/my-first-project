# CorvidzzPuzzles: Waiting List Page

The "coming soon" page for **corvidzz.com**. It collects waiting-list sign-ups for the CorvidzzPuzzles puzzle books.

It's a single file, `index.html`, with no build step. The look follows the mood boards in the CorvidzzPuzzles overview document: engraved ravens, illuminated manuscripts with gold-leaf borders and drop caps, green damask, blue star tiles, old cloth-bound books and vintage puzzle papers (the sign-up form is a library card).

## What's on the page

- **Hero:** a manuscript page with the headline "Can you decode this?", the story behind the name, and the "What am I?" Wi-Fi riddle with a reveal
- **Sign-up library card:** name, email, and which puzzle types the person wants to see. Those answers help decide which puzzles stay in the books.
- **What lies within:** monthly topic votes, the secret topic revealed on the 1st, the puzzle tracker, and points for limited editions
- **A Bestiary of Puzzles:** nine of the planned puzzle types
- **Footer:** corvidzzpuzzles@gmail.com, Instagram, TikTok

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

Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag in the folder that contains `index.html`. Then open **Domain management → Add a domain**, enter `corvidzz.com`, and add the DNS records Netlify shows you in GoDaddy.

## Preview locally

Double-click `index.html` to open it in a browser.
