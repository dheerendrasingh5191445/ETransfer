export class DiscrepancyReport{
    constructor(public RequestId:string,
        public employeeCode:string,public employeeName:string,public requestPa:string,
        public requestPsa:string,public requestOu:string,
        public requestCc:string,public sapPa:string,
        public sapPsa:string,public sapOu:string,public sapCc:string ){}
}