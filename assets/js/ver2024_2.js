let gnb = document.querySelector('.navbar');
let navLinks = gsap.utils.toArray('.custom-nav ul li .nav-link:not(.nav-link-not)');
let btnContact = $('.btn-contact');
let btnContactTrigger = $('.btn-contact-trigger');
let contactWrap = $('#popupContact');
let pinedList = document.querySelector('.pined-list');
let pinedInner = document.querySelector('.pined-inner');
let pinSections = gsap.utils.toArray('.pin__item');
let pinSectionsTops = pinSections.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));
let home = document.querySelector('#home');
let client = document.querySelector('#client');
let quickMenu = document.querySelector('.quick-menu');
let isActive;

document.addEventListener('scroll', () => {
	headerTopPosi();
});

/* ----------- gsap 환경설정 셋팅 ----------- */
gsap.config({
	trialWarn: false, // 경고 비활성화
});

/* ----------- scroll parallax ----------- */
pinSections.forEach((panel, i) => {
	ScrollTrigger.create({
		trigger: panel,
		start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
		pin: true,
		pinSpacing: false,
		// refreshPriority: -1,
	});
});

/* ----------- 우측 퀵 메뉴 (견적문의 메일 폼) ----------- */
btnContact.on('click', function(e) {
	e.preventDefault()

	isActive = btnContact.hasClass('active')

	if (isActive) {
		btnContact.removeClass('active')
		contactWrap.fadeOut(300)
	} else {
		btnContact.addClass('active')
		contactWrap.fadeIn(300)
	}
});
btnContactTrigger.on('click', function() {
	btnContact.trigger('click');
});

/* ----------- history line ani ----------- */
function historyAni () {
	const hisCon = $('.history-list li');
	let hisConHeight;
	const hisLine = $('.history-line');
	hisCon.each(function (i, item) {
		gsap.to(hisLine, {
			scrollTrigger: {
				trigger: item,
				start: "top 40%",
				scrub: true,
				//markers: true, 
				onEnter: function (progress, direction, isActive) {
					$(item).addClass("on");
					hisConHeight = hisCon.eq(i).outerHeight(true)
					hisLine.css("height", hisCon.eq(i).position().top + hisConHeight + "px");
				},
				onLeaveBack: function () {
					$(item).removeClass("on");
					hisConHeight = hisCon.eq(i-1).outerHeight(true)
					if (i) {
						hisLine.css("height", hisCon.eq(i-1).position().top + hisConHeight + "px");
					} else {
						hisLine.css("height", "0px");
					}
				}
			},
		});
	})
}

/* ----------- 카드 모션 ----------- */
gsap.to(pinedList, {
	x: -pinedList.clientWidth + pinedInner.clientWidth,
	scrollTrigger: {
		trigger: ".services",
		start: "top top",
		end: `+=${pinedList.clientWidth}`,
		pin: true,
		scrub: 0.1,
	}
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
		gnb.classList.remove('stickyadd');
		home.style.transform = 'translate(0px, 0px)';
		// home.style.filter = 'unset';
		client.style.cssText = `background-color: rgb(39 38 38 / 70%);`;
		quickMenu.style.display = 'none';
	} else {
		gnb.classList.add('stickyadd');
		home.style.transform = 'unset';
		// home.style.filter = 'blur(2px)';
		client.style.cssText = `background-color: rgb(39 38 38 / 100%);`;
		quickMenu.style.display = 'block';
	}
}

/* ----------- 헤더 메뉴 해당 영역으로 링크 이동 ----------- */
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
		refreshPriority: -1, // 해당 영역에서 새로고침하면 pin 위치 못잡는 현상 대안
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

/* ----------- 텍스트 롤링 모션 ----------- */
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

/* ----------- 텍스트 타입별 모션 ----------- */
// let motionEffect_1 = document.querySelector('.motion-effect-1 .motion-dummy');
// motionEffect_1.innerHTML = motionEffect_1.textContent.replace(/\S/g, '<span class="dummy">$&</span>');
// anime.timeline({
// 	loop: false
// }).add({
// 	targets: '.motion-effect-1 .motion-line',
// 	scaleX: [0, 1],
// 	opacity: [0.5, 1],
// 	easing: "easeInOutExpo",
// 	duration: 2000
// }).add({
// 	targets: '.motion-effect-1 .dummy',
// 	opacity: [0, 1],
// 	translateX: [40, 0],
// 	translateZ: 0,
// 	scaleX: [0.3, 1],
// 	easing: "easeOutExpo",
// 	duration: 8000,
// 	offset: '-=600',
// 	delay: (el, i) => 150 + 25 * i
// }).add({
// 	targets: '.motion-effect-1',
// 	opacity: 1,
// 	duration: 8000,
// 	easing: "easeOutExpo",
// 	delay: 8000,
// });
/* 이건머지 */
  



