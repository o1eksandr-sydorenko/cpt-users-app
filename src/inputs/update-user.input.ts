import { Field, InputType } from 'type-graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput implements Partial<CreateUserInput> {
  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;
}
