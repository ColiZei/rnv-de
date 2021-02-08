<template>
  <v-navigation-drawer
    :value="$store.state.showNavigation"
    absolute
    temporary
    @input="setNavigationStateByEvent"
  >
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: 'Map', icon: 'mdi-map' },
        { text: 'About', icon: 'mdi-account' },
        { text: 'Impressum', icon: 'mdi-flag' }
      ]
    };
  },
  methods: {
    setNavigationStateByEvent(visible) {
      this.$store.commit('toggleNavigation', visible);
    }
  },
  computed: {
    drawer() {
      return this.$store.getters.getNavigationIsVisible;
    }
  }
};
</script>
