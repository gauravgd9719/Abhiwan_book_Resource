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


module.exports = {
    isValidRequestBody,
    isValid,
    isValidImageURL,
    validNumber,
    isValidObjectId
}