import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCandadosComponent } from './info-candados.component';

describe('InfoCandadosComponent', () => {
  let component: InfoCandadosComponent;
  let fixture: ComponentFixture<InfoCandadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCandadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCandadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
