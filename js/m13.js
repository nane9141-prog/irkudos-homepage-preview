$(function(){
	

	/* m13 */	
	/*
	let headerHeight = $('#header').outerHeight();
	let historyTabsSticky = gsap.timeline({
		scrollTrigger: {
			trigger: ".m13",
			start: `top ${headerHeight}px`, 
			end: "bottom top",
			pin: ".historyTabs ul",
			pinSpacing: false,
		}
	});
	historyTabsSticky.to(".historyTabs ul",{
		top: headerHeight,
	});
	*/


	$(".historyTabs ul li a").click(function(){
		aaa = $(this).attr("class").replace(/[^-\d\.]/g,'');
		aaaa = $("#history"+aaa+"");
		_top = aaaa.position().top;
		$('html, body').stop().animate({scrollTop: _top-71 },500);		
	});


	m13ul = $(".historyTabs ul").offset().top;

	$(window).scroll(function(){

		scroll = $(window).scrollTop();
		headerH = $("#header").outerHeight();
		m13Tab1 = $("#history4").offset().top - headerH;
		m13Tab2 = $("#history3").offset().top - headerH;
		m13Tab3 = $("#history2").offset().top - headerH;
		m13Tab4 = $("#history1").offset().top - headerH;
		
		if(scroll > m13Tab2 && scroll < m13Tab3){
			$(".historyTabs ul li").removeClass("on");
			$(".historyTabs ul li:eq(1)").addClass("on");		
		}else if(scroll > m13Tab3 && scroll < m13Tab4){
			$(".historyTabs ul li").removeClass("on");
			$(".historyTabs ul li:eq(2)").addClass("on");					
		}else if(scroll > m13Tab4){
			$(".historyTabs ul li").removeClass("on");
			$(".historyTabs ul li:eq(3)").addClass("on");		
		}else{
			$(".historyTabs ul li").removeClass("on");
			$(".historyTabs ul li:eq(0)").addClass("on");			
		}


		

		if(scroll >= m13ul){
			$(".historyTabs ul").css("position","fixed");
		}else{
			$(".historyTabs ul").css("position","relative");
		}

	})
		


	// 숫자 카운팅 함수
	function animateCounter(element, target, duration = 1000) {
		let start = 0;
		const increment = target / (duration / 16);
		
		function updateCount() {
			start += increment;
			if (start >= target) {
				// 두 자리 수로 표시 (예: '05' 처럼)
				element.textContent = String(Math.floor(target)).padStart(2, '0');
				return;
			}
			element.textContent = String(Math.floor(start)).padStart(2, '0');
			requestAnimationFrame(updateCount);
		}
		
		updateCount();
	}

	// Intersection Observer 설정
	const observer1 = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// 해당 year 요소 내의 모든 카운트 대상 찾기
				const countElements = entry.target.querySelectorAll('span[data-target]');
				countElements.forEach(element => {
					const targetNum = parseInt(element.dataset.target);
					animateCounter(element, targetNum);
				});
				// 한 번만 실행되도록 관찰 중단
				observer1.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.5
	});

	// 모든 year 요소에 대해 observer 적용
	const yearElements = document.querySelectorAll('.year');
	yearElements.forEach(yearElement => {
		observer1.observe(yearElement);
	});



	/* m13 history */
	function createImageTimeline(historyNum) {
		return gsap.timeline({
			scrollTrigger: {
				trigger: `.m13 .sec1 .historyWrap.history${historyNum} .imgarea .img1`,
				start: "top 50%",
				end: "+=50%",
				pin: false,
				pinSpacing: true,
				scrub: 0.5,
			}
		})
		.to(`.m13 .sec1 .historyWrap.history${historyNum} .imgarea .img1`, {
			height: "150vh", 
			duration: 0.4, 
			ease: 'power1.out'
		})
		.to(`.m13 .sec1 .historyWrap.history${historyNum} .imgarea .img1`, {
			width: "100vw", 
			borderRadius: "0", 
			duration: 0.4, 
			ease: 'power1.out'
		});
	}

	// 라인 애니메이션을 위한 타임라인 생성 함수
	function createLineTimeline(historyNum) {
		// 초기 설정
		gsap.set(`.m13 .sec1 .historyWrap.history${historyNum} .con .line`, {
			height: 0
		});

		return gsap.timeline({
			scrollTrigger: {
				trigger: `.m13 .sec1 .historyWrap.history${historyNum} .con`,
				start: "top 50%",
				end: "bottom 40%",
				pin: false,
				pinSpacing: true,
				scrub: 0.5,
			}
		})
		.to(`.m13 .sec1 .historyWrap.history${historyNum} .con .line`, {
			height: "100%", 
			duration: 2
		});
	}

	// history1부터 history4까지 애니메이션 적용
	for(let i = 1; i <= 4; i++) {
		createImageTimeline(i);
		createLineTimeline(i);
	}




	const dlElements = document.querySelectorAll('.m13 .con dl');

	dlElements.forEach((dl, index) => {
		gsap.from(dl, {
			scrollTrigger: {
				trigger: dl,
				start: "top 60%",  // 요소가 화면 하단에서 40% 위치에 도달했을 때 시작
				toggleClass: "on",  // on 클래스 토글
				// once: true,        // 한 번만 실행
				// markers: true,  // 개발할 때 트리거 위치 확인용 (필요시 주석 해제)
			}
		});
	});




})