function generateQRCodes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("students");
  if (!sheet) {
    throw new Error("Sheet 'students' does not exist.");
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const idIndex = headers.indexOf("id");
  const nameIndex = headers.indexOf("name");

  if (idIndex === -1 || nameIndex === -1) {
    throw new Error("Columns 'id' or 'name' not found.");
  }

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  const driveFolder = getOrCreateFolder("generated_qr");
  clearFolder(driveFolder);

  data.forEach((row) => {
    const id = row[idIndex];
    const name = row[nameIndex];

    if (!id || !name) return; // Skip if missing id or name

    const jsonData = JSON.stringify({ id, name });
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(jsonData)}&size=200x200`;

    try {
      const response = UrlFetchApp.fetch(qrUrl);
      const blob = response.getBlob().setName(`${id}.png`);
      driveFolder.createFile(blob);
    } catch (error) {
      console.error(`Failed to generate QR for ${id}: ${error}`);
    }
  });

  Logger.log("QR codes generated successfully.");
}

function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

function clearFolder(folder) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    file.setTrashed(true);
  }
}
