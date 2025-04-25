const express = require('express');
const router = express.Router();
const Society_Controller = require('../controllers/society.controller');

router.post('/createsocieties', Society_Controller.createSociety);
router.get('/societies', Society_Controller.getSociety);



module.exports = router;
