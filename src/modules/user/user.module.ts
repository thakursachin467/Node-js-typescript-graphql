import { GraphQLModule } from '@graphql-modules/core';

//add all the typedefs and resolvers here to the following 
export const userModule = new GraphQLModule({
  name: "User",
  typeDefs: [],
  resolvers: {},
  imports: [],
});
