import Order from "../entity/order";
import RepositoryInterface from "./repository-interfeace";

export default interface OrderRepositoryInterface
    extends RepositoryInterface<Order> { }