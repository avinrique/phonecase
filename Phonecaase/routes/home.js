const express = require('express')
const router = express.Router()
const homecontroller =  require("./../controller/homecontrol")
router.route("/").get(homecontroller.gethomecontrol)
router.route("/contact").get(homecontroller.getcontactcontrol)
module.exports = router