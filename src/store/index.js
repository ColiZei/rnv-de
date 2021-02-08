import Vue from 'vue';
import Vuex from 'vuex';
import mapModule from './MapModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showNavigation: false
  },
  mutations: {
    toggleNavigation(state, visible) {
      state.showNavigation = visible;
    }
  },
  actions: {
    setNavigationStateByEvent(context, payload) {
      context.commit('toggleNavigation', payload);
    },
    toggleNavigation(context) {
      context.commit('toggleNavigation', !context.getters.getNavigationIsVisible);
    }
  },
  getters: {
    getNavigationIsVisible(state) {
      return state.showNavigation;
    }
  },
  modules: {
    map: mapModule
  }
});
