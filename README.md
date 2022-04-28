# znn.js

znn.js is a community-backed javascript SDJ for the [zenon.network](https://zenon.network/) project. The implementation
is based on the [official Dart SDK](https://github.com/zenon-network/znn_sdk_dart).

## Applications that use znn.js

### [CLI](https://github.com/alien-valley/znn.js/blob/master/bin/cli.js)

- decrypt existing KeyFiles
- create new KeyFiles
- keyFiles are compatible with `znn-cli`

### Usage:

```
node bin/cli.js new 123456 ./zenon-keyfile-example
node bin/cli.js decrypt 123456 ./zenon-keyfile-example
```

### Possible output:

```
Created a new key-file with address z1qqf9fczsn6rhr7vepafyzrwchygxxwel7hmsqp
Decrypted key-file with address z1qqf9fczsn6rhr7vepafyzrwchygxxwel7hmsqp
```

### [Web Integration](https://github.com/alien-valley/znn.js/blob/master/examples/index.html)

- import S Y R I U S backups
- `send` transactions
- `auto-receive`
- shows balance
