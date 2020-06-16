/**
 * Module route vaccine
 * Creator: hocpv
 * Editor:
 * CreateAt: Mar/02/2020
 * UpdateAt:
 *
 */

const router = require("express-promise-router")();

router.route("/").get(() => { return 1 });


module.exports = router;
