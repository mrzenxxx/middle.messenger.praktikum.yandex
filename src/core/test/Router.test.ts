import { expect } from "chai";
import sinon from "sinon";
import router from "../Router";
import Block from "../Block";

describe('Router', () => {
  

  // beforeEach(() => {
  //   const dom = new JSDOM('<!DOCTYPE html><div id="app"></div>');
  //   global.window = dom.window;
  //   global.document = dom.window.document;
  //   router = new Router('#app');
  // });

  // afterEach(() => {
  //   delete global.window;
  //   delete global.document;
  // });

  it('should render the correct route', () => {
    const route = sinon.spy(); // Создаем шпиона на функции route
    const block = sinon.spy(); // Создаем шпиона на функции block

    router.use('/route', block as Block<StringIndexed>); // Регистрируем маршрут '/route' с функцией block
    router.start(); // Запускаем роутер
    router.go('/route'); // Переходим на маршрут '/route'

    expect(route.called).to.be.false; // Проверка, что функция route не была вызвана
    expect(block.calledOnce).to.be.true; // Проверка, что функция block была вызвана ровно один раз
  });

  it('should go back correctly', () => {
    const route1 = sinon.spy();
    const block1 = sinon.spy();
    const block2 = sinon.spy();

    router.use('/route1', block1);
    router.use('/route2', block2);
    router.start();
    router.go('/route1');
    router.go('/route2');
    router.back();

    expect(route1.calledOnce).to.be.true;
    expect(block1.calledOnce).to.be.true;
    expect(block2.calledOnce).to.be.true;
    expect(block2.calledWith('hide')).to.be.true;
    expect(block1.calledWith('show')).to.be.true;
  });

  it('should go forward correctly', () => {
    const route1 = sinon.spy();
    const block1 = sinon.spy();
    const block2 = sinon.spy();

    router.use('/route1', block1);
    router.use('/route2', block2);
    router.start();
    router.go('/route1');
    router.go('/route2');
    router.back();
    router.forward();

    expect(route1.calledOnce).to.be.true;
    expect(block1.calledOnce).to.be.true;
    expect(block2.calledTwice).to.be.true;
    expect(block2.getCall(1).calledWith('show')).to.be.true;
    expect(block1.getCall(1).calledWith('hide')).to.be.true;
  });

  it('should handle unknown routes', () => {
    const block = sinon.spy();

    router.use('/route', block);
    router.start();
    router.go('/unknown');

    expect(block.called).to.be.false;
  });
});
