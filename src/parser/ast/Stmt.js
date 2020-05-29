const ASTNode = require("./ASTNode")

class Stmt extends ASTNode {
    constructor(type, label) {
        super(type, label)
    }
}

module.exports = Stmt;

Stmt.parse = (it) => {
    const {
        AssignStmt,
        DeclareStmt,
        FunctionDeclareStmt,
        ReturnStmt,
        IfStmt,
        Block,
        Expr
    } = require("./index")
    if (!it.hasNext()) {
        return null
    }
    const token = it.next();
    const lookhead = it.peek();
    it.putBack()

    if (token.isVariable() && lookhead.getValue() === "=") {
        return AssignStmt.parse(it);
    } else if (token.getValue() === "var") {
        return DeclareStmt.parse(it);
    } else if(token.getValue() == "func"){
        return FunctionDeclareStmt.parse(it);
    }

}