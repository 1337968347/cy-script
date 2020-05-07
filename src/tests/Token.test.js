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

})