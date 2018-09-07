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
  indexMove(newValue, oldValue) {
    let move;
    switch (true) {
      case oldValue.length < newValue.length:
        move = - 1;
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
