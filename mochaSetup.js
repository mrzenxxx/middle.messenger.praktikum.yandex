import { JSDOM } from 'jsdom';
import { expect } from 'chai';

const jsdom = new JSDOM('<body></body>');

global.expect = expect;
global.window = jsdom.window;
global.document = jsdom.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
