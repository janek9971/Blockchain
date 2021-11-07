const Wallet = require('./wallet');
const ChainUtil = require('./chain-util');
const wallet = new Wallet();
console.log(wallet.toString());
console.log(ChainUtil.id());