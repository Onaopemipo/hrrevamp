import { S } from '@angular/cdk/keycodes';
import { formatPercent } from '@angular/common';
import { IStatus, MyColor } from 'app/components/status/models';

enum STATUS {
    RESOLVED, IN_PROGRESS, UN_RESOLVED, CANCELLED, APPROVED, PENDING, DECLINED
}

export const STATUS_LIST = [STATUS.APPROVED, STATUS.CANCELLED, STATUS.DECLINED,
    STATUS.IN_PROGRESS, STATUS.PENDING, STATUS.RESOLVED, STATUS.UN_RESOLVED];

export interface IComplaint {
    id: number;
    title: string;
    complainerName: string;
    description: string;
    status: number;
    time: Date;
    complainerEmail: string;
    referenceNo: number;
}

export class Complaint implements IStatus {
    private iComplaint: IComplaint;
    constructor(iComplaint: IComplaint) {
        this.iComplaint = iComplaint;
    }

    get complainerImageSrc() {
        return 'https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/';
    }

    get time() {
        return this.iComplaint.time;
    }

    get complainerName() {
        return this.iComplaint.complainerName;
    }

    get complainerEmail() {
        return this.iComplaint.complainerEmail;
    }

    get description() {
        return this.iComplaint.description;
    }

    get referenceNo() {
        return this.iComplaint.referenceNo;
    }
    get title() {
        return this.iComplaint.title;
    }

    get status() {
        return this.iComplaint.status;
    }

    getStatusColor() {
        return new MyColor(242, 153, 74);
    }

    getStatusLabel() {
        return 'In progress';
    }
}
