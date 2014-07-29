//set-up global object
if(typeof window.aiaa == 'undefined') {
	window.aiaa = {};
}


aiaa.loadStyle = function(url)
{
	//<link type="text/css" href="files_template/style.css" rel="stylesheet"  media="screen" />
	var style = document.createElement('link');
	style.type = 'text/css';
	style.href = url;
	style.rel = 'stylesheet';
	style.media = 'screen';
	document.getElementsByTagName('head')[0].appendChild(style);
}

//The max iterations that should be done before failing to load script, total time = 10*setTimeOut length
aiaa.maxIterationNum = 10;

// loads a script at a given link based on loadCondition, ie. 'jQuery' waits for jQuery to be defined before running and 'jQuery.fn.hoverIntent' waits for hoverIntent
aiaa.loadScript = function(loadCondition, scriptLink, scriptAsync, callbackFN, iterationNum)
{
	if(eval('typeof ' + loadCondition) == 'undefined')
	{
		if(typeof iterationNum != 'number')
		{
			iterationNum = 0;
		}
		
		if(iterationNum < aiaa.maxIterationNum)
		{
			iterationNum = iterationNum +1;
			
			//				http://www.west-wind.com/weblog/posts/5033.aspx
			setTimeout(function() {
				aiaa.loadScript(loadCondition, scriptLink, scriptAsync, callbackFN, iterationNum);
				}, 100);
		}
	}
	else
	{
		if(typeof scriptLink == 'string')
		{
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(scriptAsync == true)
			{
				script.async = true;
			}
			script.src = scriptLink;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	
		if (typeof callbackFN == 'function')
		{
			callbackFN.call(this);
		}
	}
}
//load jquery base
aiaa.loadScript(null,'files_template/jquery-1.4.4_min.js');

//load jquery hoverIntent plugin, used for navbar and gallery
aiaa.loadScript('jQuery','files_template/jquery.hoverIntent.minified.js');

//load jquery slimbox plugin, used to show images in galleries
aiaa.loadStyle('files_template/slimbox2.css');
aiaa.loadScript('jQuery','files_template/slimbox2.js');

//load jquery cookie plugin
aiaa.loadScript('jQuery','files_template/jquery.cookie.js');

//load jquery konami plugin ;)
aiaa.loadScript('jQuery','files_template/konami.js');

//execute scripts for aiaa website
aiaa.loadScript('jQuery','files_template/aiaa.js');

//load google analytics
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-24591701-1']);
  _gaq.push(['_setDomainName', '.parmerlanepreschool.com']);
  _gaq.push(['_trackPageview']);
aiaa.loadScript('jQuery','http://www.google-analytics.com/ga.js', true);


