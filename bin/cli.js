const znn = require("../src/")
const crypto = require("crypto");
const fs = require("fs");
const api = require("../src/api");
const {fastForwardBlock} = require("../src");
const {newClient} = require("../src/client");

const decrypt = async function (password, path) {
    let keyFile = JSON.parse(fs.readFileSync(path));
    const entropy = await znn.wallet.KeyFile.Decrypt(keyFile, password)
    return znn.wallet.KeyStore.FromEntropy(entropy).getKeyPair()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const args = process.argv.slice(2);
    let password = args[1];
    let path = args[2];
    let keyPair, address;
    let response, entry;

    // const client = newClient('http://139.177.178.226:35997')
    const client = newClient('ws://139.177.178.226:35998')

    switch (args[0]) {
        case 'decrypt':
            if (args.length !== 3) {
                throw "invalid usage; decrypt 'password' path"
            }

            address = (await decrypt(password, path)).address
            console.log(`Decrypted key-file with address ${address.toString()}`);
            break;

        case 'new':
            if (args.length !== 3) {
                throw "invalid usage; new 'password' path"
            }

            // create new entropy
            const newEntropy = new Buffer.from(crypto.randomBytes(32), 'utf8')
            const baseAddress = znn.wallet.KeyStore.FromEntropy(newEntropy).baseAddress
            console.log(`Created a new key-file with address ${baseAddress.toString()}`);

            fs.writeFileSync(path, JSON.stringify(await znn.wallet.KeyFile.Encrypt(newEntropy, password)));
            break;

        case 'plasma.get':
            if (args.length !== 3) {
                throw "invalid usage; plasma.get 'password' path"
            }
            address = (await decrypt(password, path)).address

            response = await api.embedded.plasma.get(client, address)
            console.log(`Plasma for account ${address.toString()}, ${response.currentPlasma}`);
            break;

        case 'plasma.list':
            if (args.length !== 3) {
                throw "invalid usage; plasma.list 'password' path"
            }
            address = (await decrypt(password, path)).address

            response = await api.embedded.plasma.getEntriesByAddress(client, address, 0, 10)
            console.log(`Plasma entries for account ${address.toString()} - number ${JSON.stringify(response.count)}`);
            for (entry of response.list) {
                console.log(entry.beneficiary, entry.qsrAmount, entry.id)
            }
            break;

        case 'plasma.fuse':
            if (args.length !== 5) {
                throw "invalid usage; plasma.fuse 'password' path beneficiary amount"
            }
            keyPair = await decrypt(password, path)

            let beneficiary = args[3];
            let amount = args[4]

            response = await fastForwardBlock(client, keyPair, api.embedded.plasma.fuse({beneficiary, amount: parseInt(amount)}))

            console.log(`Fused plasma for ${beneficiary}; ${JSON.stringify(response)}`);
            break;

        case 'plasma.cancel':
            if (args.length !== 4) {
                throw "invalid usage; plasma.fuse 'password' path id"
            }
            keyPair = await decrypt(password, path)

            let id = args[3];

            response = await fastForwardBlock(client, keyPair, api.embedded.plasma.cancel({id}))

            console.log(`Cancel fuse entry with ID ${id}; ${JSON.stringify(response)}`);
            break;

        case 'listen.momentums':
            if (args.length !== 1) {
                throw "invalid usage; listen.momentums"
            }

            response = await api.subscribe.toMomentums(client)
            response.onNotification((data) => {
                console.log(`Received new Momentum! Height:${data[0].height} Hash:${data[0].hash} CurrentTime:${new Date()}`)
            })

            // never return since the
            for (;;) {
                await sleep(1000)
            }

        case 'listen.allAccountBlocks':
            if (args.length !== 1) {
                throw "invalid usage; listen.allAccountBlocks"
            }

            response = await api.subscribe.toAllAccountBlocks(client)
            response.onNotification((data) => {
                for (const block of data) {
                    console.log(`Received new Account Block! Address:${block.address} Height:${block.height} Hash:${block.hash} CurrentTime:${new Date()}`)
                }
            })

            // never return since the
            for (;;) {
                await sleep(1000)
            }

        default:
            console.log('unknown command');
            console.log('');
            console.log('Options:');
            console.log("  decrypt 'password' path");
            console.log("  new 'password' path");
            console.log("  plasma.get 'password' path");
            console.log("  plasma.list 'password' path");
            console.log("  plasma.fuse 'password' path beneficiary amount");
            console.log("  plasma.cancel 'password' id");
            console.log("  listen.momentums");
            console.log("  listen.allAccountBlocks");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
