const Hash = require("./hash")

describe('Hash', () => {
    it("digests hello world", async () => {
        expect(Hash.Digest(Buffer.from("hello world", "UTF-8")).toString()).toEqual("644bcc7e564373040999aac89e7622f3ca71fba1d972fd94a31c3bfbf24e3938");
    });

    it("parses correctly", async () => {
        const h = Hash.Parse("644bcc7e564373040999aac89e7622f3ca71fba1d972fd94a31c3bfbf24e3938");
        expect(h.toString()).toEqual("644bcc7e564373040999aac89e7622f3ca71fba1d972fd94a31c3bfbf24e3938");
    })
});
