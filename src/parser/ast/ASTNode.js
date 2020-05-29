
class ASTNode {
    constructor(_type, _label) {
        this.children = [];
        this.parent = null;

        this.type = _type;
        this.lexeme = null;
        this.label = _label;
    }

    getChild(index) {
        return this.children[index];
    }

    addChild(node) {
        this.children.push(node);
    }

    setLexeme(lexeme) {
        this.lexeme = lexeme
    }

    getLexeme() {
        return this.lexeme;
    }

    getChildren() {
        return this.children;
    }

    print(indent = 0) {
        console.log(`${"".padStart(indent * 2, " ")}${this.label}`);
        this.children.forEach(x => x.print(indent + 1))
    }
}

module.exports = ASTNode;