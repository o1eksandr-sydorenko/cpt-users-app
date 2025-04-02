import { paginate } from '@o1eksandr-sydorenko/cpt-graphql-lib';
import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

export const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
  .$extends(
    createSoftDeleteExtension({
      models: {
        User: true,
      },
      defaultConfig: {
        field: 'deleted_at',
        createValue: (deleted) => {
          if (deleted) {
            return new Date();
          }

          return null;
        },
      },
    }),
  )
  .$extends({
    model: {
      user: {
        paginate,
      },
    },
  });

export type ExtendedPrismaClient = typeof prismaClient;
