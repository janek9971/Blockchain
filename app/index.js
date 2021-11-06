const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Blockchain = require('../blockchain');
const port = process.env.PORT || 3001;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: 'Blockchain API',
      description: 'Blockchain API',
      contact: {
        name: "Chris"
      },
      servers: ["http://localhost:3001"]
    }
  },
  // ['.routes/*.js']
  // apis: ["index.js"]
  apis: ['./app/**/*.js'],

};
const bc = new Blockchain();


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
/**
 * @swagger
 * /blocks:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
 app.get('/blocks', (_req, res) => {
  res.json(bc.chain);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});