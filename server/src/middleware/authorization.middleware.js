const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");

// this function does the following:
// -gets the access JWT from the incoming request header and stores it as "authorization"
// -runs the verifyAccessJWT function which verifies the JWT on the incoming header and saves it under "decoded"
// -"decoded" contains the user email, iat and exp properties
const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  
  const decoded = await verifyAccessJWT(authorization);

  if (decoded.email) {
    const userId = await getJWT(authorization);
    if (!userId) {
      return res.status(403).json({ message: "Forbidden at userAuthorization" });
    }

    req.userId = userId;

    return next();
  }

  // if decoded.email is not present, delete the JWT from redis
  deleteJWT(authorization);
  return res.status(403).json({ message: "Forbidden at userAuthorization" });
};

module.exports = {
  userAuthorization,
};
