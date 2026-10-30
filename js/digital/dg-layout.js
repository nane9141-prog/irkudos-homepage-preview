/* 신규 페이지 공통 레이아웃 C — 스크롤 롤오버 (2026-10-30)
 * .ly-c 섹션이 화면에 고정된 동안 스크롤 진행도에 따라 .ly-c-item 을 순서대로 활성화
 * 1100px 이하는 CSS 에서 모든 항목 펼침 (스크립트 동작 안 함) */
(function () {
	var secs = [].slice.call(document.querySelectorAll('.ly-c'));
	if (!secs.length) return;
	var mq = window.matchMedia('(min-width: 1101px)');
	function update() {
		if (!mq.matches) return;
		secs.forEach(function (sec) {
			var items = sec.querySelectorAll('.ly-c-item'), n = items.length;
			var r = sec.getBoundingClientRect(), range = r.height - window.innerHeight;
			var p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
			var idx = Math.min(n - 1, Math.floor(p * n));
			for (var i = 0; i < n; i++) items[i].classList.toggle('is-on', i === idx);
		});
	}
	secs.forEach(function (sec) {
		[].slice.call(sec.querySelectorAll('.ly-c-item')).forEach(function (it, i, all) {
			it.querySelector('.ly-c-h').addEventListener('click', function () {
				if (!mq.matches) return;
				var r = sec.getBoundingClientRect(), range = r.height - window.innerHeight;
				window.scrollTo({ top: window.scrollY + r.top + range * (i + .5) / all.length, behavior: 'smooth' });
			});
		});
	});
	window.addEventListener('scroll', update, { passive: true });
	window.addEventListener('resize', update);
	update();
})();
