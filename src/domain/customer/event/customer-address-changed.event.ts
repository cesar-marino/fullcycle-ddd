import EventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
    dateTimeOcurre: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurre = new Date();
        this.eventData = eventData;
    }
}