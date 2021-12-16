const Address = require("./address")
const TokenStandard = require("./tokenStandard")
const Hash = require("./hash")
const HashHeight = require("./hashHeight")

module.exports = {
    ...Address,
    ...TokenStandard,
    ...Hash,
    ...HashHeight
}