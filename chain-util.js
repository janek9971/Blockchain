const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const { v4: uuidv4 } = require('uuid');
const ec = new EC('secp256k1');

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidv4();
    }

    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, messageHash) {
        return ec.keyFromPublic(publicKey, 'hex').verify(messageHash, signature);
      }
}

module.exports = ChainUtil;