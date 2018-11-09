module.exports = {
  getCaretPosition(input) {
    let position = -1;
    if ('selectionStart' in input) {
      position = input.selectionStart;
    } else if (document.selection) {
      input.focus();
      const range = document.selection.createRange();
      const length = document.selection.createRange().text.length;
      range.moveStart('character', -input.value.length);
      position = range.text.length - length;
    }
    return position;
  },

  setCaretPosition(input, index) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(index, index);
    } else if (input.createTextRange) {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', index);
      range.moveStart('character', index);
      range.select();
    }
  },

  indexMove(newValue, oldValue, index) {
    switch (true) {
      case oldValue.length < newValue.length:
        return index + 1;
      case oldValue.length > newValue.length:
        return index - 1;
      default:
        return index;
    }
  },

  addPropertyMask(input, core) {
    input.maskArgs = {};

    for (const k in core.args) {
      Object.defineProperty(input.maskArgs, k, {
        get: () => core.args[k],
        set: (value) => {
          core.args[k] = value;
          this.refreshMask(input);
        }
      });
    }
  },

  addMask(input, core) {
    input.addEventListener('input', e => {
      const oldValue = input.value;
      core.args.beforeFormat(oldValue);
      const newValue = core.mask(oldValue);
      const oldCaretPosition = this.getCaretPosition(input);
      let newCaretPosition = this.indexMove(newValue, oldValue, oldCaretPosition);

      if (input.maskArgs.cursor === 'start') {
        newCaretPosition = 0;
      } else if (input.maskArgs.cursor === 'end') {
        newCaretPosition = newValue.length;
      }

      input.value = newValue;
      input._value = newValue;

      this.setCaretPosition(input, newCaretPosition);
      core.args.afterFormat(newValue);
      !(e instanceof Event) && this.refreshMask(input);
    });
  },

  refreshMask(input) {
    input.dispatchEvent(new Event('input'));
  }
};
