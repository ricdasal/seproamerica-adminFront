import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCargosComponent } from './crear-cargos.component';

describe('CrearCargosComponent', () => {
  let component: CrearCargosComponent;
  let fixture: ComponentFixture<CrearCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCargosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
