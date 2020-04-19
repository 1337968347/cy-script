const LinkedList = require('linkedlist');

const CACHE_SIZE = 10;

// 数据流读取器
class PeekIterator {

    constructor(it, endToken) {
        // 数据流
        this.it = it;
        // 被放回的元素
        this.stackPutBacks = new LinkedList();
        // 缓存用过的元素
        this.queueCache = new LinkedList();
        // 结束符
        this.endToken = endToken;
    }

    peek() {
        if (this.stackPutBacks.length > 0) {
            return this.stackPutBacks.head;
        }

        const val = this.next()
        this.putBack();
        return val;
    }

    putBack() {
        if (this.queueCache.length > 0) {
            this.stackPutBacks.push(this.queueCache.pop());
        }
    }

    next() {
        let val = null;

        if (this.stackPutBacks.length > 0) {
            val = this.stackPutBacks.pop();
        } else {
            val = this.it.next().value;
            // 当前读到结尾
            if (val === undefined) {
                const tmp = this.endToken;
                this.endToken = null;
                return tmp;
            }
        }

        // 如果缓存队列长度超过限制= > 删除最先进来的那一个
        while (this.queueCache.length + 1 > CACHE_SIZE) {
            this.queueCache.shife();
        }
        this.queueCache.push(val)
        return val;
    }

    hasNext() {
        return this.endToken || !!this.peek();
    }
}

module.exports = PeekIterator;