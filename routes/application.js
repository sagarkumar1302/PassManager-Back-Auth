const { appregister, getappregister, getappdelete, getappupdate } = require("../controllers/authControllers");

const router = require("express").Router();

router.get("/",getappregister )
router.post("/register", appregister)
router.delete("/delete/:id", getappdelete)
router.put("/update/:id", getappupdate)
module.exports = router;