const functions = require("firebase-functions");
const googleSheet = require("./google-sheet");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  
  try {
    const email = request.query.e;
    const gsheetId = request.query.s;
    functions.logger.info("Hello " + email, { structuredData: true });
    // response.send("Hello " + email);
    const ok = await runSyncSheet(gsheetId,email);
    if(ok){
      response.send(email+" 謝謝你的支持 這是你的冰淇淋");
    }else{
      response.send(email+" 你已經換過了喔");
    }
    
  } catch (error) {
    response.send(error);
  }
});
const runSyncSheet = async (gsheetId,email) => {

  const sheet = await googleSheet.getSheet(gsheetId);
  // const idx = await googleSheet.indexByVal(sheet, "vampirebat579@gmail.com");
  const idx = await googleSheet.indexByVal(sheet, email);
  console.log(idx);
  const isRedeemed = await googleSheet.getByCellVal(sheet, idx);
  if (isRedeemed == "Y") {
    console.log('isRedeemed=' + isRedeemed);
    return false;
  }
  googleSheet.setValByIdx(sheet, idx, "Y");
  return true;
};



//  runSyncSheet("1Vf0A4HR9qH6mB6LXxHWSInDNKAOc7B05rvsNZl5jfcg","a29243004@gmail.com");
