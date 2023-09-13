import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { DeleteUserHttpController } from './commands/delete-user/delete-user.http.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { CreateUserService } from './commands/create-user/create-user.service';

const httpControllers = [CreateUserHttpController, DeleteUserHttpController];

const messageControllers = [];

const graphlResolvers = [];

const cliControllers = [];

const commandHandlers = [CreateUserService];

const queryHandlers = [];

const mappers = [];

const repositories = [];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    ...cliControllers,
    ...graphlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
    ...repositories,
  ],
})
export class UserModule {}
