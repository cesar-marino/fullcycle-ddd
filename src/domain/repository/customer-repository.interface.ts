import Customer from "../entity/customer";
import RepositoryInterface from "./repository-interfeace";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> { }