<template>
  <v-app>
    <component :is="layout"></component>
  </v-app>
</template>

<script>
import MapLayout from './layout/MapLayout';
import AppBarLayout from './layout/WithAppBarLayout';
import AdminLayout from './layout/AdminLayout';

export default {
  name: 'App',
  components: {
    'map-layout': MapLayout,
    'appbar-layout': AppBarLayout,
    'admin-layout': AdminLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'map-layout';
    }
  }
};
</script>
