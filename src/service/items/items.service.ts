import { Injectable, NotFoundException } from '@nestjs/common';
import { Model }                         from "mongoose";
import { InjectModel }                   from '@nestjs/mongoose';

import { IItem }         from 'src/interface/item.interface';
import { ICategory }     from 'src/interface/category.interface';

import { CreateItemDto } from 'src/dto/create-item.dto';
import { UpdateItemDto } from 'src/dto/update-item.dto';

@Injectable()
export class ItemsService {

  constructor(
  @InjectModel('Item')
  private itemModel: Model<IItem>,

  @InjectModel('Category')
  private categoryModel: Model<ICategory>,
  ) { }

  async create(createItemDto: CreateItemDto): Promise<IItem> {
    const newItem = await new this.itemModel(createItemDto);
    return newItem.save();
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<IItem> {
    const existing = await this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true });
    if (!existing) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return existing;
  }

  async getAll(): Promise<IItem[]> {
    const data = await this.itemModel.find({isActive: true});
    if (!data || data.length == 0) {
      throw new NotFoundException('Items data not found!');
    }
    return data;
  }

  async getArchived(): Promise<IItem[]> {
    const data = await this.itemModel.find({isActive: false});
    if (!data || data.length == 0) {
      throw new NotFoundException('Items data not found!');
    }
    return data;
  }

  async findByCategory(id: string): Promise<IItem[]> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category {category_id} not found!');
    }

    const data = await this.itemModel.find({category_id: id, isActive:true});
    
    if (!data || data.length == 0) {
      throw new NotFoundException('Items data not found!');
    }
    return data;
  }

  async getOne(id: string): Promise<IItem> {
    const existing = await this.itemModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return existing;
  }

  async softDelete(id: string): Promise<IItem> {
    const deleted = await this.itemModel.updateOne({ "_id": id }, { "$set": { "isActive": false } });

    const existing = await this.itemModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return existing;
  }

}