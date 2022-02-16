const express = require("express");
const router = express.Router();
const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt.helper");
const { getUserByEmail } = require("../models/user/User.model");

// return refresh jwt
router.get("/", async (req, res, next) => {
  // authorization property is in incoming request header, it contains the refresh jwt
  const { authorization } = req.headers;

  //makes sure token is valid.  if this works, decoded should = email, iat and exp
  const decoded = await verifyRefreshJWT(authorization);

  //   id decoded.email is present, token is valid
  if (decoded.email) {
    const userProf = await getUserByEmail(decoded.email);
    if (userProf._id) {
      // gets the date when users refreshJWT token was created from mongoDb and assigns to tokenExp
      let tokenExp = userProf.refreshJWT.addedAt;

      const dBRefreshToken = userProf.refreshJWT.token;
      
      // adds number of days from .env file to tokenExp.  + + is needed to add the env variable.  A single + comes up with an incorrect date
      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
      );

      const today = new Date();

      if (dBRefreshToken !== authorization && tokenExp < today) {
          return res.status(403).json({ message: "Forbidden" });
      }

      // if tokenExp less than today, token is expired
      if (tokenExp < today) {
        return res
          .status(403)
          .json({ message: "Forbidden at createAccessJWT.  Token is expired" });
      }
      const accessJWT = await createAccessJWT(
        decoded.email,
        // redis db is expecting strings, so userProf._id parameter is converted to a string with toString()
        userProf._id.toString()
      );

      return res.json({ status: "success ", accessJWT });
    }
  };
  res.status(403).json({
    message:
      "Forbidden at createAccessJWT.  Token is expired.  User is unauthorized, preventing token refresh.",
  });

  next();
});

module.exports = router;
