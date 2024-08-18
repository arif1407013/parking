import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'add',
        component: FormComponent
    },
    {
        path: 'edit',
        component: FormComponent
    }
];
