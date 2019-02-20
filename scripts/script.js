var CountSlid = 0;
bindSlider();

$(window).scroll(function(){
	var c = document.querySelector("nav");
	if(window.scrollY==0){
		$("nav").removeClass("scrolled");
		$(".up_arrow .container").removeClass("scrolled");
		
	}else{
		$("nav").addClass("scrolled");
		$(".up_arrow .container").addClass("scrolled");
  }
});

$(".up_arrow > .container").click(function(){
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
		bindElement($("#home .arrow")[k+2], k);
	}
	for (var k = 0; k < $("#home .dot").length; k++) {
		bindElement($("#home .dot")[k], k);
	}
	function bindElement(element, k){
		element.addEventListener("click" ,function(){
		changeSliders(k);
	})
	};
	function changeSliders(i){
		switch(i){
			case -2: {
				animationSlid(CountSlid-1);
				break;
			}
			case -1: {
				animationSlid(CountSlid+1);
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
	function animationSlid(nextCountSlider){
		if(nextCountSlider < 0){
			nextCountSlider = 2;
		}else if(nextCountSlider > 2){
			nextCountSlider = 0;
		}
	
		var $nextSlide = $("#home .slider:nth-of-type(" + (nextCountSlider + 1) +")");
		var $nowSlide = $("#home .slider.active");
	
		$nowSlide.css("display", "none");
		$nextSlide.fadeToggle(1000);
		$nextSlide.addClass("active");
		$nowSlide.removeClass("active");
		$("#home .dot.active").removeClass("active");
		$("#home .dot:nth-of-type(" + (nextCountSlider + 1) +")").addClass("active");
		CountSlid = nextCountSlider;
	}
};