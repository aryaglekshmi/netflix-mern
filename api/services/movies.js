const Movie = require("../models/movie");

const newMovie = async (movie) => {
  const newMovie = new Movie(movie);
  return await newMovie.save();
};

const update = async (id, movie) => {
  const updatedMovie = await Movie.findByIdAndUpdate(id, { $set: movie }, { new: true });
  if (updatedMovie) return updatedMovie;
  return null;
};

const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

const getMovie = async (id) => {
  return await Movie.findById(id);
};

const getAllMovies = async (query) => {
  return await query ? Movie.find().sort({ _id: -1 }).limit(query) : (await Movie.find()).reverse();
};

const getMovieStats = async () => {
  const data = await Movie.aggregate([
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

const getRandomMovie = async (type) => {
  const isSeries = type?.toLowerCase() === "series";
  return await Movie.aggregate([
    { $match: { isSeries } },
    { $sample: { size: 1 } },
  ]);
};

module.exports = {
  newMovie,
  update,
  deleteMovie,
  getMovie,
  getAllMovies,
  getMovieStats,
  getRandomMovie
};
