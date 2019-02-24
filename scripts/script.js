var CountSlider = 0;
var Blocked = false;

$("#sliders").ready(function(){
	bindSlider();
	resizeSliders();
	$(window).resize(function(){
		resizeSliders();
	});
	$("img").mousedown(function(){
		return false;
	});
	function resizeSliders(){
		var mas = [86, 21, -30, -122];
		var newHeigth = $("#sliders .slider:nth-of-type(" + (CountSlider + 1) + ")").children().is("img") ? Number.parseFloat($("#sliders .slider:nth-of-type(" + (CountSlider + 1) + ") img").css("height")) : Number.parseFloat($("#sliders .slider:nth-of-type(" + (CountSlider + 1) + ") video").css("height"));
		var text = $("#sliders .slider .resize");
	
		for(var i = 0; i < $("#sliders .slider").length; i++){
			var $text = $("#sliders .slider").eq(i).find(".resize");
			for(var c = 0; c < 4; c++){
				$text.eq(c).css("bottom", Math.abs(newHeigth)/2 + mas[c]);
			}
		}
	
		$("#sliders").css("height", newHeigth);
	}
});
$("#video_presentation").ready(function(){
	$("#video_presentation").css("height", $("#video_presentation img").css("height"));
});
$(function(){
	$(window).resize(function(){
		$("#video_presentation").css("height", $("#video_presentation img").css("height"));
	});
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
		if(nextCountSlider == CountSlider){
			Blocked = false;
			return;
		}
	
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
		$nextSlide.find(".shift").slideUp(0);
		$nextSlide.find(".slider_button").slideUp(0);
		$nowSlide.find(".shift").slideUp(600);
		$nowSlide.find(".slider_button").slideUp(600,function(){
			$nextSlide.animate({left: 0},{duration: 2000});
			$nowSlide.animate({left: width},
				{
					duration: 2000,
					complete: function(){
						$nowSlide.find(".shift").slideDown(0);
						$nowSlide.find(".slider_button").slideDown(0);
						$nextSlide.find(".shift").slideDown(600);
						$nextSlide.find(".slider_button").slideDown(
							{
								duration: 600,
								complete: function(){
									$nowSlide.css("display", "none");
									$nowSlide.animate({left: 0},0);
									Blocked = false;
									if($nowSlide.children().is("video")){ 
										$nowSlide.find("video").get(0).pause();
										$nowSlide.find("video").get(0).currentTime = 0;
										$nowSlide.find(".darkness").css({"opacity": 0.1})
									}
									if($nextSlide.children().is("video")){ 
										$nextSlide.find("video").get(0).play();
										$nextSlide.find(".darkness").css({"opacity": 0.3})
									}
								}
						});
					}
			});		
		});
	}
	function animationDots(nextCountSlider){
		$("#sliders .dot.active").removeClass("active");
		$("#sliders .dot:nth-of-type(" + (nextCountSlider + 1) +")").addClass("active");
	}
};