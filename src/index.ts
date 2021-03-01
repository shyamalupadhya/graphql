import express from 'express';
import {ApolloServer, ApolloServerExpressConfig, gql, PubSub} from 'apollo-server-express';
import cors from 'cors';
import fs from 'fs';
import Query from "./resolvers/query";
import DB from "./db";
import User from "./resolvers/user";
import Hobby from "./resolvers/hobby";
import Post from "./resolvers/post";
import Comment from "./resolvers/comment";
import Mutation from "./resolvers/mutation";
import Subscription from "./resolvers/subscription";
import {createServer} from "http";

const app = express();
app.use(cors());

const pubsub: PubSub = new PubSub();

const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema/schema.graphql'), 'utf8')}`;
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Hobby,
    Post,
    Comment
};
const config: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    context: {
        db: DB,
        pubsub: pubsub
    },
    uploads: false
};
const apolloServer = new ApolloServer(config);

apolloServer.applyMiddleware({app});

const httpServer = createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:4000 ${apolloServer.subscriptionsPath}`)
})

module.exports = app;
