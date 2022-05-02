const {defaultAbiCoder, Interface} = require('./eth-abi');
const {Address, Hash, TokenStandard} = require('../model');

class Abi {
    constructor(list) {
        let converted = [];
        for (const entry of list) {
            if (entry.type === 'function') {
                converted.push({
                    type: 'function',
                    name: entry.name,
                    inputs: entry.inputs,
                    constant: true,
                    stateMutability: 'view',
                    payable: false,
                    outputs: []
                });
            }
        }
        this.interface = new Interface(converted);
    }

    static encodeType(param, value) {
        if (param.type === 'address') {
            if (value instanceof Address) {
                return '0x' + value.core.toString('hex');
            } else if (typeof value === 'string') {
                return '0x' + Address.Parse(value).core.toString('hex');
            } else {
                throw new Error(`invalid param type ${typeof value} for ABI type 'address'`);
            }
        } else if (param.type === 'tokenStandard') {
            if (value instanceof TokenStandard) {
                return '0x' + value.core.toString('hex');
            } else if (typeof value === 'string') {
                return '0x' + TokenStandard.Parse(value).core.toString('hex');
            } else {
                throw new Error(`invalid param type ${typeof value} for ABI type 'tokenStandard'`);
            }
        } else if (param.type === 'hash') {
            if (value instanceof Hash) {
                return '0x' + value.core.toString('hex');
            } else if (typeof value === 'string') {
                if (value.substr(0, 2) === '0x') {
                    return value
                } else {
                    return '0x' + value
                }
            } else {
                throw new Error(`invalid param type ${typeof value} for ABI type 'hash'`);
            }
        } else {
            return value;
        }
    }

    static parseType(param, value) {
        if (param.type === 'address') {
            return Address.FromHex(value).toString();
        } else if (param.type === 'tokenStandard') {
            return TokenStandard.FromHex(value).toString();
        } else {
            return value;
        }
    }

    encode(methodName, params) {
        const f = this.interface.getFunction(methodName);

        if (f.inputs.length !== params.length) {
            throw new Error('invalid params. illegal length');
        }
        let newParams = [];
        for (let i = 0; i < f.inputs.length; i += 1) {
            newParams.push(Abi.encodeType(f.inputs[i], params[i]));
        }

        const hash = Hash.Digest(Buffer.from(f.format()))
        const signature = Buffer.from(hash.core.slice(0, 4)).toString('hex');
        const paramsEncoded = defaultAbiCoder.encode(f.inputs, newParams);
        return Buffer.from(signature + paramsEncoded.slice(2), 'hex');
    }

    decode(methodName, data) {
        const f = this.interface.getFunction(methodName);
        const r = defaultAbiCoder.decode(f.inputs, '0x' + data.slice(8));
        let response = {};
        for (let i = 0; i < f.inputs.length; i += 1) {
            response[f.inputs[i].name] = Abi.parseType(f.inputs[i], r[i]);
        }
        return response;
    }
}

module.exports = Abi
