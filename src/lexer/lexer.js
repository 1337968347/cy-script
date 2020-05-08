const Token = require("./Token");
const AlphabetHelper = require("./AlphabetHelper");
const TokenType = require("./TokenType");
const PeekIterator = require("../common/PeekIterator");
const LexicalException = require('./lexicalException');

class Lexer {


    analyse(source) {
        const tokens = [];
        const it = new PeekIterator(source, "\0")
        // white
        while (it.hasNext()) {
            let c = it.next();
            if (c == "\0") { break; }
            let lookahead = it.peek();

            // 去掉空格跟\n
            if (c == " " || c == "\n") {
                continue;
            }

            // 处理注释
            if (c == "/") {
                if (lookahead == "/") {
                    while (it.hasNext() && (c = it.next()) != "\n");
                } else if (lookahead == '*') {
                    let valid = false;
                    while (it.hasNext()) {
                        const p = it.next()
                        if (p == '*' && it.peek() == '/') {
                            valid = true;
                            it.next()
                            break;
                        }
                    }

                    if (!valid) {
                        // 注释 没有后边那个
                        throw new LexicalException("comment not matched");
                    }
                    continue;
                }
            }

            // 处理括号
            if (c == "{" || c == "}" || c == "(" || c == ")") {
                tokens.push(new Token(TokenType.BRACKET, c));
                continue;
            }
            // 处理 字符串
            if (c == "'" || c == '"' || c == "`") {
                it.putBack();
                tokens.push(Token.makeString(it))
                continue;
            }

            // 处理命名 
            if (AlphabetHelper.isLetter(c)) {
                it.putBack()
                tokens.push(Token.makeVarOrKeyword(c))
                continue
            }

            // 处理数字
            if (AlphabetHelper.isNumber(c)) {
                it.putBack()
                tokens.push(Token.makeNumberToken)
            }

            // 处理操作符


            // 抛出异常



        }


        return null;
    }


}