const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');

const router = express.Router();

const file = fs.readFileSync(path.join(__dirname, '..', 'swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;