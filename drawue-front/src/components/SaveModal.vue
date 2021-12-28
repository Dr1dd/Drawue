<template>
<transition name="fade-away">
  <div v-if="isOpen" class="save-modal--container">
      <div class="save-modal" v-on-clickaway="closeModal">
          <div class="save-modal--header"> 
              <div v-if="isPublishing" class="arrow-back" @click="isPublishing = false">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
                        <g><g><path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
                                c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
                                L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
                                c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
                                c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
                                C492,219.198,479.172,207.418,464.344,207.418z"/></g></g>
                  </svg>
              </div>
              <div class="close-modal" @click="closeModal">
                    <div></div>
                    <div></div>
              </div>
          </div>
          <div v-if="!isPublishing" class="save-type">
              <span class="choice-container">
                  <span class="choice-collumn"></span>
                  <span class="choice-text">or</span>
              </span>
              <div class="download-drawing" @click="downloadImage">
                  <a href="#" id="download">
                  <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 18c-.205 0-.401-.084-.542-.232l-5.25-5.5c-.455-.476-.117-1.268.542-1.268h2.75v-5.75c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25v5.75h2.75c.659 0 .997.792.542 1.268l-5.25 5.5c-.141.148-.337.232-.542.232z"/><path d="m21 24h-18c-1.654 0-3-1.346-3-3v-5c0-1.654 1.346-3 3-3h1.5c.552 0 1 .448 1 1s-.448 1-1 1h-1.5c-.551 0-1 .449-1 1v5c0 .551.449 1 1 1h18c.551 0 1-.449 1-1v-5c0-.551-.449-1-1-1h-1.5c-.552 0-1-.448-1-1s.448-1 1-1h1.5c1.654 0 3 1.346 3 3v5c0 1.654-1.346 3-3 3z"/></svg>
                  Download
                  </a>
              </div>
              <div class="publish-drawing" @click="isPublishing = getLoginState ? true : false">
                  <div :class="{'locked': !getLoginState}">
                    <svg enable-background="new 0 0 1000 1000" version="1.1" viewBox="0 0 1e3 1e3" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m498.4 411.5-243.4 235.5h147v294h196v-294h147l-246.6-235.5zm393.6-352.5h-784c-53.9 0-98 44.1-98 98v588c0 53.9 44.1 98 98 98h196v-98h-196v-441h784v441h-196v98h196c53.9 0 98-44.1 98-98v-588c0-53.9-44.1-98-98-98zm-759.5 159.3c-20.3 0-36.8-16.5-36.8-36.8s16.5-36.8 36.8-36.8 36.8 16.5 36.8 36.8-16.5 36.8-36.8 36.8zm98 0c-20.3 0-36.8-16.5-36.8-36.8s16.5-36.8 36.8-36.8 36.8 16.5 36.8 36.8-16.5 36.8-36.8 36.8zm661.5-12.3h-588v-49h588.9l-0.9 49z"/></svg>
                    Publish
                  </div>
                  <div v-if="!getLoginState" class="sign-in--locked" @click ="$router.push({name: 'Login'})"> 
                      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <g><g><path d="M437.333,192h-32v-42.667C405.333,66.99,338.344,0,256,0S106.667,66.99,106.667,149.333V192h-32
                                    C68.771,192,64,196.771,64,202.667v266.667C64,492.865,83.135,512,106.667,512h298.667C428.865,512,448,492.865,448,469.333
                                    V202.667C448,196.771,443.229,192,437.333,192z M287.938,414.823c0.333,3.01-0.635,6.031-2.656,8.292
                                    c-2.021,2.26-4.917,3.552-7.948,3.552h-42.667c-3.031,0-5.927-1.292-7.948-3.552c-2.021-2.26-2.99-5.281-2.656-8.292l6.729-60.51
                                    c-10.927-7.948-17.458-20.521-17.458-34.313c0-23.531,19.135-42.667,42.667-42.667s42.667,19.135,42.667,42.667
                                    c0,13.792-6.531,26.365-17.458,34.313L287.938,414.823z M341.333,192H170.667v-42.667C170.667,102.281,208.948,64,256,64
                                    s85.333,38.281,85.333,85.333V192z"/>
                        </g></g>
                      </svg>
                      Sign in
                  </div>
                  
              </div>
          </div>
          <div v-else class="publish-modal">
              <div class="drawing-container">
                <div class="drawing-img"> <img :src="getCanvasImage" alt="Canvas Drawing"></div>
                <div class="drawing-title" :class="{'form-error': titleError}">
                    <input type="text" placeholder="Title" v-model="$v.drawing.title.$model" @blur="$v.drawing.title.$touch()">
                </div>
              </div>
              <div class="drawing-info">
                    <div class="drawing-description" :class="{'form-error': descriptionError}">
                        <textarea name="Description" placeholder="Description" v-model="$v.drawing.description.$model" @blur="$v.drawing.description.$touch(); descriptionFocus = false" @focus="descriptionFocus = true"></textarea>
                        <div class="description-limit" :class="{'focus': descriptionFocus}">
                            {{drawing.description.length}}
                        </div>
                    </div>
                    <div class="drawing-tags">
                        <div class="tag-container">
                            <div class="tag" v-for="(tag, index) in drawing.tags" :key="index">
                                <span class="tag-text"> {{tag}}</span>
                                <span class="close-tag" @click="drawing.tags.splice(index, 1)"> <div></div> <div></div></span>
                            </div>
                            <input class="tag-input" type="text"  maxlength="16" id="tag-input" placeholder="Enter a tag" @keyup.space ="addTag" @keyup.enter ="addTag">
                        </div>
                    </div>
                    <div class="btn" @click="publishDrawing">{{loadingText}}</div>
                    <div v-if="error" class="modal-error">
                        {{error}}
                    </div>
              </div>
          </div>
      </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
