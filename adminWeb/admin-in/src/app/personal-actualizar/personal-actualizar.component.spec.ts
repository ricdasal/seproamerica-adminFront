import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalActualizarComponent } from './personal-actualizar.component';

describe('PersonalActualizarComponent', () => {
  let component: PersonalActualizarComponent;
  let fixture: ComponentFixture<PersonalActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalActualizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
