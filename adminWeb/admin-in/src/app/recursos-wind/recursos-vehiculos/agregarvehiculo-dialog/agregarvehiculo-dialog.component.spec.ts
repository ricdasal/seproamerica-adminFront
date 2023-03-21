import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarvehiculoDialogComponent } from './agregarvehiculo-dialog.component';

describe('AgregarvehiculoDialogComponent', () => {
  let component: AgregarvehiculoDialogComponent;
  let fixture: ComponentFixture<AgregarvehiculoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarvehiculoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarvehiculoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
