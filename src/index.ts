import express from 'express';
import {ApolloServer, ApolloServerExpressConfig, gql} from 'apollo-server-express';
import cors from 'cors';
import fs from 'fs';
import Query from "./resolvers/query";
import DB from "./db";
import User from "./resolvers/user";
import Hobby from "./resolvers/hobby";
import Post from "./resolvers/post";
import Comment from "./resolvers/comment";
import Mutation from "./resolvers/mutation";

const app = express();
app.use(cors());

const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema/schema.graphql'), 'utf8')}`;
const resolvers = {
    Query,
    Mutation,
    User,
    Hobby,
    Post,
    Comment
};
const config: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    context: {
        db: DB
    },
    uploads: false
};
const apolloServer = new ApolloServer(config);

apolloServer.applyMiddleware({app});

app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
})

module.exports = app;
