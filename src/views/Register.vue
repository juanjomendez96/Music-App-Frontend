<template>
    <div id="container">
        <h1>Welcome!</h1>
        <el-alert v-show="vari === true"
                  title="success alert"
                  type="success"
                  effect="dark"
        >
        </el-alert>

        <p>Enter your name:</p>
        <div class="input">
            <el-input
                    placeholder="Please name"
                    v-model="name"
                    clearable>
            </el-input>
        </div>

        <p>Enter your username:</p>
        <div class="input">
            <el-input
                    placeholder="Please username"
                    v-model="username"
                    clearable>
            </el-input>
        </div>

        <p>Enter your password:</p>
        <div class="input">
            <el-input
                    placeholder="Please input password"
                    v-model="password"
                    show-password>
            </el-input>
        </div>

        <p>Enter your email:</p>
        <div class="input">
            <el-input
                    placeholder="Please email"
                    v-model="email"
                    clearable>
            </el-input>
        </div>

        <div class="button">
            <el-button
                    round
                    @click="setUser"
            >
                Register
            </el-button>
        </div>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'login',
        props:[],
        data(){
            return{
                name: '',
                username: '',
                password:'',
                email:'',
                vari: false
            }
        },

        created() {
        },
        computed:{

        },
        methods: {

            setUser(){
                axios.post('https://music-app-backend.herokuapp.com/auth/register', {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.name,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( response => {
                    console.log(response.data.token);
                    this.$notify({
                        title: 'Success',
                        message: 'Successfully register as '+ this.username,
                        type: 'success'
                    });
                    this.$router.push('/');
                }).catch(error2=>{
                    this.$notify.error({
                        title: 'Error',
                        message: 'Unable to register'
                    });
                })

            },
        }
    }
</script>

<style>
    .input{
        width: 50%;
        margin: auto;
    }

    .button{
        margin-top: 5%;
    }
    .button2{
        margin-top: 2%;
    }
</style>