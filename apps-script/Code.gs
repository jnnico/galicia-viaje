const VOTES_SHEET = "Votes";

function doGet(e) {
  const action = (e.parameter.action || "list").toLowerCase();
  const callback = e.parameter.callback || "callback";
  let payload;

  if (action === "list") {
    payload = { ok: true, votes: listVotes_() };
  } else {
    payload = { ok: false, error: "Accion no soportada" };
  }

  return ContentService
    .createTextOutput(callback + "(" + JSON.stringify(payload) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  const payload = JSON.parse((e.postData && e.postData.contents) || "{}");
  const action = (payload.action || "").toLowerCase();

  if (action === "vote") {
    upsertVote_(payload);
    return json_({ ok: true });
  }

  if (action === "delete") {
    deleteVote_(payload.place_id, payload.voter);
    return json_({ ok: true });
  }

  if (action === "reset") {
    resetVotes_();
    return json_({ ok: true });
  }

  return json_({ ok: false, error: "Accion no soportada" });
}

function listVotes_() {
  const sheet = getVotesSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  return sheet.getRange(2, 1, lastRow - 1, 5).getValues()
    .filter(row => row[0] && row[2])
    .map(row => ({
      place_id: String(row[0]),
      place_name: String(row[1] || ""),
      voter: String(row[2]),
      score: Number(row[3]),
      updated_at: row[4] instanceof Date ? row[4].toISOString() : String(row[4] || "")
    }));
}

function upsertVote_(payload) {
  const placeId = String(payload.place_id || "").trim();
  const placeName = String(payload.place_name || "").trim();
  const voter = String(payload.voter || "").trim();
  const score = Number(payload.score);

  if (!placeId || !voter || score < 1 || score > 5) {
    throw new Error("Voto invalido");
  }

  const sheet = getVotesSheet_();
  const rowIndex = findVoteRow_(sheet, placeId, voter);
  const values = [[placeId, placeName, voter, score, new Date()]];

  if (rowIndex) {
    sheet.getRange(rowIndex, 1, 1, 5).setValues(values);
  } else {
    sheet.appendRow(values[0]);
  }
}

function deleteVote_(placeId, voter) {
  const sheet = getVotesSheet_();
  const rowIndex = findVoteRow_(sheet, String(placeId || "").trim(), String(voter || "").trim());
  if (rowIndex) sheet.deleteRow(rowIndex);
}

function resetVotes_() {
  const sheet = getVotesSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);
}

function findVoteRow_(sheet, placeId, voter) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]) === placeId && String(values[i][2]) === voter) {
      return i + 2;
    }
  }
  return 0;
}

function getVotesSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(VOTES_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(VOTES_SHEET);
    sheet.getRange(1, 1, 1, 5).setValues([["place_id", "place_name", "voter", "score", "updated_at"]]);
  }
  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
