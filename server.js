const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");

const PORT = 3001;
const app = express();
const sequelize = require("./config/connection.js");

const httpServer = require("http").createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    credentials: false,
    origin: process.env.DOMAIN_FULL + ":" + process.env.PORT || "3001",
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
