import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarcandadosDialogComponent } from './agregarcandados-dialog.component';

describe('AgregarcandadosDialogComponent', () => {
  let component: AgregarcandadosDialogComponent;
  let fixture: ComponentFixture<AgregarcandadosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarcandadosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarcandadosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
