const argon2 = require('argon2-browser');
const crypto = require('crypto');

// https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81
// Demo implementation of using `aes-256-gcm` with node.js's `crypto` lib.
const aes256gcm = (key) => {
    const ALGO = 'aes-256-gcm';

    // encrypt returns base64-encoded ciphertext
    const encrypt = (str) => {
        // The `iv` for a given key must be globally unique to prevent
        // against forgery attacks. `randomBytes` is convenient for
        // demonstration but a poor way to achieve this in practice.
        //
        // See: e.g. https://csrc.nist.gov/publications/detail/sp/800-38d/final
        const iv = new Buffer(crypto.randomBytes(12), 'utf8');
        const cipher = crypto.createCipheriv(ALGO, key, iv);

        // Hint: Larger inputs (it's GCM, after all!) should use the stream API
        let enc = cipher.update(str, 'utf8', 'base64');
        enc += cipher.final('base64');
        return [enc, iv, cipher.getAuthTag()];
    };

    // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
    const decrypt = (enc, iv) => {
        return crypto.createDecipheriv(ALGO, key, iv).update(enc);
    };

    return {
        encrypt,
        decrypt,
    };
};

class KeyFile {
    constructor(j) {
        this.baseAddress = j.baseAddress;
        this.salt = j.crypto.argon2Params.salt.substr(2);
        this.encrypted = j.crypto.cipherData.substr(2);
        this.aesNonce = j.crypto.nonce.substr(2)
    }

    // returns entropy
    async decrypt(password) {
        // adding some prints in the DART SDK yields
        // key = e85a18546e4a45a09ab1312171b026fd2edd2d7957cae2360264f7425cef71d2
        // which in base64 is 6FoYVG5KRaCasTEhcbAm/S7dLXlXyuI2AmT3QlzvcdI=

        // from Go codebase
        // https://github.com/zenon-network/go-zenon/blob/master/wallet/password.go#L25
        /*
            pw := argon2.IDKey([]byte(password), h.salt, 1, 64*1024, 4, 32)
            func IDKey(password, salt []byte, time, memory uint32, threads uint8, keyLen uint32) []byte
         */
        let key = await argon2.hash({
            pass: password,
            salt: Buffer.from(this.salt, 'hex'),
            time: 1, // the number of iterations
            mem: 64 * 1024, // used memory, in KiB
            parallelism: 4, // desired parallelism (it won't be computed in parallel, however)
            hashLen: 32, // desired hash length
            type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
        })

        // should get e85a18546e4a45a09ab1312171b026fd2edd2d7957cae2360264f7425cef71d2
        // console.log(key)

        // from Go codebase
        // https://github.com/zenon-network/go-zenon/blob/master/wallet/keyfile.go#L83
        /*
            entropy, err := aesGCMDecrypt(derivedKey.password[:32], kf.Crypto.CipherData, kf.Crypto.AesNonce)
            if err != nil {
                return nil, ErrWrongPassword
            }
         */

        const aesCipher = aes256gcm(key.hash);
        return aesCipher.decrypt(
            Buffer.from(this.encrypted, 'hex'),
            Buffer.from(this.aesNonce, 'hex'),
        ).subarray(0, 32);
    }
}

module.exports = KeyFile;