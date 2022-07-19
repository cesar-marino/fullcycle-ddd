import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repository-interfeace";

export default interface ProductRepositoryInterface
    extends RepositoryInterface<Product> { }