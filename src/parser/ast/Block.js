const Stmt = require("./Stmt")

class Block extends Stmt {

    constructor(parent, type, label) {
        super(parent, type, label)
    }
}

module.exports = Block;