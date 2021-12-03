
const { GoogleSpreadsheet } = require('google-spreadsheet');
const config = require('./config');
/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */
async function getSheet(docID = config.spreadsheet_id, sheetID = config.sheet_id, credentialsPath = './credentials.json') {
    const doc = new GoogleSpreadsheet(docID);
    const creds = require(credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    return sheet;
}

async function getData(sheet) {
    const result = [];
    const rows = await sheet.getRows();
    for (let row of rows) {
        result.push(row._rawData);
    }
    return result;
};



async function indexByVal(sheet, val) {
    const list = await getData(sheet);
    for (let i = 0; i < list.length; i++) {
        const row = list[i];
        if (row[2] == val) return i;
    }
    return -1;
}

async function getByCellVal(sheet, idx) {
    idx += 2;
    await sheet.loadCells(`H${idx}:H${idx}`); // loads a range of cells
    const hcell = sheet.getCellByA1('H' + idx); //
    return hcell.value;
}


//https://theoephraim.github.io/node-google-spreadsheet/#/
async function setValByIdx(sheet, idx, val) {
    idx += 2;
    await sheet.loadCells(`H${idx}:H${idx}`); // loads a range of cells
    const hcell = sheet.getCellByA1('H' + idx); //
    hcell.value = val;
    await sheet.saveUpdatedCells();
}


module.exports = {
    getSheet,
    getData,
    indexByVal,
    getByCellVal,
    setValByIdx
};