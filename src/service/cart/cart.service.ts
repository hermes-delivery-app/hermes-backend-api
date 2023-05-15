import { Injectable, NotFoundException } from '@nestjs/common';
import { Model }                         from "mongoose";
import { InjectModel }                   from '@nestjs/mongoose';

import { ICart }         from 'src/interface/cart.interface';

@Injectable()
export class CartService {

  constructor(@InjectModel('Cart')
  private cartModel: Model<ICart>) { }
  
  async getAll(): Promise<ICart[]> {
    const data = await this.cartModel.find();
    if (!data || data.length == 0) {
      throw new NotFoundException('Carts data not found!');
    }
    return data;
  }

}