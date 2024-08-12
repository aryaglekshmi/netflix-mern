// controllers/userController.js
const userService = require("../services/user");
const general = require('../general');

const registerUser = async (req, res) => {
  try {
    // const { username, email, password } = req.body;
    const user = await userService.createUser(req.body);
    res.status(200).json({ success: true, data: user, message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, data: null, message: 'Email or Password is incorrect.' });
    }
    res.status(200).json({ success: true, data: user, message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const update = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = general.encryptPassword(req.body.password);
    }
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) {
        return res.status(401).json({ success: false, data: null, message: 'User update failed.' });
      }
      res.status(200).json({ success: true, data: user, message: 'User updated successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, data: null, message: error.message });
    }
  } else {
    res.status(403).json({ success: false, data: null, message: 'You can only update your account!' });
  }
};

const deleteUser = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ success: false, data: null, message: 'Only admin can delete accounts!' });
    return;
  }
  try {
    const response = await userService.deleteUser(req.params.id);
    if (!response) {
      return res.status(404).json({ success: false, data: null, message: 'User not found.' });
    }    
    res.status(200).json({ success: true, data: null, message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'User not found.' });
    }    
    res.status(200).json({ success: true, data: user, message: 'User fetched successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const getAllUser = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ success: false, data: null, message: 'Only admin can fetch all accounts!' });
    return;
  }
  try {
    const users = await userService.getAllUser(req.query?.new);
    if (!users) {
      return res.status(404).json({ success: false, data: null, message: 'Users not found.' });
    }    
    res.status(200).json({ success: true, data: users, message: 'Users fetched successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const getUserStats  = async (req, res)  => {
  try {
    const data = await userService.getUserStats();
    if (!data) {
      return res.status(404).json({ success: false, data: null, message: 'user stats failed.' });
    }    
    res.status(200).json({ success: true, data: data, message: 'User stats successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  update,
  deleteUser,
  getUser,
  getAllUser,
  getUserStats
};
