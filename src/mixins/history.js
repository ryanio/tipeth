const mixin = {
  data: function () {
    return {
      history: JSON.parse(window.localStorage.getItem('history')) || []
    }
  },
  watch: {
    history: function () {
      window.localStorage.setItem('history', JSON.stringify(this.history))
    }
  },
  methods: {
    addPrivateKeyToHistory: function (privateKey) {
      // don't record duplicate
      if (this.history.indexOf(privateKey) > -1) {
        return
      }

      this.history.unshift(privateKey)
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(mixin)
  }
}
