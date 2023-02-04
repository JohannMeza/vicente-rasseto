"use strict";(self.webpackChunksistema_web=self.webpackChunksistema_web||[]).push([[401,149],{9401:function(e,n,t){t.r(n);var a=t(2791),r=t(6871),i=t(3329),s=t(4149),o=(t(7631),t(184)),l=function(){return(0,o.jsxs)(r.Z5,{children:[(0,o.jsx)(r.AW,{path:"/admin",element:(0,o.jsx)(i.default,{})}),(0,o.jsx)(r.AW,{path:"/configuracion/:id",element:(0,o.jsx)(s.default,{})})]})};n.default=(0,a.memo)(l)},4149:function(e,n,t){t.r(n),t.d(n,{default:function(){return A}});var a=t(1413),r=t(9439),i=t(8870),s=t(3767),o=t(1889),l=t(9836),u=t(6890),c=t(5855),d=t(3994),x=t(3382),f=t(2791),h=t(6871),m=t(8012),g=t(4673),p=t(5760),j=t(9969),N=t(589),E=t(6915),C=t(6249),Z=t(7535),S=t(2480),O=t(3943),M=t(4092),v=t(184),I=[{field:"NOMBRE_SUBMENU",headerName:"Nombre",width:180},{field:"NOMBRE_ICON",headerName:"Icono",width:180},{field:"PATH",headerName:"Ruta",width:180}],P={rowsPerPage:5,page:1,count:0},R={NOMBRE_SUBMENU:null,PATH:null,ESTADO:!0},b={NOMBRE_SUBMENU:null,PATH:null},U={rowsPerPage:10,page:0,count:0},B=[{label:"Activo",value:!0},{label:"Inactivo",value:!1}];function A(){var e=(0,h.s0)(),n=(0,f.useState)(!1),t=(0,r.Z)(n,2),A=t[0],_=t[1],T=(0,f.useState)(!1),y=(0,r.Z)(T,2),w=y[0],k=y[1],D=(0,f.useState)([]),F=(0,r.Z)(D,2),H=F[0],q=F[1],G=(0,f.useState)(P),V=(0,r.Z)(G,2),L=V[0],W=V[1],z=(0,f.useState)(U),K=(0,r.Z)(z,2),X=K[0],J=K[1],Q=(0,N.default)(),Y=(0,f.useState)([]),$=(0,r.Z)(Y,2),ee=$[0],ne=$[1],te=(0,f.useState)([]),ae=(0,r.Z)(te,2),re=ae[0],ie=ae[1],se=(0,f.useState)([]),oe=(0,r.Z)(se,2),le=oe[0],ue=oe[1],ce=(0,f.useState)(null),de=(0,r.Z)(ce,2),xe=de[0],fe=de[1],he=(0,h.UO)().id,me=(0,O.useForm)(R),ge=(0,r.Z)(me,3),pe=ge[0],je=ge[1],Ne=ge[2],Ee=(0,O.useForm)(b),Ce=(0,r.Z)(Ee,3),Ze=Ce[0],Se=Ce[1],Oe=Ce[2],Me=function(){_(!1),W(P)},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;Q(!0),k(!0),(0,C.SaveRequestData)({path:j.pathServer.CONFIGURACION.SUBMENU.INDEX,body:pe,fnRequest:Z.SERVICES_POST,pagination:!0,rowsPerPage:e,page:n,success:function(e){var n=e.data.map((function(e){return(0,a.Z)((0,a.Z)({},e),{},{id:e._id})})),t=e.rowsPerPage,r=e.count,i=e.page;q(n),W({rowsPerPage:t,count:r,page:i}),Q(!1),k(!1)},error:function(e){console.log(e),(0,E.MessageUtil)({message:e.statusText,type:"error",seg:10})}})};return(0,f.useEffect)((function(){A&&ve()}),[A]),(0,f.useEffect)((function(){Q(!0),(0,C.SaveRequestData)({path:j.pathServer.CONFIG_MENU.SEARCH_SUBPAGINAS+he,body:pe,fnRequest:Z.SERVICES_POST,success:function(e){var n,t=null===(n=e.data)||void 0===n?void 0:n.ID_CONFIGURACION_SUBMENU;fe(e.data.PATH),ie(t),ue(t),ne(Array.from(t,(function(e){return e._id}))),J({rowsPerPage:10,count:t.length,page:0}),Q(!1)},error:function(e){Q(!1),(0,E.MessageUtil)({message:e.statusText,type:"error",seg:10})}})}),[]),(0,v.jsxs)(i.Z,{sx:{width:"100%"},children:[(0,v.jsx)(s.Z,{direction:"row",spacing:3,children:(0,v.jsx)(g.default.Title,{variant:"h1",component:"h1",title:"Configuraci\xf3n"})}),(0,v.jsx)("br",{}),(0,v.jsxs)(i.Z,{children:[(0,v.jsx)(g.default.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,v.jsx)("br",{}),(0,v.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(g.default.InputComponent,{label:"Nombre",name:"NOMBRE_SUBMENU",value:Ze.NOMBRE_SUBMENU,onChange:Se})}),(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(g.default.InputComponent,{label:"Ruta",name:"PATH",value:Ze.PATH,onChange:Se})})]}),(0,v.jsx)("br",{}),(0,v.jsx)(M.default,{resetForm:function(){return Oe()},filterForm:function(){return function(){var e=Ze.PATH,n=Ze.NOMBRE_SUBMENU;e=new RegExp(e||"","ig"),n=new RegExp(n||"","ig");var t=re.filter((function(t){return t.PATH.match(e)&&t.NOMBRE_SUBMENU.match(n)}));ue(t)}()}})]}),(0,v.jsx)("br",{}),(0,v.jsx)(g.default.TableComponents,{pagination:X,setPagination:J,children:(0,v.jsxs)(l.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,v.jsx)(u.Z,{children:(0,v.jsxs)(c.Z,{children:[(0,v.jsx)(d.Z,{children:"Nombre"}),(0,v.jsx)(d.Z,{children:"Ruta"}),(0,v.jsx)(d.Z,{children:"Ruta Final"}),(0,v.jsx)(d.Z,{children:"Icon"}),(0,v.jsx)(d.Z,{children:(0,v.jsx)(g.default.ButtonComponent,{title:"AGREGAR",variant:"primary-small",type:"admin",onClick:function(){return _(!0)}})})]})}),(0,v.jsx)(x.Z,{children:(null===le||void 0===le?void 0:le.length)>0?le.slice(X.page*X.rowsPerPage,X.page*X.rowsPerPage+X.rowsPerPage).map((function(e,n){return(0,v.jsxs)(c.Z,{children:[(0,v.jsx)(d.Z,{children:e.NOMBRE_SUBMENU}),(0,v.jsx)(d.Z,{children:e.PATH}),(0,v.jsx)(d.Z,{children:xe+e.PATH}),(0,v.jsx)(d.Z,{children:e.NOMBRE_ICON}),(0,v.jsx)(d.Z,{children:(0,v.jsx)(s.Z,{direction:"row",spacing:1,children:(0,v.jsx)(g.default.ButtonIconComponent,{title:"Eliminar",icon:p.ICON.DELETE,onClick:function(){return function(e){(0,S.AlertUtilDelete)((function(){var n=re.filter((function(n){return n.id?n.id!==e:n._id!==e})),t=le.filter((function(n){return n.id?n.id!==e:n._id!==e})),r=ee.filter((function(n){return n!==e}));ie(n),ue(t),ne(r),J((0,a.Z)((0,a.Z)({},X),{},{rowsPerPage:10,count:n.length}))}),{config:{title:"\xbfEst\xe1s seguro?",text:"\xa1Al eliminar la p\xe1gina, no habr\xe1 vuelta atr\xe1s!",icon:"warning"}})}(e.id||e._id)}})})})]},n)})):(0,v.jsx)(c.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,v.jsx)(d.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})}),(0,v.jsx)("br",{}),(0,v.jsxs)(s.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,v.jsx)(g.default.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:p.ICON.BACK,onClick:function(){return e(m.pathFront.ADMINISTRACION.PAGINAS.ADMIN)}}),(0,v.jsx)(g.default.ButtonComponent,{title:"Guardar",variant:"primary-normal",type:"admin",icon:p.ICON.SAVE,onClick:function(){return Q(!0),void(0,C.SaveRequestData)({path:j.pathServer.CONFIGURACION.MENU.UPDATE_SUBMENUS+he,body:{arrSubmenus:ee},fnRequest:Z.SERVICES_PUT,success:function(n){e(m.pathFront.ADMINISTRACION.PAGINAS.ADMIN),Q(!1),(0,E.MessageUtil)({message:n.statusText,type:"success",seg:10})},error:function(e){(0,E.MessageUtil)({message:e.statusText,type:"error",seg:10}),Q(!1)}})}})]}),(0,v.jsxs)(g.default.Modal,{open:A,setOpen:_,title:"Agregar Sub P\xe1ginas",fullWidth:!0,maxWidth:"md",children:[(0,v.jsxs)(i.Z,{children:[(0,v.jsx)(g.default.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,v.jsx)("br",{}),(0,v.jsxs)(o.ZP,{container:!0,spacing:2,children:[(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(g.default.InputComponent,{label:"Nombre",name:"NOMBRE_SUBMENU",value:pe.NOMBRE_SUBMENU,onChange:je})}),(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(g.default.InputComponent,{label:"Ruta",name:"PATH",value:pe.PATH,onChange:je})}),(0,v.jsx)(o.ZP,{item:!0,xs:3,children:(0,v.jsx)(g.default.SelectComponent,{label:"Estado",name:"ESTADO",list:B,value:pe.ESTADO,onChange:je})})]}),(0,v.jsx)("br",{}),(0,v.jsx)(M.default,{resetForm:function(){return Ne()},filterForm:function(){return ve()}})]}),(0,v.jsx)("br",{}),(0,v.jsx)("div",{style:{height:400,width:"100%"},children:(0,v.jsx)(g.default.TableSelectionComponent,{rows:H,columns:I,pageSize:L,setPageSize:W,loading:w,rowsPerPageOptions:[5,10,20],onSelectionModelChange:function(e){return ne(e)},fnPagination:ve,selectionModel:ee})}),(0,v.jsx)("br",{}),(0,v.jsxs)(s.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,v.jsx)(g.default.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:p.ICON.BACK,onClick:function(){return Me()}}),(0,v.jsx)(g.default.ButtonComponent,{title:"Guardar",variant:"primary-normal",type:"admin",icon:p.ICON.SAVE,onClick:function(){return Q(!0),void(0,C.SaveRequestData)({path:j.pathServer.CONFIGURACION.SUBMENU.SEARCH_MULTI_IDS,body:{arrIds:ee},fnRequest:Z.SERVICES_POST,success:function(e){ie(e.data),ue(e.data),Q(!1),Me(),J({rowsPerPage:10,count:e.data.length,page:0}),(0,E.MessageUtil)({message:e.statusText,type:"success",seg:10})},error:function(e){(0,E.MessageUtil)({message:e.statusText,type:"error",seg:10}),Q(!1)}})}})]})]})]})}},7631:function(e,n,t){t.r(n),t.d(n,{default:function(){return v}});var a=t(9439),r=t(1413),i=t(2791),s=t(8870),o=t(3767),l=t(1889),u=t(9836),c=t(6890),d=t(5855),x=t(3994),f=t(3382),h=t(4673),m=t(6871),g=t(5760),p=t(6206),j=t(6249),N=t(1976),E=t(9969),C=t(6915),Z=(t(7318),t(2480)),S=t(589),O=t(184),M={NOMBRE_MENU:"",NOMBRE_ICON:""};function v(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,n=(0,r.Z)({},B);if("NOMBRE_MENU"in e&&(n.NOMBRE_MENU=""===e.NOMBRE_MENU?"El campo Nombre de la P\xe1gina es requerido":""),"NOMBRE_ICON"in e&&(n.NOMBRE_ICON=""===e.NOMBRE_ICON?"El campo Nombre del Icono es requerido":""),A((0,r.Z)({},n)),e===b)return Object.values(n).every((function(e){return""===e}))},n=(0,m.s0)(),t=(0,i.useState)(!1),v=(0,a.Z)(t,2),I=(v[0],v[1]),P=(0,m.UO)().id,R=(0,p.useFormValidation)(M,e),b=R.data,U=R.setData,B=R.errors,A=R.setErrors,_=R.handleInputFormChange,T=(0,i.useState)(null),y=(0,a.Z)(T,2),w=(y[0],y[1]),k=(0,i.useState)([]),D=(0,a.Z)(k,2),F=D[0],H=D[1],q=(0,S.default)(),G=(0,i.useCallback)((function(){(0,j.SaveRequestData)({path:"".concat(E.CONFIG_SHOW).concat(P),body:{},fnRequest:N.showMenu,success:function(e){U(e.data.menu),H(e.data.submenu)},error:function(e){n("/administrador/paginas/admin"),(0,C.MessageUtil)({message:e.statusText,type:"error",seg:10})}})}),[P,n,U]);return(0,i.useEffect)((function(){P&&G()}),[P]),(0,O.jsxs)(s.Z,{children:[(0,O.jsx)(o.Z,{direction:"row",spacing:3,children:(0,O.jsx)(h.default.Title,{variant:"h1",component:"h1",title:"P\xe1ginas"})}),(0,O.jsx)("br",{}),(0,O.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,O.jsx)(l.ZP,{item:!0,xs:12,sm:12,md:6,lg:6,xl:6,xxl:6,children:(0,O.jsx)(h.default.Card,{title:P?"Editar P\xe1gina":"Nueva P\xe1gina",children:(0,O.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,O.jsx)(l.ZP,{item:!0,xs:12,children:(0,O.jsx)(h.default.InputComponent,{label:"Nombre de la p\xe1gina",name:"NOMBRE_MENU",value:b.NOMBRE_MENU,onChange:_,error:B.NOMBRE_MENU})}),(0,O.jsx)(l.ZP,{item:!0,xs:12,children:(0,O.jsx)(h.default.InputComponent,{label:"Nombre del icono",name:"NOMBRE_ICON",value:b.NOMBRE_ICON,onChange:_,error:B.NOMBRE_ICON})})]})})}),(0,O.jsxs)(l.ZP,{item:!0,xs:12,sm:12,md:6,lg:6,xl:6,xxl:6,children:[(0,O.jsxs)(o.Z,{direction:"row",spacing:3,children:[(0,O.jsx)(h.default.TextComponent,{variant:"text1",component:"span",children:"Sub P\xe1gina"}),(0,O.jsx)(h.default.ButtonComponent,{variant:"primary-small",type:"admin",title:"Nueva Sub P\xe1gina",onClick:function(){return I(!0)}})]}),(0,O.jsx)("br",{}),(0,O.jsx)(h.default.TableComponents,{children:(0,O.jsxs)(u.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,O.jsx)(c.Z,{children:(0,O.jsxs)(d.Z,{children:[(0,O.jsx)(x.Z,{children:"Nombre"}),(0,O.jsx)(x.Z,{children:"Ruta"}),(0,O.jsx)(x.Z,{children:"Icono"}),(0,O.jsx)(x.Z,{children:"Operaci\xf3n"})]})}),(0,O.jsx)(f.Z,{children:F.length>0?F.map((function(e,n){return(0,O.jsxs)(d.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:[(0,O.jsx)(x.Z,{children:e.NOMBRE_SUBMENU}),(0,O.jsx)(x.Z,{children:e.NOMBRE_ICON}),(0,O.jsx)(x.Z,{children:e.PATH}),(0,O.jsx)(x.Z,{children:(0,O.jsxs)(o.Z,{direction:"row",spacing:1,children:[(0,O.jsx)(h.default.ButtonIconComponent,{title:"Editar",icon:g.ICON.EDIT,onClick:function(){return function(e){w((0,r.Z)({},e)),I(!0)}(e)}}),(0,O.jsx)(h.default.ButtonIconComponent,{title:"Eliminar",icon:g.ICON.DELETE,onClick:function(){return function(e){(0,Z.AlertUtilDelete)((function(){var n=F.filter((function(n){return n.id?n.id!==e:n._id!==e}));H(n)}),{config:{title:"\xbfEst\xe1s seguro?",text:"Al eliminar la p\xe1gina, no habr\xe1 vuelta atr\xe1s!",icon:"warning"}})}(e.id||e._id)}})]})})]},n)})):(0,O.jsx)(d.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,O.jsx)(x.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})})]})]}),(0,O.jsx)("br",{}),(0,O.jsxs)(o.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,O.jsx)(h.default.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:g.ICON.BACK,onClick:function(){return n("/administrador/paginas/admin")}}),(0,O.jsx)(h.default.ButtonComponent,{title:P?"Actualizar":"Guardar",variant:"primary-normal",type:"admin",icon:g.ICON.SAVE,onClick:function(){e()&&(q(!0),(0,j.SaveRequestData)({path:E.CONFIG_NEW,body:(0,r.Z)((0,r.Z)({},b),{},{SUBMENUS:F}),fnRequest:N.saveMenu,success:function(e){q(!1),n("/administrador/paginas/admin"),(0,C.MessageUtil)({message:e.statusText,type:"success",seg:10})},error:function(e){(0,C.MessageUtil)({message:e.statusText,type:"error",seg:10})}}))}})]})]})}}}]);
//# sourceMappingURL=401.be94bf38.chunk.js.map