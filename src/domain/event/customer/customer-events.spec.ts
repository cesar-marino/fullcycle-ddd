import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogChangeAddress from "./handler/send-console-log-change-address.handler";
import SendConsoleLogOneHandler from "./handler/send-console-log-one.handler";
import SendConsoleLogTowHandler from "./handler/send-console-log-two.handler";

describe("Customer events tests", () => {
    it("Should notify event handlers on created customer", () => {
        const eventDispatcher = new EventDispatcher();
        const consoleLog1EventHandler = new SendConsoleLogOneHandler();
        const consoleLog2EventHandler = new SendConsoleLogTowHandler();
        const spyConsoleLog1Handler = jest.spyOn(consoleLog1EventHandler, "handle");
        const spyConsoleLog2Handler = jest.spyOn(consoleLog2EventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", consoleLog1EventHandler);
        eventDispatcher.register("CustomerCreatedEvent", consoleLog2EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(consoleLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(consoleLog2EventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "c1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "Zipcode 1",
                city: "City 1",
            }
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyConsoleLog1Handler).toHaveBeenCalled();
        expect(spyConsoleLog2Handler).toHaveBeenCalled();
    });

    it("Should notify event handlers on customer updated address", () => {
        const eventDispatcher = new EventDispatcher();
        const sendConsoleLogChangeAddressHandler = new SendConsoleLogChangeAddress();
        const spySendConsoleLogChangeAddressHandler = jest.spyOn(sendConsoleLogChangeAddressHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", sendConsoleLogChangeAddressHandler);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(sendConsoleLogChangeAddressHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "customer1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "Zipcode 1",
                city: "City 1",
            }
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spySendConsoleLogChangeAddressHandler).toHaveBeenCalled();
    });
});