/*global aiaa, $*/

// (function (aiaa) { aiaa.poopytoo = "hello"; } (aiaa));



//global variables
aiaa.konamiEnabled = 'false';
aiaa.navLastLink = '';

//global ajax error handler
$(document).ajaxError(function (e, xhr, settings, exception) {
    'use strict';
	//check if the ajax error may have been from the nav loader
	if (aiaa.navLastLink === settings.url) {
		$("td.scroller").stop(true, true).fadeTo("fast", 1);
	}
	//alert('error in: ' + settings.url + ' \\n'+'error:\\n' + exception);
});

// function loadNewScrollerFromLink
// param: link
// usage: takes the given link, dynamically loads that page and searches for the scoller content on that page
//        the data from the loaded page scroller is then formatted and injected into this page scroller
// ASSUMPTIONS: This script ONLY works if all the linked pages are in the SAME level directory, NO SUB DIRECTORIES
aiaa.loadNewScrollerFromLink = function (link) {
    'use strict';
	//fade out the scroller before loading the directory
	$("td.scroller").fadeTo("fast", 0);

	//get the linked page and start processing
    $.get(link, function (responseText, textStatus) {
		//Load the scroller text and inject in this page
		//since all files in the same directory, routing issues shouldn't happen
		$("#scroller").html($("#scroller", responseText).html());
		
		//done loading so fade back in!
		$("td.scroller").stop(true, true).fadeTo("fast", 1);
	});
};


//run when the document object mmodel has loaded
$(document).ready(function () {
    'use strict';
	//Activate the navbar scroller script
	$("td.nav, td.navjoin").hoverIntent({
		sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)    
		interval: 45, // number = milliseconds for onMouseOver polling interval    
		over: function () {  // function = onMouseOver callback (REQUIRED)    
			//Get the hovered link
			var link = $(this).children("a").attr("href");
			
			//check if the link is the same as the last one, 
			//assumes loaded correctly last time so don't load again
			if (link !== aiaa.navLastLink) {
				//First set the last link for the error handler
				aiaa.navLastLink = link;
				//Then try to load the file
				aiaa.loadNewScrollerFromLink(link);
			}
		},
		timeout: 100, // number = milliseconds delay before onMouseOut    
		out: function () { // function = onMouseOut callback (REQUIRED) 
		//empty function
		}
	});
	
	//make each navbar cell clickable instead of just the test link
	$('td.nav, td.navjoin').click(function () {
		document.location = $(this).children('a').attr('href');
	});
	
	//ie hover fix for nav bar
	$('td.nav').hover(function () {
		$(this).addClass('td-nav-ie-hover');
		$(this).children('a').removeClass('nav');
		$(this).children('a').addClass('a-nav-ie-hover');
	}, function () {
		$(this).removeClass('td-nav-ie-hover');
		$(this).children('a').addClass('nav');
		$(this).children('a').removeClass('a-nav-ie-hover');
	});

	//ie hover fix for nav bar join button
	$('td.navjoin').hover(function () {
		$(this).addClass('td-navjoin-ie-hover');
		$(this).children('a').removeClass('navjoin');
		$(this).children('a').addClass('a-navjoin-ie-hover');
	}, function () {
		$(this).removeClass('td-navjoin-ie-hover');
		$(this).children('a').addClass('navjoin');
		$(this).children('a').removeClass('a-navjoin-ie-hover');
	});


	//gallery fade effect
	$('p.gallery').children().hover(function () {
		$(this).siblings().stop().fadeTo(500, 0.5);
	}, function () {
		$(this).siblings().stop().fadeTo(500, 1);
	});

	
	//valid css and xhtml button effect
	//Note: if a script changes the rel attr of the links, then functionality will break
	$('a.hover').children('img').each(function (index, obj) {
	
		//save the original image url
		$(obj).parent().attr('rel', $(obj).attr('src'));
	
		//make the hover element
		$(obj).hover(function () {
			$(this).attr('src', $(this).attr('src').replace('-hover', ''));
		}, function () {
			$(this).attr('src', $(this).parent().attr('rel'));
		});
	});
	

	//secret konami code ;)
	aiaa.konamiEnabled = $.cookie('konamiEnabled');
	if (aiaa.konamiEnabled === 'true') {
		$('body').css('background-image', $('body').css('background-image').replace('background', 'backgroundk'));
        $('body').css('background-color', 'black');
	}
	$(window).konami({cheat: function () {
		$('body').css('background-image', $('body').css('background-image').replace('background', 'backgroundk'));
        $('body').css('background-color', 'black');
		$.cookie('konamiEnabled', 'true');
    }});
	$(window).konami({cheat: function () {
		aiaa.loadScript(null, 'js/asteroids.min.js');
	}});
	

});