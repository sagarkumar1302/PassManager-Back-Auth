const ensureAuthenticated = require("../middlewares/productValidation");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "IPhone",
      price: 180000,
    },
    {
      name: "IQOO",
      price: 10000,
    },
  ])
});
module.exports = router;
