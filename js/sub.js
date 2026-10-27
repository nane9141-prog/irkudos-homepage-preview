$(function(){


	$("#header").mouseleave(function(){
		$(".pcNav>ul>li").removeClass("on");
		$(".pcNav>ul>li").find(".sub").hide();
	})


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




	/**/
	const tl20 = gsap.timeline({
		scrollTrigger: {
			trigger: ".m23 .sec2, .m24 .sec2",
			start: "center center",
			end: "+=80%",
			scrub: 1,
			pin: true,
		}
	});
	tl20.to(".m23 .sec2 .conwrap .txtwrap, .m24 .sec2 .conwrap .txtwrap", 
		{opacity: 0, duration: 0.01, ease: "none",}
	)
	tl20.to(".m23 .sec2 .conwrap .graph, .m24 .sec2 .conwrap .graph", 
		{opacity: 1, duration: 0.01, ease: "none",}
	)
	tl20.to(".m23 .sec2, .m24 .sec2", {duration: 0.01});



	/* m31 */
	let m31Fuction = gsap.matchMedia();
	
	m31Fuction.add("(min-width: 1400px)", () => {

		gsap.set('.m31 .sec1 .conwrap .diagram ul li', {opacity:'0', scale:"0.8" });
		gsap.set('.m31 .sec1 .conwrap .diagram h5', {opacity:'0', scale:"0.8" });

		let m31sec1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".m31 .sec1",
				start: "top top",
				end: "+=200%",
				pin: true,
				pinSpacing: true,
				scrub: 0.5,
			},
		});

		m31sec1.to('.m31 .sec1 .conwrap .diagram ul li:nth-child(1)', {opacity:'1', scale:"1", duration: 0.4, ease: 'power1.out' });
		m31sec1.to('.m31 .sec1 .conwrap .diagram ul li:nth-child(2)', {opacity:'1', scale:"1", duration: 0.4, ease: 'power1.out' });
		m31sec1.to('.m31 .sec1 .conwrap .diagram ul li:nth-child(3)', {opacity:'1', scale:"1", duration: 0.4, ease: 'power1.out' });
		m31sec1.to('.m31 .sec1 .conwrap .diagram h5', {opacity:'1', scale:"1", duration: 0.4, ease: 'power1.out' });
		
	});


	





	

	/* m41 */

	let m41Fuction = gsap.matchMedia();
	
	m41Fuction.add("(min-width: 1400px)", () => {

		let m41sec2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".m41 .sec2",
				start: "top top",
				end: "+=200%",
				pin: true,
				pinSpacing: true,
				scrub: 0.5,
			},
		});
		m41sec2.to(".m41 .sec2 .honer .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
		m41sec2.to(".m41 .sec2 .fame .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
		m41sec2.to(".m41 .sec2 .praise .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
		m41sec2.to(".m41 .sec2 .lines>div", {scale:"1", duration: 0.4, ease: 'power1.out'},"<0.2");
		m41sec2.to(".m41 .sec2 .txts>dl", {opacity:"1", duration: 0.4, ease: 'power1.out'},"<0.2");

	});
	m41Fuction.add("(min-width: 813px) and (max-width: 1399px)", () => {

		let m41sec2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".m41 .sec2",
				start: "top top",
				end: "+=200%",
				pin: true,
				pinSpacing: true,
				scrub: 0.5,
			},
		});
		m41sec2.to(".m41 .sec2 .honer .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
		m41sec2.to(".m41 .sec2 .fame .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
		m41sec2.to(".m41 .sec2 .praise .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
		m41sec2.to(".m41 .sec2 .lines>div", {scale:"1", duration: 0.4, ease: 'power1.out'},"<0.2");
		m41sec2.to(".m41 .sec2 .txts>dl", {opacity:"1", duration: 0.4, ease: 'power1.out'},"<0.2");

	});
	m41Fuction.add("(max-width: 812px)", () => {


	});



	/* m42 */
	$('.interview').each(function(index) {
	    $(this).find('.swiper-scrollbar').addClass('scrollbar-' + index);
	  
	    new Swiper(this, {
			slidesPerView: 'auto',
			speed: 1400,
			spaceBetween: 34,
			observer: true,
			observeParents: true,
			loop: false,
			scrollbar: {
				el: '.scrollbar-' + index,
				draggable: true
			},
			breakpoints: {
				812: {
					spaceBetween: 20
				}
			}
		});
	});

	
	/* m43 */
	$(".m43 .m43Tabs ul li").click(function(){
		
		tabnum = $(".m43 .m43Tabs ul li").index($(this)) + 1;
		$(this).addClass("on").siblings().removeClass("on");

		$.ajax({
			type : "GET" //"POST", "GET"
			, async : true //true, false
			, url : "/m43_list.php" //Request URL
			, dataType : "html" //전송받을 데이터의 타입
									   //"xml", "html", "script", "json" 등 지정 가능
									   //미지정시 자동 판단
			, timeout : 30000 //제한시간 지정
			, cache : false  //true, false
			, data : "tabNum="+tabnum  //서버에 보낼 파라메터
						 //form에 serialize() 실행시 a=b&c=d 형태로 생성되며 한글은 UTF-8 방식으로 인코딩
						 //"a=b&c=d" 문자열로 직접 입력 가능
						 //{a:b, c:d} json 형식 입력 가능
			, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
			, error : function(request, status, error) {
			 //통신 에러 발생시 처리
			
			}
			, success : function(response, status, request) {
			 //통신 성공시 처리
			  $(".m43Tabconwrap").html(response)

			}
			, beforeSend: function() {
			 //통신을 시작할때 처리
			}
			, complete: function() {
			 //통신이 완료된 후 처리
			}
		});

	})




});