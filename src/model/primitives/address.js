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

    // 0xHEX
    static FromHex(str) {
        return new Address(Buffer.from(str.substr(2), 'hex'))
    }
}

const EmptyAddress = Address.Parse("z1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsggv2f");
const PlasmaAddress = Address.Parse('z1qxemdeddedxplasmaxxxxxxxxxxxxxxxxsctrp');
const PillarAddress = Address.Parse('z1qxemdeddedxpyllarxxxxxxxxxxxxxxxsy3fmg');
const TokenAddress = Address.Parse('z1qxemdeddedxt0kenxxxxxxxxxxxxxxxxh9amk0');
const SentinelAddress = Address.Parse('z1qxemdeddedxsentynelxxxxxxxxxxxxxwy0r2r');
const StakeAddress = Address.Parse('z1qxemdeddedxstakexxxxxxxxxxxxxxxxjv8v62');
const SporkAddress = Address.Parse('z1qxemdeddedxsp0rkxxxxxxxxxxxxxxxx956u48');
const AcceleratorAddress = Address.Parse('z1qxemdeddedxaccelerat0rxxxxxxxxxxp4tk22');
const BridgeAddress = Address.Parse('z1qzlytaqdahg5t02nz5096frflfv7dm3y7yxmg7');

module.exports = {
    Address,
    emptyAddress: EmptyAddress,
    PlasmaAddress,
    PillarAddress,
    TokenAddress,
    SentinelAddress,
    StakeAddress,
    SporkAddress,
    AcceleratorAddress,
    BridgeAddress
};
