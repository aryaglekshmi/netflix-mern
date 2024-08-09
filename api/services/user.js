const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const general = require('../general')

const createUser = async (user) => {
  user.password = general.encryptPassword(user.password);
  const newUser = new User(user);
  return await newUser.save();
};


const login = async (loginUser) => {
  const user = await User.findOne({ email: loginUser.email });
  if (user) {
    const originalPwd = general.decryptPassword(user.password)
    if (loginUser.password !== originalPwd) return null;
    
    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn:'1h'});
    const { password, ...userInfo } = user.toObject(); // Convert to plain object to remove sensitive data
    return {...userInfo, accessToken};
  }
  return null;
};

const update = async (id) => {
  const user = await User.findOne({ email: loginUser.email });
  if (user) {
    const originalPwd = general.decryptPassword(user.password);
    if (loginUser.password !== originalPwd) return null;
    
    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn:'1h'});
    const { password, ...userInfo } = user.toObject(); // Convert to plain object to remove sensitive data
    return {...userInfo, accessToken};
  }
  return null;
};

module.exports = {
  createUser,
  login,
  update
};
