const { Router } = require("express");
const { user_sign_up, user_sign_in, fetch_user, update_user } = require("../controllers/UserController");

const router = Router();

router.post('/login', user_sign_in)
router.post('/signup', user_sign_up)
router.get('/fetch_user', fetch_user)
router.put('/update_user', update_user)

module.exports = router