import 'reflect-metadata';
import { container, resolvers } from './config';
import { runApolloServer } from '@cpt/graphql';

void runApolloServer(container, resolvers);
