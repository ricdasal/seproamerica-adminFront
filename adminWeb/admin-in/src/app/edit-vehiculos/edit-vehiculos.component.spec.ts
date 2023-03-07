import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiculosComponent } from './edit-vehiculos.component';

describe('EditVehiculosComponent', () => {
  let component: EditVehiculosComponent;
  let fixture: ComponentFixture<EditVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
