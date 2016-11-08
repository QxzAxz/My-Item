$(function(){
	/*所有a滑过的颜色和下划线*/
	
	
	
	/*设置top里面的a标签的颜色*/
		$("#top a").css("color","#999999")
		$("#top a").mouseenter(function(){
		$(this).css("color","#9F1431").css("text-decoration","none");
	});
		$("#top a").mouseleave(function(){
			$(this).css("color","#999999")
		});
		$("#nav a").mouseenter(function(){
			$(this).css("text-decoration","none");
		})
		$("#top a").mouseleave(function(){
			$(this).css("color","")
		});
	
	/*设置foot和copy中的a*/
	$("#foot a").hover(function(){
		$(this).css("color","#9F1431").css("text-decoration","underline");
		},function(){
		$(this).css("color","").css("text-decoration","");
	})
	$("#copy a").hover(function(){
		$(this).css("color","#9F1431").css("text-decoration","underline");
		},function(){
		$(this).css("color","").css("text-decoration","");
	})
		

		
		
	/*手机沱沱还有我的沱沱鼠标滑动*/
	$("#phonetoo").mouseenter(function(){
		$("#toosel1").html("<div class='selleft'><img src='img/index/appledown.jpg'/><img src='img/index/andrioddown.jpg'/></div><div class='selright'><img src='img/index/topma.png'/></div>");
		$("#toosel1").css("display","block");
		$("#toosel1").mouseenter(function(){
			$(this).css("display","block");
		})
		$("#toosel1").mouseenter(function(){
			$(this).css("display","none");
		})
	});
	$("#phonetoo").mouseleave(function(){
		$("#toosel1").css("display","none");
	})
		
		
	
	$("#mytoo").mouseenter(function(){
		$("#toosel2").html("<ul><li><a href='#'>我的订单</a></li><li><a href='#'>我的收藏</a></li><li><a href='#'>积分兑换</a></li><li><a href='#'>优惠券</a></li><li><a href='#'>我的地址库</a></li><li><a href='#'>邀请好友</a></li></ul>")
		$("#toosel2").css("display","block");
		$("#toosel2").mouseenter(function(){
			$(this).css("display","block");
		})
		$("#toosel2").mouseenter(function(){
			$(this).css("display","none");
		})
	})
	$("#mytoo").mouseleave(function(){
		$("#toosel2").css("display","none");
	})
});
		
		
		
		
	/*选择城市的事件*/
