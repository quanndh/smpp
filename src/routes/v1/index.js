const router = require("express").Router();

router.use("/message", require("./message/message.route"));


module.exports = router;
