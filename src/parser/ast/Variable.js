const Factor = require("./Factor")

class Variable extends Factor {

    constructor(parent, it) {
        super(parent, it)
    }
}

module.exports = Variable;