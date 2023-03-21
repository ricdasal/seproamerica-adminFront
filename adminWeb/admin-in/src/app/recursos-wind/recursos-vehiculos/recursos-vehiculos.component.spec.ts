import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosVehiculosComponent } from './recursos-vehiculos.component';

describe('RecursosVehiculosComponent', () => {
  let component: RecursosVehiculosComponent;
  let fixture: ComponentFixture<RecursosVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
