(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9424:function(e,t,a){Promise.resolve().then(a.bind(a,3656))},3656:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return w}});var n=a(7437),i=a(2265),l=a(5236),r=a(9842);let s=(0,l.ZF)({apiKey:"AIzaSyDjElxN6FHyseNsV6kKKaqoaz1eT5__BX0",authDomain:"hspantryapp-f9dd8.firebaseapp.com",projectId:"hspantryapp-f9dd8",storageBucket:"hspantryapp-f9dd8.appspot.com",messagingSenderId:"676844597829",appId:"1:676844597829:web:42995772b89b71afafe92c"}),o=(0,r.ad)(s);var c=a(1326),d=a(1845),h=a(511),p=a(335),u=a(6548),f=a(5343),x=a(8700),y=a(7630),j=a(8044),m=a(2196);let g={display:"flex",flexDirection:"column",justifyContent:"space-between",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4};function w(){let[e,t]=(0,i.useState)([]),[a,l]=(0,i.useState)(!1),[s,w]=(0,i.useState)(!1),Z=()=>l(!1),[b,C]=(0,i.useState)(""),[v,k]=(0,i.useState)(null),A=(0,i.useRef)(null),D=async()=>{let e=(0,r.IO)((0,r.hJ)(o,"pantry")),a=await (0,r.PL)(e),n=[];a.forEach(e=>{n.push({name:e.id,...e.data()})}),console.log(n),t(n)};(0,i.useEffect)(()=>{D()},[]);let I=async e=>{let t=(0,r.JU)((0,r.hJ)(o,"pantry"),e),a=await (0,r.QT)(t);if(a.exists()){let{quantity:e}=a.data();await (0,r.pl)(t,{quantity:e+1})}else await (0,r.pl)(t,{quantity:1});await D()},S=async e=>{let t=(0,r.JU)((0,r.hJ)(o,"pantry"),e),a=await (0,r.QT)(t);if(a.exists()){let{quantity:e}=a.data();e>1?await (0,r.pl)(t,{quantity:e-1}):await (0,r.oe)(t),console.log("Item deleted successfully")}await D()},T=async e=>{await S(e)},[E,O]=(0,i.useState)(""),P=e.filter(e=>e.name.toLowerCase().includes(E.toLowerCase())),_=async e=>{let t=new FormData;t.append("image",function(e){let t=atob(e.split(",")[1]),a=e.split(",")[0].split(":")[1].split(";")[0],n=new ArrayBuffer(t.length),i=new Uint8Array(n);for(let e=0;e<t.length;e++)i[e]=t.charCodeAt(e);return new Blob([n],{type:a})}(e),"image.jpg");try{let e=await fetch("http://localhost:5000/api/analyze-image",{method:"POST",body:t,mode:"cors",credentials:"omit",headers:{Accept:"application/json"}});if(!e.ok)throw Error("HTTP error! status: ".concat(e.status));return(await e.json()).result}catch(e){return console.error("Error:",e),null}},N=async()=>{if(v){let e=await _(v);e&&(I(e),k(null))}};return(0,n.jsxs)(c.Z,{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:2,children:[(0,n.jsx)(d.Z,{id:"outlined-basic",label:"Search",variant:"outlined",value:E,onChange:e=>{O(e.target.value)}}),(0,n.jsxs)(c.Z,{children:[(0,n.jsxs)(c.Z,{display:"flex",alignItems:"center",justifyContent:"center",children:[(0,n.jsx)(h.Z,{variant:"h6",children:"Take a picture of the item"}),(0,n.jsx)(p.Z,{onClick:()=>w(!0),children:(0,n.jsx)(j.Z,{})})]}),s&&(0,n.jsxs)(c.Z,{display:"flex",alignItems:"center",justifyContent:"center",children:[(0,n.jsx)(m.V,{ref:A}),(0,n.jsx)(u.Z,{onClick:()=>{k(A.current.takePhoto()),w(!1)},variant:"contained",children:"Take Photo"})]}),v&&(0,n.jsx)("img",{src:v,alt:"Taken photo"})]}),(0,n.jsx)(u.Z,{onClick:N,variant:"contained",children:"ADD FROM PHOTO"}),(0,n.jsx)(u.Z,{onClick:()=>l(!0),variant:"contained",children:"ADD MANUALLY"}),(0,n.jsx)(f.Z,{open:a,onClose:Z,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,n.jsxs)(c.Z,{sx:g,children:[(0,n.jsx)(h.Z,{id:"modal-modal-title",variant:"h6",component:"h2",display:"flex",justifyContent:"center",children:"ADD ITEM"}),(0,n.jsxs)(c.Z,{display:"flex",alignItems:"center",justifyContent:"space-around",children:[(0,n.jsx)(d.Z,{id:"outlined-basic",label:"Outlined",variant:"outlined",value:b,onChange:e=>C(e.target.value)}),(0,n.jsx)(u.Z,{variant:"outlined",onClick:()=>{I(b),C(""),Z()},children:" ADD "})]})]})}),(0,n.jsxs)(c.Z,{border:"1px black solid",children:[(0,n.jsx)(c.Z,{bgcolor:"#ADD8E6",width:"800px",display:"flex",alignItems:"center",justifyContent:"center",children:(0,n.jsx)(h.Z,{textAlign:"center",variant:"h4",color:"#333",children:"Pantry Items"})}),(0,n.jsx)(x.Z,{width:"800px",height:"300px",spacing:2,overflow:"scroll",children:P.length>0?P.map(e=>{let{name:t,quantity:a}=e;return(0,n.jsxs)(c.Z,{width:"100%",height:"100px",display:"flex",justifyContent:"space-around",alignItems:"center",bgcolor:"#f5f5f5",children:[(0,n.jsx)(h.Z,{variant:"h5",color:"#333",children:t.charAt(0).toUpperCase()+t.slice(1)}),(0,n.jsxs)(h.Z,{variant:"h5",color:"#333",children:["Quantity : ",a]}),(0,n.jsx)(p.Z,{onClick:()=>T(t),children:(0,n.jsx)(y.Z,{})})]},t)}):e.map(e=>{let{name:t,quantity:a}=e;return(0,n.jsxs)(c.Z,{width:"100%",height:"100px",display:"flex",justifyContent:"space-around",alignItems:"center",bgcolor:"#f5f5f5",children:[(0,n.jsx)(h.Z,{variant:"h5",color:"#333",children:t.charAt(0).toUpperCase()+t.slice(1)}),(0,n.jsxs)(h.Z,{variant:"h5",color:"#333",children:["Quantity : ",a]}),(0,n.jsx)(p.Z,{onClick:()=>T(t),children:(0,n.jsx)(y.Z,{})})]},t)})})]})]})}}},function(e){e.O(0,[358,865,971,23,744],function(){return e(e.s=9424)}),_N_E=e.O()}]);