import { TestBed } from '@angular/core/testing';

import { ComplexFormService } from './complex-form.service';

describe('ComplexFormService', () => {
  let service: ComplexFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
