const userService = require("../services/user.service");

// create user
exports.createUser = async (req, res) => {
  try {
    let response = await userService.createUser(req.body);
    res.status(response.code).json(response);
  } catch (error) {
    let code = error.code ? error.code : 400;
    res.status(code).json({ code: code, message: error.message });
  }
};

//login user
exports.login = async (req, res) => {
  try {
    let response = await userService.login(req.body.email, req.body.password);
    res.status(response.code).json(response);
  } catch (error) {
    let code = error.code ? error.code : 400;
    res.status(code).json({ code: code, message: error.message });
  }
};
