"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _root = require("react-hot-loader/root");

var _reactRouterDom = require("react-router-dom");

var _reactstrap = require("reactstrap");

var _actions = require("../store/actions");

var _Navigation = _interopRequireDefault(require("./Navigation"));

var _FilmGroup = _interopRequireDefault(require("./FilmGroup"));

var _Film = _interopRequireDefault(require("./Film"));

var _Footer = _interopRequireWildcard(require("./styled/Footer"));

var _utils = require("../common/utils");

function App(_ref) {
  var favourite = _ref.favourite,
      hidden = _ref.hidden,
      available = _ref.available,
      watched = _ref.watched,
      expired = _ref.expired,
      films = _ref.films,
      location = _ref.location,
      user = _ref.user,
      postUpdateFilm = _ref.postUpdateFilm,
      updateFilm = _ref.updateFilm;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Navigation.default, {
    url: location.pathname,
    user: user
  }), _react.default.createElement("main", null, _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    render: function render(props) {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_FilmGroup.default, (0, _extends2.default)({}, props, {
        user: user,
        films: favourite,
        title: "Favourites"
      })), _react.default.createElement(_FilmGroup.default, (0, _extends2.default)({}, props, {
        user: user,
        films: available,
        title: "Available"
      })), _react.default.createElement(_FilmGroup.default, (0, _extends2.default)({}, props, {
        user: user,
        films: hidden,
        title: "Hidden",
        collapse: true
      })));
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/films",
    render: function render(props) {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_FilmGroup.default, (0, _extends2.default)({}, props, {
        user: user,
        films: watched,
        title: "Watched"
      })), _react.default.createElement(_FilmGroup.default, (0, _extends2.default)({}, props, {
        user: user,
        films: expired,
        title: "Expired",
        collapse: true
      })));
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/films/:id",
    render: function render(props) {
      return _react.default.createElement(_Film.default, (0, _extends2.default)({}, props, {
        update: postUpdateFilm,
        updateFilm: updateFilm,
        user: user,
        film: films.find(function (film) {
          return (film._id && film._id.toString()) === props.match.params.id;
        })
      }));
    }
  })))), _react.default.createElement(_Footer.default, null, _react.default.createElement(_Footer.CopyrightText, null, "\xA9 Joe Smith 2019")));
}

function mapStateToProps(_ref2) {
  var films = _ref2.films,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["films"]);
  return (0, _objectSpread2.default)({}, props, {
    user: props.user && props.user.name ? props.user : null,
    favourite: films.filter(function (film) {
      return (0, _utils.checkUserData)(film, 'favourite');
    }),
    available: films.filter(function (film) {
      return film.showtimes && (0, _utils.notCheckUserData)(film, '!favourite', '!hidden', '!watched');
    }),
    hidden: films.filter(function (film) {
      return film.showtimes && (0, _utils.checkUserData)(film, '!favourite', 'hidden', '!watched');
    }),
    watched: films.filter(function (film) {
      return (0, _utils.checkUserData)(film, 'watched');
    }),
    expired: films.filter(function (film) {
      return !film.showtimes && (0, _utils.checkUserData)(film, '!watched');
    }),
    films: films
  });
}

var _default = (0, _root.hot)((0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, _actions.actions)(App)));

exports.default = _default;