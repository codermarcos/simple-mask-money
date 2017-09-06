this.SimpleMaskMoney = {
    args: {
        preffix: '',
        suffix: '',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.',
        emptyOrInvalid: () => {
            return this.SimpleMaskMoney.args.fixed ?
                `0${this.SimpleMaskMoney.args.decimalSeparator}00`
                :
                `_${this.SimpleMaskMoney.args.decimalSeparator}__`
        }
    },

    onlyNumber: (value) => {
        let retorno = '';

        for (let i = 0; i < value.length; i++) {
            if (isFinite(value[i])) {
                retorno += value[i];
            }
        }

        return retorno;
    },

    addingPreffix: (value) => {
        return `${this.SimpleMaskMoney.args.preffix}${value}`;
    },
    removingPreffix: (value) => {
        return value.replace(this.SimpleMaskMoney.args.preffix, '');
    },

    addingSuffix: (value) => {
        return `${value}${this.SimpleMaskMoney.args.suffix}`;
    },
    removingSuffix: (value) => {
        if (value.includes(this.SimpleMaskMoney.args.suffix, value.length - 2)) {
            value = value.replace(this.SimpleMaskMoney.args.suffix, '');
        } else {
            value = value.substring(0, value.length - 1);
        }
    },

    addingCompleterFromStart: (value) => {
        while (value.length < this.SimpleMaskMoney.args.fractionDigits) {
            value = this.SimpleMaskMoney.args.fixed ? `0${value}` : `_${value}`;
        }

        return value;
    },
    removingCompleterFromStart: (value) => {
        let completer = this.SimpleMaskMoney.args.fixed ? '0' : '_';

        while (value[0] === completer) {
            value = value.replace(completer, '');
        }

        return value;
    },

    addingDecimalSeparator: (value) => {
        let length = value.length - this.SimpleMaskMoney.args.fractionDigits;

        let regexpFraction;
        let decimals = '$1';
        let dezenas = '';

        if (this.SimpleMaskMoney.args.fixed) {
            regexpFraction = `(\\d{${this.SimpleMaskMoney.args.fractionDigits}})`;
            if (length > 0) {
                regexpFraction = `(\\d{${length}})${regexpFraction}`;
                dezenas = decimals;
                decimals = '$2';
            } else {
                dezenas = '0';
            }
        } else {
            regexpFraction = `(\\w{${this.SimpleMaskMoney.args.fractionDigits}})`;
            if (length > 0) {
                regexpFraction = `(\\w{${length}})${regexpFraction}`;
                dezenas = decimals;
                decimals = '$2';
            } else {
                dezenas = '_';
            }
        }


        return value.replace(new RegExp(regexpFraction), `${dezenas}${this.SimpleMaskMoney.args.decimalSeparator}${decimals}`);
    },
    removingSeparators: (value) => {
        value = value.replace(new RegExp(`\\${this.SimpleMaskMoney.args.thousandsSeparator}`, 'g'), '');
        value = value.replace(new RegExp(`\\${this.SimpleMaskMoney.args.decimalSeparator}`, 'g'), '');

        return value;
    },

    formatDecimal: (value) => {
        value = this.SimpleMaskMoney.addingCompleterFromStart(value);
        value = this.SimpleMaskMoney.addingDecimalSeparator(value);
        return value;
    },

    textToNumber: (input) => {
        let retorno = input.toString();

        if (this.SimpleMaskMoney.args.preffix) {
            retorno = this.SimpleMaskMoney.removingPreffix(retorno);
        }

        if (this.SimpleMaskMoney.args.suffix) {
            retorno = this.SimpleMaskMoney.removingSuffix(retorno);
        }

        retorno = this.SimpleMaskMoney.onlyNumber(retorno);

        retorno = this.SimpleMaskMoney.removingCompleterFromStart(retorno);

        return retorno ? retorno : (this.SimpleMaskMoney.args.fixed ? '0' : '');
    },

    numberToText: (input) => {
        let retorno = this.SimpleMaskMoney.args.emptyOrInvalid();

        if (parseFloat(input) !== 'NaN') {

            if (input.length <= this.SimpleMaskMoney.args.fractionDigits) {

                retorno = formatDecimal(input);

            } else {

                let lengthWithoutDecimals = input.length - this.SimpleMaskMoney.args.fractionDigits;
                let hundreds = Math.ceil(lengthWithoutDecimals / 3);
                let regexpHundreds = '(\\d)';

                let replacement = `${this.SimpleMaskMoney.args.decimalSeparator}$${hundreds + 1}`;

                for (let i = hundreds; i !== 0; i--) {

                    if (lengthWithoutDecimals >= 3) {
                        regexpHundreds = `(\\d{3})${regexpHundreds}`;
                        lengthWithoutDecimals -= 3;
                    } else {
                        regexpHundreds = `(\\d{${lengthWithoutDecimals.toString()}})${regexpHundreds}`;
                    }

                    if (i > 1) {
                        replacement = `${this.SimpleMaskMoney.args.thousandsSeparator}$${i.toString()}${replacement}`;
                    } else {
                        replacement = `$${i.toString()}${replacement}`;
                    }
                }

                retorno = input.replace(new RegExp(regexpHundreds), replacement);

            }
        }

        if (this.SimpleMaskMoney.args.preffix) {
            retorno = this.SimpleMaskMoney.addingPreffix(retorno);
        }
        if (this.SimpleMaskMoney.args.suffix) {
            retorno = this.SimpleMaskMoney.addingSuffix(retorno);
        }

        return retorno;
    },

    format: (value) => {
        return this.SimpleMaskMoney.numberToText(this.SimpleMaskMoney.textToNumber(value));
    }
}