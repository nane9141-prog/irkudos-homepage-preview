/* 디지털서비스 > 프록시 서비스 — 시안 스크립트 이식 */
(function () {
	var ROOT = document.querySelector('.dg-agm-proxy');
	if (!ROOT) return;
	/* 목업 내부 더미 링크 클릭 방지 */
	ROOT.addEventListener('click', function (e) { var a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });

})();
