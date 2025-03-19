import { Container } from 'inversify';
import { CoreServiceIdentifiers, UserServiceIdentifiers } from '../types';
import { UserService } from '../services';
import { UserResolver } from '../resolvers';
import { ExtendedPrismaClient, prismaClient } from './prisma.config';

const container = new Container();

container.bind<UserService>(UserServiceIdentifiers.Services.User).to(UserService);
container.bind<UserResolver>(UserResolver).toSelf();

// Bind prisma with container

container.bind<ExtendedPrismaClient>(CoreServiceIdentifiers.Clients.Prisma).toConstantValue(prismaClient);

export { container };
