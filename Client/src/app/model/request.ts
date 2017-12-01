export class Request{
    constructor(public employeeCode:string,
        public supervisorCode:string,public typeOfRequest:string,public newPaCode:string,
        public newPsaCode:string,public newOuCode:string,
        public newCcCode:string,public dateOftransfer:Date,public requestStatus:string,
        public pendingWith:string,public requestId?:Number,public dateofrequest?:Date,public DateOfCompletionRequest?:Date){}
}
