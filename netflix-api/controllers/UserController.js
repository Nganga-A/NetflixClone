const User = require("../models/UserModel");

// Get the liked movies of a user with the specified email
module.exports.getLikedMovies = async (req, res) => {
try {
    const { email } = req.params; // Extract email from request parameters
    const user = await User.findOne({ email }); // Find user in the database
    if (user) {
    return res.json({ msg: "success", movies: user.likedMovies }); // Respond with success and liked movies
    } else {
    return res.json({ msg: "User with given email not found." }); // User not found
    }
} catch (error) {
    return res.json({ msg: "Error fetching movies." }); // Handle errors during the process
}
};

// Add a movie to the user's liked movies
module.exports.addToLikedMovies = async (req, res) => {
try {
    const { email, data } = req.body; // Extract email and movie data from request body
    const user = await User.findOne({ email }); // Find user in the database
    if (user) {
    const { likedMovies } = user;
    const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

    if (!movieAlreadyLiked) {
        // If the movie is not already liked, add it to the liked movies
        await User.findByIdAndUpdate(
        user._id,
        {
            likedMovies: [...user.likedMovies, data],
        },
        { new: true }
        );
    } else {
        return res.json({ msg: "Movie already added to the liked list." });
    }
    } else {
    // If user not found, create a new user with the provided email and add the movie to the liked list
    await User.create({ email, likedMovies: [data] });
    }

    return res.json({ msg: "Movie successfully added to liked list." }); // Respond with success
} catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" }); // Handle errors during the process
}
};

// Remove a movie from the user's liked movies
module.exports.removeFromLikedMovies = async (req, res) => {
try {
    const { email, movieId } = req.body; // Extract email and movie ID from request body
    const user = await User.findOne({ email }); // Find user in the database

    if (user) {
    const movies = user.likedMovies;
    const movieIndex = movies.findIndex(({ id }) => id === movieId);

    if (movieIndex !== -1) {
        // If the movie is found in the liked list, remove it
        movies.splice(movieIndex, 1);

        await User.findByIdAndUpdate(
        user._id,
        {
            likedMovies: movies,
        },
        { new: true }
        );

        return res.json({ msg: "Movie successfully removed.", movies }); // Respond with success and the updated liked movies
    } else {
        return res.status(400).send({ msg: "Movie not found." }); // Movie not found in the liked list
    }
    } else {
    return res.json({ msg: "User with given email not found." }); // User not found
    }
} catch (error) {
    return res.json({ msg: "Error removing movie from the liked list" }); // Handle errors during the process
}
};
