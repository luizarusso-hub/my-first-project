/**
 * CorvidzzPuzzles waiting list: saves each sign-up to this Google Sheet and
 * tells the page which number the person is on the list.
 *
 * Setup: see SETUP-GOOGLE-SHEET.md in the project. In short: paste this whole
 * file into Extensions → Apps Script, then Deploy → New deployment → Web app,
 * "Execute as: Me", "Who has access: Anyone", and copy the web app URL.
 */

// The columns, in order. Row 1 of the sheet is filled with these on the first sign-up.
var COLUMNS = [
  'number', 'signed_up_at', 'name', 'email', 'access',
  'shows_and_movies', 'music', 'creators_and_internet', 'games', 'sports',
  'celebrities', 'something_else', 'puzzles', 'came_from', 'found_us'
];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spam trap: real people never fill this hidden field.
  if (p._gotcha) return reply({ ok: true });

  var email = String(p.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({ ok: false, error: 'bad email' });

  // One sign-up at a time, so two people can never get the same number.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    } else if (sheet.getLastColumn() < COLUMNS.length) {
      // new columns were added to COLUMNS since the sheet was started: add their headings
      sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]).setFontWeight('bold');
    }

    // If this email already signed up, give them back their original number.
    var rows = sheet.getLastRow() - 1;
    if (rows > 0) {
      var emails = sheet.getRange(2, 4, rows, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === email) {
          var existing = sheet.getRange(i + 2, 1).getValue();
          return reply({ ok: true, number: existing, returning: true });
        }
      }
    }

    var number = rows + 1;
    var row = COLUMNS.map(function (key) {
      if (key === 'number') return number;
      if (key === 'signed_up_at') return new Date();
      if (key === 'email') return email;
      return String(p[key] || '').slice(0, 500);
    });
    sheet.appendRow(row);
    notify(number, p, email);
    sendWelcome(email, p.name);
    return reply({ ok: true, number: number });
  } finally {
    lock.releaseLock();
  }
}

// Emails the owner about each new sign-up (free, sent from the Google account that owns the sheet).
// To turn this off, set NOTIFY_EMAIL to ''.
var NOTIFY_EMAIL = 'corvidzzpuzzles@gmail.com';
function notify(number, p, email) {
  if (!NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New CorvidzzPuzzles sign-up: No. ' + number,
      'No. ' + number + '\n' +
      'Name: ' + String(p.name || '(not given)').slice(0, 200) + '\n' +
      'Email: ' + email + '\n' +
      'Came from: ' + String(p.came_from || 'direct').slice(0, 60) + '\n\n' +
      'The full list is in the Google Sheet.');
  } catch (err) {
    // a failed email must never stop the sign-up from being saved
  }
}

// Run this once from the Apps Script editor (choose "testEmail" next to the Run button, then Run).
// Google then asks for permission to send email; after you allow it, a test email arrives
// and every new sign-up sends an alert.
function testEmail() {
  MailApp.sendEmail(NOTIFY_EMAIL, 'CorvidzzPuzzles sign-up alerts are working',
    'This is a test. From now on you will get an email like this for every new sign-up.');
}

// ---------- The welcome email each new sign-up receives ----------
// Sent once, to new emails only (someone signing up again doesn't get a second one).
// It is built like the waitlist page: the teal book cover with the gold frame, on the green background.
// The pictures are loaded from corvidzz.com/assets/email/, so they must be on the live site.

// The free sample: paste its link between the quotes (a Google Drive link, a PDF on the site, ...).
// While this is empty, no welcome email is sent.
var SAMPLE_URL = '';
var SITE = 'https://www.corvidzz.com';
var WELCOME_SUBJECT = "You're on the Corvidzz waitlist! Here's your free sample";
var WELCOME_FROM_NAME = 'The Corvidzz Team';

function sendWelcome(email, name) {
  if (!SAMPLE_URL) return;
  try {
    MailApp.sendEmail({
      to: email,
      subject: WELCOME_SUBJECT,
      name: WELCOME_FROM_NAME,
      body: welcomeText(name),
      htmlBody: welcomeHtml(name)
    });
  } catch (err) {
    // a failed email must never stop the sign-up from being saved
  }
}

// Run this from the Apps Script editor (choose "testWelcome" next to Run) to get the welcome email yourself.
function testWelcome() {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL, subject: '[Test] ' + WELCOME_SUBJECT, name: WELCOME_FROM_NAME,
    body: welcomeText('Morgan'), htmlBody: welcomeHtml('Morgan')
  });
}

function firstName(name) {
  return String(name || '').trim().split(/\s+/)[0].slice(0, 40);
}

function welcomeText(name) {
  return 'Hi ' + (firstName(name) || 'there') + ',\n\n' +
    'Thank you for signing up for the Corvidzz waitlist! We’re excited to have you.\n\n' +
    'Here’s your free sample: ' + (SAMPLE_URL || SITE) + '\n\n' +
    'Stay tuned. We’ll be sharing more with you very soon.\n\n' +
    'Thanks,\nThe Corvidzz Team\n' + SITE;
}

