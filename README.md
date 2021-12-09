# znn.js

znn.js is a community-backed javascript SDJ for the [zenon.network](https://zenon.network/) project. 
The implementation is based on the [official Dart SDK](https://github.com/zenon-network/znn_sdk_dart).

## Minimal requirements

- allow devs to create addresses from a mnemonic
- allow devs to create the hash of a block
- allow devs to sign a block

In theory, this will allow any JS-client to be able to interact with the ZNN network in a rudimentary way. 
All read operations can be done as depicted in the [who-to-delegate tool](http://alien-valley.io/who-to-delegate.html) 
@ source code [here](https://github.com/alien-valley/alien-valley.github.io/blob/master/assets/js/whoToDelegate.js).

Snippet of code depicting a `embedded.pillar.getAll` RPC call
```js
$.ajax({
    type: 'POST',
    url: 'http://ip-of-node:35997',
    crossDomain: true,
    data: '{"jsonrpc": "2.0","id": 30,"method": "embedded.pillar.getAll","params": [0, 150]}',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    }, success: function (response) {
    }
})
```

