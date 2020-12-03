(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38bf4be8"],{"206d":function(e,a,i){"use strict";var t=i("4413"),r=i.n(t);r.a},"3f2a":function(e,a,i){e.exports=i.p+"img/google.bbe3a3e5.jpg"},4413:function(e,a,i){},a55b:function(e,a,i){"use strict";i.r(a);var t=function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("div",{staticClass:"login-container"},[e.forgotPassword?i("div",{staticClass:"forgot-module"},[i("div",{staticClass:"module-header"},[e._v(" Account Recovery ")]),i("div",{staticClass:"module-form--wrapper"},[e.emailSent?i("div",[e._v(" A password recovery link has been sent to you by email. When you receive it, click the link to open window where you can enter a new password. "),i("div",{staticClass:"btn",on:{click:function(a){e.forgotPassword=!1,e.emailSent=!1}}},[e._v("Go to Login")])]):i("div",{staticClass:"input-container"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.$v.email.$model,expression:"$v.email.$model"}],attrs:{type:"text",placeholder:"Email Address",maxlength:"128"},domProps:{value:e.$v.email.$model},on:{blur:function(a){return e.$v.email.$touch()},input:function(a){a.target.composing||e.$set(e.$v.email,"$model",a.target.value)}}}),i("transition",{attrs:{name:"fade"}},[e.$v.email.$dirty&&!e.$v.email.required?i("div",{staticClass:"error"},[e._v("Field is required")]):e.$v.email.$dirty&&!e.$v.email.minLength?i("div",{staticClass:"error"},[e._v("Email must have at least "+e._s(e.$v.email.$params.minLength.min)+" characters.")]):e.$v.email.$dirty&&!e.$v.email.email?i("div",{staticClass:"error"},[e._v("Email must be formatted correctly.")]):e.backendError?i("div",{staticClass:"error"},[e._v(" "+e._s(e.backendError)+" ")]):e._e()]),i("div",{staticClass:"btn",on:{click:e.resetPassword}},[e._v("Reset Password")])],1)])]):i("div",{staticClass:"login-module"},[i("div",{staticClass:"module-header"},[e._v(" Login ")]),i("div",{staticClass:"module-form--wrapper"},[i("div",{staticClass:"login-form"},[i("div",{staticClass:"input-container"},[i("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.$v.login.email_username.$model,expression:"$v.login.email_username.$model",modifiers:{lazy:!0}}],attrs:{type:"text",placeholder:"Username/Email",maxlength:"128"},domProps:{value:e.$v.login.email_username.$model},on:{blur:function(a){return e.$v.login.email_username.$touch()},change:function(a){return e.$set(e.$v.login.email_username,"$model",a.target.value)}}}),i("transition",{attrs:{name:"fade"}},[e.$v.login.email_username.$dirty&&!e.$v.login.email_username.required?i("div",{staticClass:"error"},[e._v("Field is required")]):e.$v.login.email_username.$dirty&&!e.$v.login.email_username.minLength?i("div",{staticClass:"error"},[e._v("Username/Email must have at least "+e._s(e.$v.login.email_username.$params.minLength.min)+" characters.")]):e.backendError?i("div",{staticClass:"error"},[e._v(" "+e._s(e.backendError)+" ")]):e._e()]),i("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.$v.login.password.$model,expression:"$v.login.password.$model",modifiers:{lazy:!0}}],attrs:{type:"password",placeholder:"Password"},domProps:{value:e.$v.login.password.$model},on:{blur:function(a){return e.$v.login.password.$touch()},change:function(a){return e.$set(e.$v.login.password,"$model",a.target.value)}}}),i("transition",{attrs:{name:"fade"}},[e.$v.login.password.$dirty&&!e.$v.login.password.required?i("div",{staticClass:"error"},[e._v("Field is required")]):e.$v.login.password.$dirty&&!e.$v.login.password.minLength?i("div",{staticClass:"error"},[e._v("Password must have at least "+e._s(e.$v.login.password.$params.minLength.min)+" characters.")]):e._e()])],1),i("div",{staticClass:"btn loader",on:{click:e.userLogin}},[e.loading?i("div",{staticClass:"login-loader"},[i("Loader",{attrs:{color:"white",loaderType:"bubble"}})],1):e._e(),e._v(" Login "),e.loading?i("div",{staticClass:"login-loader"},[i("Loader",{attrs:{color:"white",loaderType:"bubble"}})],1):e._e()])]),i("div",{staticClass:"social-form"},[i("div",{staticClass:"social-buttons"},[e._m(0),e._m(1),i("a",{staticClass:"forgot-password",on:{click:function(a){e.forgotPassword=!0}}},[e._v(" Forgot password? ")])])])])])])},r=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("img",{attrs:{src:i("dd91"),alt:""}}),t("a",{attrs:{href:"api/auth/facebook"}},[e._v("Sign in with Facebook ")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("img",{attrs:{src:i("3f2a"),alt:""}}),t("a",{attrs:{href:"api/auth/google/authentication"}},[e._v("Sign in with Google ")])])}],s=i("bc3a"),o=i.n(s),n=i("b5ae"),l=i("e33e"),d={name:"Login",components:{Loader:l["a"]},data:function(){return{login:{email_username:"",password:""},email:"",password:"",backendError:"",loading:!1,color:"#fff",size:"5px",forgotPassword:!1,emailSent:!1}},validations:{email:{required:n["required"],email:n["email"],minLength:Object(n["minLength"])(8)},login:{email_username:{required:n["required"],minLength:Object(n["minLength"])(6)},password:{required:n["required"],minLength:Object(n["minLength"])(8),maxLength:Object(n["maxLength"])(100)}}},methods:{userLogin:function(){var e=this;if(this.$v.login.$touch(),!this.$v.login.$invalid){var a=this.login.email_username,i=this.login.password;this.loading=!0,o.a.post("/api/auth/login",{username_email:a,password:i},{}).then((function(){e.loading=!1,e.$store.dispatch("UpdateLoginState"),e.$router.push("/")})).catch((function(a){e.loading=!1,e.backendError=a.response.data}))}},resetPassword:function(){var e=this;if(this.$v.email.$touch(),!this.$v.email.$invalid){var a=this.email;o.a.post("/api/auth/account-recovery",{restoreEmail:a},{}).then((function(){e.emailSent=!0})).catch((function(a){e.backendError=a.response.data.sendError}))}}}},m=d,c=(i("206d"),i("2877")),v=Object(c["a"])(m,t,r,!1,null,null,null);a["default"]=v.exports},dd91:function(e,a,i){e.exports=i.p+"img/facebook.2dff2495.jpg"}}]);
//# sourceMappingURL=chunk-38bf4be8.b165c6ca.js.map