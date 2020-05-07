
const TokenType = require('./TokenType');
const AlphabetHelper = require('./AlphabetHelper');
const LexicalException = require('./lexicalException');

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

    static makeString(it) {
        let s = "";

        let state = 0;

        while (it.hasNext()) {
            let c = it.next();

            switch (state) {
                case 0:
                    if (c == '"') {
                        state = 1;
                    } else {
                        state = 2;
                    }
                    s += c;
                    break;
                case 1:
                    if (c == '"') {
                        return new Token(TokenType.STRING, s + c);
                    } else {
                        s += c;
                    }
                    break;
                case 2:
                    if (c == "'") {
                        return new Token(TokenType.STRING, s + c);
                    } else {
                        s += c;
                    }
                    break;
            }
        }
        throw new LexicalException("Unexpected error");
    }

    static makeOp(it) {
        let s = "";

        let state = 0;

        while (it.hasNext()) {
            let c = it.next();

            switch (state) {
                case 0:
                    switch (c) {
                        case '+':
                            state = 1;
                            break;
                        case '-':
                            state = 2;
                            break;
                        case '*':
                            state = 3;
                            break;
                        case '/':
                            state = 4;
                            break;
                        case '>':
                            state = 5;
                            break;
                        case '<':
                            state = 6;
                            break;
                        case '=':
                            state = 7;
                            break;
                        case '!':
                            state = 8;
                            break;
                        case '&':
                            state = 9;
                            break;
                        case '|':
                            state = 10;
                            break;
                        case '^':
                            state = 11;
                            break;
                        case '%':
                            state = 11;
                            break;
                        case ",":
                            return new Token(TokenType.OPERATOR, ',');
                        case ";":
                            return new Token(TokenType.OPERATOR, ';');
                        default:
                            break;
                    }
                    break;
                case 1:
                    if (c == '+') {
                        return new Token(TokenType.OPERATOR, "++");
                    } else if (c == "=") {
                        return new Token(TokenType.OPERATOR, "+=");
                    } else {
                        return new Token(TokenType.OPERATOR, "+")
                    }
                case 2:
                    if (c == "-") {
                        return new Token(TokenType.OPERATOR, "--");
                    } else if (c == "=") {
                        return new Token(TokenType.OPERATOR, "-=")
                    }else{
                        return new Token(TokenType.OPERATOR, "-")
                    }
                default:
                    break;
            }

        }
    }
}

module.exports = Token;