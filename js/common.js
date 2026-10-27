$(function(){

	var $animation_elements = $('.ani');
	var $window = $(window);

	function check_if_in_view() {
	  var window_height = $window.height();
	  var window_top_position = $window.scrollTop();
	  var window_bottom_position = (window_top_position + window_height);

	  $.each($animation_elements, function() {
		var $element = $(this);
		var element_height = $element.outerHeight();
		var element_top_position = $element.offset().top;
		var element_bottom_position = (element_top_position + element_height);

		//check to see if this current container is within viewport
		if ((element_bottom_position >= window_top_position) &&
		  (element_top_position <= window_bottom_position)) {
		  $element.addClass('in-view');
		} else {
		  $element.removeClass('in-view');
		}
	  });


		// console.warn(document.body.classList)


	}

	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');

	



	/* 헤더 감추기 */
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('#header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();
		
		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		
		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('#header').removeClass('nav-down').addClass('nav-up');
			$('.historyTabs ul').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('#header').removeClass('nav-up').addClass('nav-down');
				$('.historyTabs ul').removeClass('nav-up').addClass('nav-down');
			}
		}
		
		lastScrollTop = st;
	}

	$(".pcNav>ul>li").mouseover(function(){
		pcliNum = $(".pcNav>ul>li").index($(this));
		$("#header").addClass("bl");
		$("#header").addClass("on");
		$(this).addClass("on").siblings().removeClass("on");
		$(this).siblings().find(".sub").hide();
		$(this).find(".sub").stop().slideDown();
	});

	$("#header").mouseleave(function(){
		$("#header").removeClass("on");
	})



	/* all menu */
	var btnchk = 0;
	var scrollPosition = 0;

	$(".btnMenu").click(function(){

		console.log('btnMenu')
		if(btnchk == 0){

			scrollPosition = window.pageYOffset;

			$("#header").addClass("all");
			$(this).stop().addClass("openmenu");	
			$(".allMenu").addClass("open");
			// 스크롤 방지 & 현재 위치 유지
			$("body").css({
				"overflow": "hidden",
				"position": "fixed",
				"top": -scrollPosition + "px",
				"width": "100%"
			});

			btnchk = 1;
		}else{
			$("#header").removeClass("all");
			$(this).stop().removeClass("openmenu");
			$(".allMenu").removeClass("open");
			// 스크롤 복원
			$("body").css({
				"overflow": "",
				"position": "",
				"top": "",
				"width": ""
			});
			
			// 스크롤 위치 복원
			window.scrollTo(0, scrollPosition);
			btnchk = 0;
		}
	});



	$(window).resize(function(){
		ww = $(window).width();
		if(ww < 1383){
			$("body").addClass("mobile");
		}else{
			$("body").removeClass("mobile");
		}
	}).resize();
	$(document).on("click",".mobile .allMenu .menuWrap>ul>li",function(){
		if($(this).attr("class") == "sub act"){			
			$(this).find("ul").slideUp(300);			
		}else{
			$(this).find("ul").slideDown(300);			
		}		
		$(this).toggleClass("act");
		$(this).siblings("li").removeClass("act");
		$(this).siblings("li").find("ul").slideUp();
	})

	


	/* 푸터 패밀리사이트 */
	famChk = 0;
	$(".family").click(function(){
		if(famChk == 0){
			$(this).addClass("act");
			$(this).find("ul").slideDown();
			famChk = 1;
		}else{
			$(this).removeClass("act");
			$(this).find("ul").slideUp();
			famChk = 0;
		}
	})

	/* 개인정보처리방침 */
	verChk = 0;
	$(".version").click(function(){
		if(verChk == 0){
			$(this).addClass("act");
			$(this).find("ul").slideDown();
			verChk = 1;
		}else{
			$(this).removeClass("act");
			$(this).find("ul").slideUp();
			verChk = 0;
		}
	});

	
	$(window).scroll(function(){
		scroll = $(window).scrollTop();
		wh = $(window).height();
		if(scroll > wh){
			$(".btnTop").fadeIn();
		}else{
			$(".btnTop").fadeOut();
		}
	})
	$(".btnTop").click(function(){
		$('body,html').animate({scrollTop: 0}, 400);
	})

	$(document).on("click",".allMenu .sub>a",function(e){
		e.preventDefault();
	})

	$(document).on('click', '.foot .family>a', function(e) {
		e.preventDefault();
	});



	let scrollY ;
	const recatchModalOpen = () => {
		$('.modal-recatch').fadeIn(500, function () {
			$('.modal-recatch .modal-content').scrollTop(0);
		});
		scrollY = window.scrollY;
		
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = '100%';
	}


	const recatchModalClose = () => {
		$('.modal-recatch').fadeOut();

		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.width = '';
		window.scrollTo(0, scrollY);
	}


	$(document).on("click",".gnb .btnContact, .section6 .home-contact, .js-contact",function(e){ /* .js-contact: 페이지 내 문의 버튼 공통 훅 */
		e.preventDefault();
		recatchModalOpen();
	})

	$(document).on("click",".modal-recatch .dimmed, .modal-recatch header button", function(){
		recatchModalClose();
	})

	

});