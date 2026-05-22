const express=require("express")
const { getUserDataController } = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router=express.Router()

router.get("/get-profile",authMiddleware,getUserDataController)

module.exports=router