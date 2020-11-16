<template>
  <div class="header">
      <div class="gallery-section">
        <div class="site-logo">
          <router-link to="/"><img src="@/assets/Drawue-logo.png"> </router-link>
        </div>
        <div class="gallery-link">
            <router-link to="/gallery"> Gallery </router-link>
        </div>
      </div>
      <div class="auth-section" v-if="getLoginState === false">
        <router-link to="/login"><div class="sign-in"> Sign In</div></router-link>
        <router-link to="/register"><div class="sign-up"> Sign Up</div></router-link>
      </div>
      <div v-else-if="getLoginState == true" class="profile-section">
        <div class="user">
          <div class="profile-pic">
            <router-link to="/profile"><img :src="'/api/posts/profile/pic/' + getProfilePic" alt="pic"> </router-link>
          </div>
          <div class="username" @click="dropDown = !dropDown">
            {{ getUsername }}
            <div class="down-symbol">
              <p v-if="dropDown"><i class="arrow up"></i></p>
              <p v-else><i class="arrow down"></i></p>
            </div>
            <transition name="fade">
              <div v-if="dropDown" class="drop-down">
                <ul>
                  <li> <router-link to="/profile"> <font-awesome-icon :icon="['fas', 'user']"/> Profile </router-link></li>
                  <li class="logout" @click="logOut"> <font-awesome-icon :icon="['fas', 'sign-out-alt']"/> Logout</li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
        <!-- <div class="logout" @click="logOut">
          Logout
        </div>
        <router-link to="/profile"><div> Profile</div></router-link> -->
      </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
    name: 'Header',
    data(){
      return{
        dropDown: false,
      }
    },
    computed: {
      ...mapGetters(['getLoginState', 'getProfilePic', 'getUsername']),
    },
    methods:{
      logOut(){
        this.$store.dispatch('Logout');
      }
    }
}
</script>

<style lang="scss">
 .header{
    display: flex;
    height: 48px;
    width: 100%;
    background: white;
    justify-content: space-between;
    position: fixed;
    z-index: 999;
    box-shadow: 0px 0px 4px -2px #000000;
  
 }
 .gallery-section{
   display: flex;
   align-items: center;
   height: 100%;
   margin-left: 90px;
  .site-logo{
    height: 100%;
    cursor: pointer;
    a{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
    img{
        height: 85%;
    }
  }
  .gallery-link{
    margin-left: 2rem;
    a{
      color: #86a1b8;
      cursor: pointer;
      font-size: 17px;
      font-weight: 600;
    }
  }
}
 .auth-section{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 15px;
    a{
      text-decoration: none;
      color: #86a1b8;
      cursor: pointer;
      font-size: 17px;
      font-weight: 600;
    }
    .sign-in{
      margin-right: 15px;
    }
 }
 .profile-section{
   display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 15px;
    a{
      text-decoration: none;
      cursor: pointer;
      color: #a6abb0;
      user-select: none;
      font-size: 17px;
      font-weight: 600;
      transition: color 0.2s;
    }
 }
 .user{
   display: flex;
   align-items: center;
   cursor: pointer;
   .profile-pic{
     height: 24px;
     width: 24px;
   }
   .username{
    display: flex;
    position: relative;
    align-items: center;
    margin-left: 7px;
    color: #a7a5a5;
    user-select: none;
    .down-symbol{
      font-size: 12px;
    }
   }
   img{
     height: 100%;
     width: 100%;
     border-radius: 50%;
     border: 1px solid #eeeeee;
   }
   .drop-down{
     position: absolute;
     padding: 20px;
     top: 40px;
     right: -3px;
     max-width: 200px;
     min-width: 111px;
     min-height: 51px;
     background: white;
     box-shadow: 0px 0px 4px -2px #000000;
     ul{
       list-style-type: none;
       padding: 0;
       text-align: left;
       margin: 0;
       li{
        margin: 0 0 6px 0;
        color: #a6abb0;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        &:hover{
          color: #86a1b8;
          a{
            color: #86a1b8;
          }
        }
       }
     }
     &::before{
      position: absolute;
      content: "";
      transform: rotate(45deg);
      top: -3px;
      padding: 3px;
      right: 11px;
      background: #ffffff;
      box-shadow: 0px 0px 5px -1px #000000;
     }
      &::after{
      position: absolute;
      content: "";
      transform: rotate(45deg);
      top: -3px;
      padding: 7px;
      right: 7px;
      background: #ffffff;
     }
   }
 }
.arrow {
  border: solid #b0aeae;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 2px;
  margin: 0 7px;
}
.up {
  border-width: 3px 0 0 3px;
  transform: rotate(45deg) translateY(1px) translateX(1px);
}

.down {
  border-width: 0 3px 3px 0;
  transform: rotate(45deg) translateY(-1px) translateX(-1px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>