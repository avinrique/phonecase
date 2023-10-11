const express = require("express")
const router = express.Router()
const admincontroller =  require("./../controller/admin")
router.route("/").get(admincontroller.getadmincontrol)

module.exports = router