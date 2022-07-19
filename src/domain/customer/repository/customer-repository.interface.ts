import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/repository/repository-interfeace";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> { }