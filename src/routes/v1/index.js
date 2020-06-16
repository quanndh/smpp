const router = require("express").Router();

router.use("/vaccination/vaccine", require("./vaccination/vaccines.route"));


module.exports = router;
