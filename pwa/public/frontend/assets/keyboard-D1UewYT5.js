import{af as t}from"./index-CXYPgwiC.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const o=()=>{if(t!==void 0)return t.Capacitor};/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */var n;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(n||(n={}));var d;(function(e){e.Body="body",e.Ionic="ionic",e.Native="native",e.None="none"})(d||(d={}));const a={getEngine(){const e=o();if(e!=null&&e.isPluginAvailable("Keyboard"))return e.Plugins.Keyboard},getResizeMode(){const e=this.getEngine();return e!=null&&e.getResizeMode?e.getResizeMode().catch(i=>{if(i.code!==n.Unimplemented)throw i}):Promise.resolve(void 0)}};export{a as K,d as a};
//# sourceMappingURL=keyboard-D1UewYT5.js.map
