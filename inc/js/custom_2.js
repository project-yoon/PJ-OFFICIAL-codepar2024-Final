const btnContact = $('.btn-contact')
const contactWrap = $('#popupContact')
let isActive

btnContact.on("click", function(e) {
	e.preventDefault()

	isActive = btnContact.hasClass('active')

	if(isActive) {
		btnContact.removeClass('active')
		contactWrap.fadeOut(300)
	} else {
		btnContact.addClass('active')
		contactWrap.fadeIn(300)
	}
})

gsap.registerEffect({
	name: "textAnimation",
	defaults: {duration: 2},
	effect: (targets, config) => {
		return gsap
			.timeline()
			.from(
				targets,
				{
					duration: 0.5,
					opacity: 0,
					scale: 0,
					y: 80,
					rotationX: 180,
					transformOrigin: "0% 50% -50",
					ease: "back",
					stagger: 0.01,
					delay: config.delay / 25
				},
				"+=0"
			)
			.to(".sub-title", {opacity: 1, y: 0, duration: 1, delay: 0.1});
	}
});

document.querySelectorAll('.word').forEach(function (box, index) {
	gsap.effects.textAnimation(box, {delay: index});
});

gsap.timeline({
	scrollTrigger: {
		trigger: ".slide-in"
	}
})
	.to(".slide-in .left", {x: 0, duration: 0.5})
	.to(".slide-in .right", {x: 0, duration: 0.5})
	.to(".slide-in p", {y: 0, opacity: 1, duration: 1});

gsap.to(".work .titArea", {
	duration: 0.5,
	//scale: 0.8,
	transformOrigin: "top left",
	ease: "none",
	scrollTrigger: {
		trigger: ".work",
		start: "top top",
		end: "top -100%",
		scrub: true
	}
})

const pinedList = document.querySelector('.pined-list');
const pinedInner = document.querySelector('.pined-inner');

gsap.to(pinedList, {
	x: -pinedList.clientWidth + pinedInner.clientWidth,
	scrollTrigger: {
		trigger: ".services",
		start: "top top",
		end: `+=${pinedList.clientWidth}`,
		pin: true,
		scrub: 0.1
	}
});
// yyxxmm
let pinSections = gsap.utils.toArray(".pin__item");
let tops = pinSections.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));
pinSections.forEach((panel, i) => {
	ScrollTrigger.create({
		trigger: panel,
		start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
		pin: true,
		pinSpacing: false,
	});
});

/* ----------- 헤더 메뉴 ----------- */
function headerTopPosi() {
	let nav_UL_LI_A = document.querySelectorAll('.custom-nav ul li a');
	let nav_UL_LI_A_NOT = document.querySelector('.custom-nav ul li a');

	if (!window.pageYOffset > document.querySelector('.custom-nav').offsetTop) {
		nav_UL_LI_A.forEach((el) => {
			el.classList.remove('active');
		});
		nav_UL_LI_A_NOT.classList.add('active');
		document.querySelector('#cta').style.filter = 'unset';
		document.querySelector('#client').style.cssText = `background-color: rgb(39 38 38 / 70%);`;
	} else {
		document.querySelector('#cta').style.filter = 'blur(2px)';
		document.querySelector('#client').style.cssText = `background-color: rgb(39 38 38 / 100%);`;
	}
}
document.addEventListener('scroll', () => {
	headerTopPosi();
});

let navLinks = gsap.utils.toArray('.custom-nav ul li .nav-link:not(.nav-link-not)');
navLinks.forEach(link => {
	let navLink_href = document.querySelector(link.getAttribute("href")),

		linkTarget = ScrollTrigger.create({
			trigger: navLink_href,
			start: "top top"
		});

	ScrollTrigger.create({
		trigger: navLink_href,
		start: "top center",
		end: "bottom center",
		onToggle: self => setActive(link)
	});

	link.addEventListener('click', e => {
		e.preventDefault();
		gsap.to(window, {duration: 1, scrollTo: linkTarget.start, overwrite: 'auto'});
	});
});

