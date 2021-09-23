import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find().select('-password').exec();
  }

  findWithEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findWithOmittedPassword(id: ObjectId) {
    return this.userModel.findById(id).select('-password').exec();
  }

  findById(id: ObjectId) {
    return this.userModel.findById(id).exec();
  }

  update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
