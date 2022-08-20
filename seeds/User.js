const { User } = require("../models");

const userData = [
  {
    username: "James Sgarella",
    email: "James@email.com",
    password: "moomoo",
  },
  {
    username: "John doe",
    email: " john@email.com",
    password: "moomoo",
  },
  {
    username: "Smith rose",
    email: "smith@email.com",
    password: "moomoo",
  },
  {
    username: "Jose bull",
    email: "jose@email.com",
    password: "moomoo",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
