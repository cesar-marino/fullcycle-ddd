import Address from "./address";

class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _activate: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this._validate();
    }

    _validate() {
        if (this._id.length == 0) {
            throw new Error("ID is required");
        }

        if (this._name.length == 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this._validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._activate = true;
    }

    deactivate() {
        this._activate = false;
    }

    set Address(address: Address) {
        this._address = address;
    }
}