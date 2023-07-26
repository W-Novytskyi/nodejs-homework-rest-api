const express = require("express");
const ctrl = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
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

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.users.updateAvatar
);

module.exports = router;
