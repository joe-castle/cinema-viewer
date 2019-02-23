"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactstrap = require("reactstrap");

var _FilmGroup = require("./styled/FilmGroup");

var _BadgeWrapper = _interopRequireDefault(require("./BadgeWrapper"));

var FilmGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FilmGroup, _Component);

  function FilmGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FilmGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FilmGroup).call(this, props));
    _this.state = {
      collapse: props.collapse
    };
    return _this;
  }

  (0, _createClass2.default)(FilmGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          films = _this$props.films,
          title = _this$props.title,
          user = _this$props.user;
      return _react.default.createElement(_react.default.Fragment, null, title && _react.default.createElement(_FilmGroup.Title, null, _react.default.createElement("h2", {
        onClick: function onClick() {
          _this2.setState(function (state) {
            return {
              collapse: !state.collapse
            };
          });
        }
      }, title), _react.default.createElement("span", {
        className: "oi oi-caret-".concat(this.state.collapse ? 'bottom' : 'top')
      })), _react.default.createElement(_reactstrap.Collapse, {
        isOpen: !this.state.collapse
      }, _react.default.createElement(_reactstrap.Row, null, films.map(function (film) {
        return _react.default.createElement(_reactstrap.Col, {
          className: "mb-4",
          lg: 2,
          md: 3,
          sm: 4,
          xs: 6,
          key: film._id
        }, _react.default.createElement(_FilmGroup.LinkCustom, {
          to: "/films/".concat(film._id)
        }, _react.default.createElement(_FilmGroup.CardCustom, null, _react.default.createElement(_reactstrap.CardImg, {
          top: true,
          src: film.poster
        }), _react.default.createElement(_reactstrap.CardBody, {
          className: "d-flex flex-column"
        }, _react.default.createElement(_reactstrap.CardTitle, {
          className: "font-weight-bold",
          tag: "h5"
        }, film.title), _react.default.createElement(_reactstrap.CardSubtitle, {
          className: "mb-2",
          tag: "small"
        }, new Date(film.releaseDate).toDateString()), user && _react.default.createElement(_BadgeWrapper.default, {
          film: film
        })))));
      }))));
    }
  }]);
  return FilmGroup;
}(_react.Component);

(0, _defineProperty2.default)(FilmGroup, "propTypes", {
  films: _propTypes.default.arrayOf(_propTypes.default.shape({
    _id: _propTypes.default.string,
    title: _propTypes.default.string,
    dateAdded: _propTypes.default.string,
    edis: _propTypes.default.arrayOf(_propTypes.default.string),
    poster: _propTypes.default.string,
    showtimes: _propTypes.default.object,
    unlimited: _propTypes.default.bool,
    url: _propTypes.default.string,
    user_data: _propTypes.default.shape({
      _id: _propTypes.default.string,
      film_id: _propTypes.default.string,
      user_id: _propTypes.default.string,
      favourite: _propTypes.default.bool,
      ignored: _propTypes.default.bool,
      watched: _propTypes.default.shape({
        rating: _propTypes.default.number,
        format: _propTypes.default.string,
        date_went: _propTypes.default.string,
        notes: _propTypes.default.string
      })
    })
  }))
});
var _default = FilmGroup;
exports.default = _default;