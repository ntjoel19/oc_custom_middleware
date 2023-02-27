const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");
const sessionsCtrl = require("../controllers/sessions");


router.get("/users/:mentorId/events", /*auth,*/ sessionsCtrl.getEvents)
router.get("/mentor/:mentorId/students", /*auth,*/ sessionsCtrl.getMentorStudents);
router.get("/users/:mentorId/sessions", /*auth,*/ sessionsCtrl.getMentorSessions);

module.exports = router;