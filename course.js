
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const WA="917564024877";
// header / menu
const mm=$("#mm"),tm=o=>{mm.classList.toggle("o",o);document.body.style.overflow=o?"hidden":""};
$("#mb").onclick=()=>tm(1);$("#mx").onclick=()=>tm(0);$$("#mn a").forEach(a=>a.onclick=()=>tm(0));
addEventListener("scroll",()=>{$("#hd").classList.toggle("s",scrollY>40);const h=document.documentElement.scrollHeight-innerHeight;$("#bar").style.transform=`scaleX(${h>0?scrollY/h:0})`},{passive:true});
$("#top").onclick=()=>scrollTo({top:0,behavior:"smooth"});
// cursor
(()=>{if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;const c=$("#cur"),d=c.firstElementChild;let x=-100,y=-100,cx=-100,cy=-100;
addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;c.className=e.target.closest&&e.target.closest("a,button,select,summary")?"a":""});
(function loop(){cx+=(x-cx)*.35;cy+=(y-cy)*.35;c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)})()})();
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
$$(".rv").forEach(el=>io.observe(el));
// enroll form
const fm=$("#fm"),F=n=>fm.elements[n];
F("mobile").addEventListener("input",e=>e.target.value=e.target.value.replace(/\D/g,"").slice(0,10));
const rules={name:v=>v.trim().length>=2,mobile:v=>/^[6-9]\d{9}$/.test(v),age:v=>v>=10&&v<=80,gender:v=>!!v,city:v=>v.trim().length>=2,state:v=>!!v};
function validate(){let ok=true,first=null;for(const k in rules){const el=F(k),good=rules[k](el.value);el.closest(".fd").classList.toggle("bad",!good);if(!good){ok=false;first=first||el}}if(first)first.focus();return ok}
$$(".fd input,.fd select").forEach(el=>{const h=()=>el.closest(".fd").classList.remove("bad");el.addEventListener("input",h);el.addEventListener("change",h)});
// Pay -> UPI link for this course
$("#pay").onclick=()=>{if(!validate())return;location.href=fm.dataset.upi};
// Submit -> WhatsApp with form data
fm.addEventListener("submit",e=>{e.preventDefault();if(!validate())return;
const v=n=>F(n).value.trim();
const msg=`BEINGADOT Course
Name: ${v("name")}
Mobile Number: ${v("mobile")}
Age: ${v("age")}
Gender: ${v("gender")}
City: ${v("city")}
State: ${v("state")}

Course: ${fm.dataset.course}
Amount: ${fm.dataset.amount}

Hi, I have made the payment and here's my details, please let me know the further process.`;
window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank","noopener")});
