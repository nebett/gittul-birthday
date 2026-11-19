/* ================= CONFIG — edit everything here ================= */
const C={
 name:"Gittul", code:"020626", dateLine:"20 November is a special day.",
 wrong:["Hmm, not quite, my love… try again 💕","Almost! Think of something only we know 🌸","That’s not our code, cutie 🥺"],
 praises:["You are the prettiest part of my every day.","Your smile makes everything feel better.","The world feels softer with you in it.","You deserve every beautiful thing in this universe.","You’re my favorite person, always.","If I could choose again, I’d still choose you.","You are more beautiful than all the flowers in this bouquet."],
 letter:"My dearest Gittul,\n\nHappy birthday, my love.\n\nToday is all about you. I hope you always know how special you are to me. Thank you for being part of my life, for every little moment, every laugh, and every memory we’ve created together.\n\nI hope this new chapter brings you endless happiness, beautiful opportunities, and everything your heart wishes for.\n\nI may not always have the perfect words, but I hope I can always make you feel loved, appreciated, and special.\n\nYou deserve the world, and if I could, I’d give you all the stars in it.\n\nWith all my love,\nYour favorite person.",
 /* put your photos in images/ next to this file */
 photos:[{src:"images/photo1.jpg",cap:"Our first adventure"},{src:"images/photo2.jpg",cap:"My favorite smile"},{src:"images/photo3.jpg",cap:"Just us"}],
 memories:[
  {t:"The day we first met",d:"Add date",x:"The moment everything started."},
  {t:"Our first conversation",d:"Add date",x:"I didn’t know it would become my favorite."},
  {t:"The little moments that made us smile",d:"Add date",x:"Small things, big feelings."},
  {t:"Our unforgettable days together",d:"Add date",x:"Days I’d live again and again."},
  {t:"Every little thing that became a beautiful memory",d:"Add date",x:"And we’re still writing."}],
 /* put audio files in audio/ next to this file; song 1 is also the background music */
 songs:[{title:"Dancing In The Flames",artist:"The Weeknd (instrumental)",file:"audio/dancing-in-the-flames-instrumental.mp3"},
        {title:"In Your Eyes",artist:"The Weeknd",file:"audio/in-your-eyes.mp3"},
        {title:"Timeless",artist:"The Weeknd",file:"audio/timeless.mp3"}]
};
/* ================================================================== */
const $=(s,r=document)=>r.querySelector(s),mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
let unlocked=false;

/* ambient effects (kept light) */
function rain(n,g,cls,box=$("#fx")){for(let i=0;i<n;i++){const s=mk("span",cls,g[i%g.length]);s.style.cssText=`left:${Math.random()*100}%;font-size:${12+Math.random()*12}px;animation-duration:${9+Math.random()*9}s;animation-delay:${-Math.random()*14}s`;box.appendChild(s)}}
if(!RM){rain(14,["🌸","🌷","🤍","🌺"],"pt");rain(7,["♥"],"fh");rain(8,[""],"gp")}

/* heart trail: passive listeners only, never blocks scroll or taps */
let lt=0,live=0;const cols=["#ffb6c9","#ffd1dc","#ffffff","#d98ba0"];
function heart(x,y){const s=mk("i","th","♥");s.style.cssText=`left:${x}px;top:${y}px;color:${cols[Math.random()*4|0]};font-size:${10+Math.random()*10}px;--dx:${Math.random()*40-20}px;font-style:normal`;live++;s.onanimationend=()=>{s.remove();live--};document.body.appendChild(s)}
function trail(x,y,f){const n=performance.now();if(live>24||(!f&&n-lt<70))return;lt=n;heart(x,y)}
if(!RM){
 addEventListener("pointermove",e=>{if(e.pointerType!=="touch")trail(e.clientX,e.clientY)},{passive:true});
 addEventListener("pointerdown",e=>trail(e.clientX,e.clientY,true),{passive:true});
 addEventListener("touchmove",e=>{const t=e.touches[0];if(t)trail(t.clientX,t.clientY)},{passive:true});
}
function confetti(n=45){if(RM)return;const c=["#ffc8d8","#f7a8c0","#fff","#e98aa8","#fde2ea"];for(let i=0;i<n;i++){const s=mk("b","cf");s.style.cssText=`left:${Math.random()*100}%;background:${c[i%5]};animation-delay:${Math.random()*.8}s;border-radius:${i%2?"50%":"2px"}`;document.body.appendChild(s);setTimeout(()=>s.remove(),4600)}}
function burst(n=50){for(let i=0;i<n;i++){const a=Math.random()*6.28,d=120+Math.random()*Math.max(innerWidth,innerHeight)*.6;const s=mk("i","bu","♥");s.style.cssText=`--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d}px;font-size:${14+Math.random()*22}px;animation-delay:${Math.random()*.5}s;font-style:normal`;document.body.appendChild(s);setTimeout(()=>s.remove(),3200)}}

