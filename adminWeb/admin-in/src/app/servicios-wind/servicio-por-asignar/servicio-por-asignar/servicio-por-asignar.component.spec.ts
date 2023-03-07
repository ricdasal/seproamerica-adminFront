import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPorAsignarComponent } from './servicio-por-asignar.component';

describe('ServicioPorAsignarComponent', () => {
  let component: ServicioPorAsignarComponent;
  let fixture: ComponentFixture<ServicioPorAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioPorAsignarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioPorAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
