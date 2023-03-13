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


const phoneValidate = new RegExp(/^([+]\d{2})?\d{10}$/);

//validation for email 
const emailValidate = new RegExp(/[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}/);

module.exports = {
    isValidRequestBody,
    isValid,
    isValidImageURL,
    validNumber,
    isValidObjectId,
    phoneValidate,
    emailValidate
}