import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {
    it("Should throw error when ID is empty", () => {
        expect(() => {
            new Order("", "", []);
        }).toThrowError("ID is required");
    });

    it("Should throw error when customerId is empty", () => {
        expect(() => {
            new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("Should throw error when items is empty", () => {
        expect(() => {
            new Order("123", "1", []);
        }).toThrowError("Items are required");
    });

    it("Should calculate total", () => {
        const item = new OrderItem("1", "item1", 100, "p1", 2);
        const item2 = new OrderItem("2", "item2", 200, "p2", 2);
        const order = new Order("1", "1", [item]);

        let total = order.total();

        expect(total).toBe(200);

        const order2 = new Order("2", "2", [item, item2]);
        total = order2.total();

        expect(total).toBe(600);
    });

    it("Should throw error if the item qtd is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("1", "item1", 100, "p1", 0);
            new Order("o1", "c1", [item]);
        }).toThrowError("Quantity must be greater than 0");
    });
});