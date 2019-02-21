var CountSlider = 0;
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
	},20);
});


function bindSlider(){
	for(var k = -2; k < 0; k++){
		bindElement($("#sliders .arrow")[k+2], k);
	}
	for (var k = 0; k < $("#sliders .dot").length; k++) {
		bindElement($("#sliders .dot")[k], k);
	}
	function bindElement(element, k){
		element.addEventListener("click" ,function(){
		changeSliders(k);
	})
	};
	function changeSliders(i){
		switch(i){
			case -2: {
				animationSlid(CountSlider-1);
				break;
			}
			case -1: {
				animationSlid(CountSlider+1);
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
	
};
function animationSlid(nextCountSlider){
	if(nextCountSlider < 0){
		nextCountSlider = 2;
	}else if(nextCountSlider > 2){
		nextCountSlider = 0;
	}

	var $nextSlide = $("#sliders .slider:nth-of-type(" + (nextCountSlider + 1) +")");
	var $nowSlide = $("#sliders .slider:nth-of-type(" + (CountSlider + 1) +")");
	
	if(nextCountSlider < CountSlider){
		$nextSlide.animate({left: (-window.screen.width) + ''},0);
		$nextSlide.css("display", "");
		$nextSlide.animate({left: '0'},1500);
		$nowSlide.animate({left: window.screen.width + ''},1500,function(){$nowSlide.css("display", "none");$nowSlide.animate({left: '0'},0);});

	}else{
		$nextSlide.animate({left: window.screen.width + ''},0);
		$nextSlide.css("display", "");
		$nextSlide.animate({left: '0'},1500);
		$nowSlide.animate({left: (-window.screen.width) + ''},1500,function(){$nowSlide.css("display", "none");$nowSlide.animate({left: '0'},0);});
	}

	CountSlider = nextCountSlider;


	// $nextSlide.fadeToggle(1000);
	// $nextSlide.addClass("active");
	// $nowSlide.removeClass("active");
	// $("#sliders .dot.active").removeClass("active");
	// $("#sliders .dot:nth-of-type(" + (nextCountSlider + 1) +")").addClass("active");
	// CountSlid = nextCountSlider;
}