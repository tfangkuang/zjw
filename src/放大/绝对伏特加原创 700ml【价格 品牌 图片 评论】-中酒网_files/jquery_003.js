(function(a) {
	a.fn.circliful = function(b) {
		var c = a.extend({
			foregroundColor: "#556b2f",
			backgroundColor: "#eee",
			fillColor: false,
			width: 15,
			dimension: 200,
			size: 15,
			percent: 50,
			animationStep: 1
		}, b);
		return this.each(function() {
			var F = "";
			var s = "";
			var E = "";
			var v = "";
			var t = 0;
			var e = 0;
			var l = 100;
			var B = "";
			var d = "";
			var D = "";
			var q = 0;
			a(this).addClass("circliful");
			if (a(this).data("dimension") != undefined) {
				F = a(this).data("dimension")
			} else {
				F = c.dimension
			}
			if (a(this).data("width") != undefined) {
				v = a(this).data("width")
			} else {
				v = c.width
			}
			if (a(this).data("fontsize") != undefined) {
				t = a(this).data("fontsize")
			} else {
				t = c.size
			}
			if (a(this).data("percent") != undefined) {
				e = a(this).data("percent") / 100;
				l = a(this).data("percent")
			} else {
				e = c.percent / 100
			}
			if (a(this).data("fgcolor") != undefined) {
				B = a(this).data("fgcolor")
			} else {
				B = c.foregroundColor
			}
			if (a(this).data("bgcolor") != undefined) {
				d = a(this).data("bgcolor")
			} else {
				d = c.backgroundColor
			}
			if (a(this).data("animation-step") != undefined) {
				q = parseFloat(a(this).data("animation-step"))
			} else {
				q = c.animationStep
			}
			if (a(this).data("text") != undefined) {
				s = a(this).data("text");
				if (a(this).data("icon") != undefined) {
					D = '<i class="fa ' + a(this).data("icon") + '"></i>'
				}
				if (a(this).data("type") != undefined) {
					i = a(this).data("type");
					if (i == "half") {
						a(this).append('<span class="circle-text-half">' + D + s + "</span>");
						a(this).find(".circle-text-half").css({
							"line-height": (F / 1.45) + "px",
							"font-size": t + "px"
						})
					} else {
						a(this).append('<span class="circle-text">' + D + s + "</span>");
						a(this).find(".circle-text").css({
							"line-height": F + "px",
							"font-size": t + "px"
						})
					}
				} else {
					a(this).append('<span class="circle-text">' + D + s + "</span>");
					a(this).find(".circle-text").css({
						"line-height": F + "px",
						"font-size": t + "px"
					})
				}
			} else {
				if (a(this).data("icon") != undefined) {}
			}
			if (a(this).data("info") != undefined) {
				E = a(this).data("info");
				if (a(this).data("type") != undefined) {
					i = a(this).data("type");
					if (i == "half") {
						a(this).append('<span class="circle-info-half">' + E + "</span>");
						a(this).find(".circle-info-half").css({
							"line-height": (F * 0.9) + "px",
						})
					} else {
						a(this).append('<span class="circle-info">' + E + "</span>");
						a(this).find(".circle-info").css({
							"line-height": (F * 1.25) + "px",
						})
					}
				} else {
					a(this).append('<span class="circle-info">' + E + "</span>");
					a(this).find(".circle-info").css({
						"line-height": (F * 1.25) + "px",
					})
				}
			}
			a(this).width(F*1.33 + "px");
			var h = a("<canvas></canvas>").attr({
				width: F,
				height: F
			}).appendTo(a(this)).get(0);
			var f = h.getContext("2d");
			var p = h.width / 2;
			var o = h.height / 2;
			var A = e * 360;
			var G = A * (Math.PI / 180);
			var j = h.width / 2.5;
			var z = 2.3 * Math.PI;
			var u = 0;
			var C = false;
			var m = q === 0 ? l : 0;
			var n = Math.max(q, 0);
			var r = Math.PI * 2;
			var g = Math.PI / 2;
			var i = "";
			var w = false;
			if (a(this).data("type") != undefined) {
				i = a(this).data("type");
				if (i == "half") {
					var z = 2 * Math.PI;
					var u = 3.13;
					var r = Math.PI * 1;
					var g = Math.PI / 0.996
				}
			}
			if (a(this).data("fill") != undefined) {
				w = a(this).data("fill")
			} else {
				w = c.fillColor
			}
			function k(x) {
				f.clearRect(0, 0, h.width, h.height);
				f.beginPath();
				f.arc(p, o, j, u, z, false);
				f.lineWidth = v - 1;
				f.strokeStyle = d;
				f.stroke();
				if (w) {
					f.fillStyle = w;
					f.fill()
				}
				f.beginPath();
				f.arc(p, o, j, -(g), ((r) * x) - g, false);
				f.lineWidth = v;
				f.strokeStyle = B;
				f.stroke();
				if (m < l) {
					m += n;
					requestAnimationFrame(function() {
						k(Math.min(m, l) / 100)
					})
				}
			}
			k(m / 100)
		})
	}
}(jQuery));