import { directive as onClickaway } from 'vue-clickaway';

export default {
    name: 'SaveModal',
    data(){
        return{
            isPublishing: false,
            drawing: {
                title: '',
                description: '',
                tags: [],
            },
            error: '',
            loadingText: 'Publish',
            descriptionFocus: false,
            descriptionError: false,
            titleError: false,
        }
    },
    props: {
        drawingImage: String,
        isOpen:{
            type: Boolean,
            default: false,
        }
    },
    directives: {
        onClickaway: onClickaway,
    },
    validations: {
        drawing:{
            title: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(32),  
            },
            description:{
                maxLength: maxLength(200),
            },
        }

    },
    mounted(){
        window.addEventListener('click', function(e){
            if(this.isPublishing && this.isPublishing!=undefined){
                var modal = document.getElementsByClassName('save-modal');
                if(!modal.contains(e.target)){
                    this.closeModal();
                }
            }
        });
        
    },  
    computed:{
        ...mapGetters(['getLoginState']),
        getCanvasImage(){
            return this.drawingImage;
        },
    },
    watch: {
        '$v.drawing.title.$error': function titleCheck (value) {
            this.error = '';
                if(!this.$v.drawing.title.required) this.error = "Title field is required.";
                if(!this.$v.drawing.title.minLength) this.error = "Title must have at least "+this.$v.drawing.title.$params.minLength.min+ " characters.";
                if(!this.$v.drawing.title.maxLength) this.error = "Title should not have more than "+this.$v.drawing.title.$params.maxLength.max+ " characters.";
            this.titleError = value;
        },
        '$v.drawing.description.$error': function descriptionCheck (value) {
            this.error = '';
            this.descriptionError = value;
            if(!this.$v.drawing.description.maxLength) {
                this.error = "Description should not have more than "+this.$v.drawing.description.$params.maxLength.max+ " characters.";
            }
        },

    },
    methods:{
        closeModal(){
            this.$emit('closingSaveModal');
        },
        downloadImage(){
            var image = document.getElementById('download');
            image.href = this.drawingImage;
            image.download = "Drawing.png";
        },
        addTag(e){
            if(this.drawing.tags.length == 15){
                this.error = 'Maximum amount of tags has been reached (max. 15 tags).'
            }
            else{
                if(e.target.value != " " && e.target.value != ""){
                    this.drawing.tags.push(e.target.value);
                }
            }
            e.target.value = '';
        },
        publishDrawing(){
            this.$v.drawing.$touch();
            if (this.$v.drawing.$invalid) {
                return;
            }
            var title = this.drawing.title;
            var description = this.drawing.description;
            var tags = this.drawing.tags;
            localStorage.setItem("imgCanvas",this.drawingImage);
            var blob = this.dataURItoBlob(this.drawingImage);
            let formData = new FormData(document.forms[0]);
            var resolution = localStorage.getItem('resolution');
            resolution = resolution.split(',');
            var resolutionString = resolution[0].toString() + 'x'+ resolution[1].toString();
            console.log(tags);
            formData.append('file', blob);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tags', tags.join());
            formData.append('resolution', resolutionString);
            this.loadingText = 'Loading...';
            axios.post('/api/upload/drawing', formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                }
            })
                .then(()=>{
                    this.loadingText = 'Publish';
                    this.$router.push({'name': 'Profile'});
                })
                .catch((err)=>{
                    console.log(err.response.data);
                    this.error = err.response.data.error;
                    this.loadingText = 'Publish';
                });
        },
        dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        },
    }

}
</script>

