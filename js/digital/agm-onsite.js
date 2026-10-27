/* 디지털서비스 > 현장전자표결 — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-agm-onsite');
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
	  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
	  const pct=document.getElementById('live-pct'),bar=document.getElementById('live-bar');
	  if(!pct)return; let v=63;
	  setInterval(()=>{v=v>=88?63:v+1;pct.textContent=v+'%';bar.style.width=v+'%';},1400);
	})();
})();
