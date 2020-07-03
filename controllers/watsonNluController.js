const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const axios = require('axios');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: process.env.WATSON_NLU_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_NLU_APIKEY,
  }),
  url: process.env.WATSON_NLU_URL,
});

const analyze = async (req, res) => {
  const analyzeParams = {
    url: req.body.url,
    features: {
      entities: {
        sentiment: true,
        limit: 10
      },
      keywords: {
        sentiment: true,
        limit: 10
      },
      concepts: {
        limit: 10
      },
      metadata: {},
      relations: {},
      sentiment: {},
      categories: {
          limit: 10
      }
    },
    returnAnalyzedText: true,
    language: 'es'
  };

try {
    const response = naturalLanguageUnderstanding.analyze(analyzeParams);
    let analysisResults = (await response).result;
    enviarAnalisisACloudant(analysisResults);
    res.send(analysisResults);
} catch (error) {
    console.log("error:", error);
    res.send(error);
  }
};

enviarAnalisisACloudant = (data) => {
    axios
    .post(`${process.env.URL_API}/insert/nlu`, data)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = {
  analyze,
};
