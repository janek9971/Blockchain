const express = require("express");
const Blockchain = require('../blockchain');
const bc = new Blockchain();
const port = process.env.PORT || 3001;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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
  res.redirect('/api/blocks');
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});