import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderModel from "./order.model";

describe("Order Repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123"
            }]
        });
    });

    it("Should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(order).toStrictEqual(foundOrder);
    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("456ABC");
        }).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");
        const address1 = new Address("street 1", 1, "Zipcode 1", "City 1");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const customer2 = new Customer("321", "Customer 2");
        const address2 = new Address("street 2", 2, "Zipcode 2", "City 2");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 100);
        await productRepository.create(product1);

        const product2 = new Product("321", "Product 2", 200);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 1);
        const order1 = new Order("123", customer1.id, [orderItem1]);

        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 1);
        const order2 = new Order("321", customer2.id, [orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
    });

    it("Should update order", async () => {
        //test add order item to update
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 5);
        order.addOrderItem(orderItem2);

        await orderRepository.update(order);

        const foundOrder1 = await orderRepository.find(order.id);
        expect(foundOrder1).toStrictEqual(order);

        //test remove order item to update
        order.removeOrderItem(orderItem2);
        await orderRepository.update(order);
        const foundOrder2 = await orderRepository.find(order.id);
        expect(foundOrder2).toStrictEqual(order);

        //test change customer to update
        const customer2 = new Customer("333", "Customer 2");
        const address2 = new Address("street 2", 2, "Zipcode 2", "City 2");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        order.changeCustomer(customer2.id);
        await orderRepository.update(order);
        const foundOrder3 = await orderRepository.find(order.id);
        expect(foundOrder3).toStrictEqual(order);
    });
});