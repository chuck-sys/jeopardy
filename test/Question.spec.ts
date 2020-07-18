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
    };
  });

  describe('#addStatus()', () => {
    it('references the same question', () => {
      const qStatus = Q.addStatus(q);
      q.hint = 'rando';

      expect(qStatus.q.hint).to.eq('rando');
    });
  });

  describe('#emptyQuestion()', () => {
    it('creates new questions and doesn\'t use the same empty question', () => {
      const e0 = Q.emptyQuestion('');
      const e1 = Q.emptyQuestion('');

      e0.hint = 'hello world';

      expect(e1.hint).to.not.eq('hello world');
    });
  });

  describe('#copy()', () => {
    it('actually copies things', () => {
      const q2 = Q.copy(q);

      expect(q2.hint).to.eq(q.hint);
      expect(q2.points).to.eq(q.points);
      expect(q2.category).to.eq(q.category);
      expect(q2.answer).to.eq(q.answer);
    });

    it('doesn\'t reference the same question', () => {
      const q2 = Q.copy(q);
      q.points = 200;

      expect(q2.points).to.eq(350);
    });
  });
});
