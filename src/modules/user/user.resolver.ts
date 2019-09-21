
import { Resolver, Mutation, Arg, Int, Query, } from 'type-graphql';
import { User } from "./user.typeDefs"
import { UserProvider } from "./user.service"

@Resolver(of => User)
export class UserResolver {

  constructor(private userProvider: UserProvider) { }

  @Query(returns => [User])
  users(parent, args, context, info) {
    return this.userProvider.getUsers()
  }


}