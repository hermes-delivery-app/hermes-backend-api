import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel }                   from '@nestjs/mongoose';
import { Model }                         from 'mongoose';

import { CreateShopDto } from 'src/dto/create-shop.dto';
import { UpdateShopDto } from 'src/dto/update-shop.dto';
import { IShop }         from 'src/interface/shop.interface';

@Injectable()
export class ShopService {
  constructor(
  @InjectModel('Shop')
  private shopModel: Model<IShop>
  ) { }

  async create(createShopDto: CreateShopDto): Promise<IShop> {
    const newShop = await new this.shopModel(createShopDto);
    return newShop.save();
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<IShop> {
    const existing = await this.shopModel.findByIdAndUpdate(id, updateShopDto, { new: true });
    if (!existing) {
      throw new NotFoundException(`Shop #${id} not found`);
    }
    
    existing.rating.rate=this.recalculateRating(existing.rating.positives, existing.rating.negatives);

    return existing.save();
  }

  async getAll(): Promise<IShop[]> {
    const data = await this.shopModel.find({
      "existance.isArchived": false
    });
    if (!data || data.length == 0) {
      throw new NotFoundException('Shops data not found!');
    }
    return data;
  }

  async getArchived(): Promise<IShop[]> {
    const data = await this.shopModel.find({
      "existance.isArchived": true
    });
    if (!data || data.length == 0) {
      throw new NotFoundException('Shops data not found!');
    }
    return data;
  }

  async softDelete(id: string): Promise<IShop> {
    const deleted = await this.shopModel.updateOne({ "_id": id }, { "$set": { "existance.isArchived": true } });

    const existing = await this.shopModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Shop #${id} not found`);
    }
    return existing;
  }

  async rateShop(positive:boolean, id: string): Promise<IShop> {
    const existing = await this.shopModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Shop #${id} not found`);
    }

    if(positive){
      existing.rating.positives+=1;
    }
    else{
      existing.rating.negatives+=1;
    }

    existing.rating.rate=this.recalculateRating(existing.rating.positives, existing.rating.negatives);

    return existing.save();
  }

   recalculateRating (positives:number, negatives:number){
    return Math.round(100*positives/(positives+negatives));
  }

}
