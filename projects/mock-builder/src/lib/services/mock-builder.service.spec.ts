import { TestBed } from '@angular/core/testing';

import { MockBuilderService } from 'mock-builder';

describe('MockBuilderService', () => {
  let service: MockBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
