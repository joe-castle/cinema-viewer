"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

function ensureAuthenticated(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).send('This actions requires authentication, please login and try again');
}