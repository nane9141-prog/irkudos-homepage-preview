$(function(){
	

	/* m22 */

/*
	const $messageItems = $('.message li');
	const centerPoint = $(window).width() / 2;
	let lastChangeTime = 0;
	let currentWord = '믿음';
	const CHANGE_DELAY = 800; // 단어 변경 최소 간격 (밀리초)
	
	function changeWord(newWord) {
		if (currentWord === newWord) return; // 같은 단어면 변경하지 않음
		
		const now = Date.now();
		if (now - lastChangeTime < CHANGE_DELAY) return; // 쓰로틀링
		
		const $wrapper = $('.is .word-wrapper');
		const $oldWord = $('.is .word');
		const $newWord = $('<span class="word slide-up-new">' + newWord + '</span>');
		
		$oldWord.addClass('slide-up');
		$oldWord.removeClass("slide-up-new")
		
		setTimeout(() => {
			$oldWord.remove();
			$wrapper.append($newWord);
		}, 300);

		currentWord = newWord;
		lastChangeTime = now;
	}

	function checkPosition() {
		$messageItems.each(function() {
			const $item = $(this);
			const itemLeft = $item.offset().left;
			const itemCenter = itemLeft + ($item.width() / 2);
			
			// 중앙 범위를 좀 더 넓게 설정
			if (Math.abs(itemCenter - centerPoint) < 30) {
				const newWord = $item.find('.word').text();
				changeWord(newWord);
			}
		});
	}

	function animate() {
		checkPosition();
		requestAnimationFrame(animate);
	}

	animate();
*/

	gsap.set(".m22 .sec2 .conwrap .graph .factor>div.f1", {opacity:"0",scale:"0.5",});
	gsap.set(".m22 .sec2 .conwrap .graph .factor>div.f2", {opacity:"0",scale:"0.5",});
	gsap.set(".m22 .sec2 .conwrap .graph .factor>div.f1 ul", {opacity:"0",});
	gsap.set(".m22 .sec2 .conwrap .graph .factor>div.f2 ul", {opacity:"0",});
	gsap.set(".m22 .sec2 .conwrap .graph .mtms dl", {opacity:"0",y:"20",});
	

	let m22sec2 = gsap.timeline({
		scrollTrigger: {
			trigger: ".m22 .sec2",
			start: "center center",
			end: "+=100%",
			pin: true,
			pinSpacing: true,
			scrub: 0.5,
		},
	});
	
	m22sec2.to(".m22 .sec2", {duration: 0.4});
	m22sec2.to(".m22 .sec2 .conwrap .txtwrap", 
		{opacity: 0, duration: 0.4, ease: "none",}
	)	
	m22sec2.to(".m22 .sec2 .conwrap .graph", 
		{opacity: 1, duration: 0.01, ease: "none",}
	)
	m22sec2.to(".m22 .sec2 .conwrap .graph .factor>div.f1", {opacity:"1", scale:"1", duration: 0.4,});	
	m22sec2.to(".m22 .sec2 .conwrap .graph .factor>div.f1 ul", {opacity:"1", duration: 0.4,});	

	m22sec2.to(".m22 .sec2 .conwrap .graph .factor>div.f2", {opacity:"1", scale:"1", duration: 0.4,});	
	m22sec2.to(".m22 .sec2 .conwrap .graph .factor>div.f2 ul", {opacity:"1", duration: 0.4,});	
	
	/*
	m22sec2.to(".m22 .sec2 .conwrap .graph .mtms dl:nth-child(1)", {opacity:"1", y:"0", duration: 0.4,});	
	m22sec2.to(".m22 .sec2 .conwrap .graph .mtms dl:nth-child(2)", {opacity:"1", y:"0", duration: 0.4,});	
	m22sec2.to(".m22 .sec2 .conwrap .graph .mtms dl:nth-child(3)", {opacity:"1", y:"0", duration: 0.4,});	
	m22sec2.to(".m22 .sec2 .conwrap .graph .mtms dl:nth-child(4)", {opacity:"1", y:"0", duration: 0.4,});	
	*/

	m22sec2.to(".m22 .sec2", {duration: 0.01});	




	/* 카드효과 */

	const items = document.querySelectorAll('.m22 .sec3>div .message ul li');
	items.forEach(item => {
		item.classList.remove('on');
	});

	$(window).resize(function(){
		ww = $(window).width();
		console.log(ww)
		if(ww > 1399){
			xPer = 90;
		}
		if(ww < 1400 && ww > 806){
			xPer = 80;
		}
		if(ww < 807){
			xPer = 78;
		}
	}).resize();

	let m22sec3 = gsap.timeline({
		scrollTrigger: {
			trigger: ".m22 .sec3",
			start: "top top",
			end: "+=100%",
			pin: true,
			pinSpacing: true,
			scrub: 0.5,
			onEnter: () => {
				// 섹션에 진입할 때 모든 클래스 초기화
				items.forEach(item => {
					item.classList.remove('on');
				});
			},
			onUpdate: (self) => {
				const progress = self.progress;
				const totalItems = items.length;
				
				if (progress < 0.05) {
					items.forEach(item => {
						item.classList.remove('on');
					});
					return;
				}
				items.forEach((item, index) => {
					const startProgress = (index * 0.8) / totalItems;
					
					if (progress > startProgress && progress > 0.05) {
						item.classList.add('on');
					} else {
						item.classList.remove('on');
					}
				});

			}
		},
	});
	
	m22sec3.to(".m22 .sec3>div .message ul", {x:""+ -xPer +"%", duration: 0.4,});	




})