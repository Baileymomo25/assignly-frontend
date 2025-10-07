const express = require('express');
const { submitRequest, getRequest } = require('../controllers/requestController');

const router = express.Router();

router.post('/', submitRequest);
router.get('/:id', getRequest);

module.exports = router;