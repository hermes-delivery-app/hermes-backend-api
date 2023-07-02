import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { ICourier } from 'src/interface/courier.interface';

import { CreateCourierDto } from 'src/dto/create-courier.dto';
import { UpdateCourierDto } from 'src/dto/update-courier.dto';

@Injectable()
export class CouriersService {
  constructor(@InjectModel('Courier')
  private courierModel: Model<ICourier>) { }

  async create(createCourierDto: CreateCourierDto): Promise<ICourier> {
    const newCourier = await new this.courierModel(createCourierDto);
    return newCourier.save();
  }

  async update(id: string, updateCourierDto: UpdateCourierDto): Promise<ICourier> {
    const existing = await this.courierModel.findByIdAndUpdate(id, updateCourierDto, { new: true });
    if (!existing) {
      throw new NotFoundException(`Courier #${id} not found`);
    }
    return existing;
  }

  async getAll(): Promise<ICourier[]> {
    const data = await this.courierModel.find({
        "existance.isArchived": false
      });
    if (!data || data.length == 0) {
      throw new NotFoundException('Couriers data not found!');
    }
    return data;
  }

  async getArchived(): Promise<ICourier[]> {
    const data = await this.courierModel.find({
        "existance.isArchived": true
      });
    if (!data || data.length == 0) {
      throw new NotFoundException('Couriers data not found!');
    }
    return data;
  }

  async getOne(id: string): Promise<ICourier> {
    const existing = await this.courierModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Courier #${id} not found`);
    }
    return existing;
  }

  async softDelete(id: string): Promise<ICourier> {
    const deleted = await this.courierModel.updateOne({ "_id": id }, { "$set": { "existance.isArchived": true } });

    const existing = await this.courierModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Courier #${id} not found`);
    }
    return existing;
  }


}
