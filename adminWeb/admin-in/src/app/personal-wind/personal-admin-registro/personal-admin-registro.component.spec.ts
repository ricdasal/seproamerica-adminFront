import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAdminRegistroComponent } from './personal-admin-registro.component';

describe('PersonalAdminRegistroComponent', () => {
  let component: PersonalAdminRegistroComponent;
  let fixture: ComponentFixture<PersonalAdminRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAdminRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAdminRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
