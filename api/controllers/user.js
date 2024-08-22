// controllers/userController.js
const userService = require("../services/user");
const general = require('../general');

const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).json({ success: true, data: user, message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Registration failed: ${error.message}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, data: null, message: 'Invalid email or password.' });
    }
    res.status(200).json({ success: true, data: user, message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Login failed: ${error.message}` });
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
        return res.status(404).json({ success: false, data: null, message: 'User not found for update.' });
      }
      res.status(200).json({ success: true, data: user, message: 'User updated successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, data: null, message: `Update failed: ${error.message}` });
    }
  } else {
    res.status(403).json({ success: false, data: null, message: 'You are not authorized to update this account.' });
  }
};

const deleteUser = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ success: false, data: null, message: 'Only administrators can delete accounts.' });
    return;
  }
  try {
    const response = await userService.deleteUser(req.params.id);
    if (!response) {
      return res.status(404).json({ success: false, data: null, message: 'User not found for deletion.' });
    }    
    res.status(200).json({ success: true, data: null, message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Deletion failed: ${error.message}` });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'User not found.' });
    }    
    res.status(200).json({ success: true, data: user, message: 'User details retrieved successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Failed to retrieve user: ${error.message}` });
  }
};

const getAllUser = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ success: false, data: null, message: 'Only administrators can retrieve all users.' });
    return;
  }
  try {
    const users = await userService.getAllUser(req.query?.new);
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, data: null, message: 'No users found.' });
    }    
    res.status(200).json({ success: true, data: users, message: 'All users retrieved successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Failed to retrieve users: ${error.message}` });
  }
};

const getUserStats  = async (req, res)  => {
  try {
    const data = await userService.getUserStats();
    if (!data) {
      return res.status(404).json({ success: false, data: null, message: 'User statistics not found.' });
    }    
    res.status(200).json({ success: true, data: data, message: 'User statistics retrieved successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Failed to retrieve user statistics: ${error.message}` });
  }
}

const getLikedMovies  = async (req, res)  => {
  try {
    const data = await userService.getLikedMovies(req.email);
    if (!data) {
      return res.status(404).json({ success: false, data: null, message: 'No liked movies found.' });
    }    
    res.status(200).json({ success: true, data: data, message: 'Liked movies retrieved successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Failed to retrieve liked movies: ${error.message}` });
  }
}

const addToLikedMovies  = async (req, res)  => {
  try {
    const data = await userService.addToLikedMovies(req.body);
    if (!data) {
      return res.status(404).json({ success: false, data: null, message: 'Failed to add movie to liked list.' });
    }    
    res.status(200).json({ success: true, data: data, message: 'Movie added to liked list successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Failed to add movie to liked list: ${error.message}` });
  }
}

const removeFromLikedMovies  = async (req, res)  => {
  try {
    const data = await userService.removeFromLikedMovies();
    if (!data) {
      return res.status(404).json({ success: false, data: null, message: 'Failed to remove movie from liked list.' });
    }    
    res.status(200).json({ success: true, data: data, message: 'Movie removed from liked list successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: `Failed to remove movie from liked list: ${error.message}` });
  }
}

module.exports = {
  registerUser,
  loginUser,
  update,
  deleteUser,
  getUser,
  getAllUser,
  getUserStats,
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies
};
