"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;

var _server = require("react-dom/server");

var _styledComponents = require("styled-components");

function template(el, state) {
  var sheet = new _styledComponents.ServerStyleSheet();
  var html = (0, _server.renderToString)(sheet.collectStyles(el));
  var styleTags = sheet.getStyleTags();
  return "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <meta name=\"description\" content=\"Cinema viewier with rating and hiding ability\">\n    <title>Cinema Viewer</title>\n    ".concat(styleTags, "\n  </head>\n  <body>\n    <div id=\"root\">").concat(html, "</div>\n    <script>\n      window.__PRELOADED_STATE__ = ").concat(JSON.stringify(state), ";\n    </script>\n    <script src=\"/assets/bundle.js\"></script>\n  </body>\n</html>");
}