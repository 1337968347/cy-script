const Expr = require("./ast/Expr");
const Scalar = require("./ast/Scalar");
const ASTNodeTypes = require("./ast/ASTNodeTypes")

class SimpleParser {

    static parse(it) {
        const expr = new Expr(null)
        const scalar = new Scalar(expr, it);
        if (!it.hasNext()) {
            return scalar
        }

        expr.addChild(scalar);
        const op = it.nextMatch("+");
        expr.label = "+";
        expr.type = ASTNodeTypes.BINARY_EXPR;
        expr.lexme = op;
        expr.addChild(SimpleParser.parse(it))
        
        return expr;
    }
}

module.exports = SimpleParser;