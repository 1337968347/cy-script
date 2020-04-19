const Enum = require('../common/Enum');

module.exports = {
    KEYWORD: new Enum('KEYWORD', 1),
    VARIABLE: new Enum("VARIABLE", 1),
    OPERATOR: new Enum("OPERATOR", 1),
    BRACKET: new Enum("BRACKET", 1),
    INTEGER: new Enum("INTEGER", 1),
    FLOAT: new Enum("FLOAT", 1),
    BOOLEAN: new Enum("BOOLEAN", 1),
    STRING: new Enum("STRING", 1)
}