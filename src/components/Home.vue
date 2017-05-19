<template>
  <div id="home">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <div class="subtitle">Give money easily, freely</div>
          <router-link to="/new" class="button is-success">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> New tipeth
          </router-link>
          <a class="button" v-on:click="showLearnMore = !showLearnMore">Learn more</a>
        </div>
      </div>
    </section>

    <section class="section learn-more">
      <div class="container">
        <div class="tile is-parent notification is-info" v-show="showLearnMore">
          <div class="content">
            <p class="title is-spaced">
              tipeth is a <abbr title="decentralized app">dapp</abbr> connected to the <a href="https://ethereum.org" target="_blank" title="Learn more at ethereum.org">Ethereum</a> network that makes it easy to give small ($1) amounts of money with just a url.
            </p>
            <p class="subtitle">
              A tipeth url contains the key <input value="https://tipeth.com/ac7aab7dd3ad5cac72eb6590ade8aee020c649fe31e2be48c32e83ec696d48fb" v-on:click="inputSelectAll"> that unlocks the balance inside.
            </p>
            <p class="subtitle">
              It's fun and easy to share over any chat, messenger, app or game :)
            </p>
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
}

.learn-more .tile .currently {
  margin-top: -0.5rem;
  font-size: 90%;
}

input {
  color: #f5f5f5;
  background-color: #699ee2;
  font-size: 75%;
  border: 0;
  padding: 0.35rem;
  border-radius: 0.2rem;
  margin: 0 0.1rem;
  width: 13rem;
  text-overflow: ellipsis;
}

input:focus, input:hover, input:active {
  outline: 0;
}

</style>
