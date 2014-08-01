/*jslint nomen: true, evil: true*/

//set-up global object
var aiaa = (function () {
    'use strict';
    var maxIterationNum = 10, //The max iterations that should be done before failing to load script, total time = 10*setTimeOut length
        _gaq = []; // Google Analytics variable
    
    function loadStyle(url) {
        //<link type="text/css" href="css/style.css" rel="stylesheet"  media="screen" />
        var style = document.createElement('link');
        style.type = 'text/css';
        style.href = url;
        style.rel = 'stylesheet';
        style.media = 'screen';
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    // loads a script at a given link based on loadCondition, ie. 'jQuery' waits for jQuery to be defined before running and 'jQuery.fn.hoverIntent' waits for hoverIntent
    function loadScript(loadCondition, scriptLink, scriptAsync, callbackFN, iterationNum) {
        if (eval('typeof ' + loadCondition) === 'undefined') {
            if (typeof iterationNum !== 'number') {
                iterationNum = 0;
            }

            if (iterationNum < maxIterationNum) {
                iterationNum = iterationNum + 1;

                // http://www.west-wind.com/weblog/posts/5033.aspx
                setTimeout(function () {
                    loadScript(loadCondition, scriptLink, scriptAsync, callbackFN, iterationNum);
                }, 100);
            }
        } else {
            if (typeof scriptLink === 'string') {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                if (scriptAsync === true) {
                    script.async = true;
                }
                script.src = scriptLink;
                document.getElementsByTagName('head')[0].appendChild(script);
            }

            if (typeof callbackFN === 'function') {
                callbackFN.call(window);
            }
        }
    }
    
    //load jquery base
	loadScript(null, 'js/jquery-1.11.1.min.js');

    //load jquery hoverIntent plugin, used for navbar and gallery
    loadScript('jQuery', 'js/jquery.hoverIntent.minified-1.8.0.js');

    //load jquery slimbox plugin, used to show images in galleries
    loadStyle('css/slimbox2.css');
    loadScript('jQuery', 'js/slimbox-2.0.5.js');

    //load jquery cookie plugin
    loadScript('jQuery', 'js/jquery.cookie-1.4.1.js');

    //load jquery konami plugin ;)
    loadScript('jQuery', 'js/konami.js');

    //execute scripts for aiaa website
    loadScript("(( (typeof jQuery !== 'undefined') &&\
	               (typeof jQuery.fn.hoverIntent === 'function') &&\
                   (typeof jQuery.fn.konami === 'function') &&\
				   (typeof jQuery.cookie === 'function')) ? 'defined' : undefined )", 'js/aiaa.js');
    
    
    //load google analytics
    _gaq.push(['_setAccount', 'UA-24591701-1']);
    _gaq.push(['_setDomainName', '.parmerlanepreschool.com']);
    _gaq.push(['_trackPageview']);
    loadScript('jQuery', 'http://www.google-analytics.com/ga.js', true);
    
    return {
        loadScript: loadScript,
        loadStyle: loadStyle
    };
}());
