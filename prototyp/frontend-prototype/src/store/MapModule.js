export default {
  namespaced: true,
  state() {
    return {
      markers: [
        {
          id: 'vegan',
          name: 'Vegan',
          markers: [
            {
              id: 'm1',
              position: { lat: 51.505, lng: -0.09 },
              tooltip: 'tooltip for marker1',
              draggable: true,
              visible: true,
              locationType: 'cafe',
            },
            {
              id: 'm2',
              position: { lat: 51.8905, lng: -0.09 },
              tooltip: 'tooltip for marker2',
              draggable: true,
              visible: true,
              locationType: 'restaurant',
            },
            {
              id: 'm3',
              position: { lat: 51.005, lng: -0.09 },
              tooltip: 'tooltip for marker3',
              draggable: true,
              visible: true,
              locationType: 'cafe',
            },
            {
              id: 'm4',
              position: { lat: 51.7605, lng: -0.09 },
              tooltip: 'tooltip for marker4',
              draggable: true,
              visible: true,
              locationType: 'icecream',
            },
          ],
          visible: true,
          markersVisible: true,
          iconColor: 'green',
        },
        {
          id: 'veggi',
          name: 'Veggi',
          markers: [
            {
              id: 'm5',
              position: { lat: 51.505, lng: -0.19 },
              tooltip: 'tooltip for marker5',
              draggable: true,
              visible: true,
              locationType: 'icecream',
            },
            {
              id: 'm6',
              position: { lat: 51.8905, lng: -0.19 },
              tooltip: 'tooltip for marker6',
              draggable: true,
              visible: true,
              locationType: 'restaurant',
            },
            {
              id: 'm7',
              position: { lat: 51.005, lng: -0.19 },
              tooltip: 'tooltip for marker7',
              draggable: true,
              visible: true,
              locationType: 'restaurant',
            },
            {
              id: 'm8',
              position: { lat: 50.7605, lng: -0.19 },
              tooltip: 'tooltip for marker8',
              draggable: true,
              visible: true,
              locationType: 'restaurant',
            },
          ],
          visible: true,
          markersVisible: true,
          iconColor: 'blue',
        },
        {
          id: 'omni',
          name: 'Omni',
          markers: [
            {
              id: 'm9',
              position: { lat: 51.505, lng: -0.29 },
              tooltip: 'tooltip for marker5',
              draggable: true,
              visible: true,
              locationType: 'cafe',
            },
            {
              id: 'm10',
              position: { lat: 51.8905, lng: -0.29 },
              tooltip: 'tooltip for marker6',
              draggable: true,
              visible: true,
              locationType: 'icecream',
            },
            {
              id: 'm11',
              position: { lat: 51.005, lng: -0.29 },
              tooltip: 'tooltip for marker7',
              draggable: true,
              visible: true,
              locationType: 'restaurant',
            },
            {
              id: 'm12',
              position: { lat: 50.7605, lng: -0.29 },
              tooltip: 'tooltip for marker8',
              draggable: true,
              visible: true,
              locationType: 'restaurant',
            },
          ],
          visible: true,
          markersVisible: true,
          iconColor: 'red',
        },
      ],
    };
  },
  mutations: {},
  actions: {},
  getters: {
    getMarkers(state) {
      return state.markers;
    },
  },
};
