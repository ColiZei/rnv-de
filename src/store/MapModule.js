export default {
  namespaced: true,
  state() {
    return {
      groups: [
        {
          id: 1,
          name: 'Vegan',
          visible: true,
          markersVisible: true,
          iconColor: 'green'
        },
        {
          id: 2,
          name: 'Veggie',
          visible: true,
          markersVisible: true,
          iconColor: 'blue'
        },
        {
          id: 2,
          name: 'Omni',
          visible: true,
          markersVisible: true,
          iconColor: 'red'
        }
      ],
      markers: []
    };
  },
  mutations: {
    setMarkers(state, payload) {
      state.markers = payload;
    }
  },
  actions: {
    async loadMarkers(context) {
      const response = await fetch(`${process.env.VUE_APP_RESTAPI_URL}/locations`);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.error || 'Failed to fetch data!');
        throw error;
      }

      const wellFormedLocations = [];
      for (const location of responseData.allLocations) {
        wellFormedLocations.push({
          id: location.id,
          name: location.name,
          description: location.description,
          position: { lat: location.cLat, lng: location.cLong },
          draggable: true,
          visible: true,
          type: location.type,
          group: location.group
        });
      }

      const newMarkerGroup = [];
      const groups = [...context.getters.getGroups];
      for (const group of groups) {
        const newObj = { ...group };
        newObj.markers = wellFormedLocations.filter(l => l.group === newObj.name.toLowerCase());

        newMarkerGroup.push(newObj);
      }

      context.commit('setMarkers', newMarkerGroup);
    }
  },
  getters: {
    getGroups(state) {
      return state.groups;
    },
    getMarkers(state) {
      return state.markers;
    }
  }
};
