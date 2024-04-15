const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authContollers");
const { signupSchema, loginSchema } = require("../validators/auth-validators");
const validate = require("../middlewares/authMiddlewares");
const authMiddleware = require("../middlewares/authMiddlewares");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);

router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;