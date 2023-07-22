const express = require("express");
const ctrl = require("../../controllers");
const router = express.Router();

router.post("/users/register", ctrl.users.register);
router.post("/users/login", ctrl.users.login);

module.exports = router;
