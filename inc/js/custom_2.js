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
	scale: 0.8,
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