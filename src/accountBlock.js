const {Address, emptyAddress} = require("./address")
const {TokenStandard, emptyZts} = require("./tokenStandard")
const {Hash, emptyHash} = require("./hash")
const {HashHeight, emptyHashHeight} = require("./hashHeight")

longToBytes = (value) => {
    let b = Buffer.alloc(8);
    b.writeUInt32BE(value, 4);
    return b;
}
bigIntToBytes = (value) => {
    let b = Buffer.alloc(32);
    b.writeBigUInt64BE(BigInt(value), 24);
    return b;
}

class AccountBlock {
    constructor() {
        this.version = 1;
        this.blockType = 0;
        this.fromBlockHash = emptyHash;
        this.chainIdentifier = 1;
        this.hash = emptyHash;
        this.previousHash = emptyHash;
        this.height = 0;
        this.momentumAcknowledged = emptyHashHeight;
        this.address = emptyAddress;
        this.toAddress = emptyAddress;
        this.amount = 0;
        this.tokenStandard = emptyZts;
        this.fusedPlasma = 0;
        this.data = Buffer.from("", "hex");
        this.difficulty = 0;
        this.nonce = Buffer.from("0000000000000000", "hex");
        this.publicKey = null;
        this.signature = null;
    }

    static FromJson(json) {
        let ab = new AccountBlock();
        ab.version = json['version'];
        ab.blockType = json['blockType'];
        ab.fromBlockHash = Hash.Parse(json['fromBlockHash']);
        ab.chainIdentifier = json['chainIdentifier'];
        ab.hash = Hash.Parse(json['hash']);
        ab.previousHash = Hash.Parse(json['previousHash']);
        ab.height = json['height'];
        ab.momentumAcknowledged = HashHeight.FromJson(json['momentumAcknowledged']);
        ab.address = Address.Parse(json['address']);
        ab.toAddress = Address.Parse(json['toAddress']);
        ab.amount = json['amount'];
        ab.tokenStandard = TokenStandard.Parse(json['tokenStandard']);
        ab.fusedPlasma = json["fusedPlasma"];
        ab.data = Buffer.from(json['data'], 'base64');
        ab.difficulty = json['difficulty'];
        ab.nonce = Buffer.from(json['nonce'], 'hex');
        ab.publicKey = Buffer.from(json['publicKey'], 'base64');
        ab.signature = Buffer.from(json['signature'], 'base64');
        return ab;
    }

    getHash() {
        return Hash.Digest(
            Buffer.concat([
                longToBytes(this.version),
                longToBytes(this.chainIdentifier),
                longToBytes(this.blockType),
                this.previousHash.core,
                longToBytes(this.height),
                this.momentumAcknowledged.hash.core,
                longToBytes(this.momentumAcknowledged.height),
                this.address.core,
                this.toAddress.core,
                bigIntToBytes(this.amount),
                this.tokenStandard.core,
                this.fromBlockHash.core,
                Hash.Digest(Buffer.alloc(0)).core,
                Hash.Digest(this.data).core,
                longToBytes(this.fusedPlasma),
                longToBytes(this.difficulty),
                this.nonce
            ]));

    }
}

module.exports = AccountBlock