/* ----------- 텍스트 타입별 모션 ----------- */
const resolver = {
	resolve: function resolve(options, callback) {
	  // The string to resolve
	  const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
	  const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
	  
	  function getRandomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  };
	  
	  function randomCharacter(characters) {
		return characters[getRandomInteger(0, characters.length - 1)];
	  };
	  
	  function doRandomiserEffect(options, callback) {
		const characters = options.characters;
		const timeout = options.timeout;
		const element = options.element;
		const partialString = options.partialString;
  
		let iterations = options.iterations;
  
		setTimeout(() => {
		  if (iterations >= 0) {
			const nextOptions = Object.assign({}, options, {iterations: iterations - 1});
  
			// Ensures partialString without the random character as the final state.
			if (iterations === 0) {
			  element.textContent = partialString;
			} else {
			  // Replaces the last character of partialString with a random character
			  element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
			}
  
			doRandomiserEffect(nextOptions, callback)
		  } else if (typeof callback === "function") {
			callback(); 
		  }
		}, options.timeout);
	  };
	  
	  function doResolverEffect(options, callback) {
		const resolveString = options.resolveString;
		const characters = options.characters;
		const offset = options.offset;
		const partialString = resolveString.substring(0, offset);
		const combinedOptions = Object.assign({}, options, {partialString: partialString});
  
		doRandomiserEffect(combinedOptions, () => {
		  const nextOptions = Object.assign({}, options, {offset: offset + 1});
  
		  if (offset <= resolveString.length) {
			doResolverEffect(nextOptions, callback);
		  } else if (typeof callback === "function") {
			callback();
		  }
		});
	  };
  
	  doResolverEffect(combinedOptions, callback);
	} 
  }
  
  /* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
   * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
   */
  const strings = [
	'대한민국 No.1 웹퍼블리싱 개발 전문 그룹',
	'협력을 통한 성장!',
	'grow with the success of clients',
	'2009 ~ NOW'
  ];  
  let counter = 0;  
  const options = {
	// Initial position
	offset: 0,
	// Timeout between each random character
	timeout: 5,
	// Number of random characters to show
	iterations: 20,
	// Random characters to pick from
	characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
	// String to resolve
	resolveString: strings[counter],
	// The element
	element: document.querySelector('[data-target-resolver]')
  }
  
  // Callback function when resolve completes
  function callback() {
	setTimeout(() => {
	  counter ++;
	  if (counter >= strings.length) {
		counter = 0;
	  }
	  
	  let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
	  resolver.resolve(nextOptions, callback);
	}, 2000);
  }
  
  resolver.resolve(options, callback);

$(document).ready(function () {
	let mousemoveTimer;

	/* ----------- 마우스 커서 효과 ----------- */
	document.addEventListener('mousemove',(e) => {
		let cursor = document.querySelector('.cursor');

		if (cursor.classList.contains('stopped')) {
			cursor.classList.remove('stopped');
		}

		TweenMax.to('.cursor', 0.5, {
			'transform': 'translate('+ e.clientX +'px,'+ e.clientY +'px)',
			ease: "Power.easeOut",
		});

		if (mousemoveTimer !== undefined) {
			clearTimeout(mousemoveTimer);
		}
		mousemoveTimer = setTimeout(() => {
			cursor.classList.add('stopped')
		}, 1500);
	});

	/* ----------- 문의하기 탭 ----------- */
	$('.contact-tab button').on('click', function() {
		$('.contact-tab button').removeClass('active');
		$(this).addClass('active');
		
		let dataTarget = $(this).attr('data-rel');

		$('#'+dataTarget).fadeIn().siblings('.contact-tab-info').hide();

		if ($('#'+dataTarget).css('display') === 'block') {
			kakaoMapCall();
		}

		return false;
	});

	function kakaoMapCall() {
		$('.wrap_map:nth-child(odd), .wrap_controllers').remove();

		new daum.roughmap.Lander({
			"timestamp" : "1707197836419",
			"key" : "2izmh",
		}).render();
	}

	/* ----------- story 영역 ----------- */
	if ($('.storyList').length) {
		$('.storyList').slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			draggable: true,
			prevArrow: '#story .btnArea .prev',
			nextArrow: '#story .btnArea .next',
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
			draggable: true,
			fade: true,
			asNavFor: '.storyList',
			arrows: false
		});
	}

	AOS.init();
	historyAni();
	initrllLst($('.text-rolling-wrap'),1);
});

$(document).on('resize', function() {
	historyAni();
});