import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosWindComponent } from './recursos-wind.component';

describe('RecursosWindComponent', () => {
  let component: RecursosWindComponent;
  let fixture: ComponentFixture<RecursosWindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosWindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
