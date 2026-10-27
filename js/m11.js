$(function(){
	

	/* m11 */

	let m11sec2 = gsap.timeline({
		scrollTrigger: {
			trigger: ".m11 .sec2",
			start: "top top",
			end: "+=200%",
			pin: true,
			pinSpacing: true,
			scrub: 0.5,
		},
	});
	m11sec2.to(".m11 .sec2 .honer .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
	m11sec2.to(".m11 .sec2 .honer .titKR .dot", {left:"100%",opacity:"1", duration: 0.4, ease: 'power1.out'});	
	m11sec2.to(".m11 .sec2 .honer .exp .dot", {right:"calc(100% + 29px)",opacity:"1", duration: 0.4, ease: 'power1.out'},"<");
	m11sec2.to(".m11 .sec2 .honer .titKR .line", {scaleX:"1", duration: 0.4, ease: 'power1.out'},"<");			
	m11sec2.to(".m11 .sec2 .honer .exp .line", {scaleX:"1", duration: 0.4, ease: 'power1.out'},"<");	
	m11sec2.to(".m11 .sec2 .honer .titKR .txt", {opacity:"1", duration: 0.4, ease: 'power1.out'});
	m11sec2.to(".m11 .sec2 .honer .exp .txt", {opacity:"1", duration: 0.4, ease: 'power1.out'},"<");

	m11sec2.to(".m11 .sec2 .fame .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
	m11sec2.to(".m11 .sec2 .fame .titKR .dot", {left:"100%",opacity:"1", duration: 0.4, ease: 'power1.out'});	
	m11sec2.to(".m11 .sec2 .fame .exp .dot", {right:"calc(100% + 29px)",opacity:"1", duration: 0.4, ease: 'power1.out'},"<");
	m11sec2.to(".m11 .sec2 .fame .titKR .line", {scaleX:"1", duration: 0.4, ease: 'power1.out'},"<");			
	m11sec2.to(".m11 .sec2 .fame .exp .line", {scaleX:"1", duration: 0.4, ease: 'power1.out'},"<");	
	m11sec2.to(".m11 .sec2 .fame .titKR .txt", {opacity:"1", duration: 0.4, ease: 'power1.out'});
	m11sec2.to(".m11 .sec2 .fame .exp .txt", {opacity:"1", duration: 0.4, ease: 'power1.out'},"<");

	m11sec2.to(".m11 .sec2 .praise .tit", {y:"0",rotateX:"0",opacity:"1", duration: 0.4, ease: 'power1.out'});	
	m11sec2.to(".m11 .sec2 .praise .titKR .dot", {left:"100%",opacity:"1", duration: 0.4, ease: 'power1.out'});	
	m11sec2.to(".m11 .sec2 .praise .exp .dot", {right:"calc(100% + 29px)",opacity:"1", duration: 0.4, ease: 'power1.out'},"<");
	m11sec2.to(".m11 .sec2 .praise .titKR .line", {scaleX:"1", duration: 0.4, ease: 'power1.out'},"<");			
	m11sec2.to(".m11 .sec2 .praise .exp .line", {scaleX:"1", duration: 0.4, ease: 'power1.out'},"<");	
	m11sec2.to(".m11 .sec2 .praise .titKR .txt", {opacity:"1", duration: 0.4, ease: 'power1.out'});
	m11sec2.to(".m11 .sec2 .praise .exp .txt", {opacity:"1", duration: 0.4, ease: 'power1.out'},"<");
	
	m11sec2.to(".m11 .sec2 .conwrap .mbbr", {opacity:"1", y:"0", duration: 0.4, ease: 'power1.out'},"<");
	m11sec2.to({}, {duration: 0.25});



})