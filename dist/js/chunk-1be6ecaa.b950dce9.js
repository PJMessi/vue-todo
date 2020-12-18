(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1be6ecaa"],{"379e":function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t["default"]:t}function a(t,e){return e={exports:{}},t(e,e.exports),e.exports}var r=a((function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},i=e.SkipValidation=function(t){this.name="SkipValidation",this.message=t},a=e.validateSingle=function(t,e,n,a,r){var o=[];"function"===typeof e&&(e=[e]);for(var s=0;s<e.length;s++)try{var c=e[s](t,a);"string"===typeof c&&o.push(c.replace("{value}",t).replace("{key}",r))}catch(u){if(u instanceof i)break}return!0===n?o:o.length>0?o[0]:void 0};e.validate=function(t,e,i){if(e){var r={},o=!0;if("object"===("undefined"===typeof e?"undefined":n(e))&&!e.length){for(var s in e)if(e.hasOwnProperty(s)){var c=a(t[s],e[s],i,t,s);void 0!==c&&(o=!1),r[s]=c}return o?void 0:r}return r=a(t,e,i),r}},e.required=function(t,e){function n(t){return void 0===t||""===t||null===t}return function(a){if(t&&n(a))return e||"This field is required.";if(!t&&n(a))throw new i}},e.isNumber=function(t){return function(e){if("number"!==typeof e||isNaN(e))return t||"'{value}' is not a valid number."}},e.isString=function(t){return function(e){if("string"!==typeof e)return t||"'{value}' is not a valid string."}},e.isFunction=function(t){return function(e){if("function"!==typeof e)return t||"Expected a function."}},e.isObject=function(t){return function(e){if(e!==Object(e))return t||"Expected an object."}},e.isArray=function(t){return function(e){if("[object Array]"!==Object.prototype.toString.call(e))return t||"Expected an array."}},e.length=function(t,e){return function(n){var i=n+"";if(i.length!==t)return e||"It must be "+t+" characters long."}},e.isEmail=function(t){return function(e){var n=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;if(!n.test(e))return t||"Invalid email id."}},e.equalsTo=function(t,e){return function(n,i){if(n!==i[t])return e||"'{key}' and '"+t+"' do not match."}},e.minLength=function(t,e){return function(n){var i=n+"";if(i.length<t)return e||"It must be at least "+t+" characters long."}},e.maxLength=function(t,e){return function(n){var i=n+"";if(i.length>t)return e||"It must be at most "+t+" characters long."}},e.isBoolean=function(t){return function(e){if(!0!==e&&!1!==e)return t||"Invalid boolean value."}},e.within=function(t,e){return function(n){n instanceof Array||(n=[n]);for(var i=[],a=0;a<n.length;a++)-1===t.indexOf(n[a])&&i.push(n[a]);if(i.length>0)return e||"["+i+"] do not fall under the allowed list."}},e.excludes=function(t,e){return function(n){n instanceof Array||(n=[n]);for(var i=[],a=0;a<n.length;a++)-1!==t.indexOf(n[a])&&i.push(n[a]);if(i.length>0)return e||"["+i+"] fall under restricted values."}},e.pattern=function(t,e){return function(n){if(!t.test(n))return e||"'{value}' does not match with the pattern."}}}));i(r);r.SkipValidation,r.validateSingle;var o=r.validate,s=r.required,c=(r.isNumber,r.isString,r.isFunction),u=r.isObject,l=(r.isArray,r.length,r.isEmail,r.equalsTo,r.minLength,r.maxLength,r.isBoolean,r.within,r.excludes,r.pattern,function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}());function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var f="https://khalti.com/payment/widget/",h=function(t,e){return Array.isArray(t)?t.forEach(e):Object.keys(t).map((function(n){return e(t[n],n)}))},p=function(t){return t?JSON.parse(JSON.stringify(t)):t},b={onSuccess:[s(!0),c()],onError:[s(!1),c()],onClose:[s(!1),c()]},v={publicKey:s(!0),productUrl:s(!0),productIdentity:s(!0),productName:s(!0),eventHandler:s(!0),amount:s(!0),merchantData:[s(!1),u()]},g=function(){function t(e){d(this,t),this._widgetId="khalti-widget-"+Date.now(),this._config=e,this._widget=this.attachWidget(),this.listenToWidget()}return l(t,[{key:"listenToWidget",value:function(){var t=this;window.addEventListener("message",(function(e){if(e.data.realm)if("widgetInit"===e.data.realm)t.widgetInit(e.data.payload);else{if(!e.data.payload||e.data.payload.widget_id!==t._widgetId)return;var n="handle_msg_"+e.data.realm;t[n](e.data.payload)}}),!1)}},{key:"msgWidget",value:function(t,e){e=p(e),e.widgetId=this._widgetId,this._widget.contentWindow.postMessage({realm:t,payload:e},"*")}},{key:"handle_msg_widgetInit",value:function(){this.widgetInit()}},{key:"widgetInit",value:function(){var t=p(this._config);delete t.eventHandler,this.msgWidget("paymentInfo",t)}},{key:"validateConfig",value:function(){var t=o(this._config,v);if(t)throw new Error(JSON.stringify(t));var e=o(this._config.eventHandler,b);if(e)throw new Error(JSON.stringify({eventHandler:e}))}},{key:"handle_msg_walletPaymentVerification",value:function(t){this._config.eventHandler.onSuccess(t),this.hide()}},{key:"handle_msg_widgetError",value:function(t){var e=this._config.eventHandler.onError;e&&e(t)}},{key:"disableParentScrollbar",value:function(){this.parentOverflowValue=window.document.body.style.overflowY,window.document.body.style.overflowY="hidden"}},{key:"enableParentScrollbar",value:function(){window.document.body.style.overflowY=this.parentOverflowValue,this.parentOverflowValue=null}},{key:"show",value:function(t){this._config.source="web",this._widget.setAttribute("src",f),Object.assign(this._config,t),this.validateConfig(),this.disableParentScrollbar(),this._widget.style.display="block",this.widgetInit()}},{key:"handle_msg_hide",value:function(){this.hide();var t=this._config.eventHandler.onClose;t&&t()}},{key:"hide",value:function(){this.enableParentScrollbar(),this._widget.style.display="none"}},{key:"attachWidget",value:function(){var t=window.document.createElement("iframe");return t.setAttribute("id",this._widgetId),t.style.position="fixed",t.style.display="none",t.style.top="0",t.style.left="0",t.width="100%",t.height=window.innerHeight+"px",t.style.zIndex=999999999,t.setAttribute("frameborder",0),t.setAttribute("allowtransparency",!0),window.document.body.appendChild(t),t}},{key:"postAtURL",value:function(t){var e="khalti-ebanking-form-"+Date.now();this.ebankingForm&&window.document.body.removeChild(this.ebankingForm);var n=window.document.createElement("form");n.setAttribute("id",e),n.setAttribute("action",t.url),n.setAttribute("target","_blank"),n.setAttribute("method","POST"),n.style.display="none",h(t.paymentInfo,(function(t,e){var i=window.document.createElement("input");i.setAttribute("name",e),i.value=t,n.appendChild(i)})),window.document.body.appendChild(n),this.ebankingForm=n,n.submit()}}]),t}();t.exports=g},"78b3":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"page-content"},[n("div",{staticClass:"page-info"},[n("nav",{attrs:{"aria-label":"breadcrumb"}},[n("ol",{staticClass:"breadcrumb"},[n("li",{staticClass:"breadcrumb-item"},[n("router-link",{attrs:{to:"/"}},[t._v("Dashboard")])],1),n("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[t._v("Packages")])])])]),n("div",{staticClass:"main-wrapper"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-12"},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-body"},[n("h5",{staticClass:"card-title"},[t._v(" Packages ")]),n("div",{staticClass:"table-responsive"},[n("table",{staticClass:"table table-striped"},[t._m(0),n("tbody",[0==t.packages.length?n("tr",[t.packagesListBeingUpdated?n("td",{attrs:{colspan:"5"}},[n("i",{staticClass:"fas fa-spinner fa-spin ml-2"}),t._v(" Loading...")]):n("td",{attrs:{colspan:"5"}},[t._v("No packages found...")])]):t._l(t.packages,(function(e){return n("tr",{key:e._id},[n("td",[t._v(t._s(e.name))]),n("td",[t._v("Rs "+t._s(e.price))]),n("td",[t._v(t._s(e.duration)+" Months")]),n("td",[t._v(t._s(e.description))]),n("td",[t.activePackageId==e._id?n("span",{staticClass:"badge badge-success"},[t._v("Active")]):t._e(),t.activePackageId?t._e():n("button",{staticClass:"btn btn-primary btn-xs",attrs:{type:"button"},on:{click:function(n){return t.subscribe(e,"esewa")}}},[t._v(" Subscribe with esewa ")]),t.activePackageId?t._e():n("button",{staticClass:"btn btn-primary btn-xs ml-2",attrs:{type:"button"},on:{click:function(n){return t.subscribeWithKhalti(e)}}},[t._v(" Subscribe with Khalti ")])])])}))],2)])])])])])])])])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{attrs:{scope:"col"}},[t._v("Name")]),n("th",{attrs:{scope:"col"}},[t._v("Price")]),n("th",{attrs:{scope:"col"}},[t._v("Duration")]),n("th",{attrs:{scope:"col"}},[t._v("Description")]),n("th")])])}],r=(n("b0c0"),n("5530")),o=n("2f62"),s=n("379e"),c=n.n(s),u={name:"Package",data:function(){return{}},created:function(){this.fetchPackages()},computed:Object(r["a"])(Object(r["a"])({},Object(o["c"])(["authUser","packages"])),{},{activePackageId:function(){var t=this.authUser.subscriptions;if(!t)return null;var e=this.authUser.subscriptions[0];return e?e.paymentPackage:null}}),methods:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["fetchPackages","fetchProfile","confirmKhaltiPayment","packagesListBeingUpdated"])),{},{subscribe:function(t,e){"esewa"==e?this.subscribeWithEsewa(t):"khalti"==e&&this.subscribeWithKhalti(t)},subscribeWithEsewa:function(t){var e=t.price,n=0,i=0,a=0,r=e+n+i+a,o={amt:e,psc:i,pdc:a,txAmt:n,tAmt:r,pid:t._id,scd:"EPAYTEST",su:"".concat("https://node-express-todo.herokuapp.com","/#/webhooks/esewa/success"),fu:"".concat("https://node-express-todo.herokuapp.com","/#/webhooks/esewa/failed")},s=document.createElement("form");for(var c in s.setAttribute("method","POST"),s.setAttribute("action","https://uat.esewa.com.np/epay/main"),o){var u=document.createElement("input");u.setAttribute("type","hidden"),u.setAttribute("name",c),u.setAttribute("value",o[c]),s.appendChild(u)}document.body.appendChild(s),s.submit()},subscribeWithKhalti:function(t){var e=this,n={publicKey:"test_public_key_f7bab8da45fc4156b98c860083a304ef",productIdentity:t._id,productName:t.name,productUrl:"".concat("https://node-express-todo.herokuapp.com","/#/packages"),amount:100*t.price,eventHandler:{onSuccess:function(t){e.confirmKhaltiPayment(t)},onError:function(t){console.log(t),e.$Toast.fire({icon:"error",title:"Subscription failed"})},onClose:function(){console.log("widget is closing")}}},i=new c.a(n);i.show({amount:n.amount})}})},l=u,d=n("2877"),f=Object(d["a"])(l,i,a,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-1be6ecaa.b950dce9.js.map