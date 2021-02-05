export interface IEmail {
    id: number;
    subject: string;
    recipient: string;
    cc_recipient: string;
    date_sent: Date;
    status_id: number;
}

export class Email {
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
}
