const ASTNode = require("./ASTNode")

class AssignStmt extends ASTNode {

    constructor(parent, type, label) {
        super(parent, type, label)

    }
}

module.exports = AssignStmt;