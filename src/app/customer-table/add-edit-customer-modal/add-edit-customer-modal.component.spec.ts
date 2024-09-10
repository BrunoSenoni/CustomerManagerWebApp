import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerModalComponent } from './add-edit-customer-modal.component';

describe('AddEditCustomerModalComponent', () => {
  let component: AddEditCustomerModalComponent;
  let fixture: ComponentFixture<AddEditCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCustomerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
