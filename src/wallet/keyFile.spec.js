const {KeyFile} = require("./keyFile")

describe('KeyFile', () => {
    it("decrypts correct 24 mnemonic", async () => {
        const password = "password";
        const json = {
            "baseAddress": "z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq",
            "crypto": {
                "argon2Params": {
                    "salt": "0xab4801d422d25662820f75b53878bf08"
                },
                "cipherData": "0x652514c94526bbca6d82f5c663d047803b18819ef7be0dd6bc45822343b70a46d7ffda6730ccd8a26f636bacfcb318d3",
                "cipherName": "aes-256-gcm",
                "kdf": "argon2.IDKey",
                "nonce": "0xf52d55466f05414a5a9f528b"
            },
            "timestamp": 1639039880,
            "version": 1
        };

        const entropy = await KeyFile.Decrypt(json, password);
        expect(entropy.toString("hex")).toEqual("00e089c2d43064b3462ce24fc09099fe9fd2cf3657b6335462972baa911d31fc")
    });

    it("decrypts correct 12 mnemonic", async () => {
        const password = "password";
        const json = {
                "baseAddress": "z1qrf825tea0hha086vjnn4dhpl5wsdcesktxh5x",
                "crypto": {
                    "argon2Params": {"salt": "0x4cb0009a61148aa2874dbb8450c2cfca"},
                    "cipherData": "0x142b5bcfdac54ad3a6a2cfb627f30f80a4080e02500cab75a9b79b3ccf2752ef",
                    "cipherName": "aes-256-gcm",
                    "kdf": "argon2.IDKey",
                    "nonce": "0xa31fb4d6027c482fd9d85c1d"
                },
                "timestamp": 1639637010,
                "version": 1
            }
        ;

        const entropy = await KeyFile.Decrypt(json, password);
        expect(entropy.toString("hex")).toEqual("bbefd88e1ff3f673d24da98b51f04ee7")
    })

    it("encrypts correct 24 mnemonic", async () => {
        const password = "password";
        const initialEntropy = Buffer.from("00e089c2d43064b3462ce24fc09099fe9fd2cf3657b6335462972baa911d31fc", "hex");
        const json = await KeyFile.Encrypt(initialEntropy, password);

        const finalEntropy = await KeyFile.Decrypt(json, password);
        expect(finalEntropy).toEqual(initialEntropy);
    })

    it("encrypts correct 12 mnemonic", async () => {
        const password = "password";
        const initialEntropy = Buffer.from("bbefd88e1ff3f673d24da98b51f04ee7", "hex");
        const json = await KeyFile.Encrypt(initialEntropy, password);

        const finalEntropy = await KeyFile.Decrypt(json, password);
        expect(finalEntropy).toEqual(initialEntropy);
    })
});
