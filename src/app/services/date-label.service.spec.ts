import { TestBed } from '@angular/core/testing';

import { DateLabelService } from './date-label.service';

describe('DateLabelService', () => {
  let service: DateLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
