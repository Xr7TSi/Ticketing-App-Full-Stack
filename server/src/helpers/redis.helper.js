const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("connect", () => {
  console.log("Redis client is connected");
});

client.on("error", (error) => {
  console.log("Redis client connection error. " + error);
});

const setJWT = (key, value) => {
  try {
    client.set(key, value);
  } catch (error) {
    console.log("setJWT error " + error);
  }
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject("getJWT " + error);
    }
  });
};

const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log("deleteJWT " + error);
  }
};

module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
