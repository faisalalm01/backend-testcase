const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mainRoutes = require('./src/routes');
const PORT = 3000;

const app = express();
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Library API',
        version: '1.0.0',
        description: 'API for managing a library system'
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ]
    },
    apis: ['./src/routes/*.js']
  };
  
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', mainRoutes);
app.get('/api', async (req, res) => {
    res.send({message: 'api its works 🐻'})
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app