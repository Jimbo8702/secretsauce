const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    phoneId: String
    email: String
    password: String
  }
  type Query {
    Users: [User]
    User(id: ID!): User
    SingleUser(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
