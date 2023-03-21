import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosCandadosComponent } from './recursos-candados.component';

describe('RecursosCandadosComponent', () => {
  let component: RecursosCandadosComponent;
  let fixture: ComponentFixture<RecursosCandadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosCandadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosCandadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
