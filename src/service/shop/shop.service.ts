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
    return existing;
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

  // async createCart(id: string, addItemDto: AddItemDto, total : number): Promise<any> {
  //   const newCart = await this.cartModel.create({
  //     id,
  //     items: [{ ...addItemDto}],
  //     total
  //   });
  //   return newCart;
  // }

  // async getCart(id: string): Promise<any> {
  //   const existing = await this.cartModel.find({
  //     "shop_id": id
  //   });
  //   return existing;
  // }

  // async addItem(id: string, addItemDto: AddItemDto): Promise<any> {
  //   // const cart = await this.cartModel.findOneAndUpdate({"shop_id":id}, addItemDto, { new: true });

  //   const { item_id, ammount} = addItemDto;
  //   const total = (await this.itemsModel.findById({item_id})).price * ammount;

  //   const existing = await this.getCart(id);

  //   if (existing) {
  //     return await this.cartModel.findOneAndUpdate({"shop_id":id}, 
  //     { $set: { "items.ammount" : ammount}}, { new: true });
  //   }
  //   else {
  //     const newCart = await this.createCart(id, addItemDto, total);
  //     return newCart;
  //   }
  // }
 
  // private calculateTotalPrice(id: string, cart: CartDocument) {
  //   cart.total= 0;
  //   cart.items.forEach(item => {
  //     cart.total += (item.ammount * item.price);
  //   })
  // }

}
