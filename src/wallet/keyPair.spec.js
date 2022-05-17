const {KeyStore, KeyPair} = require("./index")
const {emptyHash} = require("../model")

describe('KeyPair', () => {
    // signatures are random because they depend on a seed
    // without setting the seed, there is no way to design a test that checks for a specific signature
    it("signature length", async () => {
        const entropy = Buffer.from("bbefd88e1ff3f673d24da98b51f04ee7", "hex");
        const kp = KeyStore.FromEntropy(entropy).getKeyPair();
        expect((await kp.sign(emptyHash)).toString('base64').length).toEqual(88);
    })

    it("gets address", async () => {
        const kp = KeyPair.FromPrivateKey(Buffer.from('f58cb2e1add0382c2004fa8e04895a65a3c755553e60187d697c2e5ab9df67ea', 'hex'))
        expect(kp.address.toString()).toEqual('z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq')
    })

    it("gets public key", async () => {
        const kp = KeyPair.FromPrivateKey(Buffer.from('f58cb2e1add0382c2004fa8e04895a65a3c755553e60187d697c2e5ab9df67ea', 'hex'))
        expect(kp.publicKey.toString('hex')).toEqual('881967d6529347a07f73ee2c5f0596b1b4bce44b828ac0a1fd77a0c3f1903559')
    })
});
