$(function(){
	

	/* m21 */
	
	m21sec1wrap = document.querySelector('.m21 .sec1');

	/* 2026-10-29: 현재 상단 라벨만 노출 (옆으로 돌아간 라벨의 흰 마스크가 원 점선을 가리는 문제) — ul[data-step] */
	var m21ul = document.querySelector('.m21 .sec1 .circle ul');
	function m21SetStep(p){
		var step = p < 1/3 ? 0 : (p < 2/3 ? 1 : 2);
		if (m21ul && m21ul.getAttribute('data-step') !== String(step)) m21ul.setAttribute('data-step', step);
	}
	m21SetStep(0);

	let m21sec1 = gsap.timeline({
		onUpdate: function(){ m21SetStep(this.progress()); },
		scrollTrigger: {
			trigger: m21sec1wrap,
			start: "top top",
			end: "+=200%",
			pin: true,
			pinSpacing: true,
			toggleActions: "play restart reverse reverse",
			invalidateOnRefresh: true,
			scrub: 1,
			onUpdate: (self) => {

				if(self.progress < 0.33) {
					circleSwiper.slideTo(0);
				} else if(self.progress < 0.66) {
					circleSwiper.slideTo(1);
				} else {
					circleSwiper.slideTo(2);
				}

			}
		},
	});
	
	m21sec1.to({}, {duration: 0.5});
	m21sec1.to(".m21 .sec1 .circle ul", {rotate:"-90deg", duration: 0,});
	m21sec1.to({}, {duration: 0.5});
	m21sec1.to(".m21 .sec1 .circle ul", {rotate:"-180deg", duration: 0,});	
	m21sec1.to({}, {duration: 0.5});


	var circleSwiper = new Swiper('.circleTxt', {
		allowTouchMove: false,
		slidesPerView: 1,
		speed: 1200,
		loop: false,
		watchSlidesProgress: true,
		touchRatio: 0,
		on: {
		}
	});	
	

	
	gsap.set('.m21 .sec2 .circle .line', {scaleY:0, });	// 2026-10-29: scale → scaleY (가로 두께 1px 유지, 위 선과 동일 두께)
	gsap.set('.m21 .sec2 .circle .txt', {opacity:'0', y:"-40" });

	let m21sec2 = gsap.timeline({
		scrollTrigger: {
			trigger: ".m21 .sec2",
			start: "top 100%",
			end: "bottom 150%",
			pin: false,
			pinSpacing: true,
			scrub: 0.5,
		},
	});
	m21sec2.to(".m21 .sec2 .circle .line", {scaleY:1, duration: 0.4,});	
	m21sec2.to(".m21 .sec2 .circle .txt", {opacity:"1", y:"0", duration: 0.4,},"<0.2");	



})