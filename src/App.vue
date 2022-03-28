<template>
  <v-app>
    <v-main>
      <SearchMovie @secilen="secilenVeri" :veri="data"/>
      <MapLeaflet :veri="data" :secilmis="secilmis"/>
      
    </v-main>
  </v-app>
</template>

<script>
import SearchMovie from './components/SearchMovie.vue'
import MapLeaflet from './components/MapLeaflet.vue'


export default {
  name: 'App',

  components: {
    SearchMovie,
    MapLeaflet
  },

  data() {
    return {
      data: null,
      error: null,
      secilmis: null,
    };
  },
  created() {
    this.fetchData();
    
  },
  
  methods: {
    secilenVeri(value){
      this.secilmis = value
    },
    fetchData() {
      this.error = this.data = null;
      fetch('https://data.sfgov.org/resource/yitu-d5am.json')
        .then(response => response.json())
        .then(data => {
          this.data = data;
        })
        .catch(error => {
          this.error = error;
        });
    },
  },
}
</script>
<style >
  .v-main__wrap{
    background-color: rgb(60, 87, 87);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
  }
</style>