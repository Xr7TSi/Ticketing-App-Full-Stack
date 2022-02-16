import axios from "axios";


const rootURL = "http://localhost:5000/v1/";
const loginURL = rootURL + "user/login";
const userProfileURL = rootURL + "user";
const logoutURL = rootURL + "user/logout";
const newAccessJWT = rootURL + "tokens";
const userVerificationURL = userProfileURL + "/verify";


export const userRegistration = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(userProfileURL, formData);

      if (res.data.status === "success") {
       resolve(res.data);
      }

      resolve(res.data);
    } catch (error) {
      reject("Error at userRegistration / " + error.message);
    }
  });
};

export const userRegistrationVerification = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(userVerificationURL, formData);
      

      if (res.data.status === "success") {
       resolve(res.data);
      }

      resolve(res.data);
    } catch (error) {
      reject("Error at userRegistrationVerification / " + error);
    }
  });
};

export const userLogin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginURL, formData);

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
        localStorage.setItem(
          "crmSite",
          JSON.stringify({ refreshJWT: res.data.refreshJWT })
        );
      }

      resolve(res.data);
    } catch (error) {
      reject("Error at userLogin / " + error.message);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        reject("No accessJWT in sessionStorage");
      }

      const res = await axios.get(userProfileURL, {
        headers: {
          Authorization: accessJWT,
        },
      });
      resolve(res.data);

      resolve(res.data);
    } catch (error) {
      reject("Error at getUser / " + error.message);
    }
  });
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // crmSite is the refreshJWT in local storage, stored as an object
      const { refreshJWT } = JSON.parse(localStorage.getItem("crmSite"));

      if (!refreshJWT) {
        reject("Token not found!");
      }

      const res = await axios.get(newAccessJWT, {
        headers: {
          Authorization: refreshJWT,
        },
      });

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
      }

      resolve(true);
    } catch (error) {
      // remove crmSite value from local storage since it is invalid
      if (error.message === "Request failed with status code 403") {
        localStorage.removeItem("crmSite");
      }

      reject(false);
    }
  });
};

export const userLogout = async () => {
  try {
    await axios.delete(logoutURL, {
      headers: {
        Authorization: sessionStorage.getItem("accessJWT"),
      },
    });
  } catch (error) {
    console.log("Error at userLogout / " + error.message);
  }
};


