const ASTNode = require("./ASTNode");
const TokenType = require("../../lexer/TokenType");
const ASTNodeTypes = require("./ASTNodeType");

class Factor extends ASTNode {

    constructor(parent, it) {
        super(parent);
        const token = it.next();
        var type = token.getType();

        if (type === TokenType.VARIABLE) {
            this.type = ASTNodeTypes.Variable;
        } else {
            this.type = ASTNodeTypes.Scalar;
        }

        this.label = token.getValue();
        this.lexeme = token;

    }
}

module.exports = Factor;