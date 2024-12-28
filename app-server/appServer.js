require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('../app-server/predictionRoutes');
const loadModel = require('../app-services/modelLoader');
const InvalidInputError = require('../app-exceptions/InvalidInputError');

(async () => {
    const server = Hapi.server({
        port: process.env.PORT || 2000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        if (response instanceof InvalidInputError) {
            const newResponse = h.response({
                status: 'fail',
                message: `${response.message}`
            })
            newResponse.code(response.statusCode)
            return newResponse;
        }

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode)
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server started at: ${server.info.uri}`);
})();
