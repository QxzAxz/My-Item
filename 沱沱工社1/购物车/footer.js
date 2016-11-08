var footerStationId=_intoObj.getSubStationID();
$("#myTooToo").hover(
        function(){
            $("#buyerBox").show();
        },
        function(){
            $("#buyerBox").hide();
        }
        );
$('.weixin').mouseover(function(){
    $(this).find('.weixin_cont').css('display','');        
});
$('.weixin').mouseout(function(){
    $(this).find('.weixin_cont').css('display','none');        
});

$("img").error(function(){
    var reg    = /(\_50|\_80|\_130|\_160|\_400|\_120|\_280|\_500|\_800)/g;
    var size   = $(this).attr('src').match(reg); 
    if(size == null)
        return;
    var imgSrc =  web_img_domain+'images/noimg/noimg'+size+'.jpg';
    var ImgObj=new Image;
    ImgObj.src=imgSrc;
    if(size && (ImgObj.width || ImgObj.height)){
        this.src = imgSrc;
        $(this).css("zoom",'99%');
    }
});
var level_flag = buyerInfo.BUYER_LEVEL;
if(level_flag>=100 && level_flag<=199){
    $(".level_three").hide();        
}

//head ad
var adObj = new headad();
adObj.init();

laterScriptsRun();
var jsessionId = '';
var monitorInterval = 5000; 

//live800开始
function live800Click(){
    try{
        if(language == 'en')
            var url="http://chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=278434&configID=42788&jid=6430100996&";
        else       
            var url="http://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=173771&configID=51564&jid=5719660467&";
    url+="&timestamp="+new Date().getTime();
    window.open(url,"800chatbox","toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=570,height=424");
    }catch(e){}
} 
//live800结束


    /*-------------所有页面调用授权服务---------------------*/
//    (function() {
//        var authorize = document.createElement('script');
//        authorize.type = 'text/javascript';
//        authorize.async = true;
//        authorize.src = web_js_domain + '/js/cn/authorize.js';//域名要改。
//        var s = document.getElementsByTagName('script')[0];
//    s.parentNode.insertBefore(authorize, s);
//    })();
    /*-------------两个在线客服：ntalk和live800--------------*/
    //英文live800
    if(typeof lang!='undefined' && lang=='en'){
        live_script_dom = $("<scr"+"ipt language=\"javascript\" src=\"http://chat56.live800.com/live800/chatClient/monitor.js?jid=6430100996&companyID=278434&configID=42400&codeType=custom\"></scr"+"ipt>");
        $("body").append(live_script_dom);
    }
    //英文live800结束

(function(){
    var cblog = $.cookies.get('cblog');
    if(cblog){
        //将%20编码还原为空格
        var arr = cblog.replace(/%20/g,' ').split('|');
        $.ajax({
            type:'GET',
            url:web_user_domain+'index.php?r=tBuyer/ajaxGetThBindId',
            data:'th_user='+arr.slice(-1),
            timeout:8000,
            dataType:'jsonp',
            jsonp: 'callback',      
            success: function(data){    
                if(typeof buyerInfo != 'undefined' && !buyerInfo.getIsGuest(true)){
                    if(data == buyerInfo.BUYER_ID){
                        var showMsg = arr[0], headShow = arr[1], jifenUrl = arr[2] == '' ? '###' : arr[2];
                        $('#show_msg').html(showMsg);
                        $('#head_show').html(headShow);
                        $('#title2013').css('padding-top','80px');
                        $('#jf_url').attr('href',jifenUrl);
                        $('.qq_cb').show();
                    }
                }                                             
            },
            error: function(){}                       
        });
    }
})();

/*-------------以下是各种统计代码--------------*/

/*------------丰灵统计代码start-------------*/
  var siteLang= $.cookies.get('lang');
  var siteStationId=_intoObj.getSubStationID();
  var forinSiteId=1;
  if(typeof siteLang!='undefined' && siteLang=='en')
  {
      forinSiteId=parseInt( siteStationId ) +2;
  }
  else
  {
      forinSiteId=siteStationId;
  }
  var uid='';
 if(typeof buyerInfo != 'undefined' && !buyerInfo.getIsGuest(true))
 {
   uid=  buyerInfo.BUYER_ID ;        
 }

//PC站和WAP站丰灵基本码PC站和WAP站丰灵基本码PC站和WAP站丰灵基本码PC站和WAP站丰灵基本码PC站和WAP站丰灵基本码
var _vaq = _vaq || [];
    _vaq.push(["setCookieDomain", ".tootoo.cn"]);
    _vaq.push(['setUserId',uid]);
    _vaq.push(['trackPageView']);

  (function() {   
    var u=(("https:" == document.location.protocol) ? "https" : "http") + "://fl.tootoo.cn/va-001-a01/";
    _vaq.push(['setTrackerUrl', u+'va.gif']);
    _vaq.push(['setSiteId', forinSiteId]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript';
    g.src='http://fl.tootoo.cn/va.js'; s.parentNode.insertBefore(g,s);
  })();
/*------------丰灵统计代码end-------------*/
// gaq start 
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-15554355-1', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');
  

