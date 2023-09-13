import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateId } from 'src/libs/ddd/entity.base';
import { UserAlreadyExistError } from 'src/user/domain/user.error';
import { UserEntity } from 'src/user/domain/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateId, UserAlreadyExistError>> {
    const user = UserEntity.createUser(command);
    try {
      let entity: UserEntity;
      await this.userRepo.manager.transaction(async () => {
        entity = await this.userRepo.save(user);
        return Ok(entity.id as AggregateId);
      });
      return Ok(entity.id);
    } catch (error) {
      if (error) {
        throw error;
      }
    }
  }
}
