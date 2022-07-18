import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log-2.handler";

describe("Customer dispatcher tests", () => {
    it("Should register events", () => {
        const eventDispatcher = new EventDispatcher();
        const consoleLog1EventHandler = new SendConsoleLog1Handler();
        const consoleLog2EventHandler = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", consoleLog1EventHandler);
        eventDispatcher.register("CustomerCreatedEvent", consoleLog2EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(consoleLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(consoleLog2EventHandler);
    });

    it("Should unregister events", () => {
        const eventDispatcher = new EventDispatcher();
        const consoleLog1EventHandler = new SendConsoleLog1Handler();
        const consoleLog2EventHandler = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", consoleLog1EventHandler);
        eventDispatcher.register("CustomerCreatedEvent", consoleLog2EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(consoleLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(consoleLog2EventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", consoleLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(consoleLog2EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toBe(undefined);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    });

    it("Should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();
        const consoleLog1EventHandler = new SendConsoleLog1Handler();
        const consoleLog2EventHandler = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", consoleLog1EventHandler);
        eventDispatcher.register("CustomerCreatedEvent", consoleLog2EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(consoleLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(consoleLog2EventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBe(undefined);
    });

    it("Should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const consoleLog1EventHandler = new SendConsoleLog1Handler();
        const consoleLog2EventHandler = new SendConsoleLog2Handler();
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
});