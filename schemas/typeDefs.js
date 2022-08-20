// const { gql } = require("apollo-server-express");
import { gql } from "apollo-server-express";
const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    Users: [User]
    User(id: ID!): User
    SingleUser(email: String!, password: String!): User
  }

  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export { typeDefs };
