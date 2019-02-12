<template>
  <b-navbar toggleable="md" variant="light">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-link :to="{path: '/'}" class="navbar-brand">Geo Trainer</b-link>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-link :to="{path: 'quizz'}" class="nav-link">Quizz</b-link>
        <b-link :to="{path: 'all'}" class="nav-link">All data</b-link>
        <b-link :to="{path: 'improve'}" class="nav-link">Improve</b-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-text href="#">v{{version}}</b-nav-text>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
    export default {
        name: "Navbar",
        props: {
            version: String
        }
    }
</script>