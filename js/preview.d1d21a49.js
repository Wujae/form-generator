(function(e){function _(_){for(var n,a,i=_[0],c=_[1],s=_[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(_);while(d.length)d.shift()();return o.push.apply(o,s||[]),t()}function t(){for(var e,_=0;_<o.length;_++){for(var t=o[_],n=!0,a=1;a<t.length;a++){var c=t[a];0!==r[c]&&(n=!1)}n&&(o.splice(_--,1),e=i(i.s=t[0]))}return e}var n={},r={preview:0},o=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d21440c":"cb797ff2"}[e]+".js"}function i(_){if(n[_])return n[_].exports;var t=n[_]={i:_,l:!1,exports:{}};return e[_].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var _=[],t=r[e];if(0!==t)if(t)_.push(t[2]);else{var n=new Promise((function(_,n){t=r[e]=[_,n]}));_.push(t[2]=n);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=a(e);var s=new Error;o=function(_){c.onerror=c.onload=null,clearTimeout(l);var t=r[e];if(0!==t){if(t){var n=_&&("load"===_.type?"missing":_.type),o=_&&_.target&&_.target.src;s.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",s.name="ChunkLoadError",s.type=n,s.request=o,t[1](s)}r[e]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:c})}),12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(_)},i.m=e,i.c=n,i.d=function(e,_,t){i.o(e,_)||Object.defineProperty(e,_,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,_){if(1&_&&(e=i(e)),8&_)return e;if(4&_&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&_&&"string"!=typeof e)for(var n in e)i.d(t,n,function(_){return e[_]}.bind(null,n));return t},i.n=function(e){var _=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(_,"a",_),_},i.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)},i.p="/form-generator/",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=_,c=c.slice();for(var l=0;l<c.length;l++)_(c[l]);var u=s;o.push([1,"chunk-vendors"]),t()})({"0991":function(e,_,t){},1:function(e,_,t){e.exports=t("2c42")},"2c42":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("99af"),core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("4160"),core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("159b"),core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("e260"),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("e6cf"),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4__),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("cca6"),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_5__),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("a79d"),F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(F_JETS_front_jets_form_generator_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_6__),vue__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("8bbf"),vue__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_7__),_utils_loadScript__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("c88b"),_components_tinymce__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("31c6"),jets_form_component__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("af69"),jets_form_component__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(jets_form_component__WEBPACK_IMPORTED_MODULE_10__);vue__WEBPACK_IMPORTED_MODULE_7___default.a.component("tinymce",_components_tinymce__WEBPACK_IMPORTED_MODULE_9__["a"]);var $previewApp=document.getElementById("previewApp"),childAttrs={file:"",dialog:' width="600px" class="dialog-width" v-if="visible" :visible.sync="visible" :modal-append-to-body="false" '};function buildLinks(e){var _="";return e.forEach((function(e){_+='<link href="'.concat(e,'" rel="stylesheet">')})),_}function init(e){if("refreshFrame"===e.data.type){var _=e.data.data,t=childAttrs[_.generateConf.type],n="";Array.isArray(_.links)&&_.links.length>0&&(n=buildLinks(_.links)),$previewApp.innerHTML="".concat(n,"<style>").concat(_.css,'</style><div id="app"></div>'),Array.isArray(_.scripts)&&_.scripts.length>0?Object(_utils_loadScript__WEBPACK_IMPORTED_MODULE_8__["b"])(_.scripts,(function(){newVue(t,_.js,_.html)})):newVue(t,_.js,_.html)}}function newVue(attrs,main,html){main=eval("(".concat(main,")")),main.template="<div>".concat(html,"</div>"),new vue__WEBPACK_IMPORTED_MODULE_7___default.a({components:{child:main},data:function(){return{visible:!0}},template:"<div><child ".concat(attrs,"/></div>")}).$mount("#app")}window.addEventListener("message",init,!1)},"31c6":function(e,_,t){"use strict";var n,r=function(){var e=this,_=e.$createElement,t=e._self._c||_;return t("textarea",{staticClass:"textarea",attrs:{id:e.tinymceId}})},o=[],a=(t("99af"),t("a9e3"),t("d3b7"),t("25f0"),t("c88b")),i=t("5f72"),c=t.n(i);function s(e){if(n)e(n);else{var _=c.a.Loading.service({fullscreen:!0,lock:!0,text:"富文本资源加载中...",spinner:"el-icon-loading",background:"rgba(255, 255, 255, 0.5)"});Object(a["a"])("https://cdn.bootcdn.net/ajax/libs/tinymce/5.2.2/tinymce.min.js",(function(){_.close(),n=tinymce,e(n)}))}}var l=["advlist anchor autolink autosave code codesample directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars wordcount"],u=["code searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote removeformat subscript superscript codesample hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],d=t("15d3"),f=1,m={props:{id:{type:String,default:function(){return 1e4===f&&(f=1),"tinymce".concat(+new Date).concat(f++)}},value:{type:[String,Number,Boolean],default:""}},data:function(){return{tinymceId:this.id}},mounted:function(){var e=this;s((function(_){t.e("chunk-2d21440c").then(t.t.bind(null,"afc4",7)).then((function(){_.init({selector:"#".concat(e.tinymceId),language:"zh_CN",menubar:"file edit insert view format table",plugins:l,toolbar:u,height:e.$attrs.height||300,branding:e.$attrs.branding||!1,object_resizing:!1,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(_){e.value&&_.setContent(e.value),e.vModel(_)}})}))}))},destroyed:function(){this.destroyTinymce()},methods:{vModel:function(e){var _=this,t=Object(d["a"])(250,e.setContent);this.$watch("value",(function(_,n){e&&_!==n&&_!==e.getContent()&&("string"!==typeof _&&(_=_.toString()),t.call(e,_))})),e.on("change keyup undo redo",(function(){_.$emit("input",e.getContent())}))},destroyTinymce:function(){if(window.tinymce){var e=window.tinymce.get(this.tinymceId);e&&e.destroy()}}}},p=m,E=(t("8038"),t("2877")),b=Object(E["a"])(p,r,o,!1,null,"4b1faeaa",null);_["a"]=b.exports},"5f72":function(e,_){e.exports=ELEMENT},8038:function(e,_,t){"use strict";var n=t("0991"),r=t.n(n);r.a},"8bbf":function(e,_){e.exports=Vue},c88b:function(e,_,t){"use strict";t.d(_,"b",(function(){return o}));t("4160"),t("159b");var n={};function r(e,_){var t=document.getElementById(e),r=_||function(){};if(!t){n[e]=[];var o=document.createElement("script");o.src=e,o.id=e,o.async=1,document.body.appendChild(o);var a="onload"in o?i.bind(o):c.bind(o);a(o)}function i(_){var t=this;_.onload=function(){t.onerror=t.onload=null,n[e].forEach((function(e){e(null,_)})),delete n[e]},_.onerror=function(){t.onerror=t.onload=null,r(new Error("Failed to load ".concat(e)),_)}}function c(_){var t=this;_.onreadystatechange=function(){"complete"!==t.readyState&&"loaded"!==t.readyState||(t.onreadystatechange=null,n[e].forEach((function(e){e(null,_)})),delete n[e])}}n[e].push(r)}function o(e,_){var t=e.shift();e.length?r(t,(function(){return o(e,_)})):r(t,_)}_["a"]=r}});