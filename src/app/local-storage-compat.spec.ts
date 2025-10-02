import { TestBed } from '@angular/core/testing';

import { LocalStorageCompat } from './local-storage-compat';

describe('LocalStorageCompat', () => {
  let service: LocalStorageCompat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageCompat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
