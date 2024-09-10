import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTableComponent } from './app/customer-table/customer-table.component';

const routes: Routes = [
  { path: '', component: CustomerTableComponent }, // Root route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route redirects to root
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
