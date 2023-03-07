import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaWindComponent } from './mensajeria-wind.component';

describe('MensajeriaWindComponent', () => {
  let component: MensajeriaWindComponent;
  let fixture: ComponentFixture<MensajeriaWindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeriaWindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeriaWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
