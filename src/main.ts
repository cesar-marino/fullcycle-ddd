import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "César Marino");
const address = new Address("Rau Faria Lemos", 1137, "87130-000", "Ivatuba");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item2", 15, "p2", 3);
const order = new Order("1", "123", [item1, item2]);