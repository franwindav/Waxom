window.onscroll = function(){
	var c = document.querySelector("nav");
	if(window.scrollY==0){
		c.classList.remove("scrolled");
	}else{
		c.classList.add("scrolled");
  }
};