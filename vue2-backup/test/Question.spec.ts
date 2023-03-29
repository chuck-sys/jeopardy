import { expect } from 'chai';
import 'mocha';
import * as Q from '../src/question';

describe('Question functions', () => {
  let q: Q.Question;

  beforeEach(() => {
    q = {
      hint: 'Some random question',
      points: 350,
      category: 'Random Questions',
      answer: 'An answer too great for your eyes to comprehend',
      answeredBy: 'team trees',
      seenAnswer: true,
    };
  });

  describe('#copy()', () => {
    it('actually copies things', () => {
      const q2 = Q.copy(q);

      expect(q2.hint).to.eq(q.hint);
      expect(q2.points).to.eq(q.points);
      expect(q2.category).to.eq(q.category);
      expect(q2.answer).to.eq(q.answer);
      expect(q2.answeredBy).to.eq(q.answeredBy);
      expect(q2.seenAnswer).to.eq(q.seenAnswer);
    });

    it('doesn\'t reference the same question', () => {
      const q2 = Q.copy(q);
      q.points = 200;

      expect(q2.points).to.eq(350);
    });
  });
});
