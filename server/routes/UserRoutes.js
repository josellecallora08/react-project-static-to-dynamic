const { Router } = require("express");
const { user_sign_up, user_sign_in } = require("../controllers/UserController");

const router = Router();

router.post('/login', user_sign_in)
router.post('/signup', user_sign_up)

module.exports = router