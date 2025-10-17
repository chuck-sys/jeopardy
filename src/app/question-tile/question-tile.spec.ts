import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTile } from './question-tile';

describe('QuestionTile', () => {
  let component: QuestionTile;
  let fixture: ComponentFixture<QuestionTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
