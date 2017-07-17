(function ($) {
	if (!$) {
		console.error( 'jquery.exitintent.js plugin needs jQuery to work; skipping it...' );
		return;
	}


	var timer;

	function trackLeave(ev) {

		if (timer) {
			clearTimeout(timer);
		}

		if ($.exitIntent.settings.sensitivity <= 0) {
			$.event.trigger('exitintent');
			return;
		}

		timer = setTimeout(
			function() {
				timer = null;
				$.event.trigger('exitintent');
			}, $.exitIntent.settings.sensitivity);
	}

	function trackEnter() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}

	$.exitIntent = function(enable, options) {
		$.exitIntent.settings = $.extend($.exitIntent.settings, options);

		if (enable == 'enable') {
			$(document).mouseleave(trackLeave);
			$(document).mouseenter(trackEnter);
		} else if (enable == 'disable') {
			trackEnter(); // Turn off any outstanding timer
			$(document).unbind('mouseleave', trackLeave);
			$(document).unbind('mouseenter', trackEnter);
		} else {
			throw "Invalid parameter to jQuery.exitIntent -- should be 'enable'/'disable'";
		}
	};

	$.exitIntent.settings = {
		'sensitivity': 300
	};

})(typeof jQuery!=='undefined' ? jQuery : false);
