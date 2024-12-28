const { Firestore } = require('@google-cloud/firestore');

async function savePredictionData(id, data) {
  const db = new Firestore();

  const predictionsCollection = db.collection('predictions');
  return predictionsCollection.doc(id).set(data);
}

module.exports = savePredictionData;
