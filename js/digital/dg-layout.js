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
	var secs = [].slice.call(document.querySelectorAll('.ly-c:not(.ly-c--acc)'));
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

/* 레이아웃 C 아코디언형(.ly-c--acc) — 스크롤 스크럽 (2026-10-30)
 * 스크롤 진행도에 따라 항목 펼침 정도(--o 0~1)를 연속으로 계산: 단계 경계 구간에서 이전 항목이 접히는 만큼 다음 항목이 펼쳐짐
 * 표시값은 목표값을 따라가며 감속(관성) → 휠 스크롤의 끊김을 완화. 1101px 이상에서만 동작 */
(function () {
	var secs = [].slice.call(document.querySelectorAll('.ly-c--acc'));
	if (!secs.length) return;
	var mq = window.matchMedia('(min-width: 1101px)');
	var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var T = 0.4; /* 단계 구간 중 전환에 쓰는 비율 */
	function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
	function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
	var st = secs.map(function (sec) {
		var items = [].slice.call(sec.querySelectorAll('.ly-c-item'));
		return { sec: sec, track: sec.querySelector('.ly-c-track') || sec, items: items, folds: items.map(function (it) { return [].slice.call(it.querySelectorAll('.ly-c-fold')); }), cur: 0, tgt: 0 };
	});
	/* 2026-11-03: 고정 영역 높이 = 목록 높이(화면 높이 아님) → 트랙 = 목록 높이 + 단계당 스크롤 거리, 진행도는 고정이 풀리기 전까지 기준 */
	var STEP = 0.5; /* 단계당 스크롤 거리 (화면 높이 비율) */
	function target(s) {
		var r = s.track.getBoundingClientRect(), stk = s.sec.querySelector('.ly-c-sticky');
		var top = parseFloat(getComputedStyle(stk).top) || 0, range = s.track.offsetHeight - stk.offsetHeight;
		return (range > 0 ? clamp((top - r.top) / range) : 0) * (s.items.length - 1);
	}
	function size(s) {
		/* 2026-11-12: 화면에 다 안 들어오면 목록 전체(zoom)가 아니라 비주얼(.ly-c-vis)만 축소 → 제목·설명 글자 크기 유지 */
		var stk = s.sec.querySelector('.ly-c-sticky'), list = s.sec.querySelector('.ly-c-list');
		var vis = [].slice.call(s.sec.querySelectorAll('.ly-c-fold--vis .ly-c-vis'));
		s.track.style.height = ''; list.style.zoom = ''; vis.forEach(function (v) { v.style.zoom = ''; });
		function meas() {
			var cur = 0, max = 0;
			s.folds.forEach(function (fs, i) { fs.forEach(function (fd) { var h = fd.firstElementChild.scrollHeight; if (i === 0) cur = Math.max(cur, h); max = Math.max(max, h); }); });
			return [cur, max];
		}
		var m = meas(), top = parseFloat(getComputedStyle(stk).top) || 0, need = stk.offsetHeight - m[0] + m[1], avail = window.innerHeight - top - 16;
		if (need > avail && vis.length) {
			var vh = 0; vis.forEach(function (v) { vh = Math.max(vh, v.offsetHeight); });
			var z = Math.max(.7, 1 - (need - avail) / vh).toFixed(3);
			vis.forEach(function (v) { v.style.zoom = z; });
			m = meas();
		}
		s.track.style.height = Math.round(stk.offsetHeight + (m[1] - m[0]) + (s.items.length - 1) * STEP * window.innerHeight) + 'px';
	}
	function paint(s) {
		var n = s.items.length, p = s.cur, i0 = Math.floor(p), f = p - i0, best = 0, bo = -1;
		s.items.forEach(function (it, i) {
			var o;
			if (i === i0) o = 1 - ease(clamp((f - (1 - T) / 2) / T));
			else if (i === i0 + 1) o = ease(clamp((f - (1 - T) / 2) / T));
			else o = 0;
			if (i0 >= n - 1 && i === n - 1) o = 1;
			it.style.setProperty('--o', o.toFixed(4));
			s.folds[i].forEach(function (fd) {
				var inner = fd.firstElementChild;
				fd.style.height = (inner.scrollHeight * o).toFixed(1) + 'px';
				fd.style.opacity = clamp((o - .25) / .75).toFixed(3);
				if (fd.classList.contains('ly-c-fold--vis')) inner.style.transform = 'translateY(' + ((1 - o) * 32).toFixed(1) + 'px)';
			});
			if (o > bo) { bo = o; best = i; }
		});
		s.items.forEach(function (it, i) { it.classList.toggle('is-on', i === best); });
	}
	function clear(s) {
		s.sec.classList.remove('is-scrub');
		s.items.forEach(function (it, i) {
			it.style.removeProperty('--o');
			s.folds[i].forEach(function (fd) { fd.style.height = fd.style.opacity = ''; fd.firstElementChild.style.transform = ''; });
		});
	}
	var raf = 0;
	function loop() {
		raf = 0;
		var moving = false;
		st.forEach(function (s) {
			s.tgt = target(s);
			var d = s.tgt - s.cur;
			if (reduce || Math.abs(d) < .002) s.cur = s.tgt; else { s.cur += d * .2; moving = true; }
			paint(s);
		});
		if (moving) raf = requestAnimationFrame(loop);
	}
	function kick() { if (!mq.matches) return; if (!raf) raf = requestAnimationFrame(loop); }
	function setup() {
		st.forEach(function (s) {
			if (mq.matches) { s.sec.classList.add('is-scrub'); s.cur = s.tgt = 0; paint(s); size(s); s.cur = s.tgt = target(s); paint(s); }
			else { clear(s); s.track.style.height = ''; s.sec.querySelector('.ly-c-list').style.zoom = ''; [].slice.call(s.sec.querySelectorAll('.ly-c-vis')).forEach(function (v) { v.style.zoom = ''; }); }
		});
	}
	st.forEach(function (s) {
		s.items.forEach(function (it, i) {
			it.querySelector('.ly-c-h').addEventListener('click', function () {
				if (!mq.matches) return;
				var r = s.track.getBoundingClientRect(), stk = s.sec.querySelector('.ly-c-sticky');
				var top = parseFloat(getComputedStyle(stk).top) || 0, range = s.track.offsetHeight - stk.offsetHeight;
				window.scrollTo({ top: window.scrollY + r.top - top + range * i / (s.items.length - 1), behavior: 'smooth' });
			});
		});
	});
	window.addEventListener('scroll', kick, { passive: true });
	window.addEventListener('resize', setup);
	window.addEventListener('load', setup);
	setup();
})();
