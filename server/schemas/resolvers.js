const axios = require('axios');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {

      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('games')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    getGame: async (parent, args) => {
      const response = await axios.get(`https://api.rawg.io/api/games?search=${args.searchInput}&key=${process.env.RAWG_API_KEY}`)

      const gameData = await response.data.results.map((game) => (
        {
          gameId: game.slug,
          title: game.name,
          image: game.background_image || 'https://www.spearsandcorealestate.com/wp-content/themes/spears/images/no-image.png',
          releaseDate: game.released || 'N/A',
          rating: game.rating ? game.rating.toString() : 'N/A',
        }
      ));

      return gameData
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    updateUser: async (parent, { _id, username }) => {
      const user = await User.findOneAndUpdate(
        { _id },
        { $set: { username } },
        {
          runValidators: true,
          new: true
        }
      );

      return user;
    },
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveGame: async (parent, args, context) => {
      console.log('Game Saved!')
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedGames: args.input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeGame: async (parent, args, context) => {
      console.log('Game Removed!')

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: { gameId: args.gameId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
