import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { PaymentsComponent } from './components/payments/payments.component';
export const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'details',
    component:DetailsComponent
  },
  {
    path:'payments',
    component:PaymentsComponent
  }
];
