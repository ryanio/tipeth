<template>
  <div id="app">
    <div class="container">
      <nav class="nav">
        <div class="nav-left">
          <router-link to="/" class="nav-item logo">
            tipeth
          </router-link>
        </div>
        <div class="nav-right">
          <router-link to="/history" class="nav-item is-tab">
            history
          </router-link>
        </div>
      </nav>
    </div>

    <router-view></router-view>

    <footer class="footer">
      <div class="container">
      <router-link to="/about" class="version-number">
        v1.0.02
      </router-link>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'app',
  created: function () {
    // fetch exchangeRate
    this.$store.dispatch('updateExchangeRate')
  }
}
</script>

<style scoped>
nav {
  margin: 1rem 0;
}

a.is-tab.router-link-active {
  border-bottom: 3px solid #00d1b2;
  color: #00d1b2;
  padding-bottom: calc(0.75rem - 3px);
}

.footer {
  text-align: center;
  padding: 4rem 1.5rem;
  font-size: 75%;
}

.footer a {
  color: #4a4a4a;
}

</style>
