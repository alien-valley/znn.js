const {RequestManager, HTTPTransport, Client, WebSocketTransport} = require("@open-rpc/client-js");

class WSSubscriptions {
    constructor() {
        this.callbacks = {}
    }

    setCallback(id, callback) {
        this.callbacks[id] = callback
    }

    handleGlobalNotification(data) {
        const id = data.params.subscription
        if (id in this.callbacks) {
            const callback = this.callbacks[id]
            if (callback) {
                callback(data.params.result)
            }
        }
    }

    newUpdateStream(jsonResponse) {
        // jsonResponse is just the ID actually
        return new WSUpdateStream(jsonResponse, this)
    }
}

class WSUpdateStream {
    constructor(id, wsSubscribers) {
        this.id = id;
        this.wsSubscribers = wsSubscribers
    }

    onNotification(callback) {
        this.wsSubscribers.setCallback(this.id, callback)
    }
}

function fromTransport(transport) {
    return new Client(new RequestManager([transport]));
}

const newHTTPClient = function (url) {
    const client = fromTransport(new HTTPTransport(url));
    client.isWS = false
    return client;
}

const newWSClient = function (url) {
    const client = fromTransport(new WebSocketTransport(url));
    client.isWS = true
    client.subscriptions = new WSSubscriptions()
    client.onNotification(client.subscriptions.handleGlobalNotification.bind(client.subscriptions))
    return client
}

// All-purpose functions, which gets the type of connection used form the URL
// accepts urls like
// - http://localhost:35997
// - ws://localhost:35998
const newClient = function (url) {
    switch (url.split(':')[0]) {
        case 'ws':
        case 'wss':
            return newWSClient(url)
        case 'http':
        case 'https':
            return newHTTPClient(url)
        default:
            throw 'unknown url type'
    }
}

module.exports = {
    newClient,
    newHTTPClient,
    newWSClient
}
