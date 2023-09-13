export class UserAlreadyExistError {
  static readonly message = 'User already exists';

  public readonly code = 'USER.ALREADY_EXISTS';
}
