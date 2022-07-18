import EventHandlerInterface from "../../@shared/event-handler.interface";
import eventInterface from "../../@shared/event.interface";

export default class SendConsoleLogAddress implements EventHandlerInterface {
    handle(event: eventInterface): void {
        const data = event.eventData;
        console.log(`Endereço do cliente: ${data["id"]}, ${data["name"]} alterado para 
        rua ${data["address"]["street"]}, nº ${data["address"]["number"]} - ${data["address"]["city"]}`);
    }
}