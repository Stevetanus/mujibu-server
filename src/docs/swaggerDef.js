const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'mujibu API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `${process.env.BASE_URL || `http://localhost:${config.port}`}/api`,
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth_Firebase: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

module.exports = swaggerDef;
