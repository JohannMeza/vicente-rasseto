"use strict";(self.webpackChunksistema_web=self.webpackChunksistema_web||[]).push([[149],{4149:function(e,n,t){t.r(n),t.d(n,{default:function(){return O}});var r=t(1413),i=t(9439),s=t(8870),a=t(3767),o=t(1889),c=t(9836),l=t(6890),u=t(5855),d=t(3994),x=t(3382),h=t(2791),g=t(6871),m=t(8012),p=t(9412),Z=t(5760),f=t(9969),j=t(589),N=t(4634),E=t(6249),P=t(7535),C=t(2480),A=t(3943),S=t(4092),v=t(184),B=[{field:"NOMBRE_SUBMENU",headerName:"Nombre",width:180},{field:"NOMBRE_ICON",headerName:"Icono",width:180},{field:"PATH",headerName:"Ruta",width:180}],U={rowsPerPage:5,page:1,count:0},b={NOMBRE_SUBMENU:null,PATH:null,ESTADO:!0},I={NOMBRE_SUBMENU:null,PATH:null},M={rowsPerPage:10,page:0,count:0},R=[{label:"Activo",value:!0},{label:"Inactivo",value:!1}];function O(){var e=(0,g.s0)(),n=(0,h.useState)(!1),t=(0,i.Z)(n,2),O=t[0],T=t[1],w=(0,h.useState)(!1),y=(0,i.Z)(w,2),_=y[0],H=y[1],k=(0,h.useState)([]),D=(0,i.Z)(k,2),F=D[0],G=D[1],V=(0,h.useState)(U),W=(0,i.Z)(V,2),q=W[0],L=W[1],z=(0,h.useState)(M),K=(0,i.Z)(z,2),X=K[0],J=K[1],Q=(0,j.Z)(),Y=(0,h.useState)([]),$=(0,i.Z)(Y,2),ee=$[0],ne=$[1],te=(0,h.useState)([]),re=(0,i.Z)(te,2),ie=re[0],se=re[1],ae=(0,h.useState)([]),oe=(0,i.Z)(ae,2),ce=oe[0],le=oe[1],ue=(0,h.useState)(null),de=(0,i.Z)(ue,2),xe=de[0],he=de[1],ge=(0,g.UO)().id,me=(0,A.c)(b),pe=(0,i.Z)(me,3),Ze=pe[0],fe=pe[1],je=pe[2],Ne=(0,A.c)(I),Ee=(0,i.Z)(Ne,3),Pe=Ee[0],Ce=Ee[1],Ae=Ee[2],Se=function(){T(!1),L(U)},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;Q(!0),H(!0),(0,E.a)({path:f.B3.CONFIGURACION.SUBMENU.INDEX,body:Ze,fnRequest:P.yA,pagination:!0,rowsPerPage:e,page:n,success:function(e){var n=e.data.map((function(e){return(0,r.Z)((0,r.Z)({},e),{},{id:e._id})})),t=e.rowsPerPage,i=e.count,s=e.page;G(n),L({rowsPerPage:t,count:i,page:s}),Q(!1),H(!1)},error:function(e){console.log(e),(0,N.V)({message:e.statusText,type:"error",seg:10})}})};return(0,h.useEffect)((function(){O&&ve()}),[O]),(0,h.useEffect)((function(){Q(!0),(0,E.a)({path:f.B3.CONFIG_MENU.SEARCH_SUBPAGINAS+ge,body:Ze,fnRequest:P.yA,success:function(e){var n,t=null===(n=e.data)||void 0===n?void 0:n.ID_CONFIGURACION_SUBMENU;he(e.data.PATH),se(t),le(t),ne(Array.from(t,(function(e){return e._id}))),J({rowsPerPage:10,count:t.length,page:0}),Q(!1)},error:function(e){Q(!1),(0,N.V)({message:e.statusText,type:"error",seg:10})}})}),[]),(0,v.jsxs)(s.Z,{sx:{width:"100%"},children:[(0,v.jsx)(a.Z,{direction:"row",spacing:3,children:(0,v.jsx)(p.Z.Title,{variant:"h1",component:"h1",title:"Configuraci\xf3n"})}),(0,v.jsx)("br",{}),(0,v.jsxs)(s.Z,{children:[(0,v.jsx)(p.Z.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,v.jsx)("br",{}),(0,v.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(p.Z.InputComponent,{label:"Nombre",name:"NOMBRE_SUBMENU",value:Pe.NOMBRE_SUBMENU,onChange:Ce})}),(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(p.Z.InputComponent,{label:"Ruta",name:"PATH",value:Pe.PATH,onChange:Ce})})]}),(0,v.jsx)("br",{}),(0,v.jsx)(S.Z,{resetForm:function(){return Ae()},filterForm:function(){return function(){var e=Pe.PATH,n=Pe.NOMBRE_SUBMENU;e=new RegExp(e||"","ig"),n=new RegExp(n||"","ig");var t=ie.filter((function(t){return t.PATH.match(e)&&t.NOMBRE_SUBMENU.match(n)}));le(t)}()}})]}),(0,v.jsx)("br",{}),(0,v.jsx)(p.Z.TableComponents,{pagination:X,setPagination:J,children:(0,v.jsxs)(c.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,v.jsx)(l.Z,{children:(0,v.jsxs)(u.Z,{children:[(0,v.jsx)(d.Z,{children:"Nombre"}),(0,v.jsx)(d.Z,{children:"Ruta"}),(0,v.jsx)(d.Z,{children:"Ruta Final"}),(0,v.jsx)(d.Z,{children:"Icon"}),(0,v.jsx)(d.Z,{children:(0,v.jsx)(p.Z.ButtonComponent,{title:"AGREGAR",variant:"primary-small",type:"admin",onClick:function(){return T(!0)}})})]})}),(0,v.jsx)(x.Z,{children:(null===ce||void 0===ce?void 0:ce.length)>0?ce.slice(X.page*X.rowsPerPage,X.page*X.rowsPerPage+X.rowsPerPage).map((function(e,n){return(0,v.jsxs)(u.Z,{children:[(0,v.jsx)(d.Z,{children:e.NOMBRE_SUBMENU}),(0,v.jsx)(d.Z,{children:e.PATH}),(0,v.jsx)(d.Z,{children:xe+e.PATH}),(0,v.jsx)(d.Z,{children:e.NOMBRE_ICON}),(0,v.jsx)(d.Z,{children:(0,v.jsx)(a.Z,{direction:"row",spacing:1,children:(0,v.jsx)(p.Z.ButtonIconComponent,{title:"Eliminar",icon:Z.W.DELETE,onClick:function(){return function(e){(0,C.k)((function(){var n=ie.filter((function(n){return n.id?n.id!==e:n._id!==e})),t=ce.filter((function(n){return n.id?n.id!==e:n._id!==e})),i=ee.filter((function(n){return n!==e}));se(n),le(t),ne(i),J((0,r.Z)((0,r.Z)({},X),{},{rowsPerPage:10,count:n.length}))}),{config:{title:"\xbfEst\xe1s seguro?",text:"\xa1Al eliminar la p\xe1gina, no habr\xe1 vuelta atr\xe1s!",icon:"warning"}})}(e.id||e._id)}})})})]},n)})):(0,v.jsx)(u.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,v.jsx)(d.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})}),(0,v.jsx)("br",{}),(0,v.jsxs)(a.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,v.jsx)(p.Z.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:Z.W.BACK,onClick:function(){return e(m.v.ADMINISTRACION.PAGINAS.ADMIN)}}),(0,v.jsx)(p.Z.ButtonComponent,{title:"Guardar",variant:"primary-normal",type:"admin",icon:Z.W.SAVE,onClick:function(){return Q(!0),void(0,E.a)({path:f.B3.CONFIGURACION.MENU.UPDATE_SUBMENUS+ge,body:{arrSubmenus:ee},fnRequest:P.LE,success:function(n){e(m.v.ADMINISTRACION.PAGINAS.ADMIN),Q(!1),(0,N.V)({message:n.statusText,type:"success",seg:10})},error:function(e){(0,N.V)({message:e.statusText,type:"error",seg:10}),Q(!1)}})}})]}),(0,v.jsxs)(p.Z.Modal,{open:O,setOpen:T,title:"Agregar Sub P\xe1ginas",fullWidth:!0,maxWidth:"md",children:[(0,v.jsxs)(s.Z,{children:[(0,v.jsx)(p.Z.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,v.jsx)("br",{}),(0,v.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(p.Z.InputComponent,{label:"Nombre",name:"NOMBRE_SUBMENU",value:Ze.NOMBRE_SUBMENU,onChange:fe})}),(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(p.Z.InputComponent,{label:"Ruta",name:"PATH",value:Ze.PATH,onChange:fe})}),(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(p.Z.SelectComponent,{label:"Estado",name:"ESTADO",list:R,value:Ze.ESTADO,onChange:fe})})]}),(0,v.jsx)("br",{}),(0,v.jsx)(S.Z,{resetForm:function(){return je()},filterForm:function(){return ve()}})]}),(0,v.jsx)("br",{}),(0,v.jsx)("div",{style:{height:400,width:"100%"},children:(0,v.jsx)(p.Z.TableSelectionComponent,{rows:F,columns:B,pageSize:q,setPageSize:L,loading:_,rowsPerPageOptions:[5,10,20],onSelectionModelChange:function(e){return ne(e)},fnPagination:ve,selectionModel:ee})}),(0,v.jsx)("br",{}),(0,v.jsxs)(a.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,v.jsx)(p.Z.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:Z.W.BACK,onClick:function(){return Se()}}),(0,v.jsx)(p.Z.ButtonComponent,{title:"Guardar",variant:"primary-normal",type:"admin",icon:Z.W.SAVE,onClick:function(){return Q(!0),void(0,E.a)({path:f.B3.CONFIGURACION.SUBMENU.SEARCH_MULTI_IDS,body:{arrIds:ee},fnRequest:P.yA,success:function(e){se(e.data),le(e.data),Q(!1),Se(),J({rowsPerPage:10,count:e.data.length,page:0}),(0,N.V)({message:e.statusText,type:"success",seg:10})},error:function(e){(0,N.V)({message:e.statusText,type:"error",seg:10}),Q(!1)}})}})]})]})]})}}}]);
//# sourceMappingURL=149.9f74039f.chunk.js.map