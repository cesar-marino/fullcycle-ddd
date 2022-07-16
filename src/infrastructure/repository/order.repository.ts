import { where } from "sequelize/types";
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

  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
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