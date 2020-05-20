const ASTNode = require("./ASTNode")
const ASTNodeTypes = require("./ASTNodeTypes")

class Expr extends ASTNode {

    constructor(parent) {
        super(parent)
    }

    formToken(parent, type, token) {
        const expr = new Expr(parent);
        expr.label = token.getValue();
        expr.lexeme = token;
        expr.type = type;
    }

    /**
     * 表达式解析方法
     * 产生式
     * E: 表达式   OP 操作符 
     * E(k) = E(k+1) E_(k)
     * E_(k) = op(K) E(k+1) E_(k) | factor
     * @param {*} parent 
     * @param {*} it 
     */
    static parseExpr(parent, it) {

    }

    static E() {

    }

    static E_() {

    }

    static combine(parent, it, funcA, funcB) {
        if (!it.hasNext()) {
            return null
        }

        const a = funcA();
        if (a == null) {
            return it.hasNext() ? funcB() : null;
        }
        const b = it.hasNext() ? funcB() : null;
        if (b == null) { return a }

        const expr = Expr.formToken(parent, ASTNodeTypes.BINARY_EXPR, b.lexeme)
        expr.addChild(a)
        expr.addChild(b.getChild(0))
        return expr;
    }


    /**
     * 
     * @param {*} it 
     * @param {*} funcA 求出终结式的函数
     * @param {*} funcB 求出终结式的函数
     */
    static race(it, funcA, funcB) {
        if (!it.hasNext()) {
            return null
        }

        const a = funcA();
        if (a == null) {
            return funcB();
        }
        return a;
    }
}

module.exports = Expr;