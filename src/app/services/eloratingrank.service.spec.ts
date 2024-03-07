import { TestBed } from '@angular/core/testing';

import { EloratingrankService } from './eloratingrank.service';

describe('EloratingrankService', () => {
  let service: EloratingrankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EloratingrankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
