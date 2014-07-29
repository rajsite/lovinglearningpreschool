/*global jQuery*/
(function ($) {
    'use strict';
	$.fn.konami = function (callback, code) {
		if (code === undefined) {
            code = "38,38,40,40,37,39,37,39,66,65";
        }
		
		return this.each(function () {
			var kkeys = [];
			$(this).keydown(function konamirocket(e) {
				kkeys.push(e.keyCode);
				if (kkeys.toString().indexOf(code) >= 0) {
					$(this).unbind('keydown', konamirocket);
					callback(e);
				}
			}, true);
		});
	};

}(jQuery));