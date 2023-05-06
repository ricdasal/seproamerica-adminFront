import { TestBed } from '@angular/core/testing';

import { ComunicarComponentesService } from './comunicar-componentes.service';

describe('ComunicarComponentesService', () => {
  let service: ComunicarComponentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicarComponentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
