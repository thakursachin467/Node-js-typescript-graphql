//only code related to server will be written here 
import "reflect-metadata";
import Dash from "appmetrics-dash";
Dash.attach()
Dash.monitor()
import { ApolloServer, SchemaDirectiveVisitor } from "apollo-server-express";
import { captureException } from "@sentry/node";
import express, { Express } from "express";
import bodyParser = require("body-parser");
import { GraphQLSchema, GraphQLError } from "graphql";
import { AppModule } from "./modules/app.module";


let server: ApolloServer;
// Get GQL schema
const { schema, context, schemaDirectives } = AppModule;
// Add schema directives
SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives);

/**
 * refer to https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express for apollo express server
 */

server = new ApolloServer({
  context,
  schema,
  introspection: true,
  playground: true,
  formatError: (err): GraphQLError => {
    captureException(err.originalError);
    return err;
    // return Object.keys(err.originalError || {}).length > 0
    //   ? err.originalError
    //   : err;
  }
})

// Start Express Server
const app = express();
// Start Bodyparser
app.use(bodyParser.json());

server.applyMiddleware({ app });

// Start the server
app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(
    `       
      🎉  server running in ${process.env.NODE_ENV} mode
      🚀   Graphql Server ready at http://localhost:${process.env.PORT || 4000}${
    server.graphqlPath
    }
    📈   Monitor UI ready at http://localhost:${process.env.PORT || 4000}/appmetrics-dash
      `
  );
});
