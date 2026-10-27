/* 디지털서비스 > 전자주주총회 — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-agm-online');
	if (!ROOT) return;
	/* 목업 내부 더미 링크 클릭 방지 */
	ROOT.addEventListener('click', function (e) { var a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });

	/* 탭 3~5의 왼쪽(생중계·의안 진행현황)은 탭 2와 동일 — 복제해서 채움 */
	(function(){
	  const src=document.querySelector('[data-left]');
	  document.querySelectorAll('[data-fill-left]').forEach(el=>{
	    el.innerHTML=src.innerHTML.replace(/id="vg"/g,'').replace(/url\(#vg\)/g,'#1F2A52');
	  });
	  const tpl=document.getElementById('kpi-tpl');
	  document.querySelectorAll('[data-kpi]').forEach(el=>el.appendChild(tpl.content.cloneNode(true)));
	})();

	/* 탭 (탭 목록별로 독립 동작) */
	document.querySelectorAll('[role="tablist"]').forEach(list=>{
	  const tabs=[...list.querySelectorAll('[role="tab"]')];
	  function select(tab){
	    tabs.forEach(t=>{
	      const on=t===tab;
	      t.setAttribute('aria-selected',on);
	      t.tabIndex=on?0:-1;
	      const p=document.getElementById(t.getAttribute('aria-controls'));
	      p.hidden=!on;
	      if(on){p.classList.remove('anim');void p.offsetWidth;p.classList.add('anim');}
	    });
	  }
	  tabs.forEach((t,i)=>{
	    t.addEventListener('click',()=>select(t));
	    t.addEventListener('keydown',e=>{
	      let n=null;
	      if(e.key==='ArrowRight')n=tabs[(i+1)%tabs.length];
	      if(e.key==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];
	      if(n){e.preventDefault();select(n);n.focus();}
	    });
	  });
	});

	/* FOR ISSUERS 1: 기능 선택 시 화면 영역 강조 */
	(function(){
	  const adm=document.getElementById('op-adm');
	  const btns=[...document.querySelectorAll('[data-fl="op"] button')];
	  const ctrl=[...document.querySelectorAll('#ctrl .ab')];
	  const zoneOf={start:['start'],video:['video'],vote:['vote'],qna:['side'],speech:['side'],script:['script']};
	  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
	  let stepTimer=null,autoTimer=null,idx=0;
	  function steps(on){
	    clearInterval(stepTimer);ctrl.forEach(c=>c.classList.remove('cur'));
	    if(!on)return;
	    let k=0;ctrl[0].classList.add('cur');
	    if(reduce)return;
	    stepTimer=setInterval(()=>{ctrl.forEach(c=>c.classList.remove('cur'));k=(k+1)%ctrl.length;ctrl[k].classList.add('cur');},900);
	  }
	  function show(key){
	    btns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.hl===key));
	    adm.querySelectorAll('[data-z]').forEach(z=>z.classList.toggle('hl',zoneOf[key].includes(z.dataset.z)));
	    adm.querySelector('[data-side="q"]').hidden=key==='speech';
	    adm.querySelector('[data-side="s"]').hidden=key!=='speech';
	    steps(key==='vote');
	  }
	  function auto(){
	    clearInterval(autoTimer);
	    if(reduce)return;
	    autoTimer=setInterval(()=>{if(paused)return;idx=(idx+1)%btns.length;show(btns[idx].dataset.hl);},4200);
	  }
	  let paused=false;
	  const box=document.getElementById('ip1');
	  box.addEventListener('mouseenter',()=>paused=true);
	  box.addEventListener('mouseleave',()=>paused=false);
	  btns.forEach((b,i)=>b.addEventListener('click',()=>{idx=i;show(b.dataset.hl);auto();}));
	  show('start');auto();
	})();

	/* FOR ISSUERS 4: 질의 · 발언 · 전자출석 화면 전환 */
	(function(){
	  const btns=[...document.querySelectorAll('[data-fl="mg"] button')];
	  const its=[...document.querySelectorAll('#inner-tabs [data-it]')];
	  const views=[...document.querySelectorAll('#ip4 [data-v]')];
	  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
	  let idx=0,timer=null,paused=false;
	  function show(i){
	    idx=i;const k=btns[i].dataset.sub;
	    btns.forEach(x=>x.setAttribute('aria-pressed',x===btns[i]));
	    its.forEach(x=>x.classList.toggle('on',x.dataset.it===k));
	    views.forEach(v=>v.hidden=v.dataset.v!==k);
	  }
	  function auto(){
	    clearInterval(timer);
	    if(reduce)return;
	    timer=setInterval(()=>{if(!paused)show((idx+1)%btns.length);},4200);
	  }
	  const box=document.getElementById('ip4');
	  box.addEventListener('mouseenter',()=>paused=true);
	  box.addEventListener('mouseleave',()=>paused=false);
	  btns.forEach((b,i)=>b.addEventListener('click',()=>{show(i);auto();}));
	  auto();
	})();
})();
