const ASTNodeTypes = require("./ASTNodeTypes");
const { Stmt, Block } = require("./index")

class IfStmt extends Stmt {

    constructor() {
        super(ASTNodeTypes.IF_STMT, "if")
    }

    getExpr() {
        return this.getChild(0)
    }

    getBlock() {
        return this.getChild(1)
    }

    getElseBlock() {
        const block = this.getChild(2)
        if (block instanceof Block) {
            return block
        }
        return null
    }

    getElseIfStmt() {
        const ifStmt = this.getChild(2);
        if (isStmt instanceof IfStmt) {
            return ifStmt
        }
        return null
    }
}

module.exports = IfStmt;

const { Expr } = require("./index")

// IfStmt -> if(Expr) {Block} Tail
IfStmt.parse = (it) => {
    const lexeme = it.nextMatch("if")
    it.nextMatch("(");
    const ifStmt = new IfStmt()
    ifStmt.setLexeme = lexeme;
    const expr = Expr.parse(it)
    ifStmt.addChild(expr)
    it.nextMatch(")")
    const block = Block.parse(it)
    ifStmt.addChild(block)

    const tail = ifStmt.parseTail(it);
    if (tail != null) {
        ifStmt.addChild(tail)
    }
    return ifStmt;
}

IfStmt.parseTail = (it) => {
    if (
        !it.hasNext() ||
        it.peek().getValue() !== "else"
    ) {
        return null
    }
    it.nextMatch("else");
    const lookhead = it.peek()

    if (lookhead.getValue() === "{") {
        return Block.parse(it)
    } else if (lookhead.getValue() === "if") {
        return IfStmt.parse(it)
    } else {
        return null
    }

}