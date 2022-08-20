// const { User } = require("../models");
// const { AuthenticationError } = require("apollo-server-express");
// const { signToken } = require("../utils/auth");
// const { v4: uuidv4 } = require("uuid");

import { User } from "../models/User.js";
import { AuthenticationError } from "apollo-server-errors";
import { signToken } from "../utils/auth.js";

const resolvers = {
  Query: {
    Users: async () => {
      return await User.findAll();
    },
    User: async (parent, args) => {
      return await User.findByPk(args.id);
    },
    SingleUser: async (parents, args) => {
      return await User.findOne({
        where: { email: args.email, password: args.password },
      });
    },
  },
  Mutation: {
    createUser: async (parents, { email, password }) => {
      const user = await User.create({
        email,
        password,
      });

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.validPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

export { resolvers };
