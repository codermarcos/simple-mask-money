class SimpleMaskMoney {

    static set args(value) {
        this._args = this.args;
        this._args = Object.assign(this._args, value);
    }

    static get args() {
        return this._args ? this._args : {
            preffix: '',
            suffix: '',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.'
        };
    }

    static textToNumber(moneyFormat) {
        let retorno = moneyFormat.toString();

        if (this.args.preffix) {
            retorno = retorno.replace(this.args.preffix, '');
        }
        if (this.args.suffix) {
            if (retorno.endsWith(this.args.suffix) || retorno.replace(this.args.suffix, '').includes(this.args.suffix)) {
                retorno = retorno.replace(this.args.suffix, '');
            } else {
                retorno = retorno.substring(0, retorno.length - 1);
            }
        }

        retorno = retorno.replace(new RegExp(`\\${this.args.thousandsSeparator}`, 'g'), '');
        retorno = retorno.replace(new RegExp(`\\${this.args.decimalSeparator}`, 'g'), '');

        let value = '';
        for (let i = 0; i < retorno.length; i++) {
            if (isFinite(retorno[i])) {
                value = value + retorno[i];
            }
        }

        if (this.args.fixed) {
            while (value[0] === '0') {
                value = value.replace('0', '');
            }
        } else {
            while (value[0] === '_') {
                value = value.replace('_', '');
            }
        }


        return value ? value : (this.args.fixed ? '0' : '');
    }

    static numberToText(moneyFormat) {
        let retorno = this.args.fixed ? `0${this.args.decimalSeparator}00` : `_${this.args.decimalSeparator}__`;

        if (parseFloat(moneyFormat) !== 'NaN') {
            switch (true) {
                case (moneyFormat.length < this.args.fractionDigits):
                    let fraction = moneyFormat;

                    while (fraction.length !== this.args.fractionDigits) {
                        fraction = this.args.fixed ? `0${fraction}` : `_${fraction}`;
                    }

                    retorno = fraction.replace(new RegExp(`(\\d{${fraction.length}})`), this.args.fixed ? `0${this.args.decimalSeparator}$1` : `_${this.args.decimalSeparator}$1`);
                    break;
                case (moneyFormat.length === this.args.fractionDigits):
                    retorno = moneyFormat.replace(new RegExp(`(\\d{${this.args.fractionDigits}})`), this.args.fixed ? `0${this.args.decimalSeparator}$1` : `_${this.args.decimalSeparator}$1`);
                    break;
                default:
                    let regexp = '(\\d)';
                    let length = moneyFormat.length - this.args.fractionDigits;
                    let centenas = Math.ceil(length / 3);
                    let replacement = `${this.args.decimalSeparator}$${centenas + 1}`;

                    for (let i = centenas; i !== 0; i--) {
                        if (length < 3) {
                            regexp = `(\\d{${length.toString()}})${regexp}`;
                        } else {
                            regexp = `(\\d{3})${regexp}`;
                            length -= 3;
                        }
                        if (i > 1) {
                            replacement = `${this.args.thousandsSeparator}$${i.toString()}${replacement}`;
                        } else {
                            replacement = `$${i.toString()}${replacement}`;
                        }
                    }
                    retorno = moneyFormat.replace(new RegExp(regexp), replacement);
                    break;
            }
        }

        if (this.args.preffix) {
            retorno = `${this.args.preffix}${retorno}`;
        }
        if (this.args.suffix) {
            retorno = `${retorno}${this.args.suffix}`;
        }

        return retorno;
    }

    static format(value) {
        return this.numberToText(this.textToNumber(value));
    }
}
