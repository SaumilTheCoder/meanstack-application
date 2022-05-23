import { TestBed } from '@angular/core/testing';

import { DummydataServiceService } from './dummydata-service.service';

describe('DummydataServiceService', () => {
  let service: DummydataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummydataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
