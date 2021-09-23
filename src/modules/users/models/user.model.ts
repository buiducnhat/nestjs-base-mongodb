import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Role } from './role.model';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatar: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
