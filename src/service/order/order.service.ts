import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { IOrder }       from 'src/interface/order.interface';
import { CartDocument } from 'src/schemas/cart.schema';
import { IShop }        from 'src/interface/shop.interface';

import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order')
        private orderModel: Model<IOrder>,

        @InjectModel('Cart')
        private cartModel: Model<CartDocument>,

        @InjectModel('Shop')
        private shopModel: Model<IShop>,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<IOrder> {
        const {cart_id, total} = createOrderDto;

        const cart = await this.cartModel.findById(cart_id).exec();
        if (!cart) {
          throw new NotFoundException(`Cart #${cart_id} not found`);
        }

        const shop = await this.shopModel.findById(cart.shop_id).exec();
        if (!shop) {
          throw new NotFoundException('Shop {shop_id} not found!');
        }

        const newOrder = await new this.orderModel(createOrderDto);

        newOrder.total  = cart.total + shop.deliveryCost;

        return newOrder.save();
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<IOrder> {
        const existing = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
        
        if (!existing) {
            throw new NotFoundException(`Order #${id} not found`);
        }
        return existing;
    }

    async getAll(): Promise<IOrder[]> {
        const data = await this.orderModel.find();
        if (!data || data.length == 0) {
            throw new NotFoundException('Orders data not found!');
        }
        return data;
    }

    async getOne(id: string): Promise<IOrder> {
        const existing = await this.orderModel.findById(id).exec();
        if (!existing) {
            throw new NotFoundException(`Order #${id} not found`);
        }
        return existing;
    }

}