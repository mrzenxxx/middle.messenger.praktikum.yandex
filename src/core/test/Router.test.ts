import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import router from '../Router';
import Block from '../Block';

class Test extends Block<StringIndexed> {
  protected render() {
    return '<p>Dummy</p>';
  }
}

describe('core/Router', () => {
  let pushStateStub: SinonStub;

  before(() => {
    pushStateStub = sinon.stub(window.history, 'pushState');
    router.use('/test-1', Test).use('/test-2', Test).start();
  });

  after(() => {
    pushStateStub.restore();
  });

  it('Must return correct history length', () => {
    router.go('/test-1');
    router.go('/test-2');
    expect(pushStateStub.callCount).to.equal(2);
  });
});
