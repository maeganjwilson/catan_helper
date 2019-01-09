<template>
  <div>
    <h1>{{info.name}}</h1>
    <div>
      <img src="https://via.placeholder.com/150" alt="image of game board">
      <h2>Materials Needed</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectedGame",
  props: {
    info: Object
  }
};
</script>
