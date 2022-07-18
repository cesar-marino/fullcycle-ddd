import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    private _validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }

        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }

        if (this._items.length === 0) {
            throw new Error("Items are required");
        }

        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than 0");
        }

        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.total(), 0);
    }

    addOrderItem(item: OrderItem): void {
        this._items.push(item);
    }

    removeOrderItem(item: OrderItem): void {
        const index = this._items.indexOf(item, 0);
        if (index > -1) {
            this._items.splice(index, 1);
        }
    }

    changeCustomer(customerId: string) {
        this._customerId = customerId;
    }
}