const express = require("express");
const router = express.Router();
const {
  insertUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  storeUserRefreshJWT,
  verifyUser,
} = require("../models/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper");
const {
  userAuthorization,
} = require("../middleware/authorization.middleware.js");
const {
  setPasswordResetPin,
  getPinByEmailAndPin,
  deletePin,
} = require("../models/resetPin/ResetPin.model");
const {
  notifyPinEmail,
  notifyPasswordReset,
  newUserConfirmation,
} = require("../helpers/email.helper");
const { deleteJWT } = require("../helpers/redis.helper");

//  reminder: update root url to a value in .env
const verificationURL = "http://localhost:3000/verification/";


// consider removing router.all.  may not serve a purpose
router.all("/", (req, res, next) => {
  // res.json({ message: "User Route has been hit" });
  // console.log("User Route has been hit");
  next();
});

// get user route
// userAuthorization middleware generates an error if user is not authorized
// this is the V1/user route
router.get("/", userAuthorization, async (req, res) => {
  const _id = req.userId;

  const userProf = await getUserById(_id);
  const { name, email } = userProf;

  res.json({
    user: {
      _id,
      name,
      email,
    },
  });
});

// verify user after user signs up
// this is the V1/user/verify route
router.patch("/verify", async (req, res) => {
  try {
    // reminder: find out how req.body is populated and add comments
    const { _id, email } = req.body;
    const result = await verifyUser(_id, email);

    if (result && result.id) {
      res.json({
        status: "success",
        message: "Your account has been verified.  Please login to continue.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "There was an error verifying your account.  Please try again or contact support.",
    });
  }
});

// create a new user
// this is the V1/user route
router.post("/", async (req, res) => {
  const { name, email, password, company, address, phone } = req.body;
  try {
    // hash password
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      email,
      password: hashedPass,
      company,
      address,
      phone,
    };

    const result = await insertUser(newUserObj);
    console.log("Result : " + result);

    await newUserConfirmation(result.email, verificationURL + result._id + '/' + result.email),

      res.json({ status: "success", message: "New user created", result });

  } catch (error) {
    let message =
      "Unable to create new user at the moment.  Please try again or contact support.";

    if (error.message.includes("duplicate key error")) {
      message = "An account with this email already exists";
    }

    res.json({ status: "error", message });
  }
});

// login
// this is the V1/user/login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: "error",
      message: "Please provide email and password",
    });
  }
  // getUserByEmail function is in User.model.js.  It finds a user by email
  const user = await getUserByEmail(email);

  // make sure user is verified before proceeding.  If not, send error message
  if(user.isVerified === false) {
    res.json({ status: "error", message: "This account has not been verified.  Please check your email for a validation email to verify your account." });
  }

  // hashedPassFromDb is the hashed password from the database.  If there is a user and user.id, hashedPassword = user.password.  otherwise hashedPassword = null
  const hashedPassFromDb = user && user._id ? user.password : null;

  if (!hashedPassFromDb)
    res.json({ status: "error", message: "Email or password is invalid." });

  // comparePassword function is in User.model.js.  It compares login password from user against hashed password from the database and returns true or false
  const result = await comparePassword(password, hashedPassFromDb);

  if (!result) {
    return res.json({
      status: "error",
      message: "Email or password is invalid.",
    });
  } else {
    const accessJWT = await createAccessJWT(user.email, `${user._id}`);

    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);

    // consider commenting out or removing the res.json for performance
    res.json({
      status: "success",
      message: "user logged in",
      accessJWT,
      refreshJWT,
    });
  }
});

// send reset password pin
// this is the V1/user/reset-password route
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  // if user is found, generate password reset pin
  if (user && user._id) {
    const setPin = await setPasswordResetPin(user.email);
    notifyPinEmail(user.email, setPin.pin);

    return res.json({
      status: "success",
      message: "Password reset email sent",
    });
  }
  res.json({ status: "error", message: "Email not found" });
});



// reset password
// this is the V1/user/reset-password route
router.patch("/reset-password", async (req, res) => {
  const { email, pin, newPassword } = req.body;
  const getPin = await getPinByEmailAndPin(email, pin);

  // check if pin has expired
  if (getPin?.email) {
    const dbDate = getPin.addedAt;
    // const expiresIn = process.env.EMAIL_RESET_PIN_EXPIRES_INTERVAL
    const expiresIn = 1;
    let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
    const today = new Date();
    if (today > expDate) {
      return res.json({
        status: "error",
        message: "Pin has expired",
      });
    }
    // encrypt new password
    const newHashedPassword = await hashPassword(newPassword);

    // update password
    const user = await updatePassword(email, newHashedPassword);

    // send new password notification
    if (user._id) {
      notifyPasswordReset(user.email);
      deletePin(email, pin);
      return res.json({ status: "success", message: "Password updated" });
    }
  }
  res.json({ status: "error", message: "Password reset failed" });
});

// logout and invalidate jwt
// this is the V1/user/logout route
router.delete("/logout", userAuthorization, async (req, res) => {
  // authorization is the jwt in the req header
  const { authorization } = req.headers;
  const _id = req.userId;

  // delete jwt from redis database
  deleteJWT(authorization);

  // delete refresh jwt from mongo database by setting the value to an empty string
  const result = await storeUserRefreshJWT(_id, "");

  res.json({ status: "success", message: "User logged out" });
});

module.exports = router;
