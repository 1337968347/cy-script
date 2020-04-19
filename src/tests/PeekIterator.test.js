const PeekIterator = require('../common/PeekIterator');
const arrayToGenerator = require('../common/arrayToGenerator');

const { assert } = require('chai');

describe('test PeekIterator', () => {
    it('test_peek', () => {
        const it = new PeekIterator(arrayToGenerator([..."abcdefg"]));
        assert.equal(it.next(), 'a');
        assert.equal(it.next(), 'b');
        assert.equal(it.next(), 'c');
        assert.equal(it.peek(), 'd');
        assert.equal(it.peek(), 'd');
        assert.equal(it.next(), 'd');

    })

    it('test_lookahead2', () => {
        const it = new PeekIterator(arrayToGenerator([..."abcdefg"]));
        assert.equal(it.next(), 'a');
        assert.equal(it.next(), 'b');
        assert.equal(it.peek(), 'c');
        it.putBack();
        it.putBack();
        assert.equal(it.next(), 'a');

    })
})