$(function(){
			/*选择城市那引入json数据*/
		$.ajax({
			url:"json/datacity.json",
			type:"GET",
			success:function(data){
				var html_li = "";
				for(var i = 0; i < data[0].child.length; i++){
					
					var html_a = "";
					for(var j in data[0].child[i].sel){
						html_a += "<a href='index.html'>" + data[0].child[i].sel[j] +"</a>"
					}
					html_li += "<li><p class='pleft'>" + data[0].child[i].title + "</p><p class='pright'>" + html_a + "</p></li>";
					
				}
				//document.write(html_li);
				$("#choose ul").html(html_li);
			}
		})
		
		
		
	$("#citybutton").click(function(){
		$("#city").css("left",($(window).width() - $("#city").outerWidth()) / 2);
		$("#city").css("top",($(window).height() - $("#city").outerHeight()) / 2);
		
		
		$(window).on("resize scroll", function(){
			$("#city").css("left", ($(window).width() - $("#city").outerWidth()) / 2);
			$("#city").css("top", ($(window).height() - $("#city").outerHeight()) / 2 + $(window).scrollTop());
		});
		$("#city").css("display","block");
		
		$("#choose li:odd").css("background","#F3F2F2");
		$("#choose li:even").css("background","#FFFFFF");
		
		var iNow = 0;
		$('#change').click(function(){
			iNow++;
			$(this).html("<a href='#'>选择全国其他城市<img src='img/city_up.png' /></a>");
			if(iNow == 2){
				iNow = 0;
				$(this).html("<a href='#'>选择全国其他城市<img src='img/city_dn.png' /></a>");
			}
		})
		$("#close").click(function(){
			$("#city").css("display","none");
		});
		$("#city a").hover(function(){
		$(this).css("text-decoration","underline");
		},function(){
		$(this).css("text-decoration","");
	})
		
	})
	
	/*引入菜单*/
	$.ajax({
		type:"GET",
		url:"json/menu.json",
		success:function(data){
			var html_li = "";
			var html_ul = "";
			for(var i = 0; i < data.length; i++){
				var html_child = "";
				for(var j = 0; j < data[i].child.length; j++){
					var child_sel = "";
					for(var k in data[i].child[j].sel){
						child_sel += "<a href='#'>" + data[i].child[j].sel[k] + "</a>";
					}
					html_child += "<li><p class='minileft'><a href='#'>" + data[i].child[j].title + "</a></p><p class='miniright'>" + child_sel + "</p></li>"; 
				}
				html_ul += "<ul>" + html_child + "</ul>";
				html_li += "<li><div class='select'><span class='little'><a href='#'><img src='" + data[i].bg + "'/></a></span>" + "<span class='title'><a href='#'>" + data[i].title + "</a></span></div></li>";
			}
			$("#ulright").html(html_ul);
			$("#ulleft").html(html_li);
			
		/*设置菜单没有下边边框的li*/
		$("#ulleft li .title").eq(7).css("line-height","39px");
		$("#ulleft li .title").eq(1).css("line-height","39px");
		$("#ulleft li").eq(7).css("border","none")
		
		
		
		/*左边菜单鼠标滑入滑出*/
		var menuLi = $("#ulleft").find("li");
		var right = $("#ulleft").find(".select").find(".title");
		var rUl = $("#ulright").find("ul");
		var iEq = null;
		menuLi.mouseenter(function(){
			iEq = $(this).index();
			right.eq(iEq).css("background","url(img/right.jpg) no-repeat 80px center");
			menuLi.eq(iEq).css("background","#F9F6F6");
			rUl.eq(iEq).css("display","block");
			if(iEq == 0){
				$("#ulright").css("top",0);
			}else{
				//alert("df");
				$("#ulright ul").eq(1).css("top",39);
				$("#ulright ul").eq(2).css("top",78);
				$("#ulright ul").eq(3).css("top",117);
				$("#ulright ul").eq(4).css("top",156);
				$("#ulright ul").eq(5).css("top",195);
				$("#ulright ul").eq(6).css("top",234);
				$("#ulright ul").eq(7).css("top",273);
			}
			rUl.mouseenter(function(){
				$(this).css("display","block")
			})
			rUl.mouseleave(function(){
				$(this).css("display","none")
			})
			
		})
		menuLi.mouseleave(function(){
			right.eq(iEq).css("background","");
			menuLi.eq(iEq).css("background","");
			rUl.eq(iEq).css("display","none");
		});
		
		$("#menu a").hover(function(){
		$(this).css("color","#9F1431").css("text-decoration","underline");
		},function(){
		$(this).css("color","").css("text-decoration","");
	})
		
		}
	});
	
	
	
	
	/*关闭广告*/
		$(document).ready(function(){
			$("#ad").slideDown(1000);
		});
		
			$("#adclose").click(function(){
			$("#ad").css("display","none");
		})
			
		
	/*轮播图*/
	
	var aBtn=$("#arrows").find(".number").find("li");
    var aLi=$("#bannerbg").find(".photo").find("li");
    var iNum=0;
	var timer=0;
	
	aBtn.hover(function(){
		clearInterval(timer)
		iNum = $(this).index();
		tab();
		},function(){
    	timer=setInterval(interTimer,3000)
	})
	
	$("#arrowsleft").click(function(){
		iNum--;
		tab();
	})
	$("#arrowsright").click(function(){
		iNum++;
		tab();
	})
	
    timer=setInterval(interTimer,3000)	
    
  	function interTimer(){
		iNum++;
		tab();
	}

	/*$("#arrows").hover(function(){
    	clearInterval(timer)},function(){
    		timer=setInterval(interTimer,3000)
    	});*/
    function tab(){
		if(iNum==aLi.size()-1){
			iNum = 0;
		}else if(iNum == -1){
			iNum = 7;
		}
  	    aBtn.attr("class", "");
		aBtn.eq(iNum).attr("class", "active");
		$("#bannerbg").find(".photo").find("li").eq(iNum).fadeIn().siblings("li").fadeOut();
	    }
    
	$("#arrows").mouseenter(function(){
		$(this).css("cursor","pointer");
		$(this).find("p").css("display","block");
		$(this).find(".arrowsleft").mouseenter(function(){
			$(this).css("opacity","0.7").css("cursor","pointer");
		})
		$(this).find(".arrowsleft").mouseleave(function(){
			$(this).css("opacity","");
		})
		$(this).find(".arrowsright").mouseenter(function(){
			$(this).css("opacity","0.7").css("cursor","pointer");
		})
		$(this).find(".arrowsright").mouseleave(function(){
			$(this).css("opacity","");
		})
	})
	$("#arrows").mouseleave(function(){
		$(this).find("p").css("display","none");
	})

});

