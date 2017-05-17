<template>
  <div id="address">
      <div class="error notification is-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <section class="hero is-light">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-5 is-spaced">
             <div class="title-decorator">Address</div>
             {{ address }}
            </h1>
            <h2 class="subtitle is-5 balance">
              <div class="title-decorator">Balance</div>

              <span class="loading" v-if="!balanceWei">
                <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Loading...
              </span>
              <span v-else>
                <strong>{{ balanceWei | weiToEther(false) }}</strong> ether
              </span>
              <span class="balance-currency" v-if="balanceCurrency">{{ balanceCurrency }}</span>
            </h2>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
         <div class="button-container">
           <a class="button is-success is-bold" v-on:click="showTransferForm !== 'withdraw' ? showTransferForm = 'withdraw' : showTransferForm = null">
             <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
             Withdraw
           </a>
           <a class="button" v-on:click="showTransferForm !== 'deposit' ? showTransferForm = 'deposit' : showTransferForm = null">
             <i class="fa fa-arrow-circle-down" aria-hidden="true"></i>
             Deposit
           </a>
         </div>

         <TransferForm v-show="showTransferForm === 'deposit'" transferType="deposit" :address="address" :privateKey="privateKey" v-on:refreshAddressBalance="refreshBalance" :transferButtonStylePrimary="false" />

         <TransferForm v-show="showTransferForm === 'withdraw'" transferType="withdraw" :address="address" :privateKey="privateKey" :addressBalanceWei="balanceWei" :initialAmountWei="balanceWei" v-on:refreshAddressBalance="refreshBalance" />

          <a class="button button-etherscan is-small" :href="'https://etherscan.io/address/' + address" target="_blank">
         <i class="fa fa-history" aria-hidden="true"></i>
         View transaction history on Etherscan
       </a>
       </div>
     </section>

     <section class="section has-text-right">
      <div class="container">
      
     </div>
   </section>
 </div>
</template>

<script>
import BigNumber from 'bignumber.js'

export default {
  name: 'Address',
  components: {
    'TransferForm': () => import('./partials/TransferForm.vue')
  },
  data: function () {
    return {
      privateKey: this.$route.params.privateKey,
      errorMessage: null,
      showTransferForm: null
    }
  },
  computed: {
    address: function () {
      var address

      try {
        address = this.privateKeyToAddress(this.privateKey)
      } catch (e) {
        this.$router.push({name: 'InvalidAddress'})
        return
      }

      this.addPrivateKeyToHistory(this.privateKey)

      return address
    },
    balanceCurrency: function () {
      return this.weiToCurrency(this.balanceWei, true)
    }
  },
  asyncComputed: {
    balanceWei: function () {
      return new Promise((resolve, reject) => {
        this.waitForWeb3().then(() => {
          window.web3.eth.getBalance(this.address, (error, balanceWei) => {
            if (error) {
              reject(error)
              return
            }

            if (typeof balanceWei !== BigNumber) {
              balanceWei = new BigNumber(balanceWei)
            }

            resolve(balanceWei)
          })
        })
      })
    }
  },
  methods: {
    refreshBalance: function () {
      this.balanceWei = null

      window.web3.eth.getBalance(this.address, (error, balanceWei) => {
        if (error) {
          throw error
        }

        this.balanceWei = balanceWei
      })
    }
  }
}
</script>

<style scoped>
.balance-currency {
  background: white;
  padding: 0.2rem 0.35rem;
  border-radius: 0.15rem;
  font-size: 70%;
}

span.loading {
  font-size: 1rem;
}

.button-container {
  margin-bottom: 1.5rem;
}

.transfer-form {
  margin-bottom: 1.5rem;
}

</style>
