import { DomainEvent } from 'src/libs/ddd/domain-event.base';
import { UserStatus } from '../user.enum';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly name: string;

  readonly loginName: string;

  readonly password: string;

  readonly email: string;

  readonly status: UserStatus;

  readonly isAdmin: boolean;

  constructor(props: UserCreatedDomainEvent) {
    super();
    this.email = props.email;
    this.loginName = props.loginName;
    this.password = props.password;
    this.status = props.status;
    this.isAdmin = props.isAdmin;
  }
}
