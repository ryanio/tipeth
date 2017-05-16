<template>
  <div id="home">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            Give or send money to anyone.
          </h2>

          <router-link to="/new" class="button is-success">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> New tipeth
          </router-link>
          <a class="button" v-on:click="showLearnMore = !showLearnMore">Learn more</a>
        </div>
      </div>
    </section>

    <section class="section learn-more">
      <div class="container">
        <div class="tile is-parent notification is-success" v-show="showLearnMore">
          <div class="content">
            <p class="title is-spaced">
              tipeth is an app connected to the
              <a href="https://ethereum.org" target="_blank" title="Learn more at ethereum.org">Ethereum</a> network that makes it easy to send small amounts of money with just a url.
            </p>
            <p class="subtitle">
              A tipeth url contains the key
              <input value="https://tipeth.com/ac7aab7dd3ad5cac72eb6590ade8aee020c649fe31e2be48c32e83ec696d48fb" v-on:click="inputSelectAll">
              that unlocks the balance inside. Easy to share through apps, messengers, games and online communities <small>like reddit!</small>
            </p>
            <div class="content">
              <p>
                This app's code is <router-link to="/about">open source</router-link> and runs entirely in your browser with no external servers.
              </p>
              <p class="currently">
                The only external call is for the excellent <a href="https://coinmarketcap.com/api" target="_blank">exchange rate api</a> from <a href="https://coinmarketcap.com" target="_blank">coinmarketcap.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      showLearnMore: false
    }
  }
}
</script>

<style scoped>

.learn-more {
  padding: 1.5rem;
}

.learn-more .tile {
  padding: 1.5rem;
}

.learn-more .tile .title {
  font-size: 1.6rem;
  line-height: 1.3;
}

.learn-more .tile a {
  text-decoration: none;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.6);
}

.learn-more .tile .subtitle {
  font-size: 1.2rem;
  line-height: 1.7;
}

.learn-more .tile .currently {
  margin-top: -0.5rem;
  font-size: 90%;
}

input {
  color: #f8f8f8;
  background-color: #1eb151;
  font-size: 0.9rem;
  border: 0;
  padding: 0.5rem;
  border-radius: 0.2rem;
  margin: 0 0.2rem;
  width: 13rem;
  text-overflow: ellipsis;
}

input:focus, input:hover, input:active {
  outline: 0;
}

</style>