$(function(){
	/*大轮播图下面的小滚动图的ajax引入*/
	$.ajax({
		type:"GET",
		url:"json/double.json",
		success:function(data){
			var html_li = "";
			for(var i = 0; i < data.length; i++){
				html_li += "<li><a href='#'><img src='" + data[i] + "'/></a><span>广告</span></li>"
			}
			$("#roll ul").html(html_li);
			
			
			/*滚动*/
			var roleft = $("#cycle").find("#rollleft");
			var roright = $("#cycle").find("#rollright");
			var iNum = 0;
			var timer = 0;
			
		/*	roleft.click(function(){
				iNum = 1;
				tab();
			})
			
			roright.click(function(){
				iNum = 0;
				tab1();
			})*/
			
			timer = setInterval(interTimer,3000)
			
			function interTimer(){
				iNum++;
				tab();
			}
			function tab(){
				if(iNum == 1){
					$("#roll ul").animate({"left":-1124},400).delay(5000);
					iNum--;
				}
				tab1();
			}
			function tab1(){
				if(iNum == 0){
					$("#roll ul").animate({"left":0},400).delay(5000);
				}
			}
			
			
			/*鼠标移动到滚动图单独的li的时候*/
			
			var roLi = $("#roll").find("li");
			roLi.mouseover(function(){
				$(this).css("left",-3);
			})
			roLi.mouseout(function(){
				$(this).animate({"left":0},200,function(){
					roLi.animate({"left":-3},200,function(){
						roLi.animate({"left":0},200);
					})
				})
			})
			
		}
		
	})
})


/*沱沱力荐*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/recommend.json",
		success:function(data){
			var html_p = "";
			var html_div = "";
			for(var i = 0; i < data.length; i++){
				html_p += "<p>" + data[i].title + "</p>";
				var child_dl = "";
				for(var j = 0; j < data[i].child.length; j++){
					child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='child_title'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='detial'>" + data[i].child[j].detial + "</p><p class='price'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
				}
				html_div += "<div>" + child_dl + "</div>";
				
			}
			$(".commodity").html(html_div);
			$(".label").html(html_p);
			
			$(".commodity div dl").eq(0).css("border-left","1px solid #E6E6E6");
			$(".commodity div dl").eq(6).css("border-left","1px solid #E6E6E6");
			$(".commodity div dl").eq(12).css("border-left","1px solid #E6E6E6");
			
			var iNum = 0;
			var oBtn = $("#recommend").find(".label").find("p");
			var oDiv = $("#recommend").find(".commodity").find("div");
			oBtn.eq(0).addClass("act");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			
			$(".commodity a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
	})
			/* aBtn.attr("class", "");
		aBtn.eq(iNum).attr("class", "active");*/
		}
	});
})

/*选项卡第一个*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/vegetable.json",
		success:function(data){
			var html_div = "";
			var html_div1 = "";
			var html_div2 = "";
			for(var i = 0; i < data.length; i++){
				if(i == 0){
					var child_dl = "";
					var child1 = "";
					var child2 = "";
					for(var j = 0; j < data[i].child.length; j++){
						if(j == 0){
							child1 = "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}else if(j == 1){
							child2 = "<dl><img src='" + data[i].child[j].img + "'/><span>广告</span></dl>";
						}else{
							child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}
					html_div1 = "<div class='stairdiv'><div class='firstleft'>" + child1 + child2 + child_dl +"</div><div class='accordion'></div></div>";
					}
				}else{
					var child3 = "";
					for(var j = 0; j < data[i].child.length; j++){
						child3 += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
					}
					html_div += "<div class='stairdiv'>" + child3 +"</div>"; 
				}
				html_div2 = html_div1 + html_div;
				
			}
			$("#vegetable .des").html(html_div2);
			$("#vegetable .des div dl").eq(1).addClass("onlyimg");
			
			
			/*鼠标滑过*/
			var iNum = 0;
			var oBtn = $("#vegetable").find(".labelbox").find(".label1").find("p");
			var oDiv = $("#desbox").find(".des").find(".stairdiv");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act1");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			$("#vegetable a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
			})
		}
		
	})
})

