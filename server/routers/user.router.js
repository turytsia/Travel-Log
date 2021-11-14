const { Router } = require("express");
const { upload } = require("../multerInit.js");
const router = Router();
const {
    Register,
    Login,
    Logout,
    getUser,
    Follow,
    getUsers,
    updateUser,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.patch("/:id/update", [auth, upload.single("image")], updateUser);
router.get("/:id/follow", auth, Follow);

module.exports = router;