const express = require('express');
const app = express();
const Blockchain = require('../blockchain');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Blockchain API',
            description: 'Blockchain API',
            contact: {
                name: "Chris"
            },
            servers: [`http://localhost:3001`]
        }
    },
    apis: ["index.js"]
}

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

// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
 app.get("/customers", (req, res) => {
    res.status(200).send("Customer results");
  });
  



app.listen(HTTP_PORT, () => {console.log(`Listening on port ${HTTP_PORT}`)});