import * as types from '../mutation-types'

// initial state
const state = {
  history: JSON.parse(window.localStorage.getItem('history')) || []
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.ADD_TO_HISTORY] (state, { privateKey }) {
    if (state.history.indexOf(privateKey) === -1) {
      // don't record duplicate
      state.history.unshift(privateKey)
      window.localStorage.setItem('history', JSON.stringify(state.history))
    }
  },
  [types.REMOVE_FROM_HISTORY] (state, { privateKey }) {
    const index = state.history.indexOf(privateKey)
    if (index > -1) {
      state.history.splice(index, 1)
      window.localStorage.setItem('history', JSON.stringify(state.history))
    }
  },
  [types.CLEAR_HISTORY] (state) {
    state.history = []
    window.localStorage.setItem('history', JSON.stringify(state.history))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
