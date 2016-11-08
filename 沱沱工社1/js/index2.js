$(function(){
	/*设置top里面的a标签的颜色*/
		$("#top a").css("color","#999999")
		$("#top a").mouseenter(function(){
		$(this).css("color","#9F1431");
	});
		$("#top a").mouseleave(function(){
			$(this).css("color","#999999")
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
				var iNow = 0;
				$("#change").click(function(){
					iNow++;
					var html_div = data[1].child.title;
					$("#province").focus(function(){
						var html_input = data[1].child.city;
					});
					
					
				})
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
		
/*		var iNow = 0;
		$('#change').click(function(){
			iNow++;
			$(this).html("<a href='#'>选择全国其他城市<img src='img/city_up.png' /></a>");
			$("#choose").html("<div><input type='text' id='province'/><input type='button' id='startbtn'/></div")
			if(iNow == 2){
				iNow = 0;
				$(this).html("<a href='#'>选择全国其他城市<img src='img/city_dn.png' /></a>");
				$("#choose").html("<ul></ul>");
			}
		})*/
		
		
	})
});










