const { ResetPinSchema } = require("./resetPin.schema");

const setPasswordResetPin = (email) => {
  // randomPin range starts at 100000 to avoid having numbers with less than 6 digits
  const randomPin = Math.floor(Math.random() * 999999) + 100000;

  const resetObj = {
    email,
    pin: randomPin,
  };

  return new Promise((resolve, reject) => {
    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getPinByEmailAndPin = (email, pin) => {
  return new Promise((resolve, reject) => {
    try {
      ResetPinSchema.findOne({ email, pin }, (error, data) => {
        if (error) {
          console.log("Error at getPinByEmailAndPin / " + error);
          resolve(false);
        }

        resolve(data);
      });
    } catch (error) {
      reject(error);
      console.log("Error at getPinByEmailAndPin catch block / " + error);
    }
  });
};

const deletePin = (email, pin) => {
  try {
    ResetPinSchema.findOneAndDelete({ email, pin }, (error) => {
      if (error) {
        console.log("Error at deletePin / " + error);
      }
    });
  } catch (error) {
    console.log("Error at deletePin catch block / " + error);
  }
};

module.exports = {
  setPasswordResetPin,
  getPinByEmailAndPin,
  deletePin,
};
