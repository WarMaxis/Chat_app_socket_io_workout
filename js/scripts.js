(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = io('http://10.0.1.118:1337');

exports.default = socket;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('../base/socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function Chat() {
    _classCallCheck(this, Chat);

    console.log(_socket2.default);

    var inputLogin = document.getElementById('login'),
        sendLogin = document.getElementById('send-login'),
        inputMessage = document.getElementById('message'),
        sendMessage = document.getElementById('send-message'),
        messages = document.getElementById('messages'),
        userLogin = '';

    inputMessage.style.display = "none";
    sendMessage.style.display = "none";

    sendLogin.addEventListener('click', function () {
        userLogin = inputLogin.value;

        _socket2.default.emit('client-login', {
            user: userLogin
        });

        _socket2.default.emit('client-get-history', {
            limit: '10'
        });

        _socket2.default.on('server-message', function (object) {
            console.log(object);
            for (var i = 0; i < 10; i++) {
                messages.innerHTML = messages.innerHTML + object.messages[i].author + '    ' + object.messages[i].message + '<br><br>';
            }
        });

        inputMessage.style.display = "block";
        sendMessage.style.display = "block";
    });

    sendMessage.addEventListener('click', function () {
        var userMessage = inputMessage.value;

        _socket2.default.emit('client-message', {
            author: userLogin,
            message: userMessage
        });
    });
};

exports.default = Chat;

},{"../base/socket":1}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chat = require('./components/chat');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.init();
    }

    _createClass(App, [{
        key: 'init',
        value: function init() {
            new _chat2.default();
        }
    }]);

    return App;
}();

document.addEventListener('DOMContentLoaded', function () {
    return new App();
});

},{"./components/chat":2}]},{},[3])


//# sourceMappingURL=scripts.js.map
