import BigNumber from 'bignumber.js'

const currencies = [
  {
    label: 'US Dollar (USD)',
    code: 'USD'
  },
  {
    label: 'European Euro (EUR)',
    code: 'EUR'
  },
  {
    label: 'Canadian Dollar (CAD)',
    code: 'CAD'
  },
  {
    label: 'British Pound (GBP)',
    code: 'GBP'
  },
  {
    label: 'Japenese Yen (JPY)',
    code: 'JPY'
  },
  {
    label: 'Chinese Yuan (CNY)',
    code: 'CNY'
  },
  {
    label: 'Swiss Franc (CHF)',
    code: 'CHF'
  },
  {
    label: 'Australian Dollar (AUD)',
    code: 'AUD'
  },
  {
    label: 'Brazilian Real (BRL)',
    code: 'BRL'
  },
  {
    label: 'Hong Kong Dollar (HKD)',
    code: 'HKD'
  },
  {
    label: 'Indonesian Rupiah (IDR)',
    code: 'IDR'
  },
  {
    label: 'Indian Rupee (INR)',
    code: 'INR'
  },
  {
    label: 'South Korean Won (KRW)',
    code: 'KRW'
  },
  {
    label: 'Mexican Peso (MXN)',
    code: 'MXN'
  },
  {
    label: 'Russian Ruble (RUB)',
    code: 'RUB'
  }
]

const mixin = {
  watch: {
    currency: function () {
      this.currencyConversionRate = null
      window.localStorage.setItem('currency', JSON.stringify(this.currency))
    }
  },
  asyncComputed: {
    currencyConversionRate: function () {
      return new Promise((resolve, reject) => {
        if (!this.currency.code) {
          resolve()
          return
        }

        const currencyAPI = 'https://api.coinmarketcap.com/v1/ticker/ethereum/'
        var params = {}

        if (this.currency.code !== 'USD') {
          params['convert'] = this.currency.code
        }

        this.$http.get(currencyAPI, {params: params}).then(response => {
          const conversionRateToEther = response.body[0]['price_' + this.currency.code.toLowerCase()]
          resolve(conversionRateToEther)
        }, response => {
          // error callback
          reject(response)
        })
      })
    }
  },
  methods: {
    weiToCurrency: function (wei, label) {
      if (!this.currency || !this.currencyConversionRate || wei == null) {
        return
      }

      if (typeof wei !== BigNumber) {
        wei = new BigNumber(wei)
      }

      const value = wei.times('1e-18').times(this.currencyConversionRate)

      if (label) {
        return value + ' ' + this.currency.code
      }

      return value
    },
    etherToCurrency: function (ether, label) {
      if (!this.currency || !this.currencyConversionRate || ether == null) {
        return
      }

      const value = ether * this.currencyConversionRate

      if (label) {
        return value + ' ' + this.currency.code
      }

      return value
    }
  },
  data: function () {
    return {
      currency: JSON.parse(window.localStorage.getItem('currency')) || currencies[0],
      currencies: currencies
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(mixin)
  }
}
