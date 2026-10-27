/* 디지털서비스 > 주주우대 Page — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-perks-page');
	if (!ROOT) return;
	/* 목업 내부 더미 링크 클릭 방지 */
	ROOT.addEventListener('click', function (e) { var a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });

	(function(){
	  const st=document.querySelector('.pg-stage'); if(!st) return;
	  const scr=[...st.querySelectorAll('.scr')], tap=st.querySelector('.tap'), url=document.querySelector('.pg-url');
	  const steps=[...document.querySelectorAll('.pg-steps li')], sc=st.querySelector('.pg-scroll');
	  function show(i){scr.forEach((s,k)=>{s.classList.toggle('on',k===i);s.classList.toggle('out',k<i);});url.textContent=i?'www.company.co.kr/shareholder':'www.company.co.kr';}
	  function step(i){steps.forEach((s,k)=>s.classList.toggle('on',k===i));}
	  function tapAt(el){const r=el.getBoundingClientRect(),p=st.getBoundingClientRect();st.style.setProperty('--tx',(r.left-p.left+r.width/2)+'px');st.style.setProperty('--ty',(r.top-p.top+r.height/2)+'px');tap.classList.remove('go');void tap.offsetWidth;tap.classList.add('go');}
	  if(matchMedia('(prefers-reduced-motion: reduce)').matches){show(1);sc.classList.add('down');step(2);return;}
	  const wait=ms=>new Promise(r=>setTimeout(r,ms));
	  (async function(){for(;;){
	    sc.classList.remove('down'); show(0); step(0); await wait(1600);
	    step(1); tapAt(st.querySelector('.pg-menu')); await wait(650); show(1); await wait(1300);
	    step(2); sc.classList.add('down'); await wait(3200);
	  }})();
	})();
})();
