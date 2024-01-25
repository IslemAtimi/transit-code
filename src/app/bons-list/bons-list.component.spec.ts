import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonsListComponent } from './bons-list.component';

describe('BonsListComponent', () => {
  let component: BonsListComponent;
  let fixture: ComponentFixture<BonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
