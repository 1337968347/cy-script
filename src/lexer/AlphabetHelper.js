
class AlphabetHelper {
    static ptnLetter = /^[a-zA-Z]$/
    static ptnNumber = /^[0-9]$/
    static pynLiteral = /^[_a-zA-Z0-9]$/
    static ptnOperator = /^[+-\\*/><=!&|^%]$/

    static isLetter(c) {
        return AlphabetHelper.ptnLetter.test(c);
    }

    static isNumber(c) {
        return AlphabetHelper.ptnNumber.test(c);
    }

    static isLiteral(c) {
        return AlphabetHelper.pynLiteral.test(c);
    }

    static isOperator(c) {
        return AlphabetHelper.ptnOperator.test(c);
    }

}

module.exports = AlphabetHelper;