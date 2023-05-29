import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model }                         from "mongoose";
import { InjectModel }                   from '@nestjs/mongoose';

//import { ICart }         from 'src/interface/cart.interface';
import { IShop }                      from 'src/interface/shop.interface';
import { IUser }                      from 'src/interface/user.interface';
import { IItem }                      from 'src/interface/item.interface';
import { CartDocument, ItemDocument } from 'src/schemas/cart.schema';

import { CreateCartDto, AddItemDto, RemoveItemDto}   from 'src/dto/create-cart.dto';

@Injectable()
export class CartService {

  constructor(
  @InjectModel('Cart')
  private cartModel: Model<CartDocument>,

  @InjectModel('User')
  private userModel: Model<IUser>,

  @InjectModel('Shop')
  private shopModel: Model<IShop>,

  @InjectModel('Item')
  private itemModel: Model<IItem>
  
  ) { }

  
  async create(createCartDto: CreateCartDto): Promise<CartDocument> {
    const {user_id, shop_id} = createCartDto;

    const user = await this.userModel.findById(user_id).exec();
    if (!user) {
      throw new NotFoundException('User {user_id} not found!');
    }

    const shop = await this.shopModel.findById(shop_id).exec();
    if (!shop) {
      throw new NotFoundException('Shop {shop_id} not found!');
    }

    const cart = await this.cartModel.findOne({user_id: user_id, shop_id: shop_id});
    if(cart){
      throw new HttpException('Cart for {user_id} and {shop_id} already exist  '+cart.id, HttpStatus.BAD_REQUEST);
    }

    const newCart = await new this.cartModel(createCartDto);
    return newCart.save();
  }

  // async getAll(): Promise<CartDocument[]> {
  //   const data = await this.cartModel.find();
  //   if (!data || data.length == 0) {
  //     throw new NotFoundException('Carts data not found!');
  //   }
  //   return data;
  // }

  async getAll(filter: string, id : string): Promise<CartDocument[]> {
    let data;
    switch(filter){
      case 'shop' : data = await this.cartModel.find({ shop_id: id });
      break;
      case 'user' : data = await this.cartModel.find({ user_id: id });
    }

    if (!data || data.length == 0) {
      throw new NotFoundException('Data not found!');
    }
    return data;
  }

  async getOne(id: string): Promise<CartDocument> {
    const existing = await this.cartModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
    return existing;
  }
  
  async addItem(id: string, addItemDto: AddItemDto): Promise<CartDocument> {
    let { item_id, ammount, price} = addItemDto;
    let total = ammount * price;

    const item = await this.itemModel.findById(item_id).exec();
    if(!item){
      throw new NotFoundException('Item {item_id} not found!');
    }

    const existing = await this.cartModel.findById(id);
    // update 
    if(existing){
       let index = existing.items.findIndex((item) => item.item_id == item_id);
     
      if (index > -1) {
        let item = existing.items[index];

        item.ammount = item.ammount + ammount;
        item.total = item.ammount * item.price;

        existing.items[index] = item;

        existing.total = 0;
        existing.items.forEach(item => {existing.total += item.ammount * item.price});
        return existing.save();
      } 
      else {
       existing.items.push({...addItemDto, total});

       existing.total = 0;
       existing.items.forEach(item => {existing.total += item.ammount * item.price});

        return existing.save();
      }

      if (!existing) {
        throw new NotFoundException('Cart data not found!');
      }
      return existing;
    }
   
     //  ammount = ammount + existing.items[itemIndex].ammount;
      
    //   let newCart = await this.cartModel.findOneAndUpdate(
    //   { "_id": id },
    //   {
    //     "$set":
    //     {
    //       "items":
    //       {
    //         "item_id": item_id,
    //         "ammount": ammount
    //       }
    //     }
    //   }
    //   ,
    // function(err,numAffected) {

    //     if (numAffected == 0) {}
    // }
  
    //   );
  }

  async removeItem(id: string, removeItemDto: RemoveItemDto): Promise<CartDocument> {
    let { item_id, ammount} = removeItemDto;
    const existing = await this.cartModel.findById(id);

    if(existing){
       let index = existing.items.findIndex((item) => item.item_id == item_id);
     
      if (index > -1) {
        let item = existing.items[index];

        if(item.ammount-ammount>0){
          item.ammount = item.ammount - ammount;
          item.total = item.ammount * item.price;
        }
        else{
          existing.items.splice(index,1);
        }

        existing.total = 0;
        existing.items.forEach(item => {existing.total += item.total});

        return existing.save();
      } 
    }
    else {
      throw new NotFoundException('Cart data not found!');
    }
    return existing;
  }

  async delete(id: string): Promise<CartDocument> {
    const deleted = await this.cartModel.findByIdAndDelete({_id: id.trim() });

    if (!deleted) throw new NotFoundException('Cart does not exist');
    return deleted;
  }


}