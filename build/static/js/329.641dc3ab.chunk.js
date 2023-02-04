"use strict";(self.webpackChunksistema_web=self.webpackChunksistema_web||[]).push([[329,318,782,237],{3329:function(e,n,t){t.r(n);var a=t(9439),s=t(8870),r=t(9124),i=t(3896),l=t(2791),o=t(4673),c=t(5898),u=t(7318),d=t(5237),x=t(184);n.default=function(){var e=l.useState(0),n=(0,a.Z)(e,2),t=n[0],h=n[1];return(0,x.jsxs)(s.Z,{sx:{width:"100%"},children:[(0,x.jsx)(s.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,x.jsxs)(r.Z,{value:t,onChange:function(e,n){return h(n)},"aria-label":"basic tabs example",children:[(0,x.jsx)(i.Z,{label:"P\xe1ginas",id:"simple-tab-1","aria-controls":"simple-tabpanel-1"}),(0,x.jsx)(i.Z,{label:"Sub Paginas",id:"simple-tab-1","aria-controls":"simple-tabpanel-1"}),(0,x.jsx)(i.Z,{label:"Configuraci\xf3n",id:"simple-tab-1","aria-controls":"simple-tabpanel-1"})]})}),(0,x.jsx)("br",{}),(0,x.jsx)(o.default.TabPanel,{value:t,index:0,children:(0,x.jsx)(u.default,{})}),(0,x.jsx)(o.default.TabPanel,{value:t,index:1,children:(0,x.jsx)(d.default,{})}),(0,x.jsx)(o.default.TabPanel,{value:t,index:2,children:(0,x.jsx)(c.default,{})})]})}},7318:function(e,n,t){t.r(n),t.d(n,{default:function(){return R}});var a=t(1413),s=t(9439),r=t(8870),i=t(3767),l=t(1889),o=t(9836),c=t(6890),u=t(5855),d=t(3994),x=t(3382),h=t(2791),j=t(4092),g=t(9969),m=t(4673),p=t(5760),f=t(6249),E=t(3943),Z=t(6206),N=t(589),b=t(1976),C=t(7535),P=t(2480),v=t(6915),O=t(184),S={rowsPerPage:10,page:0,count:0},I={NOMBRE_MENU:null,NOMBRE_ICON:null,PATH:null,ESTADO:!0},T={NOMBRE_MENU:null,PATH:null,ESTADO:!0},M=[{label:"Activo",value:!0},{label:"Inactivo",value:!1}];function R(){var e=(0,h.useState)([]),n=(0,s.Z)(e,2),t=n[0],R=n[1],A=(0,h.useState)(!1),B=(0,s.Z)(A,2),_=B[0],U=B[1],y=(0,Z.useFormValidation)(I,!0),D=y.data,k=y.setData,w=y.errors,F=y.handleInputFormChange,H=y.resetForm,q=(0,E.useForm)(T),G=(0,s.Z)(q,3),V=G[0],L=G[1],W=G[2],X=(0,h.useState)(S),K=(0,s.Z)(X,2),z=K[0],J=K[1],Q=(0,N.default)(),Y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;Q(!0),(0,f.SaveRequestData)({path:g.CONFIG_INDEX,body:V,fnRequest:b.listMenu,pagination:!0,rowsPerPage:e,page:n,success:function(e){Q(!1);var n=e.rowsPerPage,t=e.count,a=e.page;--a,R(e.data),J({rowsPerPage:n,count:t,page:a})},error:function(e){Q(!1),(0,v.MessageUtil)({message:e.statusText,type:"error",seg:10})}})};return(0,h.useEffect)((function(){Y()}),[]),(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(r.Z,{children:[(0,O.jsxs)(i.Z,{direction:"row",spacing:3,children:[(0,O.jsx)(m.default.Title,{variant:"h1",component:"h1",title:"P\xe1ginas"}),(0,O.jsx)(m.default.ButtonComponent,{variant:"primary-small",type:"admin",title:"Nueva P\xe1gina",onClick:function(){return U(!0)}})]}),(0,O.jsx)("br",{}),(0,O.jsxs)(r.Z,{children:[(0,O.jsx)(m.default.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,O.jsx)("br",{}),(0,O.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,O.jsx)(l.ZP,{item:!0,xs:3,children:(0,O.jsx)(m.default.InputComponent,{label:"Nombre de la P\xe1gina",name:"NOMBRE_MENU",onChange:L,value:V.NOMBRE_MENU})}),(0,O.jsx)(l.ZP,{item:!0,xs:3,children:(0,O.jsx)(m.default.InputComponent,{label:"Ruta",name:"PATH",onChange:L,value:V.PATH})}),(0,O.jsx)(l.ZP,{item:!0,xs:3,children:(0,O.jsx)(m.default.SelectComponent,{label:"Estado",list:M,name:"ESTADO",onChange:L,value:V.ESTADO})})]}),(0,O.jsx)("br",{}),(0,O.jsx)(j.default,{resetForm:W,filterForm:Y})]}),(0,O.jsx)("br",{}),(0,O.jsx)(m.default.TableComponents,{pagination:z,setPagination:J,fnPagination:Y,children:(0,O.jsxs)(o.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,O.jsx)(c.Z,{children:(0,O.jsxs)(u.Z,{children:[(0,O.jsx)(d.Z,{children:"Nombre"}),(0,O.jsx)(d.Z,{children:"Ruta"}),(0,O.jsx)(d.Z,{children:"Icon"}),(0,O.jsx)(d.Z,{children:"Operaci\xf3n"})]})}),(0,O.jsx)(x.Z,{children:t.length>0?t.map((function(e,n){return(0,O.jsxs)(u.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:[(0,O.jsx)(d.Z,{children:e.NOMBRE_MENU}),(0,O.jsx)(d.Z,{children:e.PATH}),(0,O.jsx)(d.Z,{children:e.NOMBRE_ICON}),(0,O.jsx)(d.Z,{children:(0,O.jsxs)(i.Z,{direction:"row",spacing:1,children:[(0,O.jsx)(m.default.ButtonIconComponent,{title:"Editar",icon:p.ICON.EDIT,onClick:function(){return function(e){U(!0),k(e)}(e)}}),(0,O.jsx)(m.default.ButtonIconComponent,{title:"Eliminar",icon:p.ICON.DELETE,onClick:function(){return n=e._id,void(0,P.AlertUtilDelete)((function(){(0,f.SaveRequestData)({path:"".concat(g.CONFIG_DELETE,"/").concat(n),body:{},fnRequest:b.deleteMenu,success:function(e){(0,P.AlertUtilRelease)({title:"\xa1Eliminado!",text:e.statusText,icon:"success"}),Y()},error:function(e){(0,v.MessageUtil)({message:e.statusText,type:"error",seg:10})}})}),{config:{title:"\xbfEst\xe1s seguro?",text:"Al eliminar la p\xe1gina, no habr\xe1 vuelta atr\xe1s!",icon:"warning"}});var n}})]})})]},n)})):(0,O.jsx)(u.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,O.jsx)(d.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})})]}),(0,O.jsx)(m.default.Modal,{open:_,setOpen:U,title:D._id?"Editar P\xe1gina":"Agregar Nueva P\xe1gina",fullWidth:!0,resetForm:H,maxWidth:"sm",children:(0,O.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,O.jsx)(l.ZP,{item:!0,xs:12,children:(0,O.jsx)(m.default.InputComponent,{label:"Nombre de la p\xe1gina",name:"NOMBRE_MENU",value:D.NOMBRE_MENU,onChange:F,error:w.NOMBRE_MENU})}),(0,O.jsx)(l.ZP,{item:!0,xs:12,children:(0,O.jsx)(m.default.InputComponent,{label:"Nombre del icono",name:"NOMBRE_ICON",value:D.NOMBRE_ICON,onChange:F,error:w.NOMBRE_ICON})}),(0,O.jsx)(l.ZP,{item:!0,xs:12,children:(0,O.jsx)(m.default.InputComponent,{label:"Ruta Base",name:"PATH",value:D.PATH,onChange:F,error:w.PATH})}),(0,O.jsx)(l.ZP,{item:!0,xs:12,children:(0,O.jsx)(m.default.SelectComponent,{label:"Estado",name:"ESTADO",value:D.ESTADO,list:M,onChange:F,error:w.ESTADO})}),(0,O.jsx)(l.ZP,{item:!0,xs:12,children:(0,O.jsxs)(i.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,O.jsx)(m.default.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:p.ICON.BACK,onClick:function(){return U(!1)}}),(0,O.jsx)(m.default.ButtonComponent,{title:D._id?"Editar":"Guardar",variant:"primary-normal",type:"admin",icon:p.ICON.SAVE,onClick:function(){return console.log(w),Q(!0),D._id,void(0,f.SaveRequestData)({path:g.pathServer.CONFIGURACION.MENU.NEW,body:(0,a.Z)({},D),fnRequest:C.SERVICES_POST,success:function(e){Y(),(0,v.MessageUtil)({message:e.statusText,type:"success",seg:10}),U(!1),Q(!1)},error:function(e){Q(!1),(0,v.MessageUtil)({message:e.statusText,type:"error",seg:10})}})}})]})})]})})]})}},5898:function(e,n,t){t.r(n),t.d(n,{default:function(){return T}});var a=t(9439),s=t(8870),r=t(3767),i=t(1889),l=t(9836),o=t(6890),c=t(5855),u=t(3994),d=t(3382),x=t(2791),h=t(6871),j=t(4092),g=t(9969),m=t(8012),p=t(4673),f=t(5760),E=t(6249),Z=t(3943),N=t(589),b=(t(1976),t(7535)),C=t(6915),P=t(184),v={rowsPerPage:10,page:0,count:0},O={rowsPerPage:10,page:0,count:0},S={NOMBRE_MENU:null,PATH:null,ESTADO:!0},I=[{label:"Activo",value:!0},{label:"Inactivo",value:!1}];function T(){var e=(0,x.useState)(v),n=(0,a.Z)(e,2),t=n[0],T=n[1],M=(0,x.useState)(O),R=(0,a.Z)(M,2),A=R[0],B=R[1],_=(0,N.default)(),U=(0,x.useState)([]),y=(0,a.Z)(U,2),D=y[0],k=y[1],w=(0,x.useState)([]),F=(0,a.Z)(w,2),H=F[0],q=F[1],G=(0,x.useState)(!1),V=(0,a.Z)(G,2),L=V[0],W=V[1],X=(0,Z.useForm)(S),K=(0,a.Z)(X,3),z=K[0],J=K[1],Q=K[2],Y=(0,h.s0)(),$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;_(!0),(0,E.SaveRequestData)({path:g.CONFIG_INDEX,body:z,fnRequest:b.SERVICES_POST,pagination:!0,rowsPerPage:e,page:n,success:function(e){_(!1);var n=e.rowsPerPage,t=e.count,a=e.page;--a,k(e.data),T({rowsPerPage:n,count:t,page:a})},error:function(e){(0,C.MessageUtil)({message:e.statusText,type:"error",seg:10})}})};return(0,x.useEffect)((function(){$()}),[]),(0,P.jsxs)(s.Z,{children:[(0,P.jsx)(r.Z,{direction:"row",spacing:3,children:(0,P.jsx)(p.default.Title,{variant:"h1",component:"h1",title:"P\xe1ginas"})}),(0,P.jsx)("br",{}),(0,P.jsxs)(s.Z,{children:[(0,P.jsx)(p.default.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,P.jsx)("br",{}),(0,P.jsxs)(i.ZP,{container:!0,spacing:2,children:[(0,P.jsx)(i.ZP,{item:!0,xs:3,children:(0,P.jsx)(p.default.InputComponent,{label:"Nombre de la P\xe1gina",name:"NOMBRE_MENU",onChange:J,value:z.NOMBRE_MENU})}),(0,P.jsx)(i.ZP,{item:!0,xs:3,children:(0,P.jsx)(p.default.InputComponent,{label:"Ruta",name:"PATH",onChange:J,value:z.PATH})}),(0,P.jsx)(i.ZP,{item:!0,xs:3,children:(0,P.jsx)(p.default.SelectComponent,{label:"Estado",list:I,name:"ESTADO",onChange:J,value:z.ESTADO})})]}),(0,P.jsx)("br",{}),(0,P.jsx)(j.default,{resetForm:Q,filterForm:$})]}),(0,P.jsx)("br",{}),(0,P.jsxs)(i.ZP,{container:!0,direction:"row",spacing:3,children:[(0,P.jsx)(i.ZP,{item:!0,xs:6,children:(0,P.jsx)(p.default.TableComponents,{pagination:t,setPagination:T,fnPagination:$,children:(0,P.jsxs)(l.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,P.jsx)(o.Z,{children:(0,P.jsxs)(c.Z,{children:[(0,P.jsx)(u.Z,{children:"Nombre"}),(0,P.jsx)(u.Z,{children:"Ruta"}),(0,P.jsx)(u.Z,{children:"Operaci\xf3n"})]})}),(0,P.jsx)(d.Z,{children:D.length>0?D.map((function(e,n){return(0,P.jsxs)(c.Z,{role:"checkbox",tabIndex:-1,className:L&&L===e._id?"background-gris_500":"",children:[(0,P.jsx)(u.Z,{children:e.NOMBRE_MENU}),(0,P.jsx)(u.Z,{children:e.PATH}),(0,P.jsx)(u.Z,{children:(0,P.jsx)(r.Z,{direction:"row",spacing:1,children:(0,P.jsx)(p.default.ButtonIconComponent,{title:"Ver",icon:f.ICON.PASS_VISIBLE,onClick:function(){return n=e._id,_(!0),void(0,E.SaveRequestData)({path:g.pathServer.CONFIG_MENU.SEARCH_SUBPAGINAS+n,body:{},fnRequest:b.SERVICES_POST,success:function(e){var t,a=null===(t=e.data)||void 0===t?void 0:t.ID_CONFIGURACION_SUBMENU;q(a),B({rowsPerPage:10,count:a.length,page:0}),W(n),_(!1)},error:function(e){_(!1),(0,C.MessageUtil)({message:e.statusText,type:"error",seg:10})}});var n}})})})]},n)})):(0,P.jsx)(c.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,P.jsx)(u.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})})}),(0,P.jsx)(i.ZP,{item:!0,xs:6,children:(0,P.jsx)(p.default.TableComponents,{pagination:A,setPagination:B,children:(0,P.jsxs)(l.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,P.jsx)(o.Z,{children:(0,P.jsxs)(c.Z,{children:[(0,P.jsx)(u.Z,{children:"Nombre"}),(0,P.jsx)(u.Z,{children:"Ruta"}),(0,P.jsx)(u.Z,{children:(0,P.jsx)(p.default.ButtonComponent,{title:"configurar",variant:"primary-small",type:"admin",icon:f.ICON.SAVE,onClick:function(){L&&Y(m.pathFront.ADMINISTRACION.PAGINAS.CONFIGURACION+L)}})})]})}),(0,P.jsx)(d.Z,{children:H.length>0?H.slice(A.page*A.rowsPerPage,A.page*A.rowsPerPage+A.rowsPerPage).map((function(e,n){return(0,P.jsxs)(c.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:[(0,P.jsx)(u.Z,{children:e.NOMBRE_SUBMENU}),(0,P.jsx)(u.Z,{children:e.PATH}),(0,P.jsx)(u.Z,{})]},n)})):(0,P.jsx)(c.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,P.jsx)(u.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})})})]})]})}},5237:function(e,n,t){t.r(n),t.d(n,{default:function(){return M}});var a=t(1413),s=t(9439),r=t(8870),i=t(3767),l=t(1889),o=t(9836),c=t(6890),u=t(5855),d=t(3994),x=t(3382),h=t(2791),j=t(4092),g=t(9969),m=t(4673),p=t(5760),f=t(6249),E=t(3943),Z=t(6206),N=t(589),b=t(4884),C=t(2480),P=t(6915),v=t(184),O={NOMBRE_SUBMENU:null,NOMBRE_ICON:null,PATH:null,ESTADO:!0},S={NOMBRE_SUBMENU:null,PATH:null,ESTADO:!0},I={rowsPerPage:10,page:0,count:0},T=[{label:"Activo",value:!0},{label:"Inactivo",value:!1}];function M(){var e=(0,h.useState)([]),n=(0,s.Z)(e,2),t=n[0],M=n[1],R=(0,h.useState)(!1),A=(0,s.Z)(R,2),B=A[0],_=A[1],U=(0,Z.useFormValidation)(O,!0),y=U.data,D=U.setData,k=U.errors,w=U.handleInputFormChange,F=U.resetForm,H=(0,E.useForm)(S),q=(0,s.Z)(H,3),G=q[0],V=q[1],L=q[2],W=(0,h.useState)(I),X=(0,s.Z)(W,2),K=X[0],z=X[1],J=(0,N.default)(),Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;J(!0),(0,f.SaveRequestData)({path:g.CONFIG_SUBMENU_INDEX,body:G,fnRequest:b.listSubmenu,pagination:!0,rowsPerPage:e,page:n,success:function(e){var n=e.rowsPerPage,t=e.count,a=e.page;--a,M(e.data),z({rowsPerPage:n,count:t,page:a}),J(!1)},error:function(e){J(!1),(0,P.MessageUtil)({message:e.statusText,type:"error",seg:10})}})};return(0,h.useEffect)((function(){Q()}),[]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(r.Z,{children:[(0,v.jsxs)(i.Z,{direction:"row",spacing:3,children:[(0,v.jsx)(m.default.Title,{variant:"h1",component:"h1",title:"Sub P\xe1ginas"}),(0,v.jsx)(m.default.ButtonComponent,{variant:"primary-small",type:"admin",title:"Nueva Sub P\xe1gina",onClick:function(){return _(!0)}})]}),(0,v.jsx)("br",{}),(0,v.jsxs)(r.Z,{children:[(0,v.jsx)(m.default.TextComponent,{variant:"h3",component:"div",children:"Filtros de B\xfasqueda"}),(0,v.jsx)("br",{}),(0,v.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,v.jsx)(l.ZP,{item:!0,xs:3,children:(0,v.jsx)(m.default.InputComponent,{label:"Nombre",name:"NOMBRE_SUBMENU",value:G.NOMBRE_SUBMENU,onChange:V})}),(0,v.jsx)(l.ZP,{item:!0,xs:3,children:(0,v.jsx)(m.default.InputComponent,{label:"Ruta",name:"PATH",value:G.PATH,onChange:V})}),(0,v.jsx)(l.ZP,{item:!0,xs:3,children:(0,v.jsx)(m.default.SelectComponent,{label:"Estado",name:"ESTADO",list:T,value:G.ESTADO,onChange:V})})]}),(0,v.jsx)("br",{}),(0,v.jsx)(j.default,{resetForm:function(){return L()},filterForm:function(){return Q()}})]}),(0,v.jsx)("br",{}),(0,v.jsx)(m.default.TableComponents,{pagination:K,setPagination:z,fnPagination:Q,children:(0,v.jsxs)(o.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,v.jsx)(c.Z,{children:(0,v.jsxs)(u.Z,{children:[(0,v.jsx)(d.Z,{children:"Nombre"}),(0,v.jsx)(d.Z,{children:"Ruta"}),(0,v.jsx)(d.Z,{children:"Icon"}),(0,v.jsx)(d.Z,{children:"Operaci\xf3n"})]})}),(0,v.jsx)(x.Z,{children:t.length>0?t.map((function(e,n){return(0,v.jsxs)(u.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:[(0,v.jsx)(d.Z,{children:e.NOMBRE_SUBMENU}),(0,v.jsx)(d.Z,{children:e.PATH}),(0,v.jsx)(d.Z,{children:e.NOMBRE_ICON}),(0,v.jsx)(d.Z,{children:(0,v.jsxs)(i.Z,{direction:"row",spacing:1,children:[(0,v.jsx)(m.default.ButtonIconComponent,{title:"Editar",icon:p.ICON.EDIT,onClick:function(){return D(e),void _(!0)}}),(0,v.jsx)(m.default.ButtonIconComponent,{title:"Eliminar",icon:p.ICON.DELETE,onClick:function(){return n=e._id,void(0,C.AlertUtilDelete)((function(){(0,f.SaveRequestData)({path:"".concat(g.CONFIG_SUBMENU_DELETE,"/").concat(n),body:{},fnRequest:b.deleteSubmenu,success:function(e){(0,C.AlertUtilRelease)({title:"\xa1Eliminado!",text:e.statusText,icon:"success"}),Q()},error:function(e){(0,P.MessageUtil)({message:e.statusText,type:"error",seg:10})}})}),{config:{title:"\xbfEst\xe1s seguro?",text:"Al eliminar la p\xe1gina, no habr\xe1 vuelta atr\xe1s!",icon:"warning"}});var n}})]})})]},n)})):(0,v.jsx)(u.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:(0,v.jsx)(d.Z,{colSpan:4,align:"center",children:"Todav\xeda no se insert\xf3 ningun registro"})})})]})})]}),(0,v.jsx)(m.default.Modal,{open:B,setOpen:_,title:y._id?"Editar Sub P\xe1gina":"Agregar Nueva Sub P\xe1gina",resetForm:F,fullWidth:!0,maxWidth:"sm",children:(0,v.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,v.jsx)(l.ZP,{item:!0,xs:12,children:(0,v.jsx)(m.default.InputComponent,{label:"Nombre de la p\xe1gina",name:"NOMBRE_SUBMENU",value:y.NOMBRE_SUBMENU,onChange:w,error:k.NOMBRE_SUBMENU})}),(0,v.jsx)(l.ZP,{item:!0,xs:12,children:(0,v.jsx)(m.default.InputComponent,{label:"Nombre del icono",name:"NOMBRE_ICON",value:y.NOMBRE_ICON,onChange:w,error:k.NOMBRE_ICON})}),(0,v.jsx)(l.ZP,{item:!0,xs:12,children:(0,v.jsx)(m.default.InputComponent,{label:"Nombre de la ruta",name:"PATH",value:y.PATH,onChange:w,error:k.PATH})}),(0,v.jsx)(l.ZP,{item:!0,xs:12,children:(0,v.jsx)(m.default.SelectComponent,{label:"Estado",name:"ESTADO",list:T,value:y.ESTADO,onChange:w,error:k.ESTADO})}),(0,v.jsx)(l.ZP,{item:!0,xs:12,children:(0,v.jsxs)(i.Z,{direction:"row",spacing:3,justifyContent:"center",children:[(0,v.jsx)(m.default.ButtonComponent,{title:"VOLVER",variant:"secondary-normal",type:"admin",icon:p.ICON.BACK,onClick:function(){return _(!1)}}),(0,v.jsx)(m.default.ButtonComponent,{title:y._id?"Editar":"Guardar",variant:"primary-normal",type:"admin",icon:p.ICON.SAVE,onClick:function(){return J(!0),void(0,f.SaveRequestData)({path:g.CONFIG_SUBMENU_NEW,body:(0,a.Z)({},y),fnRequest:b.saveSubmenu,success:function(e){Q(),_(!1),F(),(0,P.MessageUtil)({message:e.statusText,type:"success",seg:10}),J(!1)},error:function(e){(0,P.MessageUtil)({message:e.statusText,type:"error",seg:10}),J(!1)}})}})]})})]})})]})}}}]);
//# sourceMappingURL=329.641dc3ab.chunk.js.map