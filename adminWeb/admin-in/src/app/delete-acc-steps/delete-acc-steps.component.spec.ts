import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccStepsComponent } from './delete-acc-steps.component';

describe('DeleteAccStepsComponent', () => {
  let component: DeleteAccStepsComponent;
  let fixture: ComponentFixture<DeleteAccStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAccStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
