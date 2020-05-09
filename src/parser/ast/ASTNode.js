
class ASTNode {
    constructor(_parent, _type, _label) {
        this.children = [];
        this.parent = _parent;

        this.type = _type;
        this.lexme = null;
        this.label = _label;
    }

    getChild(index) {
        return this.children[index];
    }

    addChild(node) {
        this.children.push(node);
    }

    getLexeme() {
        return this.lexme;
    }

    getChildren() {
        return this.children;
    }
}

module.exports = ASTNode;