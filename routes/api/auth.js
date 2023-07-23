const express = require("express");
const ctrl = require("../../controllers");
const authenticate = require("../../middlewares");
const router = express.Router();

router.post("/users/register", ctrl.users.register);
router.post("/users/login", ctrl.users.login);
router.post("/users/logout", authenticate, ctrl.users.logout);
router.get("/users/current", authenticate, ctrl.users.current);
router.patch(
  "/users/subscription",
  authenticate,
  ctrl.users.updateSubscription
);

module.exports = router;
