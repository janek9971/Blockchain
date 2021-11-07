const ChainUtil = require('../chain-util');
const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor() {
        this.id = ChainUtil.id()
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(senderWallet, recipient, amount) {
        if (amount > senderWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance`)
            return;
        }
        const transaction = new this();

        transaction.outputs.push(...[
            {
                amount: senderWallet.balance - amount,
                address: senderWallet.publicKey
            },
            {
                amount,
                address: recipient
            }
        ])

        Transaction.signTransaction(transaction, senderWallet);

        return transaction;
    }

    update(senderWallet, recipient, amount) {
        const senderOutput = this.outputs.find(output => output.address = senderWallet.publicKey);

        if (amount > senderOutput.amount) {
            console.log(`Amount: ${amount} exceeds balance`)
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({amount, address: recipient});

        Transaction.signTransaction(this, senderWallet);

        return this;
    }

    static messageHash(transaction) {
        return ChainUtil.hash(transaction.outputs);
    }

    static verifyTransaction(transaction) {
        const { signature, address } = transaction.input
        const messageHash = Transaction.messageHash(transaction);
        return ChainUtil.verifySignature(address, signature, messageHash)
    }

    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(Transaction.messageHash(transaction)),
        }
    }
}

module.exports = Transaction;