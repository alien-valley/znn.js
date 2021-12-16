const {KeyPair} = require("./keyPair")

describe('KeyPair', () => {
    it("from 24 mnemonic", async () => {
        const mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";
        expect(KeyPair.FromMnemonic(mnemonic).address.toString()).toEqual("z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq")
    });

    it("from 12 mnemonic", async () => {
        const mnemonic = "room learn castle divide disorder delay empty release mercy moon beauty solar";
        expect(KeyPair.FromMnemonic(mnemonic).address.toString()).toEqual("z1qrf825tea0hha086vjnn4dhpl5wsdcesktxh5x")
    });

    it("from 24 entropy", async () => {
        const entropy = Buffer.from("00e089c2d43064b3462ce24fc09099fe9fd2cf3657b6335462972baa911d31fc", "hex");
        expect(KeyPair.FromEntropy(entropy).address.toString()).toEqual("z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq")
    });

    it("from 12 entropy", async () => {
        const entropy = Buffer.from("bbefd88e1ff3f673d24da98b51f04ee7", "hex");
        expect(KeyPair.FromEntropy(entropy).address.toString()).toEqual("z1qrf825tea0hha086vjnn4dhpl5wsdcesktxh5x")
    });
});
