(function(b,a){Auth={};Auth.providers={VKontakte:{name:"VKontakte",domain:"https://oauth.vk.com/",path:"authorize",client_id:{vip:3618939,kaz:3618939,blr:3618939,stm:3627970},settings:"display=popup&response_type=token"},Odnoklassniki:{name:"Odnoklassniki",domain:"http://www.odnoklassniki.ru/",path:"oauth/authorize",client_id:{vip:174457856,kaz:174457856,blr:174457856,stm:174588672},settings:"response_type=code"},Facebook:{name:"Facebook",domain:"https://www.facebook.com/",path:"dialog/oauth",client_id:{vip:225821634221335,kaz:225821634221335,blr:225821634221335,stm:143029919194985},settings:"response_type=code&scope=email&display=popup"},Mailru:{name:"Mailru",domain:"https://connect.mail.ru/",path:"oauth/authorize",client_id:{vip:697823},settings:"response_type=code"},Twitter:{name:"Twitter",domain:"https://twitter.com/",path:"oauth/authorize",client_id:{stm:"i3v2ydYlNA8cbDxjI4sfFA"},settings:""}};Hosts={vip:{close:".kupivip.ru/close/",sign:"/signin/",domain:".kupivip.ru"},kaz:{close:".kupivip.kz/close/",sign:"/signin/",domain:".kupivip.kz"},blr:{close:".kupivip.by/close/",sign:"/signin/",domain:".kupivip.by"}};Auth.login=function(h,f,d,c){var g;g="http://"+(c?"m":"www")+Hosts[f].close+h.name;d=d==="null"?h.domain+h.path+"?client_id="+h.client_id[f]+"&"+h.settings+"&redirect_uri="+g:d;document.cookie='OAuth="";-1;path=/;domain='+Hosts[f].domain;Auth.popup({width:750,height:370,url:d});var e=function(){try{if(!Auth.activePopup||!Auth.activePopup.window||Auth.activePopup.closed){window.location.replace(Hosts[f].sign+h.name);return true}}catch(i){window.location.replace(Hosts[f].sign+h.name+"?error="+encodeURI("Ошибка аутентификации в социальной сети"));return true}setTimeout(e,200);return true};setTimeout(e,1000)};Auth.popup=function(l){var g=typeof window.screenX!="undefined"?window.screenX:window.screenLeft,e=typeof window.screenY!="undefined"?window.screenY:window.screenTop,k=typeof window.outerWidth!="undefined"?window.outerWidth:document.body.clientWidth,i=typeof window.outerHeight!="undefined"?window.outerHeight:(document.body.clientHeight-22),c=l.width,j=l.height,f=parseInt(g+((k-c)/2),10),h=parseInt(e+((i-j)/2.5),10),d=("width="+c+",height="+j+",left="+f+",top="+h);Auth.activePopup=window.open(l.url,"vk_openapi",d)}})(jQuery);