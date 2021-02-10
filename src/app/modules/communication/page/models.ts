import { IStatus } from "app/components/status/models";

export interface IEmail {
    id: number;
    subject: string;
    recipient: string;
    cc_recipient: string;
    content: string;
    date_sent: Date;
    status_id: number;
}

export class Email implements IStatus {
    iObj: IEmail;

    public constructor(iEmail: IEmail) {
        this.iObj = iEmail;
    }

    get subject() {
        return this.iObj.subject;
    }

    get recipient() {
        return this.iObj.recipient;
    }

    get cc_recipient() {
        return this.iObj.cc_recipient;
    }

    get date_sent() {
        return this.iObj.date_sent;
    }

    get content() {
        return this.iObj.content;
    }

    get senderName() {
        return 'Ade Ayo';
    }

    get senderMail() {
        return 'AdeAyo@ayy.com';
    }

    get senderImageSrc() {
        return 'https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/';
    }

    getStatusLabel(){
        return 'In progress';
    }

    getStatusColor(){
        return 'blue';
    }
}
