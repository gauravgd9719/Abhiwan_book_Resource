const express = require("express");
const router = express.Router();

// Import controller
const bookController = require("../Controller/bookController");

// Create Book API
router.post("/createBooks", bookController.createBook);

// Get Books API
router.get("/getBooks",bookController.getBooks)

// Update Book API
router.put("/updateBooks/:bookId",bookController.updateBook)

// Delete Book API
router.delete('/deleteBook/:bookId', bookController.deleteBooks);



// If hit wrong URL request
router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports = router;
