const bip39 = require('bip39');

const {Address} = require('../src/address.js')
const KeyPair = require('../src/keyPair.js')

// target is to obtain the baseAddress from the keyFile from the mnemonic
async function main() {
    const mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";

    // const entropy = bip39.mnemonicToEntropy(mnemonic);
    console.log(`entropy ${bip39.mnemonicToEntropy(mnemonic)}`)

    const keyPair = KeyPair.FromMnemonic(mnemonic)

    // should get 881967d6529347a07f73ee2c5f0596b1b4bce44b828ac0a1fd77a0c3f1903559
    console.log(`publicKey ${keyPair.publicKey.toString('hex')}`);

    // should get z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq
    console.log(`address ${keyPair.address().toString()}`)

    const parsed = Address.Parse("z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq")
    console.log(`parsed address ${parsed.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });