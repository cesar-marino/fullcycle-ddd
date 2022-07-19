import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("Should create a customer", () => {
        const customer = CustomerFactory.create("César");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("César");
        expect(customer.address).toBeUndefined();
    });

    it("Should create a customer with an address", () => {
        const address = new Address("Street", 1137, "87130-000", "Ivatuba");
        const customer = CustomerFactory.createWithAddress("César", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("César");
        expect(customer.address).toBe(address);
    });
});