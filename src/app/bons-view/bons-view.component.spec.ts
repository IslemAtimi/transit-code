import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonsViewComponent } from './bons-view.component';

describe('BonsViewComponent', () => {
  let component: BonsViewComponent;
  let fixture: ComponentFixture<BonsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
