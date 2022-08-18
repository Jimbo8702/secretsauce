const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    Users: async () => {
      return await User.find({});
    },
    User: async (parent, args) => {
      return await User.findById(args.id);
    },
    SingleUser: async (parents, args) => {
      return await User.findOne({ email: args.email, password: args.password });
    },
  },
};
