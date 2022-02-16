const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (plainPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hash(plainPassword, saltRounds));
  });
};

const comparePassword = (password, hashedPassFromDb) => {
  return new Promise((resolve, reject) => {
    // bcrypr.compare compares the password sent from the user against the hashed password in the database
    bcrypt.compare(password, hashedPassFromDb, function (error, result) {
      if(error) reject(error);
      resolve(result)
    });
  });
};


module.exports = {
  hashPassword, comparePassword
};
