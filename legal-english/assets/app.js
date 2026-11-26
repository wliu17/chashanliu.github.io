(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')};
var md=function(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')};
var CJK=/[㐀-鿿]/g;
function isZh(t){var m=t.match(CJK);return !!m&&m.length>t.replace(/\s/g,'').length*0.3}
var ABBR=/\b(e\.g|i\.e|U\.S|vs|v|etc|cf|ch|no|Mr|Mrs|Dr|St|Ms|Art|Arts|Inc)\./gi;
function split(t){
  var p=t.replace(ABBR,function(m){return m.replace(/\./g,'\u0001')});
  var parts=p.split(/(?<=[.?!”\]])\s+(?=[A-Z“"‘'(一-鿿¶])|(?<=[。？！；])/);
  return parts.map(function(x){return x.replace(/\u0001/g,'.').trim()}).filter(Boolean);
}
var save=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
var load=function(k){try{return localStorage.getItem(k)}catch(e){return null}};
var theme=load('lel_theme');if(theme)document.documentElement.dataset.theme=theme;

/* ---------- speech ---------- */
var synth=window.speechSynthesis,voices=[],token=0,cur=null;
function say(msg){var st=$('#status');if(!st)return;st.textContent=msg;st.style.display='block';clearTimeout(say.t);say.t=setTimeout(function(){st.style.display='none'},3500)}
function loadVoices(){
  var sel=$('#voice');if(!synth||!sel)return;voices=synth.getVoices();
  var en=voices.filter(function(v){return /^en/i.test(v.lang)}),old=sel.value;
  sel.innerHTML=en.map(function(v){return '<option value="'+esc(v.name)+'">'+esc(v.name.replace(/Microsoft |Google /,''))+' ('+v.lang+')</option>'}).join('');
  var pref=en.filter(function(v){return /Natural|Online|Google US|Samantha|Daniel|Aria|Jenny/i.test(v.name)})[0]||en.filter(function(v){return v.lang==='en-US'})[0]||en[0];
  var saved=load('lel_voice');
  if(old&&en.some(function(v){return v.name===old}))sel.value=old;
  else if(saved&&en.some(function(v){return v.name===saved}))sel.value=saved;
  else if(pref)sel.value=pref.name;
}
function pick(lang){
  if(lang==='zh'){var z=voices.filter(function(v){return /^zh/i.test(v.lang)});return z.filter(function(v){return /CN|cmn|Hans/i.test(v.lang)})[0]||z[0]||null}
  var s=$('#voice');if(!s)return null;return voices.filter(function(v){return v.name===s.value})[0]||null;
}
function stop(){token++;if(synth)synth.cancel();if(cur){cur.classList.remove('playing');cur=null}}
function textOf(el){return el.textContent.replace(/¶/g,'paragraph ').replace(/\s+/g,' ').trim()}
function speakList(els,i,tk){
  if(tk!==token||i>=els.length||!synth)return;
  var el=els[i],lang=el.dataset.lang==='zh'?'zh':'en';
  var u=new SpeechSynthesisUtterance(textOf(el)),v=pick(lang);
  if(v){u.voice=v;u.lang=v.lang}else u.lang=lang==='zh'?'zh-CN':'en-US';
  if(lang==='zh'&&!v)say('No Chinese voice installed on this device. 本设备未安装中文语音。');
  var r=$('#rate');u.rate=r?(parseFloat(r.value)||1):1;
  if(cur)cur.classList.remove('playing');cur=el;el.classList.add('playing');
  u.onend=function(){if(tk!==token)return;el.classList.remove('playing');if(i+1<els.length)speakList(els,i+1,tk)};
  u.onerror=function(){if(tk===token)el.classList.remove('playing')};
  synth.speak(u);
}
function playEls(els){if(!synth){say('Speech is not supported in this browser. 当前浏览器不支持朗读。');return}stop();var tk=token;setTimeout(function(){speakList(els,0,tk)},60)}
function speakWord(txt,lang){var el=document.createElement('span');el.dataset.lang=lang;el.textContent=txt;playEls([el])}

/* ---------- shared header ---------- */
function headerHTML(title,sub,tabs){
  return '<a class="home" href="index.html">☰ Collection 总目录</a><h1>'+esc(title)+'<small>'+esc(sub)+'</small></h1>'+(tabs||'')+
  '<div class="ctl"><label>Voice <select id="voice" aria-label="English voice"></select></label>'+
  '<label>Speed <select id="rate" aria-label="Speed"><option value="0.7">0.7×</option><option value="0.85">0.85×</option><option value="1" selected>1×</option><option value="1.15">1.15×</option></select></label>'+
  '<button id="readon" aria-pressed="false" title="After one sentence, keep reading on">Read on 连读</button><button id="stop">■ Stop</button><button id="zhBtn" aria-pressed="true">中文</button><button id="themeBtn" aria-label="Toggle dark mode">◐</button></div>';
}
function wireHeader(){
  loadVoices();if(synth)synth.onvoiceschanged=loadVoices;
  $('#voice').addEventListener('change',function(){save('lel_voice',this.value)});
  $('#stop').onclick=stop;
  $('#readon').onclick=function(){this.setAttribute('aria-pressed',String(this.getAttribute('aria-pressed')!=='true'))};
  $('#zhBtn').onclick=function(){var on=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',String(on));document.body.classList.toggle('nozh',!on)};
  $('#themeBtn').onclick=function(){var d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=n;save('lel_theme',n)};
  window.addEventListener('beforeunload',stop);
  if(!synth)setTimeout(function(){say('This browser has no speech support. Try Chrome, Edge or Safari. 当前浏览器不支持朗读。')},400);
}
function bindCommon(){
  document.addEventListener('keydown',function(e){
    if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('s')){e.preventDefault();e.target.click()}
    if(e.key==='Escape'){stop();var p=$('#pop');if(p)p.style.display='none'}
  });
}

/* ---------- collection index ---------- */
function initIndex(){
  var C=window.COLLECTION||[],nav=$('#units');
  nav.innerHTML=C.map(function(u){
    if(u.soon)return '<div class="ucard soon"><span class="n">Unit '+u.unit+'</span><h3>'+esc(u.title)+'</h3><p>Not added yet. 尚未收录。</p></div>';
    return '<div class="ucard"><span class="n">Unit '+u.unit+' · '+u.sections+' sections</span><h3>'+esc(u.title)+'</h3><span class="zhn">'+esc(u.zh)+'</span><p>'+esc(u.summary)+'</p>'+
    '<p><b>Text A</b> '+esc(u.A.title)+(u.A.full?'<span class="tag full">full text</span>':'<span class="tag">annotations</span>')+'<br><b>Text B</b> '+esc(u.B.title)+(u.B.full?'<span class="tag full">full text</span>':'<span class="tag">annotations</span>')+'</p>'+
    '<div class="links"><a href="unit'+u.unit+'.html#A">Open Text A</a><a href="unit'+u.unit+'.html#B">Open Text B</a><a href="unit'+u.unit+'.html#G">Glossary</a></div></div>';
  }).join('');
  var th=$('#themeBtn');if(th)th.onclick=function(){var d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=n;save('lel_theme',n)};
}

/* ---------- global glossary ---------- */
function initGlossary(){
  $('header.top').innerHTML=headerHTML('Collection glossary 总术语表','All units · click to hear · 点击朗读');
  var U=window.UNITS||{},rows=[];
  Object.keys(U).sort(function(a,b){return a-b}).forEach(function(n){['A','B'].forEach(function(t){(U[n].texts[t].glossary||[]).forEach(function(r){rows.push([r[0],r[1],'Unit '+n+' · Text '+t+(r[2]?' · '+r[2]:''),n])})})});
  rows.sort(function(a,b){return a[0].toLowerCase()<b[0].toLowerCase()?-1:1});
  $('#main').innerHTML='<div class="wrap"><div class="hero"><h2>Collection glossary 总术语表</h2><p>'+rows.length+' key terms from every unit. Search in English or Chinese. 可用中英文搜索。</p></div><input type="search" id="gq" placeholder="Search 搜索 …"><table class="gl"><thead><tr><th>English</th><th>中文</th><th>Where 出现</th></tr></thead><tbody>'+rows.map(function(r){return '<tr><td><span class="say" data-say="'+esc(r[0].replace(/\(.*?\)/g,'').split(/[\/;]/)[0].trim())+'">🔊 '+esc(r[0])+'</span></td><td><span class="zh" style="cursor:pointer" data-sayzh="'+esc(r[1])+'">'+esc(r[1])+'</span></td><td><a href="unit'+r[3]+'.html">'+esc(r[2])+'</a></td></tr>'}).join('')+'</tbody></table></div>';
  $('#gq').addEventListener('input',function(e){var q=e.target.value.toLowerCase();document.querySelectorAll('table.gl tbody tr').forEach(function(r){r.classList.toggle('hidden',!!q&&r.textContent.toLowerCase().indexOf(q)<0)})});
  wireHeader();bindCommon();
  document.addEventListener('click',function(e){var w=e.target.closest('[data-say]');if(w){speakWord(w.dataset.say,'en');return}var z=e.target.closest('[data-sayzh]');if(z)speakWord(z.dataset.sayzh,'zh')});
}

/* ---------- unit page ---------- */
function initUnit(){
  var N=document.body.dataset.unit,D=(window.UNITS||{})[N];
  if(!D){$('#main').innerHTML='<div class="wrap"><p>Data not found.</p></div>';return}
  var P=(window.PASSAGES||{})[N]||{};
  var TERMIDX={},view=(location.hash||'').replace('#','').toUpperCase();
  if(['A','B','G'].indexOf(view)<0)view='A';
  var main=$('#main'),side=$('#side'),KEY='lel_u'+N+'_';
  var DONE={};try{DONE=JSON.parse(load(KEY+'done')||'{}')}catch(e){}
  ['A','B'].forEach(function(t){D.texts[t].sections.forEach(function(s){s.t=t;
    s.terms.forEach(function(tm){
      tm[0].replace(/\(.*?\)/g,' ').split(/[\/;]/).forEach(function(x){x=x.trim();if(x.length>2)TERMIDX[t+s.id+'|'+x.toLowerCase()]=tm});
    });
    var pass=(P[t]||{});var own=(s.paras||[]).map(function(id){return pass[id]}).filter(Boolean);
    if(own.length&&!s.passage)s.passage=own;
  })});
  var tabs='<div class="tabs" role="tablist"><button role="tab" id="tabA">Text A 甲篇</button><button role="tab" id="tabB">Text B 乙篇</button><button role="tab" id="tabG">Glossary 术语表</button></div>';
  $('header.top').innerHTML=headerHTML('Unit '+D.unit+' · '+D.title.replace(/^Unit \d+ · /,''),D.zh+' · Interactive study guide with audio',tabs);
  document.title='Unit '+D.unit+' · '+D.title.replace(/^Unit \d+ · /,'')+' · Legal English';
  wireHeader();bindCommon();

  function termRegex(sec){
    var ks=[];sec.terms.forEach(function(t){t[0].replace(/\(.*?\)/g,' ').split(/[\/;]/).forEach(function(x){x=x.trim();if(x.length>2&&/^[A-Za-z0-9' .\-éāēō]+$/.test(x))ks.push(x)})});
    ks.sort(function(a,b){return b.length-a.length});
    if(!ks.length)return null;
    return new RegExp('(?<![A-Za-z])('+ks.map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}).join('|')+')(?:s|es|ed|ing)?(?![A-Za-z])','gi');
  }
  function sentHTML(txt,sec,rx){
    var h=esc(txt);
    if(rx)h=h.replace(rx,function(m,k){var t=TERMIDX[sec.t+sec.id+'|'+k.toLowerCase()];if(!t)return m;return '<mark class="term" data-sec="'+sec.t+sec.id+'" data-k="'+esc(k.toLowerCase())+'">'+m+'</mark>'});
    return h.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
  }
  function sentences(txt,sec,rx){
    return split(txt).map(function(s){return '<span class="s" role="button" tabindex="0" data-lang="'+(isZh(s)?'zh':'en')+'">'+sentHTML(s,sec,rx)+'</span>'}).join(' ');
  }
  function introHTML(t){
    var T=D.texts[t],h='<div class="hero"><h2>Text '+t+' · '+esc(T.title)+' '+esc(T.zh)+'</h2>';
    if(T.intro)h+=T.intro.map(function(x){return '<p>'+md(x)+'</p>'}).join('');
    else{h+='<p>'+(T.source?'<b>Source:</b> '+esc(T.source)+'. ':'')+'<b>Genre:</b> '+esc(T.genre)+'. '+esc(T.readFor||'')+'</p>';if(T.idea)h+='<p><b>The idea in one line.</b> '+esc(T.idea)+'</p>'}
    var full=T.sections.every(function(s){return s.passage&&s.passage.length});
    if(!full)h+='<div class="notice"><b>About this text.</b> The original wording is not reproduced on this page. Each section gives the paragraph number from your handout, and the Plain English version, written in new words, can be read aloud. To hear the original, paste the handout paragraph into the box in each section; it stays in your browser and is never uploaded. 本篇原文不在本页收录；请对照讲义段落阅读，并可在“粘贴讲义原文”框中粘贴段落点句朗读（仅保存在本机浏览器）。</div>';
    var map=T.map||[];
    if(map.length){h+='<table class="map"><thead><tr><th>Step</th><th>Move</th><th>Section</th></tr></thead><tbody>'+map.map(function(r){return '<tr><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td><td><a href="#'+esc(r[2])+'" data-go="'+esc(r[2])+'">'+esc(r[2])+'</a></td></tr>'}).join('')+'</tbody></table>'}
    return h+'</div>';
  }
  function secHTML(s){
    var rx=termRegex(s),id=s.id,h='<section class="sec" id="'+id+'"><h3><span class="badge">'+id+'</span>'+esc(s.title)+'</h3><div class="grid"><div class="col">';
    if(s.passage&&s.passage.length){
      h+='<div class="card passage"><h4>Passage <span class="zh">原文</span><button class="say play" data-play="1">▶ Play all</button></h4>'+s.passage.map(function(p){return '<p>'+sentences(p,s,rx)+'</p>'}).join('')+'</div>';
    }else{
      h+='<div class="card passage"><h4>Passage <span class="zh">原文位置</span><button class="say play" data-play="1">▶ Play pasted text</button></h4><p class="locator">'+md(s.locator||'')+'</p><textarea data-paste="'+id+'" placeholder="Paste this paragraph from your handout here to hear it read aloud. 在此粘贴讲义原文，即可点句朗读（仅保存在本机浏览器）。" aria-label="Paste handout paragraph"></textarea><div class="pasted"></div></div>';
    }
    h+='<div class="card plain"><h4>Plain English <span class="zh">白话改写</span><button class="say play" data-play="1">▶ Play all</button></h4><p>'+sentences(s.plain,s,rx)+'</p></div></div><div class="col">';
    h+='<div class="card"><h4>Annotations <span class="zh">注释</span><button class="say play" data-play="1">▶ Play all</button></h4>'+s.notes.map(function(n){return '<div class="note">'+(n[0]?'<b class="nt s" role="button" tabindex="0" data-lang="'+(isZh(n[0].replace(/[A-Za-z\s]+/g,''))?'en':'en')+'">'+esc(n[0])+'</b>':'')+'<div>'+sentences(n[1],s,rx)+'</div></div>'}).join('')+'</div>';
    h+='<div class="card"><h4>Key terms <span class="zh">关键术语</span></h4><div class="terms">'+s.terms.map(function(t){return '<div class="tcard"><span class="en" data-say="'+esc(t[0].replace(/\(.*?\)/g,'').split(/[\/;]/)[0].trim())+'" title="Click to hear">'+esc(t[0])+' 🔊</span><span class="zh" data-sayzh="'+esc(t[1].split(/[；;]/)[0])+'" title="点击朗读">'+esc(t[1])+'</span><div class="ex">'+esc(t[2])+'</div></div>'}).join('')+'</div></div>';
    h+='<div class="card"><details class="check"><summary>Check yourself 自测</summary><p>'+sentences(s.check,s,null)+'</p><textarea data-ans="'+id+'" placeholder="Write your answer (saved on this device) 写下你的答案（仅保存在本机）" aria-label="Your answer"></textarea></details></div>';
    return h+'</div></div></section>';
  }
  function glossHTML(){
    var h='<div class="hero"><h2>Glossary · 术语表</h2><p>All key terms in Unit '+N+'. Click an English term or a Chinese equivalent to hear it. 点击英文或中文即可朗读。 <a href="glossary.html">All units 总术语表 →</a></p></div><input type="search" id="gq" placeholder="Search 搜索 …">';
    ['A','B'].forEach(function(t){
      h+='<h3 style="font-family:Cambria,serif;color:var(--navy)">Text '+t+' · '+esc(D.texts[t].title)+'</h3><table class="gl"><thead><tr><th>English</th><th>中文</th><th>Where 出现</th></tr></thead><tbody>'+(D.texts[t].glossary||[]).map(function(r){return '<tr><td><span class="say" data-say="'+esc(r[0].replace(/\(.*?\)/g,'').split(/[\/;]/)[0].trim())+'">🔊 '+esc(r[0])+'</span></td><td><span class="zh" style="cursor:pointer" data-sayzh="'+esc(r[1].split(/[；;]/)[0])+'">'+esc(r[1])+'</span></td><td>'+esc(r[2]||'')+'</td></tr>'}).join('')+'</tbody></table>';
    });
    return h;
  }
  function pager(){
    var C=(window.COLLECTION||[]).filter(function(u){return !u.soon}),i=C.findIndex(function(u){return String(u.unit)===String(N)}),h='<div class="pager">';
    h+=i>0?'<a href="unit'+C[i-1].unit+'.html">← Unit '+C[i-1].unit+' '+esc(C[i-1].zh)+'</a>':'<span></span>';
    h+=i>=0&&i<C.length-1?'<a href="unit'+C[i+1].unit+'.html">Unit '+C[i+1].unit+' '+esc(C[i+1].zh)+' →</a>':'<span></span>';
    return h+'</div>';
  }
  function render(){
    stop();
    ['A','B','G'].forEach(function(t){$('#tab'+t).setAttribute('aria-selected',String(t===view))});
    if(view==='G'){side.innerHTML='';main.innerHTML='<div class="wrap">'+glossHTML()+pager()+'</div>';
      $('#gq').addEventListener('input',function(e){var q=e.target.value.toLowerCase();document.querySelectorAll('table.gl tbody tr').forEach(function(r){r.classList.toggle('hidden',!!q&&r.textContent.toLowerCase().indexOf(q)<0)})});window.scrollTo(0,0);return}
    var list=D.texts[view].sections;
    side.innerHTML='<h2>Text '+view+'</h2>'+list.map(function(s){return '<a href="#'+s.id+'" data-id="'+s.id+'" class="'+(DONE[view+s.id]?'done':'')+'"><b>'+s.id+'</b><span>'+esc(s.title)+'</span></a>'}).join('');
    main.innerHTML=introHTML(view)+list.map(secHTML).join('')+pager();
    list.forEach(function(s){var a=$('textarea[data-ans="'+s.id+'"]');if(a){a.value=load(KEY+'ans_'+view+s.id)||'';a.addEventListener('input',function(){save(KEY+'ans_'+view+s.id,a.value)})}});
    window.scrollTo(0,0);
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)document.querySelectorAll('nav.side a').forEach(function(a){a.classList.toggle('on',a.dataset.id===e.target.id)})})},{rootMargin:'-20% 0px -70% 0px'});document.querySelectorAll('.sec').forEach(function(s){io.observe(s)})}
  }
  document.addEventListener('click',function(e){
    var t=e.target,pop=$('#pop'),m=t.closest('mark.term');
    if(m){var tm=TERMIDX[m.dataset.sec+'|'+m.dataset.k];if(tm){pop.innerHTML='<b>'+esc(tm[0])+'</b><span class="zh">'+esc(tm[1])+'</span>'+esc(tm[2]);var r=m.getBoundingClientRect();pop.style.display='block';pop.style.left=Math.max(8,Math.min(r.left,innerWidth-320))+'px';pop.style.top=Math.min(r.bottom+6,innerHeight-170)+'px'}}
    else if(!t.closest('#pop'))pop.style.display='none';
    var sEl=t.closest('.s');
    if(sEl){var card=sEl.closest('.card'),all=[].slice.call(card.querySelectorAll('.s')),idx=all.indexOf(sEl);playEls($('#readon').getAttribute('aria-pressed')==='true'?all.slice(idx):[sEl]);return}
    var pb=t.closest('[data-play]');
    if(pb){var els=[].slice.call(pb.closest('.card').querySelectorAll('.s'));if(!els.length){say('Nothing to play yet. Paste the handout paragraph first. 请先粘贴原文。');return}playEls(els);return}
    var w=t.closest('[data-say]');if(w){speakWord(w.dataset.say,'en');return}
    var z=t.closest('[data-sayzh]');if(z){speakWord(z.dataset.sayzh,'zh');return}
    var go=t.closest('[data-go]');if(go){e.preventDefault();var el=document.getElementById(go.dataset.go);if(el)el.scrollIntoView()}
    var sd=t.closest('nav.side a');if(sd){DONE[view+sd.dataset.id]=1;save(KEY+'done',JSON.stringify(DONE));sd.classList.add('done')}
  });
  document.addEventListener('input',function(e){
    var ta=e.target.closest&&e.target.closest('textarea[data-paste]');if(!ta)return;
    var sec=D.texts[view].sections.filter(function(x){return x.id===ta.dataset.paste})[0],box=ta.parentNode.querySelector('.pasted');
    box.innerHTML=ta.value.trim()?'<hr><p style="font:1.05rem/1.8 Cambria,Georgia,serif">'+sentences(ta.value.replace(/\s*\n+\s*/g,' '),sec,termRegex(sec))+'</p>':'';
  });
  $('#tabA').onclick=function(){view='A';history.replaceState(null,'','#A');render()};
  $('#tabB').onclick=function(){view='B';history.replaceState(null,'','#B');render()};
  $('#tabG').onclick=function(){view='G';history.replaceState(null,'','#G');render()};
  render();
}
document.addEventListener('DOMContentLoaded',function(){
  var pg=document.body.dataset.page;
  if(pg==='index')initIndex();else if(pg==='glossary')initGlossary();else initUnit();
});
})();

;(function(){function hh(){var h=document.querySelector('header.top');if(h)document.documentElement.style.setProperty('--hh',h.offsetHeight+'px')}window.addEventListener('resize',hh);window.addEventListener('load',hh);setTimeout(hh,50);setTimeout(hh,500);document.addEventListener('click',function(){setTimeout(hh,0)})})();
