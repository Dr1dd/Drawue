<template>
  <div></div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Profile',
    data(){
        return{
            user:{
                username: '',
                email: ''
            }
        }
    },
    created(){
        axios.get('api/profile/user',)
        .then((res)=>{
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err.response);
        });
    }
}
</script>

<style>

</style>