import { Subject } from "rxjs";

export class MessageOut {
    isSuccessful: boolean;
    message: string;
    redirectUrl: string;
    retId: 0;

    constructor(message, isSuccesful) {
      this.message = message;
      this.isSuccessful = isSuccesful;
    }
}

export function createSubscription<T>(data: T) {
    const subject = new Subject<T>();
    window.setTimeout(() => {
        subject.next(data);
        subject.complete();
    }, 1000);
    return subject.asObservable();
}