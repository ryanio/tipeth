import lightwallet from 'eth-lightwallet'
import ethereumjs from 'ethereumjs-util'
import EthereumTx from 'ethereumjs-tx'

export function generateAddress () {
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
}

export function privateKeyToAddress (privateKey) {
  var address = ethereumjs.bufferToHex(ethereumjs.privateToAddress(ethereumjs.addHexPrefix(privateKey)))

  // remove hex prefix
  address = address.substring(2)

  return address
}

export function addHexPrefix (string) {
  if (string.substring(0, 2) !== '0x') {
    return '0x' + string
  }

  return string
}

export function signRawTransactionData (transactionData, privateKey) {
  // format transactionData
  Object.keys(transactionData).forEach((key, index) => {
    if (key === 'gasPrice' || key === 'gas' || key === 'value') {
      transactionData[key] = window.web3.toHex(transactionData[key])
    } else if (key === 'from' || key === 'to') {
      transactionData[key] = addHexPrefix(transactionData[key])
    }
  })

  const transaction = new EthereumTx(transactionData)
  const privateKeyBuffer = new Buffer(privateKey, 'hex')

  transaction.sign(privateKeyBuffer)

  const serializedTransaction = transaction.serialize()
  const transactionDataHex = '0x' + serializedTransaction.toString('hex')

  return transactionDataHex
}

const mixin = {
  methods: {
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
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(mixin)
  }
}
