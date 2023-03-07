import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensajeriaComponent } from './modal-mensajeria.component';

describe('ModalMensajeriaComponent', () => {
  let component: ModalMensajeriaComponent;
  let fixture: ComponentFixture<ModalMensajeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensajeriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
