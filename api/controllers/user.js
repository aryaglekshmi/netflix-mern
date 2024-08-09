// controllers/userController.js
const userService = require("../services/user");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.createUser({ username, email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async(req,res) => {
  try{
    const { email, password} = req.body;
    const user = await userService.login({email,password});
    !user && res.status(401).json("Email or Password not found");
    res.status(200).json(user);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const update = async(req,res) => {
  try{
    const user = await userService.update(req.id);
    !user && res.status(401).json("Email or Password not found");
    res.status(200).json(user);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  update
};
