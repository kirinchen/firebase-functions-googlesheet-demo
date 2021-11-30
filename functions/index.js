const functions = require("firebase-functions");
const googleSheet = require("./google-sheet");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  
  try {
    const email = request.query.e;
    functions.logger.info("Hello " + email, { structuredData: true });
    response.send("Hello " + email);
    // await runSyncSheet(email);
    // response.send(email+" 謝謝你的支持 這是你的  🍦 🍦 🍦 🍦 🍦");
  } catch (error) {
    response.send(error);
  }
});
const runSyncSheet = async (email) => {

  const sheet = await googleSheet.getSheet();
  // const idx = await googleSheet.indexByVal(sheet, "vampirebat579@gmail.com");
  const idx = await googleSheet.indexByVal(sheet, email);
  console.log(idx);
  const isRedeemed = await googleSheet.getByCellVal(sheet, idx);
  if (isRedeemed == "Y") {
    console.log('isRedeemed=' + isRedeemed);
    throw "isRedeemed Before";
  }
  googleSheet.setValByIdx(sheet, idx, "Y");
};



//  runSyncSheet("sohodiypc@hotmail.com");
