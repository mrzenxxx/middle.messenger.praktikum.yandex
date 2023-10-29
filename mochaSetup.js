import { JSDOM } from 'jsdom';
import { XMLHttpRequest } from 'node-xmlhttprequest';

const jsdom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>');

global.XMLHttpRequest = XMLHttpRequest;
global.window = jsdom.window;
global.history = jsdom.window.history;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.XMLHttpRequest = XMLHttpRequest;
