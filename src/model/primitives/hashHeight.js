const {Hash, emptyHash} = require("./hash")

class HashHeight {
    constructor(height, hash) {
        this.height = height;
        this.hash = hash;
    }

    static FromJson(json) {
        return new HashHeight(
            json["height"],
            Hash.Parse(json["hash"]),
        );
    }
}

module.exports = {
    HashHeight,
    emptyHashHeight: new HashHeight(0, emptyHash)
};