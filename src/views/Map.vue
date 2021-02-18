<template>
  <v-container fluid class="map-wrapper ma-0 pa-0">
    <v-overlay v-if="isLoading && !showError" :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="showError" :timeout="-1">
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="retryLoadMarkers">
          Retry
        </v-btn>
      </template>
    </v-snackbar>
    <v-layout column class="fab-container pa-4">
      <v-btn fab @click="getUserLocation">
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
      <v-btn class="my-2" fab @click="zoomIn">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab @click="zoomOut">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-layout>

    <l-map
      style="z-index: 0;"
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      class="map-wrapper"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <v-row class="pa-4">
        <v-col class="col-12 col-md-3 zindex">
          <v-toolbar dense>
            <v-app-bar-nav-icon @click.stop="toggleNavigation"></v-app-bar-nav-icon>

            <v-text-field hide-details single-line></v-text-field>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-filter</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="group in markerGroup" :key="`${group.id}-${group.name}`">
                  <v-checkbox
                    dense
                    class="pa-0 ma-0"
                    :hide-details="true"
                    :color="group.iconColor"
                    :key="group.id"
                    @click="group.visible = !group.visible"
                    :label="group.name"
                    :id="group.name"
                    input-value="1"
                  ></v-checkbox>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-col>
      </v-row>

      <l-tile-layer :url="url" :attribution="attribution" />

      <l-layer-group
        v-for="group in markerGroup"
        :key="`${group.id}-${group.name}`"
        layer-type="overlay"
        :name="group.name"
        :visible="group.visible"
      >
        <v-marker-cluster>
          <l-marker
            v-for="marker in group.markers"
            :key="marker.id"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :lat-lng.sync="marker.position"
            :icon="marker.icon"
            :options="{ opacity: 1.0 }"
          >
            <l-icon>
              <v-btn elevation="2" fab dark small :color="group.iconColor">
                <v-icon>{{ getIconName(marker.type) }}</v-icon>
              </v-btn>
            </l-icon>
            <l-popup :content="marker.name" />
            <!-- <l-tooltip :content="marker.name" /> -->
          </l-marker>
        </v-marker-cluster>
      </l-layer-group>
    </l-map>
  </v-container>
</template>

<script>
import { latLng } from 'leaflet';

import { LMap, LTileLayer, LMarker, LPopup, LLayerGroup, LIcon } from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix for Webpack: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
// Requires Icon import from leaflet
/* eslint-disable no-underscore-dangle */
// delete Icon.Default.prototype._getIconUrl;
// Icon.Default.mergeOptions({
//   /* eslint-disable global-require */
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LLayerGroup,
    LIcon,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  data() {
    return {
      isLoading: false,
      showError: false,
      error: null,
      zoom: 9,
      center: [49.417, 8.554],
      url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{tileSize}/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_API_ACCESSTOKEN}`,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      tileSize: 512,
      mapOptions: {
        zoomControl: false, // Weil Custom Zoom
        zoomSnap: 0.5
      },
      markerGroup: []
    };
  },
  methods: {
    async loadMarkers() {
      this.isLoading = true;
      this.showError = false;
      this.error = null;

      try {
        await this.$store.dispatch('map/loadMarkers');
      } catch (error) {
        this.error = error.message || 'Failed to fetch data!';
      }

      this.showError = !!this.error;
      this.markerGroup = this.$store.getters['map/getMarkers'];

      this.isLoading = false;
    },
    retryLoadMarkers() {
      this.loadMarkers();
    },
    // Auslagern in Component "Searchbar"
    toggleNavigation() {
      this.$store.dispatch('toggleNavigation');
    },
    getUserLocation() {
      console.log('getUserLocation: Todo!');
    },
    zoomIn() {
      this.$refs.myMap.mapObject.zoomIn();
    },
    zoomOut() {
      this.$refs.myMap.mapObject.zoomOut();
    },
    getIconName(locationType) {
      let iconName = 'mdi-silverware';
      if (locationType === 'icecream') {
        iconName = 'mdi-ice-cream';
      }
      if (locationType === 'cafe') {
        iconName = 'mdi-coffee';
      }
      return iconName;
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    }
  },
  created() {
    this.loadMarkers();
  }
};
</script>

<style scoped>
.map-wrapper {
  height: 100vh;
  width: 100%;
}

.fab-container {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 999;
}

.zindex {
  z-index: 999;
}
</style>
