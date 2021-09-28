const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/7da65f703e384b53bd61dc5cab5d9c97')

const account1 = '0x2770Fd1f5F786D054cbf37A666F1d0c65FbA7EF6';
const account2 = '0x8129d94c543435551683E4291D9C41f22C6C3302';

const privateKey1 = '6795e485e138edeac61fd9861c5d696c09b4de162dc0a8e2bd8223ae2e25bc52'
const privateKey2 = 'e67cf8cc79b67b75a795e0e15406b2e19b0c5e5ff85336841b6aad75b0fa9524'

const privateKey1Buffer = Buffer.from(privateKey1, 'hex')
const privateKey2Buffer = Buffer.from(privateKey2, 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1Buffer)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})