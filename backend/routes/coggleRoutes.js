const express = require('express');
const { fetchDiagrams } = require('../controllers/coggleController');

const router = express.Router();

router.get('/fetch-diagrams' , fetchDiagrams)

module.exports = router