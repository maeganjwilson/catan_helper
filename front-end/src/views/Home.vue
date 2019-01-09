<template>
  <div class="home">
    <h1>Games</h1>
    <div class="allGames">
      <p>Select the game you want to play below. By selecting the game you will be given the proper numbers needed, terrain needed, and outline of the layout for the board.</p>
      <button
        v-for="games in allGameNames"
        v-bind:key="games.id"
        v-on:click="changeSelected(games.id)"
      >{{games.name}}</button>
    </div>
    <selected-grame v-bind:info="getGameByID"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import selectedGrame from "@/components/SelectedGame";

export default {
  name: "home",
  computed: {
    ...mapState(["allGameNames", "selectedGame"]),
    ...mapGetters(["getGameByID"])
  },
  methods: {
    ...mapActions(["getNamesFromFirebase"]),
    ...mapMutations(["changeSelected"])
  },
  created: function() {
    this.getNamesFromFirebase();
  },
  components: {
    selectedGrame
  }
};
</script>
