import * as types from '../mutation-types'
import { getExchangeRate } from '../../helpers/currency.js'

const currencyFromLocalStorage = window.localStorage.getItem('currencyCode')

// initial state
const state = {
  code: currencyFromLocalStorage || 'USD',
  exchangeRate: null
}

// getters
const getters = {
}

// actions
const actions = {
  updateCurrency (store, { currencyCode }) {
    store.commit(types.SET_CURRENCY_CODE, { currencyCode })

    store.commit(types.RESET_CURRENCY_EXCHANGE_RATE)
    store.dispatch('updateExchangeRate')
  },
  updateExchangeRate ({ commit, state }) {
    getExchangeRate(state.code).then(exchangeRate => {
      commit(types.SET_CURRENCY_EXCHANGE_RATE, { exchangeRate })
    })
  }
}

// mutations
const mutations = {
  [types.SET_CURRENCY_CODE] (state, { currencyCode }) {
    state.code = currencyCode
    window.localStorage.setItem('currencyCode', currencyCode)
  },
  [types.SET_CURRENCY_EXCHANGE_RATE] (state, { exchangeRate }) {
    state.exchangeRate = exchangeRate
  },
  [types.RESET_CURRENCY_EXCHANGE_RATE] (state) {
    state.exchangeRate = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
