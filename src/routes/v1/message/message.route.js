/**
 * Module route vaccine
 * Creator: hocpv
 * Editor:
 * CreateAt: Mar/02/2020
 * UpdateAt:
 *
 */

// const router = require("express-promise-router")();
const router = require("express").Router();

const MessageController = require("../../../controllers/message/message.controller");

router.route("/").get(MessageController.sendMessage);


module.exports = router;
