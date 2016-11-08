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
				html_li += "<li><p class='littleimg'><a href='#'><img src='" + data.child[i].img + "'/></a></p><div><p class='title'><a href='#'>" + data.child[i].title + "</a></p><p class='price'>" + data.child[i].price + "</p><p class='addcar'><a href='#'></a></p> </div></li>";
			}
			html_ul = "<ul>" + html_li + "</ul>";
			$(".desrecommend").html(html_ul);
		}	
		
	});
	
	$(".select a").eq(3).css("width","55").css("background","url(img/low.jpg) no-repeat 52px center");
	$(".select a").eq(4).css("width","55").css("background","url(img/low.jpg) no-repeat 52px center");
	$(".decor a,.select a").mouseenter(function(){
		$(this).css("text-decoration","none");
	})
})


/*商品列表*/
$(function(){
	$.ajax({
		type:"GET",
		url:"json/listdes.json",
		success:function(data){ 
			var html_ul = "";
			var html_li = "";
			for(var i = 0; i < data.child.length; i++){
				html_li += "<li><p class='listimg'><a href='#'><img src='" + data.child[i].img + "'/></a></p><p class='title'><a href='#'>" + data.child[i].title + "</a><span>" + data.child[i].express + "</span></p><p class='price'>" + data.child[i].price + "</p><p class='talk'><span>北京有货</span><a href='#'>" + data.child[i].talk + "</a></p><div><p class='addnum'><input type='text' value='1'/><a class='increase'></a><a class='decrease'></a></p><p class='addcar'><a></a></p></div></li>";
			}
			html_ul = "<ul>" + html_li + "</ul>";
			$(".deslist").html(html_ul);	
			
			/*点击增加商品数量*/
			
			var iNow = 0;
			var aLi = $(".deslist").find("ul").find("li");
			var increase = aLi.find(".increase");
			var decrease = aLi.find(".decrease");
			var inputs = aLi.find("input");
			var iNum = 1;
			aLi.mouseenter(function(){
				iNow = $(this).index();	
				iNum = inputs.eq(iNow).val();
			})
			increase.click(function(){
				if(inputs.val !== 1){
					iNum++;	
					inputs.eq(iNow).val(iNum);
					decrease.eq(iNow).css("background","url(img/decreasebright.jpg) no-repeat")
				}else{
					iNum = 1;
					iNum++;	
					inputs.eq(iNow).val(iNum);
				}
			})
			decrease.click(function(){
				inputs.eq(iNow).val(iNum);
				iNum--;
				if(iNum <= 1){
					iNum = 1;
					decrease.eq(iNow).css("background","url(img/decreasedark.jpg) no-repeat")
				}
					//alert("aa")
					
				
			})
		}	
		
	});
})