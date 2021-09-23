import { ObjectId } from 'mongoose';

import { Role } from '@modules/users/models/role.model';

export class UserInfoDto {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: Role;
}
