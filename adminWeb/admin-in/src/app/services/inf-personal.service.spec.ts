import { TestBed } from '@angular/core/testing';

import { InfPersonalService } from './inf-personal.service';

describe('InfPersonalService', () => {
  let service: InfPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfPersonalService);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
