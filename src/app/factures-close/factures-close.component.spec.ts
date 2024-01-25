import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturesCloseComponent } from './factures-close.component';

describe('FacturesCloseComponent', () => {
  let component: FacturesCloseComponent;
  let fixture: ComponentFixture<FacturesCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturesCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturesCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
