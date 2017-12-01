import { Injectable } from '@angular/core';
import { Headers, Http,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AssetsData } from '../model/asset';
import { AssetControllerDiscrepancyReport } from './../model/assetDiscrepancyReport';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {ConfigFile} from '../shared/config';
// importing operators
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class AssetControlService {
    token  = localStorage.getItem("token");
    headers =  new Headers({ 'Authorization': 'Bearer ' + this.token});
    options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) { }
    //To Get The List Of All The Assets.
    GetAssetList():Promise<AssetsData[]> {
        return this.http.get(ConfigFile.AssetControllerServiceUrls.GetAsset,this.options).toPromise().then(response => response.json()).catch(this.handleError);
    }
    //To Get The Discrepant Report Of All Assets
    getDiscrepancyReport() {
        return this.http.get(ConfigFile.AssetControllerServiceUrls.GetDiscrepancy,this.options)
        .map(response => response.json()).catch(this.handleError);  // catch the exception from API
    }
    //Convertor of asset list to a excel sheet
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }
    //For downloading the excel sheet of asset list
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    private handleError  (error : any)
    {
        //This method is used to display the exception to user
        if(error.status==404)
        {
            return Observable.throw( 404 || error ); //Will show page not found exception
        }
        else if(error.status==400)
        {
            return Observable.throw(400 || error ); //Used to show Bad request exception
        }
        return Observable.throw(500 || error  ); // Used to show Internal server error
    }
}