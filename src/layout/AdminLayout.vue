<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar dense flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      selectedItem: 1,
      items: [
        { text: 'Dashboard', icon: 'mdi-map', to: '/admin/dashboard' },
        { text: 'Locations', icon: 'mdi-map', to: '/admin/location' }
      ]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  }
};
</script>
