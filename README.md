# Book Resourcess Management Project

### Summery Of this Project
In this Backend project, We Handle The backend part of Book Resources management. 
This project have Two part First part is Author, any one can create author account using credentials. Second part is Book which is created by the author.
Secure all books API using jwt (jsonwebtoken).


## To run project :-
1. first install npm package -> npm install
2. run comman -> npm start

## Technology used in this project :-
    Express, 
    jwt,
    mongoose, 
    nodemon,
    Authetication for secure API

### Models

- Author Model
{
titile : {String, required,enum: ["Mr", "Mrs", "Miss"]},
name : {string, required},
email : {string, required},
password : {strinng, required}
}

- Books Model
{
name: {string, required, unique},
imageURL : {string, required},
author: {objectId, required},
pages : {Number, required},
price : {string, required}
}
