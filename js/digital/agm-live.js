/* 디지털서비스 > 주주총회 생중계 — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-agm-live');
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

	/* 실시간 자막 언어 전환 예시 */
	(function(){
	  const T={
	    ko:'의결권 있는 발행주식총수의 과반수가 출석하여 본 주주총회가 적법하게 성립되었음을 선언합니다.',
	    en:'With a majority of the total issued voting shares present, this General Meeting of Shareholders is hereby declared duly convened.',
	    ja:'議決権のある発行済株式総数の過半数が出席し、本株主総会が適法に成立したことを宣言いたします。',
	    zh:'有表决权的已发行股份总数过半数出席，现宣布本次股东大会合法成立。'
	  };
	  const NAME={ko:'한국어',en:'English',ja:'日本語',zh:'中文'};
	  const cap=document.getElementById('cap'),btns=[...document.querySelectorAll('.lang')];
	  if(!cap)return;
	  let idx=0,timer=null;
	  function show(i){
	    idx=i;const l=btns[i].dataset.l;
	    btns.forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
	    cap.style.opacity=0;
	    setTimeout(()=>{cap.textContent=T[l];cap.style.opacity=1;const c=document.getElementById('cur-lang');if(c)c.textContent=NAME[l];},200);
	  }
	  btns.forEach((b,i)=>b.addEventListener('click',()=>{show(i);clearInterval(timer);}));
	  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
	    timer=setInterval(()=>show((idx+1)%btns.length),2800);
	  }
	})();
})();
