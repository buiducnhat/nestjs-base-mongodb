import { ObjectId } from 'mongoose';

export class JwtPayload {
  userId: ObjectId;
  iat: number;
  exp: number;
}