<style lang="scss">
$modal-theme: #86a1b8;
a{
    color: $modal-theme;
    text-decoration: none;
}
.save-modal--container{
    display: flex;
    position: fixed;
    z-index: 999;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #00000038;
    top: 0;
    left: 0;
    transition: all 0.25s;
}
.save-modal{
    display: flex;
    position: relative;
    flex-direction: column;
    min-width: 250px;
    min-height: 115px;
    box-shadow: 0px 0px 4px -2px #000000;
    background: white;
    border-radius: 10px;
    padding: 20px;
    .save-modal--header{
        margin-bottom: 10px;
        .arrow-back{
             position: absolute;
            left: 15px;
            top: 8px;
            cursor: pointer;
            svg{
                height: 20px;
                fill: $modal-theme;
            }
        }
        .close-modal{
            position: absolute;
            right: 20px;
            top: 8px;
            cursor: pointer;
            div{
                position: absolute;
                background: #86a1b8;
                height: 20px;
                width: 3px;
            }
            div:nth-child(1){
                transform: rotate(45deg);
            }
            div:nth-child(2){
                transform: rotate(-45deg);
            }
        }
    }
    .save-type{
        display: flex;
        position: relative;
        height: 100%;
        div{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $modal-theme;
            font-weight: 700;
            cursor: pointer;
            z-index: 1;
            svg{
                height: 64px;
                width: 64px;
                margin-bottom: 10px;
                fill: $modal-theme;
            }
        }
        .download-drawing, .publish-drawing{
            flex: 1;

        }
        .publish-drawing{
            position: relative;
        }
        .download-drawing{
            margin-right: 32px;
        }
        .choice-container{
            display: flex;
            flex-direction: column;
            position: absolute;
            justify-content: center;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 0;
            bottom: 0;
            .choice-collumn{
                margin: 0 auto;
                width: 3px;
                height: 100%;
                background:  #d0dae4;
                border-radius: 15px;
            }
            .choice-text{
                position: absolute;
                margin: 0 auto;
                background: #ffffff;
                left: 0;
                right: 0;
                height: 18px;
                width: 18px;
                font-size: 12px;
                line-height: 1.3;
                vertical-align: middle;
                border: 3px solid #d0dae4;
                font-weight: 700;
                color: #d0dae4;
                border-radius: 50%;
            }
        }
    }
}
.publish-modal{
    display: flex;
    flex-direction: column;
    margin-top: 15px;
}
.drawing-container{
    display: flex;
    max-width: 400px;
    width: 400px;
    margin: 0 auto;
    flex: 2;
    .drawing-img{
        box-shadow: 0px 0px 4px -2px #3981be;
        border: 3px solid #86a1b8;
        border-radius: 5px;
        height: 96px;
        img{
            height: 100%;
            
        }
    }
    .drawing-title{
        align-self: flex-end;
        margin: 0 0 10px 10px;
        input{
            width: 100%;
            max-width: 100%;
            padding: 6px 0 0px;
            margin: 0;
        }
    }
}
.drawing-info{
    position: relative;
    flex: 6;
    min-width: 400px;
    max-width: 400px;
    padding: 6px 20px 20px;
    div{
        display: flex;
    }
    .btn{
        margin: 15px 0 0 0;
        justify-content: center;
    }

}
.drawing-description{
    position: relative;
    width: 100%;
    min-height: 135px;
    textarea{
        border-radius: 5px;
        width: 100%;
    }
    .description-limit{
        padding: 7px 2px;
        background: white;
        height: 11px;
        width: 24px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        border: 3px solid #86a1b8;
        position: absolute;
        bottom: 5px;
        right: -10px;
        color: #86a1b8;
        font-weight: 900;
        font-size: 10px;
    }
    .focus{
        transition: 0.25s all;
        color: #5f7282;
        border-color: #5f7282;
        box-shadow: 0px 9px 12px -13px rgb(65 74 83);
    }
}
.drawing-tags{
    width: 100%;
    .tag-container{
        display: flex;
        flex-wrap: wrap;
        border: 3px solid $modal-theme;
        padding: 5px;
        width: 100%;
        min-height: 33px;
        border-radius: 5px;
        .tag{
            display: inline;
            padding: 3px 5px;
            background: white;
            box-shadow: 0px 0px 2px -2px #000000;
            border: 2px solid #86a1b8;
            border-radius: 11px;
            margin: 2px 3px;
            .close-tag{
                position: relative;
                padding: 0px 7px;
                cursor: pointer;
                div{
                    position: absolute;
                    width: 2px;
                    height: 10px;
                    right: 4px;
                    top: 1px;
                    background: $modal-theme;
                    
                }
                div:nth-child(1){
                    transform: rotate(45deg);
                }
                div:nth-child(2){
                    transform: rotate(-45deg);
                }
            }
        }
        input{
            border:none;
            margin: 0;
            padding: 0px;
            margin-left: 5px;
            flex: 1;
            width: inherit;
            min-width: 50px;     
            &:focus{
                box-shadow: none;
            }
        }
    }
}

.modal-error{
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    margin: 0 auto;
    color: red;
}
.form-error{
    *{
        border-color: #ff5050 !important;
        &:focus{
            border-color: #ff5050 !important;
        }
    }
    div{
        color: #ff5050 !important;
    }
}
.locked{
     filter: blur(2px);
     cursor: inherit;
 }
.sign-in--locked{
    display: flex;
    flex-direction: row !important;
    position: absolute;
    align-items: flex-end !important;
    line-height: 1;
    background: white;
    border: 1px solid #f3f3f3;
    padding: 6px 12px 6px 5px;
    font-size: 15px;
    border-radius: 12px;
    box-shadow: 0px 0px 11px -2px #7f7f7f;
    cursor: inherit;
    svg{
         height: 17px !important;
         width: 17px !important;
         margin: 0 3px 0 0 !important;
    }
}
</style>