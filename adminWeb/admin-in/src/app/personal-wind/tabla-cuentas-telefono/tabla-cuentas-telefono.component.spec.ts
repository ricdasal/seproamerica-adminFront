import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCuentasTelefonoComponent } from './tabla-cuentas-telefono.component';

describe('TablaCuentasTelefonoComponent', () => {
  let component: TablaCuentasTelefonoComponent;
  let fixture: ComponentFixture<TablaCuentasTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCuentasTelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCuentasTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
