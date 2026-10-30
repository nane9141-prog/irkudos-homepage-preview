/* 신규 페이지 공통 레이아웃 C — 스크롤 롤오버 (2026-10-30)
 * .ly-c 섹션이 화면에 고정된 동안 스크롤 진행도에 따라 .ly-c-item 을 순서대로 활성화
 * 아코디언형(.ly-c--acc)은 .ly-c-track 기준으로 진행도 계산 — 제목 영역은 일반 스크롤
 * 1100px 이하는 CSS 에서 모든 항목 펼침 (스크립트 동작 안 함) */
/* 세그먼트 탭(.dg-seg) — 버튼 data-seg ↔ 패널 data-seg-panel, 주소 #id 로 바로 열기 (2026-10-30) */
(function () {
	[].slice.call(document.querySelectorAll('.dg-seg')).forEach(function (bar) {
		var btns = [].slice.call(bar.querySelectorAll('[data-seg]'));
		var scope = bar.parentNode;
		function sel(k) {
			btns.forEach(function (b) { var on = b.getAttribute('data-seg') === k; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on); });
			[].slice.call(scope.querySelectorAll('[data-seg-panel]')).forEach(function (p) { p.hidden = p.getAttribute('data-seg-panel') !== k; });
		}
		btns.forEach(function (b) { b.addEventListener('click', function () { sel(b.getAttribute('data-seg')); }); });
		function fromHash() { var h = location.hash.slice(1); if (h && scope.querySelector('[data-seg-panel="' + h + '"]')) { sel(h); bar.scrollIntoView({ block: 'start' }); } }
		window.addEventListener('hashchange', fromHash); fromHash();
	});
})();
(function () {
	var secs = [].slice.call(document.querySelectorAll('.ly-c'));
	if (!secs.length) return;
	var mq = window.matchMedia('(min-width: 1101px)');
	/* 패널형: 활성 패널이 고정 화면 높이를 넘으면 축소(zoom) */
	function fit(sec) {
		var on = sec.querySelector('.ly-c-item.is-on .ly-c-pnl'), st = sec.querySelector('.ly-c-sticky > .wrap');
		if (!on || !st) return;
		on.style.zoom = 1;
		var over = st.scrollHeight - sec.querySelector('.ly-c-sticky').clientHeight + 24;
		if (over > 0) on.style.zoom = Math.max(.6, (on.offsetHeight - over) / on.offsetHeight);
	}
	function update() {
		if (!mq.matches) return;
		secs.forEach(function (sec) {
			var items = sec.querySelectorAll('.ly-c-item'), n = items.length;
			var r = (sec.querySelector('.ly-c-track') || sec).getBoundingClientRect(), range = r.height - window.innerHeight;
			var p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
			var idx = Math.min(n - 1, Math.floor(p * n));
			for (var i = 0; i < n; i++) items[i].classList.toggle('is-on', i === idx);
			if (sec.classList.contains('ly-c--panel') && sec._idx !== idx) { sec._idx = idx; fit(sec); }
		});
	}
	secs.forEach(function (sec) {
		[].slice.call(sec.querySelectorAll('.ly-c-item')).forEach(function (it, i, all) {
			it.querySelector('.ly-c-h').addEventListener('click', function () {
				if (!mq.matches) return;
				var r = (sec.querySelector('.ly-c-track') || sec).getBoundingClientRect(), range = r.height - window.innerHeight;
				window.scrollTo({ top: window.scrollY + r.top + range * (i + .5) / all.length, behavior: 'smooth' });
			});
		});
	});
	window.addEventListener('scroll', update, { passive: true });
	window.addEventListener('resize', function () { secs.forEach(function (s) { s._idx = -1; }); update(); });
	update();
})();
