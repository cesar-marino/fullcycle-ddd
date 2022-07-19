import RepositoryInterface from "../../@shared/repository/repository-interfeace";
import Order from "../entity/order";

export default interface OrderRepositoryInterface
    extends RepositoryInterface<Order> { }