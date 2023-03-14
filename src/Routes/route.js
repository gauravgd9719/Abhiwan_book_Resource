const express = require("express");
const router = express.Router();

// Import controller/auth
const authorController = require("../Controller/authorController")
const bookController = require("../Controller/bookController");
const auth = require("../middleware/auth")

//Create Author API
router.post("/createAuthor",authorController.createAuthor)

// login Author
router.post('/loginAuthor',authorController.LoginAuthor)

/**
 * 
 * @Books API
 * 
 */


// Create Book API
router.post("/createBooks",auth.authentication, bookController.createBook);

// Get Books API
router.get("/getBooks",auth.authentication, bookController.getBooks)

// Update Book API
router.put("/updateBooks/:bookId",auth.authentication, bookController.updateBook)

// Delete Book API
router.delete('/deleteBook/:bookId',auth.authentication,  bookController.deleteBooks);



// If hit wrong URL request
router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports = router;
