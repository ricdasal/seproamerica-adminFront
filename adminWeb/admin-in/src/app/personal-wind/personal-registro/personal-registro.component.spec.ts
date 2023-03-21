import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRegistroComponent } from './personal-registro.component';

describe('PersonalRegistroComponent', () => {
  let component: PersonalRegistroComponent;
  let fixture: ComponentFixture<PersonalRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
