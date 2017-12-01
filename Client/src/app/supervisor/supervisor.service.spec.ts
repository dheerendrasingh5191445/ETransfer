import { TestBed, inject, fakeAsync, tick, async } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response,RequestMethod } from '@angular/http';
import { SupervisorService } from './supervisor.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterModule, Router } from '@angular/router';
import { Employee } from './../model/Employee';


describe('SupervisorService', () => {
    let emp:Employee;
    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };
    const mockResponseassset = {
        data: [
            {

                "assetCode": 9877,
                "employeeCode": 12156958,
                "companyCode": 34754,
                "description": "laptop",
                "quantity": 1,
                "location": "delhi",
                "capitalisationDate": "12/03/2017",
                "assetStatus": "pending",
                "assigntoEmailId": "kewaleparam0204@gmail.com",
                "assignedto": 193503
            }
        ]
    };
    const mockResponseemployee = {
        data: [
            {

                "employeeCode": "12156962",
                "employeeName": "alruba",
                "location": "greater noida",
                "localHr": "sushil",
                "localCso": "sunil",
                "ouCode": "320",
                "ccCode": "345",
                "companyCode": "345454",
                "designation": "developer",
                "supervisor": "10150000",
                "supervisorEmailId": "paporidutta23@gmail.com",
                "dateofTransfer": "2/3/2017",
                "assetCode": "456",
                "supervisorName": "alruba",
                "EmployeeEmailId": "anita@niit-tech.com",
                "pacode": "123",
                "psacode": "456"
            }
        ]
    };

    const mockResponserequest = {
        data: [
            {
                "requestId":"12345",
                "employeeCode": "4567456",
                "supervisorCode": "32343243",
                "typeOfRequest": "OU",
                "newpacode": "456",
                "newpsacode": "456",
                "newOucode": "432",

            }
        ]
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule, RouterModule],
            providers: [{ provide: XHRBackend, useClass: MockBackend },
            { provide: MockBackend, useClass: MockBackend },
                SupervisorService,
            { provide: Router, useValue: mockRouter }]

        });
    });


    describe('getEmployeeListBySupervisorID()return json', () => {
        it("should return json Promise<Employee>",
            inject([SupervisorService, XHRBackend], (supervisorService, mockBackend) => {
                mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("./assets/data/employee.json");
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponseemployee)
                    })));
                })
                supervisorService.getEmployeeListBySupervisorID().subscribe((value) => {
                    expect(value.data[0].employeeCode).toEqual('12156962');

                });
            }))
    });

    describe('getmyrelatedemployee()return promise', () => {
        it("should return json Promise<Asset>",
            inject([SupervisorService, XHRBackend], (supervisorService, mockBackend) => {
                mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("./assets/data/employee.json");
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponseassset)
                    })));
                })
                supervisorService.getmyrelatedemployee().then((value) => {
                    expect(value.data[0].assetCode).toEqual(9877);

                });
            }));
    });


    describe('getmyemployeehere(id:string) return promise', () => {
        it("should return json Promise<Employee>",
            inject([SupervisorService, XHRBackend], (supervisorService, mockBackend) => {
                mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Employee/"+1234);
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponseemployee)
                    })));
                })
                supervisorService.getmyemployeehere("1234").then((value) => {
                    expect(value.data[0].employeeCode).toEqual('12156962');

                });
            }));
    });


    describe('getmyrejectrequestdetailupdate(id:string) return promise with request detail', () => {
        it("should return json Promise<Request>",
            inject([SupervisorService, XHRBackend], (supervisorService, mockBackend) => {
                mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/GetRequestById/"+1234);
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponserequest)
                    })));
                })
                supervisorService.getmyrejectrequestdetailupdate(1234).then((value) => {
                    expect(value.data[0].supervisorCode).toEqual('32343243');

                });
            }));
    });



    describe(' filldetailofemployeewanttogeneraterequest(employee:Employee) return promise with request detail', () => {
        it("should return json Promise<Request>",
            inject([SupervisorService, XHRBackend], (supervisormock, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Employee");
                    expect(connection.request.method).toBe(RequestMethod.Post);
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })
                    ));
                })
                supervisormock.filldetailofemployeewanttogeneraterequest(mockResponseemployee).then((value) =>
                 {
                     expect(value).toBeDefined();
                     expect(value.status).toEqual(200);
                });
            }));
    });


    describe('reassignAssetReallocation(reassignment:AssetsData)  return promise with request detail', () => {
        it("should return json Promise<Assset>",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/PutAssets");
                    expect(connection.request.method).toBe(RequestMethod.Put);
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })
                    ));
                })
                supervisormockput.reassignAssetReallocation(mockResponseassset.data[0]).subscribe((value) =>{
                    expect(value).toBeDefined();
                    expect(value.status).toEqual(200);
                });
            }));
    });

    describe('generatenewrequest(assetdetail:AssetsData[],myrequest:Request)  return promise with request detail', () => {
        it("should return json Promise with 200",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/PostRequest");
                    expect(connection.request.method).toBe(RequestMethod.Post);    
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })
                    ));
                })
                supervisormockput.generatenewrequest(mockResponserequest.data[0]).then((value) =>{
                    expect(value.status).toEqual(200);
                });
            }));
    });

    describe('insertmyassetlist(assetdetail:AssetsData[])  return promise with request detail', () => {
        it("should return json Promise with 200",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/PostAsset");
                    expect(connection.request.method).toBe(RequestMethod.Post);    
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })
                    ));
                })
                supervisormockput.insertmyassetlist(mockResponseassset).then((value) =>{
                    expect(value.status).toEqual(200);
                });
            }));
    });


    describe('getAsset() return promise with request detail', () => {
        it("should return json asset",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("./assets/data/asset.json");
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(mockResponseassset)})
                    ));
                })
                supervisormockput.getAsset().subscribe((value) =>{
                    expect(value.data[0].assetCode).toEqual(9877);
                });
            }));
    });
    
    describe('getRejectAssetDetails(myemployeelist:string[]) return promise with request detail', () => {
        it("should return status",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/GetRejectedAssetList");
                    expect(connection.request.method).toBe(RequestMethod.Post);       
                    connection.mockRespond(new Response(new ResponseOptions({
                              status: 200
                    })
                    ));
                })
                supervisormockput.getRejectAssetDetails(["1234","2345"]).then((value) =>{
                    expect(value).toBeDefined();
                    expect(value.status).toEqual(200);
                });
            }));
    });

    describe('getrejectemployeesbyhr() return promise with request detail', () => {
        it("should return json reject request",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/GetRequest");
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponserequest)
                    })
                    ));
                })
                supervisormockput.getrejectemployeesbyhr().subscribe((value) =>{
                    expect(value.data[0].supervisorCode).toEqual('32343243');
                });
            }));
    });

    describe('getmyrejectrequestdetailupdate(id:string)return promise with request details', () => {
        it("should return json reject request",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/GetRequestById/"+1234);
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponserequest)
                    })
                    ));
                })
                supervisormockput.getmyrejectrequestdetailupdate("1234").then((value) =>{
                    expect(value.data[0].supervisorCode).toEqual('32343243');
                });
            }));
    });

    describe('	updatemyrejectedlist(updatedlist:Request)return promise with status', () => {
        it("should return status",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Supervisor/PutRequest/"+12345);
                    expect(connection.request.method).toBe(RequestMethod.Put);
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })
                    ));
                })
                supervisormockput.updatemyrejectedlist(mockResponserequest.data[0]).then((value) =>{
                    expect(value.status).toBe(200);
                });
            }));
    });

    describe('removemyrequest(id:string)return promise with status', () => {
        it("should return deleted status",
            inject([SupervisorService, XHRBackend], (supervisormockput, mockBackend) => {
                    mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.url).toBe("http://localhost:56622/api/Employee/"+1234);
                    expect(connection.request.method).toBe(RequestMethod.Delete);
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })
                    ));
                })
                supervisormockput.removemyrequest("1234").subscribe((value) =>{
                    expect(value.status).toBe(200);
                });
            }));
    });


});

