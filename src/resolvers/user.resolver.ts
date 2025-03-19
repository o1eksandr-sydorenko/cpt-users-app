import { inject, injectable } from 'inversify';
import { Arg, Args, Info, Int, Mutation, Query, Resolver } from 'type-graphql';
import { UserServiceIdentifiers } from '../types';
import { UserService } from '../services';
import { User } from '../models';
import { CreateUserInput, GetUsersArgs, UpdateUserInput } from '../inputs';
import { UserPaginatedResponse } from '../responses';
import { GraphQLResolveInfo } from 'graphql';

@injectable()
@Resolver(User)
export class UserResolver {
  constructor(@inject(UserServiceIdentifiers.Services.User) protected readonly userService: UserService) {}

  @Query(() => UserPaginatedResponse)
  async getUsers(@Info() info: GraphQLResolveInfo, @Args(() => GetUsersArgs) args: GetUsersArgs): Promise<UserPaginatedResponse> {
    return this.userService.getPaginatedItems(info, args);
  }

  @Mutation(() => User)
  async createUser(@Arg('input', () => CreateUserInput) input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(@Arg('id', () => Int) id: number, @Arg('input', () => UpdateUserInput) input: UpdateUserInput): Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id', () => Int) id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
