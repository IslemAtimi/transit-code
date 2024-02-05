import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientPopUpComponent } from './add-client-pop-up.component';

describe('AddClientPopUpComponent', () => {
  let component: AddClientPopUpComponent;
  let fixture: ComponentFixture<AddClientPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
