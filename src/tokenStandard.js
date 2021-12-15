const {bech32} = require("bech32");

class TokenStandard {
    constructor(core) {
        this.core = core;
    }

    toString() {
        return bech32.encode("zts", bech32.toWords(this.core));
    }

    static Parse(str) {
        const {prefix, words} = bech32.decode(str);
        let extractedCore = new Buffer.from(bech32.fromWords(words));
        if (prefix !== 'zts') {
            throw `invalid prefix ${prefix} should be 'z'`
        }
        return new TokenStandard(extractedCore)
    }
}

const znnZts = TokenStandard.Parse("zts1znnxxxxxxxxxxxxx9z4ulx");
const qsrZts = TokenStandard.Parse("zts1qsrxxxxxxxxxxxxxmrhjll");
const emptyZts = TokenStandard.Parse("zts1qqqqqqqqqqqqqqqqtq587y");

module.exports = {
    TokenStandard,
    znnZts,
    qsrZts,
    emptyZts
}