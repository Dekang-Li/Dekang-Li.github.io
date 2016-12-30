(function() {
	//	var c = document.getElementById("index-canvas");
	//	var cxt = c.getContext("2d");

	//	图标定位
	var wrap = document.getElementById("wrap");
	var div = wrap.getElementsByTagName("div");

	for(var i = 0; i < div.length; i++) {
		div[i].style.left = div[i].offsetLeft + "px";
		div[i].style.top = div[i].offsetTop + "px";
	}
	for(var i = 0; i < div.length; i++) {
		div[i].style.position = "absolute";
		div[i].style.margin = 0;
	}

	//	图标拖拽等效果
	function Drag(id) {
		this.box = document.getElementById(id);
		this.disX = 0;
		this.disY = 0;
		this.l = 0;
		this.t = 0;
		this.init();
	}
	Drag.prototype = {
		constructor: Drag,
		init: function() {
			var _this = this;
			this.box.addEventListener("dblclick", function() {
				_this.fnClick();
			});
			this.box.addEventListener("mousedown", function(ev) {
				_this.fnDown(ev);
			});
			this.box.addEventListener("mouseover", function() {
				_this.fnOver();
			});
			this.box.addEventListener("mouseout", function() {
				_this.fnOut();
			});
		},
		fnDown: function(ev) {
			var _this = this;
			this.disX = ev.pageX - this.box.offsetLeft;
			this.disY = ev.pageY - this.box.offsetTop;
			document.addEventListener("mousemove", move);

			function move(ev) {
				_this.fnMove(ev);
			}
			document.addEventListener("mouseup", up);

			function up() {
				_this.fnUp(move, up);
			}
			ev.preventDefault();
		},
		fnMove: function(ev) {    
			this.box.style.left = ev.pageX - this.disX + "px";
			this.box.style.top = ev.pageY - this.disY + "px";
			l = ev.pageX - this.disX;
			t = ev.pageY - this.disY;
			if(l < 0) {
				l = 0;
			} else if(l > document.documentElement.clientWidth - this.box.offsetWidth) {
				l = document.documentElement.clientWidth - this.box.offsetWidth;
			}
			if(t < 0) {
				t = 0;
			} else if(t > document.documentElement.clientHeight - this.box.offsetHeight) {
				t = document.documentElement.clientHeight - this.box.offsetHeight;
			}
			this.box.style.left = l + "px";
			this.box.style.top = t + "px";
		},
		fnUp: function(move, up) {
			document.removeEventListener("mousemove", move);
			document.removeEventListener("mouseup", up);
		},
		fnOver: function() {
//			this.box.style.background =  "rgba(255,255,255,.4)";
//			this.box.style.bo
			this.box.className = "div";
		},
		fnOut: function() {
//			this.box.style.background =  "";
			this.box.className = "";
		},
		fnClick: function() {
			alert(1);
		},
		//		覆盖了移入变色    复习一下深度克隆  属性继承
		fnBg: function() {
			var _this = this;
			this.box.addEventListener("mouseover", function() {
				_this.box.style.background = '';
			});
		}
	};

	var game = new Drag("game");
	var music = new Drag("music");
	var huishou = new Drag("huishou");
	var shizhong = new Drag("shizhong-canvas");
	shizhong.fnBg();
	
	
//	桌面右击模拟
	
	function rClick(id) {
		this.box = document.getElementById(id);
		this.init();
	}
	rClick.prototype = {
		constructor: rClick,
		init: function() {
			var _this = this;
			document.oncontextmenu=function(ev) {
				_this.fnSet(ev);
				return false;
			};
			document.onclick = function() {
				_this.cDoc();
           	};
			this.box.appendChild(this.setRclick(rgtClick));
		}, 
		setRclick: function(obj) {         //数据生成结构
			var ul = document.createElement("ul");
			ul.className = "menu";
			for(var i = 0; i < obj.length; i++) {
				var li = document.createElement("li");
				var h2 = document.createElement("h2");
				var span = document.createElement("span");
				if(obj[i].child) {
					h2.innerHTML = obj[i].name;
					h2.appendChild(span);
				}else {
					h2.innerHTML = obj[i].name;
				};
				if(obj[i].child) {
					li.appendChild(this.setRclick(obj[i].child));
				};
				
				li.appendChild(h2);
				ul.appendChild(li);
			};
			return ul;
		},
		fnSet: function(ev) {          //移入设置
			var rClick = document.getElementById("rClick");
			var menu = document.getElementsByClassName("menu")[0];
			var h2 = document.getElementsByTagName("h2");
			var uls = document.getElementsByTagName("ul");
			
			menu.style.display = "block";
			rClick.style.cssText = "left: "+ev.pageX+"px; top: "+ev.pageY+"px; ";
			for(var i = 0; i < h2.length; i++){
                h2[i].index = i;
                h2[i].onmouseover = function() {
                    this.className = "active";
                    var prev = this.previousElementSibling;
                    var ul = this.parentNode.parentNode.getElementsByTagName("ul");
//                  console.log(prev,ul);
                    for(var i = 0; i < ul.length; i++){
                        if(ul[i] != prev) {
                            ul[i].style.display = "none";
                        }
                    }
                    if(prev) {
                        prev.style.display = "block";
                    }
                }
                h2[i].onmouseout = function() {
                    this.className = "";
                }
           	};
			
			
		},
		cDoc: function() {
			var uls = document.getElementsByTagName("ul");
			for(var i = 0; i < uls.length; i++) {
				uls[i].style.display = "none";
			}
		}
	};
	var rc = new rClick("rClick");
	
})();

