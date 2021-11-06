const express = require("express");
const Blockchain = require('../blockchain');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const P2pServer = require('./p2p-server')
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
const swaggerDocs = swaggerJsDoc(swaggerOptions);


const HTTP_PORT = process.env.HTTP_PORT || 3001;
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
/**
 * @swagger
 * /api/blocks:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
 app.get('/api/blocks', (_req, res) => {
  res.json(bc.chain);
})


/**
 * @swagger
 * /api/mine:
 *    post:
 *      description: Use to return all blocks
 *      consumes:
 *         - application/json
 *    parameters:
 *      - in: body
 *        name: block
 *        description: The block to add
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - data
 *          properties:
 *            data:
 *              type: string
 *    responses:
 *      '200':
 *        description: Successfully added block
 */
app.post('/api/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  p2pServer.syncChains();
  res.redirect('/api/blocks');
})


app.listen(HTTP_PORT, () => {
  console.log(`Server listening on port ${HTTP_PORT}`);
});
p2pServer.listen();