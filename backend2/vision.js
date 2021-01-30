const vision = require("@google-cloud/vision");

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function getDataFromImage(file) {

  // Performs label detection on the image file
  const [result] = await client.annotateImage({
    image: {
      source: { filename: `./uploads/${file}`},
    },
    features: [
      { type: "LABEL_DETECTION" },
    ],
  });

 

  return result;
}

module.exports = {
  getDataFromImage,
};