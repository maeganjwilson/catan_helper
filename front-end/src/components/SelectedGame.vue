<template>
  <div>
    <h1>{{info.name}}</h1>
    <div>
      <div class="scenario-select">
        <h2>Scenarios</h2>
        <ul>
          <li
            class="link scenario"
            v-for="scenario in scenarios"
            v-bind:key="scenario.id"
            v-on:click="chooseScenario(scenario.id)"
            v-bind:class="{active: scenario.isActive}"
          >{{scenario.name}}</li>
        </ul>
      </div>
      <div class="scenario-info" v-if="scenarios.length">
        <div>
          <h2>{{scenarios[activeScenarioID].name}}</h2>
          <select v-model="numPlayers">
            <option value="3player">3 Player</option>
            <option value="4player">4 Player</option>
            <option value="5player">5 Player</option>
            <option value="6player">6 Player</option>
          </select>
          <div v-if="scenarios[activeScenarioID][numPlayers]">
            <ul>
              <li>Chits: {{scenarios[activeScenarioID][numPlayers].chits}}</li>
              <li>Special Harbors: {{scenarios[activeScenarioID][numPlayers].special_harbors}}</li>
              <li>Generic Harbors: {{scenarios[activeScenarioID][numPlayers].other_harbors}}</li>
            </ul>
            <table>
              <tr>
                <th>Terrain</th>
                <th>Amount for Big islands</th>
                <th>Amount for small islands</th>
              </tr>
              <tr
                v-for="terrain in scenarios[activeScenarioID][numPlayers].terrain"
                v-bind:key="terrain.name"
              >
                <td>{{terrain.name}}</td>
                <td>{{terrain.big}}</td>
                <td>{{terrain.small}}</td>
              </tr>
              <tr>
                <th>Numbers</th>
                <th>Amount for Big islands</th>
                <th>Amount for small islands</th>
              </tr>
              <tr
                v-for="num in scenarios[activeScenarioID][numPlayers].numbers"
                v-bind:key="num.num"
              >
                <td>{{num.num}}</td>
                <td>{{num.big}}</td>
                <td>{{num.small}}</td>
              </tr>
            </table>
          </div>
        </div>
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
      scenarios: [],
      activeScenarioID: 0,
      numPlayers: "3player"
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
      this.scenarios[0].isActive = true;
    },
    chooseScenario: function(sceneid) {
      this.activeScenarioID = sceneid;
      console.log("scene id is " + sceneid);
      for (let i = 0; i < this.scenarios.length; i++) {
        this.scenarios[i].isActive = false;
      }
      this.scenarios[sceneid].isActive = true;
      console.log(this.scenarios[sceneid]);
    }
  },
  watch: {
    info: function(val, oldVal) {
      this.getScenarios();
    }
  }
};
</script>
