var CountSlider = 0;
var Blocked = false;
$(function(){
	bindSlider();
});

$(window).scroll(function(){
	var c = document.querySelector("nav");
	if(window.scrollY==0){
		$("nav").removeClass("scrolled");
		$(".up_arrow").removeClass("scrolled");
		
	}else{
		$("nav").addClass("scrolled");
		$(".up_arrow").addClass("scrolled");
  }
});

$(".up_arrow").click(function(){
	var i = 1;
	var l = setInterval(function(){
		if(window.scrollY < i){
			window.scrollTo(0, 0);
			clearInterval(l);
		}else{
			window.scrollTo(0, window.scrollY - i);
			if(i < 120) i *= 1.1;
		}
	},15);
});


function bindSlider(){
	for(var k = -2; k < 0; k++){
		bindElement($("#sliders .arrow:nth-of-type(" + (k+3) +")"), k);
	}
	for (var k = 0; k < $("#sliders .dot").length; k++) {
		bindElement($("#sliders .dot:nth-of-type(" + (k+1) +")"), k);
	}
	function bindElement(element, k){
		element.bind("click" ,function(){
			if(!Blocked){
				Blocked = true; 
				changeSliders(k);
			}
	});
	};
	function changeSliders(i){
		switch(i){
			case -2: {
				animationSlidLeft(CountSlider-1);
				break;
			}
			case -1: {
				animationSlidRight(CountSlider+1);
				break;
			}
			case 0: {
				animationSlid(0);
				break;
			}
			case 1: {
				animationSlid(1);
				break;
			}
			case 2: {
				animationSlid(2);
				break;
			}
		}
	};
	function animationSlidLeft(nextCountSlider){
		nextCountSlider = sliderCheck(nextCountSlider);
	
		var $nextSlide = $("#sliders .slider:nth-of-type(" + (nextCountSlider + 1) +")");
		var $nowSlide = $("#sliders .slider:nth-of-type(" + (CountSlider + 1) +")");
	
		animationSlidLeftOrRight($nowSlide, $nextSlide, -1);
	
		animationDots(nextCountSlider);
	
		CountSlider = nextCountSlider;
	}
	function animationSlidRight(nextCountSlider){
		nextCountSlider = sliderCheck(nextCountSlider);
	
		var $nextSlide = $("#sliders .slider:nth-of-type(" + (nextCountSlider + 1) +")");
		var $nowSlide = $("#sliders .slider:nth-of-type(" + (CountSlider + 1) +")");
	
		animationSlidLeftOrRight($nowSlide, $nextSlide, 1);
	
		animationDots(nextCountSlider);
	
		CountSlider = nextCountSlider;
	}
	function animationSlid(nextCountSlider){
		nextCountSlider = sliderCheck(nextCountSlider);
	
		var $nextSlide = $("#sliders .slider:nth-of-type(" + (nextCountSlider + 1) +")");
		var $nowSlide = $("#sliders .slider:nth-of-type(" + (CountSlider + 1) +")");
		
		nextCountSlider < CountSlider ? animationSlidLeftOrRight($nowSlide, $nextSlide, 1) : animationSlidLeftOrRight($nowSlide, $nextSlide, -1);
		
		animationDots(nextCountSlider);
	
		CountSlider = nextCountSlider;
	
	}
	function sliderCheck(nextCountSlider){
		if(nextCountSlider < 0){
			nextCountSlider = 2;
		}else if(nextCountSlider > 2){
			nextCountSlider = 0;
		}
		return nextCountSlider;
	}
	function animationSlidLeftOrRight($nowSlide, $nextSlide, k){
		var width = (Number.parseInt($("#sliders").css("width")) + 10) * k;
		$nextSlide.animate({left: -width},0);
		$nextSlide.css("display", "");
		$nextSlide.animate({left: 0},2000);
		$nowSlide.animate({left: width},2000,function(){$nowSlide.css("display", "none");$nowSlide.animate({left: 0},0);Blocked = false;});
	}
	function animationDots(nextCountSlider){
		$("#sliders .dot.active").removeClass("active");
		$("#sliders .dot:nth-of-type(" + (nextCountSlider + 1) +")").addClass("active");
	}
};
