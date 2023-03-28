"use strict";(self.webpackChunksistema_web=self.webpackChunksistema_web||[]).push([[631,318],{4879:function(n,e,t){t.r(e),t.d(e,{default:function(){return _}});var i=t(1413),r=t(9439),a=t(8870),s=t(3767),o=t(1889),c=t(9836),l=t(6890),u=t(5855),d=t(3994),x=t(3382),m=t(2791),h=t(4092),Z=t(9969),p=t(8793),j=t(5760),g=t(6249),E=t(3943),N=t(6206),C=t(589),f=t(1976),O=t(7535),b=t(2480),v=t(4634),M=t(184),B={rowsPerPage:10,page:0,count:0},P={NOMBRE_MENU:null,NOMBRE_ICON:null,PATH:null,ESTADO:!0},R={NOMBRE_MENU:null,PATH:null,ESTADO:!0},I=[{label:"Activo",value:!0},{label:"Inactivo",value:!1}];function _(){var n=(0,m.useState)([]),e=(0,r.Z)(n,2),t=e[0],_=e[1],T=(0,m.useState)(!1),y=(0,r.Z)(T,2),A=y[0],k=y[1],S=(0,N.Q)(P,!0),U=S.data,w=S.setData,D=S.errors,V=S.handleInputFormChange,H=S.resetForm,W=(0,E.c)(R),F=(0,r.Z)(W,3),q=F[0],L=F[1],G=F[2],K=(0,m.useState)(B),Q=(0,r.Z)(K,2),z=Q[0],J=Q[1],X=(0,C.Z)(),Y=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;X(!0),(0,g.a)({path:Z.li,body:q,fnRequest:f.L5,pagination:!0,rowsPerPage:n,page:e,success:function(n){X(!1);var e=n.rowsPerPage,t=n.count,i=n.page;--i,_(n.data),J({rowsPerPage:e,count:t,page:i})},error:function(n){X(!1),(0,v.V)({message:n.statusText,type:"error",seg:10})}})};return(0,m.useEffect)((function(){Y()}),[]),(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(a.Z,{children:[(0,M.jsxs)(s.Z,{direction:"row",spacing:3,children:[(0,M.jsx)(p.Z.Title,{variant:"h1",component:"h1",title:"P\xe1ginas"}),(0,M.jsx)(p.Z.ButtonComponent,{variant:"primary-small",type:"admin",title:"Nueva P\xe1gina",onClick:function(){return k(!0)}})]}),(0,M.jsx)("br",{}),(0,M.jsxs)(a.Z,{children:[(0,M.jsx)(p.Z.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,M.jsx)("br",{}),(0,M.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,M.jsx)(o.ZP,{item:!0,xs:3,children:(0,M.jsx)(p.Z.InputComponent,{label:"Nombre de la P\xe1gina",name:"NOMBRE_MENU",onChange:L,value:q.NOMBRE_MENU})}),(0,M.jsx)(o.ZP,{item:!0,xs:3,children:(0,M.jsx)(p.Z.InputComponent,{label:"Ruta",name:"PATH",onChange:L,value:q.PATH})}),(0,M.jsx)(o.ZP,{item:!0,xs:3,children:(0,M.jsx)(p.Z.SelectComponent,{label:"Estado",list:I,name:"ESTADO",onChange:L,value:q.ESTADO})})]}),(0,M.jsx)("br",{}),(0,M.jsx)(h.Z,{resetForm:G,filterForm:Y})]}),(0,M.jsx)("br",{}),(0,M.jsx)(p.Z.TableComponents,{pagination:z,setPagination:J,fnPagination:Y,children:(0,M.jsxs)(c.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,M.jsx)(l.Z,{children:(0,M.jsxs)(u.Z,{children:[(0,M.jsx)(d.Z,{children:"Nombre"}),(0,M.jsx)(d.Z,{children:"Ruta"}),(0,M.jsx)(d.Z,{children:"Icon"}),(0,M.jsx)(d.Z,{children:"Operaci\xf3n"})]})}),(0,M.jsx)(x.Z,{children:t.length>0?t.map((function(n,e){return(0,M.jsxs)(u.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:[(0,M.jsx)(d.Z,{children:n.NOMBRE_MENU}),(0,M.jsx)(d.Z,{children:n.PATH}),(0,M.jsx)(d.Z,{children:n.NOMBRE_ICON}),(0,M.jsx)(d.Z,{children:(0,M.jsxs)(s.Z,{direction:"row",spacing:1,children:[(0,M.jsx)(p.Z.ButtonIconComponent,{title:"Editar",icon:j.W.EDIT,onClick:function(){return function(n){k(!0),w(n)}(n)}}),(0,M.jsx)(p.Z.ButtonIconComponent,{title:"Eliminar",icon:j.W.DELETE,onClick:function(){return e=n._id,void(0,b.k)((function(){(0,g.a)({path:"".concat(Z.i5,"/").concat(e),body:{},fnRequest:f.RD,success:function(n){(0,b.Q)({title:"\xa1Eliminado!",text:n.statusText,icon:"success"}),Y()},error:function(n){(0,v.V)({message:n.statusText,type:"error",seg:10})}})}),{config:{title:"\xbfEst\xe1s seguro?",text:"Al eliminar la p\xe1gina, no habr\xe1 vuelta atr\xe1s!",icon:"warning"}});var e}})]})})]},e)})):(0,M.jsx)(u.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,M.jsx)(d.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})})]}),(0,M.jsx)(p.Z.Modal,{open:A,setOpen:k,title:U._id?"Editar P\xe1gina":"Agregar Nueva P\xe1gina",fullWidth:!0,resetForm:H,maxWidth:"sm",children:(0,M.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,M.jsx)(o.ZP,{item:!0,xs:12,children:(0,M.jsx)(p.Z.InputComponent,{label:"Nombre de la p\xe1gina",name:"NOMBRE_MENU",value:U.NOMBRE_MENU,onChange:V,error:D.NOMBRE_MENU})}),(0,M.jsx)(o.ZP,{item:!0,xs:12,children:(0,M.jsx)(p.Z.InputComponent,{label:"Nombre del icono",name:"NOMBRE_ICON",value:U.NOMBRE_ICON,onChange:V,error:D.NOMBRE_ICON})}),(0,M.jsx)(o.ZP,{item:!0,xs:12,children:(0,M.jsx)(p.Z.InputComponent,{label:"Ruta Base",name:"PATH",value:U.PATH,onChange:V,error:D.PATH})}),(0,M.jsx)(o.ZP,{item:!0,xs:12,children:(0,M.jsx)(p.Z.SelectComponent,{label:"Estado",name:"ESTADO",value:U.ESTADO,list:I,onChange:V,error:D.ESTADO})}),(0,M.jsx)(o.ZP,{item:!0,xs:12,children:(0,M.jsxs)(s.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,M.jsx)(p.Z.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:j.W.BACK,onClick:function(){return k(!1)}}),(0,M.jsx)(p.Z.ButtonComponent,{title:U._id?"Editar":"Guardar",variant:"primary-normal",type:"admin",icon:j.W.SAVE,onClick:function(){return console.log(D),X(!0),U._id,void(0,g.a)({path:Z.B3.CONFIGURACION.MENU.NEW,body:(0,i.Z)({},U),fnRequest:O.yA,success:function(n){Y(),(0,v.V)({message:n.statusText,type:"success",seg:10}),k(!1),X(!1)},error:function(n){X(!1),(0,v.V)({message:n.statusText,type:"error",seg:10})}})}})]})})]})})]})}},7631:function(n,e,t){t.r(e),t.d(e,{default:function(){return M}});var i=t(9439),r=t(1413),a=t(2791),s=t(8870),o=t(3767),c=t(1889),l=t(9836),u=t(6890),d=t(5855),x=t(3994),m=t(3382),h=t(8793),Z=t(6871),p=t(5760),j=t(6206),g=t(6249),E=t(1976),N=t(9969),C=t(4634),f=(t(4879),t(2480)),O=t(589),b=t(184),v={NOMBRE_MENU:"",NOMBRE_ICON:""};function M(){var n=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,e=(0,r.Z)({},T);if("NOMBRE_MENU"in n&&(e.NOMBRE_MENU=""===n.NOMBRE_MENU?"El campo Nombre de la P\xe1gina es requerido":""),"NOMBRE_ICON"in n&&(e.NOMBRE_ICON=""===n.NOMBRE_ICON?"El campo Nombre del Icono es requerido":""),y((0,r.Z)({},e)),n===I)return Object.values(e).every((function(n){return""===n}))},e=(0,Z.s0)(),t=(0,a.useState)(!1),M=(0,i.Z)(t,2),B=(M[0],M[1]),P=(0,Z.UO)().id,R=(0,j.Q)(v,n),I=R.data,_=R.setData,T=R.errors,y=R.setErrors,A=R.handleInputFormChange,k=(0,a.useState)(null),S=(0,i.Z)(k,2),U=(S[0],S[1]),w=(0,a.useState)([]),D=(0,i.Z)(w,2),V=D[0],H=D[1],W=(0,O.Z)(),F=(0,a.useCallback)((function(){(0,g.a)({path:"".concat(N.sp).concat(P),body:{},fnRequest:E.AE,success:function(n){_(n.data.menu),H(n.data.submenu)},error:function(n){e("/administrador/paginas/admin"),(0,C.V)({message:n.statusText,type:"error",seg:10})}})}),[P,e,_]);return(0,a.useEffect)((function(){P&&F()}),[P]),(0,b.jsxs)(s.Z,{children:[(0,b.jsx)(o.Z,{direction:"row",spacing:3,children:(0,b.jsx)(h.Z.Title,{variant:"h1",component:"h1",title:"P\xe1ginas"})}),(0,b.jsx)("br",{}),(0,b.jsxs)(c.ZP,{container:!0,spacing:3,children:[(0,b.jsx)(c.ZP,{item:!0,xs:12,sm:12,md:6,lg:6,xl:6,xxl:6,children:(0,b.jsx)(h.Z.Card,{title:P?"Editar P\xe1gina":"Nueva P\xe1gina",children:(0,b.jsxs)(c.ZP,{container:!0,spacing:3,children:[(0,b.jsx)(c.ZP,{item:!0,xs:12,children:(0,b.jsx)(h.Z.InputComponent,{label:"Nombre de la p\xe1gina",name:"NOMBRE_MENU",value:I.NOMBRE_MENU,onChange:A,error:T.NOMBRE_MENU})}),(0,b.jsx)(c.ZP,{item:!0,xs:12,children:(0,b.jsx)(h.Z.InputComponent,{label:"Nombre del icono",name:"NOMBRE_ICON",value:I.NOMBRE_ICON,onChange:A,error:T.NOMBRE_ICON})})]})})}),(0,b.jsxs)(c.ZP,{item:!0,xs:12,sm:12,md:6,lg:6,xl:6,xxl:6,children:[(0,b.jsxs)(o.Z,{direction:"row",spacing:3,children:[(0,b.jsx)(h.Z.TextComponent,{variant:"text1",component:"span",children:"Sub P\xe1gina"}),(0,b.jsx)(h.Z.ButtonComponent,{variant:"primary-small",type:"admin",title:"Nueva Sub P\xe1gina",onClick:function(){return B(!0)}})]}),(0,b.jsx)("br",{}),(0,b.jsx)(h.Z.TableComponents,{children:(0,b.jsxs)(l.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,b.jsx)(u.Z,{children:(0,b.jsxs)(d.Z,{children:[(0,b.jsx)(x.Z,{children:"Nombre"}),(0,b.jsx)(x.Z,{children:"Ruta"}),(0,b.jsx)(x.Z,{children:"Icono"}),(0,b.jsx)(x.Z,{children:"Operaci\xf3n"})]})}),(0,b.jsx)(m.Z,{children:V.length>0?V.map((function(n,e){return(0,b.jsxs)(d.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:[(0,b.jsx)(x.Z,{children:n.NOMBRE_SUBMENU}),(0,b.jsx)(x.Z,{children:n.NOMBRE_ICON}),(0,b.jsx)(x.Z,{children:n.PATH}),(0,b.jsx)(x.Z,{children:(0,b.jsxs)(o.Z,{direction:"row",spacing:1,children:[(0,b.jsx)(h.Z.ButtonIconComponent,{title:"Editar",icon:p.W.EDIT,onClick:function(){return function(n){U((0,r.Z)({},n)),B(!0)}(n)}}),(0,b.jsx)(h.Z.ButtonIconComponent,{title:"Eliminar",icon:p.W.DELETE,onClick:function(){return function(n){(0,f.k)((function(){var e=V.filter((function(e){return e.id?e.id!==n:e._id!==n}));H(e)}),{config:{title:"\xbfEst\xe1s seguro?",text:"Al eliminar la p\xe1gina, no habr\xe1 vuelta atr\xe1s!",icon:"warning"}})}(n.id||n._id)}})]})})]},e)})):(0,b.jsx)(d.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,b.jsx)(x.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})})]})]}),(0,b.jsx)("br",{}),(0,b.jsxs)(o.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,b.jsx)(h.Z.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:p.W.BACK,onClick:function(){return e("/administrador/paginas/admin")}}),(0,b.jsx)(h.Z.ButtonComponent,{title:P?"Actualizar":"Guardar",variant:"primary-normal",type:"admin",icon:p.W.SAVE,onClick:function(){n()&&(W(!0),(0,g.a)({path:N.oK,body:(0,r.Z)((0,r.Z)({},I),{},{SUBMENUS:V}),fnRequest:E.Mz,success:function(n){W(!1),e("/administrador/paginas/admin"),(0,C.V)({message:n.statusText,type:"success",seg:10})},error:function(n){(0,C.V)({message:n.statusText,type:"error",seg:10})}}))}})]})]})}}}]);
//# sourceMappingURL=631.8ae250e2.chunk.js.map