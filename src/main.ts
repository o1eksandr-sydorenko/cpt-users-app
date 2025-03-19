import 'reflect-metadata';
import { container, resolvers } from './configs';
import { runApolloServer } from '@cpt/graphql';

void runApolloServer(container, resolvers);
