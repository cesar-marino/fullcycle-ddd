import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "César Marino");
const address = new Address("Rau Faria Lemos", 1137, "87130-000", "Ivatuba");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item2", 15, "p2", 3);
const order = new Order("1", "123", [item1, item2]);