const path = require('node:path');
const fs = require('node:fs');
const {KeyFile} = require("./keyFile");

function getZenonPath() {
    const platform = process.platform;
    if (platform === "darwin") {
        return path.join(process.env['HOME'], 'Library', 'znn');
    } else if (platform === "linux") {
        return path.join(process.env['HOME'], '.znn');
    } else if (platform === "win32") {
        return path.join(process.env['AppData'], 'znn');
    } else {
        return path.join(process.env['HOME'], 'znn');
    }
}

function getWalletPath() {
    return path.join(getZenonPath(), 'wallet')
}

// node wallet-manager is a specific implementation for use in node mode (non-browser environment)
// uses the default zenon-wallet folder to store & read KeyFiles
// note: the default zenon-wallet folder is different based on the system
class NodeWalletManager {
    constructor(path) {
        this.path = path
    }

    list() {
        return fs.readdirSync(this.path)
    }

    async read(password, name) {
        let keyFile = JSON.parse(fs.readFileSync(path.join(this.path, name)));
        return await KeyFile.Decrypt(keyFile, password)
    }

    async save(store, password, name) {
        const encrypted = await KeyFile.Encrypt(store, password)
        fs.writeFileSync(path.join(this.path, name), JSON.stringify(encrypted))
    }
}

module.exports = {
    manager: new NodeWalletManager(getWalletPath()),
}
