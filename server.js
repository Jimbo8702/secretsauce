import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import { typeDefs, resolvers } from "./schemas/index.js";

import { sequelize } from "./config/connection.js";
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      credentials: false,
      origin: process.env.DOMAIN_FULL + ":" + process.env.PORT || "3001",
    },
  });

  httpServer.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
sequelize.sync({ force: true }).then(async () => {
  startApolloServer(typeDefs, resolvers);
});
