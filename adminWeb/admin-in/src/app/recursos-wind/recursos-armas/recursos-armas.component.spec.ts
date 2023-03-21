import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosArmasComponent } from './recursos-armas.component';

describe('RecursosArmasComponent', () => {
  let component: RecursosArmasComponent;
  let fixture: ComponentFixture<RecursosArmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosArmasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosArmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
