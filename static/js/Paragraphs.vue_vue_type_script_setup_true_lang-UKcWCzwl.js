import{d as l,f as u,o as a,c as o,F as f,D as x,E as g}from"./index-CCGrs3qy.js";const h=l({__name:"Paragraphs",props:{data:{}},setup(c,{expose:p}){const i=c,n=u();return p({getText:()=>{var t;return(t=n.value)==null?void 0:t.innerText},getTexts:()=>{const t=[],r=n.value;if(!r)return t;for(const s of r.childNodes.values()){const e=s.textContent;e&&e.trim().length>0&&t.push(e.trim())}return t}}),(t,r)=>(a(),o("div",{ref_key:"block",ref:n,class:"paragraphs"},[(a(!0),o(f,null,x(i.data.split(`
`),(s,e)=>(a(),o("p",{key:e},g(s),1))),128))],512))}});export{h as _};
