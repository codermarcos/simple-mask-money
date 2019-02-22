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

      this.afterFormat = function () {};
      this.allowNegative = false;
      this.beforeFormat = function () {};
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

        this.fractionDigits = typeof args.fractionDigits === 'undefined' || isNaN(args.fractionDigits) ? this.fractionDigits : parseInt(args.fractionDigits);
        this.afterFormat = typeof args.afterFormat === 'function' ? args.afterFormat : this.afterFormat;
        this.beforeFormat = typeof args.beforeFormat === 'function' ? args.beforeFormat : this.beforeFormat;

        this.fixed = typeof args.fixed === 'boolean' ? args.fixed : this.fixed;
        this.allowNegative = typeof args.allowNegative === 'boolean' ? args.allowNegative : this.allowNegative;
        this.negativeSignAfter = typeof args.negativeSignAfter === 'boolean' ? args.negativeSignAfter : this.negativeSignAfter;

        this.decimalSeparator = typeof args.decimalSeparator === 'undefined' ? this.decimalSeparator : args.decimalSeparator;
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
      key: 'addCompleter',
      value: function addCompleter(value, completer, length) {
        var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        while (value.length < length) {
          value = start ? '' + completer + value : '' + value + completer;
        }

        return value;
      }
    }, {
      key: 'addPrefix',
      value: function addPrefix(value) {
        return '' + this.args.prefix + value;
      }
    }, {
      key: 'addSeparators',
      value: function addSeparators(value) {
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
      key: 'addSuffix',
      value: function addSuffix(value) {
        return '' + value + this.args.suffix;
      }
    }, {
      key: 'adjustDotPosition',
      value: function adjustDotPosition(value) {
        var fractionDigits = void 0;
        var result = value.toString();

        result = result.replace('.', '');
        fractionDigits = result.length - this.args.fractionDigits;
        result = result.substring(0, fractionDigits) + '.' + result.substring(fractionDigits);

        return result;
      }
    }, {
      key: 'completer',
      value: function completer() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        return this.args.fixed ? ''.padEnd(size, '0') : ''.padEnd(size, '_');
      }
    }, {
      key: 'checkNumberStart',
      value: function checkNumberStart(value, separator) {
        var result = value.toString();
        return result[0] === separator ? '' + (this.args.fixed ? '0' : '_') + result : result;
      }
    }, {
      key: 'checkSuffix',
      value: function checkSuffix(value) {
        var result = void 0;
        var lastIndex = value.length - 1;
        var lastButOneIndex = lastIndex - 1;
        var currentLastSuffix = value.substring(lastIndex - this.args.suffix.length + 1, lastIndex + this.args.suffix.length);
        var currentLastButOneSuffix = value.substring(lastButOneIndex - this.args.suffix.length + 1, lastButOneIndex + this.args.suffix.length);

        switch (this.args.suffix) {
          case currentLastSuffix:
            result = value;
            break;
          case currentLastButOneSuffix:
            var start = value.substring(0, lastButOneIndex);
            result = '' + start + value.substring(value.length + this.args.suffix.length + 1, lastButOneIndex + this.args.suffix.length) + '.';
            break;
          default:
            result = value.substring(0, lastIndex) + '.';
            break;
        }

        return result;
      }
    }, {
      key: 'emptyOrInvalid',
      value: function emptyOrInvalid() {
        return '' + this.completer() + this.args.decimalSeparator + this.completer(this.args.fractionDigits);
      }
    }, {
      key: 'isFloat',
      value: function isFloat(number) {
        return number % 1 !== 0;
      }
    }, {
      key: 'mask',
      value: function mask(value) {
        var negative = this.args.allowNegative && value.indexOf('-') !== -1;
        var result = '' + (this.writingToNumber(value) || this.emptyOrInvalid());
        result = this.replaceSeparator(result, this.args.decimalSeparator, '.');
        var completer = this.completer();

        if (!isNaN(this.removeCompleter(result, completer))) {
          result = this.replaceSeparator(result, '.');
          result = this.addCompleter(result || '', completer, this.args.fractionDigits);
          result = this.args.fractionDigits >= result.length ? '' + completer + result : result;
          result = this.addSeparators(result);
        }

        if (this.args.prefix) {
          result = this.addPrefix(result);
        }
        if (this.args.suffix) {
          result = this.addSuffix(result);
        }

        return '' + (!this.args.negativeSignAfter && negative ? '-' : '') + result + (this.args.negativeSignAfter && negative ? '-' : '');
      }
    }, {
      key: 'numberToText',
      value: function numberToText(value) {
        var completer = this.completer();
        var result = this.emptyOrInvalid();
        value = this.replaceSeparator(value.toString(), this.args.decimalSeparator, '.');

        if (!isNaN(value)) {
          if (this.isFloat(value)) {
            var number = value.split('.');
            var hundreds = number[0];
            var decimals = number[1];

            decimals = this.addCompleter(decimals || '', completer, this.args.fractionDigits, false);

            result = '' + hundreds + decimals;
          } else {
            result = this.removeCompleter(value, completer);
            result = this.addCompleter(typeof result === 'string' ? result : '', completer, this.args.fractionDigits + result.length, false);
          }

          result = this.addSeparators(result);
          result = this.checkNumberStart(result, this.args.decimalSeparator);
        }

        if (this.args.prefix) {
          result = this.addPrefix(result);
        }
        if (this.args.suffix) {
          result = this.addSuffix(result);
        }

        return result;
      }
    }, {
      key: 'onlyNumber',
      value: function onlyNumber(value) {
        var hasDecimalSeparator = value.toString().indexOf(this.args.decimalSeparator);
        var putDecimalSeparator = false;
        var result = '';

        for (var i = value.length - 1; i >= 0; i--) {
          if (isFinite(value[i]) || !this.args.fixed && value[i] === '_') {
            result = value[i] + result;
          } else if (hasDecimalSeparator !== -1 && !putDecimalSeparator && value[i] === this.args.decimalSeparator) {
            result = value[i].replace(this.args.decimalSeparator, '.') + result;
            putDecimalSeparator = true;
          }
        }

        return result[0] === '.' ? '0' + result : result;
      }
    }, {
      key: 'removeCompleter',
      value: function removeCompleter(value, completer) {
        var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var getPosition = function getPosition() {
          return start ? 0 : value.length - 1;
        };
        var position = getPosition();

        while (value[position] === completer) {
          value = value.substring(0, position - 1) + value.substring(position + 1, value.length);
          position = getPosition();
        }

        return value;
      }
    }, {
      key: 'removePrefix',
      value: function removePrefix(value) {
        var position = value.indexOf(this.args.prefix, 0);

        if (position !== -1) {
          value = value.substring(this.args.prefix.length, value.length);
        }

        return value;
      }
    }, {
      key: 'removeSuffix',
      value: function removeSuffix(value) {
        var position = value.indexOf(this.args.suffix, value.length - this.args.suffix.length);

        if (position !== -1) {
          var start = value.substring(0, position);
          value = start + value.substring(start.length + this.args.suffix.length - 1, value.length - 1);
        }

        return value;
      }
    }, {
      key: 'replaceSeparator',
      value: function replaceSeparator(value, separator) {
        var replacer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        return value.replace(new RegExp('\\' + separator, 'g'), replacer);
      }
    }, {
      key: 'textToNumber',
      value: function textToNumber(value) {
        var result = value.toString();
        var completer = this.completer();

        if (this.args.prefix) {
          result = this.removePrefix(result);
        }

        if (this.args.suffix) {
          result = this.removeSuffix(result);
        }

        result = this.onlyNumber(result);

        if (result) {
          result = this.removeCompleter(result, completer);
          result = this.checkNumberStart(result, '.');
        }

        return result || (this.args.fixed ? '0' : '');
      }
    }, {
      key: 'writingToNumber',
      value: function writingToNumber(value) {
        var result = value.toString();
        var completer = this.completer();

        if (this.args.prefix) {
          result = this.removePrefix(result);
        }

        if (this.args.suffix) {
          result = this.checkSuffix(result);
          result = this.removeSuffix(result);
        }

        result = this.onlyNumber(result);

        if (result) {
          result = this.adjustDotPosition(result);

          result = this.removeCompleter(result, completer);

          result = this.checkNumberStart(result, '.');
        }

        return result || (this.args.fixed ? '0' : '');
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
    indexMove: function indexMove(newValue, oldValue, index) {
      switch (true) {
        case oldValue.length < newValue.length:
          return index + 1;
        case oldValue.length > newValue.length:
          return index - 1;
        default:
          return index;
      }
    },
    addPropertyMask: function addPropertyMask(input, core) {
      var _this = this;

      input.maskArgs = {};

      var _loop = function _loop(k) {
        Object.defineProperty(input.maskArgs, k, {
          get: function get() {
            return core.args[k];
          },
          set: function set(value) {
            core.args[k] = value;
            _this.refreshMask(input);
          }
        });
      };

      for (var k in core.args) {
        _loop(k);
      }
    },
    addMask: function addMask(input, core) {
      var _this2 = this;

      input.addEventListener('input', function (e) {
        var oldValue = input.value;
        core.args.beforeFormat(oldValue);
        var newValue = core.mask(oldValue);
        var oldCaretPosition = _this2.getCaretPosition(input);
        var newCaretPosition = _this2.indexMove(newValue, oldValue, oldCaretPosition);

        if (input.maskArgs.cursor === 'start') {
          newCaretPosition = 0;
        } else if (input.maskArgs.cursor === 'end') {
          newCaretPosition = newValue.length;
        }

        input.value = newValue;
        input._value = newValue;

        _this2.setCaretPosition(input, newCaretPosition);
        core.args.afterFormat(newValue);
        !(e instanceof Event) && _this2.refreshMask(input);
      });
    },
    refreshMask: function refreshMask(input) {
      input.dispatchEvent(new Event('input'));
    }
  };

  var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





  var _args = new args();

  var src = function () {
    function SimpleMaskMoney() {
      _classCallCheck$2(this, SimpleMaskMoney);
    }

    _createClass$2(SimpleMaskMoney, null, [{
      key: 'formatToCurrency',
      value: function formatToCurrency(value, args$$1) {
        var core$$1 = new core(typeof args$$1 !== 'undefined' && (typeof args$$1 === 'undefined' ? 'undefined' : _typeof$1(args$$1)) === 'object' ? args$$1 : _args);
        core$$1.args.beforeFormat(value);

        var negative = core$$1.args.allowNegative && value.indexOf('-') !== -1;
        var formatation = core$$1.numberToText(core$$1.textToNumber(value));
        var result = '' + (!core$$1.args.negativeSignAfter && negative ? '-' : '') + formatation + (core$$1.args.negativeSignAfter && negative ? '-' : '');

        core$$1.args.afterFormat(result);

        return result;
      }
    }, {
      key: 'formatToMask',
      value: function formatToMask(input, args$$1) {
        var core$$1 = new core(typeof args$$1 !== 'undefined' && (typeof args$$1 === 'undefined' ? 'undefined' : _typeof$1(args$$1)) === 'object' ? args$$1 : _args);
        var value = input.toString();
        core$$1.args.beforeFormat(value);

        var result = core$$1.mask(value);

        core$$1.args.afterFormat(result);

        return result;
      }
    }, {
      key: 'formatToNumber',
      value: function formatToNumber(input, args$$1) {
        var core$$1 = new core(typeof args$$1 !== 'undefined' && (typeof args$$1 === 'undefined' ? 'undefined' : _typeof$1(args$$1)) === 'object' ? args$$1 : _args);
        var value = input.toString();
        core$$1.args.beforeFormat(value);
        var result = '0';

        var negative = core$$1.args.allowNegative && value.indexOf('-') !== -1;

        if (negative) {
          value = value.replace('-', '');
        }

        value = core$$1.textToNumber(value);

        if (!this.args.fixed) {
          value = value.replace(new RegExp('_', 'g'), '');
        }

        if (!isNaN(value)) {
          result = parseFloat(negative ? value * -1 : value);
        }

        core$$1.args.afterFormat(result);

        return result;
      }
    }, {
      key: 'setMask',
      value: function setMask(element, args$$1) {
        if (typeof document === 'undefined') throw 'This function only works on client side';

        var input = typeof element == 'string' ? document.querySelector(element) : element;
        var core$$1 = new core(typeof args$$1 !== 'undefined' && (typeof args$$1 === 'undefined' ? 'undefined' : _typeof$1(args$$1)) === 'object' ? args$$1 : _args);

        implanter.addPropertyMask(input, core$$1);
        implanter.addMask(input, core$$1);
        implanter.refreshMask(input);

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
      }
    }]);

    return SimpleMaskMoney;
  }();

  return src;

})));
//# sourceMappingURL=simple-mask-money.js.map
