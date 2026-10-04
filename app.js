const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const load=k=>{try{return JSON.parse(ls.get(k))}catch(e){return null}};

/* ---------- Navigasi (floating pill) ---------- */
const TABS=[['faktapedia','Faktapedia'],['kalkulator','Kalkulator'],['lens','Gula Lens'],['kuliner','Kuliner'],['hydration','Hidrasi']];
const IC={faktapedia:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
kalkulator:'<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M8 6h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18h2M14 18h2"/>',
lens:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
kuliner:'<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v6M9 3v6M17 21V3c-2 1-3 4-3 8h3"/>',
hydration:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'};
$('#bnav').innerHTML=TABS.map(([id,l])=>`<button class="nb" data-t="${id}" aria-label="${l}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[id]}</svg>${l}</button>`).join('');
function go(id){if(!TABS.some(t=>t[0]===id))id='faktapedia';$$('.tab').forEach(t=>t.classList.toggle('active',t.id===id));$$('.nb').forEach(b=>b.classList.toggle('on',b.dataset.t===id));scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','#'+id)}
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.append(d);setTimeout(()=>d.remove(),1800)}

/* ---------- Faktapedia ---------- */
const art=(e,a,b)=>`<div class="art" style="--a:${a};--b:${b}"><svg viewBox="0 0 200 110" aria-hidden="true"><circle cx="30" cy="25" r="22" fill="#fff" opacity=".3"/><circle cx="175" cy="88" r="30" fill="#fff" opacity=".25"/><path d="M0 95q50-30 100 0t100-10v25H0z" fill="#fff" opacity=".35"/><text x="100" y="80" font-size="70" text-anchor="middle">${e}</text><path d="M160 14l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="#fff"/><path d="M28 70l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#fff" opacity=".8"/></svg></div>`;
const DANGER=[['🧬','Diabetes Tipe-2 Usia Muda','Gula berlebih terus-menerus bikin sel kebal terhadap insulin (resistensi insulin). Akibatnya gula darah menumpuk, bahkan di usia 20-an.','#FF6B8B','#8A2BE2'],
['⚡','Energy Crash & Brain Fog','Sugar high cepat naik lalu jatuh drastis: lemas, ngantuk, susah fokus kuliah atau kerja, dan pengin ngemil manis lagi.','#fbbf24','#FF6B8B'],
['🧏‍♀️','Skin Aging & Jerawat','Glikasi: gula menempel pada protein kolagen dan membuatnya kaku. Kulit jadi kusam, kerutan muncul lebih cepat, jerawat lebih mudah meradang.','#00F5D4','#8A2BE2'],
['🌸','PCOS & Hormon','Insulin tinggi memicu hormon androgen naik pada remaja perempuan: siklus haid tidak teratur, jerawat, dan bulu berlebih.','#f9a8d4','#a78bfa'],
['🫀','Fatty Liver Non-Alkoholik','Fruktosa dari minuman manis diolah hati menjadi lemak. Lama-lama hati menumpuk lemak, bahkan pada orang yang tampak kurus.','#fb923c','#FF6B8B'],
['🦷','Karies Gigi & Peradangan','Bakteri mulut mengubah gula jadi asam yang mengikis email gigi. Gigi berlubang dan gusi meradang jadi lebih sering.','#67e8f9','#00F5D4']];
$('#danger').innerHTML=DANGER.map(([e,t,p,a,b])=>`<article class="card dc" tabindex="0">${art(e,a,b)}<h3>${t}</h3><p>${p}</p></article>`).join('');
$('#alias').innerHTML=['Sucrose / Sukrosa','HFCS (sirup jagung fruktosa tinggi)','Maltodextrin','Dextrose','Agave Nectar','Evaporated Cane Juice','Glukosa','Fruktosa','Sirup Beras','Molase','Madu','Konsentrat Jus Buah'].map(x=>`<span>${x}</span>`).join('');
$('#myths').innerHTML=[['🍯','Gula Aren vs Gula Putih','Mitos: gula aren boleh banyak.','Sama-sama sukrosa. Gula aren punya indeks glikemik sedikit lebih rendah dan sedikit mineral, tapi tetap dihitung gula tambahan.'],
['🧪','Pemanis Zero Calorie','Mitos: zero calorie pasti sehat.','Tidak menaikkan gula darah, tapi masih diteliti pengaruhnya pada usus dan selera manis. WHO (2023) tidak menyarankannya sebagai cara turun berat badan jangka panjang.'],
['🍎','Buah Utuh vs Minuman Kemasan','Mitos: gula buah sama bahayanya dengan soda.','Buah utuh punya serat yang memperlambat penyerapan gula. Jus dan minuman kemasan melepas gula cair yang cepat menaikkan gula darah.']].map(([e,t,m,f])=>`<button class="card flip" aria-label="${t}"><div class="fi"><div class="fa"><span class="emo">${e}</span><b>${t}</b><small>${m}</small></div><div class="fb">${f}</div></div></button>`).join('');
$('#myths').addEventListener('click',e=>{const f=e.target.closest('.flip');if(f)f.classList.toggle('f')});
$('#hacks').innerHTML=[['🧋','Boba: pilih less sugar 25%'],['🥤','Soda → air soda + jeruk nipis'],['🍌','Wafer → pisang + selai kacang'],['☕','Kopi susu → tanpa gula tambahan']].map(([e,t])=>`<div class="card hk"><span>${e}</span>${t}</div>`).join('');

/* ---------- Helper ---------- */
const lvl=g=>g<10?['g','Aman','🟢']:g<25?['y','Sedang','🟡']:['r','Tinggi Gula','🔴'];
const sdt=g=>String(+(g/4).toFixed(1));
const RATES=[['🏃‍♂️','Joging santai',10],['🚶‍♀️','Jalan cepat',4.5],['🚴‍♂️','Bersepeda',7.5],['🧘‍♀️','Skipping',12]];
const burnHTML=k=>`<div class="burn">${RATES.map(([i,n,r])=>`<div class="b"><big>${i}</big><b>${Math.max(5,Math.round(k/r))} menit</b><small>${n}</small></div>`).join('')}</div><small class="muted">Estimasi untuk berat badan ±60 kg.</small>`;
function resultHTML(n,g,k,note){const[c,l,d]=lvl(g);return`<div class="card pad"><h3>${n}</h3><span class="badge ${c}">${d} ${l}</span><div class="nums"><div><b class="gt">${g} g</b>gula</div><div><b class="gt">${sdt(g)} 🍵</b>sdt</div><div><b class="gt">${k}</b>kkal</div></div><p>${g>=25?'Satu porsi ini sudah melewati separuh batas aman remaja (25 g).':g>=10?'Boleh sesekali, imbangi dengan gerak.':'Relatif aman, tetap jaga porsi.'}</p><h4>🔥 Cara membakarnya</h4>${burnHTML(k)}<p>💧 Disarankan minum +${Math.min(4,Math.max(1,Math.ceil(g/12)))} gelas air putih ekstra untuk bantu metabolisme.</p><button class="btn add" data-n="${n}" data-g="${g}" data-k="${k}">+ Catat ke Konsumsi Gula Hari Ini</button>${note?`<p><small class="muted">${note}</small></p>`:''}</div>`}

/* ---------- Daily Sugar Tracker ---------- */
const day=new Date().toDateString();
let LOG=load('gg_log');if(!LOG||LOG.d!==day)LOG={d:day,items:[]};
let LIM=+ls.get('gg_lim')||50;
function renderTrk(){const g=Math.round(LOG.items.reduce((s,i)=>s+i.g,0)),k=LOG.items.reduce((s,i)=>s+i.k,0),p=Math.min(100,Math.round(g/LIM*100)),c=g>LIM?'r':g>LIM*.7?'y':'g';
$('#trk').innerHTML=`<h2 class="gt">📊 Gula Tracker Harian</h2><div class="card pad"><div class="nums"><div><b class="gt">${g} g</b>terkonsumsi</div><div><b class="gt">${sdt(g)} 🍵</b>sdt</div><div><b class="gt">${LIM} g</b>batas aman</div></div><div class="bar"><i class="${c}" style="width:${p}%"></i></div><p>${g>LIM?'🔴 Melewati batas! Imbangi dengan gerak dan air putih.':g>LIM*.7?'🟡 Hampir batas. Pilih yang tanpa gula dulu.':'🟢 Masih aman. Lanjut hari ini!'} (${k} kkal tercatat)</p>${LOG.items.length?`<ul class="log">${LOG.items.map((i,x)=>`<li><span>${i.n}</span><b>${i.g} g</b><button class="del" data-x="${x}" aria-label="Hapus ${i.n}">✕</button></li>`).join('')}</ul><button class="btn alt" id="rs">Reset hari ini</button>`:'<p class="muted">Belum ada catatan. Tekan "+ Catat" di Kuliner atau Gula Lens.</p>'}</div>`;
$('#chip').textContent=`${g}/${LIM} g`;$('#hs').textContent=`Hari ini kamu mencatat ${g} g dari batas ${LIM} g.`;ls.set('gg_log',JSON.stringify(LOG))}
function add(n,g,k){LOG.items.push({n,g:+g,k:+k});renderTrk();toast('✓ Tercatat: '+n)}
$('#trk').addEventListener('click',e=>{const d=e.target.closest('.del');if(d){LOG.items.splice(+d.dataset.x,1);renderTrk()}else if(e.target.id==='rs'){LOG.items=[];renderTrk()}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(b)return go(b.dataset.t);const a=e.target.closest('.add');if(a)add(a.dataset.n,a.dataset.g,a.dataset.k)});

/* ---------- Kalkulator ---------- */
$('#cf').onsubmit=e=>{e.preventDefault();const a=+$('#age').value,w=+$('#wt').value,m=$('#sex').value==='m',f=+$('#act').value;
const kcal=Math.round(w*(m?24:22)*f*(a>50?.92:1)),lim=kcal*.1;let g=Math.min(50,Math.round(lim/4));if(a<19)g=Math.min(g,25);LIM=g;ls.set('gg_lim',g);renderTrk();
$('#cr').innerHTML=`<div class="card pad"><h3>Batas gula amanmu</h3><div class="nums"><div><b class="gt">${g} g</b>gram</div><div><b class="gt">${sdt(g)} 🍵</b>sdt</div><div><b class="gt">10%</b>kalori harian</div></div><p>Kebutuhan energimu ±${kcal} kkal/hari, jadi gula tambahan maksimal ±${Math.round(lim)} kkal (10%, sesuai WHO). ${a<19?'Usia di bawah 19 tahun: dipakai batas AHA 25 g (6 sdt).':'Batas umum Kemenkes: 50 g (4 sdm).'}</p><p>✅ Batas di tracker sudah diperbarui.</p></div>`};

/* ---------- Database Kuliner ---------- */
const F=[['🍡','Klepon (5 pcs)','Tradisional',150,12],['🥤','Es Cendol / Dawet','Tradisional',230,28],['🍌','Kolak Pisang','Tradisional',250,30],['🧁','Bika Ambon (1 potong)','Tradisional',200,18],
['🥞','Martabak Manis (1 slice)','Tradisional',330,28],['🍥','Putu Mayang','Tradisional',180,15],['🍙','Kue Lupis','Tradisional',190,17],['🍧','Es Doger','Tradisional',280,32],
['🥥','Es Teler','Tradisional',300,35],['🥞','Kue Serabi','Tradisional',200,14],['🍬','Dodol (4 pcs)','Tradisional',180,22],['🍌','Nagasari (2 pcs)','Tradisional',160,12],
['🧊','Es Teh Solo Manis 500ml','Kaki Lima',120,30],['🧋','Es Boba Brown Sugar 500ml','Kaki Lima',420,42],['🥤','Pop Ice Rasa-Rasa','Kaki Lima',220,32],['🌽','Jasuke (Jagung Susu Keju)','Kaki Lima',270,16],
['🍢','Sempol + Saos','Kaki Lima',220,3],['🥟','Batagor','Kaki Lima',330,5],['🍳','Martabak Telur','Kaki Lima',400,3],['🍵','Es Cincau','Kaki Lima',150,24],
['🍨','Es Pisang Ijo','Kaki Lima',320,30],['🥑','Alpukat Kocok','Kaki Lima',380,34],
['☕','Kopi Botolan Kemasan','Kemasan',180,24],['🥫','Soda Kaleng 330ml','Kemasan',140,35],['🥛','Milkshake Botolan','Kemasan',220,30],['🍪','Biskuit Sandwich Cokelat (3 pcs)','Kemasan',140,10],
['🧃','Susu UHT Rasa 200ml','Kemasan',130,18],['⚡','Minuman Isotonik 500ml','Kemasan',125,26],['🫖','RTD Milk Tea 350ml','Kemasan',190,32],['🍫','Wafer Cokelat (2 pcs)','Kemasan',130,10]];
const BG={Tradisional:['#ffd6a5','#FF6B8B'],'Kaki Lima':['#a5f3fc','#8A2BE2'],Kemasan:['#c9fff4','#fbbf24']};
let cat='Semua';const CATS=['Semua','Tradisional','Kaki Lima','Kemasan'];
const renderPills=()=>$('#pills').innerHTML=CATS.map(c=>`<button class="pill ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('');
function renderFoods(){const q=$('#q').value.trim().toLowerCase();
const rows=F.map((f,i)=>[f,i]).filter(([f])=>(cat==='Semua'||f[2]===cat)&&f[1].toLowerCase().includes(q));
$('#fg').innerHTML=rows.length?rows.map(([f,i])=>{const[c,l]=lvl(f[4]);return`<div class="card fc" data-i="${i}" tabindex="0" role="button" style="--a:${BG[f[2]][0]};--b:${BG[f[2]][1]}"><div class="em emo">${f[0]}</div><b>${f[1]}</b><small>${f[3]} kkal · ${f[4]} g (${sdt(f[4])} 🍵)</small><span class="badge ${c}">${l}</span><br><button class="mini add" data-n="${f[1]}" data-g="${f[4]}" data-k="${f[3]}">+ Catat</button></div>`}).join(''):'<p class="card pad">Tidak ketemu. Coba kata lain, atau foto makananmu di Gula Lens.</p>'}
$('#pills').addEventListener('click',e=>{const b=e.target.closest('.pill');if(b){cat=b.dataset.c;renderPills();renderFoods()}});
$('#q').addEventListener('input',renderFoods);
function openFood(e){if(e.target.closest('.add'))return;const c=e.target.closest('.fc');if(!c)return;const f=F[c.dataset.i];$('#mb').innerHTML=`<div style="text-align:center;font-size:3.5rem">${f[0]}</div>`+resultHTML(f[1],f[4],f[3],'Nilai gizi perkiraan per porsi umum.');$('#modal').hidden=false}
$('#fg').addEventListener('click',openFood);
$('#fg').addEventListener('keydown',e=>{if(e.key==='Enter')openFood(e)});
$('#mx').onclick=()=>$('#modal').hidden=true;
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.closest('.add'))$('#modal').hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#modal').hidden=true});
renderPills();renderFoods();

/* ---------- Gula Lens (AI Vision Simulator otomatis) ---------- */
let img=null,fname='';
function handleFile(f){if(!f||!f.type.startsWith('image/'))return;fname=f.name||'';const r=new FileReader();
r.onload=()=>{img=r.result;$('#prev').src=img;$('#pw').hidden=false;$('#pw').classList.add('scan');$('#lr').innerHTML='<p class="card pad">🔍 Memindai fotomu…</p>';setTimeout(analyze,2200)};r.readAsDataURL(f)}
$('#gal').onchange=e=>handleFile(e.target.files[0]);$('#cam').onchange=e=>handleFile(e.target.files[0]);
['dragover','dragenter'].forEach(v=>$('#drop').addEventListener(v,e=>{e.preventDefault();$('#drop').classList.add('on')}));
['dragleave','drop'].forEach(v=>$('#drop').addEventListener(v,e=>{e.preventDefault();$('#drop').classList.remove('on')}));
$('#drop').addEventListener('drop',e=>handleFile(e.dataTransfer.files[0]));
const hint=()=>{const n=fname.toLowerCase();return F.find(f=>f[1].toLowerCase().split(/[ (\/+]/).some(w=>w.length>3&&n.includes(w)))};
const sim=()=>new Promise(ok=>{const h=hint();if(h)return ok({n:h[1],g:h[4],k:h[3]});
const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=24;const x=c.getContext('2d');x.drawImage(im,0,0,24,24);const d=x.getImageData(0,0,24,24).data;
let R=0,G=0,B=0,S=0;const n=576;for(let i=0;i<d.length;i+=4){R+=d[i];G+=d[i+1];B+=d[i+2];S+=Math.max(d[i],d[i+1],d[i+2])-Math.min(d[i],d[i+1],d[i+2])}
R/=n;G/=n;B/=n;S/=n*255;const br=(R+G+B)/765,warm=(R-B)/255;
const g=Math.round(Math.min(60,Math.max(3,6+S*45+Math.max(0,warm)*20-br*5))),k=Math.round(g*7+60+S*80);
const nm=R>G&&R>B?(br<.4?'Makanan/minuman cokelat':'Hidangan manis hangat'):G>R&&G>B?'Hidangan hijau (cendol/sayur)':'Minuman dingin/kemasan';ok({n:nm,g,k})};im.onerror=()=>ok({n:'Makanan tidak dikenali',g:15,k:200});im.src=img});
async function analyze(){const r=await sim();$('#pw').classList.remove('scan');$('#lr').innerHTML=resultHTML(r.n,r.g,r.k,'Perkiraan otomatis dari foto (nama file, warna, dan tekstur). Bukan hasil lab.')}

/* ---------- Hydration ---------- */
const today=day;let H=load('gg_h');if(!H||H.d!==today)H={d:today,ml:0,w:(H&&H.w)||55};
const target=()=>Math.round(H.w*35/50)*50;
function renderH(){const t=target(),p=Math.min(100,Math.round(H.ml/t*100));$('#hw').value=H.w;$('#water').style.height=p+'%';$('#pct').textContent=p+'%';
$('#ht').innerHTML=`Target: <b>${t} ml</b> (±${Math.ceil(t/250)} gelas)<br>Terminum: <b>${H.ml} ml</b>${H.ml>=t?'<br>🎉 Target hari ini tercapai!':''}`;ls.set('gg_h',JSON.stringify(H))}
$('#gb').innerHTML=[['Kecil',200],['Sedang',300],['Besar',500]].map(([n,v])=>`<button data-ml="${v}"><svg viewBox="0 0 40 60" width="${20+v/20}" height="${26+v/10}"><path d="M5 4h30l-4 52H9z" fill="#c4f1ff" stroke="#00C2D1" stroke-width="3" stroke-linejoin="round"/><path d="M8 28h24l-1.5 28H9.5z" fill="#00C2D1" opacity=".7"/></svg><br>${n}<br><small>~${v} ml</small></button>`).join('');
function confetti(){for(let i=0;i<36;i++){const s=document.createElement('span');s.className='conf';s.textContent=['🎉','💧','✨','💖','🫧'][i%5];s.style.left=Math.random()*100+'vw';s.style.animationDelay=Math.random()*.8+'s';document.body.append(s);setTimeout(()=>s.remove(),3500)}}
$('#gb').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const before=H.ml>=target();H.ml+=+b.dataset.ml;renderH();if(!before&&H.ml>=target())confetti()});
$('#hw').onchange=e=>{H.w=Math.min(200,Math.max(25,+e.target.value||55));renderH()};
$('#hr').onclick=()=>{H.ml=0;renderH()};

$('#cta1').onclick=()=>$('#jelajah').scrollIntoView({behavior:'smooth'});
renderTrk();renderH();go(location.hash.slice(1)||'faktapedia');
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
  
