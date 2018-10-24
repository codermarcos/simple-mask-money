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
      key: 'onlyNumberInput',
      value: function onlyNumberInput(value) {
        var permitNonFixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
        var completer = this.completer();
        var putDecimalSeparator = false;
        var retorno = '';
        for (var i = value.length - 1; i >= 0; i--) {
          if (isFinite(value[i]) || !this.args.fixed && value[i] === completer) {
            retorno = (isFinite(value[i]) ? value[i] : permitNonFixed ? value[i] : '0') + retorno;
          } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator && retorno.length >= this.args.fractionDigits) {
            retorno = value[i].replace(this.args.decimalSeparator, '.') + retorno;
            putDecimalSeparator = true;
          }
        }

        retorno = this.checkNumberStart(retorno);

        return retorno;
      }
    }, {
      key: 'onlyNumber',
      value: function onlyNumber(value) {
        var permitNonFixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
        var completer = this.completer();
        var putDecimalSeparator = false;
        var retorno = '';
        for (var i = value.length - 1; i >= 0; i--) {
          if (isFinite(value[i]) || !this.args.fixed && value[i] === completer) {
            retorno = (isFinite(value[i]) ? value[i] : permitNonFixed ? value[i] : '0') + retorno;
          } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator) {
            retorno = value[i].replace(this.args.decimalSeparator, '.') + retorno;
            putDecimalSeparator = true;
          }
        }

        retorno = this.checkNumberStart(retorno);

        return retorno;
      }
    }, {
      key: 'isNumberNonFixed',
      value: function isNumberNonFixed(value) {
        return !isNaN(value.replace(new RegExp('\\_', 'g'), ''));
      }
    }, {
      key: 'addingPrefix',
      value: function addingPrefix(value) {
        return '' + this.args.prefix + value;
      }
    }, {
      key: 'removingPrefix',
      value: function removingPrefix(value) {
        if (value.indexOf(this.args.prefix, 0) === -1) return value;
        return value.substring(this.args.prefix.length, value.length);
      }
    }, {
      key: 'addingSuffix',
      value: function addingSuffix(value) {
        return '' + value + this.args.suffix;
      }
    }, {
      key: 'removingSuffix',
      value: function removingSuffix(value) {
        var start = value.length - this.args.suffix.length - 1;
        if (value.indexOf(this.args.suffix, start) === -1) return value;
        return value.substring(0, value.length - this.args.suffix.length - 1);
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

        var retorno = value.toString();
        var position = start ? 0 : retorno.length - 1;

        while (retorno[position] === completer) {
          retorno = retorno.substring(0, position - 1) + retorno.substring(position + 1);
          position = start ? 0 : retorno.length - 1;
        }

        return retorno;
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
        var completer = this.completer();

        switch (retorno[0]) {
          case '.':
            retorno = '' + completer + retorno;
            break;

          case completer:
            retorno = this.removingCompleter(retorno, this.completer());
            retorno = '' + completer + retorno;
            break;
        }

        return retorno;
      }
    }, {
      key: 'textToNumber',
      value: function textToNumber(value, input) {
        var permitNonFixed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var retorno = value.toString();
        var completer = this.completer();

        if (this.args.prefix) {
          retorno = this.removingPrefix(retorno);
        }

        if (this.args.suffix) {
          retorno = this.removingSuffix(retorno);
        }

        retorno = this.onlyNumber(retorno, permitNonFixed);

        if (retorno) {
          if (input && permitNonFixed && retorno.indexOf('.') !== -1) {
            retorno = this.adjustDotPosition(retorno);
          }

          retorno = this.removingCompleter(retorno, completer);

          retorno = this.checkNumberStart(retorno);
        }

        return retorno || (this.args.fixed ? '0' : '');
      }
    }, {
      key: 'numberToText',
      value: function numberToText(value) {
        var retorno = this.emptyOrInvalid();
        value = this.replaceSeparator(value.toString(), this.args.decimalSeparator, '.');

        if (!isNaN(value) || !this.args.fixed && this.isNumberNonFixed(value)) {
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
          retorno = this.checkNumberStart(retorno);
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
        var input = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var _arguments = new args(Object.assign({}, _args, args$$1));
        _core = new core(_arguments);

        var negative = _arguments.allowNegative && value.indexOf('-') !== -1;
        var formatation = _core.numberToText(_core.textToNumber(value, input));

        return '' + (!_arguments.negativeSignAfter && negative ? '-' : '') + formatation + (_arguments.negativeSignAfter && negative ? '-' : '');
      }
    }, {
      key: 'formatToNumber',
      value: function formatToNumber(input, args$$1) {
        var _arguments = new args(Object.assign({}, _args, args$$1));
        _core = new core(_arguments);

        var value = input.toString();
        var retorno = '0';
        var negative = _arguments.allowNegative && value.indexOf('-') !== -1;

        if (negative) {
          value = value.replace('-', '');
        }

        value = _core.textToNumber(value, true, false);
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
        var _arguments = new args(Object.assign({}, _args, args$$1));
        input.maskArgs = _arguments;

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
