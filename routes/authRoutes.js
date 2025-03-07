const { signup, login, getsignup } = require("../controllers/authControllers");
const { signUpValidation, loginValidation } = require("../middlewares/authValidation");

const router = require("express").Router();

router.post("/signup", signUpValidation, signup)
router.get("/", getsignup)
router.post("/login", loginValidation, login)
module.exports = router;