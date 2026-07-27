const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/", userController.fetchUsers);
router.get("/:userId", userController.fetchUser);
router.patch("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
