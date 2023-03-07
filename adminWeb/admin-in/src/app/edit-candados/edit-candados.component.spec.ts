import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandadosComponent } from './edit-candados.component';

describe('EditCandadosComponent', () => {
  let component: EditCandadosComponent;
  let fixture: ComponentFixture<EditCandadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCandadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCandadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
