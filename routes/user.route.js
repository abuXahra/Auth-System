const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const validate = require("../middleware/validate");
const { registerShema, loginShema } = require("../validator/auth.validator");

router.post("/register", validate(registerShema), userController.createUser);
router.post("/login", validate(loginShema), userController.login);
router.post("/logout", userController.logout);

module.exports = router;
