const Stmt = require("./stmt")

class FunctionDefineStmt extends Stmt {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = FunctionDefineStmt;