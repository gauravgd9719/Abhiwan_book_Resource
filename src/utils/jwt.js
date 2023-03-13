const jwt = require("jsonwebtoken")



const createToken = async function (){
    try{
        const token = await jwt.sign(bookId,"securityKeyByGaurav12323")
    }catch(error){
        return res.status(500).send({message:error.message})
    }
}




module.exports = {
    createToken
}

