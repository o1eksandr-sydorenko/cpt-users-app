import { ObjectType } from 'type-graphql';
import { User } from '../models';
import { PaginatedResponse } from '@o1eksandr-sydorenko/cpt-graphql-lib';

@ObjectType()
export class UserPaginatedResponse extends PaginatedResponse(User) {}
