/*global aiaa, $*/
/*jslint evil: true*/
/*******************************************
* Script from http://www.queness.com/post/1450/jquery-photo-slide-show-with-slick-caption-tutorial-revisited
*******************************************/

function slideShow(speed) {
    'use strict';
	//append a LI item to the UL list for displaying caption
	$('ul.slideshow').append('<li id="slideshow-caption" class="caption"><div class="slideshow-caption-container"><h3></h3><p></p></div></li>');

	//Set the opacity of all images to 0
	$('ul.slideshow li').css({opacity: 0.0});
	
	//Get the first image and display it (set it to full opacity)
	$('ul.slideshow li:first').css({opacity: 1.0});
	
	//Get the caption of the first image from REL attribute and display it
//	$('#slideshow-caption h3').html($('ul.slideshow a:first').find('img').attr('title'));
//	$('#slideshow-caption p').html($('ul.slideshow a:first').find('img').attr('alt'));
	$('#slideshow-caption h3').html($('ul.slideshow li:first').find('img').attr('title'));
	$('#slideshow-caption p').html($('ul.slideshow li:first').find('img').attr('alt'));
		
	//Display the caption
	$('#slideshow-caption').css({opacity: 0.7, bottom: 0});
	
	//Call the gallery function to run the slideshow	
	var timer = setInterval('gallery()', speed);
	
	//pause the slideshow on mouse over
/*
	$('ul.slideshow').hover(
		function () {
			clearInterval(timer);
        },
		function () {
			timer = setInterval('gallery()',speed);			
		}
	);
*/
	
}

function gallery() {
    'use strict';
    var current, next, title, desc;
    //if no IMGs have the show class, grab the first image
	current = (($('ul.slideshow li.show').length > 0) ? $('ul.slideshow li.show') : $('#ul.slideshow li:first'));

	//Get next image, if it reached the end of the slideshow, rotate it back to the first image
	next = ((current.next().length) ? ((current.next().attr('id') === 'slideshow-caption') ? $('ul.slideshow li:first') : current.next()) : $('ul.slideshow li:first'));
		
	//Get next image caption
	title = next.find('img').attr('title');
	desc = next.find('img').attr('alt');
		
	//Set the fade in effect for the next image, show class has higher z-index
	next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000);
	
	//Hide the caption first, and then set and display the caption
	$('#slideshow-caption').animate({bottom: -70}, 300, function () {
        //Display the content
        $('#slideshow-caption h3').html(title);
        $('#slideshow-caption p').html(desc);
        $('#slideshow-caption').animate({bottom: 0}, 500);
	});

	//Hide the current image
	current.animate({opacity: 0.0}, 1000).removeClass('show');
}

aiaa.loadScript('jQuery', null, false, function () {
    'use strict';
    $(document).ready(function () {
        //Execute the slideShow, set 4 seconds for each images
        slideShow(7000);
    });
});