function welcomeHtml(name) {
  var who = firstName(name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') || 'there';
  var img = SITE + '/assets/email/';
  var sample = String(SAMPLE_URL || SITE).replace(/"/g, '%22');
  var serif = "'IM Fell English', Georgia, 'Times New Roman', serif";
  var caps = "'Cinzel', Georgia, 'Times New Roman', serif";
  var p = 'margin:0 0 16px;font-family:' + serif + ';font-size:18px;line-height:1.45;color:#f6eed6;';
  var gold = 'font-family:' + caps + ';font-weight:800;font-size:15px;letter-spacing:.02em;color:#f2cf73;';
  return '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light only">' +
    '<title>Welcome to the Corvidzz waitlist</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=Cinzel:wght@700;800&display=swap" rel="stylesheet">' +
    '<style>' +
    'body{margin:0;padding:0;background:#4a7044;}' +
    '@media (max-width:620px){.inner{width:80% !important;}.h1{font-size:24px !important;}.txt{font-size:16px !important;}.btn a{font-size:16px !important;padding:12px 16px !important;}}' +
    '</style></head>' +
    '<body style="margin:0;padding:0;background:#4a7044;">' +
    // preview line shown in the inbox list
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Thank you for joining the Corvidzz waitlist. Your free sample is inside.</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#4a7044" style="background:#4a7044 radial-gradient(ellipse at 50% 30%,#5f8656 0%,#4a7044 50%,#2f4d2e 100%);">' +
    '<tr><td align="center" style="padding:32px 12px 40px;">' +

    // the book: top of the cover, the middle (repeats down as far as the words need), the bottom
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">' +
    '<tr><td style="line-height:0;font-size:0;"><img src="' + img + 'cover-top.jpg" width="600" alt="" style="display:block;width:100%;height:auto;border:0;"></td></tr>' +
    '<tr><td align="center" bgcolor="#104344" background="' + img + 'cover-middle.jpg" style="background:#104344 url(' + img + 'cover-middle.jpg) center top / 100% auto repeat-y;">' +

    '<table role="presentation" class="inner" width="400" cellpadding="0" cellspacing="0" border="0" style="width:68%;margin:0 auto;">' +
    '<tr><td align="center" style="padding:0 0 8px;"><img src="' + img + 'logo.png" width="120" height="120" alt="CorvidzzPuzzles" style="display:block;width:120px;height:120px;border:0;"></td></tr>' +
    '<tr><td align="center" style="padding:6px 0 4px;font-family:\'IM Fell English SC\',Georgia,serif;font-size:15px;letter-spacing:.14em;color:#ecc86f;">&#10022; You’re on the list &#10022;</td></tr>' +
    '<tr><td align="center" class="h1" style="padding:0 0 20px;font-family:' + caps + ';font-weight:800;font-size:30px;line-height:1.15;color:#efe6cc;text-shadow:0 2px 0 rgba(0,0,0,.5);">Thank you for signing up!</td></tr>' +

    // the letter, on a darker teal panel with a double gold line, like the bullet points on the site
    '<tr><td style="padding:0 0 24px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0b2b2c" style="background:#0b2b2c;border:1px solid #c8963a;">' +
    '<tr><td style="padding:3px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ecc86f;">' +
    '<tr><td class="txt" style="padding:22px 22px 8px;text-align:left;">' +
    '<p class="txt" style="' + p + '">Hi ' + who + ',</p>' +
    '<p class="txt" style="' + p + '">Thank you for signing up for the <span style="' + gold + '">Corvidzz waitlist</span>! We’re excited to have you.</p>' +
    '<p class="txt" style="' + p + '">Here’s your <span style="' + gold + '">free sample</span>:</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:4px auto 22px;"><tr>' +
    '<td class="btn" align="center" bgcolor="#b23c29" style="background:#b23c29;border:3px solid #0b1613;">' +
    '<a href="' + sample + '" target="_blank" style="display:inline-block;padding:13px 24px;border:2px solid #c8963a;font-family:\'IM Fell English SC\',Georgia,serif;font-size:19px;letter-spacing:.05em;color:#ecc86f;text-decoration:none;">&#10022; Open your free sample &#10022;</a>' +
    '</td></tr></table>' +
    '<p class="txt" style="' + p + '">Stay tuned. We’ll be sharing more with you very soon.</p>' +
    '<p class="txt" style="' + p + 'font-style:italic;">Thanks,<br><span style="' + gold + 'font-style:normal;">The Corvidzz Team</span></p>' +
    '</td></tr></table></td></tr></table>' +
    '</td></tr>' +
    '</table>' +

    '</td></tr>' +
    '<tr><td style="line-height:0;font-size:0;"><img src="' + img + 'cover-bottom.jpg" width="600" alt="" style="display:block;width:100%;height:auto;border:0;"></td></tr>' +
    '</table>' +

    '<p style="margin:22px 0 0;font-family:' + serif + ';font-size:14px;line-height:1.5;color:#e7ecd8;">' +
    'You’re getting this because you joined the waitlist at ' +
    '<a href="' + SITE + '" style="color:#ecc86f;">corvidzz.com</a>.</p>' +
    '</td></tr></table></body></html>';
}

// Visiting the web app URL in a browser shows how many have signed up (handy to test the deployment).
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  return reply({ ok: true, signups: Math.max(0, sheet.getLastRow() - 1) });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
