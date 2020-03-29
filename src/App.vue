<template>
  <div id="app">
    <div v-if="showLoader" class="loader">
      <p>Fetching Data</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
import { mapState } from 'vuex';

export default {
  computed: mapState({
    showLoader: state => state.showLoader,
  }),
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.row {
  display: flex;
  align-items: center;
}

.justify-space-around {
  justify-content: space-around;
}

.heading {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #2c3e50;

  &:hover {
    opacity: 0.5;
  }
}

.loader {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}
</style>
