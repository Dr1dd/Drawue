(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52670eca"],{2909:function(s,e,a){"use strict";a.d(e,"a",(function(){return d}));var r=a("6b75");function t(s){if(Array.isArray(s))return Object(r["a"])(s)}a("a4d3"),a("e01a"),a("d28b"),a("a630"),a("d3b7"),a("3ca3"),a("ddb0");function i(s){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(s))return Array.from(s)}var n=a("06c5");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(s){return t(s)||i(s)||Object(n["a"])(s)||o()}},"4d63":function(s,e,a){var r=a("83ab"),t=a("da84"),i=a("94ca"),n=a("7156"),o=a("9bf2").f,d=a("241c").f,c=a("44e7"),l=a("ad6d"),u=a("9f7f"),w=a("6eeb"),v=a("d039"),p=a("69f3").set,f=a("2626"),m=a("b622"),g=m("match"),h=t.RegExp,P=h.prototype,C=/a/g,$=/a/g,_=new h(C)!==C,b=u.UNSUPPORTED_Y,y=r&&i("RegExp",!_||b||v((function(){return $[g]=!1,h(C)!=C||h($)==$||"/a/i"!=h(C,"i")})));if(y){var k=function(s,e){var a,r=this instanceof k,t=c(s),i=void 0===e;if(!r&&t&&s.constructor===k&&i)return s;_?t&&!i&&(s=s.source):s instanceof k&&(i&&(e=l.call(s)),s=s.source),b&&(a=!!e&&e.indexOf("y")>-1,a&&(e=e.replace(/y/g,"")));var o=n(_?new h(s,e):h(s,e),r?this:P,k);return b&&a&&p(o,{sticky:a}),o},E=function(s){s in k||o(k,s,{configurable:!0,get:function(){return h[s]},set:function(e){h[s]=e}})},x=d(h),M=0;while(x.length>M)E(x[M++]);P.constructor=k,k.prototype=P,w(t,"RegExp",k)}f("RegExp")},"69be":function(s,e,a){"use strict";a.r(e);var r=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",{staticClass:"error-wrapper"},[a("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:s.close,expression:"close"}],staticClass:"erorr-modal"},[a("div",{staticClass:"close-modal",on:{click:s.close}},[a("div"),a("div")]),a("div",{staticClass:"modal-content"},[s._t("default")],2)])])},t=[],i=a("c7db"),n={name:"ErrorModal",directives:{onClickaway:i["directive"]},methods:{close:function(){this.$emit("close")}}},o=n,d=(a("93a2"),a("2877")),c=Object(d["a"])(o,r,t,!1,null,"7e756436",null);e["default"]=c.exports},8681:function(s,e,a){"use strict";var r=a("c5a2"),t=a.n(r);t.a},8717:function(s,e,a){},"93a2":function(s,e,a){"use strict";var r=a("8717"),t=a.n(r);t.a},c5a2:function(s,e,a){},c66d:function(s,e,a){"use strict";a.r(e);var r=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",{staticClass:"profile-container"},[a("div",{staticClass:"profile-wrapper"},[a("div",{staticClass:"profile-grid"},[a("div",{staticClass:"profile-module"},[a("transition",{attrs:{name:"appear"}},[""!=s.uploadErrorMessage?a("div",{staticClass:"error-flash"},[a("div",{staticClass:"close",on:{click:function(e){s.uploadErrorMessage=""}}},[a("div"),a("div")]),s._v(" "+s._s(s.uploadErrorMessage)+" ")]):s._e()]),a("div",{staticClass:"user-details"},[a("div",{staticClass:"picture-container"},[a("div",{staticClass:"profile-picture"},[a("img",{attrs:{src:"/api/posts/profile/pic/"+s.getProfilePic,alt:""}}),a("div",{staticClass:"change-pic",on:{click:function(e){return s.$refs.file.click()}}},[a("svg",{attrs:{height:"512",viewBox:"0 0 512 512",width:"512",xmlns:"http://www.w3.org/2000/svg"}},[a("g",{attrs:{id:"Solid"}},[a("path",{attrs:{d:"m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z"}}),a("path",{attrs:{d:"m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z"}})])]),s._v(" Change photo "),a("input",{ref:"file",attrs:{type:"file"},on:{change:function(e){return s.handlePicUpload(e)}}})])])]),a("div",{staticClass:"profile-username"},[a("div",[s._v(" @"),a("span",{ref:"username",attrs:{contenteditable:s.editUsername,maxlength:"22"}},[s._v(s._s(s.getUsername))]),s.editUsername?a("div",{staticClass:"edit-username checkmark",on:{click:s.saveUsername}},[s._v(" ✓ ")]):a("div",{staticClass:"edit-username",on:{click:s.editUser}},[a("svg",{attrs:{viewBox:"0 0 383.947 383.947","xml:space":"preserve"}},[a("g",[a("g",[a("g",[a("polygon",{attrs:{points:"0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 \t\t\t"}}),a("path",{attrs:{d:"M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04\n                                                  C386.027,77.92,386.027,64.373,377.707,56.053z"}})])])])])])])]),a("div",{staticClass:"post-info"},[a("div",{staticClass:"drawing-count"},[s._v("Drawings: "+s._s(s.profileStats[1]))]),a("div",{staticClass:"like-count"},[s._v("Likes: "+s._s(s.profileStats[0]))])])]),0==s.emailStatus?a("div",{staticClass:"resend-email",on:{click:s.resendEmail}},[a("a",[s._v(" Resend email confirmation ")])]):s._e()],1),a("div",{staticClass:"change-info--container"},[a("div",{staticClass:"change-password--container"},[a("div",{staticClass:"module-title"},[s._v(" Change Password: ")]),a("div",{staticClass:"password-form"},[a("input",{directives:[{name:"model",rawName:"v-model.lazy",value:s.$v.password.currentPassword.$model,expression:"$v.password.currentPassword.$model",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"Current Password"},domProps:{value:s.$v.password.currentPassword.$model},on:{blur:function(e){return s.$v.password.currentPassword.$touch()},change:function(e){return s.$set(s.$v.password.currentPassword,"$model",e.target.value)}}}),a("transition",{attrs:{name:"fade"}},[s.$v.password.currentPassword.$dirty&&!s.$v.password.currentPassword.required?a("div",{staticClass:"error"},[s._v("Field is required")]):s.backendError["currentPass"]?a("div",{staticClass:"error"},[s._v(" "+s._s(s.backendError["currentPass"])+" ")]):s._e()]),a("input",{directives:[{name:"model",rawName:"v-model.lazy",value:s.$v.password.newPassword.$model,expression:"$v.password.newPassword.$model",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"New Password"},domProps:{value:s.$v.password.newPassword.$model},on:{blur:function(e){return s.$v.password.newPassword.$touch()},change:function(e){return s.$set(s.$v.password.newPassword,"$model",e.target.value)}}}),a("transition",{attrs:{name:"fade"}},[s.$v.password.newPassword.$dirty&&!s.$v.password.newPassword.required?a("div",{staticClass:"error"},[s._v("Field is required")]):s.$v.password.newPassword.$dirty&&!s.$v.password.newPassword.strongPassword?a("div",{staticClass:"error"},[s._v("Strong passwords need to have a letter, a number, a special character, and be atleast 8 characters long.")]):s.$v.password.newPassword.$dirty&&!s.$v.password.newPassword.maxLength?a("div",{staticClass:"error"},[s._v(" Your new password should not exceed "+s._s(s.$v.password.newPassword.$params.maxLength.max)+" characters ")]):s.backendError["newPassword"]?a("div",{staticClass:"error"},[s._v(" "+s._s(s.backendError["newPassword"])+" ")]):s._e()]),a("input",{directives:[{name:"model",rawName:"v-model.lazy",value:s.$v.password.newPasswordConfirm.$model,expression:"$v.password.newPasswordConfirm.$model",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"Confirm Password"},domProps:{value:s.$v.password.newPasswordConfirm.$model},on:{blur:function(e){return s.$v.password.newPasswordConfirm.$touch()},change:function(e){return s.$set(s.$v.password.newPasswordConfirm,"$model",e.target.value)}}}),a("transition",{attrs:{name:"fade"}},[s.$v.password.newPasswordConfirm.$dirty&&!s.$v.password.newPasswordConfirm.required?a("div",{staticClass:"error"},[s._v("Field is required")]):s.$v.password.newPasswordConfirm.$dirty&&!s.$v.password.newPasswordConfirm.sameAsPassword?a("div",{staticClass:"error"},[s._v("The passwords do not match.")]):s.backendError["newPasswordConfirm"]?a("div",{staticClass:"error"},[s._v(" "+s._s(s.backendError["newPasswordConfirm"])+" ")]):s._e()])],1),a("div",{staticClass:"btn",on:{click:s.changePassword}},[s._v(s._s(s.btnText))]),a("transition",{attrs:{name:"success"}},[s.successMessage?a("div",{staticClass:"success-flash"},[a("strong",[s._v("Success: ")]),s._v(" "+s._s(s.successMessage)+" ")]):s._e()])],1)]),a("div",{staticClass:"drawing-list--container"},[a("div",{staticClass:"module-title"},[a("div",[s._v("Drawings:")]),a("div",[s._v(s._s(s.drawingPosts.length)+"/15")])]),a("div",{staticClass:"drawing-post--container"},s._l(s.drawingPosts,(function(e,r){return a("div",{key:r,staticClass:"drawing-post"},[a("div",{staticClass:"delete-post",on:{click:function(e){return s.deletePost(r)}}},[a("span"),s._v(" "),a("span")]),a("router-link",{attrs:{to:{name:"UserDrawingPost",params:{username:e.username,drawing:e,drawingID:e._id,liked:e.liked=s.likedPosts.includes(e._id)}}}},[a("div",{staticClass:"drawing-thumbnail"},[a("img",{attrs:{src:"/api/posts/profile/drawing/"+e.drawing_path,alt:""}})]),a("div",{staticClass:"drawing-info"},[a("div",{staticClass:"drawing-title"},[s._v(" "+s._s(e.title)+" ")]),a("div",{staticClass:"drawing-description"},[s._v(" "+s._s(e.description)+" ")])])])],1)})),0)])])]),s.emailConfirm?a("ErrorModal",{on:{close:function(e){s.emailConfirm=!1}}},[s._v(" Confirmation email has been sent to: "+s._s(s.getEmail)+" ")]):s._e(),a("router-view",{key:s.$route.path})],1)},t=[],i=(a("4d63"),a("ac1f"),a("25f0"),a("2909")),n=a("5530"),o=a("bc3a"),d=a.n(o),c=a("b5ae"),l=a("2f62"),u=a("69be"),w={name:"Profile",data:function(){return{user:{username:"",email:""},picFile:null,uploadErrorMessage:"",backendError:"",btnText:"Change Password",successMessage:"",password:{currentPassword:"",newPassword:"",newPasswordConfirm:""},drawingPosts:[],drawingError:"",profileInfo:"",likedPosts:[],editUsername:!1,emailConfirm:!1}},components:{ErrorModal:u["default"]},validations:{password:{currentPassword:{required:c["required"],strongPassword:function(s){return/[a-z]/.test(s)&&/[0-9]/.test(s)&&/\W|_/.test(s)&&s.length>=8},maxLength:Object(c["maxLength"])(100)},newPassword:{required:c["required"],strongPassword:function(s){return/[a-z]/.test(s)&&/[0-9]/.test(s)&&/\W|_/.test(s)&&s.length>=8},maxLength:Object(c["maxLength"])(100)},newPasswordConfirm:{required:c["required"],sameAsPassword:Object(c["sameAs"])("newPassword")}}},computed:Object(n["a"])({},Object(l["b"])(["getLoginState","getProfilePic","getEmail","getUsername","profileStats","emailStatus"])),methods:{handlePicUpload:function(s){this.picFile=s.target.files[0]},submitFile:function(){var s=this,e=new FormData;e.append("file",this.picFile),d.a.post("/api/upload/profile-pic",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){s.$store.commit("SET_PROFILE_PIC",e.data)})).catch((function(e){s.uploadErrorMessage=e.response.data.error}))},changePassword:function(){var s=this;if(this.$v.password.$touch(),!this.$v.password.$invalid){this.loading=!0,this.btnText="Loading...";var e=this.password.currentPassword,a=this.password.newPassword,r=this.password.newPasswordConfirm;d.a.post("/api/auth/change-password",{currentPassword:e,newPassword:a,confirmNewPassword:r},{}).then((function(e){e.data&&(s.loading=!1,s.btnText="Change Password",s.successMessage=e.data.successPassword)})).catch((function(e){s.loading=!1,s.btnText="Change Password",s.backendError=e.response.data}))}},getDrawings:function(){var s=this;d.a.get("/api/profile/drawings").then((function(e){var a;s.drawingPosts=e.data.drawingPosts,(a=s.likedPosts).push.apply(a,Object(i["a"])(e.data.likedPosts))})).catch((function(e){s.drawingError=e.response.error}))},editUser:function(){this.editUsername=!0;var s=this.$refs.username;s.focus()},saveUsername:function(){var s=event.target.previousSibling;s=s.textContent,console.log(s);var e=new RegExp(/^[a-zA-Z0-9]+$/),a=e.test(s);s.length<6&&(a=!1),s.length>22&&(a=!1),console.log(a)},resendEmail:function(){var s=this;this.emailConfirm=!0;var e=this.getEmail;d.a.post("/api/auth/register/resend",{email:e},{}).then((function(e){e.data&&(s.successMessage=e.data.successSend)})).catch((function(e){s.successMessage=e.response.data}))},deletePost:function(s){var e=this;d.a.post("/api/drawings/delete",{index:s},{}).then((function(s){s.data&&(e.successMessage=s.data.successSend)})).catch((function(s){e.successMessage=s.response.data}))}},mounted:function(){this.getDrawings()},watch:{picFile:function(){this.submitFile()},uploadErrorMessage:function(){var s=this;""!=this.uploadErrorMessage&&setTimeout((function(){return s.uploadErrorMessage=""}),3e3)},successMessage:function(){var s=this;""!=this.successMessage&&setTimeout((function(){return s.successMessage=""}),2e3)}}},v=w,p=(a("8681"),a("2877")),f=Object(p["a"])(v,r,t,!1,null,"672cb76e",null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-52670eca.8261d21b.js.map