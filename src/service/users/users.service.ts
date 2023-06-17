import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { IUser } from 'src/interface/user.interface';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User')
  private userModel: Model<IUser>) { }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existing = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!existing) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existing;
  }

  async getAll(): Promise<IUser[]> {
    const data = await this.userModel.find({
      "isArchived": false
    });
    if (!data || data.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return data;
  }

  async getArchived(): Promise<IUser[]> {
    const data = await this.userModel.find({
      "isArchived": true
    });
    if (!data || data.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return data;
  }

  async getOne(id: string): Promise<IUser> {
    const existing = await this.userModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existing;
  }

  async getOneByPhoneNumber(phoneNumber: string): Promise<IUser> {
    const existing = await this.userModel.findOne({phoneNumber}).exec();
    // if (!existing) {
    //   throw new NotFoundException(`User with phone number ${phoneNumber} not found`);
    // }
    return existing;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<IUser> {
    const existing = await this.userModel.findOne({phoneNumber}).exec();
    if (!existing) {
      throw new NotFoundException(`User with phone number ${phoneNumber} not found`);
    }
    return existing;
  }

  async softDelete(id: string): Promise<IUser> {
    const deleted = await this.userModel.updateOne({ "_id": id }, { "$set": { "isArchived": true } });

    const existing = await this.userModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Shop #${id} not found`);
    }
    return existing;
  }


}
