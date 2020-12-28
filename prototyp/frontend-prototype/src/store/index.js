import Vue from 'vue';
import Vuex from 'vuex';
import mapModule from './MapModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    map: mapModule,
  },
});
