require(['jquery','geos','wx.cookie','user','wx.config'],function($,geos,wx,user,config){
    //var noHeadChange = true; //不切换
    var clientType = wx.cookie('browserType');
    if(typeof clientType=='undefined' || !clientType || clientType=='undefined'){
    var browser={
    	versions:function(){
    		var a=navigator.userAgent;
    		return{
    			mobile:!!a.match(/AppleWebKit.*Mobile.*/),ios:!!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:-1<a.indexOf("Android")||-1<a.indexOf("Linux"),iPhone:-1<a.indexOf("iPhone"),iPad:-1<a.indexOf("iPad"),webApp:-1==a.indexOf("Safari")}}()};
    				if(-1==window.location.href.indexOf("index.html"))
    					if(browser.versions.iPhone || browser.versions.iPad){
    						clientType='ios';
    			}else if(browser.versions.mobile||browser.versions.android){
    				clientType='android';
    			}
    			else{
    				clientType='pc';
    			}
    			if(wx.cookie('selectedClient')!='pc' && clientType != 'pc' && clientType != null && clientType != 'undefined'){
    				window.location.href="http://www.tootoo.cn/sale/wap.html?t="+clientType;
    			}
    }
	$(init);
    function init(){
    	fullScreenAd();
        statistics();
    };
 	var slider_pre = $(".slider_extra_pre"),
	slider_next = $(".slider_extra_next"),
	switch_board_li = $("#switcherboard li"),
	switch_li_len = switch_board_li.length;

	slider_pre.hide()
	slider_next.hide()
	$(".index_style_a,.slider_extra_pre,.slider_extra_next").mouseover(function(){
	    slider_pre.show()
	    slider_next.show()
	})

	$(".index_style_a").mouseout(function(){
	    slider_pre.hide()
	    slider_next.hide()
	});
	//向左
	slider_pre.click(function(){ 
		var index = $("#switcherboard .select").index(); 
		var newIndex= ( index + switch_li_len -1 )% switch_li_len; 
		switch_board_li.eq(newIndex).mouseover(); 
	});
	//向右
	  slider_next.click(function(){ 
		var index= $("#switcherboard .select").index(); 
		var newIndex= ( index +1 )% switch_li_len;
		switch_board_li.eq(newIndex).mouseover(); 
	});

	var ttt = '剩余@@天@@小时@@分@@本活动已结束@@秒'.split("@@");             

   //公告,活动资讯 切换 
    $(".tnoice_nav li").hover(function(){
     	$(this).addClass('curr_tnoice_tit').siblings().removeClass('curr_tnoice_tit');
     	$('.tnoice_count:eq('+$(this).index()+')').show().siblings().hide();
     });

	//限时抢购 超值促销 新品上市 沱沱农场tab
    $(".tpromotion_nav ul>li").on('mouseenter',function(){
        $(this).addClass('select').siblings().removeClass('select');
        $('.tpromotion_count').eq($(this).index()).show().siblings().hide();            
                
        $('.tpromotion_count ul').eq($(this).index()).find("img").each(function(){ 
             if(this.getAttribute("wx-lz")){
                this.src = this.getAttribute("wx-lz");
                this.removeAttribute("wx-lz");
            }
      });
    });
	        
	//限时抢购 时间设置
	var ctd_goods_arr = [];
	$(".tpromotion_count:eq(0) li").each(function (){
		var cur_time = parseInt(new Date().getTime()/1000);
        var sec = parseInt($(this).find(".promotion_end").text()) - parseInt(cur_time);
        if(sec>0){
            ctd_goods_arr.push({'ele':$(this),'left_sec':sec});
        }else{
            $(this).find(".pro_second_grab").html('<span class="font_gray">'+ttt[4]+'</span>');
        }
    });

	var timeInterval = setInterval(countDown,1000);

	function countDown(){
		for(var i=0;i<ctd_goods_arr.length;i++){
			ctd_goods_arr[i].left_sec--;
			if(ctd_goods_arr[i].left_sec<=0){
				ctd_goods_arr.splice(i,1);
				ctd_goods_arr[i].ele.find(".pro_second_grab").html('<span class="font_gray">'+ttt[4]+'</span>');
			}else{
				var time = getFormatTime(ctd_goods_arr[i].left_sec);
				ctd_goods_arr[i].ele.find(".pro_second_grab").html(ttt[0]+"<span >"
					+time[1]+"</span>"+ttt[2]+"<span>"
					+time[2]+"</span>"+ttt[3]+"<span>"
					+time[3]+"</span>"+ttt[5]);
			}
		}
		if(!ctd_goods_arr.length){
			clearInterval(timeInterval)
		}
	}

	function getFormatTime(t){
		  var t = parseInt(t);
	      var day    = 0;//Math.floor(t/(60*60*24));
	      var hour   = Math.floor((t-day*24*60*60)/3600);
	      var minute = Math.floor((t-day*24*60*60-hour*3600)/60);
	      var second = Math.floor(t-day*24*60*60-hour*3600-minute*60);
	      hour   = hour<10?"0"+hour:hour;
	      minute = minute<10?"0"+minute:minute;
	      second = second<10?"0"+second:second;
	      return [day,hour,minute,second];
    }
   
	       
        
	// 1-5 层 效果
	var floor_nav_class= ['tsc_pro_nav','trd_pro_nav','thx_pro_nav','tly_pro_nav','tsy_pro_nav','tst_pro_nav'];
	var floor_switch = [0,0,0,0,0];
	var floor_auto_switch = [0,0,0,0,0];
	var floor_floor = ['_first','_second','_third','_forth','_fifth','_sixth'];
    var floor_tab = ['_one','_two','_three','_four','_five','_six'];
	

	$(".tpage_count2").each(function(){ 
		var obj = this;
		var fl = $(this).attr('floor');  //楼层索引
		var nav_class=floor_nav_class[fl];   // 每楼切换菜单div的class
		var nav_class_li = $(this).find('.'+nav_class+' li');
		var tpro_top_count = $(obj).find(".tpro_top_count");
		var tsc_pro_count = $(obj).find(".tsc_pro_count");
		$(nav_class_li[0]).addClass('select').siblings().removeClass('select');
		//每层菜单切换
		nav_class_li.on('mouseenter',function(){
			$(this).addClass('select').siblings().removeClass('select');
			var i = $(this).index();//$(obj).find('.'+nav_class+' li').index(this);
			tsc_pro_count.eq(i).show().siblings().hide();
			tsc_pro_count.eq(i).find("img").each(function(){ 
	          	if(this.getAttribute("wx-lz")){        
                    this.src = this.getAttribute("wx-lz");
                    this.removeAttribute("wx-lz");
                }
      		});
		});

		// 排行榜
		tpro_top_count.hover(function(){
			 var imgsrc = $(this).find('li:eq(0) img');
			 if(imgsrc.attr("wx-lz")){
				imgsrc.attr('src',imgsrc.attr("wx-lz"));
                imgsrc.removeAttr("wx-lz");
			 }
			 $(this).find('li:eq(0)').show();
			 $(this).find('li:eq(1)').hide();
			 $(this).siblings().find('li:eq(0)').hide();
			 $(this).siblings().find('li:eq(1)').show();
		});
		$(tpro_top_count[0]).trigger('mouseenter');
		
		//添加 tracecode
		$(obj).find('.tsc_pro_banner a').each(function(){   
			addTraceCode('hom_cate'+floor_floor[fl]+'_leftpicture',0,this);   
		});

		$(obj).find('.tsc_pro_count').each(function(){ 
			var nobj = this;
			var tabno=$(obj).find('.tsc_pro_count').index(this);
			if( tabno == 0){
				var j=0;
				var len=$(nobj).find('.pro_li').length;
				for(j=0;j<len;j++){
					$(nobj).find('.pro_li').eq(j).find('a').each(function(){
						addTraceCode('hom_cate'+floor_floor[fl]+floor_tab[tabno]+'_rightgoods',j,this);  
					});
				}
				len=$(nobj).find('.tsc_pro_imgnav_count li').length;
				for(j=0;j<len;j++){
					$(nobj).find('.tsc_pro_imgnav_count li').eq(j).find('a').each(function(){  
						addTraceCode('hom_cate'+floor_floor[fl]+floor_tab[tabno]+'_carouselgoods',j,this);  
					});
				}
				len=$(nobj).find('.tpro_top_count').length;
				for(j=0;j<len;j++){
					$(nobj).find('.tpro_top_count').eq(j).find('a').each(function(){  
						addTraceCode('hom_cate'+floor_floor[fl]+floor_tab[tabno]+'_toplgoods',j,this);  
					});
				}
				$(nobj).find('.top_bottom_banner a').each(function(){  
					addTraceCode('hom_cate'+floor_floor[fl]+floor_tab[tabno]+'_topbottompicture',j,this);  
				});
			}else{
				var j=0;
				var len=$(nobj).find('.tsc_pro_list02 li').length;
				for(j=0;j<len;j++){
					$(nobj).find('.tsc_pro_list02 li').eq(j).find('a').each(function(){  addTraceCode('hom_cate'+floor_floor[fl]+floor_tab[tabno]+'_rightgoods',j,this);  });
				}
			}
		});
                //每楼层的顶部长条广告
                $(obj).closest(".tpage_count").find("div:first a").each(function(i){  addTraceCode('hom_cate'+floor_floor[fl]+'_top_picture',i,this);  });
	
	});

    function addTraceCode(scope,i,obj){   
        
        var num = (i+1) < 10 ? "0"+(i+1) : (i+1);    
           var ref = obj.href;      
           var  tpStr='';
           var path= ref.substr( ref.indexOf("/",8) );
           if( "/sale/"==path.substr(0,6) )
           {
                tpStr="&tp=2";
           }
           else if( "/list-"==path.substr(0,6) )
           {
                tpStr="&tp=9";
           }
           else if("/product-"== path.substr(0,9))
           {
               tpStr="&tp=1";
           }
           
           if( ref.indexOf('?')>0 ){  
               ref=ref.replace(/ttad_source=ttad&ttad_pos=[\d\w_]*/,"");
              ref = ref  + '&ttad_source=ttad&ttad_pos='+scope+'_'+num + tpStr ;
              ref=ref.replace("?&","?");
              obj.href= ref;
           }else{
              obj.href = ref +'?ttad_source=ttad&ttad_pos='+scope+'_'+num + tpStr ;
            }            
    }
  
   	
			
	function VisibleSlide(linum,dom_id,left,right){
		var ul_dom = $('.'+ dom_id + ' ul');
	    var move_one_width=parseInt($('.'+ dom_id + ' ul>li').css("width"))+1;
	    var num = parseInt($('.'+ dom_id + ' ul>li').length);
	    ul_dom.css('width',move_one_width*num);
	    var lock = 1 ;
	    var cur_dir ='l';
	    var rollright = function(target){ 
            if(lock == 2){  return ;}
            /*var cu_scroll = parseInt($('.'+ dom_id ).scrollLeft());                                
            target = cu_scroll+linum*move_one_width; 
            if(target>((num-linum)*move_one_width)){
                var target=0;
            }     */
            var move_dis = cur_dir == 'l' ? -linum*move_one_width : 0;
            ul_dom.animate({'left': move_dis + 'px'}, 500,function(){
            	lock = 1;
            	cur_dir = cur_dir == 'l' ? 'r' : 'l';
            });
            lock = 2;
            moveSlowDown(target);
        }    
	    var rollleft = function(target){
            if(lock == 2){  return ;}
            // var cu_scroll = parseInt($('.'+ dom_id ).scrollLeft());
            // target = cu_scroll-linum*move_one_width;  
            // if(target == -linum*move_one_width){
            //     var target=(num-linum)*move_one_width;
            // }
            lock = 2;
           	var move_dis = cur_dir == 'l' ? -linum*move_one_width : 0;
            ul_dom.animate({'left': move_dis + 'px'}, 500,function(){
            	lock = 1;
            	cur_dir = cur_dir == 'l' ? 'r' : 'l';
            });
            //moveSlowDown(target);
        }   
        //#-减速运动效果
        var moveSlowDown = function(target){
            var ns = target-parseInt($('.'+ dom_id).scrollLeft()); 
            moveElement(ns);        
        }
        //#-减速运动子阶段，递归函数，归零方休
        var moveElement = function(ns){
            if(ns == 0){
                lock = 1;
                return;
            }
           
            var step=ns>0?parseInt(Math.ceil(ns/10)):parseInt(Math.floor(ns/10));
            $('.'+ dom_id).scrollLeft(parseInt( $('.'+ dom_id).scrollLeft())+step);
            ns=ns-step;   
            var _moveElement = function(ns){
                return function(){
                    moveElement(ns);
                };
            };
            setTimeout(_moveElement(ns),1);
        }
	        
	      
         this.init = function(){
             $('#'+left).click(function(){
               	rollleft();
                $('.timg_list_cont').find("img").each(function(){ 
                    if(this.getAttribute("wx-lz")){       
                       this.src = this.getAttribute("wx-lz");
                       this.removeAttribute("wx-lz");
                    }
                 });
       
             });
             $('#'+right).click(function(){
                rollright();
                $('.timg_list_cont').find("img").each(function(){ 
                    if(this.getAttribute("wx-lz")){       
                       this.src = this.getAttribute("wx-lz");
                       this.removeAttribute("wx-lz");
                    }
                 });
             })
            
        }
	} 
	var timg_list_lunbo = new VisibleSlide(4,"timg_list_cont","salegoodsLeft","salegoodsRight");
	timg_list_lunbo.init();
	setInterval(function(){$("#salegoodsLeft").trigger('click');},10000);
	        
	//首页大轮播图
	var second = 5;
	var outSecond = 0.3;
	var swit_len= $("#switcherboard li").length;
	var switch_li = $("#switcherboard li");
	var sreenboard_li = $("#screenboard li");
	var getNextScreenNum = function(i){
		return i < swit_len -1 ? i+1 : 0;
	};
	switch_li.on('mouseover', function() {
		if (typeof autoSwitch != 'undefined'){
			clearTimeout(autoSwitch);
		}
		var obj = this;
		switchTime = setTimeout(function(){
			$(obj).addClass('select').siblings().removeClass('select');
			sreenboard_li.eq($(obj).index()).show().animate({'opacity':1},outSecond * 1000,function(){
				var initsrc = $(this).attr('wx-lz');
				var src = $(this).find('.timg_slide_recomn img').attr('wx-lz');
				if(initsrc){
					$(this).css('background','url('+initsrc+')  50% 0px no-repeat scroll transparent');
					$(this).removeAttr('wx-lz'); 
				}
				if(src){
					$(this).find('.timg_slide_recomn img').attr('src',src);
					$(this).find('.timg_slide_recomn img').removeAttr('wx-lz');
				}
			});
			sreenboard_li.eq($(obj).index()).siblings().animate({'opacity': 0}, outSecond * 1000, function() {
				$(this).hide();
			});
			autoSwitch = setTimeout(function(){
					switch_li.eq(getNextScreenNum(switch_li.index(obj))).trigger('mouseover');
				}, second * 1000);
		}, outSecond * 1000);

	});

	switch_li.on('mouseout', function() {
		clearTimeout(switchTime);
	});	
	
	var autoSwitch = setTimeout(function(){$("#switcherboard li:eq(0)").trigger('mouseover');},10);
	
	// 沱沱推荐 轮播	                
	var tbanner_nav_span = $(".tbanner_nav span");
	var tbanner_nav_li = $(".tbanner_count li");
	var tbanner_nav_span_len = $(".tbanner_nav span").length;
	tbanner_nav_span.mouseover(function(){
		if(typeof autoTTRecSwitch!='undefined'){
			clearTimeout(autoTTRecSwitch);
		}
		var obj = this;
		var i = tbanner_nav_span.index(this);
		switchTTRecTime = setTimeout(function(){
			$(obj).addClass('select').siblings().removeClass('select');
			tbanner_nav_li.eq(i).siblings().animate({'display':'block'},outSecond*1000,function(){
				$(this).css('z-index','1');
				tbanner_nav_li.eq(i).css('z-index','2');
			});
			tbanner_nav_li.eq(i).find("img").each(function(){ 
				if(this.getAttribute("wx-lz")){        
					this.src = this.getAttribute("wx-lz");
					this.removeAttribute("wx-lz");
				}
			});
			autoTTRecSwitch = setTimeout(function(){
				var j = i < tbanner_nav_span_len -1 ? i+1 : 0;
				tbanner_nav_span.eq(j).trigger('mouseover');
			},second*1000);                            
		},outSecond*1000);                                                
	}).mouseout(function(){
		clearTimeout(switchTTRecTime);
	});
	
	var	autoTTRecSwitch = setTimeout(function(){$(".tbanner_nav span:eq(0)").trigger('mouseover');},10);
    
    

	$(".timg_list_cont li").mouseover(function(){
		$(this).find("img").animate({"left":"-5px"},300);
	}).mouseout(function(){
		$(this).find("img").animate({"left":"0px"},300);
	});

	var thisUrl = window.location.href;
	if(thisUrl.indexOf('editor')<0)
	{
	    //轮播
	    $("#screenboard  .index_style_a").each(function(i){addTraceCode('hom_pptindex',i,this);});
	    //伸拉广告
	    $(".timg_list_cont  a").each(function(i){   addTraceCode('hom_slide',i, this);});
	    //明星单品
	    $("#screenboard  .timg_slide_recomn a").each(function(i){addTraceCode('hom_star',i,this);});
	    //最新活动活动
	    $(".tnoice_count:eq(0)  a").each(function(i){addTraceCode('hom_announce',i,this);});
	    //公告资讯
	    $(".tnoice_count:eq(1)  a").each(function(i){addTraceCode('hom_news',i,this);});
	    //限时抢购 超值促销 新品上市 沱沱农场
	    var type = ['hom_second','hom_surprise','hom_fashion','hom_farm'];
	    $(".tpromotion_count").each(function(i){
	    	$(this).find('li').each(function(j){
	    		$(this).find('a').each(function(){
	    			addTraceCode(type[i],j,this); 
	    		})
	    	})
	    })
	    //沱沱推荐
	    $(".tbanner_count  a").each(function(i){addTraceCode('hom_recommend',i,this);});
            //沱沱顶部广告
            $(".theader #littAds a").each( function(i){  addTraceCode('head_top_picturle', i, this ) } );
	}

	 var mxdp_max=$("#screenboard .timg_slide_recomn").length;
	 var mxdp_num= $("#screenboard .timg_slide_recomn a").length;
	 var i,j=0;
	 for( i = 0;i<mxdp_max;i++ ){
		j=j%mxdp_num;
		$("#screenboard .timg_slide_recomn").eq(i).html( $("#screenboard .timg_slide_recomn").eq(j).html());
		j++;
	 }
	//砸屏广告
	function fullScreenAd(){
		var upads = $("#upads"),
		start = upads.find('img').attr("begin_str"),
		end = upads.find('img').attr("end_str"),
		now = new Date().getTime(),
		times = 0,
		stationID = 1,
		strCookie = 'indexPopupTimesBeijing';
		if(now < end && now > start){
                    var str = wx.cookie('geos');
                    if(str.split('|')[12] == 2){
                            strCookie = 'indexPopupTimesShanghai';
                    }
                    times = wx.cookie(strCookie);
                    if(!times){
                       var timeExceed = 604800;
                       wx.cookie(strCookie,timeExceed);
                       upads.hide();//.find('.up_ads>img').onload = function(){
		                    var src = upads.find('.up_ads>img').attr('wx-lz');
		                    if(src.length > 0) {
		                        var img = new Image();
		                        img.src = src;
		                        img.onload = function(){
			                        var wid = parseInt(img.width + 20);
			                        var ban = parseInt(wid/2);
			                        var syl = "width:"+wid+"px;margin:120px 0 0 -"+ban+"px;";
			                        $(".twbox").attr('style',syl);
			                        upads.find('#littAds').removeAttr("id");
			                        $('#upads .floor_ads').attr('src',src);
	                            	$('#upads .floor_ads,#upads').show();
                            	}
		                    }else{
		                    	upads.remove();
		                    }
		                //});
			}else{
				 upads.remove();
			}
		}else{
			upads.remove();	
		}

		$("#close").on('click',function(){
			upads.remove();
		});
	}
	//统计代码
	function statistics(){
		var _wmmq = _wmmq || [];
		_wmmq.push( [ "db", "ifc" ] ,[ "sitecode", "T-000123-01" ]);
		_wmmq.push( [ "_trackPoint" ] );
	    var ays = document.createElement('script');
	    ays.type = 'text/javascript'; ays.async = true;
	    ays.src = ('https:' == document.location.prpotocol ? 'https://2' : 'http://1') + '.allyes.com.cn/aywmq.js';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(ays, s);
	}

	//百分点代码：首页
    var zhixiashi = {1: ['北京', '北京'], 310000: ['上海', '上海'], 120000: ['天津', '天津'], 500000: ['重庆', '重庆']},
    ps = wx.cookie('ps');
    window["_BFD"] = window["_BFD"] || {};
    _BFD.BFD_INFO = {
        "user_id": (user.hasLogin() ? 0 : user.BUYER_ID), //网站当前用户id，如果未登录就为0或空字符串
        "page_type": "homepage" //当前页面全称，请勿修改
    };
    if (!ps) {
        _BFD.BFD_INFO.city = ['北京', '北京'];
        baifendian();
    } else {
        var psArr = ps.split('-');
        if (zhixiashi[psArr[0]]) {
            _BFD.BFD_INFO.city = zhixiashi[psArr[0]];
            baifendian();
        } else {
            var geoIds = psArr.slice(0, 2).join('-');
            $.ajax({
                type: "GET",
                url: config.web + 'index.php?r=tGeo/getNameByGeoId',
                data: 'geoIds=' + geoIds,
                dataType: 'jsonp',
                success: function(res) {
                    var name = res.split(' ');
                    _BFD.BFD_INFO.city = name;
                    baifendian();
                },
                error: function() {
                    _BFD.BFD_INFO.city = ['北京', '北京'];
                    baifendian();
                }
            });
        }
    }
    function baifendian(){
        window["_BFD"] = window["_BFD"] || {};
        _BFD.client_id = "Ctest_ttgs";
        _BFD.script = document.createElement("script");
        _BFD.script.type = "text/javascript";
        _BFD.script.async = true;
        _BFD.script.charset = "utf-8";
        _BFD.script.src = (('https:' == document.location.protocol ? 'https://ssl-static1' : 'http://static1') + '.baifendian.com/service/tuotuogongshe/ttgs_home.js');
        document.getElementsByTagName("head")[0].appendChild(_BFD.script);
    }

    /*添加广告标识*/

    /*if(window.navigator.userAgent.indexOf("Chrome") !== -1){
    	$(".Js-mark").append("<div style='font-size: 12px; -webkit-transform: scale(0.75); position: absolute; left:-4px; bottom:-2px;'><div style='background:#ccc; font-size: 9px; float:left; color:#ffffff; padding: 0px 2px;'>广告</div></div>");
    }else{
    	$(".Js-mark").append("<div style='font-size: 12px; -webkit-transform: scale(0.75); position: absolute; left:0px; bottom:0px;'><div style='background:#ccc; font-size: 9px; float:left; color:#ffffff; padding: 0px 2px;'>广告</div></div>");
    }*/

    /*轮播：商品模块是图片*/
    /*$(".Js-watermark-img").append("<span class='watermark-img'><span class='watermark-content'>广告</span></span>");*/
    /*轮播：商品模块无padding*/
    /*$(".Js-watermark").append("<span class='watermark'><span class='watermark-content'>广告</span></span>");*/
    /*一层~六层：商品模块有padding*/
    /*$(".Js-watermark-pad").append("<span class='watermark-pad'><span class='watermark-content'>广告</span></span>");*/
    /*一层—~六层：商品模块是图片*/
    /*$(".Js-watermark-gimg").append("<span class='watermark-gimg'><span class='watermark-content'>广告</span></span>");*/
    /*一层—~六层：排行商品是图片*/
    /*$(".Js-watermark-pimg").append("<span class='watermark-pimg'><span class='watermark-content'>广告</span></span>");*/


    /*大轮播：右侧商品模块小图*/
    $("#screenboard .timg_slide_recomn").append("<span class='watermark-img'><span class='watermark-content'>广告</span></span>");

    /*四图轮播：商品模块是图片*/
    $(".timg_list_cont li").append("<span class='watermark-img'><span class='watermark-content'>广告</span></span>");

    /*六图轮播：商品模块无padding*/
    $(".tpromotion_count li").append("<span class='watermark'><span class='watermark-content'>广告</span></span>");

    /*一层~六层：商品模块有padding*/
    $(".tsc_pro_list .goodsArea").append("<span class='watermark-pad'><span class='watermark-content'>广告</span></span>");/*tab01*/
    $(".tsc_pro_list02 li").append("<span class='watermark-pad'><span class='watermark-content'>广告</span></span>");/*tab02~*/

    /*一层—~六层：排行商品是图片*/
    $(".tpro_top .goodsArea").append("<span class='watermark-pimg'><span class='watermark-content'>广告</span></span>");

    /*一层—~六层：商品模块是图片*/
    $(".tsc_slide_img li").append("<span class='watermark-gimg'><span class='watermark-content'>广告</span></span>");/*tab01图片*/
    $(".top_bottom_banner").append("<span class='watermark-gimg'><span class='watermark-content'>广告</span></span>");/*排行底部广告*/
    

  
});