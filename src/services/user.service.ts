import { inject, injectable } from 'inversify';
import { CoreServiceIdentifiers } from '../types';
import { User } from '../models';
import { CreateUserInput, UpdateUserInput } from '../inputs';
import { ExtendedPrismaClient } from '../configs';
import { SourceService } from '@cpt/graphql';

@injectable()
export class UserService extends SourceService<ExtendedPrismaClient> {
  constructor(@inject(CoreServiceIdentifiers.Clients.Prisma) protected readonly prismaClient: ExtendedPrismaClient) {
    super(prismaClient, 'user');
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
