import axios from 'axios'

export function getExchangeRate (currencyCode) {
  return new Promise((resolve, reject) => {
    const currencyAPI = 'https://api.coinmarketcap.com/v1/ticker/ethereum/'

    var params = {}

    if (currencyCode !== 'USD') {
      params['convert'] = currencyCode
    }

    axios.get(currencyAPI, {
      params: params
    }).then(response => {
      const conversionRateToEther = response.data[0]['price_' + currencyCode.toLowerCase()]
      resolve(conversionRateToEther)
    }).catch(error => {
      reject(error)
    })
  })
}

export const currencies = [
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
