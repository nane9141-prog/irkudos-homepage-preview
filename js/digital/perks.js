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
	/* 2026-11-13: 탭 sticky 제거. 탭 끝 "다른 방식 보기" 클릭 시 탭 위치로 이동 */
	var tabs = ROOT.querySelector('.trk-tabs');
	function topOf() { var h = document.querySelector('#header, header'); var off = (h ? h.getBoundingClientRect().height : 0) + 24; return tabs.getBoundingClientRect().top + window.pageYOffset - off; }
	function go(k) { sel(k); }
	btns.forEach(function (b) { b.addEventListener('click', function () { go(b.getAttribute('data-trk')); }); });
	var names = { mts: '주주우대 MTS', page: '주주우대 Page' };
	panels.forEach(function (p) {
		var k = p.getAttribute('data-trk-panel'), other = k === 'mts' ? 'page' : 'mts';
		var box = document.createElement('div'); box.className = 'trk-next';
		box.innerHTML = '<span>' + (k === 'mts' ? '기업 홈페이지 기반으로 운영하려면' : '증권사 MTS로 제공하려면') + '</span><button type="button">' + names[other] + ' 보기 <i aria-hidden="true">→</i></button>';
		box.querySelector('button').addEventListener('click', function () { sel(other); window.scrollTo({ top: topOf(), behavior: 'smooth' }); });
		p.appendChild(box);
	});
	if (location.hash === '#page') sel('page');

})();
