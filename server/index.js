const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/resolvers/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5500 });
  })
  .then((res) => {
    console.log(`Server runnig at ${res.url}`);
  });
