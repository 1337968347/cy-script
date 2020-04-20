const { assert } = require('chai');
const AlphabetHelper = require('../lexer/AlphabetHelper');

describe('AlphabetHelper', () => {
    it('charCheck', () => {
        assert.equal(true, AlphabetHelper.isLetter('a'));
        assert.equal(true, AlphabetHelper.isLiteral('_'));
        assert.equal(true, AlphabetHelper.isLetter('A'));
        assert.equal(false, AlphabetHelper.isLetter('*'));
        assert.equal(true, AlphabetHelper.isLetter('a'));
        assert.equal(true, AlphabetHelper.isOperator('*'));
        assert.equal(true, AlphabetHelper.isOperator('/'));
    })
})