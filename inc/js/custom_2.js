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
        $(window).on("scroll", function () {
            var sTop = $(window).scrollTop(),
                winW = $(window).width(),
                workTop = $("#work")
                    .offset()
                    .top,
                workLast = $(".workList li:last-child")
                    .offset()
                    .top;
            workTit = $("#work .titArea");

            if (winW > 961) {
                if (sTop >= workTop - 100 && sTop <= workLast - 100) {
                    $(workTit).css({
                        'top': sTop - workTop + 100 + "px"
                    });
                } else if (sTop < workTop) {
                    $(workTit).css({
                        'top': 0 + "px"
                    });
                }
            } else {
                $(workTit).css({'top': 0});
            }
        });

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
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 761,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        variableWidth: true
                    }
                }
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

// function Marquee(selector, speed, reverse) {
//     const parentSelector = document.querySelector(selector); // 클래스명을 인자로 받은 매개변수
//     const clone = parentSelector.innerHTML; // 해당 클래스 엘리먼트의 html 값을 clone으로 선언
//     const firstElement = parentSelector.firstElementChild;
//     let i = 0;
//     // console.log(firstElement);
//     parentSelector.insertAdjacentHTML('beforeend', clone);
//     parentSelector.insertAdjacentHTML('beforeend', clone);
    
//     if (reverse) parentSelector.classList.add('reverse');
    
//     const moveItem = () => {
//         if (reverse) {
//         firstElement.style.marginRight = `-${i}px`;
//         } else {
//         firstElement.style.marginLeft = `-${i}px`;
//         }
//         if (i > firstElement.clientWidth) i = 0;
//         i += speed;
//         requestAnimationFrame(moveItem);
//     }
//     requestAnimationFrame(moveItem); // 움직임을 계속해서 주기 위해 requestAnimationFrame 사용
// }
// window.addEventListener('load', function(){
//     Marquee('.client-logo-list', 1, false);
// });

window.addEventListener('load', function(){
    const items = [...document.querySelectorAll('.client-logo-list li')];
    let containerElem = document.querySelector('.client-logo');
    let leftSideOfContainer = containerElem.getBoundingClientRect().left;
    let listElem = document.querySelector('.client-logo-list');
    let currentLeftValue = 0;

    window.setInterval(marquee, 10);

    function marquee() {
        const firstListItem = listElem.querySelector('.client-logo-list li:first-child');

        let rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;

        if(rightSideOfFirstItem == leftSideOfContainer){
        currentLeftValue = -1;
        listElem.appendChild(firstListItem);
        }

        listElem.style.transform = `translateX(${currentLeftValue}px)`;
        currentLeftValue--;
    }
});