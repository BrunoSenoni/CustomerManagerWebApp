import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdDate: string;
  lastUpdatedDate: string;
}
export interface CustomerResponse {
  data: Customer[];
  isSuccess: boolean;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5160/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.apiUrl}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
