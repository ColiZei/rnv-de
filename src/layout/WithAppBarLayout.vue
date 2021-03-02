<template>
  <v-app>
    <navigation />
    <app-bar :title="title"></app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '../components/AppBar.vue';
export default {
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  components: { AppBar }
};
</script>

<style scoped></style>
