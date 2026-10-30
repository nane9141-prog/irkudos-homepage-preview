/* 디지털서비스 > IR 컨퍼런스콜 — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-conference-call');
	if (!ROOT) return;
	/* 목업 내부 더미 링크 클릭 방지 */
	ROOT.addEventListener('click', function (e) { var a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });

	const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.15});
	ROOT.classList.add('js-rv');
	document.querySelectorAll('.rv').forEach(el=>io.observe(el));

	const tabs=[...document.querySelectorAll('.tab')];
	tabs.forEach(t=>t.addEventListener('click',()=>{
	  tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);const p=document.getElementById(x.getAttribute('aria-controls'));p.hidden=!on;if(on){p.classList.remove('anim');void p.offsetWidth;p.classList.add('anim')}});
	}));
})();