/* gate */
setTimeout(()=>{$("#ld").hidden=true;$("#gf").hidden=false},1800);
function tryCode(){const v=$("#code").value.trim();if(v===C.code)return unlock();
 $("#wr").textContent=C.wrong[Math.random()*C.wrong.length|0];const c=$("#code");c.classList.remove("shake");void c.offsetWidth;c.classList.add("shake")}
$("#go").onclick=tryCode;$("#code").addEventListener("keydown",e=>{if(e.key==="Enter")tryCode()});
$("#code").addEventListener("input",e=>{e.target.value=e.target.value.replace(/\D/g,"")});
function unlock(){unlocked=true;$("#gate").classList.add("off");$("#m").hidden=false;["#jp","#jb","#mb"].forEach(s=>$(s).hidden=false);
 document.body.classList.remove("lock");scrollTo(0,0);setTimeout(()=>$("#gate").remove(),1000);play();prog()}

/* gift */
$("#hb").textContent="HAPPY BIRTHDAY "+C.name.toUpperCase();$("#dt").textContent=C.dateLine;
$("#gift").onclick=function(){if(this.classList.contains("open"))return;this.classList.add("open");$("#tap").hidden=true;$("#bd").classList.add("in");confetti(60);if(!RM)rain(18,["🌸","🌷"],"pt")};

/* bouquet praises */
let pi=0;const pr=$("#pr");pr.textContent=C.praises[0];
setInterval(()=>{pr.style.opacity=0;setTimeout(()=>{pi=(pi+1)%C.praises.length;pr.textContent=C.praises[pi];pr.style.opacity=1},800)},4500);

/* letter */
$("#paper").textContent=C.letter;
$("#env").onclick=()=>{$("#env").hidden=true;$("#eh").hidden=true;$("#paper").classList.add("open");setTimeout(()=>$("#paper").scrollIntoView({behavior:"smooth",block:"center"}),400)};

/* photos + lightbox */
const ph=i=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffd9e4"/><stop offset="1" stop-color="#f7a8c0"/></linearGradient></defs><rect width="200" height="200" fill="url(#g)"/><text x="100" y="118" font-size="64" text-anchor="middle" fill="#fff">♥</text><text x="100" y="170" font-size="14" text-anchor="middle" fill="#fff" font-family="sans-serif">photo ${i+1}</text></svg>`);
const rot=[-4,3,-2];
C.photos.slice(0,3).forEach((p,i)=>{const b=mk("button","po");b.style.setProperty("--r",rot[i]+"deg");const im=new Image();im.alt=p.cap;im.loading="lazy";im.src=p.src;im.onerror=()=>{im.onerror=null;im.src=ph(i)};b.append(im,mk("span",0,p.cap));b.onclick=()=>{$("#lb img").src=im.src;$("#lb").classList.add("on")};$("#pg").appendChild(b)});
const lb=$("#lb"),closeLb=()=>lb.classList.remove("on");
$(".x",lb).onclick=closeLb;lb.onclick=e=>{if(e.target===lb)closeLb()};
addEventListener("keydown",e=>{if(e.key==="Escape"){closeLb();closePop()}});

