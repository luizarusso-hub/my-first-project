# Set up the numbered waiting list (Google Sheet)

This takes about 10 minutes, once. Afterwards, every sign-up is saved as a numbered row in your Google Sheet, and the person sees their place on the library card, for example **No. 0042 · "Thou art the 42nd to sign the ledger."**

Do everything while signed in to Google as **corvidzzpuzzles@gmail.com**.

## 1. Create the sheet

1. Go to **sheets.google.com** and click **Blank spreadsheet**.
2. Click "Untitled spreadsheet" at the top left and name it **CorvidzzPuzzles Waiting List**.
3. Leave it empty. The column headings are added automatically on the first sign-up.

## 2. Add the script

1. In the sheet's menu, click **Extensions → Apps Script**. A new tab opens with a file called `Code.gs` containing a few lines of code.
2. Delete everything in that file.
3. Open [`google-sheet/Code.gs`](google-sheet/Code.gs) in this project, copy **all** of it, and paste it into the Apps Script file.
4. Click the **Save** icon (the floppy disk), or press Ctrl + S / Cmd + S.

## 3. Publish it as a web app

1. At the top right, click the blue **Deploy** button, then **New deployment**.
2. Next to "Select type", click the **gear icon** and choose **Web app**.
3. Fill in:
   - **Description:** Waiting list
   - **Execute as:** **Me (corvidzzpuzzles@gmail.com)**
   - **Who has access:** **Anyone**
4. Click **Deploy**.
5. Google asks you to **Authorize access**. Click it and choose your corvidzzpuzzles account.
   - You'll likely see "Google hasn't verified this app". That's expected, because it's your own script. Click **Advanced**, then **Go to (project name) (unsafe)**, then **Allow**.
6. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy…/exec`.

## 4. Send the URL

Send that Web app URL to Claude, or paste it yourself into `index.html` in place of `PASTE_GOOGLE_WEB_APP_URL_HERE` (search for `SHEET_ENDPOINT`).

## 5. Check it works

- Open the Web app URL in your browser. You should see `{"ok":true,"signups":0}`.
- Once the page is updated and published, sign up on corvidzz.com. You should see **No. 0001** on the card, and a new row in the sheet.

## Good to know

- **Formspree keeps working.** Each sign-up goes to both, so you still get the Formspree emails. If the sheet is ever unreachable, the sign-up still reaches Formspree; the person just doesn't see a number.
- **The same email twice** isn't added again. The person is told their original number.
- **Changing the script later:** after editing it in Apps Script, click **Deploy → Manage deployments**, click the **pencil**, set **Version** to **New version**, then **Deploy**. The URL stays the same.
- **Don't** sort or delete rows in the sheet if you want the numbers to keep counting correctly. The next number is always "rows in the sheet + 1". Use filters, or copy the data to another tab, to sort it.
