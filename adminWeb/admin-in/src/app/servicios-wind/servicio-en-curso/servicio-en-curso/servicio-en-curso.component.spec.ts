import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioEnCursoComponent } from './servicio-en-curso.component';

describe('ServicioEnCursoComponent', () => {
  let component: ServicioEnCursoComponent;
  let fixture: ComponentFixture<ServicioEnCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioEnCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioEnCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
