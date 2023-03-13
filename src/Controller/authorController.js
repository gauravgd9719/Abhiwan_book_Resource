const authorModel = require("../Model/authorModel");
const { validator } = require("../utils");

const createAuthor = async function (req, res) {
  let authorData = req.body;

  if (!validator.isValidRequestBody(requestBody)) {
    return res
      .status(400)
      .send({ status: false, message: "Please provide book details" });
  }

  let { title, name, email, password } = authorData;

  if (!validator.isValid(title)) {
    return res.status(400).send({ message: "title is required" });
  }

  if (!validator.isValid(email)) {
    return res.status(400).send({ message: "eamil is required" });
  }

  if (!validator.isValid(password)) {
    return res.status(400).send({ message: "password is required" });
  }

  if (!validator.isValid(name)) {
    return res.status(400).send({ message: "name is required" });
  }

  if (title !== "Mr" && title !== "Miss" && title !== "Mrs") {
    return res
      .status(400)
      .send({ status: false, message: "title should be in Mr/Mrs/Miss" });
  }

  if (!validator.emailValidate.test(email)) {
    return res
      .status(400)
      .send({ status: false, message: "enter a valid email" });
  }

  let checkEmailInDB = await authorModel.findOne({ email: email });
  if (checkEmailInDB) {
    return res
      .status(403)
      .send({ status: false, message: "email is already exits" });
  }

  if (!validator.passValidate.test(password)) {
    return res
      .status(400)
      .send({
        status: false,
        message:
          "password must between(8 to 15) and one UPPER case and one lower case",
      });
  }

  const createAuthor = await authorModel.create(authorData);

  return res.status(201).send({ status: true, data: createAuthor });
};






/**
 * @LoginAuthor api
 */

const LoginAuthor = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).send({ message: " Email is not present" });
    }
    if (!password) {
      return res.status(400).send({ message: " password is not present" });
    }

    let author = await authorModel.findOne({
      email: email,
      password: password,
    });
    if (!User) {
      return res
        .status(404)
        .send({ status: false, message: "email/password not found" });
    }

    let token = jwt.sign({ authorId: author._id }, "thisisSecretekeybygd");

    return res
      .status(200)
      .send({ status: true, message: "Success", data: token });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createAuthor,
  LoginAuthor,
};
