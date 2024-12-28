const { Firestore } = require('@google-cloud/firestore');

async function fetchPredictionHistory() {
    const db = new Firestore();
    const predictionsCollection = db.collection('predictions');

    const allData = await predictionsCollection.get();
    return allData;
}

module.exports = fetchPredictionHistory;
