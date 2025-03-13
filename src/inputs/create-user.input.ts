import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsUniqueEmail } from '../validators';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  @IsUniqueEmail()
  email: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;
}
