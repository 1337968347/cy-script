const Enum = require("../../common/Enum");

module.exports = {
    ASTNode: new Enum("ASTNode", 0),
    Block: new Enum("Block", 1),
    Stmt: new Enum("Stmt", 2),
    Factor: new Enum("Factor", 3),
    Variable: new Enum("Variable", 4),
    Scalar: new Enum("Scalar", 5),
    Expr: new Enum("Expr", 6),
    IfStmt: new Enum("IfStmt", 7),
    AssignStmt: new Enum("AssignStmt",8),
    DeclareStmt: new Enum("DeclareStmt", 9),
    ForStmt: new Enum("ForStmt",10),
    FunctionDefineStmt: new Enum("FunctionDefineStmt", 11), 
    ProgramStmt: new Enum("ProgramStmt", 12) 

}