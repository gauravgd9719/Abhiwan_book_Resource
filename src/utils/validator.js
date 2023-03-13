const mongoose = require("mongoose")

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidImageURL= function(logoLink){
    return /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(logoLink)
}

const validNumber = function(price){
    return /^[0-9]*$/.test(price)
}

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidPassword= function(password){
    return /^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/.test(password)
}

const isValidEmail= function(email){
    return /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}/.test(email)
}


module.exports = {
    isValidRequestBody,
    isValid,
    isValidImageURL,
    validNumber,
    isValidObjectId,
    isValidPassword,
    isValidEmail
}