/*选项卡第二个*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/meat.json",
		success:function(data){
			var html_div = "";
			var html_div1 = "";
			var html_div2 = "";
			for(var i = 0; i < data.length; i++){
				if(i == 0){
					var child_dl = "";
					var child1 = "";
					var child2 = "";
					for(var j = 0; j < data[i].child.length; j++){
						if(j == 0){
							child1 = "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}else if(j == 1){
							child2 = "<dl><img src='" + data[i].child[j].img + "'/><span>广告</span></dl>";
						}else{
							child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}
					html_div1 = "<div class='stairdiv'><div class='firstleft'>" + child1 + child2 + child_dl +"</div><div class='accordion'></div></div>";
					}
				}else{
					var child3 = "";
					for(var j = 0; j < data[i].child.length; j++){
						child3 += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
					}
					html_div += "<div class='stairdiv'>" + child3 +"</div>"; 
				}
				html_div2 = html_div1 + html_div;
				
			}
			$("#meat .des").html(html_div2);
			$("#meat .des div dl").eq(1).addClass("onlyimg");
			
			
			/*鼠标滑过*/
			var iNum = 0;
			var oBtn = $("#meat").find(".labelbox").find(".label1").find("p");
			var oDiv = $("#desbox2").find(".des").find(".stairdiv");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act1");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			$("#meat a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
			})
		}
		
	})
})

/*选项卡第三个*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/seafood.json",
		success:function(data){
			var html_div = "";
			var html_div1 = "";
			var html_div2 = "";
			for(var i = 0; i < data.length; i++){
				if(i == 0){
					var child_dl = "";
					var child1 = "";
					var child2 = "";
					for(var j = 0; j < data[i].child.length; j++){
						if(j == 0){
							child1 = "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}else if(j == 1){
							child2 = "<dl><img src='" + data[i].child[j].img + "'/><span>广告</span></dl>";
						}else{
							child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}
					html_div1 = "<div class='stairdiv'><div class='firstleft'>" + child1 + child2 + child_dl +"</div><div class='accordion'></div></div>";
					}
				}else{
					var child3 = "";
					for(var j = 0; j < data[i].child.length; j++){
						child3 += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
					}
					html_div += "<div class='stairdiv'>" + child3 +"</div>"; 
				}
				html_div2 = html_div1 + html_div;
				
			}
			$("#seafood .des").html(html_div2);
			$("#seafood .des div dl").eq(1).addClass("onlyimg");
			
			
			/*鼠标滑过*/
			var iNum = 0;
			var oBtn = $("#seafood").find(".labelbox").find(".label1").find("p");
			var oDiv = $("#desbox3").find(".des").find(".stairdiv");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act1");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			$("#seafood a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
			})
		}
		
	})
})


/*选项卡第四个*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/milk.json",
		success:function(data){
			var html_div = "";
			var html_div1 = "";
			var html_div2 = "";
			for(var i = 0; i < data.length; i++){
				if(i == 0){
					var child_dl = "";
					var child1 = "";
					var child2 = "";
					for(var j = 0; j < data[i].child.length; j++){
						if(j == 0){
							child1 = "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}else if(j == 1){
							child2 = "<dl><img src='" + data[i].child[j].img + "'/><span>广告</span></dl>";
						}else{
							child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}
					html_div1 = "<div class='stairdiv'><div class='firstleft'>" + child1 + child2 + child_dl +"</div><div class='accordion'></div></div>";
					}
				}else{
					var child3 = "";
					for(var j = 0; j < data[i].child.length; j++){
						child3 += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
					}
					html_div += "<div class='stairdiv'>" + child3 +"</div>"; 
				}
				html_div2 = html_div1 + html_div;
				
			}
			$("#milk .des").html(html_div2);
			$("#milk .des div dl").eq(1).addClass("onlyimg");
			
			
			/*鼠标滑过*/
			var iNum = 0;
			var oBtn = $("#milk").find(".labelbox").find(".label1").find("p");
			var oDiv = $("#desbox4").find(".des").find(".stairdiv");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act1");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			$("#milk a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
			})
		}
		
	})
})

