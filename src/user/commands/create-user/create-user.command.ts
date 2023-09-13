import { Command, CommandProps } from 'src/libs/ddd/command.base';
import { UserStatus } from 'src/user/domain/user.enum';

export class CreateUserCommand extends Command {
  readonly name: string;

  readonly loginName: string;

  readonly password: string;

  readonly status: UserStatus;

  readonly isAdmin: boolean;

  readonly email: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);

    this.email = props.email;
    this.loginName = props.loginName;
    this.password = props.password;
    this.status = props.status;
    this.isAdmin = props.isAdmin;
    this.email = props.email;
  }
}
