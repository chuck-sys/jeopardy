import { TestBed } from '@angular/core/testing';

import { EditView } from './edit-view';

describe('EditView', () => {
  let service: EditView;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditView);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
