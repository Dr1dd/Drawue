<template>
  <div>
      {{message}}
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
        var token = this.$route.params.email_token;
        axios.post('http://localhost:5000/api/auth/verification', {token})
        .then((res)=>{
            if(res.data){
                console.log(res.data);
                this.message = res.data;
            }
        })
        .catch((err)=>{
            this.message = err.response.data;
        })
    }
}
</script>

<style>

</style>