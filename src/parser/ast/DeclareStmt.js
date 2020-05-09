const Stmt = require("./stmt")

class DeclareStmt extends Stmt {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = DeclareStmt;