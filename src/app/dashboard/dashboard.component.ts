import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../DataService/internal-data.service';
import { ChartsComponent } from '../charts/charts.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartsComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  protected dashboard_data: any;

  protected dateData: string = '';

  ngOnInit(): void {
    this.dateData = `${new Date().getFullYear()}-${`${new Date().getMonth()+1}`.padStart(2, '0')}-${new Date().getDate()}`;
    this.getData();
  }

  getData(){
    let tempList: any[] = this.internal_data.getDataList()?.filter((vehicle: any) => vehicle?.car_entry_date === this.dateData);
    this.dashboard_data = {
      total_parked: tempList?.filter((vehicle: any) => vehicle?.status === 'In')?.length,
      total_empty: tempList?.filter((vehicle: any) => vehicle?.status === 'Out')?.length,
      total_microbus: tempList?.filter((vehicle: any) => vehicle?.v_type === 'Microbus')?.length,
      total_car: tempList?.filter((vehicle: any) => vehicle?.v_type === 'Car')?.length,
      total_truck: tempList?.filter((vehicle: any) => vehicle?.v_type === 'Truck')?.length,
      total_overtime: tempList?.filter((vehicle: any) => (vehicle?.status === 'In' ? new Date()?.getTime() : vehicle?.status === 'Out' ? new Date(vehicle?.car_exit)?.getTime() : 0) - new Date(vehicle?.car_entry)?.getTime() > 7200000 )?.length,
    }
  }

  constructor(private internal_data: InternalDataService){

  }
}
