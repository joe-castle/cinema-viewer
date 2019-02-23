"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reactYoutube = _interopRequireDefault(require("react-youtube"));

var _Film = require("./styled/Film");

var _Showtimes = _interopRequireDefault(require("./Showtimes"));

var _Watched = _interopRequireDefault(require("./Watched"));

var _WatchedForm = _interopRequireDefault(require("./WatchedForm"));

var _utils = require("../common/utils");

var Film =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Film, _Component);

  function Film(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Film);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Film).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "resize", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "favourite", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hidden", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "toggle", function () {
      _this.setState(function (prevState) {
        return {
          modal: !prevState.modal
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "createIconEvent", function (type) {
      // return () => {
      //   this.props.updateFlag(this.createBody({ [type]: !checkUserData(this.props.film, type) }))
      // }
      return (0, _rxjs.fromEvent)(document.getElementById("icon-".concat(type)), 'click').pipe((0, _operators.map)(function () {
        return _this.createBody((0, _defineProperty2.default)({}, type, !(0, _utils.checkUserData)(_this.props.film, type)));
      }), (0, _operators.tap)(function (body) {
        return _this.props.updateFilm(body);
      }), (0, _operators.debounceTime)(500)).subscribe(function (body) {
        _this.props.update(body);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "createBody", function (data) {
      return (0, _objectSpread2.default)({
        _id: _this.props.film._id
      }, data);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "submitForm", function (ev, state) {
      ev.preventDefault();
      var rating = state.rating,
          date = state.date,
          time = state.time,
          format = state.format,
          notes = state.notes;

      _this.props.update(_this.createBody({
        watched: {
          rating: rating,
          format: format,
          dateTime: new Date("".concat(date, " ").concat(time)),
          notes: notes
        }
      }));

      _this.setState({
        watchedForm: false
      });
    });
    var _state = {
      modal: false,
      width: '640',
      height: '320',
      watchedForm: false
    };

    try {
      _this.state = (0, _objectSpread2.default)({}, _state, (0, _utils.calculateDimensions)(window.innerWidth));
    } catch (_unused) {
      _this.state = _state;
    }

    return _this;
  }

  (0, _createClass2.default)(Film, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          film = _this$props.film,
          user = _this$props.user,
          update = _this$props.update;
      this.resize = (0, _rxjs.fromEvent)(window, 'resize').pipe((0, _operators.debounceTime)(500), (0, _operators.pluck)('target', 'innerWidth')).subscribe(function (width) {
        _this2.setState((0, _utils.calculateDimensions)(width));
      });
      this.favourite = this.createIconEvent('favourite');
      this.hidden = this.createIconEvent('hidden'); // Once viewied, remove new flag from film. Assuming signed in.

      if (user && film && (0, _utils.notCheckUserData)(film, function (ud) {
        return ud.new !== false;
      })) {
        update(this.createBody({
          new: false
        }));
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.resize && this.resize.unsubscribe();
      this.favourite && this.favourite.unsubscribe();
      this.hidden && this.hidden.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          film = _this$props2.film,
          match = _this$props2.match;
      var _this$state = this.state,
          width = _this$state.width,
          height = _this$state.height,
          watchedForm = _this$state.watchedForm;
      return !film ? _react.default.createElement("h1", null, "Unable to find film with id: ", match.params.id) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
        lg: {
          size: 4,
          offset: 0
        },
        md: {
          size: 6,
          offset: 3
        },
        sm: {
          size: 8,
          offset: 2
        }
      }, _react.default.createElement(_Film.PosterWrapper, {
        onClick: function onClick(ev) {
          return _this3.toggle;
        }
      }, _react.default.createElement(_Film.Poster, {
        src: film.poster
      }), _react.default.createElement(_Film.PlayIcon, null))), _react.default.createElement(_reactstrap.Col, {
        lg: 8
      }, _react.default.createElement(_Film.Title, null, film.title), _react.default.createElement(_Film.ReleaseDate, null, "Release Date: ", new Date(film.dateAdded).toDateString()), _react.default.createElement("div", {
        className: "mt-3"
      }, _react.default.createElement(_Film.Icon, {
        type: "favourite",
        icon: "heart",
        title: "Favourite film",
        favourite: (0, _utils.checkUserData)(film, 'favourite')
      }), _react.default.createElement(_Film.Icon, {
        type: "hidden",
        icon: "eye",
        title: "Visible in available",
        hiddenIcon: !(0, _utils.checkUserData)(film, 'hidden')
      })), _react.default.createElement(_Film.Synopsis, null, film.synopsis), (0, _utils.checkUserData)(film, 'watched') && _react.default.createElement(_Watched.default, {
        watched: film.userData.watched
      }), watchedForm && _react.default.createElement(_WatchedForm.default, {
        submitForm: this.submitForm
      }), !watchedForm && !(0, _utils.notCheckUserData)(film, 'watched') && _react.default.createElement(_reactstrap.Button, {
        onClick: function onClick() {
          return _this3.setState({
            watchedForm: true
          });
        },
        color: "success"
      }, "Watched!"))), film.showtimes && _react.default.createElement(_Film.RowCenter, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_Film.ShowtimesHeader, null, "Showtimes"))), film.showtimes && _react.default.createElement(_Showtimes.default, {
        showtimes: film.showtimes
      }), _react.default.createElement(_Film.TrailerModal, {
        width: width,
        isOpen: this.state.modal,
        toggle: this.toggle,
        centered: true
      }, _react.default.createElement(_reactYoutube.default, {
        opts: {
          width: width,
          height: height
        },
        videoId: film.trailer && film.trailer.slice(film.trailer.indexOf('=') + 1, film.trailer.length)
      })));
    }
  }]);
  return Film;
}(_react.Component);

var _default = Film;
exports.default = _default;