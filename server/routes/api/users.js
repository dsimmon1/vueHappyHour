const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/users/users"
router.route('/users')
    .get(usersController.findAll)

//Matches with "/api/users/profile"
router.route('/profile')
    .get(usersController.findSpecificProfile)

//Matches with "/api/users/register"

router.route('/register')
    .get(usersController.register);


//Matches with "/api/users/login"

router.route('/login')
    .post(usersController.login)

module.exports = router;
