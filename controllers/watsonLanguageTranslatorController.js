const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: process.env.WATSON_LT_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_LT_APIKEY,
  }),
  url: process.env.WATSON_LT_URL,
});

let translate = async (req, res) => {
    const translateParams = {
        text: req.body.text,
        modelId: 'es-en',
    };

    languageTranslator
        .translate(translateParams)
        .then(translationResult => {
            res.send(translationResult.result);
        })
        .catch(err => {
            console.log('error:', err);
            res.send(err)
        });
}

module.exports = {
    translate
}