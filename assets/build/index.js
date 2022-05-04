!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.blocks,n=window.wp.i18n,o=window.wp.element,r=window.wp.blockEditor,s=window.wp.components,a=window.wp.compose,l=function(e){let{icon:t,size:n=24,...r}=e;return(0,o.cloneElement)(t,{width:n,height:n,...r})},c=window.wp.primitives,i=(0,o.createElement)(c.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,o.createElement)(c.Path,{d:"M16 4.2v1.5h2.5v12.5H16v1.5h4V4.2h-4zM4.2 19.8h4v-1.5H5.8V5.8h2.5V4.2h-4l-.1 15.6zm5.1-3.1l1.4.6 4-10-1.4-.6-4 10z"})),u=window.wp.data,d=window.wp.apiFetch,m=e.n(d),p=window.wp.shortcode;function h(e){let{setAttributes:t,attributes:a}=e;function l(e){const n=(o=a.text,r=e.index,s=e.index+e.content.length,l=(0,p.string)(e.shortcode),o.substring(0,r)+l+o.substring(s));var o,r,s,l;t({text:n})}function c(e,t,n){t.shortcode.set(n,e),l(t)}return(0,o.createElement)(r.InspectorControls,null,(0,o.createElement)(s.Panel,null,function(e){const t=[];return[...e.matchAll(/\[([^\/]\S[^\]|\s]*)(?=.*])/g)].map((e=>e[1])).map((n=>{t.push(function(e,t){const n=(0,p.next)(e,t),o=new RegExp(`\\[${e}([^\\]]+)?`,"gi"),r=[...n.content.matchAll(o)].map((e=>e[1]))[0];return void 0!==r&&(n.shortcode.attrs=function(e){let t,n={},o=[];const r=/([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/g;for(e=e.replace(/[\u00a0\u200b]/g," ");t=r.exec(e);)t[1]?n[t[1].toLowerCase()]=t[2]:t[3]?n[t[3].toLowerCase()]=t[4]:t[5]?n[t[5].toLowerCase()]=t[6]:t[7]?o.push(t[7]):t[8]&&o.push(t[8]);return{named:n,numeric:o}}(r)),n}(n,e))})),t}(a.text).map(((e,t)=>function(e,t){return(0,o.createElement)(s.PanelBody,{key:"panel_"+t,title:e.shortcode.tag.toUpperCase(),initialOpen:!1},(0,o.createElement)(o.Fragment,null,"{}"===JSON.stringify(e.shortcode.attrs.named)&&(0,o.createElement)(s.__experimentalText,{adjustLineHeightForInnerControls:!0},(0,n.__)("Shortcode has no attributes.")),Object.keys(e.shortcode.attrs.named).map(((n,r)=>(0,o.createElement)(s.TextControl,{label:n,key:t+"_"+n+"_"+r,value:e.shortcode.attrs.named[n],onChange:t=>c(t,e,n)}))),e.shortcode.attrs.numeric.map(((r,a)=>(0,o.createElement)(s.TextControl,{label:(0,n.__)("property")+" "+a,key:t+"_property_"+a,value:r,onChange:t=>c(t,e,a)}))),e.shortcode.content&&(0,o.createElement)(s.TextareaControl,{label:(0,n.__)("content"),value:e.shortcode.content,onChange:t=>function(e,t){t.shortcode.content=e,l(t)}(t,e)})))}(e,t)))))}function w(e){let{attributes:t,setAttributes:d}=e;const p=`blocks-shortcode-input-${(0,a.useInstanceId)(w)}`,[b,g]=(0,o.useState)(""),_=(0,u.useSelect)((e=>["\n\t\t\thtml,body,:root {\n\t\t\t\tmargin: 0 !important;\n\t\t\t\tpadding: 0 !important;\n\t\t\t\toverflow: visible !important;\n\t\t\t\tmin-height: auto !important;\n\t\t\t}\n\t\t",...(0,r.transformStyles)(e(r.store).getSettings().styles)]),[]);return(0,o.useEffect)((()=>{m()({path:`/better-shortcode-block/render-shortcode?shortcode=${encodeURIComponent(t.text)}`}).then((e=>{e.success&&g(e.rendered)}))}),[t.text]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.View,(0,r.useBlockProps)({className:"block-library-shortcode__edit"}),(0,o.createElement)(r.BlockControls,null,(0,o.createElement)(s.ToolbarGroup,null,(0,o.createElement)(s.ToolbarButton,{className:"components-tab-button",isPressed:!t.preview,onClick:function(){d({preview:!1})}},(0,n.__)("Shortcode")),(0,o.createElement)(s.ToolbarButton,{className:"components-tab-button",isPressed:t.preview,onClick:function(){d({preview:!0})}},(0,n.__)("Preview")))),t.preview?(0,o.createElement)(o.Fragment,null,(0,o.createElement)(s.SandBox,{html:b,styles:_}),(0,o.createElement)("div",{style:{position:"absolute",top:"0",right:"0",bottom:"0",left:"0"}})):(0,o.createElement)("div",{className:"components-placeholder",style:{minHeight:"auto"}},(0,o.createElement)("label",{htmlFor:p,className:"components-placeholder__label"},(0,o.createElement)(l,{icon:i}),(0,n.__)("Shortcode")),(0,o.createElement)(r.PlainText,{className:"blocks-shortcode__textarea",id:p,value:t.text,"aria-label":(0,n.__)("Shortcode text"),placeholder:(0,n.__)("Write shortcode here…"),onChange:e=>d({text:e})}))),(0,o.createElement)(h,{setAttributes:d,attributes:t}))}function b(e){let{attributes:t}=e;return(0,o.createElement)(o.RawHTML,null,t.text)}wp.domReady((()=>{wp.blocks.unregisterBlockType("core/shortcode"),(0,t.registerBlockType)("core/shortcode",{title:(0,n.__)("Shortcode"),category:"widgets",icon:"shortcode",attributes:{text:{type:"string"},preview:{type:"boolean",default:!1}},edit:w,save:b})}))}();