/*选项卡第五个*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/oil.json",
		success:function(data){
			var html_div = "";
			var html_div1 = "";
			var html_div2 = "";
			for(var i = 0; i < data.length; i++){
				if(i == 0){
					var child_dl = "";
					var child1 = "";
					var child2 = "";
					for(var j = 0; j < data[i].child.length; j++){
						if(j == 0){
							child1 = "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}else if(j == 1){
							child2 = "<dl><img src='" + data[i].child[j].img + "'/><span>广告</span></dl>";
						}else{
							child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}
					html_div1 = "<div class='stairdiv'><div class='firstleft'>" + child1 + child2 + child_dl +"</div><div class='accordion'></div></div>";
					}
				}else{
					var child3 = "";
					for(var j = 0; j < data[i].child.length; j++){
						child3 += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
					}
					html_div += "<div class='stairdiv'>" + child3 +"</div>"; 
				}
				html_div2 = html_div1 + html_div;
				
			}
			$("#oil .des").html(html_div2);
			$("#oil .des div dl").eq(1).addClass("onlyimg");
			
			
			/*鼠标滑过*/
			var iNum = 0;
			var oBtn = $("#oil").find(".labelbox").find(".label1").find("p");
			var oDiv = $("#desbox5").find(".des").find(".stairdiv");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act1");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			$("#oil a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
			})
		}
		
	})
})



/*选项卡第六个*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/drink.json",
		success:function(data){
			var html_div = "";
			var html_div1 = "";
			var html_div2 = "";
			for(var i = 0; i < data.length; i++){
				if(i == 0){
					var child_dl = "";
					var child1 = "";
					var child2 = "";
					for(var j = 0; j < data[i].child.length; j++){
						if(j == 0){
							child1 = "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}else if(j == 1){
							child2 = "<dl><img src='" + data[i].child[j].img + "'/><span>广告</span></dl>";
						}else{
							child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}
					html_div1 = "<div class='stairdiv'><div class='firstleft'>" + child1 + child2 + child_dl +"</div><div class='accordion'></div></div>";
					}
				}else{
					var child3 = "";
					for(var j = 0; j < data[i].child.length; j++){
						child3 += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
					}
					html_div += "<div class='stairdiv'>" + child3 +"</div>"; 
				}
				html_div2 = html_div1 + html_div;
				
			}
			$("#drink .des").html(html_div2);
			$("#drink .des div dl").eq(1).addClass("onlyimg");
			
			
			/*鼠标滑过*/
			var iNum = 0;
			var oBtn = $("#drink").find(".labelbox").find(".label1").find("p");
			var oDiv = $("#desbox6").find(".des").find(".stairdiv");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act1");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			$("#drink a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
			})
		}
		
	})
})


/*选项卡第七个*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/daily.json",
		success:function(data){
			var html_div = "";
			var html_div1 = "";
			var html_div2 = "";
			for(var i = 0; i < data.length; i++){
				if(i == 0){
					var child_dl = "";
					var child1 = "";
					var child2 = "";
					for(var j = 0; j < data[i].child.length; j++){
						if(j == 0){
							child1 = "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}else if(j == 1){
							child2 = "<dl><img src='" + data[i].child[j].img + "'/><span>广告</span></dl>";
						}else{
							child_dl += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
						}
					html_div1 = "<div class='stairdiv'><div class='firstleft'>" + child1 + child2 + child_dl +"</div><div class='accordion'></div></div>";
					}
				}else{
					var child3 = "";
					for(var j = 0; j < data[i].child.length; j++){
						child3 += "<dl><dt><img src='" + data[i].child[j].img + "'/></dt><dd><p class='title1'><a href='#'>" + data[i].child[j].title + "'</a></p><p class='price1'>" + data[i].child[j].price + "</p><span>广告</span></dd></dl>";
					}
					html_div += "<div class='stairdiv'>" + child3 +"</div>"; 
				}
				html_div2 = html_div1 + html_div;
				
			}
			$("#daily .des").html(html_div2);
			$("#daily .des div dl").eq(1).addClass("onlyimg");
			
			
			/*鼠标滑过*/
			var iNum = 0;
			var oBtn = $("#daily").find(".labelbox").find(".label1").find("p");
			var oDiv = $("#desbox7").find(".des").find(".stairdiv");
			oDiv.eq(0).css("display","block");
			oBtn.mouseenter(function(){
				iNum = $(this).index();
				oBtn.attr("class", "");
				oBtn.eq(iNum).attr("class", "act1");
				oDiv.css("display","none");
				oDiv.eq(iNum).css("display","block");
			})
			$("#daily a").hover(function(){
			$(this).css("color","#9F1431").css("text-decoration","underline");
			},function(){
			$(this).css("color","").css("text-decoration","");
			})
		}
		
	})
})

