/**
 * YECEF — registration desk receiver
 * =================================================================
 * Paste this into the "FRESH FIRE 2026 — All Responses" spreadsheet:
 *   Extensions → Apps Script → replace everything → paste → Save
 *
 * Then deploy it:
 *   Deploy → New deployment → gear icon → Web app
 *     Description:     Desk receiver
 *     Execute as:      Me (your account)
 *     Who has access:  Anyone            ← required; the desk posts anonymously
 *   Deploy → Authorise → copy the /exec URL
 *
 * Finally paste that URL into src/data/site.js as `desk.endpoint`,
 * commit and push. The desk starts syncing on its own.
 *
 * Re-deploying after an edit: Deploy → Manage deployments → edit (pencil)
 * → Version: New version → Deploy. The URL stays the same.
 * =================================================================
 */

const SHEET_NAME = 'Walk-ins'

const HEADERS = [
  'Saved at', 'Name', 'Phone', 'Gender', 'Age',
  'Area / axis', 'First time', 'Notes', 'Volunteer', 'Event', 'Entry ID',
]

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(20000)                       // two desks can post at once
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = getSheet_()

    // Ignore a repeat of an entry we already have. The desk retries on a
    // flaky connection, so the same person can arrive more than once.
    if (data.id && alreadyHave_(sheet, data.id)) {
      return ok_({ status: 'duplicate' })
    }

    sheet.appendRow([
      data.at ? new Date(data.at) : new Date(),
      data.name || '',
      // leading apostrophe keeps 0801… from being read as a number
      data.phone ? "'" + data.phone : '',
      data.gender || '',
      data.age || '',
      data.axis || '',
      data.first || '',
      data.notes || '',
      data.volunteer || '',
      data.event || '',
      data.id || '',
    ])
    return ok_({ status: 'saved' })
  } catch (err) {
    return ok_({ status: 'error', message: String(err) })
  } finally {
    lock.releaseLock()
  }
}

function doGet() {
  return ok_({ status: 'alive', sheet: SHEET_NAME })
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

function alreadyHave_(sheet, id) {
  const last = sheet.getLastRow()
  if (last < 2) return false
  const col = HEADERS.indexOf('Entry ID') + 1
  const ids = sheet.getRange(2, col, last - 1, 1).getValues()
  return ids.some((r) => r[0] === id)
}

function ok_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}
