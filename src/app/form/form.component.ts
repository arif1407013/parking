import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InternalDataService } from '../DataService/internal-data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  protected form: FormGroup;
  protected editable_id: number|null = null;

  constructor(
    private fb: FormBuilder,
    private internal_data: InternalDataService,
    protected router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      license_no: [''],
      v_type: [''],
      owner_name: [''],
      owner_phone: [''],
      status: new FormControl({value: 'In', disabled: true}),
      owner_address: [''],
      car_entry_date: new FormControl({value: '', disabled: false}),
      car_entry_time: new FormControl({value: '', disabled: false}),
      car_exit_date: new FormControl({value: '', disabled: true}),
      car_exit_time: new FormControl({value: '', disabled: true}),
      parking_charge: new FormControl({ value: '', disabled: true }),
    });
  }

  saveForm() {
    this.form.enable();
    if(this.editable_id === null){
      this.internal_data.addData({
        ...this.form.value,
        car_entry: `${this.form.value?.car_entry_date} ${this.form.value?.car_entry_time}`,
        car_exit: `${this.form.value?.car_exit_date} ${this.form.value?.car_exit_time}`,
      });
    }else{
      this.internal_data.editData({
        ...this.form.value,
        car_entry: `${this.form.value?.car_entry_date} ${this.form.value?.car_entry_time}`,
        car_exit: `${this.form.value?.car_exit_date} ${this.form.value?.car_exit_time}`,
      }, this.editable_id);
    }
    this.router.navigate(['list']);
  }

  ngOnInit(): void {
    this.form.get('status')?.valueChanges.subscribe((val: any) => {
      switch(val){
        case 'In':
          this.form.get('car_entry_date')?.enable();
          this.form.get('car_entry_time')?.enable();
          this.form.get('car_exit_date')?.disable();
          this.form.get('car_exit_time')?.disable();
          break;
        case 'Out':
          this.form.get('car_entry_date')?.disable();
          this.form.get('car_entry_time')?.disable();
          this.form.get('car_exit_date')?.enable();
          this.form.get('car_exit_time')?.enable();
          break;
      }
    });
    this.form.get('v_type')?.valueChanges.subscribe((val: any) => {
      switch (val) {
        case 'Microbus':
          this.form.get('parking_charge')?.setValue(25);
          break;
        case 'Car':
          this.form.get('parking_charge')?.setValue(20);
          break;
        case 'Truck':
          this.form.get('parking_charge')?.setValue(35);
          break;
        default:
          break;
      }
    });
    this.route.queryParams.subscribe((resp: any) => {
      this.editable_id = resp?.id ?? null;
      if(resp?.data){
        let temp_data: any = JSON.parse(resp?.data);
        this.form.patchValue({
          ...temp_data,
          car_entry_date: temp_data?.car_entry?.split(' ')?.[0],
          car_entry_time: temp_data?.car_entry?.split(' ')?.[1],
          car_exit_date: temp_data?.car_exit?.split(' ')?.[0],
          car_exit_time: temp_data?.car_exit?.split(' ')?.[1],
        });
        this.form.get('status')?.setValue('Out');
        this.form.get('status')?.disable();
      }
    });
  }
}
