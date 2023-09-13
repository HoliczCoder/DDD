import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AggregateRoot } from 'src/libs/ddd/aggregate-root.base';
import { Column, Entity } from 'typeorm';
import { UserCreatedDomainEvent } from './events/user-created.domain-event';
import { UserStatus } from './user.enum';

@Entity('user')
export class UserEntity extends AggregateRoot {
  @Column('nvarchar', {
    length: 255,
    name: 'Name',
    nullable: true,
  })
  @ApiProperty()
  /**
   * Tên hiển thị
   */
  name: string;

  @Column('nvarchar', {
    length: 64,
    name: 'LoginName',
    nullable: false,
    unique: true,
  })
  @ApiProperty()
  /**
   * Tên đăng nhập
   */
  loginName: string;

  @Column('nvarchar', {
    length: 64,
    nullable: false,
    name: 'Password',
  })
  /**
   * Mật khẩu đăng nhập
   */
  @Exclude()
  password: string;

  @Column('char', {
    length: 1,
    name: 'Status',
    nullable: false,
    default: UserStatus.ACTIVE,
  })
  @ApiProperty({
    enum: UserStatus,
    type: UserStatus,
  })
  /**Trạng thái user */
  status: UserStatus;

  @Column('bit', {
    nullable: false,
    default: false,
    name: 'IsAdmin',
  })
  @ApiProperty()
  isAdmin: boolean;

  @Column('nvarchar', {
    length: 255,
    nullable: false,
    unique: true,
    name: 'Email',
  })
  @ApiProperty()
  /**Địa chỉ email */
  email: string;

  static createUser(userModel: Partial<UserEntity>): UserEntity {
    const user = UserEntity.create<UserEntity>(userModel);
    user.addEvent(new UserCreatedDomainEvent(user));
    return user;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
