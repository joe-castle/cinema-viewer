"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowtimesHeader = exports.Synopsis = exports.Icon = exports.ReleaseDate = exports.Title = exports.TrailerModal = exports.PlayIcon = exports.Poster = exports.PosterWrapper = exports.RowCenter = void 0;

var _reactstrap = require("reactstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var RowCenter = (0, _styledComponents.default)(_reactstrap.Row).withConfig({
  displayName: "Film__RowCenter",
  componentId: "gtxq6n-0"
})(["text-align:center;"]);
exports.RowCenter = RowCenter;

var PosterWrapper = _styledComponents.default.div.withConfig({
  displayName: "Film__PosterWrapper",
  componentId: "gtxq6n-1"
})(["color:rgba(255,255,255,0.6);position:relative;transition:color ease-in 0.1s;&:hover{color:white;cursor:pointer;}"]);

exports.PosterWrapper = PosterWrapper;

var Poster = _styledComponents.default.img.withConfig({
  displayName: "Film__Poster",
  componentId: "gtxq6n-2"
})(["width:100%;"]);

exports.Poster = Poster;

var PlayIcon = _styledComponents.default.span.attrs({
  className: 'oi oi-play-circle'
}).withConfig({
  displayName: "Film__PlayIcon",
  componentId: "gtxq6n-3"
})(["position:absolute;left:calc(50% - 0.5em);top:calc(50% - 0.5em);font-size:8em;"]);

exports.PlayIcon = PlayIcon;
var TrailerModal = (0, _styledComponents.default)(_reactstrap.Modal).withConfig({
  displayName: "Film__TrailerModal",
  componentId: "gtxq6n-4"
})(["max-width:", "px;& .modal-content{background:none;border:none;}"], function (_ref) {
  var width = _ref.width;
  return width;
});
exports.TrailerModal = TrailerModal;

var Title = _styledComponents.default.h1.withConfig({
  displayName: "Film__Title",
  componentId: "gtxq6n-5"
})(["margin-bottom:0;"]);

exports.Title = Title;

var ReleaseDate = _styledComponents.default.sub.withConfig({
  displayName: "Film__ReleaseDate",
  componentId: "gtxq6n-6"
})(["font-weight:bold;font-style:italic;"]);

exports.ReleaseDate = ReleaseDate;

var Icon = _styledComponents.default.span.attrs(function (_ref2) {
  var type = _ref2.type,
      icon = _ref2.icon;
  return {
    id: "icon-".concat(type),
    className: "oi oi-".concat(icon)
  };
}).withConfig({
  displayName: "Film__Icon",
  componentId: "gtxq6n-7"
})(["color:", ";font-size:2em;transition:color ease-in .1s;&:not(:first-child){margin-left:.5em;}&:hover{cursor:pointer;color:", "}"], function (_ref3) {
  var favourite = _ref3.favourite,
      hiddenIcon = _ref3.hiddenIcon;
  return favourite ? 'red' : hiddenIcon ? 'green' : '';
}, function (_ref4) {
  var favourite = _ref4.favourite,
      hiddenIcon = _ref4.hiddenIcon;
  return favourite ? 'rgba(255,0,0,.5)' : hiddenIcon ? 'rgba(0,128,0,.5)' : 'rgba(0,0,0,.5)';
});

exports.Icon = Icon;

var Synopsis = _styledComponents.default.p.withConfig({
  displayName: "Film__Synopsis",
  componentId: "gtxq6n-8"
})(["margin-top:1.5em;"]);

exports.Synopsis = Synopsis;

var ShowtimesHeader = _styledComponents.default.h2.withConfig({
  displayName: "Film__ShowtimesHeader",
  componentId: "gtxq6n-9"
})(["border-bottom:3px solid rgba(0,0,0,0.5);margin-top:2em;"]);

exports.ShowtimesHeader = ShowtimesHeader;