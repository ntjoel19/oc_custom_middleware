const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");
const passwordCheck = require("../middleware/password");

router.post("/signup", passwordCheck, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/me", userCtrl.me)

router.get("/mentor/:mentorId", /*auth,*/ userCtrl.getMentorProfile);

module.exports = router;
