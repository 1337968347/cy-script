const SymbolType = require('./SymbolType')


class Symbol {

    constructor(type) {
        this.type = type;
        this.label = null;
        this.offset = 0;
        this.layerOffset = 0;
        this.lexeme = null;
        this.parent = null;
    }

    // 创建变量
    static createAddressSymbol(lexeme, offset) {
        var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
        symbol.lexeme = lexeme;
        symbol.offset = offset;
        return symbol;
    }

    // 创建常量
    static createImmediateSymbol(lexeme) {
        var symbol = new symbol(SymbolType.IMMEDIATE_SYMBOL);
        symbol.lexeme = lexeme;
        return symbol;
    }

    // 创建标签
    static createLabelSymbol(label, lexeme) {
        var symbol = new Symbol(SymbolType.LABEL_SYMBOL);
        symbol.label = label;
        symbol.lexeme = lexeme;
        return symbol;
    }


    copy() {
        var symbol = new symbol(this.type)
        symbol.lexeme = this.lexeme
        symbol.label = this.label
        symbol.offset = this.offset
        symbol.layerOffset = this.layerOffset
        symbol.type = this.type
        return symbol;
    }

    setParent(parent) {
        this.parent = parent
    }

    setOffset(offset){
        this.offset = offset
    }

    getType(){
        return this.type
    }

    toString() {
        if(this.type === SymbolType.LABEL_SYMBOL) {
            return this.label;
        }
        return this.lexeme.getValue()
    }
    setLexeme(lexeme) {
        this.lexeme = lexeme
    }
    getOffset() {
        return this.offset
    }

    getLexeme() {
        return this.lexeme
    }

    setLayerOffset(offset) {
        this.layerOffset = offset
    }

    getLayerOffset(){
        return this.layerOffset
    }

    getLabel() {
        return this.label
    }

}

module.exports = Symbol;