import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosCelularComponent } from './recursos-celular.component';

describe('RecursosCelularComponent', () => {
  let component: RecursosCelularComponent;
  let fixture: ComponentFixture<RecursosCelularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosCelularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
