# Puzzle Book Waiting List

A single-page "coming soon" site that collects waiting-list sign-ups for the puzzle book company. It's one file, `index.html`, with no build step and no server to run.

## 1. Make it yours

Open `index.html` and search for `EDIT:`. Replace:

- **Your Puzzle Co.** with your company name (in the header and the footer)
- **hello@example.com** with your contact email
- the `<title>` and `description` text at the top, which Google and social media previews use

## 2. Connect the sign-up form (free)

The page needs somewhere to send the emails. The setup below uses [Formspree](https://formspree.io), which is free for up to 50 sign-ups a month.

1. Create a Formspree account and click **New form**.
2. Copy the endpoint it gives you, which looks like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `FORM_ENDPOINT` near the bottom and paste your endpoint in place of `https://formspree.io/f/YOUR_FORM_ID`.

Each sign-up then appears in your Formspree dashboard (with name, email and puzzle interests), and you can export the whole list to CSV. That CSV imports into Mailchimp, Kit or any other email tool you use for the launch announcement.

Until the endpoint is set, the form shows a "not connected yet" message instead of losing sign-ups.

## 3. Put it on your domain

### Option A: GitHub Pages (free, uses this repo)

1. On GitHub: **Settings → Pages → Build and deployment**. Set Source to *Deploy from a branch*, pick your main branch and `/ (root)`, then save.
2. In the same page, type your domain (e.g. `www.yourdomain.com`) into **Custom domain** and save.
3. At the company where you bought the domain, add these DNS records:
   - For `www`: a **CNAME** record pointing to `<your-github-username>.github.io`
   - For the bare domain (`yourdomain.com`): four **A** records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Once GitHub shows the domain as verified (which can take up to a day), tick **Enforce HTTPS**.

GitHub Pages sites from a free account must be in a public repository.

### Option B: Netlify (free, drag and drop)

Go to [app.netlify.com/drop](https://app.netlify.com/drop), drag in the folder containing `index.html`, then go to **Domain settings → Add custom domain** and follow the DNS instructions it shows.

## Preview locally

Double-click `index.html` to open it in your browser.