/*第一个选项卡right*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/vegeright.json",
		success:function(data){
			var html_div = ""//放整体的两个div用的，不用加div标签
			var html_div1 = ""//上面的div
			var html_div2 = "<div class='bottomimg'><img src='" + data.img + "'/><span>广告</span></div>";//下边的图片，可以直接写在总的div里
			var html_ul = "";//放li标签 不用+=
			var html_li = "";//放div3 和 div4的
			var html_div3 = "";//放标题的
			var html_div4 = "";//放大内容的
			for(var i = 0; i < data.child.length; i++){
				html_div3 = "<div class='toptitle'><p class='level'>" + (i + 1) + "</p><p class='word'>" + data.child[i].title + "</p></div>";
				html_div4 = "<div class='bottomdiv'><p class='goodimg'><img src='" + data.child[i].img + "'/></p><p class='bottomtitle'><a href='#'>" + data.child[i].title + "</a></p><p class='bottomprice'>" + data.child[i].price + "</p><p class='ranking'><img src='img/index/top" + (i + 1) + ".png'/></p></div>";
				html_li += "<li>" + html_div3 + html_div4 + "<span>广告</span></li>";
			}
			html_div1 = "<div class='topdiv'><ul>" + html_li + "</ul></div>";
			html_div = html_div1 + html_div2;
			$("#vegetable .accordion").html(html_div);
			
			var aLi = $("#vegetable .accordion").find(".topdiv").find("li");
			aLi.eq(0).addClass("act3");
			
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				aLi.attr("class", "");
				aLi.eq(iNow).attr("class", "act3");
			})
			$("#vegetable .accordion a").hover(function(){
			$(this).css("text-decoration","underline");
			},function(){
			$(this).css("text-decoration","");
			})
			
		}	
		
	});
})

/*第二个选项卡right*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/meatright.json",
		success:function(data){
			var html_div = ""//放整体的两个div用的，不用加div标签
			var html_div1 = ""//上面的div
			var html_div2 = "<div class='bottomimg'><img src='" + data.img + "'/><span>广告</span></div>";//下边的图片，可以直接写在总的div里
			var html_ul = "";//放li标签 不用+=
			var html_li = "";//放div3 和 div4的
			var html_div3 = "";//放标题的
			var html_div4 = "";//放大内容的
			for(var i = 0; i < data.child.length; i++){
				html_div3 = "<div class='toptitle'><p class='level'>" + (i + 1) + "</p><p class='word'>" + data.child[i].title + "</p></div>";
				html_div4 = "<div class='bottomdiv'><p class='goodimg'><img src='" + data.child[i].img + "'/></p><p class='bottomtitle'><a href='#'>" + data.child[i].title + "</a></p><p class='bottomprice'>" + data.child[i].price + "</p><p class='ranking'><img src='img/index/top" + (i + 1) + ".png'/></p></div>";
				html_li += "<li>" + html_div3 + html_div4 + "<span>广告</span></li>";
			}
			html_div1 = "<div class='topdiv'><ul>" + html_li + "</ul></div>";
			html_div = html_div1 + html_div2;
			$("#meat .accordion").html(html_div);
			
			var aLi = $("#meat .accordion").find(".topdiv").find("li");
			aLi.eq(0).addClass("act3");
			
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				aLi.attr("class", "");
				aLi.eq(iNow).attr("class", "act3");
			})
			$("#meat .accordion a").hover(function(){
			$(this).css("text-decoration","underline");
			},function(){
			$(this).css("text-decoration","");
			})
		}	
		
	});
})


/*第三个选项卡right*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/seafoodright.json",
		success:function(data){
			var html_div = ""//放整体的两个div用的，不用加div标签
			var html_div1 = ""//上面的div
			var html_div2 = "<div class='bottomimg'><img src='" + data.img + "'/><span>广告</span></div>";//下边的图片，可以直接写在总的div里
			var html_ul = "";//放li标签 不用+=
			var html_li = "";//放div3 和 div4的
			var html_div3 = "";//放标题的
			var html_div4 = "";//放大内容的
			for(var i = 0; i < data.child.length; i++){
				html_div3 = "<div class='toptitle'><p class='level'>" + (i + 1) + "</p><p class='word'>" + data.child[i].title + "</p></div>";
				html_div4 = "<div class='bottomdiv'><p class='goodimg'><img src='" + data.child[i].img + "'/></p><p class='bottomtitle'><a href='#'>" + data.child[i].title + "</a></p><p class='bottomprice'>" + data.child[i].price + "</p><p class='ranking'><img src='img/index/top" + (i + 1) + ".png'/></p></div>";
				html_li += "<li>" + html_div3 + html_div4 + "<span>广告</span></li>";
			}
			html_div1 = "<div class='topdiv'><ul>" + html_li + "</ul></div>";
			html_div = html_div1 + html_div2;
			$("#seafood .accordion").html(html_div);
			
			var aLi = $("#seafood .accordion").find(".topdiv").find("li");
			aLi.eq(0).addClass("act3");
			
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				aLi.attr("class", "");
				aLi.eq(iNow).attr("class", "act3");
			})
			$("#seafood .accordion a").hover(function(){
			$(this).css("text-decoration","underline");
			},function(){
			$(this).css("text-decoration","");
			})
		}	
		
	});
})


/*第四个选项卡right*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/milkright.json",
		success:function(data){
			var html_div = ""//放整体的两个div用的，不用加div标签
			var html_div1 = ""//上面的div
			var html_div2 = "<div class='bottomimg'><img src='" + data.img + "'/><span>广告</span></div>";//下边的图片，可以直接写在总的div里
			var html_ul = "";//放li标签 不用+=
			var html_li = "";//放div3 和 div4的
			var html_div3 = "";//放标题的
			var html_div4 = "";//放大内容的
			for(var i = 0; i < data.child.length; i++){
				html_div3 = "<div class='toptitle'><p class='level'>" + (i + 1) + "</p><p class='word'>" + data.child[i].title + "</p></div>";
				html_div4 = "<div class='bottomdiv'><p class='goodimg'><img src='" + data.child[i].img + "'/></p><p class='bottomtitle'><a href='#'>" + data.child[i].title + "</a></p><p class='bottomprice'>" + data.child[i].price + "</p><p class='ranking'><img src='img/index/top" + (i + 1) + ".png'/></p></div>";
				html_li += "<li>" + html_div3 + html_div4 + "<span>广告</span></li>";
			}
			html_div1 = "<div class='topdiv'><ul>" + html_li + "</ul></div>";
			html_div = html_div1 + html_div2;
			$("#milk .accordion").html(html_div);
			
			var aLi = $("#milk .accordion").find(".topdiv").find("li");
			aLi.eq(0).addClass("act3");
			
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				aLi.attr("class", "");
				aLi.eq(iNow).attr("class", "act3");
			})
			$("#milk .accordion a").hover(function(){
			$(this).css("text-decoration","underline");
			},function(){
			$(this).css("text-decoration","");
			})
		}	
		
	});
})


/*第五个选项卡right*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/oilright.json",
		success:function(data){
			var html_div = ""//放整体的两个div用的，不用加div标签
			var html_div1 = ""//上面的div
			var html_div2 = "<div class='bottomimg'><img src='" + data.img + "'/><span>广告</span></div>";//下边的图片，可以直接写在总的div里
			var html_ul = "";//放li标签 不用+=
			var html_li = "";//放div3 和 div4的
			var html_div3 = "";//放标题的
			var html_div4 = "";//放大内容的
			for(var i = 0; i < data.child.length; i++){
				html_div3 = "<div class='toptitle'><p class='level'>" + (i + 1) + "</p><p class='word'>" + data.child[i].title + "</p></div>";
				html_div4 = "<div class='bottomdiv'><p class='goodimg'><img src='" + data.child[i].img + "'/></p><p class='bottomtitle'><a href='#'>" + data.child[i].title + "</a></p><p class='bottomprice'>" + data.child[i].price + "</p><p class='ranking'><img src='img/index/top" + (i + 1) + ".png'/></p></div>";
				html_li += "<li>" + html_div3 + html_div4 + "<span>广告</span></li>";
			}
			html_div1 = "<div class='topdiv'><ul>" + html_li + "</ul></div>";
			html_div = html_div1 + html_div2;
			$("#oil .accordion").html(html_div);
			
			var aLi = $("#oil .accordion").find(".topdiv").find("li");
			aLi.eq(0).addClass("act3");
			
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				aLi.attr("class", "");
				aLi.eq(iNow).attr("class", "act3");
			})
			$("#oil .accordion a").hover(function(){
			$(this).css("text-decoration","underline");
			},function(){
			$(this).css("text-decoration","");
			})
		}	
		
	});
})


/*第六个选项卡right*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/drinkright.json",
		success:function(data){
			var html_div = ""//放整体的两个div用的，不用加div标签
			var html_div1 = ""//上面的div
			var html_div2 = "<div class='bottomimg'><img src='" + data.img + "'/><span>广告</span></div>";//下边的图片，可以直接写在总的div里
			var html_ul = "";//放li标签 不用+=
			var html_li = "";//放div3 和 div4的
			var html_div3 = "";//放标题的
			var html_div4 = "";//放大内容的
			for(var i = 0; i < data.child.length; i++){
				html_div3 = "<div class='toptitle'><p class='level'>" + (i + 1) + "</p><p class='word'>" + data.child[i].title + "</p></div>";
				html_div4 = "<div class='bottomdiv'><p class='goodimg'><img src='" + data.child[i].img + "'/></p><p class='bottomtitle'><a href='#'>" + data.child[i].title + "</a></p><p class='bottomprice'>" + data.child[i].price + "</p><p class='ranking'><img src='img/index/top" + (i + 1) + ".png'/></p></div>";
				html_li += "<li>" + html_div3 + html_div4 + "<span>广告</span></li>";
			}
			html_div1 = "<div class='topdiv'><ul>" + html_li + "</ul></div>";
			html_div = html_div1 + html_div2;
			$("#drink .accordion").html(html_div);
			
			var aLi = $("#drink .accordion").find(".topdiv").find("li");
			aLi.eq(0).addClass("act3");
			
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				aLi.attr("class", "");
				aLi.eq(iNow).attr("class", "act3");
			})
			$("#drink .accordion a").hover(function(){
			$(this).css("text-decoration","underline");
			},function(){
			$(this).css("text-decoration","");
			})
		}	
		
	});
})


/*第七个选项卡right*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/dailyright.json",
		success:function(data){
			var html_div = ""//放整体的两个div用的，不用加div标签
			var html_div1 = ""//上面的div
			var html_div2 = "<div class='bottomimg'><img src='" + data.img + "'/><span>广告</span></div>";//下边的图片，可以直接写在总的div里
			var html_ul = "";//放li标签 不用+=
			var html_li = "";//放div3 和 div4的
			var html_div3 = "";//放标题的
			var html_div4 = "";//放大内容的
			for(var i = 0; i < data.child.length; i++){
				html_div3 = "<div class='toptitle'><p class='level'>" + (i + 1) + "</p><p class='word'>" + data.child[i].title + "</p></div>";
				html_div4 = "<div class='bottomdiv'><p class='goodimg'><img src='" + data.child[i].img + "'/></p><p class='bottomtitle'><a href='#'>" + data.child[i].title + "</a></p><p class='bottomprice'>" + data.child[i].price + "</p><p class='ranking'><img src='img/index/top" + (i + 1) + ".png'/></p></div>";
				html_li += "<li>" + html_div3 + html_div4 + "<span>广告</span></li>";
			}
			html_div1 = "<div class='topdiv'><ul>" + html_li + "</ul></div>";
			html_div = html_div1 + html_div2;
			$("#daily .accordion").html(html_div);
			
			var aLi = $("#daily .accordion").find(".topdiv").find("li");
			aLi.eq(0).addClass("act3");
			
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				aLi.attr("class", "");
				aLi.eq(iNow).attr("class", "act3");
			})
			$("#daily .accordion a").hover(function(){
			$(this).css("text-decoration","underline");
			},function(){
			$(this).css("text-decoration","");
			})
		}	
		
	});
})






