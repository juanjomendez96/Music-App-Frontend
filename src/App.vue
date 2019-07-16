<template>
  <div id="app">
    <div id="nav" style="text-align: left" v-show="isHome()">
      <router-link :to="{ name: 'Artists' }">Artists</router-link> |
      <router-link :to="{ name: 'Tracks' }">Tracks</router-link> |
      <router-link :to="{ name: 'Albums' }">Albums</router-link> |
      <router-link :to="{ name: 'Playlists' }">Playlists</router-link> |
      <router-link :to="{ name: 'Charts' }">Charts</router-link>

      <el-dropdown style="float: right"
                   v-show="isLogged()"
                   trigger="click"
      >
        <span class="el-dropdown-link">
        {{this.name.toUpperCase()}} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a href="/" style="text-decoration: none">Log out</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--The key is to reload the component when the url changes-->
    <router-view :key="$route.fullPath"/>
    <div class="sticky-button-home">
      <el-button icon="el-icon-s-home" type="primary" circle @click="goHome()" style="width: 50px; height: 50px;"></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        token: localStorage.getItem('token'),
        name: localStorage.getItem('user')
      }
    },
    created() {
      this.isLogged();
    },
    methods: {
      isLogged(){
        if(localStorage.getItem('token') === 'null'){
          return false;
        }else{
          return true;
        }
      },
      goHome(){
        if(this.isLogged()){
          this.$router.push('/home');
        }else{
          this.$router.push(('/'));
        }
      },
      isHome(){
        if(this.$route.name === 'Home'){
          return false;
        }else{
          return true;
        }
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.sticky-button-home{
  position:fixed;
  bottom: 5%;
  right: 5%;
}


</style>
