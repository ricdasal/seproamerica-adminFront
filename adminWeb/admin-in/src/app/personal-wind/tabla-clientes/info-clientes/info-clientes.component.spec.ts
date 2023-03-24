import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClientesComponent } from './info-clientes.component';

describe('InfoClientesComponent', () => {
  let component: InfoClientesComponent;
  let fixture: ComponentFixture<InfoClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
