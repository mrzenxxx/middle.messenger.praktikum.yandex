const { JSDOM } = require("jsdom");

const jsdom = new JSDOM('<body></body>');

global.window = jsdom.window;
global.document = jsdom.document;
global.Node = jsdom.window.Node;
