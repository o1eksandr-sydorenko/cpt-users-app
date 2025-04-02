import 'reflect-metadata';
import { container, resolvers } from './configs';
import { runApolloServer } from '@o1eksandr-sydorenko/cpt-graphql-lib';

void runApolloServer(container, resolvers);
