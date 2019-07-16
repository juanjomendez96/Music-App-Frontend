<template>
    <div id="container">
        <h1>Welcome!</h1>
        <el-alert v-show="vari === true"
                  title="success alert"
                  type="success"
                  effect="dark"
        >
        </el-alert>

        <p>Enter your username:</p>
        <div class="input">
            <el-input
                    placeholder="Please username"
                    v-model="input"
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

        <div class="button">
            <el-button
                    round
                    @click="getToken"
            >
                Log in
            </el-button>
        </div>

        <div class="button2">
            <el-button
                    round
                    @click="goRegister"
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
                input: '',
                password:'',
                vari: false,
            }
        },

        created() {
            localStorage.setItem('token', 'null');
            localStorage.setItem('user', this.input);
        },
        computed:{

        },
        methods: {

            getToken(){
                axios.post('https://music-app-backend.herokuapp.com/auth/login_check', {
                    _username: this.input,
                    _password: this.password,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then( response => {
                    console.log(response.data.token);
                    this.$notify({
                        title: 'Success',
                        message: 'Successfully logged as '+ this.input,
                        type: 'success'
                    });
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', this.input);
                    this.$router.push('/home');
                }).catch(error2=>{
                    localStorage.setItem('token', 'null');
                    this.$notify.error({
                        title: 'Error',
                        message: 'Wrong credentials'
                    });
                })

            },
            goRegister(){
                this.$router.push('/register');
            }
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