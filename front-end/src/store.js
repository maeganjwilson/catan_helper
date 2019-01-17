import fire from "./config";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allGameNames: [],
    selectedGame: 0,
    currentGame: {}
  },
  getters: {
    getGameByID: state => {
      return state.allGameNames[state.selectedGame];
    }
  },
  mutations: {
    addName(state, gameInfo) {
      state.allGameNames.push(gameInfo);
    },
    changeSelected(state, index) {
      state.selectedGame = index;
    },
    clearGames(state) {
      state.allGameNames = [];
    },
    currentGame(state, gameInfo) {
      state.currentGame = gameInfo;
    }
  },
  actions: {
    getNamesFromFirebase({ commit }) {
      commit("clearGames");
      fire.database
        .collection("games")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            commit("addName", {
              name: doc.data().name,
              id: doc.data().id,
              fbID: doc.id
            });
            console.log(`${doc.id} => ${doc.data().name}`);
          });
        });
    }
  }
});
