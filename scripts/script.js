var InWindow = [];
var CountSlider = 0;
var Blocked = false;
var XDown = null;
var SliderTime;
var allowedTime = 200;
var threshold = 70; 
var IsMobileMenu = false;

$("#sliders").ready(function(){
	bindSlider();
	resizeSliders();
	$(window).resize(function(){
		resizeSliders();
	});
 	$("#sliders img").mousedown(function(){ return false;});
	 $("#sliders").get(0).addEventListener('touchstart', function (evt) {
		XDown = evt.touches[0].clientX;
		SliderTime = new Date().getTime();
	}, false);
	$("#sliders").get(0).addEventListener('touchend', function(evt){
		if (!XDown) {
		    return;
		}
		var elapsedTime = new Date().getTime() - SliderTime;
		var xUp = evt.changedTouches[0].pageX;
		var xDiff = XDown - xUp;
		f = elapsedTime <= allowedTime && !Blocked;
		if (xDiff > threshold && f) {
			Blocked = true; 
			changeSliders(-2);
		} else if(f && xDiff < -threshold){
			Blocked = true;
			changeSliders(-1);
		}                       
		XDown = null;  
	},false);


/*          FUNCS         */



  function resizeSliders(){
    var mas = [86, 21, -30, -122];
    if(screen.width < 550) mas[0]=60;
		var newHeigth = $("#sliders .slider:nth-of-type(" + (CountSlider + 1) + ")").children().is("img") ? Number.parseFloat($("#sliders .slider:nth-of-type(" + (CountSlider + 1) + ") img").css("height")) : Number.parseFloat($("#sliders .slider:nth-of-type(" + (CountSlider + 1) + ") video").css("height"));
		
    for(var i = 0; i < $("#sliders .slider").length; i++){
      var $text = $("#sliders .slider").eq(i).find(".resize");
      for(var c = 0; c < 4; c++){
        $text.eq(c).css("bottom", Math.abs(newHeigth)/2 + mas[c]);
      }
    }
  
    $("#sliders").css("height", newHeigth);
  }
  function bindSlider(){
  	$("#sliders .arrow").each(function(k){
  		bindElement($(this), k-2);
  	});
  	$("#sliders .dot").each(function(k){
  		bindElement($(this), k);
  	});
  	$("#sliders .slider .slider_button").each(function(){
  		bindElement($(this), -1);
  	});
  	function bindElement(element, k){
  		element.bind("click" ,function(){
  			if(!Blocked){
  				Blocked = true; 
  				changeSliders(k);
  			}
  	});
		};
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
});


$(".up_arrow").ready(function(){
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
	$(window).scroll(function(){ window.scrollY==0 ? $(".up_arrow").removeClass("scrolled") : $(".up_arrow").addClass("scrolled");});
});

$("nav").ready(function(){
	$(window).scroll(function(){ window.scrollY==0 ? window.screen.width > 1080 ? $("nav").removeClass("scrolled"): false : $("nav").addClass("scrolled");});
	$(window).resize(function(){ window.screen.width <= 1080 ? $("nav").addClass("scrolled") : $(".mobile_menu").slideUp(1000), IsMobileMenu = IsMobileMenu ? false : true;});
	window.screen.width <= 1080 ? $("nav").addClass("scrolled") : false;
	$(".open_mobile_menu").bind("click", function(){
		IsMobileMenu ? $(".mobile_menu").slideUp(1000) : $(".mobile_menu").slideDown(1000);
		IsMobileMenu = IsMobileMenu ? false : true;
	});
});

$("#video_presentation").ready(function(){
	$("#video_presentation").css("height", $("#video_presentation img").css("height"));
	$(window).resize(function(){
		$("#video_presentation").css("height", $("#video_presentation img").css("height"));
	});
});

$("#contents").ready(function(){
	$("#contents").css("height", $("#contents .bg").css("height"));
	$(window).resize(function(){
		$("#contents").css("height", $("#contents .bg").css("height"));
	});
});

$("#width").ready(function(){
	window.innerWidth <= 370 ? $("#width").attr("content", "width=370, user-scalable=no") : $("#width").attr("content", "width=device-width, user-scalable=no");
	$(window).resize(function(){
		window.innerWidth <= 370 ? $("#width").attr("content", "width=370, user-scalable=no") : $("#width").attr("content", "width=device-width, user-scalable=no");
	});
});

$("#counter").ready(function(){
	$("#counter .count").each(function(){
		InWindow.push(false);
	});
	$(window).scroll(function(){
		$("#counter .count").each(function(index){
			var positionTop = $(this).offset().top;
			var top = window.scrollY;
			var bottom = window.innerHeight + window.scrollY;
			var f = positionTop > top && positionTop < bottom;
			if(!InWindow[index] && f){
				var count =  $(this).text();
				$(this).text("0").animate(
					{content: count},
	        {
						duration: 2500,
						easing: 'swing',
						step: function(now){
										$(this).text(Math.ceil(now));
									}
					});
				InWindow[index] = true;
			}
			if(InWindow[index] && !f){
				InWindow[index] = false;
			}
		});
	});

});
$(function(){
	window.scrollTo(1,0);
	window.scrollTo(0,0);
});
