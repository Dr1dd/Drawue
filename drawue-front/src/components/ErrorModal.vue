<template>
    <div class="error-wrapper">
        <div class="erorr-modal" v-on-clickaway="close">
          <div class="close-modal" @click="close">
              <div></div>
              <div></div>
          </div>
          <div class="modal-content">
              <slot>  </slot>
          </div>
         </div>
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
export default {
    name: 'ErrorModal',
    directives:{
        onClickaway: onClickaway,
    },
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>

<style scoped lang="scss">
$module-theme: #86a1b8;
@use '../sass/components/_close';
  .error-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        top:0;
        left: 0;
        height: 100%;
        width: 100%;
        background: #0000001a;
        z-index: 999;
        .erorr-modal{
            display: flex;
            position: relative;
            margin:0 auto;
            padding:20px;
            background: white;
            border: 2px solid #d6dbda;
            .close-modal{
                @include close.closeModal;
                height: 20px;
            }
            .modal-content{
                display: flex;
                padding: 15px 10px 5px 10px;
                font-size: 20px;
                color: $module-theme;
            }
        }
    }
</style>