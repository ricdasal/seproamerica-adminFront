import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioEditarEliminarComponent } from './servicio-editar-eliminar.component';

describe('ServicioEditarEliminarComponent', () => {
  let component: ServicioEditarEliminarComponent;
  let fixture: ComponentFixture<ServicioEditarEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioEditarEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioEditarEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
