(function(p,u){"use strict";let f;var b=h=>({async onLoad(){f=u.patcher.instead("sendMessage",p.webpackModules.findByProps("sendMessage"),async(s,d)=>{const n=h.persist.store,o=s[1].content;n.hasOwnProperty("prefix")||(n.prefix="?");const r=n.prefix;function e(a){s[1].content=a}if(console.log(s),!o.startsWith(r))return d(...s);const m=o.split(" ")[0].replace(r,""),t=o.replace(r+m,"").trim().split(" ");switch(m){case"test":e("test worked");break;case"setprefix":if(t.length!==1){e("No spaces allowed");break}n.prefix=t[0],e(`Set the prefix to ${t[0]}`);break;case"animal":if(t<2){e("Please choose between the subcommands: `fact` and `animal`");break}const a=t.slice(1),k=t[0];if(!["fox","dog","panda","koala","cat","creatable"].includes(a[0]?.toLowerCase()))break;if(a[0]=="creatable"){e("I just got cummed on by Creatable");break}switch(k){case"fact":let c=await fetch(`https://some-random-api.ml/facts/${a[0].toLowerCase()}`).then(l=>l.json());c=c.fact,e(c);break;case"image":let i=await fetch(`https://some-random-api.ml/img/${a[0].toLowerCase()}`).then(l=>l.json());i=i.link,e(i);break;default:e("That's not even a option, what are you doing?");break}break}return d(...s)})},onUnload(){f()}});return b})(cumcord.modules,cumcord);
