import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../DataService/internal-data.service';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  protected dashboard_data: any;

  ngOnInit(): void {
    this.dashboard_data = {
      total_parked: this.internal_data.getDataList()?.filter((vehicle: any) => vehicle?.status === 'In')?.length,
      total_empty: this.internal_data.getDataList()?.filter((vehicle: any) => vehicle?.status === 'Out')?.length,
      total_microbus: this.internal_data.getDataList()?.filter((vehicle: any) => vehicle?.v_type === 'Microbus')?.length,
      total_car: this.internal_data.getDataList()?.filter((vehicle: any) => vehicle?.v_type === 'Car')?.length,
      total_truck: this.internal_data.getDataList()?.filter((vehicle: any) => vehicle?.v_type === 'Truck')?.length,
      total_overtime: this.internal_data.getDataList()?.filter((vehicle: any) => (vehicle?.status === 'In' ? new Date()?.getTime() : vehicle?.status === 'Out' ? new Date(vehicle?.car_exit)?.getTime() : 0) - new Date(vehicle?.car_entry)?.getTime() > 7200000 )?.length,
    }
  }

  constructor(private internal_data: InternalDataService){

  }
}
