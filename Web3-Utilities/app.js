const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/7da65f703e384b53bd61dc5cab5d9c97')


// Get access to the underscore JS library
var _ = web3.utils._;


// Get average gas price in wei from last few blocks median gas price
web3.eth.getGasPrice().then((result) => {
    console.log(web3.utils.fromWei(result, 'ether'));
})

// Use sha256 Hashing function
console.log(web3.utils.sha3('Dapp University'))

// // Use keccak256 Hashing function (alias)
console.log(web3.utils.keccak256('Dapp University'))

// // Get a Random Hex
console.log(web3.utils.randomHex(32))



// _.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
//     console.log(key)
//   })

console.log(web3.utils._);