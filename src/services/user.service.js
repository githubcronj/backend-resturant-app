const User = require("../models/user.model");


//create user
exports.createUser = async (userData) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        email: userData.email,
      });
      if (user) {
        resolve({
          code: 403,
          status: "FAILURE",
          message: "User Already Exists",
        });
      } else {
        user = await User(userData).save();
        const token = await user.generateAuthToken();

        resolve({ code: 200, status: "SUCCESS", user: user, token: token });
      }
    } catch (err) {
      reject({ code: 500, status: "FAILURE", message: err.message });
    }
  });
  return promise;
};

// login user
exports.login = async (email, password) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      const response = await User.findByCredentials(email, password);
      if (response && response._id) {
        const token = await response.generateAuthToken();
        resolve({ code: 200, status: "SUCCESS", user: response, token: token });
      } else {
        reject({ code: 401, status: "FAILURE", message: response.message });
      } 
    } catch (err) {
      reject({ code: 500, status: "FAILURE", message: err.message });
    }
  });
  return promise;
};
