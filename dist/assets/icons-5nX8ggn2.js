import{R as Ea,r as jt}from"./react-vendor-CsJVbpnB.js";/*!
 * Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */function we(e,a){(a==null||a>e.length)&&(a=e.length);for(var t=0,r=Array(a);t<a;t++)r[t]=e[t];return r}function Lt(e){if(Array.isArray(e))return e}function Mt(e){if(Array.isArray(e))return we(e)}function zt(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function $t(e,a){for(var t=0;t<a.length;t++){var r=a[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,Ca(r.key),r)}}function Rt(e,a,t){return a&&$t(e.prototype,a),Object.defineProperty(e,"prototype",{writable:!1}),e}function re(e,a){var t=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=ze(e))||a){t&&(e=t);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,i=!0,s=!1;return{s:function(){t=t.call(e)},n:function(){var l=t.next();return i=l.done,l},e:function(l){s=!0,o=l},f:function(){try{i||t.return==null||t.return()}finally{if(s)throw o}}}}function p(e,a,t){return(a=Ca(a))in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function Dt(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Wt(e,a){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var r,n,o,i,s=[],l=!0,u=!1;try{if(o=(t=t.call(e)).next,a===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(r=o.call(t)).done)&&(s.push(r.value),s.length!==a);l=!0);}catch(c){u=!0,n=c}finally{try{if(!l&&t.return!=null&&(i=t.return(),Object(i)!==i))return}finally{if(u)throw n}}return s}}function Yt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ut(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ve(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function f(e){for(var a=1;a<arguments.length;a++){var t=arguments[a]!=null?arguments[a]:{};a%2?Ve(Object(t),!0).forEach(function(r){p(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Ve(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function fe(e,a){return Lt(e)||Wt(e,a)||ze(e,a)||Yt()}function C(e){return Mt(e)||Dt(e)||ze(e)||Ut()}function Ht(e,a){if(typeof e!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var r=t.call(e,a);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(e)}function Ca(e){var a=Ht(e,"string");return typeof a=="symbol"?a:a+""}function oe(e){"@babel/helpers - typeof";return oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},oe(e)}function ze(e,a){if(e){if(typeof e=="string")return we(e,a);var t={}.toString.call(e).slice(8,-1);return t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set"?Array.from(e):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?we(e,a):void 0}}var Ke=function(){},$e={},Fa={},Oa=null,Na={mark:Ke,measure:Ke};try{typeof window<"u"&&($e=window),typeof document<"u"&&(Fa=document),typeof MutationObserver<"u"&&(Oa=MutationObserver),typeof performance<"u"&&(Na=performance)}catch{}var Gt=$e.navigator||{},Je=Gt.userAgent,qe=Je===void 0?"":Je,M=$e,x=Fa,Qe=Oa,ae=Na;M.document;var L=!!x.documentElement&&!!x.head&&typeof x.addEventListener=="function"&&typeof x.createElement=="function",Ta=~qe.indexOf("MSIE")||~qe.indexOf("Trident/"),pe,Bt=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Xt=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Slab Press|Slab|Whiteboard)?.*/i,_a={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"}},Vt={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},ja=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],I="classic",Q="duotone",La="sharp",Ma="sharp-duotone",za="chisel",$a="etch",Ra="jelly",Da="jelly-duo",Wa="jelly-fill",Ya="notdog",Ua="notdog-duo",Ha="slab",Ga="slab-press",Ba="thumbprint",Xa="whiteboard",Kt="Classic",Jt="Duotone",qt="Sharp",Qt="Sharp Duotone",Zt="Chisel",er="Etch",ar="Jelly",tr="Jelly Duo",rr="Jelly Fill",nr="Notdog",ir="Notdog Duo",or="Slab",sr="Slab Press",lr="Thumbprint",fr="Whiteboard",Va=[I,Q,La,Ma,za,$a,Ra,Da,Wa,Ya,Ua,Ha,Ga,Ba,Xa];pe={},p(p(p(p(p(p(p(p(p(p(pe,I,Kt),Q,Jt),La,qt),Ma,Qt),za,Zt),$a,er),Ra,ar),Da,tr),Wa,rr),Ya,nr),p(p(p(p(p(pe,Ua,ir),Ha,or),Ga,sr),Ba,lr),Xa,fr);var ur={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"}},cr={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"}},dr=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),mr={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},whiteboard:{semibold:"fawsb"}},Ka=["fak","fa-kit","fakd","fa-kit-duotone"],Ze={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},vr=["kit"],hr="kit",pr="kit-duotone",gr="Kit",br="Kit Duotone";p(p({},hr,gr),pr,br);var yr={kit:{"fa-kit":"fak"}},xr={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Sr={kit:{fak:"fa-kit"}},ea={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},ge,te={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Ar=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],wr="classic",kr="duotone",Ir="sharp",Pr="sharp-duotone",Er="chisel",Cr="etch",Fr="jelly",Or="jelly-duo",Nr="jelly-fill",Tr="notdog",_r="notdog-duo",jr="slab",Lr="slab-press",Mr="thumbprint",zr="whiteboard",$r="Classic",Rr="Duotone",Dr="Sharp",Wr="Sharp Duotone",Yr="Chisel",Ur="Etch",Hr="Jelly",Gr="Jelly Duo",Br="Jelly Fill",Xr="Notdog",Vr="Notdog Duo",Kr="Slab",Jr="Slab Press",qr="Thumbprint",Qr="Whiteboard";ge={},p(p(p(p(p(p(p(p(p(p(ge,wr,$r),kr,Rr),Ir,Dr),Pr,Wr),Er,Yr),Cr,Ur),Fr,Hr),Or,Gr),Nr,Br),Tr,Xr),p(p(p(p(p(ge,_r,Vr),jr,Kr),Lr,Jr),Mr,qr),zr,Qr);var Zr="kit",en="kit-duotone",an="Kit",tn="Kit Duotone";p(p({},Zr,an),en,tn);var rn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"}},nn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"]},ke={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"}},on=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],Ja=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr"].concat(Ar,on),sn=["solid","regular","light","thin","duotone","brands","semibold"],qa=[1,2,3,4,5,6,7,8,9,10],ln=qa.concat([11,12,13,14,15,16,17,18,19,20]),fn=["aw","fw","pull-left","pull-right"],un=[].concat(C(Object.keys(nn)),sn,fn,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",te.GROUP,te.SWAP_OPACITY,te.PRIMARY,te.SECONDARY]).concat(qa.map(function(e){return"".concat(e,"x")})).concat(ln.map(function(e){return"w-".concat(e)})),cn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},_="___FONT_AWESOME___",Ie=16,Qa="fa",Za="svg-inline--fa",D="data-fa-i2svg",Pe="data-fa-pseudo-element",dn="data-fa-pseudo-element-pending",Re="data-prefix",De="data-icon",aa="fontawesome-i2svg",mn="async",vn=["HTML","HEAD","STYLE","SCRIPT"],et=["::before","::after",":before",":after"],at=(function(){try{return!0}catch{return!1}})();function Z(e){return new Proxy(e,{get:function(t,r){return r in t?t[r]:t[I]}})}var tt=f({},_a);tt[I]=f(f(f(f({},{"fa-duotone":"duotone"}),_a[I]),Ze.kit),Ze["kit-duotone"]);var hn=Z(tt),Ee=f({},mr);Ee[I]=f(f(f(f({},{duotone:"fad"}),Ee[I]),ea.kit),ea["kit-duotone"]);var ta=Z(Ee),Ce=f({},ke);Ce[I]=f(f({},Ce[I]),Sr.kit);var rt=Z(Ce),Fe=f({},rn);Fe[I]=f(f({},Fe[I]),yr.kit);Z(Fe);var pn=Bt,nt="fa-layers-text",gn=Xt,bn=f({},ur);Z(bn);var yn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],be=Vt,xn=[].concat(C(vr),C(un)),K=M.FontAwesomeConfig||{};function Sn(e){var a=x.querySelector("script["+e+"]");if(a)return a.getAttribute(e)}function An(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(x&&typeof x.querySelector=="function"){var wn=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];wn.forEach(function(e){var a=fe(e,2),t=a[0],r=a[1],n=An(Sn(t));n!=null&&(K[r]=n)})}var it={styleDefault:"solid",familyDefault:I,cssPrefix:Qa,replacementClass:Za,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};K.familyPrefix&&(K.cssPrefix=K.familyPrefix);var B=f(f({},it),K);B.autoReplaceSvg||(B.observeMutations=!1);var m={};Object.keys(it).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(t){B[e]=t,J.forEach(function(r){return r(m)})},get:function(){return B[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(a){B.cssPrefix=a,J.forEach(function(t){return t(m)})},get:function(){return B.cssPrefix}});M.FontAwesomeConfig=m;var J=[];function kn(e){return J.push(e),function(){J.splice(J.indexOf(e),1)}}var Y=Ie,F={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function In(e){if(!(!e||!L)){var a=x.createElement("style");a.setAttribute("type","text/css"),a.innerHTML=e;for(var t=x.head.childNodes,r=null,n=t.length-1;n>-1;n--){var o=t[n],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(r=o)}return x.head.insertBefore(a,r),e}}var Pn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ra(){for(var e=12,a="";e-- >0;)a+=Pn[Math.random()*62|0];return a}function X(e){for(var a=[],t=(e||[]).length>>>0;t--;)a[t]=e[t];return a}function We(e){return e.classList?X(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(a){return a})}function ot(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function En(e){return Object.keys(e||{}).reduce(function(a,t){return a+"".concat(t,'="').concat(ot(e[t]),'" ')},"").trim()}function ue(e){return Object.keys(e||{}).reduce(function(a,t){return a+"".concat(t,": ").concat(e[t].trim(),";")},"")}function Ye(e){return e.size!==F.size||e.x!==F.x||e.y!==F.y||e.rotate!==F.rotate||e.flipX||e.flipY}function Cn(e){var a=e.transform,t=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(t/2," 256)")},o="translate(".concat(a.x*32,", ").concat(a.y*32,") "),i="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),s="rotate(".concat(a.rotate," 0 0)"),l={transform:"".concat(o," ").concat(i," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:l,path:u}}function Fn(e){var a=e.transform,t=e.width,r=t===void 0?Ie:t,n=e.height,o=n===void 0?Ie:n,i="";return Ta?i+="translate(".concat(a.x/Y-r/2,"em, ").concat(a.y/Y-o/2,"em) "):i+="translate(calc(-50% + ".concat(a.x/Y,"em), calc(-50% + ").concat(a.y/Y,"em)) "),i+="scale(".concat(a.size/Y*(a.flipX?-1:1),", ").concat(a.size/Y*(a.flipY?-1:1),") "),i+="rotate(".concat(a.rotate,"deg) "),i}var On=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}`;function st(){var e=Qa,a=Za,t=m.cssPrefix,r=m.replacementClass,n=On;if(t!==e||r!==a){var o=new RegExp("\\.".concat(e,"\\-"),"g"),i=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(a),"g");n=n.replace(o,".".concat(t,"-")).replace(i,"--".concat(t,"-")).replace(s,".".concat(r))}return n}var na=!1;function ye(){m.autoAddCss&&!na&&(In(st()),na=!0)}var Nn={mixout:function(){return{dom:{css:st,insertCss:ye}}},hooks:function(){return{beforeDOMElementCreation:function(){ye()},beforeI2svg:function(){ye()}}}},j=M||{};j[_]||(j[_]={});j[_].styles||(j[_].styles={});j[_].hooks||(j[_].hooks={});j[_].shims||(j[_].shims=[]);var E=j[_],lt=[],ft=function(){x.removeEventListener("DOMContentLoaded",ft),se=1,lt.map(function(a){return a()})},se=!1;L&&(se=(x.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(x.readyState),se||x.addEventListener("DOMContentLoaded",ft));function Tn(e){L&&(se?setTimeout(e,0):lt.push(e))}function ee(e){var a=e.tag,t=e.attributes,r=t===void 0?{}:t,n=e.children,o=n===void 0?[]:n;return typeof e=="string"?ot(e):"<".concat(a," ").concat(En(r),">").concat(o.map(ee).join(""),"</").concat(a,">")}function ia(e,a,t){if(e&&e[a]&&e[a][t])return{prefix:a,iconName:t,icon:e[a][t]}}var xe=function(a,t,r,n){var o=Object.keys(a),i=o.length,s=t,l,u,c;for(r===void 0?(l=1,c=a[o[0]]):(l=0,c=r);l<i;l++)u=o[l],c=s(c,a[u],u,a);return c};function ut(e){return C(e).length!==1?null:e.codePointAt(0).toString(16)}function oa(e){return Object.keys(e).reduce(function(a,t){var r=e[t],n=!!r.icon;return n?a[r.iconName]=r.icon:a[t]=r,a},{})}function ct(e,a){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=t.skipHooks,n=r===void 0?!1:r,o=oa(a);typeof E.hooks.addPack=="function"&&!n?E.hooks.addPack(e,oa(a)):E.styles[e]=f(f({},E.styles[e]||{}),o),e==="fas"&&ct("fa",a)}var q=E.styles,_n=E.shims,dt=Object.keys(rt),jn=dt.reduce(function(e,a){return e[a]=Object.keys(rt[a]),e},{}),Ue=null,mt={},vt={},ht={},pt={},gt={};function Ln(e){return~xn.indexOf(e)}function Mn(e,a){var t=a.split("-"),r=t[0],n=t.slice(1).join("-");return r===e&&n!==""&&!Ln(n)?n:null}var bt=function(){var a=function(o){return xe(q,function(i,s,l){return i[l]=xe(s,o,{}),i},{})};mt=a(function(n,o,i){if(o[3]&&(n[o[3]]=i),o[2]){var s=o[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){n[l.toString(16)]=i})}return n}),vt=a(function(n,o,i){if(n[i]=i,o[2]){var s=o[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){n[l]=i})}return n}),gt=a(function(n,o,i){var s=o[2];return n[i]=i,s.forEach(function(l){n[l]=i}),n});var t="far"in q||m.autoFetchSvg,r=xe(_n,function(n,o){var i=o[0],s=o[1],l=o[2];return s==="far"&&!t&&(s="fas"),typeof i=="string"&&(n.names[i]={prefix:s,iconName:l}),typeof i=="number"&&(n.unicodes[i.toString(16)]={prefix:s,iconName:l}),n},{names:{},unicodes:{}});ht=r.names,pt=r.unicodes,Ue=ce(m.styleDefault,{family:m.familyDefault})};kn(function(e){Ue=ce(e.styleDefault,{family:m.familyDefault})});bt();function He(e,a){return(mt[e]||{})[a]}function zn(e,a){return(vt[e]||{})[a]}function R(e,a){return(gt[e]||{})[a]}function yt(e){return ht[e]||{prefix:null,iconName:null}}function $n(e){var a=pt[e],t=He("fas",e);return a||(t?{prefix:"fas",iconName:t}:null)||{prefix:null,iconName:null}}function z(){return Ue}var xt=function(){return{prefix:null,iconName:null,rest:[]}};function Rn(e){var a=I,t=dt.reduce(function(r,n){return r[n]="".concat(m.cssPrefix,"-").concat(n),r},{});return Va.forEach(function(r){(e.includes(t[r])||e.some(function(n){return jn[r].includes(n)}))&&(a=r)}),a}function ce(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=a.family,r=t===void 0?I:t,n=hn[r][e];if(r===Q&&!e)return"fad";var o=ta[r][e]||ta[r][n],i=e in E.styles?e:null,s=o||i||null;return s}function Dn(e){var a=[],t=null;return e.forEach(function(r){var n=Mn(m.cssPrefix,r);n?t=n:r&&a.push(r)}),{iconName:t,rest:a}}function sa(e){return e.sort().filter(function(a,t,r){return r.indexOf(a)===t})}var la=Ja.concat(Ka);function de(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=a.skipLookups,r=t===void 0?!1:t,n=null,o=sa(e.filter(function(v){return la.includes(v)})),i=sa(e.filter(function(v){return!la.includes(v)})),s=o.filter(function(v){return n=v,!ja.includes(v)}),l=fe(s,1),u=l[0],c=u===void 0?null:u,d=Rn(o),h=f(f({},Dn(i)),{},{prefix:ce(c,{family:d})});return f(f(f({},h),Hn({values:e,family:d,styles:q,config:m,canonical:h,givenPrefix:n})),Wn(r,n,h))}function Wn(e,a,t){var r=t.prefix,n=t.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var o=a==="fa"?yt(n):{},i=R(r,n);return n=o.iconName||i||n,r=o.prefix||r,r==="far"&&!q.far&&q.fas&&!m.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var Yn=Va.filter(function(e){return e!==I||e!==Q}),Un=Object.keys(ke).filter(function(e){return e!==I}).map(function(e){return Object.keys(ke[e])}).flat();function Hn(e){var a=e.values,t=e.family,r=e.canonical,n=e.givenPrefix,o=n===void 0?"":n,i=e.styles,s=i===void 0?{}:i,l=e.config,u=l===void 0?{}:l,c=t===Q,d=a.includes("fa-duotone")||a.includes("fad"),h=u.familyDefault==="duotone",v=r.prefix==="fad"||r.prefix==="fa-duotone";if(!c&&(d||h||v)&&(r.prefix="fad"),(a.includes("fa-brands")||a.includes("fab"))&&(r.prefix="fab"),!r.prefix&&Yn.includes(t)){var y=Object.keys(s).find(function(S){return Un.includes(S)});if(y||u.autoFetchSvg){var b=dr.get(t).defaultShortPrefixId;r.prefix=b,r.iconName=R(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||o==="fa")&&(r.prefix=z()||"fas"),r}var Gn=(function(){function e(){zt(this,e),this.definitions={}}return Rt(e,[{key:"add",value:function(){for(var t=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];var i=n.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(s){t.definitions[s]=f(f({},t.definitions[s]||{}),i[s]),ct(s,i[s]),bt()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(t,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(o){var i=n[o],s=i.prefix,l=i.iconName,u=i.icon,c=u[2];t[s]||(t[s]={}),c.length>0&&c.forEach(function(d){typeof d=="string"&&(t[s][d]=u)}),t[s][l]=u}),t}}])})(),fa=[],H={},G={},Bn=Object.keys(G);function Xn(e,a){var t=a.mixoutsTo;return fa=e,H={},Object.keys(G).forEach(function(r){Bn.indexOf(r)===-1&&delete G[r]}),fa.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(i){typeof n[i]=="function"&&(t[i]=n[i]),oe(n[i])==="object"&&Object.keys(n[i]).forEach(function(s){t[i]||(t[i]={}),t[i][s]=n[i][s]})}),r.hooks){var o=r.hooks();Object.keys(o).forEach(function(i){H[i]||(H[i]=[]),H[i].push(o[i])})}r.provides&&r.provides(G)}),t}function Oe(e,a){for(var t=arguments.length,r=new Array(t>2?t-2:0),n=2;n<t;n++)r[n-2]=arguments[n];var o=H[e]||[];return o.forEach(function(i){a=i.apply(null,[a].concat(r))}),a}function W(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),r=1;r<a;r++)t[r-1]=arguments[r];var n=H[e]||[];n.forEach(function(o){o.apply(null,t)})}function $(){var e=arguments[0],a=Array.prototype.slice.call(arguments,1);return G[e]?G[e].apply(null,a):void 0}function Ne(e){e.prefix==="fa"&&(e.prefix="fas");var a=e.iconName,t=e.prefix||z();if(a)return a=R(t,a)||a,ia(St.definitions,t,a)||ia(E.styles,t,a)}var St=new Gn,Vn=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,W("noAuto")},Kn={i2svg:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return L?(W("beforeI2svg",a),$("pseudoElements2svg",a),$("i2svg",a)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=a.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Tn(function(){qn({autoReplaceSvgRoot:t}),W("watch",a)})}},Jn={icon:function(a){if(a===null)return null;if(oe(a)==="object"&&a.prefix&&a.iconName)return{prefix:a.prefix,iconName:R(a.prefix,a.iconName)||a.iconName};if(Array.isArray(a)&&a.length===2){var t=a[1].indexOf("fa-")===0?a[1].slice(3):a[1],r=ce(a[0]);return{prefix:r,iconName:R(r,t)||t}}if(typeof a=="string"&&(a.indexOf("".concat(m.cssPrefix,"-"))>-1||a.match(pn))){var n=de(a.split(" "),{skipLookups:!0});return{prefix:n.prefix||z(),iconName:R(n.prefix,n.iconName)||n.iconName}}if(typeof a=="string"){var o=z();return{prefix:o,iconName:R(o,a)||a}}}},P={noAuto:Vn,config:m,dom:Kn,parse:Jn,library:St,findIconDefinition:Ne,toHtml:ee},qn=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=a.autoReplaceSvgRoot,r=t===void 0?x:t;(Object.keys(E.styles).length>0||m.autoFetchSvg)&&L&&m.autoReplaceSvg&&P.dom.i2svg({node:r})};function me(e,a){return Object.defineProperty(e,"abstract",{get:a}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return ee(r)})}}),Object.defineProperty(e,"node",{get:function(){if(L){var r=x.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function Qn(e){var a=e.children,t=e.main,r=e.mask,n=e.attributes,o=e.styles,i=e.transform;if(Ye(i)&&t.found&&!r.found){var s=t.width,l=t.height,u={x:s/l/2,y:.5};n.style=ue(f(f({},o),{},{"transform-origin":"".concat(u.x+i.x/16,"em ").concat(u.y+i.y/16,"em")}))}return[{tag:"svg",attributes:n,children:a}]}function Zn(e){var a=e.prefix,t=e.iconName,r=e.children,n=e.attributes,o=e.symbol,i=o===!0?"".concat(a,"-").concat(m.cssPrefix,"-").concat(t):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},n),{},{id:i}),children:r}]}]}function ei(e){var a=["aria-label","aria-labelledby","title","role"];return a.some(function(t){return t in e})}function Ge(e){var a=e.icons,t=a.main,r=a.mask,n=e.prefix,o=e.iconName,i=e.transform,s=e.symbol,l=e.maskId,u=e.extra,c=e.watchable,d=c===void 0?!1:c,h=r.found?r:t,v=h.width,y=h.height,b=[m.replacementClass,o?"".concat(m.cssPrefix,"-").concat(o):""].filter(function(g){return u.classes.indexOf(g)===-1}).filter(function(g){return g!==""||!!g}).concat(u.classes).join(" "),S={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":n,"data-icon":o,class:b,role:u.attributes.role||"img",viewBox:"0 0 ".concat(v," ").concat(y)})};!ei(u.attributes)&&!u.attributes["aria-hidden"]&&(S.attributes["aria-hidden"]="true"),d&&(S.attributes[D]="");var A=f(f({},S),{},{prefix:n,iconName:o,main:t,mask:r,maskId:l,transform:i,symbol:s,styles:f({},u.styles)}),w=r.found&&t.found?$("generateAbstractMask",A)||{children:[],attributes:{}}:$("generateAbstractIcon",A)||{children:[],attributes:{}},k=w.children,O=w.attributes;return A.children=k,A.attributes=O,s?Zn(A):Qn(A)}function ua(e){var a=e.content,t=e.width,r=e.height,n=e.transform,o=e.extra,i=e.watchable,s=i===void 0?!1:i,l=f(f({},o.attributes),{},{class:o.classes.join(" ")});s&&(l[D]="");var u=f({},o.styles);Ye(n)&&(u.transform=Fn({transform:n,width:t,height:r}),u["-webkit-transform"]=u.transform);var c=ue(u);c.length>0&&(l.style=c);var d=[];return d.push({tag:"span",attributes:l,children:[a]}),d}function ai(e){var a=e.content,t=e.extra,r=f(f({},t.attributes),{},{class:t.classes.join(" ")}),n=ue(t.styles);n.length>0&&(r.style=n);var o=[];return o.push({tag:"span",attributes:r,children:[a]}),o}var Se=E.styles;function Te(e){var a=e[0],t=e[1],r=e.slice(4),n=fe(r,1),o=n[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(be.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(be.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(be.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:a,height:t,icon:i}}var ti={found:!1,width:512,height:512};function ri(e,a){!at&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(a,'" is missing.'))}function _e(e,a){var t=a;return a==="fa"&&m.styleDefault!==null&&(a=z()),new Promise(function(r,n){if(t==="fa"){var o=yt(e)||{};e=o.iconName||e,a=o.prefix||a}if(e&&a&&Se[a]&&Se[a][e]){var i=Se[a][e];return r(Te(i))}ri(e,a),r(f(f({},ti),{},{icon:m.showMissingIcons&&e?$("missingIconAbstract")||{}:{}}))})}var ca=function(){},je=m.measurePerformance&&ae&&ae.mark&&ae.measure?ae:{mark:ca,measure:ca},V='FA "7.0.0"',ni=function(a){return je.mark("".concat(V," ").concat(a," begins")),function(){return At(a)}},At=function(a){je.mark("".concat(V," ").concat(a," ends")),je.measure("".concat(V," ").concat(a),"".concat(V," ").concat(a," begins"),"".concat(V," ").concat(a," ends"))},Be={begin:ni,end:At},ne=function(){};function da(e){var a=e.getAttribute?e.getAttribute(D):null;return typeof a=="string"}function ii(e){var a=e.getAttribute?e.getAttribute(Re):null,t=e.getAttribute?e.getAttribute(De):null;return a&&t}function oi(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function si(){if(m.autoReplaceSvg===!0)return ie.replace;var e=ie[m.autoReplaceSvg];return e||ie.replace}function li(e){return x.createElementNS("http://www.w3.org/2000/svg",e)}function fi(e){return x.createElement(e)}function wt(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=a.ceFn,r=t===void 0?e.tag==="svg"?li:fi:t;if(typeof e=="string")return x.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(i){n.setAttribute(i,e.attributes[i])});var o=e.children||[];return o.forEach(function(i){n.appendChild(wt(i,{ceFn:r}))}),n}function ui(e){var a=" ".concat(e.outerHTML," ");return a="".concat(a,"Font Awesome fontawesome.com "),a}var ie={replace:function(a){var t=a[0];if(t.parentNode)if(a[1].forEach(function(n){t.parentNode.insertBefore(wt(n),t)}),t.getAttribute(D)===null&&m.keepOriginalSource){var r=x.createComment(ui(t));t.parentNode.replaceChild(r,t)}else t.remove()},nest:function(a){var t=a[0],r=a[1];if(~We(t).indexOf(m.replacementClass))return ie.replace(a);var n=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var o=r[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(n)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",o.toNode.join(" "))}var i=r.map(function(s){return ee(s)}).join(`
`);t.setAttribute(D,""),t.innerHTML=i}};function ma(e){e()}function kt(e,a){var t=typeof a=="function"?a:ne;if(e.length===0)t();else{var r=ma;m.mutateApproach===mn&&(r=M.requestAnimationFrame||ma),r(function(){var n=si(),o=Be.begin("mutate");e.map(n),o(),t()})}}var Xe=!1;function It(){Xe=!0}function Le(){Xe=!1}var le=null;function va(e){if(Qe&&m.observeMutations){var a=e.treeCallback,t=a===void 0?ne:a,r=e.nodeCallback,n=r===void 0?ne:r,o=e.pseudoElementsCallback,i=o===void 0?ne:o,s=e.observeMutationsRoot,l=s===void 0?x:s;le=new Qe(function(u){if(!Xe){var c=z();X(u).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!da(d.addedNodes[0])&&(m.searchPseudoElements&&i(d.target),t(d.target)),d.type==="attributes"&&d.target.parentNode&&m.searchPseudoElements&&i([d.target],!0),d.type==="attributes"&&da(d.target)&&~yn.indexOf(d.attributeName))if(d.attributeName==="class"&&ii(d.target)){var h=de(We(d.target)),v=h.prefix,y=h.iconName;d.target.setAttribute(Re,v||c),y&&d.target.setAttribute(De,y)}else oi(d.target)&&n(d.target)})}}),L&&le.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ci(){le&&le.disconnect()}function di(e){var a=e.getAttribute("style"),t=[];return a&&(t=a.split(";").reduce(function(r,n){var o=n.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(r[i]=s.join(":").trim()),r},{})),t}function mi(e){var a=e.getAttribute("data-prefix"),t=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=de(We(e));return n.prefix||(n.prefix=z()),a&&t&&(n.prefix=a,n.iconName=t),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=zn(n.prefix,e.innerText)||He(n.prefix,ut(e.innerText))),!n.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function vi(e){var a=X(e.attributes).reduce(function(t,r){return t.name!=="class"&&t.name!=="style"&&(t[r.name]=r.value),t},{});return a}function hi(){return{iconName:null,prefix:null,transform:F,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ha(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},t=mi(e),r=t.iconName,n=t.prefix,o=t.rest,i=vi(e),s=Oe("parseNodeAttributes",{},e),l=a.styleParser?di(e):[];return f({iconName:r,prefix:n,transform:F,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:l,attributes:i}},s)}var pi=E.styles;function Pt(e){var a=m.autoReplaceSvg==="nest"?ha(e,{styleParser:!1}):ha(e);return~a.extra.classes.indexOf(nt)?$("generateLayersText",e,a):$("generateSvgReplacementMutation",e,a)}function gi(){return[].concat(C(Ka),C(Ja))}function pa(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!L)return Promise.resolve();var t=x.documentElement.classList,r=function(d){return t.add("".concat(aa,"-").concat(d))},n=function(d){return t.remove("".concat(aa,"-").concat(d))},o=m.autoFetchSvg?gi():ja.concat(Object.keys(pi));o.includes("fa")||o.push("fa");var i=[".".concat(nt,":not([").concat(D,"])")].concat(o.map(function(c){return".".concat(c,":not([").concat(D,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=X(e.querySelectorAll(i))}catch{}if(s.length>0)r("pending"),n("complete");else return Promise.resolve();var l=Be.begin("onTree"),u=s.reduce(function(c,d){try{var h=Pt(d);h&&c.push(h)}catch(v){at||v.name==="MissingIcon"&&console.error(v)}return c},[]);return new Promise(function(c,d){Promise.all(u).then(function(h){kt(h,function(){r("active"),r("complete"),n("pending"),typeof a=="function"&&a(),l(),c()})}).catch(function(h){l(),d(h)})})}function bi(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Pt(e).then(function(t){t&&kt([t],a)})}function yi(e){return function(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(a||{}).icon?a:Ne(a||{}),n=t.mask;return n&&(n=(n||{}).icon?n:Ne(n||{})),e(r,f(f({},t),{},{mask:n}))}}var xi=function(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=t.transform,n=r===void 0?F:r,o=t.symbol,i=o===void 0?!1:o,s=t.mask,l=s===void 0?null:s,u=t.maskId,c=u===void 0?null:u,d=t.classes,h=d===void 0?[]:d,v=t.attributes,y=v===void 0?{}:v,b=t.styles,S=b===void 0?{}:b;if(a){var A=a.prefix,w=a.iconName,k=a.icon;return me(f({type:"icon"},a),function(){return W("beforeDOMElementCreation",{iconDefinition:a,params:t}),Ge({icons:{main:Te(k),mask:l?Te(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:A,iconName:w,transform:f(f({},F),n),symbol:i,maskId:c,extra:{attributes:y,styles:S,classes:h}})})}},Si={mixout:function(){return{icon:yi(xi)}},hooks:function(){return{mutationObserverCallbacks:function(t){return t.treeCallback=pa,t.nodeCallback=bi,t}}},provides:function(a){a.i2svg=function(t){var r=t.node,n=r===void 0?x:r,o=t.callback,i=o===void 0?function(){}:o;return pa(n,i)},a.generateSvgReplacementMutation=function(t,r){var n=r.iconName,o=r.prefix,i=r.transform,s=r.symbol,l=r.mask,u=r.maskId,c=r.extra;return new Promise(function(d,h){Promise.all([_e(n,o),l.iconName?_e(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(v){var y=fe(v,2),b=y[0],S=y[1];d([t,Ge({icons:{main:b,mask:S},prefix:o,iconName:n,transform:i,symbol:s,maskId:u,extra:c,watchable:!0})])}).catch(h)})},a.generateAbstractIcon=function(t){var r=t.children,n=t.attributes,o=t.main,i=t.transform,s=t.styles,l=ue(s);l.length>0&&(n.style=l);var u;return Ye(i)&&(u=$("generateAbstractTransformGrouping",{main:o,transform:i,containerWidth:o.width,iconWidth:o.width})),r.push(u||o.icon),{children:r,attributes:n}}}},Ai={mixout:function(){return{layer:function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,o=n===void 0?[]:n;return me({type:"layer"},function(){W("beforeDOMElementCreation",{assembler:t,params:r});var i=[];return t(function(s){Array.isArray(s)?s.map(function(l){i=i.concat(l.abstract)}):i=i.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(C(o)).join(" ")},children:i}]})}}}},wi={mixout:function(){return{counter:function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,o=n===void 0?[]:n,i=r.attributes,s=i===void 0?{}:i,l=r.styles,u=l===void 0?{}:l;return me({type:"counter",content:t},function(){return W("beforeDOMElementCreation",{content:t,params:r}),ai({content:t.toString(),extra:{attributes:s,styles:u,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(C(o))}})})}}}},ki={mixout:function(){return{text:function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,o=n===void 0?F:n,i=r.classes,s=i===void 0?[]:i,l=r.attributes,u=l===void 0?{}:l,c=r.styles,d=c===void 0?{}:c;return me({type:"text",content:t},function(){return W("beforeDOMElementCreation",{content:t,params:r}),ua({content:t,transform:f(f({},F),o),extra:{attributes:u,styles:d,classes:["".concat(m.cssPrefix,"-layers-text")].concat(C(s))}})})}}},provides:function(a){a.generateLayersText=function(t,r){var n=r.transform,o=r.extra,i=null,s=null;if(Ta){var l=parseInt(getComputedStyle(t).fontSize,10),u=t.getBoundingClientRect();i=u.width/l,s=u.height/l}return Promise.resolve([t,ua({content:t.innerHTML,width:i,height:s,transform:n,extra:o,watchable:!0})])}}},Et=new RegExp('"',"ug"),ga=[1105920,1112319],ba=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),cr),cn),xr),Me=Object.keys(ba).reduce(function(e,a){return e[a.toLowerCase()]=ba[a],e},{}),Ii=Object.keys(Me).reduce(function(e,a){var t=Me[a];return e[a]=t[900]||C(Object.entries(t))[0][1],e},{});function Pi(e){var a=e.replace(Et,"");return ut(C(a)[0]||"")}function Ei(e){var a=e.getPropertyValue("font-feature-settings").includes("ss01"),t=e.getPropertyValue("content"),r=t.replace(Et,""),n=r.codePointAt(0),o=n>=ga[0]&&n<=ga[1],i=r.length===2?r[0]===r[1]:!1;return o||i||a}function Ci(e,a){var t=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(a),n=isNaN(r)?"normal":r;return(Me[t]||{})[n]||Ii[t]}function ya(e,a){var t="".concat(dn).concat(a.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(t)!==null)return r();var o=X(e.children),i=o.filter(function(ve){return ve.getAttribute(Pe)===a})[0],s=M.getComputedStyle(e,a),l=s.getPropertyValue("font-family"),u=l.match(gn),c=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(i&&!u)return e.removeChild(i),r();if(u&&d!=="none"&&d!==""){var h=s.getPropertyValue("content"),v=Ci(l,c),y=Pi(h),b=u[0].startsWith("FontAwesome"),S=Ei(s),A=He(v,y),w=A;if(b){var k=$n(y);k.iconName&&k.prefix&&(A=k.iconName,v=k.prefix)}if(A&&!S&&(!i||i.getAttribute(Re)!==v||i.getAttribute(De)!==w)){e.setAttribute(t,w),i&&e.removeChild(i);var O=hi(),g=O.extra;g.attributes[Pe]=a,_e(A,v).then(function(ve){var Tt=Ge(f(f({},O),{},{icons:{main:ve,mask:xt()},prefix:v,iconName:w,extra:g,watchable:!0})),he=x.createElementNS("http://www.w3.org/2000/svg","svg");a==="::before"?e.insertBefore(he,e.firstChild):e.appendChild(he),he.outerHTML=Tt.map(function(_t){return ee(_t)}).join(`
`),e.removeAttribute(t),r()}).catch(n)}else r()}else r()})}function Fi(e){return Promise.all([ya(e,"::before"),ya(e,"::after")])}function Oi(e){return e.parentNode!==document.head&&!~vn.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Pe)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var Ni=function(a){return!!a&&et.some(function(t){return a.includes(t)})},Ti=function(a){if(!a)return[];for(var t=new Set,r=[a],n=[/(?=\s:)/,new RegExp("(?<=\\)\\)?[^,]*,)")],o=function(){var v=s[i];r=r.flatMap(function(y){return y.split(v).map(function(b){return b.replace(/,\s*$/,"").trim()})})},i=0,s=n;i<s.length;i++)o();r=r.flatMap(function(h){return h.includes("(")?h:h.split(",").map(function(v){return v.trim()})});var l=re(r),u;try{for(l.s();!(u=l.n()).done;){var c=u.value;if(Ni(c)){var d=et.reduce(function(h,v){return h.replace(v,"")},c);d!==""&&d!=="*"&&t.add(d)}}}catch(h){l.e(h)}finally{l.f()}return t};function xa(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(L){var t;if(a)t=e;else if(m.searchPseudoElementsFullScan)t=e.querySelectorAll("*");else{var r=new Set,n=re(document.styleSheets),o;try{for(n.s();!(o=n.n()).done;){var i=o.value;try{var s=re(i.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,c=Ti(u.selectorText),d=re(c),h;try{for(d.s();!(h=d.n()).done;){var v=h.value;r.add(v)}}catch(b){d.e(b)}finally{d.f()}}}catch(b){s.e(b)}finally{s.f()}}catch(b){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(i.href," (").concat(b.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(b){n.e(b)}finally{n.f()}if(!r.size)return;var y=Array.from(r).join(", ");try{t=e.querySelectorAll(y)}catch{}}return new Promise(function(b,S){var A=X(t).filter(Oi).map(Fi),w=Be.begin("searchPseudoElements");It(),Promise.all(A).then(function(){w(),Le(),b()}).catch(function(){w(),Le(),S()})})}}var _i={hooks:function(){return{mutationObserverCallbacks:function(t){return t.pseudoElementsCallback=xa,t}}},provides:function(a){a.pseudoElements2svg=function(t){var r=t.node,n=r===void 0?x:r;m.searchPseudoElements&&xa(n)}}},Sa=!1,ji={mixout:function(){return{dom:{unwatch:function(){It(),Sa=!0}}}},hooks:function(){return{bootstrap:function(){va(Oe("mutationObserverCallbacks",{}))},noAuto:function(){ci()},watch:function(t){var r=t.observeMutationsRoot;Sa?Le():va(Oe("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Aa=function(a){var t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return a.toLowerCase().split(" ").reduce(function(r,n){var o=n.toLowerCase().split("-"),i=o[0],s=o.slice(1).join("-");if(i&&s==="h")return r.flipX=!0,r;if(i&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(i){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},t)},Li={mixout:function(){return{parse:{transform:function(t){return Aa(t)}}}},hooks:function(){return{parseNodeAttributes:function(t,r){var n=r.getAttribute("data-fa-transform");return n&&(t.transform=Aa(n)),t}}},provides:function(a){a.generateAbstractTransformGrouping=function(t){var r=t.main,n=t.transform,o=t.containerWidth,i=t.iconWidth,s={transform:"translate(".concat(o/2," 256)")},l="translate(".concat(n.x*32,", ").concat(n.y*32,") "),u="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),c="rotate(".concat(n.rotate," 0 0)"),d={transform:"".concat(l," ").concat(u," ").concat(c)},h={transform:"translate(".concat(i/2*-1," -256)")},v={outer:s,inner:d,path:h};return{tag:"g",attributes:f({},v.outer),children:[{tag:"g",attributes:f({},v.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:f(f({},r.icon.attributes),v.path)}]}]}}}},Ae={x:0,y:0,width:"100%",height:"100%"};function wa(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||a)&&(e.attributes.fill="black"),e}function Mi(e){return e.tag==="g"?e.children:[e]}var zi={hooks:function(){return{parseNodeAttributes:function(t,r){var n=r.getAttribute("data-fa-mask"),o=n?de(n.split(" ").map(function(i){return i.trim()})):xt();return o.prefix||(o.prefix=z()),t.mask=o,t.maskId=r.getAttribute("data-fa-mask-id"),t}}},provides:function(a){a.generateAbstractMask=function(t){var r=t.children,n=t.attributes,o=t.main,i=t.mask,s=t.maskId,l=t.transform,u=o.width,c=o.icon,d=i.width,h=i.icon,v=Cn({transform:l,containerWidth:d,iconWidth:u}),y={tag:"rect",attributes:f(f({},Ae),{},{fill:"white"})},b=c.children?{children:c.children.map(wa)}:{},S={tag:"g",attributes:f({},v.inner),children:[wa(f({tag:c.tag,attributes:f(f({},c.attributes),v.path)},b))]},A={tag:"g",attributes:f({},v.outer),children:[S]},w="mask-".concat(s||ra()),k="clip-".concat(s||ra()),O={tag:"mask",attributes:f(f({},Ae),{},{id:w,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[y,A]},g={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:Mi(h)},O]};return r.push(g,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(w,")")},Ae)}),{children:r,attributes:n}}}},$i={provides:function(a){var t=!1;M.matchMedia&&(t=M.matchMedia("(prefers-reduced-motion: reduce)").matches),a.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:f(f({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=f(f({},o),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return t||s.children.push({tag:"animate",attributes:f(f({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},i),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:f(f({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:t?[]:[{tag:"animate",attributes:f(f({},i),{},{values:"1;0;0;0;0;1;"})}]}),t||r.push({tag:"path",attributes:f(f({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Ri={hooks:function(){return{parseNodeAttributes:function(t,r){var n=r.getAttribute("data-fa-symbol"),o=n===null?!1:n===""?!0:n;return t.symbol=o,t}}}},Di=[Nn,Si,Ai,wi,ki,_i,ji,Li,zi,$i,Ri];Xn(Di,{mixoutsTo:P});P.noAuto;var Wi=P.config;P.library;P.dom;var Ct=P.parse;P.findIconDefinition;P.toHtml;var Yi=P.icon;P.layer;P.text;P.counter;function Ui(e){return e=e-0,e===e}function Ft(e){return Ui(e)?e:(e=e.replaceAll(/[_-]+(.)?/g,(a,t)=>t?t.toUpperCase():""),e.charAt(0).toLowerCase()+e.slice(1))}function Hi(e){return e.charAt(0).toUpperCase()+e.slice(1)}var U=new Map,Gi=1e3;function Bi(e){if(U.has(e))return U.get(e);const a={};let t=0;const r=e.length;for(;t<r;){const n=e.indexOf(";",t),o=n===-1?r:n,i=e.slice(t,o).trim();if(i){const s=i.indexOf(":");if(s>0){const l=i.slice(0,s).trim(),u=i.slice(s+1).trim();if(l&&u){const c=Ft(l);a[c.startsWith("webkit")?Hi(c):c]=u}}}t=o+1}if(U.size===Gi){const n=U.keys().next().value;n&&U.delete(n)}return U.set(e,a),a}function Ot(e,a,t={}){if(typeof a=="string")return a;const r=(a.children||[]).map(u=>Ot(e,u)),n=a.attributes||{},o={};for(const[u,c]of Object.entries(n))switch(!0){case u==="class":{o.className=c,delete n.class;break}case u==="style":{o.style=Bi(String(c));break}case u.startsWith("aria-"):case u.startsWith("data-"):{o[u.toLowerCase()]=c;break}default:o[Ft(u)]=c}const{style:i,"aria-label":s,...l}=t;return i&&(o.style=o.style?{...o.style,...i}:i),s&&(o["aria-label"]=s,o["aria-hidden"]="false"),e(a.tag,{...l,...o},...r)}var ka=(e,a)=>{const t=jt.useId();return e||(a?t:void 0)},Xi=class{constructor(e="react-fontawesome"){this.enabled=!1;let a=!1;try{a=typeof process<"u"&&!1}catch{}this.scope=e,this.enabled=a}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}},Vi="searchPseudoElementsFullScan"in Wi?"7.0.0":"6.0.0",Ki=Number.parseInt(Vi)>=7,N={beat:"fa-beat",fade:"fa-fade",beatFade:"fa-beat-fade",bounce:"fa-bounce",shake:"fa-shake",spin:"fa-spin",spinPulse:"fa-spin-pulse",spinReverse:"fa-spin-reverse",pulse:"fa-pulse"},Ji={left:"fa-pull-left",right:"fa-pull-right"},qi={90:"fa-rotate-90",180:"fa-rotate-180",270:"fa-rotate-270"},Qi={"2xs":"fa-2xs",xs:"fa-xs",sm:"fa-sm",lg:"fa-lg",xl:"fa-xl","2xl":"fa-2xl","1x":"fa-1x","2x":"fa-2x","3x":"fa-3x","4x":"fa-4x","5x":"fa-5x","6x":"fa-6x","7x":"fa-7x","8x":"fa-8x","9x":"fa-9x","10x":"fa-10x"},T={border:"fa-border",fixedWidth:"fa-fw",flip:"fa-flip",flipHorizontal:"fa-flip-horizontal",flipVertical:"fa-flip-vertical",inverse:"fa-inverse",rotateBy:"fa-rotate-by",swapOpacity:"fa-swap-opacity",widthAuto:"fa-width-auto"};function Zi(e){const{beat:a,fade:t,beatFade:r,bounce:n,shake:o,spin:i,spinPulse:s,spinReverse:l,pulse:u,fixedWidth:c,inverse:d,border:h,flip:v,size:y,rotation:b,pull:S,swapOpacity:A,rotateBy:w,widthAuto:k,className:O}=e,g=[];return O&&g.push(...O.split(" ")),a&&g.push(N.beat),t&&g.push(N.fade),r&&g.push(N.beatFade),n&&g.push(N.bounce),o&&g.push(N.shake),i&&g.push(N.spin),l&&g.push(N.spinReverse),s&&g.push(N.spinPulse),u&&g.push(N.pulse),c&&g.push(T.fixedWidth),d&&g.push(T.inverse),h&&g.push(T.border),v===!0&&g.push(T.flip),(v==="horizontal"||v==="both")&&g.push(T.flipHorizontal),(v==="vertical"||v==="both")&&g.push(T.flipVertical),y!=null&&g.push(Qi[y]),b!=null&&b!==0&&g.push(qi[b]),S!=null&&g.push(Ji[S]),A&&g.push(T.swapOpacity),Ki&&(w&&g.push(T.rotateBy),k&&g.push(T.widthAuto)),g}var eo=e=>typeof e=="object"&&"icon"in e&&!!e.icon;function Ia(e){if(e)return eo(e)?e:Ct.icon(e)}function ao(e){return Object.keys(e)}var Pa=new Xi("FontAwesomeIcon"),Nt={border:!1,className:"",mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},to=new Set(Object.keys(Nt)),ro=Ea.forwardRef((e,a)=>{const t={...Nt,...e},{icon:r,mask:n,symbol:o,title:i,titleId:s,maskId:l,transform:u}=t,c=ka(l,!!n),d=ka(s,!!i),h=Ia(r);if(!h)return Pa.error("Icon lookup is undefined",r),null;const v=Zi(t),y=typeof u=="string"?Ct.transform(u):u,b=Ia(n),S=Yi(h,{...v.length>0&&{classes:v},...y&&{transform:y},...b&&{mask:b},symbol:o,title:i,titleId:d,maskId:c});if(!S)return Pa.error("Could not find icon",h),null;const{abstract:A}=S,w={ref:a};for(const k of ao(t))to.has(k)||(w[k]=t[k]);return no(A[0],w)});ro.displayName="FontAwesomeIcon";var no=Ot.bind(null,Ea.createElement);/*!
 * Font Awesome Free 7.0.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */var io={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},co=io,oo={prefix:"fas",iconName:"house",icon:[512,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"]},mo=oo,vo={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]},so={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]},ho=so,po={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},go={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]},bo={prefix:"fas",iconName:"bars",icon:[448,512,["navicon"],"f0c9","M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"]},lo={prefix:"fas",iconName:"star-half-stroke",icon:[576,512,["star-half-alt"],"f5c0","M288.1 353.6c10 0 19.9 2.3 29 7l74.4 37.9-13-82.5c-3.2-20.2 3.5-40.7 17.9-55.2l59-59.1-82.5-13.1c-20.2-3.2-37.7-15.9-47-34.1l-38-74.4 0 273.6zM457.4 489c-7.3 5.3-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1s17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2z"]},yo=lo,fo={prefix:"fas",iconName:"cart-shopping",icon:[640,512,[128722,"shopping-cart"],"f07a","M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"]},xo=fo;/*!
 * Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */var So={prefix:"fab",iconName:"facebook-f",icon:[320,512,[],"f39e","M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"]},Ao={prefix:"fab",iconName:"instagram",icon:[448,512,[],"f16d","M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]},wo={prefix:"fab",iconName:"linkedin-in",icon:[448,512,[],"f0e1","M100.3 448l-92.9 0 0-299.1 92.9 0 0 299.1zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 39.5 5.7 25.9 15.8 15.8s23.8-15.8 38-15.8 27.9 5.7 38 15.8 15.8 23.8 15.8 38c0 29.7-24.1 54.3-53.8 54.3zM447.9 448l-92.7 0 0-145.6c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7l0 148.1-92.8 0 0-299.1 89.1 0 0 40.8 1.3 0c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3l0 164.3-.1 0z"]},ko={prefix:"fab",iconName:"twitter",icon:[512,512,[],"f099","M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103l0-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"]};export{ro as F,yo as a,po as b,xo as c,vo as d,ho as e,go as f,bo as g,co as h,So as i,ko as j,Ao as k,wo as l,mo as m};
