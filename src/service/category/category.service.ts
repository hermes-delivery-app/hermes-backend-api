import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { ICategory } from 'src/interface/category.interface';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';


@Injectable()
export class CategoryService {

  constructor(@InjectModel('Category') 
  private categoryModel: Model<ICategory>) { }

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
    const data = await this.categoryModel.find();
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


}