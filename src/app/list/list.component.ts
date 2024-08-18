import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../DataService/internal-data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(protected internal_data: InternalDataService){

  }

  ngOnInit(): void {
    
  }
}
