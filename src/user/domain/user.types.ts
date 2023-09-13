import { UserEntity } from './user.entity';

export type CreateUserModel = Omit<
  UserEntity,
  'id' | 'createAt' | 'updatedAt' | 'deletedAt'
>;
