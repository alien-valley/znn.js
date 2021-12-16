const {bech32} = require("bech32");

class TokenStandard {
    constructor(core) {
        this.core = core;
    }

    toString() {
        return bech32.encode("zts", bech32.toWords(this.core));
    }

    static Parse(str) {
        try {
            const {prefix, words} = bech32.decode(str);
            let extractedCore = new Buffer.from(bech32.fromWords(words));
            if (prefix !== 'zts') {
                throw `prefix ${prefix} should be 'zts'`
            }
            if (extractedCore.length !== 10) {
                throw `invalid length ${extractedCore.length}; should be 10`;
            }
            return new TokenStandard(extractedCore)
        } catch (e) {
            throw `failed to parse TokenStandard. ${e.toString()}`
        }
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