/* 디지털서비스 > 주주우대 MTS — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-perks-mts');
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
	(function(){
	  const ph=document.querySelector('.demo-ph'); if(!ph) return;
	  const scr=[...ph.querySelectorAll('.scr')], tap=ph.querySelector('.tap');
	  const steps=[...document.querySelectorAll('.demo-steps li')], dots=[...document.querySelectorAll('.bk-dots span')];
	  const names=['A','B','C']; let b=0;
	  function show(i){scr.forEach((s,k)=>{s.classList.toggle('on',k===i);s.classList.toggle('out',k<i);});steps.forEach((s,k)=>s.classList.toggle('on',k===i));}
	  function broker(n){ph.querySelectorAll('.bk').forEach(e=>e.textContent=names[n]+'증권');ph.querySelector('.bk-l').textContent=names[n];dots.forEach((d,k)=>d.classList.toggle('on',k===n));}
	  function tapAt(el){const r=el.getBoundingClientRect(),p=ph.getBoundingClientRect();ph.style.setProperty('--tx',(r.left-p.left+r.width/2)+'px');ph.style.setProperty('--ty',(r.top-p.top+r.height/2)+'px');tap.classList.remove('go');void tap.offsetWidth;tap.classList.add('go');}
	  if(matchMedia('(prefers-reduced-motion: reduce)').matches){show(1);return;}
	  const wait=ms=>new Promise(r=>setTimeout(r,ms));
	  async function loop(){
	    for(;;){
	      broker(b); show(0); await wait(1500);
	      tapAt(ph.querySelector('.br-app i')); await wait(650); show(1); await wait(1600);
	      tapAt(ph.querySelector('.mi.pk')); await wait(650); show(2); await wait(2600);
	      b=(b+1)%names.length;
	    }
	  }
	  loop();
	})();
})();
