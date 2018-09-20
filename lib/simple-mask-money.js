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
        var hasDecimalSeparator = false;
        var retorno = '';

        for (var i = 0; i < value.length; i++) {
          if (isFinite(value[i])) retorno += value[i];
          if (!hasDecimalSeparator && value[i] === this.args.decimalSeparator) {
            retorno += value[i].replace(this.args.decimalSeparator, '.');
            hasDecimalSeparator = true;
          }
        }

        return retorno;
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
      key: 'addingCompleterFromStart',
      value: function addingCompleterFromStart(value, completer) {
        while (value.length < this.args.fractionDigits) {
          value = '' + completer + value;
        }
        return value;
      }
    }, {
      key: 'addingCompleterFromEnd',
      value: function addingCompleterFromEnd(value, completer) {
        while (value.length < this.args.fractionDigits) {
          value = '' + value + completer;
        }
        return value;
      }
    }, {
      key: 'removingCompleterFromStart',
      value: function removingCompleterFromStart(value, completer) {
        while (value[0] === completer) {
          value = value.replace(completer, '');
        }
        return value;
      }
    }, {
      key: 'removingCompleterFromEnd',
      value: function removingCompleterFromEnd(value, completer) {
        while (value[value.length - 1] === completer) {
          value = value.substring(0, value.length - 1);
        }
        return value;
      }
    }, {
      key: 'addingAutoComplete',
      value: function addingAutoComplete(value) {
        var n = '' + value + this.addingCompleterFromEnd('', '0');
        return n;
      }
    }, {
      key: 'autoComplete',
      value: function autoComplete(value) {
        var regexp = new RegExp('\\' + this.args.decimalSeparator, 'g');
        var array = value.match(regexp) || [];
        if (array.length > 1) {
          value = this.addingAutoComplete(value);
        }
        return value;
      }
    }, {
      key: 'addingDecimalSeparator',
      value: function addingDecimalSeparator(value, completer, separator) {
        var length = value.length - this.args.fractionDigits;

        var regexpFraction = void 0;
        var decimals = '$1';
        var dezenas = completer;
        var character = isFinite(completer) ? 'd' : 'w';

        regexpFraction = (this.isFloat(value) ? '.' : '') + '(\\' + character + '{' + this.args.fractionDigits + '})';

        if (length > 0) {
          regexpFraction = '(\\' + character + '{' + length + '})' + regexpFraction;
          dezenas = decimals;
          decimals = '$2';
        }

        console.log(value.replace(new RegExp(regexpFraction), '' + dezenas + separator + decimals));

        return value.replace(new RegExp(regexpFraction), '' + dezenas + separator + decimals);
      }
    }, {
      key: 'addingHundredsSeparator',
      value: function addingHundredsSeparator(value) {
        var size = value.length - this.args.fractionDigits;
        var hundreds = Math.ceil(size / 3);
        var regexpHundreds = this.isFloat(value) ? '.(\\d)' : '(\\d)';

        var replacement = this.args.decimalSeparator + '$' + (hundreds + 1);

        for (var i = hundreds; i !== 0; i--) {
          if (size >= 3) {
            regexpHundreds = '(\\d{3})' + regexpHundreds;
            size -= 3;
          } else {
            regexpHundreds = '(\\d{' + size + '})' + regexpHundreds;
          }

          if (i > 1) {
            replacement = this.args.thousandsSeparator + '$' + i + replacement;
          } else {
            replacement = '$' + i + replacement;
          }
        }

        return value.replace(new RegExp(regexpHundreds), replacement);
      }
    }, {
      key: 'removeSeparator',
      value: function removeSeparator(value, separator) {
        return value.replace(new RegExp('\\' + separator, 'g'), '');
      }
    }, {
      key: 'formatDecimal',
      value: function formatDecimal(value, completer, separator) {
        value = this.addingCompleterFromStart(value, completer);
        value = this.addingDecimalSeparator(value, completer, separator);
        return value;
      }
    }, {
      key: 'textToNumber',
      value: function textToNumber(input) {
        var retorno = input.toString();
        var completer = this.completer();

        if (this.args.prefix) {
          retorno = this.removingPrefix(retorno);
        }

        if (this.args.suffix) {
          retorno = this.removingSuffix(retorno);
        }

        retorno = this.onlyNumber(retorno);

        if (retorno.indexOf('.') === -1) {
          retorno = this.removingCompleterFromStart(retorno, completer);
        }

        return retorno || (this.args.fixed ? '0' : '');
      }
    }, {
      key: 'numberToText',
      value: function numberToText(input) {
        var retorno = this.emptyOrInvalid();

        if (!isNaN(parseFloat(input))) {
          if (input.length - 1 <= this.args.fractionDigits) {
            retorno = this.formatDecimal(input, this.completer(), this.args.decimalSeparator);
          } else {
            retorno = this.addingHundredsSeparator(input);
          }
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

      _args = new args();
      _core = new core(_args);
      Object.defineProperty(this, 'args', {
        get: function get() {
          return _args;
        },
        set: function set(value) {
          _args = new args(value);
          _core = new core(_args);
        }
      });
      this.formatToNumber = SimpleMaskMoney.formatToNumber;
      this.format = SimpleMaskMoney.format;
      this.setMask = SimpleMaskMoney.setMask;
    }

    _createClass$2(SimpleMaskMoney, null, [{
      key: 'format',
      value: function format(value) {
        var negative = _args.allowNegative && value.indexOf('-') !== -1;
        var formatation = _core.numberToText(_core.textToNumber(value));

        return '' + (!_args.negativeSignAfter && negative ? '-' : '') + formatation + (_args.negativeSignAfter && negative ? '-' : '');
      }
    }, {
      key: 'formatToNumber',
      value: function formatToNumber(input) {
        var retorno = '0';
        var value = _core.textToNumber(input);
        var negative = _args.allowNegative && input.indexOf('-') !== -1;

        if (negative) {
          value.replace('-', '');
        }

        if (!isNaN(parseFloat(value))) {
          if (value.length <= _args.fractionDigits) {
            value = _core.formatDecimal(value, '0', '.');
          } else {
            var lengthWithoutDecimals = value.length - _args.fractionDigits;
            value = value.replace(new RegExp('(\\d{' + lengthWithoutDecimals + '})(\\d{' + _args.fractionDigits + '})'), '$1.$2');
          }

          retorno = value;
        }

        return parseFloat(negative ? retorno * -1 : retorno);
      }
    }, {
      key: 'setMask',
      value: function setMask(element, args$$1) {
        if (typeof document === 'undefined') throw 'This function only works on client side';

        var input = typeof element == 'string' ? document.querySelector(element) : element;

        if (args$$1) {
          SimpleMaskMoney.args = args$$1;
        }

        input.addEventListener('input', function (e) {
          var oldValue = input.value;
          var newValue = SimpleMaskMoney.format(oldValue);
          var caretPosition = implanter.getCaretPosition(input);
          var move = implanter.indexMove(newValue, oldValue);
          var newCaretPosition = caretPosition - move;
          var cursor = SimpleMaskMoney.args.cursor;


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

        input['formatToNumber'] = function () {
          return SimpleMaskMoney.formatToNumber(input.value);
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
