import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCelularComponent } from './info-celular.component';

describe('InfoCelularComponent', () => {
  let component: InfoCelularComponent;
  let fixture: ComponentFixture<InfoCelularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCelularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
