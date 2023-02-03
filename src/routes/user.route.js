const express = require("express");
const router = express.Router()

const userController = require("../controller/user.controller");


router.post("/create",userController.createUser)
router.post("/login",userController.login)
// router.post("/logout",userController.logOut)


module.exports = router;