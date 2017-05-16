import lightwallet from 'eth-lightwallet'
import ethereumjs from 'ethereumjs-util'
import EthereumTx from 'ethereumjs-tx'

const mixin = {
  filters: {
    weiToEther: function (wei, withLabel) {
      const ether = window.web3.fromWei(wei, 'ether').toNumber()

      if (withLabel) {
        return ether + ' ether'
      }

      return ether
    }
  },
  methods: {
    addHexPrefix: function (string) {
      if (string.substring(0, 2) !== '0x') {
        return '0x' + string
      }

      return string
    },
    web3: function () {
      return window.web3
    },
    waitForWeb3: function () {
      return new Promise((resolve) => {
        if (typeof window.web3 !== 'undefined') {
          resolve()
          return
        }

        // wait to see if web3 loads
        setTimeout(() => {
          if (typeof window.web3 !== 'undefined') {
            resolve()
            return
          }

          this.$router.history.updateRoute(this.$router.match('/web3-unavailable'))
        }, 1250)
      })
    },
    generateAddress: function () {
      return new Promise((resolve, reject) => {
        const password = lightwallet.keystore.generateRandomSeed()

        lightwallet.keystore.createVault({
          password: password
        }, (error, ks) => {
          if (error) {
            reject(error)
          }

          ks.keyFromPassword(password, (error, pwDerivedKey) => {
            if (error) {
              reject(error)
            }

            ks.generateNewAddress(pwDerivedKey, 1)

            var data = {}

            data.privateKey = ks.exportPrivateKey(ks.getAddresses()[0], pwDerivedKey)
            data.address = ks.getAddresses()[0]

            resolve(data)
          })
        })
      })
    },
    privateKeyToAddress: function (privateKey) {
      var address = ethereumjs.bufferToHex(ethereumjs.privateToAddress(ethereumjs.addHexPrefix(privateKey)))

      // remove hex prefix
      address = address.substring(2)

      return address
    },
    signSerializeTransactionDataHex: function (transactionData, privateKey) {
      const transaction = new EthereumTx(transactionData)
      const privateKeyBuffer = new Buffer(privateKey, 'hex')

      transaction.sign(privateKeyBuffer)

      const serializedTransaction = transaction.serialize()
      const transactionDataHex = '0x' + serializedTransaction.toString('hex')

      return transactionDataHex
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(mixin)
  }
}

