const User = require("../models/user");
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

const update = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, {$set: user}, {new: true});
  if (updatedUser) return updatedUser;
  return null;
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const getUser = async(id) => {
  return await User.findById(id);
}

const getUserByEmail = async(email) => {
  return  await User.findOne({email});
}

const getAllUser = async(query) => {
  return await query ? User.find().sort({_id:-1}).limit(query) : User.find()
}

const getUserStats = async () => {

  const data = await User.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" }
      }
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 } // Sort by month in ascending order
    }
  ]);

  return data;
};

const getLikedMovies = (email) => {
  const user = getUserByEmail(email);
  if (!user) return user.likedMovies;
  return null;
};

const addToLikedMovies  = async (body) => {
  const { email, data } = body;
  const user = await User.findOne({email});
  console.log("🚀 ~ addToLikedMovies ~ user:", user)
  if(user) {
    const likedMovies = user.likedMovies || [];
    const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        return await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } 
  } else {
    return await User.create({
      email,
      likedMovies:[data]
    })
  }
  return null;
}

const removeFromLikedMovies =  async(body) => {
  const { email, movieId } = body;
  const user = getUserByEmail(email);
  if (user) {
    const movies = user.likedMovies;
    const movieIndex = movies.findIndex(({ id }) => id === movieId);
    if (!movieIndex) return null;
    movies.splice(movieIndex, 1);
    return await User.findByIdAndUpdate(
      user._id,
      {
        likedMovies: movies,
      },
      { new: true }
    );
  }
  return null;
}

module.exports = {
  createUser,
  login,
  update,
  deleteUser,
  getUser,
  getAllUser,
  getUserStats,
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies
};
