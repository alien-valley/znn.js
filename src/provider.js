class InternalProvider {
    constructor(client, keyPair) {
        this.client = client
        this.keyPair = keyPair
    }

    setClient(client) {
        this.client = client
    }

    setKeyPair(keyPair) {
        this.keyPair = keyPair
    }
}

let provider = new InternalProvider(undefined, undefined)

function setProvider(provider_) {
    provider = provider_
}

module.exports = {
    provider,
    setProvider
}
