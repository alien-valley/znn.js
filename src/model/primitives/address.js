const {bech32} = require("bech32");

class Address {
    constructor(core) {
        this.core = core;
    }

    toString() {
        return bech32.encode("z", bech32.toWords(this.core));
    }

    static Parse(str) {
        try {
            const {prefix, words} = bech32.decode(str);
            let extractedCore = new Buffer.from(bech32.fromWords(words));
            if (prefix !== 'z') {
                throw `invalid prefix ${prefix}; should be 'z'`
            }
            if (extractedCore.length !== 20) {
                throw `invalid length ${extractedCore.length}; should be 20`;
            }
            return new Address(extractedCore)
        } catch (e) {
            throw `failed to parse Address. ${e.toString()}`
        }
    }
}

const EmptyAddress = Address.Parse("z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f");

module.exports = {
    Address,
    emptyAddress: EmptyAddress
};