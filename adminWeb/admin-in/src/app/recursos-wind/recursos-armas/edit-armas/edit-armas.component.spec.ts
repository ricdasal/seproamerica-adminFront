import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArmasComponent } from './edit-armas.component';

describe('EditArmasComponent', () => {
  let component: EditArmasComponent;
  let fixture: ComponentFixture<EditArmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArmasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
