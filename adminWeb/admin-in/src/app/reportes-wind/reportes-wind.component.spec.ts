import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesWindComponent } from './reportes-wind.component';

describe('ReportesWindComponent', () => {
  let component: ReportesWindComponent;
  let fixture: ComponentFixture<ReportesWindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesWindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
