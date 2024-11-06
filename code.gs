function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function appendToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("attendance");
  if (!sheet) {
    return { success: false, message: "Attendance sheet not found" };
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const idIndex = headers.indexOf("id") + 1;
  const nameIndex = headers.indexOf("name") + 1;
  const timestampIndex = headers.indexOf("timestamp") + 1;
  
  if (idIndex === 0 || nameIndex === 0 || timestampIndex === 0) {
    return { success: false, message: "Required columns not found" };
  }
  
  sheet.appendRow([data.id, data.name, new Date()]);
  return { success: true, message: "Data saved successfully" };
}
