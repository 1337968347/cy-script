const ASTNodeTypes = require("./ASTNodeTypes")
const { Factor } = require("./index")

class Variable extends Factor {

    constructor(token) {
        super(token)
        this.type = ASTNodeTypes.VARIABLE;
        this.typeLexeme = null
    }

    setTypeLexeme(lexeme) {
        this.typeLexeme = this.lexeme
    }

    getTyoeLexeme() {
        return this.typeLexeme
    }
}

module.exports = Variable;