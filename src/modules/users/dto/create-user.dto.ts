import { Role } from '@modules/users/models/role.model';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  phone?: string;
  role?: Role;
  password: string;
}
