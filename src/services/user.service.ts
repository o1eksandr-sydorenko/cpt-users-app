import { inject, injectable } from 'inversify';
import { CoreServiceIdentifiers } from '../types';
import { User } from '../models';
import { CreateUserInput, UpdateUserInput } from '../inputs';
import { ExtendedPrismaClient } from '../config';
import { UserPaginatedResponse } from '../responses';
import { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';
import { transformGraphQLFields } from '../utils';
import { defaultPaginateLimit, defaultPaginatePage, GraphQlSourceService, PaginateInput } from '@cpt/graphql';

@injectable()
export class UserService extends GraphQlSourceService {
  constructor(@inject(CoreServiceIdentifiers.Clients.Prisma) protected readonly prismaClient: ExtendedPrismaClient) {
    super();
  }

  async getPaginatedItems(info: GraphQLResolveInfo, paginate?: PaginateInput): Promise<UserPaginatedResponse> {
    const [items, meta] = await this.prismaClient.user
      .paginate({
        select: transformGraphQLFields(graphqlFields(info)['items']),
      })
      .withPages({
        limit: paginate?.limit || defaultPaginateLimit,
        page: paginate?.page || defaultPaginatePage,
      });

    return {
      items: items as User[],
      pagination: this.createPaginateModel(meta),
    };
  }

  async create({ email, first_name, last_name }: CreateUserInput): Promise<User> {
    return this.prismaClient.user.create({
      data: {
        email,
        first_name,
        last_name,
      },
    });
  }

  async update(id: number, { first_name, last_name }: UpdateUserInput): Promise<User> {
    return this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        first_name,
        last_name,
      },
    });
  }

  async delete(id: number): Promise<User> {
    const user = await this.prismaClient.user.findFirst({ where: { id } });

    if (!user) {
      throw new Error('Resource not found');
    }

    return this.prismaClient.user.delete({ where: { id } });
  }
}
