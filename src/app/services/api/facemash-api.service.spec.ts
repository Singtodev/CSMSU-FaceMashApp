import { TestBed } from '@angular/core/testing';

import { FacemashApiService } from './facemash-api.service';

describe('FacemashApiService', () => {
  let service: FacemashApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacemashApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
