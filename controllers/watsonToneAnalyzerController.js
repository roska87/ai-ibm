const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: process.env.WATSON_TONE_ANALYZER_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TONE_ANALYZER_APIKEY,
  }),
  url: process.env.WATSON_TONE_ANALYZER_URL,
});



let analyzeTone = async (req, res) => {
    let text = req.body.text;

    /* const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
        sentences: false,
        acceptLanguage: 'es'
    };

    toneAnalyzer
        .tone(toneParams)
        .then((toneAnalysis) => {
            res.send(toneAnalysis);
        })
        .catch((err) => {
            console.log("error:", err);
            res.send(err);
    }); */

    const toneChatParams = {
        utterances: [
          {
            text: text,
            user: "customer",
          }
        ],
      };

    toneAnalyzer
        .toneChat(toneChatParams)
        .then(utteranceAnalyses => {
            res.send(utteranceAnalyses.result);
        })
        .catch(err => {
            console.log('error:', err);
            res.send(err);
        });
}

module.exports = {
    analyzeTone
}