import EventInterface from "../../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurre: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurre = new Date();
        this.eventData = eventData;
    }
}