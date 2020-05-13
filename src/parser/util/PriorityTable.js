// 处理表达式的优先级
class PriorityTable {

    constructor() {
        this.table = [
            ["&", "|", "^."],
            ["==", "!=", ">", "<", ">="],
            ["+", "-"],
            ["*", "/"],
            ["<<", ">>"]
        ];
    }

    getSize() {
        return this.table.length;
    }

    getLevelList(level) {
        if(!this.table[level]){
            throw new Error("error Level")
        }

        return this.table[level];
    }

} 