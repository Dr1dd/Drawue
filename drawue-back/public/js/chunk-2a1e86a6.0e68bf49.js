(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a1e86a6"],{1331:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("integer",/(^[0-9]*$)|(^-[0-9]+$)/);t.default=a},"2a12":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"maxLength",max:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)<=e}))};t.default=a},3360:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"and"},(function(){for(var e=this,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce((function(t,r){return t&&r.apply(e,n)}),!0)}))};t.default=a},"3a54":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=a},"45b8":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("numeric",/^[0-9]*$/);t.default=a},"46bc":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"maxValue",max:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e}))};t.default=a},"5d75":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,s=(0,n.regex)("email",a);t.default=s},"5db3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"minLength",min:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)>=e}))};t.default=a},6235:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("alpha",/^[a-zA-Z]*$/);t.default=a},6417:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"not"},(function(t,r){return!(0,n.req)(t)||!e.call(this,t,r)}))};t.default=a},"772d":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,s=(0,n.regex)("url",a);t.default=s},"78ef":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return n.default}}),t.regex=t.ref=t.len=t.req=void 0;var n=a(r("8750"));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){return s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}var o=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===s(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=o;var i=function(e){return Array.isArray(e)?e.length:"object"===s(e)?Object.keys(e).length:String(e).length};t.len=i;var u=function(e,t,r){return"function"===typeof e?e.call(t,r):r[e]};t.ref=u;var d=function(e,t){return(0,n.default)({type:e},(function(e){return!o(e)||t.test(e)}))};t.regex=d},"796d":function(e,t,r){"use strict";var n=r("f5df5"),a=r.n(n);a.a},8750:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="web"===Object({NODE_ENV:"production",BASE_URL:"/"}).BUILD?r("cb69").withParams:r("0234").withParams,a=n;t.default=a},"91d3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,n.withParams)({type:"macAddress"},(function(t){if(!(0,n.req)(t))return!0;if("string"!==typeof t)return!1;var r="string"===typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(s)}))};t.default=a;var s=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},aa82:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"requiredIf",prop:e},(function(t,r){return!(0,n.ref)(e,this,r)||(0,n.req)(t)}))};t.default=a},b5ae:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return w.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return b.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return P.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return _.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return $.default}}),t.helpers=void 0;var n=j(r("6235")),a=j(r("3a54")),s=j(r("45b8")),o=j(r("ec11")),i=j(r("5d75")),u=j(r("c99d")),d=j(r("91d3")),c=j(r("2a12")),f=j(r("5db3")),l=j(r("d4f4")),p=j(r("aa82")),v=j(r("e652")),w=j(r("b6cb")),m=j(r("772d")),b=j(r("d294")),P=j(r("3360")),g=j(r("6417")),h=j(r("eb66")),y=j(r("46bc")),_=j(r("1331")),$=j(r("c301")),x=O(r("78ef"));function O(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}function j(e){return e&&e.__esModule?e:{default:e}}t.helpers=x},b6cb:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"sameAs",eq:e},(function(t,r){return t===(0,n.ref)(e,this,r)}))};t.default=a},c301:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=a},c66d:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"profile-container"},[r("div",{staticClass:"profile-grid"},[r("div",{staticClass:"profile-module"},[r("transition",{attrs:{name:"appear"}},[""!=e.uploadErrorMessage?r("div",{staticClass:"error-flash"},[r("div",{staticClass:"close",on:{click:function(t){e.uploadErrorMessage=""}}},[r("div"),r("div")]),e._v(" "+e._s(e.uploadErrorMessage)+" ")]):e._e()]),r("div",{staticClass:"user-details"},[r("div",{staticClass:"picture-container"},[r("div",{staticClass:"profile-picture"},[r("img",{attrs:{src:"/api/uploads/getImage/"+e.getProfilePic,alt:""}}),r("div",{staticClass:"change-pic",on:{click:function(t){return e.$refs.file.click()}}},[r("svg",{attrs:{height:"512",viewBox:"0 0 512 512",width:"512",xmlns:"http://www.w3.org/2000/svg"}},[r("g",{attrs:{id:"Solid"}},[r("path",{attrs:{d:"m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z"}}),r("path",{attrs:{d:"m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z"}})])]),e._v(" Change photo "),r("input",{ref:"file",attrs:{type:"file"},on:{change:function(t){return e.handlePicUpload(t)}}})])])]),r("div",{staticClass:"profile-username"},[r("div",[e._v(" @"+e._s(e.getUsername)+" "),r("div",{staticClass:"edit-username"},[r("svg",{attrs:{viewBox:"0 0 383.947 383.947","xml:space":"preserve"}},[r("g",[r("g",[r("g",[r("polygon",{attrs:{points:"0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 \t\t\t"}}),r("path",{attrs:{d:"M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04\n                                      C386.027,77.92,386.027,64.373,377.707,56.053z"}})])])])])])])]),e._m(0)]),r("div",{staticClass:"password-change"})],1),r("div",{staticClass:"change-info--container"},[r("div",{staticClass:"change-password--container"},[r("div",{staticClass:"module-title"},[e._v(" Change Password: ")]),r("div",{staticClass:"password-form"},[r("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.$v.password.currentPassword.$model,expression:"$v.password.currentPassword.$model",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"Current Password"},domProps:{value:e.$v.password.currentPassword.$model},on:{blur:function(t){return e.$v.password.currentPassword.$touch()},change:function(t){return e.$set(e.$v.password.currentPassword,"$model",t.target.value)}}}),r("transition",{attrs:{name:"fade"}},[e.$v.password.currentPassword.$dirty&&!e.$v.password.currentPassword.required?r("div",{staticClass:"error"},[e._v("Field is required")]):e.backendError["currentPass"]?r("div",{staticClass:"error"},[e._v(" "+e._s(e.backendError["currentPass"])+" ")]):e._e()]),r("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.$v.password.newPassword.$model,expression:"$v.password.newPassword.$model",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"New Password"},domProps:{value:e.$v.password.newPassword.$model},on:{blur:function(t){return e.$v.password.newPassword.$touch()},change:function(t){return e.$set(e.$v.password.newPassword,"$model",t.target.value)}}}),r("transition",{attrs:{name:"fade"}},[e.$v.password.newPassword.$dirty&&!e.$v.password.newPassword.required?r("div",{staticClass:"error"},[e._v("Field is required")]):e.$v.password.newPassword.$dirty&&!e.$v.password.newPassword.strongPassword?r("div",{staticClass:"error"},[e._v("Strong passwords need to have a letter, a number, a special character, and be atleast 8 characters long.")]):e.$v.password.newPassword.$dirty&&!e.$v.password.newPassword.maxLength?r("div",{staticClass:"error"},[e._v(" Your new password should not exceed "+e._s(e.$v.password.newPassword.$params.maxLength.max)+" characters ")]):e.backendError["newPassword"]?r("div",{staticClass:"error"},[e._v(" "+e._s(e.backendError["newPassword"])+" ")]):e._e()]),r("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.$v.password.newPasswordConfirm.$model,expression:"$v.password.newPasswordConfirm.$model",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"Confirm Password"},domProps:{value:e.$v.password.newPasswordConfirm.$model},on:{blur:function(t){return e.$v.password.newPasswordConfirm.$touch()},change:function(t){return e.$set(e.$v.password.newPasswordConfirm,"$model",t.target.value)}}}),r("transition",{attrs:{name:"fade"}},[e.$v.password.newPasswordConfirm.$dirty&&!e.$v.password.newPasswordConfirm.required?r("div",{staticClass:"error"},[e._v("Field is required")]):e.$v.password.newPasswordConfirm.$dirty&&!e.$v.password.newPasswordConfirm.sameAsPassword?r("div",{staticClass:"error"},[e._v("The passwords do not match.")]):e.backendError["newPasswordConfirm"]?r("div",{staticClass:"error"},[e._v(" "+e._s(e.backendError["newPasswordConfirm"])+" ")]):e._e()])],1),r("div",{staticClass:"btn",on:{click:e.changePassword}},[e._v(e._s(e.btnText))]),r("transition",{attrs:{name:"success"}},[e.successMessage?r("div",{staticClass:"success-flash"},[r("strong",[e._v("Success: ")]),e._v(" "+e._s(e.successMessage)+" ")]):e._e()])],1)]),e._m(1)])])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"post-info"},[r("div",{staticClass:"drawing-count"},[e._v("Drawings:")]),r("div",{staticClass:"like-count"},[e._v("Likes:")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"drawing-list--container"},[r("div",{staticClass:"module-title"},[e._v(" Drawings: ")])])}],s=r("5530"),o=r("bc3a"),i=r.n(o),u=r("b5ae"),d=r("2f62"),c={name:"Profile",data:function(){return{user:{username:"",email:""},picFile:null,uploadErrorMessage:"",backendError:"",btnText:"Change Password",successMessage:"",password:{currentPassword:"",newPassword:"",newPasswordConfirm:""}}},validations:{password:{currentPassword:{required:u["required"],strongPassword:function(e){return/[a-z]/.test(e)&&/[0-9]/.test(e)&&/\W|_/.test(e)&&e.length>=8},maxLength:Object(u["maxLength"])(100)},newPassword:{required:u["required"],strongPassword:function(e){return/[a-z]/.test(e)&&/[0-9]/.test(e)&&/\W|_/.test(e)&&e.length>=8},maxLength:Object(u["maxLength"])(100)},newPasswordConfirm:{required:u["required"],sameAsPassword:Object(u["sameAs"])("newPassword")}}},computed:Object(s["a"])({},Object(d["b"])(["getLoginState","getProfilePic","getUsername"])),methods:{handlePicUpload:function(e){this.picFile=e.target.files[0]},submitFile:function(){var e=this,t=new FormData;t.append("file",this.picFile),i.a.post("/api/upload/profile-pic",t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){e.$store.commit("SET_PROFILE_PIC",t.data)})).catch((function(t){e.uploadErrorMessage=t.response.data.error}))},changePassword:function(){var e=this;if(this.$v.password.$touch(),!this.$v.password.$invalid){this.loading=!0,this.btnText="Loading...";var t=this.password.currentPassword,r=this.password.newPassword,n=this.password.newPasswordConfirm;i.a.post("/api/auth/change-password",{currentPassword:t,newPassword:r,confirmNewPassword:n},{}).then((function(t){t.data&&(e.loading=!1,e.btnText="Change Password",e.successMessage=t.data.successPassword)})).catch((function(t){e.loading=!1,e.btnText="Change Password",e.backendError=t.response.data}))}}},watch:{picFile:function(){this.submitFile()},uploadErrorMessage:function(){var e=this;""!=this.uploadErrorMessage&&setTimeout((function(){return e.uploadErrorMessage=""}),3e3)},successMessage:function(){var e=this;""!=this.successMessage&&setTimeout((function(){return e.successMessage=""}),2e3)}}},f=c,l=(r("796d"),r("2877")),p=Object(l["a"])(f,n,a,!1,null,"ada083a8",null);t["default"]=p.exports},c99d:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.withParams)({type:"ipAddress"},(function(e){if(!(0,n.req)(e))return!0;if("string"!==typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(s)}));t.default=a;var s=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},cb69:function(e,t,r){"use strict";(function(e){function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var n="undefined"!==typeof window?window:"undefined"!==typeof e?e:{},a=function(e,t){return"object"===r(e)&&void 0!==t?t:e((function(){}))},s=n.vuelidate?n.vuelidate.withParams:a;t.withParams=s}).call(this,r("c8ba"))},d294:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"or"},(function(){for(var e=this,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce((function(t,r){return t||r.apply(e,n)}),!1)}))};t.default=a},d4f4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.withParams)({type:"required"},(function(e){return"string"===typeof e?(0,n.req)(e.trim()):(0,n.req)(e)}));t.default=a},e652:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"requiredUnless",prop:e},(function(t,r){return!!(0,n.ref)(e,this,r)||(0,n.req)(t)}))};t.default=a},eb66:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"minValue",min:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e}))};t.default=a},ec11:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e,t){return(0,n.withParams)({type:"between",min:e,max:t},(function(r){return!(0,n.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r}))};t.default=a},f5df5:function(e,t,r){}}]);
//# sourceMappingURL=chunk-2a1e86a6.0e68bf49.js.map