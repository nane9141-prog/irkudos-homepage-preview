/* 디지털서비스 > 주주우대 서비스 — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-perks');
	if (!ROOT) return;
	/* 목업 내부 더미 링크 클릭 방지 */
	ROOT.addEventListener('click', function (e) { var a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });

	/* 주주우대 MTS / Page 탭 (2026-10-30) */
	var btns = [].slice.call(ROOT.querySelectorAll('.trk-tabs [data-trk]'));
	var panels = [].slice.call(ROOT.querySelectorAll('[data-trk-panel]'));
	function sel(k) {
		btns.forEach(function (b) { var on = b.getAttribute('data-trk') === k; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on); });
		panels.forEach(function (p) { p.hidden = p.getAttribute('data-trk-panel') !== k; });
	}
	btns.forEach(function (b) { b.addEventListener('click', function () { sel(b.getAttribute('data-trk')); }); });
	if (location.hash === '#page') sel('page');

})();
