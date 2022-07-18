import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLogChangeAddress implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        const data = event.eventData;
        console.log(`Endereço do cliente: ${data["id"]}, ${data["name"]} alterado para rua ${data["address"]["street"]}, nº ${data["address"]["number"]} - ${data["address"]["city"]}`);
    }
}