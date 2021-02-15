/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { rsk, ropsten } = require('./secret.json');

const mnemonicRSK = rsk.toString().trim();
const mnemonicRopsten = ropsten.mnemonic.toString().trim();

const gasPriceTestnet = parseInt('0x2f32d9', 16);
// console.log(`Gas price RSK testnet: ${Math.floor(gasPriceTestnet * 1.1)}`);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    ganacheAWS: {
	    host: "http://3.140.242.214:8545",
      port: 8545,
      network_id: "*",
    },
    TestRSK: {
      provider: () => new HDWalletProvider(mnemonicRSK, 'https://node-rbank.testnet.rsk.co'),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () => new HDWalletProvider(mnemonicRopsten, `https://ropsten.infura.io/v3/${ropsten.projectId}`),
      network_id: 3,       // Ropsten's id
      networkCheckTimeout: 40000,
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      gasPrice: 10000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },
};
