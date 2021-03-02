export default {
  namespaced: true,
  state() {
    return {
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

      context.commit('setMarkers', responseData.allLocations);
    }
  },
  getters: {
    getMarkers(state) {
      return state.markers;
    }
  }
};
