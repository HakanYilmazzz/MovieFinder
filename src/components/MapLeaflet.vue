<template>
  <div
    style="
      height: 53vh;
      width: 98vw;
      border: 4px solid grey;
      border-radius: 10px;
      bottom: 0;
      display: flex;
    "
  >
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[37.7652266, -122.4516391]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      
        <l-marker
          v-for="(item, id) in LastMarkersList"
          :lat-lng="item"
          :key="id"
          draggable
        >
          <l-popup> {{item}} </l-popup>
        </l-marker>

      
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: ["secilmis", "veri"],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 11,
      iconWidth: 25,
      iconHeight: 40,
      markers: [],
      data: [],
      LastMarkersList: [],
    };
  },
  updated() {
    this.markers = [];
    let gelenVeri = JSON.parse(JSON.stringify(this.veri));
    let filtered = gelenVeri.filter((a) => a.title == this.secilmis);
    console.log(filtered, filtered.length);
    for (var i = 0; i < filtered.length; i++) {
      if (filtered[i].locations != null) {
        this.markers.push((Math.random() * (37.83-37.62) + 37.62).toFixed(4));
        this.markers.push((Math.random() * (-122.5105-(-122.3696)) + (-122.3696)).toFixed(4));
      }
    }
    let markersList = JSON.parse(JSON.stringify(this.markers));
    console.log(markersList);
    this.LastMarkersList = [];
    let size = 2;
    for (let i = 0; i < markersList.length; i += size) {
      this.LastMarkersList.push(markersList.slice(i, i + size));
    }
    console.log(JSON.parse(JSON.stringify(this.LastMarkersList)), this.LastMarkersList.length);

    // for (var y = 0; y < this.LastMarkersList.length; y++) {
    //   this.LastMarkersList[y].reverse();
    // }
  },
  // updated(){
  //     var gelenVeri = JSON.parse(JSON.stringify(this.veri));
  //     var filtered = gelenVeri.filter(a => a.title == this.secilmis);
  //     console.log(filtered, filtered.length);
  //     for(var i = 0; i < filtered.length; i++){
  //       if(filtered[i].locations != null){
  //         fetch(`https://api.geoapify.com/v1/geocode/search?text=${filtered[i].locations}&apiKey=773f40c2de874b53b912d00b34aecd1f`)
  //         .then(response => response.json())
  //         .then(data => {
  //           this.data = data;
  //           this.markers.push(data.features[0].geometry.coordinates);
  //           console.log(data.features , this.markers );
  //         })
  //         .catch(error => {
  //           this.error = error;
  //           console.log(error)
  //         });
  //       }
  //     }
  //     JSON.parse(JSON.stringify(this.markers))
  //         for(var y = 0; y < this.markers.length; y++){
  //             this.markers[y].reverse();
  //           }
  // },

  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  methods: {
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
  },
};
</script>