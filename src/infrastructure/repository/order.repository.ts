import { or, where } from "sequelize/types";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }]
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      { where: { id: entity.id } }
    );

    await OrderItemModel.destroy({ where: { order_id: entity.id } });

    entity.items.map(async (item) => {
      await OrderItemModel.create({
        id: item.id,
        order_id: entity.id,
        product_id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    });




    // await order.update(
    //   {
    //     customer_id: entity.customerId,
    //     total: entity.total(),
    //     items: entity.items.map((item) => ({
    //       id: item.id,
    //       name: item.name,
    //       price: item.name,
    //       product_id: item.productId,
    //       quantity: item.quantity,
    //     })),
    //   },
    //   { where: { id: entity.id } }
    // );

    // const order2 = await OrderModel.findOne({ where: { id: entity.id }, include: [{ model: OrderItemModel }] });
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }]
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map((item) => new OrderItem(
      item.id, item.name, item.price, item.product_id, item.quantity
    ));

    return new Order(id, orderModel.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const models = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    });

    const orders = models.map((model) => {
      let items = model.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
      return new Order(model.id, model.customer_id, items);
    });

    return orders;
  }
}