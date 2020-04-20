/**
 * 异常处理
 */
class LexicalException {
    constructor(msg) {
        super(msg)
    }

    static formChar(c) {
        return new LexicalException(`unexpected char ${c}`);
    }
}

module.exports = LexicalException;