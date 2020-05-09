const ASTNode = require("./ASTNode")

class Variable extends ASTNode {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = Variable;