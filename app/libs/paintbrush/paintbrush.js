/*
 * jQuery Paint Brush v1.0.0
 *
 */

;(function($) {
	var defaults = {
		// Canvas color
		color: '#fff',
		// Thickness of brush (Between 5 and 15)
		ratioRadius: 6,
		// Bone bias rate (Between 3 and 8)
		ratioSpeed: 5,
		// Angle of the brush (angle: 0 - left to rught)
		angle: 3,
		
		// CALLBACKS
		onPaintLoad: function() { return true; }
	};
	
	$.fn.paintBrush = function(options){
		var settings = {};
		var elem = this;
		var width = elem.outerWidth();
		var height = elem.outerHeight();
		
		if ($(elem).data('paintBrush')) { return; }
		
		settings = $.extend({}, defaults, options);

		function createCanvas() {
			var canvas = {};
			canvas.node = document.createElement('canvas');
			canvas.context = canvas.node.getContext('2d');

			elem.append(canvas.node);
			canvas.node.style.backgroundColor = 'transparent';
			canvas.node.style.position = 'absolute';
			canvas.node.style.left = 0;
			canvas.node.style.top = 0;
			
			canvas.node.width  = width;
			canvas.node.height = height;
			return canvas;
		}
		
		var init = function() {

			var canvas = createCanvas();
			if (!canvas) return this;
			var ctx = canvas.context;

			ctx.clearTo = function() {
				ctx.fillStyle = settings.color;
				ctx.fillRect(0, 0, width, height);
			};

			ctx.fillCircle = function(x, y, radius) {
				this.fillStyle = '#ff0000';
				this.beginPath();
				this.moveTo(x, y);
				this.arc(x, y, radius, 0, Math.PI * 2, false);
				this.fill();
			};
			
			ctx.eraserAnimate = function(){
				ctx.fillCircle(x, y, radius);
				x+=dx;
				y+=dy;

				if (x < 0 || x > width) {
					y+=radius;
					dx = -dx;
					dy = -dy;
				} else if (y < 0 || y > height) {
					x+=radius*3;
					dx = -dx;
					dy = -dy;
				}

				if (x > width) x = width;
				if (y > height) y = height;

				if (y >= height && x >= width) {
					clearInterval(eraserInterval);
					settings.onPaintLoad.call(elem);
				}
			};

			ctx.clearTo();

			var radius = (settings.ratioRadius > 0) ? parseInt(width/settings.ratioRadius, 0) : settings.ratioRadius;
			var speed = (settings.ratioSpeed > 0) ? parseInt(radius/settings.ratioSpeed, 0) : settings.ratioSpeed;
			ctx.globalCompositeOperation = 'destination-out';

			var x = 0;
			var y = (settings.angle > 0) ? parseInt(speed/settings.angle, 0) : 0;
			var dx = speed;
			var dy = -y;
			var eraserInterval;

			elem.css('opacity', 1);
			eraserInterval = setInterval(ctx.eraserAnimate, 5);
		}
		
		init();
		
		$(elem).data('paintBrush', this);

		return this;
	};

})(jQuery);