/* memories */
C.memories.forEach(m=>{const c=mk("div","mc rv");c.append(mk("b",0,m.t),mk("em",0,m.d),mk("p",0,m.x));$("#tl").appendChild(c)});

/* music: one shared Audio element => never overlaps, never restarts on scroll */
const au=new Audio();au.preload="none";let cur=0,loopBg=true,ready=false;
const fmt=s=>isFinite(s)?Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0"):"--:--";
const grad=["linear-gradient(135deg,#f7a8c0,#e98aa8)","linear-gradient(135deg,#ffd1dc,#d98ba0)","linear-gradient(135deg,#fde2ea,#f48fb1)"];
function ui(){const s=C.songs[cur];$("#tt").textContent=s.title;$("#ta").textContent=s.artist;$("#cv").style.background=grad[cur%3];
 [...$("#tk").children].forEach((b,i)=>b.classList.toggle("on",i===cur));const on=!au.paused;$("#pp").textContent=on?"⏸":"▶";$("#eq").classList.toggle("on",on);$("#mb").textContent=on?"🎶":"🎵"}
function load(i){cur=i;au.pause();au.src=C.songs[i].file;au.loop=loopBg&&i===0;$("#st").textContent="";ready=true;ui()}
function play(){if(!ready)load(cur);au.play().catch(()=>{});ui()}
function toggle(){if(au.paused)play();else{au.pause();ui()}}
C.songs.forEach((s,i)=>{const b=mk("button",0,String(i+1));b.setAttribute("aria-label",s.title);b.onclick=()=>{loopBg=false;load(i);play()};$("#tk").appendChild(b)});
$("#pp").onclick=toggle;$("#mb").onclick=toggle;
$("#nx").onclick=()=>{loopBg=false;load((cur+1)%C.songs.length);play()};$("#pv").onclick=()=>{loopBg=false;load((cur+C.songs.length-1)%C.songs.length);play()};
$("#mt").onclick=()=>{au.muted=!au.muted;$("#mt").textContent=au.muted?"🔇":"🔊"};
au.addEventListener("play",ui);au.addEventListener("pause",ui);
au.addEventListener("ended",()=>{loopBg=false;load((cur+1)%C.songs.length);play()});
au.addEventListener("error",()=>{$("#st").textContent="This song isn’t available yet 💗";ui()});
au.addEventListener("loadedmetadata",()=>$("#t2").textContent=fmt(au.duration));
au.addEventListener("timeupdate",()=>{$("#t1").textContent=fmt(au.currentTime);if(au.duration)$("#sk").value=au.currentTime/au.duration*1000});
$("#sk").oninput=e=>{if(au.duration)au.currentTime=e.target.value/1000*au.duration};
ui();

/* journey progress (real scroll position) */
let tick=0;function prog(){const h=document.documentElement.scrollHeight-innerHeight,p=h>0?Math.min(100,Math.max(0,scrollY/h*100)):0;$("#jf").style.width=p+"%";$("#jn").textContent=Math.round(p)+"%"}
addEventListener("scroll",()=>{if(!tick)tick=requestAnimationFrame(()=>{tick=0;prog()})},{passive:true});addEventListener("resize",prog);

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll(".rv:not(#bd)").forEach(e=>io.observe(e));

/* final popup: once per session, only at the very end */
const pop=$("#pop");let shown=false;try{shown=sessionStorage.getItem("gb")==="1"}catch(e){}
function closePop(){pop.classList.remove("on");document.body.classList.remove("lock")}
new IntersectionObserver(es=>{if(es[0].isIntersecting&&unlocked&&!shown){shown=true;try{sessionStorage.setItem("gb","1")}catch(e){}
 setTimeout(()=>{pop.classList.add("on");document.body.classList.add("lock");confetti(70);if(!RM)rain(16,["🌸","🌷","💗"],"pt")},500)}},{threshold:.9}).observe($("#end"));
$(".x",pop).onclick=closePop;$("#cl").onclick=closePop;
$("#hug").onclick=()=>{burst(60);document.body.classList.add("love");$("#c1").hidden=true;setTimeout(()=>{$("#c2").hidden=false;burst(30)},900)};
