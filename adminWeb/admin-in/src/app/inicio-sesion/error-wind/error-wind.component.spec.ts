import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorWindComponent } from './error-wind.component';

describe('ErrorWindComponent', () => {
  let component: ErrorWindComponent;
  let fixture: ComponentFixture<ErrorWindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorWindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
