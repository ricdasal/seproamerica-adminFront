import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioDetallesAsignacionComponent } from './servicio-detalles-asignacion.component';

describe('ServicioDetallesAsignacionComponent', () => {
  let component: ServicioDetallesAsignacionComponent;
  let fixture: ComponentFixture<ServicioDetallesAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioDetallesAsignacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioDetallesAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
