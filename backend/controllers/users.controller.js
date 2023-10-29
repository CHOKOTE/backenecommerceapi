import dotenv from 'dotenv'
dotenv.config();
import { validationResult } from "express-validator";
import Clients from "../models/clients.model.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../helpers/sendMailer.js";
import { generate } from "randomstring";
import validateMongoDbId from "../helpers/validateMongoDbId.js";
const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  const avatar = "public/images/" + req.file.filename;
  const { firstname, lastname, email, password } = req.body;

  const err = validationResult(req);
  if (err.Result && err.Result.errors.length !== 0)
    return res.status(400).json(err);

  try {
    const oldUser = await Clients.findOne({ email });

    if (oldUser) {
      return res.status(409).send({ data: "User Already Exist. Please Login" });
    }
    const user = await Clients.create({
      firstname,
      lastname,
      email,
      password,
      avatar,
    });

    if (user) {
      const token = jwt.sign(
        { id: user._id, firstname, lastname, email, avatar },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      const mailSubject = "Mail Verification";
      const mailtoken = generate();
      const content = `<p>Hii ${firstname + " " + " " + lastname} please  
      <a href=${
        "http://127.0.0.1:5000/mail-verification?token=" + mailtoken + ""
      }>Verify</a> your mail  </p>`;

      sendMail(user.email, mailSubject, content);

      return res.status(200).json({
        token,
        message: "the user has been created",
      });
    } else return res.status(500).json({ message: "failed to create user" });
  } catch (err) {
    if (err.code == 11000)
      res.status(400).send({ message: "this email is already use" });
  }
};

 const signIn = async (req, res) => {
  const { email, password } = req.body;
  const err = validationResult(req);

  if (err.Result && err.Result.errors.length !== 0)
    return res.status(400).send(err);
  try {
    const user = await Clients.findOne({ email });

    if (user && (await compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          avatar: user.avatar,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      return res.status(200).json({
        token,
        message: "the user has been successfully login",
      });
    }
    res.status(400).json({ message: "the email or password are invalid" });
  } catch (err) {}
};

 const getUser = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  jwt.verify(authToken, JWT_SECRET, (err, user) => {
    if (err)
      res.status(400).send({
        message: err,
        massage2: "bad token",
      });
    res.status(200).send(user);
  });
};

const deleteUser = async (req, res) => {
  validateMongoDbId(req.params.id);
  const id = req.params.id;
  try {
    const client = await Clients.findById(id);
    if (!client)
      res.status(401).json({ message: "this client is not in the database" });
    await Clients.findByIdAndRemove(id);
    res
      .status(201)
      .json({ message: "this client has been successfilly delete  " + id });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  validateMongoDbId(req.params.id);

  const {
    phone,
    adress,
    sexe,
    role,
    newLetter,
    pinCode,
    locality,
    cityDistrictTown,
    state,
    landmark,
    addressType,
    alternatePhone,
  } = req.body;
  //const avatar = req.file.filename;
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json(err);
  try {
    const client = await Clients.avatarfindById(req.params.id);

    //console.log(client._id);

    if (!client) res.status(401).json({ message: "this client don't exit" });
    const userupdate = await Clients.findByIdAndUpdate(
      { _id: client._id },
      {
        phone,
        adress,
        sexe,
        role,
        newLetter,
        pinCode,
        locality,
        cityDistrictTown,
        state,
        landmark,
        addressType,
        alternatePhone,
        avatar: "public/images/" + req.file.filename,
      },
      { new: true }
    );

    const token = sign(
      {
        id: userupdate._id,
        email: userupdate.email,
        firstname: userupdate.firstname,
        lastname: userupdate.lastname,
        avatar: userupdate.avatar,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    return res.status(200).send(
      userupdate,
      token,
     "the user has been successfully updated",
    );
  } catch (err) {
    console.log(err);
    res.status(401).send(err)
  }
};

export  {
  signUp,
  signIn,
  getUser,
  deleteUser,
  updateUser,
};
