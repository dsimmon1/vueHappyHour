const router = require('express').Router();
const pagesController = require("../../controllers/pagesController");


//Matches with "/api/pages"

router.route('/')
    .get(pagesController.findAll);


//Matches with "/api/:identifier"

router.route('/:identifier')
    .get(pagesController.findSpecificPage);


module.exports = router;
