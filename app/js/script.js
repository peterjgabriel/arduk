$(function(){
	'use strict';
	//Slider
	var $owl = $('.owl');
	$owl.each( function() {
		var $a = $(this);
		$a.owlCarousel({
			singleItem: JSON.parse($a.attr('data-singleItem')),
			items : $a.attr('data-items'),
			itemsDesktop : [1199,$a.attr('data-itemsDesktop')],
			itemsDesktopSmall : [992,$a.attr('data-itemsDesktopSmall')],
			itemsTablet:  [797,$a.attr('data-itemsTablet')],
			itemsMobile :  [479,$a.attr('data-itemsMobile')],
			navigation : JSON.parse($a.attr('data-buttons')),
			pagination: JSON.parse($a.attr('data-pag')),
			autoPlay: JSON.parse($a.attr('data-autoPlay')),
			navigationText: ["",""]
		});
	});
	//Menu rs
	$('.menu-btn').on('click',function(e){	
		if($(this).hasClass('active'))
		{
			$('.menu-rs').animate({right: '-250px'},500);
		}
		else
		{
			$('.menu-rs').animate({right: '0px'},500);
		}
	});
	$('.r-mv').on('click',function(){
		$('.menu-rs').animate({right: '-250px'},500);
	});
	window.onresize = function()
	{
		mr_top();
	}
	function mr_top(){
		$('.header-fixed').next().css('marginTop',($('header').height())+'px');
	}
	mr_top();
	//Preloander
	$(window).load(function()
	{
		$('.preloader i').fadeOut();
		$('.preloader').delay(500).fadeOut('slow');
		$('body').delay(600).css({'overflow':'visible'});
	});
	//cart dropdown 
	$('.cart .dropdown-menu').on('click',function(e) {
		e.stopPropagation();  
	});
	//zoom image
	$('.image-zoom').magnificPopup({
		type:'image',
		gallery:{
			enabled:true
		}
	});
	//Search form
	$('.search-box').on('click',function(e) 
	{
		e.stopPropagation(); 
	});
	$('.icon-search').on('click',function(e) 
	{
		$('.search-txt').val('');
		$('.search-box').fadeIn();
		e.stopPropagation(); 
	});
	$('.search-txt').keypress(function(event){
	  if(event.keyCode == 13){
		$('.search-box').fadeOut();
	  }
	});
	$('body').click(function(){
		$('.search-box').fadeOut();
	});
});