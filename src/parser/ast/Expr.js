const ASTNode = require("./ASTNode")
const ASTNodeTypes = require("./ASTNodeTypes")
const table = require("../util/PriorityTable")
const Factor = require("../ast/Factor")


class Expr extends ASTNode {

    constructor() {
        super()
    }

    static formToken(type, token) {
        const expr = new Expr();
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
    static parseExpr(it) {
        return Expr.E(it, 0);
    }

    static E(it, k) {
        if (k < table.length - 1) {
            return Expr.combine(
                it,
                () => Expr.E(it, k + 1),
                () => Expr.E_(it, k)
            )
        } else {
            return Expr.race(
                it,
                () =>
                    Expr.combine(
                        it,
                        () => Expr.F(it),
                        () => Expr.E_(it, k)),
                () => Expr.combine(
                    it,
                    () => Expr.U(it),
                    () => Expr.E_(it, k)
                )
            )
        }

    }

    static E_(it, k) {
        const token = it.peek();
        const value = token.getValue();

        if (table[k].indexOf(value) !== -1) {
            it.nextMatch(value);
            const expr = Expr.fromToken(ASTNodeTypes.BINARY_EXPR, token);
            expr.addChild(
                Expr.combine(
                    it,
                    () => Expr.E(it, k + 1),
                    () => Expr.E_(it, k, it)
                )
            );

            return expr;
        }
        return null;
    }

    // Factor
    static F(it) {
        const factor = Factor.parse(it);
        if (factor == null) {
            return null;
        }
        if (it.hasNext() && it.peek().getValue() === "(") {
            return CallExpr.parse(factor, it);
        }
        return factor;
    }

    // Unary 一元表达式
    static U(it) {
        const token = it.peek()
        const value = token.getValue();

        if (value === "(") {
            it.nextMatch("(");
            const expr = Expr.parseExpr(it);
            it.nextMatch(")");
            return expr;
        } else if (value === "++" || value === "--" || value === "!") {
            const t = it.peek();
            t.nextMatch(value);

            const expr = Expr.formToken(ASTNodeTypes.UNARY_EXPR, t);
            expr.addChild(Expr.parseExpr(it));
            return expr;
        }

        return null;

    }

    static combine(it, funcA, funcB) {
        if (!it.hasNext()) {
            return null
        }

        const a = funcA();
        if (a == null) {
            return it.hasNext() ? funcB() : null;
        }
        const b = it.hasNext() ? funcB() : null;
        if (b == null) { return a }

        const expr = Expr.formToken(ASTNodeTypes.BINARY_EXPR, b.lexeme)
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