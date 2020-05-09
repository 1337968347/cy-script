const ASTNode = require("./ASTNode")

class Scalar extends ASTNode {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = Scalar;