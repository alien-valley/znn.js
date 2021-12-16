const {znnZts, qsrZts, emptyZts} = require("./tokenStandard")

describe('Token Standard', () => {
    it("correct constants", async () => {
        expect(znnZts.toString()).toEqual("zts1znnxxxxxxxxxxxxx9z4ulx");
        expect(qsrZts.toString()).toEqual("zts1qsrxxxxxxxxxxxxxmrhjll");
        expect(emptyZts.toString()).toEqual("zts1qqqqqqqqqqqqqqqqtq587y");
    });
});
