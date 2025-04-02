import { FilterInput, GetItemsArgs, NumberFilter, SortInput, StringFilter } from '@o1eksandr-sydorenko/cpt-graphql-lib';
import { ArgsType, Field, InputType } from 'type-graphql';
import { User } from '../models';

@InputType()
class BaseUserFilterInput {
  @Field(() => NumberFilter, { nullable: true })
  id?: NumberFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  first_name: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  last_name: StringFilter;
}

@InputType()
export class FilterUserInput extends FilterInput(BaseUserFilterInput) {}

@InputType()
export class UserSortInput extends SortInput(User, ['id']) {}

@ArgsType()
export class GetUsersArgs extends GetItemsArgs(FilterUserInput, UserSortInput) {}
