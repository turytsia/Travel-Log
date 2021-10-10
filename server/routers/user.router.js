const { Router } = require("express");
const router = Router();
const { Register, Login, Logout } = require("../controllers/user.controller");

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);

module.exports = router;