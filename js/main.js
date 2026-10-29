$(function(){


	/**/
	$(window).scroll(function(){
		scroll = $(window).scrollTop();
		if(scroll > 0){
			$("#header").addClass("scroll");
		}else{
			$("#header").removeClass("scroll");
		}
	});


	$("#header").mouseleave(function(){
		$("#header").removeClass("bl");
		$(".pcNav>ul>li").removeClass("on");
		$(".pcNav>ul>li").find(".sub").hide();
	})

	

	gsap.set('.section1 .lines', {left:'150%', });
	gsap.set('.section1 .lines .line2', {left:'-150%', rotate: '0deg', });
	gsap.set('.section1 .area1', {opacity:0, top: "60%", });
	gsap.set('.section1 .area2', {opacity:0, top: "40%", });
	

	let mainSec1Fuction = gsap.matchMedia();
	
	mainSec1Fuction.add("(min-width: 1400px)", () => {

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".section1",
				start: "top 75%",
				end: "+=300%",
				scrub: 0.5,
			},
		});

		ScrollTrigger.create({
			trigger: ".section1",
			start: "top top", // pin은 화면 상단에서 시작
			end: "+=300%",
			pin: true,
			pinSpacing: true,
		});	
		
		tl1.to(".section1 .conwrap", {background:"#000", duration: 0.4, ease: 'power1.out'});	
		tl1.to(".section1 .lines", {left:"50%", duration: 0.4, ease: 'power1.out'});	
		tl1.to({}, {duration: 0.25});
		tl1.to(".section1 .area1", {opacity:1, top: "50%", duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .area2", {opacity:1, top: "50%", duration: 0.4, ease: 'power1.out'},"<");	
		tl1.to({}, {duration: 0.25});
		tl1.to(".section1 .lines .line1", {rotate: "-90deg", duration: 0.6, ease: 'power1.out'});
		tl1.to(".section1 .area1", {left:"0%", transform:"translateY(-62%)", duration: 0.6, ease: 'power1.out'},"<");
		tl1.to(".section1 .area2", {left:"50%", transform:"translateY(-62%)", duration: 0.6, ease: 'power1.out'},"<");
		tl1.to({}, {duration: 0.25});
		tl1.to(".section1 .area1 .tit", {transform:"translateY(0)",  duration: 0.4, ease: 'power1.out'});
		tl1.to(".section1 .area2 .tit", {transform:"translateY(0)",  duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .lines .line2", {left:"50%", duration: 0.6, ease: 'power1.out'},"<");
		tl1.to(".section1 .area1 .txt", {transform:"translateY(0)", opacity:1, duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .area2 .txt", {transform:"translateY(0)", opacity:1, duration: 0.4, ease: 'power1.out'},"<");	
		tl1.to({}, {duration: 0.25});
		
		tl1.to(".section1 .lines .line1", {width: "110px", background: "linear-gradient(to right, rgba(2,79,43,1) 20%, rgba(40,192,192,1) 80%)", duration: 0.4, ease: 'power1.out'});
		tl1.to(".section1 .lines .line2", {width: "110px", background: "linear-gradient(to right, rgba(2,79,43,1) 20%, rgba(40,192,192,1) 80%)", duration: 0.4, ease: 'power1.out'},"<");
		tl1.to({}, {duration: 0.25});
		
		tl1.to(".section1 .lines", {scale: "1", opacity: "0", duration: 0.4, ease: 'power1.out'});
		tl1.to(".section1 .area1", {scale: "1", opacity: "0", duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .area2", {scale: "1", opacity: "0", duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .lastTxt", {scale:1, opacity:1, duration: 0.4, ease: 'power1.out'},"<0.2");

	});
	mainSec1Fuction.add("(max-width: 1399px)", () => {

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".section1",
				start: "top 75%",
				end: "+=300%",
				scrub: 0.5,
			},
		});

		ScrollTrigger.create({
			trigger: ".section1",
			start: "top top", // pin은 화면 상단에서 시작
			end: "+=300%",
			pin: true,
			pinSpacing: true,
		});	
		
		tl1.to(".section1 .conwrap", {background:"#000", duration: 0.4, ease: 'power1.out'});	
		tl1.to(".section1 .lines", {left:"50%", duration: 0.4, ease: 'power1.out'});	
		tl1.to({}, {duration: 0.25});
		tl1.to(".section1 .area1", {opacity:1, top: "50%", duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .area2", {opacity:1, top: "50%", duration: 0.4, ease: 'power1.out'},"<");	
		tl1.to({}, {duration: 0.25});
		tl1.to(".section1 .area1 .txt", {transform:"translateY(0)", opacity:1, duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .area2 .txt", {transform:"translateY(0)", opacity:1, duration: 0.4, ease: 'power1.out'},"<");	
		tl1.to({}, {duration: 0.25});
		tl1.to(".section1 .lines", {scale: "1", opacity: "0", duration: 0.4, ease: 'power1.out'});
		tl1.to(".section1 .area1", {scale: "1", opacity: "0", duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .area2", {scale: "1", opacity: "0", duration: 0.4, ease: 'power1.out'},"<");
		tl1.to(".section1 .lastTxt", {scale:1, opacity:1, duration: 0.4, ease: 'power1.out'},"<0.2");
		tl1.to({}, {duration: 0.25});



	});









	// 모든 textFill 그룹들을 찾습니다
	const textFillGroups = document.querySelectorAll('.textFill');

	textFillGroups.forEach(group => {
		// 각 그룹 내의 text-line들을 찾습니다
		const textLines = group.querySelectorAll('.text-line');
		
		// 각 그룹별로 타임라인을 생성합니다
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: group,
				start: "top center",
				end: "100% bottom",
				scrub: 1.5,
			}
		});

		// 각 text-line을 타임라인에 순차적으로 추가합니다
		textLines.forEach((line) => {
			tl.to(line, {
				backgroundImage: 'linear-gradient(90deg, #1A1A1A 0%, #1A1A1A 100%, transparent 100.1%)',
				duration: 3
			}, "+=0.2"); // 이전 애니메이션이 끝나고 1초 후에 시작
		});
	});




	/* sec4 */
	$(window).resize(function(){
		ww = $(window).width();
		if(ww < 807){
			pointX = 25;
		}else{
			pointX = -50;	
		}
		
	}).resize();

    $('.section4 ul li').each(function() {
        const $li = $(this);
        const $img = $li.find('.img');
        let rect = $li.get(0).getBoundingClientRect();

        $li.on('mousemove', function(e) {
            // li의 중앙을 기준점(0,0)으로 설정
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 마우스 위치를 중앙 기준으로 계산 (-1 ~ 1 사이의 값)
            const mouseX = (e.clientX - rect.left - centerX) / centerX;
            const mouseY = (e.clientY - rect.top - centerY) / centerY;
            
            // 30픽셀 범위 내에서 부드럽게 이동
            const moveX = mouseX * 30;
            const moveY = mouseY * 30;

            // RAF를 사용하여 더 부드러운 애니메이션 구현
            requestAnimationFrame(() => {
                $img.css({
                    'transform': `translate(calc(${pointX}% + ${moveX}px), calc(-50% + ${moveY}px))`,
                    'transition': 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
                });
            });
        });

        $li.on('mouseleave', function() {
            $img.css({
                'transform': `translate(${pointX}%, -50%)`,
                'transition': 'transform 0.3s ease-out'
            });
        });

        // 스크롤이나 리사이즈 시 위치 재계산
        $(window).on('scroll resize', function() {
            rect = $li.get(0).getBoundingClientRect();
        });
    });



	/* sec5 */
    const setUlWidth = function($ul) {
        let totalWidth = 0;
        $ul.find('li').each(function() {
            totalWidth += $(this).outerWidth(true);
        });
        $ul.width(totalWidth);
    };

    // 초기 설정
    $('.section5 .conwrap ul').each(function() {
        const $ul = $(this);
        // 화면 너비에 따라 충분한 수의 복제본 생성
        const repeatCount = Math.ceil($(window).width() / $ul.width()) + 2;
        
        // 여러 번 복제하여 충분한 여유 확보
        for(let i = 0; i < repeatCount; i++) {
            const $clone = $ul.children().clone();
            $ul.append($clone);
        }
        setUlWidth($ul);
    });

    const startAnimation = function() {
        const $firstUl = $('.section5 .conwrap ul').eq(0);
        const $secondUl = $('.section5 .conwrap ul').eq(1);
        const duration = 120000; // 애니메이션 시간 조절

        // 첫 번째 ul 애니메이션 (왼쪽으로)
        const animateFirst = function() {
            $firstUl.animate({
                marginLeft: -($firstUl.width() / 2)
            }, {
                duration: duration,
                easing: 'linear',
                complete: function() {
                    $firstUl.css('margin-left', '0');
                    animateFirst();
                }
            });
        };

        // 두 번째 ul 애니메이션 (오른쪽으로)
        const animateSecond = function() {
            $secondUl.css('margin-left', -($secondUl.width() / 2));
            $secondUl.animate({
                marginLeft: 0
            }, {
                duration: duration,
                easing: 'linear',
                complete: function() {
                    $secondUl.css('margin-left', -($secondUl.width() / 2));
                    animateSecond();
                }
            });
        };

        // 애니메이션 시작
        animateFirst();
        animateSecond();
    };

    // 애니메이션 시작
    startAnimation();

    // 창 크기 변경 시 대응
    $(window).on('resize', function() {
        $('.section5 .conwrap ul').each(function() {
            setUlWidth($(this));
        });
    });

    // 탭이나 창이 비활성화될 때 애니메이션 멈춤 방지
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            $('.section5 .conwrap ul').stop(true, true);
            startAnimation();
        }
    });






});