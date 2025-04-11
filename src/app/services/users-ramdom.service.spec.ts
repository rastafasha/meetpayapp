import { TestBed } from '@angular/core/testing';

import { UsersRamdomService } from './users-ramdom.service';

describe('UsersRamdomService', () => {
  let service: UsersRamdomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRamdomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
