const Stmt = require("./stmt")

class IfStmt extends Stmt {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = IfStmt;