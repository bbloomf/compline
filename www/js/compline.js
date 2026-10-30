(function () {
/*! jQuery v3.1.0 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.0",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null!=a?a<0?this[a+this.length]:this[a]:f.call(this)},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"label"in b&&b.disabled===a||"form"in b&&b.disabled===a||"form"in b&&b.disabled===!1&&(b.isDisabled===a||b.isDisabled!==!a&&("label"in b||!ea(b))!==a)}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e)}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(_,aa),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=V.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(_,aa),$.test(j[0].type)&&qa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&sa(j),!a)return G.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||$.test(a)&&qa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){if(r.isFunction(b))return r.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return r.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(C.test(b))return r.filter(b,a,c);b=r.filter(b,a)}return r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType})}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/\S+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,
r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c||"false"!==c&&("null"===c?null:+c+""===c?+c:X.test(c)?JSON.parse(c):c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),Z(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=Z(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var $=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,_=new RegExp("^(?:([+-])=|)("+$+")([a-z%]*)$","i"),aa=["Top","Right","Bottom","Left"],ba=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ca=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function da(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&_.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ea={};function fa(a){var b,c=a.ownerDocument,d=a.nodeName,e=ea[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ea[d]=e,e)}function ga(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ba(d)&&(e[f]=fa(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ga(this,!0)},hide:function(){return ga(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ba(this)?r(this).show():r(this).hide()})}});var ha=/^(?:checkbox|radio)$/i,ia=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ja=/^$|\/(?:java|ecma)script/i,ka={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ka.optgroup=ka.option,ka.tbody=ka.tfoot=ka.colgroup=ka.caption=ka.thead,ka.th=ka.td;function la(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function ma(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var na=/<|&#?\w+;/;function oa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(na.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ia.exec(f)||["",""])[1].toLowerCase(),i=ka[h]||ka._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=la(l.appendChild(f),"script"),j&&ma(g),c){k=0;while(f=g[k++])ja.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var pa=d.documentElement,qa=/^key/,ra=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,sa=/^([^.]*)(?:\.(.+)|)/;function ta(){return!0}function ua(){return!1}function va(){try{return d.activeElement}catch(a){}}function wa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)wa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ua;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(pa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;c<h;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?r(e,this).index(i)>-1:r.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==va()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===va()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ta:ua,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:ua,isPropagationStopped:ua,isImmediatePropagationStopped:ua,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ta,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ta,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ta,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&qa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ra.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return wa(this,a,b,c,d)},one:function(a,b,c,d){return wa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ua),this.each(function(){r.event.remove(this,a,c,b)})}});var xa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,ya=/<script|<style|<link/i,za=/checked\s*(?:[^=]|=\s*.checked.)/i,Aa=/^true\/(.*)/,Ba=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ca(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Da(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ea(a){var b=Aa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ga(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ha.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ha(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&za.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(m&&(e=oa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(la(e,"script"),Da),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,la(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ea),l=0;l<i;l++)j=h[l],ja.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ba,""),k))}return a}function Ia(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(la(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&ma(la(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(xa,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=la(h),f=la(a),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);if(b)if(c)for(f=f||la(a),g=g||la(h),d=0,e=f.length;d<e;d++)Fa(f[d],g[d]);else Fa(a,h);return g=la(h,"script"),g.length>0&&ma(g,!i&&la(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(la(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!ya.test(a)&&!ka[(ia.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(la(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(la(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ja=/^margin/,Ka=new RegExp("^("+$+")(?!px)[a-z%]+$","i"),La=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",pa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,pa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Ma(a,b,c){var d,e,f,g,h=a.style;return c=c||La(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ka.test(g)&&Ja.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Na(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Oa=/^(none|table(?!-c[ea]).+)/,Pa={position:"absolute",visibility:"hidden",display:"block"},Qa={letterSpacing:"0",fontWeight:"400"},Ra=["Webkit","Moz","ms"],Sa=d.createElement("div").style;function Ta(a){if(a in Sa)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ra.length;while(c--)if(a=Ra[c]+b,a in Sa)return a}function Ua(a,b,c){var d=_.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Va(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+aa[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+aa[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+aa[f]+"Width",!0,e))):(g+=r.css(a,"padding"+aa[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+aa[f]+"Width",!0,e)));return g}function Wa(a,b,c){var d,e=!0,f=La(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Ma(a,b,f),(d<0||null==d)&&(d=a.style[b]),Ka.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Va(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ma(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=_.exec(c))&&e[1]&&(c=da(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Ma(a,b,d)),"normal"===e&&b in Qa&&(e=Qa[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Oa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Wa(a,b,d):ca(a,Pa,function(){return Wa(a,b,d)})},set:function(a,c,d){var e,f=d&&La(a),g=d&&Va(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=_.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ua(a,c,g)}}}),r.cssHooks.marginLeft=Na(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Ma(a,"marginLeft"))||a.getBoundingClientRect().left-ca(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+aa[d]+b]=f[d]||f[d-2]||f[0];return e}},Ja.test(a)||(r.cssHooks[a+b].set=Ua)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=La(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Xa(a,b,c,d,e){return new Xa.prototype.init(a,b,c,d,e)}r.Tween=Xa,Xa.prototype={constructor:Xa,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Xa.propHooks[this.prop];return a&&a.get?a.get(this):Xa.propHooks._default.get(this)},run:function(a){var b,c=Xa.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Xa.propHooks._default.set(this),this}},Xa.prototype.init.prototype=Xa.prototype,Xa.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Xa.propHooks.scrollTop=Xa.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Xa.prototype.init,r.fx.step={};var Ya,Za,$a=/^(?:toggle|show|hide)$/,_a=/queueHooks$/;function ab(){Za&&(a.requestAnimationFrame(ab),r.fx.tick())}function bb(){return a.setTimeout(function(){Ya=void 0}),Ya=r.now()}function cb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=aa[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function db(a,b,c){for(var d,e=(gb.tweeners[b]||[]).concat(gb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function eb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ba(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],$a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ga([a],!0),j=a.style.display||j,k=r.css(a,"display"),ga([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ga([a],!0),m.done(function(){p||ga([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=db(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function fb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function gb(a,b,c){var d,e,f=0,g=gb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Ya||bb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Ya||bb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(fb(k,j.opts.specialEasing);f<g;f++)if(d=gb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,db,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(gb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return da(c.elem,a,_.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],gb.tweeners[c]=gb.tweeners[c]||[],gb.tweeners[c].unshift(b)},prefilters:[eb],prefilter:function(a,b){b?gb.prefilters.unshift(a):gb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:e.duration="number"==typeof e.duration?e.duration:e.duration in r.fx.speeds?r.fx.speeds[e.duration]:r.fx.speeds._default,null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ba).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=gb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&_a.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(cb(b,!0),a,d,e)}}),r.each({slideDown:cb("show"),slideUp:cb("hide"),slideToggle:cb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Ya=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Ya=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){Za||(Za=a.requestAnimationFrame?a.requestAnimationFrame(ab):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame(Za):a.clearInterval(Za),Za=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var hb,ib=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?hb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);
if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),hb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ib[b]||r.find.attr;ib[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=ib[g],ib[g]=e,e=null!=c(a,b,d)?g:null,ib[g]=f),e}});var jb=/^(?:input|select|textarea|button)$/i,kb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):jb.test(a.nodeName)||kb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});var lb=/[\t\r\n\f]/g;function mb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,mb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,mb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,mb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=mb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(c)+" ").replace(lb," ").indexOf(b)>-1)return!0;return!1}});var nb=/\r/g,ob=/[\x20\t\r\n\f]+/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(nb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:r.trim(r.text(a)).replace(ob," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type,g=f?null:[],h=f?e+1:d.length,i=e<0?h:f?e:0;i<h;i++)if(c=d[i],(c.selected||i===e)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ha.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,""),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=oa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=r.trim(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||pa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Na(o.pixelPosition,function(a,c){if(c)return c=Ma(a,b),Ka.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});

//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define('moment',b):a.moment=b()}(this,function(){"use strict";function a(){return fd.apply(null,arguments)}function b(a){fd=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ja(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a),c=gd.call(b.parsedDateParts,function(a){return null!=a});a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),hd.length>0)for(c in hd)d=hd[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),id===!1&&(id=!0,a.updateOffset(this),id=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(b,c){var d=!0;return g(function(){return null!=a.deprecationHandler&&a.deprecationHandler(null,b),d&&(t(b+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),d=!1),c.apply(this,arguments)},c)}function v(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),jd[b]||(t(c),jd[b]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!nd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=ld._abbr,require("./locale/"+a),E(b)}catch(c){}return nd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(ld=c)),ld._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=nd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(nd[a]._config,b)):null!=b.parentLocale&&(null!=nd[b.parentLocale]?b=z(nd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),nd[a]=new A(b),E(a),nd[a]):(delete nd[a],null)}function G(a,b){if(null!=b){var c;null!=nd[a]&&(b=z(nd[a]._config,b)),c=new A(b),c.parentLocale=nd[a],nd[a]=c,E(a)}else null!=nd[a]&&(null!=nd[a].parentLocale?nd[a]=nd[a].parentLocale:null!=nd[a]&&delete nd[a]);return nd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return ld;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return kd(nd)}function J(a,b){var c=a.toLowerCase();od[c]=od[c+"s"]=od[b]=a}function K(a){return"string"==typeof a?od[a]||od[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(sd[a]=e),b&&(sd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(sd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(pd);for(b=0,c=d.length;c>b;b++)sd[d[b]]?d[b]=sd[d[b]]:d[b]=S(d[b]);return function(b){var e,f="";for(e=0;c>e;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),rd[b]=rd[b]||T(b),rd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(qd.lastIndex=0;d>=0&&qd.test(a);)a=a.replace(qd,c),qd.lastIndex=0,d-=1;return a}function W(a,b,c){Kd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(Kd,a)?Kd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ld[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ld,a)&&Ld[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Vd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Vd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;12>d;++d)f=h([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:null):(e=md.call(this._longMonthsParse,g),-1!==e?e:null):"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:(e=md.call(this._longMonthsParse,g),-1!==e?e:null)):(e=md.call(this._longMonthsParse,g),-1!==e?e:(e=md.call(this._shortMonthsParse,g),-1!==e?e:null))}function fa(a,b,c){var d,e,f;if(this._monthsParseExact)return ea.call(this,a,b,c);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function ga(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ha(b){return null!=b?(ga(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ia(){return ba(this.year(),this.month())}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ka(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function la(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}function ma(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Nd]<0||c[Nd]>11?Nd:c[Od]<1||c[Od]>ba(c[Md],c[Nd])?Od:c[Pd]<0||c[Pd]>24||24===c[Pd]&&(0!==c[Qd]||0!==c[Rd]||0!==c[Sd])?Pd:c[Qd]<0||c[Qd]>59?Qd:c[Rd]<0||c[Rd]>59?Rd:c[Sd]<0||c[Sd]>999?Sd:-1,j(a)._overflowDayOfYear&&(Md>b||b>Od)&&(b=Od),j(a)._overflowWeeks&&-1===b&&(b=Td),j(a)._overflowWeekday&&-1===b&&(b=Ud),j(a).overflow=b),a}function na(a){var b,c,d,e,f,g,h=a._i,i=$d.exec(h)||_d.exec(h);if(i){for(j(a).iso=!0,b=0,c=be.length;c>b;b++)if(be[b][1].exec(i[1])){e=be[b][0],d=be[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=ce.length;c>b;b++)if(ce[b][1].exec(i[3])){f=(i[2]||" ")+ce[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!ae.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ca(a)}else a._isValid=!1}function oa(b){var c=de.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(na(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function pa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function qa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function ra(a){return sa(a)?366:365}function sa(a){return a%4===0&&a%100!==0||a%400===0}function ta(){return sa(this.year())}function ua(a,b,c){var d=7+b-c,e=(7+qa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=ra(f)+j):j>ra(a)?(f=a+1,g=j-ra(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(ra(a)-d+e)/7}function ya(a,b,c){return null!=a?a:null!=b?b:c}function za(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function Aa(a){var b,c,d,e,f=[];if(!a._d){for(d=za(a),a._w&&null==a._a[Od]&&null==a._a[Nd]&&Ba(a),a._dayOfYear&&(e=ya(a._a[Md],d[Md]),a._dayOfYear>ra(e)&&(j(a)._overflowDayOfYear=!0),c=qa(e,0,a._dayOfYear),a._a[Nd]=c.getUTCMonth(),a._a[Od]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Pd]&&0===a._a[Qd]&&0===a._a[Rd]&&0===a._a[Sd]&&(a._nextDay=!0,a._a[Pd]=0),a._d=(a._useUTC?qa:pa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Pd]=24)}}function Ba(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=ya(b.GG,a._a[Md],wa(Ka(),1,4).year),d=ya(b.W,1),e=ya(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=ya(b.gg,a._a[Md],wa(Ka(),f,g).year),d=ya(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>xa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[Md]=h.year,a._dayOfYear=h.dayOfYear)}function Ca(b){if(b._f===a.ISO_8601)return void na(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(pd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),sd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Pd]<=12&&b._a[Pd]>0&&(j(b).bigHour=void 0),j(b).parsedDateParts=b._a.slice(0),j(b).meridiem=b._meridiem,b._a[Pd]=Da(b._locale,b._a[Pd],b._meridiem),Aa(b),ma(b)}function Da(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Ea(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ca(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Fa(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),Aa(a)}}function Ga(a){var b=new o(ma(Ha(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ha(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(ma(b)):(c(e)?Ea(a):e?Ca(a):d(b)?a._d=b:Ia(a),k(a)||(a._d=null),a))}function Ia(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(f.valueOf()):"string"==typeof f?oa(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),Aa(b)):"object"==typeof f?Fa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ja(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Ga(f)}function Ka(a,b,c,d){return Ja(a,b,c,d,!1)}function La(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ka();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Ma(){var a=[].slice.call(arguments,0);return La("isBefore",a)}function Na(){var a=[].slice.call(arguments,0);return La("isAfter",a)}function Oa(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+1e3*h*60*60,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Pa(a){return a instanceof Oa}function Qa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Ra(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(ie)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Sa(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?b.valueOf():Ka(b).valueOf())-e.valueOf(),e._d.setTime(e._d.valueOf()+f),a.updateOffset(e,!1),e):Ka(b).local()}function Ta(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ua(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Ra(Hd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ta(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?jb(this,db(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ta(this):null!=b?this:NaN}function Va(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Wa(a){return this.utcOffset(0,a)}function Xa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ta(this),"m")),this}function Ya(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ra(Gd,this._i)),this}function Za(a){return this.isValid()?(a=a?Ka(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function $a(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function _a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ha(a),a._a){var b=a._isUTC?h(a._a):Ka(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function ab(){return this.isValid()?!this._isUTC:!1}function bb(){return this.isValid()?this._isUTC:!1}function cb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function db(a,b){var c,d,e,g=a,h=null;return Pa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=je.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Od])*c,h:r(h[Pd])*c,m:r(h[Qd])*c,s:r(h[Rd])*c,ms:r(h[Sd])*c}):(h=ke.exec(a))?(c="-"===h[1]?-1:1,g={y:eb(h[2],c),M:eb(h[3],c),w:eb(h[4],c),d:eb(h[5],c),h:eb(h[6],c),m:eb(h[7],c),s:eb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=gb(Ka(g.from),Ka(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Oa(g),Pa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function eb(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function fb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function gb(a,b){var c;return a.isValid()&&b.isValid()?(b=Sa(b,a),a.isBefore(b)?c=fb(a,b):(c=fb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function hb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function ib(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=db(c,d),jb(this,e,a),this}}function jb(b,c,d,e){var f=c._milliseconds,g=hb(c._days),h=hb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&ga(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function kb(a,b){var c=a||Ka(),d=Sa(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ka(c)))}function lb(){return new o(this)}function mb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf()):!1}function nb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf()):!1}function ob(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function pb(a,b){var c,d=p(a)?a:Ka(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf())):!1}function qb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function rb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function sb(a,b,c){var d,e,f,g;return this.isValid()?(d=Sa(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=tb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function tb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function ub(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function vb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function wb(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=U(this,b);return this.localeData().postformat(c)}function xb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function yb(a){return this.from(Ka(),a)}function zb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function Ab(a){return this.to(Ka(),a)}function Bb(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Cb(){return this._locale}function Db(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Eb(a){return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function Fb(){return this._d.valueOf()-6e4*(this._offset||0)}function Gb(){return Math.floor(this.valueOf()/1e3)}function Hb(){return this._offset?new Date(this.valueOf()):this._d}function Ib(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Jb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Kb(){return this.isValid()?this.toISOString():null}function Lb(){return k(this)}function Mb(){return g({},j(this))}function Nb(){return j(this).overflow}function Ob(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Pb(a,b){R(0,[a,a.length],0,b)}function Qb(a){return Ub.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Rb(a){return Ub.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Sb(){return xa(this.year(),1,4)}function Tb(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ub(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Vb.call(this,a,b,c,d,e))}function Vb(a,b,c,d,e){var f=va(a,b,c,d,e),g=qa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Wb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Xb(a){return wa(a,this._week.dow,this._week.doy).week}function Yb(){return this._week.dow}function Zb(){return this._week.doy}function $b(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function _b(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function ac(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function bc(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function cc(a){return this._weekdaysShort[a.day()]}function dc(a){return this._weekdaysMin[a.day()]}function ec(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;7>d;++d)f=h([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:null):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null):"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null)))}function fc(a,b,c){var d,e,f;if(this._weekdaysParseExact)return ec.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=h([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function gc(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=ac(a,this.localeData()),this.add(a-b,"d")):b}function hc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function ic(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function jc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex}function kc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex}function lc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex}function mc(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],i=[],j=[],k=[];for(b=0;7>b;b++)c=h([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),i.push(e),j.push(f),k.push(d),k.push(e),k.push(f);for(g.sort(a),i.sort(a),j.sort(a),k.sort(a),b=0;7>b;b++)i[b]=Z(i[b]),j[b]=Z(j[b]),k[b]=Z(k[b]);this._weekdaysRegex=new RegExp("^("+k.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}function nc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function oc(){return this.hours()%12||12}function pc(){return this.hours()||24}function qc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function rc(a,b){return b._meridiemParse}function sc(a){return"p"===(a+"").toLowerCase().charAt(0)}function tc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function uc(a,b){b[Sd]=r(1e3*("0."+a))}function vc(){return this._isUTC?"UTC":""}function wc(){return this._isUTC?"Coordinated Universal Time":""}function xc(a){return Ka(1e3*a)}function yc(){return Ka.apply(null,arguments).parseZone()}function zc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function Ac(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function Bc(){return this._invalidDate}function Cc(a){return this._ordinal.replace("%d",a)}function Dc(a){return a}function Ec(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function Fc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function Gc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Hc(a,b,c){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return Gc(a,b,c,"month");var d,e=[];for(d=0;12>d;d++)e[d]=Gc(a,d,c,"month");return e}function Ic(a,b,c,d){"boolean"==typeof a?("number"==typeof b&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,"number"==typeof b&&(c=b,b=void 0),b=b||"");var e=H(),f=a?e._week.dow:0;if(null!=c)return Gc(b,(c+f)%7,d,"day");var g,h=[];for(g=0;7>g;g++)h[g]=Gc(b,(g+f)%7,d,"day");return h}function Jc(a,b){return Hc(a,b,"months")}function Kc(a,b){return Hc(a,b,"monthsShort")}function Lc(a,b,c){return Ic(a,b,c,"weekdays")}function Mc(a,b,c){return Ic(a,b,c,"weekdaysShort")}function Nc(a,b,c){return Ic(a,b,c,"weekdaysMin")}function Oc(){var a=this._data;return this._milliseconds=Le(this._milliseconds),this._days=Le(this._days),this._months=Le(this._months),a.milliseconds=Le(a.milliseconds),a.seconds=Le(a.seconds),a.minutes=Le(a.minutes),a.hours=Le(a.hours),a.months=Le(a.months),a.years=Le(a.years),this}function Pc(a,b,c,d){var e=db(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Qc(a,b){return Pc(this,a,b,1)}function Rc(a,b){return Pc(this,a,b,-1)}function Sc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Tc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Sc(Vc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Uc(g)),h+=e,g-=Sc(Vc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Uc(a){return 4800*a/146097}function Vc(a){return 146097*a/4800}function Wc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Uc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Vc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Xc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Yc(a){return function(){return this.as(a)}}function Zc(a){
return a=K(a),this[a+"s"]()}function $c(a){return function(){return this._data[a]}}function _c(){return q(this.days()/7)}function ad(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function bd(a,b,c){var d=db(a).abs(),e=_e(d.as("s")),f=_e(d.as("m")),g=_e(d.as("h")),h=_e(d.as("d")),i=_e(d.as("M")),j=_e(d.as("y")),k=e<af.s&&["s",e]||1>=f&&["m"]||f<af.m&&["mm",f]||1>=g&&["h"]||g<af.h&&["hh",g]||1>=h&&["d"]||h<af.d&&["dd",h]||1>=i&&["M"]||i<af.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,ad.apply(null,k)}function cd(a,b){return void 0===af[a]?!1:void 0===b?af[a]:(af[a]=b,!0)}function dd(a){var b=this.localeData(),c=bd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function ed(){var a,b,c,d=bf(this._milliseconds)/1e3,e=bf(this._days),f=bf(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var fd,gd;gd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;c>d;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var hd=a.momentProperties=[],id=!1,jd={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var kd;kd=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)f(a,b)&&c.push(b);return c};var ld,md,nd={},od={},pd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,qd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,rd={},sd={},td=/\d/,ud=/\d\d/,vd=/\d{3}/,wd=/\d{4}/,xd=/[+-]?\d{6}/,yd=/\d\d?/,zd=/\d\d\d\d?/,Ad=/\d\d\d\d\d\d?/,Bd=/\d{1,3}/,Cd=/\d{1,4}/,Dd=/[+-]?\d{1,6}/,Ed=/\d+/,Fd=/[+-]?\d+/,Gd=/Z|[+-]\d\d:?\d\d/gi,Hd=/Z|[+-]\d\d(?::?\d\d)?/gi,Id=/[+-]?\d+(\.\d{1,3})?/,Jd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Kd={},Ld={},Md=0,Nd=1,Od=2,Pd=3,Qd=4,Rd=5,Sd=6,Td=7,Ud=8;md=Array.prototype.indexOf?Array.prototype.indexOf:function(a){var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1},R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",yd),W("MM",yd,ud),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Nd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Nd]=e:j(c).invalidMonth=a});var Vd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Wd="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Xd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Yd=Jd,Zd=Jd,$d=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,_d=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,ae=/Z|[+-]\d\d(?::?\d\d)?/,be=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],ce=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],de=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",Fd),W("YY",yd,ud),W("YYYY",Cd,wd),W("YYYYY",Dd,xd),W("YYYYYY",Dd,xd),$(["YYYYY","YYYYYY"],Md),$("YYYY",function(b,c){c[Md]=2===b.length?a.parseTwoDigitYear(b):r(b)}),$("YY",function(b,c){c[Md]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Md]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var ee=M("FullYear",!0);a.ISO_8601=function(){};var fe=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),ge=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),he=function(){return Date.now?Date.now():+new Date};Qa("Z",":"),Qa("ZZ",""),W("Z",Hd),W("ZZ",Hd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ra(Hd,a)});var ie=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var je=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,ke=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;db.fn=Oa.prototype;var le=ib(1,"add"),me=ib(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var ne=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Pb("gggg","weekYear"),Pb("ggggg","weekYear"),Pb("GGGG","isoWeekYear"),Pb("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",Fd),W("g",Fd),W("GG",yd,ud),W("gg",yd,ud),W("GGGG",Cd,wd),W("gggg",Cd,wd),W("GGGGG",Dd,xd),W("ggggg",Dd,xd),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",td),$("Q",function(a,b){b[Nd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",yd),W("ww",yd,ud),W("W",yd),W("WW",yd,ud),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var oe={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",yd),W("DD",yd,ud),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Od),$("Do",function(a,b){b[Od]=r(a.match(yd)[0],10)});var pe=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",yd),W("e",yd),W("E",yd),W("dd",function(a,b){return b.weekdaysMinRegex(a)}),W("ddd",function(a,b){return b.weekdaysShortRegex(a)}),W("dddd",function(a,b){return b.weekdaysRegex(a)}),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var qe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),re="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),se="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),te=Jd,ue=Jd,ve=Jd;R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",Bd),W("DDDD",vd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,oc),R("k",["kk",2],0,pc),R("hmm",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),qc("a",!0),qc("A",!1),J("hour","h"),W("a",rc),W("A",rc),W("H",yd),W("h",yd),W("HH",yd,ud),W("hh",yd,ud),W("hmm",zd),W("hmmss",Ad),W("Hmm",zd),W("Hmmss",Ad),$(["H","HH"],Pd),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Pd]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e))});var we=/[ap]\.?m?\.?/i,xe=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",yd),W("mm",yd,ud),$(["m","mm"],Qd);var ye=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",yd),W("ss",yd,ud),$(["s","ss"],Rd);var ze=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",Bd,td),W("SS",Bd,ud),W("SSS",Bd,vd);var Ae;for(Ae="SSSS";Ae.length<=9;Ae+="S")W(Ae,Ed);for(Ae="S";Ae.length<=9;Ae+="S")$(Ae,uc);var Be=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var Ce=o.prototype;Ce.add=le,Ce.calendar=kb,Ce.clone=lb,Ce.diff=sb,Ce.endOf=Eb,Ce.format=wb,Ce.from=xb,Ce.fromNow=yb,Ce.to=zb,Ce.toNow=Ab,Ce.get=P,Ce.invalidAt=Nb,Ce.isAfter=mb,Ce.isBefore=nb,Ce.isBetween=ob,Ce.isSame=pb,Ce.isSameOrAfter=qb,Ce.isSameOrBefore=rb,Ce.isValid=Lb,Ce.lang=ne,Ce.locale=Bb,Ce.localeData=Cb,Ce.max=ge,Ce.min=fe,Ce.parsingFlags=Mb,Ce.set=P,Ce.startOf=Db,Ce.subtract=me,Ce.toArray=Ib,Ce.toObject=Jb,Ce.toDate=Hb,Ce.toISOString=vb,Ce.toJSON=Kb,Ce.toString=ub,Ce.unix=Gb,Ce.valueOf=Fb,Ce.creationData=Ob,Ce.year=ee,Ce.isLeapYear=ta,Ce.weekYear=Qb,Ce.isoWeekYear=Rb,Ce.quarter=Ce.quarters=Wb,Ce.month=ha,Ce.daysInMonth=ia,Ce.week=Ce.weeks=$b,Ce.isoWeek=Ce.isoWeeks=_b,Ce.weeksInYear=Tb,Ce.isoWeeksInYear=Sb,Ce.date=pe,Ce.day=Ce.days=gc,Ce.weekday=hc,Ce.isoWeekday=ic,Ce.dayOfYear=nc,Ce.hour=Ce.hours=xe,Ce.minute=Ce.minutes=ye,Ce.second=Ce.seconds=ze,Ce.millisecond=Ce.milliseconds=Be,Ce.utcOffset=Ua,Ce.utc=Wa,Ce.local=Xa,Ce.parseZone=Ya,Ce.hasAlignedHourOffset=Za,Ce.isDST=$a,Ce.isDSTShifted=_a,Ce.isLocal=ab,Ce.isUtcOffset=bb,Ce.isUtc=cb,Ce.isUTC=cb,Ce.zoneAbbr=vc,Ce.zoneName=wc,Ce.dates=u("dates accessor is deprecated. Use date instead.",pe),Ce.months=u("months accessor is deprecated. Use month instead",ha),Ce.years=u("years accessor is deprecated. Use year instead",ee),Ce.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Va);var De=Ce,Ee={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Fe={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ge="Invalid date",He="%d",Ie=/\d{1,2}/,Je={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ke=A.prototype;Ke._calendar=Ee,Ke.calendar=zc,Ke._longDateFormat=Fe,Ke.longDateFormat=Ac,Ke._invalidDate=Ge,Ke.invalidDate=Bc,Ke._ordinal=He,Ke.ordinal=Cc,Ke._ordinalParse=Ie,Ke.preparse=Dc,Ke.postformat=Dc,Ke._relativeTime=Je,Ke.relativeTime=Ec,Ke.pastFuture=Fc,Ke.set=y,Ke.months=ca,Ke._months=Wd,Ke.monthsShort=da,Ke._monthsShort=Xd,Ke.monthsParse=fa,Ke._monthsRegex=Zd,Ke.monthsRegex=ka,Ke._monthsShortRegex=Yd,Ke.monthsShortRegex=ja,Ke.week=Xb,Ke._week=oe,Ke.firstDayOfYear=Zb,Ke.firstDayOfWeek=Yb,Ke.weekdays=bc,Ke._weekdays=qe,Ke.weekdaysMin=dc,Ke._weekdaysMin=se,Ke.weekdaysShort=cc,Ke._weekdaysShort=re,Ke.weekdaysParse=fc,Ke._weekdaysRegex=te,Ke.weekdaysRegex=jc,Ke._weekdaysShortRegex=ue,Ke.weekdaysShortRegex=kc,Ke._weekdaysMinRegex=ve,Ke.weekdaysMinRegex=lc,Ke.isPM=sc,Ke._meridiemParse=we,Ke.meridiem=tc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var Le=Math.abs,Me=Yc("ms"),Ne=Yc("s"),Oe=Yc("m"),Pe=Yc("h"),Qe=Yc("d"),Re=Yc("w"),Se=Yc("M"),Te=Yc("y"),Ue=$c("milliseconds"),Ve=$c("seconds"),We=$c("minutes"),Xe=$c("hours"),Ye=$c("days"),Ze=$c("months"),$e=$c("years"),_e=Math.round,af={s:45,m:45,h:22,d:26,M:11},bf=Math.abs,cf=Oa.prototype;cf.abs=Oc,cf.add=Qc,cf.subtract=Rc,cf.as=Wc,cf.asMilliseconds=Me,cf.asSeconds=Ne,cf.asMinutes=Oe,cf.asHours=Pe,cf.asDays=Qe,cf.asWeeks=Re,cf.asMonths=Se,cf.asYears=Te,cf.valueOf=Xc,cf._bubble=Tc,cf.get=Zc,cf.milliseconds=Ue,cf.seconds=Ve,cf.minutes=We,cf.hours=Xe,cf.days=Ye,cf.weeks=_c,cf.months=Ze,cf.years=$e,cf.humanize=dd,cf.toISOString=ed,cf.toString=ed,cf.toJSON=ed,cf.locale=Bb,cf.localeData=Cb,cf.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",ed),cf.lang=ne,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",Fd),W("X",Id),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.13.0",b(Ka),a.fn=De,a.min=Ma,a.max=Na,a.now=he,a.utc=h,a.unix=xc,a.months=Jc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=db,a.isMoment=p,a.weekdays=Lc,a.parseZone=yc,a.localeData=H,a.isDuration=Pa,a.monthsShort=Kc,a.weekdaysMin=Nc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Mc,a.normalizeUnits=K,a.relativeTimeThreshold=cd,a.prototype=De;var df=a;return df});
define('moment.easter',['moment'],function(moment){
// I found this algorithm on
// http://www.merlyn.demon.co.uk/estralgs.txt
//
// Given by
// Al Petrofsky, San Mateo County, California, U.S.A., E-mail 2009-05-22
moment.easter = function Easter20ops(year) {
    'use strict';
    /*jslint bitwise: true, vars: true */
    var a = (year / 100 | 0) * 1483 - (year / 400 | 0) * 2225 + 2613;
    var b = ((year % 19 * 3510 + (a / 25 | 0) * 319) / 330 | 0) % 29;
    // return 56 - b - ((year * 5 / 4 | 0) + a - b) % 7;

    var c = 148 - b - ((year * 5 / 4 | 0) + a - b) % 7;

    return moment({year: year, month: (c / 31 | 0) - 1, day: c % 31 + 1});

    // To get Month & Day in 23 total arithmetic operations, use:
    //   c = 148 - b - ((year * 5 / 4 | 0) + a - b) % 7;
    //   Month = (c / 31 | 0);
    //   Day = c % 31 + 1;

    // The coefficients in the formula for A were chosen so that both of
    // these equations would hold:
    //
    //   a / 25 % 30 == ((y / 100 * 17 + 11) / 25 - y / 400 + 16) % 30
    //   a % 7 == (y / 400 + y / 100 * 6 + 2) % 7

    // As a result, the formulae for B and the return value are
    // equivalent to:
    //
    // b = ( 29 * 11 * (15 + y % 19 * 19
    //                     + y / 100 - y / 400
    //                     - (   (y / 100 + 25 - 14) * 8 / 25
    //                         - (          25 - 14) * 8 / 25)
    //                     + 1)
    //       - 1 - y % 19)
    //     % (30 * 29 * 11) / (30 * 11)
    // return 28 + b - (2 + b + y + y / 4 - y / 100 + y / 400) % 7

    // B represents the date of the Paschal Full Moon, ranging from 0
    // for March 21st to 28 for April 18th.
    //
    // Here are some pertinent facts about the constants in these
    // formulae:
    //
    // 400 is the number of years in the cycle of solar corrections.
    // 100 is the number of years between solar or lunar corrections.
    //  30 is the number of different epacts (not distinguishing xxv and 25).
    //  29 is the number of different Paschal Full Moon dates.
    //  28 is the day of March one week after the equinox.
    //  25 is the number of centuries in the cycle of lunar corrections.
    //  19 is the number of years in the Metonic cycle.
    //  19 is also the ordinary decrement from one year's epact to the next.
    //  15 is the number of days after the equinox that the Paschal
    //     Full Moon falls, in the year zero.
    //  14 is one hundredth of the year at the start of the first span of
    //     four centuries between lunar corrections.
    //  11 is the number of golden numbers for which epact xxv/25 maps to
    //     a Paschal Full Moon date of April 18th rather than April 17th.
    //   8 is the number of lunar corrections per 25 centuries.
    //   7 is the number of days in the week.
    //   4 is the number of years in the uncorrected leap year cycle.
    //   2 is the number of days that are after the first Sunday after the
    //     equinox, but on or before March 28, in the year zero.

    // Implementation limits:

    // In C and other languages and systems with ordinary fixed-width
    // 32-bit unsigned integer arithmetic, the function fails due to
    // overflow at year 58,714,311, and with 64-bit integers, it fails
    // at year 252,188,329,394,345,111.  In either case, if a "y = y %
    // 5700000" line is added at the start of the function, then correct
    // results will be returned for all possible inputs.

    // In ECMAscript/javascript: the language has no integer division
    // operator, and non-integer division results must somehow be
    // rounded down.  If division results are truncated by using a
    // bitwise logical operation (e.g. "|0") to cause an internal
    // floating-point-to-integer conversion, then the first year for
    // which the function fails is 1,717,986,919, which is when (y * 5 /
    // 4) first exceeds the 31-bit range for unsigned logical integer
    // values.  If division results are truncated using the Math.floor
    // function, then first failure comes at year 123,138,832,709,500,
    // shortly after the sum in the B formula first exceeds the 53-bit
    // positive range over which IEEE 64-bit floating point values have
    // integer precision.  In either case, if a "y = y % 5700000" line
    // is added at the start of the function, then the correct result
    // will be returned for any input that is a non-negative integer.
};

moment.fn.easter = function () {
    return moment.easter(this.year());
};

});
define('calendar',['moment','moment.easter'], function(moment){
'use strict';
//from https://en.wikipedia.org/wiki/General_Roman_Calendar_of_1960
//rank:5 is commemoration
  var romanCalendar = [
    {//January
      "1": {title:"Octave of the Nativity of the Lord", rank:1},
      "5": {title:"Commemoration of St. Telesphorus Pope and Martyr", rank:5},
      "6": {title:"On the Epiphany of the Lord", rank:1},
      "11": {title:"Commemoration of St. Hyginus Pope and Martyr", rank:5},
      // not lord:1, because on a Sunday, 13 January is the Holy Family
      "13": {title:"On the Commemoration of the Baptism of our Lord Jesus Christ", rank:2},
      "14": {title:"St. Hilary Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Felix Priest and Martyr"},
      "15": {title:"St. Paul first hermit, Confessor", rank:3, com:"St. Maurus Abbot"},
      "16": {title:"St. Marcellus I Pope and Martyr", rank:3},
      "17": {title:"St. Anthony Abbot", rank:3},
      "18": {title:"Commemoration of St. Prisca Virgin and Martyr", rank:5},
      "19": {title:"Commemoration of Ss. Marius, Martha, Audifax, and Abachum Martyrs", rank:5, com:"St. Canute, Martyr"},
      "20": {title:"Ss. Fabian Pope and Sebastian Martyrs", rank:3},
      "21": {title:"St. Agnes, Virgin and Martyr", rank:3},
      "22": {title:"Ss. Vincent and Anastasius Martyrs", rank:3},
      "23": {title:"St. Raymund of Peñafort Confessor", rank:3, com:"St. Emerentiana Virgin and Martyr"},
      "24": {title:"St. Timothy Bishop and Martyr", rank:3},
      "25": {title:"On the Conversion of St. Paul Apostle", rank:3, com:"St. Peter Apostle"},
      "26": {title:"St. Polycarp Bishop and Martyr", rank:3},
      "27": {title:"St. John Chrysostom Bishop, Confessor, and Doctor of the Church", rank:3},
      "28": {title:"St. Peter Nolasco Confessor", rank:3, com:"St. Agnes, Virgin and Martyr second"},
      "29": {title:"St. Francis de Sales Bishop, Confessor, and Doctor of the Church", rank:3},
      "30": {title:"St. Martina Virgin and Martyr", rank:3},
      "31": {title:"St. John Bosco Confessor", rank:3}
    },

    {//February
      "1": {title:"St. Ignatius Bishop and Martyr", rank:3},
      "2": {title:"On the Purification of the Blessed Virgin Mary", rank:2, lord:1, ol:1},
      "3": {title:"Commemoration of St. Blase Bishop and Martyr", rank:5},
      "4": {title:"St. Andrew Corsini Bishop and Confessor", rank:3},
      "5": {title:"St. Agatha Virgin and Martyr", rank:3},
      "6": {title:"St. Titus Bishop and Confessor", rank:3, com:"St. Dorothy Virgin and Martyr"},
      "7": {title:"St. Romuald Abbot", rank:3},
      "8": {title:"St. John of Matha Confessor", rank:3},
      "9": {title:"St. Cyril Bishop of Alexandria, Confessor, and Doctor of the Church", rank:3, com:"St. Apollonia Virgin and Martyr"},
      "10": {title:"St. Scholastica Virgin", rank:3},
      "11": {title:"On the Apparition of the Blessed Virgin Mary Immaculate", rank:3, ol:1},
      "12": {title:"The Seven Holy Founders of the Order of Servants of the Blessed Virgin Mary Confessors", rank:3},
      "14": {title:"Commemoration of St. Valentine Priest and Martyr", rank:5},
      "15": {title:"Commemoration of Ss.Faustinus and Jovita Martyrs", rank:5},
      "18": {title:"Commemoration of St. Simeon Bishop and Martyr", rank:5},
      "22": {title:"Chair of St. Peter", rank:2, com:"St. Paul"},
      "23": {title:"St. Peter Damian Confessor", rank:3},
      "24": {title:"St. Matthias Apostle", rank:2, plusOne:"ifLeapYear"},
      "27": {title:"St. Gabriel of Our Lady of Sorrows", rank:3, plusOne:"ifLeapYear"},
      //In leap year the month of February is of 29 days, and the feast of St. Matthias is celebrated on the 25th day and the feast of St. Gabriel of Our Lady of Sorrows on the 28th day of February, and twice is said Sexto Kalendas, that is on the 24th and 25th; and the dominical letter, which was taken up in the month of January, is changed to the preceding; that, if in January, the dominical letter was A, it is changed to the preceding, which is g, etc.; and the letter f is kept twice, on the 24th and 25th.[2]
    },

    {//March
      "4": {title:"St. Casimir Confessor", rank:3, com:"St. Lucius I Pope and Martyr"},
      "6": {title:"Ss. Perpetua and Felicity Martyrs", rank:3},
      "7": {title:"St. Thomas Aquinas Confessor and Doctor of the Church", rank:3},
      "8": {title:"St. John of God Confessor", rank:3},
      "9": {title:"St. Frances of Rome, Widow", rank:3},
      "10": {title:"The Forty Holy Martyrs", rank:3},
      "12": {title:"St. Gregory I Pope, Confessor, and Doctor of the Church", rank:3},
      "17": {title:"St. Patrick Bishop and Confessor", rank:3},
      "18": {title:"St.Cyril Bishop of Jerusalem, Confessor, and Doctor of the Church", rank:3},
      "19": {title:"St. Joseph, Spouse of the Blessed Virgin Mary, Confessor, and Patron of the Universal Church", rank:1, plusOne:"ifSunday"},
      "21": {title:"St. Benedict Abbot", rank:3},
      "24": {title:"St. Gabriel the Archangel", rank:3},
      "25": {title:"Annunciation of the Blessed Virgin Mary", rank:1, ol:1, plusOne:"ifSunday"},
      "27": {title:"St. John Damascene Confessor and Doctor of the Church", rank:3},
      "28": {title:"St. John Capistran Confessor", rank:3}
    },

    {//April
      "2": {title:"St. Francis of Paula Confessor", rank:3},
      "4": {title:"St. Isidore Bishop, Confessor, and Doctor of the Church", rank:3},
      "5": {title:"St. Vincent Ferrer Confessor", rank:3},
      "11": {title:"St. Leo I Pope, Confessor, and Doctor of the Church", rank:3},
      "13": {title:"St. Hermenegild Martyr", rank:3},
      "14": {title:"St. Justin", rank:3, com:"Saints Tiburtius, Valerian and Maximus Martyrs"},
      "17": {title:"Commemoration of St. Anicetus Pope and Martyr", rank:5},
      "21": {title:"St. Anselm Bishop, Confessor, and Doctor of the Church", rank:3},
      "22": {title:"Ss. Soter and Cajus Popes and Martyrs", rank:3},
      "23": {title:"Commemoration of St. George Martyr", rank:5},
      "24": {title:"St. Fidelis of Sigmaringen Martyr", rank:3},
      "25": {title:"Greater Litany. - St. Mark Evangelist", rank:2},
      "26": {title:"Ss. Cletus and Marcellinus Popes and Martyrs", rank:3},
      "27": {title:"St. Peter Canisius Confessor and Doctor of the Church", rank:3},
      "28": {title:"St. Paul of the Cross Confessor", rank:3},
      "29": {title:"St. Peter Martyr", rank:3},
      "30": {title:"St. Catherine of Siena Virgin", rank:3}
    },

    {//May
      "1": {title:"St. Joseph the Workman, Spouse of the Blessed Virgin Mary, Confessor", rank:1},
      "2": {title:"St. Athanasius, Bishop, Confessor, and Doctor of the Church", rank:3},
      "3": {title:"Commemoration of Ss. Alexander, Eventius and Theodulus Martyrs, and Juvenal, Bishop and Confessor", rank:5},
      "4": {title:"St. Monica, Widow", rank:3},
      "5": {title:"St. Pius V Pope and Confessor", rank:3},
      "7": {title:"St. Stanislaus Bishop and Martyr", rank:3},
      "9": {title:"St. Gregory Nazianzen Bishop, Confessor, and Doctor of the Church", rank:3},
      "10": {title:"St. Antoninus Bishop and Confessor", rank:3, com:"Ss. Gordian and Epimachus"},
      "11": {title:"Ss. Philip and James Apostles", rank:2},
      "12": {title:"Ss. Nereus, Achilleus, Domitilla Virgin, and Pancras Martyrs", rank:3},
      "13": {title:"St. Robert Bellarmine Bishop, Confessor, and Doctor of the Church", rank:3},
      "14": {title:"Commemoration of St. Boniface Martyr", rank:5},
      "15": {title:"St. John Baptist de la Salle Confessor", rank:3},
      "16": {title:"St. Ubald Bishop and Confessor", rank:3},
      "17": {title:"St. Paschal Baylon Confessor", rank:3},
      "18": {title:"St. Venantius Martyr", rank:3},
      "19": {title:"St. Peter Celestine Pope and Confessor", rank:3, com:"St. Pudentiana Virgin"},
      "20": {title:"St. Bernardine of Siena Confessor", rank:3},
      "25": {title:"St. Gregory VII Pope and Confessor", rank:3, com:"St. Urban I Pope and Martyr"},
      "26": {title:"St. Philip Neri Confessor", rank:3, com:"St. Eleutherius Pope and Martyr"},
      "27": {title:"St. Bede the Venerable Confessor and Doctor of the Church", rank:3, com:"St. John I Pope and Martyr"},
      "28": {title:"St. Augustine Bishop and Confessor", rank:3},
      "29": {title:"St. Mary Magdalen de Pazzi Virgin", rank:3},
      "30": {title:"Commemoration of St. Felix I Pope and Martyr", rank:5},
      "31": {title:"Blessed Virgin Mary, Queen", rank:2, ol:1, com:"St. Petronilla Virgin"}
    },

    {//June
      "1": {title:"St. Angela Merici Virgin", rank:3},
      "2": {title:"Commemoration of Ss. Marcellinus, Peter, and Erasmus Bishop, Martyrs", rank:5},
      "4": {title:"St. Francis Caracciolo Confessor", rank:3},
      "5": {title:"St. Boniface Bishop and Martyr", rank:3},
      "6": {title:"St. Norbert Bishop and Confessor", rank:3},
      "9": {title:"Commemoration of Ss. Primus and Felician Martyrs", rank:5},
      "10": {title:"St. Margaret Queen, Widow", rank:3},
      "11": {title:"St. Barnabas Apostle", rank:3},
      "12": {title:"St. John of San Facundo Confessor", rank:3, com:"Ss. Basilides, Cyrinus, Nabor and Nazarius Martyrs"},
      "13": {title:"St. Anthony of Padua Confessor", rank:3},
      "14": {title:"St. Basil the Great Bishop, Confessor, and Doctor of the Church", rank:3},
      "15": {title:"Commemoration of Ss. Vitus, Modestus, and Crescentia Martyrs", rank:5},
      "17": {title:"St. Gregory Barbarigo Bishop and Confessor", rank:3},
      "18": {title:"St. Ephraem Syrus Deacon, Confessor, and Doctor of the Church", rank:3, com:"Ss. Mark and Marcellianus Martyrs"},
      "19": {title:"St. Juliana Falconieri Virgin", rank:3, com:"Ss. Gervase and Protase Martyrs"},
      "20": {title:"Commemoration of St. Silverius Pope and Martyr", rank:5},
      "21": {title:"St. Aloysius Gonzaga Confessor", rank:3},
      "22": {title:"St. Paulinus Bishop and Confessor", rank:3},
      "23": {title:"Vigil", rank:2},
      "24": {title:"On the Nativity of St. John the Baptist", rank:1},
      "25": {title:"St. William Abbot", rank:3},
      "26": {title:"Ss. John and Paul Martyrs", rank:3},
      "28": {title:"Vigil", rank:2},
      "29": {title:"Ss. Peter and Paul Apostles", rank:1},
      "30": {title:"On the Commemoration of St. Paul Apostle", rank:3, com:"St. Peter Apostle"}
    },

    {//July
      "1": {title:"The Most Precious Blood of our Lord Jesus Christ", rank:1},
      "2": {title:"On the Visitation of the Blessed Virgin Mary", rank:2, ol:1, com:"Ss. Processus and Martinian Martyrs"},
      "3": {title:"St. Irenaeus Bishop and Martyr", rank:3},
      "5": {title:"St. Anthony Mary Zaccaria Confessor", rank:3},
      "7": {title:"Ss. Cyril and Methodius Bishops and Confessors", rank:3},
      "8": {title:"St. Elizabeth Queen, Widow", rank:3},
      "10": {title:"The Seven Holy Brothers Martyrs, and Ss. Rufina and Secunda Virgins and Martyrs", rank:3},
      "11": {title:"Commemoration of St. Pius I Pope and Martyr", rank:5},
      "12": {title:"St. John Gualbert Abbot", rank:3, com:"Ss. Nabor and Felix Martyrs"},
      "14": {title:"St. Bonaventure Bishop, Confessor, and Doctor of the Church", rank:3},
      "15": {title:"St. Henry II Emperor, Confessor", rank:3},
      "16": {title:"Commemoration of the Blessed Virgin Mary of Mt. Carmel", rank:5},
      "17": {title:"Commemoration of St. Alexius Confessor", rank:5},
      "18": {title:"St. Camillus de Lellis Confessor", rank:3, com:"St. Symphorosa and her seven Sons Martyrs"},
      "19": {title:"St. Vincent de Paul Confessor", rank:3},
      "20": {title:"St. Jerome Emiliani Confessor", rank:3, com:"St. Margaret Virgin Martyr"},
      "21": {title:"St. Lawrence of Brindisi Confessor and Doctor of the Church", rank:3, com:"St. Praxedes Virgin"},
      "22": {title:"St. Mary Magdalene Penitent", rank:3},
      "23": {title:"St. Apollinaris Martyr", rank:3, com:"St. Liborius Bishop and Confessor"},
      "24": {title:"Commemoration of St. Christina Virgin and Martyr"},
      "25": {title:"St. James Apostle", rank:2, com:"St. Christopher Martyr"},
      "26": {title:"St. Anne Mother of the Blessed Virgin Mary", rank:2},
      "27": {title:"Commemoration of St. Pantaleon Martyr", rank:5},
      "28": {title:"Ss. Nazarius and Celsus Martyrs, Victor I Pope and Martyr, and St. Innocent I Pope and Confessor", rank:3},
      "29": {title:"St. Martha Virgin", rank:3, com:"Ss. Felix, Simplicius, Faustinus, and Beatrice Martyrs"},
      "30": {title:"Commemoration of Ss. Abdon and Sennen Martyrs", rank:5},
      "31": {title:"St. Ignatius Confessor", rank:3}
    },

    {//August
      "1": {title:"Commemoration of the Holy Machabees Martyrs", rank:5},
      "2": {title:"St. Alphonsus Mary of Liguori Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Stephen I Pope and Martyr"},
      "4": {title:"St. Dominic Confessor, Greater", rank:3},
      "5": {title:"On the Dedication of Our Lady of the Snows", rank:3, ol:1},
      "6": {title:"On the Transfiguration of our Lord Jesus Christ", rank:2, lord:1, com:"Ss. Xystus II Pope, Felicissimus, and Agapitus Martyrs"},
      "7": {title:"St. Cajetan Confessor", rank:3, com:"St. Donatus Bishop and Martyr"},
      "8": {title:"St. John Mary Vianney Confessor and Priest", rank:3, com:"Ss. Cyriacus, Largus, and Smaragdus Martyrs"},
      "9": {title:"Vigil", rank:3, com:"St. Romanus Martyr"},
      "10": {title:"St. Laurence Martyr", rank:2},
      "11": {title:"Commemoration of Ss. Tiburtius and Susanna Virgin, Martyrs", rank:5},
      "12": {title:"St. Clare Virgin", rank:3},
      "13": {title:"Commemoration of Ss. Hippolytus and Cassian Martyrs", rank:5},
      "14": {title:"Vigil", rank:2, com:"St. Eusebius Confessor"},
      "15": {title:"On the Assumption of the Blessed Virgin Mary", rank:1, ol:1},
      "16": {title:"St. Joachim Father of the Blessed Virgin Mary, Confessor", rank:2},
      "17": {title:"St. Hyacinth of Poland Confessor", rank:3},
      "18": {title:"Commemoration of St. Agapitus Martyr", rank:5},
      "19": {title:"St. John Eudes Confessor", rank:3},
      "20": {title:"St. Bernard Abbot and Doctor of the Church", rank:3},
      "21": {title:"St. Jane Frances de Chantal, Widow", rank:3},
      "22": {title:"Immaculate Heart of the Blessed Virgin Mary", rank:2, ol:1, com:"Ss. Timothy and Companions Martyrs"},
      "23": {title:"St. Philip Benizi Confessor", rank:3},
      "24": {title:"St. Bartholomew Apostle", rank:2},
      "25": {title:"St. Louis King, Confessor", rank:3},
      "26": {title:"Commemoration of St. Zephyrinus Pope Martyr", rank:5},
      "27": {title:"St. Joseph Calasanctius Confessor", rank:3},
      "28": {title:"St. Augustine Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Hermes Martyr"},
      "29": {title:"On the Beheading of St. John the Baptist", rank:3, com:"St. Sabina Martyr"},
      "30": {title:"St. Rose of Lima Virgin", rank:3, com:"Ss. Felix and Adauctus Martyrs"},
      "31": {title:"St. Raymond Nonnatus Confessor", rank:3}
    },

    {//September
      "1": {title:"Commemoration of St. Giles Abbot", rank:"Comm", com:"the Holy Twelve Brothers Martyrs"},
      "2": {title:"St. Stephen King, Confessor", rank:3},
      "3": {title:"St. Pius X Pope and Confessor", rank:3},
      "5": {title:"St. Laurence Justinian Bishop and Confessor", rank:3},
      "8": {title:"On the Nativity of the Blessed Virgin Mary", rank:2, ol:1, com:"St. Hadrian Martyr"},
      "9": {title:"Commemoration of St. Gorgonius Martyr", rank:5},
      "10": {title:"St. Nicholas of Tolentino Confessor", rank:3},
      "11": {title:"Commemoration of Ss. Protus and Hyacinth Martyrs", rank:5},
      "12": {title:"The Most Holy Name of Mary", rank:3, ol:1},
      "14": {title:"On the Exaltation of the Holy Cross", rank:2, lord:1},
      "15": {title:"Seven Sorrows of the Blessed Virgin Mary", rank:2, com:"St. Nicomedes Martyr"},
      "16": {title:"St. Cornelius Pope and St. Cyprian Bishop, Martyrs", rank:3, com:"Ss. Euphemia Virgin, Lucy and Geminianus Martyrs"},
      "17": {title:"Commemoration of the Impression of the sacred Stigmata of St. Francis Confessor", rank:5},
      "18": {title:"St. Joseph of Cupertino Confessor", rank:3},
      "19": {title:"St. Januarius Bishop and Companions Martyrs", rank:3},
      "20": {title:"Commemoration of St. Eustace and Companions Martyrs", rank:5},
      "21": {title:"St. Matthew Apostle and Evangelist", rank:2},
      "22": {title:"St. Thomas of Villanova Bishop and Confessor", rank:3, com:"Ss. Maurice and Companions Martyrs"},
      "23": {title:"St. Linus Pope and Martyr", rank:3, com:"St. Thecla Virgin and Martyr"},
      "24": {title:"Commemoration of Our Lady of Ransom", rank:5, ol:1},
      "26": {title:"Commemoration of Ss. Cyprian and Justina Virgin, Martyrs", rank:5},
      "27": {title:"Ss. Cosmas and Damian Martyrs", rank:3},
      "28": {title:"St. Wenceslaus Duke, Martyr", rank:3},
      "29": {title:"On the Dedication of St. Michael Archangel", rank:1},
      "30": {title:"St. Jerome Priest, Confessor, and Doctor of the Church", rank:3}
    },

    {//October
      "1": {title:"Commemoration of St. Remigius Bishop and Confessor", rank:5},
      "2": {title:"The Holy Guardian Angels, Greater", rank:3},
      "3": {title:"St. Teresa of the Child Jesus Virgin", rank:3},
      "4": {title:"St. Francis of Assisi Confessor", rank:3},
      "5": {title:"Commemoration of St. Placid and companions Martyrs", rank:5},
      "6": {title:"St. Bruno Confessor", rank:3},
      "7": {title:"Blessed Virgin Mary of the Rosary", rank:2, ol:1, com:"St. Mark Pope and Confessor"},
      "8": {title:"St. Bridget, Widow", rank:3, com:"Ss. Sergius, Bacchus, Marcellus and Apuleius Martyrs"},
      "9": {title:"St. John Leonard Confessor", rank:3, com:"St. Denis Bishop, Rusticus Priest, and Eleutherius Martyrs"},
      "10": {title:"St. Francis Borgia Confessor", rank:3},
      "11": {title:"The Maternity of the Blessed Virgin Mary", rank:2, ol:1},
      "13": {title:"St. Edward King, Confessor", rank:3},
      "14": {title:"St. Callistus I Pope and Martyr", rank:3},
      "15": {title:"St. Teresa Virgin", rank:3},
      "16": {title:"St. Hedwig, Widow", rank:3},
      "17": {title:"St. Margaret Mary Alacoque Virgin", rank:3},
      "18": {title:"St. Luke Evangelist", rank:2},
      "19": {title:"St. Peter of Alcantara Confessor", rank:3},
      "20": {title:"St. John Cantius Confessor", rank:3},
      "21": {title:"Commemoration of St. Hilarion Abbot", rank:5, com:"St. Ursula and Companions Virgins and Martyrs"},
      "23": {title:"St. Anthony Mary Claret Bishop and Confessor", rank:3},
      "24": {title:"St. Raphael Archangel", rank:3},
      "25": {title:"Commemoration of Ss. Chrysanthus and Daria Martyrs", rank:5},
      "26": {title:"Commemoration of St. Evaristus Pope and Martyr", rank:5},
      "28": {title:"Ss. Simon and Jude Apostles", rank:2}
    },

    {//November
      "1": {title:"All Saints", rank:1},
      "2": {title:"On the Commemoration of all the Faithful Departed", rank:1, plusOne:"ifSunday"},
      "4": {title:"St. Charles Bishop and Confessor", rank:3, com:"Ss. Vitalis and Agricola Martyrs"},
      "8": {title:"Commemoration of the Holy Four Crowned Martyrs", rank:5},
      "9": {title:"On the Dedication of the Archbasilica of the most Holy Saviour", rank:2, lord:1, com:"St. Theodore Martyr"},
      "10": {title:"St. Andrew Avellino Confessor", rank:3, com:"Ss. Tryphon, Respicius, and Nympha Martyrs"},
      "11": {title:"St. Martin Bishop and Confessor", rank:3, com:"St. Mennas Martyr"},
      "12": {title:"St. Martin I Pope and Martyr", rank:3},
      "13": {title:"St. Didacus Confessor", rank:3},
      "14": {title:"St. Josaphat Bishop and Martyr", rank:3},
      "15": {title:"St. Albert the Great Bishop, Confessor, and Doctor of the Church", rank:3},
      "16": {title:"St. Gertrude Virgin", rank:3},
      "17": {title:"St. Gregory Thaumaturgus Bishop and Confessor", rank:3},
      "18": {title:"On the Dedication of the Basilicas of Ss. Peter and Paul", rank:3},
      "19": {title:"St. Elisabeth, Widow", rank:3, com:"St. Pontianus Pope and Martyr"},
      "20": {title:"St. Felix of Valois Confessor", rank:3},
      "21": {title:"On the Presentation of the Blessed Virgin Mary", rank:3, ol:1},
      "22": {title:"St. Cecilia Virgin and Martyr", rank:3},
      "23": {title:"St. Clement I Pope and Martyr", rank:3, com:"St. Felicitas Martyr"},
      "24": {title:"St. John of the Cross Confessor and Doctor of the Church", rank:3, com:"St. Chrysogonus Martyr"},
      "25": {title:"St. Catherine Virgin and Martyr", rank:3},
      "26": {title:"St. Sylvester Abbot", rank:3, com:"St. Peter of Alexandria Bishop and Martyr"},
      "29": {title:"Commemoration of St. Saturninus", rank:5},
      "30": {title:"St. Andrew Apostle", rank:2}
    },

    {//December
      "2": {title:"St. Bibiana Virgin and Martyr", rank:3},
      "3": {title:"St. Francis Xavier Confessor", rank:3},
      "4": {title:"St. Peter Chrysologus Bishop, Confessor, and Doctor of the Church", rank:3, com:"St. Barbara Virgin and Martyr"},
      "5": {title:"Commemoration of St. Sabbas Abbot", rank:5},
      "6": {title:"St. Nicholas Bishop and Confessor", rank:3},
      "7": {title:"St. Ambrose Bishop, Confessor, and Doctor of the Church", rank:3},
      "8": {title:"On the Immaculate Conception of the Blessed Virgin Mary", rank:1, ol:1, overFirstClassSunday:1},
      "10": {title:"Commemoration of St. Melchiades Pope and Martyr", rank:5},
      "11": {title:"St. Damasus I Pope and Confessor", rank:3},
      "13": {title:"St. Lucy Virgin and Martyr", rank:3},
      "16": {title:"St. Eusebius Bishop and Martyr", rank:3},
      "21": {title:"St. Thomas Apostle", rank:2},
      "24": {title:"Vigil", rank:1, overFirstClassSunday:1},
      "25": {title:"On the Nativity of our Lord Jesus Christ", rank:1, com:"St. Anastasia Martyr"},
      "26": {title:"St. Stephen Protomartyr", rank:2},
      "27": {title:"St. John Apostle and Evangelist", rank:2},
      "28": {title:"The Holy Innocents", rank:2},
      "29": {title:"Of the V day within the octave of the Nativity of the Lord", rank:2, com:"St. Thomas Bishop and Martyr"},
      "30": {title:"Of the VI day within the Octave of the Nativity", rank:2},
      "31": {title:"Of the VII day within the Octave of the Nativity", rank:2, com:"St. Sylvester I Pope and Confessor"}
    }
  ];
///Sunday between 01/01 and 01/06, or, with this lacking, 2 January:: The most holy Name of Jesus, II class
///I Sunday after 01/06: The most holy Family of Jesus, Mary, Joseph, II class

///"Friday after the I Sunday in Passiontide": Commemoration of the Seven Sorrows of the Blessed Virgin Mary, Comm

///"Last Sunday in October": Our Lord Jesus Christ the King, I class
  var weeksBetween = function(a,b) {
    if(typeof(a)=='string') {
      a = momentFromString(a,b);
    }
    return Math.round(moment.duration(b - a).asDays())/7;
  };
  // A Sunday's office is marked sunday:1, unless a feast takes its place (isFeast), so that firstClassFeast can
  // tell a I class feast from a I class Sunday.
  var SundayFeast = function(SundayObject,date,dates) {
    if(SundayObject.feast) return SundayObject.feast;
    var result = {
      title: SundayObject.title.replace(/%([a-z])/g, function(match,callback) {
        return SundayObject[callback](date,dates);
      }),
      key: SundayObject.title.replace(/%([a-z])/g, function(match,callback) {
        return SundayObject[callback](date,dates);
      }),
      rank: (SundayObject.r ? SundayObject.r(date,dates) : SundayObject.rank) || 2
    };
    if(!(SundayObject.isFeast && SundayObject.isFeast(date,dates))) result.sunday = 1;
    return result;
  };
  var CalendarSundays = [
    { on: '01/01', feast: romanCalendar[0][1], key: 'jan1' },
    { before: '01/06', title: 'The Most Holy Name of Jesus', key: 'nat2', isFeast: function() { return true; }},
    { on: '01/06', feast: romanCalendar[0][6], key: 'epi'},
    { before: 'septuagesima', title: '%t', key: 'epi%n', n: function(date,dates) {return Math.ceil(weeksBetween('epiphany', date)); },
      t: function(date,dates) {
        // the I Sunday after Epiphany is the feast of the Holy Family
        var n = this.n(date,dates);
        return n === 1 ? 'The Most Holy Family of Jesus, Mary, Joseph' : n + '. Sunday after Epiphany';
      }, isFeast: function(date,dates) {
        return this.n(date,dates) === 1;
      }},
    { before: 'lent1', title: '%tgesima', key: '%t', t: function(date,dates) {return (['Septua','Sexa','Quinqua'])[weeksBetween('septuagesima', date)]; }},
    { before: 'easter', title: '%t', rank: 1, key: 'quad%n', n: function(date, dates) {
      return 1 + weeksBetween('lent1', date);
    }, t: function(date, dates) {
        var weeksSinceLent1 = weeksBetween('lent1', date);
        switch(weeksSinceLent1) {
          case 0:
          case 1:
          case 2:
          case 3: return (weeksSinceLent1+1) + '. Sunday of Lent';
          case 4: return 'Passion Sunday';
          case 5: return 'Palm Sunday';
        }
      }
    },
    { on: 'easter', title: 'Easter Sunday', rank: 1, key: 'pasc0' },
    { before: 'ascension', title: '%n. Sunday after Easter', key: 'pasc%n', n: function(date,dates) { return weeksBetween('easter', date); },
      // Low Sunday is I class
      r: function(date,dates) { if(weeksBetween('easter', date) === 1) return 1; }},
    { before: 'pentecost', title: 'Sunday After the Ascension', key: 'pasc6'},
    { on: 'pentecost', title: 'Pentecost', rank: 1, key: 'pent0' },
    { before: 'advent1', title: '%t', key: '%k', k: function(date,dates) {
      var weeksSincePentecost = weeksBetween('pentecost', date);
      var weeksSinceLastWeekOfOctober = weeksBetween('10/25',date);
      if(weeksSinceLastWeekOfOctober>=0 && weeksSinceLastWeekOfOctober<1) return 'ChristusRex';
      return 'pent' + weeksSincePentecost;
    }, t: function(date,dates) {
      var weeksSincePentecost = weeksBetween('pentecost', date);
      if(weeksSincePentecost === 1) return 'Trinity Sunday';
      var weeksSinceLastWeekOfOctober = weeksBetween('10/25',date);
      if(weeksSinceLastWeekOfOctober>=0 && weeksSinceLastWeekOfOctober<1) return 'Our Lord Jesus Christ the King';
      return weeksSincePentecost + '. Sunday after Pentecost';
    }, r: function(date,dates) {
      // Trinity Sunday and Christ the King are I class feasts
      if(dateMatches(date, 'pentecost+7 christTheKing')) return 1;
    }, isFeast: function(date,dates) {
      return this.r(date,dates) === 1;
    }},
    { before: '12/25', title: '%n. Sunday of Advent', rank: 1, key: 'adv%n', n: function(date,dates) { return weeksBetween('advent1', date) + 1; }},
    { on: '12/25', feast: romanCalendar[11][25], key: ['NatMD','NatMane','NatInterdiu']},
    { after: '12/25', title: 'Sunday within the Octave of Christmas', key:'nat1'}
  ];

  romanCalendar.regionCodeMap = {
    "US": "United States",
    "CA": "Canada",
    "GB-ENG": "England",
    "GB-SCT": "Scotland",
    "GB-WLS": "Wales",
    "AU": "Australia and New Zealand",
    "NZ": "Australia and New Zealand"
  };

  // regional calendars:
  var regionalCalendars = {
    "United States": {
      "12/08": {title:"On the Immaculate Conception of the Blessed Virgin Mary, Principal Patroness of the United States", rank:1, ol:1, overFirstClassSunday:1},
      "12/12": {title:"Our Lady of Guadalupe, Patroness of the Americas", rank:3, ol:1},
      "01/04": {title:"St. Elizabeth Ann Seton, Widow", rank:3},
      "01/22": {title:"Votive Mass for Peace", rank:2, plusOne:"ifSunday"},
      "09/09": {title:"St. Peter Claver Confessor", rank:3, com:"St. Gorgonius Martyr"},
      "09/26": {title:"Ss. Jean, Isaac and Companions Martyrs", rank:3, com:"Ss. Cyprian and Justina, Virgin, Martyrs"},
      "10/25": {title:"St. Isidore Farmer and Confessor", rank:3, com:"Ss. Chrysanthus and Daria Martyrs"},
      "11/13": {title:"St. Frances Xavier Cabrini Virgin", rank:3, com:"St. Didacus Confessor"},
    },
    "Australia and New Zealand": {
      "12/03": {title:"St. Francis Xavier Confessor, Principal Patron of All Missions", rank:1},
      "02/01": {title:"St. Brigid Virgin", rank:2, com:"St. Ignatius Bishop and Martyr"},
      "03/17": {title:"St. Patrick Bishop and Confessor", rank:1},
      "04/28": {title:"St. Peter Aloysius Mary Chanel Martyr", rank:3, com:"St. Paul of the Cross Confessor"},
      "05/24": {title:"Our Lady, Help of Christians, Principal Patroness of Australia and New Zealand", rank:1, ol:1},
      "06/09": {title:"St. Columba Abbot", rank:3, com:"Ss. Primus and Felician Martyrs"},
      "07/11": {title:"St. Oliver Plunkett Bishop and Martyr", rank:3, com:"St. Pius I Pope and Martyr"},
      "10/03": {title:"St. Teresa, Virgin, Principal Patroness of All Missions", rank:1}
    },
    "Canada": {
      "12/12": {title:"Our Lady of Guadalupe, Patroness of the Americas", rank:3, ol:1},
      "03/19": {title:"St. Joseph, Spouse of the Blessed Virgin Mary and Confessor, Principal Patron of Canada", rank:1},
      "09/26": {title:"Ss. Jean, Isaac and Companions Martyrs", rank:3, com:"Ss. Cyprian and Justina Virgin, Martyrs"},
      "10/19": {title:"The North American Martyrs, Secondary Patrons of Canada", rank:2, com:"St. Peter of Alcantara Confessor"}
    },
    "England": {
      "12/29": {title:"St. Thomas Bishop and Martyr", rank:1, com:"the V day within the octave of the Nativity of the Lord"},
      "03/12": {title:"St. Gregory I Pope, Confessor and Doctor of the Church", rank:2},
      "04/23": {title:"St. George Martyr, Principal Patron of England", rank:1},
      "05/04": {title:"The Holy Martyrs of England and Wales", rank:3, com:"St. Monica, Widow"},
      "05/26": {title:"St. Augustine Bishop and Confessor", rank:2, com:"St. Philip Neri Confessor"},
      "06/22": {title:"St. Alban Martyr", rank:3, com:"St. Paulinus Bishop and Confessor"},
      "07/09": {title:"Ss. John Fisher Bishop and Thomas More Martyrs", rank:1},
      "10/13": {title:"St. Edward King and Confessor", rank:2},
    },
    "Scotland": {
      "11/30": {title:"St. Andrew Apostle, Principal Patron of Scotland", rank:1},
      "01/14": {title:"St. Kentigern Bishop and Confessor", rank:3, com:["St. Hilary Bishop, Confessor and Doctor of the Church", "St. Felix Priest and Martyr"]},
      "03/10": {title:"St. John Ogilvie Martyr", rank:2, com:"the Forty Holy Martyrs"},
      "03/17": {title:"St. Patrick Bishop and Confessor", rank:2},
      "06/09": {title:"St. Columba Abbot", rank:3, com:"Ss. Primus and Felician Martyrs"},
      "09/16": {title:"St. Ninian Bishop and Confessor", rank:3, com:["St. Cornelius Pope and St. Cyprian Bishop, Martyrs", "Ss. Euphemia Virgin, Lucy and Geminianus Martyrs"]},
      "11/16": {title:"St. Margaret Queen, Secondary Patroness of Scotland", rank:2, com:"St. Gertrude Virgin"}
    },
    "Wales": {
      "12/29": {title:"St. Thomas Bishop and Martyr", rank:1, com:"the V day within the octave of the Nativity of the Lord"},
      "03/01": {title:"St. David Bishop and Confessor, Principal Patron of Wales", rank:1},
      "03/12": {title:"St. Gregory I Pope, Confessor and Doctor of the Church", rank:2},
      "04/23": {title:"St. George Martyr, Principal Patron of England", rank:2},
      "05/04": {title:"The Holy Martyrs of England and Wales", rank:3, com:"St. Monica, Widow"},
      "05/26": {title:"St. Augustine Bishop and Confessor", rank:2, com:"St. Philip Neri Confessor"},
      "06/22": {title:"St. Alban Martyr", rank:3, com:"St. Paulinus Bishop and Confessor"},
      "07/09": {title:"Ss. John Fisher Bishop and Thomas More Martyrs", rank:1},
      "07/17": {title:"Our Lady in Porticu", rank:3, ol:1, com:"St. Alexius Confessor"},
      "07/30": {title:"Bb. Edward Powell, Richard Featherstone and Companions Martyrs", rank:3, com:"Ss. Abdon and Sennen, Martyrs"},
      "08/03": {title:"St. Germanus Bishop and Confessor", rank:3},
      "09/25": {title:"St. Cadoc Bishop and Martyr", rank:3},
      "10/13": {title:"St. Edward King and Confessor", rank:2},
      "11/05": {title:"The Holy Relics", rank:3}
    }
  };

  var dateCache = {};
  var Dates = function(Y) {
    if(Y in dateCache) return dateCache[Y];
    this.year = Y;
    this.easter = moment.easter(Y);
    this.septuagesima = moment(this.easter).subtract(7*9,'days');
    this.lent1 = moment(this.septuagesima).add(7*3,'days');
    this.ascension = moment(this.easter).add(39,'days');
    this.pentecost = moment(this.easter).add(49,'days');
    this.christmas = moment([Y,11,25]);
    this.advent1 = moment(this.christmas).subtract((this.christmas.day() || 7) + 7*3,'days');
    this.allSouls = moment([Y,10,2]);
    if(this.allSouls.day() === 0) this.allSouls.add(1,'day');
    // Under Divino Afflatu, Compline of All Souls (DO's Sancti/11-02, or 11-03sec when it's moved from a
    // Sunday) is said the evening before it, after its First Vespers.
    if(rubrics === 'DA' && daCalendar) {
      for(var allSouls = moment([Y,9,31]); allSouls.month() === 9 || allSouls.date() <= 3; allSouls.add(1,'day')) {
        var da = getDAFeast(allSouls);
        if(da && /^Sancti\/11-0(2|3sec)$/.test(da.key)) {
          this.allSouls = moment(allSouls);
          break;
        }
      }
    }
    this.corpusChristi = moment(this.pentecost).add(11,'days');
    this.sacredHeart = moment(this.pentecost).add(19,'days');
    this.christTheKing = moment([Y,9,31]);
    this.christTheKing.subtract(this.christTheKing.day(),'days');
    this.sevenDolors = moment([Y,8,15]);
    this.epiphany = moment([Y,0,6]);
    // The Feast of the Holy Family is on the Sunday following Epiphany, so on 13 January when Epiphany is a Sunday.
    this.holyFamily = moment(this.epiphany).add(7 - (this.epiphany.day()), 'days');
    this.transfiguration = moment([Y,7,6]);
    this.stJoseph = moment([Y,2,19]);
    this.annunciation = moment([Y,2,25]);
    var offset = 0;
    if(this.isHolyWeekOrPaschalWeek(this.stJoseph)) {
      this.stJoseph = moment(this.easter).add(8 + offset, 'day');
      ++offset;
    } else if(this.stJoseph.day() == 0) {
      this.stJoseph.add(1, 'day');
    }
    this.stJoseph.feast = romanCalendar[2][19];
    if(this.isHolyWeekOrPaschalWeek(this.annunciation)) {
      this.annunciation = moment(this.easter).add(8 + offset, 'day');
    } else if(this.annunciation.day() == 0) {
      this.annunciation.add(1, 'day');
    }
    this.annunciation.feast = romanCalendar[2][25];
    dateCache[Y] = this;
  };
  function getSunday(date) {
    var dates = datesForMoment(date);
    for(var i = 0; i < CalendarSundays.length; ++i) {
      var test = CalendarSundays[i];
      if(test.on) {
        if(date.isSame(momentFromString(test.on,date))) {
          return SundayFeast(test,date,dates);
        }
      } else if(test.before) {
        if(date.isBefore(momentFromString(test.before,date))) {
          return SundayFeast(test,date,dates);
        }
      } else if(test.after) {
        if(date.isAfter(momentFromString(test.after,date))) {
          return SundayFeast(test,date,dates);
        }
      }
    }
  }
  // 1960 rubrics (General Rubrics 15 and the table of precedence): a I class Sunday gives way only to the
  // feasts marked overFirstClassSunday:1 (the Immaculate Conception and the Vigil of Christmas); a II class
  // Sunday gives way to every I class feast and to the II class feasts of the Lord (marked lord:1).  A feast
  // moved to Monday when it falls on a Sunday (All Souls) doesn't compete.
  function outranksSunday(feast, firstClassSunday) {
    if(!feast || feast.plusOne === 'ifSunday') return false;
    if(firstClassSunday) return !!feast.overFirstClassSunday;
    return feast.rank === 1 || (feast.rank === 2 && !!feast.lord);
  }
  // The Sunday, or the saint's day that outranks it.  Of a saint's day's regional alternates, only those that
  // outrank the Sunday are kept; elsewhere the Sunday is kept.
  function sundayOrFeast(date, sunday, feast) {
    var firstClassSunday = sunday.rank === 1;
    if(!feast.alternates) return outranksSunday(feast, firstClassSunday) ? feast : sunday;
    var alternates = $.grep(feast.alternates, function(alt, i) {
      return i === 0 || outranksSunday(alt, firstClassSunday);
    });
    if(!outranksSunday(alternates[0], firstClassSunday)) alternates[0] = sunday;
    var selected = $.inArray(feast, alternates) >= 0 ? feast : alternates[0];
    // a copy, so that the calendar's own entry keeps its weekday alternates
    selected = $.extend({}, selected);
    if(alternates.length > 1) selected.alternates = alternates;
    else delete selected.alternates;
    return selected;
  }
  function FeriaWithAlternates(alternates,selectedAlternate) {
    if(alternates && !alternates.length) alternates = undefined;
    var feria = {title:'Feria', rank: 10};
    var result = feria;
    if(alternates && alternates.length) {
      alternates.unshift(feria);
      if(selectedAlternate) {
        result = selectedAlternate;
      }
      result.alternates = alternates;
    }
    return result;
  }
  // Under the rubrics of Divino Afflatu, the office that Compline follows, from daCalendar (calendar-da.js, DO's
  // own calendar for each kind of year): its title, its rank (rankName, and as rank the class of 1960 that the
  // date tokens take it for), duplex, ol for a feast of Our Lady, first if Compline follows its First Vespers, and
  // psalms, the day whose psalms are said; preces, 1 if the preces are said after the Nunc dimittis, 2 if kneeling;
  // and hymn, the hymn's tone (te-lucis/<hymn>.gabc).  undefined in the one kind of year that never comes from
  // 1583 to 4099.
  function getDAFeast(date) {
    var Y = date.year();
    var codes = daCalendar.years[moment.easter(Y).format('MMDD') + (moment([Y]).isLeapYear() ? 'L' : '')];
    if(!codes) return;
    var A = daCalendar.ALPHABET, i = 4 * (date.dayOfYear() - 1);
    var o = A.indexOf(codes[i]) * 64 + A.indexOf(codes[i + 1]), office = daCalendar.offices[Math.floor(o / 3)];
    var v = A.indexOf(codes[i + 2]), rank = daCalendar.ranks[v >> 1];
    var feast = {title: office.title, key: office.key, rank: rank.cls, rankName: rank.rank, duplex: rank.duplex,
      psalms: office.psalms === 0 ? 0 : date.day(), preces: o % 3, hymn: daCalendar.hymns[A.indexOf(codes[i + 3])]};
    if(office.ol) feast.ol = 1;
    if(rank.sunday) feast.sunday = 1;
    if(v & 1) feast.first = 1;
    return feast;
  }
  function getFeastForDate(date,currentRegion) {
    if('feast' in date) return date.feast;
    if(rubrics === 'DA' && daCalendar) {
      var da = getDAFeast(date);
      if(da) return (date.feast = da);
    }
    if(date.day() === 0) {
      return (date.feast = sundayOrFeast(date, getSunday(date), getSanctoralFeast(date,currentRegion)));
    }
    if(dateMatches(date,'corpusChristi')) return (date.feast = {title:'Corpus Christi', rank:1, key: 'CorpusChristi'});
    if(dateMatches(date,'sacredHeart')) return (date.feast = {title:'The Most Sacred Heart of Jesus', rank:1, key: 'SCJ'});
    if(dateMatches(date,'ascension')) return (date.feast = {title:'The Ascension of Our Lord', rank:1, key: 'asc'});
    if(dateMatches(date,'easter-3')) return (date.feast = {title:'Maundy Thursday', rank:1});
    if(dateMatches(date,'easter-2')) return (date.feast = {title:'Good Friday', rank:1});
    if(dateMatches(date,'easter-1')) return (date.feast = {title:'Holy Saturday', rank:1});
    if(dateMatches(date,'lent1-4')) return (date.feast = {title:'Ash Wednesday', rank:5, key: 'AshWed'});
    // When Christmas is a Sunday, the Sunday within its octave (the last of CalendarSundays) is kept on 30 December,
    // as in DO's transfer table for dominical letter b.
    var dates = datesForMoment(date);
    if(dates.christmas.day() === 0 && dateMatches(date,'12/30')) {
      return (date.feast = SundayFeast(CalendarSundays[CalendarSundays.length - 1], date, dates));
    }
    return (date.feast = getSanctoralFeast(date,currentRegion));
  }
  function getSanctoralFeast(date,currentRegion) {
    var dates = datesForMoment(date);
    if(dates.annunciation.feast && dateMatches(date,'annunciation')) return dates.annunciation.feast;
    var isStJoseph = !!dates.stJoseph.feast && dateMatches(date,'stJoseph');
    var options = [];
    var selectedOption;
    if(regionalCalendars) {
      var key = date.format('MM/DD'),
          altKey = moment(date).subtract(1,'day').format('MM/DD');
      // A regional St. Joseph (Canada's) is moved with the universal feast, as DO's transfer tables move the one
      // 03-19 office out of Holy Week and off a Sunday.
      if(isStJoseph) key = altKey = '03/19';
      else if(key === '03/19') key = null;
      $.each(regionalCalendars, function(region, calendar){
        var option;
        if(key in calendar) {
          option = calendar[key];
        } else if(altKey in calendar) {
          var d = calendar[altKey];
          if(d.plusOne === 'ifSunday' && date.day()===1) option = d;
        }
        if(option) {
          // currentRegion is a region's name, or '' for the universal calendar; without it, the user's region
          var selectThisOption = (typeof currentRegion === 'string'? region === currentRegion :
              romanCalendar.regionCodeMap[localStorage.region] === region);
          option.region = [region];
          var sameFeast = $.grep(options, function(o,i){
            return o.title == option.title && o.rank === option.rank;
          });
          if(sameFeast.length) {
            sameFeast[0].region.push(region);
            if(selectThisOption) selectedOption = sameFeast[0];
          } else {
            options.push(option);
            if(selectThisOption) selectedOption = option;
          }
        }
      });
    }
    if(romanCalendar) {
      var month = date.month();
      var day = date.date();
      var d = isStJoseph? dates.stJoseph.feast : romanCalendar[month][day];
      if(!d) {
        if(day > 1) {
          d = romanCalendar[month][day-1];
          if(!d || !d.plusOne) return FeriaWithAlternates(options,selectedOption);
          else if(d.plusOne === 'ifLeapYear' && !date.isLeapYear()) return FeriaWithAlternates(options,selectedOption);
          else if(d.plusOne === 'ifSunday' && date.day()!==1) return FeriaWithAlternates(options,selectedOption);
        } else {
          return FeriaWithAlternates(options,selectedOption);
        }
      }
      // St. Joseph and the Annunciation, moved to another day this year
      if((d == dates.stJoseph.feast && !isStJoseph) || d == dates.annunciation.feast) return FeriaWithAlternates(options,selectedOption);
      if(options.length) {
        options.unshift(d);
        if(selectedOption) {
          d = selectedOption;
        }
        d.alternates = options;
      } else {
        // the calendar's entry may still have the alternates of another year's date
        delete d.alternates;
      }
      return d;
    }
    return FeriaWithAlternates(options,selectedOption);
  }
  // not a I class Sunday (Advent, Lent, Passiontide, Easter, Low Sunday, Pentecost)
  Dates.prototype.firstClassFeast = function(date) {
    var d = getFeastForDate(date);
    return !!(d && d.rank === 1 && !d.sunday);
  };
  Dates.prototype.firstOrSecondClassFeast = function(date) {
    var d = getFeastForDate(date);
    return !!(d && (d.rank === 1 || d.rank === 2));
  };
  Dates.prototype.feastOfOurLady = function(date) {
    var d = getFeastForDate(date);
    // from Ash Wednesday, a III class feast is only commemorated, so the day keeps its Lenten tone
    if(d && d.rank === 3 && dateMatches(date, 'lent1-4:easter-1')) return false;
    return !!(d && d.ol);
  };
  Dates.prototype.minorFeast = function(date) {
    var d = getFeastForDate(date);
    return (d && d.rank > 1 && d.rank < 3);
  };
  Dates.prototype.feria = function(date) {
    var d = getFeastForDate(date);
    if(date.day() === 0) return false;
    return !d || d.rank >= 3;
  };
  // The rubrics the office follows (compline.js): '1960', or 'DA' for those of Divino Afflatu (1911), as
  // they stood until the simplification of 1955, whose calendar is daCalendar (calendar-da.js), loaded only
  // when they're chosen.  index.html's include='divinoAfflatu' shows a part only under them.
  var rubrics = '1960', daCalendar;
  Dates.prototype.divinoAfflatu = function(date) {
    return rubrics === 'DA';
  };
  // Under Divino Afflatu, the preces after the Nunc dimittis (getDAFeast), and whether they're said kneeling
  Dates.prototype.preces = function(date) {
    var d = getFeastForDate(date);
    return !!(d && d.preces);
  };
  Dates.prototype.precesKneeling = function(date) {
    var d = getFeastForDate(date);
    return !!(d && d.preces === 2);
  };
  // In Passiontide, the days the short responsory omits the Gloria Patri: under 1960's rubrics on Sundays and below
  // the II class; under Divino Afflatu, as in DO's Gloria1, unless the office is a saint's or has DO's rule
  // "Gloria responsory" (the Seven Sorrows on the Friday after Passion Sunday).
  Dates.prototype.passiontideResponsory = function(date) {
    var d = getFeastForDate(date);
    if(d && 'rankName' in d) return !/^Sancti\/|^Tempora\/Quad5-5$/.test(d.key);
    return date.day() === 0 || !this.firstOrSecondClassFeast(date);
  };
  // Holy Saturday's Compline of the Triduum, which Divino Afflatu hasn't (isTriduum)
  Dates.prototype.triduumSaturday = function(date) {
    return this.isTriduum(date) && date.isSame(moment(this.easter).subtract(1,'day'), 'day');
  };
  // Calls back once the calendar of the rubrics is loaded.  If Divino Afflatu's fails to load, the calendar is
  // still 1960's.
  function setRubrics(r, callback) {
    var set = function() {
      rubrics = r;
      // a year's Dates (allSouls) depend on the rubrics
      dateCache = {};
      if(callback) callback();
    };
    if(r !== 'DA' || daCalendar) return set();
    // a variable, so that the build (findNestedDependencies) leaves it out of compline.js
    var module = 'calendar-da';
    require([module], function(table) {
      daCalendar = table;
      set();
    }, function(err) {
      console.warn('No Divino Afflatu calendar', err);
      set();
    });
  }
  moment.weekdays().forEach(function(day, index) {
    Dates.prototype[day.toLowerCase()] = function(date) {
      return date.day() === index;
    }
  });
  function datesForMoment(moment) {
    return moment.Dates || (moment.Dates = new Dates(moment.year()));
  }
  // The Triduum's own Compline, from Maundy Thursday to Holy Saturday; under Divino Afflatu only to Good Friday,
  // as Holy Saturday's Compline follows Easter's First Vespers (DO's Sabbato Sancto).  The date token is triduum.
  Dates.prototype.isTriduum = function(date) {
    var maundyThursday = moment(this.easter).subtract(3,'days');
    return date.isSameOrAfter(maundyThursday) && date.isBefore(rubrics === 'DA' ? moment(this.easter).subtract(1,'day') : this.easter);
  };
  Dates.prototype.triduum = function(date) {
    return this.isTriduum(date);
  };
  Dates.prototype.isPaschalWeek = function(date) {
    var easterSaturday = moment(this.easter).add(6,'days');
    return date.isSameOrAfter(this.easter) && date.isBefore(easterSaturday);
  };
  Dates.prototype.isHolyWeekOrPaschalWeek = function(date) {
    return date.isSameOrAfter(moment(this.easter).add(-7,'days')) && date.isBefore(moment(this.easter).add(8,'days'));
  };
  Dates.prototype.isPaschalTime = function(date) {
    var pentecostSaturday = moment(this.easter).add(55,'days');
    return date.isSameOrAfter(this.easter) && date.isBefore(pentecostSaturday);
  };
  Dates.prototype.isAdvent = function(date) {
    return date.isSameOrAfter(moment(this.advent1).subtract(1,'day')) && date.isSameOrBefore(moment(this.christmas).subtract(1,'day'));
  };
  function momentFromRegex(date,matches,dates) {
    if(matches[1]) {
      return moment([date.year(), parseInt(matches[2]) - 1, parseInt(matches[3])]);
    } else if(matches[5] in dates) {
      var d = dates[matches[5]]||[0];
      if(typeof d === 'function') return dates[matches[5]](date);
      var m = moment(d);
      if(matches[7]) {
        var days = parseInt(matches[7]) || 0;
        if(matches[6] == '-') {
          days *= -1;
        }
        m.add(days, 'days');
      }
      return m;
    } else {
      console.info('date not found: ' + matches[5]);
      return moment('');
    }
  }
  function momentFromString(str,date) {
    var dates = datesForMoment(date);
    //                    xxx1222222113333331x45555544466666677777444xxxxx89a
    var regexDateRange = /(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches = regexDateRange.exec(str);
    return momentFromRegex(date,matches,dates);
  }
  function dateMatches(date,dateRange) {
    var dates = datesForMoment(date);
    //                    111xxxx2333333224444442x56666655577777788888555xxxxx9ab
    var regexDateRange = /(!)?(?:((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?))(?::(((\d\d)\/(\d\d))|((\w+)(?:([+-])(\d+))?)))?/g;
    var matches;
    var test;
    while((matches = regexDateRange.exec(dateRange))) {
      var opposite = matches[1];
      var secondDate = date.clone();
      var range = [momentFromRegex(date,matches.slice(1),dates)];
      if(matches[9]) {
        if(matches[3] > matches[11]) {
          // if the range spans the new year, it is a special case:
          if(range[0].isAfter(date)) {
            range[0].add(-1,'year');
          } else {
            secondDate.add(1,'year');
          }
        }
        range.push(momentFromRegex(secondDate,matches.slice(9),dates));
        test = date.isBetween(range[0],range[1],'day','[]');
        if(opposite) test = !test;
        if(test) return true;
      } else {
        if (typeof range[0]==='boolean') {
          if(opposite) range[0] = !range[0];
          if(range[0]) return true;
        } else {
          test = date.isSame(range[0],'day');
          if(opposite) test = !test;
          if(test) return true;
        }
      }
    }
    return false;
  }

return {
  roman: romanCalendar,
  regional: regionalCalendars,
  dateMatches: dateMatches,
  datesForMoment: datesForMoment,
  getFeastForDate: getFeastForDate,
  setRubrics: setRubrics,
  getRubrics: function() { return rubrics; }
};
});
// Translations (TRANSLATIONS_PLAN.md §3–§5).  What to show is localStorage.textMode: 'la' (Latin
// only), 'both' (Latin and a translation) or 'tr' (the translation only).  The translation is
// localStorage.trLang, which isn't stored until the user picks one, so until then it follows the
// browser's language.  ?text=both&lang=en overrides both for one page view, without saving.
//
// Each language is a module js/i18n/<lang>.js, loaded only when it's needed:
//   define({
//     meta: {name: 'English', dir: 'ltr', doCommit: '…'},
//     // (Latin-Bea's meta also has latin: true, as where it has nothing of its own its text is the
//     // Latin's, and lang: 'la-x-bea', its lang attribute)
//     // each psalm section's verses, from verse 1, with the Gloria Patri and Sicut erat last
//     // ('' for a verse whose translation is part of the verse before's)
//     psalter: {'4': ['When I called upon him…', …], '7.I': […], 'nunc-dimittis': […]},
//     // each text's units, in order: the paragraphs of a GABC file, keyed by its src, or the
//     // blocks of index.html, keyed by their data-tr attribute
//     texts: {'index:confiteor': […], …},
//     // the hymn, Te lucis (§4b): its first two stanzas and each tone's doxology (keyed as
//     // te-lucis/<tone>.gabc), in each kind the language has; sung is hyphenated, with only the
//     // tones the whole hymn fits
//     hymn: {literal: {stanzas: […], doxologies: {Ferial: '…', …}}, metrical: {…}, sung: {…}}
//   });
// A unit is plain text.  Its lines are split by \n, and a line that starts "V. " or "R. " starts
// with ℣ or ℟.  * and † are shown in red, as in the Latin.  How to show the hymn as text is
// localStorage.hymnMode: 'literal' (the default) or 'metrical'; the hymn's notation menu sings it
// ('Fully notated translation', compline.js setHymnSung) (§4b, §5).
define('text-mode',['jquery'], function($) {
  'use strict';
  // The app's settings, which compline.js uses too: an object in their place where storage throws.
  var localStorage = window.localStorage;
  try {
    var mod = '__storage test__';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
  } catch(e) {
    localStorage = {};
  }
  if(!('textMode' in localStorage)) localStorage.textMode = 'la';
  var modes = ['la', 'both', 'tr'];
  // The languages offered in the menu, each with a module in js/i18n/ (TRANSLATIONS_PLAN.md §2),
  // added once it has been checked end to end (English in Phase 4, the others in Phase 5, Latin
  // with the Pius XII psalter, for comparison, in Phase 6).
  // compline.js hides the Text and Translation menus while there are none.  rubrics: the language
  // its rubrics are in, where it hasn't its own.  sung: its module has the hymn to sing (hymn.sung),
  // which the hymn's notation menu offers before the module is loaded.
  var languages = [
    {code: 'en', name: 'English', sung: true},
    {code: 'fr', name: 'Français'},
    {code: 'es', name: 'Español', sung: true},
    {code: 'it', name: 'Italiano'},
    {code: 'pt', name: 'Português'},
    {code: 'pl', name: 'Polski'},
    {code: 'la-bea', name: 'Latin (Pius XII psalter)', rubrics: 'en'}
  ];
  var isLanguage = function(code) {
    return languages.some(function(l) { return l.code === code; });
  };
  // The page's query parameters, which compline.js uses too.
  var query = {};
  window.location.search.substr(1).split('&').forEach(function(param) {
    var p = param.split('=');
    if(p.length === 2) query[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
  });
  // Once the user chooses in the menu, a ?text= or ?lang= override goes, from the address too, so
  // reloading the page doesn't bring it back.
  var dropQuery = function(key) {
    delete query[key];
    if(!window.history || !window.history.replaceState) return;
    var search = window.location.search.substr(1).split('&').filter(function(param) {
      return param && param.split('=')[0] !== key;
    }).join('&');
    window.history.replaceState(window.history.state, '',
      window.location.pathname + (search ? '?' + search : '') + window.location.hash);
  };

  var mode = function() {
    if(modes.indexOf(query.text) >= 0) return query.text;
    return modes.indexOf(localStorage.textMode) >= 0 ? localStorage.textMode : 'la';
  };
  // The first of the browser's languages that has a translation (de-AT counts as de), else English.
  // Latin (Pius XII) is never chosen this way.
  var browserLang = function() {
    var preferred = navigator.languages || [navigator.language || navigator.userLanguage || ''];
    for(var i = 0; i < preferred.length; ++i) {
      var code = (preferred[i] || '').toLowerCase().split('-')[0];
      if(code !== 'la' && isLanguage(code)) return code;
    }
    return 'en';
  };
  var lang = function() {
    if(isLanguage(query.lang)) return query.lang;
    return isLanguage(localStorage.trLang) ? localStorage.trLang : browserLang();
  };
  // The sections whose notation menu says 'Translation only' (compline.js), which show the
  // translation only whatever the Text menu says.  Each block of text shows as its section's mode
  // says (modeOf), and has the class text-<mode>, which style.css reads.
  var trSections = {};
  var setTrSections = function(sections) {
    trSections = {};
    sections.forEach(function(section) { trSections[section] = true; });
  };
  var sectionMode = function(section) {
    var m = mode();
    return section && trSections[section] ? 'tr' : m;
  };
  // A block's section: a <chant-gabc>'s notation, the pointed lesson, chapter and prayers, or the
  // data-section of the part of index.html it's in (the psalms' and the canticle's verses and
  // antiphons, in #placeholder and #canticle, and the versicles of the collect).  Any other chant is
  // 'chants', and anything else follows the Text menu.
  var sectionOf = function(el) {
    var $el = $(el);
    if($el.is('chant-gabc[notation]')) return $el.attr('notation');
    if($el.closest('.pointed-lesson').length) return 'lesson';
    if($el.closest('.pointed-chapter').length) return 'chapter';
    if($el.closest('.pointed-prayer').length) return 'prayers';
    return $el.closest('[data-section]').attr('data-section') || ($el.is('chant-gabc') ? 'chants' : null);
  };
  var modeOf = function(el) {
    return sectionMode(sectionOf(el));
  };
  // Whether any translation is shown.
  var translated = function() {
    return mode() !== 'la' || Object.keys(trSections).length > 0;
  };
  // The language of the rubrics: the translation's, which with the Latin only the menu calls the
  // Rubrics' (compline.js).  English is the page's own.
  var rubricsLang = function(l) {
    var language = languages.filter(function(each) { return each.code === l; })[0];
    return (language && language.rubrics) || l;
  };
  // Whether the language's module is wanted: for its translation, or for its rubrics.
  var wanted = function() {
    return translated() || rubricsLang(lang()) !== 'en';
  };
  // The class of a block that shows as m.
  var markMode = function(el, m) {
    $(el).removeClass('text-la text-both text-tr').addClass('text-' + m);
  };
  var setMode = function(m) {
    dropQuery('text');
    localStorage.textMode = m;
  };
  var setLang = function(l) {
    dropQuery('lang');
    localStorage.trLang = l;
  };
  var hymnModes = ['literal', 'metrical'];
  var hymnMode = function() {
    return hymnModes.indexOf(localStorage.hymnMode) >= 0 ? localStorage.hymnMode : 'literal';
  };
  var setHymnMode = function(m) {
    localStorage.hymnMode = m;
  };
  // Whether the hymn is sung in the translation: its notation menu says 'Fully notated translation'
  // (compline.js), which it offers where the language can sing it.
  var hymnSung = false;
  var setHymnSung = function(sung) {
    hymnSung = sung;
  };
  var canSing = function() {
    return languages.some(function(l) { return l.code === lang() && l.sung; });
  };

  var modules = {};
  // Calls back once the current language is loaded.  A language that fails to load has no texts.
  var load = function(callback) {
    var l = lang();
    if(!wanted() || modules[l]) {
      callback();
      return;
    }
    require(['i18n/' + l], function(module) {
      modules[l] = module;
      if(!(module.hymn && module.hymn.sung) !== !canSing()) console.warn('languages[].sung is wrong for ' + l);
      callback();
    }, function(err) {
      console.warn('No translation for ' + l, err);
      modules[l] = {};
      callback();
    });
  };
  var data = function() {
    return translated() ? modules[lang()] || null : null;
  };
  // What a chant (whose src is key, shown as m) was drawn for, so it's drawn again only when this
  // changes.  notes: whether it has a heading (user-notes or commentary) for the rubrics to translate.
  var renderKey = function(key, m, notes) {
    return (m === 'la' ? m : m + ':' + lang() + (modules[lang()] ? '' : ':loading') + (hymnTone(key) ? ':' + (hymnSung ? 'sung' : hymnMode()) : '')) +
      (notes && rubrics() ? ':rubrics-' + lang() : '');
  };

  // The rubrics (§4d), in the translation's language, or with the Latin only the Rubrics menu's,
  // where its module has them: English's are the page's own, and Latin-Bea has none.  Each rubric of index.html has
  // a data-rubric key, and rubrics[key] is its text: {…} is Latin (lang=la), and \n a line break.
  // rubrics['note:<English>'] translates the start of a heading: a chant's user-notes or commentary
  // ("Psalm 7. I." → "Salmo 7. I."), and the pointed psalms' own.
  var rubrics = function() {
    var d = wanted() ? modules[lang()] : null;
    return (d && d.rubrics) || null;
  };
  var rubric = function(key) {
    var r = rubrics();
    return r && typeof r[key] === 'string' ? r[key] : null;
  };
  // A heading (as HTML) translated, or null where the rubrics don't translate it (Polish's "Psalm"
  // is translated, though it's the same word).
  var rubricNote = function(html) {
    var r = rubrics();
    if(!r || !html) return null;
    for(var key in r) {
      var en = key.replace(/^note:/, '');
      if(en !== key && html.indexOf(en) === 0 && /^[ .]?$/.test(html.charAt(en.length))) return rubricHtml(r[key]) + html.slice(en.length);
    }
    return null;
  };
  // A heading, as chant-element.js draws it: red italics, in the rubrics' language once translated.
  var noteHtml = function(text, style) {
    var note = rubricNote(text);
    return '<i class="red"' + (note === null ? '' : ' lang="' + langAttr() + '"') + (style ? ' style="' + style + '"' : '') + '>' +
      (note === null ? text : note) + '</i>';
  };
  // A rubric's text as HTML.  {…} is a Latin text the rubric names, shown black and upright (style.css
  // .cited).  wrap is the tags its words go in, where its English has its words in <i> around Latin
  // that isn't ("the Hymn </i>Te lucis<i> which…").
  var rubricHtml = function(text, wrap) {
    return text.split(/(\{[^}]*\})/).map(function(part, i) {
      if(i % 2) return "<span class='cited' lang='la'>" + escapeHtml(part.slice(1, -1)) + '</span>';
      if(!part) return '';
      var html = escapeHtml(part).replace(/\n/g, '<br/>');
      return wrap ? wrap[0] + html + wrap[1] : html;
    }).join('');
  };
  var translateRubrics = function($root) {
    $root.find('[data-rubric]').addBack('[data-rubric]').each(function() {
      var $el = $(this);
      // what was last shown, as hyphenate.js changes the HTML
      if(!('_rubricHtml' in this)) {
        this._rubricHtml = this._rubricShown = this.innerHTML;
        this._rubricWrap = $el.is('i') || !$el.children('i').length ? null :
          $el.hasClass('red') ? ['<i>', '</i>'] : ["<i class='red'>", '</i>'];
      }
      var text = rubric($el.attr('data-rubric'));
      var html = text === null ? this._rubricHtml : rubricHtml(text, this._rubricWrap);
      if(this._rubricShown !== html) this.innerHTML = this._rubricShown = html;
      if(text === null) $el.removeAttr('lang');
      else $el.attr('lang', langAttr());
    });
    // the pointed psalms' headings ("Psalm 90"), in the psalms' and the canticle's HTML, and the
    // Miserere's (#miserere); a chant's are drawn by chant-element.js
    var headed = '#placeholder, #canticle, #miserere';
    $root.find(headed).addBack(headed).find('i.red').not('chant-gabc i').each(function() {
      if(!('_rubricText' in this)) this._rubricText = this._rubricShown = this.innerHTML;
      var note = rubricNote(this._rubricText);
      var shown = note === null ? this._rubricText : note;
      if(this._rubricShown !== shown) this.innerHTML = this._rubricShown = shown;
      if(note === null) $(this).removeAttr('lang');
      else $(this).attr('lang', langAttr());
    });
  };

  // The hymn (§4b).  The tone of a te-lucis/<tone>.gabc key, or null for any other.
  var hymnTone = function(key) {
    var match = /^te-lucis\/(.+)\.gabc$/.exec(key || '');
    return match && match[1];
  };
  // Which kinds of the hymn the language has, {literal, metrical, sung}, or null if it has none.
  var hymnKinds = function() {
    var h = (data() || {}).hymn;
    return h ? {literal: !!h.literal, metrical: !!h.metrical, sung: !!h.sung} : null;
  };
  // The hymn of a te-lucis/ key as the user chose to show it: {kind, units, unsung}, or null where
  // the translation has no hymn.  notated: whether it can be drawn as notes, which singing needs.
  // A kind the language hasn't for this tone falls back as §4b says: sung to metrical (unsung is
  // then true where the language sings, but not this tone's doxology), literal to metrical, and
  // metrical to literal.
  var hymn = function(key, notated) {
    var tone = hymnTone(key);
    var h = tone && (data() || {}).hymn;
    if(!h) return null;
    var units = function(kind) {
      var k = h[kind];
      return k && typeof k.doxologies[tone] === 'string' ? k.stanzas.concat(k.doxologies[tone]) : null;
    };
    var wanted = hymnSung ? 'sung' : hymnMode();
    var unsung = false;
    if(wanted === 'sung') {
      if(notated && units('sung')) return {kind: 'sung', units: units('sung'), unsung: false};
      unsung = !!(notated && h.sung);
      wanted = 'metrical';
    }
    var kinds = wanted === 'literal' ? ['literal', 'metrical'] : ['metrical', 'literal'];
    for(var i = 0; i < kinds.length; ++i) {
      if(units(kinds[i])) return {kind: kinds[i], units: units(kinds[i]), unsung: unsung};
    }
    return null;
  };

  // A text's units, or null if the translation doesn't have it.  The hymn's are as hymnMode chooses
  // them, as text.
  var texts = function(key) {
    if(hymnTone(key)) {
      var h = hymn(key, false);
      return h ? h.units : null;
    }
    var d = data();
    var units = d && d.texts && d.texts[key];
    return units === undefined || units === null ? null : [].concat(units);
  };
  // A psalm score's section, from its GABC header: "user-notes: Psalm 7. I.;" → '7.I', and the
  // Nunc dimittis is 'nunc-dimittis'.  A psalm-section header says it outright, where the label
  // isn't enough: All Souls' Nunc dimittis ends with Requiem æternam, so it's 'nunc-dimittis-asd'.
  var psalmSection = function(header) {
    if(header['psalm-section']) return header['psalm-section'];
    var label = header['user-notes'];
    if(!label) return null;
    if(/Simeon|Nunc dimittis/i.test(label)) return 'nunc-dimittis';
    var match = label.match(/Psalm\s+(\d+)(?:\.\s*([IV]+))?/);
    return match && (match[2] ? match[1] + '.' + match[2] : match[1]);
  };
  var psalm = function(section) {
    var d = data();
    return (section && d && d.psalter && d.psalter[section]) || null;
  };
  var hasPsalm = function(section) {
    return !!psalm(section);
  };
  // A verse's translation, null if there isn't one, or '' if it's part of the verse before's
  // (where the translation divides the verses differently).
  var psalmVerse = function(section, verse) {
    var verses = psalm(section);
    var text = verses && verses[verse - 1];
    return typeof text === 'string' ? text : null;
  };
  var escapeHtml = function(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  // Whether a Latin block (as HTML) runs its last ℟ on from the words before it, as "… ad vitam
  // ætérnam. ℟ Amen." does, rather than starting a line with it.
  var runsOnResponse = function(latinHtml) {
    var marks = latinHtml.split(/<span class=["']versiculum["']>r<\/span>/);
    // the words between the last line break (or block) before it and it
    var before = marks.length > 1 && marks[marks.length - 2].replace(/^[^]*(<br\s*\/?>|<\/?(p|div)\b[^>]*>)/, '');
    return !!before && /\S/.test(before.replace(/<[^>]*>|&nbsp;/g, ''));
  };
  // A unit as HTML, marked up like the Latin.  With slashes, its lines are run together with a red
  // slash between them, as under a notated hymn's verse.  With runOn, a last line that is a ℟ (an
  // Amen) runs on from the line before, where the Latin's does (runsOnResponse).
  var unitHtml = function(text, slashes, runOn) {
    var lines = text.split('\n').map(function(line) {
      return escapeHtml(line.trim())
        .replace(/^V\. /, "<span class='versiculum'>v</span>&nbsp;")
        .replace(/^R\. /, "<span class='versiculum'>r</span>&nbsp;")
        .replace(/ (\*|†)(?= |$)/g, "&nbsp;<span class='red'>$1</span>");
    });
    if(runOn && lines.length > 1 && /^<span class='versiculum'>r<\/span>/.test(lines[lines.length - 1])) {
      lines.splice(-2, 2, lines[lines.length - 2] + ' ' + lines[lines.length - 1]);
    }
    return lines.join(slashes ? "&nbsp;<span class='red'>/</span> " : '<br>');
  };
  // The Latin's last ℟ is in the last unit.
  var unitsHtml = function(units, slashes, runOn) {
    return units.map(function(unit, i) { return unitHtml(unit, slashes, runOn && i === units.length - 1); }).join('<br>');
  };
  // The name of the translation's language, from its module.
  var langName = function() {
    return ((data() || {}).meta || {}).name || lang();
  };
  // The translation's lang attribute.
  var langAttr = function() {
    return ((data() || {}).meta || {}).lang || lang();
  };
  // The attributes of the translation that follows a Latin element.
  var trAttributes = function() {
    var meta = (data() || {}).meta || {};
    return " class='tr' lang='" + langAttr() + "'" + (meta.dir === 'rtl' ? " dir='rtl'" : '');
  };
  // Classes for a Latin element: in 'tr' mode it hides when it has a translation, and is shown
  // in a subtle style when it doesn't (style.css).  A Latin translation (meta.latin, Latin-Bea)
  // has nothing where it's the same as the Latin, so there the Latin is its text: tr-same, shown
  // as it is.
  var latinClass = function(hasTranslation, m) {
    if((m || mode()) === 'la') return '';
    if(hasTranslation) return 'has-tr';
    return ((data() || {}).meta || {}).latin ? 'tr-same' : 'tr-missing';
  };
  // The translation of a psalm verse as a <p>, laid out like the Latin; '' if the verse before's
  // covers it, and null if there isn't one.  m is the mode it's shown in.
  var verseTranslationHtml = function(section, n, m) {
    var verse = (m || mode()) === 'la' ? null : psalmVerse(section, n);
    return verse ? '<p' + trAttributes() + "><span class='verse-number'>" + n + '.&nbsp;</span>' + unitHtml(verse) + '</p>' : verse;
  };
  // A psalm verse: its Latin <p> (whose inner HTML is latinHtml), then the translation's.
  var verseHtml = function(section, n, latinHtml, m) {
    var translation = verseTranslationHtml(section, n, m);
    return "<p lang='la' class='" + latinClass(translation !== null, m) + "'><span class='verse-number'>" + n + '.&nbsp;</span>' +
      latinHtml + '</p>' + (translation || '');
  };
  // A Latin block and its translation (units), side by side or one under the other (style.css).
  // tag is the element for each, 'p' or 'div'.  trPrefix is HTML that starts the translation, as
  // an antiphon's red Ant. does.
  var pairHtml = function(latinHtml, units, tag, m, trPrefix) {
    tag = tag || 'p';
    return "<div class='tr-pair'><" + tag + " lang='la' class='" + latinClass(!!units, m) + "'>" + latinHtml + '</' + tag + '>' +
      (units ? '<' + tag + trAttributes() + '>' + (trPrefix || '') + unitsHtml(units, false, runsOnResponse(latinHtml)) + '</' + tag + '>' : '') + '</div>';
  };

  // A translation's units as one unit for each ℣ and the ℟s after it, or null unless it has two
  // or more and starts with one.
  var versicleUnits = function(units) {
    var groups = [];
    units.join('\n').split('\n').forEach(function(line) {
      if(/^V\. /.test(line) || !groups.length) groups.push(line);
      else groups[groups.length - 1] += '\n' + line;
    });
    return groups.length > 1 && /^V\. /.test(groups[0]) ? groups : null;
  };
  // Splits a Latin block of versicles into one block (of the same tag) for each ℣ and the ℟s after
  // it, so that each is followed by its translation: under it on a narrow screen, and beside it on
  // a wide one (style.css).  A <span>'s keeps the <br> after it, so that in Latin only it reads as
  // it did.  If there aren't count of them, it stays as it is.
  var splitVersicles = function($latin, count) {
    var regexBreak = /<br\s*\/?>\s*(?=\(?<span class=["']versiculum["']>v<\/span>)/g;
    var span = $latin.is('span');
    var html = $latin.html();
    var chunks = [];
    var start = 0;
    var match;
    while((match = regexBreak.exec(html))) {
      chunks.push(html.slice(start, span ? match.index + match[0].length : match.index));
      start = match.index + match[0].length;
    }
    chunks.push(html.slice(start));
    if(chunks.length !== count) return $latin;
    var $blocks = $(chunks.map(function(chunk) { return $latin.clone().html(chunk)[0]; }));
    $latin.replaceWith($blocks);
    return $blocks;
  };
  // Adds the translations to the page, or takes them away in 'la' mode: each .tr-pair[data-tr]
  // block of index.html, and each verse of the pointed psalms (.verses[data-psalm]), each in its
  // section's mode.  A block of versicles is split into one pair for each ℣ (splitVersicles),
  // the first time it has a translation that divides the same way.
  var translate = function(root) {
    var $root = $(root);
    translateRubrics($root);
    $root.find('.tr-pair[data-tr]').each(function() {
      var $pair = $(this);
      $pair.children('.tr').remove();
      var $latin = $pair.children('[lang=la]');
      if($latin.length !== 1 && !$pair.hasClass('tr-versicles')) {
        console.warn('A .tr-pair needs one Latin child (lang=la)', this);
        return;
      }
      var m = modeOf(this);
      markMode(this, m);
      var units = m === 'la' ? null : texts($pair.attr('data-tr'));
      $latin.removeClass('has-tr tr-missing tr-same').addClass(latinClass(!!units, m));
      if(!units) return;
      var tag = $latin.prop('tagName').toLowerCase();
      var trHtml = function(units, $before) {
        return '<' + tag + trAttributes() + '>' + unitsHtml(units, false, runsOnResponse($before.html())) + '</' + tag + '>';
      };
      var versicles = versicleUnits(units);
      if(versicles && $latin.length === 1) {
        $latin = splitVersicles($latin, versicles.length);
        $pair.toggleClass('tr-versicles', $latin.length > 1);
      }
      if(versicles && versicles.length === $latin.length) {
        $latin.each(function(i) { $(this).after(trHtml([versicles[i]], $(this))); });
      } else {
        $latin.last().after(trHtml(units, $latin.last()));
      }
    });
    $root.find('.verses[data-psalm]').each(function() {
      var section = $(this).attr('data-psalm');
      var m = modeOf(this);
      markMode(this, m);
      $(this).children('p.tr').remove();
      $(this).children('p').each(function() {
        var $p = $(this);
        var translation = verseTranslationHtml(section, parseInt($p.children('.verse-number').text()), m);
        $p.attr('lang', 'la').removeClass('has-tr tr-missing tr-same').addClass(latinClass(translation !== null, m));
        if(translation) $p.after(translation);
      });
    });
  };
  var updateBodyClasses = function() {
    var m = mode();
    $.each(modes, function(i, each) {
      $(document.body).toggleClass('page-text-' + each, each === m);
    });
  };

  return {
    storage: localStorage,
    query: query,
    languages: languages,
    mode: mode,
    setTrSections: setTrSections,
    sectionMode: sectionMode,
    modeOf: modeOf,
    markMode: markMode,
    translated: translated,
    rubricsLang: rubricsLang,
    lang: lang,
    setMode: setMode,
    setLang: setLang,
    hymnMode: hymnMode,
    setHymnMode: setHymnMode,
    setHymnSung: setHymnSung,
    canSing: canSing,
    hymnKinds: hymnKinds,
    hymn: hymn,
    load: load,
    renderKey: renderKey,
    texts: texts,
    rubric: rubric,
    rubricHtml: rubricHtml,
    noteHtml: noteHtml,
    psalmSection: psalmSection,
    hasPsalm: hasPsalm,
    psalmVerse: psalmVerse,
    runsOnResponse: runsOnResponse,
    unitsHtml: unitsHtml,
    langName: langName,
    langAttr: langAttr,
    trAttributes: trAttributes,
    verseTranslationHtml: verseTranslationHtml,
    verseHtml: verseHtml,
    pairHtml: pairHtml,
    translate: translate,
    updateBodyClasses: updateBodyClasses
  };
});

// Hypher 0.2.5, Copyright (c) 2011, Bram Stein (BSD license, js/hyphenation/LICENSE.txt),
// as a RequireJS module.  Generated by tools/hyphenation/build.js: don't edit.
define('hypher',[],function() {
var module = {exports: null};
/**
 * @constructor
 * @param {!{patterns: !Object, leftmin: !number, rightmin: !number}} language The language pattern file. Compatible with Hyphenator.js.
 */
function Hypher(language) {
    var exceptions = [],
        i = 0;
    /**
     * @type {!Hypher.TrieNode}
     */
    this.trie = this.createTrie(language['patterns']);

    /**
     * @type {!number}
     * @const
     */
    this.leftMin = language['leftmin'];

    /**
     * @type {!number}
     * @const
     */
    this.rightMin = language['rightmin'];

    /**
     * @type {!Object.<string, !Array.<string>>}
     */
    this.exceptions = {};

    if (language['exceptions']) {
        exceptions = language['exceptions'].split(/,\s?/g);

        for (; i < exceptions.length; i += 1) {
            this.exceptions[exceptions[i].replace(/\u2027/g, '').toLowerCase()] = new RegExp('(' + exceptions[i].split('\u2027').join(')(') + ')', 'i');
        }
    }
}

/**
 * @typedef {{_points: !Array.<number>}}
 */
Hypher.TrieNode;

/**
 * Creates a trie from a language pattern.
 * @private
 * @param {!Object} patternObject An object with language patterns.
 * @return {!Hypher.TrieNode} An object trie.
 */
Hypher.prototype.createTrie = function (patternObject) {
    var size = 0,
        i = 0,
        c = 0,
        p = 0,
        chars = null,
        points = null,
        codePoint = null,
        t = null,
        tree = {
            _points: []
        },
        patterns;

    for (size in patternObject) {
        if (patternObject.hasOwnProperty(size)) {
            patterns = patternObject[size].match(new RegExp('.{1,' + (+size) + '}', 'g'));

            for (i = 0; i < patterns.length; i += 1) {
                chars = patterns[i].replace(/[0-9]/g, '').split('');
                points = patterns[i].split(/\D/);
                t = tree;

                for (c = 0; c < chars.length; c += 1) {
                    codePoint = chars[c].charCodeAt(0);

                    if (!t[codePoint]) {
                        t[codePoint] = {};
                    }
                    t = t[codePoint];
                }

                t._points = [];

                for (p = 0; p < points.length; p += 1) {
                    t._points[p] = points[p] || 0;
                }
            }
        }
    }
    return tree;
};

/**
 * Hyphenates a text.
 *
 * @param {!string} str The text to hyphenate.
 * @return {!string} The same text with soft hyphens inserted in the right positions.
 */
Hypher.prototype.hyphenateText = function (str, minLength) {
    minLength = minLength || 4;

    // Regexp("\b", "g") splits on word boundaries,
    // compound separators and ZWNJ so we don't need
    // any special cases for those characters. Unfortunately
    // it does not support unicode word boundaries, so
    // we implement it manually.
    var words = str.split(/([a-zA-Z0-9_\u0027\u00AD\u00DF-\u00EA\u00EB\u00EC-\u00EF\u00F1-\u00F6\u00F8-\u00FD\u0101\u0103\u0105\u0107\u0109\u010D\u010F\u0111\u0113\u0117\u0119\u011B\u011D\u011F\u0123\u0125\u012B\u012F\u0131\u0135\u0137\u013C\u013E\u0142\u0144\u0146\u0148\u0151\u0153\u0155\u0159\u015B\u015D\u015F\u0161\u0165\u016B\u016D\u016F\u0171\u0173\u017A\u017C\u017E\u017F\u0219\u021B\u02BC\u0390\u03AC-\u03CE\u03F2\u0401\u0410-\u044F\u0451\u0454\u0456\u0457\u045E\u0491\u0531-\u0556\u0561-\u0587\u0902\u0903\u0905-\u090B\u090E-\u0910\u0912\u0914-\u0928\u092A-\u0939\u093E-\u0943\u0946-\u0948\u094A-\u094D\u0982\u0983\u0985-\u098B\u098F\u0990\u0994-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BE-\u09C3\u09C7\u09C8\u09CB-\u09CD\u09D7\u0A02\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A14-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A82\u0A83\u0A85-\u0A8B\u0A8F\u0A90\u0A94-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABE-\u0AC3\u0AC7\u0AC8\u0ACB-\u0ACD\u0B02\u0B03\u0B05-\u0B0B\u0B0F\u0B10\u0B14-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3E-\u0B43\u0B47\u0B48\u0B4B-\u0B4D\u0B57\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C02\u0C03\u0C05-\u0C0B\u0C0E-\u0C10\u0C12\u0C14-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3E-\u0C43\u0C46-\u0C48\u0C4A-\u0C4D\u0C82\u0C83\u0C85-\u0C8B\u0C8E-\u0C90\u0C92\u0C94-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBE-\u0CC3\u0CC6-\u0CC8\u0CCA-\u0CCD\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3E-\u0D43\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D60\u0D61\u0D7A-\u0D7F\u1F00-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB2-\u1FB4\u1FB6\u1FB7\u1FBD\u1FBF\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD2\u1FD3\u1FD6\u1FD7\u1FE2-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u200D\u2019]+)/gi);

    for (var i = 0; i < words.length; i += 1) {
        if (words[i].indexOf('/') !== -1) {
            // Don't insert a zero width space if the slash is at the beginning or end
            // of the text, or right after or before a space.
            if (i !== 0 && i !== words.length - 1 && !(/\s+\/|\/\s+/.test(words[i]))) {
                words[i] += '\u200B';
            }
        } else if (words[i].length > minLength) {
            words[i] = this.hyphenate(words[i]).join('\u00AD');
        }
    }
    return words.join('');
};

/**
 * Hyphenates a word.
 *
 * @param {!string} word The word to hyphenate
 * @return {!Array.<!string>} An array of word fragments indicating valid hyphenation points.
 */
Hypher.prototype.hyphenate = function (word) {
    var characters,
        characterPoints = [],
        originalCharacters,
        i,
        j,
        k,
        node,
        points = [],
        wordLength,
        lowerCaseWord = word.toLowerCase(),
        nodePoints,
        nodePointsLength,
        m = Math.max,
        trie = this.trie,
        result = [''];

    if (this.exceptions.hasOwnProperty(lowerCaseWord)) {
        return word.match(this.exceptions[lowerCaseWord]).slice(1);
    }

    if (word.indexOf('\u00AD') !== -1) {
        return [word];
    }

    word = '_' + word + '_';

    characters = word.toLowerCase().split('');
    originalCharacters = word.split('');
    wordLength = characters.length;

    for (i = 0; i < wordLength; i += 1) {
        points[i] = 0;
        characterPoints[i] = characters[i].charCodeAt(0);
    }

    for (i = 0; i < wordLength; i += 1) {
        node = trie;
        for (j = i; j < wordLength; j += 1) {
            node = node[characterPoints[j]];

            if (node) {
                nodePoints = node._points;
                if (nodePoints) {
                    for (k = 0, nodePointsLength = nodePoints.length; k < nodePointsLength; k += 1) {
                        points[i + k] = m(points[i + k], nodePoints[k]);
                    }
                }
            } else {
                break;
            }
        }
    }

    for (i = 1; i < wordLength - 1; i += 1) {
        if (i > this.leftMin && i < (wordLength - this.rightMin) && points[i] % 2) {
            result.push(originalCharacters[i]);
        } else {
            result[result.length - 1] += originalCharacters[i];
        }
    }

    return result;
};

module.exports = Hypher;
return module.exports;
});

// Hyphenation patterns for Hypher, from jgabc's propers tool (patterns/la-hypher.js).
// Generated by tools/hyphenation/build.js: don't edit.
define('hyphenation/la',{
 "leftmin": 1,
 "rightmin": 1,
 "patterns": {
  "2": "1b1c1d1f1g1h1j1k1l1m1n1p1r1s1t1v1x1z8́a1e1i1o1u1y1á1æ1é1ë1í1ï1ó1ú1ü1ý1œ1ǽ1",
  "3": "2b_2bb2bd2bh2bj2bm2bn2bp2bs2bt2cc2cd2cm2cn2cq2cs2ct2cz2d_2dc2dd2df2dg2dl2dm2dn2dp2dq2ds2f_2ff2fn2ft2g_2gd2gf2gg2gm2gs2h_2hp2ht2lb2lc2ld2lf2lg2lk2ll2lm2ln2lp2lq2lr2ls2mb2mc2md2mf2ml2mm2mn2mp2mr2ms2mt2n_2nb2nc2nf2ng2nh2nj2nl2nm2nn2np2nq2nr2ns2nt2nz2p_2pn2ps2pz2rb2rc2rd2rf2rg2rl2rm2rn2rp2rq2rs2rt2rz2sb2sc2sd2sf2sg2sl2sm2sn2sp2sq2sr2st2sv2tb2tc2td2tf2tg2tm2tn2tp2tq2ts2tt2x_2xq2xt2y_2z_2zz4c_4dv4l_4lt4lv4lz4m_4mq4nd4nv4pp4r_4rv4s_4ss4t_6mv_b2_c2_f2_g2_h2_j2_l2_m2_n2_p2_r2_s2_t2_x2_z2a2ua2ya5úb2lb2rc2hc4lc6rcu3d2re2ue3ye3úf2lf2rg2lg2ng2ro3yp2hp2lp2rr2ht2lt4rx2yy3ay3ey3iy3oy3uy3yy3æz2má2uá2yæ3aæ3eæ3iæ3oæ3uæ3áæ3éæ3íæ3óæ3úé2uí5aí5eí5ií5oí5uí5æœ́1ǽ3aǽ3eǽ3iǽ3oǽ3u",
  "4": "1qu42ax_2ch_2d3h2d3w2em_2es_2et_2ex_2nx22ox_2ph_2phn2php2pht2r1x2st_2th_2ui_2ux_2ys_2yx_3ne_4p3t4r3r_i2e_i2o_i2é_i2ó_i3i_i3í_i4a_i4u_i4á_i4ú_p4t_s2m_í3ia1e_a1isa1ísai2eai2oai2uai2éai2óbu3uch4lch4rd2æ_du3uei2aei2eei2uei2áei2éei2úei4oi5i_oi2aoi2eoi2ooi2uph2lph8rqu6ur2æ_t2h4u4lmui2uuo3uái2uéi2aéi2eéi2uéi4oói2aói2eói2oói2uú4lm",
  "5": "2i2x_2s3tn2sne_2st3p2th5m2th5n2th5p2th5s3p2tr3s2ce3s2ci3s2cy3s2cæ3s2cé3s2cí3s2cý3s2cœ3s2cǽ4ch3m4ch3n4ch3t_a2bf_a2bj_a2d3_co1e_co1i_de1í_de3u_di3u_di3ú_di3œ_dé1i_e2x3_gai4_hi2e_hi2é_i3bi_i3bo_i3bu_i3bí_i3bó_i3bú_i3co_i3có_i4n3_i5ul_i5úl_la4u_o2b3_præ1_ra2y_á2d3_é2x3_í4n3_ó2b3a3it_a3um_a3us_b3s2tcho3eci3etcu4lccu4lncu4lpcu4mbcu4nccu4ntcu4rscu4stcú4lccú4lncú4lpd2am_d4it_e2s3re3am_e3at_e3is_e3um_e3umde3umpe3unce3unde3unge3unte3unxe3us_g4ne_he3u_i1el_i3em_i3es_i3et_i3is_i3ud_i3um_i3ur_i3us_i5it_i5or_l3f2tlu1unlu1únn2s3fn2s3mnco3ingu2angu2engu2ingu2ungu2ángu2ængu2éngu2íngu2úngu6ongu6óo3um_ph3phqu6o_r4us_ri3e_s2t3ls2t3qs2t3ss2t3ts3se_s4t1kti1o_u3em_u3es_u3et_u3is_u3it_u5um_u5us_uo3usuo3úsx2it_x2um_x2us_á3it_á3um_á3us_é3am_é3at_é3is_é3um_é3unté3us_",
  "6": "1qui3a1qui3e1qui3o1qui3á1qui3æ1qui3é1qui3ó1qui3ǽ1qui5u1qui5ú2t1íps3p2neu3p2néu3p2sic3s4pec3s4pex3s4phr3s4phæ3s4phǽ3s4pic3s4pir3s4pol3s4pum3s4péc3s4péx3s4píc3s4pír3s4pól3s4púm_a2b1í_a2b3c_a2b3l_a2b3r_a2dfu_a3d4y_a3d4æ_a3d4ý_a3s2c_a3s2t_ad3si_ade3u_ader2_adi2a_adi2e_adi2o_adi2á_adi2é_anti1_ci2s3_co2n1_coi3u_cre3u_cu4ll_cu4mm_cu4sp_có2n1_cú4sp_de1in_de1it_de1ín_de4uc_de4ul_di2sj_ei5on_he3i__i6uli_i6úli_iai2u_iei2u_ini2e_ini2u_ini2é_ini2ú_inu2a_inu2e_inu2i_inu2o_inu2u_mai4u_ne3ut_né3ut_ob5st_po3et_pro3u_re1ie_re1in_re3ul_re3um_ree2x_su2b3_sú2b3_the2o_á2b3r_á3d4y_á3s2c_á3s2t_ádi2a_ádi2o_ádi2u_ób5sta1i2m_a2m3uiai6or_ci3entcui4úse2l3uee5ant_ei4us_i2oi2ui3ems_i3ens_i3ent_i3unt_nu3is_ob3s2cpha3elqu6um_r2i2m_rhe3usru3is_ru3it_ræ3s4psu3is_t2i2m_ui4us_ve6s5pvé6s5pxy4s3té5ant_éi4us_",
  "7": "2s3dem_2s3que_3s4parg3s4perg3s4pern3s4pers3s4plen3s4plén3s4pond3s4pons3s4párg3s4pérg3s4pérn3s4pérs3s4pónd3s4póns5s4trep5s4trom5s4trép_a2b1eo_a2b1er_a2b1ic_a2b1ig_a2b1ii_a2b1ir_a2b1it_a2b1iv_a2b1ol_a2b1om_a2b1or_a2b1ér_a2b1ól_a2b1ór_a2b3ru_a2b3us_a2b3ut_a2b3út_a3b3æq_a3d4ip_a3d4on_a3d4íp_a3d4ón_a3s4pu_a3s4pú_a4b3es_a4b3és_a4d5ul_a4d5æq_a4s3tr_a4sthm_ad3i2u_ad3i2ú_ad5is__ad5it__adi3en_adi3én_ado2b3_adsu3e_adó2b3_alte3r_alté3r_am2b3i_am2b3í_ante3u_co1i2e_co2e1n_co3e2r_co3n2a_co3n2e_co3n2i_co3n2o_co3n2u_co3n2á_co3n2é_co3n2í_co3n2ó_co3n2ú_coa2d3_coá2d3_có3n2i_de3es__de3s2c_de3s2q_de3s2t_de3s4p_di3i4u_di3i4ú_disi3c_disí3c_dé3s2t_dé3s4p_e2t3en_e3x4ed_e3x4od_e3x4éd_e3x4ód_ex3s4p_ex5s2t_ex5s4c_exo2b3_exó2b3_hu1i2u_hu1i2ú_hucu4s_i2d1eo_i2d1eó_i3n2an_i3n2it_i3n2án_i5n4ul_i5n4úl_i7uli__i7ulid_i7úli__i7úlid_in3s4p_in4d3u_in4d3ú_in5s2t_ina2cr_ina2df_ine2x3_ino2b3_inó2b3_lu3x2u_lu3x2ú_lu4x3q_o3b4el_o3b4il_o3b4ol_o3b4íl_ob3s2q_obi2ac_obi2ec_obi2ur_obi2ác_obi2éc_obi2úr_para1i_para1u_pe2r1a_pe2r1á_pe2r3h_pe2r3u_pe2r3ú_pe4r3j_posu3í_primi1_pro3in_præ3es_præi4a_præi4o_præi4u_præi4á_præi4ú_pulei4_puléi4_pé2r1a_pé2r3h_pé4r3j_pósu3i_re2d1h_re3ips_re3ite_re3s4p_repa2u_rhe4u__ré3s4p_sa3ul__su3s4p_sú3s4p_terp2s_the3ur_tra1ii_tri3en_uni3an_uni3án_va6s5p_vá6s5p_á2b1eo_á2b1er_á2b1ii_á2b1it_á2b3ig_á2b3lu_á3d4ip_á3s4pu_á4s3tr_álte3r_ám2b3i_é2t3en_é3x4ed_é3x4od_éx3s4p_éx5s2t_éx5s4c_í2d1eo_í5n4ul_ín3s4p_ín4d3u_ín5s2t_ó3b4el_ó3b4olai4unt_con5s4tcri6s5pcrí6s5pcón5s4tge3n2uahu2c5usi2u2s3li2u2s3vi2ú2s3li2ú2s3vlangú3elu3i2a_lú3i2a_ngu2i3ongu4em_ngu4es_ngu4et_ngu4is_ngu4it_ob4s3cuob4s3cúpo2t3enpo2t3erpo2t3espo2t3énpo2t3érpo2t3éspro3s4ppró3s4ppó2t3erti3n2uitru3um_tru3us_u2s3quex2u3it_x2ú3it_",
  "8": "5s4trang5s4trict5s4trigi5s4tring5s4troph5s4tráng5s4tríct5s4trígi5s4tríng_a2b1ali_a2b1auu_a2b1e3u_a2b1e3ú_a2b1i4u_a2b1i4ú_a2b1in1_a2b1ort_a2b1é3u_a2b3ier_a2b3iér_a2b3und_a2b3únd_a2d5s2t_a3b4rah_a3d4am__a3d4eps_a3d4ran_a3d4rán_a3d4u3a_a3d4u3á_a3d4urn_a4d3ole_a5s4tru_a5s4trú_ab4s3tu_ab4s3tú_ad3s2cr_alte4rc_alte4rn_alte4rp_alte4rt_alté4rc_alté4rn_alté4rp_alté4rt_am2b3ag_am2b3ax_am2b3ed_am2b3es_am2b3ur_am2b3us_am2b3ág_am2b3áx_am2b3éd_am2b3és_am2b3úr_am2b3ús_am3b4ic_am3b4id_am3b4if_am3b4il_am3b4íc_am3b4íl_ambi2ec_ambi2éc_ape3r2u_archi3e_be4th5l_bé4th5l_co2m3ed_co2m3it_co2m3éd_co2m3ít_co3e2x3_co3emen_co4n3ic_co4n3íc_coadi2u_coadi2ú_coex3s2_con3s4p_coádi2u_có2m3ed_có2m3it_cón3s4p_de4urio_de4urío_depe4r5_depé4r5_di2r1im_di2r1ím_di2s1i2_di2s1í2_di5s4cr_di5s4ta_di5s4tá_dia3s4p_dépe4r5_e3u3ax__e3x4orc_e3x4ost_e3x4óst_e3ú3ax__ele3usa_ele3usæ_eu3s2ty_eu3s2tý_i3n2ers_i3n2ert_i6n5ulc_i6n5ult_i6n5úlc_i6n5últ_i7ulis__i7úlis__in3s4cr_in4d3ep_in4d3ig_in4d3ép_in5d4is_in5d4u__in5d4ub_in5d4uc_in5d4ug_in5d4ul_in5d4up_in5d4ur_in5d4ux_in5d4úb_in5d4úc_in5d4úl_in5d4úr_in5d4úx_ina2b3r_inab3s2_inexs2t_inte2r3_inté2r3_ne2c1op_ne2c1óp_ne2g1ot_ne2g1ót_o3b4rim_o3b4ryz_o3b4rýz_o4b5ole_o4b5olé_pe1i6or_pe1i6ór_pe2r1cu_pe2r1el_pe2r1em_pe2r1od_pe2r1of_pe2r1ol_pe2r1op_pe2r1ém_pe2r3ea_pe2r3eg_pe2r3eo_pe2r3i1_pe2r3ib_pe2r3ie_pe2r3in_pe2r3ir_pe2r3ié_pe2r3ég_pe2r3í1_pe2r3íb_pe2r3íe_pe2r3ín_pe3r2a__pe3r2at_pe3r2át_pe3r4ia_pe3r4io_pe3r4it_pe3r4iá_pe3r4ul_pe3r4ít_pe3r4úl_pe4r1ed_pe4r3ec_pe4r3im_pe4r3or_pe4r3ím_pe4r3ór_pe5r4ip_perie3i_perié3i_períe3i_po2t3ue_po2t3ui_po2t3ué_po2t3uí_po2t3úe_po2t3úi_pos4t3h_pro2d1e_pro2d1é_pro3g2n_pro3i4e_pro3i4é_pro3s2c_pro5s2t_præ3a2u_præ3s2c_præ5s2t_præe2x1_præi4ec_præé2x1_pró2d1e_prǽ5s2t_pé2r3eo_pé2r3ii_pé4r3im_pó2t3ui_quo6d5l_re2d1ac_re2d1ad_re2d1am_re2d1an_re2d1ar_re2d1ea_re2d1eg_re2d1em_re2d1eo_re2d1eá_re2d1i__re2d1ib_re2d1ig_re2d1ii_re2d1im_re2d1in_re2d1ir_re2d1iv_re2d1ií_re2d1ol_re2d1op_re2d1ul_re2d1un_re2d1uv_re2d1ác_re2d1ád_re2d1ám_re2d1án_re2d1ár_re2d1ég_re2d1ém_re2d1íb_re2d1íi_re2d1ím_re2d1ín_re2d1ír_re2d1ív_re2d1ól_re2d1óp_re2d1úl_re2d1ún_re2d1úv_re2d5is_re2d5it_re2d5ít_re3d2ic_re3i2ec_re3s2cr_re3s2cu_re3s2cú_re5s2to_re5s4ta_re5s4tr_re5s4tá_ré2d1am_ré2d1ea_ré2d1eo_ré2d1ig_ré2d1ii_ré2d1im_ré2d1ol_ré2d5it_ré5s4tr_sa2t1ag_sa2t1ág_sati2s1_se2m3un_se2m3us_si2c1ut_sta3g2n_su3b4io_su3b4ió_su3b4ul_su3b4úl_su5s4cr_sub3s4p_subi4ac_subi4ec_subi4ug_subi4un_subi4ác_subi4éc_subi4úg_subi4ún_subne3u_subné3u_sí2c1ut_sú3b4io_sú3b4ul_súbi4ug_súbi4un_te2r1un_te2r1ún_the3s2t_thi3s2b_tra1i2a_tra1i2e_tran2s1_trán2s1_ve2l1ut_vipe3r4_vipé3r4_vípe3r4_á2b1e3u_á3b4rah_á3d4ran_á5s4tru_áb4s3tu_ám2b3ag_ám2b3ed_ám3b4id_ín4d3ig_ín5d4ur_ínte2r3_ó4b5oleab4s3tinab4s3tínlangu3i_langu4ealángu3i_me4t3ipsngui5us_pe2r3e3upe2r3e3úpe2r3é3upé2r3e3uáb4s3tin",
  "9": "_a2b1i2ec_a2b1i2éc_a3d4i3ab_a3d4i3áb_a3d4ramy_a5s4trat_a5s4trid_a5s4trát_a5s4tríd_a6s5plen_a6s5plén_a6s5purg_a6s5púrg_ab4s3ten_ab4s3tol_ab4s3tru_ab4s3trú_ab4s3tén_ab4s3tól_absu2b3l_absú2b3l_am2b3arv_am3b4ieg_am3b4ima_am3b4iso_am3b4isó_am3b4itr_am3b4iva_am3b4ix__am3b4iég_am3b4íma_ani2m3ad_anti3m2n_be2n1i4a_bou6s5tr_bé2n1i4a_circu4m1_circú4m1_co2m3es__co3e2lec_co3e2lig_co3g2nos_co3g2nós_co4n3i2u_co4n3i2ú_compe2r3_compo3t4_compé2r3_con3s2cr_có4n3i2u_cómpo3t4_cón3s2cr_de4uter__de4utera_de4uteri_de4utero_de4uteru_de4uterá_de4uteræ_de4uteró_de4utéri_di5s4ced_di5s4cen_di5s4cep_di5s4cer_di5s4ces_di5s4cid_di5s4cin_di5s4cip_di5s4cit_di5s4céd_di5s4cén_di5s4cép_di5s4cér_di5s4cés_di5s4cíd_di5s4cín_di5s4cíp_di5s4ert_di5s4tim_di5s4tin_di5s4tir_di5s4to__di5s4tím_di5s4tín_di5s4tír_di5s4ért_di6s5cre_di6s5cru_di6s5cré_dispe2r3_dispé2r3_dy6s5p6n_dí5s4cit_e2t3i3am_e2t3i3ám_e3x4eget_e3x4egét_epi5s4tr_epi5s4ty_epi5s4tý_eu3s2tom_eu3s2tóm_exam2b3i_exam2b3í_exám2b3i_in5d4ign_in5d4us__in5d4ígn_infra3s4_inobi6ur_inte3r4a_inte3r4á_lon2g1an_lon2g1án_o3b4russ_o3b4rúss_par3s4tr_pe2r1coq_pe2r1eff_pe2r1eru_pe2r1o2b_pe2r1u2a_pe2r1u2e_pe2r1u2i_pe2r1u2o_pe2r3eas_pe2r3es__pe2r3eám_pe2r3eát_pe2r3i4u_pe2r3i4ú_pe2r3reg_pe2r3s2c_pe2r3s2t_pe3r2am__pe3r2as__pe3r4ian_pe3r4icl_pe3r4icu_pe3r4ieb_pe3r4iem_pe3r4ien_pe3r4ier_pe3r4iet_pe3r4int_pe3r4iod_pe3r4iri_pe3r4iéb_pe3r4iém_pe3r4ién_pe3r4iér_pe3r4iét_pe3r4iód_pe3r4ícl_pe3r4ícu_pe3r4íer_pe3r4ínt_pe3r4íod_pe3r4íri_pe4r3att_pe4r3enn_pe4r3err_pe4r3átt_pe4r3énn_pe4r3érr_pe4r5it__pe5r4imi_pe5r4imu_pe5r4irr_pe5r4ími_pe5r4ímu_pe6r3egr_po3t4er__pos4t3ea_pos4t3er_pos4t3eá_pos4t3il_pos4t3ér_pos4t3íl_pro2d1ac_pro2d1ib_pro2d1ie_pro2d1ig_pro2d1ii_pro2d1ir_pro2d1iv_pro2d1ié_pro2d1ií_pro2d1ác_pro2d1íb_pro2d1íe_pro2d1íg_pro2d1íi_pro2d1ír_pro2d1ív_pro3d2e__pro3d2eb_pro3d2ec_pro3d2ef_pro3d2em_pro3d2en_pro3d2et_pro3d2éb_pro3d2ém_pro3d2én_pro3d2ét_prod3es__præte2r3_præté2r3_pró2d1ie_pró2d1ig_pró2d1ii_prǽte2r3_pseu2d3a_pæ2n3ins_pæ2n3íns_pé2r3eam_pé2r3eas_pé2r3eat_pé2r3i4u_pé2r3s2t_pé6r3egr_pós4t3ea_pós4t3er_quo2t1an_quo2t1án_quo2t3li_quó2t3li_re2d1a2u_re2d1e3u_re2d1e3ú_re2d1ien_re2d1ier_re2d1iér_re2d1ord_re2d1orn_re2d1á2u_re2d1íer_re2d1órd_re2d1órn_re3d2orm_re3d4amn_re3d4ari_re3d4ámn_re3d4ári_re4d3imi_re5s2tag_re5s2ter_re5s2tib_re5s2tic_re5s2til_re5s2tin_re5s2tip_re5s2tér_re5s2tíb_re5s2tíl_re5s2tín_re5s2típ_re5s4tit_re5s4tít_re6s5pub_re6s5púb_redin2d3_ré2d1e3u_ré2d1ien_ré5s4tit_se2d1iti_se2d1íti_se3s4cen_semi3s4p_si3s2ten_su3b4ia__su6s5pen_su6s5pén_sub5s4cr_subam2b3_supe2r1u_supe2r1æ_supe2r1ú_supe2r3h_sú3b4ia__te2r1i2u_theo3g2n_tra2n1ue_tran3s2u_tran3s2ú_transi2u_transi2ú_trán3s2u_ute2r3ui_á2d5s2tr_áb4s3tru_é2t3i3am_ínte3r4aab4s3tracab4s3tráclangu3eralangu3erilangu3erolangu3erálangu3isslangu3istlangu3érilangu3ísslangu3ístlangu4esclangu5it_lángu5it_",
  "10": "_a3d4amant_a4d5ipisc_a4d5ipísc_a6s5trum__ab4s3temi_ab4s3terg_ab4s3terr_ab4s3ters_ab4s3trah_ab4s3tras_ab4s3trax_ab4s3tráh_ab4s3trás_ab4s3tráx_ab4s3témi_ab4s3térg_ab4s3térr_ab4s3térs_alte4r3ut_alte4r3út_alté4r3ut_am2b3a2d3_am2b3á2d3_am3b4iani_am3b4iano_am3b4ianó_am3b4ibar_am3b4ibár_am3b4iori_am3b4iorí_am3b4isin_am3b4itex_am3b4itut_am3b4itéx_am3b4ivia_am3b4ivie_am3b4ivii_am3b4ivio_am3b4iviu_am3b4ivió_am3b4iáni_am3b4iáno_am3b4íori_am3b4ítut_am3b4ívia_am3b4ívie_am3b4ívii_am3b4ívio_am3b4íviu_ar2ch3ang_ar2ch3áng_circum5s4_circume3u_circume3ú_circumi2a_circumi2e_circumi2o_circumi2u_circumi2á_circumi2é_co4n3i2ac_co4n3i2ec_co4n3i2ex_co4n3i2ác_co4n3i2éc_co4n3i2éx_co5n4ium__compe3r4i_compe3r4u_compe3r4í_compe3r4ú_compé3r4i_conde3s4p_di3g2nosc_di5s4ciss_di5s4císs_di5s4till_di5s4trar_di5s4trat_di5s4trav_di5s4trár_di5s4trát_di5s4tráv_di5s4tíll_di6s5crim_di6s5cruc_di6s5crím_di6s5crúc_di6s5tine_di6s5tíne_in4d3ipis_in4d3ipís_in5d4utia_in5d4utii_in5d4utio_in5d4utiá_in5d4utiæ_in5d4utió_in5d4útia_in5d4útii_in5d4útiæ_in6d5ucul_in6d5úcul_incircu4m_inte3r4et_inte3r4io_inte3r4ió_inte3r4o__inte3r4ul_inte3r4ét_inte3r4úl_inte4r5ap_inte4r5áp_inter3s4p_inter5s4t_intran2s1_intro3i3e_intro3i3é_inté3r4io_inté3r4ul_intér5s4t_iu2s3i2ur_lecti5s4t_ob6s3trud_ob6s3trus_ob6s3trúd_ob6s3trús_pe2r1a2d1_pe2r1i2ac_pe2r1i2ec_pe3r4i3st_pe3r4i5un_pe3r4i5ún_pe3r4ileu_pe3r4iléu_pe3r4irer_pe3r4iret_pe3r4irér_pe3r4irét_pe3r4í3st_pe3r4írer_pe4r1e2x3_pe4r5iens_pe4r5iera_pe4r5itur_pe4r5itúr_pe4r5íera_pe4r5ítur_pe5r4imed_pe6r5imus_pe6r5ímus_po3t4ent__po3t4ere__po3t4ére__pos5t4erg_primi3s2c_pro2d1amb_pro2d1ámb_pro3d2ere_pro3d2eré_pro3d2ére_pro4s3tit_pro5s4tan_pro5s4tar_propte2r3_propté2r3_præin3s4t_præte3r4a_præte3r4á_præín3s4t_pró3d2ere_prǽte3r4a_pseudo3s4_pseudó3s4_pé2r3eant_pé4r5iens_pé4r5iera_quin2c3un_quo2t1enn_quo2t1énn_quo6n3iam_quó6n3iam_re5s4ta2u_re6s3ticu_retran2s1_retrán2s1_seme2t3ip_semiam2b3_ses2c1u4n_su3b4iis__su3b4ium__subte2r3h_supe2r1ac_supe2r1af_supe2r1ag_supe2r1al_supe2r1ap_supe2r1au_supe2r1ea_supe2r1eb_supe2r1ed_supe2r1ef_supe2r1eg_supe2r1el_supe2r1en_supe2r1eo_supe2r1eq_supe2r1er_supe2r1es_supe2r1ev_supe2r1eá_supe2r1ib_supe2r1ie_supe2r1il_supe2r1im_supe2r1ir_supe2r1iv_supe2r1ié_supe2r1oc_supe2r1op_supe2r1ác_supe2r1áf_supe2r1ág_supe2r1ál_supe2r1éa_supe2r1éd_supe2r1éf_supe2r1ég_supe2r1él_supe2r1én_supe2r1éq_supe2r1ér_supe2r1és_supe2r1év_supe2r1íb_supe2r1íe_supe2r1íl_supe2r1ím_supe2r1ír_supe2r1ív_supe2r1óc_supe2r1óp_supe2r3s4_supe2r5ii_supe2r5ií_supe2r5íi_supe3r2æ__supe4r3it_supe4r3ít_supra3s2c_supra3s4t_suprá3s4t_supé2r1ea_supé2r1ed_supé2r1eo_supé2r1er_supé2r1es_supé2r3s4_supé2r5ii_supé4r3it_sú3b4iis__sú3b4ium__súpe2r1es_súpe4r3it_tetra3e2t_tetra3g2n_tetra3s2t_tran3s2cr_tran3s2er_tran3s2il_tran3s2ér_tran3s2íl_trán3s2er_trán3s2il_áb4s3trah_ínte3r4et_ínte3r4o_langu3ere_langu3ére_su2b5s4tan",
  "11": "_a2d3a3s4cr_ab5s4tent__am3b4iatin_am3b4iatín_am3b4igene_am3b4igené_am3b4igéne_circumi2n3_circumo2b3_circumó2b3_circú4m5s4_compe3r4en_compe3r4er_compe3r4én_compe3r4ér_compe4r5ib_compe4r5ii_compe4r5ií_compe4r5íb_compe4r5íi_compo4t5en_compo4t5én_compé3r4er_compé4r5ii_cómpo4t5en_de5uteris__de5utéris__i2d1ipsum__i2d1ípsum__incon5s4tr_incón5s4tr_inpe2r3iur_inte3r4em__inte3r4ent_inte3r4er__inte3r4or__inte3r4ént_inte4r5amn_inte4r5anh_langu4ere__langu4eri__langu4ére__langu4éri__pe3r2arum__pe3r2árum__pe3r4i3s2c_pe3r4iremi_pe3r4irémi_pe3r4í3s2c_pe4r5iret__pe4r5itote_pe4r5itóte_pe5r4isseu_pe5r4isséu_pe5r6ierat_pe5r6íerat_po3t4éris__po4s4t3hac_pro2d1íte__pro2d1íto__pro3d2eamb_pro3d2eámb_pro6s5para_præpo2t3ue_præpo2t3ui_præpo2t3ué_præpo2t3uí_præpo2t3úe_præpo2t3úi_præpó2t3ui_præte3r4e__præte3r4eb_præte3r4em_præte3r4en_præte3r4et_præte3r4o__præte3r4éb_præte3r4ém_præte3r4én_præte3r4ét_præte4r5ac_præte4r5ag_præte4r5ác_præte4r5ág_prǽte3r4e__prǽte3r4en_prǽte3r4et_prǽte3r4o__pseudo4s5t_pseudó4s5t_pé5r6ierat_qua2m3o2b3_quattuo2r3_quoa2d3usq_quoa2d3úsq_quá2m3o2b3_reco2n3i2u_reco2n3i2ú_supe2r1amb_supe2r1arg_supe2r1asc_supe2r1asp_supe2r1att_supe2r1emi_supe2r1emo_supe2r1emí_supe2r1emó_supe2r1i2a_supe2r1i2u_supe2r1i2á_supe2r1i2ú_supe2r1iss_supe2r1ord_supe2r1ámb_supe2r1átt_supe2r1émi_supe2r1émo_supe2r1íss_supe2r1órd_supe2r3es__supe3r2ent_supe3r2er__supe3r2um__supe3r2us__supe3r2ént_superadi2u_superadi2ú_superco2m3_supercó2m3_superádi2u_súpe2r3es__súpe3r2ent_ta2m3etsi__ta2m3étsi__tran3s2enn_tran3s2énn_tran4s3ulm_trans1a2b1_trans1a2d1_trans1á2b1_trans1á2d1_u3n2i3uscu_ínte3r4em__ínte3r4ent_ínte3r4er__ínte3r4or_langu3imus_",
  "12": "_circumam2b3_circumám2b3_compe4r5ier_compe4r5iér_compe4r5íer_in5d4u5s4tr_in5d4ú5s4tr_inte2r1i2ac_inte2r1i2ec_inte2r1i2un_inte2r1i2ác_inte2r1i2éc_inte2r1i2ún_inte3r4ere__inte3r4ius__inte3r4ére__inté2r1i2ac_inté3r4ere__inté3r4ius__pe2r1a2b1i2_pe3r4iremur_pe3r4irémur_pe4r5iretis_pe4r5irétis_po3t4entur__po3t4éntur__pro2d1ímus__pro2d1ítis__pro2d1ítur__pro3d2éris__præpo3t4er__præpó3t4er__præpó3t4es__præte3r4ere_præte3r4eré_præte3r4or__præte3r4unt_præte3r4ére_præte3r4únt_præté3r4ere_prǽte3r4or__prǽte3r4unt_pseudoco2m1_que2m3a2d3m_que2m3á2d3m_supe2r1a2d3_supe2r1e2x1_supe2r1i2ec_supe2r1i2n3_supe2r1i2éc_supe2r1o2b3_supe2r1á2d3_supe2r1é2x1_supe2r1í2n3_supe2r1ó2b3_supe3r2ere__supe3r2ius__supe3r2ére__superadi2ec_superadi2éc_superde3s2tlangu3erunt_langu3érunt_",
  "13": "_am3b4igenus__am3b4ígenus__inte3r4emur__inte3r4emus__inte3r4émur__inte3r4émus__inte3r4éris__inte4r5aresc_inte4r5arésc_pe2r3tran2s1_pe2r3trán2s1_pe3r4irentur_pe3r4iréntur_præpo3t4ent__præpo3t4ere__præpo3t4ére__subte2r3s4tr_supe2r1a2b3l_supe2r1a2b3n_supe2r1a5s6t_supe2r1á2b3l_supe2r1á5s6t_supe3r2éris__superin5d2uc_superin5d2ux_superin5d2úc_superin5d2úx_superind3ui__supertran2s1_supertrán2s1_superínd3ui__tran4s3erer__trán4s3erer_",
  "14": "_circumam3b4ul_circumam3b4úl_circumám3b4ul_inte3r4emini__inte3r4émini__præpo3t4éris__præte3r4imur__præte3r4itor__præté3r4imur__præté3r4itor__supe3r2emini__supe3r2émini_",
  "15": "_præpo3t4entur__præpo3t4éntur__præte3r4imini__præte3r4ímini__supe2r1a2b3und_supe2r1a2b3únd_supe2r1i2n3i2e_supe2r1i2n3i2é_supe2r1i2n3s4t_supe2r1i2n4d1u_supe2r1i2n4d1ú_supe2r1í2n3s4t_supe2r1í2n4d1u_supe3r2a6s7ti__supe3r2á6s7ti__tran4s3eremur__tran4s3erémur_",
  "16": "_supe3r2a6s7tis__supe3r2á6s7tis__tran4s3eremini__tran4s3erentur__tran4s3erémini__tran4s3eréntur_"
 }
});

// Hyphenation of the text that isn't drawn as chant: the Latin and each translation get soft
// hyphens, with Hypher and the patterns of their lang (js/hyphenation/, which
// tools/hyphenation/build.js generates), as in jgabc's propers tool, so long words break at the end
// of a narrow column.  Latin's patterns are jgabc's, and la-x-bea (the Pius XII psalter) is Latin.
// The plain text of a <chant-gabc> is Latin, and nothing in a score's SVG is touched.
//
// watch() hyphenates the page and then whatever is added to it, so the text is hyphenated each time
// it's drawn again (text-mode.js translate(), a <chant-gabc>'s plain text or the translations under
// its notes).  A language's patterns load the first time its text is on the page, except Latin's,
// which come with this module.  Copying leaves the soft hyphens out.
define('hyphenate',['hypher', 'hyphenation/la'], function(Hypher, latin) {
  'use strict';
  var SHY = /\u00AD/g;
  // Latin's patterns break after a single letter, as they divide syllables under the notes; in a line
  // of text, a word keeps at least two letters on each side of the hyphen.
  var minimums = {la: {leftmin: 2, rightmin: 2}};
  // Words shorter than this aren't hyphenated (as in Hypher's hyphenateText).
  var minLength = 5;
  // A word: the letters (and combining accents, as in œ́) of the Latin alphabet, accented or not.
  var regexWord = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u0300-\u036F]+/g;
  // Elements that a word may run through, as the pointed psalms' <b> and <i> do.
  var regexInline = /^(B|I|EM|STRONG|SPAN|U|SMALL|SUB|SUP|A)$/;
  var regexSkip = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION|BUTTON)$/;
  var htmlNamespace = 'http://www.w3.org/1999/xhtml';

  // The patterns a lang attribute uses, or null: the language without its region or variant.  The
  // languages are those tools/hyphenation/build.js generates; for any other, load() finds no module.
  var patternsFor = function(lang) {
    var code = (lang || '').toLowerCase().split('-')[0];
    return /^[a-z]{2,3}$/.test(code) ? code : null;
  };
  // Each language's Hypher, null while its patterns load, or false if they couldn't.
  var hyphenators = {};
  var cache = {};
  var makeHyphenator = function(code, language) {
    var settings = {};
    for(var key in language) settings[key] = language[key];
    for(key in minimums[code]) settings[key] = minimums[code][key];
    hyphenators[code] = new Hypher(settings);
    cache[code] = {};
  };
  makeHyphenator('la', latin);
  // A word's pieces, between which it may break.
  var pieces = function(code, word) {
    var words = cache[code];
    if(!words.hasOwnProperty(word)) words[word] = hyphenators[code].hyphenate(word);
    return words[word];
  };

  // The language of an element's own text, if it says: its lang; none for a rubric (in English, as
  // a chant's labels are); or for a <chant-gabc>, Latin as plain text or none as chant (but the
  // translations under the notes have their own lang).
  var ownLang = function(el) {
    if(el.hasAttribute('lang')) return el.getAttribute('lang');
    if(el.classList.contains('red')) return '';
    if(el.tagName === 'CHANT-GABC') return el.classList.contains('plain-text') ? 'la' : '';
    return undefined;
  };
  // The page's own lang (English, for the rubrics and the menus) isn't one to hyphenate.
  var contextLang = function(el) {
    for(; el && el.nodeType === 1 && el !== document.documentElement; el = el.parentNode) {
      var lang = ownLang(el);
      if(lang !== undefined) return lang;
    }
    return '';
  };

  // Blocks waiting for each language's patterns.
  var waiting = {};
  var load = function(code, block) {
    // each block once, and only while it's on the page
    waiting[code] = (waiting[code] || []).filter(function(other) {
      return other !== block && document.body.contains(other);
    }).concat([block]);
    if(code in hyphenators) return;
    hyphenators[code] = null;
    require(['hyphenation/' + code], function(language) {
      makeHyphenator(code, language);
      var blocks = waiting[code];
      delete waiting[code];
      blocks.forEach(function(block) {
        if(document.body.contains(block)) hyphenateBlock(block);
      });
    }, function(err) {
      console.warn('No hyphenation for ' + code, err);
      hyphenators[code] = false;
      delete waiting[code];
    });
  };

  // Hyphenates the text in an element.  The text between two block elements is a run, hyphenated as
  // one string, so that a word split by <b> or <i> is hyphenated as a whole.  The soft hyphens that
  // are there already go first, so text can be hyphenated again.
  var hyphenateBlock = function(block) {
    var runs = [];
    var run = null;
    var walk = function(node, lang) {
      for(var child = node.firstChild; child; child = child.nextSibling) {
        if(child.nodeType === 3) {
          if(!run) runs.push(run = {lang: lang, nodes: []});
          run.nodes.push(child);
        } else if(child.nodeType === 1) {
          // a score's SVG, and form controls
          if(child.namespaceURI !== htmlNamespace || regexSkip.test(child.tagName)) {
            run = null;
            continue;
          }
          var own = ownLang(child);
          var boundary = own !== undefined || !regexInline.test(child.tagName) || child.classList.contains('versiculum');
          if(boundary) run = null;
          walk(child, own === undefined ? lang : own);
          if(boundary) run = null;
        }
      }
    };
    walk(block, contextLang(block));
    runs.forEach(function(run) {
      var code = patternsFor(run.lang);
      if(!code) return;
      if(!hyphenators[code]) {
        if(hyphenators[code] !== false) load(code, block);
        return;
      }
      var values = run.nodes.map(function(node) { return node.nodeValue.replace(SHY, ''); });
      var text = values.join('');
      // where the soft hyphens go, as offsets into text
      var breaks = [];
      text.replace(regexWord, function(word, offset) {
        if(word.length < minLength) return word;
        pieces(code, word).slice(0, -1).forEach(function(piece) {
          offset += piece.length;
          breaks.push(offset);
        });
        return word;
      });
      // A break at the end of one text node goes there, rather than at the start of the next.
      var start = 0;
      var b = 0;
      run.nodes.forEach(function(node, i) {
        var value = values[i];
        var end = start + value.length;
        var result = '';
        var last = start;
        for(; b < breaks.length && breaks[b] <= end; ++b) {
          if(breaks[b] <= start) continue;
          result += value.slice(last - start, breaks[b] - start) + '\u00AD';
          last = breaks[b];
        }
        result += value.slice(last - start);
        if(node.nodeValue !== result) node.nodeValue = result;
        start = end;
      });
    });
  };

  // The element whose text a change to node affects: the nearest that isn't inline, but never all of
  // <body> (then node itself).  null in an SVG.
  var blockOf = function(node) {
    var el = node.nodeType === 1 ? node : node.parentNode;
    while(el && el.nodeType === 1 && el !== document.body && el.namespaceURI === htmlNamespace && regexInline.test(el.tagName)) {
      el = el.parentNode;
    }
    if(el === document.body) el = node;
    if(!el || el.nodeType !== 1 || el.namespaceURI !== htmlNamespace || el.closest('svg')) return null;
    return el;
  };
  // What's added to the page, an element whose lang changes, and a <chant-gabc> whose class does
  // (between chant and plain text).
  var hyphenateChanged = function(records) {
    var blocks = [];
    records.forEach(function(record) {
      var nodes = record.type !== 'attributes' ? record.addedNodes :
        record.attributeName === 'lang' || record.target.tagName === 'CHANT-GABC' ? [record.target] : [];
      for(var i = 0; i < nodes.length; ++i) {
        var block = blockOf(nodes[i]);
        if(block && blocks.indexOf(block) < 0) blocks.push(block);
      }
    });
    blocks.filter(function(block) {
      // each only once, as part of the outermost changed
      return document.body.contains(block) && !blocks.some(function(other) {
        return other !== block && other.contains(block);
      });
    }).forEach(hyphenateBlock);
  };

  // Copied text keeps the hyphens only where they're written.  The browser would copy the soft
  // hyphens too, so the copy is made here, without them, of what's shown.  The HTML keeps what the
  // browser's would have written into it from the stylesheet: the rubrics' color, and ℣ and ℟'s font.
  var copyStyles = {red: ['color'], versiculum: ['font-family', 'color']};
  // A TreeWalker filter for the elements of a range, which adds each one's mark for the copy.
  var copyFilter = function(range, marks) {
    return {acceptNode: function(el) {
      if(el.namespaceURI !== htmlNamespace || !range.intersectsNode(el)) return NodeFilter.FILTER_REJECT;
      if(el.getClientRects().length === 0) {
        marks.push([el, 'data-copy-hidden', '']);
        return NodeFilter.FILTER_REJECT;
      }
      var style = [];
      Object.keys(copyStyles).forEach(function(name) {
        if(!el.classList.contains(name)) return;
        copyStyles[name].forEach(function(property) {
          style.push(property + ':' + window.getComputedStyle(el).getPropertyValue(property));
        });
      });
      if(style.length) marks.push([el, 'data-copy-style', style.join(';')]);
      return NodeFilter.FILTER_SKIP;
    }};
  };
  var copyWithoutSoftHyphens = function(e) {
    var selection = window.getSelection();
    if(!e.clipboardData || !selection || !selection.rangeCount) return;
    var text = selection.toString();
    if(text.indexOf('\u00AD') < 0) return;
    var html = document.createElement('div');
    for(var i = 0; i < selection.rangeCount; ++i) {
      var range = selection.getRangeAt(i);
      // Each selected element is marked in the copy: what's hidden (the Latin in 'translation only'
      // mode), so it can go, and what has a style to keep.  A score's SVG, what isn't selected and
      // what's hidden are passed over whole, and the marks go on only after all are read, so the
      // page is laid out once.
      var marks = [];
      var root = range.commonAncestorContainer;
      if(root.nodeType !== 1) root = root.parentNode;
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, copyFilter(range, marks));
      while(walker.nextNode()) {}
      marks.forEach(function(mark) { mark[0].setAttribute(mark[1], mark[2]); });
      html.appendChild(range.cloneContents());
      marks.forEach(function(mark) { mark[0].removeAttribute(mark[1]); });
    }
    [].slice.call(html.querySelectorAll('[data-copy-hidden]')).forEach(function(el) {
      if(el.parentNode) el.parentNode.removeChild(el);
    });
    [].slice.call(html.querySelectorAll('[data-copy-style]')).forEach(function(el) {
      el.setAttribute('style', el.getAttribute('data-copy-style'));
      el.removeAttribute('data-copy-style');
    });
    e.clipboardData.setData('text/plain', text.replace(SHY, ''));
    e.clipboardData.setData('text/html', html.innerHTML.replace(SHY, ''));
    e.preventDefault();
  };

  var watch = function() {
    hyphenateBlock(document.body);
    new MutationObserver(hyphenateChanged).observe(document.body,
      {childList: true, subtree: true, attributes: true, attributeFilter: ['lang', 'class']});
    document.addEventListener('copy', copyWithoutSoftHyphens);
  };

  return {
    watch: watch
  };
});

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define("exsurge",["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).exsurge={})}(this,function(t){"use strict";const e={DeviceIndepenedent:0,Centimeters:1,Millimeters:2,Inches:3,DIU_PER_INCH:96,DIU_PER_CENTIMETER:96/2.54,ToDeviceIndependent:function(t,s){switch(s){case e.Centimeters:return t*e.DIU_PER_CENTIMETER;case e.Millimeters:return t*e.DIU_PER_CENTIMETER/10;case e.Inches:return t*e.DIU_PER_INCH;default:return t}},FromDeviceIndependent:function(t,s){switch(s){case e.Centimeters:return t/e.DIU_PER_CENTIMETER;case e.Millimeters:return t/e.DIU_PER_CENTIMETER*10;case e.Inches:return t/e.DIU_PER_INCH;default:return t}},StringToUnitsType:function(t){switch(t.toLowerCase()){case"in":case"inches":return e.Inches;case"cm":case"centimeters":return e.Centimeters;case"mm":case"millimeters":return e.Millimeters;default:return e.DeviceIndepenedent}},UnitsTypeToString:function(t){switch(t){case e.Inches:return"in";case e.Centimeters:return"cm";case e.Millimeters:return"mm";case e.DeviceIndepenedent:default:return"device-independent"}}};class Point{constructor(t,e){this.x=void 0!==t?t:0,this.y=void 0!==e?e:0}clone(){return new Point(this.x,this.y)}equals(t){return this.x===t.x&&this.y===t.y}}class Rect{constructor(t,e,s,i){this.x=void 0!==t?t:1/0,this.y=void 0!==e?e:1/0,this.width=void 0!==s?s:-1/0,this.height=void 0!==i?i:-1/0}clone(){return new Rect(this.x,this.y,this.width,this.height)}isEmpty(){return this.x===1/0&&this.y===1/0&&this.width===-1/0&&this.height===-1/0}right(){return this.x+this.width}bottom(){return this.y+this.height}equals(t){return this.x===t.x&&this.y===t.y&&this.width===t.width&&this.height===t.height}contains(t){return t instanceof Point?t.x>=this.x&&t.x<=this.x+this.width&&t.y>=this.y&&t.y<=this.y+this.height:this.x<=t.x&&this.x+this.width>=t.x+t.width&&this.y<=t.y&&this.y+this.height>=t.y+t.height}union(t){this.unionWith(t.x,t.y,t.width,t.height)}unionWith(t,e,s,i){var n=Math.max(this.x+this.width,t+s),a=Math.max(this.y+this.height,e+i);this.x=Math.min(this.x,t),this.y=Math.min(this.y,e),this.width=n-this.x,this.height=a-this.y}}class Margins{constructor(t,e,s,i){this.left=void 0!==t?t:0,this.top=void 0!==e?e:0,this.right=void 0!==s?s:0,this.bottom=void 0!==i?i:0}clone(){return new Margins(this.left,this.top,this.right,this.bottom)}equals(t){return this.left===t.left&&this.top===t.top&&this.right===t.right&&this.bottom===t.bottom}}class Size{constructor(t,e){this.width=void 0!==t?t:0,this.height=void 0!==e?e:0}clone(){return new Size(this.width,this.height)}equals(t){return this.width===t.width&&this.height===t.height}}const s={Do:0,Du:1,Re:2,Me:3,Mi:4,Fa:5,Fu:6,So:7,La:9,Te:10,Ti:11};var i=[0,0,1,1,2,3,3,4,4,5,6,6],n=[s.Do,s.Re,s.Mi,s.Fa,s.So,s.La,s.Ti];class Pitch{constructor(t,e){void 0===e&&(e=Math.floor(t/12),t%=12),this.step=t,this.octave=e}toInt(){return 12*this.octave+this.step}transpose(t){return new Pitch(this.toInt()+t)}isHigherThan(t){return this.toInt()>t.toInt()}isLowerThan(t){return this.toInt()<t.toInt()}equals(t){return this.toInt()===t.toInt()}static stepToStaffOffset(t){return i[t]}static staffOffsetToStep(t){for(;t<0;)t=n.length+t;return n[t%n.length]}}function a(t){return Object.entries(t).map(([t,e])=>t&&e&&"class"!==t?`${t}: ${e};`:"").join("")}class Language{constructor(t){this.name=void 0!==t?t:"<unknown>",this.centerNeume=!1}syllabify(t){var e=[];if(void 0===t||""===t)return e;for(var s=t.split(/[\s]+/),i=0,n=s.length;i<n;i++)e.push(this.syllabifyWord(s[i]));return e}}class English extends Language{constructor(){super("English"),this.centerNeume=!0,this.regexLetter=/[a-z\u00c0-\u02af\u0300-\u036f\u1e00-\u1eff‿]+/i}findVowelSegment(t,e){var s=this.regexLetter.exec(t.slice(e));return s?{found:!0,startIndex:e+s.index,length:s[0].length}:{found:!1,startIndex:-1,length:-1}}}class Latin extends Language{constructor(){super("Latin"),this.diphthongs=["ae","au","oe","aé","áu","oé"],this.possibleDiphthongs=this.diphthongs.concat(["ei","eu","ui","éi","éu","úi"]),this.regexVowel=/(i|(?:[qg]|^)u)?([eé][iu]|[uú]i|[ao][eé]|[aá]u|[aeiouáéíóúäëïöüāēīōūăĕĭŏŭåe̊o̊ůæœǽyýÿ])/gi,this.vowels=["a","e","i","o","u","á","é","í","ó","ú","ä","ë","ï","ö","ü","ā","ē","ī","ō","ū","ă","ĕ","ĭ","ŏ","ŭ","å","e̊","o̊","ů","æ","œ","ǽ","y","ý","ÿ"],this.vowelsThatMightBeConsonants=["i","u"],this.muteConsonantsAndF=["b","c","d","g","p","t","f"],this.liquidConsonants=["l","r"]}isVowel(t){return this.vowels.includes(t)}isVowelThatMightBeConsonant(t){return this.vowelsThatMightBeConsonants.includes(t)}isVowelActingAsConsonant(t){return this.isVowelThatMightBeConsonant(t[0])&&this.isVowel(t[1])}isMuteConsonantOrF(t){return this.muteConsonantsAndF.includes(t)}isLiquidConsonant(t){return this.liquidConsonants.includes(t)}isDiphthong(t){return this.diphthongs.includes(t)}isPossibleDiphthong(t){return this.possibleDiphthongs.includes(t)}syllabifyWord(t){for(var e,s,i,n=[],a=!1,r=!1,o=t.toLowerCase(),h=0,l=function(e){a&&(n.push(t.substr(h,e)),h+=e),a=!1},u=0,c=o.length;u<c;u++){e=o[u],s="*",(i=u+1<c)&&(s=o[u+1]);var d=this.isVowel(e);"i"===e&&(0===u&&i&&this.isVowel(s)||r&&i&&this.isVowel(s))&&(d=!1),"-"===e?(a=!0,r=!1,l(u-h),h++):d?(a=!0,r&&!this.isDiphthong(o[u-1]+""+e)&&(l(u-h),a=!0),r=!0):i&&("q"===e&&"u"===s||"h"===s&&("c"===e||"p"===e||"t"===e)?(l(u-h),u++):r&&this.isVowel(s)||this.isMuteConsonantOrF(e)&&this.isLiquidConsonant(s)?l(u-h):a&&l(u+1-h),r=!1)}return a?n.push(t.substr(h)):h>0&&(n[n.length-1]+=t.substr(h)),n}findVowelSegment(t,e,s){this.regexVowel.lastIndex=0;let i=t.slice(e);var n=this.regexVowel.exec(i),a=({index:t,endIndex:e})=>t<=n.index&&e>n.index||t<this.regexVowel.lastIndex&&e>=this.regexVowel.lastIndex;let r=n&&s&&s.length&&s.find(a);for(;r;)r=(n=this.regexVowel.exec(i))&&s.find(a);return n?(n[1]&&(n.index+=n[1].length),{found:!0,startIndex:e+n.index,length:n[2].length}):{found:!1,startIndex:-1,length:-1}}}class Spanish extends Language{constructor(){super("Spanish"),this.vowels=["a","e","i","o","u","y","á","é","í","ó","ú","ü"],this.weakVowels=["i","u","ü","y"],this.strongVowels=["a","e","o","á","é","í","ó","ú"],this.diphthongs=["ai","ei","oi","ui","ia","ie","io","iu","au","eu","ou","ua","ue","uo","ái","éi","ói","úi","iá","ié","ió","iú","áu","éu","óu","uá","ué","uó","üe","üi"],this.uDiphthongExceptions=["gue","gui","qua","que","qui","quo","gué","guí","quá","qué","quí","quó"]}isVowel(t){return this.vowels.includes(t)}isWeakVowel(t){return this.weakVowels.includes(t)}isStrongVowel(t){return this.strongVowels.includes(t)}isDiphthong(t){return this.diphthongs.includes(t)}createSyllable(t){return t}syllabifyWord(t){for(var e=[],s=!1,i=!1,n=!1,a=0,r=0;r<t.length;r++){var o=t[r].toLowerCase();if(this.isVowel(o)){s=!0;var h=this.isStrongVowel(o);i&&h&&n&&(e.push(this.createSyllable(t.substr(a,r-a))),a=r),i=!0,n=h}else{if(s){if("-"===t[r])e.push(this.createSyllable(t.substr(a,r-a))),a=++r;else{for(var l,u=1,c=r+1;c<t.length&&!this.isVowel(t[c]);c++)u++;1===u?(e.push(this.createSyllable(t.substr(a,r-a))),a=r):2===u?"l"===(l=t[r+1].toLowerCase())||"r"===l||"c"===o&&"h"===l?(e.push(this.createSyllable(t.substr(a,r-a))),a=r++):(e.push(this.createSyllable(t.substr(a,++r-a))),a=r):3===u?("s"===(l=t[r+1].toLowerCase())?(r+=2,e.push(this.createSyllable(t.substr(a,r-a)))):e.push(this.createSyllable(t.substr(a,++r-a))),a=r):4===u&&(e.push(this.createSyllable(t.substr(a,r-a+2))),a=r+2,r+=3)}s=!1}else;i=!1}}return s?e.push(t.substr(a)):a>0?e[e.length-1]+=t.substr(a):0===e.length&&e.push(this.createSyllable(t)),e}findVowelSegment(t,e){for(var s=t.toLowerCase(),i=e;i<s.length;i++)if(!("u"===s[i]&&i>0&&this.uDiphthongExceptions.indexOf(s.substr(i-1,3))>=0)){if(this.diphthongs.indexOf(s.substr(i,2))>=0)return{found:!0,startIndex:i,length:2};if(this.isVowel(s[i]))return{found:!0,startIndex:i,length:1}}return{found:!1,startIndex:-1,length:-1}}}function r(t,e=!1){const s={next:new Map,isFinal:!1};for(const i of t){let t=Array.from(i);if(!t.length)continue;e&&(t=t.reverse());let n=s;for(const e of t){let t=n.next.get(e);t||n.next.set(e,t={next:new Map,isFinal:!1}),n=t}n.isFinal=!0}return s}class VowelRulesLanguage extends Language{constructor(t,e){super(t),this.vowels=new Set(Array.from(e.vowels)),this.prefixes=r(e.prefixes||[],!0),this.suffixes=r(e.suffixes||[]),this.secondary=r(e.secondary||[])}static fromVowelFile(t){const e={},s={};let i=null;const n=t.replace(/#[^\n\r]*/g,"").split(";");for(const t of n){const n=/^\s*(\w+)([\s\S]*)$/.exec(t);if(!n)continue;const[,a,r]=n,o=[],h=/\[([^\]]+)\]/g;let l;for(;l=h.exec(r);)o.push(l[1]);const u=r.split(/[\s,]+/).filter(Boolean);"language"===a&&o.length?i=e[o[0]]=e[o[0]]||{vowels:"",prefixes:[],suffixes:[],secondary:[]}:"alias"===a&&2===o.length?s[o[0]]=o[1]:i&&"vowel"===a?i.vowels+=u.join(""):!i||"prefix"!==a&&"suffix"!==a?i&&"secondary"===a&&i.secondary.push(...u):i["prefix"===a?"prefixes":"suffixes"].push(...u)}const a={};for(const t of Object.keys(e))a[t]=new VowelRulesLanguage(t,e[t]);for(let t of Object.keys(s)){let e=s[t];for(let t=0;t<10&&!a[e]&&s[e];t++)e=s[e];a[e]&&!a[t]&&(a[t]=a[e])}return a}isVowel(t){return void 0!==t&&this.vowels.has(t)}findVowelSegment(t,e,s=[]){const i=[],n=[];let a=e;for(const r of Array.from(t.slice(e))){const t=a-e,o=s.find(e=>e.index<=t&&t<e.endIndex);o?t===o.index&&(i.push("￾"),n.push(a)):(i.push(r),n.push(a)),a+=r.length}n.push(a);const r=(t,e)=>({found:!0,startIndex:n[t],length:n[e]-n[t]}),o=t=>{let e,s=this.prefixes;for(;t>=0&&(e=s.next.get(i[t]));)s=e,t--;return s.isFinal};let h,l=-1,u=-1;for(let t=0;t<=i.length;t++){const e=i[t];if(l<0){if(this.isVowel(e)){const e=i[t+1];(this.isVowel(e)||"￾"===e)&&o(t)||(l=t)}}else if(h){if(h.isFinal&&(u=t),h=h.next.get(e),!h)return r(l,u)}else if(!this.isVowel(e)&&(u=t,h=this.suffixes.next.get(e),!h))return r(l,u)}for(l=0;l<i.length;l++){let t=this.secondary;u=-1;for(let e=l;t=t.next.get(i[e]);e++)t.isFinal&&(u=e+1);if(u>=0)return r(l,u)}return{found:!1,startIndex:-1,length:-1}}}class ChurchSlavonic extends VowelRulesLanguage{constructor(){super("Church Slavonic",{vowels:"aàáâąAÀÁÂĄeèéêëěęEÈÉÊËĚĘiìíîIÌÍÎoòóôOÒÓÔuùúûůUÙÚÛŮyỳýYỲÝæǽÆǼœŒ",secondary:["l","L","ĺ","Ĺ","r","R","ŕ","Ŕ","m","M"]})}}class Hungarian extends VowelRulesLanguage{constructor(){super("Hungarian",{vowels:"aáAÁéeëÉEËiíIÍoóöőOÓÖŐuúüűUÚÜŰ"})}}const o={english:new English,latin:new Latin,spanish:new Spanish,churchSlavonic:new ChurchSlavonic,hungarian:new Hungarian},h={None:{paths:[{type:"positive",data:""}],bounds:{x:0,y:0,width:0,height:0},origin:{x:0,y:0},align:"left"},Linea:{paths:[{type:"positive",data:""}],bounds:{x:0,y:0,width:0,height:0},origin:{x:0,y:0},align:"left"},AcuteAccent:{paths:[{type:"positive",data:"M4 0C-.614.52-.614.52-.803-3.182l60.768-108.422c4.52-7.182 10.543-13.67 18.075-13.67 5.27 0 14.31 1.264 23.346 7.793 7.53 5.223 8.803 11.752 8.803 16.975 0 3.917-.52 11.1-8.05 17.628L4 0z"}],bounds:{x:0,y:0,width:0,height:125.794},origin:{x:.803,y:125.274},align:"left"},GraveAccent:{paths:[{type:"positive",data:"M105.386.26C110 .78 110 .78 110.189-2.922l-60.768-108.422c-4.52-7.182-10.543-13.67-18.075-13.67-5.27 0-14.31 1.264-23.346 7.793-7.53 5.223-8.803 11.752-8.803 16.975 0 3.917.52 11.1 8.05 17.628L105.386.26z"}],bounds:{x:0,y:0,width:0,height:125.794},origin:{x:0,y:125.274},align:"left"},Circle:{paths:[{type:"positive",data:"M0 -50A50 50 0 0 0 100 -50 50 50 0 0 0 0 -50M10 -50A40 40 0 0 1 90 -50 40 40 0 0 1 10 -50"}],bounds:{x:0,y:0,width:100,height:100},origin:{x:-50,y:100}},Semicircle:{paths:[{type:"positive",data:"M0 -50A50 50 0 0 0 100 -50 5 5 0 0 0 90 -50 40 40 0 0 1 10 -50 5 5 0 0 0 0 -50"}],bounds:{x:0,y:0,width:100,height:55},origin:{x:-50,y:50}},ReversedSemicircle:{paths:[{type:"positive",data:"M0 0A50 50 0 0 1 100 0 5 5 0 0 1 90 0 40 40 0 0 0 10 0 5 5 0 0 1 0 0"}],bounds:{x:0,y:0,width:100,height:55},origin:{x:-50,y:50}},Stropha:{paths:[{type:"positive",data:"M1.22-73.438c4.165 13.02 12.238 27.084 24.217 42.188L49.657 0 34.812 27.344C18.666 55.47-.084 72.396-21.438 78.124c4.687-3.645 7.03-8.593 7.03-14.843 0-8.853-4.947-20.572-14.843-35.155L-48 0 1.22-73.438z"}],bounds:{x:0,y:0,width:97.657,height:151.562},origin:{x:48,y:73.438},align:"left"},StrophaLiquescent:{paths:[{type:"positive",data:"M1.22-73.438c4.165 13.02 12.238 27.084 24.217 42.188L49.657 0 34.812 34.18C18.666 69.338-.084 90.495-21.438 97.655c4.687-4.556 7.03-10.741 7.03-18.554 0-11.066-4.947-25.715-14.843-43.944L-48 0 1.22-73.438z"}],bounds:{x:0,y:0,width:97.657,height:171.093},origin:{x:48,y:73.438},align:"left"},BeginningAscLiquescent:{paths:[{type:"positive",data:"M-50 43.688V-61c4.167 7.292 12.76 10.938 25.78 10.938 9.376 0 20.053-1.563 32.032-4.688C31.773-60.48 45.833-71.677 50-88.344v117.97C43.75 42.645 32.812 51.5 17.187 56.186-.52 61.398-15.886 64-28.906 64-42.97 64-50 57.23-50 43.687z"}],bounds:{x:0,y:0,width:100,height:152.344},origin:{x:50,y:88.344},align:"left"},BeginningDesLiquescent:{paths:[{type:"positive",data:"M-50-56.03c0-13.022 7.03-19.532 21.094-19.532 13.02 0 28.385 2.604 46.093 7.812C32.813-63.583 43.75-54.73 50-41.187V76C45.833 59.854 31.77 48.656 7.812 42.406c-11.98-3.125-22.656-4.687-32.03-4.687-13.022 0-21.615 3.905-25.782 11.718v-105.47z"}],bounds:{x:0,y:0,width:100,height:151.562},origin:{x:50,y:75.562},align:"left"},CustosDescLong:{paths:[{type:"positive",data:"M39.063 273.472c5.73.52 7.29-6.25 4.687-20.312V-65.59c-13.542 2.083-24.22 5.468-32.03 10.156C3.905-50.226 0-43.714 0-35.904V71.91c5.73-5.21 10.677-8.594 14.844-10.157 5.73-1.562 12.24-2.343 19.53-2.343v196.875c0 11.458 1.563 17.187 4.688 17.187"}],bounds:{x:0,y:0,width:46.353,height:339.582},origin:{x:0,y:65.59},align:"left"},CustosDescShort:{paths:[{type:"positive",data:"M34.375 191.923c0 8.333 1.563 12.24 4.688 11.72 3.125-.522 4.687-7.033 4.687-19.533v-250c-13.542 2.084-24.22 5.47-32.03 10.157C3.905-50.525 0-44.015 0-36.203V71.61c5.73-5.208 10.677-8.593 14.844-10.156 5.73-1.562 12.24-2.344 19.53-2.344v132.813z"}],bounds:{x:0,y:0,width:43.75,height:270.053},origin:{x:0,y:65.89},align:"left"},CustosLong:{paths:[{type:"positive",data:"M39.063-269.562c5.73-.52 7.29 6.25 4.687 20.312V69.5c-13.542-2.083-24.22-5.47-32.03-10.156C3.905 54.134 0 47.624 0 39.812V-68c5.73 5.208 10.677 8.594 14.844 10.156 5.73 1.563 12.24 2.344 19.53 2.344v-196.875c0-11.458 1.563-17.187 4.688-17.187z"}],bounds:{x:0,y:0,width:46.353,height:339.582},origin:{x:0,y:270.082},align:"left"},CustosShort:{paths:[{type:"positive",data:"M34.375-188.125c0-8.333 1.563-12.24 4.688-11.72 3.125.522 4.687 7.033 4.687 19.532v250c-13.542-2.083-24.22-5.468-32.03-10.156C3.905 54.324 0 47.813 0 40V-67.813c5.73 5.21 10.677 8.594 14.844 10.157 5.73 1.562 12.24 2.344 19.53 2.343v-132.812z"}],bounds:{x:0,y:0,width:43.75,height:270.052},origin:{x:0,y:200.365},align:"left"},DoClef:{paths:[{type:"positive",data:"M0 98.406V-97.688C0-118 5.99-134.275 17.97-146.516c11.978-12.24 27.603-18.36 46.874-18.36 10.937 0 19.53 3.126 25.78 9.376s9.376 14.583 9.376 25v107.813l-6.25-5.47c-4.167-3.645-10.287-7.42-18.36-11.327-8.072-3.907-16.796-5.86-26.17-5.86-11.46 0-21.486 4.427-30.08 13.282-8.593 8.854-12.89 19.53-12.89 32.03s4.297 23.308 12.89 32.423c8.594 9.115 18.62 13.672 30.08 13.672 9.374 0 18.098-1.822 26.17-5.468 8.073-3.646 14.193-7.292 18.36-10.938l6.25-6.25V132c0 9.896-3.125 18.1-9.375 24.61-6.25 6.51-14.844 9.765-25.78 9.765-19.272 0-34.897-6.25-46.876-18.75C5.99 135.125 0 118.72 0 98.405z"}],bounds:{x:0,y:0,width:100,height:331.251},origin:{x:0,y:164.876},align:"left"},FaClef:{paths:[{type:"positive",data:"M85.156-32v193.75c0 9.375-1.562 14.323-4.687 14.844-1.564 0-2.605-.52-3.126-1.563-.52-1.04-.782-2.603-.78-4.686V56.28c-8.335-8.332-19.793-12.5-34.376-12.5-17.71 0-31.77 3.907-42.188 11.72V-32c0-18.23 14.193-27.344 42.578-27.344 28.385 0 42.578 9.115 42.578 27.344zM98.438 93V-92.156c0-19.27 5.73-34.896 17.187-46.875 11.458-11.98 26.562-17.97 45.313-17.97 10.937 0 19.14 2.865 24.61 8.594 5.467 5.73 8.202 13.542 8.202 23.437v103.126l-5.47-4.687c-3.645-3.647-9.374-7.293-17.186-10.94-7.813-3.645-15.886-5.467-24.22-5.468-11.978 0-22.004 4.167-30.077 12.5-8.073 8.334-12.11 18.36-12.11 30.08 0 11.717 4.037 22.004 12.11 30.858s18.1 13.28 30.078 13.28c8.333 0 16.406-1.822 24.22-5.468 7.81-3.645 13.54-7.03 17.186-10.156l5.47-5.468V125.81c0 9.896-2.865 17.84-8.594 23.83-5.73 5.988-13.802 8.983-24.22 8.983-18.75 0-33.853-6.12-45.31-18.36-11.46-12.24-17.19-27.994-17.19-47.265z"}],bounds:{x:0,y:0,width:193.752,height:333.595},origin:{x:.001,y:157.001},align:"left"},TrebleClef:{paths:[{type:"positive",data:"M291 202C95 202 0 70 0-70c0-161 122-276 238-371 9-8 8-9 7-19-6-33-11-85-11-131 0-83 19-183 78-249 16-18 41-38 52-38 9 0 30 22 42 40 32 48 52 116 52 186 0 122-66 224-152 305-5 5-7 5-5 15l20 116c2 14 2 14 23 14 118 0 193 91 193 193 0 91-54 159-135 191-11 4-12 4-10 13 9 50 23 126 23 171 0 136-104 160-157 160-121 0-152-78-152-130 0-50 32-92 85-92 49 0 77 38 77 82 0 46-29 68-54 75-18 5-25 8-25 13 0 11 21 24 64 24 47 0 127-15 127-133 0-38-12-107-22-161-1-10-3-9-12-7-16 3-36 5-55 5ZM64-16c0 111 90 189 230 189 16 0 32-2 45-4 12-3 13-3 11-11L310-81c-1-9-3-9-16-6-48 13-80 48-80 93 0 37 24 72 58 86 6 2 12 5 12 10s-3 9-10 9c-5 0-15-2-21-5-55-18-92-69-92-141 0-68 45-131 116-155 14-5 14-4 12-20l-17-102c-2-9-3-10-11-3-38 30-75 60-123 113C72-126 64-63 64-16Zm312-738c-49 0-106 76-106 201 0 26 1 53 4 74 2 10 5 11 11 6 63-55 139-127 139-216 0-44-22-65-48-65ZM353-94c-10 0-11 2-9 12l39 228c2 9 3 9 13 4 45-22 75-63 75-113 0-71-53-125-118-131Z"}],bounds:{x:0,y:0,width:671*.8,height:1756*.8},origin:{x:0,y:1098*.8},align:"left"},TrebleClefSmall:{paths:[{type:"positive",data:"M218 151C71 151 0 52 0-52c0-121 92-207 178-279 7-6 7-7 6-14-5-25-9-64-9-98 0-63 15-138 59-187 12-13 31-29 39-29 7 0 22 17 31 30 25 36 39 88 39 140 0 92-49 168-114 229-3 3-5 4-3 11l15 87c1 11 1 11 17 11 88 0 145 68 145 144 0 68-41 119-101 143-9 4-9 3-8 10 7 38 17 95 17 129 0 102-78 120-118 120-90 0-114-59-114-98 0-37 24-69 64-69 37 0 58 28 58 61 0 35-22 51-40 57-14 4-19 6-19 10 0 8 15 17 48 17 35 0 95-11 95-99 0-29-9-81-16-121-1-7-3-7-9-5-12 2-28 3-42 3ZM48-12c0 83 68 142 173 142 12 0 24-2 33-3 9-2 10-2 9-9L233-61c-1-6-3-7-12-4-37 10-60 36-60 70 0 27 18 53 43 64 4 2 9 4 9 8 0 3-2 6-7 6-4 0-12-1-16-3-41-14-69-52-69-106 0-51 34-99 87-117 10-3 10-3 9-14l-13-77c-1-7-2-7-8-2-29 22-56 45-92 85C54-95 48-47 48-12Zm234-554c-37 0-80 58-80 151 0 20 1 40 4 56 1 7 3 8 8 4 47-41 104-95 104-162 0-33-16-49-36-49ZM265-70c-8-1-8 1-7 8l29 171c2 7 3 7 10 4 34-17 56-48 56-85 0-53-40-94-88-98Z"}],bounds:{x:0,y:0,width:671*.6,height:1053.6},origin:{x:0,y:658.8},align:"left"},ChiRhoClef:{paths:[{type:"positive",data:"M105.917 147.774c-2.067-3.344.33-5.742 7.093-7.094 9.764-1.953 10.878-8.732 10.878-66.221V23.014l-31.89 18.927c-17.54 10.41-32.33 18.927-32.866 18.927s-6.285 3.525-12.774 7.833c-10.211 6.78-11.65 8.56-10.708 13.24 2.437 12.105 2.353 13.736-.74 14.383-2.058.43-5.723-4.048-10.336-12.629-3.93-7.312-10.92-19.208-15.533-26.436-7.792-12.212-8.838-17.574-3.428-17.574 1.22 0 4.149 2.455 6.509 5.456 3.206 4.075 5.547 5.14 9.257 4.209 4.153-1.043 57.07-30.529 80.73-44.985L108.93.2l-39.828-22.673c-21.905-12.47-42.917-23.84-46.694-25.265-6.542-2.47-7.139-2.258-12.641 4.484-5.147 6.307-6.079 6.71-8.57 3.708-2.384-2.873-1.55-5.313 5.673-16.614 4.657-7.285 11.576-19.204 15.376-26.486 6.447-12.353 10.761-15.93 13.624-11.299.66 1.068.266 4.396-.875 7.396-1.14 3-1.54 6.847-.887 8.549 1.381 3.6 20.012 15.393 60.125 38.062l28.597 16.16.556-77.692c.613-85.706.355-87.62-11.832-87.62-6.286 0-10.966-3.346-10.966-7.838 0-4.44 92.037-3.911 102.811.59 21.627 9.037 33.743 26.842 33.76 49.614.03 37.863-30.53 65.667-72.177 65.667H151.654l-.644 28.499-.644 28.499 5.296-3.53c2.912-1.943 16.734-10.076 30.715-18.075C219.121-64.4 233.238-73.793 234.811-77.894c.694-1.81-.277-7.137-2.158-11.838-2.642-6.603-2.847-9.12-.902-11.059 3.327-3.316 6.53 1.033 24.387 33.12 9.75 17.517 13.444 26.059 11.928 27.574-1.515 1.516-3.723.761-7.126-2.436-6.943-6.522-11.612-5.87-31.58 4.41C207.227-26.73 166.254-2.377 166.254-.616c0 1.199 13.66 9.394 43.425 26.054 17.366 9.72 39.944 20.601 42.746 20.601 1.44 0 5.28-3.336 8.533-7.414 5.798-7.267 11.8-9.485 14.378-5.313.714 1.155-1.527 5.683-4.98 10.061-3.452 4.38-11.1 16.541-16.996 27.027-5.896 10.485-11.563 20.488-12.594 22.227-1.564 2.64-2.43 2.7-5.24.369-2.669-2.215-2.895-3.831-1.09-7.794 1.254-2.75 1.706-6.493 1.005-8.319-.7-1.825-9.166-8.384-18.813-14.576-17.64-11.321-62.464-37.45-64.246-37.45-2.144 0-.858 101.326 1.367 107.709 1.688 4.841 4.15 7.137 9.003 8.394 3.674.952 6.68 3.1 6.68 4.774 0 2.48-5.75 3.151-31.086 3.628-19.604.37-31.582-.218-32.43-1.589M183.434-94.909c10.38-3.663 19.694-11.631 24.662-21.101 5.14-9.799 4.065-30.404-2.313-44.336-7.44-16.251-18.35-23.003-39-24.132l-15.357-.84v93.668h11.384c6.262 0 15.542-1.466 20.624-3.26"}],bounds:{x:0,y:-200,width:275.469,height:149.471},origin:{x:0,y:0},align:"left"},ChiRhoClefSans:{paths:[{type:"positive",data:"M123.387 156.19c-.792-.792-1.44-29.618-1.44-64.058 0-48.772-.562-62.604-2.539-62.557-1.396.033-23.553 18.311-49.237 40.617s-47.76 40.556-49.06 40.556c-3.278 0-21.322-20.403-20.424-23.095.402-1.206 10.304-9.069 22.004-17.473C50.956 49.878 111.43 3.313 113.154.522c1.612-2.607-3.36-7.148-57.717-52.722-24.908-20.883-41.125-35.892-41.125-38.062 0-1.97 3.585-7.584 7.966-12.475 7.684-8.576 8.147-8.784 13.027-5.846 2.783 1.676 23.067 19.725 45.076 40.11 22.008 20.384 40.821 37.062 41.806 37.062 2.3 0 2.198-57.858-.201-113.137-1.493-34.414-2.546-44.107-5.236-48.212-3.002-4.582-3.027-5.269-.233-6.34 1.724-.662 19.415-.9 39.314-.53 34.178.638 36.68.956 45.228 5.752 23.096 12.959 30.55 46.904 14.709 66.982-8.198 10.39-28.334 19.756-49.143 22.857l-17.262 2.573c-.553 37.059-.335 74.117.609 74.117.943 0 22.966-17.82 48.94-39.601s47.996-39.602 48.939-39.602c1.922 0 22.347 22.392 22.347 24.5 0 .742-10.8 8.61-23.998 17.484C206.435-37.834 156.47-.758 156.47 2.014c0 2.548 64.949 54.22 95.854 76.26 8.6 6.133 15.682 12.423 15.74 13.978.14 3.873-17.812 24.589-21.31 24.589-1.552 0-10.849-8.332-20.66-18.515-21.38-22.192-68.878-65.502-72.838-66.416-2.35-.543-2.909 9.778-3.357 61.94l-.537 62.592-12.268.594c-6.748.326-12.917-.054-13.708-.846m55.249-278.9c17.348-8.85 23.98-25.107 16.832-41.264-5.617-12.7-14.508-18.405-30.24-19.407-12.267-.78-12.818-.608-14.81 4.632-2.218 5.831-2.89 51.452-.838 56.8 1.803 4.697 19.252 4.24 29.056-.76"}],bounds:{x:0,y:-200,width:270,height:157},origin:{x:0,y:0},align:"left"},Flat:{paths:[{type:"positive",data:"M7.813-204.406c4.166 0 6.25 5.208 6.25 15.625L12.5-10.657C33.854 13.302 54.167 25.28 73.438 25.28c9.374 0 14.062-4.686 14.062-14.06 0-6.25-1.042-11.72-3.125-16.407-2.083-4.688-7.03-9.766-14.844-15.235-7.81-5.47-13.02-8.984-15.624-10.547L27.344-45.81V-80.97c17.187 0 33.073 4.82 47.656 14.454C89.583-56.88 96.875-47.376 96.875-38c0 67.708-.26 101.562-.78 101.563-38.543 0-69.532-12.24-92.97-36.72C0-52.322-1.042-123.936 0-188c0-10.937 2.604-16.406 7.813-16.406z"}],bounds:{x:0,y:0,width:97.917,height:267.969},origin:{x:1.042,y:204.406},align:"left"},Mora:{paths:[{type:"positive",data:"M47.478-24c6.957 0 12.793 2.288 17.49 6.883C69.662-12.52 72-6.904 72-.267c0 6.64-2.337 12.352-7.033 17.118C60.27 21.618 54.435 24 47.477 24c-6.26 0-11.748-2.383-16.444-7.15C26.337 12.086 24 6.374 24-.265c0-6.638 2.337-12.255 7.033-16.85C35.73-21.713 41.217-24 47.478-24z"}],bounds:{x:0,y:0,width:48,height:48},origin:{x:-24,y:24},align:"left"},Natural:{paths:[{type:"positive",data:"M7.906-166.563c-2.864 0-5.614.52-8.218 1.563v13.28l.78 56.25.782 78.907v85.157c.52 3.646 2.604 5.73 6.25 6.25l23.438-3.906 23.437-3.907v29.69c0 42.186-.26 63.54-.78 64.06l6.25 2.345c1.04.52 2.082.78 3.124.78 2.603 0 4.947-1.3 7.03-3.905L67.656-71.25c-.52-2.604-2.083-3.906-4.687-3.906-7.814 0-17.19 1.04-28.126 3.125l-19.53 3.124.78-38.28V-165c-2.604-1.042-5.323-1.562-8.188-1.563zM55.938-40v71.875l-41.407 7.03c0-48.436.262-72.655.783-72.655L55.938-40z"}],bounds:{x:0,y:0,width:70.311,height:330.469},origin:{x:.312,y:166.563},align:"left"},Sharp:{paths:[{type:"positive",data:"m41.725,-73.773c-5.421,-0.241-10.878,5.856-6.549,12.357L67.061,-20.473 61.264,-12.5 13.436,-71.199c-5.634,-5.934-16.988,1.032-11.232,9.783L50.756,0.182 2.203,61.416c-6.745,7.984 3.442,17.859 11.232,9.783L61.264,12.5l5.797,7.973-31.885,40.943c-5.578,6.844 5.588,16.005 11.594,9.783L77.568,33.154 108.367,71.199c4.894,6.717 17.343,-1.575 11.232,-9.783L87.715,20.473 93.873,12.5 141.34,71.199c6.725,7.67 17.509,-2.248 11.596,-9.783L104.02,0.182 152.936,-61.416c5.52,-7.02-5.541,-16.309-11.596,-9.783L93.873,-12.5l-6.158,-7.973 31.884766,-40.943c5.407,-7.045-5.505,-15.924-11.232,-9.783L77.568,-33.154 46.77,-71.199c-1.435,-1.708-3.238,-2.494-5.044922,-2.574zM77.568,-8.516 84.09,0.182 77.568,8.516 70.684,0.182Z"}],bounds:{x:0,y:0,width:154.646,height:147.987},origin:{x:0,y:74.098},align:"left"},OriscusAsc:{paths:[{type:"positive",data:"M50 30.25c0 12.5-3.125 21.354-9.375 26.562-3.125 2.605-7.813 3.907-14.063 3.907-3.125 0-5.99-.522-8.593-1.564-2.605-1.04-5.6-2.474-8.986-4.297C5.6 53.035 2.734 51.603.39 50.56c-2.343-1.04-5.338-2.474-8.984-4.296-3.646-1.823-6.77-3.256-9.375-4.297-2.603-1.043-5.468-1.564-8.593-1.564-6.25 0-10.937 1.563-14.062 4.688C-46.875 50.824-50 59.677-50 71.656v-106.25c0-13.02 3.125-21.875 9.375-26.562 3.125-2.604 7.813-3.906 14.063-3.907 3.125 0 5.99.52 8.593 1.563 2.605 1.042 5.73 2.474 9.376 4.297 3.646 1.823 6.51 2.995 8.594 3.516l10.938 5.468c6.25 3.126 11.458 4.69 15.624 4.69 6.25 0 10.938-1.564 14.063-4.69C46.875-55.426 50-64.02 50-76V30.25z"}],bounds:{x:0,y:0,width:100,height:147.656},origin:{x:50,y:76},align:"left"},OriscusDes:{paths:[{type:"positive",data:"M-50 30.844v-106.25c0 11.458 3.125 20.052 9.375 25.78 3.125 3.126 7.813 4.69 14.063 4.688 4.687 0 13.41-3.255 26.17-9.765 12.762-6.51 21.746-9.766 26.954-9.766 6.25 0 10.938 1.303 14.063 3.907C46.875-55.874 50-47.02 50-34V72.25c0-11.98-3.125-20.833-9.375-26.563C37.5 42.563 32.812 41 26.562 41 21.875 41 13.023 44.385 0 51.156c-4.167 2.604-8.594 4.948-13.28 7.032-4.69 2.083-9.116 3.124-13.283 3.124-6.25 0-10.937-1.302-14.062-3.906C-46.875 52.198-50 43.344-50 30.844z"}],bounds:{x:0,y:0,width:100,height:147.656},origin:{x:50,y:75.406},align:"left"},OriscusLiquescent:{paths:[{type:"positive",data:"M 19.055,78.887 C 20.242,78.487 21.532,77.890 22.925,77.097 24.318,76.304 26.700882,74.417 30.074,71.438 33.447,68.458 36.524,64.985 39.303,61.019 42.083,57.052 44.563,51.396 46.743,44.05 48.923,36.704 50.013,28.671 50.013,19.950525 L 50.013,-34.226 C 50.013,-54.464 42.074,-64.584 26.195,-64.584 20.248,-64.584 11.519,-61.410 0.007,-55.064 -11.506,-48.717 -20.235,-45.544 -26.182,-45.544 -34.515,-45.544 -40.568,-48.520 -44.340791,-54.473 -48.114,-60.426 -50.000,-67.369 -50.000,-75.303 L -50.000,30.07 C -50.000,49.909 -42.060754,59.829 -26.182,59.829 -21.023,59.829 -12.39,56.455 -0.284,49.709 11.822,42.963 20.648,39.59 26.195,39.59 29.369,40.777 30.362,44.25 29.17479,50.009 27.988,55.768 26.001,62.020829 23.216,68.767 z"}],bounds:{x:0,y:0,width:100,height:147.656},origin:{x:50,y:75.406},align:"left"},PodatusLower:{paths:[{type:"positive",data:"M-50 42.17V-50q0-5.42 3.61-5.42h2.41q19.28 3.61 35.55 3.61 4.21 0 10.84-.3t9.04-.3q13.25 0 20.48-4.82t7.23-12.65L50-75.3V41.57q0 3.61-11.14 6.92-11.15 3.32-24.4 3.32-3.01 0-7.83-.3-4.82-.31-12.05-.31-19.88 0-28.31-1.2Q-50 46.99-50 42.17"}],bounds:{x:0,y:0,width:100,height:103.6},origin:{x:50,y:51.8},align:"left"},PodatusLowerShort:{paths:[{type:"positive",data:"M-4.688-30.28c22.396 0 34.636-.262 36.72-.782 5.728-1.563 8.593-5.21 8.593-10.938H50v97.656c0 2.604-1.302 4.167-3.906 4.688-5.21.52-21.355.78-48.438.78-23.958 0-38.54-.26-43.75-.78-2.604 0-3.906-1.302-3.906-3.906v-82.032c0-3.646 1.302-5.468 3.906-5.468h2.344c2.604.52 15.625.78 39.063.78z"}],bounds:{x:0,y:0,width:100,height:103.124},origin:{x:50,y:42},align:"left"},PodatusUpper:{paths:[{type:"positive",data:"m-46.094-55.78c13.542 0 24.61 2.473 33.203 7.42c8.593 4.947 12.891 12.367 12.891 22.264v96.093h-9.375c0-10.938-2.604-19.14-7.812-24.61c-5.21-5.468-14.844-8.203-28.907-8.202c-18.23 0-33.333 4.166-45.312 12.5v-75.782c0-19.79 15.104-29.687 45.312-29.687z"}],bounds:{x:0,y:0,width:91.406,height:125.781},origin:{x:91.406,y:63.781},align:"right"},PodatusUpperShort:{paths:[{type:"positive",data:"M-46.094-63.78c13.542 0 24.61 2.473 33.203 7.42C-4.298-51.41 0-43.99 0-34.093V62h-9.375c0-10.938-2.604-19.14-7.812-24.61-5.21-5.468-14.844-8.203-28.907-8.202-18.23 0-33.333 4.166-45.312 12.5v-75.782c0-19.79 15.104-29.687 45.312-29.687z"}],bounds:{x:0,y:0,width:91.406,height:125.781},origin:{x:91.406,y:63.781},align:"right"},PunctumCavum:{paths:[{type:"positive",data:"M0-60.906c33.333 0 50 9.635 50 28.906v94.53C39.062 51.595 22.396 46.126 0 46.126s-39.063 5.47-50 16.406V-32c0-19.27 16.667-28.906 50-28.906z"},{type:"negative",data:"M.08-42.56c9.585.206 20.126.53 27.954 6.822 4.96 3.9 4.71 10.792 4.574 16.482v51.278C22.09 27.066 7.283 26.072.168 26.01c-7.72.23-21.895.935-32.616 4.674.04-19.197-.083-38.395.064-57.59.567-7.5 7.834-12.33 14.62-13.774 5.818-1.498 11.857-1.86 17.844-1.88z"}],bounds:{x:0,y:0,width:100,height:123.438},origin:{x:50,y:60.906},align:"left"},PunctumQuadratum:{paths:[{type:"positive",data:"M0-60.906c33.333 0 50 9.635 50 28.906v94.53C39.062 51.595 22.396 46.126 0 46.126s-39.063 5.47-50 16.406V-32c0-19.27 16.667-28.906 50-28.906z"}],bounds:{x:0,y:0,width:100,height:123.438},origin:{x:50,y:60.906},align:"left"},PunctumQuadratumLiquescent:{paths:[{type:"positive",data:"M0-36.5436c19.999799999999997 0 30 5.781 30 17.3436v56.717999999999996C23.437199999999997 30.956999999999997 13.4376 27.6756 0 27.6756s-23.4378 3.2819999999999996-30 9.843599999999999V-19.2c0-11.562 10.000200000000001-17.3436 30-17.3436z"}],bounds:{x:0,y:0,width:100,height:123.438},origin:{x:50,y:60.906},align:"left"},PunctumQuadratumAscLiquescent:{paths:[{type:"positive",data:"M-50 43.688V-61c4.167 7.292 12.76 10.938 25.78 10.938 9.376 0 20.053-1.563 32.032-4.688C31.773-60.48 45.833-71.677 50-88.344v117.97C43.75 42.645 32.812 51.5 17.187 56.186-.52 61.398-15.886 64-28.906 64-42.97 64-50 57.23-50 43.687z"}],bounds:{x:0,y:0,width:100,height:152.344},origin:{x:50,y:88.344},align:"left"},PunctumQuadratumDesLiquescent:{paths:[{type:"positive",data:"M-50-56.03c0-13.022 7.03-19.532 21.094-19.532 13.02 0 28.385 2.604 46.093 7.812C32.813-63.583 43.75-54.73 50-41.187V76C45.833 59.854 31.77 48.656 7.812 42.406c-11.98-3.125-22.656-4.687-32.03-4.687-13.022 0-21.615 3.905-25.782 11.718v-105.47z"}],bounds:{x:0,y:0,width:100,height:151.562},origin:{x:50,y:75.562},align:"left"},PunctumInclinatum:{paths:[{type:"positive",data:"M0-75.78L50 0 0 75-50 0 0-75.78z"}],bounds:{x:0,y:0,width:100,height:150.78},origin:{x:50,y:75.78},align:"left"},PunctumInclinatumAscendens:{paths:[{type:"positive",data:"M7.921-75.365L49.726 5.226-7.84 74.589-49.726-5.226z"}],bounds:{x:0,y:0,width:100,height:150.78},origin:{x:50,y:75.78},align:"left"},PunctumInclinatumDescendens:{paths:[{type:"positive",data:"M-7.921-75.365L49.726-5.226 7.84 74.589-49.726 5.226z"}],bounds:{x:0,y:0,width:100,height:150.78},origin:{x:50,y:75.78},align:"left"},PunctumInclinatumAuctus:{paths:[{type:"positive",data:"M0-75.78L50 0 34.812 34.18C18.666 69.338-.084 90.495-21.438 97.655c4.687-4.556 7.03-10.741 7.03-18.554 0-11.066-4.947-25.715-14.843-43.944L-50 0z"}],bounds:{x:0,y:0,width:100,height:173.435},origin:{x:50,y:75.78},align:"left"},PunctumInclinatumLiquescent:{paths:[{type:"positive",data:"M 0,-53.164 35,-0.117 0,52.383 -35,-0.117 0,-53.164 z"}],bounds:{x:0,y:0,width:100,height:105.546},origin:{x:50,y:53.164},align:"left"},Quilisma:{paths:[{type:"positive",data:"M-50 34.938V-51c5.73 20.833 13.02 31.25 21.875 31.25 7.813 0 12.5-15.625 14.063-46.875 3.645 12.5 6.9 21.224 9.765 26.172s6.9 7.422 12.11 7.422c5.208 0 9.374-14.324 12.5-42.97 5.73 22.917 10.677 34.375 14.843 34.375 5.73 0 10.677-15.885 14.844-47.656v100c0 17.707-3.125 26.56-9.375 26.56-4.688 0-9.115-5.988-13.28-17.968-2.085 21.875-8.074 32.813-17.97 32.813-7.813 0-16.146-7.292-25-21.875-4.688 20.312-10.677 30.47-17.97 30.47-5.207 0-9.244-2.605-12.108-7.814C-48.568 47.698-50 41.708-50 34.938z"}],bounds:{x:0,y:0,width:100,height:150},origin:{x:50,y:89.282},align:"left"},TerminatingAscLiquescent:{paths:[{type:"positive",data:"M-9.375 40.22c0-11.98-4.948-17.97-14.844-17.97-10.936 0-19.53 3.646-25.78 10.938v-53.126c0-6.77 2.604-12.76 7.813-17.968 5.208-5.21 10.677-8.594 16.406-10.157 2.603-.52 5.207-.78 7.81-.78 3.647 0 7.032.78 10.157 2.343C-2.603-43.896 0-39.73 0-34V73.03h-9.375V40.22z"}],bounds:{x:0,y:0,width:49.999,height:121.873},origin:{x:49.999,y:48.843},align:"right"},TerminatingDesLiquescent:{paths:[{type:"positive",data:"M-9.375-48.156V-80.97H0V26.845c0 5.73-2.604 9.896-7.813 12.5-3.125 1.562-6.51 2.343-10.156 2.343-2.603 0-5.207-.26-7.81-.78-5.73-1.563-11.2-4.95-16.407-10.157C-47.398 25.542-50 19.292-50 12v-52.344c6.25 7.292 14.844 10.938 25.78 10.938 9.897 0 14.845-6.25 14.845-18.75z"}],bounds:{x:0,y:0,width:50,height:122.658},origin:{x:50,y:80.97},align:"right"},VerticalEpisemaAbove:{paths:[{type:"positive",data:"M-8-4c2 3 6 4 8 4s6-1 8-4v-52c-2-3-6-4-8-4s-6 1-8 4z"}],bounds:{x:0,y:0,width:16,height:60},origin:{x:8,y:60},align:"left"},VerticalEpisemaBelow:{paths:[{type:"positive",data:"M-8 56c2 3 6 4 8 4s6-1 8-4v-52c-2-3-6-4-8-4s-6 1-8 4z"}],bounds:{x:0,y:0,width:16,height:60},origin:{x:8,y:0},align:"left"},VirgaLong:{paths:[{type:"positive",data:"M50-38v285.156c0 6.77-2.344 10.937-7.03 12.5-1.564 0-2.605-.78-3.126-2.344-.52-1.562-.782-10.156-.782-25.78V54.186C29.168 45.334 16.146 40.907 0 40.907c-22.917 0-39.583 5.208-50 15.624V-38c0-19.27 16.667-28.906 50-28.906S50-57.27 50-38z"}],bounds:{x:0,y:0,width:100,height:326.562},origin:{x:50,y:66.906},align:"left"},VirgaShort:{paths:[{type:"positive",data:"M50-38v211.72c0 7.29-2.344 11.457-7.03 12.5-1.564 0-2.606-.783-3.126-2.345-.52-1.563-.782-10.156-.782-25.78V54.187C29.167 45.332 16.146 40.906 0 40.906c-22.917 0-39.583 5.21-50 15.625V-38c0-19.27 16.667-28.906 50-28.906S50-57.27 50-38z"}],bounds:{x:0,y:0,width:100,height:253.126},origin:{x:50,y:66.906},align:"left"},Virgula:{paths:[{type:"positive",data:"M8.178-55.66c0-22.137 12.092-33.2 36.287-33.2 11.835 0 23.53 5.66 35.108 16.98C91.15-60.547 96.94-41.766 96.94-15.534c0 53.515-31.646 87.487-94.937 101.895-2.048-2.06-3.077-5.146-3.077-9.273 0-1.03.247-1.8.76-2.316 42.71-19.027 64.075-41.678 64.075-67.92 0-11.322-2.325-20.326-6.945-27.016-4.62-6.69-9.52-11.052-14.676-13.11-5.147-2.048-11.836-3.85-20.07-5.403C12.81-39.707 8.18-45.37 8.18-55.66z"}],bounds:{x:0,y:0,width:98.014,height:175.221},origin:{x:-47.933,y:88.86},align:"left"},OpenParenthesis:{paths:[{type:"positive",data:"M40-150C16-118 0-62 0 0s16 118 40 150c3 .5 6.5-1.5 7-4C29 112 17 60 17 0s12-112 30-146c-.5-2.5-4-4.5-7-4z"}],bounds:{x:0,y:0,width:47,height:300},origin:{x:0,y:150},align:"left"},CloseParenthesis:{paths:[{type:"positive",data:"M7-150c24 32 40 88 40 150S31 118 7 150c-3 .5-6.5-1.5-7-4C18 112 30 60 30 0S18-112 0-146c.5-2.5 4-4.5 7-4z"}],bounds:{x:0,y:0,width:47,height:300},origin:{x:0,y:150},align:"left"}},l={OriscusAsc:"M-29.685-46.805c-1.903 3.006-2.3 7.028-2.293 10.568l.123 58.886c0 .165.33-.013.495-.026 .831-.06 1.66-.134 2.493-.171 2.164-.094 4.335-.058 6.492.147 6.038.572 11.671 2.644 17.098 5.274l11.246 5.451c6.039 2.926 17.344 10.645 23.747 8.96 1.631-3.078 2.245-6.662 2.251-10.142l.033-19.996-.178-39.918c-.003-.663-1.323.101-1.984.142-2.329.146-4.668.145-6.991-.092-6.062-.618-12.187-2.57-17.639-5.277l-11.641-5.781c-3.274-1.625-15.867-7.527-18.776-8.167-1.453-.32-3.029-.053-4.476.142z",OriscusDes:"M-32-27.166l.02 59.487c.001 3.645.562 7.412 2.311 10.626 7.896 1.678 28.816-11.865 37.795-15.492 4.918-1.987 10.053-3.747 15.357-4.292 2.156-.222 4.329-.195 6.49-.053 .154.01 1.984.174 1.984.099l.018-58.956c.001-3.474-.507-7.07-2.007-10.209-5.418-1.659-12.486 2.494-17.334 4.89l-11.203 5.537c-6.923 3.422-14.388 6.624-22.018 8.016-2.471.45-4.953.624-7.463.555-1.001-.028-1.995-.112-2.994-.171-.318-.019-.956-.356-.956-.037z",OriscusLiquescent:"M-32-27.683l.029 59.519c.002 3.155.515 6.387 1.913 9.214 5.083 2.162 11.744-2.077 16.253-4.501l10.572-5.684c7.231-3.889 15.201-7.35 23.333-8.734 2.607-.443 5.329-.719 7.968-.443 1.007.105 1.957.375 2.945.559 .301.056.91.415.91.109l.072-57.995c.005-3.475-.469-7.086-2.059-10.188-7.444-3.127-29.269 11.115-37.544 14.29-5.122 1.966-10.484 3.508-15.977 3.899-2.161.154-4.337.113-6.496-.055-.176-.014-1.919-.286-1.919.01z",PodatusLower:"M31.8-37.362c0-.167-.316.105-.475.156-2.066.655-4.164 1.191-6.292 1.6-4.796.921-9.562 1.033-14.42 1.206l-15.483.551c-5.981.212-12.012-.078-17.975-.554-2.158-.172-4.314-.379-6.467-.619-.827-.092-2.48-1.123-2.482-.29l-.157 67.247c0 .226 1.753.373 1.941.395 4.944.593 9.993.735 14.968.785l16.491.163c7.883.078 15.576.935 23.445-.152 1.276-.177 6.863-1.19 6.863-1.342z",PodatusLowerShort:"M-31.862-12.448l-.024 55.314c0 .087 1.827.081 1.985.083 3.831.064 7.663.101 11.495.127 12.827.086 25.656.075 38.484-.031 3.498-.029 6.996-.067 10.495-.127 .122-.002 1.427.066 1.427-.168v-55.477c0-.289-1.28-.091-1.4-.083-2.992.198-5.993.268-8.99.331-7.161.152-14.326.181-21.49.195-7.163.013-14.327.002-21.491-.054-2.332-.018-4.664-.042-6.996-.075-.29-.004-3.495-.062-3.495-.035z",PodatusUpper:"M-73.296 22.241c0 .331.649-.122.973-.191 .652-.139 1.3-.298 1.952-.438 2.119-.453 4.254-.837 6.397-1.156 6.431-.958 12.947-1.344 19.446-1.261 5.994.076 12.015.583 17.873 1.9 1.951.439 3.883.969 5.78 1.608 .631.213 1.25.467 1.883.675 .309.102.938.598.938.272l.036-50.478c.004-5.577-6.83-7.714-11.254-8.955-10.512-2.95-23.131-2.914-33.723-.349-4.764 1.154-10.39 3.15-10.38 8.944z",PodatusUpperShort:"M-73.296 14.244c.001.331.65-.122.973-.191 .652-.139 1.3-.299 1.953-.438 2.119-.453 4.253-.837 6.397-1.156 6.43-.958 12.947-1.344 19.445-1.261 5.995.076 12.016.583 17.874 1.901 1.952.439 3.884.968 5.78 1.607 .631.213 1.25.467 1.883.676 .309.102.938.597.938.271l.035-50.48c.004-5.576-6.83-7.715-11.253-8.956-10.513-2.95-23.132-2.911-33.724-.346-4.765 1.154-10.39 3.15-10.38 8.944z",PunctumQuadratumLiquescent:"M-18.627-21.23l-.07 40.216c-.001.5.966-.261 1.451-.381 1.618-.402 3.253-.732 4.898-.998 4.114-.666 8.287-.936 12.452-.931 4.166.005 8.338.285 12.45.964 1.48.245 2.951.541 4.409.895 .144.035 1.917.465 1.917.417l-.36-40.36c-.013-1.395-6.506-3.069-7.672-3.287-7.303-1.37-15.619-1.395-22.88.243-1.223.276-6.592 1.447-6.595 3.222z",PunctumQuadratumAscLiquescent:"M-31.837-32.405l.225 78.223c0 .234 4.51.163 4.991.15 5.666-.155 11.311-.842 16.89-1.822 11.125-1.954 24.166-4.158 33.621-10.69 1.507-1.042 7.966-6.423 7.97-8.187l.14-68.973c0-.224-2.884.992-3.156 1.104-2.158.889-4.348 1.698-6.562 2.436-6.311 2.105-12.836 3.691-19.347 5.047-7.666 1.596-15.454 2.699-23.285 2.984-2.499.09-5.002.103-7.5-.007-.999-.044-1.996-.116-2.994-.192-.331-.025-.994-.405-.993-.073z",PunctumQuadratumDesLiquescent:"M-31.8-57.367l-.129 77.425c-.001.331.661-.025.991-.046 .998-.065 1.994-.158 2.994-.206 2.498-.119 5.002-.108 7.501-.019 7.834.278 15.626 1.377 23.295 2.969 6.688 1.389 13.336 3.089 19.782 5.361 2.045.72 4.069 1.499 6.066 2.342 .766.323 1.517.7 2.292 1.002 .29.113.887.605.888.293l.12-68.482c.003-1.962-6.113-7.271-7.719-8.4-9.253-6.502-22.76-8.58-33.698-10.524-5.578-.992-11.223-1.694-16.89-1.869-1.667-.051-3.337-.087-4.997.086-.166.017-.496-.099-.496.068z",PunctumInclinatum:"M0-43.096l-28.33 42.991 28.191 42.447 28.469-42.447z",PunctumInclinatumAscendens:"M4.474-42.823l-32.681 39.866 23.782 45.126 32.606-39.237z",PunctumInclinatumDescendens:"M-4.526-42.819l-23.674 45.682 32.479 39.248 23.88-45.192z",PunctumInclinatumAuctus:"M0-43.096l-28.667 43.448 15.294 26.326c3.914 6.737 7.207 14.007 10.061 21.249 1.272 3.227 2.149 7.192 3.773 10.028 6.696-9.086 12.497-19.05 17.1-29.362l8.363-18.739c.909-2.036 3.614-8.183 3.57-8.249z",PunctumInclinatumLiquescent:"M0-30.285l-19.807 30.021 19.807 29.932 19.807-29.932z",Quilisma:"M24.6-32.622c-4.905 10.122-13.897 14.85-24.925 11.367-2.476-.782-4.833-2.35-7.072-3.16-2.865 7.467-7.527 14.66-15.66 16.963-3.061.867-6.299.879-9.415.306-.984-.181-1.956-.424-2.91-.726-.477-.15-1.414-.996-1.416-.496l-.185 44.383c-.014 3.456.854 6.964 2.413 10.023 4.956-9.487 4.655-27.984 18.194-28.768 3.348-.194 6.701.944 9.241 3.134 6.161 5.311 8.138 15.17 16.235 18.504 5.555-8.74 2.645-23.683 10.055-29.693 3.408-2.764 8.097-3.625 12.264-2.25 1.267.418 2.468 1.033 3.549 1.815 .407.295.782.619 1.162.948 .244.211.725.963.726.641l.144-38.913c.001-.289-.57-.1-.859-.113-1.352-.059-2.637.002-3.981-.265-2.867-.569-5.25-1.972-7.56-3.7z",Stropha:"M-1.2-37.496l-25.046 37.369 14.762 22.503c4.616 7.036 7.991 14.516 11.495 22.108 7.228-7.453 13.756-16.086 18.693-25.241l9.468-17.558-20.798-26.883c-2.036-2.632-3.941-5.382-5.806-8.137-.654-.966-1.299-1.938-1.935-2.916-.272-.419-.555-1.661-.833-1.245z",StrophaLiquescent:"M-1.2-37.496l-25.781 38.656 16.212 30.45c4.451 8.361 8.154 17.222 10.924 26.277 5.54-4.597 14.722-22.96 17.829-30.2l10.818-25.212-21.426-27.671c-2.038-2.632-3.942-5.383-5.807-8.138-.654-.966-1.3-1.938-1.935-2.917-.273-.418-.557-1.661-.834-1.245z",TerminatingAscLiquescent:"M-38.999 13.115c0 .205 4.553-.915 5.281-1.046 3.278-.592 6.63-.863 9.961-.816 2.835.041 5.672.426 8.379 1.284 .954.302 1.89.662 2.8 1.08 .454.209 1.343 1.171 1.343.671l-.035-49.846c-.001-2.464-9.411-2.194-10.921-1.969-7.006 1.048-16.758 9.02-16.776 16.613l-.032 14.011z",TerminatingDesLiquescent:"M-38.76-20.427l-.217 33.352c-.052 7.876 8.727 15.732 16.016 17.321 1.542.336 11.511.762 11.531-1.623l.43-49.981c0-.005-3.66 1.39-4.068 1.529-2.852.968-5.857 1.391-8.862 1.421-3.333.035-6.685-.244-9.964-.849-1.149-.212-2.29-.465-3.42-.763-.484-.128-1.442-.908-1.446-.407z"};for(const[t,e]of Object.entries(l))h[t+"Cavum"]=Object.assign(Object.assign({},h[t]),{paths:[...h[t].paths,{type:"negative",data:e}]});const u=[[-52.75,39.8,-34,-63.7,51.9,18.7,62.9,16,1.08,.22,21.5,.4,.96],[-68.75,32,-37.5,-67.2,47.7,18,59.4,19.1,.67,.35,21.4,.69,.17],[-70,26.5,-38,-70.8,43.3,10.2,57.3,12.8,.62,.28,11.6,.11,.83],[-70,27.8,-38,-73.1,41.7,9.6,55.8,9.9,.52,.3,8.3,.05,.95],[-70,30.7,-46.1,-74.7,40.2,10.6,52,8.2,.52,.26,6.8,.02,.92]],c=[302.344,377.343,377.344,420,462.656];function d(t){const e=Math.min(3,Math.max(0,Math.floor(t)-1));return c[e]+(t-1-e)*(c[e+1]-c[e])}const f=(t,e,s)=>[t[0]+s*(e[0]-t[0]),t[1]+s*(e[1]-t[1])];function g(t,e,s,i,n){const a=Math.atan2(e[1]-t[1],e[0]-t[0])+s*Math.PI/180,r=[t[0]+(e[1]-t[1])/Math.tan(a),e[1]];return[t,f(t,r,i),f(e,r,n),e]}function p(t,e){const s=1-e;return[0,1].map(i=>s*s*s*t[0][i]+3*s*s*e*t[1][i]+3*s*e*e*t[2][i]+e*e*e*t[3][i])}function m(t,e){const s=f(t[0],t[1],e),i=f(t[1],t[2],e),n=f(t[2],t[3],e),a=f(s,i,e),r=f(i,n,e),o=f(a,r,e);return[[t[0],s,a,o],[o,r,n,t[3]]]}function x(t,e){const s=e[0]-t[0],i=e[1]-t[1],n=Math.hypot(s,i);return[-i/n,s/n]}function y(t,e,s){const i=[];for(let n=s;n>0;n--){const[s,a]=m(t,1/n);t=a;const r=x(s[0],s[1]),o=x(s[2],s[3]),h=m(s,.5)[0],l=x(h[2],h[3]),u=[s[0][0]+e*r[0],s[0][1]+e*r[1]],c=[s[3][0]+e*o[0],s[3][1]+e*o[1]],d=[r[1],-r[0]],f=[o[1],-o[0]],g=8*(h[3][0]+e*l[0]-(u[0]+c[0])/2)/3,p=8*(h[3][1]+e*l[1]-(u[1]+c[1])/2)/3,y=f[0]*d[1]-d[0]*f[1];let v=(f[0]*p-g*f[1])/y,b=(d[0]*p-d[1]*g)/y;Math.abs(y)>.001&&v>0&&b>0||(v=Math.hypot(s[1][0]-s[0][0],s[1][1]-s[0][1]),b=Math.hypot(s[3][0]-s[2][0],s[3][1]-s[2][1])),i.push([u,[u[0]+v*d[0],u[1]+v*d[1]],[c[0]-b*f[0],c[1]-b*f[1]],c])}return i}function v(t,e,s,i=!1){for(let n=0;n<t.length;n++){const a=i?t.length-1-n:n,r=t[a],o=t=>p(r,t)[0]-e;for(let t=0;t<16;t++){let e=i?1-t/16:t/16,n=i?e-1/16:e+1/16;if(!(o(e)*o(n)>0)){for(let t=0;t<30;t++){const t=(e+n)/2;o(e)*o(t)<=0?n=t:e=t}return[a,m(r,(e+n)/2)[s?1:0]]}}}throw new Error("porrectusSwash: the hole's edges don't meet")}const b=t=>Math.round(1e3*t[0])/1e3+" "+Math.round(1e3*t[1])/1e3;function L(t){let e=b(t[0][0]),s="M"+e;for(const i of t){const[t,n]=[b(i[0]),b(i[3])];t!==e&&(s+="L"+t),i[1]!==i[0]||i[2]!==i[3]?s+="C"+i.slice(1).map(b).join(" "):n!==t&&(s+="L"+n),e=n}return s+"z"}function S(t,e,s=!1){const i=Math.min(4,Math.max(0,t/100-1)),n=Math.min(3,Math.floor(i)),[a,r,o,h,l,c,d,f,p,m,x,b,S]=u[n].map((t,e)=>t+(i-n)*(u[n+1][e]-t)),C=e-50,w=[-50,a+118.75],P=[C-r,t+o],N=[C,t+h],T=[C,t+l],I=[C-c,t+d],A=g([-50,a],P,f,p,m),M=[P,[P[0]+8.5,P[1]],[C-8.1,N[1]+29.2],N],B=g(w,I,x,S,b).reverse(),k=[{type:"positive",data:L([A,M,[N,N,T,T],[T,[C,T[1]+10.8],[I[0]+5.9,I[1]],I],B])}];if(s){const t=18,e=y(A,t,4),s=y(M,t,2),i=y(B,t,4),[n,a]=v(e,-50+t,!0),[r,o]=v(s,C-t,!1),h=i[0][0][0]<C-t,[l,u]=h?[0,i[0]]:v(i,C-t,!0,!0),[c,d]=v(i,-50+t,!1),f=l===c?[v([u],-50+t,!1)[1]]:[u,...i.slice(l+1,c),d],g=[C-t,i[0][0][1]];k.push({type:"negative",data:L([a,...e.slice(n+1),...s.slice(0,r),o,...h?[[g,g,g,g]]:[],...f])})}const F=Math.max(-a,-N[1]);return{paths:k,bounds:{x:0,y:0,width:e,height:F+I[1]},origin:{x:50,y:F},align:"left"}}for(let t=1;t<=5;t++){const e=100*t,s=d(t);h["Porrectus"+t]=S(e,s),h["Porrectus"+t+"Cavum"]=S(e,s,!0)}const C={Æ:"Ǽ",Œ:"Œ́",A:"Á",E:"É",I:"Í",O:"Ó",U:"Ú",Y:"Ý",æ:"ǽ",œ:"œ́",a:"á",e:"é",i:"í",o:"ó",u:"ú",y:"ý"},w=t=>C[t]||t,P="(?:[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\s\\S])",N=`[﷑﷒]${P}`,T=new RegExp(N,"g"),I=t=>1===t.length&&t.charCodeAt(0)<128?"﷑"+String.fromCharCode(57344+t.charCodeAt(0)):"﷒"+t,A=t=>"﷑"===t[0]?String.fromCharCode(t.charCodeAt(1)-57344):t.slice(1),M=t=>t.replace(T,A),B=t=>t.replace(T,t=>"$"+A(t)),k={MedicaeaFlat:"",HufnagelCustosUpShort:"",HufnagelCustosUpLong:"",HufnagelCustosUpMedium:"",HufnagelCustosDownShort:"",HufnagelCustosDownLong:"",HufnagelCustosDownMedium:"",MedicaeaCustosUpShort:"",MedicaeaCustosUpLong:"",MedicaeaCustosUpMedium:"",MedicaeaCustosDownShort:"",MedicaeaCustosDownLong:"",MedicaeaCustosDownMedium:"",MensuralCustosUpShort:"",MensuralCustosUpLong:"",MensuralCustosUpMedium:"",MensuralCustosDownShort:"",MensuralCustosDownLong:"",MensuralCustosDownMedium:"",MensuralFlat:"",HufnagelFlat:"",MedicaeaCClef:"",MedicaeaCClefChange:"",MedicaeaFClef:"",MedicaeaFClefChange:"",HufnagelCClef:"",HufnagelCClefChange:"",HufnagelFClef:"",HufnagelFClefChange:"",HugnagelCFClef:"",HufnagelCFClefChange:"",MensuralFlatHole:"",HufnagelFlatHole:"",MedicaeaFlatHole:"",StarSix:"",Dagger:"","Bar.alt":"",StarHeight:"",Cross:"","RBar.alt":"","VBar.alt":"",Drawing1:"",Drawing2:"",RWithBarGoth:"",VWithBarGoth:"",Line1:"",Line2:"",Line3:"",Line4:"",Line5:"","Cross.alt":"",ABarCaption:"",RBarCaption:"",VBarCaption:"",ABarCaptionSC:"",RBarCaptionSC:"",VBarCaptionSC:"",ABar:"",RBar:"",VBar:"",ABarSC:"",RBarSC:"",VBarSC:"",ABarSmall:"",RBarSmall:"",VBarSmall:"",ABarSmallSC:"",RBarSmallSC:"",VBarSmallSC:"","RBar.alt2":"","VBar.alt2":"",ABarCaptionSlant:"",RBarCaptionSlant:"",VBarCaptionSlant:"",ABarSlant:"",RBarSlant:"",VBarSlant:"",ABarSmallSlant:"",RBarSmallSlant:"",VBarSmallSlant:""};var F;t.LedgerLineSpecificity=void 0,(F=t.LedgerLineSpecificity||(t.LedgerLineSpecificity={}))[F.Supposed=0]="Supposed",F[F.Explicit=1]="Explicit",F[F.Drawn=2]="Drawn",F[F.ExplicitlyDrawn=3]="ExplicitlyDrawn";const O=1.0157,E=.6347;function D(e){return!!e&&e.line&&0!==(e.specificity&t.LedgerLineSpecificity.Drawn)}function z(t,e){return!!t.ledgerLineState&&D(t.ledgerLineState[e?"above":"below"])}function V(t,e,s){return s?t>=e-.9:t<=e+.9}function R(t,e,s){return s?t>e+.9:t<e-.9}function W(t,e,s){e>t.specificity&&(t.line=s,t.specificity=e)}function q(e,s,i){var n=i?"above":"below",a=(e,a)=>{var r=function(t,e,s,i){return e.staffPosition<t.staffPosition||(i?R(e.staffPosition,s,!0)&&!V(t.staffPosition,s,!0):!V(e.staffPosition,s,!1)&&R(t.staffPosition,s,!1))}(e,a,s,i);return r&&(e.ledgerLineState[n]={line:!0,specificity:t.LedgerLineSpecificity.Drawn}),r},r=[],o=!1,h=null;for(let s of e){let e=s.ledgerLineState[n];if(e.specificity&t.LedgerLineSpecificity.Drawn){if(e.line){let t,e=s;for(;(t=r.pop())&&a(t,e);)e=t;o=!0}else o=!1;r=[]}else o?a(s,h)||(r.push(s),o=!1):r.push(s);h=s}}function H(e,s){var i=2*e.staffLineCount+1,n={above:!1,below:!1},a=[],r=[],o=[],h=[];for(let e of s){e.continuesElement&&!e.firstOfParentheses&&(e.isNeume||e.isAccidental)&&a.length||a.push([]),(e.isAccidental?[e]:e.isNeume&&e.notes||[]).forEach((s,l)=>{l>0&&s.startsElement&&a.push([]),r.push(s),o.push(e),h.push(Q(s.ledgerLineState));let u=e.isNeume?s:null,c=u&&u.customLedgerLines||[];for(let t of c)t.before&&"fixed"!==t.kind&&(n[t.isAbove?"above":"below"]="start"===t.kind);let d=s.ledgerLineState||{above:{line:!1,specificity:t.LedgerLineSpecificity.Supposed},below:{line:!1,specificity:t.LedgerLineSpecificity.Supposed}};d.above.line=d.below.line=!1,d.above.specificity=d.below.specificity=t.LedgerLineSpecificity.Supposed,V(s.staffPosition,i,!0)?W(d.above,t.LedgerLineSpecificity.Drawn,!0):n.above&&W(d.above,t.LedgerLineSpecificity.Explicit,!0),V(s.staffPosition,-1,!1)?W(d.below,t.LedgerLineSpecificity.Drawn,!0):n.below&&W(d.below,t.LedgerLineSpecificity.Explicit,!0),u&&(void 0!==u.highLedgerLine&&W(d.above,t.LedgerLineSpecificity.Explicit,u.highLedgerLine),void 0!==u.lowLedgerLine&&W(d.below,t.LedgerLineSpecificity.Explicit,u.lowLedgerLine),void 0!==u.ledgerLineAbove&&W(d.above,t.LedgerLineSpecificity.ExplicitlyDrawn,u.ledgerLineAbove),void 0!==u.ledgerLineBelow&&W(d.below,t.LedgerLineSpecificity.ExplicitlyDrawn,u.ledgerLineBelow)),s.ledgerLineState=d,a[a.length-1].push(s);for(let t of c)t.before||"fixed"===t.kind||(n[t.isAbove?"above":"below"]="start"===t.kind)})}for(let t of a)q(t,i,!0),q(t,-1,!1);for(let t=0;t<r.length;t++)Q(r[t].ledgerLineState)!==h[t]&&(o[t].needsLayout=!0)}function Q(t){return t?j(t.above)|j(t.below)<<8:-1}const j=t=>(t.line?1:0)|t.specificity<<1;var G;function $(e,s=e,i=0){var n=e.staffPosition+i+2;if(n===Math.round(n)){var a=!!s.ledgerLineState&&s.ledgerLineState.below.line;switch(n){case 0:return t.StemQueue.OnSpaceBelowBottomLine;case 1:return t.StemQueue.OnBottomLine;case 2:return a?t.StemQueue.OnSpaceAboveBottomLine:t.StemQueue.OnSpaceBelowBottomLine;case 3:return a?t.StemQueue.OnLineAboveBottomLine:t.StemQueue.OnBottomLine;default:return n%2?t.StemQueue.OnLineAboveBottomLine:t.StemQueue.OnSpaceAboveBottomLine}}}t.StemQueue=void 0,(G=t.StemQueue||(t.StemQueue={}))[G.OnSpaceBelowBottomLine=0]="OnSpaceBelowBottomLine",G[G.OnSpaceAboveBottomLine=1]="OnSpaceAboveBottomLine",G[G.OnBottomLine=2]="OnBottomLine",G[G.OnLineAboveBottomLine=3]="OnLineAboveBottomLine";const U={AE:"Æ",Ae:"Æ",ae:"æ",OE:"Œ",Oe:"Œ",oe:"œ"},_=t=>U[t]||t,J=new Set(["vi","pu","ta","gr","cl","un","pv","pe","po","to","ci","sc","pf","sf","tr","st","ds","ts","tg","bv","tv","pr","pi","vs","or","sa","pq","qi","ql","pt","oc","ni"]),X=new Set(["c","t","s","l","x","+","a","al","am","b","cm","co","cw","d","e","eq","ew","f","fid","fr","g","h","hp","hn","i","im","iv","k","lb","lc","len","lm","lp","lt","m","md","moll","n","nl","nt","p","par","pfec","pm","q","sb","sc","simil","simul","sj","sjc","sjcm","sm","st","sta","su","tb","th","tm","tw","v","ve","vol","eq-","equ","simp","simpl","sp"]),Z=new Set(["i","do","dr","dx","ps","qm","sb","se","sj","sl","sn","sp","sr","st","us"]),Y="MSG-><~",K="abcdefghijklmnp",tt=t=>t>="1"&&t<="9";function et(t,e){let s=t.slice(e,e+2);if(e+2>t.length||!J.has(s))return null;e+=2;let i="";for(;e<t.length&&Y.includes(t[e]);)i+=t[e++];let n=[...Y].filter(t=>i.includes(t)).join(""),a="";e<t.length&&tt(t[e])&&(a=t[e++]);let r=5;if(e+1<t.length&&"h"===t[e]){if(r=K.indexOf(t[e+1]),r<0)return null;e+=2}return{glyph:{neume:s,modifiers:n,variant:a,height:r},end:e}}function st(t,e){let s=e,i=[],n="",a="",r=[];do{let s=et(t,i.length?e+1:e);if(!s)return{message:i.length?"no neume after !":"not a neume"};i.push(s.glyph),e=s.end}while(e<t.length&&"!"===t[e]);for(;e+1<t.length;){let s=t.slice(e,e+2);if("ls"===s||"lt"===s){let i=e+2;for(;i<t.length&&!tt(t[i]);)i++;if(i>=t.length||!("ls"===s?X:Z).has(t.slice(e+2,i)))return{message:"not a significative letter or Tironian note"};r.push({name:t.slice(e,i),position:+t[i]}),e=i+1}else{if("su"!==s&&"pp"!==s)break;{let i=e+2;if(i<t.length&&"tuvwxyqnz".includes(t[i])&&i++,i>=t.length||!tt(t[i]))return{message:"no number of puncta"};"su"===s?a+=t.slice(e,i+1):n+=t.slice(e,i+1),e=i+1}}}return{neume:{type:"neume",glyphs:i,base:"",prepunctis:n,subpunctis:a,letters:r,index:s,length:e-s},end:e}}function it(t){let e="";for(let s of t){e&&(e+="!"),e+=s.neume+s.modifiers+s.variant;let i=s.height-t[0].height;if(s!==t[0]&&0!==i){if(i+=5,i<0||i>14)return null;e+=K[i]}}return e}function nt(t,e,s){for(;e<t.length&&("/"===t[e]||"`"===t[e]);){let i=t[e+1]===t[e]?2:1;s.push({type:"space",size:2===i?"larger":"interelement",direction:"/"===t[e]?1:-1,index:e,length:i}),e+=i}return e}function at(t){let e=[],s=nt(t,0,e);for(;s<t.length;){let i=st(t,s);if(!i.neume){e.push({type:"error",message:i.message,index:s,length:t.length-s});break}let{neume:n}=i,a=it(n.glyphs);null===a?e.push({type:"error",message:"the neumes are too far apart",index:s,length:n.length}):e.push(Object.assign(Object.assign({},n),{base:a})),s=nt(t,i.end,e)}return e}const rt={"ci~":"cl>","pe~":"ta>","vs~":"ta>","pf~":"po>","sc~":"pe>2","sa~":"pe>2",suu1:"ta-",ppu1:"ta-",pfG:"sfM","cl~":"vi>","pr~":"vs>",visu2:"ci","vi-su2":"ci-",visu3:"ci1",visu1sux1:"ci>",clSsut1:"ciG",clSsu2:"ciG1",visu1suw1:"ciM","vi-su1suw1":"ciM-",visu1sut1:"ciS",visut2:"ciS1",visu2lsc3:"cilsc3",vipp2:"sc","vi-ppt2":"sc-",vipp3:"sc1","vi>pp2":"sc>",peppt1:"scG",vippt2:"scS","ta>ppt1":"sc~",clpp2:"sf","cl-ppt2":"sf-","cl>pp2":"sf>",toppt1:"sfG",clMpp2:"sfM1",clppt2:"sfS",clpp2lsc2:"sflsc2",ciSppt1:"vippt1su1sut1",cippt1:"vippt1su2",cippt1lsc3:"vippt1su2lsc3",cippu1:"vippu1su2",cippu1lsc3:"vippu1su2lsc3",clppt1:"toG","pf!cl~":"cl!po>","pf!cl~ppt1":"cl!po>ppt1"},ot={B:">",N:"-",E:"!",T:"~"},ht={">":"B","-":"N","!":"E","~":"T"},lt=t=>t.replace(/[>\-!~]/g,t=>ht[t]),ut=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);function ct(t,e){for(let s=0;s<4;s++){if(ut(t.glyphs,e))return e;if("grelaon"===t.name||!ut(rt,e))break;e=rt[e]}}function dt(t,e,s){let i={glyphs:[],errors:[],width:0,left:0,height:0,depth:0,raised:0,lowered:0},n=[];for(let a of t)"space"===a.type?n.push({kern:a.direction*("larger"===a.size?s.largerSpace:s.interElementSpace)}):"error"===a.type?n.push({error:!0}):n.push(...ft(a,e,s.alignment||"full",i));const a=(t,n,r)=>{for(let o of t)if("kern"in o)n+=o.kern;else if("error"in o)i.errors.push(n),n+=s.errorWidth||0;else if("box"in o)n=a(o.box,n,r+o.raise);else{let[t,s,a]=e.glyphs[o.glyph],h=r+o.raise;i.glyphs.push({name:o.glyph,x:n,y:h}),i.left=Math.min(i.left,n),i.height=Math.max(i.height,h+s),i.depth=Math.max(i.depth,a-h),n+=t}return n};return i.width=a(n,0,0),i}function ft(t,e,s,i){const n=t=>e.glyphs[ct(e,t)],a=t=>ct(e,t)?t:null,r=[{error:!0}];if(t.letters.some(t=>!ct(e,t.name)))return r;let o=t.letters.filter(t=>5===t.position).map(t=>t.name+t.position).join(""),h=t.letters.map(t=>5===t.position?"":t.name+t.position),{base:l}=t,u=t.prepunctis,c=t.subpunctis;const d=(t,e)=>{let s;return 2===t&&u&&c&&(s=a(l+u+c+o+e))?(u=c="",s):1===t&&c&&(s=a(l+c+o+e))?(c="",s):1===t&&u&&(s=a(l+u+o+e))?(u="",s):0===t&&c&&e&&a(l+c+o)?null:0===t?a(l+o+e):null},f=(u?1:0)+(c?1:0),g=h.length,p=t=>t.slice(-1);let m=null;for(let t=f+Math.min(g,3);t>=0;t--){if(3===g&&t>=3&&t<=3+f){let[e,s,i]=h;if(m=d(t-3,e+s+i),!m&&e&&s&&i&&p(e)!==p(s)&&p(e)!==p(i)&&p(s)!==p(i))for(let n of[[s,e,i],[e,i,s],[s,i,e],[i,e,s],[i,s,e]])m||(m=d(t-3,n.join("")));if(m){h=["","",""];break}}if(2===g&&t>=2&&t<=2+f){let[e,s]=h;if(m=d(t-2,e+s),!m&&e&&s&&p(e)!==p(s)&&(m=d(t-2,s+e)),m){h=["",""];break}}if(1===g&&t>=1&&t<=1+f&&(m=d(t-1,h[0]),m)){h=[""];break}if(m=d(t,""),m)break}if(!m||u&&!a(u)||c&&!a(c))return r;let[x,y,v]=n(m),b=[{glyph:ct(e,m),raise:0}];for(let t of[u,c]){if(!t)continue;let s=n(t),i={glyph:ct(e,t),raise:0};t===u?b.unshift(i):b.push(i),x+=s[0],y=Math.max(y,s[1]),v=Math.max(v,s[2])}let L={width:x,height:y,depth:v},S=0;5!==t.glyphs[0].height&&(S=(t.glyphs[0].height-5)*(n("cl")||[0,0])[1]/4,b=[{box:b,raise:S}],i.raised=Math.max(i.raised,S),i.lowered=Math.max(i.lowered,-S));let C=Array(13).fill(0),w=Array(13).fill(0);for(let t of h)t&&(C[+p(t)]+=n(t.slice(0,-1))[0]);C[10]=Math.max(C[1],C[4],C[7]),C[11]=Math.max(C[2],C[8]),C[12]=Math.max(C[3],C[6],C[9]);let P=[],N=[];for(let t of h){if(!t)continue;let s=+p(t),[i,a,r]=n(t.slice(0,-1)),o={glyph:ct(e,t.slice(0,-1)),raise:S};if(2===s||8===s){o.raise+=2===s?L.height+r:-L.depth-a;let t=-Math.max(L.width,C[11])/2-C[s]/2+w[s];w[s]+=i;let e=-t-i;0===w[11]&&L.width<C[11]&&(w[11]=1,b.unshift({kern:(C[11]-L.width)/2}),t+=(C[11]-L.width)/2),b.push({kern:t},o,{kern:e});continue}if(o.raise+=s<=3?L.height-(a-r)/2:s<=6?(L.height-L.depth)/2-(a+r)/2:-L.depth-(a+r)/2,s%3==0){let t=w[s]-C[12];w[s]+=i;let e=C[12]-w[s];0===w[12]&&(w[12]=1,t=0),N.push({kern:t},o,{kern:e})}else{let t=w[s]-C[s];w[s]+=i;let e=C[s]-w[s];0===w[10]&&(w[10]=1,t=C[10]-C[s]),P.push({kern:t},o,{kern:e})}}return b=[...P,...b,...N],"neume"===s&&C[10]>0&&b.unshift({kern:-C[10]}),b}const gt=/^\s*([+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+))\s*(?:true\s*)?([a-z]{2})(?:\s*(?:plus|minus).*)?\s*$/i,pt={sp:1,pt:65536,bp:65781.76,pc:786432,in:4736286.72,cm:4736286.72/2.54,mm:4736286.72/25.4,dd:81133568/1157,cc:973602816/1157,em:655360,ex:282167.86944};function mt(t){var e=t.match(gt),s=e&&e[2].toLowerCase();if(s&&pt.hasOwnProperty(s))return Number(e[1].replace(",","."))*pt[s]/267750}function xt(t={},e="{}"){var s="italic"===t["font-style"]?"Italic":"",i="bold"===t["font-weight"]?"Bold":"";return e.replace("{}",""+(s||i?`${i}${s}`:"Regular"))}const yt="undefined"!=typeof document;let vt,bt=0,Lt=0,St=!1;function Ct(){const t="undefined"!=typeof document&&document.fonts,e=t?t.size:void 0;e!==vt&&(vt=e,Lt++)}const wt=(t,e)=>{let s=t.notes[e.parentElement.querySelector("[element-index]").getAttribute("element-index")];return s.neume||s},Pt={Default:0,Above:1,Below:2},Nt={supertitle:{display:"Supertitle",defaultSize:t=>7*t/6,containedInScore:t=>t.titles.hasSupertitle(),getFromScore:t=>t.titles.supertitle},title:{display:"Title",defaultSize:t=>3*t/2,containedInScore:t=>t.titles.hasTitle(),getFromScore:t=>t.titles.title},subtitle:{display:"Subtitle",defaultSize:t=>t,containedInScore:t=>t.titles.hasSubtitle(),getFromScore:t=>t.titles.subtitle},leftRight:{display:"Left / Right Text",cssClass:"textLeftRight",defaultSize:t=>.9*t,containedInScore:t=>t.titles.hasTextLeft()||t.titles.hasTextRight(),getFromScore:(t,e)=>t.titles[e.extraClass],getFromSvgElem:(t,e)=>t.titles[e.classList.contains("textRight")?"textRight":"textLeft"]},annotation:{display:"Annotation",defaultSize:t=>2*t/3,containedInScore:t=>!!t.annotation,getFromScore:(t,{elementIndex:e=0})=>t.annotation&&(t.annotation.annotations?t.annotation.annotations[e]:t.annotation),getFromSvgElem:(t,e)=>t.annotation&&(t.annotation.annotations?t.annotation.annotations[Array.from(e.parentElement.querySelectorAll("text.annotation")).indexOf(e)]:t.annotation)},dropCap:{display:"Drop Cap",defaultSize:t=>4*t,containedInScore:t=>!!t.dropCap,getFromScore:t=>t.dropCap},al:{display:"Above Staff",cssClass:"aboveLinesText",defaultSize:t=>t,containedInScore:t=>t.hasAboveLinesText,getFromScore:(t,e)=>t.notations[e.notation.notationIndex].alText[e.alIndex],getFromSvgElem:(t,e)=>wt(t,e).alText[e.getAttribute("al-index")||0]},choralSign:{display:"Choral Sign",size:t=>1.5*t.staffInterval,containedInScore:t=>!1,getFromScore:(t,e)=>t.notes[e.note.elementIndex].choralSign},lyric:{display:"Lyric",defaultSize:t=>.9*t,containedInScore:t=>t.hasLyrics,getFromScore:(t,e)=>t.notations[e.notation.notationIndex].lyrics[e.lyricIndex],getFromSvgElem:(t,e)=>wt(t,e).lyrics[e.getAttribute("lyric-index")||0]},translation:{display:"Translation",defaultSize:t=>.75*t,containedInScore:t=>t.hasTranslations,getFromScore:(t,e)=>t.notations[e.notation.notationIndex].translationText[e.translationIndex],getFromSvgElem:(t,e)=>wt(t,e).translationText[e.getAttribute("translation-index")||0]}},Tt={};Object.entries(Nt).forEach(([t,e])=>{let s=e.cssClass=e.cssClass||t;e.key=t,Tt[s]=e});const It=()=>Object.entries(Nt),At=t=>mt(t),Mt={pointsPerStaffInterval:1/At("1pt"),interElementSpace:At("0.06927cm"),largerSpace:At("0.10938cm"),aboveLinesRaise:At("0.17351cm"),aboveLinesHeight:At("0.3cm"),belowLinesHeight:At("0.6cm"),aboveThreshold:4,belowThreshold:1},Bt=t=>t.intraNeumeSpacing*t.interSyllabicMultiplier;Bt.isDefault=!0;const kt={None:"None",Linea:"Linea",AcuteAccent:"AcuteAccent",GraveAccent:"GraveAccent",Circle:"Circle",Semicircle:"Semicircle",ReversedSemicircle:"ReversedSemicircle",Stropha:"Stropha",StrophaLiquescent:"StrophaLiquescent",BeginningAscLiquescent:"BeginningAscLiquescent",BeginningDesLiquescent:"BeginningDesLiquescent",CustosDescLong:"CustosDescLong",CustosDescShort:"CustosDescShort",CustosLong:"CustosLong",CustosShort:"CustosShort",DoClef:"DoClef",FaClef:"FaClef",TrebleClef:"TrebleClef",TrebleClefSmall:"TrebleClefSmall",ChiRhoClef:"ChiRhoClef",ChiRhoClefSans:"ChiRhoClefSans",Flat:"Flat",Mora:"Mora",Natural:"Natural",OriscusAsc:"OriscusAsc",OriscusDes:"OriscusDes",OriscusLiquescent:"OriscusLiquescent",PodatusLower:"PodatusLower",PodatusUpper:"PodatusUpper",PodatusLowerShort:"PodatusLowerShort",PodatusUpperShort:"PodatusUpperShort",Porrectus1:"Porrectus1",Porrectus2:"Porrectus2",Porrectus3:"Porrectus3",Porrectus4:"Porrectus4",Porrectus5:"Porrectus5",PunctumCavum:"PunctumCavum",PunctumQuadratum:"PunctumQuadratum",PunctumQuadratumLiquescent:"PunctumQuadratumLiquescent",PunctumQuadratumAscLiquescent:"PunctumQuadratumAscLiquescent",PunctumQuadratumDesLiquescent:"PunctumQuadratumDesLiquescent",PunctumInclinatum:"PunctumInclinatum",PunctumInclinatumAscendens:"PunctumInclinatumAscendens",PunctumInclinatumDescendens:"PunctumInclinatumDescendens",PunctumInclinatumAuctus:"PunctumInclinatumAuctus",PunctumInclinatumLiquescent:"PunctumInclinatumLiquescent",Quilisma:"Quilisma",Sharp:"Sharp",TerminatingAscLiquescent:"TerminatingAscLiquescent",TerminatingDesLiquescent:"TerminatingDesLiquescent",VerticalEpisemaAbove:"VerticalEpisemaAbove",VerticalEpisemaBelow:"VerticalEpisemaBelow",VirgaLong:"VirgaLong",VirgaShort:"VirgaShort",Virgula:"Virgula",OpenParenthesis:"OpenParenthesis",CloseParenthesis:"CloseParenthesis",UpperBrace:"UpperBrace",OriscusAscCavum:"OriscusAscCavum",OriscusDesCavum:"OriscusDesCavum",OriscusLiquescentCavum:"OriscusLiquescentCavum",PodatusLowerCavum:"PodatusLowerCavum",PodatusUpperCavum:"PodatusUpperCavum",PodatusLowerShortCavum:"PodatusLowerShortCavum",PodatusUpperShortCavum:"PodatusUpperShortCavum",Porrectus1Cavum:"Porrectus1Cavum",Porrectus2Cavum:"Porrectus2Cavum",Porrectus3Cavum:"Porrectus3Cavum",Porrectus4Cavum:"Porrectus4Cavum",Porrectus5Cavum:"Porrectus5Cavum",PunctumQuadratumLiquescentCavum:"PunctumQuadratumLiquescentCavum",PunctumQuadratumAscLiquescentCavum:"PunctumQuadratumAscLiquescentCavum",PunctumQuadratumDesLiquescentCavum:"PunctumQuadratumDesLiquescentCavum",PunctumInclinatumCavum:"PunctumInclinatumCavum",PunctumInclinatumAscendensCavum:"PunctumInclinatumAscendensCavum",PunctumInclinatumDescendensCavum:"PunctumInclinatumDescendensCavum",PunctumInclinatumAuctusCavum:"PunctumInclinatumAuctusCavum",PunctumInclinatumLiquescentCavum:"PunctumInclinatumLiquescentCavum",QuilismaCavum:"QuilismaCavum",StrophaCavum:"StrophaCavum",StrophaLiquescentCavum:"StrophaLiquescentCavum",TerminatingAscLiquescentCavum:"TerminatingAscLiquescentCavum",TerminatingDesLiquescentCavum:"TerminatingDesLiquescentCavum"};function Ft(t,e=!1){return`Porrectus${Math.round(1e3*t)/1e3}${e?"Cavum":""}`}const Ot={};const Et={[kt.BeginningAscLiquescent]:kt.PunctumQuadratumAscLiquescentCavum,[kt.BeginningDesLiquescent]:kt.PunctumQuadratumDesLiquescentCavum,[kt.OriscusAsc]:kt.OriscusAscCavum,[kt.OriscusDes]:kt.OriscusDesCavum,[kt.OriscusLiquescent]:kt.OriscusLiquescentCavum,[kt.PodatusLower]:kt.PodatusLowerCavum,[kt.PodatusUpper]:kt.PodatusUpperCavum,[kt.PodatusLowerShort]:kt.PodatusLowerShortCavum,[kt.PodatusUpperShort]:kt.PodatusUpperShortCavum,[kt.Porrectus1]:kt.Porrectus1Cavum,[kt.Porrectus2]:kt.Porrectus2Cavum,[kt.Porrectus3]:kt.Porrectus3Cavum,[kt.Porrectus4]:kt.Porrectus4Cavum,[kt.Porrectus5]:kt.Porrectus5Cavum,[kt.PunctumQuadratum]:kt.PunctumCavum,[kt.PunctumQuadratumLiquescent]:kt.PunctumQuadratumLiquescentCavum,[kt.PunctumQuadratumAscLiquescent]:kt.PunctumQuadratumAscLiquescentCavum,[kt.PunctumQuadratumDesLiquescent]:kt.PunctumQuadratumDesLiquescentCavum,[kt.PunctumInclinatum]:kt.PunctumInclinatumCavum,[kt.PunctumInclinatumAscendens]:kt.PunctumInclinatumAscendensCavum,[kt.PunctumInclinatumDescendens]:kt.PunctumInclinatumDescendensCavum,[kt.PunctumInclinatumAuctus]:kt.PunctumInclinatumAuctusCavum,[kt.PunctumInclinatumLiquescent]:kt.PunctumInclinatumLiquescentCavum,[kt.Quilisma]:kt.QuilismaCavum,[kt.Stropha]:kt.StrophaCavum,[kt.StrophaLiquescent]:kt.StrophaLiquescentCavum,[kt.TerminatingAscLiquescent]:kt.TerminatingAscLiquescentCavum,[kt.TerminatingDesLiquescent]:kt.TerminatingDesLiquescentCavum},Dt={[kt.PunctumInclinatum]:0,[kt.PunctumInclinatumAscendens]:1,[kt.PunctumInclinatumDescendens]:-1,[kt.PunctumInclinatumAuctus]:0,[kt.PunctumInclinatumCavum]:0,[kt.PunctumInclinatumAscendensCavum]:1,[kt.PunctumInclinatumDescendensCavum]:-1,[kt.PunctumInclinatumAuctusCavum]:0};var zt={"&":"&amp;","<":"&lt;",'"':"&quot;"},Vt=t=>t.indexOf("&")<0&&t.indexOf("<")<0&&t.indexOf('"')<0?t:t.replace(/[&<"]/g,t=>zt[t]);const Rt=t=>{for(let e of Object.keys(t))if(/[-:][a-z]/.test(e)){if(/^\w+-index$/.test(e))continue;t[e.replace(/[-:]([a-z])/g,(t,e)=>e.toUpperCase())]=t[e],delete t[e]}},Wt={ns:"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/xmlns/",xlink:"http://www.w3.org/1999/xlink",hasDOMAccess:function(){return yt},svg:function(t,e){var s=document.createElementNS(this.ns,"svg");s.setAttribute("xmlns",this.ns),s.setAttribute("version","1.1"),s.setAttributeNS(this.xmlns,"xmlns:xlink",this.xlink),s.setAttribute("width",String(t)),s.setAttribute("height",String(e));var i=document.createElementNS(this.ns,"defs");return s.appendChild(i),s.defs=i,s.clearNotations=function(){for(s.removeChild(i);s.hasChildNodes();)s.removeChild(s.lastChild);s.appendChild(i)},s},rect:function(t,e){var s=document.createElementNS(this.ns,"rect");return s.setAttribute("width",String(t)),s.setAttribute("height",String(e)),s},line:function(t,e,s,i){var n=document.createElementNS(this.ns,"line");return n.setAttribute("x1",String(t)),n.setAttribute("y1",String(e)),n.setAttribute("x2",String(s)),n.setAttribute("y2",String(i)),n},g:function(){return document.createElementNS(this.ns,"g")},text:function(){return document.createElementNS(this.ns,"text")},tspan:function(t){var e=document.createElementNS(this.ns,"tspan");return e.textContent=t,e},use:function(t){var e=document.createElementNS(this.ns,"use");return e.setAttributeNS(this.xlink,"xlink:href","#"+t),e},svgFragmentForGlyph:function(t,e="#fff"){for(var s="",i=0;i<t.paths.length;++i){var n=t.paths[i];s+=Wt.createFragment(n.data?"path":"g",{d:n.data||void 0,fill:"negative"===n.type?e:void 0})}return s},nodesForGlyph:function(t,e="createNode",s="#fff"){for(var i=[],n=0;n<t.paths.length;++n){var a=t.paths[n];let r={};a.data&&(r.d=a.data),"negative"===a.type&&(r.fill=s),i.push(Wt[e](a.data?"path":"g",r))}return i},createNode:function(t,e,s){var i=document.createElementNS(this.ns,t);for(var n in e&&e.source&&(i.source=e.source,delete e.source),e)if(e.hasOwnProperty(n)&&void 0!==e[n]){var a=e[n],r=n.indexOf(":");r>0&&r<n.length-1&&n.indexOf(":",r+1)<0?i.setAttributeNS(this[n.slice(0,r)],n,a):i.setAttribute(n,a)}if(s)if("string"==typeof s)i.textContent=s;else if(s.constructor===[].constructor)for(var o=0;o<s.length;++o)i.appendChild(s[o]);else i.appendChild(s);return i},createSvgTree(t,e,...s){"class"in e&&(e.className=e.class,delete e.class),1===s.length&&s[0]instanceof Array&&(s=s[0]),Rt(e),e.style&&"object"==typeof e.style&&(e.style=Object.assign({},e.style),Rt(e.style));let i=e.source;return i&&i.sourceGabc&&(e["source-gabc"]=i.sourceGabc),{name:t,props:e,children:s}},createFragment:function(t,e,s){null==s&&(s="");var i="<"+t+" ";for(var n in e)if(e.hasOwnProperty(n)&&void 0!==e[n]){let t=e[n];i+=n+'="'+("string"==typeof t?Vt(t):t)+'" '}return i+=">"+s+"</"+t+">"},parseFragment:function(t){var e=document.createElement("svg");if(t){var s=this.g();e.innerHTML="<svg>"+t.replace(/\n/,"").replace(/<(\w+)([^<]+?)\/>/g,"<$1$2></$1>")+"</svg>";for(var i=0,n=e.firstChild.childNodes.length;i<n;i++)s.appendChild(e.firstChild.firstChild);return s}},translate:function(t,e,s){return t.setAttribute("transform","translate("+e+","+s+")"),t},scale:function(t,e,s){return t.setAttribute("transform","scale("+e+","+s+")"),t}},qt=t=>{for(var e="",s=0;s<t.length;s++)e+=t[s];return e},Ht={node:{method:"createSvgNode",element:(t,e,s)=>Wt.createNode(t,e,s)},tree:{method:"createSvgTree",element:(t,e,s)=>Wt.createSvgTree(t,e,...s||[])},fragment:{method:"createSvgFragment",element:(t,e,s)=>(void 0!==e.key&&(e.key=void 0),void 0!==e.source&&(e.source=void 0),Wt.createFragment(t,e,s&&qt(s)))}},Qt={Svg:0,Canvas:1,OpenTypeJS:2},jt={space:null,undertie:"ut",overtie:"ot",doubletie:"dt"};class ChantLayoutElement{constructor(){this.bounds=new Rect,this.origin=new Point(0,0),this.selected=!1,this.highlighted=!1}draw(t,...e){throw"ChantLayout Elements must implement draw(ctxt)"}createSvgNode(t,...e){throw"ChantLayout Elements must implement createSvgNode(ctxt)"}createSvgFragment(t,...e){throw"ChantLayout Elements must implement createSvgFragment(ctxt)"}}class SvgShape extends ChantLayoutElement{createSvgNode(t){return Wt.createNode(this.svgTag,this.getSvgProps(t))}createSvgTree(t){return Wt.createSvgTree(this.svgTag,this.getSvgProps(t))}createSvgFragment(t){return Wt.createFragment(this.svgTag,this.getSvgProps(t))}}class VerticalLineVisualizer extends SvgShape{get svgTag(){return"rect"}draw(t){var e=t.canvasCtxt,{weight:s,color:i}=this.lineStyle(t);e.fillStyle=i,e.fillRect(this.bounds.x,this.bounds.y,s,this.bounds.height)}getSvgProps(t){var{weight:e,color:s,cssClass:i}=this.lineStyle(t);return{x:this.bounds.x,y:this.bounds.y,width:e,height:this.bounds.height,fill:s,class:i}}}const Gt=t=>({weight:t.neumeLineWeight,color:t.neumeLineColor,cssClass:"neumeLine"});class DividerLineVisualizer extends VerticalLineVisualizer{constructor(t,e,s,i){super(),this.divider=i;var n=t.calculateHeightFromStaffPosition(e),a=t.calculateHeightFromStaffPosition(s);if(n>a){var r=n;n=a,a=r}this.bounds.x=0,this.bounds.y=n,this.bounds.width=t.dividerLineWeight,this.bounds.height=a-n,this.origin.x=this.bounds.width/2,this.origin.y=n}lineStyle(t){return{weight:t.dividerLineWeight,color:t.dividerLineColor,cssClass:"dividerLine"}}getSvgProps(t){let e=super.getSvgProps(t);return this.divider&&(this.divider.selected&&(e.class+=" selected"),e["source-index"]=this.divider.sourceIndex,e["element-index"]=this.divider.elementIndex,e.source=this.divider),e}}class NeumeLineVisualizer extends VerticalLineVisualizer{constructor(e,s,i,n){super();var a=s.staffPosition,r="number"==typeof i?i:i?i.staffPosition:s.staffPosition+4,o=s,h="object"==typeof i?i:null;if(a<r){var l=a;a=r,r=l,[o,h]=[h,o]}n&&a-r>4&&(r=a-4);var u=e.calculateHeightFromStaffPosition(a),c=0;if(n){var d=o&&h?$(h,o):void 0;a-r===1&&(void 0===d?Math.abs(a)%2==1&&r>-3:d===t.StemQueue.OnSpaceAboveBottomLine)&&r--,c+=e.glyphPunctumHeight*e.glyphScaling/2.2}c+=e.calculateHeightFromStaffPosition(r),this.bounds.x=0,this.bounds.y=u,this.bounds.width=e.neumeLineWeight,this.bounds.height=c-u,this.origin.x=0,this.origin.y=0}lineStyle(t){return Gt(t)}}class NeumeBeamVisualizer extends SvgShape{constructor(t,e,s,i,n,a=0){super();var r=t.calculateHeightFromStaffPosition(i),o=t.calculateHeightFromStaffPosition(n);r===o&&e===s&&(r-=t.staffInterval/2,e-=2*t.staffInterval/3),this.bounds.x=e,this.bounds.y=r+a*t.neumeLineWeight*6,this.bounds.width=s-e,this.bounds.height=o-r,this.origin.x=0,this.origin.y=0}getPoints(t){const e=3*t.neumeLineWeight;return{x0:this.bounds.x-t.neumeLineWeight/2,x1:this.bounds.x+this.bounds.width+t.neumeLineWeight/2,y0:this.bounds.y,y1:this.bounds.y+this.bounds.height,height:e}}draw(t){var e=t.canvasCtxt;const s=this.getPoints(t);e.fillStyle=t.neumeLineColor,e.beginPath(),e.moveTo(s.x0,s.y0+s.height/2),e.lineTo(s.x0,s.y0-s.height/2),e.lineTo(s.x1,s.y1-s.height/2),e.lineTo(s.x1,s.y1+s.height/2),e.closePath(),e.fill()}getSvgProps(t){const e=this.getPoints(t);return{points:`${e.x0},${e.y0+e.height/2} ${e.x0},${e.y0-e.height/2} ${e.x1},${e.y1-e.height/2} ${e.x1},${e.y1+e.height/2}`,fill:t.neumeLineColor,class:"neumeBeam"}}get svgTag(){return"polygon"}}class VirgaLineVisualizer extends VerticalLineVisualizer{constructor(e,s,i=0){super();var n,a=s.staffPosition,r=e.calculateHeightFromStaffPosition(a),o=$(s,s,Math.min(i,0));n=(void 0===o?0!==Math.abs(a%2):-1===i?o===t.StemQueue.OnSpaceAboveBottomLine:i<0&&o===t.StemQueue.OnBottomLine||o===t.StemQueue.OnLineAboveBottomLine)?r+2.7*e.staffInterval:r+1.8*e.staffInterval,this.bounds.x=0,this.bounds.y=r,this.bounds.width=e.neumeLineWeight,this.bounds.height=n-r,this.origin.x=0,this.origin.y=0}lineStyle(t){return Gt(t)}}class LineaVisualizer extends ChantLayoutElement{constructor(t,e,s=!1){super();var i=e.staffPosition;if(s){var n=h.PunctumQuadratum.bounds.height*t.glyphScaling,a=.75*n,r=n/4;return this.bar={y:r,height:a},this.bounds.x=0,this.bounds.y=t.calculateHeightFromStaffPosition(i)-a/2-r,this.bounds.width=h.PunctumQuadratum.bounds.width*t.glyphScaling*2.4+2*t.neumeLineWeight,this.bounds.height=a+2*r,this.origin.x=t.neumeLineWeight,void(this.origin.y=0)}this.bar=null;var o=t.calculateHeightFromStaffPosition(i)-e.origin.y,l=o+e.bounds.height;this.bounds.x=0,this.bounds.y=o,this.bounds.width=5*t.neumeLineWeight+e.bounds.width,this.bounds.height=l-o,this.origin.x=2.5*t.neumeLineWeight,this.origin.y=0}getRects(t){var e=[this.bounds.x,this.bounds.x+this.bounds.width-t.neumeLineWeight].map(e=>({x:e,y:this.bounds.y,width:t.neumeLineWeight,height:this.bounds.height}));return this.bar&&e.push({x:this.bounds.x+t.neumeLineWeight,y:this.bounds.y+this.bar.y,width:this.bounds.width-2*t.neumeLineWeight,height:this.bar.height}),e}draw(t){var e=t.canvasCtxt;for(var s of(e.fillStyle=t.neumeLineColor,this.getRects(t)))e.fillRect(s.x,s.y,s.width,s.height)}getSvgProps(t,e){return Object.assign(Object.assign({},e),{fill:t.neumeLineColor,class:"neumeLine"})}createSvgNode(t){return Wt.createNode("g",null,this.getRects(t).map(e=>Wt.createNode("rect",this.getSvgProps(t,e))))}createSvgTree(t){return Wt.createSvgTree("g",{},...this.getRects(t).map(e=>Wt.createSvgTree("rect",this.getSvgProps(t,e))))}createSvgFragment(t){return Wt.createFragment("g",null,this.getRects(t).map(e=>Wt.createFragment("rect",this.getSvgProps(t,e))).join(""))}}const $t=/^Porrectus([\d.]+)(Cavum)?$/;class GlyphVisualizer extends ChantLayoutElement{constructor(t,e,s){super(),this.scale=1,this.glyph=null,this.setGlyph(t,e,s)}setGlyph(t,e,s){null!=e&&""!==e||(e=kt.None);const i=e.startsWith("Porrectus")?$t.exec(e):null,n=i&&1!==t.glyphMultiplier?`Porrectus${i[1]}x${t.glyphMultiplier}${i[2]||""}`:e;if(this.glyphId!==n){this.glyphCode=e,this.glyphId=n;let r=this.glyph=s||(i?function(t,e,s,i){return h[t]||Ot[t]||(Ot[t]=S(100*e/s,d(e),i))}(n,Number(i[1]),t.glyphMultiplier,!!i[2]):h[e]);if(this.porrectusNoteDiff=i?Number(i[1]):0,!t.defs.hasOwnProperty(n)){var a=()=>{var e={id:t.defIdPrefix+n,class:"glyph"};return!0===t.scaleDefs&&(e.transform="scale("+t.glyphScaling+")"),e};const s=()=>{let e=a();t.defs[n]=Wt.createFragment("g",e,Wt.svgFragmentForGlyph(r,t.negativeFillColor)),t.defsNode&&t.defsNode.appendChild(Wt.createNode("g",e,Wt.nodesForGlyph(r,"createNode",t.negativeFillColor)))};s.makeSvgTree=()=>Wt.createSvgTree("g",a(),...Wt.nodesForGlyph(r,"createSvgTree",t.negativeFillColor)),s.glyphCode=e,s(),t.makeDefs.push(s)}this.align=this.glyph.align}const r=t.glyphScaling*this.scale;this.origin.x=this.glyph.origin.x*r,this.origin.y=this.glyph.origin.y*r,this.bounds.x=0,this.bounds.y=-this.origin.y,this.bounds.width=this.glyph.bounds.width*r,this.bounds.height=this.glyph.bounds.height*r}setStaffPosition(t,e){this.bounds.y=t.calculateHeightFromStaffPosition(e)-this.origin.y}draw(t){var e=t.canvasCtxt,s=this.bounds.x+this.origin.x,i=this.bounds.y+this.origin.y,n=t.glyphScaling*this.scale;e.translate(s,i),e.scale(n,n);for(var a=0;a<this.glyph.paths.length;a++){var r=this.glyph.paths[a];r.data&&(e.fillStyle="negative"===r.type?t.negativeFillColor:t.neumeLineColor,e.fill(r.path2d||(r.path2d=new Path2D(r.data))))}e.scale(1/n,1/n),e.translate(-s,-i)}getSvgAttributes(t,e){let s="";const i=this.porrectusNoteDiff;if(i){let t=e.neume.notes,i=t.indexOf(e),n=t[i+1];s=e.selected?n.selected?"selected":"selectedA":n.selected?"selectedB":""}else{s=e&&(e.selected||e.model&&e.model.selected)?"selected":""}var n={"xlink:href":"#"+t.defIdPrefix+this.glyphId,class:s};if(e&&(n["source-index"]=e.sourceIndex,n["element-index"]=e.elementIndex,"noteIndex"in e&&(n.class+=" note",n.id=t.noteIdPrefix+(e.noteIndex+1),e.neume))){const t=e.glyphVisualizer.glyphCode;i?n.class+=" porrectus porrectus-start":"None"===t&&(n.class+=" porrectus porrectus-end")}if(!0===t.scaleDefs)n.x=this.bounds.x+this.origin.x,n.y=this.bounds.y+this.origin.y,1!==this.scale&&(n.transform="scale("+this.scale+")",n.x/=this.scale,n.y/=this.scale);else{const e=t.glyphScaling*this.scale;n.x=(this.bounds.x+this.origin.x)/e,n.y=(this.bounds.y+this.origin.y)/e,n.transform="scale("+e+","+e+")"}return n}createSvgNode(t,e){var s=this.getSvgAttributes(t,e);return s.source=e,Wt.createNode("use",s)}createSvgTree(t,e){var s=this.getSvgAttributes(t,e);return e&&(s.source=e),Wt.createSvgTree("use",s)}createSvgFragment(t,e){return Wt.createFragment("use",this.getSvgAttributes(t,e))}}const Ut=new WeakMap,_t=new Map;function Jt(t){let e=Ut.get(t);if(!e){let s=(_t.get(t.name)||0)+1;_t.set(t.name,s),Ut.set(t,e={id:s>1?`${t.name}-${s}`:t.name,glyphs:{}})}return e}class NabcNeumes extends ChantLayoutElement{constructor(t,e,s,i,n=!1){super(),this.xOffset=0,this.voice=s,this.phantom=n;let a=this.unit=t.nabcSize*t.staffInterval/i.unitsPerEm,r=this.layout=dt(e,i,{interElementSpace:Mt.interElementSpace*t.staffInterval/a,largerSpace:Mt.largerSpace*t.staffInterval/a,alignment:t.nabcAlignment,errorWidth:i.unitsPerEm*NabcNeumes.errorSize*2}),o=Jt(i).id;this.glyphs=(n?[]:r.glyphs).map(e=>{let s=`Nabc-${o}-${lt(e.name)}`,n=function(t,e){let s=Jt(t).glyphs;if(!Object.prototype.hasOwnProperty.call(s,e)){let[i,n,a,r]=t.glyphs[e];s[e]={paths:[{type:"positive",data:r}],bounds:{x:0,y:-n,width:i,height:n+a},origin:{x:0,y:n}}}return s[e]}(i,e.name),r=new GlyphVisualizer(t,s,n);return r.scale=a/t.glyphScaling,r.setGlyph(t,s,n),r.bounds.x=e.x*a,r});let h=Math.max(r.width,...r.glyphs.map(t=>t.x+i.glyphs[t.name][0]));this.bounds.x=r.left*a,this.bounds.width=(h-r.left)*a,this.bounds.height=(r.height+r.depth)*a,this.setBaseline(0)}moveBy(t){this.xOffset+=t,this.bounds.x+=t;for(let e of this.glyphs)e.bounds.x+=t}setBaseline(t){this.baseline=t,this.bounds.y=t-this.layout.height*this.unit,this.glyphs.forEach((e,s)=>{e.bounds.y=t-this.layout.glyphs[s].y*this.unit-e.origin.y})}errorAttributes(t,e){return{class:"nabcError",x:this.xOffset+e*this.unit,y:this.baseline,"font-family":t.textStyles.lyric.font.replace(/"/g,"'"),"font-size":NabcNeumes.errorSize*t.nabcSize*t.staffInterval,fill:t.neumeLineColor}}draw(t){if(this.phantom)return;for(let e of this.glyphs)e.draw(t);let e=t.canvasCtxt;for(let s of this.layout.errors)e.font=NabcNeumes.errorSize*t.nabcSize*t.staffInterval+"px "+t.textStyles.lyric.font,e.fillStyle=t.neumeLineColor,e.fillText("ERR",this.xOffset+s*this.unit,this.baseline)}getSvgAttributes(){return{class:"nabc nabc-"+(this.voice+1)}}createSvgNode(t){return Wt.createNode("g",this.getSvgAttributes(),[...this.glyphs.map(e=>e.createSvgNode(t)),...this.layout.errors.map(e=>Wt.createNode("text",this.errorAttributes(t,e),"ERR"))])}createSvgTree(t){return Wt.createSvgTree("g",this.getSvgAttributes(),...this.glyphs.map(e=>e.createSvgTree(t)),...this.layout.errors.map(e=>Wt.createSvgTree("text",this.errorAttributes(t,e),"ERR")))}createSvgFragment(t){let e=this.glyphs.map(e=>e.createSvgFragment(t)).join("");for(let s of this.layout.errors)e+=Wt.createFragment("text",this.errorAttributes(t,s),"ERR");return Wt.createFragment("g",this.getSvgAttributes(),e)}}NabcNeumes.errorSize=.6;class BraceVisualizer extends ChantLayoutElement{draw(t){var e=t.canvasCtxt;e.strokeStyle=t.neumeLineColor,e.lineWidth=t.staffLineWeight,e.stroke(new Path2D(this.generatePathString())),this.accent&&this.accent.draw(t)}getSvgPathProps(t){return{d:this.generatePathString(),stroke:t.neumeLineColor,"stroke-width":t.staffLineWeight+"px",fill:"none",class:"brace"}}createSvgNode(t){var e=Wt.createNode("path",this.getSvgPathProps(t));return this.accent?Wt.createNode("g",{class:"accentedBrace"},[e,this.accent.createSvgNode(t)]):e}createSvgTree(t){var e=Wt.createSvgTree("path",this.getSvgPathProps(t));return this.accent?Wt.createSvgTree("g",{class:"accentedBrace"},e,this.accent.createSvgTree(t)):e}createSvgFragment(t){var e=Wt.createFragment("path",this.getSvgPathProps(t));return this.accent?(e+=this.accent.createSvgFragment(t),Wt.createFragment("g",{class:"accentedBrace"},e)):e}}class RoundBraceVisualizer extends BraceVisualizer{constructor(t,e,s,i,n){if(super(),this.ignoreBounds=!0,e>s){var a=e;e=s,s=a}this.isAbove=n,this.braceHeight=3*t.staffInterval/2,this.bounds=new Rect(e,n?i-this.braceHeight:i,s-e,this.braceHeight),this.origin.x=0,this.origin.y=0}getPathPoints(){var t,e,s,i=this.bounds.x,n=this.bounds.right();return e=this.bounds.width/6,s=this.bounds.height,this.isAbove?(t=this.bounds.bottom(),s=-s):t=this.bounds.y,{x1:i,x2:n,y:t,cx1:i+e,cx2:n-e,cy:t+s}}generatePathString(){const{x1:t,x2:e,y:s,cx1:i,cx2:n,cy:a}=this.getPathPoints();return"M "+t.toFixed(2)+" "+s.toFixed(2)+" C "+i.toFixed(2)+" "+a.toFixed(2)+" "+n.toFixed(2)+" "+a.toFixed(2)+" "+e.toFixed(2)+" "+s.toFixed(2)}}class CurlyBraceVisualizer extends BraceVisualizer{constructor(t,e,s,i,n=!0,a=!1){if(super(),e>s){var r=e;e=s,s=r}this.isAbove=n,this.braceHeight=t.staffInterval/2,n&&(i-=this.braceHeight),this.braceBounds=new Rect(e,i,s-e,this.braceHeight);var o=this.braceBounds.clone();a&&n&&(this.accent=new GlyphVisualizer(t,kt.AcuteAccent),this.accent.bounds.x+=o.x+(s-e)/2,this.accent.bounds.y+=o.y-t.staffInterval/4,o.union(this.accent.bounds)),this.bounds=o,this.origin.x=0,this.origin.y=0}generatePathString(){var t,e,s=.6,i=this.braceBounds.x,n=this.braceBounds.right(),a=this.braceBounds.width;this.isAbove?(t=this.braceBounds.bottom(),e=-this.braceHeight):(t=this.braceBounds.y,e=this.braceHeight);var r=t+s*e,o=i+.25*a,h=t+.4*e,l=i+.5*a,u=t+e,c=t+s*e,d=i+.75*a,f=t+.4*e;return"M "+i.toFixed(2)+" "+t.toFixed(2)+" Q "+i.toFixed(2)+" "+r.toFixed(2)+" "+o.toFixed(2)+" "+h.toFixed(2)+" T "+l.toFixed(2)+" "+u.toFixed(2)+" M "+n.toFixed(2)+" "+t.toFixed(2)+" Q "+n.toFixed(2)+" "+c.toFixed(2)+" "+d.toFixed(2)+" "+f.toFixed(2)+" T "+l.toFixed(2)+" "+u.toFixed(2)}}const Xt=t=>parseInt(t);class TextSpan{constructor(t,e,s,i=0,n){null==e&&(e=[]),this.text=t,this.propertyArray=e,this.activeTags=s||[],this.index=i,n&&("xOffset"in n&&(this.xOffset=n.xOffset),"newLine"in n&&(this.newLine=n.newLine))}get mergedProperties(){return this.propertiesVersion!==bt&&(this.propertiesVersion=bt,this.cachedProperties=Object.assign.apply(null,[{}].concat(this.propertyArray)),this.cachedCss=void 0),this.cachedProperties}get properties(){const t=Object.assign({},this.mergedProperties);return void 0!==this.xOffset&&(t.xOffset=this.xOffset),"newLine"in this&&(t.newLine=this.newLine),t}getCss(){const t=this.mergedProperties;void 0===this.cachedCss&&(this.cachedCss=a(t));let e=this.cachedCss;return this.xOffset&&(e+=`xOffset: ${this.xOffset};`),this.newLine&&(e+=`newLine: ${this.newLine};`),e}clone(){const t=new TextSpan(this.text,this.propertyArray,this.activeTags,this.index);return void 0!==this.xOffset&&(t.xOffset=this.xOffset),"newLine"in this&&(t.newLine=this.newLine),"wrappedSpace"in this&&(t.wrappedSpace=this.wrappedSpace),t}}class MarkupStackFrame{constructor(t,e,s=[],i){this.tagName=t,this.startIndex=e,this.propertyArray=s,i&&(this.symbol=i)}static createStackFrame(t,e,s,i={},n=""){return new MarkupStackFrame(e,s,[t.fontStyleDictionary[e],i],n)}}var Zt={"&":"&amp;","<":"&lt;",">":"&gt;"};const Yt=new RegExp(/(<br\/?>)|<v>([\s\S]*?)(?:<\/v>|$)|(\*)(?=\s*\*|[^*]*(?:$|<v>))|(\+)|<sp>(?:(~)|(')?([ao]e|[æœaeiouy])|([arv])\/)<\/sp>|([arv])\/\.|([℣℟])\.?|(?:([*_^%])|<(\/)?([bceiuv]|ul|sc|tt|font)(?:\s+(?:family="([^"]+)"|fill="([^"]+)"|class="([^"]+)"))*>)(?=(?:(.+?)(?:\11|<\/\13>))?)|<sp>([^<]*?)<\/sp>/.source+`|(${N})`,"gi"),Kt=/\{greextra\}\{([^}]*)\}|\{?(\\?')?(?:\\([ao]e|æœaeiouy))\}?|\\'\{?([æœaeiouy])\}?|\\([a-z@]+)\*?((?:\s*(?:\[[^\]]*\]|\{(?:[^{}]|\{[^{}]*\})*\}))*)|\\([&%$#_{}])|[{}]/gi,te=/^<\/?[a-z]*[A-Z]|<\/[a-z]*[A-Z][a-z]*>$/,ee={grecross:"Cross",grealtcross:"Cross.alt",gredagger:"Dagger",greheightstar:"StarHeight",gresixstar:"StarSix",grestar:"StarSix",gothrbar:"RWithBarGoth",gothvbar:"VWithBarGoth"},se=/^(?:gre|[hv]space$|[hv]skip$|kern$|rule$|[hv]?phantom$|color$|label$|(?:set|addto)length$)/i;class TextElement extends ChantLayoutElement{constructor(t,e,s,i,n,a,r,o,h=!0){super(),this.bounds.x=0,this.bounds.y=0,this.bounds.width=0,this.bounds.height=0,this.origin.x=0,this.origin.y=0,this.fontFamily=s,this.fontSize=i,this.textAnchor=n,this.sourceIndex=a,this.sourceGabc=void 0===r?r:B(r),this.dominantBaseline="baseline",o&&(this.textType=o),this.generateSpansFromText(t,e),h&&this.recalculateMetrics(t)}getFromScore(t){return this.textType.getFromScore(t,this)}generateSpansFromText(t,e){if(e=e.replace(/\s+/g," "),this.text="",this.spans=[],this.wrappedSpans=void 0,"*"===e||"+"===e||"†"===e){let s="*"===e?[t.asteriskProperties]:"+"===e?[t.plusProperties]:null;return e=t.specialCharText(e)||e,void this.spans.push(new TextSpan(e,s))}var s=[],i=0,n=0,a=(t,e,i)=>{if(""===t&&!this.dropCap)return;this.text+=t;for(var a=[],r=0;r<s.length;r++)a.push.apply(a,s[r].propertyArray);i&&a.push(i);const o=new TextSpan(t,a,s.map(t=>t.tagName),e);this.spans.push(o),n&&(o.newLine=n,n=0)},r=Yt,o=Kt;r.lastIndex=0;for(var h=null,l=!1,u=()=>a(e.substring(i,h.index),i);h=r.exec(e);){var[,c,d,f,g,p,m,x,y,v,b,L,S,C,P,N,T,I,A,B]=h;if(y=y||v||b,te.test(h[0]))r.lastIndex=h.index+1;else{if(c)h.index>i&&u(),n++;else if(d){let t;u();let e=0,s=0;for(o.lastIndex=0;t=o.exec(d);){e<t.index&&(a(d.slice(e,t.index),h.index+e+s),s=3);let[,i,n,r,l,u,c,f]=t,g="";if(r)g=_(r),n&&(g=w(g)),a(g,h.index+t.index+s);else if(l)a(w(l),h.index+t.index+s);else if(f)a(f,h.index+t.index+s);else{if(u){i=/^greextra$/i.test(u)?(/\{([^{}]*)\}/.exec(c)||[])[1]:ee[u.toLowerCase()];let t=c.indexOf("{");!i&&t>=0&&!se.test(u)&&(o.lastIndex-=c.length-t)}g=i&&k[i],g&&a(g,h.index+t.index+s,{"font-family":"greextra"})}e=o.lastIndex,s=3}e<d.length&&a(d.slice(e),h.index+e+s)}else if(f)u(),s.length>0&&s[s.length-1].symbol===f?s.pop():a(t.specialCharText(f)||"*",h.index,t.asteriskProperties);else if(g)u(),a(t.specialCharText(g)||"+",h.index,t.plusProperties);else if(p)u(),a("∼",h.index);else if(x){let t=_(x);m&&(t=w(t)),u(),a(t,h.index)}else if(y)u(),a(t.textBeforeSpecialChar+t.specialCharText(y)+t.textAfterSpecialChar,h.index,t.specialCharProperties);else if(B)u(),a(M(B),h.index);else if(void 0!==A){u();let e=Object.prototype.hasOwnProperty.call(t.specials,A)?t.specials[A]:A;"*"===e?a(t.specialCharText("*")||"*",h.index,t.asteriskProperties):"+"===e?a(t.specialCharText("+")||"+",h.index,t.plusProperties):a(e,h.index)}else{if("*"===L)if(I&&/[^\s*]/.test(I))l=!0;else{if(!l)continue;l=!1}if(L&&(C=t.markupSymbolDictionary[L],s.length>0&&s[s.length-1].tagName===C&&s[s.length-1].symbol===L&&(S=!0)),s.length>0&&s[s.length-1].tagName===C)u(),S&&s.pop();else if(u(),S){let t=s.findIndex(t=>t.tagName===C);t>=0&&s.splice(t,1)}else{const e={};P&&(e["font-family"]=P),N&&(e.fill=N),T&&(e.class=T),s.push(MarkupStackFrame.createStackFrame(t,C,h.index,e,L))}}i=h.index+h[0].length}}(i<e.length||0===this.spans.length)&&a(e.slice(i),i)}fontSizeForProperties(t,e={}){const s=e["font-size"];if(void 0===s)return this.fontSize(t)*(this.resize||1);let i=parseFloat(s)||this.fontSize(t);return"string"==typeof s&&s.endsWith("%")&&(i*=this.fontSize(t)/100),i*(this.resize||1)}lineSpacing(t){return this.textType&&t.textStyles[this.textType.key].lineHeight||1.1}lineBreakHeight(t,e,s=e.mergedProperties){return this.lineSpacing(t)*this.fontSizeForProperties(t,s)*(Xt(e.newLine)||1)}getCanvasFontForProperties(t,e={}){var s="";return"italic"===e["font-style"]&&(s+="italic "),"small-caps"===e["font-variant"]&&(s+="small-caps "),"bold"===e["font-weight"]&&(s+="bold "),s+=`${this.fontSizeForProperties(t,e)}px `,s+=e["font-family"]||this.fontFamily(t)}measureSubstringBBox(t,e){return this.measureSubstring(t,e,!0)}measureSubstring(t,e,s=!1,i=!1){if(0===e)return 0;var n;e||(e=1/0),e<0&&(n=-e,e=1/0);for(var a=t.textMeasuringStrategy,r=0,o=[],h=[this.spans[0]],l=0,u=this.fontSize(t)*(this.resize||1),c=0,d=new Rect(0,0,0,0),f=0;f<this.spans.length;f++){var g=this.spans[f],p=g.text.slice(0,e-l);if(g.newLine){if(c+=this.lineBreakHeight(t,g),n||!0!==this.rightAligned||e!==1/0){if(0===--n)break}else h[h.length-1].xOffset=this.firstLineMaxWidth-r,h.push(g);o.push(r),r=0}if(a===Qt.Canvas){let e=t.measureCanvasText(this.getCanvasFontForProperties(t,g.mergedProperties),p);if("actualBoundingBoxAscent"in e){let t=e.actualBoundingBoxLeft;d.unionWith(r-t,c-e.actualBoundingBoxAscent,e.width+t,e.actualBoundingBoxDescent+e.actualBoundingBoxAscent),this instanceof DropCap&&(r+=Math.max(0,t))}else d.unionWith(r,c-u,e.width,u);r+=e.width}else if(a===Qt.OpenTypeJS&&t.fontDictionary){const e=g.mergedProperties;let s=t.getFontForProperties(e,e["font-family"]||this.fontFamily(t));const i="small-caps"===e["font-variant"],n=this.fontSizeForProperties(t,e);if("getPath"in s){const e=t.measureOpenTypeText(s,p,n,i);let a=e.bbox,o=e.advanceWidth;d.unionWith(r+a.x1,c+a.y1,o-a.x1,a.y2-a.y1),r+=o,this instanceof DropCap&&(r-=a.x1)}else{const e=t.layoutFontkitText(s,p,i),{unitsPerEm:a}=s,o=n/a;let h=e.bbox,l=e.advanceWidth*o;d.unionWith(r+h.minX*o,c-h.maxY*o,l-h.minX*o,h.height*o),r+=l,this instanceof DropCap&&(r-=h.minX*o)}}else if(a===Qt.Svg){const e=t.measureSvgText(this.createSvgNodeToMeasure(t,g,p)),s=e.bbox;d.unionWith(r+s.x,c+s.y,s.width,s.height),r+=e.advanceWidth,this instanceof DropCap&&(r-=Math.min(0,s.x))}if((l+=p.length)===e)break}if(!n&&r&&h.length&&!0===this.rightAligned&&e===1/0&&(h[h.length-1].xOffset=this.firstLineMaxWidth-r),i||(r=Math.max(r,...o)),!0===s){let t=d.height,e=d.y;return{width:r,height:t,x:d.x,y:e}}return r}getLines(){var t=[],e=0,s=0;return this.spans.forEach((i,n)=>{n&&!i.newLine||(!0===i.newLine&&(s+=(i.wrappedSpace||" ").length),t.push({start:e,end:e,textStart:s,xOffset:i.xOffset||0})),e+=i.text.length,s+=i.text.length,t[t.length-1].end=e}),t}unwrap(){var t=this.wrappedSpans;if(t){for(var e=t.length-1;e>=0;e--)this.spans.splice(t[e].index,t[e].count,...t[e].spans);this.wrappedSpans=void 0}}recalculateMetrics(t,e=!0){if(e&&(this.maxWidth=void 0,this.firstLineMaxWidth=void 0,this.rightAligned=void 0,this.resize=void 0,this.numLines=void 0,this.unwrap(),this.spans.forEach(t=>{t.xOffset=void 0})),this.bounds.x=0,this.bounds.y=0,this.origin.x=0,t.textMeasuringStrategy===Qt.Svg){let e=t.prepareSvgTextMeasurer();t.svgTextMeasurer.insertBefore(this.createSvgNode(t),e);var s=t.svgTextMeasurer.firstChild.getBBox();this.bounds.width=s.width,this.bounds.height=s.height,this.origin.y=-s.y,this.origin.x=-s.x}else{let e=this.measureSubstringBBox(t);this.bounds.width=e.width,this.bounds.height=e.height,this.origin.y=-e.y,this.origin.x=-e.x}this.numLines=this.spans.reduce((t,e)=>t+(e.newLine?Xt(e.newLine)||1:0),1)}setMaxWidth(t,e,s=e){if(this.wrappedSpans&&this.recalculateMetrics(t),this.bounds.width>e){this.maxWidth=e;var i=e/this.bounds.width;if(this instanceof Lyric&&i>=.85)this.resize=i,this.needsLayout=!0;else{s<0&&(s=e),this.firstLineMaxWidth=s;for(var n,a=[],r=/\s+|$/g;(n=r.exec(this.text))&&(!a.length||n.index>a[a.length-1].index);)a.push(n);a.length>1&&0===a[0].index&&a.shift(),a.length>1&&a[a.length-2].index+a[a.length-2][0].length===this.text.length&&a.pop();var o=0;this.spans.forEach((t,e)=>{if(e&&t.newLine){let t=0;for(;a[t].index+a[t][0].length<o;)t++;a[t].index<=o?a[t].forced=!0:a.splice(t,0,{index:o,0:"",forced:!0})}o+=t.text.length});for(var h=s,l=0,u=0;l<a.length;){for(var c=l;c<a.length-1&&!a[c].forced;)c++;var d=this.findFirstMatchWiderThan(t,a,l+1,h,u,c+1);if(d>c)h=e,l=c+1;else{var f=a[d-1];n=a[d];for(var g=f.index-u,p=g+f[0].length,m=0,x=0;m<this.spans.length-1&&x+this.spans[m].text.length<=g;)x+=this.spans[m++].text.length;for(var y=this.spans[m],v=y.text.slice(0,g-x),b=m;b<this.spans.length-1&&x+this.spans[b].text.length<p;)x+=this.spans[b++].text.length;var L=this.spans[b],S=this.spans[b+1],C=L.text.slice(p-x),w=[];if(this.rightAligned=h===s&&s!==e,u+=f[0].length,v){let t=new TextSpan(v,y.propertyArray,y.activeTags,void 0,"newLine"in y?{newLine:y.newLine}:void 0);"wrappedSpace"in y&&(t.wrappedSpace=y.wrappedSpace),w.push(t)}if(C){let t=new TextSpan(C,L.propertyArray,L.activeTags,void 0,{newLine:!0});t.wrappedSpace=f[0],w.push(t)}else if(S){let t=S.clone();t.newLine=!0,t.wrappedSpace=f[0],w.push(t),b++}if((this.wrappedSpans||(this.wrappedSpans=[])).push({index:m,count:w.length,spans:this.spans.splice(m,b-m+1,...w)}),this.needsLayout=!0,h=e,n.index===this.text.length||this.measureSubstring(t)<=e)break;l=d}}}this.recalculateMetrics(t,!1)}}findFirstMatchWiderThan(t,e,s,i,n=0,a=e.length){for(var r=s=>this.measureSubstring(t,e[s].index-n,!1,!0)>i,o=s,h=s,l=1;h<a&&!r(h);)o=h+1,h+=l,l*=2;for(h=Math.min(h,a);o<h;){var u=o+h>>1;r(u)?h=u:o=u+1}return o}getCssClasses(){return this.textType&&this.textType.cssClass||""}getExtraStyleProperties(t){return t.baseTextStyle||{}}static escapeForTspan(t){return String(t).replace(/[&<>]/g,function(t){return Zt[t]})}draw(t){var e=t.canvasCtxt;"middle"===this.textAnchor?e.textAlign="center":e.textAlign="start";for(var s=0,i=0,n=this.getExtraStyleProperties(t),a=null,r=0;r<this.spans.length;r++){var o=this.spans[r],h=o.xOffset||0,l=Object.assign({},n,o.mergedProperties);if(o.newLine){let n=this.lineBreakHeight(t,o,l);e.translate(s+h,n),s=-h,i-=n}else h&&(e.translate(s+h,0),s=-h);var u=this.getCanvasFontForProperties(t,l);u!==a&&(e.font=a=u),e.fillStyle=l.fill||"#000",e.fillText(o.text,this.bounds.x,this.bounds.y,o.textLength||void 0);var c=t.measureCanvasText(a,o.text);s-=c.width,e.translate(c.width,0)}e.translate(s,i)}getSvgProps(){return{"source-index":this.sourceIndex,x:this.bounds.x,y:this.bounds.y,class:this.getCssClasses().trim(),"text-anchor":this.textAnchor}}getSpanOptions(t,e,s=!1){var i=t.mergedProperties,n={"source-index":t.index,class:i.class,style:s?t.properties:t.getCss()};if(t.newLine){var r=t.xOffset||0;n.dy=this.lineSpacing(e)*(Xt(t.newLine)||1)+"em",n.x=this.bounds.x+r}else t.xOffset&&(n.x=this.bounds.x+t.xOffset);if(t.textLength&&(n.textLength=t.textLength,n.lengthAdjust="spacingAndGlyphs",n.y=this.bounds.y),this.resize&&(n["font-size"]=this.fontSizeForProperties(e,i),i["font-size"])){const e=t.properties;delete e["font-size"],n.style=s?e:a(e)}return n}createSvgNodeToMeasure(t,e,s){const i=e.mergedProperties,n=this.getExtraStyleProperties(t);let r=this.getCssClasses().trim();n.class&&(r=n.class+" "+r);let o=i;this.resize&&i["font-size"]&&(o=Object.assign({},i),delete o["font-size"]);const h=Wt.createNode("tspan",{class:i.class,style:a(o),"font-size":this.resize?this.fontSizeForProperties(t,i):void 0},s);return Wt.createNode("text",{class:r,style:a(n)},h)}createSvgNode(t){for(var e=[],s=0;s<this.spans.length;s++){let i=this.spans[s],n=this.getSpanOptions(i,t);e.push(Wt.createNode("tspan",n,i.text))}let i=this.getSvgProps();const n=this.getExtraStyleProperties(t);return i.style=a(n),n.class&&(i.class=n.class+" "+i.class),i.source=this,this.svgNode=Wt.createNode("text",i,e)}createSvgTree(t){for(var e=[],s=0;s<this.spans.length;s++){let i=this.spans[s],n=this.getSpanOptions(i,t,!0);e.push(Wt.createSvgTree("tspan",n,i.text))}let i=this.getSvgProps();return i.style=this.getExtraStyleProperties(t),i.style.class&&(i.class=i.style.class+" "+i.class),i.source=this,Wt.createSvgTree("text",i,...e)}createSvgFragment(t){for(var e="",s=0;s<this.spans.length;s++){let i=this.spans[s],n=this.getSpanOptions(i,t);e+=Wt.createFragment("tspan",n,TextElement.escapeForTspan(i.text))}let i=this.getSvgProps();const n=this.getExtraStyleProperties(t);return i.style=a(n),n.class&&(i.class=n.class+" "+i.class),t.setFontFamilyAttributes&&(i["font-size"]=this.fontSize(t)),Wt.createFragment("text",i,e)}}const ie={SingleSyllable:0,BeginningSyllable:1,MiddleSyllable:2,EndingSyllable:3,Directive:4},ne={getLeft:function(t){if(0===t.length)return NaN;for(var e=Number.MAX_VALUE,s=0;s<t.length;s++)t[s]&&(e=Math.min(e,t[s].getLeft()));return e},getRight:function(t,e,s){if(0===t.length)return NaN;for(var i=-1/0,n=0;n<t.length;n++){let a=t[n];a&&(i=Math.max(i,a.notation.bounds.x+a.bounds.x+a.bounds.width+(e&&a.allowsConnector()&&!a.preventConnector&&!a.needsConnector?a.getConnectorWidth():0)-(s&&a.protrusionWidth||0)))}return i},hasOnlyOneLyric:function(t){return 1===t.filter(t=>t.originalText).length},indexOfLyric:function(t){return t.indexOf(t.filter(t=>t.originalText)[0])},mergeIn:function(t,e){for(var s=0;s<e.length;++s)!e[s].originalText&&t[s]||(t[s]=e[s])},mergeInArray:function(t,e){for(var s=0;s<e.length;++s)this.mergeIn(t,e[s].lyrics)},alignVerseNumbers:function(t,e){if(e.some(t=>t.shownVerseNumber)){var s=e.filter(t=>t.shownVerseNumber),i=Math.min(...e.filter(t=>t.text||t.shownVerseNumber).map(t=>t.bounds.x))-t.minLyricWordSpacing;for(let t of s)t.verseNumberX=i-t.shownVerseNumber.bounds.width-t.bounds.x}},setNotation:function(t,e){e.lyrics=t;for(var s=0;s<t.length;++s)t[s].notation=e}};class Lyric extends TextElement{constructor(t,e,s,i,n,a,r="",o=!0){super(t,(t.textStyles.lyric.prefix||"")+r+e,t=>t.textStyles.lyric.font,t=>t.textStyles.lyric.size,"start",a,e,Nt.lyric,!1),this.verseNumberX=0,this.originalText=e,r&&(this.openStyles=r,this.shiftSpansPastOpenStyles()),this.notation=i,this.notations=n,this.lyricType=null==s||""===s?ie.SingleSyllable:s,this.centerStartIndex=-1,this.centerLength=e.length,this.needsConnector=!1,this.preventConnector=!1,this.language=null,this.allowsConnector()&&(this.connectorSpan=new TextSpan(t.syllableConnector)),o&&this.recalculateMetrics(t)}allowsConnector(){return this.lyricType===ie.BeginningSyllable||this.lyricType===ie.MiddleSyllable}setForceConnector(t){this.forceConnector=t&&this.allowsConnector()}setPreventConnector(t){this.preventConnector=t&&this.allowsConnector()}setNeedsConnector(t,e){if(!0!==t&&!this.forceConnector||this.preventConnector){this.clearConnectorWidth(),this.needsConnector=!1,this.bounds.width=this.widthWithoutConnector;var s=this.spans.pop();s&&s!==this.connectorSpan&&this.spans.push(s)}else this.needsConnector=!0,void 0!==e?this.setConnectorWidth(e):this.bounds.width=this.widthWithoutConnector+this.getConnectorWidth(),this.spans.length>0&&this.spans[this.spans.length-1]!==this.connectorSpan&&this.spans.push(this.connectorSpan)}setConnectorWidth(t){this.connectorWidth=t,this.connectorSpan.textLength=t,this.needsConnector&&(this.bounds.width=this.widthWithoutConnector+this.getConnectorWidth())}clearConnectorWidth(){this.connectorWidth=0,this.connectorSpan&&this.connectorSpan.textLength&&(this.connectorSpan.textLength=0)}resetConnector(){var t=!!this.forceConnector&&!this.preventConnector;if(this.needsConnector!==t||this.connectorWidth||this.bounds.width!==this.widthWithoutConnector){var e=this.spans[this.spans.length-1];this.needsConnector=t,this.needsConnector?e&&e!==this.connectorSpan&&this.spans.push(this.connectorSpan):e&&e===this.connectorSpan&&this.spans.pop(),this.clearConnectorWidth(),this.bounds.width=this.widthWithoutConnector}}getConnectorWidth(){return this.connectorWidth||this.defaultConnectorWidth}getLeft(){return this.notation.bounds.x+this.leftOffset()}leftOffset(){return this.bounds.x+(this.shownVerseNumber?Math.min(0,this.verseNumberX):0)}get shownVerseNumber(){return(this.dropCap?void 0:this.verseNumber)||this.repeatedVerseNumber}getRepeatedVerseNumber(t){return this.verseNumberInEffect&&!this.verseNumberCopy&&(this.verseNumberCopy=this.verseNumberInEffect.copy(t)),this.verseNumberCopy}placeVerseNumber(){var t=this.shownVerseNumber;return t&&(t.bounds.x=this.bounds.x+this.verseNumberX,t.bounds.y=this.bounds.y),t}getRight(){return this.notation.bounds.x+this.bounds.x+this.bounds.width}recalculateMetrics(t,e=!0){this.setNeedsConnector(),super.recalculateMetrics(t,e),this.verseNumber&&this.verseNumber.recalculateMetrics(t),this.verseNumberCopy&&this.verseNumberCopy.recalculateMetrics(t),this.widthWithoutConnector=this.bounds.width,this.clearConnectorWidth(),this.defaultConnectorWidth=t.hyphenWidth;var s,i,n=this.language||t.defaultLanguage,a=this.widthWithoutConnector/2,r=this.widthWithoutConnector,o=t.textMeasuringStrategy===Qt.Svg?t.svgTextMeasurer.firstChild:null,h=this.getLines(),l=t=>h.reduce((e,s)=>s.textStart<=t?s:e),u=(e,s)=>e.xOffset+(s<=e.start?0:o?o.getSubStringLength(e.start,s-e.start):this.measureSubstring(t,s,!1,!0)),c=(t,e)=>{let s=l(t),i=Math.min(s.end,s.start+t-s.textStart);return[u(s,i),u(s,Math.min(s.end,i+e))]};if(this.centerStartIndex>=0&&(this.centerStartIndex>=this.text.length||this.centerLength<0||this.centerStartIndex+this.centerLength>this.text.length)&&(this.centerStartIndex=-1),0===this.text.length)this.dropCap&&this.originalText&&(a=t.hyphenWidth/2,r=t.hyphenWidth);else if(this.centerStartIndex>=0)[s,i]=c(this.centerStartIndex,this.centerLength),a=(s+i)/2,r=i-s;else if(this.lyricType!==ie.Directive){var d=this.text.lastIndexOf(" ")+1;d>0&&!this.text.slice(d).match(/[a-záéíóúýäëïöüÿàèìòùỳāēīōūȳăĕĭŏŭ]/i)&&(d=0);var f=d,g=[];let e=0;for(var p of this.spans){let t=e+p.text.length;p.activeTags.includes("e")&&t>d&&(e<=d?d=t:g.push({index:e,endIndex:t})),e=t}var m=g.map(t=>({index:t.index-d,endIndex:t.endIndex-d})),x="syllable"===t.lyricCentering?{found:!0,startIndex:0,length:this.text.length}:"firstletter"===t.lyricCentering?{found:!0,startIndex:0,length:Array.from(this.text)[0].length}:n.findVowelSegment(this.text,d,m);if(!0!==x.found){d=f;var y=this.text.slice(d).match(/[a-z]+/i);y?(x.startIndex=d+y.index,x.length=y[0].length):(x.startIndex=d,x.length=this.text.length-d)}[s,i]=c(x.startIndex,x.length),a=(s+i)/2,r=i-s}this.vowelSegmentWidth=r,this.protrusionWidth=0;let v=this.protrusion?Math.max(0,this.protrusion.textIndex-(this.dropCap?1:0)):0;if(this.protrusion&&v<this.text.length&&(!this.allowsConnector()||this.preventConnector)){let e=this.protrusion.factor;void 0===e&&(e=t.defaultProtrusionFactor);let s=l(v),i=Math.max(c(v,0)[0],...h.slice(0,h.indexOf(s)).map(t=>u(t,t.end)))-Math.min(...h.map(t=>t.xOffset));this.protrusionWidth=Math.max(0,Math.min(1,e))*(this.widthWithoutConnector-i)}this.bounds.x=-a,this.bounds.y=0,this.origin.x=a}generateDropCap(t){if(this.dropCap)return this.dropCap;if(this.unwrap(),this.spans[0].mergedProperties["font-family"]===t.specialCharProperties["font-family"])return null;let e=this.spans[0].clone();e.text=e.text.slice(0,1).toUpperCase();let s=e.text.toLowerCase();if(e.text===s)return null;e.activeTags.indexOf("sc")>=0&&(e.text=s);var i=this.dropCap=new DropCap(t,"",this.sourceIndex);i.spans=[e];let n=this.sourceGabc.match(/^(?:<\/?[^>]+>)*.?(?:<\/[^>]+>)*/)[0].length;return i.sourceGabc=this.sourceGabc.slice(0,n),this.sourceIndex+=i.sourceGabc.length,this.sourceGabc=this.sourceGabc.slice(n),this.spans[0].text=this.spans[0].text.slice(1),this.text=this.text.slice(1),this.centerStartIndex--,i}removeDropCap(t){this.dropCap&&(this.setFirstWordStyles(t,null),this.sourceIndex-=this.dropCap.sourceGabc.length,this.sourceGabc=this.dropCap.sourceGabc+this.sourceGabc,this.centerStartIndex++,this.dropCap=null,this.generateLyricSpans(t))}generateLyricSpans(t){this.generateSpansFromText(t,(t.textStyles.lyric.prefix||"")+(this.openStyles||"")+this.originalText),this.shiftSpansPastOpenStyles()}shiftSpansPastOpenStyles(){let t=(this.openStyles||"").length;if(t)for(let e of this.spans)e.index=Math.max(0,e.index-t)}setFirstWordStyles(t,e){const s=t=>!!t&&Object.keys(t).length>0;let i=[],n=null;e&&(i=[t.firstWordStyle],"syllable"===e&&(i.push(t.firstSyllableStyle),n=t.firstSyllableInitialStyle),i=i.filter(s),n&&!s(n)&&(n=null));const a=this.firstWordStyles||[];if(a.length===i.length+1&&i.every((t,e)=>a[e]===t)&&a[i.length]===n)return!1;if(!a.length&&!i.length&&!n)return!1;if(a.length){const e=this.dropCap;this.dropCap=null,this.generateLyricSpans(t),this.dropCap=e,this.dropCap&&(this.spans[0].text=this.spans[0].text.slice(1),this.text=this.text.slice(1))}if(this.firstWordStyles=i.length||n?[...i,n]:void 0,!this.firstWordStyles)return!0;this.unwrap();let r=[];for(let t of this.spans){if(t===this.connectorSpan)continue;let e=[...i,...t.propertyArray];if(n&&t.text){const e=Array.from(t.text)[0],s=t.clone();if(s.text=e,s.propertyArray=[...i,n,...t.propertyArray],r.push(s),n=null,t.text.length===e.length)continue;t=t.clone(),t.text=t.text.slice(e.length),t.index+=e.length,delete t.newLine,delete t.wrappedSpace}else t=t.clone();t.propertyArray=e,r.push(t)}return this.spans=r,!0}getCssClasses(){return(this.lyricType===ie.Directive?"directive ":"")+super.getCssClasses()}getExtraStyleProperties(t){var e=super.getExtraStyleProperties(t);return this.lyricType===ie.Directive&&!0===t.autoColor&&(e=Object.assign({},e,{fill:t.rubricColor})),e}}class VerseNumber extends TextElement{constructor(t,e,s){super(t,(t.textStyles.lyric.prefix||"")+e,t=>t.textStyles.lyric.font,t=>t.textStyles.lyric.size,"start",s,e,Nt.lyric),this.gabcText=e}copy(t,e){return new VerseNumber(t,this.gabcText,e)}getCssClasses(){return"verseNumber "+super.getCssClasses()}}class ChoralSign extends TextElement{constructor(t,e,s,i){super(t,(t.textStyles.choralSign.prefix||"")+e,t=>t.textStyles.choralSign.font,Nt.choralSign.size,"start",i,e,Nt.choralSign),this.positionHint=Pt.Default,this.note=s}recalculateMetrics(t){super.recalculateMetrics(t)}performLayout(t){this.recalculateMetrics(t),this.bounds.x=this.note.bounds.x+Math.max(0,(t.staffInterval-this.bounds.width)/2),this.bounds.y=t.calculateHeightFromStaffPosition(ae(this.note,this.positionHint))+this.origin.y}}function ae(t,e){let s,i;return e===Pt.Below?(s=-1,i=t.staffPosition+2*s,i+=i%2==0?.3:1):(s=1,i=t.staffPosition+2*s,i+=i%2==0?.3:-.4),i}class NabcChoralSign extends ChantLayoutElement{constructor(t,e,s){super(),this.nabc=t,this.items=at(t),this.note=e,this.sourceIndex=s,this.positionHint=Pt.Default}performLayout(t){let e=t.nabcFonts[0],s=this.neumes=e?new NabcNeumes(t,this.items,0,e):void 0;s?(s.moveBy(this.note.bounds.x+Math.max(0,(t.staffInterval-s.bounds.width)/2)-s.bounds.x),s.setBaseline(t.calculateHeightFromStaffPosition(ae(this.note,this.positionHint))),this.bounds=s.bounds.clone()):this.bounds=new Rect}draw(t){this.neumes&&this.neumes.draw(t)}createSvgNode(t){return this.neumes?this.neumes.createSvgNode(t):Wt.createNode("g",{})}createSvgTree(t){return this.neumes?this.neumes.createSvgTree(t):Wt.createSvgTree("g",{})}createSvgFragment(t){return this.neumes?this.neumes.createSvgFragment(t):""}}class AboveLinesText extends TextElement{constructor(t,e,s,i){super(t,(t.textStyles.al.prefix||"")+e,t=>t.textStyles.al.font,t=>t.textStyles.al.size,"start",i,e,Nt.al),this.notation=s,this.padding=t.staffInterval/2}}class TranslationText extends TextElement{constructor(t,e,s,i){var n=e,a="start";"/"===e?(e="",a="end"):e=(t.textStyles.translation.prefix||"")+e,super(t,e,t=>t.textStyles.translation.font,t=>t.textStyles.translation.size,a,i,n,Nt.translation),this.notation=s,this.padding=t.staffInterval/2}}class DropCap extends TextElement{constructor(t,e,s){super(t,(t.textStyles.dropCap.prefix||"")+e,t=>t.textStyles.dropCap.font,t=>t.textStyles.dropCap.size,"middle",s,e,Nt.dropCap),this.fontSize=t=>this.sizeForLines||t.textStyles.dropCap.size,this.padding=t.staffInterval*t.textStyles.dropCap.padding}measureAtSize(t,e){e?this.sizeForLines=e:delete this.sizeForLines,this.recalculateMetrics(t)}fitBoundsToLetter(t){var e=t.textMeasuringStrategy,s=this.spans[0];if(s&&(e===Qt.Svg||e===Qt.Canvas)){e===Qt.Svg&&"undefined"!=typeof TextMetrics&&"actualBoundingBoxAscent"in TextMetrics.prototype&&t.makeCanvasIfNeeded();var i=t.canvasCtxt&&t.measureCanvasText(this.getCanvasFontForProperties(t,s.mergedProperties),s.text);if(i&&"actualBoundingBoxAscent"in i){if(e===Qt.Canvas)return;this.origin.y=i.actualBoundingBoxAscent,this.bounds.height=i.actualBoundingBoxAscent+i.actualBoundingBoxDescent}else this.origin.y=this.bounds.height=.7*this.fontSize(t)}}getExtraStyleProperties(t){var e=super.getExtraStyleProperties(t);return this.sizeForLines?Object.assign({},e,{"font-size":this.sizeForLines+"px"}):e}}class TitleTextElement extends TextElement{constructor(t,e,s,i,n,a,r,o,h=!0){super(t,e,s,i,n,a,r,o,h)}}class CenteredTitle extends TitleTextElement{constructor(t,e,s,i){super(t,(t.textStyles[s].prefix||"")+e,t=>t.textStyles[s].font,t=>t.textStyles[s].size,"middle",i,e,Nt[s]),this.padding=t=>(Number(t.textStyles[s].padding)||1)*t.textStyles[s].size/3}}class Supertitle extends CenteredTitle{constructor(t,e,s){super(t,e,"supertitle",s)}}class Title extends CenteredTitle{constructor(t,e,s){super(t,e,"title",s)}}class Subtitle extends CenteredTitle{constructor(t,e,s){super(t,e,"subtitle",s)}}class TextLeftRight extends TitleTextElement{constructor(t,e,s,i){super(t,(t.textStyles.leftRight.prefix||"")+e,t=>t.textStyles.leftRight.font,t=>t.textStyles.leftRight.size,"textLeft"===s?"start":"end",i,e,Nt.leftRight,!1),this.extraClass="textLeft"===s?"textLeft":"textRight",this.headerKey="textLeft"===s?"text-left":"text-right",this.padding=t=>(Number(t.textStyles.leftRight.padding)||1)*t.textStyles.leftRight.size/5,this.recalculateMetrics(t)}getCssClasses(){return this.extraClass+" "+super.getCssClasses()}}class Annotation extends TextElement{constructor(t,e,s){super(t,(t.textStyles.annotation.prefix||"")+e,t=>t.textStyles.annotation.font,t=>t.textStyles.annotation.size,"middle",void 0,e,Nt.annotation),"number"==typeof s&&(this.elementIndex=s),this.padding=t.staffInterval*t.textStyles.annotation.padding,this.dominantBaseline="hanging"}}class Annotations extends ChantLayoutElement{constructor(t,...e){super(),this.annotations=e.map(function(e,s){return new Annotation(t,e,s)}),this.padding=Math.max.apply(null,this.annotations.map(function(t){return t.padding}))}updateBounds(t){t||(t=1);for(var e=0;e<this.annotations.length;++e){var s=this.annotations[e];s.bounds.x+=this.bounds.x*t,s.bounds.y+=this.bounds.y*t}}recalculateMetrics(t){this.bounds.x=0,this.bounds.y=0,this.bounds.width=0,this.bounds.height=0,this.origin.x=0,this.origin.y=0;let e=0;for(var s=0;s<this.annotations.length;++s){var i=this.annotations[s];i.recalculateMetrics(t),this.bounds.width=Math.max(this.bounds.width,i.bounds.width),i.bounds.y+=e,this.bounds.height=i.bounds.bottom(),this.origin.y=this.origin.y||i.origin.y,i.spans.forEach(s=>{s.newLine&&(e+=i.lineBreakHeight(t,s))}),e+=i.fontSize(t)*(i.resize||1)*(this.lineHeight||i.lineSpacing(t))}}draw(t){this.updateBounds(),this.annotations.forEach(function(e){e.draw(t)}),this.updateBounds(-1)}createSvgNode(t){this.updateBounds();var e=this.annotations.map(function(e){return e.createSvgNode(t)});return this.updateBounds(-1),e}createSvgTree(t){this.updateBounds();var e=this.annotations.map(function(e){return e.createSvgTree(t)});return this.updateBounds(-1),{children:e}}createSvgFragment(t){this.updateBounds();var e=this.annotations.map(function(e){return e.createSvgFragment(t)}).join("");return this.updateBounds(-1),e}}let re=0;const oe=()=>++re;class ChantNotationElement extends ChantLayoutElement{get parsedNabc(){let t=this.nabc;if(!t)return;let e=this.readNabc;return e&&e.nabc.length===t.length&&!e.nabc.some((e,s)=>e!==t[s])||(e=this.readNabc={nabc:t.slice(),items:t.map(at)}),e.items}constructor(){super(),this.leadingSpace=0,this.trailingSpace=Bt,this.keepWithNext=!1,this.needsLayout=!0,this.lyrics=[],this.score=null,this.line=null,this.visualizers=[]}hasLyrics(){return 0!==this.lyrics.length}getAllLyricsLeft(){if(0===this.lyrics.length)return this.bounds.right();for(var t=Number.MAX_VALUE,e=0;e<this.lyrics.length;e++)this.lyrics[e]&&(t=Math.min(t,this.lyrics[e].leftOffset()));return this.bounds.x+t}getAllLyricsRight(){if(0===this.lyrics.length)return this.bounds.x;for(var t=-1/0,e=0;e<this.lyrics.length;e++)this.lyrics[e]&&(t=Math.max(t,this.lyrics[e].bounds.x+this.lyrics[e].bounds.width));return this.bounds.x+t}addVisualizer(t){t.ignoreBounds||(this.bounds.isEmpty()?this.bounds=t.bounds.clone():this.bounds.union(t.bounds)),this.visualizers.push(t)}prependVisualizer(t){this.bounds.isEmpty()?this.bounds=t.bounds.clone():this.bounds.union(t.bounds),this.visualizers.unshift(t)}performLayout(t){this.layoutId=oe(),"function"==typeof this.trailingSpace?this.calculatedTrailingSpace=this.trailingSpace(t):this.calculatedTrailingSpace=this.trailingSpace,this.visualizers=[],this.bounds=new Rect(1/0,1/0,-1/0,-1/0);for(var e=0;e<this.lyrics.length;e++)this.lyrics[e].recalculateMetrics(t);if(this.alText)for(e=0;e<this.alText.length;e++)this.alText[e].recalculateMetrics(t);if(this.translationText)for(e=0;e<this.translationText.length;e++)this.translationText[e].recalculateMetrics(t);let s=this.parsedNabc;this.nabcNeumes=s&&t.nabcFonts.length?s.slice(0,2).map((e,s)=>{let i=t.nabcVisibility[s]||"visible";if(!e.length||"invisible"===i)return;let n=t.nabcFonts[s]||t.nabcFonts[0];return new NabcNeumes(t,e,s,n,"phantom"===i)}):void 0,this.nabcNeumes&&!this.nabcNeumes.some(t=>t)&&(this.nabcNeumes=void 0)}resetDependencies(){}finishLayout(t){this.bounds.x=0,this.layoutTrailingSpace=this.calculatedTrailingSpace,this.alignLyrics(t),this.needsLayout=!1}alignLyrics(t){let e=(this.lyrics[0]&&this.lyrics[0].language||t.defaultLanguage).centerNeume?e=>e.bounds.x=this.bounds.width+t.staffInterval<e.vowelSegmentWidth?this.bounds.width/2-e.origin.x:this.origin.x-e.origin.x:t=>t.bounds.x=this.origin.x-t.origin.x;this.lyrics.forEach(e),ne.alignVerseNumbers(t,this.lyrics)}draw(t){var e=t.canvasCtxt;e.translate(this.bounds.x,0);for(var s=0;s<this.visualizers.length;s++)this.visualizers[s].draw(t);for(s=0;s<this.lyrics.length;s++){let e=this.lyrics[s].placeVerseNumber();e&&e.draw(t),this.lyrics[s].draw(t)}if(this.translationText)for(s=0;s<this.translationText.length;s++)this.translationText[s].draw(t);if(this.alText)for(s=0;s<this.alText.length;s++)this.alText[s].draw(t);if(this.nabcNeumes)for(let e of this.nabcNeumes)e&&e.draw(t);e.translate(-this.bounds.x,0)}getInnerSvgNodes(t,e="createSvgNode"){var s=[];for(i=0;i<this.lyrics.length;i++){let n=this.lyrics[i].placeVerseNumber();n&&s.push(n[e](t)),s.push(this.lyrics[i][e](t))}if(this.translationText)for(i=0;i<this.translationText.length;i++)s.push(this.translationText[i][e](t));if(this.alText)for(i=0;i<this.alText.length;i++)s.push(this.alText[i][e](t));if(this.nabcNeumes)for(let i of this.nabcNeumes)i&&!i.phantom&&s.push(i[e](t));if(this.visualizers.length){let n=[];for(var i=0;i<this.visualizers.length;i++)n.push(this.visualizers[i][e](t,this));"createSvgTree"===e?s.push(Wt.createSvgTree("g",{class:"Notations"},...n)):s.push(Wt.createNode("g",{class:"Notations"},n))}return s}getSvgProps(){return{class:"ChantNotationElement "+(this.cssClass||this.constructor.name),transform:"translate("+this.bounds.x+",0)"}}createSvgNode(t){var e=this.getInnerSvgNodes(t,"createSvgNode"),s=this.getSvgProps();return s.source=this,Wt.createNode("g",s,e)}createSvgTree(t){var e=this.getInnerSvgNodes(t,"createSvgTree"),s=this.getSvgProps();return s.source=this,Wt.createSvgTree("g",s,...e)}createSvgFragment(t){var e="";for(s=0;s<this.lyrics.length;s++){let i=this.lyrics[s].placeVerseNumber();i&&(e+=i.createSvgFragment(t)),e+=this.lyrics[s].createSvgFragment(t)}if(this.translationText)for(s=0;s<this.translationText.length;s++)e+=this.translationText[s].createSvgFragment(t);if(this.alText)for(s=0;s<this.alText.length;s++)e+=this.alText[s].createSvgFragment(t);if(this.nabcNeumes)for(let s of this.nabcNeumes)s&&!s.phantom&&(e+=s.createSvgFragment(t));if(this.visualizers.length){let i="";for(var s=0;s<this.visualizers.length;s++)i+=this.visualizers[s].createSvgFragment(t,this);e+=Wt.createFragment("g",{class:"Notations"},i)}return Wt.createFragment("g",this.getSvgProps(),e)}}const he=new TextSpan(" • "),le=(...t)=>t.reduce((t,e)=>t&&t.length?e&&e.length?t.concat(he,e):t:e&&e.length?e:[]);function ue(t){return t in Dt}class Accent extends GlyphVisualizer{constructor(t,e,s=kt.AcuteAccent){super(t,s),this.note=e,this.positionHint=Pt.Above}performLayout(t){this.bounds.x=this.note.bounds.x+this.bounds.width/2,this.setStaffPosition(t,Math.max(this.note.staffPosition+1,2*t.staffLineCount))}}class MusicaFicta extends Accent{constructor(t,e,s){super(t,e,s),this.scale=.75,this.setGlyph(t,s)}performLayout(t){this.bounds.x=this.note.bounds.x+(this.note.bounds.width-this.bounds.width)/2,this.bounds.y=t.calculateHeightFromStaffPosition(Math.max(this.note.staffPosition+1,2*t.staffLineCount))-this.bounds.height}}const ce={Default:0,Left:1,Center:2,Right:3},de={m:.057,ol:-.285,oh:.257,ul:-.252,uh:.32};class HorizontalEpisema extends SvgShape{constructor(t){super(),this.note=t,this.positionHint=Pt.Default,this.terminating=!1,this.alignment=ce.Default}performLayout(t){var e,s=0,i=.25*t.staffInterval,n=this.note.glyphVisualizer.glyphCode,a=e=>Math.abs(e)===t.staffLineCount+1&&this.supposesLedgerLine(t,e<0),r=!1;if(ue(n)){let t=this.note.neume.notes,e=t.indexOf(this.note),s=t[e-1];s&&ue(s.glyphVisualizer.glyphCode)&&s.staffPosition-this.note.staffPosition===1&&(r=!0)}const o=t.staffLineCount%2||0,h=(o+1)%2;this.positionHint===Pt.Below?(s=this.note.bounds.bottom()+i,s+=t.staffLineCount*t.staffInterval,n===kt.None&&(s+=t.staffInterval/2),e=Math.ceil(s/t.staffInterval),Math.abs(e%2)===o?e=(e+3/4+(s-i)/t.staffInterval)/2:(e=(2*Math.ceil(1.5*s/t.staffInterval-.5)+h)/3,Math.abs(e)%2===h&&(Math.abs(e)<t.staffLineCount||a(e)?e+=2/3:e+=1/3))):(s=this.note.bounds.y-i,s+=t.staffLineCount*t.staffInterval,e=Math.floor(s/t.staffInterval),Math.abs(e%2)===o?e=(e-3/4+(s+i)/t.staffInterval)/2:(e=(2*Math.floor(1.5*s/t.staffInterval-.5)+h)/3,Math.abs(e)%2===h&&(Math.abs(e)<t.staffLineCount||a(e)?e-=2/3:e-=1/3))),s=(e-t.staffLineCount)*t.staffInterval;var l=this.note.bounds.width,u=this.note.bounds.x;this.note.glyphVisualizer.porrectusNoteDiff?l=t.glyphPunctumWidth*t.glyphScaling:n===kt.None?u-=l=t.glyphPunctumWidth*t.glyphScaling:r?u+=.5*(l*=2/3):n!==kt.PunctumInclinatumLiquescent&&n!==kt.PunctumInclinatumLiquescentCavum||(u+=.25*(l*=2/3)),this.alignment===ce.Left?l*=.8:this.alignment===ce.Center?(u+=.1*l,l*=.8):this.alignment===ce.Right&&(u+=.2*l,l*=.8),s=this.tunedY(t,s),this.bounds.x=u,this.bounds.y=s-t.episemaLineWeight/2,this.bounds.width=l,this.bounds.height=t.episemaLineWeight,this.layoutBounds=this.bounds.clone(),this.origin.x=0,this.origin.y=0}supposesLedgerLine(e,s){if(!e.ledgerLineHeuristic)return!0;var i=s?"above":"below",n=this.note.ledgerLineState&&this.note.ledgerLineState[i];if(!n)return!1;if(n.line||n.specificity!==t.LedgerLineSpecificity.Supposed)return n.line;var a=fe(e,s),r=s?Pt.Above:Pt.Below,o=this.note.neume.notes,h=t=>t>0&&!!o[t].glyphVisualizer&&"right"===o[t].glyphVisualizer.align&&o[t].staffPosition>o[t-1].staffPosition,l=t=>t<o.length-1&&h(t+1),u=t=>o[t].episemata.some(t=>(t.positionHint||Pt.Above)===r),c=t=>u(t)||(s?l(t):h(t)),d=o.indexOf(this.note),f=d;if(d<0||!u(d))return!1;for(;d>0&&c(d-1);)d--;for(;f<o.length-1&&c(f+1);)f++;for(;!u(d);)d++;for(;!u(f);)f--;for(let t=d;t<=f;t++)if(V(o[t].staffPosition,a,s))return!0;for(var g=[],p=e.notations||[],m=this.note.neume,x=p[m.notationIndex]===m?m.notationIndex:p.indexOf(m),y=x,v=x+1;y>0&&!p[y].firstOfParentheses;)y--;for(;v<p.length&&!p[v].firstOfParentheses;)v++;for(let t of p.slice(y,v))t.isAccidental?g.push(t):t.isNeume&&g.push(...t.notes);var b=t=>!!t&&!!t.ledgerLineState&&t.ledgerLineState[i].line,L=g.indexOf(o[d])-1,S=g.indexOf(o[f])+1;return b(g[L])||h(d)&&b(g[L-1])||b(g[S])||l(f)&&b(g[S+1])}tunedY(t,e){var s=this.positionHint!==Pt.Below,i=this.note.episemaTuning&&this.note.episemaTuning[s?"above":"below"];if(!i)return e;if(i.position){let n=s?Math.floor(this.note.staffPosition)+1:Math.ceil(this.note.staffPosition)-1;Math.abs(n)%2==1&&(n>0&&n<2*t.staffLineCount||n===fe(t,s)&&this.supposesLedgerLine(t,s))&&(n+=s?1:-1);let a=i.position;"l"!==a&&"h"!==a||(a=(s?"o":"u")+a),e=t.calculateHeightFromStaffPosition(n+de[a])}return i.nudge&&(e-=i.nudge*t.staffInterval),e}draw(t){var e=t.canvasCtxt;e.fillStyle=t.neumeLineColor,e.fillRect(this.bounds.x,this.bounds.y,this.bounds.width,this.bounds.height)}getSvgProps(t){return{x:this.bounds.x,y:this.bounds.y,width:this.bounds.width,height:this.bounds.height,fill:t.neumeLineColor,class:"horizontalEpisema"}}get svgTag(){return"rect"}}class Ictus extends GlyphVisualizer{constructor(t,e){super(t,kt.VerticalEpisemaAbove),this.note=e,this.positionHint=Pt.Default}performLayout(t){var e,s=this.note.glyphVisualizer.glyphCode,i=this.positionHint||Pt.Below,n=this.note.staffPosition+(i===Pt.Above?1:-1),a=this.note.episemata.length>0&&(this.note.episemata[0].positionHint||Pt.Above)===i,r=1,o=0,h=n%2&&(Math.abs(t.convertStaffPositionToSymmetric(n))<t.staffLineCount||this.note.neume.ledgerLines.some(t=>t.staffPosition===n));this.note.glyphVisualizer.porrectusNoteDiff?e=t.glyphPunctumWidth*t.glyphScaling/2:s===kt.None?e=-t.glyphPunctumWidth*t.glyphScaling/2:(e=this.note.bounds.width/2,!ue(s)||h||a?i!==Pt.Below||s!==kt.StrophaLiquescent&&s!==kt.StrophaLiquescentCavum||(o=.2):o=.3),this.positionHint===Pt.Above?(s=kt.VerticalEpisemaAbove,r*=-1):s=kt.VerticalEpisemaBelow,a&&(o=.4),r*=t.staffInterval*(o+(h?.3:-.2)),this.setGlyph(t,s),this.setStaffPosition(t,n),this.bounds.x=this.note.bounds.x+e-this.origin.x,this.bounds.y+=r}}class Mora extends GlyphVisualizer{constructor(t,e){super(t,kt.Mora),this.note=e,this.positionHint=Pt.Default,this.horizontalOffset=t.staffInterval/2+this.origin.x}performLayout(t){this.setGlyph(t,this.glyphCode),this.horizontalOffset=t.staffInterval/2+this.origin.x;var e=this.note.staffPosition;this.setStaffPosition(t,e);var s,i=0,n=this.note.neume.notes.indexOf(this.note);if(n>=0)if(++n,this.note.neume.notes.length>n)(s=this.note.neume.notes[n]).morae&&s.morae.length&&this.note.neume.notes.length===n+1?this.horizontalOffset+=s.bounds.right()-this.note.bounds.right():s.bounds.right()>this.note.bounds.right()?this.horizontalOffset=(s.bounds.right()-this.note.bounds.right()-this.bounds.right())/2:s=null;else if(this.note.neume.notes.length===n)if(0===this.note.neume.trailingSpace){var a=this.note.neume.score.notations,r=a[t.currNotationIndex]===this.note.neume?t.currNotationIndex:a.indexOf(this.note.neume);if(r>=0){var o=a[r+1];o&&o.notes&&(s=o.notes[0])}}else this.note.shape!==cn.Inclinatum&&(this.note.neume.calculatedTrailingSpace+=this.origin.x);this.positionHint===Pt.Above?i-=e%2==0?1.75*t.staffInterval:.75*t.staffInterval:this.positionHint===Pt.Below?i+=e%2==0?1.75*t.staffInterval:.75*t.staffInterval:e%2==0?s&&s.staffPosition===e-1&&(i-=.25*t.staffInterval):i-=.75*t.staffInterval,this.bounds.x=this.horizontalOffset+this.note.bounds.right(),this.bounds.y+=i}}class NoteBracket extends SvgShape{constructor(t,e,s,i){super(),this.isRight=e,this.lineWeight=t.neumeLineWeight;let n=Math.round(s),a=Math.round(i),r=t=>Math.abs(t)%2==1,o=t=>t<=0,h=e=>e>=2*t.staffLineCount,l=1.556;o(n)||r(n)?(h(a)||r(a))&&(l=1.056):h(a)||r(a)||(l=2.056);let u=r(n)&&!o(n)&&!h(n)||o(n)?.209:-.279,c=t.calculateHeightFromStaffPosition(a+l+u),d=t.calculateHeightFromStaffPosition(n-1.444+u);this.bounds.x=0,this.bounds.y=c,this.bounds.width=83/157.5*t.staffInterval,this.bounds.height=d-c,this.origin.x=0,this.origin.y=0}getPoints(){let{x:t,y:e,width:s,height:i}=this.bounds,n=this.lineWeight;return[[0,0],[s,0],[s,n],[n,n],[n,i-n],[s,i-n],[s,i],[0,i]].map(([i,n])=>[t+(this.isRight?s-i:i),e+n])}draw(t){var e=t.canvasCtxt,s=this.getPoints();e.fillStyle=t.neumeLineColor,e.beginPath(),e.moveTo(s[0][0],s[0][1]);for(var i=1;i<s.length;i++)e.lineTo(s[i][0],s[i][1]);e.closePath(),e.fill()}getSvgProps(t){return{d:"M "+this.getPoints().map(([t,e])=>t.toFixed(2)+" "+e.toFixed(2)).join(" L ")+" Z",fill:t.neumeLineColor,class:"bracket"}}get svgTag(){return"path"}}function fe(t,e){return e?2*t.staffLineCount+1:-1}class Slur extends SvgShape{constructor(t,e,s,i,n,a){super(),this.isAbove=a,this.start={x:e,y:s},this.end={x:i,y:n};var[r,o]=this.getControlPoints(t,!0),h=[0,1].concat(Slur.cubicTurningPoints(e,r.x,o.x,i),Slur.cubicTurningPoints(s,r.y,o.y,n)).map(e=>this.pointOnOuterCurve(t,e)),l=h.map(t=>t.x),u=h.map(t=>t.y),c=this.getPenWidth(t)/2;this.bounds.x=Math.min(...l),this.bounds.y=Math.min(...u)-c,this.bounds.width=Math.max(...l)-this.bounds.x,this.bounds.height=Math.max(...u)+c-this.bounds.y}static cubicTurningPoints(t,e,s,i){var n,a=3*e-t-3*s+i,r=2*(t-2*e+s),o=e-t;if(Math.abs(a)<1e-9)n=Math.abs(r)<1e-9?[]:[-o/r];else{let t=r*r-4*a*o;if(t<0)return[];let e=Math.sqrt(t);n=[(-r-e)/(2*a),(-r+e)/(2*a)]}return n.filter(t=>t>0&&t<1)}static pointOnNote(t,e,s){return{x:e.neume.bounds.x+e.bounds.right()-[0,1,.5][s.shift]*t.staffInterval,y:t.calculateHeightFromStaffPosition(e.staffPosition+(s.isAbove?.904:-1.375))}}getControlPoints(t,e){var{start:s,end:i}=this,n=Math.hypot(i.x-s.x,i.y-s.y)||1,a=(i.x-s.x)/n,r=(i.y-s.y)/n,o=this.isAbove?1:-1,h=r*o,l=-a*o,u=1e3/157.5*(e?.22:.2)*t.staffInterval;return[.3,.7].map(t=>({x:s.x+t*n*a+u*h,y:s.y+t*n*r+u*l}))}pointOnOuterCurve(t,e){var[s,i]=this.getControlPoints(t,!0),{start:n,end:a}=this,r=(t,s,i,n)=>(1-e)**3*t+3*(1-e)**2*e*s+3*(1-e)*e**2*i+e**3*n;return{x:r(n.x,s.x,i.x,a.x),y:r(n.y,s.y,i.y,a.y)}}draw(t){var e=t.canvasCtxt,[s,i]=this.getControlPoints(t,!1),[n,a]=this.getControlPoints(t,!0),r=e.lineWidth,o=e.lineJoin;e.fillStyle=e.strokeStyle=t.neumeLineColor,e.lineWidth=this.getPenWidth(t),e.lineJoin="round",e.beginPath(),e.moveTo(this.start.x,this.start.y),e.bezierCurveTo(s.x,s.y,i.x,i.y,this.end.x,this.end.y),e.bezierCurveTo(a.x,a.y,n.x,n.y,this.start.x,this.start.y),e.closePath(),e.fill(),e.stroke(),e.lineWidth=r,e.lineJoin=o}getPenWidth(t){return.074*t.staffInterval}getSvgProps(t){var[e,s]=this.getControlPoints(t,!1),[i,n]=this.getControlPoints(t,!0),a=t=>t.x.toFixed(2)+" "+t.y.toFixed(2);return{d:"M "+a(this.start)+" C "+[e,s,this.end].map(a).join(" ")+" C "+[n,i,this.start].map(a).join(" ")+" Z",fill:t.neumeLineColor,stroke:t.neumeLineColor,"stroke-width":this.getPenWidth(t),"stroke-linejoin":"round",class:"slur"}}get svgTag(){return"path"}}const ge={RoundBrace:0,CurlyBrace:1,AccentedCurlyBrace:2},pe={Left:0,Right:1};class BracePoint extends ChantLayoutElement{constructor(t,e,s,i){super(),this.note=t,this.isAbove=e,this.shape=s,this.attachment=i}getAttachmentX(t){return t||(t=this.note),this.attachment===pe.Left?(t.neume?t.neume.bounds.x:0)+t.bounds.x:(t.neume?t.neume.bounds.x:0)+t.bounds.right()}}function me(t,e,s,i=0){var n=s.bounds.y+s.bounds.height/2,a=Math.max(s.bounds.height,1.5*t.staffInterval),r=t.staffInterval/8,[o,h]=[kt.OpenParenthesis,kt.CloseParenthesis].map(e=>{var s=new GlyphVisualizer(t,e);return s.scale=a/(s.glyph.bounds.height*t.glyphScaling),s.setGlyph(t,e),s.bounds.y=n-s.bounds.height/2,s});return o.bounds.x=s.bounds.x+i,s.bounds.x=o.bounds.right()+r-i,h.bounds.x=s.bounds.right()+i+r,e.addVisualizer(o),e.addVisualizer(s),e.addVisualizer(h),{x1:o.bounds.x,x2:h.bounds.right()}}function xe(t,e,s,i=0){var n={x1:s.bounds.x+i,x2:s.bounds.right()+i};e.parenthesized?n=me(t,e,s,i):e.addVisualizer(s),e.high&&(e.ledgerLineExtent=n)}class Custos extends ChantNotationElement{constructor(t=!1){super(),this.auto=t,this.staffPosition=2}performLayout(t){if(super.performLayout(t),this.auto){var e=t.findNextNeume();for(this.staffPosition=e?t.activeClef.pitchToStaffPosition(e.notes[0].pitch):2;this.staffPosition<-2;)this.staffPosition+=7;for(;this.staffPosition>2*t.staffLineCount+2;)this.staffPosition-=7}var s=new GlyphVisualizer(t,Custos.getGlyphCode(this.staffPosition,t.staffLineCount));s.setStaffPosition(t,this.staffPosition),this.addVisualizer(s),this.finishLayout(t)}resetDependencies(){this.auto&&(this.needsLayout=!0)}static getGlyphCode(t,e=4){return t<=2*e-2?Math.abs(t)%2==1?kt.CustosLong:kt.CustosShort:Math.abs(t)%2==1?kt.CustosDescLong:kt.CustosDescShort}}class Divider extends ChantNotationElement{constructor(t=!1,e=!1){super(),this.isDivider=!0,this.hasCarryover=t||!1,this.hasVerticalEpisema=!1,this.high=e,this.resetsAccidentals=!0}performLayout(t){if(super.performLayout(t),delete this.ledgerLineExtent,this.hasCarryover){const e=2*t.staffLineCount+(this.high?2:0),s=t.calculateHeightFromStaffPosition(e);this.addVisualizer(new RoundBraceVisualizer(t,1.5*-t.staffInterval,1.5*t.staffInterval,s,!0))}}finishLayout(t){if(this.hasVerticalEpisema){var e=new GlyphVisualizer(t,kt.VerticalEpisemaBelow);e.setStaffPosition(t,0),e.bounds.x=this.origin.x-e.origin.x,e.bounds.y-=.2*t.staffInterval,this.addVisualizer(e)}super.finishLayout(t)}}class QuarterBar extends Divider{performLayout(t){super.performLayout(t);const e=2*t.staffLineCount+(this.high?2:0);xe(t,this,new DividerLineVisualizer(t,e-2,e,this)),this.origin.x=this.bounds.width/2,this.finishLayout(t)}}class DivisioMinimis extends Divider{performLayout(t){super.performLayout(t);const e=2*t.staffLineCount-1+(this.high?2:0);xe(t,this,new DividerLineVisualizer(t,e+.5,e+1.5,this)),this.origin.x=this.bounds.width/2,this.finishLayout(t)}}class HalfBar extends Divider{performLayout(t){super.performLayout(t);const e=2===t.staffLineCount?1.5:2;this.addVisualizer(new DividerLineVisualizer(t,e,2*t.staffLineCount-e,this)),this.origin.x=this.bounds.width/2,this.finishLayout(t)}}class FullBar extends Divider{constructor(t=!1,e=!1){super(t),this.dotted=e}performLayout(t){super.performLayout(t);const e=2*t.staffLineCount-1;if(this.dotted)for(var s=.75;s<e+.5;s+=.5)this.addVisualizer(new DividerLineVisualizer(t,s-.125,s+.125,this));else this.addVisualizer(new DividerLineVisualizer(t,1,e,this));this.origin.x=this.bounds.width/2,this.finishLayout(t)}}class InsertionCursor extends Divider{performLayout(t){super.performLayout(t),this.cssClass="InsertionCursor",this.addVisualizer(new DividerLineVisualizer(t,0,2*t.staffLineCount)),this.origin.x=this.bounds.width/2,this.bounds.width=0,this.bounds.height=0,this.finishLayout(t)}}class DominicanBar extends Divider{constructor(t){super();var e=(t+1)%2;this.staffPosition=t-2*e}performLayout(t){super.performLayout(t),this.addVisualizer(new DividerLineVisualizer(t,this.staffPosition,this.staffPosition+3,this)),this.origin.x=this.bounds.width/2,this.finishLayout(t)}}class DoubleBar extends Divider{performLayout(t){super.performLayout(t);const e=2*t.staffLineCount-1;var s=new DividerLineVisualizer(t,1,e,this);s.bounds.x=0,this.addVisualizer(s);var i=new DividerLineVisualizer(t,1,e,this);i.bounds.x=2*t.intraNeumeSpacing-i.bounds.width,this.addVisualizer(i),this.origin.x=this.bounds.width/2,this.finishLayout(t)}}const ye={Flat:-1,Natural:0,Sharp:1};class Accidental extends ChantNotationElement{constructor(t,e,s=!1){super(),this.isAccidental=!0,this.keepWithNext=!0,this.staffPosition=t,this.accidentalType=e,this.soft=s,this.hidden=!1}performLayout(t){super.performLayout(t),this.hidden?(this.calculatedTrailingSpace=0,this.bounds=new Rect(0,t.calculateHeightFromStaffPosition(this.staffPosition),0,0)):this.parenthesized?me(t,this,this.createGlyphVisualizer(t)):this.addVisualizer(this.createGlyphVisualizer(t)),this.finishLayout(t)}setHidden(t,e){this.hidden!==e&&(this.hidden=e,this.performLayout(t))}createGlyphVisualizer(t){var e=kt.Flat;switch(this.accidentalType){case ye.Natural:e=kt.Natural;break;case ye.Sharp:e=kt.Sharp;break;default:e=kt.Flat}var s=new GlyphVisualizer(t,e);return s.setStaffPosition(t,this.staffPosition),s}adjustStep(t){switch(this.accidentalType){case ye.Flat:if(t===s.Ti)return s.Te;if(t===s.Mi)return s.Me;break;case ye.Sharp:if(t===s.Do)return s.Du;if(t===s.Fa)return s.Fu;break;case ye.Natural:if(t===s.Te)return s.Ti;if(t===s.Me)return s.Mi;if(t===s.Du)return s.Do;if(t===s.Fu)return s.Fa}return t}applyToPitch(t){this.pitch.octave===t.octave&&(t.step=this.adjustStep(t.step))}}class Virgula extends Divider{constructor(t=!1,e=!1){super(t,e),this.resetsAccidentals=!1,this.staffPosition=e?9:7}performLayout(t){super.performLayout(t),this.high&&(this.staffPosition=2*t.staffLineCount+1);var e=new GlyphVisualizer(t,kt.Virgula);e.setStaffPosition(t,this.staffPosition),xe(t,this,e,-e.bounds.width/2),this.origin.x=this.bounds.width/2,this.finishLayout(t)}}const ve=t=>t.isAccidental&&t.hidden&&!t.hasLyrics(),be=t=>t.hasLyrics()&&(t.lyrics[0].lyricType===ie.BeginningSyllable||t.lyrics[0].lyricType===ie.SingleSyllable);function Le(t,e){return!!t[e].isClef&&!t[e].hasLyrics()&&e+1<t.length-1&&t[e+1].constructor===ChantLineBreak&&!t[e+1].hasLyrics()}function Se(t,e){if(t[e].constructor!==TextOnly)return!1;for(let s=e+1;s<t.length;s++){if(t[s].isDivider)return!0;if(t[s].constructor!==TextOnly)return!1}return!1}function Ce(t,e){for(let s=e;s<t.length;s++){let e=t[s];if(!e.isClef&&e.constructor!==ChantLineBreak){if(e.euouae&&e.euouae.start)return!1;break}}for(let s=e;s<t.length;s++)if(t[s].isNeume)return!t[s].notes[0].noCustosBefore;return!0}function we(t,e){if(e.constructor!==DoubleBar)return null;var s=e;if(!s.hasLyrics()||1===s.lyrics.length&&s.lyrics[0].text.match(/^(i\.?)+j\.?/))return null;var i=s.lyrics.map(e=>{var s=new Lyric(t,e.originalText,e.lyricType,e.notation,e.notations,e.sourceIndex,e.openStyles);return s.elidesToNext=e.elidesToNext,e.verseNumber&&(s.verseNumber=e.verseNumber.copy(t,e.verseNumber.sourceIndex)),s.endsVerseNumbers=e.endsVerseNumbers,s});ne.alignVerseNumbers(t,i);var n=i.map(t=>t.leftOffset()).reduce((t,e)=>t<e?t:e);return i.forEach(t=>{t.bounds.x-=n}),i}function Pe(t,e){if(void 0!==e.layoutTrailingSpace&&(e.calculatedTrailingSpace=e.layoutTrailingSpace),e.alText)for(let t of e.alText)t.bounds.y=0;if(e.translationText)for(let t of e.translationText)t.bounds.y=0;if(!e.hasLyrics())return;let s=!1;for(let i of e.lyrics)i.repeatedVerseNumber&&(delete i.repeatedVerseNumber,s=!0),i.needsLayout?(i.recalculateMetrics(t),i.needsLayout=!1,s=!0):i.resetConnector(),i.bounds.y=0,void 0!==i.lineWidth&&delete i.lineWidth;s&&e.alignLyrics(t)}const Ne=(t,e)=>("function"==typeof e.trailingSpace?e.trailingSpace(t):e.trailingSpace)<0;function Te(t,e,s=e){let i=t.score.notations,n=-1/0;for(let a=e;a>=t.notationsStartIndex;a--){for(let t of i[a].nabcNeumes||[])t&&(n=Math.max(n,i[a].bounds.x+t.bounds.right()));if(a<=s&&i[a].firstOfParentheses)break}return n}const Ie=(t,e,s,i)=>e.setConnectorWidth(Math.max(i,s>1?t.intraNeumeSpacing:t.minLyricWordSpacing)),Ae=t=>{for(var e=0,s=0;s<t.length;s++)e+=t[s].condensable;return e};class ChantLine extends ChantLayoutElement{constructor(t){super(),this.lyricRows=[],this.score=t,this.notationsStartIndex=0,this.numNotationsOnLine=0,this.notationBounds=null,this.staffLeft=0,this.staffRight=0,this.textLeft=0,this.isFirstLine=!1,this.startingClef=null,this.custos=null,this.clefLineBreak=null,this.justify=!0,this.ledgerLines=[],this.braces=[],this.slurs=[],this.nextLine=null,this.previousLine=null,this.lyricLineHeight=0,this.lyricLineBaseline=0,this.numLyricLines=0,this.spaceAfterNotations=0,this.spaceBetweenTextTracks=0,this.lastLyrics=[]}get staffSpaces(){return this.score.staffLineCount-1}performLayout(t){const e=this.staffSpaces,s=this.score.staffLineCount;var i;this.notationBounds=new Rect(this.staffLeft,-(t.staffLineWeight/2+2*s-1+t.minSpaceAboveStaff)*t.staffInterval,this.staffRight-this.staffLeft,(t.staffLineWeight+2*e+t.minSpaceAboveStaff)*t.staffInterval);var n=this.score.notations,a=null===this.extraTextOnlyIndex?this.notationsStartIndex+this.numNotationsOnLine:this.extraTextOnlyIndex,r=this.notationsStartIndex+this.numNotationsOnLine,o=null;this.notationBounds.union(this.startingClef.bounds),this.lyricLineHeight=t.textStyles.lyric.size*(t.textStyles.lyric.lineHeight||1.1),this.lyricLineBaseline=0,this.numLyricLines=0,this.altLineHeight=0,this.altLineBaseline=0,this.numAltLines=0,this.translationLineHeight=t.textStyles.translation.size*(t.textStyles.translation.lineHeight||1.1),this.translationLineBaseline=0,this.numTranslationLines=0;const h=t.textStyles.al.size*(t.textStyles.al.lineHeight||1.1),l=[];for(i=this.notationsStartIndex;i<a;i++)((o=n[i]).bounds.height||o.bounds.width)&&this.notationBounds.union(o.bounds),o.lyrics.forEach((t,e)=>{(t.text||t.verseNumber||t.verseNumberInEffect)&&(l[e]=!0,t.origin.y>this.lyricLineBaseline&&(this.lyricLineBaseline=t.origin.y))}),o.alText&&this.numAltLines<o.alText.length&&(o.alText[0].bounds.height>this.altLineHeight&&(this.altLineHeight=o.alText[0].bounds.height),o.alText[0].origin.y>this.altLineBaseline&&(this.altLineBaseline=o.alText[0].origin.y),o.alText.length>this.numAltLines&&(this.numAltLines=o.alText.length)),o.translationText&&o.translationText[0]&&o.translationText[0].text&&(o.translationText[0].origin.y>this.translationLineBaseline&&(this.translationLineBaseline=o.translationText[0].origin.y),o.translationText.length>this.numTranslationLines&&(this.numTranslationLines=o.translationText.length));this.lyricRows=[];for(let t=0;t<l.length;t++)this.lyricRows.push(this.numLyricLines),l[t]&&this.numLyricLines++;for(this.custos&&this.notationBounds.union(this.custos.bounds),i=0;i<this.braces.length;i++)this.notationBounds.union(this.braces[i].bounds);for(i=0;i<this.slurs.length;i++)this.notationBounds.union(this.slurs[i].bounds);!function(t,e,s){let i=[[],[]];for(let t of s)for(let e of t.nabcNeumes||[])e&&i[e.voice].push([t,e]);if(!i[0].length&&!i[1].length)return;let n=t.staffInterval,a=-1/0,r=1/0;for(let t of s)for(let e of t.notes||[])a=Math.max(a,e.staffPosition),r=Math.min(r,e.staffPosition);let o=2*e.score.staffLineCount-1,h=e.notationBounds;const l=(t,e)=>Math.max(0,...t.map(([,t])=>e(t)*t.unit));if(i[0].length){let t=-o*n-Mt.aboveLinesRaise*n-Math.max(0,a-o-Mt.aboveThreshold)*n-Math.max(0,l(i[0],t=>t.layout.depth)-Math.max(0,(Mt.aboveLinesHeight-1)*n));for(let[,e]of i[0])e.setBaseline(t);let e=Mt.aboveLinesHeight*n+l(i[0],t=>t.layout.raised);h.union(new Rect(0,t-e,0,e))}if(i[1].length){let t=Mt.belowLinesHeight*n-n+Math.max(0,1-r-Mt.belowThreshold)*n+Math.max(0,l(i[1],t=>t.layout.height)-Math.max(0,(Mt.belowLinesHeight-.5)*n));for(let[,e]of i[1])e.setBaseline(t);h.union(new Rect(0,t,0,l(i[1],t=>t.layout.lowered)))}for(let[t,e]of[...i[0],...i[1]])h.union(new Rect(t.bounds.x+e.bounds.x,e.bounds.y,e.bounds.width,e.bounds.height))}(t,this,n.slice(this.notationsStartIndex,a));var u=this.notationBounds.bottom()+t.minSpaceBelowStaff*t.staffInterval;for(this.lyricLineBaseline+=u,this.translationLineBaseline+=u,this.altLineBaseline+=this.notationBounds.y-this.altLineHeight-.5*t.staffInterval,i=this.notationsStartIndex;i<a;i++){o=n[i];for(var c=0;c<o.lyrics.length;c++)o.lyrics[c].bounds.y=this.lyricRow(c)*this.lyricLineHeight+this.lyricLineBaseline;var d=this.lyricRow(o.lyrics.length)*this.lyricLineHeight;if(o.translationText)for(c=0;c<o.translationText.length;c++)o.translationText[c].bounds.y=d+this.translationLineBaseline,d+=this.translationLineHeight;if(o.alText)for(d=0,c=0;c<o.alText.length;c++)o.alText[c].bounds.y=d+this.altLineBaseline,d-=h}if(this.extraTextOnlyHeight=0,t.useExtraTextOnly){var f=this.extraTextOnlyLyricIndex;if(null===this.extraTextOnlyIndex){let t=n[a-1]||{};t.constructor===ChantLineBreak&&(t=n[a-2]||{}),t.constructor===TextOnly&&1===t.lyrics.length&&t.lyrics[0].bounds.height>this.lyricLineHeight&&(this.extraTextOnlyHeight=this.lyricLineHeight)}else{let t=null,e=0,s=this.numLyricLines;for(i=this.notationsStartIndex;i<this.extraTextOnlyIndex;i++)n[i].lyrics.forEach((t,e)=>{t.text&&(s=Math.max(s,this.lyricRow(e)+t.numLines))});d=(s-1)*this.lyricLineHeight,d+=this.numTranslationLines*this.translationLineHeight;let a=s-this.numLyricLines;for(i=this.extraTextOnlyIndex;i<r;i++)(o=n[i]).lyrics[f]&&(t=o.lyrics[f],t.lineWidth&&(e=this.staffRight-t.lineWidth,d+=this.lyricLineHeight,a++),a+=t.numLines-1,t.bounds.y=d+this.lyricLineBaseline,o.bounds.x+=e,d+=(t.numLines-1)*this.lyricLineHeight);this.extraTextOnlyHeight=this.lyricLineHeight*a}}if(this.startingClef.hasLyrics())for(c=0;c<this.startingClef.lyrics.length;c++)this.startingClef.lyrics[c].bounds.y=this.lyricRow(c)*this.lyricLineHeight+this.lyricLineBaseline;if(this.isFirstLine){var g=this.score.dropCapOnFirstLine(t)?this.score.dropCap:null;null!==this.score.annotation&&(this.score.annotation.bounds.x=this.staffLeft/2,this.score.annotation.bounds.y=-t.staffInterval*(2*s-1),null!==g&&(this.score.annotation.bounds.y=this.score.annotationTop(t,this.lyricLineBaseline,!0),this.score.annotation.bounds.y<this.notationBounds.y&&(this.notationBounds.height+=this.notationBounds.y-this.score.annotation.bounds.y,this.notationBounds.y=this.score.annotation.bounds.y)),this.score.annotation.bounds.y+=this.score.annotation.origin.y),null!==g&&(g.bounds.x=this.staffLeft/2,g.bounds.y=this.lyricLineBaseline-g.origin.y,this.notationBounds.union(g.bounds),g.bounds.y=this.lyricLineBaseline)}if(this.numLyricLines>0){var p=new Rect(0,u,0,this.lyricLineHeight*this.numLyricLines+this.extraTextOnlyHeight+this.translationLineHeight*this.numTranslationLines);this.notationBounds.union(p)}if(this.numAltLines>0){var m=new Rect(0,this.notationBounds.y-this.altLineHeight-.5*t.staffInterval-h*(this.numAltLines-1),0,h*this.numAltLines);this.notationBounds.union(m)}for(this.notationBounds.union(new Rect(0,-t.staffInterval,0,(t.staffLineWeight/2+t.minSpaceBelowStaff)*t.staffInterval)),i=this.notationsStartIndex;i<r;i++)for(var x of n[i].lyrics)x&&x.protrusionWidth&&this.notationBounds.union(new Rect(x.getRight(),this.notationBounds.y,0,0));var y=this.notationBounds.height;this.bounds.x=0,this.bounds.y=this.notationBounds.y,this.bounds.width=this.notationBounds.right(),this.bounds.height=y,this.origin=new Point(this.staffLeft,-this.notationBounds.y)}reach(t,e){var s=this.notationBounds,i=Math.max(0,s.y-t),n=Math.max(0,e-s.bottom());return s.union(new Rect(s.x,s.y-i,0,s.height+i+n)),this.bounds.height=s.height,this.origin.y=-s.y,{above:i,below:n}}layoutInsertionCursor(t){return this.insertionCursor&&(this.insertionCursor.performLayout(t),this.insertionCursor.bounds.x=this.score.insertionElement.bounds.right()+(this.score.insertionElement.trailingSpace&&this.score.insertionElement.calculatedTrailingSpace||0)/2-this.insertionCursor.origin.x),this.insertionCursor}draw(t){var e=t.canvasCtxt;e.translate(this.bounds.x,this.bounds.y);var s,i,n=this.staffLeft,a=this.staffRight;for(e.lineWidth=t.staffLineWeight,e.strokeStyle=t.staffLineColor,s=-2*this.score.staffLineCount+1;s<0;s+=2)i=t.staffInterval*s,e.beginPath(),e.moveTo(n,i),e.lineTo(a,i),e.stroke();for(this.layoutInsertionCursor(t)&&this.insertionCursor.draw(t),s=0;s<this.ledgerLines.length;s++){var r=this.ledgerLines[s];i=t.calculateHeightFromStaffPosition(r.staffPosition),e.beginPath(),e.moveTo(r.x1,i),e.lineTo(r.x2,i),e.stroke()}for(s=0;s<this.braces.length;s++)this.braces[s].draw(t);this.isFirstLine&&(null!==this.score.dropCap&&this.score.dropCap.draw(t),null===this.score.annotation||t.mergeAnnotationWithTextLeft&&!this.score.dropCap||this.score.annotation.draw(t)),this.startingClef.draw(t);var o=this.score.notations,h=this.notationsStartIndex+this.numNotationsOnLine;for(s=this.notationsStartIndex;s<h;s++)o[s]!==this.custos&&o[s].draw(t);for(s=0;s<this.slurs.length;s++)this.slurs[s].draw(t);this.custos&&this.custos.draw(t),e.translate(-this.bounds.x,-this.bounds.y)}createInnerSvg(t,e){var s,i=[],n=e.method,a=this.staffLeft,r=this.staffRight;const o=this.staffSpaces;for(t.editable&&i.push(e.element("rect",{key:"insertion",x:a,y:t.staffInterval*(-2*this.score.staffLineCount+1),width:r-a,height:2*t.staffInterval*o,fill:"none"})),s=-2*this.score.staffLineCount+1;s<0;s+=2)i.push(e.element("line",{key:s,x1:a,y1:t.staffInterval*s,x2:r,y2:t.staffInterval*s,stroke:t.staffLineColor,"stroke-width":t.staffLineWeight,class:"staffLine"}));for(i=[e.element("g",{class:"staffLines"},i)],this.layoutInsertionCursor(t)&&i.push(this.insertionCursor[n](t)),s=0;s<this.ledgerLines.length;s++){var h=this.ledgerLines[s],l=t.calculateHeightFromStaffPosition(h.staffPosition);i.push(e.element("line",{x1:h.x1,y1:l,x2:h.x2,y2:l,stroke:t.staffLineColor,"stroke-width":t.staffLineWeight,class:"ledgerLine"}))}for(s=0;s<this.braces.length;s++)i.push(this.braces[s][n](t));for(s=0;s<this.slurs.length;s++)i.push(this.slurs[s][n](t));this.isFirstLine&&(null!==this.score.dropCap&&i.push(this.score.dropCap[n](t)),null===this.score.annotation||t.mergeAnnotationWithTextLeft&&!this.score.dropCap||(i=i.concat(this.score.annotation[n](t)))),i.push(this.startingClef[n](t));var u=this.score.notations,c=this.notationsStartIndex+this.numNotationsOnLine;for(s=this.notationsStartIndex;s<c;s++)u[s]!==this.custos&&i.push(u[s][n](t));return this.custos&&i.push(this.custos[n](t)),i}getInnerNodes(t,e=0,s={quickSvg:"createNode",elements:"createSvgNode"}){return this.createInnerSvg(t,"createSvgTree"===s.elements?Ht.tree:Ht.node)}createSvgAs(t,e,s){return e.element("g",{class:"chantLine",transform:"translate("+this.bounds.x+","+(this.bounds.y-t)+")","element-index":this.elementIndex},s)}createSvgNode(t,e=0){var s=this.createSvgAs(e,Ht.node,this.createInnerSvg(t,Ht.node));return s.source=this,s}createSvgTree(t,e=0){return this.createSvgAs(e,Ht.tree,this.createInnerSvg(t,Ht.tree))}createSvgFragment(t,e=0,s){var i=this.svgFragmentCache,n=void 0!==s&&i&&i.key===s?i.inner:this.createInnerSvgFragment(t);return void 0!==s&&(this.svgFragmentCache={key:s,inner:n}),this.createSvgAs(e,Ht.fragment,[n])}createInnerSvgFragment(t){return qt(this.createInnerSvg(t,Ht.fragment))}buildFromChantNotationIndex(t,e,s,i=(e?this.score.lines.length:0)){var n=this.score.notations,a=null,r=null,o=null,l=[],u=[];this.notationsStartIndex=e,this.numNotationsOnLine=0,this.clefLineBreak=null,delete this.svgFragmentCache,this.paddingLeft=0,this.extraTextOnlyIndex=null,this.extraTextOnlyLyricIndex=0;var c=this.score.lineExtent(t,i,s);if(this.staffLeft=c.left,this.staffRight=c.right,this.textLeft=c.textLeft,this.isFirstLine=0===i,this.isFirstLine)this.score.dropCap&&(this.paddingLeft=(this.staffLeft-this.score.dropCap.bounds.width)/2);else if(a=we(t,r=n[e-1]))for(let t of r.lyrics)t.bounds.y=Number.MAX_SAFE_INTEGER;var d=!(!n.length||!n[e].isClef);if(d){t.activeClef=n[e],n[e].line=this,e++,this.notationsStartIndex++;let s=i>0&&this.score.lines&&this.score.lines[i-1];s&&s.clefLineBreak&&s.clefLineBreak===n[e]&&(n[e].line=this,e++,this.notationsStartIndex++)}this.startingClef=t.activeClef.clone(),this.startingClef.performLayout(t),"visible"===t.clefVisibility||d||this.startingClef.hide(t),this.startingClef.bounds.x=this.staffLeft;var f=this.startingClef;a&&ne.setNotation(a,f);var g,p,m,x,y=this.staffRight-h.CustosLong.bounds.width*t.glyphScaling,v=null,b=n.length-1;for(f.hasLyrics()&&ne.mergeIn(this.lastLyrics,f.lyrics),t.lastStartBrace&&!t.lastStartBrace.note&&(t.lastStartBrace.note=this.startingClef),this.furthestLaidOut=e,g=e;g<=b;g++){if(ve(f)||(r=f,f.constructor!==TextOnly&&(o=f)),f=n[g],g>this.furthestLaidOut&&(this.furthestLaidOut=g),s>0&&this.numNotationsOnLine>0&&Le(n,g)){this.clefLineBreak=n[g+1],this.justify=this.clefLineBreak.justify||null!==this.extraTextOnlyIndex||this.getWhitespaceOnRight(t)<0,this.justify&&this.findNeumesToJustify(l);break}var L;Pe(t,f),this.repeatVerseNumbers(t,g),f.isAccidental&&f.soft?f.setHidden(t,!this.isSoftAccidentalVisible(g)):f.isNeume&&this.spaceNeumeBeforeSoftAccidental(t,g),L=g===b||f.constructor===Custos||r.constructor===Custos&&f.isDivider||f.constructor===ChantLineBreak&&o.constructor===Custos?this.staffRight:g===b-1?Math.max(y,this.staffRight-n[b].bounds.width):y;var S=void 0!==this.plannedEnd&&g<this.plannedEnd;S&&(L=1/0);var C,w=!S&&!f.isDivider&&f.constructor!==ChantLineBreak&&f.constructor!==Custos&&!(f.constructor===TextOnly&&f.hasLyrics()&&/^(?:[*†]|i+j\.?)$/.test(f.lyrics[0].text))&&b-g>1&&!o.keepWithNext&&o.bounds.right()>=y;w=w||this.plannedEnd===g||null!==this.extraTextOnlyIndex&&f.constructor!==TextOnly&&f.constructor!==ChantLineBreak&&f.constructor!==Custos&&f.hasLyrics(),f instanceof TextOnly&&r===o&&(m=this.lastLyrics.slice(),x=g),f instanceof TextOnly&&n[x]&&!n[x].hasLyrics()&&(x=g),ve(f)&&this.plannedEnd!==g?(f.bounds.x=o.bounds.right()+o.calculatedTrailingSpace,C=!0):C=!w&&this.positionNotationElement(t,this.lastLyrics,o,f,L,this.extraTextOnlyIndex?[]:u);var P,N=t.useExtraTextOnly&&void 0===this.plannedEnd&&f.constructor===TextOnly&&ne.hasOnlyOneLyric(f.lyrics)&&(!1===C||null!==this.extraTextOnlyIndex);if(N&&null===this.extraTextOnlyIndex)if(P=ne.indexOfLyric(f.lyrics),x===g)if(n[g].lyrics[P].text.length<=1){var T=n[g+1];N=T&&T.constructor===TextOnly&&T.lyrics[P]&&T.lyrics[P].text.length>0}if(N){var I;if(P=this.extraTextOnlyLyricIndex,null===this.extraTextOnlyIndex&&n[x].lyrics.length){if(x===this.notationsStartIndex||!t.startExtraTextOnlyFromFirst){let t;x=g;for(let e=g-1;e>=this.notationsStartIndex;e--)if(n[e].hasLyrics()){t=n[e];break}m=t&&t.lyrics.slice()||[]}this.extraTextOnlyIndex=x,P=this.extraTextOnlyLyricIndex=ne.indexOfLyric(f.lyrics),this.lastLyricsBeforeTextOnly=m,this.lastLyrics=[],g=x-1,this.numNotationsOnLine=x-this.notationsStartIndex;continue}if(delete f.lyrics[P].lineWidth,!C||g===this.extraTextOnlyIndex){f.bounds.x=this.textLeft+f.lyrics[P].origin.x;let e=t.startExtraTextOnlyFromFirst?ne.getRight(this.lastLyrics)+(t.minLyricWordSpacing||0):this.textLeft;f.lyrics[P].setMaxWidth(t,this.staffRight-this.textLeft,this.staffRight-e),I=f}I&&(I.lyrics[P].lineWidth=f.lyrics[P].getRight())}else if(!1===C){for(;this.plannedEnd!==g&&this.numNotationsOnLine>1&&(f.isDivider||f.constructor===Custos||Se(n,g));)f=n[--g],this.numNotationsOnLine--,this.lastLyricsBeforeTextOnly&&Se(n,g)&&delete this.lastLyricsBeforeTextOnly;let e=0,s=0;if(t.minSyllablesLastLine&&t.minNotesLastLine)for(let i=g+1;i<n.length&&e<t.minSyllablesLastLine&&s<t.minNotesLastLine;i++){const t=n[i];if(t.hasLyrics()&&e++,t.notes)for(let e=0;e<t.notes.length;e++)t.notes[e]&&s++}var A;for(p=g-1;p>this.notationsStartIndex&&this.plannedEnd!==g;p--){var M=n[p];if(f=n[p+1],t.minSyllablesLastLine&&t.minNotesLastLine&&(e+=f.hasLyrics()?1:0,s+=(f.notes||[]).length),M.firstWithNoWidth)this.numNotationsOnLine--;else if(v)this.numNotationsOnLine--,M===v&&(v=null);else if(!f||!f.notes||f.notes[0].shape!==cn.Quilisma&&f.notes[0].shape!==cn.Inclinatum)if(e<t.minSyllablesLastLine&&s<t.minNotesLastLine)this.numNotationsOnLine--;else if(!0===M.keepWithNext)!M.allowLineBreakBeforeNext||this.maxNumNotationsOnLine||this.keepsInArea(p)||(this.maxNumNotationsOnLine=this.numNotationsOnLine),this.numNotationsOnLine--;else{if(!this.keepsInArea(p))break;void 0===A&&(A=this.numNotationsOnLine),this.numNotationsOnLine--}else this.numNotationsOnLine--}if(p===this.notationsStartIndex&&void 0!==A&&(this.numNotationsOnLine=A),this.extraTextOnlyIndex&&this.notationsStartIndex+this.numNotationsOnLine<=this.extraTextOnlyIndex&&(this.extraTextOnlyIndex=null),0===this.numNotationsOnLine&&(this.numNotationsOnLine=1),f=this.findNeumesToJustify(l),this.lastLyrics=l,this.maxNumNotationsOnLine)this.getWhitespaceOnRight(t)/this.toJustify.length>t.staffInterval*t.maxExtraSpaceInStaffIntervals&&(ne.mergeInArray(l,n.slice(this.notationsStartIndex+this.numNotationsOnLine,this.notationsStartIndex+this.maxNumNotationsOnLine)),this.numNotationsOnLine=this.maxNumNotationsOnLine,delete this.maxNumNotationsOnLine);let i=this.score.notations[null===this.extraTextOnlyIndex?this.notationsStartIndex+this.numNotationsOnLine:this.extraTextOnlyIndex];if(i&&be(i)&&(this.custos||this.wantsEolCustos(t))&&this.toJustify.push(this.custos),p-1>=this.notationsStartIndex&&n[p].isDivider&&n[p-1].constructor===Custos){let e=p-2>=this.notationsStartIndex?n[p-2]:this.startingClef;for(l=[],g=p-2;g>=this.notationsStartIndex;g--)if(n[g].hasLyrics()){ne.mergeIn(l,n[g].lyrics);break}g<this.notationsStartIndex&&this.startingClef.hasLyrics()&&ne.mergeIn(l,this.startingClef.lyrics),u.sum-=u.pop().condensable,u.sum-=u.pop().condensable,this.positionNotationElement(t,l,e,n[p],this.staffRight,u),this.custos=n[p-1],this.custos.bounds.x=this.staffRight-this.custos.bounds.width-this.custos.leadingSpace}break}if(f.hasLyrics()&&ne.mergeIn(this.lastLyrics,f.lyrics),v&&f===v.translationText[0].endNeume?v=null:f.translationText&&f.translationText.length&&f.translationText[0].endNeume&&(v=f),f.line=this,this.numNotationsOnLine++,f.isClef&&(t.activeClef=f),f.constructor===ChantLineBreak&&s>0){this.justify=f.justify||null!==this.extraTextOnlyIndex||this.getWhitespaceOnRight(t)<0,this.justify&&this.findNeumesToJustify(l);break}f.constructor===Custos?this.custos=f:f.isNeume&&(this.custos=null)}for(var B=this.notationsStartIndex+this.numNotationsOnLine-1,k=n[B]||{};B>0&&(k.constructor===ChantLineBreak||k.constructor===Custos||k.constructor===TextOnly);)k=n[--B];var F=this.notationsStartIndex+this.numNotationsOnLine===n.length;if((this.justify&&null!==this.extraTextOnlyIndex||s>0&&F)&&(this.toJustify||this.findNeumesToJustify(l),this.justify=(!F||k.isDivider)&&this.getWhitespaceOnRight(t)/(this.toJustify.length||1)<=t.staffInterval*t.maxExtraSpaceInStaffIntervals),!this.custos&&this.wantsEolCustos(t))for(g=this.notationsStartIndex+this.numNotationsOnLine;g<n.length;g++){if(n[g].isNeume){this.custos=new Custos(!0),t.currNotationIndex=g-1,this.custos.performLayout(t),this.justify?this.custos.bounds.x=this.staffRight-this.custos.bounds.width-this.custos.leadingSpace:this.custos.bounds.x=this.notationRight(o)+o.calculatedTrailingSpace;break}}if(this.lastLyricsBeforeTextOnly&&(this.lastLyrics=this.lastLyricsBeforeTextOnly,delete this.lastLyricsBeforeTextOnly),s>0){var O=this.getWhitespaceOnRight(),E=this.staffRight;O<0&&(E-=O)}for(g=0;this.lastLyrics&&this.lastLyrics[g];){let e=this.lastLyrics[g];e.allowsConnector()&&(e.setNeedsConnector(!0,0),s>0&&t.minLyricWordSpacing<t.hyphenWidth&&(O=E-e.getRight())<0&&Ie(t,e,this.lastLyrics.length,t.hyphenWidth+O)),++g}if(s<=0){const t=n[this.notationsStartIndex+this.numNotationsOnLine-1];t&&(this.staffRight=t.bounds.right()),this.justify=!1}if(this.justifyElements(t,this.justify,u),this.alignHiddenAccidentals(),this.centerDividers(),s>0&&F&&!0!==this.score.extendLastSystemStaffLines){const t=n[this.notationsStartIndex+this.numNotationsOnLine-1];t&&(this.staffRight=t.bounds.right())}this.finishLayout(t)}readEnd(t){for(var e=this.score.notations,s=e.length,i=this.furthestLaidOut,n=Math.min(s,i+3),a=i+1;a<s&&e[a].constructor===TextOnly;)a++;for(n=Math.max(n,Math.min(s,a+1)),a=this.notationsStartIndex+this.numNotationsOnLine;a<s&&(!e[a].isNeume||e[a].hasNoWidth);)a++;if(n=Math.max(n,Math.min(s,a+1)),t.minSyllablesLastLine&&t.minNotesLastLine){let r=0,o=0;for(a=i+1;a<s&&r<t.minSyllablesLastLine&&o<t.minNotesLastLine;a++)e[a].hasLyrics()&&r++,o+=(e[a].notes||[]).length;n=Math.max(n,a)}return n}centerDividers(){for(var t,e=null===this.extraTextOnlyIndex?this.notationsStartIndex+this.numNotationsOnLine:this.extraTextOnlyIndex,s=this.notationsStartIndex;s<e;s++)if((t=this.score.notations[s])&&t.isDivider){var i=1,n=s>this.notationsStartIndex?this.score.notations[s-1]:this.startingClef,a=s+1===e?this.custos:this.score.notations[s+1];if(n===a&&a===this.custos&&(n=s-2>=this.notationsStartIndex?this.score.notations[s-2]:this.startingClef,a.bounds.x=this.staffRight-a.bounds.width),n&&a){var r=t.bounds.x,o=t.bounds.width,h=n instanceof TextOnly&&n.hasLyrics()?n.lyrics[0].getRight():n.bounds.right(),l=a instanceof TextOnly&&a.hasLyrics()?a.lyrics[0].getLeft():a.bounds.x;if(n instanceof TextOnly){let t;for(let e=s-1;e>=this.notationsStartIndex;e--)if(!(this.score.notations[e]instanceof TextOnly)){t=this.score.notations[e];break}h=t?t.bounds.right():0}if(a instanceof TextOnly){let e,i=this.notationsStartIndex+this.numNotationsOnLine;for(let t=s+1;t<i;t++){let s=this.score.notations[t];if(!(s instanceof TextOnly||s instanceof ChantLineBreak)){e=s;break}}e=e||this.custos,!e||e.isDivider||e.hasLyrics()?l<t.bounds.right()&&(l=0):l=e.bounds.x}if(h&&l&&(t.bounds.x=(h+l-o)/2),t.hasLyrics()){var u=r-t.bounds.x;for(i=t.lyrics.length-1;i>=0;i--)t.lyrics[i].bounds.x+=u,t.lyrics[i].needsLayout=!0}}else s!==e-1||!this.justify||t.constructor!==DoubleBar&&t.constructor!==FullBar||(t.bounds.x=this.staffRight-t.bounds.width)}}isSoftAccidentalVisible(t){for(var e=this.score.notations,s=e[t],i=this.startingClef,n=null,a=t-1;a>=this.notationsStartIndex;a--){var r=e[a];if(r.isAccidental&&r.staffPosition===s.staffPosition){n=r.accidentalType;break}if(r.isClef){i=r;break}}return null===n&&i.defaultAccidental&&i.defaultAccidental.staffPosition===s.staffPosition&&(n=i.defaultAccidental.accidentalType),s.accidentalType===ye.Natural?null!==n&&n!==ye.Natural:n!==s.accidentalType}spaceNeumeBeforeSoftAccidental(t,e){var s=this.score.notations,i=s[e],n=s[e+1],a=s[e+2];if(n&&n.soft&&!n.firstOfParentheses&&a&&a.isNeume&&!a.firstOfParentheses&&i.trailingSpace.isDefault&&(n.setHidden(t,!this.isSoftAccidentalVisible(e+1)),i.keepWithNext=n.hidden,i.allowLineBreakBeforeNext=!1,n.hidden)){var r=0;a.notes[0].shape!==cn.Quilisma&&(r=t.intraNeumeSpacing,i.allowLineBreakBeforeNext=!0),i.calculatedTrailingSpace+=r-i.trailingSpace(t)}}alignHiddenAccidentals(){for(var t=this.score.notations,e=null,s=this.notationsStartIndex+this.numNotationsOnLine-1;s>=this.notationsStartIndex;s--){var i=t[s];ve(i)?e&&(i.bounds.x=e.bounds.x):e=i}}findNeumesToJustify(t){this.toJustify=[];for(var e,s=null,i=null,n=this.notationsStartIndex+this.numNotationsOnLine,a=this.notationsStartIndex;a<n;a++)e=i,i=(s=this.score.notations[a]).isAccidental&&this.score.notations[++a]||s,s&&e&&(null!==this.extraTextOnlyIndex&&a>=this.extraTextOnlyIndex&&s.constructor===TextOnly||(ne.mergeIn(t,e.lyrics),this.canJustifyBefore(e,s,i,a,t)&&(i!==this.custos||i.hasLyrics())&&this.toJustify.push(s)));return null!==i&&ne.mergeIn(t,i.lyrics),i}canJustifyBefore(t,e,s,i,n){if(!0===t.keepWithNext)return!1;var a=s.hasLyrics();return!(!e.isDivider&&n.length&&n[0].allowsConnector()&&a)&&(s.constructor!==ChantLineBreak&&(0!==i||!this.score.useDropCap||!a))}getWhitespaceOnRight(t){var e=this.score.notations,s=this.notationsStartIndex+this.numNotationsOnLine,i=e[s-1];null!==this.extraTextOnlyIndex&&i.constructor===TextOnly&&(i=e[(s=this.extraTextOnlyIndex)-1]);var n=i?this.notationRight(i)+i.calculatedTrailingSpace:0,a=this.lastLyricsBeforeTextOnly||this.lastLyrics,r=a.length?ne.getRight(a,!1,!0):0;return this.custos?(n+=this.custos.bounds.width+this.custos.leadingSpace,this.custos.hasLyrics()&&(r=ne.getRight(this.custos.lyrics,!1,!0))):t&&s<e.length&&this.wantsEolCustos(t)&&(n+=h.CustosLong.bounds.width*t.glyphScaling),this.staffRight-Math.max(r,n)}notationRight(t){let e=this.score.notations,s=t.notationIndex;if(e[s]!==t)return t.bounds.right();let i=s;for(;i>this.notationsStartIndex&&e[i].constructor===TextOnly;)i--;return Math.max(t.bounds.right(),Te(this,s,i))}keepsInArea(t){var e=this.score;if(!e.keptInAreas){var s={noLineBreak:!1,euouae:!1};e.keptInAreas=e.notations.map(t=>{var e=!1;for(const n of["noLineBreak","euouae"]){var i=t[n];i&&i.start&&(s[n]=!0),!s[n]||i&&i.end||(e=!0),i&&i.end&&(s[n]=!1)}return e})}return e.keptInAreas[t]}wantsEolCustos(t){var e=this.eolCustos(t);return"always"===e||"allowed"===e&&Ce(this.score.notations,this.notationsStartIndex+this.numNotationsOnLine)}eolCustos(t){var e=this.score.notations,s=this.notationsStartIndex+this.numNotationsOnLine-1,i=this.clefLineBreak||e[s];if(i&&i.constructor===ChantLineBreak){if("force"===i.custos)return"always";if("none"===i.custos)return"never"}for(var n=s;n>=this.notationsStartIndex;n--)if(e[n].isNeume){var a=e[n].notes;if(a[a.length-1].noCustos)return"never";break}return"manual"===t.eolCustos?"never":"allowed"}justifyElements(t,e,s){var i,n=this.toJustify||[],a=this.score.notations,r=this.notationsStartIndex+this.numNotationsOnLine,o=a[this.notationsStartIndex+this.numNotationsOnLine-1],h=this.staffRight<1/0&&this.custos&&o.keepWithNext&&this.custos.bounds.x-this.notationRight(o)-o.calculatedTrailingSpace;if(h>0){for(i=0;this.lastLyrics&&this.lastLyrics[i];){let e=this.lastLyrics[i];if(e.allowsConnector()){var l=e.getConnectorWidth();t.minLyricWordSpacing<l&&Ie(t,e,this.lastLyrics.length,l-h)}++i}this.custos.bounds.x=this.notationRight(o)+o.calculatedTrailingSpace}var u=this.getWhitespaceOnRight();if(!(Math.abs(u)<.5||u>0&&(e&&0===n.length||!e))){var c,d;this.condensableSpaces=s;var f=0,g=u/n.length,p=0,m=0;u<0&&(n=s.filter(t=>t.condensable>0),p=u/s.sum,g=0);var x=n[m++],y=!1;for(i=this.notationsStartIndex;i<r;i++)d=c,c=a[i],null!==this.extraTextOnlyIndex&&i>=this.extraTextOnlyIndex&&c.constructor===TextOnly||(p||c!==this.custos?(p?x&&x.notation===c&&(f+=p*x.condensable,x=n[m++]):x===c?(d.hasNoWidth?y=!0:f+=g,x=n[m++]):y&&!d.hasNoWidth&&(y=!1,f+=g),c.bounds.x+=f):c.hasLyrics()?(c.bounds.x=Math.min(c.bounds.x+(this.staffRight-ne.getRight(c.lyrics)),this.staffRight-c.bounds.width),f+=g):c.bounds.x=Math.min(c.bounds.x+f,this.staffRight-c.bounds.width));h>0&&(this.custos.bounds.x=this.notationRight(o)+o.calculatedTrailingSpace)}}handleEndBrace(t,e,s){var i=t.lastStartBrace;if(i){var n,a=i.notationIndex,r=this.score.notations,o=t.intraNeumeSpacing/2,h=i.note;n=i.isAbove?Math.min(t.calculateHeightFromStaffPosition(2*this.score.staffLineCount),...[h,e].concat(r.slice(a,s+1)).map(t=>t.bounds.y-o)):Math.max(t.calculateHeightFromStaffPosition(0),...[h,e].concat(r.slice(a,s+1)).map(t=>t.bounds.bottom()+o));var l=!1;i.shape===ge.RoundBrace?this.braces.push(new RoundBraceVisualizer(t,i.getAttachmentX(h),e.braceEnd.getAttachmentX(e),n,i.isAbove)):(i.shape===ge.AccentedCurlyBrace&&(l=!0),this.braces.push(new CurlyBraceVisualizer(t,i.getAttachmentX(h),e.braceEnd.getAttachmentX(e),n,i.isAbove,l))),delete t.lastStartBrace}}finishLayout(t){this.ledgerLines=[],this.slurs=[];for(var e=[],s=this.score.notations,i=this.notationsStartIndex+this.numNotationsOnLine,n=(e,s,i)=>{var n;s=Math.min(s,this.staffRight);for(let t=this.ledgerLines.length-1;t>=0&&!n;t--)this.ledgerLines[t].staffPosition===i&&(n=this.ledgerLines[t]);if(n&&e<=n.x2&&s>=n.x1)return n.x1=Math.min(n.x1,e),void(n.x2=Math.max(n.x2,s));if(n&&e>n.x2&&e-n.x2<=t.staffInterval*t.minLedgerSeparation){var a=(e-n.x2)/2;n.x2+=a,e-=a}this.ledgerLines.push({x1:e,x2:s,staffPosition:i})},a=e=>{var s=e.element.neume.bounds.x,i=t.staffInterval*O,a=void 0===e.x1?e.element.bounds.x:e.x1,r=void 0===e.x2?e.endElem.bounds.right():e.x2;n(s+a-i,s+r+i,e.staffPosition)},r=e=>{var s=[],i=t.staffInterval*O;if(e.isAccidental&&!e.hidden)for(let t of[!1,!0])z(e,t)&&s.push({x1:e.bounds.x-i,x2:e.bounds.right()+i,isAbove:t});else if(e instanceof Custos){let i=t.staffInterval*E,n=e.staffPosition>=fe(t,!0);(n||e.staffPosition<=fe(t,!1))&&s.push({x1:e.bounds.x-i,x2:e.bounds.right()+(e===this.custos?0:i),isAbove:n})}else if(e.isDivider&&e.ledgerLineExtent){let t=e.ledgerLineExtent;s.push({x1:e.bounds.x+t.x1-i,x2:e.bounds.x+t.x2+i,isAbove:!0})}for(let e of s)n(e.x1,e.x2,fe(t,e.isAbove))},o=[],h=null,l=(e,s,i,n=0)=>{e.setMaxWidth(t,this.staffRight-this.textLeft),e.bounds.x=n,void 0!==i&&(e.bounds.x=(e.bounds.x+i-e.bounds.width)/2);var a=s.bounds.x+e.bounds.right()-this.staffRight;a>0&&(e.bounds.x-=a),s.bounds.x+e.bounds.x<this.textLeft&&(e.bounds.x=this.textLeft-s.bounds.x)},u=this.notationsStartIndex;u<i;u++){var c=s[u];if(c.constructor!==Custos){if(r(c),c.alText)for(var d=0;d<c.alText.length;d++)l(c.alText[d],c);if(c.translationText)for(d=0;d<c.translationText.length;d++){var f=c.translationText[d];if(f.endNeume){let t=f.endNeume.notationIndex;var g=(void 0!==t&&s[t]===f.endNeume?t>=u&&t<i:s.slice(u,i).includes(f.endNeume))?f.endNeume.hasLyrics()?f.endNeume.bounds.x+Math.max(...f.endNeume.lyrics.map(t=>t.bounds.right())):f.endNeume.bounds.right():this.staffRight;l(f,c,g-=c.bounds.x)}else if("center"===t.translationCentering){var p=c.hasLyrics()?c.lyrics[0]:null,m=p?p.bounds.x:0;l(f,c,p?p.bounds.x+p.widthWithoutConnector:c.bounds.width,m)}else l(f,c)}if(c.isNeume){for(d=0;d<c.ledgerLines.length;d++)a(c.ledgerLines[d]);for(d=0;d<c.notes.length;d++){var x,y=c.notes[d];for(0===y.episemata.length&&(o=[]),x=0;x<y.episemata.length;x++){var v=y.episemata[x];v.layoutBounds&&(v.bounds=v.layoutBounds.clone());var b=0;if(o.length>0&&(b=c.bounds.x+v.bounds.x-(o[o.length-1].note.neume.bounds.x+o[o.length-1].bounds.right())),0===o.length||o[o.length-1].positionHint!==v.positionHint||!0===o[o.length-1].terminating||o[o.length-1].alignment===ce.Left||o[o.length-1].alignment===ce.Center||v.alignment===ce.Right||v.alignment===ce.Center||b>2*t.intraNeumeSpacing&&y.glyphVisualizer.glyphCode!==kt.None)o=[v];else{var L;if(L=v.positionHint===Pt.Below?Math.max(v.bounds.y,o[o.length-1].bounds.y):Math.min(v.bounds.y,o[o.length-1].bounds.y),v.bounds.y!==L)v.bounds.y=L;else for(var S=0;S<o.length;S++)o[S].bounds.y=L;var C=c.bounds.x+v.bounds.x-(o[o.length-1].note.neume.bounds.x+o[o.length-1].bounds.x);C<0&&(C*=-1,o[o.length-1].bounds.x-=C),o[o.length-1].bounds.width=C,o.push(v)}}y.slurs&&this.handleSlurs(t,y),y.customLedgerLines&&this.handleCustomLedgerLines(t,y,e),y.braceEnd&&this.handleEndBrace(t,y,u),y.braceStart&&(t.lastStartBrace=h=y.braceStart,h.notationIndex=u)}}}else r(c)}if(this.alignEpisemaBlocks(s.slice(this.notationsStartIndex,i)),null!==h&&this.custos){var w=s[i],P=w&&w.notes&&w.notes[0],N=s[i+1],T=N&&N.notes&&N.notes[0],I=P&&P.braceEnd||w&&w.isAccidental&&T&&T.braceEnd;I?(this.custos.braceEnd=I,this.handleEndBrace(t,this.custos,u)):(this.braceStart=h,this.custos.braceEnd=new BracePoint(this.custos,h.isAbove,h.shape,pe.Right),this.handleEndBrace(t,this.custos,u-1),t.lastStartBrace=new BracePoint(null,h.isAbove,h.shape,pe.Left),t.lastStartBrace.notationIndex=u)}this.custos&&r(this.custos);var A=t.openSlurs||{};for(let e of["above","below"]){let n=A[e];!n||i>=s.length||(this.slurs.push(new Slur(t,this.startX(n),n.y,this.staffRight,n.y,"above"===e)),n.x=null)}var M=t.openLedgerLines||{};for(let n of["above","below"]){let a=M[n];!a||i>=s.length||(e.push({x1:this.startX(a),x2:this.staffRight,staffPosition:fe(t,"above"===n)}),a.x=null)}for(let t of e)t.x1=Math.max(t.x1,this.staffLeft),t.x2=Math.min(t.x2,this.staffRight),this.ledgerLines.push(t)}startX(t){return null===t.x?this.startingClef.bounds.right():t.x}handleCustomLedgerLines(t,e,s){var i=t.openLedgerLines=t.openLedgerLines||{},n=e=>("overhang"===e?O:e)*t.staffInterval;for(let a of e.customLedgerLines){let r=a.isAbove?"above":"below",o=fe(t,a.isAbove),h=e.neume.bounds.x+(a.before?e.bounds.x:e.bounds.right()),l=i[r];"fixed"===a.kind?s.push({x1:h-n(a.left),x2:h+n(a.right),staffPosition:o}):"start"===a.kind?l||(i[r]={x:h-n(a.left),right:a.right}):l&&(s.push({x1:this.startX(l),x2:h+n(l.right),staffPosition:o}),delete i[r])}}alignEpisemaBlocks(t){var e=new Map;for(let s of t)for(let t of s.notes||[])for(let s of t.episemata){let i=s.positionHint!==Pt.Below,n=t.episemaTuning&&t.episemaTuning[i?"above":"below"];n&&n.block&&e.set(n,(e.get(n)||[]).concat(s))}e.forEach(t=>{let e=t.map(t=>t.bounds.y),s=t[0].positionHint===Pt.Below?Math.max(...e):Math.min(...e);for(let e of t)e.bounds.y=s})}handleSlurs(t,e){var s=t.openSlurs=t.openSlurs||{};for(let i of e.slurs){let n=i.isAbove?"above":"below",a=Slur.pointOnNote(t,e,i),r=s[n];if("fixed"===i.kind)this.slurs.push(new Slur(t,a.x,a.y,a.x+i.width*t.staffInterval,a.y-i.height*t.staffInterval,i.isAbove));else if("start"===i.kind)r||(s[n]=a);else if(r){let e=null===r.x?a.y:r.y;this.slurs.push(new Slur(t,this.startX(r),e,a.x,a.y,i.isAbove)),delete s[n]}}}positionNotationElement(t,e,s,i,n,a=[]){a.hasOwnProperty("sum")||(a.sum=0);var r,o={notation:i},h=!1;if(i.hasNoWidth&&i.firstWithNoWidth!==i||!s.firstWithNoWidth?i.bounds.x=s.bounds.right():(i.bounds.x=s.firstWithNoWidth.bounds.x,h=!0),i.constructor===TextOnly&&null===this.extraTextOnlyIndex||!i.hasLyrics()&&s.calculatedTrailingSpace<0&&!Ne(t,s)?(Ne(t,s)&&(i.bounds.x+=s.calculatedTrailingSpace),i.calculatedTrailingSpace=Ne(t,s)?0:s.calculatedTrailingSpace,i.hasLyrics()&&(i.calculatedTrailingSpace-=i.lyrics[0].bounds.width),i.constructor===TextOnly&&1===i.lyrics.length&&i.lyrics[0].setMaxWidth(t,this.staffRight,this.staffRight-ne.getRight(e)-t.minLyricWordSpacing)):h||(i.bounds.x+=s.calculatedTrailingSpace),!s.isDivider&&!s.isAccidental&&this.numNotationsOnLine>0&&be(i)&&(i.bounds.x+=t.intraNeumeSpacing*t.interVerbalMultiplier),i.hasNoWidth||h)o.total=o.condensable=0;else if(null!==this.extraTextOnlyIndex&&i.constructor===TextOnly)i.bounds.x=0,o.total=o.condensable=0;else if(o.total=i.bounds.x-s.bounds.right(),o.condensable=Ne(t,s)?0:o.total*t.condensingTolerance,i.firstOfParentheses||i.nabcNeumes){let e=this.score.notations[s.notationIndex]===s?s.notationIndex:this.notationsStartIndex,n=Math.max(0,Te(this,i.notationIndex-1,e)-s.bounds.right());"neume"===t.nabcAlignment&&(n+=Math.max(0,...(i.nabcNeumes||[]).map(t=>t?-t.bounds.x:0))),i.bounds.x+=n,o.total+=n}const l=()=>this.notationRight(i);var u=()=>{var t=0;for(var n of i.lyrics)n.clear&&(t=Math.max(t,s.bounds.right()-n.getLeft()),e.length&&(t=Math.max(t,ne.getRight(e)-i.bounds.x)));return t},c=i.lyrics.some(t=>t.clear);if(c){let t=u();i.bounds.x+=t,o.total+=t,o.condensable=0}if(0===e.length){var d=l()+i.calculatedTrailingSpace;for(r=0;r<i.lyrics.length;r++){let t=i.lyrics[r],e=t.allowsConnector()&&t.dropCap&&t.originalText&&!t.text;t.setNeedsConnector(e);let s=this.staffLeft-this.paddingLeft;t.getLeft()<s&&(i.bounds.x-=t.getLeft()-s),o.condensable=Math.min(o.condensable,t.getLeft()-s),d=Math.max(d,t.getRight()-(t.protrusionWidth||0))}return!(d>n+a.sum+o.condensable)&&(a.push(o),a.sum+=o.condensable,!0)}if(i.firstOfSyllable&&e.length&&!i.hasLyrics()&&(i.bounds.x=Math.max(i.bounds.x,e[0].getRight()),o.total=i.bounds.x-s.bounds.right(),o.condensable=o.total*t.condensingTolerance),!1===i.hasLyrics())return!(l()+i.calculatedTrailingSpace>n+a.sum+o.condensable)&&(a.push(o),a.sum+=o.condensable,!0);var f=!1;do{var g=!1,p=!1;for(r=0;r<i.lyrics.length;r++){if(!i.lyrics[r].originalText)continue;var m=0;let s=[],n=null;if(r<e.length&&e[r]){m=e[r].getRight();let t=a.length-1;for(;t>=0&&a[t].notation!==e[r].notation;)t--;t>=0?(s=a.slice(t+1),s.sum=Ae(s)):s.sum=0,c&&(s.sum=0)}i.lyrics[r].setNeedsConnector(!1);var x=i.lyrics[r].getLeft();if(e[r]&&!1!==e[r].allowsConnector())if(m+.1>x-s.sum-o.condensable){let t=m-x;if(t<-.1){let e=t/(s.sum+o.condensable),i=0;s.forEach(t=>{i+=e*t.condensable,t.notation.bounds.x+=i})}i.bounds.x+=t,n=0,p=!0,g=t>.5}else{if(t.minLyricWordSpacing<t.hyphenWidth){var y=x-m;y<t.hyphenWidth&&Ie(t,e[r],e.length,y)}if(e[r].setNeedsConnector(!0),(m=e[r].getRight())+.1>x){let t=m-x;i.bounds.x+=t,n=0,g=t>.5}else n=x-m}else{let e=x-m-t.minLyricWordSpacing;if(e<0){let e=m+t.minLyricWordSpacing-x;i.bounds.x+=e,n=0,g=e>.5}else n=e}if(null!==n&&n<s.sum+o.condensable){let t=n/(s.sum+o.condensable);o.condensable*=t,s.sum&&(s.forEach(e=>{e.condensable*=t}),f=!0)}}}while(i.lyrics.length>1&&g&&p);for(f&&(a.sum=Ae(a)),c&&(i.bounds.x+=u()),r=Math.min(i.lyrics.length,e.length)-1;r>=0;r--){let s=e[r];s.needsConnector&&s.connectorWidth&&((y=(x=i.lyrics[r].getLeft())-(m=s.getRight()-s.connectorWidth))>=t.hyphenWidth&&(y=0),s.setConnectorWidth(y))}if(l()+i.calculatedTrailingSpace<n+a.sum+o.condensable&&(n===1/0||ne.getRight(i.lyrics,!0,!0)<=this.staffRight+a.sum+o.condensable)){if(s.isAccidental&&!s.hidden){let t=i.bounds.x-s.bounds.width-s.calculatedTrailingSpace-s.bounds.x;if(s.bounds.x+=t,Math.abs(t)>.1){let t=a[a.length-1];a.sum-=t.condensable,t.condensable=0}}return a.push(o),a.sum+=o.condensable,!0}return!1}repeatVerseNumbers(t,e){var s=this.score.notations,i=s[e];if(t.repeatVerseNumbers&&i.hasLyrics()){var n=!1;i.lyrics.forEach((i,a)=>{if(i.verseNumberInEffect&&i.originalText){for(let t=this.notationsStartIndex;t<e;t++){let e=s[t].lyrics[a];if(e&&e.originalText)return}i.repeatedVerseNumber=i.getRepeatedVerseNumber(t),n=!0}}),n&&i.alignLyrics(t)}}lyricRow(t){return t<this.lyricRows.length?this.lyricRows[t]:this.numLyricLines}bisectNotationAtX(t,e=!0){let s=-1,i=Math.min(this.numNotationsOnLine,1/0),n=s+(i-s>>1),a=this.notationsStartIndex,r=Math.max(0,Math.min(this.numNotationsOnLine,this.score.notations.length-a)),o=t=>t>=0&&t<r?this.score.notations[a+t]:void 0;for(;s<n;){o(n).bounds.x>t?i=n:s=n,n=s+(i-s>>1)}let h=o(n);if(e&&h&&0===h.bounds.width&&n+1<r){let e=o(n+1),s=t-h.bounds.x,i=e.bounds.x-t;0===e.bounds.width&&i<s&&++n}return o(n)}}const Me=-100,Be=-50,ke=-50,Fe=-200,Oe=-200,Ee=1e4,De=.05/.287,ze=.22787/.287,Ve=/(?:\/|\s|\/\[-?(?:\d+\.?\d*|\.\d+)\])$/,Re=["never","allowed","always","own"],We=t=>Math.max(0,t-1),qe=(t,e)=>Math.min(e,t+3);function He(t,e,s){var i=s.read;if(s.toEnd!==(e+i.length===t.length)||e+i.length>t.length)return!1;for(var n=0;n<i.length;n++){var a=t[e+n];if(a!==i[n]||a.layoutId!==s.layoutIds[n])return!1}var r=s.translationEnds;for(n=0;n<r.length;n+=2)if(r[n].translationText[0].endNeume!==r[n+1])return!1;return!0}function Qe(t,e){var s=e,i="useDropCap="+t.useDropCap;for(var n of Object.keys(s)){var a=s[n];"object"==typeof a||"function"==typeof a||Ge.includes(n)||(i+=";"+n+"="+a)}return i}const je=new WeakMap,Ge=["currNotationIndex","textMetricsCacheSize","minLyricWordSpacingRatio"];class LineBreaker{constructor(t,e,s){this.extraLines=2,this.plannedEnds=new Map,this.lineEnds=[],this.touchedFrom=1/0,this.score=t,this.ctxt=e,this.width=s}plannedEnd(t,e){var s=t+":"+e;if(!(this.plannedEnds.has(s)||0===t&&0===e&&this.planAgain())){var i=this.ctxt.activeClef;try{this.plan(t,e)}finally{this.ctxt.activeClef=i}}return this.plannedEnds.get(s)}planAgain(){var t=this.getTrialLines(),e=this.score,s=e.notations,i=[this.width,JSON.stringify(this.getLineExtent(0,0)),e.linesBesideDropCap(),this.extraLines].join(";"),n=s.map(t=>{var e,s;return null===(s=null===(e=t.translationText)||void 0===e?void 0:e[0])||void 0===s?void 0:s.endNeume}),a=t.plans.find(t=>t.key===i&&t.startingClef===e.startingClef&&t.notations.length===s.length&&s.every((e,s)=>e===t.notations[s]&&e.layoutId===t.layoutIds[s]&&n[s]===t.translationEnds[s]));return a?(this.plannedEnds=a.plannedEnds,!0):(t.plans=[...t.plans.filter(t=>t.key!==i).slice(-1),{key:i,startingClef:e.startingClef,notations:s.slice(),layoutIds:s.map(t=>t.layoutId),translationEnds:n,plannedEnds:this.plannedEnds}],!1)}plan(t,e){var s=null,i=null;for(var n of[100,9e3,1/0]){var{best:a,bestLooser:r,farthest:o}=this.findBreaks(t,e,n);if(i=o,a&&(s=r||a),r||a&&n>=9e3)break}for(var h=s||i,l=[];h&&h.previous;h=h.previous)l.unshift(h);var u=e;for(h of l)this.plannedEnds.set(h.previous.line+":"+u,h.position),u=h.position}findBreaks(t,e,s){var i=this.score.notations,n=new Array(i.length+1),a={position:e,line:t,fitness:2,demerits:0,previous:null};n[e]=[a];for(var r=a,o=this.score.linesBesideDropCap(),h=e;h<i.length;h++){var l=n[h];if(l){n[h]=void 0;var u=1/0,c=[],d=[],f=null;for(var g of l)if(!(g.line<o)){u=Math.min(u,g.line);var p=c[g.fitness];(!p||g.demerits<p.demerits)&&(c[g.fitness]=g)}for(g of l)if(!(g.line>=o&&g.line>u+this.extraLines)||c.some(t=>Math.abs(g.line-t.line)<=this.extraLines)){(g.position>r.position||g.position===r.position&&g.demerits<r.demerits)&&(r=g);var m=this.getLineEnds(g.line,h);m!==f&&(f=m,d=this.fitLineEnds(h,m,s));for(var x=0;x<d.length;x+=3){var y=d[x],v=d[x+1],b=d[x+2];Math.abs(v-g.fitness)>1&&(b+=1e4),y===i.length&&h>0&&!this.startsWord(h)&&(b+=this.ctxt.finalHyphenDemerits),b=g.demerits+b;for(var L=g.line+1,S=n[y]||(n[y]=[]),C=0;C<S.length&&(S[C].line!==L||S[C].fitness!==v);)C++;C<S.length&&!(b<S[C].demerits)||(S[C]={position:y,line:L,fitness:v,demerits:b,previous:g})}}}}var w=n[i.length]||[],P=null,N=null;for(g of w)(!P||g.demerits<P.demerits)&&(P=g);for(g of w)g.line-P.line===-1&&(!N||g.demerits<N.demerits)&&(N=g);return{best:P,bestLooser:N,farthest:r}}fit(t,e,s,i){var n,a,r=t[e+7],o=this.width-t[e+(s?2:1)];if(Math.abs(o)<.5&&(o=0),o>=0){var h=t[e+5];s&&4&r&&(h+=De*this.ctxt.staffInterval),a=(n=8&r||0===o?0:h<=0?1e4:Math.min(1e4,100*Math.pow(o/h,3)))>99?0:n>12?1:2}else{var l=t[e+4];if(-o>l)return null;a=(n=100*Math.pow(-o/l,3))>12?3:2}return n>i?null:{badness:n,fitness:a}}fitLineEnds(t,e,s){for(var i=[],n=0;n<e.length&&!(e[n+3]>this.width);n+=8){var a=t+e[n+0],r=e[n+6];if(!(r>-1e4&&this.isBlockedAt(a))){var o=this.fit(e,n,this.hasCustos(3&e[n+7],a),s);if(o){var h=10+o.badness;h=h>=1e4?1e8:h*h,r>0?h+=r*r:r>-1e4&&(h-=r*r),i.push(a,o.fitness,h)}}}return i}getLineExtent(t,e){var s=this.score;0===e&&(t=0);var i=s.lineExtent(this.ctxt,t,this.width),n=0===t&&s.dropCap?(i.left-s.dropCap.bounds.width)/2:0;return{staffLeft:i.left,paddingLeft:n,staffRight:i.right}}getLineEnds(t,e){for(var s=this.getLineExtent(t,e),i=0;i<this.lineEnds.length;i++){var n=this.lineEnds[i].extent;if(n.staffLeft===s.staffLeft&&n.paddingLeft===s.paddingLeft&&n.staffRight===s.staffRight)break}i===this.lineEnds.length&&this.lineEnds.push({extent:s,ends:[]});var a=this.lineEnds[i].ends;return a[e]||(a[e]=this.getTrialLine(e,s).ends)}getTrialLine(t,e){for(var s=this.getTrialLines(),i=this.score.notations[t],n=s.lines.get(i)||[],a=n.length-1;a>=0;a--){var r=n[a];if(r.staffLeft===e.staffLeft&&r.paddingLeft===e.paddingLeft&&r.narrowest<=this.width&&this.width<=r.widest&&this.isUpToDate(r,t))return r}var o=this.layOutLineFrom(t,e);return n=n.filter(t=>t.staffLeft!==e.staffLeft||t.paddingLeft!==e.paddingLeft||t.narrowest<o.narrowest||t.widest>o.widest),s.lines.set(i,[...n.slice(-3),o]),o}isUpToDate(t,e){if(!He(this.score.notations,We(e),t))return!1;var s=this.clefAt(e);return s===t.clef&&s.layoutId===t.clefLayoutId}getTrialLines(){if(!this.trialLines){var t=this.getSettings(),e=this.score.notations;for(var s of(this.trialLines=je.get(this.score),this.trialLines&&this.trialLines.settings===t||(this.trialLines={settings:t,lines:new Map,plans:[]},je.set(this.score,this.trialLines)),this.trialLines.lines.keys()))e[s.notationIndex]!==s&&this.trialLines.lines.delete(s)}return this.trialLines}getSettings(){return Qe(this.score,this.ctxt)}layOutLineFrom(t,e){this.touchedFrom=Math.min(this.touchedFrom,t-1);var s=this.ctxt,i=this.score,n=i.notations,a=[],r=new ChantLine(i);r.notationsStartIndex=t,r.staffLeft=e.staffLeft,r.paddingLeft=e.paddingLeft,r.staffRight=e.staffRight,r.extraTextOnlyIndex=null,r.extraTextOnlyLyricIndex=0;var o=t>0?we(s,n[t-1]):null,h=t,l=s.activeClef=this.clefAt(t),u=l===n[h];u&&(this.isClefLineBreak(h)&&h++,h++,r.notationsStartIndex=h),r.startingClef=s.activeClef.clone(),r.startingClef.performLayout(s),"visible"===s.clefVisibility||u||r.startingClef.hide(s),r.startingClef.bounds.x=r.staffLeft;var c=r.startingClef;o&&ne.setNotation(o,c),c.hasLyrics()&&ne.mergeIn(r.lastLyrics,c.lyrics);for(var d=Object.assign([],{sum:0}),f={prev:null,prevLyrics:[],accidental:null,sum:0,custos:null,sumWithoutCustos:0},g=c,p=null,m=-1/0,x=t-1,y=1/0,v=!1,b=[],L=(e,s,i)=>this.addLineEnd(a,t,r,e,d.sum,m,f,s,i);h<n.length;h++){if(ve(c)||c.constructor===TextOnly||(g=c),c=n[h],r.numNotationsOnLine>0){if(this.isClefLineBreak(h)){r.clefLineBreak=n[h+1],L(h,-1e4,!r.clefLineBreak.justify);break}var S=this.getPenalty(h,p);S<Ee&&L(h,S,!1)}if(Pe(s,c),r.repeatVerseNumbers(s,h),c.isAccidental&&c.soft?c.setHidden(s,!r.isSoftAccidentalVisible(h)):c.isNeume&&r.spaceNeumeBeforeSoftAccidental(s,h),ve(c)?c.bounds.x=g.bounds.right()+g.calculatedTrailingSpace:r.positionNotationElement(s,r.lastLyrics,g,c,1/0,d),c.constructor===TextOnly&&1===c.lyrics.length&&(v=!0),x=h,c.hasLyrics()&&ne.mergeIn(r.lastLyrics,c.lyrics),p&&c===p.translationText[0].endNeume?p=null:c.translationText&&c.translationText.length&&c.translationText[0].endNeume&&(p=c),c.translationText&&c.translationText.length&&b.push(c,c.translationText[0].endNeume),r.numNotationsOnLine++,this.addToStretch(r,f,h),c.isClef&&(s.activeClef=c),c.constructor===ChantLineBreak){L(h+1,-1e4,!c.justify);break}c.constructor===Custos?r.custos=c:c.isNeume&&(r.custos=null);var C=c.bounds.right();if(c.hasLyrics()&&(C=Math.max(C,ne.getRight(c.lyrics,!1,!0))),(m=Math.max(m,C-d.sum))>r.staffRight){y=r.staffRight;break}}h===n.length&&L(n.length,-1e4,!0);var w=We(t),P=qe(x,n.length),N=n.slice(w,P);return{staffLeft:e.staffLeft,paddingLeft:e.paddingLeft,clef:l,clefLayoutId:l.layoutId,read:N,layoutIds:N.map(t=>t.layoutId),toEnd:P===n.length,translationEnds:b,widest:v?e.staffRight:y,narrowest:v?e.staffRight:0,ends:a.slice()}}addToStretch(t,e,s){var i=this.score.notations[s],n=i;if(e.accidental)n=e.accidental,e.accidental=null;else if(i.isAccidental)return void(e.accidental=i);var a=e.prev;if(e.prev=i,a&&(ne.mergeIn(e.prevLyrics,a.lyrics),t.canJustifyBefore(a,n,i,s,e.prevLyrics))){var r=this.getStretchBefore(n);i.hasLyrics()||i.constructor!==Custos?e.sumWithoutCustos+=r:(e.custos=i,e.sumWithoutCustos=e.sum),e.sum+=r}}getStretchBefore(t){var e,s=this.score.notations,i=null!==(e=t.notationIndex)&&void 0!==e?e:s.indexOf(t);return(t.isDivider||i>0&&s[i-1].isDivider?ze:De)*this.ctxt.staffInterval}clefAt(t){var e=this.score.notations[t];return e.isClef?e:this.clefBefore(t)}clefBefore(t){if(!this.clefs){var e=this.score.startingClef;this.clefs=this.score.notations.map(t=>{var s=e;return t.isClef&&(e=t),s})}return this.clefs[t]}isClefLineBreak(t){return Le(this.score.notations,t)}getPenalty(t,e){var s=this.score.notations,i=s[t-1],n=s[t],a=n.notes&&n.notes[0];if(n.isDivider||n.constructor===Custos||n.constructor===ChantLineBreak||i.firstWithNoWidth||e||a&&(a.shape===cn.Quilisma||a.shape===cn.Inclinatum)||i.keepWithNext&&!i.allowLineBreakBeforeNext)return Ee;if(n.isClef)return Oe;if(i.isDivider)return Fe;if(n.firstOfParentheses)return this.startsWord(t)?Me:Be;var r=i.notes&&i.notes[i.notes.length-1];return i.allowLineBreakBeforeNext&&r&&Ve.test(r.sourceGabc)?ke:Ee}isBlocked(t){var e=this.score.notations,s=e[t-1],i=e[t];if(Se(e,t)||this.leavesTooLittleForLastLine(t)||this.keepsInArea(t-1))return!0;if(i.isClef||s.isDivider||i.firstOfParentheses)return!1;var n=this.getNoteCounts(),a=n.notesBeforeInSyllable[t],r=n.notesInSyllable[t];return r<10||a<4||r-a<4}keepsInArea(t){return this.areaLine||(this.areaLine=new ChantLine(this.score)),this.areaLine.keepsInArea(t)}startsWord(t){var e=this.score.notations,s=e[t-1],i=e[t];return i.mapping&&s.mapping?i.mapping!==s.mapping:be(i)}leavesTooLittleForLastLine(t){var e=this.ctxt;if(!e.minSyllablesLastLine||!e.minNotesLastLine)return!1;var s=this.getNoteCounts();return s.syllablesFrom[t]<e.minSyllablesLastLine&&s.notesFrom[t]<e.minNotesLastLine}getNoteCounts(){if(!this.noteCounts){for(var t=this.score.notations,e=t.length,s=this.noteCounts={notesInSyllable:new Array(e),notesBeforeInSyllable:new Array(e),syllablesFrom:new Array(e+1).fill(0),notesFrom:new Array(e+1).fill(0)},i=0,n=0,a=t=>{for(var e=i;e<t;e++)s.notesInSyllable[e]=n},r=0;r<e;r++){var o=t[r];o.firstOfParentheses&&r>0&&(a(r),i=r,n=0),s.notesBeforeInSyllable[r]=n,o.isNeume&&(n+=o.notes.length)}for(a(e),r=e-1;r>=0;r--)s.syllablesFrom[r]=s.syllablesFrom[r+1]+(t[r].hasLyrics()?1:0),s.notesFrom[r]=s.notesFrom[r+1]+(t[r].notes||[]).length}return this.noteCounts}addLineEnd(t,e,s,i,n,a,r,o,l){var u=this.ctxt,c=this.score.notations,d=c[i-1],f=d.bounds.right()+d.calculatedTrailingSpace,g=s.lastLyrics.length?ne.getRight(s.lastLyrics,!0,!0):0,p="never";s.custos?(p="own",f+=s.custos.bounds.width+s.custos.leadingSpace,s.custos.hasLyrics()&&(g=ne.getRight(s.custos.lyrics,!1,!0))):i<c.length&&(p=s.eolCustos(u));var m=Math.max(g,f),x=c[i],y=!!x&&be(x);t.push(i-e,m,"own"===p?m:Math.max(g,f+h.CustosLong.bounds.width*u.glyphScaling),a,n,this.getStretch(s,r),o,Re.indexOf(p)|(y?4:0)|(l?8:0))}getStretch(t,e){if(e.accidental){var s=0;for(var i of(t.findNeumesToJustify([]),t.toJustify))s+=this.getStretchBefore(i);return s}return e.custos&&e.custos===t.custos?e.sumWithoutCustos:e.sum}getAfter(){var t=this.score.notations;return this.after||(this.after={blocked:new Uint8Array(t.length),custos:new Uint8Array(t.length)})}isBlockedAt(t){var e=this.getAfter();return e.blocked[t]||(e.blocked[t]=this.isBlocked(t)?2:1),2===e.blocked[t]}hasCustos(t,e){var s=Re[t];if("own"===s||"never"===s)return"own"===s;var i=this.getAfter(),n=this.score.notations;if(!i.custos[e]){for(var a=!1,r=e;r<n.length&&!a;r++)a=!!n[r].isNeume;i.custos[e]=a?Ce(n,e)?3:2:1}return"always"===s?i.custos[e]>1:3===i.custos[e]}}function $e(t,e){return t.liquescent&un.Ascending?kt.PunctumQuadratumAscLiquescent:t.liquescent&un.Descending?kt.PunctumQuadratumDesLiquescent:e}function Ue(t,e){if(e.liquescent&(un.Ascending|un.Descending))return kt.PunctumInclinatumAuctus;switch(t.inclinatumLeaning&&(e.leaning||e.automaticLeaning)){case"ascending":return kt.PunctumInclinatumAscendens;case"descending":return kt.PunctumInclinatumDescendens;default:return kt.PunctumInclinatum}}const _e=Math.atan(2/3),Je=6*Math.PI/180;function Xe(t){return Dt[t.glyphVisualizer.glyphCode]||0}function Ze(t,e){return e.liquescent&un.Small?kt.TerminatingAscLiquescent:e.liquescent&un.Descending?kt.PunctumQuadratumDesLiquescent:e.staffPosition-t.staffPosition>1?kt.PodatusUpper:kt.PodatusUpperShort}function Ye(t){return t.liquescent&un.Small?kt.TerminatingDesLiquescent:t.liquescent&un.Ascending?kt.PunctumQuadratumAscLiquescent:t.liquescent&un.Descending?kt.PunctumQuadratumDesLiquescent:kt.PunctumQuadratum}function Ke(t){return t.liquescent&un.Small?kt.PunctumQuadratumDesLiquescent:kt.PunctumQuadratum}function ts(t){return t.liquescent===un.InitioDebilis?kt.TerminatingDesLiquescent:t.shape===cn.Quilisma?kt.Quilisma:kt.PunctumQuadratum}function es(t,e){return t.shape===cn.Default&&e.liquescent===un.None&&!!e.shapeHint&&e.shapeHint.split(",").includes("stroke")}function ss(t){return t.liquescent!==un.None?t.shape===cn.Inclinatum?kt.PunctumInclinatumLiquescent:t.shape===cn.Oriscus?kt.OriscusLiquescent:t.liquescent&un.Ascending?kt.PunctumQuadratumAscLiquescent:t.liquescent&un.Descending?kt.PunctumQuadratumDesLiquescent:kt.PunctumQuadratumLiquescent:t.shape===cn.Inclinatum?kt.PunctumInclinatum:t.shape===cn.Quilisma?kt.Quilisma:kt.PunctumQuadratum}let is=class NeumeBuilder{constructor(t,e,s=0){this.ctxt=t,this.neume=e,this.x=s,this.lastNote=null,this.lineIsHanging=!1,this.minX=0}lineFrom(t){var e=this.ctxt.notations[this.ctxt.currNotationIndex-1];return 0===this.x&&e&&e.notes&&0===e.trailingSpace&&!this.neume.notes[0].fused?(this.lastNote=e.notes.slice(-1)[0],this.minX=-this.ctxt.neumeLineWeight):(this.lastNote=t,this.lineIsHanging=!0),this}needsLineTo(t,e){return null!==this.lastNote&&(this.ctxt.glyphMultiplier<1||this.lineIsHanging||e&&0!==(t.shapeModifiers&dn.Stemmed)||this.lastNote.glyphVisualizer&&"right"===this.lastNote.glyphVisualizer.align||Math.abs(this.lastNote.staffPosition-t.staffPosition)>1)}addLineTo(t){var e=new NeumeLineVisualizer(this.ctxt,this.lastNote,t,this.lineIsHanging);return e.bounds.x=Math.max(this.minX,this.x-e.bounds.width),this.neume.addVisualizer(e),e}withSalicusStart(t,e){return this.noteAt(t,kt.PunctumQuadratum),e.shapeModifiers&dn.Stemmed||this.advanceBy(this.ctxt.intraNeumeSpacing),this.noteAt(e,Oriscus.getGlyphCode(e,!0))}noteAt(t,e,s=!0,i=!0){if(!t)throw"NeumeBuilder.noteAt: note must be a valid note";if(!e)throw"NeumeBuilder.noteAt: glyph must be a valid glyph code";t.setGlyph(this.ctxt,e);var n="right"===t.glyphVisualizer.align;if(s&&this.needsLineTo(t,i)){var a=this.addLineTo(t);n||(this.x=a.bounds.x)}let r=0;if(t.shapeModifiers&dn.Linea){var o=new LineaVisualizer(this.ctxt,t);this.neume.addVisualizer(o),t.origin.x+=o.origin.x,r=o.origin.x}return n&&this.lastNote?t.bounds.x=this.x-t.bounds.width:(t.bounds.x=this.x+r,this.x+=t.bounds.width+r),this.neume.addVisualizer(t),this.lastNote=t,this.lineIsHanging=!1,this}virgaAt(t,e=!0){this.noteAt(t,t.shapeModifiers&dn.Reverse?$e(t,kt.PunctumQuadratum):kt.PunctumQuadratum);var s=new VirgaLineVisualizer(this.ctxt,t);return this.x-=s.bounds.width,t.shapeModifiers&dn.Reverse?s.bounds.x=0:s.bounds.x=this.x,this.neume.addVisualizer(s),this.lastNote=t,this.lineIsHanging=!1,this}oriscusAt(t,e,s=!0,i=0){if(this.noteAt(t,e,s),t.shapeModifiers&dn.Stemmed){var n=new VirgaLineVisualizer(this.ctxt,t,i);n.bounds.x=t.bounds.x,this.neume.addVisualizer(n)}return this}lineaAt(t){t.setGlyph(this.ctxt,kt.Linea);var e=new LineaVisualizer(this.ctxt,t,!0);return e.bounds.x=this.x,this.neume.addVisualizer(e),t.bounds.x=e.bounds.x+e.origin.x,t.bounds.y=e.bounds.y+e.bar.y,t.bounds.width=e.bounds.width-2*e.origin.x,t.bounds.height=e.bar.height,t.origin.x=e.origin.x+t.bounds.width/2,t.origin.y=t.bounds.height/2,this.neume.addVisualizer(t),this.x+=e.bounds.width,this.lastNote=t,this.lineIsHanging=!1,this}advanceBy(t){return this.lastNote=null,this.lineIsHanging=!1,this.x+=t,this}withLineEndingAt(t){if(null!==this.lastNote){var e=new NeumeLineVisualizer(this.ctxt,this.lastNote,t,!0);return this.x-=e.bounds.width,e.bounds.x=this.x,this.neume.addVisualizer(e),this.lastNote=t,this}}withPodatus(t,e){var s,i;if(t.liquescent===un.InitioDebilis)s=e.liquescent===un.None?kt.PunctumQuadratum:kt.PunctumQuadratumDesLiquescent,i=kt.TerminatingDesLiquescent;else if(e.liquescent&un.Small)i=kt.BeginningAscLiquescent,s=kt.TerminatingAscLiquescent;else if(e.liquescent&un.Ascending)i=kt.PunctumQuadratum,s=kt.PunctumQuadratumAscLiquescent;else if(e.liquescent&un.Descending)i=kt.PunctumQuadratum,s=kt.PunctumQuadratumDesLiquescent;else{const n=e.staffPosition-t.staffPosition+(this.ctxt.glyphMultiplier<=.85?1:0);i=n>1?kt.PodatusLower:kt.PodatusLowerShort,s=n>1?kt.PodatusUpper:kt.PodatusUpperShort}return t.shape===cn.Quilisma&&(i=kt.Quilisma),!t.quilismaQuadratum||e.liquescent&un.Small||(s=$e(e,kt.PunctumQuadratum)),this.noteAt(t,i).noteAt(e,s),this.lastNote=null,this}withPesQuassus(t,e){return this.noteAt(t,t.shape===cn.Oriscus?Oriscus.getGlyphCode(t,!0):kt.PunctumQuadratum,!0,!1),e.staffPosition-t.staffPosition===1?this.virgaAt(e):this.noteAt(e,e.liquescent===un.LargeDescending?kt.PunctumQuadratumDesLiquescent:kt.PunctumQuadratum).withLineEndingAt(t),this}withClivisUpper(t,e,s=kt.PunctumQuadratum){return t.shape===cn.Oriscus?this.oriscusAt(t,Oriscus.getGlyphCode(t,!1),!1):(e&&(this.lineFrom(e),this.lineIsHanging=e.staffPosition<t.staffPosition,e.liquescent&un.Small&&(s=kt.BeginningDesLiquescent)),this.noteAt(t,s)),this}withClivisLower(t){var e;return e=t.liquescent&un.Small?kt.TerminatingDesLiquescent:t.liquescent===un.Ascending?kt.PunctumQuadratumAscLiquescent:t.liquescent===un.Descending?kt.PunctumQuadratumDesLiquescent:kt.PunctumQuadratum,this.noteAt(t,e)}withClivis(t,e){return this.withClivisUpper(t,e),this.withClivisLower(e),this.lastNote=null,this}withInclinata(t){var e=t[0].staffPosition,s=t[0].staffPosition,i=h.PunctumInclinatum.bounds.width*this.ctxt.glyphScaling;const n=[];let a,r=-1;t.forEach((t,e)=>{t.inclinataFlags&&(a=a||t.inclinataFlags,r=e)});for(var o=0;o<t.length;o++,s=e){var l=t[o];l.liquescent&un.Small?l.setGlyph(this.ctxt,kt.PunctumInclinatumLiquescent):l.liquescent&un.Large?l.setGlyph(this.ctxt,kt.Stropha):l.setGlyph(this.ctxt,Ue(this.ctxt,l)),e=l.staffPosition;var u=Math.abs(s-e);if(0===u)u=1.1;else u*=(u>=1?2:4)/3;if(o>0){let n=(Xe(t[o-1])||Xe(l))*Math.sign(e-s);n&&(u*=Math.tan(_e+n*Je)/Math.tan(_e)),this.x+=i*u}l.bounds.x=this.x,this.neume.addVisualizer(l),o<=r&&n.push(l)}if(n.length){const t=n[0],e=n[n.length-1],s=t=>t.bounds.x+function(t,e){return Xe(e)*Math.sin(Je)*h.PunctumInclinatum.origin.y*t.glyphScaling}(this.ctxt,t),i={x:s(t),staffPosition:t.staffPosition+4},r={x:s(e),staffPosition:e.staffPosition+4},o=t=>t===i.x?i.staffPosition:i.staffPosition+(t-i.x)/(r.x-i.x)*(r.staffPosition-i.staffPosition);for(const t of n){var c=new NeumeLineVisualizer(this.ctxt,t,o(s(t)));c.bounds.x=s(t)+t.bounds.width/2-c.bounds.width/2,this.neume.addVisualizer(c)}for(;a>0;){let s=new NeumeBeamVisualizer(this.ctxt,i.x+t.bounds.width/2,r.x+e.bounds.width/2,i.staffPosition,r.staffPosition,--a);this.neume.addVisualizer(s)}}return this}withPorrectusSwash(t,e){return this.needsLineTo(t,!1)&&(this.x=this.addLineTo(t).bounds.x),t.setGlyph(this.ctxt,function(t,e){return Ft(t.staffPosition-e.staffPosition,0!==((t.shapeModifiers|e.shapeModifiers)&dn.Cavum))}(t,e)),t.bounds.x=this.x,e.setGlyph(this.ctxt,kt.None),this.x=t.bounds.right(),e.bounds.x=this.x-e.bounds.width,this.neume.addVisualizer(t),this.neume.addVisualizer(e),this.lastNote=e,this.lineIsHanging=!1,this}};class Neume extends ChantNotationElement{constructor(t=[]){super(),this.isNeume=!0,this.notes=t;for(var e=0;e<t.length;e++)t[e].neume=this}addNote(t){t.neume=this,this.notes.push(t)}performLayout(t){super.performLayout(t)}finishLayout(t){var e=this.layoutLeftBracket(t),s=this.bounds.right();this.ledgerLines=this.drawnLedgerLines(t),this.positionMarkings();for(var i=0;i<this.notes.length;i++){var n,a=this.notes[i];for(n=0;n<a.episemata.length;n++)a.episemata[n].performLayout(t),this.addVisualizer(a.episemata[n]);for(n=0;n<a.morae.length;n++)a.morae[n].performLayout(t),this.addVisualizer(a.morae[n]),s=Math.max(s,a.morae[n].bounds.right());a.ictus&&(a.ictus.performLayout(t),this.addVisualizer(a.ictus)),a.accent&&(a.accent.performLayout(t),this.addVisualizer(a.accent)),a.choralSign&&(a.choralSign.performLayout(t),this.addVisualizer(a.choralSign)),a.choralNabc&&(a.choralNabc.performLayout(t),a.choralNabc.neumes&&this.addVisualizer(a.choralNabc))}this.layoutRightBracket(t,s),this.origin.x=this.notes[0].origin.x+e,this.origin.y=this.notes[0].origin.y,super.finishLayout(t)}layoutLeftBracket(t){var e=this.notes[0].bracketRanges;if(!e||!e.start)return 0;for(var s=new NoteBracket(t,!1,e.start.low,e.start.high),i=s.bounds.width,n=0;n<this.visualizers.length;n++)this.visualizers[n].bounds.x+=i;return this.bounds.x+=i,this.addVisualizer(s),i}layoutRightBracket(t,e){var s=this.notes[this.notes.length-1].bracketRanges;if(s&&s.end){var i=new NoteBracket(t,!0,s.end.low,s.end.high);i.bounds.x=e,this.addVisualizer(i)}}drawnLedgerLines(t){var e=[],s=this.notes||[],i=t=>!!t&&!!t.glyphVisualizer&&!!t.glyphVisualizer.porrectusNoteDiff,n=e=>e.staffPosition>fe(t,!1)&&e.staffPosition<fe(t,!0);return s.forEach((a,r)=>{for(let o of[!0,!1]){if(!z(a,o))continue;let h=fe(t,o),l={element:a,endElem:a,staffPosition:h},u=t.glyphPunctumWidth*t.glyphScaling;if(i(a)&&this.isClivisStroke(r))l.x1=a.bounds.x,l.x2=a.bounds.x+u;else if(i(s[r-1])&&this.isClivisStroke(r-1))l.x2=s[r-1].bounds.right(),l.x1=l.x2-u;else if(i(s[r-1])){let t=s[r-1];if(!n(t)||z(t,o))continue;l.element=l.endElem=t}else if(i(s[r-2])&&!this.isClivisStroke(r-2)&&(!o||s[r-1].staffPosition>=h))continue;e.push(l)}}),e}isClivisStroke(t){return t===this.notes.length-2}resetDependencies(){}build(t){return new is(t,this)}positionEpisemata(t,e){var s;for(s=0;s<t.episemata.length;s++)t.episemata[s].positionHint===Pt.Default&&(t.episemata[s].positionHint=e);return t.choralSign&&(t.choralSign.positionHint=e),t.choralNabc&&(t.choralNabc.positionHint=e),t.episemata.length}positionEpisemataAbove(t){return this.positionEpisemata(t,Pt.Above)}positionEpisemataBelow(t){return this.positionEpisemata(t,Pt.Below)}positionPodatusEpisemata(t,e){this.positionEpisemataBelow(t),this.positionEpisemataAbove(e),e.ictus&&(e.ictus.positionHint=Pt.Above)}positionInclinataMorae(t){if(!((t=t.slice(-2)).length<2||t[1].staffPosition>t[0].staffPosition)){var e,s=t[1],i=t[0];1===Math.abs(s.staffPosition%2)&&i.staffPosition-s.staffPosition===1&&s.morae.length>0&&(e=s.morae.slice(-1)[0]).positionHint===Pt.Default&&(e.positionHint=Pt.Below)}}positionPodatusMorae(t,e){var s;1===Math.abs(t.staffPosition%2)&&(1===t.morae.length?s=t.morae[0]:e.morae.length>1&&(s=e.morae[0]),s&&s.positionHint===Pt.Default&&(s.positionHint=Pt.Below)),t.morae.length>0&&0===e.morae.length&&(t.morae[0].ignoreBounds=!0)}positionPodatusMarkings(t,e){this.positionPodatusEpisemata(t,e),this.positionPodatusMorae(t,e)}positionTorculusMarkings(t,e,s){var i=this.positionClivisMarkings(e,s);return i=this.positionEpisemata(t,i?Pt.Above:Pt.Below)&&i}positionClivisMorae(t,e){var s=t.morae.concat(e.morae);e.morae.length&&t.staffPosition-e.staffPosition===1&&1===Math.abs(e.staffPosition%2)&&(s.slice(-1)[0].positionHint=Pt.Below)}positionClivisEpisemata(t,e){var s=this.positionEpisemataAbove(t);return this.positionEpisemata(e,s?Pt.Above:Pt.Below),s}positionClivisMarkings(t,e){return this.positionClivisMorae(t,e),this.positionClivisEpisemata(t,e)}positionPorrectusMarkings(t,e,s){this.positionClivisEpisemata(t,e),this.positionPodatusMarkings(e,s)}positionPorrectusFlexusMarkings(t,e,s,i){var n=this.positionEpisemataAbove(t);n=this.positionClivisMarkings(s,i)||n,this.positionEpisemata(e,n?Pt.Above:Pt.Below)}positionMarkings(){}}class Apostropha extends Neume{positionMarkings(){for(var t=Pt.Above,e=0;e<this.notes[0].episemata.length;e++)this.notes[0].episemata[e].positionHint===Pt.Default?this.notes[0].episemata[e].positionHint=t:t=this.notes[0].episemata[e].positionHint,t=t===Pt.Above?Pt.Below:Pt.Above}performLayout(t){super.performLayout(t),this.build(t).noteAt(this.notes[0],Apostropha.getNoteGlyphCode(this.notes[0])),this.finishLayout(t)}static getNoteGlyphCode(t){return t.shape===cn.Stropha?t.liquescent&(un.Ascending|un.Descending)?kt.StrophaLiquescent:kt.Stropha:$e(t,kt.PunctumQuadratum)}}class Bivirga extends Neume{positionMarkings(){this.positionEpisemataAbove(this.notes[0]),this.positionEpisemataAbove(this.notes[1])}performLayout(t){super.performLayout(t),this.build(t).virgaAt(this.notes[0]).advanceBy(t.intraNeumeSpacing).virgaAt(this.notes[1]),this.finishLayout(t)}}class Trivirga extends Neume{positionMarkings(){this.positionEpisemataAbove(this.notes[0]),this.positionEpisemataAbove(this.notes[1]),this.positionEpisemataAbove(this.notes[2])}performLayout(t){super.performLayout(t),this.build(t).virgaAt(this.notes[0]).advanceBy(t.intraNeumeSpacing).virgaAt(this.notes[1]).advanceBy(t.intraNeumeSpacing).virgaAt(this.notes[2]),this.finishLayout(t)}}class Climacus extends Neume{positionMarkings(){for(var t=0;t<this.notes.length;t++)this.positionEpisemataAbove(this.notes[t]);this.positionInclinataMorae(this.notes)}performLayout(t){super.performLayout(t),this.build(t).virgaAt(this.notes[0]).advanceBy(t.intraNeumeSpacing).withInclinata(this.notes.slice(1)),this.finishLayout(t)}}class Clivis extends Neume{positionMarkings(){this.positionClivisMarkings(this.notes[0],this.notes[1])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1];es(e,s)?this.build(t).lineFrom(s).withPorrectusSwash(e,s):this.build(t).withClivis(e,s),this.finishLayout(t)}}class Ancus extends Neume{positionMarkings(){this.positionClivisMarkings(this.notes[0],this.notes[2]),this.positionClivisMarkings(this.notes[1],this.notes[2])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2],n=this.build(t);n.withClivisUpper(e,s);let a=kt.PunctumQuadratum;i.liquescent&un.Small&&(a=kt.BeginningDesLiquescent),e.staffPosition-s.staffPosition>1?n.withClivisUpper(s,e,a):n.withClivisUpper(s,null,a),n.withClivisLower(i),n.lastNote=null,this.finishLayout(t)}}class Distropha extends Neume{positionMarkings(){this.positionEpisemataAbove(this.notes[0]),this.positionEpisemataAbove(this.notes[1])}performLayout(t){super.performLayout(t);let e=this.notes.map(t=>Apostropha.getNoteGlyphCode(t)),s=t.intraNeumeSpacing;e.slice(0,2).forEach(e=>{e!==kt.Stropha&&e!==kt.StrophaLiquescent||(s-=t.intraNeumeSpacing/4)}),this.build(t).noteAt(this.notes[0],e[0]).advanceBy(s).noteAt(this.notes[1],e[1]),this.finishLayout(t)}}const ns={Punctum:"punctum",Flexus:"flexus",Pes:"pes",Porrectus:"porrectus",Virga:"virga",VirgaReversa:"virgaReversa"};function as(t){return t.staffPosition-(t.staffPositionOffset||0)}function rs(t){return t.episemata.some(t=>t.positionHint===Pt.Above)}class FusedNeume extends Neume{constructor(t=[]){for(var e=[],s=0;s<t.length;s++)e.push(...t[s].notes);super(e),this.glyphs=t,this.fusedToNext=!1,this.fusedToPrevious=!1}isClivisStroke(t){var e=this.notes[t],s=this.glyphs.findIndex(t=>t.notes[0]===e);return s>=0&&this.glyphs[s].kind===ns.Flexus&&FusedNeume.fusedShift(this.glyphs,s+1,this.fusedToNext)<=0}static fusedShift(t,e,s=!1){var i=t[e],n=t[e-1];if(!i||!n||!i.fused)return 0;var a=i.notes[0],r=n.notes[n.notes.length-1],o=e+1<t.length?t[e+1].fused:s;if(r.liquescent&~un.InitioDebilis)return 0;switch(i.kind){case ns.Pes:case ns.Porrectus:if(o)return 0;break;case ns.VirgaReversa:return 0}if(a.shape===cn.Quilisma||a.quilismaQuadratum)return 0;switch(n.kind){case ns.Punctum:case ns.Flexus:case ns.VirgaReversa:break;default:return 0}var h=as(a)-as(r);if(Math.abs(h)>5)return 0;if(h>0&&n.kind===ns.VirgaReversa)return 0;if(h<0){if(i.kind===ns.Pes)return i.notes[1].liquescent&un.Small||a.shape===cn.Oriscus?h:0;if(o&&i.kind===ns.Flexus||i.kind===ns.Porrectus||n.kind===ns.Punctum&&n.notes[0].liquescent===un.InitioDebilis)return 0}return h}static joinsPrevious(t,e,s=!1){var i=FusedNeume.fusedShift(t,e,s);if(i>0)return!0;if(0===i)return!1;var n=t[e-1];return n.kind!==ns.Flexus&&n.notes[0].shape!==cn.Quilisma&&!n.notes[0].quilismaQuadratum}positionMarkings(){for(var t=this.glyphs,e=t.length-1;e>=0;e--){var s=t[e].notes,i=t[e+1];switch(t[e].kind){case ns.Punctum:(0===e?!this.fusedToPrevious:FusedNeume.fusedShift(t,e,this.fusedToNext)<0)&&FusedNeume.fusedShift(t,e+1,this.fusedToNext)>0?this.positionEpisemata(s[0],rs(i.notes[0])?Pt.Above:Pt.Below):this.positionEpisemataAbove(s[0]);break;case ns.Flexus:FusedNeume.joinsPrevious(t,e+1,this.fusedToNext)&&rs(i.notes[0])&&this.positionEpisemataAbove(s[1]),this.positionClivisMarkings(s[0],s[1]);break;case ns.Pes:this.positionPodatusMarkings(s[0],s[1]);break;case ns.Porrectus:this.positionPorrectusMarkings(s[0],s[1],s[2]);break;default:this.positionEpisemataAbove(s[0])}}}performLayout(t){super.performLayout(t);for(var e=this.build(t),s=this.glyphs,i=0;i<s.length;i++){var n=s[i],a=n.notes;switch(FusedNeume.joinsPrevious(s,i,this.fusedToNext)||(e.lastNote=null),n.kind){case ns.Punctum:a[0].linea?e.lineaAt(a[0]):n.fused||a[0].shape!==cn.Oriscus?e.noteAt(a[0],this.getNoteGlyphCode(t,a[0]),!0,!1):e.oriscusAt(a[0],this.getNoteGlyphCode(t,a[0]),!0,FusedNeume.fusedShift(s,i+1,this.fusedToNext));break;case ns.Virga:e.virgaAt(a[0]),e.x=a[0].bounds.right();break;case ns.VirgaReversa:e.noteAt(a[0],kt.PunctumQuadratum);var r=new VirgaLineVisualizer(t,a[0],FusedNeume.fusedShift(s,i+1,this.fusedToNext));r.bounds.x=a[0].bounds.x,this.addVisualizer(r);break;case ns.Flexus:this.withFlexus(e,n,FusedNeume.fusedShift(s,i+1,this.fusedToNext));break;case ns.Pes:this.withPes(e,a[0],a[1]);break;case ns.Porrectus:n.fused||e.lineFrom(a[1]),e.withPorrectusSwash(a[0],a[1]).noteAt(a[2],Ze(a[1],a[2]))}}this.finishLayout(t)}withFlexus(t,e,s){var i=e.notes[0],n=e.notes[1];if(s>0&&i.shape!==cn.Oriscus||0===s&&es(i,n))return e.fused||t.lineFrom(n),void t.withPorrectusSwash(i,n);e.fused?i.shape===cn.Oriscus?t.noteAt(i,Oriscus.getGlyphCode(i,!1),!0,!1):t.noteAt(i,n.liquescent&un.Small?kt.BeginningDesLiquescent:kt.PunctumQuadratum):t.withClivisUpper(i,n),t.withClivisLower(n)}withPes(t,e,s){e.shape!==cn.Oriscus?t.withPodatus(e,s):t.withPesQuassus(e,s),t.lastNote=null}getNoteGlyphCode(t,e){if(e.shape===cn.Oriscus&&e.liquescent===un.None){var s=this.nextPositionInNeume(e);return null===s?Oriscus.getLastNoteGlyphCode(t,e):Oriscus.getGlyphCode(e,s>as(e))}return ss(e)}nextPositionInNeume(t){for(var e=as(t),s=this.notes.indexOf(t)+1;s<this.notes.length;s++){var i=as(this.notes[s]);if(i!==e)return i}return null}resetDependencies(){for(var t of this.notes)t.shape===cn.Oriscus&&Oriscus.pointsToNextNeume(t)&&null===this.nextPositionInNeume(t)&&(this.needsLayout=!0)}}class Oriscus extends Neume{positionMarkings(){this.positionEpisemataAbove(this.notes[0])}performLayout(t){super.performLayout(t);var e,s=this.notes[0];e=s.liquescent!==un.None?kt.OriscusLiquescent:Oriscus.getLastNoteGlyphCode(t,s),this.build(t).oriscusAt(s,e),this.finishLayout(t)}resetDependencies(){Oriscus.pointsToNextNeume(this.notes[0])&&(this.needsLayout=!0)}static getGlyphCode(t,e){return t.shapeModifiers&dn.Ascending?kt.OriscusAsc:t.shapeModifiers&dn.Descending?kt.OriscusDes:e?kt.OriscusAsc:kt.OriscusDes}static getLastNoteGlyphCode(t,e){for(var s=t.activeClef.pitchToStaffPosition(e.pitch),i=t.currNotationIndex+1;i<t.notations.length;i++){var n=t.notations[i];if(n.isNeume&&!n.hasNoWidth)for(var a of n.notes){var r=t.activeClef.pitchToStaffPosition(a.pitch);if(r!==s)return Oriscus.getGlyphCode(e,r>s)}}return Oriscus.getGlyphCode(e,!1)}static pointsToNextNeume(t){return!(t.shapeModifiers&dn.Ascending||t.shapeModifiers&dn.Descending)}}class PesOriscus extends Neume{positionMarkings(){this.positionPodatusMarkings(this.notes[0],this.notes[1])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1];this.build(t).noteAt(e,kt.PunctumQuadratum).noteAt(s,Oriscus.getLastNoteGlyphCode(t,s)),this.finishLayout(t)}resetDependencies(){Oriscus.pointsToNextNeume(this.notes[1])&&(this.needsLayout=!0)}}class PesQuadratum extends Neume{positionMarkings(){this.positionPodatusMarkings(this.notes[0],this.notes[1])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1];s.liquescent!==un.None?this.build(t).withPodatus(e,s):this.build(t).noteAt(e,e.liquescent===un.InitioDebilis?kt.TerminatingDesLiquescent:kt.PunctumQuadratum).virgaAt(s),this.finishLayout(t)}}class PesQuassus extends Neume{performLayout(t){super.performLayout(t),this.build(t).withPesQuassus(this.notes[0],this.notes[1]),this.finishLayout(t)}}class PesSubpunctis extends Neume{positionMarkings(){this.positionPodatusEpisemata(this.notes[0],this.notes[1]);for(var t=2;t<this.notes.length;++t)this.positionEpisemataAbove(this.notes[t]);this.positionInclinataMorae(this.notes.slice(1))}performLayout(t){super.performLayout(t),this.build(t).withPodatus(this.notes[0],this.notes[1]).advanceBy(.68*t.intraNeumeSpacing).withInclinata(this.notes.slice(2)),this.finishLayout(t)}}class Podatus extends Neume{positionMarkings(){this.positionPodatusMarkings(this.notes[0],this.notes[1])}performLayout(t){super.performLayout(t),this.build(t).withPodatus(this.notes[0],this.notes[1]),this.finishLayout(t)}}class Porrectus extends Neume{positionMarkings(){this.positionPorrectusMarkings(this.notes[0],this.notes[1],this.notes[2])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2];this.build(t).lineFrom(s).withPorrectusSwash(e,s).noteAt(i,Ze(s,i)),this.finishLayout(t)}}class PorrectusFlexus extends Neume{positionMarkings(){this.positionPorrectusFlexusMarkings(this.notes[0],this.notes[1],this.notes[2],this.notes[3])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2],n=this.notes[3];this.build(t).lineFrom(s).withPorrectusSwash(e,s).noteAt(i,Ke(n)).noteAt(n,Ye(n)),this.finishLayout(t)}}class PunctaInclinata extends Neume{positionMarkings(){this.positionInclinataMorae(this.notes)}performLayout(t){super.performLayout(t),this.build(t).withInclinata(this.notes),this.finishLayout(t)}}class Punctum extends Neume{positionMarkings(){this.positionEpisemataAbove(this.notes[0])}performLayout(t){super.performLayout(t);var e=this.notes[0];if(e.linea)return this.build(t).lineaAt(e),void this.finishLayout(t);this.build(t).noteAt(e,ss(e)),this.finishLayout(t)}}class Salicus extends Neume{positionMarkings(){for(var t=0;t<this.notes.length;t++)this.positionEpisemataBelow(this.notes[t])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2],n=this.build(t).withSalicusStart(e,s);i.liquescent&un.Small?n.noteAt(i,kt.TerminatingAscLiquescent):i.liquescent===un.Ascending?n.noteAt(i,kt.PunctumQuadratumAscLiquescent):i.liquescent===un.Descending?n.noteAt(i,kt.PunctumQuadratumDesLiquescent):n.virgaAt(i),this.finishLayout(t)}}class SalicusFlexus extends Neume{positionMarkings(){var t=this.positionTorculusMarkings(this.notes[1],this.notes[2],this.notes[3]);this.positionEpisemata(this.notes[0],t?Pt.Above:Pt.Below)}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2],n=this.notes[3];this.build(t).withSalicusStart(e,s).noteAt(i,Ke(n)).noteAt(n,Ye(n)),this.finishLayout(t)}}class Scandicus extends Neume{positionMarkings(){this.notes[2].shape===cn.Virga?(this.positionPodatusMarkings(this.notes[0],this.notes[1]),this.positionEpisemataAbove(this.notes[2])):(this.positionEpisemataBelow(this.notes[0]),this.positionPodatusMarkings(this.notes[1],this.notes[2]))}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2];i.shape===cn.Virga?this.build(t).withPodatus(e,s).virgaAt(i):this.build(t).noteAt(e,e.shape===cn.Quilisma?kt.Quilisma:kt.PunctumQuadratum).withPodatus(s,i),this.finishLayout(t)}}class ScandicusFlexus extends Neume{positionMarkings(){this.notes[2].shape===cn.Virga?(this.positionPodatusMarkings(this.notes[0],this.notes[1]),this.positionClivisMarkings(this.notes[2],this.notes[3])):(this.positionEpisemataBelow(this.notes[0]),this.positionPodatusMarkings(this.notes[1],this.notes[2]),this.positionEpisemataAbove(this.notes[3]))}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2],n=this.notes[3];if(i.shape===cn.Virga)this.build(t).withPodatus(e,s).advanceBy(t.intraNeumeSpacing).withClivis(i,n);else{var a=kt.PunctumQuadratum;n.liquescent&un.Ascending?a=kt.PunctumQuadratumAscLiquescent:n.liquescent&un.Descending&&(a=kt.PunctumQuadratumDesLiquescent),this.build(t).noteAt(e,kt.PunctumQuadratum).withPodatus(s,i).advanceBy(t.intraNeumeSpacing).noteAt(n,a)}this.finishLayout(t)}}class Torculus extends Neume{positionMarkings(){this.positionTorculusMarkings(this.notes[0],this.notes[1],this.notes[2])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2];this.build(t).noteAt(e,ts(e)).noteAt(s,kt.PunctumQuadratum).noteAt(i,Ye(i)),this.finishLayout(t)}}class TorculusResupinus extends Neume{positionMarkings(){this.positionPorrectusMarkings(this.notes[1],this.notes[2],this.notes[3]),this.positionClivisEpisemata(this.notes[1],this.notes[0])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2],n=this.notes[3];this.build(t).noteAt(e,ts(e)).withPorrectusSwash(s,i).noteAt(n,Ze(i,n)),this.finishLayout(t)}}class TorculusResupinusFlexus extends Neume{positionMarkings(){this.positionPorrectusFlexusMarkings(this.notes[1],this.notes[2],this.notes[3],this.notes[4]),this.positionClivisEpisemata(this.notes[1],this.notes[0])}performLayout(t){super.performLayout(t);var e=this.notes[0],s=this.notes[1],i=this.notes[2],n=this.notes[3],a=this.notes[4];this.build(t).noteAt(e,ts(e)).withPorrectusSwash(s,i).noteAt(n,Ke(a)).noteAt(a,Ye(a)),this.finishLayout(t)}}class Tristropha extends Neume{positionMarkings(){this.positionEpisemataAbove(this.notes[0]),this.positionEpisemataAbove(this.notes[1]),this.positionEpisemataAbove(this.notes[2])}performLayout(t){super.performLayout(t);let e=this.notes.map(t=>Apostropha.getNoteGlyphCode(t)),s=e[0]===kt.Stropha||e[0]===kt.StrophaLiquescent?t.intraNeumeSpacing/2:t.intraNeumeSpacing;this.build(t).noteAt(this.notes[0],e[0]).advanceBy(s).noteAt(this.notes[1],e[1]).advanceBy(s).noteAt(this.notes[2],e[2]),this.finishLayout(t)}}class Virga extends Neume{positionMarkings(){this.positionEpisemataAbove(this.notes[0])}performLayout(t){super.performLayout(t),this.build(t).virgaAt(this.notes[0]),this.finishLayout(t)}}var os=as,hs=t=>!(t.shape!==cn.Default||!(t.shapeModifiers&dn.Linea)&&!t.linea),ls=(t,e)=>{var s;if(t instanceof Punctum||t instanceof Oriscus)s=ns.Punctum;else if(t instanceof Virga)s=t.notes[0].shapeModifiers&dn.Reverse?ns.VirgaReversa:ns.Virga;else if(t instanceof Clivis)s=ns.Flexus;else if(t instanceof Podatus||t instanceof PesQuassus)s=ns.Pes;else{if(!(t instanceof Porrectus))return;s=ns.Porrectus}return{kind:s,notes:t.notes,fused:e}},us=t=>!!(t.fused||t.shape!==cn.Default||t.quadratum||t.quilismaQuadratum||t.liquescent&un.InitioDebilis),cs=t=>!!(t.liquescent&~un.InitioDebilis),ds=t=>t.shape===cn.Stropha||hs(t),fs=t=>t.shape===cn.Default&&!hs(t)&&!t.quadratum&&!t.quilismaQuadratum,gs=["scandicus","pesQuadratum","salicusFlexus","ancus","torculusLiquescens","torculusResupinusFlexus","porrectusFlexus"],ps=(t,e)=>{var s=t[e],i=e=>os(t[e]),n=e=>e<t.length&&!t[e].fused&&!(t[e].liquescent&un.InitioDebilis),a=e+1;switch(s.shape){case cn.Inclinatum:for(;n(a)&&t[a].shape===cn.Inclinatum&&i(a)!==i(a-1);)a++;return{length:a-e};case cn.Stropha:for(;a-e<3&&n(a)&&t[a].shape===cn.Stropha&&i(a)===i(e);)a++;return{length:a-e};case cn.Virga:if(s.shapeModifiers&dn.Reverse)return{length:1,kind:ns.VirgaReversa};for(;a-e<3&&n(a)&&t[a].shape===cn.Virga&&!(t[a].shapeModifiers&dn.Reverse)&&i(a)===i(e);)a++;return a-e===1?{length:1,kind:ns.Virga}:{length:a-e}}if(hs(s))return{length:1};if(cs(s))return{length:1,kind:ns.Punctum};for(var r=s.shape===cn.Default&&!(s.liquescent&un.InitioDebilis),o=s.quadratum?"quadratum":s.quilismaQuadratum?"quilismaQuadratum":"punctum";n(a);a++){var h=t[a],l=i(a)-i(a-1),u=null;if(Math.abs(l)>5)break;if(h.shape===cn.Oriscus&&h.shapeModifiers&dn.Stemmed)"punctum"===o&&l>0&&(u="pesOriscus");else if(fs(h)&&0!==l)switch(o){case"punctum":u=l>0?"pes":"flexus";break;case"pes":l<0?u="torculus":r&&(u="scandicus");break;case"quadratum":u=l>0?"pesQuadratum":"flexus";break;case"quilismaQuadratum":l>0&&(u="pesQuadratum");break;case"pesOriscus":l>0&&(u="salicus");break;case"salicus":l<0&&(u="salicusFlexus");break;case"flexus":l>0?r&&(u="porrectus"):h.liquescent&un.Small&&(u="ancus");break;case"torculus":l>0?u="torculusResupinus":h.liquescent===un.Small&&(u="torculusLiquescens");break;case"torculusResupinus":case"porrectus":l<0&&(u=o+"Flexus")}if(null===u)break;if(o=u,gs.indexOf(o)>=0||cs(h)){a++;break}}return"torculus"===o&&s.shape===cn.Oriscus?{length:1,kind:ns.Punctum,fusesNext:!0}:{length:a-e,kind:{punctum:ns.Punctum,quadratum:ns.Punctum,quilismaQuadratum:ns.Punctum,pes:ns.Pes,flexus:ns.Flexus,porrectus:ns.Porrectus}[o]}},ms=(t,e,s)=>{e.length>0&&(s.isDefault||(e[e.length-1].trailingSpace=s,e[e.length-1].keepWithNext=!0,("function"==typeof s?s(t)>0:s>0)&&(e[e.length-1].allowLineBreakBeforeNext=e[e.length-1].keepWithNext=!0)))},xs="﷐",ys=/(?=[^\s\uFDD0])((?:<v>[\s\S]*?<\/v>|<alt>[\s\S]*?<\/alt>|<sp>[^<]*?<\/sp>|[^(])*)(?:\(?([^)]*)\)?)?/g,vs=/<alt>(.*?)<\/alt>|\[(alt:)?(.*?)\]/g,bs="\\$("+P+")",Ls=new RegExp(bs,"g"),Ss=new RegExp("<sp>[^<]*?<\\/sp>|<v>[\\s\\S]*?<\\/v>|%[^%\\s][^%\\n]*%(?=[^\\n%(]*\\()|"+bs+"|(<alt>[\\s\\S]*?<\\/alt>)|(\\((?:\\$[\\s\\S]|[^)$])*\\)?)|(%[^\\n]*\\n?|\\uFEFF)","g"),Cs=new RegExp(bs+"|(%(?:\\$[^\\n]|[^\\n)$])*|\\n)","g"),ws=/\uFDD0/g,Ps=/<(\/)?(eu|nlba)>/g,Ns=/<\s*clear\s*\/?\s*>/g,Ts=/<\s*pr\s*(?::\s*(\d*\.?\d+|\d+\.)\s*)?\/?\s*>/g,Is=/^(\s*)((?:<[a-z]+>)*)<verseNum(?:\s*\/>|>([\s\S]*?)<\/verseNum>)((?:<\/[a-z]+>)*)\s*/i,As=/(<verseNum(?:\s*\/>|>[\s\S]*?<\/verseNum>)(?:<\/[a-z]+>)*\s*)|(<v>[\s\S]*?<\/v>|<alt>[\s\S]*?<\/alt>)|(<sp>[^<]*?<\/sp>|<[^<>]*>)|([\s+-]+)|([\s\S])/gi;const Ms=(t,e)=>{var s=jt[t.lyricTie],i=s&&t.specials[s]||" ";return e.replace(/(^|<\/sp>)([\s\S]*?)($|<sp>)/g,(t,e,s,n)=>`${e}${s.replace(/(<v>[\s\S]*?<\/v>|<alt>[\s\S]*?<\/alt>|\[[^\]]*\])|~/g,(t,e)=>e?e.replace(/~/g," "):i)}${n}`)};var Bs=new RegExp("^(?:"+[Ps,Ns,Ts].map(t=>t.source).join("|")+")*"),ks=/z0|z[+-]?|Z[+-]?|((?:::|:\?|[,`](?:0\?|\?0?)|\^0?|`0?|,0|[,;][1-8]?|:)['_]*)|(?:[cf]|[cf]b|treble-?|xp-?)[1-5](?:@[cf]b?[1-5])?|\[nocustos\]|\/[0!]|\/\[-?(?:\.\d+|\d+(?:\.\d*)?)\]|\/+| |\!|\[\[|\[[^\[\]]*\]|\]\]?|<\/?nlba>|@\[|(?:-|@(?![cf]b?[1-5]))?[a-npA-NP](?:[oOwWvVrRsxXyY#~\+>_\.'0-9|=q?]|<(?!\/?nlba>)|\[(?!\[)[^\]]*\]?)*|\{([^}]+)\}?/g,Fs=/^(?:\[\[|\]\]?|<\/?nlba>|@\[|\[[^\[\]]*\])$/,Os=/^([a-z]+):(.*)/,Es=/^((?:[cf]|[cf]b|treble-?|xp-?)[1-5])@([cf])(b?)([1-5])$/,Ds=/([ou])(b|cb|cba):([01])(?:([{}])|;([^\]]+))/,zs=/^([ou])slur:([012])(?:;([^,]+),(.+)|([{}]))$/,Vs=/^([ou])ll:(?:([01])|(\})|([^;{]+)([;{])(.+))$/,Rs=/^([ou])h(?::(m|[ou]?[lh])?([+-][^{}]+)?)?([{}])?$/;const Ws=t=>t.intraNeumeSpacing*t.accidentalSpaceMultiplier,qs=t=>e=>e.intraNeumeSpacing*t,Hs=(t,e=1)=>s=>s.intraNeumeSpacing*s.neumeSpaceMultipliers[t]*e,Qs=/(?:^\uFEFF?|\n)[ \t]*(%%+)[ \t\r]*(\n|$)(?:[ \t\r]*\n)*/g,js=/^\s*%%+\s*$/,Gs=/^\uFEFF?(?:[ \t\r]*(?:[%#][^\n]*)?\n)*[ \t]*[\w-_.]+[ \t]*:/,$s=t=>{let e;for(Qs.lastIndex=0;(e=Qs.exec(t))&&!("%%"===e[1]&&e[2]||Gs.test(t)););return Qs.lastIndex=0,e},Us=/^[ \t]*([\w-_.]+)[ \t]*:\s*(.*?)(;;?[ \t]*(?:%.*)?)?$/i,_s=/^(.*?);;?[ \t]*(?:%.*)?$/,Js=/^[ \t]*([\w-_.]+)[ \t]*:\s*((?:\$[\s\S]?|[^$])*?)(;;?[ \t]*(?:%.*)?)?$/i,Xs=/^((?:\$[\s\S]?|[^$])*?);;?[ \t]*(?:%.*)?$/,Zs=t=>"lyric-line"===t,Ys=t=>{let e=Us.exec(t);return e&&Zs(e[1])?Js.exec(t):e},Ks=/^[ \t]*(?:[\w-_.]+[ \t]*:|[%#])/i,ti=/^%.*/,ei=(t,e,s=!1)=>{let i=[];for(let n=e+1;n<t.length&&!Ks.test(t[n]);++n){let e=(s?Xs:_s).exec(t[n]);if(e)return{values:[...i,e[1]],end:n};i.push(t[n])}return null},si=(t,e)=>{let s=Ys(t[e]);return s?{match:s,multiLine:s[3]?null:ei(t,e,Zs(s[1]))}:null},ii=t=>t.replace(/-([a-z])/g,(t,e)=>e.toUpperCase()),ni=(t,e)=>e.includes("\n")?`${t}: ${e};;`.split("\n"):[`${t}: ${e};`],ai=class GabcHeader{static getLength(t){let e=$s(t);return e?e.index+e[0].length:0}constructor(t){"string"!=typeof t&&(t=""),this.comments=[],this.cValues={},this.original="";let e=$s(t);if(e){for(var s=(this.original=t.slice(0,e.index+e[0].length)).replace(/^\uFEFF/,"").split(/\r?\n/g),i=0;i<s.length;++i){let t=s[i],e=si(s,i),h=e&&e.match;if(h){var n=ii(h[1]),a=h[2],r=e.multiLine;if(r&&(a=[a,...r.values].join("\n"),i=r.end),this[h[1]]){var o=h[1]+"Array";this[o]||(this[o]=[this[h[1]]]),this[o].push(a)}else this[h[1]]=a;n!==h[1]&&(this[n]=this[h[1]])}else if((h=ti.exec(t))&&!js.test(t))if(h=Ys(t.slice(1)),h){let t=ii(h[1]);this.cValues[h[1]]=h[2],t!==h[1]&&(this.cValues[t]=h[2])}else this.comments[i]=t}}}toString(){var t=[];for(let n in this)if("string"==typeof this[n]&&!/^(length|original|comments|cValues)$/.test(n)){var e=n.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});if(e===n||!(e in this)){var s=this[n+"Array"];if(s)for(var i=0;i<s.length;++i)t.push(...ni(n,s[i]));else t.push(...ni(n,this[n]))}}for(let e in this.cValues)0!==e.length&&this.cValues.hasOwnProperty(e)&&t.push("%"+e+": "+this.cValues[e]+";");for(let e in this.comments)if(this.comments.hasOwnProperty(e))try{t.splice(e,0,this.comments[e])}catch(t){console.warn(t)}return t.join("\n")+"\n%%\n"}};var ri=t=>(t!==oi.gabc&&(oi={gabc:t,masked:hi(t)}),oi.masked),oi={gabc:"",masked:""},hi=t=>t.replace(Ss,(t,e,s,i,n)=>e?I(e):s?s.replace(Ls,(t,e)=>I(e)):i?i.replace(Cs,(t,e)=>e?I(e):xs.repeat(t.length)):n?xs.repeat(n.length):t),li=t=>ui(ri(t)),ui=t=>!ci.test(t),ci=/[^\s\uFDD0]/;const di={latin:o.latin,la:o.latin,lat:o.latin,english:o.english,en:o.english,eng:o.english,spanish:o.spanish,español:o.spanish,es:o.spanish,spa:o.spanish,"church slavonic":o.churchSlavonic,"church slavic":o.churchSlavonic,"old church slavonic":o.churchSlavonic,"old slavonic":o.churchSlavonic,"old bulgarian":o.churchSlavonic,slavic:o.churchSlavonic,cu:o.churchSlavonic,chu:o.churchSlavonic,polish:o.churchSlavonic,pl:o.churchSlavonic,pol:o.churchSlavonic,czech:o.churchSlavonic,cs:o.churchSlavonic,ces:o.churchSlavonic,cze:o.churchSlavonic,slovak:o.churchSlavonic,sk:o.churchSlavonic,slk:o.churchSlavonic,slo:o.churchSlavonic,hungarian:o.hungarian,hu:o.hungarian,hun:o.hungarian},fi={latine:o.latin,english:o.english},gi=new WeakSet,pi=["i","ii","iii","iv","v","vi","vii","viii"],mi=/^[!-/:-@[-`{-~\u00a1-\u00bf\u2010-\u205e]/,xi=t=>(t||"").replace(/\s+/g," ").trim();var yi=t=>t.reduce((t,e)=>t+(e.notes?e.notes.length:1),0),vi=(t,e)=>{let s=Object.assign({},t);for(let i of["euouae","noLineBreak"])e[i]&&(s[i]=Object.assign(Object.assign({},t[i]),e[i]));return s},bi={noteMarks:[],areas:{}},Li=t=>{return t.noteMarks.length>0||!(!(e=t.areas).euouae&&!e.noLineBreak)||!(!t.episemaBlocks||!t.episemaBlocks.above&&!t.episemaBlocks.below);var e},Si=(t=[])=>t.every(t=>!t.length)?"":t.map(t=>t.join(" ")).join("|").replace(/\|+$/,""),Ci=["i","b","tt","sc","ul","c"],wi=new RegExp(`<v>[\\s\\S]*?<\\/v>|<sp>[^<]*?<\\/sp>|<(\\/)?(${Ci.join("|")})>`,"g"),Pi=(t,e)=>{if(!t.length&&e.indexOf("<")<0)return[];let s,i=new Set(t);for(wi.lastIndex=0;s=wi.exec(e);)s[2]&&(s[1]?i.delete(s[2]):i.add(s[2]));return Ci.filter(t=>i.has(t))},Ni=(t=[],e)=>Array.from({length:Math.max(e.length,t.length)},(s,i)=>i<e.length?Pi(t[i]||[],e[i]):t[i]),Ti=t=>t.map(t=>`<${t}>`).join(""),Ii=new RegExp(`<\\/(?:${Ci.join("|")})>`,"g"),Ai=new RegExp(`(<v>[\\s\\S]*?<\\/v>|<alt>[\\s\\S]*?<\\/alt>|<sp>[^<]*?<\\/sp>)|\\)((?:<\\/(?:eu|nlba|${Ci.join("|")})>)*)\\s(?=[^\\)]*(?:\\(|$))`,"g"),Mi=new WeakMap,Bi=t=>t.replace(Ai,(t,e,s)=>e?e.replace(/\n/g," "):`)${s}\n`),ki=/[\s()<>%$\uFEFF]/,Fi=/[)<>%$]/,Oi=(t,e)=>{let s=e[0];t.translationText.forEach((e,i)=>{let n=s&&"end"===e.textAnchor?s.translationText[i]:void 0;n&&(n.endNeume=t)}),e[0]=t},Ei=(t,e,s)=>{if(1===s.length)return void t.splice(e,0,s[0]);let i=t.splice(e);for(let e of s)t.push(e);for(let e of i)t.push(e)},Di=t=>t.bracketStart=!0,zi=t=>t.noLineBreak=Object.assign(Object.assign({},t.noLineBreak),{start:!0}),Vi=t=>t.autoFusion=Object.assign(Object.assign({},t.autoFusion),{start:!0}),Ri=(t,e)=>t&&e?t+"/"+e:(t||"")+e,Wi=(t,e)=>{for(let s of["euouae","noLineBreak"]){let i=e[s];if(i&&(i.start&&(t[0][s]=Object.assign(Object.assign({},t[0][s]),{start:!0})),i.end)){let e=t[t.length-1];e[s]=Object.assign(Object.assign({},e[s]),{end:!0})}}},qi=(t,e)=>{let s=t.replace(Ps,(t,s,i)=>{let n="eu"===i?"euouae":"noLineBreak";return e[n]=Object.assign(Object.assign({},e[n]),{[s?"end":"start"]:!0}),""}).replace(Ns,"").replace(Ts,"");return s!==t&&""===s.trim()?"":s};class NeumeBuilder{constructor(t){this.notes=t,this.neumes=[],this.firstNoteIndex=0,this.currNoteIndex=0}createNeume(t,e,s=!0){var i;if(!((i=e?this.currNoteIndex:s?this.currNoteIndex-1:this.currNoteIndex-2)<0)){for(;this.firstNoteIndex<=i;){let e=this.notes[this.firstNoteIndex++];t.addNote(e),e.alText&&(t.alText||(t.alText=[]),t.alText.push(e.alText),e.alText.noteIndex=this.firstNoteIndex-1)}return this.neumes.push(t),!1===e&&(this.currNoteIndex--,!1===s&&this.currNoteIndex--,t.keepWithNext=!0,this.notes[this.currNoteIndex+1].shape===cn.Quilisma?t.trailingSpace=0:(t.trailingSpace=qs(1),t.allowLineBreakBeforeNext=!0)),Hi}}}var Hi={neume:function(){return new Punctum},handle:function(t,e,s,i){return t.linea?i.createNeume(new Punctum,!0):t.shape===cn.Virga?sn:t.shape===cn.Stropha?an:t.shape===cn.Oriscus?Gi:t.shape===cn.Inclinatum?ji:t.shapeModifiers&dn.Cavum&&t.shapeModifiers&dn.Linea?i.createNeume(new Punctum,!0):Qi}},Qi={neume:function(){return new Punctum},handle:function(t,e,s,i){if(t.shape===cn.Oriscus&&t.shapeModifiers&dn.Stemmed&&t.staffPosition>e.staffPosition&&e.liquescent===un.None&&t.liquescent===un.None)return $i;if(t.shape||e.liquescent===un.Small){var n=new Punctum,a=i.createNeume(n,!1);return t.staffPosition>e.staffPosition&&(t.staffPosition%2==1||e.staffPosition!==t.staffPosition-1||!e.morae||0===e.morae.length)&&(n.trailingSpace=0),a}return t.staffPosition>e.staffPosition?(t.ictus&&(t.ictus.positionHint=Pt.Above),e.quadratum?i.createNeume(new PesQuadratum,!0):Ui):t.staffPosition<e.staffPosition?(e.ictus&&(e.ictus.positionHint=Pt.Above),t.shape===cn.Inclinatum?Ji:_i):e.morae&&e.morae.length?i.createNeume(new Punctum,!1):rn}},ji={neume:function(){return new PunctaInclinata},handle:function(t,e,s,i){return t.shape!==cn.Inclinatum?i.createNeume(new PunctaInclinata,!1):ji}},Gi={neume:function(){return new Oriscus},handle:function(t,e,s,i){if(t.shape===cn.Default){if(t.staffPosition>e.staffPosition)return i.createNeume(new PesQuassus,!0);if(t.staffPosition<e.staffPosition)return i.createNeume(new Clivis,!0)}var n=new Oriscus,a=i.createNeume(n,!1);return t.staffPosition>e.staffPosition&&(t.staffPosition%2==1||e.staffPosition!==t.staffPosition-1||!e.morae||0===e.morae.length)&&(n.trailingSpace=0),a}},$i={neume:function(){return new PesOriscus},handle:function(t,e,s,i){return t.shape===cn.Default&&t.staffPosition>e.staffPosition?Yi:i.createNeume(new PesOriscus,!1)}},Ui={neume:function(){return new Podatus},handle:function(t,e,s,i){return t.staffPosition>e.staffPosition?(t.ictus&&(t.ictus.positionHint=Pt.Above),e.ictus&&(e.ictus.positionHint=Pt.Below),e.shape===cn.Oriscus?Yi:tn):t.staffPosition<e.staffPosition?t.shape===cn.Inclinatum?Zi:hn:i.createNeume(new Podatus,!1)}},_i={neume:function(){return new Clivis},handle:function(t,e,s,i){return t.shape===cn.Default&&t.staffPosition>e.staffPosition?(t.ictus&&(t.ictus.positionHint=Pt.Above),Xi):t.staffPosition<e.staffPosition&&t.liquescent&un.Small?i.createNeume(new Ancus,!0):i.createNeume(new Clivis,!1)}},Ji={neume:function(){return new Climacus},handle:function(t,e,s,i){return t.shape!==cn.Inclinatum?i.createNeume(new Climacus,!1):Ji}},Xi={neume:function(){return new Porrectus},handle:function(t,e,s,i){return t.shape===cn.Default&&t.staffPosition<e.staffPosition?i.createNeume(new PorrectusFlexus,!0):i.createNeume(new Porrectus,!1)}},Zi={neume:function(){return new PesSubpunctis},handle:function(t,e,s,i){return t.shape!==cn.Inclinatum?i.createNeume(new PesSubpunctis,!1):Zi}},Yi={neume:function(){return new Salicus},handle:function(t,e,s,i){return t.shape===cn.Default&&t.staffPosition<e.staffPosition?Ki:i.createNeume(new Salicus,!1)}},Ki={neume:function(){return new SalicusFlexus},handle:function(t,e,s,i){return i.createNeume(new SalicusFlexus,!1)}},tn={neume:function(){return new Scandicus},handle:function(t,e,s,i){return e.shape===cn.Virga&&t.shape===cn.Inclinatum&&t.staffPosition<e.staffPosition?i.createNeume(new Podatus,!1,!1):t.shape===cn.Default&&t.staffPosition<e.staffPosition?en:i.createNeume(new Scandicus,!1)}},en={neume:function(){return new ScandicusFlexus},handle:function(t,e,s,i){return i.createNeume(new ScandicusFlexus,!1)}},sn={neume:function(){return new Virga},handle:function(t,e,s,i){return t.shape===cn.Inclinatum&&t.staffPosition<e.staffPosition?Ji:t.shape===cn.Virga&&t.staffPosition===e.staffPosition?nn:i.createNeume(new Virga,!1)}},nn={neume:function(){return new Bivirga},handle:function(t,e,s,i){return t.shape===cn.Virga&&t.staffPosition===e.staffPosition?i.createNeume(new Trivirga,!0):i.createNeume(new Bivirga,!1)}},an={neume:function(){return new Apostropha},handle:function(t,e,s,i){return t.staffPosition===e.staffPosition?rn:i.createNeume(new Apostropha,!1)}},rn={neume:function(){return new Distropha},handle:function(t,e,s,i){return t.staffPosition===e.staffPosition?e.morae&&e.morae.length?i.createNeume(new Distropha,!1):on:i.createNeume(new Apostropha,!1,!1)}},on={neume:function(){return new Tristropha},handle:function(t,e,s,i){return i.createNeume(new Distropha,!1,!1)}},hn={neume:function(){return new Torculus},handle:function(t,e,s,i){return t.shape===cn.Default&&t.staffPosition>e.staffPosition?(t.ictus&&(t.ictus.positionHint=Pt.Above),ln):i.createNeume(new Torculus,!1)}},ln={neume:function(){return new TorculusResupinus},handle:function(t,e,s,i){return t.shape===cn.Default&&t.staffPosition<e.staffPosition?i.createNeume(new TorculusResupinusFlexus,!0):i.createNeume(new TorculusResupinus,!1)}};class Gabc{static createMappingsFromSource(t,e){var{nabcLines:s,lyricLines:i,notations:n}=this.readSource(e);t.nabcLines=s,t.lyricLines=i.length;var a=this.splitMaskedWords(n);this.startParsing(t);var r=this.createMappingsFromWords(t,a.words,a.maskedWords);return this.finishMappings(t,r,i),Mi.set(r,a),r}static readSource(t){var e=ai.getLength(t);return{headerLength:e,nabcLines:this.getNabcLines(t,e),lyricLines:this.getLyricLines(t,e),notations:t.slice(e)}}static startParsing(t){t.activeClef=Clef.default(),t.activeClef.resetAccidentals(),delete this.needToEndBrace,this.marksForNext=bi}static finishMappings(t,e,s){((t,e)=>{let s=t.length?t[t.length-1].notations:[];s.length&&Wi(s,{euouae:e.euouae&&e.euouae.end?{end:!0}:void 0,noLineBreak:e.noLineBreak&&e.noLineBreak.end?{end:!0}:void 0})})(e,this.marksForNext.areas),this.applyLyricLines(t,e,s),e.length>0&&e[e.length-1].notations.length>0&&(e[e.length-1].notations[e[e.length-1].notations.length-1].trailingSpace=0)}static getNabcLines(t,e=ai.getLength(t)){if(!e)return 0;let s=parseInt(new ai(t.slice(0,e))["nabc-lines"],10);return s>0?s:0}static getLyricLines(t,e=ai.getLength(t)){let s=[];if(!e)return s;let i=[],n=[],a=0;for(let s of t.slice(0,e).split("\n")){let t=0===a&&s.startsWith("\ufeff")?1:0;i.push(s.slice(t).replace(/\r$/,"")),n.push(a+t),a+=s.length+1}for(let t=0;t<i.length;++t){let e=si(i,t);if(!e)continue;let{match:a,multiLine:r}=e;if("lyric-line"===a[1]){let e=a[2],o=n[t]+i[t].length-e.length-(a[3]||"").length,h=Array.from({length:e.length},(t,e)=>o+e);null==r||r.values.forEach((s,i)=>{let a=n[t+i+1];e+="\n"+s,h.push(a-1,...Array.from({length:s.length},(t,e)=>a+e))}),e.trim()&&s.push({text:e.replace(Ls,(t,e)=>I(e)),indices:h})}r&&(t=r.end)}return s}static splitLyricLine(t,e){let s,i=[],n=null;for(As.lastIndex=0;s=As.exec(e.text);){let[t,,,,a,r]=s;void 0===a?(n||(n={text:"",raw:"",index:e.indices[s.index],breakAfter:""}),n.raw+=t,n.text+="_"===r?" ":t):n&&(n.breakAfter=/\s/.test(a)?" ":a.includes("-")?"-":"+",i.push(n),n=null)}n&&i.push(n);for(let e of i)e.text=Ms(t,e.text);let a=i.map(t=>({text:"_"===t.raw?"":t.text+("-"===t.breakAfter?"-":""),index:t.index,lyricType:ie.SingleSyllable})),r=[];return a.forEach((t,e)=>{t.text&&r.push(t),e<a.length-1&&("+"===i[e].breakAfter||"-"===i[e].breakAfter)||(r.forEach((t,e)=>t.lyricType=1===r.length?ie.SingleSyllable:0===e?ie.BeginningSyllable:e===r.length-1?ie.EndingSyllable:ie.MiddleSyllable),r=[])}),a}static applyLyricLines(t,e,s){if(!s.length)return;let i=[].concat(...e.map(t=>t.lyricSlots||[])),n=s.map(e=>this.splitLyricLine(t,e));n.forEach((t,e)=>{t.length>i.length&&console.warn(`lyric-line ${e+1} has ${t.length} syllables, but there are only ${i.length} syllables with notes for them`)});let a=n.map(()=>[]);for(let e=0;e<i.length;e++){let{notation:s,notations:r}=i[e],o=s.lyrics.filter(t=>t.fromLyricLine),h=s.lyrics.filter(t=>!t.fromLyricLine),l=-1;n.forEach((t,s)=>{t[e]&&t[e].text&&(l=s)});const u=(e,i,n,a,h,l="")=>{let u=o.find(t=>t.lyricLineKey===e&&t.lyricIndex===i);if(u){let t=h-u.lyricLineIndex;u.sourceIndex-=t,u.verseNumber&&(u.verseNumber.sourceIndex-=t)}else u=this.createLyric(t,n,a,s,r,h,l),u.sourceIndex=-u.sourceIndex,u.verseNumber&&(u.verseNumber.sourceIndex=-u.verseNumber.sourceIndex),u.fromLyricLine=!0,u.lyricLineKey=e,u.lyricIndex=i;return u.lyricLineIndex=h,u};if(l>=0){h=h.slice(0,1);let t=n[l][e].index;h.length||h.push(u("\0",0,"",ie.SingleSyllable,t));for(let s=0;s<=l;s++){let i=n[s][e]||{text:"",index:t,lyricType:ie.SingleSyllable},r=Ti(a[s]);a[s]=Pi(a[s],i.text);let o=[i.text,i.lyricType,r].join("\0");h.push(u(o,s+1,i.text,i.lyricType,i.index,r))}}(h.length!==s.lyrics.length||h.some((t,e)=>t!==s.lyrics[e]))&&(s.lyrics=h,s.needsLayout=!0)}}static splitNabc(t,e){let s="",i=[],n=[],a=null,r="",o=0;t.split("|").forEach((t,h)=>{let l=h%(e+1);0===l?(h>0&&r.trim()&&t.trim()?(i.push(s.length),s+="/"):h>0&&(s+=xs),!t.trim()&&a||n.push(a={index:o,end:o+t.length,nabc:[]}),t.trim()&&(r=t),s+=t):(s+=xs.repeat(t.length+1),a.nabc[l-1]=Ri(a.nabc[l-1],t)),o+=t.length+1});for(let t of n)for(let e=0;e<t.nabc.length;e++)t.nabc[e]=t.nabc[e]||"";return{gabc:s,cuts:i,parts:n.filter(t=>t.nabc.length>0)}}static applyHeader(t,e,s,i={}){var n=(s.annotationArray||[s.annotation]).map(xi).filter(t=>t).slice(0,2);if(!t.annotation||gi.has(t.annotation)){var a=null;if(n.length)!1!==i.annotation&&(a=1===n.length?new Annotation(e,n[0]):new Annotations(e,...n));else if(!1!==i.mode){var r=this.modeText(e,xi(s.mode),xi(s["mode-modifier"]),xi(s["mode-differentia"]));r&&(a=new Annotation(e,r))}a&&gi.add(a),t.annotation=a}var o=parseInt(xi(s["staff-lines"]),10);if(!1!==i.staffLines&&o>=2&&o<=5&&o!==t.staffLineCount){t.staffLineCount=o;for(let e of t.notations)e.needsLayout=!0}var h=!1!==i.language&&di[xi(s.language).toLowerCase()]||null;if(i.legacy&&(h=fi[xi(s["centering-scheme"]).toLowerCase()]||h),h){t.language=h;for(let e of t.notations)t.updateLanguage(e)}if(i.legacy){var l=xi(s["initial-style"]);/^[012]$/.test(l)&&(t.useDropCap="0"!==l,t.recreateDropCap(e))}t.needsLayout=!0}static modeText(t,e,s="",i=""){if(!e)return"";var n=/^[1-8]/.test(e)?parseInt(e[0],10):0;if(n){var a=pi[n-1];e=("arabic"===t.modeNumberSystem?e[0]:"roman-minuscule"===t.modeNumberSystem?a:a.toUpperCase())+e.slice(1)}for(var r of[s,i])r&&(e+=(mi.test(r)?"":" ")+r);return e}static diffDescriptorsAndNewWords(t,e){for(var s=t.length,i=e.length,n=0,a=0;n<s&&n<i&&t[n].source===e[n];)n++;for(;a<s-n&&a<i-n&&t[s-1-a].source===e[i-1-a];)a++;var r=[];return n&&r.push(["=",e.slice(0,n)]),r=r.concat(this.diffDescriptorsAndNewWordsBySubstring(t.slice(n,s-a),e.slice(n,i-a))),a&&r.push(["=",e.slice(i-a)]),r}static diffDescriptorsAndNewWordsBySubstring(t,e){var s,i,n=new Map;for(i=0;i<t.length;i++)(s=n.get(t[i].source))?s.push(i):n.set(t[i].source,[i]);var a,r,o,h,l,u=new Int32Array(t.length),c=new Int32Array(t.length),d=null;for(r=o=h=0,l=0;l<e.length;l++){if(s=n.get(e[l]))for(i=0;i<s.length;i++){var f=s[i];c[f]=(f>0?u[f-1]:0)+1,c[f]>h&&(r=f-(h=c[f])+1,o=l-h+1)}if(d)for(i=0;i<d.length;i++)u[d[i]]=0;a=u,u=c,c=a,d=s}if(0===h){var g=[];return t.length&&g.push(["-",t]),e.length&&g.push(["+",e]),g}return[].concat(this.diffDescriptorsAndNewWordsBySubstring(t.slice(0,r),e.slice(0,o)),[["=",e.slice(o,o+h)]],this.diffDescriptorsAndNewWordsBySubstring(t.slice(r+h),e.slice(o+h)))}static updateMappingsFromSource(t,e,s,i=null,n=null){var{headerLength:a,nabcLines:r,lyricLines:o,notations:h}=this.readSource(s);s=h,r===t.nabcLines&&!o.length==!t.lyricLines||(t.nabcLines=r,e.splice(0)),t.lyricLines=o.length,e.pop(),null===i&&(i=NaN),null===n&&(n=NaN);var l=this.splitMaskedWords(s,Mi.get(e));Mi.set(e,l);var{words:u,starts:c}=this.nonEmptyWords(l.words,l.maskedWords),d=this.diffDescriptorsAndNewWords(e,u.slice(0,-1));if(u.length){var f=d[d.length-1];f&&"+"===f[0]?f[1]=f[1].concat(u.slice(-1)):d.push(["+",u.slice(-1)])}var g,p,m,x,y=0,v=0,b=0;this.startParsing(t);for(var L=[],S=0;S<d.length;S++){var C=d[S][0],w=d[S][1];if("="===C)for(g=0;g<w.length;g++,y++,v++){x=e[y];var P=c[v]-x.sourceIndex;if(0===b&&x.notations.length&&x.notations[0].isClef&&(b=-1),i>=b||n>=b){let s=yi(x.notations);if(i>=b&&i<b+s||n>=b&&n<b+s){let n=x.sourceIndex+P;x=this.createMappingFromWord(t,w[g],n,L,i-b),e.splice(y,1,x),b+=s;continue}b+=s}if(!!x.parsedUnderChiRho!=t.activeClef instanceof ChiRhoClef||Li(this.marksForNext)||x.followsMarks||Si(this.marksForNext.openStyles)!==Si(x.openStylesBefore))x=this.createMappingFromWord(t,w[g],x.sourceIndex+P,L),e.splice(y,1,x);else{for(x.sourceIndex+=P,p=0;p<x.notations.length;p++){var N=x.notations[p];if(N.resetDependencies(),N.resetsAccidentalsBefore&&t.activeClef.resetAccidentals(),N.isClef&&(t.activeClef=e[y].notations[p],t.activeClef.resetAccidentals()),N.isAccidental?(N.pitch=t.activeClef.staffPositionToPitch(N.staffPosition),t.activeClef.activeAccidental=N):N.resetsAccidentals&&t.activeClef.resetAccidentals(),N.notes)for(m=0;m<N.notes.length;++m){let e=N.notes[m];e.sourceIndex+=P,e.choralSign&&(e.choralSign.sourceIndex+=P),e.choralNabc&&(e.choralNabc.sourceIndex+=P),e.pitch=t.activeClef.staffPositionToPitch(e.staffPosition),this.endAutomaticBrace(e)}if(N.translationText){for(let t of N.translationText)delete t.endNeume,t.sourceIndex+=P;Oi(N,L)}if(P){for("number"==typeof N.sourceIndex&&(N.sourceIndex+=P),m=0;m<N.lyrics.length;++m){let t=N.lyrics[m];t.fromLyricLine||(t.sourceIndex+=P,t.dropCap&&(t.dropCap.sourceIndex+=P))}if(N.alText)for(m=0;m<N.alText.length;++m)N.alText[m].sourceIndex+=P}}this.marksForNext=x.marksForNext||bi}}else if("-"===C)e.splice(y,w.length);else if("+"===C){let s=[];for(g=0;g<w.length;g++,v++){let e=c[v],n=this.marksForNext;if(x=this.createMappingFromWord(t,w[g],e,L,i-b),0===b&&x.notations.length&&x.notations[0].isClef){b=-1,i<yi(x.notations)&&(this.marksForNext=n,x=this.createMappingFromWord(t,w[g],e,L,i-b))}for(p=0;p<x.notations.length;p++){let e=x.notations[p];b+=e.notes?e.notes.length:1,e.isClef&&(t.activeClef=x.notations[p])}s.push(x)}Ei(e,y,s),y+=s.length}}return this.finishMappings(t,e,o),a}static createMappingsFromWords(t,e,s){for(var i=[],n=[],{words:a,starts:r}=this.nonEmptyWords(e,s),o=0;o<a.length;o++){var h=this.createMappingFromWord(t,a[o],r[o],n);h&&i.push(h)}return i}static nonEmptyWords(t,e){for(var s=[],i=[],n=0,a=0;n<t.length;a+=t[n].length+1,n++)(e?ui(e[n]):li(t[n]))||(s.push(t[n]),i.push(a));return{words:s,starts:i}}static setAutomaticLeanings(t){let e,s,i=[],n=0,a=0,r=!0;const o=()=>{let t=e||(r&&(a>1||1===a&&0===n)?"unison":n>0?"ascending":"descending");for(let e of i)e.automaticLeaning=t;i=[],r=!0};for(let h of t){let t=h.shape===cn.Inclinatum,l=t&&0!==(h.liquescent&(un.Small|un.Ascending|un.Descending)),u=s?Math.sign(h.staffPosition-s.staffPosition):0;delete h.automaticLeaning,!t||h.leaning||l?(l?(r=!1,e="descending"):t&&(e=h.leaning),i.length&&(t||(n+=u),o()),t?a++:(n=a=0,r=!0,e=void 0)):(e?h.automaticLeaning=e:(n+=u,u&&a>0&&(r=!1),i.push(h)),a++),s=h}i.length&&o()}static createMappingFromWord(t,e,s,i,n){for(var a,r=[],o=[],h=0,l=ri(e),u=!1,c=Li(this.marksForNext),d=this.marksForNext.openStyles,f=t.activeClef instanceof ChiRhoClef,g=[],p=()=>{this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{areas:vi(this.marksForNext.areas,m)}),x&&(this.marksForNext.openStyles=Ni(this.marksForNext.openStyles,x.split("|")));let t=new ChantMapping(e,o,s);return(Li(this.marksForNext)||Si(this.marksForNext.openStyles))&&(t.marksForNext=this.marksForNext),c&&(t.followsMarks=!0),f&&(t.parsedUnderChiRho=!0),Si(d)&&(t.openStylesBefore=d),g.length&&(t.lyricSlots=g),t};a=ys.exec(l);)r.push(a);var m={},x="",y=r[r.length-1],v=y&&y[1].replace(ws,"");y&&void 0===y[2]&&""===qi(v.replace(Ii,""),m)?(r.pop(),v.search(Ii)>=0&&(x=v)):m={};for(var b=0;b<r.length;b++){var L=r[b],S=Ms(t,L[1].replace(ws,"")),C=[],w=[],P=L[2],N={},T=qi(S,N);""===T&&(S=""),0===h&&/[a-z]/i.test(T)&&/[a-np]/i.test(P)&&(t.activeClef.resetAccidentals(),u=!0);var I=s+L.index+L[1].length+1,A=t.nabcLines>0&&P&&P.includes("|")?this.splitNabc(P,t.nabcLines):null,M=this.parseNotations(t,A?li(A.gabc)?"":A.gabc:P,I,n),B=[].concat(...M.map(t=>t.notes||[]));if(A){const t=t=>t.notes?t.notes[0].sourceIndex:t.sourceIndex,e=t=>!!t&&!t.isClef&&t.constructor!==ChantLineBreak;for(let s of A.parts){let i=I+s.index,n=M.find(e=>t(e)>=i)||M[M.length-1];if(!n)continue;if(!e(n)){let a=M.indexOf(n)+1,r=M[a];(!e(r)||t(r)>=I+s.end)&&M.splice(a,0,r=new TextOnly(i,0)),n=r}let a=n.nabc=n.nabc||[];s.nabc.forEach((t,e)=>a[e]=Ri(a[e],t))}for(let t of A.cuts){let e=B.filter(e=>e.sourceIndex-I<t).pop();e&&e.sourceGabc.endsWith("/")&&"/"!==P[e.sourceIndex-I+e.sourceGabc.length-1]&&(e.sourceGabc=e.sourceGabc.slice(0,-1))}}if(0===M.length)continue;for(var k=null,F=0;F<M.length;F++){var O=M[F];if(!(O.isAccidental&&F+1<M.length)){k=O;break}}k&&k.isNeume&&(g.push({notation:k,notations:M}),t.lyricLines>0&&S.includes("|")&&(S=S.split("|")[0],qi(S,N={}))),this.setAutomaticLeanings(B);for(let t of B)this.endAutomaticBrace(t);Wi(M,this.marksForNext.areas),this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{areas:{}}),Wi(M,N),u&&(M[0].resetsAccidentalsBefore=!0,u=!1),n>=0&&(n-=yi(M)),M[0].firstOfSyllable=!!T,M[0].firstOfParentheses=!0,o.push(...M);var E=vs.exec(void 0);let e=0;for(;E=vs.exec(S);){let i=E.index;if(S=S.slice(0,i)+S.slice(i+E[0].length),i+=s+e+1,"string"==typeof E[1]){let e=new AboveLinesText(t,E[1],k,i+4);e.alIndex=C.push(e)-1}else if("string"==typeof E[2]){let e=new AboveLinesText(t,E[3],k,i+E[2].length);e.alIndex=C.push(e)-1}else{let e=new TranslationText(t,E[3],k,i);e.translationIndex=w.push(e)-1}e+=E[0].length,vs.exec(void 0)}if(""===qi(S,{})&&(S=""),""!==S||0!==C.length||0!==w.length){if(null===k)return p();if(C.length&&(k.alText=C),w.length&&(k.translationText=w,Oi(k,i)),""!==S){var D;D=O.isNeume||O.constructor===TextOnly?0===h&&b===r.length-1?ie.SingleSyllable:0===h&&b<r.length-1?ie.BeginningSyllable:b===r.length-1?ie.EndingSyllable:ie.MiddleSyllable:ie.Directive,h++;var z=this.createSyllableLyrics(t,S,D,k,M,s+L.index);null!==z&&0!==z.length&&(k.lyrics=z)}}}return p()}static createSyllableLyrics(t,e,s,i,n,a){var r=[],o=e.split("|"),h=this.marksForNext.openStyles||[];this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{openStyles:Ni(h,o)});for(var l=0;l<o.length;l++){var u=o[l];l>0&&(u.match(/\s$/)?(u=u.replace(/\s+$/,""),s=ie.EndingSyllable):s=ie.MiddleSyllable);var c=this.createLyric(t,u,s,i,n,a,Ti(h[l]||[]));c.lyricIndex=r.push(c)-1,a+=o[l].length+1}return i.lyrics=r,r}static createLyric(t,e,s,i,n,a,r){var o,h=a+Bs.exec(e)[0].length,l=!1;let u;e=e.replace(Ps,"").replace(Ns,()=>(l=!0,"")).replace(Ts,(t,e,s)=>(o||(o={factor:e?parseFloat(e):void 0,textIndex:s}),""));let c=!1;var d=Is.exec(e);if(d&&d[4]!==(d[2].match(/\w+/g)||[]).reverse().map(t=>`</${t}>`).join("")&&(d=null),d){let[s,i,n,a,r]=d,l=s.length,f=jt[t.lyricTie],g=f&&t.specials[f];g&&e.startsWith(g,l)&&(l+=g.length+/^\s*/.exec(e.slice(l+g.length))[0].length);let p=(a||"").trim();p?u=new VerseNumber(t,n+p+r,h+(n?i.length:s.indexOf(">")+1)):c=!0,e=e.slice(l),h+=l,o&&(o.textIndex=Math.max(0,o.textIndex-l))}var f=-1,g=0;let p={},m=0,x=0;e=e.replace(/(<v>[\s\S]*?<\/v>)|[{}]/g,(t,e,s)=>e||(p[t]=p[t]||{index:s,at:s-m},m++,o&&s<o.textIndex&&x++,""));let y=p["{"],v=p["}"];y&&v&&v.index>y.index&&(f=y.at,g=v.at-y.at),o&&(o.textIndex-=x);var b=this.makeLyric(t,e,s,i,n,h,r);if(f>=0){let t=0,e=-1;for(let s of b.spans){if(f>=s.index&&f<=s.index+s.text.length&&(e=f+g,f+=t-s.index),e>=0&&e>=s.index&&e<=s.index+s.text.length){e+=t-s.index,g=e-f,e=-1;break}t+=s.text.length}e>=0&&(e=t,g=e-f)}return f>=0&&(b.centerStartIndex=f,b.centerLength=g),l&&(b.clear=!0),u&&(b.verseNumber=u),c&&(b.endsVerseNumbers=!0),o&&(o.textIndex=((t,e,s,i)=>{i=((t.textStyles.lyric.prefix||"")+s.slice(0,i)).replace(/\s+/g," ").length;let n=0;for(let t of e.spans){if(i<t.index+t.text.length)return n+Math.max(0,i-t.index);n+=t.text.length}return n})(t,b,e,o.textIndex),b.protrusion=o),b}static makeLyric(t,e,s,i,n,a,r=""){var o=!1,h=!1,l=!1;if(e.length>1||"-"===e){const i=e.slice(-1);"-"===i?(h=!0,s===ie.EndingSyllable?s=ie.MiddleSyllable:s===ie.SingleSyllable&&(s=ie.BeginningSyllable),e=e.slice(0,-1)):" "===i?(s===ie.MiddleSyllable?s=ie.EndingSyllable:s===ie.BeginningSyllable&&(s=ie.SingleSyllable),e=e.slice(0,-1)):["—","–"].includes(i)?l=!0:(/<\/e>$/.test(e)||t.italicMeansElision&&/<\/i>$/.test(e))&&(o=!0)}e.match(/^(?:[*†]+|i+j|\d+)\.?$/)&&(s=ie.Directive);var u=new Lyric(t,e,s,i,n,a,r,!1);return u.elidesToNext=o,h&&u.setForceConnector(!0),l&&u.setPreventConnector(!0),u}static parseNotations(t,e,s,i){if(!e)return[new TextOnly(s,0)];var n=s,a=0,r=[],o=[],h=Bt,l=!1,u=this.marksForNext.noteMarks.slice();this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{noteMarks:[]});var c,d,f=null,g=!1,p=new Set,m=!1,x=()=>{if(o.length)return o[o.length-1];for(let t=r.length-1;t>=0;t--){let e=r[t].notes;if(e&&e.length)return e[e.length-1]}return null},y=t=>{o.length>0&&(o[o.length-1].sourceGabc+=t)},v=(t,s,i)=>{l=i&&(l||o.length>0);let n=r[r.length-1];!o.length&&"!"===e[c.index-1]&&n&&n.isNeume&&(n.trailingSpace=s);let a=o.length>0;h=s,y(t),b(null),a&&!i&&(r[r.length-1].allowLineBreakBeforeNext=!1),g="/0"===t||"/!"===t},b=e=>{if(o.length>0){var i=o.some(t=>t.fused||p.has(t))?this.createFusedNeumes(t,o,h,p):this.createNeumesFromNotes(t,o,h);g=this.joinElements(i,g);for(var n=0;n<i.length;n++)r.push(i[n]);o=[]}if(h=Bt,null!==e){let i=r[r.length-1];e.sourceIndex=s,e.sourceGabc=c[0],e.continuesElement=!!e.isAccidental&&g,g=!!e.isAccidental,e.isClef?(t.activeClef=e,d&&(e.secondClef=d),i&&i.trailingSpace.isDefault&&i.isDivider&&(i.trailingSpace=Ws)):e.isAccidental?t.activeClef.activeAccidental=e:e.trailingSpace.isDefault&&e instanceof Custos?e.trailingSpace=Ws:e.resetsAccidentals&&t.activeClef.resetAccidentals(),u.includes(zi)&&(zi(e),u=u.filter(t=>t!==zi)),r.push(e)}},L=ks;for(L.lastIndex=0;c=L.exec(e);){s=n+c.index,a=c[0].length;var S=c[0],C=c[1],w=Es.exec(S);d=w&&this.createClef(w[2],parseInt(w[4],10),!!w[3]),w&&(S=w[1]);let e=C?/['_]*$/.exec(C)[0]:"",A=e.includes("_");switch(e&&(S=S.slice(0,-e.length))," "===S||"/"===S[0]||"[nocustos]"===S||Fs.test(S)||(l=!1),S){case",":case",0":b(new QuarterBar(A,",0"===S));break;case"`":case"`0":b(new Virgula(A,"`0"===S));break;case"^":case"^0":b(new DivisioMinimis(A,"^0"===S));break;case",?":case",0?":case",?0":case"`?":case"`0?":case"`?0":{let t=S.includes("0"),e=","===S[0]?new QuarterBar(A,t):new Virgula(A,t);e.parenthesized=!0,b(e);break}case";":b(new HalfBar(A));break;case";1":case";2":case";3":case";4":case";5":case";6":case";7":case";8":case",1":case",2":case",3":case",4":case",5":case",6":case",7":case",8":b(new DominicanBar(parseInt(S[1],10)));break;case":":case":?":b(new FullBar(A,":?"===S));break;case"::":b(new DoubleBar);break;case"c1":case"c2":case"c3":case"c4":case"c5":case"f1":case"f2":case"f3":case"f4":case"f5":case"cb1":case"cb2":case"cb3":case"cb4":case"cb5":case"fb1":case"fb2":case"fb3":case"fb4":case"fb5":b(t.activeClef=this.createClef(S[0],parseInt(S.slice(-1),10),"b"===S[1]));break;case"treble1":case"treble2":case"treble3":case"treble4":case"treble5":case"treble-1":case"treble-2":case"treble-3":case"treble-4":case"treble-5":b(t.activeClef=new TrebleClef(2*parseInt(S.slice(-1),10)-1,2,null,"-"===S[6]));break;case"xp1":case"xp2":case"xp3":case"xp4":case"xp5":case"xp-1":case"xp-2":case"xp-3":case"xp-4":case"xp-5":b(t.activeClef=new ChiRhoClef(2*parseInt(S.slice(-1),10)-1,2,null,"-"===S.slice(-2,-1)));break;case"z":case"z+":case"z-":case"Z":case"Z+":case"Z-":b(new ChantLineBreak("z"===S[0],"+"===S[1]?"force":"-"===S[1]?"none":"auto"));break;case"z0":b(new Custos(!0));break;case"[nocustos]":{let t=x();t?t.noCustos=!0:u.push(t=>t.noCustosBefore=!0);break}case"[[":u.push(Di),null===f&&(f=0);break;case"]]":{let t=x();t&&!u.includes(Di)&&(t.bracketEnd=!0),null===f&&(f=0);break}case"<nlba>":u.push(zi),f=qs(1);break;case"</nlba>":{let t=t=>t.noLineBreak=Object.assign(Object.assign({},t.noLineBreak),{end:!0}),e=x();e?t(e):u.push(t),f=qs(1);break}case"@[":u.push(Vi);break;case"]":{let t=x();t&&(t.autoFusion=Object.assign(Object.assign({},t.autoFusion),{end:!0})),m=!1,u=u.filter(t=>t!==Vi);break}case"!":h=0,y(S),b(null),g=!0;break;case" ":v(S,Hs(" "),!0);break;case"/0":case"/!":v(S,Hs(S),!1);break;default:if(S.startsWith("/[")){let t=parseFloat(S.slice(2,-1));v(S,Hs("/",t),t>0)}else if("/"===S[0]){let t=S.length;v(S,1===t?Hs("/"):e=>Hs("//")(e)+Hs("/",t-2)(e),!0)}else if("["===S[0]){let e=S.slice(1,-1),i=e.match(Os),n=e.match(Vs),a=n&&!n[2]&&this.customLedgerLine(n);if(i&&"alt"===i[1]){let e=i[2],n=s+1;u.push(s=>s.alText=new AboveLinesText(t,e,s,n))}else if(a){let t=Object.assign(Object.assign({},a),{before:!0});u.push(e=>e.customLedgerLines=(e.customLedgerLines||[]).concat(t))}else this.processEpisemaTuning(e,null)}else if(S.length>1&&S.endsWith("+")){var P=new Custos;this.setStaffPositionAndOffset(P,S,t.activeClef),b(P)}else if(S.length>1&&/[xXyY#]/.test(S[1])){var N;switch(S[1]){case"y":case"Y":N=ye.Natural;break;case"#":N=ye.Sharp;break;default:N=ye.Flat}var T=[];this.createNoteFromData(t,t.activeClef,S,T,s);var I=new Accidental(T[0].staffPosition,N,/^.(?:[XY]|##)/.test(S));"?"===S[2]&&(I.parenthesized=!0),I.pitch=t.activeClef.staffPositionToPitch(T[0].staffPosition),I.sourceIndex=s,I.sourceLength=a,I.trailingSpace=Ws,t.activeClef.activeAccidental=I,b(I)}else if(S.length>1&&"{"===S[0]){h=0,b(null);let e=L.lastIndex,i=this.parseNotations(t,c[2],s+1);L.lastIndex=e,u.push(...this.marksForNext.noteMarks),this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{noteMarks:[]}),i.forEach(t=>{t.hasNoWidth=!0,t.firstWithNoWidth=i[0]}),r.push(...i),g=!1}else{null!==f&&(o.length&&(h=f,b(null),g=0===f),f=null),-1===i&&(h=qs(1),b(null));let e=o.length;this.createNoteFromData(t,t.activeClef,S,o,s);for(let t of u)t(o[e]);if(u=[],o[e].autoFusion&&o[e].autoFusion.start&&(m=!0),m)for(let t=e;t<o.length;t++)p.add(o[t]);--i}}e.includes("'")&&(r[r.length-1].hasVerticalEpisema=!0)}b(null),this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{noteMarks:u});for(let t of r)for(let e of t.notes||[])e.noLineBreak&&(t.noLineBreak=Object.assign(Object.assign({},t.noLineBreak),e.noLineBreak));if(l){let t=r[r.length-1];t.keepWithNext=!1,t.allowLineBreakBeforeNext=!1}return r}static createClef(t,e,s){var i=2*e-1;return"c"===t?new DoClef(i,2,s?new Accidental(i-1,ye.Flat):null):new FaClef(i,2,s?new Accidental(i<=3?i+3:i-4,ye.Flat):null)}static joinElements(t,e){var s=un.Large|un.Small|un.Ascending|un.Descending,i=t=>t.shape===cn.Inclinatum,n=[],a=[],r=!1,o=()=>{for(let t=0;t<a.length;){let e=ps(a,t);n.push({notes:a.slice(t,t+e.length),kind:e.kind,fused:r&&0===t}),t+=e.length}a=[]};for(let e of t){let t=e instanceof FusedNeume;(t||e.fusedToPrevious||!a.length)&&(o(),r=!!e.fusedToPrevious),t?n.push({notes:e.notes.slice(),fused:!!e.fusedToPrevious,isFusedNeume:t}):a.push(...e.notes)}o();var h=t=>!(i(t.notes[0])||1!==t.notes.length&&(t.isFusedNeume||t.notes[0].shape!==cn.Virga&&t.notes[0].shape!==cn.Stropha)),l=t=>i(t.notes[0]),u=t=>1===t.notes.length&&t.notes[0].shape===cn.Stropha,c=t=>t.notes.length>1&&t.notes[t.notes.length-1].staffPosition<t.notes[0].staffPosition,d=t=>t.notes[t.notes.length-1],f=e,g=!1,p=null,m=new Set;n.forEach((t,i)=>{var n=!1;if(i>0&&t.fused?f=!0:g&&(n=!0,p=null),g=!1,l(t)&&!c(t))f||(n=!0),f=!0;else if(u(t)||l(t)&&c(t))f=!1,u(t)&&d(t).liquescent&(un.Ascending|un.Descending)&&(g=!0);else{let e=p?t.notes[0].staffPosition-d(p).staffPosition:0;!p||d(p).liquescent&s||!(h(p)&&0===e||l(p)&&h(t)&&Math.abs(e)<2||(t=>!t.isFusedNeume&&t.kind===ns.Pes)(p)&&(t=>!t.isFusedNeume&&t.kind===ns.Virga)(t)&&e>=0)?f?f=!1:n=!0:f=!1}d(t).morae.length&&(g=!0),p=t,0===i&&(n=!e),n&&m.add(t.notes[0])});for(let e of t)e.continuesElement=!m.has(e.notes[0]),e.notes.forEach((t,e)=>{e>0&&m.has(t)&&(t.startsElement=!0)});return f&&!g}static createNeumesFromNotes(t,e,s){for(var i=new NeumeBuilder(e),n=i.neumes,a=Hi;i.currNoteIndex<e.length;){var r=i.currNoteIndex>0?e[i.currNoteIndex-1]:null,o=e[i.currNoteIndex];a=(o.linea||o.quadratum)&&a!==Hi?i.createNeume(a.neume(),!1):a.handle(o,r,e.length-1-i.currNoteIndex,i),i.currNoteIndex===e.length-1&&a!==Hi&&i.createNeume(a.neume(),!0),i.currNoteIndex++}return ms(t,n,s),n}static createFusedNeumes(t,e,s,i){for(var n=[],a=t=>!(!t.autoFusion||!t.autoFusion.start),r=(e,s)=>{this.createNeumesFromNotes(t,e,Bt).forEach((t,e)=>{var i=s&&0===e;n.push({glyph:ls(t,i),neume:t,fused:i})})},o=(t,e)=>{for(var s=[],i=0,a=!!t[0].fused&&!ds(t[0]);i<t.length;){var o=ps(t,i);s.push({start:i,length:o.length,kind:o.kind,fused:a}),a=!!o.fusesNext,i+=o.length}for(var h=0;h<s.length&&s[h].fused&&s[h].kind;)h++;var l=s.length;if(e)for(;l>h&&s[l-1].kind&&(l===s.length||s[l].fused);)l--;var u=e=>n.push({glyph:{kind:e.kind,notes:t.slice(e.start,e.start+e.length),fused:e.fused},fused:e.fused});s.slice(0,h).forEach(u),l>h&&r(t.slice(s[h].start,s[l-1].start+s[l-1].length),s[h].fused),s.slice(l).forEach(u)},h=t=>{var e=[],s=!1,i=[],o=!1,h=!1,l=0,u=()=>{e.length&&n.push(...((t,e,s)=>{for(var i=[],n=(t,s)=>{var n=e||i.length>0;i.push({glyph:{kind:t,notes:s,fused:n},fused:n})},a=e=>os(t[e+1])-os(t[e]),r=0;r<t.length;){if(r===t.length-1){n(t[r].shape===cn.Virga?ns.Virga:ns.Punctum,[t[r]]);break}var o=a(r);if(0!==o&&r+1===t.length-1){n(o<0?ns.Flexus:ns.Pes,t.slice(r));break}if(s>=0&&o<0&&a(r+1)>0){if(r+2===t.length-1){n(ns.Porrectus,t.slice(r));break}n(ns.Flexus,t.slice(r,r+2)),s=a(r+1),r+=2}else n(ns.Punctum,[t[r]]),s=o,r++}return i})(e,s,l)),e=[]},c=()=>{i.length&&r(i,o),i=[]};t.forEach(t=>{if(!e.length||!cs(t)||t.fused||t.liquescent&un.InitioDebilis)if((t=>{switch(t.shape){case cn.Default:return!hs(t);case cn.Oriscus:case cn.Quilisma:return!0;case cn.Virga:return!(t.shapeModifiers&dn.Reverse);default:return!1}})(t)){var n=i[i.length-1];c(),us(t)&&u(),e.length||(s=!!t.fused||!a(t)&&!(t.liquescent&un.InitioDebilis),l=!n||us(t)||n.shape!==cn.Stropha&&n.shape!==cn.Virga?0:os(t)-os(n)),e.push(t),(h=cs(t)||t.shape===cn.Virga)&&u()}else u(),t.fused&&c(),i.length||(o=(!!t.fused||!a(t)&&h)&&!ds(t)),i.push(t),h=!1;else e.push(t),u(),h=!0}),u(),c()},l=0;l<e.length;){for(var u=i.has(e[l]),c=l+1;c<e.length&&i.has(e[c])===u&&(!u||!a(e[c]));)c++;if(u)h(e.slice(l,c));else for(var d=l;d<c;){for(var f=d+1;f<c&&!e[f].fused;)f++;o(e.slice(d,f),f<e.length&&!!e[f].fused&&!ds(e[f])),d=f}l=c}for(var g=[],p=[],m=0;m<n.length;){var x=m+1;if(n[m].glyph)for(;x<n.length&&n[x].fused&&n[x].glyph;)x++;var y,v=n.slice(m,x);if(v.length>1||v[0].glyph&&v[0].fused){var b=new FusedNeume(v.map(t=>t.glyph)),L=v[v.length-1].neume;L&&(b.trailingSpace=L.trailingSpace,b.keepWithNext=L.keepWithNext,b.allowLineBreakBeforeNext=L.allowLineBreakBeforeNext),b.notes.forEach((t,e)=>{t.alText&&(b.alText||(b.alText=[]),b.alText.push(t.alText),t.alText.noteIndex=e)}),y=[b]}else y=v[0].neume?[v[0].neume]:this.createNeumesFromNotes(t,v[0].glyph.notes,Bt);y.forEach((t,e)=>{g.push(t),p.push(0===e&&v[0].fused&&g.length>1)}),m=x}for(var S=0;S+1<g.length;S++){var C=g[S];p[S+1]?(C instanceof FusedNeume&&(C.fusedToNext=!0),g[S+1].fusedToPrevious=!0,C.trailingSpace=0,C.keepWithNext=!0,C.allowLineBreakBeforeNext=!1):C.trailingSpace.isDefault&&(C.keepWithNext=!0,g[S+1].notes[0].shape===cn.Quilisma?C.trailingSpace=0:(C.trailingSpace=qs(1),C.allowLineBreakBeforeNext=!0))}return ms(t,g,s),g}static createNoteFromData(t,e,i,n,a){var r=new Note;r.sourceIndex=a,r.sourceGabc=B(i);var o,h=this.marksForNext.episemaBlocks;if(h&&(h.above||h.below)&&(r.episemaTuning={above:h.above,below:h.below}),i.length<1)throw"Invalid note data: "+i;if("-"===i[0]?(r.liquescent=un.InitioDebilis,i=i.substring(1)):"@"===i[0]&&(r.fused=!0,i=i.substring(1)),i.length<1)throw"Invalid note data: "+i;if(i[0]===i[0].toUpperCase()){r.shape=cn.Inclinatum;let t=["descending","ascending","unison"][Number(i[1])];t&&(r.leaning=t)}this.setStaffPositionAndOffset(r,i,e),r.pitch=e.staffPositionToPitch(r.staffPosition);for(var l=n.length,u=r,c=t=>{let e=new Note;e.sourceIndex=a+d,e.sourceGabc=t,e.staffPosition=r.staffPosition,e.pitch=r.pitch,n.push(r),r=e,l++},d=1;d<i.length;d++){var f=i[d],g="\0",p=d+1<i.length;switch(p&&(g=i[d+1]),f){case".":if(o=null,r.morae.length>0&&n.length){var m=n.slice(-1)[0];r.morae.slice(-1)[0].note=m}o=new Mora(t,r),p&&"1"===g?o.positionHint=Pt.Above:p&&"0"===g&&(o.positionHint=Pt.Below),r.morae.push(o);break;case"_":var x=!1;for(o=new HorizontalEpisema(u);p;){if("0"===g)o.positionHint=Pt.Below;else if("1"===g)o.positionHint=Pt.Above;else if("2"===g)o.terminating=!0;else if("3"===g)o.alignment=ce.Left;else if("4"===g)o.alignment=ce.Center;else{if("5"!==g)break;o.alignment=ce.Right}o.alignment!==ce.Default&&o.positionHint!==Pt.Below&&(x=!0),(p=++d+1<i.length)&&(g=i[d+1])}u&&u.episemata.push(o),u===r&&x?u=r:l>=0&&n.length>0&&(u=n[--l]);break;case"'":o=new Ictus(t,r),p&&"1"===g?o.positionHint=Pt.Above:p&&"0"===g?o.positionHint=Pt.Below:r.shape===cn.Virga&&(o.positionHint=Pt.Above),r.ictus=o;break;case"|":r.inclinataFlags=(r.inclinataFlags||0)+1;break;case"r":if(p&&/^[0-8]$/.test(g)){switch(g){case"0":r.shapeModifiers|=dn.Cavum,r.shapeModifiers|=dn.Linea;break;case"1":r.accent=new Accent(t,r,kt.AcuteAccent);break;case"2":r.accent=new Accent(t,r,kt.GraveAccent);break;case"3":r.accent=new Accent(t,r,kt.Circle);break;case"4":r.accent=new Accent(t,r,kt.Semicircle);break;case"5":r.accent=new Accent(t,r,kt.ReversedSemicircle);break;case"6":r.accent=new MusicaFicta(t,r,kt.Flat);break;case"7":r.accent=new MusicaFicta(t,r,kt.Natural);break;case"8":r.accent=new MusicaFicta(t,r,kt.Sharp)}d++}else r.shapeModifiers|=dn.Cavum;break;case"R":r.shapeModifiers|=dn.Linea;break;case"s":r.shape===cn.Stropha&&c("s"),r.shape=cn.Stropha;break;case"v":r.shape===cn.Virga&&c("v"),r.shape=cn.Virga;break;case"V":if("V"===i[d-1]){r.shapeModifiers&=~dn.Reverse,c("V"),r.shape=cn.Virga;break}r.shape=cn.Virga,r.shapeModifiers|=dn.Reverse;break;case"w":r.shape=cn.Quilisma;break;case"W":r.shape=cn.Quilisma,r.quilismaQuadratum=!0;break;case"q":r.quadratum=!0;break;case"=":r.linea=!0;break;case"o":case"O":r.shape=cn.Oriscus,"O"===f&&(r.shapeModifiers|=dn.Stemmed),!p||"<"!==g&&"1"!==g?!p||">"!==g&&"0"!==g||(r.shapeModifiers|=dn.Descending,d++):(r.shapeModifiers|=dn.Ascending,d++);break;case"~":r.shape===cn.Inclinatum?r.liquescent|=un.Small:r.shape===cn.Oriscus?r.liquescent|=un.Large:r.liquescent|=un.Small;break;case"<":r.liquescent|=un.Ascending;break;case">":r.liquescent|=un.Descending;break;case"x":case"X":r.pitch.step===s.Mi?r.pitch.step=s.Me:r.pitch.step===s.Ti&&(r.pitch.step=s.Te);break;case"y":case"Y":r.pitch.step===s.Te?r.pitch.step=s.Ti:r.pitch.step===s.Me?r.pitch.step=s.Mi:r.pitch.step===s.Du?r.pitch.step=s.Do:r.pitch.step===s.Fu&&(r.pitch.step=s.Fa);break;case"#":r.pitch.step===s.Do?r.pitch.step=s.Du:r.pitch.step===s.Fa&&(r.pitch.step=s.Fu);break;case"[":for(var y=++d;d<i.length&&"]"!==i[d];)d++;this.processInstructionForNote(t,r,i.substring(y,d),y)}}n.push(r)}static processInstructionForNote(t,e,s,i){if("nocustos"!==s){if(!this.processDecorationForNote(e,s)){var n=s.match(Os);if(null!==n){var a=n[1],r=n[2];switch(a){case"cs":return e.choralSign=new ChoralSign(t,r,e,e.sourceIndex+i),void delete e.choralNabc;case"cn":return e.choralNabc=new NabcChoralSign(r,e,e.sourceIndex+i),void delete e.choralSign;case"alt":return void(e.alText=new AboveLinesText(t,r,e,e.sourceIndex+i));case"shape":return void(e.shapeHint=r);case"ll":return void(void 0===e.lowLedgerLine&&/^[01]$/.test(r)&&(e.lowLedgerLine="1"===r));case"hl":return void(void 0===e.highLedgerLine&&/^[01]$/.test(r)&&(e.highLedgerLine="1"===r))}if(null!==(n=s.match(Ds))){var o="o"===n[1],h=ge.CurlyBrace;switch(n[2]){case"b":h=ge.RoundBrace;break;case"cb":h=ge.CurlyBrace;break;case"cba":h=ge.AccentedCurlyBrace}var l="1"===n[3]?pe.Left:pe.Right;"{"===n[4]||n[5]?e.braceStart=new BracePoint(e,o,h,l):e.braceEnd=new BracePoint(e,o,h,l),n[5]&&(e.braceStart.automatic=!0,e.braceStart.length=mt(n[5]))}}}}else e.noCustos=!0}static endAutomaticBrace(t){t.braceEnd&&t.braceEnd.automatic&&delete t.braceEnd,!this.needToEndBrace||t.braceStart||t.braceEnd?t.braceStart&&t.braceStart.automatic&&(this.needToEndBrace=t.braceStart):(t.braceEnd=new BracePoint(t,this.needToEndBrace.isAbove,this.needToEndBrace.shape,this.needToEndBrace.attachment===pe.Left?pe.Right:pe.Left),t.braceEnd.automatic=!0,delete this.needToEndBrace)}static processDecorationForNote(t,e){if(this.processEpisemaTuning(e,t))return!0;var s=e.match(Vs);if(s){if(s[2]&&"o"===s[1])void 0===t.ledgerLineAbove&&(t.ledgerLineAbove="1"===s[2]);else if(s[2])void 0===t.ledgerLineBelow&&(t.ledgerLineBelow="1"===s[2]);else{let e=this.customLedgerLine(s);e&&(t.customLedgerLines=(t.customLedgerLines||[]).concat(e))}return!0}if(s=e.match(zs)){let e={isAbove:"o"===s[1],shift:Number(s[2]),kind:"{"===s[5]?"start":"}"===s[5]?"end":"fixed"};if("fixed"===e.kind){let t=mt(s[3]),i=mt(s[4]);if(void 0===t||void 0===i)return!0;e.width=t,e.height=i}return t.slurs=(t.slurs||[]).concat(e),!0}return!1}static processEpisemaTuning(t,e){var s=t.match(Rs);if(!s)return!1;var i="o"===s[1]?"above":"below",n=!(!s[2]&&!s[3]),a={};if(s[2]&&(a.position=s[2]),s[3]){let t=mt(s[3]);if(void 0===t)return!0;a.nudge=t}var r=this.marksForNext.episemaBlocks||{};return"{"===s[4]?r[i]||(this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{episemaBlocks:Object.assign(Object.assign({},r),{[i]:Object.assign(Object.assign({},a),{block:!0})})})):"}"===s[4]?n||(this.marksForNext=Object.assign(Object.assign({},this.marksForNext),{episemaBlocks:Object.assign(Object.assign({},r),{[i]:void 0})})):e&&n&&!r[i]&&(e.episemaTuning=Object.assign(Object.assign({},e.episemaTuning),{[i]:a})),!0}static customLedgerLine(t){var e="o"===t[1];if(t[3])return{isAbove:e,kind:"end"};var s=t=>"0"===t?0:"1"===t?"overhang":mt(t),i=s(t[4]),n=";"===t[5]?mt(t[6]):s(t[6]);return void 0===i||void 0===n?null:{isAbove:e,kind:";"===t[5]?"fixed":"start",left:i,right:n}}static splitWords(t){return this.splitMaskedWords(t).words}static splitMaskedWords(t,e){return e&&e.source===t?e:e&&((t,e)=>{for(var s=t.source,i=0,n=0,a=Math.min(s.length,e.length);i<a&&s.charCodeAt(i)===e.charCodeAt(i);)i++;for(;n<a-i&&s.charCodeAt(s.length-1-n)===e.charCodeAt(e.length-1-n);)n++;if(!ki.test(s.slice(i,s.length-n))&&!ki.test(e.slice(i,e.length-n))){for(var{words:r,maskedWords:o,starts:h}=t,l=0,u=h.length-1;l<u;){let t=l+u+1>>1;h[t]<=i?l=t:u=t-1}var c=l,d=h[c],f=h[c]+r[c].length;if(!(c<h.length-1&&s.length-n>=f)){var g=e.lastIndexOf("<",i-1);if(!(g>=d&&g>e.lastIndexOf(">",i-1))){var p=e.length-n,m=e.indexOf(">",p),x=e.indexOf("<",p);if(!(m>=0&&m<f+e.length-s.length&&(x<0||m<x)||Fi.test(e.charAt(i-1))||"%"===e.charAt(p)||Bi(hi(r[c]))!==o[c])){var y=e.length-s.length,v=e.slice(h[c],f+y);r=r.slice(),o=o.slice(),h=h.slice(),r[c]=v,o[c]=Bi(hi(v));for(var b=c+1;b<h.length;b++)h[b]+=y;return{source:e,words:r,maskedWords:o,starts:h}}}}}})(e,t)||(i=[],n=[],a=[],r=0,Bi(ri(s=t)).split(/\n/g).forEach(t=>{i.push(s.substr(r,t.length)),n.push(t),a.push(r),r+=t.length+1}),{source:s,words:i,maskedWords:n,starts:a});var s,i,n,a,r}static parseSource(t){return this.parseWords(this.splitWords(t))}static parseWords(t){for(var e=[],s=0;s<t.length;s++)e.push(this.parseWord(t[s]));return e}static parseWord(t){var e,s=[],i=[],n=ri(t);for(s.wordLength=t.length;e=ys.exec(n);)i.push(e);for(var a=0;a<i.length;a++){var r=i[a],o=t.substr(r.index,r[1].length).trim().split("|"),h=void 0===r[2]?r[2]:t.substr(r.index+r[1].length+1,r[2].length);s.push({notations:h,lyrics:o})}return s}static gabcHeightToExsurgeHeight(t){let e=t.toLowerCase();return e.charCodeAt(0)-"c".charCodeAt(0)-("p"===e?1:0)}static getStaffPositionOffset(t,e){let s=0;if(/0|9/.test(e)){const i=t%2?2:1;s=(Number(e)?i:-i)/3}return s}static setStaffPositionAndOffset(t,e,s){const i=this.gabcHeightToExsurgeHeight(e[0]);if(t.staffPositionOffset=0,s instanceof ChiRhoClef){let s=t instanceof Note&&/[A-NP]/.test(e[0])&&"0"===e[1]?void 0:e[1];i%2==0&&"9"!==s&&(s="0"),t.staffPositionOffset=this.getStaffPositionOffset(i,s)}t.staffPosition=i+t.staffPositionOffset}}Gabc.marksForNext=bi;class Titles extends ChantLayoutElement{constructor(t,e,{supertitle:s,title:i,subtitle:n,textLeft:a,textRight:r}={}){super(),this.score=e,this.setSupertitle(t,s),this.setTitle(t,i),this.setSubtitle(t,n),this.setTextLeft(t,a),this.setTextRight(t,r)}setBoundsX(t,e,s){let i=this[e];switch(t.textStyles[e].alignment){case"left":i.textAnchor="start",i.bounds.x=0;break;case"right":i.textAnchor="end",i.bounds.x=s;break;default:i.textAnchor="middle",i.bounds.x=s/2}}layoutTitles(t,e){this.bounds=new Rect(0,0,0,0);let s=0;for(let i of["supertitle","title","subtitle"]){let n=this[i];n&&(s&&(s+=n.padding(t)),n.recalculateMetrics(t),n.setMaxWidth(t,e),this.setBoundsX(t,i,e),n.bounds.y=s,this.bounds.union(n.bounds),n.bounds.y+=n.origin.y,s+=n.bounds.height+n.padding(t))}let i=s,n=this.score.overrideTextLeft||this.textLeft;return n&&(n.recalculateMetrics(t),n.bounds.y=s,this.bounds.union(n.bounds),n.bounds.y+=n.origin.y,i=s+n.bounds.height+n.padding(t)),this.textRight&&(this.textRight.recalculateMetrics(t),this.textRight.bounds.x=e,this.textRight.bounds.y=s,this.bounds.union(this.textRight.bounds),this.textRight.bounds.y+=this.textRight.origin.y,i=Math.max(i,s+this.textRight.bounds.height+this.textRight.padding(t))),i}setSupertitle(t,e){this.supertitle=e?new Supertitle(t,e):null}setTitle(t,e){this.title=e?new Title(t,e):null}setSubtitle(t,e){this.subtitle=e?new Subtitle(t,e):null}setTextLeft(t,e){this.textLeft=e?new TextLeftRight(t,e,"textLeft"):null}setTextRight(t,e){this.textRight=e?new TextLeftRight(t,e,"textRight"):null}hasSupertitle(t,e){return!!this.supertitle}hasTitle(t,e){return!!this.title}hasSubtitle(t,e){return!!this.subtitle}hasTextLeft(t,e){return!!this.textLeft}hasTextRight(t,e){return!!this.textRight}elements(){return[this.supertitle,this.title,this.subtitle,this.score.overrideTextLeft||this.textLeft,this.textRight]}draw(t,e=1){var s=t.canvasCtxt;s.translate(this.bounds.x,this.bounds.y);for(let e of this.elements())e&&e.draw(t);s.translate(-this.bounds.x,-this.bounds.y)}getInnerNodes(t,e="createSvgNode"){var s=[];for(let i of this.elements())i&&s.push(i[e](t));return s}createSvgNode(t){var e=this.getInnerNodes(t,"createSvgNode"),s=Wt.createNode("g",{class:"Titles"},e);return s.source=this,this.svg=s,s}createSvgTree(t){var e=this.getInnerNodes(t,"createSvgTree");return Wt.createSvgTree("g",{class:"Titles",source:this},...e)}createSvgFragment(t){var e="";for(let s of this.elements())s&&(e+=s.createSvgFragment(t));return e=Wt.createFragment("g",{class:"Titles"},e)}}const un={None:0,Large:1,Small:2,Ascending:4,Descending:8,InitioDebilis:16,LargeAscending:5,LargeDescending:9,SmallAscending:6,SmallDescending:10},cn={Default:0,Virga:1,Inclinatum:2,Quilisma:3,Stropha:4,Oriscus:5},dn={None:0,Ascending:1,Descending:2,Cavum:4,Stemmed:8,Linea:16,Reverse:32};class Note extends ChantLayoutElement{constructor(t){super(),this.pitch=void 0!==t?t:null,this.glyphVisualizer=null,this.staffPosition=4,this.liquescent=un.None,this.shape=cn.Default,this.shapeModifiers=dn.None,this.neume=null,this.episemata=[],this.morae=[]}setGlyph(t,e){this.shapeModifiers&dn.Cavum&&(e=Et[e]||e),this.glyphVisualizer?this.glyphVisualizer.setGlyph(t,e):this.glyphVisualizer=new GlyphVisualizer(t,e),this.glyphVisualizer.setStaffPosition(t,this.staffPosition),this.bounds.x=this.glyphVisualizer.bounds.x,this.bounds.y=this.glyphVisualizer.bounds.y,this.bounds.width=this.glyphVisualizer.bounds.width,this.bounds.height=this.glyphVisualizer.bounds.height,this.origin.x=this.glyphVisualizer.origin.x,this.origin.y=this.glyphVisualizer.origin.y}shapeModifierMatches(t){return t===dn.None?this.shapeModifiers===dn.None:0!==(this.shapeModifiers&t)}draw(t){this.glyphVisualizer.bounds.x=this.bounds.x,this.glyphVisualizer.bounds.y=this.bounds.y,this.glyphVisualizer.draw(t)}createSvgNode(t){return this.glyphVisualizer.bounds.x=this.bounds.x,this.glyphVisualizer.bounds.y=this.bounds.y,this.svgNode=this.glyphVisualizer.createSvgNode(t,this),this.svgNode}createSvgTree(t){return this.glyphVisualizer.bounds.x=this.bounds.x,this.glyphVisualizer.bounds.y=this.bounds.y,this.glyphVisualizer.createSvgTree(t,this)}createSvgFragment(t){return this.glyphVisualizer.bounds.x=this.bounds.x,this.glyphVisualizer.bounds.y=this.bounds.y,this.glyphVisualizer.createSvgFragment(t,this)}}class Clef extends ChantNotationElement{constructor(t,e,s=null){super(),this.isClef=!0,this.staffPosition=t,this.octave=e,this.defaultAccidental=s,this.activeAccidental=s,this.keepWithNext=!0}resetAccidentals(){this.activeAccidental=this.defaultAccidental}pitchToStaffPosition(t){}glyphCode(){return kt.None}performLayout(t){t.activeClef=this,super.performLayout(t);var e=new GlyphVisualizer(t,this.glyphCode());e.setStaffPosition(t,this.staffPosition),this.addVisualizer(e),this.finishLayout(t)}pitchAt(t,e,s){return this.activeAccidental&&this.activeAccidental.staffPosition===s&&(t+=this.activeAccidental.accidentalType),new Pitch(t,this.octave+e)}finishLayout(t){if(this.defaultAccidental){var e=this.defaultAccidental.createGlyphVisualizer(t);e.bounds.x+=this.visualizers[0].bounds.right()+t.intraNeumeSpacing,this.addVisualizer(e)}this.secondClef&&this.addSecondClef(t),super.finishLayout(t)}hide(t){this.visualizers=[],"invisible"===t.clefVisibility&&(this.bounds.width=0)}addSecondClef(t){var e=this.secondClef;e.performLayout(t),t.activeClef=this;var s=Math.abs(e.staffPosition-this.staffPosition)>2?0:this.bounds.right()+t.intraNeumeSpacing;for(var i of e.visualizers)i.bounds.x+=s,this.addVisualizer(i)}static default(){return fn}clone(){if(this.model)return this.model.clone();let t=new this.constructor(this.staffPosition,this.octave,this.defaultAccidental);return t.small=this.small,t.sans=this.sans,t.secondClef=this.secondClef&&this.secondClef.clone(),t.sourceGabc=this.sourceGabc,t.sourceIndex=this.sourceIndex,t.elementIndex=this.elementIndex,t.model=this,t}}class DiatonicClef extends Clef{constructor(t,e,s=null){super(t,e,s),this.leadingSpace=0}pitchToStaffPosition(t){return 7*(t.octave-this.octave)+this.staffPosition+Pitch.stepToStaffOffset(t.step)-Pitch.stepToStaffOffset(this.clefStep)}staffPositionToPitch(t){var e=t-this.staffPosition+Pitch.stepToStaffOffset(this.clefStep);return this.pitchAt(Pitch.staffOffsetToStep(e),Math.floor(e/7),t)}}class DoClef extends DiatonicClef{get clefStep(){return s.Do}glyphCode(){return kt.DoClef}}var fn=new DoClef(7,2);class FaClef extends DiatonicClef{get clefStep(){return s.Fa}glyphCode(){return kt.FaClef}}class TrebleClef extends DiatonicClef{constructor(t,e,s=null,i=!1){super(t,e,s),this.small=i}get clefStep(){return s.So}glyphCode(){return this.small?kt.TrebleClefSmall:kt.TrebleClef}}class ChiRhoClef extends Clef{constructor(t,e,s=null,i=!1){super(t,e,s),this.leadingSpace=0,this.sans=i}pitchToStaffPosition(t){var e=12*(t.octave-this.octave)+t.step;return this.staffPosition+2*e/3}staffPositionToPitch(t){var e=Math.ceil(3*(t-this.staffPosition)/2-.5),s=Math.floor(e/12);return this.pitchAt(e-12*s,s,t)}glyphCode(){return this.sans?kt.ChiRhoClefSans:kt.ChiRhoClef}}class TextOnly extends ChantNotationElement{constructor(t,e){super(),this.sourceIndex=t,this.sourceLength=e,this.sourceGabc="",this.trailingSpace=0}performLayout(t){super.performLayout(t),this.addVisualizer(new GlyphVisualizer(t,kt.None)),this.origin.x=0,this.origin.y=-t.staffInterval,this.finishLayout(t)}}class ChantLineBreak extends ChantNotationElement{constructor(t,e="auto"){super(),this.calculatedTrailingSpace=this.layoutTrailingSpace=this.trailingSpace=0,this.justify=t,this.custos=e}performLayout(t){this.layoutId=oe(),this.bounds=new Rect(0,0,0,0),this.needsLayout=!1}clone(){var t=new ChantLineBreak;return t.justify=this.justify,t.custos=this.custos,t}}class ChantMapping{constructor(t,e,s){this.source=t,this.notations=e,this.sourceIndex=s}}const gn=new WeakMap;function pn(t){var e=Math.floor(t.dropCapLines);return e>=0&&e<1/0?e:1}function mn(t){var e=t.dropCapPosition,s=t.dropCapAnchor;return{position:"firsttop"===e||"firstbaseline"===e||"lastbottom"===e?e:"lastbaseline",anchor:"top"===s||"bottom"===s?s:"baseline"}}const xn=new WeakMap;class ChantScore{constructor(t,e=[],s){this.dropCapRelayouts=0,this.firstPageEmpty=!1,this.mappings=e,this.lines=[],this.notes=[],this.staffLineCount=4,this.language=null,t&&(this.titles=new Titles(t,this)),this.startingClef=null,this.useDropCap=s,this.dropCap=null,this.annotation=null,this.compiled=!1,this.autoColoring=!0,this.needsLayout=!0,this.extendLastSystemStaffLines=!0,this.bounds=new Rect,t&&this.updateNotations(t)}copyLines(t,e){let s=new ChantScore;s.lines=this.lines.slice(t,e),s.bounds=this.bounds.clone();let i=s.lines.slice(-1)[0];if(s.bounds.height=i.bounds.bottom()-i.origin.y,0===t){s.titles=this.titles,s.dropCap=this.dropCap,s.annotation=this.annotation;let t=this.dropCap;t&&e<=this.lastLineBesideDropCap&&(s.bounds.height=Math.max(s.bounds.height,s.lines[0].bounds.y+t.bounds.y-t.origin.y+t.bounds.height))}return s}updateSelection(t){this.selection=t;const e=t&&t.element||{indices:[]},s=e.indices,i=new Set(s);let n=e.insertion;!n&&1===s.length&&this.notes[s[0]]instanceof TextOnly&&(n={afterElementIndex:s[0]});for(let t=0;t<this.notes.length;++t){this.notes[t].selected=i.has(t)}(this.startingClef.model||this.startingClef).selected=i.has(-1);for(let t=0;t<this.lines.length;++t)this.lines[t].insertionCursor=null;this.insertionElement=null;let a=null;if(n)if("number"==typeof n.chantLine)a=this.lines[n.chantLine],this.insertionElement=a.startingClef,a.insertionCursor=new InsertionCursor;else if("number"==typeof n.afterElementIndex){if(this.insertionElement=this.notes[n.afterElementIndex],this.insertionElement?this.insertionElement.neume&&(this.insertionElement=this.insertionElement.neume):(a=this.lines[0],this.insertionElement=a.startingClef),!a){a=this.insertionElement.line||this.lines[this.lines.length-1];let t=this.insertionElement.notationIndex;void 0!==t&&t<a.notationsStartIndex&&(this.insertionElement=a.startingClef)}a.insertionCursor=new InsertionCursor}}updateNotations(t){var e,s,i,n;this.notations=[],this.notes=[],this.hasLyrics=!1,this.hasAboveLinesText=!1,this.hasTranslations=!1;const a=this.selection&&this.selection.element||{indices:[]},r=new Set(a.indices);let o=0;for(this.startingClef=null,e=0;e<this.mappings.length;e++)for(i=this.mappings[e],s=0;s<i.notations.length;s++){if((n=i.notations[s]).score=this,n.mapping=i,!this.startingClef)if(n.isNeume)this.startingClef=Clef.default();else if(n.isClef){this.startingClef=n;continue}n.notationIndex=this.notations.push(n)-1,!this.hasLyrics&&n.hasLyrics()&&(this.hasLyrics=!0),this.updateLanguage(n),!this.hasAboveLinesText&&n.alText&&(this.hasAboveLinesText=!0),!this.hasTranslations&&n.translationText&&(this.hasTranslations=!0);let t=n.notes||[n];for(let e of t){let t=e.elementIndex=this.notes.push(e)-1;e instanceof Note?e.noteIndex=t-o:++o,e.selected=r.has(t)}}this.startingClef||(this.startingClef=Clef.default()),this.startingClef.elementIndex=-1,this.updateVerseNumbers(),this.useDropCap||this.dropCap?this.recreateDropCap(t):this.updateFirstWordStyles(t),this.needsLayout=!0}updateVerseNumbers(){var t=[];for(let e of this.notations)e.lyrics.forEach((e,s)=>{e.verseNumber||e.endsVerseNumbers?t[s]=e.verseNumber:e.verseNumberInEffect!==t[s]&&(e.verseNumberInEffect=t[s],delete e.verseNumberCopy)})}updateLanguage(t){if(this.language)for(let e of t.lyrics)e&&e.language!==this.language&&(e.language=this.language,t.needsLayout=!0)}recreateDropCap(t){this.dropCap=null;var e=this.useDropCap&&0!==pn(t),s=this.notations.find(t=>t.hasLyrics()&&null!==t.lyrics[0]&&t.lyrics[0].spans&&t.lyrics[0].spans.length);for(let i of this.notations){let n=i.lyrics[0];if(i===s){let s=n.dropCap;e&&s||n.setFirstWordStyles(t,null),e?this.dropCap=n.generateDropCap(t):n.removeDropCap(t),e&&s&&n.dropCap===s||(i.needsLayout=!0)}else n&&n.dropCap&&(n.removeDropCap(t),i.needsLayout=!0)}this.updateFirstWordStyles(t)}updateBrackets(){var t=new Map,e=null,s={low:0,high:0},i=!1;for(let n of this.notations)for(let a of n.notes||[])a.bracketRanges&&(i=!0),a.bracketStart&&!e&&(e=a,s={low:a.staffPosition,high:a.staffPosition}),e&&(s.low=Math.min(s.low,a.staffPosition),s.high=Math.max(s.high,a.staffPosition),a.bracketEnd&&(t.set(e,Object.assign(Object.assign({},t.get(e)),{start:s})),t.set(a,Object.assign(Object.assign({},t.get(a)),{end:s})),e=null));if(t.size||i){var n=(t,e)=>t===e||!!t&&!!e&&t.low===e.low&&t.high===e.high,a={};for(let e of this.notations)for(let s of e.notes||[]){let i=s.bracketRanges||a,r=t.get(s)||a;n(i.start,r.start)&&n(i.end,r.end)||(s.bracketRanges=t.get(s),e.needsLayout=!0)}}}updateFirstWordStyles(t){const e=[];for(const t of this.notations){const s=t.hasLyrics()?t.lyrics[0]:null;if(s&&s.spans&&s.spans.length&&(e.push(s),s.lyricType!==ie.BeginningSyllable&&s.lyricType!==ie.MiddleSyllable))break}for(const s of this.firstWordLyrics||[])!e.includes(s)&&s.setFirstWordStyles(t,null)&&(s.notation.needsLayout=!0);e.forEach((e,s)=>{e.setFirstWordStyles(t,0===s?"syllable":"word")&&(e.notation.needsLayout=!0)}),this.firstWordLyrics=e}initializeLayout(t){t.activeClef=this.startingClef,t.notations=this.notations,t.currNotationIndex=0,t.staffLineCount=this.staffLineCount,this.updateBrackets(),H(t,this.notations),this.dropCap&&this.dropCap.measureAtSize(t),this.annotation&&this.annotation.recalculateMetrics(t)}performLayout(t,e){if(e||!1!==this.needsLayout){t.noticeFontChanges(),t.updateHyphenWidth(),this.initializeLayout(t);for(let s=0;s<this.notations.length;s++){let i=this.notations[s];e||i.needsLayout?(t.currNotationIndex=s,i.performLayout(t)):i.isClef&&(t.activeClef=i)}this.needsLayout=!1}}performLayoutAsync(t,e){!1!==this.needsLayout?(t.noticeFontChanges(),this.waitForLyricFont(t,()=>{this.initializeLayout(t),setTimeout(()=>this.layoutElementsAsync(t,0,e),0)})):e&&setTimeout(()=>e(),0)}waitForLyricFont(t,e){const s=()=>(t.updateHyphenWidth(),t.hyphenWidth>0&&t.hyphenWidth/t.textStyles.lyric.size<=.6);if(s())return void e();const i=new Lyric(t,t.syllableConnector,ie.SingleSyllable),n=i.spans.map(e=>({font:i.getCanvasFontForProperties(t,e.properties),text:e.text})),a=t.textMeasuringStrategy!==Qt.OpenTypeJS&&"undefined"!=typeof document&&document.fonts;if(a){let s;try{s=n.every(({font:t,text:e})=>a.check(t,e))}catch(t){s=!0}if(s)return void e();let i=!1;const r=()=>{i||(i=!0,clearTimeout(o),t.clearTextCache(),t.updateHyphenWidth(),e())},o=setTimeout(r,t.fontLoadTimeout),h=()=>setTimeout(r,0);return void Promise.all(n.map(({font:t,text:e})=>a.load(t,e))).then(h,h)}const r=n.map(({font:t})=>t).join("|");if(gn.get(t)===r)return void e();const o=Date.now()+t.fontLoadTimeout,h=()=>{t.clearTextCache(),s()?e():Date.now()>=o?(gn.set(t,r),e()):setTimeout(h,100)};setTimeout(h,100)}layoutElementsAsync(t,e,s){if(e>=this.notations.length)return this.needsLayout=!1,void(s&&setTimeout(()=>s(),0));0===e&&(t.activeClef=this.startingClef);var i=(new Date).getTime()+50;do{var n=this.notations[e];n.needsLayout?(t.currNotationIndex=e,n.performLayout(t)):n.isClef&&(t.activeClef=n),e++}while(e<this.notations.length&&(new Date).getTime()<i);setTimeout(()=>this.layoutElementsAsync(t,e,s),0)}linesBesideDropCap(){return this.dropCap?this.dropCap.linesBeside||1:0}get lastLineBesideDropCap(){return Math.max(0,Math.min(this.linesBesideDropCap(),this.lines.length)-1)}staffTop(t){return t.calculateHeightFromStaffPosition(2*this.staffLineCount-1)}lineExtent(t,e,s){var i=0,n=0;return(0===e||e<this.linesBesideDropCap())&&(this.dropCap&&(i=this.dropCap.bounds.width+2*this.dropCap.padding),!this.annotation||t.mergeAnnotationWithTextLeft&&!this.dropCap||(i=Math.max(i,this.annotation.bounds.width+2*this.annotation.padding)),this.dropCap&&!this.dropCapOnFirstLine(t)&&(n=i)),{left:i,right:s>0?s:1/0,textLeft:n}}dropCapOnFirstLine(t){var{position:e,anchor:s}=mn(t);return 1===this.linesBesideDropCap()&&"baseline"===s&&("lastbaseline"===e||"firstbaseline"===e)}annotationTop(t,e,s){var i=this.staffTop(t),n=e-this.annotation.bounds.height-this.annotation.padding-this.dropCap.origin.y;return n<i?n:s?(i+n)/2:i}startDropCapLayout(t){var e=this.dropCap;e&&!this.dropCapRelayouts&&(e.linesBeside=Math.max(1,pn(t)),e.sizeForLines&&e.measureAtSize(t))}fitDropCap(t){var e=this.dropCap,{position:s,anchor:i}=mn(t),n=this.dropCapRelayouts;if(this.dropCapRelayouts=0,!e||this.linesBesideDropCap()<2||!t.hasDefaultDropCapSize()||!("lastbaseline"===s&&"baseline"===i||"firsttop"===s&&"top"===i))return!1;e.fitBoundsToLetter(t);var a=this.lines[0],r=this.lines[this.lastLineBesideDropCap],o=e.sizeForLines,h=r.bounds.y-a.bounds.y+r.lyricLineBaseline-this.staffTop(t),l=e.fontSize(t)*h/e.origin.y;if(!(l>0))return!1;e.measureAtSize(t,l);var u=this.lineExtent(t,0,0).left-a.staffLeft;return Math.abs(u)>=.5&&n<2?(this.dropCapRelayouts=n+1,!0):(u>=.5&&e.measureAtSize(t,o),!1)}placeDropCap(t){var e=this.dropCap,s=this.lines;if(!e||this.dropCapOnFirstLine(t))return 0;e.fitBoundsToLetter(t);var i=this.lastLineBesideDropCap,n=s[0],a=s[i],r=a.bounds.y-n.bounds.y,{position:o,anchor:h}=mn(t),l="firsttop"===o?this.staffTop(t):"firstbaseline"===o?n.lyricLineBaseline:"lastbottom"===o?r+a.notationBounds.bottom():r+a.lyricLineBaseline;"top"===h?l+=e.origin.y:"bottom"===h&&(l-=e.bounds.height-e.origin.y),e.bounds.x=n.staffLeft/2,e.bounds.y=l;var u=l-e.origin.y,c=u+e.bounds.height;if(this.annotation){let e=this.annotationTop(t,l,!1);this.annotation.bounds.y=e+this.annotation.origin.y,u=Math.min(u,e)}var d=n.reach(u,-1/0).above,f=a.reach(1/0,c-r).below;return s.forEach((t,e)=>t.bounds.y+=d+(e>i?f:0)),d+f}layoutChantLines(t,e,s){var i=this.lines;if(this.lines=[],this.keptInAreas=null,t.noticeFontChanges(),this.startDropCapLayout(t),t.mergeAnnotationWithTextLeft&&this.annotation&&!this.dropCap){let e=this.annotation,s=e.annotations?e.annotations.map(t=>t.spans):[e.spans];this.overrideTextLeft=new TextLeftRight(t,"","textLeft"),t.mapAnnotationSpansToTextLeft&&(s=s.map(t.mapAnnotationSpansToTextLeft)),this.overrideTextLeft.spans=t.mergeAnnotationWithTextLeft(...s,this.titles.textLeft&&this.titles.textLeft.spans)}else this.overrideTextLeft=null;var n=e>0?this.titles.layoutTitles(t,e):0,a=0;t.activeClef=this.startingClef,delete t.lastStartBrace,delete t.openSlurs,delete t.openLedgerLines;var r=t.staffInterval*t.spaceBetweenSystems,o="optimal"===t.lineBreaking&&e>0?new LineBreaker(this,t,e):null;o&&o.plannedEnd(0,0);var h=this.lineLayoutSettings(t,e,!!o),l=this.reusableLines(t,e,i,h,o);do{var u;if(this.lines.length<l)u=i[this.lines.length],this.reuseLine(t,u);else{u=new ChantLine(this);let s=a,i=t.activeClef,n=this.lineExtent(t,this.lines.length,e);o&&(u.plannedEnd=o.plannedEnd(this.lines.length,a)),u.buildFromChantNotationIndex(t,a,e),u.performLayout(t),h&&this.recordLineLayout(t,u,s,i,n)}a=u.notationsStartIndex+u.numNotationsOnLine,u.elementIndex=this.lines.length,this.lines.push(u),u.bounds.y=-u.notationBounds.y+n,n+=u.bounds.height+r}while(a<this.notations.length);this.linesLaidOutWith=h,this.fitDropCap(t)?this.layoutChantLines(t,e,s):(n+=this.placeDropCap(t),this.lines[0],this.bounds.x=0,this.bounds.y=0,this.bounds.width=Math.max(...this.lines.map(t=>t.bounds.width)),this.bounds.height=n-r,this.pages=[this],this.firstPageEmpty=!1,this.laidOutLines={lines:this.lines,ys:this.lines.map(t=>t.bounds.y)},this.selection&&this.updateSelection(this.selection),s&&s(this))}lineLayoutSettings(t,e,s){if(!this.dropCap||this.dropCapOnFirstLine(t))return[Qe(this,t),"planned="+s,"width="+e,"staffLineCount="+this.staffLineCount,"extendLastSystemStaffLines="+this.extendLastSystemStaffLines].join(";")}reusableLines(t,e,s,i,n){if(!i||i!==this.linesLaidOutWith)return 0;for(var a=this.notations,r=this.startingClef,o=0,h=0,l=0;l<s.length&&o<a.length;l++){var u=s[l],c=xn.get(u),d=We(o),f=this.lineExtent(t,l,e);if(!c||c.clef!==r||c.clefLayoutId!==r.layoutId||c.extent.left!==f.left||c.extent.right!==f.right||c.extent.textLeft!==f.textLeft||!He(a,d,c)||c.sourceIndices.some((t,e)=>a[d+e].mapping.sourceIndex!==t)||n&&(n.plannedEnds.get(l+":"+o)!==u.plannedEnd||d+c.read.length>n.touchedFrom))break;var g=c.first;if(g&&(g.dropCap!==this.dropCap||g.annotation!==this.annotation||g.sizes!==this.dropCapAndAnnotationSizes()))break;r=c.clefAfter,o=u.notationsStartIndex+u.numNotationsOnLine,c.leftOpen||(h=l+1)}return h}recordLineLayout(t,e,s,i,n){var a=this.notations,r=We(s),o=a.slice(r,e.readEnd(t)),h=[],l=t=>!!t&&Object.keys(t).length>0;for(var u of o)u.translationText&&u.translationText.length&&h.push(u,u.translationText[0].endNeume);var c={read:o,layoutIds:o.map(t=>t.layoutId),toEnd:r+o.length===a.length,translationEnds:h,sourceIndices:o.map(t=>t.mapping.sourceIndex),clef:i,clefLayoutId:i.layoutId,clefAfter:t.activeClef,extent:n,leftOpen:!!t.lastStartBrace||l(t.openSlurs)||l(t.openLedgerLines)};if(e.isFirstLine){var d=this.dropCap,f=this.annotation;c.first={dropCap:d,annotation:f,sizes:this.dropCapAndAnnotationSizes(),placed:[d?d.bounds.x:0,d?d.bounds.y:0,f?f.bounds.x:0,f?f.bounds.y:0]}}xn.set(e,c)}reuseLine(t,e){var s=xn.get(e),i=s.first;t.activeClef=s.clefAfter,i&&(this.dropCap&&(this.dropCap.bounds.x=i.placed[0],this.dropCap.bounds.y=i.placed[1]),this.annotation&&(this.annotation.bounds.x=i.placed[2],this.annotation.bounds.y=i.placed[3]))}dropCapAndAnnotationSizes(){return[this.dropCap,this.annotation].map(t=>t?[t.bounds.width,t.bounds.height,t.origin.x,t.origin.y,t.padding].join():"").join(";")}paginate(t,e=t){if(!t)return;const s=this.laidOutLines;s&&s.lines===this.lines&&this.lines.forEach((t,e)=>t.bounds.y=s.ys[e]),this.pages=[];let i=Number.isFinite(e)?Math.min(e,t):t;this.firstPageEmpty=i<t&&this.copyLines(0,this.lastLineBesideDropCap+1).bounds.height>i,this.firstPageEmpty&&(i=t);let n=0,a=0;for(let e=1;e<this.lines.length;++e){let s=this.lines[e];s.bounds.bottom()-n-s.origin.y>i&&e>this.lastLineBesideDropCap?(this.pages.push(this.copyLines(a,e)),a=e,n=s.bounds.y-s.origin.y,s.bounds.y=s.origin.y,i=t):s.bounds.y-=n}this.pages.push(this.copyLines(a,this.lines.length))}draw(t,e=1){t.setCanvasSize(this.bounds.width,this.bounds.height,e);var s=t.canvasCtxt;s.clearRect(0,0,t.canvas.width,t.canvas.height),s.translate(this.bounds.x,this.bounds.y),this.titles&&this.titles.draw(t);for(var i=0;i<this.lines.length;i++)this.lines[i].draw(t);s.translate(-this.bounds.x,-this.bounds.y)}getSvgProps(t,e){let s="number"==typeof e?e*this.bounds.width:e?void 0:this.bounds.width,i=e?void 0:this.bounds.height;return{xmlns:Wt.ns,"xmlns:xlink":Wt.xlink,version:"1.1",class:t.getSvgClass()+(t.editable?" EditableChantScore":""),width:s,height:i,viewBox:[0,0,this.bounds.width,this.bounds.height].join(" ")}}createSvgNode(t){var e=[t.defsNode.cloneNode(!0)];e[0].appendChild(t.createStyleNode()),this.titles&&e.push(this.titles.createSvgNode(t));for(var s=0;s<this.lines.length;s++)e.push(this.lines[s].createSvgNode(t));var i=Wt.createNode("g",{},e);return(i=Wt.createNode("svg",this.getSvgProps(t),i)).source=this,this.svg=i,i}createSvgTree(t,e){var s=[Wt.createSvgTree("defs",{},...t.makeDefs.map(t=>t.makeSvgTree()),t.createStyleTree())];this.titles&&s.push(this.titles.createSvgTree(t));for(var i=0;i<this.lines.length;i++)s.push(this.lines[i].createSvgTree(t));var n=Wt.createSvgTree("g",{},...s);let a=this.getSvgProps(t,e);return a.source=this,n=Wt.createSvgTree("svg",a,n)}createDefsFragment(t){var e="";for(var s in t.defs)t.defs.hasOwnProperty(s)&&(e+=t.defs[s]);return e+=t.createStyle(),Wt.createFragment("defs",{},e)}lineSvgProps(t,e){return{xmlns:Wt.ns,version:"1.1",class:t.getSvgClass(),width:this.bounds.width,height:e,viewBox:[0,0,this.bounds.width,e].join(" ")}}createSvg(t){var e=this.createDefsFragment(t);this.titles&&(e+=this.titles.createSvgFragment(t));for(var s=Qe(this,t),i=0;i<this.lines.length;i++)e+=this.lines[i].createSvgFragment(t,0,this.lineSvgKey(this.lines[i],s));return e=Wt.createFragment("g",{},e),e=Wt.createFragment("svg",this.getSvgProps(t),e)}lineSvgKey(t,e){if(!t.insertionCursor){for(var s=t.score,i=s.notations,n=t.notationsStartIndex+t.numNotationsOnLine,a=t=>t.selected||t.model&&t.model.selected?1:0,r=t=>{var e=t.layoutId+":"+(t.mapping?t.mapping.sourceIndex:"")+":";if(!t.notes)return e+a(t);for(var s of t.notes)e+=a(s);return e},o=e+"|"+r(t.startingClef),h=t.notationsStartIndex;h<n;h++)o+=","+r(i[h]);return t.custos&&(o+="|"+r(t.custos)),t.isFirstLine&&(o+="|"+s.dropCapAndAnnotationSizes()+[s.dropCap,s.annotation].map(t=>t&&[t.bounds.x,t.bounds.y]).join()),o}}dropCapTransformBesideLine(t,e){var s=this.lines[0];return this.dropCap&&t>0&&t<=this.lastLineBesideDropCap?"translate("+s.bounds.x+","+(s.bounds.y-e)+")":null}createSvgNodeForEachLine(t){for(var e=[],s=0,i=0;i<this.lines.length;i++){var n=[t.defsNode.cloneNode(!0),this.lines[i].createSvgNode(t,s)];n[0].appendChild(t.createStyleNode());var a=this.dropCapTransformBesideLine(i,s);a&&n.push(Wt.createNode("g",{transform:a},this.dropCap.createSvgNode(t)));var r=this.lines[i].bounds.height+1.5*t.staffInterval,o=Wt.createNode("g",{},n);o=Wt.createNode("svg",this.lineSvgProps(t,r),o),e.push(o),s+=r}return e}createSvgForEachLine(t){for(var e="",s=this.createDefsFragment(t),i=0,n=0;n<this.lines.length;n++){var a=s+this.lines[n].createSvgFragment(t,i),r=this.dropCapTransformBesideLine(n,i);r&&(a+=Wt.createFragment("g",{transform:r},this.dropCap.createSvgFragment(t)));var o=this.lines[n].bounds.height+1.5*t.staffInterval;a=Wt.createFragment("g",{},a),e+=a=Wt.createFragment("svg",Object.assign(Object.assign({},this.lineSvgProps(t,o)),{"xmlns:xlink":Wt.xlink}),a),i+=o}return e}unserializeFromJson(t,e){this.autoColoring=t["auto-coloring"],null!==t.annotation&&""!==t.annotation?this.annotation=new Annotation(e,t.annotation):this.annotation=null;var s="auto"===t["drop-cap"];Gabc.parseChantNotations(t.notations,this,s)}serializeToJson(){var t={type:"score","auto-coloring":!0};return null!==this.annotation?t.annotation=this.annotation.unsanitizedText:t.annotation="",t}}t.AboveLinesText=AboveLinesText,t.Accent=Accent,t.Accidental=Accidental,t.AccidentalType=ye,t.Ancus=Ancus,t.Annotation=Annotation,t.Annotations=Annotations,t.Apostropha=Apostropha,t.Bivirga=Bivirga,t.BraceAttachment=pe,t.BracePoint=BracePoint,t.BraceShape=ge,t.BraceVisualizer=BraceVisualizer,t.CavumGlyphCode=Et,t.CenteredTitle=CenteredTitle,t.Centimeters=function(t){return e.ToDeviceIndependent(t,e.Centimeters)},t.ChantContext=class ChantContext{constructor(t=(Wt.hasDOMAccess()?Qt.Canvas:Qt.OpenTypeJS)){this.fontDictionary=void 0,Ct(),this.clearTextCache(),function(){if(St)return;const t="undefined"!=typeof document&&document.fonts;t&&"function"==typeof t.addEventListener&&(St=!0,t.addEventListener("loadingdone",()=>Lt++))}(),this.staffLineCount=4,this.textMeasuringStrategy=t,this.getFontFilenameForProperties=xt,this.defs={},this.makeDefs=[],Wt.hasDOMAccess()&&(this.defsNode=Wt.createNode("defs")),this.textStyles={},this.textColor="#000",this.setFont("'Palatino Linotype', 'Book Antiqua', Palatino, serif",16),this.rubricColor="#d00",this.specialCharProperties={"font-family":"'Exsurge Characters'",fill:this.rubricColor,class:"rubric"},this.textBeforeSpecialChar="",this.textAfterSpecialChar=".",this.specialCharMap={"℣":"v","℟":"r","+":"+","*":"*"},this.specials={"*":"*","+":"†","-":"","\\":"\\","&":"&","#":"#",_:"_","%":"%",ot:"⁀",ut:"‿",dt:"⁀‿"},this.plusProperties={},this.asteriskProperties={},this.specialCharText=t=>this.specialCharMap[t]||t,this.fontStyleDictionary={b:{"font-weight":"bold"},i:{"font-style":"italic"},u:{"text-decoration":"underline"},ul:{"text-decoration":"underline"},c:{fill:this.rubricColor,class:"rubric"},sc:{"font-variant":"small-caps"},tt:{"font-family":"monospace"},v:{},e:{"font-style":"italic","font-size":"90%"}},this.markupSymbolDictionary={"*":"b",_:"i","^":"c","%":"sc"},this.textStyles.al.prefix="<i>",this.textStyles.translation.prefix="<i>",this.textStyles.dropCap.padding=1,this.textStyles.annotation.padding=1,this.minLedgerSeparation=0,this.ledgerLineHeuristic=!0,this.minSpaceAboveStaff=2,this.minSpaceBelowStaff=1,this.spaceBetweenSystems=1.5,this.glyphPunctumWidth=h.PunctumQuadratum.bounds.width,this.glyphPunctumHeight=h.PunctumQuadratum.bounds.height,this.inclinatumLeaning=!0,this.maxExtraSpaceInStaffIntervals=.5,this.activeClef=null,this.neumeLineColor="#000",this.staffLineColor="#000",this.dividerLineColor="#000",this.negativeFillColor="#fff",this.clefVisibility="visible",this.modeNumberSystem="roman-majuscule",this.dropCapLines=1,this.dropCapPosition="lastbaseline",this.dropCapAnchor="baseline",this.defaultLanguage=o.latin,this.lyricCentering="vowel",this.italicMeansElision=!0,this.lyricTie="space",this.repeatVerseNumbers=!0,this.firstWordStyle={},this.firstSyllableStyle={},this.firstSyllableInitialStyle={},this.translationCentering="left",this.defaultProtrusionFactor=1,this.pixelRatio="undefined"==typeof window?1:window.devicePixelRatio||1,t===Qt.Svg?(this.svgTextMeasurer=Wt.svg(0,0),this.svgTextMeasurer.setAttribute("id","TextMeasurer"),this.svgTextMeasurer.setAttribute("class",this.getSvgClass()),this.svgTextMeasurer.setAttribute("style","position:absolute"),document.body.insertBefore(this.svgTextMeasurer,document.body.firstChild)):t===Qt.Canvas&&this.makeCanvasIfNeeded(),this.syllableConnector="-",this.fontLoadTimeout=3e3,this.scaleDefs=!0,this.setGlyphScaling(1/16),this.interSyllabicMultiplier=2.5,this.accidentalSpaceMultiplier=2,this.interVerbalMultiplier=1,this.neumeSpaceMultipliers={"/0":.5,"/!":1,"/":1,"//":2," ":2},this.drawGuides=!1,this.drawDebuggingBounds=!0,this.activeNotations=null,this.currNotationIndex=-1,this.minSyllablesLastLine=0,this.minNotesLastLine=0,this.condensingTolerance=.3,this.eolCustos="auto",this.lineBreaking="greedy",this.finalHyphenDemerits=0,this.autoColor=!0,this.useExtraTextOnly=!0,this.noteIdPrefix="note-",this.defIdPrefix="",this.nabcLines=0,this.lyricLines=0,this.nabcFonts=[],this.nabcSize=8/Mt.pointsPerStaffInterval,this.nabcAlignment="full",this.nabcVisibility=["visible","visible"],this.insertFontsInDoc(),this.setMergeAnnotationWithTextLeft(!0)}convertStaffPositionToSymmetric(t){return t-this.staffLineCount}convertSymmetricStaffPosition(t){return t+this.staffLineCount}getFontForProperties(t={},e){if(!this.fontDictionary)return;let s=this.getFontFilenameForProperties(t,e);return this.fontDictionary[s]||this.fontDictionary[e]||this.fontDictionary.Regular}setFont(t,e=16,s={},i){const n=this.textStyles;for(let[s,i]of It()){let a=n[s]=n[s]||{};a.size=i.defaultSize?i.defaultSize(e,this):i.size(this),a.font=t,a.color=this.textColor||"#000"}const a=this.textStyles.dropCap;let r=a.size;Object.defineProperty(a,"size",{configurable:!0,enumerable:!0,get:()=>r,set:t=>{r=t,delete this.setFontDropCapStyle}}),this.setFontDropCapStyle=a,this.baseTextStyle=s,i&&(this.textMeasuringStrategy=Qt.OpenTypeJS,this.fontDictionary=i),this.clearTextCache()}hasDefaultDropCapSize(){return this.textStyles.dropCap===this.setFontDropCapStyle}setRubricColor(t){this.rubricColor=t,this.specialCharProperties.fill=t,this.fontStyleDictionary.c.fill=t,this.clearTextCache()}clearTextCache(){this.textMetricsCache=new Map,this.textMetricsCacheSize=0,this.fontLoadGeneration=Lt,bt++}noticeFontChanges(){Ct()}getTextMetricsCache(t){(this.fontLoadGeneration!==Lt||this.textMetricsCacheSize>=2e4)&&this.clearTextCache();let e=this.textMetricsCache.get(t);return e||(e=new Map,this.textMetricsCache.set(t,e)),e}cacheTextMetrics(t,e,s){return t.set(e,s),this.textMetricsCacheSize++,s}measureCanvasText(t,e){const s=this.canvasCtxt,i=this.getTextMetricsCache(s),n=s.textAlign+"\0"+t;let a=i.get(n);a||i.set(n,a=new Map);let r=a.get(e);return r||(s.font!==t&&(s.font=t),r=this.cacheTextMetrics(a,e,s.measureText(e))),r}measureSvgText(t){const e=this.svgTextMeasurer;e.appendChild(t);const{x:s,y:i,width:n,height:a}=t.getBBox(),r=t.getComputedTextLength();return e.removeChild(t),{advanceWidth:r,bbox:{x:s,y:i,width:n,height:a}}}layoutFontkitText(t,e,s){const i=this.getTextMetricsCache(t),n=(s?"c":"-")+e;let a=i.get(n);if(!a){const r={liga:!0};s&&(r.smcp=!0);const o=t.layout(e,r);a=this.cacheTextMetrics(i,n,{advanceWidth:o.advanceWidth,bbox:o.bbox})}return a}measureOpenTypeText(t,e,s,i){const n=this.getTextMetricsCache(t),a=`${s},${i?"c":"-"},${e}`;let r=n.get(a);if(!r){const o={features:{liga:!0}};i&&(o.features.smcp=!0),r=this.cacheTextMetrics(n,a,{bbox:t.getPath(e,0,0,s,o).getBoundingBox(),advanceWidth:t.getAdvanceWidth(e,s,o)})}return r}setMergeAnnotationWithTextLeft(t){this.mergeAnnotationWithTextLeft=t?le:void 0}setScaleDefs(t){t=!!t,this.scaleDefs!==t&&(this.scaleDefs=t,this.setGlyphScaling(this.glyphScaling))}getSvgClass(){return"Exsurge ChantScore"+(this.defIdPrefix?" "+this.defIdPrefix+"ChantScore":"")}createStyleCss(){var t="",e=this.defIdPrefix?"svg.Exsurge."+(this.defIdPrefix+"ChantScore").replace(/[^\w\-\u0080-\uffff]/g,t=>t<" "||""===t?"\\"+t.charCodeAt(0).toString(16)+" ":"\\"+t).replace(/^(-?)(\d)/,(t,e,s)=>e+"\\3"+s+" "):"svg.Exsurge";for(let[r,o]of It()){var s=o.cssClass,{color:i,font:n,size:a}=this.textStyles[r];o.size&&(a=o.size(this)),t+=`${e} .${s}{fill:${i};font-family:${n};font-size:${a}px;font-kerning:normal}`}return t}prepareSvgTextMeasurer(){const t=this.svgTextMeasurer;let e=this.svgTextMeasurerStyle;if(e&&e.parentNode===t){let t=this.createStyleCss();e.textContent!==t&&(e.textContent=t)}else e=this.svgTextMeasurerStyle=this.createStyleNode();for(let s=t.firstChild;s;){let i=s.nextSibling;s!==e&&t.removeChild(s),s=i}return e.parentNode!==t&&t.appendChild(e),t.setAttribute("class",this.getSvgClass()),e}createStyleNode(){var t=Wt.createNode("style",{});return t.textContent=this.createStyleCss(),t}createStyleTree(){return{name:"style",props:{},children:[this.createStyleCss()]}}createStyle(){return"<style>"+this.createStyleCss()+"</style>"}updateHyphenWidth(){var t=new Lyric(this,this.syllableConnector,ie.SingleSyllable);this.hyphenWidth>0&&this.minLyricWordSpacing>=0&&(this.minLyricWordSpacingRatio=this.minLyricWordSpacing/this.hyphenWidth),this.hyphenWidth=t.bounds.width,this.minLyricWordSpacing=(this.minLyricWordSpacingRatio>=0?this.minLyricWordSpacingRatio:1)*this.hyphenWidth}setStaffHeight(t,e=1){this.setGlyphScaling(t/600,e)}setGlyphScaling(t,e=1){this.glyphMultiplier=e,this.glyphScaling=t*e,this.staffInterval=this.glyphPunctumWidth*t,this.staffLineWeight=Math.ceil(5*this.staffInterval/8)/5,this.neumeLineWeight=this.staffLineWeight,this.dividerLineWeight=this.neumeLineWeight,this.episemaLineWeight=1.25*this.neumeLineWeight,this.intraNeumeSpacing=this.staffInterval/2,this.clearTextCache();for(let[t,e]of It())e.size&&this.textStyles[t]&&(this.textStyles[t].size=e.size(this));for(;this.defsNode&&this.defsNode.firstChild;)this.defsNode.removeChild(this.defsNode.firstChild);for(var s=0;s<this.makeDefs.length;++s)this.makeDefs[s]();this.updateHyphenWidth()}calculateHeightFromStaffPosition(t){return-t*this.staffInterval}insertFontsInDoc(){if(yt){var t=document.getElementById("exsurge-fonts");null===t&&((t=document.createElement("style")).id="exsurge-fonts",document.head.appendChild(t))}}findNextNeume(){if(void 0===this.currNotationIndex)throw"findNextNeume() called without a valid currNotationIndex set";for(var t=this.currNotationIndex+1;t<this.notations.length;t++){var e=this.notations[t];if(e.isNeume&&!e.hasNoWidth)return e}return null}makeCanvasIfNeeded(){this.canvas||(this.canvas=document.createElement("canvas"),this.canvasCtxt=this.canvas.getContext("2d"))}setCanvasSize(t,e,s=1){this.makeCanvasIfNeeded(),this.canvas.style.width=t*s+"px",this.canvas.style.height=e*s+"px",s*=this.pixelRatio,this.canvas.width=t*s,this.canvas.height=e*s,this.canvasCtxt.setTransform(s,0,0,s,0,0)}},t.ChantDocument=class ChantDocument{constructor(){var t={layout:{units:"mm","default-font":{"font-family":"Crimson","font-size":14},page:{width:8.5,height:11,"margin-left":0,"margin-top":0,"margin-right":0,"margin-bottom":0}},scores:[]};this.copyLayout(this,t),this.scores=t.scores}copyLayout(t,e){t.layout={units:e.layout.units,"default-font":{"font-family":e.layout["default-font"]["font-family"],"font-size":e.layout["default-font"]["font-size"]},page:{width:e.layout.page.width,height:e.layout.page.height,"margin-left":e.layout.page["margin-left"],"margin-top":e.layout.page["margin-top"],"margin-right":e.layout.page["margin-right"],"margin-bottom":e.layout.page["margin-bottom"]}}}unserializeFromJson(t){this.copyLayout(this,t),this.scores=[];for(var e=0;e<t.scores.length;e++){var s=new ChantScore;s.unserializeFromJson(t.scores[e]),this.scores.push(s)}}serializeToJson(){var t={};this.copyLayout(t,this),t.scores=[];for(var e=0;e<this.scores.length;e++)t.scores.push(this.scores[e].serializeToJson());return t}},t.ChantLayoutElement=ChantLayoutElement,t.ChantLine=ChantLine,t.ChantLineBreak=ChantLineBreak,t.ChantMapping=ChantMapping,t.ChantNotationElement=ChantNotationElement,t.ChantScore=ChantScore,t.ChiRhoClef=ChiRhoClef,t.ChoralSign=ChoralSign,t.ChurchSlavonic=ChurchSlavonic,t.Clef=Clef,t.Climacus=Climacus,t.Clivis=Clivis,t.CurlyBraceVisualizer=CurlyBraceVisualizer,t.Custos=Custos,t.DefaultTrailingSpace=Bt,t.DeviceIndependent=function(t){return t},t.DiatonicClef=DiatonicClef,t.Distropha=Distropha,t.Divider=Divider,t.DividerLineVisualizer=DividerLineVisualizer,t.DivisioMinimis=DivisioMinimis,t.DoClef=DoClef,t.DominicanBar=DominicanBar,t.DoubleBar=DoubleBar,t.DropCap=DropCap,t.English=English,t.FaClef=FaClef,t.FullBar=FullBar,t.FusedGlyphKind=ns,t.FusedNeume=FusedNeume,t.Gabc=Gabc,t.GabcHeader=ai,t.GlyphCode=kt,t.GlyphVisualizer=GlyphVisualizer,t.Glyphs=h,t.HalfBar=HalfBar,t.HorizontalEpisema=HorizontalEpisema,t.HorizontalEpisemaAlignment=ce,t.Hungarian=Hungarian,t.Ictus=Ictus,t.Inches=function(t){return e.ToDeviceIndependent(t,e.Inches)},t.InclinatumGlyphTurn=Dt,t.InsertionCursor=InsertionCursor,t.Language=Language,t.Latin=Latin,t.LineBreaker=LineBreaker,t.LineaVisualizer=LineaVisualizer,t.LiquescentType=un,t.Lyric=Lyric,t.LyricArray=ne,t.LyricTieSpecials=jt,t.LyricType=ie,t.Margins=Margins,t.MarkingPositionHint=Pt,t.Millimeters=function(t){return e.ToDeviceIndependent(t,e.Millimeters)},t.Mora=Mora,t.MusicaFicta=MusicaFicta,t.NabcChoralSign=NabcChoralSign,t.NabcDimensions=Mt,t.NabcNeumes=NabcNeumes,t.Neume=Neume,t.NeumeBeamVisualizer=NeumeBeamVisualizer,t.NeumeLineVisualizer=NeumeLineVisualizer,t.Note=Note,t.NoteBracket=NoteBracket,t.NoteShape=cn,t.NoteShapeModifiers=dn,t.Oriscus=Oriscus,t.PesOriscus=PesOriscus,t.PesQuadratum=PesQuadratum,t.PesQuassus=PesQuassus,t.PesSubpunctis=PesSubpunctis,t.Pitch=Pitch,t.Podatus=Podatus,t.Point=Point,t.Porrectus=Porrectus,t.PorrectusFlexus=PorrectusFlexus,t.PunctaInclinata=PunctaInclinata,t.Punctum=Punctum,t.QuarterBar=QuarterBar,t.QuickSvg=Wt,t.Rect=Rect,t.RoundBraceVisualizer=RoundBraceVisualizer,t.Salicus=Salicus,t.SalicusFlexus=SalicusFlexus,t.Scandicus=Scandicus,t.ScandicusFlexus=ScandicusFlexus,t.Size=Size,t.Slur=Slur,t.Spanish=Spanish,t.Step=s,t.Subtitle=Subtitle,t.Supertitle=Supertitle,t.SvgOutputs=Ht,t.SvgShape=SvgShape,t.TextElement=TextElement,t.TextLeftRight=TextLeftRight,t.TextMeasuringStrategy=Qt,t.TextOnly=TextOnly,t.TextSpan=TextSpan,t.TextTypes=Nt,t.TextTypesByClass=Tt,t.Title=Title,t.TitleTextElement=TitleTextElement,t.Titles=Titles,t.ToCentimeters=function(t){return e.FromDeviceIndependent(t,e.Centimeters)},t.ToInches=function(t){return e.FromDeviceIndependent(t,e.Inches)},t.ToMillimeters=function(t){return e.FromDeviceIndependent(t,e.Millimeters)},t.Torculus=Torculus,t.TorculusResupinus=TorculusResupinus,t.TorculusResupinusFlexus=TorculusResupinusFlexus,t.TranslationText=TranslationText,t.TrebleClef=TrebleClef,t.Tristropha=Tristropha,t.Trivirga=Trivirga,t.Units=e,t.VerseNumber=VerseNumber,t.VerticalLineVisualizer=VerticalLineVisualizer,t.Virga=Virga,t.VirgaLineVisualizer=VirgaLineVisualizer,t.Virgula=Virgula,t.VowelRulesLanguage=VowelRulesLanguage,t.allowsCustosBefore=Ce,t.copyBeginningLyrics=we,t.custosLedgerLineOverhang=E,t.determineLedgerLines=H,t.drawsLedgerLine=D,t.gabcStaffPosition=as,t.generateRandomGuid=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()},t.getCssForProperties=a,t.glyphNameOfNabc=lt,t.greextraGlyphs=k,t.hasDrawnLedgerLine=z,t.isClefLineBreak=Le,t.isHiddenAccidental=ve,t.isOnOrBeyond=V,t.isReadUpToDate=He,t.isTextOnlyBeforeDivider=Se,t.joinFragments=qt,t.language=o,t.layoutNabc=dt,t.layoutSettings=Qe,t.ledgerLineOverhang=O,t.ledgerLinePosition=fe,t.nabcAliases=rt,t.nabcGlyphName=ct,t.nabcNameOfGlyph=t=>t.replace(/[BNET]/g,t=>ot[t]),t.newLayoutId=oe,t.parseNabc=at,t.porrectusGlyphCode=Ft,t.porrectusSwash=S,t.porrectusSwashWidth=d,t.readFrom=We,t.readTo=qe,t.resetNotation=Pe,t.startsWordWithLyrics=be,t.stemQueue=$,Object.defineProperty(t,"__esModule",{value:!0})});

/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)vt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(vt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Q&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&e.prevValue!==e.newValue&&t.attributeChangedCallback(r,n===e[a]?null:e.prevValue,n===e[l]?null:e.newValue)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(n--,F.splice(t--,1),vt(e,o))}function dt(e){throw new Error("A "+e+" type is already registered")}function vt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function mt(e){return e?(mt.prototype=e,new mt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){c=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&(o=s.getAttribute(i.attributeName),o!==i.oldValue&&s.attributeChangedCallback(i.attributeName,i.oldValue,o)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t}),-2<S.call(y,v+c)+S.call(y,d+c)&&dt(n);if(!m.test(c)||-1<S.call(g,c))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,c):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():c,c,p;return f&&-1<S.call(y,d+l)&&dt(l),p=y.push((f?v:d)+c)-1,w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[p]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");
define("document-register-element", function(){});

define('chant-playback',['jquery','exsurge'], function($,exsurge) {
  'use strict';
  // Playback of a chant, as in jgabc: tapping a chant's large initial, or its first syllable, opens a
  // menu to play it and to choose its starting pitch, and while it plays, a bar at the bottom of the
  // page controls it.  jgabc plays through Tone.js; this uses the Web Audio API directly.
  var localStorage = window.localStorage;
  try {
    var mod = '__storage test__';
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
  } catch(e) {
    localStorage = {};
  }

  // Audio
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audio, wave, output;
  // A reverberant space, as chant is heard in a church: the impulse is noise that dies away over 2.5s.
  var makeReverb = function() {
    var length = Math.floor(2.5 * audio.sampleRate);
    var impulse = audio.createBuffer(2, length, audio.sampleRate);
    for(var channel = 0; channel < 2; ++channel) {
      var data = impulse.getChannelData(channel);
      for(var i = 0; i < length; ++i) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 4);
      }
    }
    var reverb = audio.createConvolver();
    reverb.buffer = impulse;
    return reverb;
  };
  // Browsers only let audio start from a tap or click, so the tap on the initial that opens the
  // menu makes the context, or wakes it.
  var getAudio = function() {
    if(!audio) {
      audio = new AudioContext();
      // a pure tone between a flute pipe of an organ and a clarinet: mostly the fundamental, with a
      // little of the odd harmonics that give a clarinet its hollow sound, and hardly any of the even ones
      wave = audio.createPeriodicWave(new Float32Array([0, 1, 0.06, 0.25, 0.03, 0.1, 0.01, 0.04]), new Float32Array(8));
      output = audio.createGain();
      output.gain.value = 0.6;
      var filter = audio.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      filter.Q.value = 0.5;
      var reverb = makeReverb();
      var wet = audio.createGain();
      wet.gain.value = 0.3;
      output.connect(filter);
      filter.connect(audio.destination);
      filter.connect(reverb);
      reverb.connect(wet);
      wet.connect(audio.destination);
      // iOS keeps Web Audio silent while the ring/silent switch is on silent, unless the page asks for playback.
      if(navigator.audioSession) navigator.audioSession.type = 'playback';
    }
    if(audio.state === 'suspended') audio.resume();
    return audio;
  };
  // exsurge numbers pitches in semitones from C0, so A4 (440 Hz) is 57.
  var frequency = function(pitch) {
    return 440 * Math.pow(2, (pitch - 57) / 12);
  };
  var startVoice = function(pitch, time) {
    var osc = audio.createOscillator();
    var gain = audio.createGain();
    osc.setPeriodicWave(wave);
    osc.frequency.value = frequency(pitch);
    gain.gain.setValueAtTime(0, time);
    osc.connect(gain);
    gain.connect(output);
    osc.onended = function() {
      gain.disconnect();
    };
    osc.start(time);
    return {
      gain: gain.gain,
      stop: function(time) {
        osc.stop(time);
      }
    };
  };
  // A note of the chant: like an organ pipe, it speaks over 0.06s and holds steady, and as it ends
  // it dies away into the reverberation.
  var playNote = function(pitch, time, length) {
    var voice = startVoice(pitch, time);
    voice.gain.linearRampToValueAtTime(0.8, time + 0.06);
    voice.gain.setTargetAtTime(0, time + length, 0.08);
    voice.stop(time + length + 0.8);
    return voice;
  };
  // One note at a time, so a note fades out as the next one swells in.
  var cutVoice = function(voice, time) {
    if(voice.gain.cancelAndHoldAtTime) {
      voice.gain.cancelAndHoldAtTime(time);
    } else {
      voice.gain.cancelScheduledValues(time);
    }
    voice.gain.setTargetAtTime(0, time, 0.02);
  };
  // The starting pitch sounds for as long as its button is held, as with jgabc's tones.js.
  var stopHeldTone;
  var holdTone = function(pitch) {
    var voice = startVoice(pitch, audio.currentTime);
    voice.gain.setTargetAtTime(0.8, audio.currentTime, 0.03);
    stopHeldTone = function() {
      voice.gain.setTargetAtTime(0, audio.currentTime, 0.1);
      voice.stop(audio.currentTime + 0.8);
      stopHeldTone = null;
    };
  };
  var releaseHeldTone = function() {
    if(stopHeldTone) stopHeldTone();
  };

  // Note lengths, from jgabc
  var tempo = 165;
  var beat = function() {
    return 60 / tempo;
  };
  var getIsUsingSolesmesLengths = function() {
    return localStorage.isUsingSolesmesLengths !== 'false';
  };
  var arePitchesEqual = function(pitches) {
    return pitches.every(function(pitch) {
      return pitch.toInt() === pitches[0].toInt();
    });
  };
  var isLastNoteInNeume = function(note) {
    return note === note.neume.notes[note.neume.notes.length - 1];
  };
  var isFirstNoteInNeume = function(note) {
    return note === note.neume.notes[0];
  };
  // the note at index i, if it is a note and not a bar or the like
  var noteAt = function(notes, i) {
    var note = notes[i];
    return (note && note.constructor === exsurge.Note)? note : null;
  };
  var isSalicus = function(notes, noteId) {
    var note = notes[noteId],
        nextNote = noteAt(notes, noteId + 1),
        prevNote = noteAt(notes, noteId - 1);
    if(!note.ictus || !prevNote || !nextNote) return false;
    if(note.pitch.toInt() - prevNote.pitch.toInt() === 7 && nextNote.pitch.toInt() - note.pitch.toInt() === 1) return true;
    return getIsUsingSolesmesLengths() &&
      note.ictus.glyphCode === 'VerticalEpisemaBelow' &&
      (note.glyphVisualizer.glyphCode === 'PodatusLower' || note.glyphVisualizer.glyphCode === 'BeginningAscLiquescent') &&
      note.pitch.toInt() > prevNote.pitch.toInt() &&
      nextNote.pitch.toInt() > note.pitch.toInt();
  };
  // in beats
  var noteDuration = function(notes, noteId) {
    var note = notes[noteId],
        nextNote = noteAt(notes, noteId + 1),
        prevNote = noteAt(notes, noteId - 1);
    if(note.morae.length) return 2;
    if(nextNote && (nextNote.morae.length > 1 || nextNote.shape === exsurge.NoteShape.Quilisma || isSalicus(notes, noteId))) return 1.8;
    if(note.episemata.length) {
      var episemataCount = 1;
      if(prevNote && prevNote.episemata.length) ++episemataCount;
      if(nextNote && nextNote.episemata.length) ++episemataCount;
      return 1 + 0.9 / episemataCount;
    }
    return 1;
  };
  // repeated notes in one neume (bistropha, tristropha) sound as one long note
  var isApostropha = function(note) {
    var neume = note.neume;
    return neume.isNeume && neume.notes.length > 1 && arePitchesEqual(neume.notes.map(function(n) { return n.pitch; }));
  };
  // so do two neumes that meet on the same pitch
  var getPressus = function(notes, noteId) {
    var note = notes[noteId],
        nextNote = noteAt(notes, noteId + 1),
        prevNote = noteAt(notes, noteId - 1),
        noteBeforePrev = noteAt(notes, noteId - 2);
    if(nextNote && nextNote.morae.length === 0 && note.morae.length === 0 &&
        isLastNoteInNeume(note) && isFirstNoteInNeume(nextNote) &&
        arePitchesEqual([note.pitch, nextNote.pitch]) &&
        (!prevNote || !getPressus(notes, noteId - 1)) &&
        !isApostropha(note) && !isApostropha(nextNote) &&
        nextNote.neume.lyrics.length === 0) {
      return [note, nextNote];
    }
    if(prevNote && prevNote.morae.length === 0 && note.morae.length === 0 &&
        isLastNoteInNeume(prevNote) && isFirstNoteInNeume(note) &&
        arePitchesEqual([prevNote.pitch, note.pitch]) &&
        (!noteBeforePrev || !getPressus(notes, noteId - 2)) &&
        !isApostropha(prevNote) && !isApostropha(note) &&
        note.neume.lyrics.length === 0) {
      return [prevNote, note];
    }
  };

  // Playing
  // Each note is scheduled this many seconds before it sounds.
  var lookAhead = 0.1;
  var playback = null;
  var setHighlight = function(name, elem) {
    var old = playback[name];
    if(old === elem) return;
    if(old) old.classList.remove('active', 'porrectus-left', 'porrectus-right');
    playback[name] = elem;
    if(elem) elem.classList.add('active');
  };
  var playScore = function(score) {
    stopScore();
    var notes = [].concat.apply([], score.notations.map(function(notation) {
      return notation.notes || notation;
    })).filter(function(notation) {
      return !notation.isAccidental;
    });
    var firstNote = notes.filter(function(note) {
      return note.constructor === exsurge.Note;
    })[0];
    if(!firstNote) return;
    playback = {
      score: score,
      svg: score.svg,
      notes: notes,
      noteId: 0,
      transpose: score.playbackPitch.transpose
    };
    setHighlight('dropCap', $(score.svg).find('text.dropCap')[0]);
    showMediaControls();
    playNextNote(getAudio().currentTime + lookAhead);
  };
  // Sounds the next note at time, and unless step is set, schedules the one after it.
  var playNextNote = function(time, step) {
    var p = playback;
    if(!p) return;
    clearTimeout(p.timer);
    p.timer = null;
    time = Math.max(time, audio.currentTime);
    var notes = p.notes,
        note = notes[p.noteId],
        duration = 1;
    setHighlight('noteElem', null);
    // stop at the end, or if the chant has been drawn again
    if(!note || p.score.svg !== p.svg || !document.body.contains(p.svg)) {
      stopScore();
      return;
    }
    if(note.constructor !== exsurge.Note) {
      // a quarter bar takes no time
      while(note.constructor !== exsurge.Note && (!note.isDivider || note.constructor === exsurge.QuarterBar)) {
        note = notes[++p.noteId];
        if(!note) {
          stopScore();
          return;
        }
      }
      if(note.isDivider) {
        setHighlight('syllable', null);
        setHighlight('dropCap', null);
        if(note.constructor === exsurge.FullBar || note.constructor === exsurge.DoubleBar) duration = 2;
      }
    }
    var elem = note.svgNode;
    if(elem) {
      // the two notes of a porrectus are one glyph, so each lights up half of it
      var href = elem.href.baseVal;
      if(href === '#None') {
        elem = elem.previousSibling;
        setHighlight('noteElem', elem);
        elem.classList.add('porrectus-right');
      } else {
        setHighlight('noteElem', elem);
        if(/^#Porrectus/.test(href)) elem.classList.add('porrectus-left');
      }
      var syllable = $(elem).parent().parent().find('text')[0];
      if(syllable && syllable !== p.syllable) {
        if(p.syllable) setHighlight('dropCap', null);
        setHighlight('syllable', syllable);
      }
    }
    if(note.constructor === exsurge.Note) {
      duration = noteDuration(notes, p.noteId);
      var length = duration;
      var pressus = getPressus(notes, p.noteId);
      if(isApostropha(note) || pressus) {
        length = 0;
        if(isApostropha(note) && isFirstNoteInNeume(note)) {
          note.neume.notes.forEach(function(n) {
            length += noteDuration(notes, notes.indexOf(n));
          });
        } else if(pressus && pressus[0] === note) {
          length = noteDuration(notes, p.noteId) + noteDuration(notes, p.noteId + 1);
        }
      }
      if(length) {
        if(p.voice) cutVoice(p.voice, time);
        p.voice = playNote(note.pitch.toInt() + p.transpose, time, length * beat());
      }
    }
    ++p.noteId;
    if(step) return;
    var nextTime = time + duration * beat();
    p.timer = setTimeout(function() {
      playNextNote(nextTime);
    }, (nextTime - lookAhead - audio.currentTime) * 1000);
  };
  var isPaused = function() {
    return !playback.timer;
  };
  var pauseScore = function() {
    clearTimeout(playback.timer);
    playback.timer = null;
  };
  var stopScore = function() {
    if(!playback) return;
    clearTimeout(playback.timer);
    if(playback.voice) cutVoice(playback.voice, audio.currentTime);
    setHighlight('noteElem', null);
    setHighlight('syllable', null);
    setHighlight('dropCap', null);
    playback = null;
    $('#mediaControls').addClass('offscreen');
  };

  // Icons, since the page doesn't have Bootstrap's glyphicon font
  var icon = function(d) {
    return '<svg class="icon" viewBox="0 0 16 16"><path fill-rule="evenodd" d="' + d + '"/></svg>';
  };
  var icons = {
    play: icon('M4 2.5v11l9-5.5z'),
    pause: icon('M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z'),
    stepForward: icon('M3 2.5v11l7-5.5zM10.5 2.5h2.5v11h-2.5z'),
    stop: icon('M3 3h10v10H3z'),
    minus: icon('M3 7h10v2H3z'),
    plus: icon('M7 3h2v4h4v2H9v4H7V9H3V7h4z'),
    up: icon('M8 1.5L2.5 8H6v6.5h4V8h3.5z'),
    down: icon('M8 14.5L13.5 8H10V1.5H6V8H2.5z'),
    checked: icon('M2 2h12v12H2zM3.5 3.5v9h9v-9zM4.2 7.6l1.1-1.1 1.9 1.9 3.6-3.6 1.1 1.1-4.7 4.7z'),
    unchecked: icon('M2 2h12v12H2zM3.5 3.5v9h9v-9z')
  };
  // a salicus, as on jgabc's toggle for the Solesmes length of the salicus
  var salicus = '<svg class="salicus" viewBox="0 0 12.5 20.4">' +
    '<path transform="translate(3.125,16.486) scale(0.0625)" d="m 0,-60.906 c 33.333,0 50,9.635 50,28.906 V 62.53 C 39.062,51.595 22.396,46.126 0,46.126 c -22.396,0 -39.063,5.47 -50,16.406 V -32 c 0,-19.27 16.667,-28.906 50,-28.906 z"/>' +
    '<path transform="translate(9.375,10.236) scale(0.0625)" d="m -4.688,-30.28 c 22.396,0 34.636,-0.262 36.72,-0.782 5.728,-1.563 8.593,-5.21 8.593,-10.938 H 50 v 97.656 c 0,2.604 -1.302,4.167 -3.906,4.688 -5.21,0.52 -21.355,0.78 -48.438,0.78 -23.958,0 -38.54,-0.26 -43.75,-0.78 -2.604,0 -3.906,-1.302 -3.906,-3.906 v -82.032 c 0,-3.646 1.302,-5.468 3.906,-5.468 h 2.344 c 2.604,0.52 15.625,0.78 39.063,0.78 z"/>' +
    '<path transform="translate(12.5,3.986) scale(0.0625)" d="m -46.094,-63.78 c 13.542,0 24.61,2.473 33.203,7.42 C -4.298,-51.41 0,-43.99 0,-34.093 V 62 h -9.375 c 0,-10.938 -2.604,-19.14 -7.812,-24.61 -5.21,-5.468 -14.844,-8.203 -28.907,-8.202 -18.23,0 -33.333,4.166 -45.312,12.5 v -75.782 c 0,-19.79 15.104,-29.687 45.312,-29.687 z"/>' +
    '<path transform="translate(9.375,15.236) scale(0.0625)" d="m -8,56 c 2,3 6,4 8,4 2,0 6,-1 8,-4 V 4 C 6,1 2,0 0,0 -2,0 -6,1 -8,4 Z"/>' +
    '</svg>';

  // The bar at the bottom of the page while a chant plays
  var showMediaControls = function() {
    var $controls = $('#mediaControls');
    if($controls.length === 0) {
      $controls = $("<div id='mediaControls' class='hidden-print offscreen'><div>" +
          "<button title='Use Solesmes length for salicus' class='btn btn-sm btn-info use-solesmes-lengths'></button>" +
          "<div class='btn-group'>" +
            "<button class='btn btn-sm btn-primary play-pause'></button>" +
            "<button class='btn btn-sm btn-primary step-forward'>" + icons.stepForward + "</button>" +
            "<button class='btn btn-sm btn-default tempo-minus'>" + icons.minus + "</button>" +
            "<span class='btn btn-sm btn-default tempo'><span class='tempo-number'></span> BPM</span>" +
            "<button class='btn btn-sm btn-default tempo-plus'>" + icons.plus + "</button>" +
            "<button class='btn btn-sm btn-danger stop'>" + icons.stop + "</button>" +
          "</div>" +
        "</div></div>").appendTo(document.body);
      var showSolesmesLengths = function() {
        $controls.find('.use-solesmes-lengths').html((getIsUsingSolesmesLengths()? icons.checked : icons.unchecked) + ' ' + salicus);
      };
      showSolesmesLengths();
      $controls.on('click', function(e) {
        e.stopPropagation();
      }).on('click', '.use-solesmes-lengths', function() {
        localStorage.isUsingSolesmesLengths = !getIsUsingSolesmesLengths();
        showSolesmesLengths();
      }).on('click', '.play-pause', function() {
        if(!playback) return;
        if(isPaused()) {
          playNextNote(audio.currentTime);
        } else {
          pauseScore();
        }
        $(this).html(isPaused()? icons.play : icons.pause);
      }).on('click', '.step-forward', function() {
        if(!playback) return;
        pauseScore();
        playNextNote(audio.currentTime, true);
        $controls.find('.play-pause').html(icons.play);
      }).on('click', '.tempo-minus, .tempo-plus', function() {
        tempo = Math.round(Math.max(0, tempo + ($(this).hasClass('tempo-plus')? 5 : -5))) || 165;
        $controls.find('.tempo-number').text(tempo);
      }).on('click', '.stop', stopScore);
    }
    $controls.find('.play-pause').html(icons.pause);
    $controls.find('.tempo-number').text(tempo);
    // after it has been drawn offscreen, so that it slides in
    setTimeout(function() {
      if(playback) $controls.removeClass('offscreen');
    });
  };

  // The menu on a chant's initial
  var noteNames = ['C', 'C♯ / D♭', 'D', 'D♯ / E♭', 'E', 'F', 'F♯ / G♭', 'G', 'G♯ / A♭', 'A', 'A♯ / B♭', 'B'];
  var solfegeNames = ['Do', 'Di', 'Re', 'Me', 'Mi', 'Fa', 'Fi', 'Sol', 'Si', 'La', 'Te', 'Ti'];
  var pitchIntervals = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7'];
  var pitchClass = function(pitch) {
    return ((pitch % 12) + 12) % 12;
  };
  var withOctave = function(name, pitch) {
    return name + '<sub>' + Math.floor(pitch / 12) + '</sub>';
  };
  var getPitchRange = function(semitones) {
    var octaves = Math.floor(semitones / 12);
    var result = pitchIntervals[semitones % 12];
    if(!octaves) return result;
    return result[0] + (parseInt(result[1]) + 7 * octaves);
  };
  var removeMenus = function() {
    $('.chant-context').remove();
  };
  // A score's notes, in order, in exsurge's pitch numbers
  var getPitches = function(score) {
    var pitches = [];
    score.notations.forEach(function(notation) {
      if(notation.notes) notation.notes.forEach(function(note) {
        pitches.push(note.pitch.toInt());
      });
    });
    return pitches;
  };
  // The scores sung at one pitch with this one: the rest of its chant, and within data-pitch-group (the
  // psalms, the canticle), the antiphons and the psalm tone around it too.  They share one transposition
  // (score.playbackPitch), set at first from the range of all of them, so raising or lowering any of
  // them raises or lowers them all.
  var getPitchGroup = function(score) {
    var $chant = $(score.svg).closest('chant-gabc'),
        $group = $chant.closest('[data-pitch-group]');
    // jQuery's map flattens each chant's array of scores
    var scores = ($group.length? $group.find('chant-gabc') : $chant).map(function() {
      return this._score || [];
    }).get();
    if(scores.indexOf(score) < 0) scores = [score];
    var lowPitch = Infinity, highPitch = -Infinity;
    scores.forEach(function(s) {
      getPitches(s).forEach(function(pitch) {
        lowPitch = Math.min(lowPitch, pitch);
        highPitch = Math.max(highPitch, pitch);
      });
    });
    // as the group was last played, if any of it still has the pitch it was given;
    // otherwise the middle of the range at the G above middle C, until it is changed
    var pitch = scores.map(function(s) {
      return s.playbackPitch;
    }).filter(Boolean)[0] || {transpose: 55 - Math.floor((lowPitch + highPitch) / 2)};
    scores.forEach(function(s) {
      s.playbackPitch = pitch;
    });
    return {pitch: pitch, lowPitch: lowPitch, highPitch: highPitch};
  };
  // over the initial, or over the first syllable
  var showMenu = function(anchor) {
    removeMenus();
    var score = $(anchor).closest('svg').prop('source');
    if(!score || !AudioContext) return;
    getAudio();
    var startPitch = getPitches(score)[0];
    if(startPitch === undefined) return;
    var group = getPitchGroup(score),
        lowPitch = group.lowPitch,
        highPitch = group.highPitch;

    var $menu = $("<div class='chant-context btn-group-vertical hidden-print'>" +
        "<button class='btn btn-primary play'>" + icons.play + " Play</button>" +
        "<div class='btn btn-default info'>Range: " + withOctave(solfegeNames[pitchClass(lowPitch)].slice(0, 2), lowPitch) +
          " to " + withOctave(solfegeNames[pitchClass(highPitch)].slice(0, 2), highPitch) + " (" + getPitchRange(highPitch - lowPitch) + ")</div>" +
        "<div class='btn-group'>" +
          "<button class='btn btn-success pitch-up'>" + icons.up + "</button>" +
          "<button class='btn btn-info hold-pitch'><div>Starting Pitch: <span class='this-pitch'></span></div>" +
            "<div>Range: <span class='lowest-pitch'></span> to <span class='highest-pitch'></span></div></button>" +
          "<button class='btn btn-success pitch-down'>" + icons.down + "</button>" +
        "</div>" +
        "<div class='btn btn-default info'>Do = <span class='do-pitch'></span></div>" +
      "</div>");
    // Raising the pitch names it as a sharp, and lowering it as a flat.
    var changePitch = function(offset) {
      var transpose = group.pitch.transpose += offset,
          pitch = startPitch + transpose,
          lowest = lowPitch + transpose,
          highest = highPitch + transpose,
          name = noteNames[pitchClass(pitch)];
      if(offset === 1) name = name.slice(0, 2);
      else if(offset === -1) name = name.slice(-2);
      $menu.find('.this-pitch').html(withOctave(name, pitch));
      $menu.find('.lowest-pitch').html(withOctave(noteNames[pitchClass(lowest)].slice(0, 2), lowest));
      $menu.find('.highest-pitch').html(withOctave(noteNames[pitchClass(highest)].slice(0, 2), highest));
      $menu.find('.do-pitch').text(noteNames[pitchClass(transpose)]);
    };
    var hasPointerEvents = !!window.PointerEvent;
    $menu.on('click', function(e) {
      e.stopPropagation();
      releaseHeldTone();
    }).on('click', '.play', function() {
      removeMenus();
      playScore(score);
    }).on('click', '.pitch-up', function() {
      changePitch(1);
    }).on('click', '.pitch-down', function() {
      changePitch(-1);
    }).find('.hold-pitch').on(hasPointerEvents? 'pointerdown' : 'mousedown touchstart', function() {
      if(!stopHeldTone) holdTone(startPitch + group.pitch.transpose);
    }).on(hasPointerEvents? 'pointerup pointercancel pointerleave' : 'mouseup touchcancel touchend', releaseHeldTone)
    .on('contextmenu', function(e) {
      e.preventDefault();
    });
    changePitch(0);

    // centered over the initial or syllable, above the first line of the chant, or below it if there isn't room
    $menu.appendTo(document.body);
    var capRect = anchor.getBoundingClientRect(),
        lineRect = anchor.parentNode.getBoundingClientRect(),
        width = $menu.outerWidth(),
        height = $menu.outerHeight(),
        left = capRect.left + (capRect.width - width) / 2,
        top = lineRect.top - height;
    left = Math.max(8, Math.min(left, document.documentElement.clientWidth - 8 - width));
    if(top < 0) top = lineRect.bottom;
    $menu.css({
      left: left + window.pageXOffset,
      top: top + window.pageYOffset
    });
  };

  // The glow and the halves of a porrectus while a note plays (style.css)
  $(document.body).append("<svg class='playback-defs' aria-hidden='true'><defs>" +
      "<filter id='text-glow' x='-100%' y='-100%' width='300%' height='300%'>" +
        "<feGaussianBlur in='SourceAlpha' stdDeviation='5 5' result='glow'/>" +
        "<feFlood class='playback-flood' result='color'/>" +
        "<feComposite in='color' in2='glow' operator='in' result='glow-color'/>" +
        "<feMerge><feMergeNode in='glow-color'/><feMergeNode in='SourceGraphic'/></feMerge>" +
      "</filter>" +
      "<filter id='note-glow' x='-150%' y='-150%' width='400%' height='400%'>" +
        "<feGaussianBlur in='SourceAlpha' stdDeviation='5 5' result='glow'/>" +
        "<feFlood class='playback-flood' result='color'/>" +
        "<feComposite in='color' in2='glow' operator='in' result='glow-color'/>" +
        "<feMerge><feMergeNode in='glow-color'/><feMergeNode in='glow-color'/><feMergeNode in='SourceGraphic'/></feMerge>" +
      "</filter>" +
      "<linearGradient id='porrectus-left' x1='0%' y1='0%' x2='100%' y2='0%'>" +
        "<stop offset='0%' class='playback-stop'/><stop offset='150%' class='playback-stop-faded'/>" +
      "</linearGradient>" +
      "<linearGradient id='porrectus-right' x1='0%' y1='0%' x2='100%' y2='0%'>" +
        "<stop offset='-50%' class='playback-stop-faded'/><stop offset='100%' class='playback-stop'/>" +
      "</linearGradient>" +
    "</defs></svg>");

  // The first syllable of a chant, with its notes, opens the menu too, so that a chant without a large
  // initial can be played.  A punctum is small to tap, so the space within a note's width of them counts.
  var getStart = function(svg, x, y) {
    var score = svg.source;
    if(!score) return null;
    var notation = score.notations.filter(function(notation) {
      return notation.notes && notation.notes.length;
    })[0];
    var noteElem = notation && notation.notes[0].svgNode;
    if(!noteElem || !svg.contains(noteElem)) return null;
    var syllable = noteElem.parentNode.parentNode,
        rect = syllable.getBoundingClientRect(),
        margin = noteElem.getBoundingClientRect().width;
    if(x < rect.left - margin || x > rect.right + margin || y < rect.top - margin || y > rect.bottom + margin) return null;
    return syllable;
  };

  $(document).on('click', function() {
    removeMenus();
    releaseHeldTone();
  }).on('click', 'chant-gabc text.dropCap', function(e) {
    e.stopPropagation();
    releaseHeldTone();
    showMenu(this);
  }).on('click', 'chant-gabc svg', function(e) {
    var start = getStart(this, e.clientX, e.clientY);
    if(!start) return;
    e.stopPropagation();
    releaseHeldTone();
    showMenu(start);
  }).on('mousemove', 'chant-gabc svg', function(e) {
    this.classList.toggle('at-start', !!getStart(this, e.clientX, e.clientY));
  });
});

define('chant-element',['jquery','exsurge','text-mode','document-register-element','chant-playback'], function($,exsurge,textMode) {
  'use strict';
  var printWidth = 672;
  // On screen, chant is laid out no wider than this, and on wider screens the
  // SVG is scaled up to fill the width (as in jgabc's propers page).  The body
  // text in style.css scales by the same ratio, so the two stay in proportion.
  var maxLayoutWidth = 624;
  var regexGabcHeader = /((?:[\w-_]+:\s*[^;\r\n]*;?\r?\n)+)%%\r?\n/;
  // Splits GABC into its scores, each with its header as an object.  A header line
  // that repeats (annotation) gives an array.
  var splitGabc = function(gabc) {
    var gabcs = gabc.split(regexGabcHeader);
    if(gabcs.length===1) gabcs.splice(0,0,'','');
    var scores = [];
    for(var i=1; i<gabcs.length; i+=2) {
      scores.push({
        header: gabcs[i].split(/\r?\n/).reduce(function(result,line){
          var match = line.match(/^%?([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i);
          if(match) {
            if(match[1] in result) {
              if(typeof result[match[1]] === 'string') {
                result[match[1]] = [result[match[1]], match[2]];
              } else {
                result[match[1]].push(match[2]);
              }
            } else {
              result[match[1]] = match[2];
            }
          }
          return result;
        }, {}),
        body: gabcs[i+1]
      });
    }
    return scores;
  };
  // GABC markup that both the chant and the plain text turn into plain characters.
  var normalizeGabc = function(gabc) {
    return gabc.replace(/<v>\\([VRA])bar<\/v>/g, '$1/.')
      .replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*');
  };
  // Plain text (TRANSLATIONS_PLAN.md §4c).  A <chant-gabc> shows its words instead of the
  // chant while it has the attribute plain-text.
  // One line of GABC as HTML: the neumes go and the syllables join into words.
  var gabcLineToHtml = function(line) {
    return normalizeGabc(line).replace(/V\/\.|<sp>V\/<\/sp>/g, '℣')
      .replace(/R\/\.|<sp>R\/<\/sp>/g, '℟')
      // a whole word in italics is a rubric, as in setGabc (marked by \u0001…\u0002 until the tags go)
      .replace(/(^|\s)<i>([^<\s*]+)<\/i>(?:\(\))?(?=\s|$)/g, '$1\u0001$2\u0002')
      .replace(/\([^)]*\)/g, '')
      // what's left is pointing, which plain text doesn't show
      .replace(/<[^>]*>/g, '')
      .replace(/&/g, '&amp;')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/℣ ?/g, "<span class='versiculum'>v</span>&nbsp;")
      .replace(/℟ ?/g, "<span class='versiculum'>r</span>&nbsp;")
      // * and †, and the ** where the choir takes over in a long melisma ("alle- * ** luia")
      .replace(/ (\*+|†)(?= |$)/g, "&nbsp;<span class='red'>$1</span>")
      .replace(/\u0001/g, "<i class='red'>")
      .replace(/\u0002/g, '</i>');
  };
  // Annotations that belong to the text; the others give the mode.
  var annotationGabc = {
    'V/.': '<v>\\Vbar</v>',
    'R/.': '<v>\\Rbar</v>',
    '<v>\\Vbar</v>': '<v>\\Vbar</v>',
    '<v>\\Rbar</v>': '<v>\\Rbar</v>',
    'Ant.': '<i>Ant.</i>'
  };
  // The paragraphs of a score that isn't a psalm, each of which is a unit of its translation
  // (TRANSLATIONS_PLAN.md §4).  gabcToHtml and splitUnits both use this (through unitGroups), so a
  // translation pairs the same way with the words as with the chant.  Blank lines separate paragraphs, and a
  // paragraph with no words (only neumes or bars) belongs to the one before it, or if it comes
  // first, to the one after.
  var unitParagraphs = function(body) {
    var paragraphs = [];
    var wordless = '';
    body.split(/\r?\n\s*\r?\n/).forEach(function(paragraph) {
      if(!/\S/.test(paragraph)) return;
      var hasWords = paragraph.split(/\r?\n/).some(function(line) { return !!gabcLineToHtml(line); });
      if(hasWords) {
        paragraphs.push(wordless + paragraph);
        wordless = '';
      } else if(paragraphs.length) {
        paragraphs[paragraphs.length - 1] += '\n\n' + paragraph;
      } else {
        wordless += paragraph + '\n\n';
      }
    });
    if(wordless) paragraphs.push(wordless);
    return paragraphs;
  };
  // Whether a paragraph of GABC (or an annotation) starts with a ℣ or a ℟ (mark: 'V' or 'R').
  var startsWith = function(paragraph, mark) {
    return normalizeGabc(paragraph).replace(/^(\s|\([^)]*\))*/, '').indexOf(mark + '/.') === 0;
  };
  // The unitParagraphs of a score, grouped as they're shown with their translations: a versicle
  // (a score that starts with a ℣, in its words or its annotation) is all one group, with its ℟ and
  // whatever follows (Deus in adjutórium's Glória Patri), and elsewhere a ℟ stays with what it
  // answers (the lesson's Deo grátias).
  var unitGroups = function(body, header) {
    var paragraphs = unitParagraphs(body);
    var versicle = [].concat(header.annotation || []).some(function(annotation) {
      return startsWith(annotation, 'V');
    }) || (paragraphs.length > 0 && startsWith(paragraphs[0], 'V'));
    return paragraphs.reduce(function(groups, paragraph) {
      if(groups.length && (versicle || startsWith(paragraph, 'R'))) groups[groups.length - 1].push(paragraph);
      else groups.push([paragraph]);
      return groups;
    }, []);
  };
  // The first letter of a score is a drop cap, so the capitals after it (as in "TE lucis") are lower case.
  var lowerDropCapCaps = function(body) {
    return body.replace(/^((?:\s|\([^)]*\))*[^\s(<])([A-ZÀ-ÖØ-ÞŒ]+)/, function(match, start, caps) {
      return start + caps.toLowerCase();
    });
  };
  // The capitals after the drop cap of a translation sung to the chant, as the Latin has them: none
  // where the first syllable is a single letter ("A-ve"), the whole word where it's a syllable of
  // three letters ("HÆC"), and otherwise the first two letters ("TE", "AL-ma", "SAl-ve").
  var raiseDropCapCaps = function(gabc) {
    return gabc.replace(/^((?:\s|\([^)]*\))*)([^\s(]+)(\([^)]*\))(\S?)/, function(match, start, syllable, neume, next) {
      // the letters of its words, not of its tags (<i>, <sp>)
      var letters = syllable.replace(/<[^>]*>/g, '').match(/\p{L}/gu) || [];
      if(letters.length < 2) return match;
      var count = !next && letters.length === 3 ? 3 : 2;
      var n = 0;
      return start + syllable.replace(/<[^>]*>|\p{L}/gu, function(letter) {
        return letter.charAt(0) !== '<' && n++ < count ? letter.toUpperCase() : letter;
      }) + neume + next;
    });
  };
  // Whether a GABC file has a heading, user-notes or commentary, which the rubrics translate.
  var hasNotes = function(gabc) {
    return /^\uFEFF?\s*(user-notes|commentary)\s*:/m.test(gabc || '');
  };
  // A \u211F cut short ("\u211F In manus..."), where the chant sings only its start, written out from the
  // line before that it starts, for plain text, which shows the whole response.  lines are a
  // chant's lines in order; response matches a \u211F at the start of a line, and mark a \u2123 or a \u211F.
  var completeResponses = function(lines, response, mark) {
    var cut = /\s*(\.\.\.|\u2026)$/;
    var words = function(line) {
      return line.replace(mark, '').replace(/<[^>]*>|&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    };
    return lines.map(function(line, i) {
      var start = line.match(response);
      if(!start || !cut.test(line)) return line;
      var stem = words(line.replace(cut, ''));
      for(var j = 0; stem && j < i; j++) {
        if(!cut.test(lines[j]) && words(lines[j]).indexOf(stem) === 0) return start[0] + lines[j].replace(mark, '');
      }
      return line;
    });
  };
  // The same for a translation's units, whose lines start "V. " and "R. ".
  var completeUnitResponses = function(units) {
    var lines = completeResponses([].concat.apply([], units.map(function(unit) { return unit.split('\n'); })), /^R\. /, /^[VR]\. /);
    return units.map(function(unit) {
      return lines.splice(0, unit.split('\n').length).join('\n');
    });
  };
  // The whole of a GABC file as HTML.  Blank lines separate paragraphs, and in a psalm, a
  // paragraph whose lines all start with a number is laid out like the pointed verses.  Only the
  // first textLines lines are kept, if it's given: the rest of a psalm's intonation file
  // shows how to sing the flex and later verses.
  // With a translation (see translation() below), each psalm verse is followed by its own,
  // and each other paragraph (or unitGroups' group of them) by its units.  If the units don't
  // match the paragraphs, they all follow the whole chant.
  // A score's annotation in plain text, and so in its translation: its header's beside a drop cap,
  // or else the element's.
  var scoreAnnotation = function(header, annotationAttr, useDropCapAttr) {
    var useDropCap = ('initial-style' in header)? header['initial-style'] === '1' : useDropCapAttr;
    return (header.annotation && useDropCap)? header.annotation : annotationAttr;
  };
  // An antiphon's translation starts with Ant. as well, whether under its notes or in plain text.
  var trPrefixFor = function(annotation) {
    return [].concat(annotation || []).indexOf('Ant.') >= 0? "<i class='red'>Ant.</i> " : '';
  };
  var gabcToHtml = function(gabc, annotationAttr, useDropCapAttr, textLines, translation) {
    var lineCount = 0;
    var verse = /^(\d+)\. /;
    var units = translation && translation.units;
    var paragraphs = [];
    splitGabc(gabc).forEach(function(score) {
      var header = score.header;
      var useDropCap = ('initial-style' in header)? header['initial-style'] === '1' : useDropCapAttr;
      var html = '';
      if(header['user-notes']) {
        html += textMode.noteHtml(header['user-notes']);
      }
      if(header.commentary) {
        html += textMode.noteHtml(header.commentary, 'float:right');
      }
      var annotation = scoreAnnotation(header, annotationAttr, useDropCapAttr);
      var prefix = [].concat(annotation || []).map(function(annotation) {
        return annotationGabc[annotation] || '';
      }).join(' ');
      var trPrefix = trPrefixFor(annotation);
      var body = score.body;
      if(useDropCap) {
        // The first letter isn't a drop cap.
        body = lowerDropCapCaps(body);
      }
      var section = textMode.psalmSection(header);
      // each group of paragraphs is one, with its translation's units
      (section? body.trim().split(/\r?\n\s*\r?\n/).map(function(p) { return [p]; }) :
        translation? unitGroups(body, header) : unitParagraphs(body).map(function(p) { return [p]; })).forEach(function(group, i) {
        var paragraph = group.join('\n\n');
        if(i === 0 && prefix) paragraph = prefix + ' ' + paragraph;
        var lines = paragraph.split(/\r?\n/).map(gabcLineToHtml).filter(function(line) {
          return line && !(textLines && ++lineCount > textLines);
        });
        paragraphs.push({
          labels: i === 0? html : '',
          trPrefix: i === 0? trPrefix : '',
          lines: lines,
          units: group.length,
          verses: !!section && lines.length > 0 && lines.every(function(line) { return verse.test(line); }),
          section: section
        });
      });
    });
    var lines = completeResponses([].concat.apply([], paragraphs.map(function(p) { return p.lines; })),
      /^<span class='versiculum'>r<\/span>&nbsp;/, /^<span class='versiculum'>[vr]<\/span>&nbsp;/);
    paragraphs.forEach(function(p) { p.lines = lines.splice(0, p.lines.length); });
    if(units) units = completeUnitResponses(units);
    var unitCount = paragraphs.reduce(function(count, p) { return count + (p.lines.length && !p.section? p.units : 0); }, 0);
    var paired = units && units.length === unitCount;
    var unit = 0;
    paragraphs.forEach(function(p) {
      if(p.lines.length === 0) {
        p.html = '';
      } else if(p.verses) {
        p.html = '<div class="verses">' + p.lines.map(function(line) {
          var n = parseInt(line.match(verse)[1]);
          var latin = line.replace(verse, '');
          if(translation) return textMode.verseHtml(p.section, n, latin, translation.mode);
          return '<p><span class="verse-number">' + n + '.&nbsp;</span>' + latin + '</p>';
        }).join('') + '</div>';
      } else {
        var latin = p.lines.join('<br>').replace(verse, "<span class='red'>$1.</span> ");
        p.html = (translation && !p.section && (paired || !units))?
          textMode.pairHtml(latin, paired? units.slice(unit, unit += p.units) : null, 'p', translation.mode, p.trPrefix) : '<p>' + latin + '</p>';
      }
    });
    if(units && !paired) {
      console.warn('The translation has ' + units.length + ' units, the chant ' + unitCount, translation.key);
      // the labels stay out of the Latin, which the translation only hides
      return paragraphs.map(function(p) { return p.labels; }).join('') +
        textMode.pairHtml(paragraphs.map(function(p) { return p.html; }).join(''), units, 'div', translation.mode,
          paragraphs.length? paragraphs[0].trPrefix : '');
    }
    return paragraphs.map(function(p) { return p.labels + p.html; }).join('');
  };
  // The hymn sung in the translation (TRANSLATIONS_PLAN.md §4b): one paragraph of GABC, after
  // setGabc's rewrites, with its words in place of the Latin's.  unit is the paragraph's hyphenated
  // text, a line for each line of the chant, whose syllables (split at spaces and at a - between
  // letters; ‿ joins two words sung on one note; a word with no letters goes with the syllable before
  // it, as in tools/do-import/hymn.js's syllables(), which has to split the same way) go one to each
  // syllable of the chant that has notes.  An elided syllable, whose neume is empty, goes; the bars, the clef and a stanza's number
  // stay.  The first syllable is as it's written: setGabc puts the capitals after the drop cap
  // (raiseDropCapCaps).  Returns null if the syllables don't match the notes, which
  // tools/do-import/hymn.js checks.
  var swapLyrics = function(gabc, unit) {
    var words = unit.split('\n');
    var lines = gabc.split(/\r?\n/);
    var w = 0;
    var ok = true;
    var result = lines.map(function(line) {
      var regexSyllable = /([^()]*)\(([^)]*)\)/g;
      if(!/\(([^)]*[a-mA-M][^)]*)\)/.test(line.replace(/^\s*\([cf]b?[1-4]\)/, ''))) return line;
      var syllables = [];
      (words[w++] || '').trim().split(/\s+/).forEach(function(word) {
        if(!/\p{L}/u.test(word) && syllables.length) {
          syllables[syllables.length - 1].text += ' ' + word;
          return;
        }
        // (no lookbehind, which older Safari can't parse)
        word.replace(/([\p{L}\p{M}’'‿.,;:!?¡¿])-(?=[\p{L}¡¿])/gu, '$1\u0000').split('\u0000').forEach(function(text, i) {
          if(text) syllables.push({text: text, wordStart: i === 0});
        });
      });
      var out = '';
      var m;
      while((m = regexSyllable.exec(line))) {
        var text = m[1].trim();
        // a stanza's number ("^2.^ Pro", once setGabc has made it red)
        var number = (text.match(/^\^?\d+\.\^?\s+/) || [''])[0];
        var latin = text.slice(number.length);
        if(latin && /[a-mA-M]/.test(m[2])) {
          var syllable = syllables.shift();
          if(!syllable) {
            ok = false;
            return line;
          }
          out += (syllable.wordStart && out ? ' ' : '') + number + syllable.text + '(' + m[2] + ')';
        } else if(/\S/.test(m[2])) {
          // a bar or the clef, without any words of the Latin's
          out += (out ? ' ' : '') + '(' + m[2] + ')';
        }
        // else elided
      }
      if(syllables.length) ok = false;
      return out;
    });
    return ok && w === words.length ? result.join('\n') : null;
  };
  // Splits a chant into units for 'both' mode, each a score of its own with the translation that
  // follows it (TRANSLATIONS_PLAN.md §4): a psalm's verses (but a psalm's intonation stays whole,
  // followed by verse 1), or the unitGroups of anything else.  A later unit of a score gets the
  // clef again, and no drop cap, annotation or notes.  A chant with no translation isn't split,
  // and if the units don't match the paragraphs, they all follow the whole chant.  An antiphon's
  // first unit has Ant. before its translation, as in plain text.
  var regexClef = /^\s*(\([cf]b?[1-4]\))/;
  var splitUnits = function(scores, translation, annotationAttr, useDropCapAttr) {
    var units = translation.units;
    var sung = translation.sung;
    var result = [];
    var unitCount = 0;
    scores.forEach(function(score) {
      var section = textMode.psalmSection(score.header);
      if(!(section? textMode.hasPsalm(section) : units || sung) || translation.intonation) {
        var verse = section && translation.intonation && textMode.verseTranslationHtml(section, 1, translation.mode);
        if(verse) score.translationHtml = '<div class="verses chant-tr">' + verse + '</div>';
        result.push(score);
        return;
      }
      var clef = (score.body.match(regexClef) || [])[1] || '(c4)';
      var trPrefix = trPrefixFor(scoreAnnotation(score.header, annotationAttr, useDropCapAttr));
      (section? score.body.split(/\r?\n(?=\s*\d+\.\s)/).filter(function(chunk) {
        return /\S/.test(chunk);
      }) : unitGroups(score.body, score.header)).forEach(function(chunk, i) {
        var count = 1;
        if(!section) {
          count = chunk.length;
          chunk = chunk.join('\n\n');
        }
        var unit = {
          header: i === 0? score.header : {'initial-style': '0'},
          body: (i === 0 || regexClef.test(chunk))? chunk : clef + chunk.replace(/^\s+/, ''),
          laterUnit: i > 0,
          trPrefix: i === 0? trPrefix : ''
        };
        if(section) {
          var html = textMode.verseTranslationHtml(section, parseInt(chunk.replace(regexClef, '')), translation.mode);
          if(html) unit.translationHtml = '<div class="verses chant-tr">' + html + '</div>';
        } else {
          unit.index = unitCount;
          unit.count = count;
          unitCount += count;
        }
        result.push(unit);
      });
    });
    if(sung) {
      // the translation's words under the notes, and in 'both' mode the Latin's under each stanza
      if(sung.length !== unitCount) {
        console.warn('The sung translation has ' + sung.length + ' units, the chant ' + unitCount, translation.key);
        return scores;
      }
      result.forEach(function(unit) {
        if(!('index' in unit)) return;
        unit.sung = sung[unit.index];
        if(translation.mode !== 'both') return;
        var latin = (unit.laterUnit? unit.body : lowerDropCapCaps(unit.body)).split(/\r?\n/).map(gabcLineToHtml).filter(Boolean).map(function(line) {
          return line.replace(/^(\d+)\. /, "<span class='red'>$1.</span> ");
        });
        unit.translationHtml = "<div class='chant-tr'><p class='tr' lang='la'>" + latin.join("&nbsp;<span class='red'>/</span> ") + '</p></div>';
      });
      return result;
    }
    if(!units) return result;
    // Under the notes, a hymn's or a Marian antiphon's lines run together, with a red slash between them.
    var slashes = /^(te-lucis|marian-antiphon)\/(?!.*-prayer)/.test(translation.key);
    var unitHtml = function(units, runOn, trPrefix) {
      return '<div class="chant-tr"><p' + textMode.trAttributes() + '>' + (trPrefix || '') + textMode.unitsHtml(units, slashes, runOn) + '</p></div>';
    };
    if(units.length !== unitCount) {
      console.warn('The translation has ' + units.length + ' units, the chant ' + unitCount, translation.key);
      scores[scores.length - 1].translationHtml = unitHtml(units, false, result.length? result[0].trPrefix : '');
      return scores;
    }
    result.forEach(function(unit) {
      // its ℟ Amen on its own line or not, as the Latin's is in the GABC (and so in plain text)
      if('index' in unit) unit.translationHtml = unitHtml(units.slice(unit.index, unit.index + unit.count),
        textMode.runsOnResponse(unit.body.split(/\r?\n/).map(gabcLineToHtml).join('<br>')), unit.trPrefix);
    });
    return result;
  };
  // The undertie ‿ of a sung hymn comes from a font of its own, which the browser loads only once
  // it's used (style.css); exsurge measures the lyrics before then, so a chant that has one is drawn
  // again once it has loaded, without the widths exsurge cached (it drops them only on the fonts'
  // loadingdone event, which comes after this).  done: it has loaded, or failed to.
  var undertieFont = null;
  var whenUndertieLoaded = function(redraw) {
    if(!window.document.fonts || !window.document.fonts.load) return;
    if(!undertieFont) {
      undertieFont = {done: false};
      undertieFont.promise = window.document.fonts.load("1em 'Crimson Text'", '‿').then(null, function() {}).then(function() {
        undertieFont.done = true;
      });
    }
    if(!undertieFont.done) undertieFont.promise.then(redraw);
  };
  var _width = window.document.body.clientWidth;
  var doLayout = function(sync) {
    _width = window.document.body.clientWidth;
    console.info(_width, sync);
    if(sync === true) _width = Math.min(_width,printWidth);
    // the text scale may have changed with the window (or in the settings, while the app was away)
    cachedTextScale = null;
    // every chant's layout first, then every chant onto the page: the page then has its styles
    // worked out once, not once for each chant (exsurge checks the fonts, which needs them)
    $('chant-gabc').filter(function(){
      return this.layout && this.layout(_width,sync === true);
    }).each(function(){
      this.render();
    });
  };
  // Wait for the resize or rotation to finish before laying out again.
  var resizeTimeout;
  var doLayoutAfterResize = function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(doLayout, 100);
  };
  // Makes a fixed-size SVG scale to fill the width of its container.
  // exsurge already writes the viewBox, so this only swaps the fixed size for a percentage width.
  var makeSvgScalable = function(svg, layoutWidth) {
    svg.setAttribute('width', (100 * svg.getAttribute('width') / layoutWidth) + '%');
    svg.removeAttribute('height');
    return svg;
  };
  // How much the browser enlarges CSS text beyond its specified size: Android's font size setting
  // (the WebView's text zoom, and Chrome's text scaling).  It leaves SVG text alone, so without
  // this the chant's words come out smaller than the text around them.  A 100px probe reports it.
  // Reading it has the browser work out the whole page's styles, so it's read once for all the
  // chants, and again only when doLayout() lays them all out again.
  var cachedTextScale = null;
  var textScale = function() {
    if(cachedTextScale !== null) return cachedTextScale;
    var probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;font-size:100px';
    document.body.appendChild(probe);
    var scale = parseFloat(window.getComputedStyle(probe).fontSize) / 100;
    document.body.removeChild(probe);
    cachedTextScale = scale > 0 ? scale : 1;
    return cachedTextScale;
  };
  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
        console.info('calling before printing via media query');
        printWidth = window.document.body.clientWidth;
        console.info({printWidth:printWidth});
        doLayout(true);
      } else {
        // console.info('calling after printing via media query');
        // doLayout(true);
      }
    });
  }
  var layoutChantSync = function() {
      doLayout(true);
  }
  window.onbeforeprint = function() { doLayout(true) };
  window.onafterprint = function() { doLayout() };
  if (window.addEventListener) {
    window.addEventListener('resize',doLayoutAfterResize,false);
    window.addEventListener('orientationchange',doLayoutAfterResize,false);
    // Cordova: back in the app, whose font size may have been changed in Android's settings
    document.addEventListener('resume',doLayoutAfterResize,false);
  } else if (window.attachEvent) window.attachEvent('onresize',doLayoutAfterResize);
  // client side support
  class ChantVisualElement extends HTMLElement {
    constructor() {
      super();
      this.createdCallback();
    }

    setSrc(src) {
      var elem = this;
      var $this = $(this);
      src = src || $this.attr('src');
      if(!src) return;
      this._width = 0;
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4 && (request.status === 200 || request.status === 0) && $this.attr('src') === src) {
          elem.setGabc(request.responseText);
        }
      };
      request.open("GET", src, true); // true for asynchronous 
      request.send(null);
    }

    doLayout(newWidth, sync) {
      if(this.layout(newWidth, sync)) this.render();
    }

    // Lays out the chant's scores at the width and draws each one, without touching the page
    // (render() puts them on it).  False if there's nothing to draw, or it's drawn at this width.
    layout(newWidth, sync) {

      var score = this._score;
      var ctxt = this._ctxt;
      // not loaded yet, or plain text
      if(!score) return false;
      newWidth = newWidth || (this.parentElement && this.parentElement.clientWidth) || window.document.body.clientWidth;
      if(newWidth === 0) return false;
      sync = !!sync;
      // printing uses the full width, without scaling.  On screen, laying out narrower by the text
      // scale has the SVG scale up by it, notes and words together, to match the text around it.
      if(!sync) newWidth = Math.min(newWidth, maxLayoutWidth) / textScale();
      if(this._width === newWidth && this._sync === sync) return false;
      var width = this._width = newWidth;
      this._sync = sync;
      // perform layout on the chant
      for(var i = 0; i < score.length; ++i) {
        score[i].performLayout(ctxt);
        score[i].layoutChantLines(ctxt, width);
        // render the score to svg
        if(sync) {
          score[i].drawing = score[i].createSvgForEachLine(ctxt);
        } else {
          // as nodes, which playback lights up note by note (chant-playback.js)
          score[i].drawing = makeSvgScalable(score[i].createSvgNode(ctxt), width);
        }
      }
      return true;
    }

    // Puts the scores that layout() drew on the page, each with its notes and translation.
    render() {
      var score = this._score;
      this.innerHTML = this._noteHtml || '';
      for(var i = 0; i < score.length; ++i) {
        if(score[i].userNotes) {
          this.insertAdjacentHTML('beforeend', textMode.noteHtml(score[i].userNotes));
        }
        if(score[i].commentary) {
          this.insertAdjacentHTML('beforeend', textMode.noteHtml(score[i].commentary, 'float:right'));
        }
        var firstSvg = this.children.length;
        if(this._sync) {
          this.insertAdjacentHTML('beforeend', score[i].drawing);
        } else {
          this.appendChild(score[i].drawing);
        }
        // the language of its words, for screen readers: Latin, or the translation's where the hymn
        // is sung in it (§4b)
        for(var j = firstSvg; j < this.children.length; ++j) {
          this.children[j].setAttribute('lang', score[i].lyricsLang);
        }
        if(score[i].translationHtml) {
          this.insertAdjacentHTML('beforeend', score[i].translationHtml);
        }
      }
      this.markLang();
    }

    // The language of the chant's own words outside its scores, for screen readers: Latin.  doLayout
    // marks each score's SVG, its red labels have none, and a block that holds a translation (a
    // .tr-pair, .chant-tr or .verses) has it on each of its parts already.
    markLang() {
      Array.prototype.forEach.call(this.children, function(child) {
        if(child.hasAttribute('lang') || child.classList.contains('red') || child.querySelector('[lang]')) return;
        child.setAttribute('lang', 'la');
      });
    }

    isPlainText() {
      if(!this.hasAttribute('plain-text')) return false;
      // with the translation only, a hymn sung in the translation is still drawn as notes (§4b)
      var hymn = textMode.modeOf(this) === 'tr' && textMode.hymn(this.getAttribute('src'), true);
      return !(hymn && hymn.kind === 'sung');
    }

    // The translation of this chant (TRANSLATIONS_PLAN.md §4), or null in 'la' mode, with the mode
    // its section shows in (text-mode.js modeOf).  A psalm's
    // comes verse by verse from the psalter, and anything else's is a unit per paragraph, keyed
    // by its src.  A psalm's intonation (text-lines) has only verse 1.  The hymn's is as hymnMode
    // chooses (§4b): sung is the translation's words for the notes, and unsung says that this
    // tone's doxology can't be sung in the language, so it's shown as text.
    translation() {
      var mode = textMode.modeOf(this);
      if(mode === 'la') return null;
      var key = this.getAttribute('src');
      var psalm = /^(psalms|canticle)$/.test(this.getAttribute('notation'));
      var hymn = textMode.hymn(key, !this.hasAttribute('plain-text') || mode === 'tr');
      var sung = hymn && hymn.kind === 'sung';
      return {
        mode: mode,
        key: key,
        units: psalm || sung? null : hymn? hymn.units : textMode.texts(key),
        sung: sung? hymn.units : null,
        unsung: !!(hymn && hymn.unsung),
        intonation: psalm && this.hasAttribute('text-lines')
      };
    }

    // Draws the chant again if the text mode or translation has changed since it was drawn.
    updateText() {
      if(this._gabc && this._textKey !== textMode.renderKey(this.getAttribute('src'), textMode.modeOf(this), hasNotes(this._gabc))) {
        this.setGabc(this._gabc, this._annotationAttr, this._useDropCapAttr);
      }
    }

    setGabc(gabc, annotationAttr, useDropCapAttr) {
      if(/^\s*$/.test(gabc)) return;
      this._gabc = gabc;
      this._annotationAttr = annotationAttr;
      this._useDropCapAttr = useDropCapAttr;
      var mode = textMode.modeOf(this);
      textMode.markMode(this, mode);
      this._textKey = textMode.renderKey(this.getAttribute('src'), mode, hasNotes(gabc));
      var translation = this.translation();
      var unsung = textMode.rubric('hymn-unsung');
      this._noteHtml = translation && translation.unsung?
        "<p class='red hymn-note'" + (unsung ? " lang='" + textMode.langAttr() + "'" : '') + '><i>' +
        (unsung ? textMode.rubricHtml(unsung) : 'Not available to sing in ' + textMode.langName() + ' for this season.') + '</i></p>' : '';
      var useDropCap = [];
      if (useDropCapAttr === 'false') {
        useDropCapAttr = false;
      } else {
        useDropCapAttr = true;
      }

      this._plainText = this.isPlainText();
      this.classList.toggle('plain-text', this._plainText);
      if(this._plainText) {
        // no exsurge layout at all
        this._score = null;
        this._exsurgeKey = null;
        this.innerHTML = this._noteHtml + gabcToHtml(gabc, annotationAttr, useDropCapAttr, parseInt(this.getAttribute('text-lines')), translation);
        this.markLang();
        return;
      }
      var inputs = [];
      var ctxt = this._ctxt;
      gabc = normalizeGabc(gabc.replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
        .replace(/<b><\/b>/g,''));
      var scores = splitGabc(gabc);
      if(translation) scores = splitUnits(scores, translation, annotationAttr, useDropCapAttr);
      if(translation && translation.sung && /‿/.test(translation.sung.join(''))) {
        var elem = this;
        var drawn = this._gabc;
        whenUndertieLoaded(function() {
          if(elem._gabc !== drawn) return;
          elem._ctxt.clearTextCache();
          // drawn again from the start, with the font's widths
          elem._exsurgeKey = null;
          elem.setGabc(elem._gabc, elem._annotationAttr, elem._useDropCapAttr);
        });
      }
      for(var i=0; i<scores.length; ++i) {
        var gabcHeader = scores[i].header;
        gabc = scores[i].body
          .replace(/([^c])u([aeiouáéíóú])/g,'$1u{$2}')
          .replace(/<\/?sc>/g,'%')
          .replace(/<\/?b>/g,'*')
          .replace(/<\/?i>/g,'_')
          .replace(/(\s)_([^\s*]+)_(\(\))?(\s)/g,"$1^_$2_^$3$4")
          .replace(/(\([cf][1-4]\)|\s)(\d+\.)(\s\S)/g,"$1^$2^$3");
        // the hymn sung in the translation: its words go in after the rewrites above, which are for Latin
        if('initial-style' in gabcHeader) {
          useDropCap[i] = gabcHeader['initial-style'] === '1';
        }
        if(!(i in useDropCap)) useDropCap[i] = useDropCapAttr;
        var lyricsLang = 'la';
        if(scores[i].sung) {
          var swapped = swapLyrics(gabc, scores[i].sung);
          if(swapped) {
            gabc = useDropCap[i] ? raiseDropCapCaps(swapped) : swapped;
            lyricsLang = textMode.langAttr();
          } else console.warn('The sung translation doesn\'t fit the notes', this.getAttribute('src'), scores[i].sung);
        }
        var annotation = null;
        if(gabcHeader && gabcHeader.annotation && useDropCap[i]) {
          annotation = gabcHeader.annotation;
        } else if(annotationAttr && !scores[i].laterUnit) {
          annotation = annotationAttr;
        } else if(gabcHeader && gabcHeader.mode) {
          annotation = gabcHeader.mode + '.';
        }
        inputs[i] = {
          gabc: gabc,
          useDropCap: useDropCap[i],
          lyricsLang: lyricsLang,
          annotation: annotation,
          userNotes: gabcHeader && gabcHeader['user-notes'],
          commentary: gabcHeader && gabcHeader.commentary
        };
      }
      // A translation under the notes changes nothing that exsurge draws, so with the same scores
      // as before, the drawings are put back with the new translation under them.
      var exsurgeKey = JSON.stringify(inputs);
      if(this._score && this._exsurgeKey === exsurgeKey) {
        for(i = 0; i < scores.length; ++i) {
          this._score[i].translationHtml = scores[i].translationHtml;
        }
        // laid out again only if the width has changed since
        if(this.layout(_width) || this._width) this.render();
        return;
      }
      this._exsurgeKey = exsurgeKey;
      this._width = 0;
      var mappings = this._mappings = [];
      var score = this._score = [];
      inputs.forEach(function(input, i) {
        mappings[i] = exsurge.Gabc.createMappingsFromSource(ctxt, input.gabc);
        score[i] = new exsurge.ChantScore(ctxt, mappings[i], input.useDropCap);
        // the translation's rules for centering the notes over its syllables, where exsurge has them
        // (English and Spanish, the languages with a sung hymn); the others keep the Latin's
        if(input.lyricsLang !== 'la') {
          exsurge.Gabc.applyHeader(score[i], ctxt, {language: input.lyricsLang.split('-')[0]}, {annotation: false, mode: false});
        }
        if(input.annotation instanceof Array) {
          score[i].annotation = new exsurge.Annotations(ctxt, input.annotation[0], input.annotation[1]);
        } else if(input.annotation) {
          score[i].annotation = new exsurge.Annotation(ctxt, input.annotation);
        }
        if(input.userNotes) {
          score[i].userNotes = input.userNotes;
        }
        if(input.commentary) {
          score[i].commentary = input.commentary;
        }
        score[i].translationHtml = scores[i].translationHtml;
        score[i].lyricsLang = input.lyricsLang;
      });
      this.doLayout(_width);
    }

    createdCallback() {
      var ctxt = new exsurge.ChantContext(exsurge.TextMeasuringStrategy.Canvas);

      ctxt.setGlyphScaling(1/16);
      // Draw in the inherited CSS `color` (see theme.css) so the chant follows light/dark
      // mode without re-rendering.  setFont() gives every text style this color.
      ctxt.textColor = 'currentColor';
      ctxt.staffLineColor = ctxt.neumeLineColor = ctxt.dividerLineColor = 'currentColor';
      // The hollow of a punctum cavum has to match the background.  Glyphs are shared through <use>,
      // whose shadow tree stylesheet rules cannot reach, so the colour travels with the glyph as a fill
      // attribute whose variable resolves per theme (see theme.css).
      ctxt.negativeFillColor = 'var(--exsurge-negative-fill, #fff)';
      // lyrics are 0.9 of the font size: 19.2px
      ctxt.setFont("'Crimson Text', serif", 19.2 / 0.9);
      ctxt.textStyles.dropCap.size = 64;
      ctxt.textStyles.annotation.size = 13;
      ctxt.textStyles.annotation.color = 'var(--rubric-color, #d00)';
      ctxt.minLyricWordSpacing *= 0.7;
      ctxt.accidentalSpaceMultiplier = 1.5;
      // keep the vertical spacing that exsurge had before 2.0
      ctxt.minSpaceAboveStaff = 1;
      ctxt.spaceBetweenSystems = 0;
      // choose the line breaks of the whole score together, as Gregorio does, rather than filling
      // each line in turn; doLayout() lays out the screen and print renders the same way
      ctxt.lineBreaking = 'optimal';
      // and never leave a lone syllable such as the "men." of "℟. A-men." for the last line
      ctxt.minSyllablesLastLine = 2;
      ctxt.minNotesLastLine = 4;

      ctxt.specialCharProperties['font-family'] = "'Versiculum'";
      ctxt.specialCharProperties['font-variant'] = 'normal';
      ctxt.specialCharProperties['font-weight'] = '400';
      var defaultSpecialCharText = ctxt.specialCharText;
      ctxt.specialCharText = function(char) { return defaultSpecialCharText(char).toLowerCase(); };
      // Rubric red follows --rubric-color (theme.css)
      ctxt.setRubricColor('var(--rubric-color, #d00)');

      this._ctxt = ctxt;

      var srcAttr = this.getAttribute("src");
      if(srcAttr) {
        this.setSrc(srcAttr);
      } else {
        this.setGabc(this.innerText,this.getAttribute("annotation"),this.getAttribute("use-drop-cap"));
      }

      this._width = 0;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case "src":
          this.setSrc(newValue);
          return;
        // once drawn, innerText is the rendering, not the GABC
        case "annotation":
          this.setGabc(this._gabc || this.innerText,newValue,this.getAttribute("use-drop-cap"));
          return;
        case "use-drop-cap":
          this.setGabc(this._gabc || this.innerText,this.getAttribute("annotation"),newValue);
          return;
        case "plain-text":
          // redraw only if it has changed between the chant and the words
          if(this._gabc && this.isPlainText() !== this._plainText) {
            this.setGabc(this._gabc, this._annotationAttr, this._useDropCapAttr);
          }
          return;
      }
    }

    static get observedAttributes() { return ['src','annotation','use-drop-cap','plain-text']; }
  };
  // register the custom element
  if(window.customElements && window.customElements.define) {
    window.customElements.define('chant-gabc', ChantVisualElement);
  } else {
    document.registerElement('chant-gabc', {
      prototype: ChantVisualElement.prototype
    });
  }
});
require(['jquery','moment','calendar','text-mode','hyphenate'], function($,moment,calendar,textMode,hyphenate) {
  'use strict';
  // soft hyphens in the Latin and the translations, from now on (js/hyphenate.js)
  hyphenate.watch();
  $('select').val('');
  // shared with js/text-mode.js, which tests that storage works
  var localStorage = textMode.storage;
  if(!('region' in localStorage)) localStorage.region = '';
  // The notation levels replace the fullNotation checkboxes, so carry those over.
  if(!('notationPsalms' in localStorage)) localStorage.notationPsalms = localStorage.fullNotation === '1' ? 'full' : 'pointed';
  if(!('notationChapter' in localStorage)) localStorage.notationChapter = localStorage.fullNotationChapter === '0' ? 'pointed' : 'full';
  if(!('notationPrayers' in localStorage)) localStorage.notationPrayers = localStorage.fullNotationPrayers === '1' ? 'full' : 'pointed';
  if(!('notationHymn' in localStorage)) localStorage.notationHymn = 'full';
  if(!('notationMarian' in localStorage)) localStorage.notationMarian = 'full';
  if(!('notationChants' in localStorage)) localStorage.notationChants = 'full';
  // The short lesson and the short responsory were among the other chants until they got menus of
  // their own.
  if(!('notationLesson' in localStorage)) localStorage.notationLesson = localStorage.notationChants;
  if(!('notationResponsory' in localStorage)) localStorage.notationResponsory = localStorage.notationChants;
  // The canticle had the psalms' menu until it got its own.
  if(!('notationCanticle' in localStorage)) localStorage.notationCanticle = localStorage.notationPsalms;
  // The hymn translation's "Sung with chant" is now the hymn's 'Fully notated translation', where it
  // was sung: with the translation only, or beside the notated Latin.
  if(localStorage.hymnMode === 'sung') {
    if(localStorage.notationHymn === 'tr' || localStorage.textMode === 'tr' ||
        (localStorage.textMode === 'both' && localStorage.notationHymn === 'full')) localStorage.notationHymn = 'sung';
    localStorage.hymnMode = 'metrical';
  }
  delete localStorage.fullNotation;
  delete localStorage.fullNotationChapter;
  delete localStorage.fullNotationPrayers;
  if(!('autoSelectRegion' in localStorage)) localStorage.autoSelectRegion = '1';
  var usedRegions = {};
  $('#selectRegion').append('<option value="">None</option>'+Object.keys(calendar.roman.regionCodeMap).map(function(code){
    var name = calendar.roman.regionCodeMap[code];
    if(name in usedRegions) return '';
    usedRegions[name] = '';
    return '<option value="'+code+'"">'+name+'</option>';
  }).join('')).val(localStorage.region);
  var $optionsMenu = $('#options-menu');
  $(document.body).click(function(e){
    var $target = $(e.target);
    if($target.parents().is($optionsMenu)) {
      if(!$target.closest('a,input,select,label,button').length) $optionsMenu.toggleClass('showing');
      if($optionsMenu.hasClass('showing')) showJumps();
    } else {
      $optionsMenu.removeClass('showing');  
    }
  });
  // How much notation each section shows (TRANSLATIONS_PLAN.md §4c).  Each has a
  // <select notation='section'>, and the body class notation-<section>-<level>, which
  // style.css reads.  Its <chant-gabc notation='section'> elements (no attribute means
  // 'chants') get the attribute plain-text when they should show their words.  'tr' is the
  // translation only, as plain text, whatever the Text menu says (text-mode.js sectionMode).  The
  // hymn's 'sung' is the translation sung to the chant (§4b): beside the Latin as the Text menu
  // says, or alone with the Latin only.
  var notationSections = {
    lesson:   {key: 'notationLesson',   levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'full'},
    psalms:   {key: 'notationPsalms',   levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    canticle: {key: 'notationCanticle', levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    chapter:  {key: 'notationChapter',  levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'full'},
    responsory: {key: 'notationResponsory', levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    prayers:  {key: 'notationPrayers',  levels: ['text', 'pointed', 'full', 'tr'], defaultLevel: 'pointed'},
    hymn:     {key: 'notationHymn',     levels: ['text', 'full', 'sung', 'tr'], defaultLevel: 'full'},
    marian:   {key: 'notationMarian',   levels: ['text', 'full', 'tr'], defaultLevel: 'full'},
    chants:   {key: 'notationChants',   levels: ['text', 'full', 'tr'], defaultLevel: 'full'}
  };
  // A sung hymn, where the language can't sing it, is the translation only, as the menu shows; it's
  // kept for a language that can.
  var storedNotation = function(section) {
    var s = notationSections[section];
    var level = localStorage[s.key];
    level = s.levels.indexOf(level) >= 0 ? level : s.defaultLevel;
    return level === 'sung' && !textMode.canSing() ? 'tr' : level;
  };
  var trSections = function() {
    return Object.keys(notationSections).filter(function(section) {
      var level = storedNotation(section);
      return level === 'tr' || (level === 'sung' && textMode.mode() === 'la');
    });
  };
  // Tells text-mode.js which sections show the translation only, and whether the hymn is sung in it.
  var syncSections = function() {
    textMode.setTrSections(trSections());
    textMode.setHymnSung(storedNotation('hymn') === 'sung');
  };
  syncSections();
  // With the translation only, everything is plain text (TRANSLATIONS_PLAN.md §4).
  var notation = function(section) {
    return textMode.sectionMode(section) === 'tr'? 'text' : storedNotation(section);
  };
  var fullyNotated = function(section) {
    return notation(section) === 'full';
  };
  // The notated lesson, chapter and prayers are hidden below 'full', so they skip exsurge layout too.
  // A chant shows in its own section's mode (text-mode.js modeOf).  The psalms' and the canticle's
  // antiphons (the chants without a notation of their own in #placeholder and #canticle) are plain
  // text with their psalm, and notated while it's pointed.
  var antiphons = '[data-section=psalms] chant-gabc:not([notation]), [data-section=canticle] chant-gabc:not([notation])';
  var markPlainText = function(section) {
    var stored = storedNotation(section);
    var $chants = section === 'chants'? $('chant-gabc:not([notation])').not(antiphons) :
      $('chant-gabc[notation=' + section + ']').add(section === 'psalms' || section === 'canticle'?
        '[data-section=' + section + '] chant-gabc:not([notation])' : null);
    $chants.each(function(){
      var level = textMode.modeOf(this) === 'tr'? 'text' : stored === 'tr'? notationSections[section].defaultLevel : stored === 'sung'? 'full' : stored;
      var plainText = section === 'psalms' || section === 'canticle'? level === 'text' : level !== 'full';
      $(this).attr('plain-text', plainText? '' : null);
    });
  };
  // for chants added to the page after updateNotation
  var markAllPlainText = function() {
    $.each(notationSections, markPlainText);
  };
  var updateNotation = function(section) {
    var level = notation(section);
    $.each(notationSections[section].levels, function(i, l) {
      $(document.body).toggleClass('notation-' + section + '-' + l, l === level);
    });
    $('select[notation=' + section + ']').val(storedNotation(section));
    if(section === 'hymn') showHymnNotation();
    markPlainText(section);
  };
  // The hymn's menu offers singing it where the language can, and with the Text menu's translation
  // only (which hides the other notation menus), nothing else: there it stays while the language can
  // sing it.
  var showHymnNotation = function() {
    var trOnly = textMode.mode() === 'tr';
    var $selects = $('select[notation=hymn]');
    $selects.children('[value=sung]').prop({disabled: !textMode.canSing(), hidden: !textMode.canSing()});
    $selects.children('[value=text],[value=full]').prop({disabled: trOnly, hidden: trOnly});
    if(trOnly) $selects.val(storedNotation('hymn') === 'sung'? 'sung' : 'tr');
    $('.hymn-notation-menu').prop('hidden', trOnly && !textMode.canSing());
  };
  $.each(notationSections, updateNotation);
  // Sets the sections' notation to level.
  var setNotation = function(sections, level) {
    var was = trSections().join() + (storedNotation('hymn') === 'sung');
    sections.forEach(function(section) {
      localStorage[notationSections[section].key] = level;
    });
    // to or from the translation only, or singing the hymn in it: the translation may need loading,
    // and the sections' text is translated again
    if(was !== trSections().join() + (storedNotation('hymn') === 'sung')) {
      updateTextMode();
      return;
    }
    sections.forEach(function(section) {
      updateNotation(section);
      if(section === 'hymn') showHymnMode();
      if(section === 'psalms') setPsalms();
      if(section === 'canticle') setCanticle();
    });
  };
  $('select[notation]').change(function(e){
    setNotation([$(this).attr('notation')], $(this).val());
  });
  // The button before a section's menu goes to that section on the page, where it's shown today,
  // and leaves the menu open.
  var $jumps = $optionsMenu.find('button.jump');
  $jumps.html('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>');
  var jumpTarget = function(button) {
    return $($(button).attr('data-jump')).filter(':visible')[0];
  };
  var showJumps = function() {
    $jumps.each(function(){
      $(this).css('visibility', jumpTarget(this)? '' : 'hidden');
    });
  };
  $jumps.click(function(e){
    var target = jumpTarget(this);
    if(!target) return;
    target.scrollIntoView(true);
  });
  // What text to show: Latin, Latin and a translation, or the translation only; and which
  // translation (TRANSLATIONS_PLAN.md §5).  js/text-mode.js keeps both, and the body class
  // text-<mode>, which style.css reads.
  var $textMode = $('#selectTextMode');
  var $trLang = $('#selectTrLang');
  $trLang.append(textMode.languages.map(function(l){
    return '<option value="' + l.code + '">' + l.name + '</option>';
  }).join(''));
  // no menus until a translation is offered (?text= still works, for testing)
  $textMode.add($trLang).closest('li').toggle(textMode.languages.length > 0);
  // With the Latin only, the Translation menu is the Rubrics', which offers only the languages with
  // rubrics of their own.
  var showTextMode = function() {
    textMode.updateBodyClasses();
    $textMode.val(textMode.mode());
    var rubricsOnly = !textMode.translated();
    $('#trLangLabel').text(rubricsOnly ? 'Rubrics' : 'Translation');
    $trLang.children().each(function() {
      var other = rubricsOnly && textMode.rubricsLang(this.value) !== this.value;
      $(this).prop({disabled: other, hidden: other});
    });
    $trLang.val(rubricsOnly ? textMode.rubricsLang(textMode.lang()) : textMode.lang());
  };
  showTextMode();
  // How to show the hymn in the translation (TRANSLATIONS_PLAN.md §4b and §5): literal or metrical
  // as text, or fully notated where the language can sing it, which is the hymn's 'Fully notated
  // translation'.  A choice the language hasn't is disabled.  text-mode.js falls back from a choice
  // the language or the season hasn't.
  var $hymnMode = $('#selectHymnMode');
  var showHymnMode = function() {
    var kinds = textMode.sectionMode('hymn') !== 'la' && textMode.hymnKinds();
    $hymnMode.closest('.hymn-mode-choice').prop('hidden', !kinds);
    if(!kinds) return;
    $hymnMode.children('[value=literal]').prop('disabled', !kinds.literal);
    $hymnMode.children('[value=metrical]').prop('disabled', !kinds.metrical);
    $hymnMode.children('[value=sung]').prop({disabled: !textMode.canSing(), hidden: !textMode.canSing()});
    if(storedNotation('hymn') === 'sung') {
      $hymnMode.val('sung');
      return;
    }
    // a choice that's disabled here shows what is shown in its place, and is kept for a language
    // that has it
    var fallbacks = {literal: ['literal', 'metrical'], metrical: ['metrical', 'literal']};
    $hymnMode.val(fallbacks[textMode.hymnMode()].filter(function(kind) {
      return !$hymnMode.children('[value=' + kind + ']').prop('disabled');
    })[0]);
  };
  $hymnMode.change(function(e){
    var kind = $(this).val();
    // to or from singing it: as text, the Latin stays notated beside it, or it's alone
    if(kind === 'sung' || storedNotation('hymn') === 'sung') {
      if(kind !== 'sung') textMode.setHymnMode(kind);
      setNotation(['hymn'], kind === 'sung'? 'sung' : textMode.mode() === 'both'? 'full' : 'tr');
      return;
    }
    textMode.setHymnMode(kind);
    $('chant-gabc[notation=hymn]').each(function(){
      if(this.updateText) this.updateText();
    });
  });
  // Where the translations come from, at the foot of the page while one is shown: Divinum
  // Officium, whose MIT license (js/i18n/LICENSE-divinum-officium.txt) opens under it, and what
  // was written for this app in the language shown.
  var $credits = $('#credits');
  var showCredits = function() {
    $credits.prop('hidden', !textMode.translated());
    $credits.children('[data-credit-lang]').each(function(){
      $(this).prop('hidden', $(this).attr('data-credit-lang').split(' ').indexOf(textMode.lang()) < 0);
    });
  };
  $credits.children('details').on('toggle', function(){
    var $license = $(this).children('pre');
    if(this.open && !$license.text()) {
      $.get('js/i18n/LICENSE-divinum-officium.txt', function(text) {
        // its paragraphs, each wrapped to the page rather than at 80 characters
        $license.text(text.trim().replace(/([^\n])\n(?!\n)/g, '$1 '));
      }, 'text').fail(function() {
        $license.html("The license couldn&rsquo;t be loaded. It is at <a href='https://github.com/DivinumOfficium/divinum-officium/blob/master/LICENSE'>github.com/DivinumOfficium/divinum-officium</a>.");
      });
    }
  });
  // Adds the translation to the page, or takes it away, and redraws the chants that it changes.
  var translatePage = function() {
    showCredits();
    showHymnMode();
    textMode.translate(document.body);
    $('chant-gabc').each(function(){
      if(this.updateText) this.updateText();
    });
  };
  var updateTextMode = function() {
    // the Text menu and the language decide where the hymn is sung
    syncSections();
    showTextMode();
    textMode.load(function() {
      // the translation only makes its sections plain text
      $.each(notationSections, updateNotation);
      setPsalms();
      setCanticle();
      translatePage();
    });
  };
  $textMode.change(function(e){
    textMode.setMode($(this).val());
    updateTextMode();
  });
  $trLang.change(function(e){
    textMode.setLang($(this).val());
    updateTextMode();
  });
  var toggles = {};
  var autoSelectRegion = toggles.autoSelectRegion = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.autoSelectRegion);
    updateToggle('autoSelectRegion',!!newVal);
    localStorage.autoSelectRegion = newVal? 1 : 0;
    if(newVal) doAutoSelectRegion();
  };
  var selectRegion = function(newVal) {
    if(typeof newVal === 'undefined') return !!parseInt(localStorage.autoSelectRegion);
    $('#selectRegion').val(newVal);
    localStorage.region = $('#selectRegion').val();
  };
  $('input[toggle]').change(function(e){
    var $this = $(this);
    var toggle = toggles[$this.attr('toggle')];
    toggle(this.checked);
  });
  $('#selectRegion').change(function(e){
    selectRegion($(this).val());
  });
  // js/theme.js stores the choice in localStorage.theme and applies it
  $('#selectTheme').val(window.complineTheme.getTheme()).change(function(e){
    window.complineTheme.setTheme($(this).val());
  });
  function updateToggle(toggle,val) {
    if(typeof val === 'undefined') {
      var $toggle = $('input[toggle='+toggle+']');
      val = toggles[toggle]();
      $toggle.prop('checked',val);
    }
    switch(toggle) {
      case 'autoSelectRegion':
        $('#selectRegion').prop('disabled', val);
        break;
    }
  }
  $.each(toggles, function(toggle){
    updateToggle(toggle);
  });
  // IANA time zones (with their legacy aliases) in each region; a name ending in '/' matches every zone under it.
  // England, Scotland and Wales all use Europe/London, so 'GB' isn't a region itself.
  var timeZoneRegions = {
    'US': ['US/', 'Navajo', 'Pacific/Honolulu', 'Pacific/Johnston', 'America/Indiana/', 'America/Kentucky/', 'America/North_Dakota/',
      'America/Adak', 'America/Anchorage', 'America/Atka', 'America/Boise', 'America/Chicago', 'America/Denver', 'America/Detroit',
      'America/Fort_Wayne', 'America/Indianapolis', 'America/Juneau', 'America/Knox_IN', 'America/Los_Angeles', 'America/Louisville',
      'America/Menominee', 'America/Metlakatla', 'America/New_York', 'America/Nome', 'America/Phoenix', 'America/Shiprock',
      'America/Sitka', 'America/Yakutat'],
    'CA': ['Canada/', 'America/Atikokan', 'America/Blanc-Sablon', 'America/Cambridge_Bay', 'America/Creston', 'America/Dawson',
      'America/Dawson_Creek', 'America/Edmonton', 'America/Fort_Nelson', 'America/Glace_Bay', 'America/Goose_Bay', 'America/Halifax',
      'America/Inuvik', 'America/Iqaluit', 'America/Moncton', 'America/Montreal', 'America/Nipigon', 'America/Pangnirtung',
      'America/Rainy_River', 'America/Rankin_Inlet', 'America/Regina', 'America/Resolute', 'America/St_Johns', 'America/Swift_Current',
      'America/Thunder_Bay', 'America/Toronto', 'America/Vancouver', 'America/Whitehorse', 'America/Winnipeg', 'America/Yellowknife'],
    // #selectRegion has one option, 'AU', for Australia and New Zealand
    'AU': ['Australia/', 'NZ', 'NZ-CHAT', 'Pacific/Auckland', 'Pacific/Chatham'],
    'GB': ['GB', 'GB-Eire', 'Europe/London']
  };
  function regionFromTimeZone(timeZone) {
    var region = '';
    $.each(timeZoneRegions, function(code, zones) {
      $.each(zones, function(i, zone) {
        if(zone.slice(-1) === '/'? timeZone.indexOf(zone) === 0 : timeZone === zone) {
          region = code;
          return false;
        }
      });
      if(region) return false;
    });
    return region;
  }
  function doAutoSelectRegion() {
    var timeZone;
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch(e) {}
    if(!timeZone) return;
    var region = regionFromTimeZone(timeZone);
    if(region === 'GB') {
      // Keep England, Scotland or Wales if the user already chose one, and let them choose while auto select is on.
      if(!/^GB-/.test(localStorage.region)) selectRegion('');
      $('#selectRegion').prop('disabled', false);
    } else {
      selectRegion(region);
    }
    console.info('Time zone: ' + timeZone + '\n' + 'Region: ' + region);
  }
  if(parseInt(localStorage.autoSelectRegion)) {
    doAutoSelectRegion();
  }
  // parsed by js/text-mode.js
  $.QueryString = textMode.query;
  if ($.QueryString.successMsg) showAlert(false, $.QueryString.successMsg);
  if ($.QueryString.failMsg) showAlert(true, $.QueryString.failMsg);
  var date = moment();
  
  $('#date').val(date.format("YYYY-MM-DD"));
  var changeDateBy = function(days) {
    return function(i,current) {
      var m = moment(current);
      if(!m.isValid()) {
        m = moment();
      } else {
        m.add(days,'days');
      }
      return m.format("YYYY-MM-DD");
    };
  };
  var nextDay = function(week) {
    $('#date').val(changeDateBy(week? 7 : 1)).change();
  };
  var prevDay = function(week) {
    $('#date').val(changeDateBy(week? -7 : -1)).change();
  };
  $(document).on('click', function(e) {
    $('.btn-group.open').removeClass('open');
  }).on('click', '[data-toggle="dropdown"]', function(e) {
    var $openBtns = $('.btn-group.open');
    $(this).parent('.btn-group').toggleClass('open');
    $openBtns.removeClass('open');
    e.stopPropagation();
  }).on('keypress', function(e){
    switch(e.which) {
      case 106: // j
      case 74:
        prevDay(e.shiftKey);
        break;
      case 107: // k
      case 75:
        nextDay(e.shiftKey);
        break;
    }
  });
  var day = date.day();
  var dayName;
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  if($.QueryString.day) {
    var test = $.QueryString.day;
    if(test in days) {
      day = test;
    } else {
      test = days.indexOf(test);
      if(test in days) {
        day = test;
      }
    }
  }
  // In plain text, a psalm's intonation file shows only verse 1; its other lines show how to sing
  // the flex and later verses.  The rest of the psalm comes from the pointed HTML.
  var textLines = function(section) {
    return fullyNotated(section)? '' : " text-lines='1'";
  };
  // Under Divino Afflatu, only the opening words of the antiphon are said before the psalms and the Nunc dimittis
  // (<antiphon>-intonation.gabc), and the whole of it after them, as DO says it at Compline on every day, double or
  // not (its antetpsalm doubles the antiphons only at Matins, Lauds and Vespers).
  var intoned = function() {
    return calendar.getRubrics() === 'DA';
  };
  // type should be '-po' for paschal octave, '-pt' for paschal time, or '-asd' for all souls' day, '-hs' for Holy
  // Saturday under Divino Afflatu, or '' for regular
  var currentCanticle = '';
  // index.html's own canticle, not intoned
  var renderedCanticle = {intoned: false};
  var setCanticle = function(type) {
    type = (typeof type == 'undefined')? currentCanticle.replace(/_full$/,'') : type;
    var antType = type;
    if(fullyNotated('canticle')) type += '_full';
    if(type === currentCanticle && renderedCanticle.intoned === intoned()) return;
    currentCanticle = type;
    renderedCanticle = {intoned: intoned()};
    var rendered = renderedCanticle;
    // There is no Nunc dimittis antiphon on All Souls' Day.
    var ant = antType === '-asd'? '' : "<chant-gabc src='canticle-ant"+antType+".gabc'></chant-gabc>";
    // Salva nos is begun the same way in Paschal time; the Easter octave's alleluias are said in full.
    var before = ant;
    if(rendered.intoned && /^(|-pt|-hs)$/.test(antType)) {
      before = "<chant-gabc src='canticle-ant"+(antType === '-hs'? '-hs' : '')+"-intonation.gabc'></chant-gabc>";
    }
    if(antType==='-pt') {
      antType = '';
      type = type.slice(3);
    }
    var psalm = "<chant-gabc notation='canticle'"+textLines('canticle')+" src='canticle-psalm"+type+".gabc'></chant-gabc>";
    var gotData = function(data){
      // a later call has changed the canticle since this one asked for its verses
      if(renderedCanticle !== rendered) return;
      var html = before + psalm + data;
      if(antType === '-po') {
        html += "<chant-gabc src='haec-dies.gabc'></chant-gabc>";
      } else {
        html += ant;
      }
      $('#canticle').empty().append(html);
      markAllPlainText();
      textMode.translate('#canticle');
    };
    $('#canticle').empty();
    if(fullyNotated('canticle')) {
      gotData('');
    } else {
      $.get('canticle-psalm'+type+'.html',gotData);
    }
  };
  var currentPsalms = {};
  var renderedPsalms = {};
  var setPsalms = function(day,paschalTime) {
    if(typeof(day) === 'undefined') {
      day = currentPsalms.day;
      paschalTime = paschalTime || currentPsalms.paschalTime;
    } else {
      currentPsalms.day = day;
      currentPsalms.paschalTime = paschalTime;
    }
    if(typeof day == 'undefined' && typeof paschalTime == 'undefined') return;
    // Only process if things have changed since the last time this function was called.
    if(renderedPsalms.day === day && renderedPsalms.paschalTime === paschalTime && renderedPsalms.full === fullyNotated('psalms') &&
        renderedPsalms.intoned === intoned()) return;
    renderedPsalms = {day: day, paschalTime: paschalTime, full: fullyNotated('psalms'), intoned: intoned()};
    var rendered = renderedPsalms;
    var ant = '',
        before = '',
        psalm = '',
        pt = '',
        full = fullyNotated('psalms')? '_full' : '';
    if(day === 'triduum') {
      day = 0;
      pt = '-triduum';
      full = '';
    } else if(day === 'asd') {
      pt = '';
      psalm = "<chant-gabc notation='psalms'"+textLines('psalms')+" src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
    } else {
      pt = paschalTime?'-PT':'';
      var antFile = paschalTime? 'psalms/ant-PT' : 'psalms/'+day+'/ant';
      ant = "<chant-gabc src='"+antFile+".gabc'></chant-gabc>";
      before = rendered.intoned? "<chant-gabc src='"+antFile+"-intonation.gabc'></chant-gabc>" : ant;
      if(paschalTime === 'no-antiphon') ant = before = '';
      psalm = "<chant-gabc notation='psalms'"+textLines('psalms')+" src='psalms/"+day+"/psalm"+pt+full+".gabc'></chant-gabc>";
      dayName = days[day];
    }
    var gotData = function(data){
      // a later call has changed the psalms since this one asked for their verses
      if(renderedPsalms !== rendered) return;
      var html = before + psalm + data + ant;
      $('#placeholder').empty().append(html);
      markAllPlainText();
      textMode.translate('#placeholder');
    };
    if(full) {
      gotData('');
    } else if(typeof(day) !== 'undefined') {
      $.get('psalms/'+day+'/psalm-verses'+pt+'.html',gotData).fail(function(){
        $.get('psalms/'+day+'/psalm-verses.html',gotData);
      });
    }
  };
  // The Miserere of the Triduum under Divino Afflatu (index.html #miserere), loaded the first time it's needed
  var miserereLoaded = false;
  var setMiserere = function() {
    if(miserereLoaded) return;
    miserereLoaded = true;
    $.get('psalms/0/psalm-verses-miserere.html', function(data) {
      $('#miserere').append(data);
      textMode.translate('#miserere');
    });
  };
  var formattedRank = function(rank) {
    switch(rank) {
      case 1:
        return 'I Class';
      case 2:
        return 'II Class';
      case 3:
        return 'III Class';
      case 5:
        return 'Commemoration';
      default:
        return 'Feria';
    }
  };
  var setDate = function(date,region) {
    var dates = calendar.datesForMoment(date);
    var d = calendar.getFeastForDate(date,region);
    //show and hide [include] and [exclude] elements based on the date
    $('[exclude]').each(function(){
      var $this = $(this);
      $this.toggle(!calendar.dateMatches(date, $this.attr('exclude')));
    });
    $('[include]').each(function(){
      var $this = $(this);
      $this.toggle(calendar.dateMatches(date, $this.attr('include')));
    });
    var dateMatchesSelectDate = function($elem) {
      var selectDay = $elem.attr('select-day');
      if(selectDay) {
        selectDay = calendar.dateMatches(date, selectDay);
      } else {
        selectDay = true;
      }
      var matches = calendar.dateMatches(date, $elem.attr('select-date'));
      return matches && selectDay;
    };
    // under Divino Afflatu, the hymn's tone is DO's, where the menu has it (below)
    var $hymn = d.hymn ? $('#te-lucis-' + d.hymn) : $();
    if(d.hymn && !$hymn.length) console.warn('No te-lucis tone', d.hymn);
    //select inputs based on date
    $('.dropdown-menu a[select-date]').each(function(){
      var $this = $(this);
      if($hymn.length && $this.closest('[name=te-lucis]').length) return;
      var matches = dateMatchesSelectDate($this);
      if(matches) {
        $this.trigger('click',true);
      } else {
        var otherInputs = $this.parent().siblings().find('a[value]');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          otherInputs.trigger('click',true);
        }
      }
    });
    $('option[select-date]').each(function(){
      var $this = $(this);
      var matches = dateMatchesSelectDate($this);
      var $parent;
      if(matches) {
        $parent = $this.parent();
        if($parent.val() != $this.val()) {
          $parent.val($this.val()).trigger('change');
        }
      } else {
        var otherInputs = $this.siblings('option');
        if(otherInputs.length==1 && !otherInputs.is('[select-date]')) {
          $parent = $this.parent();
          if($parent.val() != $this.val()) {
            $parent.val(otherInputs.val()).trigger('change');
          }
        }
      }
    });
    $hymn.trigger('click',true);
    var isPT = dates.isPaschalTime(date);
    var showChooseDay = (date.day() !== 0);
    var rbWeekday = $('#rbWeekday').attr('value',date.day());
    if(isPT && dates.isPaschalWeek(date)) {
      showChooseDay = false;
      setPsalms(0,'no-antiphon');
      setCanticle('-po');
      $('.weekday-lbl').text('Easter ' + days[date.day()]);
    } else if(dates.isTriduum(date)) {
      showChooseDay = false;
      var day = date.day();
      setPsalms('triduum');
      setMiserere();
      var name;
      switch(day) {
        case 4:
          name = 'Maundy Thursday';
          break;
        case 5:
          name = 'Good Friday';
          break;
        case 6:
          name = 'Holy Saturday';
          break;
      }
      $('.weekday-lbl').text(name);
    } else if(calendar.dateMatches(date,'easter-1')) {
      // Under Divino Afflatu, Holy Saturday's Compline follows Easter's First Vespers (isTriduum): Sunday's psalms
      // without an antiphon, as in the Easter octave, and the Nunc dimittis with Vespere autem sabbati.
      showChooseDay = false;
      setPsalms(0,'no-antiphon');
      setCanticle('-hs');
      $('.weekday-lbl').text('Holy Saturday');
    } else if(calendar.dateMatches(date,'allSouls')) {
      showChooseDay = false;
      $('.weekday-lbl').text('All Souls Day');
      setPsalms('asd');
      setCanticle('-asd');
    } else {
      var psalmDay = date.day();
      // Sunday's psalms on a feast of the I or II class, or, under Divino Afflatu, where DO's calendar gives
      // them (d.psalms, calendar.js)
      var sundayPsalms = d && ('psalms' in d ? d.psalms === 0 : d.rank <= 2);
      if(showChooseDay && sundayPsalms) {
        $('#rbSunday').trigger('click',true);
        psalmDay = 0;
      } else {
        rbWeekday.trigger('click',true);
      }
      $('.weekday-lbl').text(days[date.day()]);
      setPsalms(psalmDay, choices.season == 'paschal');
      setCanticle(isPT?'-pt':'');
    }
    $(document.body).toggleClass('hide-choose-day',!showChooseDay);
    if(d.alternates) {
      var selectFeast = $('#selectFeastDay');
      selectFeast.empty().append(d.alternates.map(function(alt,i){
        return '<option value="' + (alt.region && alt.region[0] || '') + '">'+
  alt.title+(alt.rank < 5?(' (' + formattedRank(alt.rank) + ')'): '') + (alt.region?(' ['+alt.region.join(', ')+']'):'')+
'</option>';
      }).join(''));
      var _currentRegion = "";
      var alt = d.alternates.filter(function(alt){
        return alt.region && alt.region.indexOf(region)>=0;
      });
      if(alt.length) _currentRegion = alt[0].region[0];
      selectFeast.val(_currentRegion);
    } else {
      // under Divino Afflatu, the rank as it was, and whether Compline follows the office's First Vespers
      $('#feastDay').text(d.title + (d.rankName ? ' (' + d.rankName + (d.first ? ', First Vespers' : '') + ')' :
          d.rank < 5 ? ' (' + formattedRank(d.rank) + ')' : ''));
    }
    $('#feastDay').toggle(!d.alternates);
    $('#selectFeastDay').toggle(!!d.alternates);
  };
  var setChantSrc = function($elem,src){
    if(!$elem || $elem.length === 0) return;
    $elem.attr('src',src);
    // until chant-element has loaded, the src attribute is enough
    if($elem.get(0).setSrc) $elem.get(0).setSrc(src);
  };
  var loadChant = function(chant,value,id) {
    var src = chant + '/' + value + '.gabc';
    setChantSrc($('#'+chant),src);
    var $div = $('chant-gabc[' + id + ']');
    if($div.length > 0) {
      setChantSrc($div,$div.attr(id));
    }
    $('div.' + chant).hide();
    $('div.' + chant + '.' + value).show();
  };
  var choices = {};
  $('.btn-group .dropdown-menu>li>a[value]').click(function(e, isProgrammaticTrigger){
    e.preventDefault();
    var $this = $(this),
        $li = $this.parent(),
        $parent = $this.parents('.btn-group').first(),
        $label = $parent.find('.btn>.lbl'),
        val = $this.attr('value');
    if(isProgrammaticTrigger && $li.hasClass('selected')) return;
    $parent.removeClass('open');
    $li.parent().children().removeClass('selected');
    $li.addClass('selected');
    $label.html($this.contents().clone());
    var chant = $parent.attr('name');
    if(chant === 'weekday') {
      if(!isProgrammaticTrigger) setPsalms(parseInt(val), choices.season == 'paschal');
    } else {
      choices[chant] = val;
      if(chant=='season') {
        if(!isProgrammaticTrigger) setPsalms(undefined, val == 'paschal');
      } else {
        loadChant(chant,val,this.id);
      }
    }
  });
  $('#marian-antiphon-choices select[name=marian-antiphon],#marian-antiphon-solemn').change(function(){
    var $select = $('#marian-antiphon-choices select[name=marian-antiphon]');
    var solemn = $('#marian-antiphon-solemn').prop('checked');
    var chant = 'marian-antiphon';
    var val = $select.val();
    var id = $select.find('option[value='+val+']').prop('id');
    if(solemn) {
      val += '-solemn';
      id += '-solemn';
    }
    choices[chant] = val;
    loadChant(chant, val, id);
  });
  var $date = $('#date');
  $date.change(function(){
    // localStorage.region is a code ('US'); the calendar's regions are names ('United States')
    if(this.value) setDate(moment(this.value), calendar.roman.regionCodeMap[localStorage.region] || '');
  });
  // The rubrics the office follows: 1960's, or Divino Afflatu's, as before 1955 (calendar.js).  The date is
  // shown once their calendar is loaded.
  var $rubrics = $('#selectRubrics');
  if(!$rubrics.children('[value="' + localStorage.rubrics + '"]').length) localStorage.rubrics = '1960';
  var showDate = function() { $date.change(); };
  calendar.setRubrics(localStorage.rubrics, showDate);
  $rubrics.val(localStorage.rubrics).change(function(){
    localStorage.rubrics = $(this).val();
    calendar.setRubrics(localStorage.rubrics, showDate);
  });
  $('#selectFeastDay').change(function(){
    setDate(moment($date.val()), this.value);
  });
  // Loaded last, so that every <chant-gabc> already has its plain-text attribute when it is first
  // drawn, and none is laid out as chant only to be redrawn as text.  (The dist build bundles it.)
  // The chants don't wait for the translation: those drawn before it loads are drawn again.
  require(['chant-element']);
  textMode.load(translatePage);
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('./sw.js').then(function(registration) {
  //     // Registration was successful
  //     // console.log('ServiceWorker registration successful with scope: ', registration.scope);
  //   }).catch(function(err) {
  //     // registration failed :(
  //     console.log('ServiceWorker registration failed: ', err);
  //   });
  // }    
});

define("compline", function(){});

}());