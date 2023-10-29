import sinon from 'sinon';
import { expect } from 'chai';
import { HTTPTransport, METHODS } from '../HTTPTransport';
import { BASE_URL } from '../constants/baseURL';
import { testErrors } from '../constants/testErrors';

describe('HTTPTransport', () => {
  it('Checking corretly builded query string', async () => {
    const http = new HTTPTransport('/test');
    const stub = sinon.stub(http, 'request').resolves();
    const method = METHODS.GET;

    await http.get('', { data: { a: 123, b: 'abc' } });

    const correctPath = `${BASE_URL}/test?a=123&b=abc`;
    expect(stub.calledWithMatch(correctPath, { method }));
  });

  it('Must return error on try to get user info', async () => {
    const http = new HTTPTransport('/auth');

    await http.get('/user', {})
      .catch((error) => {
        const errorMessage = error.message.toString();
        expect(errorMessage).to.equal(testErrors.BAD_COOKIE);
      });
  });

  it('Must return error on try to login with wrong data', async () => {
    const http = new HTTPTransport('/auth');

    await http.post('/signin', {})
      .catch((error) => {
        const errorMessage = error.message.toString();
        expect(errorMessage).to.equal(testErrors.EMPTY_LOGIN);
      });
  });
});
