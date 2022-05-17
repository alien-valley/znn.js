const {KeyStore} = require("./index")

describe('KeyStore', () => {
    it("from 24 mnemonic", async () => {
        const mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";
        const keyStore = KeyStore.FromMnemonic(mnemonic)
        expect(keyStore.baseAddress.toString()).toEqual("z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq")
        expect(keyStore.entropy.toString('hex')).toEqual('00e089c2d43064b3462ce24fc09099fe9fd2cf3657b6335462972baa911d31fc')
    });

    it("from 24 entropy", async () => {
        const entropy = Buffer.from("00e089c2d43064b3462ce24fc09099fe9fd2cf3657b6335462972baa911d31fc", "hex");
        const keyStore = KeyStore.FromEntropy(entropy)
        expect(keyStore.baseAddress.toString()).toEqual("z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq")
        expect(keyStore.mnemonic).toEqual("abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million")
    });

    it("from 12 mnemonic", async () => {
        const mnemonic = "room learn castle divide disorder delay empty release mercy moon beauty solar";
        const keyStore = KeyStore.FromMnemonic(mnemonic)
        expect(keyStore.baseAddress.toString()).toEqual("z1qrf825tea0hha086vjnn4dhpl5wsdcesktxh5x")
        expect(keyStore.entropy.toString('hex')).toEqual('bbefd88e1ff3f673d24da98b51f04ee7')
    });

    it("from 12 entropy", async () => {
        const entropy = Buffer.from("bbefd88e1ff3f673d24da98b51f04ee7", "hex");
        const keyStore = KeyStore.FromEntropy(entropy)
        expect(keyStore.baseAddress.toString()).toEqual("z1qrf825tea0hha086vjnn4dhpl5wsdcesktxh5x")
        expect(keyStore.mnemonic).toEqual("room learn castle divide disorder delay empty release mercy moon beauty solar")
    });

    it("derives index 1 correctly", async () => {
        const mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";
        const keyStore = KeyStore.FromMnemonic(mnemonic)
        expect(keyStore.getKeyPair(1).address.toString()).toEqual("z1qq6eg8n43g032hanpsfp02qcdmv7zfj3y2lt5d")
    })

    it("derives index 70000 correctly", async () => {
        const mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";
        const keyStore = KeyStore.FromMnemonic(mnemonic)
        expect(keyStore.getKeyPair(70000).address.toString()).toEqual("z1qrcp90g99k5yal3p28w7kx90dmqsgr8n7llzv4")
    })
});
