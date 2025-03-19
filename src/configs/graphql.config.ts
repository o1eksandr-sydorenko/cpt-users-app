import { NonEmptyArray } from 'type-graphql';
import { UserResolver } from '../resolvers';

export const resolvers: NonEmptyArray<Function> = [UserResolver];
