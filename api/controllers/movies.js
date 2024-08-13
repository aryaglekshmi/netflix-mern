const movieService = require("../services/movies");

const newMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await movieService.newMovie(req.body);
            if (!movie) {
                return res.status(401).json({ success: false, data: null, message: 'Movie creation failed.' });
            }
            res.status(200).json({ success: true, data: movie, message: 'Movie created successfully.' });
        } catch (error) {
            res.status(500).json({ success: false, data: null, message: error.message });
        }
    } else {
        res.status(403).json({ success: false, data: null, message: 'Only admin can create a movie!' });
    }
};

const update = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await movieService.update(req.params.id, req.body);
            if (!movie) {
                return res.status(401).json({ success: false, data: null, message: 'Movie update failed.' });
            }
            res.status(200).json({ success: true, data: movie, message: 'Movie updated successfully.' });
        } catch (error) {
            res.status(500).json({ success: false, data: null, message: error.message });
        }
    } else {
        res.status(403).json({ success: false, data: null, message: 'Only admin can update a movie!' });
    }
};

const deleteMovie = async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).json({ success: false, data: null, message: 'Only admin can delete movies!' });
        return;
    }
    try {
        const response = await movieService.deleteMovie(req.params.id);
        if (!response) {
            return res.status(404).json({ success: false, data: null, message: 'Movie not found.' });
        }
        res.status(200).json({ success: true, data: null, message: 'Movie deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};

const getMovie = async (req, res) => {
    try {
        const movie = await movieService.getMovie(req.params.id);
        if (!movie) {
            return res.status(404).json({ success: false, data: null, message: 'Movie not found.' });
        }
        res.status(200).json({ success: true, data: movie, message: 'Movie fetched successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};

const getAllMovies = async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).json({ success: false, data: null, message: 'Only admin can fetch all movies!' });
        return;
    }
    try {
        const movies = await movieService.getAllMovies(req.query?.new);
        if (!movies) {
            return res.status(404).json({ success: false, data: null, message: 'Movies not found.' });
        }
        res.status(200).json({ success: true, data: movies, message: 'Movies fetched successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};

const getMovieStats = async (req, res) => {
    try {
        const data = await movieService.getMovieStats();
        if (!data) {
            return res.status(404).json({ success: false, data: null, message: 'Movie stats failed.' });
        }
        res.status(200).json({ success: true, data: data, message: 'Movie stats fetched successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};

const getRandomMovie = async (req, res) => {
    try {
        const data = await movieService.getRandomMovie(req.query?.type);
        if (!data) {
            return res.status(404).json({ success: false, data: null, message: 'Movie stats failed.' });
        }
        res.status(200).json({ success: true, data: data, message: 'Movie stats fetched successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
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
