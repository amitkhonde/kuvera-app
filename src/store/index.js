import Vue from 'vue';
import Vuex from 'vuex';
import { URLS } from '../utils/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    funds: [],
    currentFund: {},
    showLoader: false,
  },
  mutations: {
    setFunds(state, funds) {
      funds.forEach(f => {
        f.returns_year1 = f.returns.year_1;
        f.returns_year3 = f.returns.year_3;
      });
      
      state.funds = [...funds];
    },

    setCurrentFund(state, fund) {
      state.currentFund = {...fund};
    },

    setLoaderState(state, val) {
      state.showLoader = val;
    }
  },
  actions: {
    fetchFunds({commit}) {
      return new Promise((resolve, reject) => {
        fetch(URLS.FETCH_FUNDS).then(res => {
          return res.json();
        }).then(jsonRes => {
          commit('setFunds', jsonRes.slice(0, 100));
          resolve();
        }).catch(err => {
          reject(err);
        });
      });
    },

    fetchFundDetails({commit}, payload) {
      return new Promise((resolve, reject) => {
        fetch(`${URLS.FUND_DETAILS}${payload.code}.json`).then(res => {
          return res.json();
        }).then(jsonRes => {
          commit('setCurrentFund', jsonRes[0]);
          resolve();
        }).catch(err => {
          reject(err);
        });
      });
    }
  },
});
