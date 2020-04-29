const express = require('express');
const keyController = require("../../controllers/keysController");

const router = express.Router();

//Matches with "/api/keys"
router.route('/')
    .get(keyController.findAll)

module.exports = router;
