"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchFilms;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _xml2js = require("xml2js");

var _films = require("../data/models/films");

var _utils = require("../common/utils");

var YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

function processTitle(title) {
  var matchedTitle = title.match(/^(?:\((.+?)\))? ?(.+)/);
  return matchedTitle && matchedTitle[1] ? matchedTitle[1] : '2D';
}

function parseXml(xml) {
  return new Promise(function (resolve, reject) {
    (0, _xml2js.parseString)(xml, function (err, results) {
      if (err) reject(err);else resolve(results);
    });
  });
}

function fetchFilms() {
  return _fetchFilms.apply(this, arguments);
}

function _fetchFilms() {
  _fetchFilms = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var _ref, _ref2, films, listings, existingFilms, filmsXml, listingsXml, parsedFilms, parsedListings, processedFilms, expiredFilms, newFilms, trailers;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios.default.all([_axios.default.get('https://www.cineworld.co.uk/syndication/film_times.xml'), _axios.default.get('https://www.cineworld.co.uk/syndication/listings.xml')]);

          case 3:
            _ref = _context.sent;
            _ref2 = (0, _slicedToArray2.default)(_ref, 2);
            films = _ref2[0];
            listings = _ref2[1];
            _context.next = 9;
            return (0, _films.getAllFilms)();

          case 9:
            existingFilms = _context.sent;
            _context.next = 12;
            return parseXml(films.data);

          case 12:
            filmsXml = _context.sent;
            _context.next = 15;
            return parseXml(listings.data);

          case 15:
            listingsXml = _context.sent;
            parsedFilms = filmsXml.relatedData.row.filter(function (row) {
              return row.$.key === '104';
            }).map(function (_ref3) {
              var column = _ref3.column;
              return column.reduce(function (prev, curr) {
                return (0, _objectSpread6.default)({}, prev, (0, _defineProperty2.default)({}, curr.$.name, curr._));
              }, {});
            }).reduce(function (prev, curr) {
              return (0, _objectSpread6.default)({}, prev, (0, _defineProperty2.default)({}, curr.edi, curr));
            }, {});
            parsedListings = listingsXml.cinemas.cinema.filter(function (cinema) {
              return cinema.$.id === '104';
            }).reduce(function (prev, curr) {
              return [].concat((0, _toConsumableArray2.default)(prev), (0, _toConsumableArray2.default)(curr.listing[0].film));
            }, []).map(function (film) {
              return (0, _objectSpread6.default)({}, film.$, {
                showtimes: film.shows[0].show.reduce(function (prev, curr) {
                  var date = (0, _utils.formatDate)(new Date(curr.$.time));
                  return (0, _objectSpread6.default)({}, prev, (0, _defineProperty2.default)({}, date, [].concat((0, _toConsumableArray2.default)(prev[date] || []), [(0, _objectSpread6.default)({}, curr.$, {
                    time: new Date(curr.$.time)
                  })])));
                }, {})
              });
            });
            processedFilms = [];
            parsedListings.forEach(function (film) {
              var format = processTitle(film.title);
              var existingFilm = processedFilms.find(function (found) {
                return found.title === parsedFilms[film.edi].Title;
              });

              if (existingFilm) {
                if (existingFilm.showtimes) {
                  existingFilm.showtimes[format] = film.showtimes;
                }

                existingFilm.edis && existingFilm.edis.push(film.edi);
              } else {
                processedFilms.push({
                  edis: [film.edi],
                  title: parsedFilms[film.edi].Title,
                  synopsis: parsedFilms[film.edi].synopsis,
                  releaseDate: new Date(film.release.replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$2/$1')),
                  poster: "https://www.cineworld.co.uk".concat(parsedFilms[film.edi].poster),
                  url: "https://www.cineworld.co.uk".concat(film.url),
                  unlimited: /unlimited/gi.test(parsedFilms[film.edi].Title),
                  showtimes: (0, _defineProperty2.default)({}, format, film.showtimes)
                });
              }
            });
            expiredFilms = existingFilms.filter(function (film) {
              return film.showtimes && !processedFilms.find(function (processed) {
                return processed.title === film.title;
              });
            }).map(function (film) {
              return Object.keys(film).filter(function (key) {
                return key !== '_id' && key !== 'dateAdded';
              }).reduce(function (prev, curr) {
                return (0, _objectSpread6.default)({}, prev, (0, _defineProperty2.default)({}, curr, curr === 'showtimes' ? null : film[curr]));
              }, {});
            });
            newFilms = processedFilms.filter(function (processed) {
              return !existingFilms.find(function (film) {
                return film.title === processed.title;
              });
            });
            _context.next = 24;
            return _axios.default.all(newFilms.map(function (film) {
              return _axios.default.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=".concat(encodeURIComponent("".concat(film.title, " trailer")), "&maxResults=1&key=").concat(YOUTUBE_API_KEY));
            }));

          case 24:
            _context.t0 = function (trailer) {
              return trailer.data;
            };

            trailers = _context.sent.map(_context.t0);
            newFilms = newFilms.map(function (film, index) {
              return (0, _objectSpread6.default)({}, film, {
                trailer: "https://www.youtube.com/watch?v=".concat(trailers[index].items[0].id.videoId)
              });
            });
            (0, _films.insertOrUpdateMultipleFilms)([].concat((0, _toConsumableArray2.default)(expiredFilms), (0, _toConsumableArray2.default)(newFilms), (0, _toConsumableArray2.default)(processedFilms.filter(function (processed) {
              return !expiredFilms.find(function (film) {
                return film.title === processed.title;
              }) && !newFilms.find(function (film) {
                return film.title === processed.title;
              });
            }))), function (film) {
              return {
                $set: film,
                $setOnInsert: {
                  dateAdded: new Date()
                }
              };
            });
            return _context.abrupt("return", {
              expiredFilms: expiredFilms,
              newFilms: newFilms,
              trailers: trailers,
              processedFilms: processedFilms
            });

          case 31:
            _context.prev = 31;
            _context.t1 = _context["catch"](0);
            console.log('Error whilst fetching films: ', _context.t1.message, '\n', _context.t1.stack);
            return _context.abrupt("return", {
              error: _context.t1.message
            });

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 31]]);
  }));
  return _fetchFilms.apply(this, arguments);
}