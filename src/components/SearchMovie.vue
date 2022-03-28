<template>
  <div class="arama">
    <input
      class="effect-2"
      type="text"
      v-model="inputHolder"
      list="selection"
      placeholder="Film seçiniz"
    />
    <datalist id="selection">
      <option v-for="(item, idx) in filmsUnique" :key="idx" :value="item" class="secenek">
        {{ item }}
      </option>
    </datalist>
  </div>
</template>

<script>
export default {

  props: ["veri"],
  data() {
    return {
      filmsUnique: [],
      value: null,
      objectItem: {},
      stringItem: "",
      selectedValue: null,
      inputHolder: "",
    };
  },
  watch: {
    inputHolder() {
      this.$emit("secilen", this.inputHolder);
    },
  },
  beforeUpdate() {
    var films = [];
    var gelenVeri = JSON.parse(JSON.stringify(this.veri));
    gelenVeri.forEach((element) => {
      if(element.locations != null){
        films.push(element.title);
      }
      
    });
    this.filmsUnique = [...new Set(films)];
  },
  methods: {
    getItems(selectedValue) {
      this.selectedValue = selectedValue;
    },
  },
};
</script>
<style>
::placeholder {
  color: white;
  font-weight: 600;
  opacity: .8;
}
.arama{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin:10%;
  width: 65%;
}
.effect-2 {
  color: white;
  text-align: center;
  width: 100%;
  border: 5px solid #ccc;
  padding: 7px 0;
  border-radius: 5px;
  border-bottom: 5px solid rgb(233, 87, 87);
}
.effect-2 ~ .focus-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #4caf50;
  transition: 0.4s;
}
.effect-2:focus ~ .focus-border {
  width: 100%;
  transition: 0.4s;
  left: 0;
}
.secenek{
  background-color: red;
  color: white;
  text-align: center;
  width: 100%;
  border: 5px solid #ccc;
  padding: 7px 0;
  border-radius: 5px;
  border-bottom: 5px solid rgb(233, 87, 87);
}

</style>