const {Command} = require('commander');
const {fastForwardBlock, wallet, api, client, provider} = require("../src");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let options, args;
let store, keyPair, address;

async function setupKeyPair() {
    if (('passphrase' in options) && ('keyStore' in options)) {
        store = await wallet.manager.read(options.passphrase, options.keyStore)
        keyPair = store.getKeyPair()
        address = keyPair.address
        provider.setKeyPair(keyPair)
    }
}

async function setupNode() {
    provider.setClient(client.newClient(options.url))
}

const helpText = `Commands
  plasma.get
  plasma.list
  plasma.fuse beneficiary amount
  plasma.cancel id
  listen.momentums
  listen.allAccountBlocks
  wallet.decrypt
  wallet.new [name]
  wallet.list`

async function main() {
    const program = new Command();

    program
        .name('znn-cli.js')
        .description('CLI for interacting with Zenon ecosystem')
        .option(`-p, --passphrase <passphrase>`, 'use this passphrase for the keyStore')
        .option(`-k, --keyStore <keyStore>`, 'select the local keyStore')
        .option(`-u, --url <url>`, 'websocket/http znnd connection URL with a port', 'ws://139.177.178.226:35998')
        .addHelpText('after', `\n${helpText}`);

    program.parse();
    options = program.opts()
    args = program.args;

    await setupNode()
    await setupKeyPair()

    let response, entry, id;

    switch (args[0]) {
        case 'accelerator.all':
            if (args.length !== 1) {
                throw "invalid usage; accelerator.all"
            }

            response = await api.embedded.accelerator.getAll(0, 1000)
            for (let project of response.list) {
                console.log(`id:${project.id} name:${project.name}`)
            }
            break;

        case `accelerator.details`:
            if (args.length !== 2) {
                throw "invalid usage; accelerator.details ID"
            }

            id = args[1]
            const project = await api.embedded.accelerator.getProjectById(id)
            const projectStatusName = [  "voting", "active", "paid", "closed", "completed"]
            console.log("Project Details")
            console.log(`${project.name}\n${project.description}\nStatus: "${projectStatusName[project.status]}"\n`)

            const allPillars = await api.embedded.pillar.getAll(0, 200)
            const voteName = ['yes', 'no', 'abstain']

            console.log("Pillar Votes")
            for (let pillar of allPillars.list) {
                response = await api.embedded.accelerator.getPillarVotes(pillar.name, [id])
                if (response[0]) {
                    console.log(`${voteName[response[0].vote]} ${response[0].name}`)
                }
            }

            break;

        case 'plasma.get':
            if (args.length !== 1) {
                throw "invalid usage; plasma.get"
            }

            response = await api.embedded.plasma.get(address)
            console.log(`Plasma for account ${address.toString()}, ${response.currentPlasma}`);
            break;

        case 'plasma.list':
            if (args.length !== 1) {
                throw "invalid usage; plasma.list"
            }

            response = await api.embedded.plasma.getEntriesByAddress(address, 0, 10)
            console.log(`Plasma entries for account ${address.toString()} - number ${JSON.stringify(response.count)}`);
            for (entry of response.list) {
                console.log(entry.beneficiary, entry.qsrAmount, entry.id)
            }
            break;

        case 'plasma.fuse':
            if (args.length !== 3) {
                throw "invalid usage; plasma.fuse beneficiary amount"
            }

            let beneficiary = args[3];
            let amount = args[4]

            response = await fastForwardBlock(api.embedded.plasma.fuse({beneficiary, amount: parseInt(amount)}))

            console.log(`Fused plasma for ${beneficiary}; ${JSON.stringify(response)}`);
            break;

        case 'plasma.cancel':
            if (args.length !== 2) {
                throw "invalid usage; plasma.fuse id"
            }

            id = args[3];

            response = await fastForwardBlock(api.embedded.plasma.cancel({id}))

            console.log(`Cancel fuse entry with ID ${id}; ${JSON.stringify(response)}`);
            break;

        case 'listen.momentums':
            if (args.length !== 1) {
                throw "invalid usage; listen.momentums"
            }

            response = await api.subscribe.toMomentums()
            response.onNotification((data) => {
                console.log(`Received new Momentum! Height:${data[0].height} Hash:${data[0].hash} CurrentTime:${new Date()}`)
            })

            // never return since the
            for (; ;) {
                await sleep(1000)
            }

        case 'listen.allAccountBlocks':
            if (args.length !== 1) {
                throw "invalid usage; listen.allAccountBlocks"
            }

            response = await api.subscribe.toAllAccountBlocks()
            response.onNotification((data) => {
                for (const block of data) {
                    console.log(`Received new Account Block! Address:${block.address} Height:${block.height} Hash:${block.hash} CurrentTime:${new Date()}`)
                }
            })

            // never return since the
            for (; ;) {
                await sleep(1000)
            }

        case 'wallet.decrypt':
            if (args.length !== 1) {
                throw "invalid usage; decrypt"
            }

            console.log(`Decrypted key-file with address ${address.toString()}`);
            break;

        case 'wallet.new':
            if (args.length !== 1 && args.length !== 2) {
                throw "invalid usage; wallet.new [name]"
            }

            let password = options.passphrase
            let name = args[1]

            store = wallet.KeyStore.Random()
            // set a name if none was provided
            if (name === undefined) {
                name = store.baseAddress.toString()
            }
            await wallet.manager.save(store, password, name)
            console.log(`Created a new key-file with address ${store.baseAddress.toString()} and name ${name}`);
            break;

        case 'wallet.list':
            if (args.length !== 1) {
                throw "invalid usage; wallet.list"
            }

            console.log(wallet.manager.list())
            break;

        default:
            console.log(`unknown command "${args[0]}"\n`);
            console.log(helpText);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
