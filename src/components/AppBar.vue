<template>
  <v-app-bar dense flat app>
    <v-app-bar-nav-icon @click.stop="toggleNavigation"></v-app-bar-nav-icon>
    <v-app-bar-title>{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    toggleNavigation() {
      this.$store.dispatch('toggleNavigation');
    }
  }
};
</script>
