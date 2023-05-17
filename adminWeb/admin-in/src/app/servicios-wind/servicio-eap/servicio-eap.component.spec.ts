import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioEapComponent } from './servicio-eap.component';

describe('ServicioEapComponent', () => {
  let component: ServicioEapComponent;
  let fixture: ComponentFixture<ServicioEapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioEapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioEapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
