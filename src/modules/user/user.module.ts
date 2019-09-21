import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { User } from "./user.typeDefs";
import { UserResolver } from "./user.resolver";

import { UserProvider } from "./user.service";
//add all the typedefs and resolvers here to the following 

const resolvers = [
  UserResolver
];
export const UserModule: any = new GraphQLModule({
  name: "User",
  providers: [
    UserProvider,
    ...resolvers
  ],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      container: ({ context }) => UserModule.injector.getSessionInjector(context),
    })
  ]
});
