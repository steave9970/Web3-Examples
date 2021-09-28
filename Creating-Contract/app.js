const Tx = require('ethereumjs-tx').Transaction
var Web3 = require('Web3');

var web3 = new Web3('https://ropsten.infura.io/v3/7da65f703e384b53bd61dc5cab5d9c97');

const account1 = '0x2770Fd1f5F786D054cbf37A666F1d0c65FbA7EF6';
const account2 = '0x8129d94c543435551683E4291D9C41f22C6C3302';

const privateKey1 = '6795e485e138edeac61fd9861c5d696c09b4de162dc0a8e2bd8223ae2e25bc52'
const privateKey2 = 'e67cf8cc79b67b75a795e0e15406b2e19b0c5e5ff85336841b6aad75b0fa9524'

const privateKey1Buffer = Buffer.from(privateKey1, 'hex')
const privateKey2Buffer = Buffer.from(privateKey2, 'hex')

console.log('Buffer 1: ', privateKey1Buffer)
console.log('Buffer 2: ', privateKey2Buffer)


// Read the deployed contract - get the addresss from Etherscan
const contractAddress = '0xd03696B53924972b9903eB17Ac5033928Be7D3Bc'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

const contract = new web3.eth.Contract(contractABI, contractAddress)

// Transfer some tokens
web3.eth.getTransactionCount(account1, (err, txCount) => {

  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data: contract.methods.transfer(account2, 1000).encodeABI()
  }

  const tx = new Tx(txObject)
  tx.sign(privateKey1Buffer)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  })
})

// Check Token balance for account1
contract.methods.balanceOf(account1).call((err, balance) => {
  console.log({ err, balance })
})

// Check Token balance for account2
contract.methods.balanceOf(account2).call((err, balance) => {
  console.log({ err, balance })
})
