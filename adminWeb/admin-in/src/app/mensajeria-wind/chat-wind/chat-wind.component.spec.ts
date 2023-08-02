import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindComponent } from './chat-wind.component';

describe('ChatWindComponent', () => {
  let component: ChatWindComponent;
  let fixture: ComponentFixture<ChatWindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
