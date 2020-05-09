const ASTNode = require("./ASTNode")

class Expr extends ASTNode {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = Expr;