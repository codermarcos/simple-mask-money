(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SimpleMaskMoney = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var args = function () {
    function Args(args) {
      _classCallCheck(this, Args);

      this.allowNegative = false;
      this.negativeSignAfter = false;
      this.decimalSeparator = ',';
      this.fixed = true;
      this.fractionDigits = 2;
      this.prefix = '';
      this.suffix = '';
      this.thousandsSeparator = '.';
      this.cursor = 'move';

      this.merge(args);
    }

    _createClass(Args, [{
      key: 'merge',
      value: function merge(args) {
        if (!args || (typeof args === 'undefined' ? 'undefined' : _typeof(args)) !== 'object') return;

        this.fixed = typeof args.fixed === 'boolean' ? args.fixed : this.fixed;
        this.allowNegative = typeof args.allowNegative === 'boolean' ? args.allowNegative : this.allowNegative;
        this.negativeSignAfter = typeof args.negativeSignAfter === 'boolean' ? args.negativeSignAfter : this.negativeSignAfter;

        this.decimalSeparator = typeof args.decimalSeparator === 'undefined' ? this.decimalSeparator : args.decimalSeparator;
        this.fractionDigits = typeof args.fractionDigits === 'undefined' ? this.fractionDigits : args.fractionDigits;
        this.prefix = typeof args.prefix === 'undefined' ? this.prefix : args.prefix;
        this.suffix = typeof args.suffix === 'undefined' ? this.suffix : args.suffix;
        this.thousandsSeparator = typeof args.thousandsSeparator === 'undefined' ? this.thousandsSeparator : args.thousandsSeparator;
        this.cursor = typeof args.cursor === 'undefined' ? this.cursor : args.cursor;
      }
    }]);

    return Args;
  }();

  var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


  var core = function () {
    function Core(args$$1) {
      _classCallCheck$1(this, Core);

      this.args = new args(args$$1);
    }

    _createClass$1(Core, [{
      key: 'isFloat',
      value: function isFloat(number) {
        return number % 1 !== 0;
      }
    }, {
      key: 'completer',
      value: function completer() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        return this.args.fixed ? ''.padEnd(size, '0') : ''.padEnd(size, '_');
      }
    }, {
      key: 'emptyOrInvalid',
      value: function emptyOrInvalid() {
        return '' + this.completer() + this.args.decimalSeparator + this.completer(this.args.fractionDigits);
      }
    }, {
      key: 'onlyNumber',
      value: function onlyNumber(value) {
        var hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
        var putDecimalSeparator = false;
        var retorno = '';

        for (var i = value.length - 1; i >= 0; i--) {
          if (isFinite(value[i])) {
            retorno = value[i] + retorno;
          } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator) {
            retorno = value[i].replace(this.args.decimalSeparator, '.') + retorno;
            putDecimalSeparator = true;
          }
        }

        return retorno[0] === '.' ? '0' + retorno : retorno;
      }
    }, {
      key: 'addingPrefix',
      value: function addingPrefix(value) {
        return '' + this.args.prefix + value;
      }
    }, {
      key: 'removingPrefix',
      value: function removingPrefix(value) {
        var position = value.indexOf(this.args.prefix, 0);

        if (position !== -1) {
          value = value.substring(this.args.prefix.length, value.length);
        }

        return value;
      }
    }, {
      key: 'addingSuffix',
      value: function addingSuffix(value) {
        return '' + value + this.args.suffix;
      }
    }, {
      key: 'removingSuffix',
      value: function removingSuffix(value) {
        var position = value.indexOf(this.args.suffix, value.length - this.args.suffix.length);

        if (position !== -1) {
          var start = value.substring(0, position);
          value = start + value.substring(start.length + this.args.suffix.length - 1, value.length - 1);
        }

        return value;
      }
    }, {
      key: 'addingCompleter',
      value: function addingCompleter(value, completer, length) {
        var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        while (value.length < length) {
          value = start ? '' + completer + value : '' + value + completer;
        }

        return value;
      }
    }, {
      key: 'removingCompleter',
      value: function removingCompleter(value, completer) {
        var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var position = start ? 0 : value.length - 1;

        while (value[position] === completer) {
          value = value.substring(0, position - 1) + value.substring(position + 1, value.length);
        }

        return value;
      }
    }, {
      key: 'addingSeparators',
      value: function addingSeparators(value) {
        var size = value.length - this.args.fractionDigits;
        var character = this.args.fixed ? 'd' : 'w';
        var regexp = '\\,?||\\.?(\\' + character + ')';
        var hundreds = Math.ceil(size / 3);

        var replacement = this.args.decimalSeparator + '$' + (hundreds + 1);

        for (var i = hundreds; i !== 0; i--) {
          if (size >= 3) {
            regexp = '(\\' + character + '{3})' + regexp;
            size -= 3;
          } else {
            regexp = '(\\' + character + '{' + size + '})' + regexp;
          }

          if (i > 1) {
            replacement = this.args.thousandsSeparator + '$' + i + replacement;
          } else {
            replacement = '$' + i + replacement;
          }
        }

        return value.replace(new RegExp(regexp), replacement);
      }
    }, {
      key: 'replaceSeparator',
      value: function replaceSeparator(value, separator) {
        var replacer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        return value.replace(new RegExp('\\' + separator, 'g'), replacer);
      }
    }, {
      key: 'adjustDotPosition',
      value: function adjustDotPosition(value) {
        var fractionDigits = void 0;
        var retorno = value.toString();

        retorno = retorno.replace('.', '');
        fractionDigits = retorno.length - this.args.fractionDigits;
        retorno = retorno.substring(0, fractionDigits) + '.' + retorno.substring(fractionDigits);

        return retorno;
      }
    }, {
      key: 'checkNumberStart',
      value: function checkNumberStart(value) {
        var retorno = value.toString();
        return retorno[0] === '.' ? '0' + retorno : retorno;
      }
    }, {
      key: 'textToNumber',
      value: function textToNumber(value, input) {
        var retorno = value.toString();
        var completer = this.completer();

        if (this.args.prefix) {
          retorno = this.removingPrefix(retorno);
        }

        if (this.args.suffix) {
          retorno = this.removingSuffix(retorno);
        }

        retorno = this.onlyNumber(retorno);

        if (retorno) {
          if (input) {
            retorno = this.adjustDotPosition(retorno);
          }

          retorno = this.removingCompleter(retorno, completer);

          retorno = this.checkNumberStart(retorno);
        }

        return retorno || (this.args.fixed ? '0' : '');
      }
    }, {
      key: 'numberToText',
      value: function numberToText(value, input) {
        var retorno = this.emptyOrInvalid();
        value = this.replaceSeparator(value.toString(), this.args.decimalSeparator, '.');

        if (!isNaN(parseFloat(value))) {
          if (this.isFloat(value)) {
            var number = value.split('.');
            var hundreds = number[0];
            var decimals = number[1];

            decimals = this.addingCompleter(decimals || '', this.completer(), this.args.fractionDigits, false);

            retorno = '' + hundreds + decimals;
          } else {
            retorno = this.replaceSeparator(value, '.');
            retorno = this.addingCompleter(retorno || '', this.completer(), this.args.fractionDigits);
            retorno = this.args.fractionDigits >= retorno.length ? '' + this.completer() + retorno : retorno;
          }

          retorno = this.addingSeparators(retorno);
        }

        if (this.args.prefix) {
          retorno = this.addingPrefix(retorno);
        }
        if (this.args.suffix) {
          retorno = this.addingSuffix(retorno);
        }

        return retorno;
      }
    }]);

    return Core;
  }();

  var implanter = {
    getCaretPosition: function getCaretPosition(input) {
      var position = -1;
      if ('selectionStart' in input) {
        position = input.selectionStart;
      } else if (document.selection) {
        input.focus();
        var range = document.selection.createRange();
        var length = document.selection.createRange().text.length;
        range.moveStart('character', -input.value.length);
        position = range.text.length - length;
      }
      return position;
    },
    setCaretPosition: function setCaretPosition(input, index) {
      if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(index, index);
      } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', index);
        range.moveStart('character', index);
        range.select();
      }
    },
    indexMove: function indexMove(newValue, oldValue) {
      var move = void 0;
      switch (true) {
        case oldValue.length < newValue.length:
          move = -1;
          break;
        case oldValue.length > newValue.length:
          move = 1;
          break;
        default:
          move = 0;
          break;
      }
      return move;
    }
  };

  var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





  var _args = new args();
  var _core = new core(_args);

  var src = function () {
    function SimpleMaskMoney() {
      _classCallCheck$2(this, SimpleMaskMoney);
    }

    _createClass$2(SimpleMaskMoney, null, [{
      key: 'format',
      value: function format(value, args$$1) {
        var isInput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var core$$1 = void 0;
        if (typeof args$$1 !== 'undefined') {
          args$$1 = new args(args$$1);
          core$$1 = new core(args$$1);
        } else {
          args$$1 = _args;
          core$$1 = _core;
        }

        var negative = args$$1.allowNegative && value.indexOf('-') !== -1;
        var formatation = core$$1.numberToText(core$$1.textToNumber(value, isInput));

        return '' + (!args$$1.negativeSignAfter && negative ? '-' : '') + formatation + (args$$1.negativeSignAfter && negative ? '-' : '');
      }
    }, {
      key: 'formatToNumber',
      value: function formatToNumber(input, args$$1) {
        var value = input.toString();
        var retorno = '0';
        var core$$1 = void 0;
        if (typeof args$$1 !== 'undefined') {
          args$$1 = new args(args$$1);
          core$$1 = new core(args$$1);
        } else {
          args$$1 = _args;
          core$$1 = _core;
        }

        var negative = args$$1.allowNegative && value.indexOf('-') !== -1;

        if (negative) {
          value = value.replace('-', '');
        }

        value = core$$1.textToNumber(value);
        if (!isNaN(parseFloat(value))) {
          retorno = value;
        }

        return parseFloat(negative ? retorno * -1 : retorno);
      }
    }, {
      key: 'setMask',
      value: function setMask(element, args$$1) {
        if (typeof document === 'undefined') throw 'This function only works on client side';

        var input = typeof element == 'string' ? document.querySelector(element) : element;
        input.maskArgs = args$$1 || SimpleMaskMoney.args;

        input.addEventListener('input', function (e) {
          var oldValue = input.value;
          var newValue = SimpleMaskMoney.format(oldValue, input.maskArgs, true);
          var caretPosition = implanter.getCaretPosition(input);
          var move = implanter.indexMove(newValue, oldValue);
          var newCaretPosition = caretPosition - move;
          var cursor = input.maskArgs.cursor;


          if (cursor === 'start') {
            newCaretPosition = 0;
          } else if (cursor === 'end') {
            newCaretPosition = newValue.length;
          }

          input.value = newValue;
          input._value = newValue;

          implanter.setCaretPosition(input, newCaretPosition);

          !(e instanceof Event) && input.dispatchEvent(new Event('input'));
        });

        input.formatToNumber = function () {
          return SimpleMaskMoney.formatToNumber(input.value, input.maskArgs);
        };

        return input;
      }
    }, {
      key: 'args',
      get: function get() {
        return _args;
      },
      set: function set(value) {
        _args = new args(value);
        _core = new core(_args);
      }
    }]);

    return SimpleMaskMoney;
  }();

  return src;

})));
//# sourceMappingURL=simple-mask-money.js.map
