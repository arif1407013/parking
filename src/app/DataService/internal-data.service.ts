import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalDataService {

  constructor() { }

  getStoredData(){
    return JSON.parse(window.localStorage.getItem('dataList') ?? '[]');
  }

  getDataList(): any[]{
    return this.getStoredData();
  }

  addData(data: any){
    let prevData: any[] = this.getStoredData();
    window.localStorage.setItem('dataList', JSON.stringify([
      ...prevData,
      data
    ]));
  }

  editData(data: any, id: number){
    let prevData: any[] = this.getStoredData();
    prevData?.splice(id, 1, data);
    window.localStorage.setItem('dataList', JSON.stringify(prevData));
  }
}
