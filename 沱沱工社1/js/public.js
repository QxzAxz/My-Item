$(function(){
	/*所有a滑过的颜色和下划线*/
	$("a").hover(function(){
		$(this).css("color","#9F1431").css("text-decoration","underline");
		},function(){
		$(this).css("color","").css("text-decoration","");
	})
	
	
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
		$("#nav a").mouseleave(function(){
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
	/*侧边栏返回标志出现*/
	 $(window).bind("scroll", function(){ 
        var top = $(this).scrollTop(); // 当前窗口的滚动距离
        if(top > 1500){
        	$("#return").css("display","block");
        }else{
        	$("#return").css("display","none");
        }
  });
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
		var allGoods = $("#nav").find(".navtop").find(".navleft");
		var menu = $("#nav").find("#menu");
		allGoods.mouseenter(function(){
			menu.css("display","block");
			menu.mouseenter(function(){
				menu.css("display","block");
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
						
			})
			menu.mouseleave(function(){
				menu.css("display","none");
			})
		})
		allGoods.mouseleave(function(){
			menu.css("display","none");
		})
		
		
		$("#menu a").hover(function(){
		$(this).css("color","#9F1431").css("text-decoration","underline");
		},function(){
		$(this).css("color","").css("text-decoration","");
	})
		
		}
	});
})

/*详情左侧一长排*/
/*第一个小选项卡部分*/
$(function(){
	var oBtn = $("#des").find(".desleft").find(".sort").find(".sort2");
	var oUl = $("#des").find(".desleft").find(".sort").find(".sort3");
	var iNow = 0;
	oUl.eq(0).css("display","none");
	oUl.eq(1).css("display","block");
	oBtn.eq(1).css("background","url(img/desdown.png) no-repeat 180px center");
	oBtn.eq(0).click(function(){
		//alert("aa");
		iNow++;
		if(iNow % 2 == 1){
			$(this).css("background","url(img/desdown.png) no-repeat 180px center");
			oUl.eq(0).css("display","block");
		}else{
			$(this).css("background","url(img/desright.png) no-repeat 180px center");
			oUl.eq(0).css("display","none");
		}
		
	})
	oBtn.eq(1).click(function(){
		//alert("aa");
		iNow++;
		if(iNow % 2 == 0){
			$(this).css("background","url(img/desright.png) no-repeat 180px center");
			oUl.eq(1).css("display","none");
		}else{
			$(this).css("background","url(img/desdown.png) no-repeat 180px center");
			oUl.eq(1).css("display","block");
		}
		
	})
})
