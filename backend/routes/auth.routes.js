module.exports = app => {
  const { verifySignUp } = require("../middlewares");
  const controller = require("../controllers/auth.controller");
  const passport = require("passport");
  app.use(passport.initialize());
  require("../middlewares/passport");
  const verifyToken = passport.authenticate("jwt", { session: false });

  var router = require("express").Router();

  // Login
  router.post("/signup", [verifySignUp.checkDuplicateEmail], controller.signup);

  // Register
  router.post("/signin", controller.signin);

  // Retrieve all Users
  router.get("/", verifyToken, controller.findAll);

  // Delete User by id
  router.delete("/:id", verifyToken, controller.delete);

  app.use('/api/auth', router);
};