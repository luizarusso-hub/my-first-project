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

// Visiting the web app URL in a browser shows how many have signed up (handy to test the deployment).
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  return reply({ ok: true, signups: Math.max(0, sheet.getLastRow() - 1) });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
