import { TestBed } from '@angular/core/testing';

import { VoteCooldownService } from './vote-cooldown.service';

describe('VoteCooldownService', () => {
  let service: VoteCooldownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteCooldownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
