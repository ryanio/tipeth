<template>
  <div id="about">
    <section class="hero is-light">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              about
            </h1>
          </div>
        </div>
      </section>

    <section class="section">
      <div class="container">
        <div class="content">
          <p>
             tipeth is free and open source!
            <i class="fa fa-heart has-text-warning" aria-hidden="true"></i>
          </p>

          <p>
            If you are interested in contributing, please visit our <a href="https://github.com/ryanio/tipeth" target="_blank">GitHub repository</a>.
          </p>

          <!-- future: subreddit, twitter -->
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>

.fa-heart {
  vertical-align: top;
}

</style>
