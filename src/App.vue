<template>
  <div id="app">
    <Navbar :version="version"></Navbar>
    <main class="container mt-3">
      <h1 v-if="!countries.length"><font-awesome-icon icon="spinner" class="fa-spin"/>&nbsp; Loading data...</h1>
      <router-view v-else :countries="countries"></router-view>
    </main>
    <footer class="footer">
      <div class="container">
        Made with <font-awesome-icon icon="heart" :style="{ color: 'red' }" /> in Switzerland
      </div>
    </footer>
  </div>
</template>

<script>
    import Navbar from "./components/Navbar";

    export default {
        name: 'app',
        props: {
            version: String,
            mock: Boolean,
            loader: Object
        },
        components: {
            Navbar,
        },
        mounted () {
            this.loader.getCountries()
                .then((countries) => {
                    this.countries = countries;
                });
        },
        data () {
            return {
                countries: []
            }
        }
    }
</script>

<style>
  html {
    position: relative;
    min-height: 100%;
  }

  #app {
    margin-bottom: 60px;
  }

  .footer {
    position: absolute;
    bottom: 0;
    height: 60px;
    line-height: 60px;
    width: 100%;
  }
</style>