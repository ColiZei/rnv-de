<template>
  <v-container fluid class="map-wrapper ma-0 pa-0">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      class="map-wrapper"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- <l-control position="topright" :options="{ test: 'foo' }"
      style="background-color: #fff;">
        Layergroup/Filter
      </l-control> -->

      <l-control-layers position="topright" :collapsed="true" />
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
          @click="showMarkerDetails(marker)"
        >
          <!-- CustomIcons mit Vuetify -->
          <!-- <l-icon>
            TestIcon
          </l-icon> -->
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
  LControlLayers,
  LLayerGroup,
  // LIcon,
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

const markersVegan = [
  {
    id: 'm1',
    position: { lat: 51.505, lng: -0.09 },
    tooltip: 'tooltip for marker1',
    draggable: true,
    visible: true,
  },
  {
    id: 'm2',
    position: { lat: 51.8905, lng: -0.09 },
    tooltip: 'tooltip for marker2',
    draggable: true,
    visible: true,
  },
  {
    id: 'm3',
    position: { lat: 51.005, lng: -0.09 },
    tooltip: 'tooltip for marker3',
    draggable: true,
    visible: true,
  },
  {
    id: 'm4',
    position: { lat: 51.7605, lng: -0.09 },
    tooltip: 'tooltip for marker4',
    draggable: true,
    visible: true,
  },
];

const markersOmni = [
  {
    id: 'm9',
    position: { lat: 51.505, lng: -0.29 },
    tooltip: 'tooltip for marker5',
    draggable: true,
    visible: true,
  },
  {
    id: 'm10',
    position: { lat: 51.8905, lng: -0.29 },
    tooltip: 'tooltip for marker6',
    draggable: true,
    visible: true,
  },
  {
    id: 'm11',
    position: { lat: 51.005, lng: -0.29 },
    tooltip: 'tooltip for marker7',
    draggable: true,
    visible: true,
  },
  {
    id: 'm12',
    position: { lat: 50.7605, lng: -0.29 },
    tooltip: 'tooltip for marker8',
    draggable: true,
    visible: true,
  },
];

const markersVeggi = [
  {
    id: 'm5',
    position: { lat: 51.505, lng: -0.19 },
    tooltip: 'tooltip for marker5',
    draggable: true,
    visible: true,
  },
  {
    id: 'm6',
    position: { lat: 51.8905, lng: -0.19 },
    tooltip: 'tooltip for marker6',
    draggable: true,
    visible: true,
  },
  {
    id: 'm7',
    position: { lat: 51.005, lng: -0.19 },
    tooltip: 'tooltip for marker7',
    draggable: true,
    visible: true,
  },
  {
    id: 'm8',
    position: { lat: 50.7605, lng: -0.19 },
    tooltip: 'tooltip for marker8',
    draggable: true,
    visible: true,
  },
];

//  Gruppe aller Marker
const markers = [
  {
    id: 'vegan',
    name: 'Vegan',
    markers: markersVegan,
    visible: true,
    markersVisible: true,
  },
  {
    id: 'veggi',
    name: 'Veggi',
    markers: markersVeggi,
    visible: true,
    markersVisible: true,
  },
  {
    id: 'omni',
    name: 'Omni',
    markers: markersOmni,
    visible: true,
    markersVisible: true,
  },
];

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LControlLayers,
    LLayerGroup,
    // LIcon,
  },
  data() {
    return {
      zoom: 9,
      center: [51.505, -0.09],
      // center: latLng(49.4467, 8.5975),
      url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_API_ACCESSTOKEN}`,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      mapOptions: {
        zoomSnap: 0.5,
      },
      markerGroup: markers,
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showMarkerDetails(marker) {
      console.log(marker);
    },
  },
};
</script>

<style scoped>
.map-wrapper {
  height: 100vh;
  width: 100%;
}
</style>
