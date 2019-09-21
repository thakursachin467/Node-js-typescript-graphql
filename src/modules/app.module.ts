import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from "./user/user.module";


//whenere a new module is added don't forget to add those modules here.
/**
 * to see a better example go to https://github.com/Urigo/graphql-modules/blob/master/examples/apollo-modules
 */
export const AppModule = new GraphQLModule({
  name: "App",
  imports: [UserModule]
});