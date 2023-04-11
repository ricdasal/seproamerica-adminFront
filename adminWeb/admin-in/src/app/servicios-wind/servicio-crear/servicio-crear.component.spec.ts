import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCrearComponent } from './servicio-crear.component';

describe('ServicioCrearComponent', () => {
  let component: ServicioCrearComponent;
  let fixture: ComponentFixture<ServicioCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
