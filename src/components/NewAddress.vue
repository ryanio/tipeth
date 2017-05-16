<template>
  <div id="new-address">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            new tipeth 
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="error notification is-danger" v-if="errorMessage">
          {{ errorMessage }}
        </div>

          <h3 class="title is-5 address">
            <abbr class="title-decorator" title="Unique Address">Address</abbr>

            <span class="loading" v-if="!address">
              <i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Generating 
            </span>
            <span v-else>
              {{ address }}
            </span>
          </h3>

          <TransferForm v-if="address" transferType="deposit" :address="address" :privateKey="privateKey" v-on:transactionPending="showShare = true" v-on:transactionConfirmed="transactionConfirmed = true" />

         <div class="share" v-if="showShare">
          <div class="field">
            <label class="label has-text-primary">Your tipeth url</label>
              <p class="control has-icons-left">
                <input class="input" :value="privateKey | permalink" v-on:click="inputSelectAll" :class="{'is-success': transactionConfirmed}"/>
                <span class="icon is-left">
                  <i class="fa fa-unlock-alt" :class="{'has-text-success': transactionConfirmed}"></i>
                </span>
              </p>

              <div class="share-warning has-text-italic">
                <p>Warning: This url gives full access to the tipeth.</p>
                <p>Please copy it somewhere safe and share it securely.</p>
                <p>Your tipeth is unrecoverable if this url is lost.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewAddress',
  components: {
    'TransferForm': () => import('./partials/TransferForm.vue')
  },
  data: function () {
    return {
      errorMessage: null,
      showShare: false,
      privateKey: null,
      transactionConfirmed: false
    }
  },
  asyncComputed: {
    address: function () {
      return new Promise((resolve, reject) => {
        this.waitForWeb3().then(() => {
          this.generateAddress().then((data) => {
            this.privateKey = data.privateKey
            resolve(data.address)
          }, (error) => {
            reject(error)
          })
        })
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.field .control {
  max-width: 350px;
}

span.loading {
  font-size: 1rem;
}

.share {
  margin-top: 1.5rem;
}

.share-warning {
  margin-top: 0.75rem;
}

.share-warning p {
  margin-bottom: 0.3rem;
}

.share-warning a {
  color: #4a4a4a;
  border-bottom: 1px dotted #bbb;
}
abbr {
  text-decoration: none;
}
</style>
