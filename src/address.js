const {bech32} = require("bech32");

class Address {
    constructor(core) {
        this.core = core;
    }

    toString() {
        return bech32.encode("z", bech32.toWords(this.core));
    }

    static Parse(str) {
        const {prefix, words} = bech32.decode(str);
        let extractedCore = new Buffer.from(bech32.fromWords(words));
        if (prefix !== 'z') {
            throw `invalid prefix ${prefix} should be 'z'`
        }
        return new Address(extractedCore)
    }
}

const EmptyAddress = Address.Parse("z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f");

module.exports = {
    Address,
    EmptyAddress
};