<template>
  <div>
    <h1>{{info.name}}</h1>
    <div>
      <button v-on:click="getScenarios">CLICK</button>
      <br>
      <div class="scenario-select">
        <h2>Scenarios</h2>
        <ul>
          <li v-for="scenario in scenarios" v-bind:key="scenario.id">{{scenario.name}}</li>
        </ul>
      </div>
      <div class="scenario-info" v-if="scenarios.length">
        <button>3 players</button>
        <button>4 Players</button>
      </div>
    </div>
  </div>
</template>

<script>
import fire from "@/config";

export default {
  name: "selectedGame",
  props: {
    info: Object
  },
  data: function() {
    return {
      scenarios: []
    };
  },
  methods: {
    getScenarios: function() {
      this.scenarios = [];
      fire.database
        .collection("games")
        .doc(this.info.fbID)
        .collection("scenarios")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(`${doc.id} => ${doc.data().name}`);
            console.log(doc.data());
            this.scenarios.push(doc.data());
          });
        });
      console.log(this.scenarios);
    }
  }
};
</script>
