const { Router } = require("express");
const router = Router();
const { getUser } = require("../controllers/private.controller.js");
const auth = require("../middleware/auth");
router.get("/", auth, getUser);

module.exports = router;