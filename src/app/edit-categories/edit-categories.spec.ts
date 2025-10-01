import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategories } from './edit-categories';

describe('EditCategories', () => {
  let component: EditCategories;
  let fixture: ComponentFixture<EditCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
