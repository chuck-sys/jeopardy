import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTitle } from './edit-title';

describe('EditTitle', () => {
  let component: EditTitle;
  let fixture: ComponentFixture<EditTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
