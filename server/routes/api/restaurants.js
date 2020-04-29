const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantsController");


//Matches with "/api/restaurants"

router.route('/')
    .get(restaurantController.findAll)
    .post(restaurantController.create);

//Matches with "/api/:coords/:second"
router.route('/:coords/:second')
    .get(restaurantController.findInArea);

//Matches with "/api/restaurants/:id"
router.route('/:id')
    .get(restaurantController.findSpecificRestaurant)
    .put(restaurantController.update)
    .delete(restaurantController.remove);

module.exports = router;
