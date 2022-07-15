import Address from "./address";
import Customer from "./customer";

describe("Customer unit test", () => {
    it("Should throw error when ID is empty", () => {
        expect(() => {
            let customer = new Customer("", "César Marino");
        }).toThrowError("ID is required");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("Should change name", () => {
        const customer = new Customer("123", "César Marino");

        customer.changeName("João");

        expect(customer.name).toBe("João")
    });

    it("Should activate customer", () => {
        const customer = new Customer("1", "César Marino");
        const address = new Address("Street 1", 123, "87130-000", "Ivatuba");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("Should deactivate customer", () => {
        const customer = new Customer("1", "César Marino");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("Should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "César Marino");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("Should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});