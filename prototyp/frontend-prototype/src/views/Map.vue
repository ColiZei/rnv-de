<template>
  <v-container fluid class="map-wrapper ma-0 pa-0">
    <!-- <v-card class="pa-4" tile style="position: absolute; z-index: 1"> -->
    <v-layout column class="pa-4" tile style="position: absolute; z-index: 1">
      <v-toolbar dense floating>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-text-field hide-details single-line></v-text-field>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <!-- <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
      </v-toolbar>
    </v-layout>
    <v-layout column class="pa-4" tile style="position: absolute; right: 0; z-index: 999">
      <v-card class="pa-2 rounded-0">
        <v-checkbox
          dense
          hide-details="auto"
          class="pa-0 ma-0"
          v-for="group in markerGroup"
          :key="group.id"
          @click="group.visible = !group.visible"
          :label="group.name"
          :id="group.name"
          checked
        ></v-checkbox>
      </v-card>
    </v-layout>
    <!-- </v-card> -->

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
      <l-tile-layer :url="url" :attribution="attribution" />

      <!-- <l-control-layers position="topright" :collapsed="true" /> -->
      <l-layer-group
        v-for="group in markerGroup"
        :key="group.id"
        layer-type="overlay"
        :name="group.name"
        :visible="group.visible"
      >
        <l-marker
          v-for="marker in group.markers"
          :key="marker.id"
          :visible="marker.visible"
          :draggable="marker.draggable"
          :lat-lng.sync="marker.position"
          :icon="marker.icon"
          :options="{ opacity: 1.0 }"
          @click="showMarkerDetails(marker)"
        >
          <!-- CustomIcons mit Vuetify -->
          <l-icon>
            <v-btn elevation="2" icon small :color="group.iconColor">
              <v-icon>{{ getIconName(marker.locationType) }}</v-icon>
            </v-btn>
          </l-icon>
          <!-- <div class="pin"></div> -->
          <l-popup :content="marker.tooltip" />
          <l-tooltip :content="marker.tooltip" />
        </l-marker>
      </l-layer-group>
    </l-map>
  </v-container>
</template>

<script>
import { latLng, Icon } from 'leaflet';

import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  // LControlLayers,
  // LControl,
  LLayerGroup,
  LIcon,
  // LControlZoom,
} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Webpack: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
// Requires Icon import from leaflet
/* eslint-disable no-underscore-dangle */
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  /* eslint-disable global-require */
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    // LControlLayers,
    // LControl,
    LLayerGroup,
    LIcon,
    // LControlZoom,
  },
  data() {
    return {
      zoom: 9,
      center: [51.505, -0.09],
      url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_API_ACCESSTOKEN}`,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      mapOptions: {
        zoomControl: false, // Weil Custom Zoom
        zoomSnap: 0.5,
      },
      markerGroup: [],
    };
  },
  methods: {
    getUserLocation() {
      console.log('getUserLocation: Todo!');
    },
    zoomIn() {
      this.$refs.myMap.mapObject.zoomIn();
    },
    zoomOut() {
      this.$refs.myMap.mapObject.zoomOut();
    },
    loadMarkers() {
      this.markerGroup = this.$store.getters['map/getMarkers'];
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
    },
    // showMarkerDetails(marker) {
    //   console.log(marker);
    // },
  },
  created() {
    this.loadMarkers();
  },
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
</style>
