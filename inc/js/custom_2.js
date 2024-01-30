$(document).ready(function () {
    // 클라이언트
    var clientLogo = $('.clientLogo'),
        clientLogoOption = {
            infinite: true,
            dots: false,
            arrows: false,
            vertical: true,
            verticalSwiping: false,
            autoplay: true,
            pauseOnHover: false,
            draggable: false,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 0,
            speed: 20000
        };
    clientLogo.slick(clientLogoOption);

    var tabArea = $(".tabArea");

    if (tabArea.length > 0) {

        for (var i = 0; i < tabArea.length; i++) {
            var tabMenu = tabArea
                    .eq(i)
                    .find("ul.tabMenu > li"),
                tabCon = tabArea
                    .eq(i)
                    .find(".tabCon");

            tabMenu
                .removeClass("on")
                .eq(0)
                .addClass("on");
            tabCon
                .hide(0)
                .eq(0)
                .show(0);
        }

        tabArea.on("click", "ul.tabMenu a", function () {
            var currTabMenu = tabArea.find("ul.tabMenu li"),
                currTabCon = tabArea.find(".tabCon"),
                currIdx = $(this)
                    .parent()
                    .index();

            currTabMenu
                .removeClass("on")
                .eq(currIdx)
                .addClass("on");
            currTabCon
                .hide(0)
                .eq(currIdx)
                .show(0);

            if ($(clientLogo).hasClass('slick-initialized')) { // slick 껏다 키기
                clientLogo
                    .slick('unslick')
                    .slick(clientLogoOption);
            }

            return false
        });
    }

    // work
    if ($('#work').length) {
        $('#work')
            .find('.more a')
            .click(function () {
                $('.workList').css('height', 'auto');
                $(this).fadeOut();
            });
    }

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
});

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

/**
 * gsap
 * */
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
		scrub: 1
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


// 메인 비주얼 관련
let mm = gsap.matchMedia()

mm.add({
	isMobile: "(max-width:767px)",
	idDesktop: "(min-width:768px)",
}, (context) => {
	let {isMobile, isDesktop} = context.conditions;

	gsap.to(".text-trans", {
		scrollTrigger: {
			trigger: ".text-trans",
			start: "center center",
			end: "+=800",
			scrub: true,
			pin: true,
		},

		scale: 50,
		opacity: 0,
		ease: "Power1.easeIn"
	});

	gsap.to(".top-image", {
		opacity: 0,
		ease: "Power1.easeIn",
		scrollTrigger: {
			trigger: ".gsap-img-container",
			start: "center 60%",
			end: "+=600",
			scrub: true,
			pin: true,
			markers: false
		}
	});

	gsap.fromTo(".gsap-text", {fontSize: "0", xPercent: -50, yPercent: 50},
		{
			fontSize: "13vw",
			xPercent: -50,
			yPercent: -500,
			scrollTrigger: {
				trigger: ".gsap-img-container",
				start: "center 60%",
				end: "+=600",
				scrub: true,
				markers: false
			}
		});
})





gsap.registerPlugin(SplitText)

const titleList = gsap.utils.toArray('.title-effects li')
const titlesTl = gsap.timeline({repeat: -1})

gsap.registerEffect({
	name: 'rotateIn',
	extendTimeline: true,
	defaults: {
		duration: 1,
		rotationY: 0,
		rotationX: 0,
		transformOrigin: '50% 50%',
		ease: 'back',
		parent: '.main-visual-wrap',
	},

	effect: (targets, config) => {
		gsap.set(config.parent, {perspective: 800})

		let tl = gsap.timeline()
		tl.from(targets, {
			duration: config.duration,
			rotationY: config.rotationY,
			rotationX: config.rotationX,
			transformOrigin: config.transformOrigin,
			ease: config.ease,
			stagger: {
				each: 0.06,
			},
		})

		tl.from(
			targets,
			{
				duration: 0.4,
				autoAlpha: 0,
				ease: 'none',
				stagger: {
					each: 0.05,
				},
			},
			0,
		)

		return tl
	},
})

gsap.registerEffect({
	name: 'rotateOut',
	extendTimeline: true,
	defaults: {
		duration: 0.5,
		x: 0,
		y: 0,
		rotationY: 0,
		rotationX: 0,
		rotationZ: 0,
		transformOrigin: '50% 50%',
		ease: 'power1.in',
		parent: '.main-visual-wrap',
	},

	effect: (targets, config) => {
		gsap.set(config.parent, {perspective: 800})

		let tl = gsap.timeline()
		tl.to(targets, {
			x: config.x,
			y: config.y,
			rotationY: config.rotationY,
			rotationX: config.rotationX,
			rotationZ: config.rotationZ,
			transformOrigin: config.transformOrigin,
			ease: config.ease,
			stagger: {
				each: 0.04,
			},
		})

		tl.to(
			targets,
			{
				duration: 0.45,
				opacity: 0,
				ease: 'none',
				stagger: {
					amount: 0.02,
				},
			},
			0,
		)

		return tl
	},
})

function splitElements() {
	gsap.set(titleList, {autoAlpha: 1})
	titleList.forEach((element, dex) => {
		let split = new SplitText(element, {type: 'chars,words,lines'})

		titlesTl
			.rotateIn(split.words, {
				rotationX: 90,
				transformOrigin: '100% 0',
				ease: 'back(2.3)'
			}, dex > 0 ? '-=0.38' : 0,)
			.rotateOut(split.words, {
				y: 20,
				rotationX: -100,
				transformOrigin: '100% 100%'
			})
	})
}

splitElements()

/* header GNB menu */
function headerTopPosi() {
	let nav_UL_LI_A = document.querySelectorAll('.custom-nav ul li a');
	let nav_UL_LI_A_NOT = document.querySelector('.custom-nav ul li a');

	if (!window.pageYOffset > document.querySelector('.custom-nav').offsetTop) {
		nav_UL_LI_A.forEach((el) => {
			el.classList.remove('active');
		});
		nav_UL_LI_A_NOT.classList.add('active');
	}
}
document.addEventListener('scroll', () => {
	headerTopPosi();
});

let navLinks = gsap.utils.toArray('.custom-nav ul li a');
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