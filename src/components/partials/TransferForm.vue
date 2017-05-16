<template>
  <div class="transfer-form">
    <div class="tile tile-transfer-form box">
      <div class="field-container" v-if="!transactionHash">
        <div class="error notification is-danger" v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <div class="field has-addons">
          <p class="control is-expanded">
            <input class="input" type="number" step="any" min="0" v-model="inputAmount" placeholder="Amount" @keyup.enter="transfer"required>
          </p>
          <p class="control">
            <span class="select" v-if="transferType === 'deposit'">
              <select v-model="selectedCurrency">
                <option value="ETH">Ether (ETH)</option>
                <option v-for="currency in currencies" v-bind:value="currency">
                  {{ currency.label }}
                </option>
              </select>
            </span>
            <span v-else>
              <input class="input" value="Ether (ETH)" disabled>
            </span>
          </p>
        </div>

        <div v-if="transferType == 'deposit'">
          <div v-if="inputAmount > 0 && selectedCurrency !== 'ETH'">
           <div class="field">
            <input class="input input-currency-conversion" type="text" :value="currencyConversionInputValue" disabled>
          </div>
        </div>
      </div>
        <div v-else>
          <div class="field field-gas" v-if="transferAmountWei > 0">
           <input class="input is-disabled" type="text" :value="gasFieldInputValue" disabled>
         </div>

          <div class="field field-total" v-if="transferAmountWei > 0">
           <input class="input is-disabled" type="text" :value="totalFieldInputValue" disabled>
         </div>

         <div class="field field-withdraw" v-if="transferAmountWei > 0 && transactionTotalWei > 0">
           <input class="input" type="text" placeholder="Address to withdraw to" v-model="withdrawAddress" @keyup.enter="transfer" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false" required>
         </div>
        </div>

        <div class="button-container">
         <a v-on:click="transfer" class="button button-transfer" :class="{ 'is-success': transferButtonStylePrimary, 'is-loading': transactionPendingUserAction }" v-html="transferButtonText"></a>
        </div>
      </div>
      <div v-else>

        <div class="transaction-status">
          <div v-if="!transactionConfirmed">
            Transaction sent! Watching network for confirmation... <i class="fa fa-circle-o-notch fa-spin fa-fw has-text-success"></i> 
          </div>
          <div v-else>
            Transaction confirmed! <i class="fa fa-check has-text-success"></i>
          </div>
        </div>
      </div>
   </div>
 </div>
 </div>
</template>

<script>
import BigNumber from 'bignumber.js'

