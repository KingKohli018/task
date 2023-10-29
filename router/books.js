const express = require("express")
const router = express.Router()
const bookController = require("../controller/books")

router.post("/addBooks" , bookController.addbooks)

router.get("/getbooks" , bookController.getallbooks)

router.post("/updateBooks/:bookId" , bookController.updatebooks)

router.delete("/deletebook/:bookId" , bookController.deletebook)


module.exports = router