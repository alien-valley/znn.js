import 'dart:async';
import 'dart:io';

import 'package:znn_sdk_dart/znn_sdk_dart.dart';
import 'package:bip39/bip39.dart' as bip39;
import 'package:path/path.dart' as path;

Future<void> main() async {
  // mnemonic generated using
  // $ ./cli wallet.createNew password test-keyFile
  // # ./cli -k test-keyFile -p password wallet.dumpMnemonic
  final String mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";
  final String password = "password";
  final String name = "test-keyFile";

  // from znn-cli @ createFromMnemonic
  if (!bip39.validateMnemonic(mnemonic)) {
    throw 'Invalid mnemonic';
  }

  File keyStore = await Zenon().keyStoreManager.createFromMnemonic(mnemonic, password, name);
  print('keyStore successfully created from mnemonic: ${path.basename(keyStore.path)}');

  // possible output of file
  /*
    {
       "baseAddress":"z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq",
       "crypto":{
          "argon2Params":{
             "salt":"0xab4801d422d25662820f75b53878bf08"
          },
          "cipherData":"0x652514c94526bbca6d82f5c663d047803b18819ef7be0dd6bc45822343b70a46d7ffda6730ccd8a26f636bacfcb318d3",
          "cipherName":"aes-256-gcm",
          "kdf":"argon2.IDKey",
          "nonce":"0xf52d55466f05414a5a9f528b"
       },
       "timestamp":1639039880,
       "version":1
    }
   */
}
