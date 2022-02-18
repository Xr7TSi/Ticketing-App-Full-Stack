import axios from "axios";

const rootURL = "https://jonathanrein.com/v1/";
const otpRequestURL = rootURL + "user/reset-password";


export const reqPasswordOtp = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(otpRequestURL, { email });
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
      console.log("Error at reqPasswordOtp / " + error);
    }
  });
};

export const updateUserPassword = passwordObj => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(otpRequestURL, passwordObj);
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
      console.log("Error at updateUserPassword / " + error);
    }
  });
};


