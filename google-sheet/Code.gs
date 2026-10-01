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
  'celebrities', 'something_else', 'puzzles'
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
    return reply({ ok: true, number: number });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows how many have signed up (handy to test the deployment).
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  return reply({ ok: true, signups: Math.max(0, sheet.getLastRow() - 1) });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