function setActive(link) {
	navLinks.forEach(el => el.classList.remove('active'));
	link.classList.add('active');
}

/* ----------- 텍스트 롤링 애니메이션 ----------- */
function initrllLst(listTag, listIdx) {
	let hgtlst = 0
	let boxlst = $(listTag).find('.text-rolling')
	let boxli = $(boxlst).find('p')
	let isAnimated = true
	let rollTime = 1200
	let delayTime = 800

	hgtlst = $(listTag).find('p').outerHeight();
	$(listTag).css('height', hgtlst * listIdx);

	if (boxli.length === 1) { return }

	function rollingList() {
		boxlst.animate({ 'top': - hgtlst }, rollTime, function() {
			boxlst.append($(listTag).find('p').first().clone());
			boxlst.css('top', '0px');
			$(listTag).find('p').first().remove();
		});
	}

	function checkAnimationStatus() {
		rollingList()

		let intervalId = setInterval(function() {
			if (isAnimated) {
				rollingList()
			}
		}, rollTime + delayTime)
		return intervalId
	}

	$(listTag).on('mouseenter', function() {isAnimated = false})
	$(listTag).on('mouseleave', function() {isAnimated = true})

	var rollingIntervalId = checkAnimationStatus()
}

/* ----------- 텍스트 애니메이션 효과 ----------- */
let textWrapper = document.querySelector('.motion-effect-1 .motion-dummy');

textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, '<span class="dummy">$&</span>');

anime.timeline({
	loop: false
}).add({
	targets: '.motion-effect-1 .motion-line',
	scaleX: [0, 1],
	opacity: [0.5, 1],
	easing: "easeInOutExpo",
	duration: 2000
}).add({
	targets: '.motion-effect-1 .dummy',
	opacity: [0, 1],
	translateX: [40, 0],
	translateZ: 0,
	scaleX: [0.3, 1],
	easing: "easeOutExpo",
	duration: 8000,
	offset: '-=600',
	delay: (el, i) => 150 + 25 * i
}).add({
	targets: '.motion-effect-1',
	opacity: 1,
	duration: 8000,
	easing: "easeOutExpo",
	delay: 8000,
});

setTimeout(() => {
	anime.timeline({
		loop: true
	}).add({
		targets: '.motion-effect-2 .motion-dummy-1',
		opacity: [0, 1],
		scale: [0.2, 1],
		duration: 800
	}).add({
		targets: '.motion-effect-2 .motion-dummy-1',
		opacity: 0,
		scale: 3,
		duration: 600,
		easing: "easeInExpo",
		delay: 500
	}).add({
		targets: '.motion-effect-2 .motion-dummy-2',
		opacity: [0, 1],
		scale: [0.2, 1],
		duration: 800
	}).add({
		targets: '.motion-effect-2 .motion-dummy-2',
		opacity: 0,
		scale: 3,
		duration: 600,
		easing: "easeInExpo",
		delay: 500
	}).add({
		targets: '.motion-effect-3 .motion-dummy',
		scale: [14, 1],
		opacity: [0, 1],
		easing: "easeOutCirc",
		duration: 800,
		delay: (el, i) => 800 * i
	}).add({
		targets: '.motion-effect-3',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	});
}, 2800);

$(document).ready(function () {
	if ($('.storyList').length) {
		$('.storyList').slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			draggable: false,
			prevArrow: "#story .btnArea .prev",
			nextArrow: "#story .btnArea .next",
			asNavFor: '.storyTxt',
			responsive: [
				{
					breakpoint: 961,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
			]
		});
	}

	if ($('.storyTxt').length) {
		$('.storyTxt').slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			draggable: false,
			fade: true,
			asNavFor: '.storyList',
			arrows: false
		});
	}
	AOS.init();
	initrllLst($('.text-rolling-wrap'),1);
});
