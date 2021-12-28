<template>
  <div>
      <div class ="verification-container">
        <div class="verification-module">
            <div class="verification-header">
                Email verification
            </div>
            <div class="text-container">
                {{message}}
                <div >Go <router-link to="/">Home</router-link></div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Verification',
    data(){
        return{
            message: ''
        }
    },
    mounted(){
        var token = this.$route.query.email;
        axios.post('/api/auth/verification', { token }, {})
        .then((res)=>{
            if(res.data){
                this.message = res.data;
            }
        })
        .catch((err)=>{
            this.message = err.response.data;
        });
    }
}
</script>

<style lang="scss">
$module-theme: #86a1b8;
    .verification-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
    }
    .verification-module{
        display: flex;
        flex-direction: column;
        background: white;
        box-shadow: 0px 0px 4px -2px #000000;
        border-radius: 15px;
        .verification-header{
            display: flex;
            justify-content: center;
            padding: 10px;
            background: $module-theme;
            color: white;
            font-size: 25px;
            font-weight: 700;
            border-radius: 13px 13px 0 0;
        }
        .text-container{
            display: grid;
            padding: 20px;
            grid-row-gap: 15px;
        }
    }
</style>