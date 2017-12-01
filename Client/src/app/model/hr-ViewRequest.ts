export class HrViewRequest{
    constructor(public requestId:string,
        public employeeCode:string,public employeeName:string,public supervisorCode:string,
        public supervisorName:string,public oldpacode:string,
        public oldpsacode:string,public oldOucode:string,
        public oldccCode:string,public newpacode:string,public newpsacode:string,
        public newOucode:string, public newcCode:string, public dateOfRequest:string, public dateOfTransfer:string ){}
}