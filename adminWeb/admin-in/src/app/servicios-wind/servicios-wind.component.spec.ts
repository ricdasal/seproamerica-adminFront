import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosWindComponent } from './servicios-wind.component';

describe('ServiciosWindComponent', () => {
  let component: ServiciosWindComponent;
  let fixture: ComponentFixture<ServiciosWindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosWindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
