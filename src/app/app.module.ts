import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from './app.component';
import {CustomerTableComponent } from './customer-table/customer-table.component';
import { AddEditCustomerModalComponent } from './customer-table/add-edit-customer-modal/add-edit-customer-modal.component';
import { ConfirmDialogComponent } from './customer-table/confirm-modal/confirm-modal.component';
import { CustomerService } from './shared/services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
@NgModule({
  declarations: [
    AppComponent,
    CustomerTableComponent,
    AddEditCustomerModalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatLabel,
    AppRoutingModule, // Import the AppRoutingModule here
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
