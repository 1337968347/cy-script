
const TokenType = require('./TokenType');
const AlphabetHelper = require('./AlphabetHelper');

const Keywords = new Set([
    "var",
    "if",
    "else",
    "function",
    "return",
    "break",
    "while"
])
class Token {
    constructor(type, value) {
        this._type = type;
        this._value = value;
    }

    getType() {
        return this._type;
    }

    getValue() {
        return this._value;
    }

    isVariable() {
        return this._type == TokenType.VARIABLE;
    }

    isScalar() {
        return this._type == TokenType.INTEGER ||
            this._type == TokenType.FLOAT ||
            this._type == TokenType.STRING ||
            this._type == TokenType.BOOLEAN;
    }

    toString() {
        return `type ${this._type.type}, value ${this._value}`;
    }

    static makeVarOrKeyword(it) {
        let s = "";

        while (it.hasNext()) {
            const c = it.peek();
            if (AlphabetHelper.isLiteral(c)) {
                s += c
            } else {
                break;
            }
            it.next()
        }

        if (Keywords.has(s)) {
            return new Token(TokenType.KEYWORD, s);
        }

        if (s == 'true' || s == 'false') {
            return new Token(TokenType.BOOLEAN, s);
        }
        return new Token(TokenType.VARIABLE, s);
    }

}

module.exports = Token;