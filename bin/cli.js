const KeyFile = require('../src/keyFile.js')
const KeyPair = require('../src/keyPair.js')
const crypto = require("crypto");
const fs = require("fs");

async function main() {
    var args = process.argv.slice(2);
    let password = args[1];
    let path = args[2];

    switch (args[0]) {
        case 'decrypt':
            if (args.length !== 3) {
                throw "invalid usage; decrypt 'password' path"
            }

            let keyFile = JSON.parse(fs.readFileSync(path));
            const entropy = await KeyFile.Decrypt(keyFile, password)
            const kp = KeyPair.FromEntropy(entropy)

            console.log(`Decrypted key-file with address ${kp.address().toString()}`);
            break;

        case 'new':
            if (args.length !== 3) {
                throw "invalid usage; new 'password' path"
            }

            // create new entropy
            const newEntropy = new Buffer.from(crypto.randomBytes(32), 'utf8')
            const newKp = KeyPair.FromEntropy(newEntropy)
            console.log(`Created a new key-file with address ${newKp.address().toString()}`);

            fs.writeFileSync(path, JSON.stringify(await KeyFile.Encrypt(newEntropy, password)));
            break;

        default:
            console.log('unknown');
            console.log('');
            console.log('Options:');
            console.log("  decrypt 'password' path");
            console.log("  new 'password' path");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
