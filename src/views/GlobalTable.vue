<template>
  <div class="home">

    <h1>{{this.$route.name.toLocaleUpperCase()}}</h1>
    <Tabla
      :alldata="datos"
      :columnas="returnColums"
      v-if="loading === false && token !== 'null'"
    />
    <p v-loading="loading"
       v-else-if="loading === true && token !== 'null'"
       element-loading-text="Loading..."
       element-loading-spinner="el-icon-loading"
    >
    </p>

    <el-alert
            title="Please, log in first to see data"
            type="error"
            center
            show-icon
            v-else
    >
    </el-alert>

  </div>
</template>

<script>
// @ is an alias to /src
import Tabla from '../components/Tabla.vue';
import axios from 'axios';

export default {
  name: "globaltable",
  data(){
    return{
      datos: [],
      token: localStorage.getItem('token'),
      loading: true,
      name: localStorage.getItem('user')
    }
  },
  created() {
    if(this.$route.name === 'artistsIndividual'){
      this.fetchDataIndividual();
    }else{
      this.fetchData();
    }
  },

  methods: {
    fetchData() {
      axios
              .get('http://localhost:8000/api' + this.$route.path,{
                headers:{
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then(response=> {
                this.datos = response.data;
                this.loading = false;
              })
    },
    fetchDataIndividual() {
      axios
              .get('http://localhost:8000/api' + this.$route.path,{
                headers:{
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then(response=> {
                this.datos = response.data;
              })
    }
  },

  computed: {
    returnColums() {
      let columnas=[];
      if(typeof Object.keys(this.datos[0] !== 'undefined') && Object.keys(this.datos[0]).length > 0){
        columnas = Object.keys(this.datos[0]);
      }
      return columnas;
    }
  },

  components: {
    Tabla
  }
};
</script>
