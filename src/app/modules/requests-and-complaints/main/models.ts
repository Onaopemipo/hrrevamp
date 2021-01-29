export interface IComplaint{
    id: number,
    title: string,
    complainerName: string,
    description: string,
    status: number,
    time: Date,
    complainerEmail: string,
    referenceNo: number
}

export class Complaint{
    private iComplaint: IComplaint;
    constructor(iComplaint: IComplaint){
        this.iComplaint = iComplaint
    }

    get complainerImageSrc(){
        return 'https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/'
    }

    get time(){
        return this.iComplaint.time
    }

    get complainerName(){
        return this.iComplaint.complainerName
    }

    get complainerEmail(){
        return this.iComplaint.complainerEmail
    }

    get description(){
        return this.iComplaint.description
    }

    get referenceNo(){
        return this.iComplaint.referenceNo
    }
    get title(){
        return this.iComplaint.title
    }

    get status(){
        return this.iComplaint.status
    }
}