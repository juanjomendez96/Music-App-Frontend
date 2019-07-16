<template>
    <div id="home">
        <div id="nav">
            <el-dropdown style="float: right"
                         v-show="isLogged()"
                         trigger="click"
            >
                <span class="el-dropdown-link">
                {{this.user}} <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <a href="/" style="text-decoration: none">Log out</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <h1>Welcome {{ this.user }}!</h1>


        <el-row :gutter="20" style="margin-bottom: 3%">
            <el-col :span="12">
                <el-card shadow="hover" style="border-color: #67b1ff">
                    <el-button style="border-color: white; padding: inherit" @click="goToA()">See all the artists in your iTunes</el-button>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card shadow="hover" style="border-color: #67b1ff">
                    <el-button style="border-color: white; padding: inherit" @click="goToAl()">See all the albums in your iTunes</el-button>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-bottom: 3%">
            <el-col :span="12">
                <el-card shadow="hover" style="border-color: #67b1ff">
                    <el-button style="border-color: white; padding: inherit" @click="goToT()">See all the tracks in your iTunes</el-button>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card shadow="hover" style="border-color: #67b1ff">
                    <el-button style="border-color: white; padding: inherit" @click="goToP()">See all the playlists in your iTunes</el-button>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-bottom: 3%" >
            <el-col :span="24">
                <el-card shadow="hover" style="border-color: #67b1ff">
                    <el-button style="border-color: white; padding: inherit" @click="goToC()">See charts</el-button>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name:'home',
        data(){
            return{
                user: localStorage.getItem('user')
            }
        },
        created(){
            localStorage.setItem('user', localStorage.getItem('user'));
        },
        methods: {
            goToA(){
                this.$router.push('/artists');
            },
            goToAl(){
                this.$router.push('/albums');
            },
            goToT(){
                this.$router.push('/tracks');
            },
            goToP(){
                this.$router.push('/playlists');
            },
            goToC(){
                this.$router.push('/charts');
            },
            isLogged(){
                if(localStorage.getItem('token') === 'null'){
                    return false;
                }else{
                    return true;
                }
            },
        }
    }
</script>