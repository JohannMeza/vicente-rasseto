/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[4],{388:function(ia,z,e){e.r(z);var fa=e(1),x=e(215);ia=e(384);e=e(316);var ha=window,da=function(e){function z(w,aa){var r=e.call(this,w,aa)||this;r.url=w;r.range=aa;r.request=new XMLHttpRequest;r.request.open("GET",r.url,!0);ha.Uint8Array&&(r.request.responseType="arraybuffer");r.request.setRequestHeader("X-Requested-With","XMLHttpRequest");r.status=x.a.NOT_STARTED;return r}Object(fa.c)(z,e);return z}(ia.ByteRangeRequest);ia=function(e){function x(w,
x,r,n){w=e.call(this,w,x,r,n)||this;w.xv=da;return w}Object(fa.c)(x,e);x.prototype.Ft=function(e,x){return e+"/bytes="+x.start+","+(x.stop?x.stop:"")};return x}(ia["default"]);Object(e.a)(ia);Object(e.b)(ia);z["default"]=ia}}]);}).call(this || window)