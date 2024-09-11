import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Customer, CustomerService } from '../../shared/services/customer.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-add-edit-customer-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatPaginatorModule, 
    MatTableModule, 
    MatSortModule, 
    MatDialogModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-customer-modal.component.html',
  styleUrl: './add-edit-customer-modal.component.css'
})
export class AddEditCustomerModalComponent {
  customerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditCustomerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer },
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
    this.customerForm = this.fb.group({
      firstName: [data.customer ? data.customer.firstName : '', [Validators.required, Validators.maxLength(20)]],
      lastName: [data.customer ? data.customer.lastName : '', [Validators.required, Validators.maxLength(20)]],
      email: [data.customer ? data.customer.email : '', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const updatedCustomer: Customer = {
        ...this.data.customer,
        ...this.customerForm.value
      };

      if (this.data.customer) {
        this.customerService.updateCustomer(updatedCustomer).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Failed to update customer: ' + error.message, 'Close', { duration: 5000 });
          }
        });
      } else {
        this.customerService.addCustomer(updatedCustomer).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open('Failed to add customer: ' + error.message, 'Close', { duration: 5000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
