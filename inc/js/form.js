$(document).ready(function(){
// 클라이언트
var clientLogo = $('.clientLogo'),
clientLogoOption = {
infinite : true,
dots : false,
arrows: false,
vertical: true,
verticalSwiping:false,
autoplay: true,
pauseOnHover: false,
draggable : false,
cssEase: 'linear',
slidesToShow: 1,
slidesToScroll: 1,
autoplaySpeed : 0,
speed : 20000
};
clientLogo.slick(clientLogoOption);


var tabArea = $(".tabArea");


if (tabArea.length > 0) {


for(var i=0 ; i<tabArea.length ; i++) {
var tabMenu = tabArea.eq(i).find("ul.tabMenu > li"),
tabCon = tabArea.eq(i).find(".tabCon");


tabMenu.removeClass("on").eq(0).addClass("on");
tabCon.hide(0).eq(0).show(0);
}


tabArea.on("click", "ul.tabMenu a", function(){
var currTabMenu =  tabArea.find("ul.tabMenu li"),
currTabCon =  tabArea.find(".tabCon"),
currIdx = $(this).parent().index();


currTabMenu.removeClass("on").eq(currIdx).addClass("on");
currTabCon.hide(0).eq(currIdx).show(0);


if( $(clientLogo).hasClass('slick-initialized') ){ // slick 껏다 키기
clientLogo.slick('unslick').slick(clientLogoOption);
}


return false
});
}


// work
if($('#work').length){
$(window).on("scroll", function(){
var sTop = $(window).scrollTop(),
winW = $(window).width(),
workTop = $("#work").offset().top,
workLast = $(".workList li:last-child").offset().top;
workTit = $("#work .titArea");


if(winW > 961){
if(sTop >= workTop -100 && sTop <= workLast - 100){
$(workTit).css({
'top' : sTop - workTop + 100 + "px"
});
}else if(sTop < workTop){
$(workTit).css({
'top' : 0 + "px"
});
}
}else{
$(workTit).css({'top' : 0 });
}
});


$('#work').find('.more a').click(function(){
$('.workList').css('height', 'auto');
$(this).fadeOut();
});
}


if($('.storyList').length){
$('.storyList').slick({
dots: false,
infinite: true,
speed: 300,
slidesToShow: 1,
slidesToScroll: 1,
draggable : false,
prevArrow: "#story .btnArea .prev",
nextArrow: "#story .btnArea .next",
asNavFor : '.storyTxt',
responsive: [
{
  breakpoint: 961,
  settings: {
slidesToShow: 2,
slidesToScroll: 1,


  }
},
{
  breakpoint: 761,
  settings: {
slidesToShow: 1,
slidesToScroll: 1,
centerMode: true,
variableWidth: true
  }
},
]
});
}


if($('.storyTxt').length){
$('.storyTxt').slick({
dots: false,
infinite: true,
speed: 300,
slidesToShow: 1,
draggable : false,
fade: true,
asNavFor : '.storyList',
arrows: false,
});
}




AOS.init();


});