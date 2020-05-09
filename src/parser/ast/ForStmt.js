const Stmt = require("./stmt")

class ForStmt extends Stmt {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = ForStmt;