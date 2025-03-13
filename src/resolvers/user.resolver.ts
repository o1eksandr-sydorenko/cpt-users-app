import { inject, injectable } from 'inversify';
import { Arg, Info, Int, Mutation, Query, Resolver } from 'type-graphql';
import { UserServiceIdentifiers } from '../types';
import { UserService } from '../services';
import { User } from '../models';
import { CreateUserInput, UpdateUserInput } from '../inputs';
import { UserPaginatedResponse } from '../responses';
import { GraphQLResolveInfo } from 'graphql';
import { PaginateInput } from '@cpt/graphql';

@injectable()
@Resolver(User)
export class UserResolver {
  constructor(@inject(UserServiceIdentifiers.Services.User) protected readonly userService: UserService) {}

  @Query(() => UserPaginatedResponse)
  async getUsers(
    @Info() info: GraphQLResolveInfo,
    @Arg('paginate', () => PaginateInput, { nullable: true }) paginate?: PaginateInput,
  ): Promise<UserPaginatedResponse> {
    return this.userService.getPaginatedItems(info, paginate);
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
