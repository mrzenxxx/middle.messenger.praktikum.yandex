import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import router from '../Router';
import Block from '../Block';

class Test extends Block<StringIndexed> {
  protected render() {
    return this.compile('<p>Dummy</p>', {});
  }
}

describe('Router', () => {
  const pushStateStub: SinonStub = stub(window.history, 'pushState');
  // eslint-disable-next-line
  const historyBackStub: SinonStub = stub(history, 'back');
  // eslint-disable-next-line
  const historyForwardStub: SinonStub = stub(history, 'forward');

  before(() => {
    router.use('/test-1', Test).use('/test-2', Test).start();
    router.go('/');
  });

  after(() => {
    pushStateStub.restore();
  });

  it('Must return correct history length', () => {
    router.go('/test-1');
    router.go('/test-2');
    expect(pushStateStub.callCount).to.equal(3);
  });

  it('Must navigate back in history', () => {
    router.back();

    // eslint-disable-next-line
    expect(historyBackStub.calledOnce).to.be.true;
  });

  it('Must navigate forward in history', () => {
    router.forward();

    // eslint-disable-next-line
    expect(historyForwardStub.calledOnce).to.be.true;
  });
});