export default {
  name: 'TransferForm',
  components: {
  },
  props: {
    transferType: {},
    address: {},
    privateKey: {},
    addressBalanceWei: null,
    initialAmountWei: null,
    transferButtonStylePrimary: {
      default: true
    }
  },
  created: function () {
    this.selectedCurrency = this.currency
  },
  data: function () {
    return {
      inputAmount: null,
      selectedCurrency: null,
      withdrawAddress: null,
      transactionPendingUserAction: false,
      errorMessage: null,
      transactionHash: null,
      transactionConfirmed: false
    }
  },
  watch: {
    initialAmountWei: function () {
      this.inputAmount = window.web3.fromWei(this.initialAmountWei, 'ether')
    },
    selectedCurrency: function () {
      if (this.selectedCurrency !== 'ETH') {
        this.currency = this.selectedCurrency
        this.$emit('refreshCurrency')
      }
    },
    transactionHash: function () {
      this.addPrivateKeyToHistory(this.privateKey)
      this.$emit('transactionPending')
    },
    transactionConfirmed: function () {
      this.$emit('transactionConfirmed')
      this.$emit('refreshAddressBalance')
    }
  },
  computed: {
    transferAmountWei: function () {
      if (!this.inputAmount) {
        return 0
      }

      if (this.transferType === 'withdraw') {
        return window.web3.toWei(this.inputAmount, 'ether')
      }

      if (this.transferType === 'deposit' && this.selectedCurrency === 'ETH') {
        return window.web3.toWei(this.inputAmount, 'ether')
      }

      if (!this.currencyConversionRate) {
        return
      }

      const ether = new BigNumber(this.inputAmount).dividedBy(this.currencyConversionRate)
      const wei = window.web3.toWei(ether, 'ether').round()
      return wei
    },
    gasCostWei: function () {
      if (!this.gasPrice || !this.gasLimit) {
        return
      }

      return new BigNumber(this.gasPrice).times(this.gasLimit)
    },
    gasFieldInputValue: function () {
      if (!this.gasCostWei) {
        return 'Loading network transaction cost...'
      }

      const gasCostEther = window.web3.fromWei(this.gasCostWei, 'ether')

      var text = '-'

      text += gasCostEther
      text += ' ether [network transaction cost]'

      return text
    },
    currencyConversionInputValue: function () {
      var text = ''

      if (!this.currencyConversionRate) {
        return 'Loading conversion rate...'
      }

      const ether = new BigNumber(this.inputAmount).dividedBy(this.currencyConversionRate)

      text += 'Total: '

      text += ether
      text += ' ether (1 ether = '
      text += this.currencyConversionRate
      text += ' '
      text += this.currency.code

      text += ' via coinmarketcap.com)'

      return text
    },
    transactionTotalWei: function () {
      if (!this.gasCostWei) {
        return
      }

      if (typeof this.transferAmountWei === BigNumber) {
        return this.transferAmountWei.minus(this.gasCostWei)
      } else {
        return new BigNumber(this.transferAmountWei).minus(this.gasCostWei)
      }
    },
    totalFieldInputValue: function () {
      if (!this.gasCostWei) {
        return 'Loading network transaction cost...'
      }

      var text = 'Total: '

      const totalEther = window.web3.fromWei(this.transactionTotalWei, 'ether')

      text += totalEther
      text += ' ether'

      if (this.currencyConversionRate) {
        text += ' ('
        text += totalEther * this.currencyConversionRate
        text += ' '
        text += this.currency.code
        text += ')'
      }

      return text
    },
    transferButtonText: function () {
      if (this.transferType === 'deposit') {
        return '<i class="fa fa-arrow-circle-down" aria-hidden="true"></i> Deposit'
      } else {
        return '<i class="fa fa-arrow-circle-up" aria-hidden="true"></i> Withdraw'
      }
    }
  },
  asyncComputed: {
    gasLimit: function () {
      return new Promise((resolve, reject) => {
        window.web3.eth.estimateGas({}, (error, result) => {
          if (error) {
            reject(error)
            return
          }

          resolve(result)
        })
      })
    },
    gasPrice: function () {
      return new Promise((resolve, reject) => {
        window.web3.eth.getGasPrice((error, result) => {
          if (error) {
            reject(error)
            return
          }

          resolve(result)
        })
      })
    },
    nonce: function () {
      return new Promise((resolve, reject) => {
        window.web3.eth.getTransactionCount(this.addHexPrefix(this.address), (error, result) => {
          if (error) {
            reject(error)
            return
          }

          resolve(result + 1)
        })
      })
    },
    transactionConfirmed: function () {
      return new Promise((resolve, reject) => {
        if (!this.transactionHash) {
          resolve(null)
          return
        }

        var filter = window.web3.eth.filter('latest')

        filter.watch((error, result) => {
          if (error) {
            reject(error)
            return
          }

          window.web3.eth.getBlock(result, (error, result) => {
            if (error) {
              reject(error)
              return
            }

            if (result.transactions.indexOf(this.transactionHash) > -1) {
              resolve(true)
              filter.stopWatching()
            }
          })
        })
      })
    }
  },
  methods: {
    transfer: function () {
      if (this.transferType === 'deposit') {
        this.deposit()
      } else if (this.transferType === 'withdraw') {
        this.withdraw()
      }
    },
    deposit: function () {
      this.errorMessage = null

      if (!this.transferAmountWei || this.transferAmountWei < 0) {
        this.errorMessage = 'Amount must be a positive number'
        return
      }

      this.transactionPendingUserAction = true

      if (window.web3.eth.defaultAccount === undefined) {
        this.errorMessage = 'Default account not set. If using MetaMask, please check if your account is unlocked?'
        this.transactionPendingUserAction = false
        return
      }

      const transactionData = {
        to: this.address,
        value: this.transferAmountWei
      }

      window.web3.eth.sendTransaction(transactionData, (error, transactionHash) => {
        this.transactionPendingUserAction = false

        if (error) {
          this.errorMessage = error.message
          throw error
        }

        this.transactionHash = transactionHash
      })
    },
    withdraw: function () {
      this.errorMessage = null

      if (this.transferAmountWei <= 0) {
        this.errorMessage = 'Amount must be a positive number'
        return
      }

      if (this.transactionTotalWei <= 0) {
        this.errorMessage = 'Total must be a positive number'
        return
      }

      if (this.transactionTotalWei.greaterThan(this.addressBalanceWei)) {
        this.errorMessage = 'Total cannot be greater than your balance'
        return
      }

      if (!this.withdrawAddress || this.withdrawAddress === '') {
        this.errorMessage = 'Please specify Ethereum address to withdraw to'
        return
      }

      if (!this.nonce) {
        this.errorMessage = 'Waiting for account nonce. Please try again.'
        return
      }

      const confirm = window.confirm('Please double-check that the address you are withdrawing to is accurate. This is irreversible')

      if (!confirm) {
        return
      }

      this.errorMessage = null

      const transactionData = {
        gasPrice: window.web3.toHex(this.gasPrice),
        gas: window.web3.toHex(this.gasLimit),
        from: this.addHexPrefix(this.address),
        to: this.addHexPrefix(this.withdrawAddress),
        value: window.web3.toHex(this.transactionTotalWei)
      }

      var signedSerializedTransactionDataHex

      try {
        signedSerializedTransactionDataHex = this.signSerializeTransactionDataHex(transactionData, this.privateKey)
      } catch (error) {
        this.errorMessage = error.message
        return
      }

      window.web3.eth.sendRawTransaction(signedSerializedTransactionDataHex, (error, transactionHash) => {
        if (error) {
          this.errorMessage = error.message
          throw error
        }

        this.transactionHash = transactionHash
      })
    }
  }
}
</script>

<style scoped>
.tile-transfer-form {
  max-width: 500px;
}

.field-container {
  width: 100%;
}

.transaction-status {
}

.field:last-child {
  margin-bottom: 0.75rem;
}

.field-gas {
}

.button-container {
  margin-top: 0.75rem;
}

input:disabled {
  cursor: text;
}
</style>
