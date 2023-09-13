import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from 'src/user/domain/user.enum';
export class CreateUserRequestDto {
  @ApiProperty({
    example: 'Minh',
    description: 'Tên người dùng',
  })
  @IsNotEmpty({
    message: 'Tên đăng nhập không được để trống',
  })
  @Length(4, 255, {
    message: 'Tên từ 4-50 ký tự',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Minh',
    description: 'Tên đăng nhập',
  })
  @IsNotEmpty({
    message: 'Tên đăng nhập không được để trống',
  })
  @Length(4, 32, {
    message: 'Tên đăng nhập từ 4-32 ký tự',
  })
  readonly loginName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Password không được để trống',
  })
  readonly password: string;

  @ApiProperty({
    example: 'minh@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  readonly isAdmin: boolean = true;

  readonly status: UserStatus = UserStatus.ACTIVE;
}
