import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCelularComponent } from './eliminar-celular.component';

describe('EliminarCelularComponent', () => {
  let component: EliminarCelularComponent;
  let fixture: ComponentFixture<EliminarCelularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCelularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
