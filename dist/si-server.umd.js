/*!
 * si-server v1.0.5
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r(require("@hapi/hapi"),require("@hapi/inert"),require("socket.io")):"function"==typeof define&&define.amd?define(["@hapi/hapi","@hapi/inert","socket.io"],r):(t=t||self)["si-server"]=r(t["@hapi/hapi"],t["@hapi/inert"],t.socket.io)}(this,(function(t,r,e){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t=t&&t.hasOwnProperty("default")?t.default:t,r=r&&r.hasOwnProperty("default")?r.default:r,e=e&&e.hasOwnProperty("default")?e.default:e;var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function i(t,r){return t(r={exports:{}},r.exports),r.exports}var a=i((function(t){var r=function(t){var r,e=Object.prototype,o=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function f(t,r,e,n){var o=r&&r.prototype instanceof d?r:d,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=function(t,r,e){var n=l;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===v){if("throw"===o)throw i;return P()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=S(a,e);if(c){if(c===y)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===l)throw n=v,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=h;var u=s(t,r,e);if("normal"===u.type){if(n=e.done?v:p,u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=v,e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function s(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var l="suspendedStart",p="suspendedYield",h="executing",v="completed",y={};function d(){}function g(){}function b(){}var j={};j[a]=function(){return this};var _=Object.getPrototypeOf,m=_&&_(_(A([])));m&&m!==e&&o.call(m,a)&&(j=m);var w=b.prototype=d.prototype=Object.create(j);function O(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function x(t){var r;this._invoke=function(e,i){function a(){return new Promise((function(r,a){!function r(e,i,a,c){var u=s(t[e],t,i);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"===n(l)&&o.call(l,"__await")?Promise.resolve(l.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):Promise.resolve(l).then((function(t){f.value=t,a(f)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}(e,i,r,a)}))}return r=r?r.then(a,a):a()}}function S(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,S(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=s(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function E(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function L(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function A(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:r,done:!0}}return g.prototype=w.constructor=b,b.constructor=g,b[u]=g.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===g||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},O(x.prototype),x.prototype[c]=function(){return this},t.AsyncIterator=x,t.async=function(r,e,n,o){var i=new x(f(r,e,n,o));return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},O(w),w[u]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=A,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),f=o.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),L(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;L(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:A(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),y}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}}));var c=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n},u="object"==n(o)&&o&&o.Object===Object&&o,f="object"==("undefined"==typeof self?"undefined":n(self))&&self&&self.Object===Object&&self,s=u||f||Function("return this")(),l=s.Symbol,p=Object.prototype,h=p.hasOwnProperty,v=p.toString,y=l?l.toStringTag:void 0;var d=function(t){var r=h.call(t,y),e=t[y];try{t[y]=void 0;var n=!0}catch(t){}var o=v.call(t);return n&&(r?t[y]=e:delete t[y]),o},g=Object.prototype.toString;var b=function(t){return g.call(t)},j="[object Null]",_="[object Undefined]",m=l?l.toStringTag:void 0;var w=function(t){return null==t?void 0===t?_:j:m&&m in Object(t)?d(t):b(t)};var O=function(t){return null!=t&&"object"==n(t)},x="[object Arguments]";var S=function(t){return O(t)&&w(t)==x},E=Object.prototype,L=E.hasOwnProperty,k=E.propertyIsEnumerable,A=S(function(){return arguments}())?S:function(t){return O(t)&&L.call(t,"callee")&&!k.call(t,"callee")},P=Array.isArray;var F=function(){return!1},N=i((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e?s.Buffer:void 0,i=(o?o.isBuffer:void 0)||F;t.exports=i})),T=9007199254740991,C=/^(?:0|[1-9]\d*)$/;var z=function(t,r){var e=n(t);return!!(r=null==r?T:r)&&("number"==e||"symbol"!=e&&C.test(t))&&t>-1&&t%1==0&&t<r},G=9007199254740991;var $=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=G},I={};I["[object Float32Array]"]=I["[object Float64Array]"]=I["[object Int8Array]"]=I["[object Int16Array]"]=I["[object Int32Array]"]=I["[object Uint8Array]"]=I["[object Uint8ClampedArray]"]=I["[object Uint16Array]"]=I["[object Uint32Array]"]=!0,I["[object Arguments]"]=I["[object Array]"]=I["[object ArrayBuffer]"]=I["[object Boolean]"]=I["[object DataView]"]=I["[object Date]"]=I["[object Error]"]=I["[object Function]"]=I["[object Map]"]=I["[object Number]"]=I["[object Object]"]=I["[object RegExp]"]=I["[object Set]"]=I["[object String]"]=I["[object WeakMap]"]=!1;var U=function(t){return O(t)&&$(t.length)&&!!I[w(t)]};var q=function(t){return function(r){return t(r)}},R=i((function(t,r){var e=r&&!r.nodeType&&r,n=e&&t&&!t.nodeType&&t,o=n&&n.exports===e&&u.process,i=function(){try{var t=n&&n.require&&n.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=i})),B=R&&R.isTypedArray,H=B?q(B):U,M=Object.prototype.hasOwnProperty;var D=function(t,r){var e=P(t),n=!e&&A(t),o=!e&&!n&&N(t),i=!e&&!n&&!o&&H(t),a=e||n||o||i,u=a?c(t.length,String):[],f=u.length;for(var s in t)!r&&!M.call(t,s)||a&&("length"==s||o&&("offset"==s||"parent"==s)||i&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||z(s,f))||u.push(s);return u},J=Object.prototype;var Y=function(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||J)};var V=function(t,r){return function(e){return t(r(e))}}(Object.keys,Object),W=Object.prototype.hasOwnProperty;var K=function(t){if(!Y(t))return V(t);var r=[];for(var e in Object(t))W.call(t,e)&&"constructor"!=e&&r.push(e);return r};var Q=function(t){var r=n(t);return null!=t&&("object"==r||"function"==r)},X="[object AsyncFunction]",Z="[object Function]",tt="[object GeneratorFunction]",rt="[object Proxy]";var et=function(t){if(!Q(t))return!1;var r=w(t);return r==Z||r==tt||r==X||r==rt};var nt=function(t){return null!=t&&$(t.length)&&!et(t)};var ot=function(t){return nt(t)?D(t):K(t)};function it(t){return"[object Object]"===Object.prototype.toString.call(t)}function at(t){return"[object String]"===Object.prototype.toString.call(t)}function ct(t){return!(!at(t)||""===t)}var ut="[object Symbol]";var ft=function(t){return"symbol"==n(t)||O(t)&&w(t)==ut},st=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,lt=/^\w*$/;var pt,ht=function(t,r){if(P(t))return!1;var e=n(t);return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=t&&!ft(t))||(lt.test(t)||!st.test(t)||null!=r&&t in Object(r))},vt=s["__core-js_shared__"],yt=(pt=/[^.]+$/.exec(vt&&vt.keys&&vt.keys.IE_PROTO||""))?"Symbol(src)_1."+pt:"";var dt=function(t){return!!yt&&yt in t},gt=Function.prototype.toString;var bt=function(t){if(null!=t){try{return gt.call(t)}catch(t){}try{return t+""}catch(t){}}return""},jt=/^\[object .+?Constructor\]$/,_t=Function.prototype,mt=Object.prototype,wt=_t.toString,Ot=mt.hasOwnProperty,xt=RegExp("^"+wt.call(Ot).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var St=function(t){return!(!Q(t)||dt(t))&&(et(t)?xt:jt).test(bt(t))};var Et=function(t,r){return null==t?void 0:t[r]};var Lt=function(t,r){var e=Et(t,r);return St(e)?e:void 0},kt=Lt(Object,"create");var At=function(){this.__data__=kt?kt(null):{},this.size=0};var Pt=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},Ft="__lodash_hash_undefined__",Nt=Object.prototype.hasOwnProperty;var Tt=function(t){var r=this.__data__;if(kt){var e=r[t];return e===Ft?void 0:e}return Nt.call(r,t)?r[t]:void 0},Ct=Object.prototype.hasOwnProperty;var zt=function(t){var r=this.__data__;return kt?void 0!==r[t]:Ct.call(r,t)},Gt="__lodash_hash_undefined__";var $t=function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=kt&&void 0===r?Gt:r,this};function It(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}It.prototype.clear=At,It.prototype.delete=Pt,It.prototype.get=Tt,It.prototype.has=zt,It.prototype.set=$t;var Ut=It;var qt=function(){this.__data__=[],this.size=0};var Rt=function(t,r){return t===r||t!=t&&r!=r};var Bt=function(t,r){for(var e=t.length;e--;)if(Rt(t[e][0],r))return e;return-1},Ht=Array.prototype.splice;var Mt=function(t){var r=this.__data__,e=Bt(r,t);return!(e<0)&&(e==r.length-1?r.pop():Ht.call(r,e,1),--this.size,!0)};var Dt=function(t){var r=this.__data__,e=Bt(r,t);return e<0?void 0:r[e][1]};var Jt=function(t){return Bt(this.__data__,t)>-1};var Yt=function(t,r){var e=this.__data__,n=Bt(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this};function Vt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}Vt.prototype.clear=qt,Vt.prototype.delete=Mt,Vt.prototype.get=Dt,Vt.prototype.has=Jt,Vt.prototype.set=Yt;var Wt=Vt,Kt=Lt(s,"Map");var Qt=function(){this.size=0,this.__data__={hash:new Ut,map:new(Kt||Wt),string:new Ut}};var Xt=function(t){var r=n(t);return"string"==r||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t};var Zt=function(t,r){var e=t.__data__;return Xt(r)?e["string"==typeof r?"string":"hash"]:e.map};var tr=function(t){var r=Zt(this,t).delete(t);return this.size-=r?1:0,r};var rr=function(t){return Zt(this,t).get(t)};var er=function(t){return Zt(this,t).has(t)};var nr=function(t,r){var e=Zt(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this};function or(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}or.prototype.clear=Qt,or.prototype.delete=tr,or.prototype.get=rr,or.prototype.has=er,or.prototype.set=nr;var ir=or,ar="Expected a function";function cr(t,r){if("function"!=typeof t||null!=r&&"function"!=typeof r)throw new TypeError(ar);var e=function e(){var n=arguments,o=r?r.apply(this,n):n[0],i=e.cache;if(i.has(o))return i.get(o);var a=t.apply(this,n);return e.cache=i.set(o,a)||i,a};return e.cache=new(cr.Cache||ir),e}cr.Cache=ir;var ur=cr,fr=500;var sr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,lr=/\\(\\)?/g,pr=function(t){var r=ur(t,(function(t){return e.size===fr&&e.clear(),t})),e=r.cache;return r}((function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(sr,(function(t,e,n,o){r.push(n?o.replace(lr,"$1"):e||t)})),r}));var hr=function(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o},vr=1/0,yr=l?l.prototype:void 0,dr=yr?yr.toString:void 0;var gr=function t(r){if("string"==typeof r)return r;if(P(r))return hr(r,t)+"";if(ft(r))return dr?dr.call(r):"";var e=r+"";return"0"==e&&1/r==-vr?"-0":e};var br=function(t){return null==t?"":gr(t)};var jr=function(t,r){return P(t)?t:ht(t,r)?[t]:pr(br(t))},_r=1/0;var mr=function(t){if("string"==typeof t||ft(t))return t;var r=t+"";return"0"==r&&1/t==-_r?"-0":r};var wr=function(t,r){for(var e=0,n=(r=jr(r,t)).length;null!=t&&e<n;)t=t[mr(r[e++])];return e&&e==n?t:void 0};var Or=function(t,r,e){var n=null==t?void 0:wr(t,r);return void 0===n?e:n};function xr(t,r){return function(t){if(it(t)){for(var r in t)return!0;return!1}return!1}(t)&&ct(r)?Or(t,r,""):""}function Sr(t){var r=!1;return ct(t)?r=!isNaN(Number(t)):function(t){return"[object Number]"===Object.prototype.toString.call(t)}(t)&&(r=!0),r}function Er(t,r){var e,n=xr(t,r);return n=ct(e=n)||Sr(e)?String(e):""}function Lr(t){var r=Object.prototype.toString.call(t);return"[object Function]"===r||"[object AsyncFunction]"===r}function kr(t){return"[object Array]"===Object.prototype.toString.call(t)}function Ar(t){return!!function(t){return"[object Undefined]"===Object.prototype.toString.call(t)}(t)||(!!function(t){return"[object Null]"===Object.prototype.toString.call(t)}(t)||(!!function(t){if(it(t)){for(var r in t)return!1;return!0}return!1}(t)||(!!function(t){return!(!at(t)||""!==t)}(t)||!!function(t){return!!kr(t)&&0===t.length}(t))))}function Pr(t){return!!kr(t)&&(0!==t.length&&(1!==t.length||!Ar(t[0])))}function Fr(t,r){if(ct(t))t=[t];else if(!Pr(t))return!1;if(ct(r))r=[r];else if(!Pr(r))return!1;for(var e=0;e<t.length;e++)for(var n=0;n<r.length;n++)if(t[e]===r[n])return!0;return!1}return function(n){n.port||(n.port=8080);var o,i,c,u=[];function f(t){var r,e,o,i=((o=new Promise((function(){r=arguments[0],e=arguments[1]}))).resolve=r,o.reject=e,o);return Lr(n.authenticate)?n.authenticate(t).then((function(t){i.resolve(t)})):i.resolve(!0),i}i="funcs",it(o=n)&&ct(i)&&i in o&&(u=ot(n.funcs)),c=n.serverHapi?n.serverHapi:t.server({port:n.port,routes:{cors:!0}});var s=null;try{s=e(c.listener)}catch(t){return console.log("create SocketIO catch:",t),null}var l,p=[];s.on("connect",(function(t){p.push(t.id),Lr(n.onClientChange)&&n.onClientChange(p,n),t.on("message",(function(r){!function(r){var e,o,i,c;a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return e=Er(r,"token"),s.next=3,a.awrap(f(e));case 3:if(!s.sent){s.next=25;break}if(o=Er(r,"func"),i=xr(r,"input"),"getFuncs"!==o){s.next=15;break}if(!Lr(n.filterFuncs)){s.next=12;break}return s.next=11,a.awrap(n.filterFuncs(e,u));case 11:u=s.sent;case 12:r.output={sys:"sys",funcs:u},s.next=23;break;case 15:if(!Fr(u,o)){s.next=22;break}return s.next=18,a.awrap(n.funcs[o](i));case 18:c=s.sent,r.output=c,s.next=23;break;case 22:r.output={err:"can not find: ".concat(o)};case 23:s.next=26;break;case 25:r.output={err:"can not authenticate token: ".concat(e)};case 26:delete r.input;try{t.send(JSON.stringify(r),(function(t){t&&console.log("Server: send output error:",t)}))}catch(t){console.log("Server: send output catch:",t)}case 28:case"end":return s.stop()}}))}(function(t){if(!ct(t))return{};var r={};try{r=JSON.parse(t)}catch(t){r={}}return r}(r))})),t.on("disconnect",(function(r){p=p.filter((function(r){return r!==t.id})),Lr(n.onClientChange)&&n.onClientChange(p,n)}))})),a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.serverHapi){t.next=5;break}return t.next=3,a.awrap(c.register(r));case 3:l=[{method:"GET",path:"/{file*}",handler:{directory:{path:"./"}}}],c.route(l);case 5:return t.next=7,a.awrap(c.start());case 7:console.log("Server running at: ".concat(c.info.uri));case 8:case"end":return t.stop()}}))}}));
//# sourceMappingURL=si-server.umd.js.map
