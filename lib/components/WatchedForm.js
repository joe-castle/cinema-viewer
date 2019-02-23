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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _utils = require("../common/utils");

var WatchedForm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(WatchedForm, _Component);

  function WatchedForm(props) {
    var _this;

    (0, _classCallCheck2.default)(this, WatchedForm);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WatchedForm).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (value) {
      return function (ev) {
        _this.setState((0, _defineProperty2.default)({}, value, ev.target.value));
      };
    });
    var date = new Date();
    _this.state = {
      rating: 0,
      format: '2D',
      date: "".concat(date.getFullYear(), "-").concat((0, _utils.zeroPad)(date.getMonth() + 1), "-").concat((0, _utils.zeroPad)(date.getDate())),
      time: (0, _utils.formatTime)(date),
      notes: ''
    };
    return _this;
  }

  (0, _createClass2.default)(WatchedForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          rating = _this$state.rating,
          date = _this$state.date,
          time = _this$state.time,
          notes = _this$state.notes,
          format = _this$state.format;
      return _react.default.createElement(_reactstrap.Form, {
        onSubmit: function onSubmit(ev) {
          return _this2.props.submitForm(ev, _this2.state);
        }
      }, _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
        for: "rating"
      }, "Rating:"), _react.default.createElement(_reactstrap.Input, {
        type: "number",
        min: "0",
        max: "100",
        name: "rating",
        value: rating,
        onChange: this.handleChange('rating')
      })), _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
        for: "format"
      }, "format:"), _react.default.createElement(_reactstrap.Input, {
        type: "select",
        name: "format",
        value: format,
        onChange: this.handleChange('format')
      }, _react.default.createElement("option", null, "2D"), _react.default.createElement("option", null, "3D"), _react.default.createElement("option", null, "IMAX"), _react.default.createElement("option", null, "IMAX 3D"), _react.default.createElement("option", null, "4DX"), _react.default.createElement("option", null, "4DX 3D"))), _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, {
        md: 6
      }, _react.default.createElement(_reactstrap.Label, {
        for: "date"
      }, "Date:"), _react.default.createElement(_reactstrap.Input, {
        type: "date",
        name: "date",
        value: date,
        onChange: this.handleChange('date')
      })), _react.default.createElement(_reactstrap.Col, {
        md: 6
      }, _react.default.createElement(_reactstrap.Label, {
        for: "time"
      }, "Date:"), _react.default.createElement(_reactstrap.Input, {
        type: "time",
        name: "time",
        value: time,
        onChange: this.handleChange('time')
      })))), _react.default.createElement(_reactstrap.FormGroup, null, _react.default.createElement(_reactstrap.Label, {
        for: "notes"
      }, "Notes:"), _react.default.createElement(_reactstrap.Input, {
        type: "textarea",
        name: "notes",
        value: notes,
        onChange: this.handleChange('notes')
      })), _react.default.createElement(_reactstrap.Button, {
        type: "submit",
        color: "success"
      }, "Submit"));
    }
  }]);
  return WatchedForm;
}(_react.Component);

var _default = WatchedForm;
exports.default = _default;