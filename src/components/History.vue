<template>
  <div id="history">

    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-spaced">
            history
          </h1>
          <h2 class="subtitle">
            tipeths you interact with are saved in this browser's local storage.
          </h2>
          <div class="content">
            <p>
              This history is impermanent and may clear at any time depending on your browser.
            </p>

            <p>
              Please record and share tipeth urls securely.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="content">

          <div v-if="history.length === 0">
            <p class="has-text-italic has-text-centered">No history.</p>
          </div>

          <div v-else>
            <table class="table is-striped">
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Address</th>
                  <th>
                    Balance (ether)
                  </th>
                  <th>
                    Balance ({{ $store.state.currency.code }})
                  </th>
                  <td><!-- for delete icon --></td>
                </tr>
              </thead>
              <tbody>
               <tr is="history-tr" v-for="(privateKey, index) in history" :privateKey="privateKey" v-on:delete="confirmDelete(index)"></tr>
              </tbody>
            </table>

            <a class="button is-small delete-all is-pulled-right" v-on:click="confirmDeleteAll" v-if="history.length > 1">Clear history</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'History',
  components: {
    'HistoryTr': () => import('./partials/HistoryTr.vue')
  },
  created: function () {
  },
  computed: mapState({
    history: state => state.history.history
  }),
  methods: {
    confirmDelete: function (index) {
      const confirm = window.confirm('Are you sure you want to delete this record? This is irreversible')

      if (!confirm) {
        return
      }

      const privateKey = this.$store.state.history.history[index]

      this.$store.commit('REMOVE_FROM_HISTORY', { privateKey })
    },
    confirmDeleteAll: function () {
      const confirm = window.confirm('Are you sure you want to delete all history? This is irreversible')

      if (!confirm) {
        return
      }

      this.$store.commit('CLEAR_HISTORY')
    }
  }
}
</script>

<style scoped>
.hero .content p {
}

th {
  font-size: 90%;
}

a.delete-all {
  color: rgba(10, 10, 10, 0.5);
}

a.delete-all:hover {
  color: #ff0537;
}
</style>
