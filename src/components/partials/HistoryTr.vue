<template>
  <tr>
    <td class="url">
      <router-link :to="{name: 'Address', params: { privateKey: privateKey }}">
        {{ privateKey | permalink }}
      </router-link>
    </td>
    <td class="address" :title="address" >
      {{ address }}
    </td>
    <td class="balance" :title="balance">
      {{ balance }}
    </td>
    <td class="balance" :title="balanceCurrency">
      {{ balanceCurrency }}
    </td>
    <td>
      <a class="delete is-small is-pulled-right" v-on:click="$emit('delete')" :data-private-key="privateKey" title="Delete"></a>
    </td>
  </tr>
</template>

<script>
import { privateKeyToAddress } from '../../helpers/web3'

export default {
  name: 'HistoryTr',
  props: [
    'privateKey'
  ],
  data: function () {
    return {
    }
  },
  computed: {
    address: function () {
      return privateKeyToAddress(this.privateKey)
    },
    balanceCurrency: function () {
      if (!this.balance || !this.$store.state.currency.exchangeRate) {
        return
      }

      return this.balance * this.$store.state.currency.exchangeRate
    }
  },
  asyncComputed: {
    balance: function () {
      return new Promise((resolve, reject) => {
        if (typeof window.web3 === 'undefined') {
          reject()
          return
        }

        window.web3.eth.getBalance(this.address, (error, balance) => {
          if (error) {
            reject(error)
            return
          }

          resolve(window.web3.fromWei(balance, 'ether').toNumber())
        })
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }  
  td.url {
    max-width: 200px;
  }
  td.balance {
    max-width: 50px;
  }
  td.address a {
    color: #4a4a4a;
  }
  a.delete {
    margin-top: 0.25em;
  }
</style>
