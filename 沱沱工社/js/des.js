$(function(){
	$.ajax({
		type:"GET",
		url:"json/hotsale.json",
		success:function(data){
			var html_ul = "";
			var html_li = "";
			for(var i = 0; i < data.child.length; i++){
				html_li += "<li><div><p class='bigimg'><a href='#'><img src='" + data.child[i].img + "'/></a></p><p class='add'><a href='#'>加入购物车</a></p><p class='topimg'><img src='img/top" + (i + 1) +".png'/></p></div><p class='price'>" + data.child[i].price + "</p><p class='title'><a href='#'>" + data.child[i].title + "</a></p></li>";
			}
			html_ul = "<ul>" + html_li + "</ul>";
			$(".hotsale .hotbottom").html(html_ul);
			
			var aLi = $(".hotsale .hotbottom").find("ul").find("li");
			var add = $(".hotsale .hotbottom").find("ul").find("li").find(".add");
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				add.eq(iNow).css("display","block")
			})
			aLi.mouseleave(function(){
				add.eq(iNow).css("display","none")
			})
		}	
		
	});
})


$(function(){
	$.ajax({
		type:"GET",
		url:"json/about.json",
		success:function(data){
			var html_ul = "";
			var html_li = "";
			for(var i = 0; i < data.child.length; i++){
				html_li += "<li><div><p class='bigimg'><a href='#'><img src='" + data.child[i].img + "'/></a></p><p class='add'><a href='#'>加入购物车</a></p><p class='topimg'><img src='img/top" + (i + 1) +".png'/></p></div><p class='price'>" + data.child[i].price + "</p><p class='title'><a href='#'>" + data.child[i].title + "</a></p></li>";
			}
			html_ul = "<ul>" + html_li + "</ul>";
			$(".about .hotbottom").html(html_ul);
			
			var aLi = $(".about .hotbottom").find("ul").find("li");
			var add = $(".about .hotbottom").find("ul").find("li").find(".add");
			var iNow = 0;
			aLi.mouseenter(function(){
				iNow = $(this).index();
				add.eq(iNow).css("display","block")
			})
			aLi.mouseleave(function(){
				add.eq(iNow).css("display","none")
			})
		}	
		
	});
})

$(function(){
	$.ajax({
		type:"GET",
		url:"json/desrecommend.json",
		success:function(data){ 
			var html_ul = "";
			var html_li = "";
			for(var i = 0; i < data.child.length; i++){
				html_li += "<li><p class='littleimg'><a href='#'><img src='" + data.child[i].img + "'/></a></p><div><p class='title'><a href='#'>" + data.child[i].title + "</a></p><p class='price'>" + data.child[i].price + "</p><p class='addcar'><a href='#'>加入购物车</a></p> </div></li>";
			}
			html_ul = "<ul>" + html_li + "</ul>";
			$(".desrecommend").html(html_ul);
		}	
		
	});
})