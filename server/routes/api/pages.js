const router = require('express').Router();
const pagesController = require("../../controllers/pagesController");


//Matches with "/api/pages"

router.route('/')
    .get(pagesController.findAll)
    .post(pagesController.create);


//Matches with "/api/:identifier"

router.route('/:identifier')
    .get(pagesController.findSpecificPage)
    .put(pagesController.update)
    .delete(pagesController.remove);


module.exports = router;