// gaq end

//ema
_adwq = (typeof _adwq !== 'undefined') ? _adwq : []; 
_adwq.push(['_setAccount', 'gzvlq']);
_adwq.push(['_setDomainName', '.tootoo.cn']);
_adwq.push(['_trackPageview']);
(function() {
    var adw = document.createElement('script');
        adw.type = 'text/javascript';
        adw.async = true;
        adw.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://s') + '.emarbox.com/js/adw.js';
    var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(adw, s);
})();
//ema end

//google start
google_conversion_id = 1018732958;
google_conversion_language = "en";
google_conversion_format = "3";
google_conversion_color = "ffffff";
google_conversion_label = "RR_0CPKzsQIQnsPi5QM";
google_conversion_value = 0;
(function(){
    var googleScript = document.createElement('script'); 
        googleScript.type = 'text/javascript'; 
        googleScript.async = true;
        googleScript.src = 'http://www.googleadservices.com/pagead/conversion.js'; 
    var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(googleScript, s);
})();
//google end

 

//mediav start
_mvq = (typeof _mvq !== 'undefined') ? _mvq : []; 
_mvq.push(['$setAccount','m-430-0']);
_mvq.push(['$logConversion']); 
(function() { 
    var mvl = document.createElement('script'); 
        mvl.type = 'text/javascript'; 
        mvl.async = true; 
        mvl.src = ('https:' == document.location.protocol ? 'https://secure' : 'http://static') + '.mediav.com/mvl.js'; 
    var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(mvl, s); 
})(); 
//mediav end   

//baidu start
var baidu_station = (footerStationId == 1) ? '5232f0c9417faf12466f657c249e3417' : 'fdf563a54a4bc4a1577761ff18119f79';
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?" + baidu_station;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

/*
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
(function(){
    var tk = document.createElement('script'); 
        tk.type = 'text/javascript'; 
        tk.async = true;
        tk.src = _bdhmProtocol+'hm.baidu.com/h.js?5232f0c9417faf12466f657c249e3417'; 
    var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(tk, s);
})();        
*/
//baidu end

(function (d) {
    (window.bd_cpro_rtid = window.bd_cpro_rtid || []).push({id: "rHczPj0"});
    var s = d.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = location.protocol + "//cpro.baidu.com/cpro/ui/rt.js";
    var s0 = d.getElementsByTagName("script")[0];
    s0.parentNode.insertBefore(s, s0);
})(document);

/*------------爱德康赛广告代码start-------------*/
(function() {
    var filterArray = [ 'index.php?r=tBuyer/regSucc','index.php?r=tBuyer/regEnSucc', 'index.php?r=tPay/orderSuccess','order_success_zh_cn.html','order_success_en.html','ordersuccess_en.html','ordersuccess_zh_cn.html'];
    var href  = window.location.href;
    var reshref = href;
    if(href.indexOf('tourl') > 0){
        reshref = href.substr(0,href.indexOf('tourl'));
    }
    var res  = true;
    $.each(filterArray,function(m,n){
        if(reshref.indexOf(n) >= 0){
            res = false;
            return false;
        }
    });
    if(res){
        try {
            window._trc_=window._trc_||{};
            window._prm_=window._prm_||{};
            var e = document.createElement("script");  
            e.src = "//trac.imarvelous.cn/tracking.js?1c3aa3b7e1125d6d9c3cc030be956a84";  
            var s = document.getElementsByTagName("script")[0];  
            s.parentNode.insertBefore(e, s); 
        } catch (i) {}                        
    }
})();
/*------------爱德康赛广告代码end------------*/

/*-------- 数客营销代码begin-------*/
if(language != 'en'){
    (function () {
        var filterArray = ['cart-zh_cn.html','ordersuccess_zh_cn.html','order_success_zh_cn.html'];
        var href  = window.location.href;
        var reshref = href;
        if(href.indexOf('tourl') > 0){
            reshref = href.substr(0,href.indexOf('tourl'));
        }
        var res  = true;
        $.each(filterArray,function(m,n){
            if(reshref.indexOf(n) >= 0){
                res = false;
                return false;
            }
        });
        if(res){
            try {
                var s = document.createElement('script');
                var x = document.getElementsByTagName('script')[0];
                s.type = 'text/javascript';
                s.async = true;
                s.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'ap-sonar.sociomantic.com/js/2010-07-01/adpan/tootoo-cn';
                x.parentNode.insertBefore(s, x);            
            } catch (i) {}                        
        }
    })();
}
/*-------- 数客营销代码end-------*/
