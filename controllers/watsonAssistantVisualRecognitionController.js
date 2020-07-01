const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
const axios = require('axios');

const visualRecognition = new VisualRecognitionV3({
    version: process.env.WATSON_VISUAL_RECOGNITION_VERSION,
    authenticator: new IamAuthenticator({
      apikey: process.env.WATSON_VISUAL_RECOGNITION_APIKEY,
    }),
    url: process.env.WATSON_VISUAL_RECOGNITION_URL,
});

let classifyImage = async (req, res) => {
    let files = req.files;
  
    const classifyParams = {
      imagesFile: fs.createReadStream(files.imagen.path),
      classifierIds: [process.env.WATSON_VISUAL_RECOGNITION_CLASSIFIER_ID_HOTELES],
    };
  
    try {
      let response = await visualRecognition.classify(classifyParams);
      let classifiedImages = response.result;
      console.log(JSON.stringify(classifiedImages, null, 2));
  
      var hotel = classifiedImages.images[0].classifiers[0].classes.reduce(function (prev, current) {
          return (prev.score > current.score) ? prev : current
       });
  
      axios.post(process.env.CLOUD_FUNCTION_URL, {
          action: 'precio_habitacion',
          hotel: hotel.class
        })
        .then(function (response) {
          console.log(response.data);
          res.send(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

module.exports = {
    classifyImage
}
