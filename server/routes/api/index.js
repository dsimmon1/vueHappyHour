const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const keyRoutes = require("./key")
const pagesRoutes = require("./pages")
const usersRoutes = require("./users")


// Routes
router.use("/restaurants", restaurantRoutes);
router.use("/key", keyRoutes);
router.use("/pages", pagesRoutes);
router.use("/users", usersRoutes)


module.exports = router;
