import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { container } from '../config';
import { CoreServiceIdentifiers } from '../types';

@ValidatorConstraint({ async: true })
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = container.get<PrismaClient>(CoreServiceIdentifiers.Clients.Prisma);
  }

  async validate(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({ where: { email }, select: { id: true } });
    return !user;
  }

  defaultMessage() {
    return 'Email ($value) already exists.';
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailConstraint,
    });
  };
}
