import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEditCustomerModalComponent } from './add-edit-customer-modal/add-edit-customer-modal.component';
import { Customer, CustomerService } from '../shared/services/customer.service';
import { ConfirmDialogComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem('lastSelectedCustomer');
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.showError(error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditModal(customer: Customer) {
    sessionStorage.setItem('lastSelectedCustomer', JSON.stringify(customer));
    const dialogRef = this.dialog.open(AddEditCustomerModalComponent, {
      width: '400px',
      data: { customer }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.loadCustomers();
          this.showMessage('Customer updated successfully');
        }
      },
      error: (error) => {
        this.showError('Error closing the dialog: ' + error.message);
      }
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddEditCustomerModalComponent, {
      width: '400px',
      data: { customer: null }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.loadCustomers();
          this.showMessage('Customer added successfully');
        }
      },
      error: (error) => {
        this.showError('Error closing the dialog: ' + error.message);
      }
    });
  }

  deleteCustomer(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.customerService.deleteCustomer(id).subscribe({
            next: () => {
              this.loadCustomers();
              this.showMessage('Customer deleted successfully');
            },
            error: (error) => {
              this.showError(error.message);
            }
          });
        }
      },
      error: (error) => {
        this.showError('Error closing the dialog: ' + error.message);
      }
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  private showError(error: string) {
    this.snackBar.open(error, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  isLastSelected(customer: Customer): boolean {
    const lastSelectedCustomer = sessionStorage.getItem('lastSelectedCustomer');
    if (lastSelectedCustomer) {
      const storedCustomer = JSON.parse(lastSelectedCustomer) as Customer;
      return storedCustomer.id === customer.id;
    }
    return false;
  }
}
