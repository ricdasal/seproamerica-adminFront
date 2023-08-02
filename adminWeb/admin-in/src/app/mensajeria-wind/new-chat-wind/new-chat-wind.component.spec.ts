import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatWindComponent } from './new-chat-wind.component';

describe('NewChatWindComponent', () => {
  let component: NewChatWindComponent;
  let fixture: ComponentFixture<NewChatWindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChatWindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChatWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
