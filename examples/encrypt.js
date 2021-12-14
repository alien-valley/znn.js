const KeyFile = require('../src/keyFile.js')

async function main() {
    const entropy = Buffer.from('00e089c2d43064b3462ce24fc09099fe9fd2cf3657b6335462972baa911d31fc', 'hex');
    const password = "password";
    const kf = await KeyFile.Encrypt(entropy, password);
    console.log(JSON.stringify(kf, null, 4));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });