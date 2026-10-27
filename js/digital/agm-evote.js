/* 디지털서비스 > 전자투표/전자위임 — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-agm-evote');
	if (!ROOT) return;
	/* 목업 내부 더미 링크 클릭 방지 */
	ROOT.addEventListener('click', function (e) { var a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });

	(function(){
	  const tabs=[...document.querySelectorAll('[role="tab"]')];
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
	})();

	// 주주총회 설정 화면 자동 전환
	(function(){
	  const box=document.getElementById('cxSetup'); if(!box) return;
	  const screens=[...box.querySelectorAll('.cx-screen')];
	  const side=[...box.querySelectorAll('.cx-side span')];
	  const panel=document.getElementById('p2');
	  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	  let k=0;
	  function show(n){
	    k=n; const idx=+screens[n].dataset.s;
	    screens.forEach((el,j)=>el.classList.toggle('on',j===n));
	    side.forEach((el,j)=>{el.classList.toggle('on',j===idx);el.classList.toggle('done',j<idx);});
	    const c=document.getElementById('cxCrumb'); if(c) c.textContent=side[idx].textContent;
	  }
	  show(0);
	  if(reduce) return;
	  setInterval(()=>{ if(!panel.hidden) show((k+1)%screens.length); },3200);
	})();

	// 행사 현황 화면 전환
	(function(){
	  const st=document.getElementById('liveStage'); if(!st) return;
	  const sc=[...st.querySelectorAll('.live-screen')];
	  const hs=[...document.querySelectorAll('.live-h')];
	  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	  let k=0;
	  setInterval(()=>{k=1-k;sc.forEach((e,j)=>e.classList.toggle('on',j===k));hs.forEach((e,j)=>e.classList.toggle('on',j===k));},4000);
	})();
})();
