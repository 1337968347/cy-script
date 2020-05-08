const Token = require('../lexer/Token');
const TokenType = require('../lexer/TokenType')
const PeekIterator = require('../common/PeekIterator')
const arrayToGenerator = require('../common/arrayToGenerator');
const { assert } = require('chai')

describe("Token", () => {
    function assertToken(token, type, value) {
        console.log(token)
        assert.equal(token.getValue(), value)
        assert.equal(token.getType(), type)
    }

    it('varOrKeyword', () => {
        var it1 = new PeekIterator(arrayToGenerator([...'if abd']))
        var it2 = new PeekIterator(arrayToGenerator([...'true abd']))

        var token1 = Token.makeVarOrKeyword(it1);
        var token2 = Token.makeVarOrKeyword(it2);
        it1.next();
        var token3 = Token.makeVarOrKeyword(it1);

        assertToken(token1, TokenType.KEYWORD, 'if')
        assertToken(token2, TokenType.BOOLEAN, 'true')
        assertToken(token3, TokenType.VARIABLE, 'abd')

    })

    it("makeString", () => {
        const tests = ["'123'", '"123"']
        for (let test of tests) {
            const it = new PeekIterator(arrayToGenerator([...test]))
            const token = Token.makeString(it)
            assertToken(token, TokenType.STRING, test)
        }
    })

    it("makeOp", () => {
        const tests = [
            ["+ xxx", "+"],
            ["++mmm", "++"],
            ["/=g", "/="],
            ["==1", "=="],
            ["&=3982", "&="],
            ["&777", "&"],
            ["||xx", "||"],
            ["^=111", "^="],
            ["%7", "%"],
        ]

        for (let test of tests) {
            const [input, expected] = test;
            const it = new PeekIterator(arrayToGenerator([...input]));
            const token = Token.makeOp(it);
            assertToken(token, TokenType.OPERATOR, expected);
        }
    })

    it("makeNumber", () => {
        const tests = [
            "+0 aa",
            "-0 bbb",
            ".3 ccc",
            ".5555 ddd",
            "7899.999 aaa",
            "-100 ggg",
            "-1000.5345345*123123",
            "012 aaa"
        ]

        for (let test of tests) {
            const it = new PeekIterator(arrayToGenerator([...test]))
            const token = Token.makeNumber(it)
            const [expected] = test.split(/[ *]/);
            const type = test.indexOf('.') == -1 ? TokenType.INTEGER : TokenType.FLOAT
            assertToken(token, type, expected)
        }

    })

})