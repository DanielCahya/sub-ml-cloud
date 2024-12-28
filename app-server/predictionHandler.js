const classifyPrediction = require('../app-services/classificationPrediction');
const crypto = require('crypto');
const savePredictionData = require('../app-services/savePredictionData');
const fetchPredictionHistory = require('../app-services/fetchPredictionHistory');

async function postPredictionHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { label, suggestion } = await classifyPrediction(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "suggestion": suggestion,
        "createdAt": createdAt
    }

    await savePredictionData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201);
    return response;
}

async function getPredictionHistoryHandler(request, h) {
    const allData = await fetchPredictionHistory();

    const formattedData = [];
    allData.forEach(doc => {
        const data = doc.data();
        formattedData.push({
            id: doc.id,
            history: {
                result: data.result,
                createdAt: data.createdAt,
                suggestion: data.suggestion,
                id: doc.id
            }
        });
    });

    const response = h.response({
        status: 'success',
        data: formattedData
    })
    response.code(200);
    return response;
}

module.exports = { postPredictionHandler, getPredictionHistoryHandler };
