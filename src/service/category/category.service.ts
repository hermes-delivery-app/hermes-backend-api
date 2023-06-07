import { Injectable, NotFoundException } from '@nestjs/common';
import { Model }                         from "mongoose";
import { InjectModel }                   from '@nestjs/mongoose';

import { ICategory }         from 'src/interface/category.interface';
import { IShop }             from 'src/interface/shop.interface';

import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(
  @InjectModel('Category')
  private categoryModel: Model<ICategory>,

  @InjectModel('Shop')
  private shopModel: Model<IShop>
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const newCategory = await new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ICategory> {
    const existing = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    if (!existing) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return existing;
  }

  async getAll(): Promise<ICategory[]> {
    const data = await this.categoryModel.find({isActive: true});
    if (!data || data.length == 0) {
      throw new NotFoundException('Categories data not found!');
    }
    return data;
  }

  async getArchived(): Promise<ICategory[]> {
    const data = await this.categoryModel.find({isActive: false});
    if (!data || data.length == 0) {
      throw new NotFoundException('Categories data not found!');
    }
    return data;
  }

  async findByShop(id: string): Promise<ICategory[]> {
    const shop = await this.shopModel.findById(id).exec();
    if (!shop) {
      throw new NotFoundException('Shop {shop_id} not found!');
    }

    const data = await this.categoryModel.find({shop_id: id,isActive:true});

    if (!data || data.length == 0) {
      throw new NotFoundException('Categories data not found!');
    }
    return data;
  }

  async getOne(id: string): Promise<ICategory> {
    const existing = await this.categoryModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return existing;
  }

  async softDelete(id: string): Promise<ICategory> {
    const deleted = await this.categoryModel.updateOne({ "_id": id }, { "$set": { "isActive": false } });

    const children = await this.categoryModel.findOneAndUpdate({"parent_id":id}, { "$set": { "isActive": false } });

    const existing = await this.categoryModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return existing;
  }

}