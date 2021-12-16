const KeyPair = require("./keyPair")

describe('KeyPair', () => {
    it("generates correct address", async () => {
        const mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";
        expect(KeyPair.FromMnemonic(mnemonic).address().toString()).toEqual("z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq")
    });
});
