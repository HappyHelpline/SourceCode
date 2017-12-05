import { TestBed, inject } from '@angular/core/testing';

import { UrlManagerService } from './url-manager.service';

describe('UrlManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlManagerService]
    });
  });

  it('should be created', inject([UrlManagerService], (service: UrlManagerService) => {
    expect(service).toBeTruthy();
  }));
});
