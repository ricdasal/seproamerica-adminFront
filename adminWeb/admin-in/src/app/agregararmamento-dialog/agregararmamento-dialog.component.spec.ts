import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregararmamentoDialogComponent } from './agregararmamento-dialog.component';

describe('AgregararmamentoDialogComponent', () => {
  let component: AgregararmamentoDialogComponent;
  let fixture: ComponentFixture<AgregararmamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregararmamentoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregararmamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
