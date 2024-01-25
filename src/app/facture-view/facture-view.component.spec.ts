import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureViewComponent } from './facture-view.component';

describe('FactureViewComponent', () => {
  let component: FactureViewComponent;
  let fixture: ComponentFixture<FactureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
