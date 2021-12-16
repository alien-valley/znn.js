const {SHA3} = require("sha3");

class Hash {
    constructor(core) {
        this.core = core;
    }

    toString() {
        return this.core.toString("hex");
    }

    static Parse(hexString) {
        return new Hash(Buffer.from(hexString, "hex"));
    }

    static Digest(data) {
        return new Hash(SHA3(256).update(data).digest());
    }
}

module.exports = {
    Hash,
    emptyHash: Hash.Parse("00000000000000000000000000000000"),
};