import dayjs from "dayjs";

export interface Message {
    internalId: string;
    content: string;
    sender: string;
    subject: string;
    sent: dayjs.Dayjs;
    origin: MessageOrigin;
}

export enum MessageOrigin {
    EMAIL, DAYMAP
}