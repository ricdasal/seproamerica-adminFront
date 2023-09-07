import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresGeneradosComponent } from './valores-generados.component';

describe('ValoresGeneradosComponent', () => {
  let component: ValoresGeneradosComponent;
  let fixture: ComponentFixture<ValoresGeneradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoresGeneradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoresGeneradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
