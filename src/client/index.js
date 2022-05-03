const {RequestManager, HTTPTransport, Client, WebSocketTransport} = require("@open-rpc/client-js");

function fromTransport(transport) {
    const client = new Client(new RequestManager([transport]));
    return async function (method, params) {
        const response = client.request({method, params})
        return {result: response}
    }
}

const newHTTPClient = function(url) {
    return fromTransport(new HTTPTransport(url));
}

const newWSClient = function(url) {
    return fromTransport(new WebSocketTransport(url));
}

// All-purpose functions, which gets the type of connection used form the URL
// accepts urls like
// - http://localhost:35997
// - ws://localhost:35998
const newClient = function(url) {
    switch(url.split(':')[0]) {
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
