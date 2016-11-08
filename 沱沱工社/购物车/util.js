/**forbidden compressed parameters info****
 * Note:"chs" is a parameter where input the chinese string.This sequence is cann't be reversed.The new value is appended to the last positon,separator by "@@".
 **/
var cookieConfig = function(cname, value, expire) {

    if (cname != '') {
        $.cookies.set(cname, value, {path: '/', hoursToLive: expire, domain: '.tootoo.cn'});
    }
}

$.cookies.set('channelType', '1', {path: '/', hoursToLive: 720, domain: '.tootoo.cn'});

/*domain config*/
var uuuuUrl = window.location.href
if (uuuuUrl.indexOf('test3') >= 0)
{
    var web_domain = "http://test3.tootoo.cn/";
    var web_domain_en = "http://en.test3.tootoo.cn/";
    var web_domain_cn = "http://test3.tootoo.cn/";
    var web_wap_domain = 'http://m.test3.tootoo.cn/';
    var web_pay_domain = "http://pay.test3.tootoo.cn/";
    var web_img_domain = "http://img.test3.tootoo.cn/";
    var web_js_domain = "http://js.test3.tootoo.cn/";
    var web_user_domain = "http://user.test3.tootoo.cn/";
    var web_en_host = "http://shop.test3.tootoo.cn/";
    var web_img_path = 'http://img.test3.tootoo.cn/images/cn/';
    var web_sapi_domain = 'http://sapi.test.tootoo.cn/';
    var https_spai_domain = 'https://portal.tootoo.cn/sapi/beta/';
    var https_user_domain = 'https://portal.tootoo.cn/user/v3beta/';
    var https_pay_domain = 'https://portal.tootoo.cn/pay/v3beta/';

    var bfd_prefix = "testttgs";
}
else if (uuuuUrl.indexOf('v3beta') >= 0)
{
    var web_domain = "http://v3beta.tootoo.cn/";
     var web_domain_en = "http://en.v3beta.tootoo.cn/";
    var web_domain_cn = "http://v3beta.tootoo.cn/";
    var web_wap_domain = 'http://m.v3beta.tootoo.cn/';
    var web_pay_domain = "http://pay.v3beta.tootoo.cn/";
    var web_img_domain = "http://img.v3beta.tootoo.cn/";
    var web_js_domain = "http://js.v3beta.tootoo.cn/";
    var web_user_domain = "http://user.v3beta.tootoo.cn/";
    var web_en_host = "shop.v3beta.tootoo.cn";
    var web_img_path = 'http://img.v3beta.tootoo.cn/images/cn/';
    var web_sapi_domain = 'http://sapi.beta.tootoo.cn/';
    var https_spai_domain = 'https://portal.tootoo.cn/sapi/beta/';
    var https_user_domain = 'http://user.v3beta.tootoo.cn/';//'https://portal.tootoo.cn/user/v3beta/';
    var https_pay_domain = 'https://portal.tootoo.cn/pay/v3beta/';

    var bfd_prefix = "testttgs";
}
else
{
    var web_domain = "http://www.tootoo.cn/";
     var web_domain_en = "http://en.tootoo.cn/";
    var web_domain_cn = "http://www.tootoo.cn/";
    var web_wap_domain = 'http://m.tootoo.cn/';
    var web_pay_domain = "http://pay.tootoo.cn/";
    var web_img_domain = "http://misc.ttmimg.com/";
    var web_js_domain = "http://js.ttmimg.com/";
    var web_user_domain = "http://user.tootoo.cn/";
    var web_en_host = "http://shop.tootoo.cn";
    var web_img_path = 'http://misc.ttmimg.com/images/cn/';
    var web_sapi_domain = 'http://sapi.tootoo.cn/';
    var https_spai_domain = 'https://portal.tootoo.cn/sapi/';//'https://portal.tootoo.cn/sapi/';
    var https_user_domain = 'http://user.tootoo.cn/';//'https://portal.tootoo.cn/user/';
    var https_pay_domain = 'http://pay.tootoo.cn/';//'https://portal.tootoo.cn/pay/';

    var bfd_prefix = "ttgs";
}
var language;
var defaultGeos =  '1|北京|BEIJING|2|北京|beijing|3|东城区|DONGCHENG||||1|北京站|BEIJING STATION|index|index-en-1';
/*********************generate.js****此段js取自generate.js，请压缩后放置这里*****************************/
function initGet() {
    this.setNeedSetLang = '1';
    /**
     * 获取当前GEOS的cookie，转换成数组格式输出
     * @returns {Boolean}
     */
    this.getGeos = function() {
        var str = $.cookies.get('geos');
        if (str == '' || typeof str == 'undefined' || str == null) {
            str = defaultGeos;
        }
        //cookie中获取
        var arrObj = new Array(); //定义一数组
        arrObj = str.split("|"); //字符分割
        if (arrObj.length != 17) {
            alert('geos error');
            return false;
        }
        if (arrObj[9] == '')
            arrObj[9] = 0;
        return arrObj;
//        var geoIds = [arrObj[0],arrObj[3],arrObj[6],arrObj[9]];
//        var geoNameCn = [arrObj[1],arrObj[4],arrObj[7],arrObj[10]];
//        var geoNameEn = [arrObj[2],arrObj[5],arrObj[8],arrObj[11]];
//        var subStationId = arrObj[12];
//        var subStationNameCn = arrObj[13];
//        var subStationNameEn = arrObj[14];
//        var indexCn = arrObj[15];
//        var indexCn = arrObj[16];
    }
    this.setGeos = function(pID, cID, dID, aID, callback) {
        var ps = pID + '-' + cID + '-' + dID + '-' + aID;
        cookieConfig('ps', ps, 24 * 30);
        cookieConfig('geos', null, 0);
        this.setSession(callback);
    }
    /**
     * 获取所属分站
     * @returns {Number}
     */
    this.getSubStationID = function() {
        var arrObj = this.getGeos();
        if (!arrObj)
            return 1;
        return    arrObj[12] || '1';
    }
    /**
     * 获取当前所属的GEO
     * @returns {Array}
     * TODO WTT
     */
    this.getCurrentGeoName = function() {
        var arrObj = this.getGeos();//alert(obj);
        if (arrObj == false)
            return 0;
        if (language == 'en')
            return [arrObj[2], arrObj[5], arrObj[8], arrObj[11]];
        return [arrObj[1], arrObj[4], arrObj[7], arrObj[10]];

    }
    /**
     * 获取需要跳转的首页
     * @returns {String}
     */
    this.getIndex = function() {
        var domain = web_domain;
        var arrObj = this.getGeos();//alert(obj);
        var href;
        if (arrObj == false){
            href = 'index';
        }else if (language == 'en'){
            domain = web_domain_en;
            href = arrObj[16];
        }else
            href = arrObj[15];
        if(href == null || href == '' || typeof href == 'undefined')
            href = 'index';
//        alert(href);
        return domain + href + '.html';
    }
    /**
     * 跳转到首页
     * @returns {Boolean}
     */
    this.gotoIndex = function() {
        var sssurl = uuuuUrl;
        if (sssurl.indexOf('?') >= 0) {
            var tmp = sssurl.split('?');
            sssurl = tmp[0];
        }
        var gourl = this.getIndex();
        if (sssurl.indexOf(gourl) >= 0)
            return false;
        if (gourl.indexOf('.html') >= 0 && (sssurl.indexOf(web_domain + 'index.html') >= 0 || sssurl == web_domain) && gourl.indexOf('index.html') < 0) {
            var searchString = document.location.search.toString();
            window.location.href = gourl + searchString;
            window.event.returnValue = false;
        }
        if (gourl.indexOf('.html') >= 0 && (sssurl.indexOf(web_domain_cn + 'index.html') >= 0 || sssurl == web_domain_cn) && gourl.indexOf('index.html') < 0) {
            var searchString = document.location.search.toString();
            window.location.href = gourl + searchString;
            window.event.returnValue = false;
        }
        if (gourl.indexOf('.html') >= 0 && (sssurl.indexOf(web_domain_en + 'index.html') >= 0 || sssurl == web_domain_en) && gourl.indexOf('index.html') < 0) {
            var searchString = document.location.search.toString();
            window.location.href = gourl + searchString;
            window.event.returnValue = false;
        }
        return false;
    }

    /**
     * 设置语言cookie
     */
    this.langSet = function(lang, timeout, callback) {
        language = typeof lang != 'undefined' ? lang : 'zh_cn';
        var timeout = typeof timeout != 'undefined' ? timeout : 24 * 30;
        cookieConfig('lang', language, timeout);
        if (typeof callback == 'function'){
            callback();
            return;
        }else{
            this.langRecognize();
        }

    }
    /**
     * 识别语言zh_cn或en
     */
    this.langRecognize = function() {
        var language_url = null;
        //1.根据url参数
        var uuuuUrl = window.location.href;
        var host    =  window.location.host;
        if (uuuuUrl.indexOf('-en') >= 0) {
            language_url = 'en';
            web_domain = web_domain_en;
        } else if (uuuuUrl.indexOf('-zh_cn') >= 0) {
            language_url = 'zh_cn';
            web_domain = web_domain_cn;
        }else if( /^en\.(\w+\.)?tootoo\.cn/.test(host) ){
            language_url = 'en';
            web_domain = web_domain_en;
        }
        //2.根据cookie
        var language_cookie = $.cookies.get('lang');

        //语言优先级  url>cookie>浏览器
        if (language_url !== null) {
            language = language_url;
        } else if (language_cookie == 'zh_cn' || language_cookie == 'en') {
            language = language_cookie;
        } else {
            var browserName = navigator.appName;
            language = browserName == "Netscape" ? navigator.language : navigator.userLanguage;
            language = language.substr(0, 2);
        }
        if (language == 'zh')
            language = 'zh_cn';
        if (language != 'zh_cn' && language != 'en')
            language = 'en';
        if(this.setNeedSetLang == '1')
            cookieConfig('lang', language, 24 * 30);

        if (language == 'en') {
            web_img_path = web_img_path.replace('images/cn', 'images/en');
        }
    }

    /**
     * 检查是否需要重新调用ajax请求
     * @returns {undefined}
     */
    this.check = function() {
        var ps = $.cookies.get('ps');
        var geos = $.cookies.get('geos');
        var sstk = $.cookies.get('sstk');
        if (!ps || !geos || !sstk)
            return false;
        return true;
    }
    this.isIndex = function() {
        return true;
        if (uuuuUrl.indexOf('index.html') >= 0)
            return true;
        if (uuuuUrl == web_domain)
            return true;
        return false;
    }
    /**
     *
     * @param {type} goto
     * @returns {unresolved}
     */
    this.setSession = function(callback) {
        var ps = $.cookies.get('ps');
        var station = this.getSubStationID();
        if((ps != null && ps.substr(-1,1) == '-') || station == ''){
            cookieConfig('ps', '');
            cookieConfig('geos', '');
        }

        var cookie_scope = '11101';
        if (language == 'en')
            cookie_scope = '21101';//alert(this.check());
        var goto = this.isIndex();
        var a = this.getIndex();
        if (this.check()) {
            if (typeof callback == 'function')
                callback();
            if (goto)
                this.gotoIndex();
//            alert('noload');
            return;
        }
        $.ajax({
            type: "GET",
            url: web_sapi_domain + 'authorize/MainServlet?method=generateSession&auth_type=1&cookie_scope=' + cookie_scope + '&req_fmt_type=jsonp',
            timeout: 5000,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function(data) {
                if (typeof callback == 'function')
                    callback();
//                alert(1);
                if (goto)
                    _intoObj.gotoIndex();
            }
        });
    }
}
var _intoObj = new initGet();
var loadInit = function() {
    _intoObj.langRecognize();
    _intoObj.setSession();
}
loadInit();

/**************************************generate.js-end*************/

var chs = '商品库存不足@@正在加载购物车，请稍后再尝试添加此商品，或<a href="#" onclick="location.reload()">刷新</a>此页面@@正在加载购物车，请稍后再尝试修改数量，或<a href="#" onclick="location.reload()">刷新</a>此页面@@正在加载购物车，请稍后再尝试，或<a href="#" onclick="location.reload()">刷新</a>此页面\n\
 @@管理我的地址库@@重新查找@@很抱歉，此商品暂时缺货。@@商品@@预估金额@@运费@@VIP贵宾购物即享受95折@@查看详细@@贵宾服务专线：400-898-9797@@账户可用余额：@@余额不足@@请充值@@继续消费：@@免运费@@即可参与@@活动。@@您本次的收货地址是：@@修改@@添加我的收货地址@@您还没有默认的收货地址信息,提醒您在选购商品前至少添加一个收货地址\n\
 @@赠品@@删除@@您的购物车中暂无商品@@总计金额@@参与会员增值计划 享受最高折扣@@开业酬宾，生鲜商品配送免运费！@@共@@件商品@@总计：@@您的购物车中暂无商品，快去挑选中意的商品吧。@@您需要在登录后才可以查看购物车中商品@@确定@@关闭@@请先登录后再收藏商品！@@商品已被删除！@@您已经收藏过此商品！@@收藏成功！\n\
 @@删除成功！@@收藏出现异常！@@斤@@【@@】@@帮助@@您好@@请登录@@退出登录@@不是@@免费注册@@请输入搜索词@@很抱歉，商品库存不足，最多只可购买@@原价@@促销价@@贵宾价@@单价@@￥@@很抱歉！您选择的商品目前只在北京地区配送。<br />建议您：<br />1.还没有添加收货地址信息？ 请点击“管理我的地址库”按钮添加收货地址<br />2.已经创建了地址库，从现有地址库中选择一个北京地区的收货地址<br />3.重新查找同类商品\n\
 @@很抱歉，该商品库存不足，最多只可购买[ {max} ]@@您好，该商品可购买的数量区间为@@的整数@@×@@欢迎光临沱沱工社@@登录@@注册@@首页\n\
@@促@@赠@@数量@@元@@免费注册@@即可@@很抱歉，该商品目前仅限VIP会员购买，建议您看看其他同类商品，谢谢！@@，@@：\n\
@@精彩活动即将开始，敬请期待！@@目标转化@@事件@@跟踪目的@@购物车面板结算@@注册链接@@专享价@@阶梯价@@购买数量@@可节省@@专享购物区\n\
@@沱沱大家说@@该商品目前只限VIP会员、专享会员购买，感谢您的支持！@@换购商品不能修改数量@@全场购物满@@网络繁忙，@@点击这里\n\
@@重新加载！@@会员@@普通@@其他@@绿芽@@畅购卡@@高级@@专享@@秒杀商品不能修改数量@@15分钟内只能参与一次0元抢活动且每笔订单限购一件!\n\
@@秒杀价 @@沱沱社区 @@单价@@促销价@@专享价@@贵宾价';
var ens = 'The stocks is running low.@@loading shopping cart…please try to add this item later or <a href="#" onclick="location.reload()">refresh</a> the page.@@loading shopping cart… please try to modify the quantity later or <a href="#" onclick="location.reload()">refresh</a> the page.@@loading shopping cart… please try again later or <a href="#" onclick="location.reload()">refresh</a> this page.\n\
 @@manage my Address Book@@search again@@Sorry! The product is currently run out of stock.@@product@@estimated amount@@delivery fee@@a 5% discount for VIP members@@see details@@VIP hotline: 400-898-9797@@account balance：@@insufficient balance@@Please recharge@@Continue shopping：@@freight free@@to get (a discount or special)@@promotions@@The delivery address for this time is：@@edit@@add to my address book@@There is no default delivery address at the moment. We kindly suggest that please add one at lease before you start shopping.\n\
 @@a free gift@@delete@@Your shopping cart is empty.@@total amount@@Join our value-added member service to get the highest discount!@@Opening special! Freight free on all fresh products!@@altogether@@XX items@@total：@@Your shopping cart is empty. Please have a look for something else.@@You can check the shopping cart only after you’re logged in.@@OK@@close@@Please log in first before collect it!@@The item has been deleted!@@You have already collected this item to your wishlist!@@Successfully add to your wishlist!\n\
 @@Deleted!@@There is an error when collecting product to the wishlist!@@500g@@[@@]@@Help@@Hello@@Please login@@log out@@Not@@free register@@Please enter the keyword into the search field@@Sorry! According to the low stock, you can only purchase 2 items of this product!@@original price@@special offer@@VIP discounted price@@unit price@@￥@@Sorry! The chosen items can only be delivered in Beijing (within 6th Ring Road). Our suggestion:Have you created your Address Book yet? Click “Manage my Address Book” and add a new one!Already set up Address Book, pick one from it and make sure it is in Beijing (within 6th Ring Road).Search again on same sort of products.\n\
 @@Sorry! This product is running a low stock. The maximum number for purchasing is[ {max} ]@@Hi, the mount of available products is \n\
@@ @@multiplies@@Welcome to TooToo Farm!@@Login@@Register@@Homepage@@promotion@@free gift@@quantity@@ @@free register\n\
@@…… will be (OK).@@Sorry! This product is available to VIP members only. Please take a look for something similar. Thanks!@@，\n\
@@：@@New exciting activities are about to come, please look forward to!@@target transformation@@events@@tracking objective\n\
@@payment panel of shopping cart@@register link@@exclusive price@@Ladder pricing@@Qty@@Savings\n\
@@exclusive shopping zone@@TooToo BBS@@This product is available to VIP members and exclusive members only. Thanks for your support!\n\
@@no quantity modifies allowed on redeemed products.@@when spend ￥XXX or above@@network is busy!@@click here@@re-loading@@Member\n\
@@ordinary@@other@@Green shoots@@Popular shopping card@@Senior@@Exclusive@@The goods can not modify the number of spike\n\
@@15分钟内只能参与一次0元抢活动且每笔订单限购一件!@@Second price @@TooToo Farm! @@price@@Special@@price@@vip price';
var bfdclient;
var tx = new Array();
if (language == 'en') {
    tx = ens.split("@@");
    bfdclient = 'Ctest_ttgs_en';
} else {
    tx = chs.split("@@");
    bfdclient = 'Ctest_ttgs';   //误用百分点账号，跟百分点沟通，用测试账号没影响，他们js通过域名又做了处理。2015.7.1
}
var stationIDAndProID = {"1": 1, "310000": 2, "120000": 3};
//for(var i=0;i<tx.length;i++){
//    document.write("tx["+i+"]="+tx[i]+"<br>");
//}


/*this goods only special users can buy*/
var cartSpecialRules = [
    {"goods": [1014320], "startDate": "2013-01-08", "endDate": "2013-01-13", "msg": tx[89]},
    {"goods": [1011320], "startDate": "2013-01-08", "endDate": "2013-01-13", "msg": tx[89]},
];
/**********here put the util_main_v2.js min**********************************************************/
/*
 * Note:This file can not be used alone,must put it into util_v2.js.Because some parameters is defined in util_v2.js.
 */
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var is_safari = (userAgent.indexOf('webkit') != -1 || userAgent.indexOf('safari') != -1);
/*******************************************************************************
 *config info
 */

var isFloorCart = true;

var $tt_carAjaxPath = web_domain + 'cart.php';
var $tt_carSdcAlert = tx[59];
var $tt_carStockAlert = tx[60];
var $tt_password_min = 6;
var $tt_password_max = 20;
var $tt_nickname_min = 4;
var $tt_nickname_max = 16;
var $tt_answer_min = 4;
var $tt_answer_max = 50;

var special_gid = 1012320;

var hasinput2 = false;
var ship_air = $_GET('shipair');
var set_promotion_from_cookie = true;
var promotion_from = $_GET('promotion_from');
try {
    promotion_from = decodeURI(promotion_from);
} catch (e) {
    set_promotion_from_cookie = false;
}
promotion_from = promotion_from.substr(0, 20);

var promotion_day = parseInt($_GET('promotion_day'));
if (promotion_day < 0 || !promotion_day)
    promotion_day = 1;
var promotion_hour = promotion_day * 24;

var set_insource_from_cookie = true;
var insource_from = $_GET('insource_from');
try {
    insource_from = decodeURI(insource_from);
} catch (e) {
    set_insource_from_cookie = false;
}
insource_from = insource_from.substr(0, 20);
var insource_day = parseInt($_GET('insource_day'));
if (insource_day < 0 || !insource_day)
    insource_day = 1;
var insource_hour = insource_day * 24;

var buyerSource = $_GET('buyersource');
var inviteEmail = $_GET('inviteemail');
var inviteId = $_GET('inviteid');
var source_id = $_GET('source_id');

var notice_sku_id;
var _gaq = _gaq || [];

/*******************************************************************************
 * The init function of js
 */

/**
 * 标记北京站或者是上海站的锚点
 */
function addStation(){
    var stationId = _intoObj.getSubStationID();
    if(stationId == '1')
        return true;
    $('a').each(function(){
        var url = $(this).attr('href');
        if (typeof url !== 'undefined') {
            var html_flag = url.indexOf('.html');
            var station_flag = url.indexOf('sd=');
            var no_flag = url.indexOf('#');
            if(html_flag > 0 && station_flag <0 && no_flag <0){
                var type = '?';
                if(url.indexOf(type)>0){
                    type = '&';
                }
                //判断是不是url，不是url不加。是不是有问问号，如果问号.连接符是&，否则是？
                $(this).attr('href',url+type+'sd='+stationId);
            }
        }
    });
    return true;
}


var initJs = function() {
//    setsession();
    buyerInfo.load();
    if (ship_air + '' != '')
        cookieConfig('shipair', ship_air, 24);
    if (source_id + '' != '')
        cookieConfig('source_id', source_id, 24 * 30);
    if (promotion_from + '' != '' && set_promotion_from_cookie == true)
        cookieConfig('promotion_from', promotion_from, promotion_hour);
    if (insource_from + '' != '' && set_insource_from_cookie == true)
        cookieConfig('insource_from', insource_from, insource_hour);
    if (buyerSource + '' != '')
        cookieConfig('buyersource', buyerSource, 168);//wtt add 0613 1606
    if (inviteEmail + '' != '')
        cookieConfig('invite_email', inviteEmail, 168);//wtt add 0613 1606
    if (inviteId + '' != '')
        cookieConfig('invite_id', inviteId, 168);//wtt add 0613 1606
    JT_init();

    /* img later loading */
    loadimg = new needLoadImg(251, 222);
    loadimg.init();
    window.onscroll = function() {
        loadimg.init();
    }
    window.onresize = function() {
        loadimg.init();
    }
//    addStation();
//    setTimeout('addStation()',10000);
    loadWeibo();
}

function loadWeibo(){
    $('#Js-weibo').append('<iframe style="margin:5px 0 0 0;" width="63" height="24" frameborder="0" allowtransparency="true" marginwidth="0" marginheight="0" scrolling="no" border="0" src="http://widget.weibo.com/relationship/followbutton.php?language=zh_cn&width=63&height=24&uid=1659865567&style=1&btn=red&dpc=1"></iframe>');
}

/*******************************************************************************
 * main classes
 */


/**
 * 识别语言zh_cn或en
 */
function recognizeLanguage() {
    _intoObj.langRecognize();
}

/**
 * 设置语言cookie
 */
function setLanguage(lang, timeout, callback) {
    _intoObj.langSet(lang, timeout, callback);
}


/*
 * Class Buyer
 * by Qiujiashu@ninetowns.com
 * on 2013|01|11
 */
var Buyer = function()
{
    this.onlineStatusPlantTextName = 'u';
    this.onlineStatusCiphertextName = 'um';
    this.onlineStatusExpireName = 'ut';
    this.buyerCookieUtWarnTime = 60 * 60 * 2;//test:2min    pro:2hours
    this.buyerCookieUtDelayTime = 60 * 60 * 2;//test:2min    pro:2hours
    this.buyerTypeDict = {1: tx[96] + tx[95], 2: 'VIP' + tx[95], 3: tx[97] + tx[95], 4: tx[97] + tx[95], 5: tx[97] + tx[95], 6: tx[97] + tx[95], 7: tx[98] + tx[95], 8: tx[99] + tx[95], 10: tx[100] + tx[95], 11: tx[101] + tx[95]};

    this.BUYER_ID = null;
    this.NICKNAME = null;
    this.BUYER_EMAIL = null;
    this.AUTH_COMPANY_ID = null;
    this.HAVE_ORDER = null;
    this.BUYER_TYPE = null;
    this.BUYER_LEVEL = null;
    this.TYPE_NAME = null;

    //Initial assignment for properties
    this.init = function()
    {
        var infostr = $.cookies.get(this.onlineStatusPlantTextName);
        var infos = new Array();
        if (typeof (infostr) == "string") {
            infos = infostr.split('|');
            this.BUYER_ID = infos[0];
            this.NICKNAME = infos[1];
            this.BUYER_EMAIL = infos[2];
            this.AUTH_COMPANY_ID = infos[3];
            this.HAVE_ORDER = infos[4];
            this.BUYER_TYPE = infos[5];
            this.BUYER_LEVEL = infos[6];
            if (typeof this.buyerTypeDict[this.BUYER_TYPE] == 'undefined') {
                this.TYPE_NAME = tx[95];
            } else {
                this.TYPE_NAME = this.buyerTypeDict[this.BUYER_TYPE];
            }
        } else {
            this.BUYER_ID = this.NICKNAME = this.BUYER_EMAIL = this.AUTH_COMPANY_ID = this.HAVE_ORDER = this.BUYER_TYPE = this.BUYER_LEVEL = this.TYPE_NAME = null;
        }
    };

    //Check online status
    this.getIsGuest = function(forcInit)
    {
        if (forcInit) {
            this.init();
        }
        if (this.BUYER_ID && $.cookies.get(this.onlineStatusCiphertextName) && $.cookies.get(this.onlineStatusExpireName)) {
            return false;
        }
        return true;
    };

    //Postpone automatic logout time
    this.updateOnlineStatus = function()
    {
        var cookieUt = $.cookies.get(this.onlineStatusExpireName);
        if (!cookieUt) {
            return false;
        }
        var infos = cookieUt.split('|');
        var expire = parseInt(infos[0]);
        if (!expire || typeof infos[1] == 'undefined') {
            return false;
        }
        var clientCurrTime = parseInt((new Date).valueOf() / 1000);
        var serverCurrTime = clientCurrTime + parseInt(infos[1]);
        if (serverCurrTime < expire && (serverCurrTime + this.buyerCookieUtWarnTime) > expire) {
            cookieConfig(this.onlineStatusExpireName, (expire + this.buyerCookieUtDelayTime) + '|' + infos[1]);
        }
        return true;
    }

    //Display the current logged in the head
    this.makeLoginStr = function()
    {
        var to_url = location.href;
        to_url = to_url.replace('promotion_from', 'p');
        to_url = $_GET('tourl') ? $_GET('tourl') : encodeURIComponent(to_url);
        if (this.NICKNAME != null && this.NICKNAME.match(/^1[3|4|5|7|8][0-9]\d{8}$/))//ktc
            this.NICKNAME = this.NICKNAME.substring(0, 3) + "*****" + this.NICKNAME.substring(8, 11);//ktc
        else if(this.NICKNAME != null)
            this.NICKNAME = this.NICKNAME.substring(0, 10);
        //offline
        if (this.getIsGuest(false)) {
            //u exists
            if ($.cookies.get('buyersource') !== null) {
                $('#loginstr').html('<span class="top_tit">' + tx[64] + '！</span>  <a href="' + web_user_domain + 'login.html?tourl=' + to_url + '" class="a_href">' + tx[65] + '</a>  <a onclick="_pzt.events.push({ type: \'target\', category: \'' + tx[78] + '_' + tx[82] + '\', action: \'' + tx[79] + '_' + tx[82] + '\', opt_label: \'' + tx[80] + '_' + tx[82] + '\', value: 1 });" href="' + web_domain + 'sale/13/promotion/index.html?is_reg=1&tourl=' + to_url + '" class="a_href">' + tx[72] + '</a>');

            } else {
                $("#loginstr").html('<li><span class="top_tit">' + tx[64] + '！</span>|</li>  <li><a href="' + web_user_domain + 'login.html?tourl=' + to_url + '" class="a_href">' + tx[65] + '</a>|</li> <li><a onclick="_pzt.events.push({ type: \'target\', category: \'' + tx[78] + '_' + tx[82] + '\', action: \'' + tx[79] + '_' + tx[82] + '\', opt_label: \'' + tx[80] + '_' + tx[82] + '\', value: 1 });" href="' + web_user_domain + 'reg.html?is_reg=1&tourl=' + to_url + '" class="a_href">' + tx[72] + '</a>|</li>');
            }
            //沱沱账号链接
//            $("#myAccountDown a").each(function(){
//                var accountDownUrl = $(this).attr("href");
//                accountDownUrl = accountDownUrl != '' ?  web_user_domain + "login.html?tourl=" + encodeURIComponent(accountDownUrl) : web_user_domain + "login.html";
//                $(this).attr("href",accountDownUrl);
//            });

        } else {
//            $("#myAccountDown a").each(function(){
//                var accountDownUrl = $(this).attr("href");
//                if(accountDownUrl.indexOf('tourl') > 0){
//                    accountDownUrl = decodeURIComponent(accountDownUrl);
//                    accountDownUrl = accountDownUrl.match(/tourl=(.*)/);
//                    if(accountDownUrl !== null)
//                        $(this).attr("href",accountDownUrl[1]);
//                }
//            });
            $("#loginstr").html('<span class="top_tit">' + tx[47] + ',' + '<a href="'+ web_user_domain + 'index.php?r=tBuyer/center" style="color:#999">'+ this.NICKNAME + '</a>' + '&nbsp;&nbsp;&nbsp;[<a href="' + web_user_domain + 'index.php?r=tBuyer/logout" style="color:#999">' + tx[49] + '</a>]</span>');
        }
    };

    //Pop-up simple login layer
    this.popUpSimpleLoginLayer = function(str,callback)
    {
        if (this.getIsGuest()) {
            if ($('#easysss').length <= 0) {
                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: web_user_domain + "index.php?r=tBuyer/quickLog&callback=?",
                    timeout: 10000,
                    success: function(data) {
                        $("body").append('<div id="easysss" style="width:100%;height:100%; position:absolute;left:0;top:0;z-index:2147483647">' + '</div>');
                        $("#easysss").html(data);
                       // var top=$(window).height() / 2 + $(window).scrollTop() - ($("#easysss").height() / 2);
                       //  if( top <10 ) top=20;
                                               
                        $("#needstrs").append('<div style="display:none" id="needstr">' + str + '</div>');
                        var top=0;                        
                         $("#needstrs").css('margin-top','0px');
                         $("#needstrs").css('padding-top','0px');
                         if( $(window).height() - $("#needstrs").height() >20 )
                         {
                             top= (  $(window).height() - $("#needstrs").height() )/2 -20;                                 
                             $("#needstrs").css('position',"fixed");
                         }   
                         else
                         {
                             top=( $(window).height() / 2 ) + $(window).scrollTop() - ($("#easysss").height() / 2);
                            if( top <20 ) top=20;
                            $("#needstrs").css('position', "inherit");
                            
                         }
                         $("#needstrs").css('top',top+'px');
                        $('#function_name').val(callback);
                        //window.scrollTo(0, 0);
                    }
                });
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            eval(str);
        }
    };

    //Customize the page header navigation for different users
    this.customizePageNav = function()
    {
        var thisUrl = window.location.href;
        if (this.BUYER_TYPE == '11') {
            if($("li[class='ExclusiveMembers']").length < 1)
                $("#ExclusiveMember").after('<li class="ExclusiveMembers"><a href="' + web_domain + 'index.php?r=tGoods/htzx">' + tx[87] + '</a></li>');
        }
//        else{
//            $("#ExclusiveMember").after( '<div><img src="'+web_img_path+'index_2012/search_918_tit10.jpg"/></div><div class="ExclusiveMembers"><a href="'+web_domain+'sale/weibo_talk.html">'+tx[88]+'</a></div>');
//        }
        if (thisUrl.indexOf('/index.php?r=tGoods/htzx') > 0) {
            $('.curr_channelnav').removeClass("curr_channelnav");
            $('.ExclusiveMembers').addClass("curr_channelnav");
        }
    }

    //Run after the page has loaded
    this.load = function()
    {
        this.updateOnlineStatus();
        this.init();
        this.makeLoginStr();
        this.customizePageNav();
    }

    this.loginOut = function(){
        //清除cookie
        $.cookies.del(this.onlineStatusCiphertextName,{domain:'tootoo.cn'});
        $.cookies.del(this.onlineStatusExpireName,{domain:'tootoo.cn'});
        //清除登录条
        this.load();
    }
}

/*
 *  CLASS Buyer_En
 */
Buyer_En = function() {
};
Buyer_En.prototype = new Buyer();
Buyer_En.prototype.makeLoginStr = function()
{
    var to_url = location.href;
    to_url = to_url.replace('promotion_from', 'p');
    to_url = $_GET('tourl') ? $_GET('tourl') : escape(to_url);
    if (this.getIsGuest(false))
    {
        $('#login').html('<a href="' + web_user_domain + 'en/login.html?tourl=' + to_url + '">Login</a>');
        $('#signup').html('<a href="' + web_user_domain + 'en/reg.html?tourl=' + to_url + '">Sign up</a>');
    }
    else
    {
        var showNickname = this.NICKNAME.length > 10 ? this.NICKNAME.substr(0, 10) + '...' : this.NICKNAME;
        $('#login').html('<a href="' + web_user_domain + 'index.php?r=tBuyer/center">' + showNickname + '</a>');
        $('#signup').html('<a href="' + web_user_domain + 'index.php?r=tBuyer/logout">Log off</a>');
    }
};
Buyer_En.prototype.load = function()
{
    this.updateOnlineStatus();
    this.init();
    this.makeLoginStr();
};

/*
 *  CLASS TTCart
 *  Usecase:
 *      window.ttCart = new TTCart;
 *      ttCart.init();
 *  by Qiujiashu@ninetowns.com
 *  on 2013|01|09
 */
TTCart = function()
{
    //we must use the specified instance name to ensure correct call while rendering onclick event handler
    this.instanceName = '$car';
    //cookie name
    this.cartCookieName = 'shoppingcart';
    //兑换券cookie
    this.voucherCartCookieName = 'vouchercart';
    //cookie domian
    this.cartCookieDomain = '.tootoo.cn';
    //cart cookie format related
    this.delimiter = "#";
    this.separator = "x";
    this.giftPrefix = ":";
    this.nyPrefix = "-";
    this.cartPattern = /^((\d{7}|(\d{7}\-)*\d{7}\-\d{7})x\d{1,999}x.*x[^x]#)*((\d{7}|(\d{7}\-)*\d{7}\-\d{7})x\d{1,999}x.*x[^x])$/;
    //ajax list url
    this.listUrl = web_domain + "index.php?r=tCart/list";
    this.checkScdUrl = web_domain + "index.php?r=tActive/canYouBuy";
    //goods data cache pool
    this.goodsPool = [];
    //store ajaxed detail cart info in JS memory, so that it can offline rendering the panel under most cart operations
    this.data = {};
    //mark the record which is last modified, for Highlighting when rendering the panel
    this.lastChangeGoods = {};
    //this lock is used to ensure that only once ajax request is in progress
    this.lock = false;
    //promoteType configuration
    this.promoteTypeLength = 1; //format
    this.saleTypeNone = '0';
    this.saleTypeDiscount = '1';
    this.saleTypeGoodsAmountGift = '5';
    this.saleTypeGoodsNumGift = '6';
    this.saleTypeChangeBuy = '2';
    this.saleTypePack = '3';
    this.saleTypeNy = '8';
    this.saleTypeSecond = '4';
    this.saleTypeMn = 'd';
    this.saleTyVoucher = 'v';
    this.secondPrice = 1.00;//rmb

    this.isFold = true;//是否折叠
    this.foldLength = 2;//折叠时显示的个数

	this.afterFly = null;

    //
    //initialization
    this.init = function()
    {
        if (this.getInstanceName() !== this.instanceName)
            alert('Instance Name Of Class TTCart Must be ' + this.instanceName);
        this.initCartPanel();
    }

    this.specialRules = function(skuId)
    {
        if (typeof cartSpecialRules !== 'undefined') {
            for (x in cartSpecialRules) {
                if ($.inArray(skuId, cartSpecialRules[x].goods) !== -1 && timeRange(cartSpecialRules[x].startDate, cartSpecialRules[x].endDate)) {
                    myAlert(cartSpecialRules[x].msg);
                    return false;
                }
            }
        }
        return true;
    }

    //add items to the shopping cart
    this.addGoods = function(skuId, amount, promoteType, minBuyNum, maxBuyNum, callback, myBuyFrom, stationId)
    {
        var url = web_domain+'index.php?r=tSeckill/validate';
        // 秒抢活动验证
        var cartObjSelf =this;
        $.ajax({
            type: "GET",
            url: url,
            data: 'skuId=' + skuId,
            timeout: 5000,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function(result) {
                if (result.code==200) {
                    cartObjSelf.doAddGoods(skuId, amount, promoteType, minBuyNum, maxBuyNum, callback, myBuyFrom, stationId);
                } else if (result.code==201) {
					if (amount!=1) {
						myAlert('您好，该商品可购买的数量区间为[1-1]的整数');
					} else {
						cartObjSelf.afterFly = function(){
							myAlert(result.msg);
						};
						cartObjSelf.doAddGoods(skuId, amount, promoteType, minBuyNum, maxBuyNum, callback, myBuyFrom, stationId);
					}
				} else if (result.code=500) {
					myAlert(result.msg);
				}
            },
            error: function() {
			}
        });
    }

    //兑换商品
    this.addVoucherGoods = function(skuId, amount, minBuyNum, maxBuyNum, callback, myBuyFrom, stationId, voucherCode, validityPeriod, voucherAmount, voucherTitle){
      //var promoteType = 'v';//兑换商品特有兑换类型
      this.doAddVoucher(voucherCode, validityPeriod, voucherAmount, voucherTitle);
      this.delVoucherGoods4Cart();
      this.doAddGoods(skuId, amount, this.saleTyVoucher, minBuyNum, maxBuyNum, callback, myBuyFrom, stationId);
    }

    this.delVoucherGoods4Cart = function(){
      var cartStr = this.getCartSkuIdFromCookieToStr();
      if(cartStr){
        cartStr = cartStr.substr(0, cartStr.length - 1);
        var cartArr = cartStr.split('#');
        for(var i in cartArr){
          this.delGoods4CartPage(cartArr[i], this.saleTyVoucher);
        }
      }
    }

    //添加兑换券cookie
    this.doAddVoucher = function(voucherCode, validityPeriod, voucherAmount, voucherTitle){
      if(voucherCode && validityPeriod){
        var voucherCookieCart = voucherCode + '_' + validityPeriod + '_' + voucherAmount + '_' + decodeURI(voucherTitle) + '_' + buyerInfo.BUYER_ID;
        $.cookies.set(this.voucherCartCookieName, voucherCookieCart, {path: '/', hoursToLive: 720, domain: this.cartCookieDomain});
      }
    }

    this.doAddGoods = function(skuId, amount, promoteType, minBuyNum, maxBuyNum, callback, myBuyFrom, stationId)
    {
        if (typeof stationId == 'undefined') {
            console.log('stationId is undefined!');
            stationId = 1;
        }

        if (!this.beforeAddGoods())
            return false;
        if (!this.specialRules(skuId))
            return false;
        var cartArr = this.getCartArrFromCookie();
        //console.log(cartArr);
//function print_array(arr){
//	for(var key in arr){
//		if(typeof(arr[key])=='array'||typeof(arr[key])=='object'){//递归调用
//			print_array(arr[key]);
//		}else{
//			document.write(key + ' = ' + arr[key] + '<br>');
//		}
//	}
//}
//
//        print_array(cartArr);
        var index = this.getIndex(skuId, promoteType, cartArr);
        //console.log(index !== false);
        //console.log(index);
        if (index !== false) {
            if (!this.modifyGoods(skuId, cartArr[index].amount + Number(amount), promoteType, minBuyNum, maxBuyNum))
                return false;
        } else {
            //console.log(index !== false);
            if (!this.checkAmount(amount, minBuyNum, maxBuyNum))
                return false;
            //console.log(promoteType + '_' + this.saleTypeSecond);
            if (promoteType == this.saleTypeSecond)
            {
                if (amount != 1) {
                    var topDis = $("html,body").scrollTop();
                    myAlert(tx[103]);
                    $("html,body").scrollTop(topDis);
                    return false;
                }
                var isGuest = buyerInfo.getIsGuest(true);
                if (isGuest)
                {
                    header(web_user_domain + 'login.html?tourl=' + encodeURIComponent(window.location.href));
                    return false;
                }
                this.addSecondGoods(skuId, promoteType, amount, myBuyFrom, callback);
                return true;
            }
            //console.log('AAAA');
            var record = this.addToCookieCart(skuId, promoteType, amount, myBuyFrom, stationId);
            if (!record)
                return false;
            this.lastChangeGoods = record;
            if (this.getIsMainCartOpen()) {
                this.refreshCartPanel();
            }
        }
        this.afterAddGoods();
        if (typeof callback != 'undefined')
            callback();
        return true;
    }

    this.addSecondGoods = function(skuId, promoteType, amount, myBuyFrom, callback)
    {
        var url = this.checkScdUrl;
        var obj = this;
        $.ajax({
            type: "GET",
            url: url,
            data: 'skuId=' + skuId,
            timeout: 5000,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function(result) {
//                eval('var data='+result);
                var data = eval(result);
                if (typeof data.err_code != 'undefined') {
                    if (data.err_code == 1401) {
                        header(web_user_domain + 'login.html?tourl=' + encodeURIComponent(window.location.href));
                        return false;
                    } else {
                        var topDis = $("html,body").scrollTop();
                        myAlert(data.err_msg);
                        $("html,body").scrollTop(topDis);
                        return false;
                    }
                }
                var record = obj.addToCookieCart(skuId, promoteType, amount, myBuyFrom);
                if (!record)
                    return false;
                obj.lastChangeGoods = record;
                if (obj.getIsMainCartOpen()) {
                    obj.refreshCartPanel();
                }
                obj.afterAddGoods();
                if (typeof callback != 'undefined')
                    callback();
                return true;
            },
            error: function() {
                var topDis = $("html,body").scrollTop();
                myAlert(tx[92].substr(0, 4));
                $("html,body").scrollTop(topDis);
                return false;
            }
        });
    }

    this.beforeAddGoods = function()
    {
        return true;
    }

    this.afterAddGoods = function()
    {
    }

    this.addToCookieCart = function(skuId, promoteType, amount, myBuyFrom, stationId)
    {
        var cartArr = this.getCartArrFromCookie();
        //console.log(cartArr);
        var currRecord = this.createNewRecord(skuId, promoteType, amount, myBuyFrom, stationId);
        cartArr.unshift(currRecord);
        var newCookieCart = this.arr2Str(cartArr);
        //console.log(newCookieCart);
        //console.log('BBBB');
        //console.log(typeof newCookieCart != 'string');
        if (typeof newCookieCart != 'string') {
            return false;
        } else {
            $.cookies.set(this.cartCookieName, newCookieCart, {path: '/', hoursToLive: 720, domain: this.cartCookieDomain});
            return currRecord;
        }
    }

    this.createNewRecord = function(skuId, promoteType, amount, myBuyFrom, stationId)
    {
        var currRecord = new Array();
        currRecord.skuId = (promoteType == this.saleTypeNy) ? parseIntArray(skuId.split('-')) : parseInt(skuId);
        currRecord.amount = Number(amount);
        currRecord.buyFrom = this.analyzeSource(myBuyFrom);
        currRecord.promoteType = promoteType.toString();
        currRecord.checked = '1';
        currRecord.stationId = stationId;
        return currRecord;
    }

    this.analyzeSource = function(myBuyFrom)
    {
        var buyFrom = '0';
        if (typeof myBuyFrom == 'undefined' || !myBuyFrom) {
            var url = window.location.href;
            var file = url.substring(url.lastIndexOf("/") + 1);
            if (file + '' != '') {
                var regs = [
                    {reg: /category\-(\d+)\.html/, tag: 'c'},
                    {reg: /product\-(\d+)\.html/, tag: 'p'},
                    {reg: /actlist-pack(.)html/, tag: 'ap'},
                    {reg: /actlist\-goods(\.)html/, tag: 'ag'},
                    {reg: /browernode(\.)php/, tag: 'b'}
                ];
                for (x in regs) {
                    var isHit = regs[x]['reg'].exec(file);
                    if (isHit) {
                        buyFrom = regs[x]['tag'] + '|' + isHit[1];
                        break;
                    }
                }
            }
        } else {
            var PagePosArr = new Array(
                    'h01', 'h02',
                    'h11', 'h12', 'h13', 'h14',
                    'h21', 'h22', 'h23', 'h24',
                    'h31', 'h32', 'h33', 'h34',
                    'h41', 'h42', 'h43', 'h44',
                    'h51', 'h52', 'h53', 'h54',
                    'h61', 'h62', 'h63', 'h64',
                    'hbzx', 'orderdetail', 'order_list',
                    'bfd_checkout'
                    );
            if ($.inArray(myBuyFrom, PagePosArr) != -1)
                buyFrom = myBuyFrom;
        }
        return buyFrom;
    }

    //remove item from shopping cart
    this.delGoods = function(skuId, promoteType)
    {
        if (!this.deleteFromCookieCart(skuId, promoteType))
            return false;
        this.refreshCartPanel();
        return true;
    }

    this.delGoods4CartPage = function(skuId, promoteType)
    {
        if (!this.deleteFromCookieCart(skuId, promoteType))
            return false;
        return true;
    }

    this.deleteFromCookieCart = function(skuId, promoteType)
    {
        var cartArr = this.getCartArrFromCookie();
        var index = this.getIndex(skuId, promoteType, cartArr);
        if (index === false) {
            myAlert(tx[38]);
            this.getCartDetail();
            return false;
        }
        cartArr.splice(index, 1);
        var newCookieCart = this.arr2Str(cartArr);
        if (typeof newCookieCart != 'string') {
            return false;
        } else {
            $.cookies.set(this.cartCookieName, newCookieCart, {path: '/', hoursToLive: 720, domain: this.cartCookieDomain});
            return true;
        }
    }

    //modify item amount in shopping cart
    this.modifyGoods = function(skuId, amount, promoteType, minBuyNum, maxBuyNum)
    {
        //console.log('skuId:'+skuId+'_amount:'+amount+'_promoteType:'+promoteType+'_minBuyNum:'+minBuyNum+"_maxBuyNum:"+maxBuyNum);
        if (!this.checkAmount(amount, minBuyNum, maxBuyNum))
            return false;
        if (promoteType == this.saleTypeChangeBuy) {
            myAlert(tx[90]);
            return false;
        }
        if (promoteType == this.saleTypeSecond) {
            var topDis = $("html,body").scrollTop();
            myAlert(tx[103]);
            $("html,body").scrollTop(topDis);
            return false;
        }
        var record = this.modifyCookieCart(skuId, amount, promoteType);
        if (!record)
            return -9;
        this.lastChangeGoods = record;
        if (this.getIsMainCartOpen())
            this.refreshCartPanel();
        return true;
    }
    this.getAmountBySkuAndSale = function(skuId, promoteType) {
        var cartArr = this.getCartArrFromCookie();
        var index = this.getIndex(skuId, promoteType, cartArr);
        if (index === false)
            return 0;
        return cartArr[index].amount;
    }

    this.getGoodsAmountInCart = function(skuId, promoteType) {
        var cartArr = this.getCartArrFromCookie();
        var index = this.getIndex(skuId, promoteType, cartArr);
        if (index === false) {
            return false;
        }
        return cartArr[index].amount;
    }

    this.modifyCookieCart = function(skuId, amount, promoteType)
    {
        var cartArr = this.getCartArrFromCookie();
        var index = this.getIndex(skuId, promoteType, cartArr);
        if (index === false) {
            if (this.getIsMainCartOpen())
                this.refreshCartPanel();
            myAlert(tx[38]);
            return false;
        }

        cartArr[index].amount = Number(amount);
        var newCookieCart = this.arr2Str(cartArr);
        if (typeof newCookieCart != 'string') {
            return false;
        } else {
            $.cookies.set(this.cartCookieName, newCookieCart, {path: '/', hoursToLive: 720, domain: this.cartCookieDomain});
            return cartArr[index];
        }
    }

    this.refurCartNum = function(cartNum)
    {
//        if (cartNum == 0) {
//            $("#cart_num").hide();
//            $("#showcarts").removeClass('online_service_icon3');
//        }
//        else {
//            $("#showcarts").addClass('online_service_icon3');
            $("#cart_num").html(cartNum);
//            $("#cart_num").show();
//        }

    }

    this.createNewData = function()
    {
        var posArr = new Array();
        var newData = {"subStatinonGoods": posArr, "USER_SUBSTATION": this.data.USER_SUBSTATION};
        var cookieArr = this.getCartArrFromCookie();
        for (x in cookieArr) {
            var s = isNaN(cookieArr[x].skuId) ? cookieArr[x].skuId.join('-') : cookieArr[x].skuId;
            var dataIndex = this.getDataIndexFromGoodsList(s, cookieArr[x].promoteType, this.goodsPool);
            var stationId = this.goodsPool[dataIndex].SUBSTATION_ID;
            var stationName = this.goodsPool[dataIndex].SUBSTATION_NAME;
            var alreadyHas = 0;
            for (y in newData.subStatinonGoods) {
                if (typeof newData.subStatinonGoods[y].subStationID != 'undefined' && newData.subStatinonGoods[y].subStationID == stationId) {
                    alreadyHas = 1;
                    newData.subStatinonGoods[y].goodsInfoList.push(this.updateGoodsInPool(dataIndex, cookieArr[x].amount));
                    break;
                }
            }
            if (alreadyHas == 0) {
                var gList = new Array();
                gList.push(this.updateGoodsInPool(dataIndex, cookieArr[x].amount));
                newData.subStatinonGoods.push({"subStationID": stationId, "subStationName": stationName, "goodsInfoList": gList});
            }
        }

        for (z in newData.subStatinonGoods) {
            newData.subStatinonGoods[z].goodsCallFee = parseFloat(this.getSumByGoodsList(newData.subStatinonGoods[z].goodsInfoList)).toFixed(2);
            newData.subStatinonGoods[z].totalNum = this.getTotalNumByGoodsList(newData.subStatinonGoods[z].goodsInfoList);
        }

        return newData;
    }

    this.refreshCartPanel = function()
    {
        this.showLoading();
        if (this.getMissingGoods().length > 0) {
            this.getCartDetail();
        } else {
            this.data = this.createNewData();
            this.refurCartPanel();
        }
    }

    this.getTotalNumByGoodsList = function(goodsList)
    {
        var totalNum = 0;
        for (s in goodsList) {
            if (goodsList[s].PROMOTION_TYPE == this.saleTypeNy) {
                var skuArr = goodsList[s].SKU_ID.split('-');
                totalNum += goodsList[s].AMOUNT * skuArr.length;
            } else {
                totalNum += goodsList[s].AMOUNT;
            }
        }
        return totalNum;
    }

    this.getSumByGoodsList = function(goodsList)
    {
        var sum = 0;
        for (t in goodsList) {
            if (goodsList[t].PROMOTION_TYPE == this.saleTypeMn)
            {
                sum += this.getSumByGoodAndSaleMn(goodsList[t]);
            } else
                sum += this.getSumByGoodNomal(goodsList[t]);
        }
        return sum;
    }
    this.getSumByGoodAndSaleMn = function(good)
    {
        var discount_amount;
        var base_amount;
        if (!isNaN(good.CHANGE_START) && !isNaN(good.CHANGE_GOODS_PRICE) && good.AMOUNT >= good.CHANGE_START) {
            discount_amount = Math.floor(good.AMOUNT / good.CHANGE_START);
            base_amount = good.AMOUNT - discount_amount;
            return this.getSumByAmountAndPrice(good.GOODS_PRICE, base_amount) + this.getSumByAmountAndPrice(good.CHANGE_GOODS_PRICE, discount_amount);
        }
        return this.getSumByGoodNomal(good);
    }
    this.getSumByGoodNomal = function(good)
    {
        return this.getSumByAmountAndPrice(good.GOODS_PRICE, good.AMOUNT);
    }
    this.getSumByAmountAndPrice = function(price, amount)
    {
        return (amount * price * 100) / 100;
    }
    this.getMissingGoods = function()
    {
        var cookieArr = this.getCartArrFromCookie();
        var missingGoods = [];
        var obj = this;
        (function() {
            for (x in cookieArr) {
                var s = isNaN(cookieArr[x].skuId) ? cookieArr[x].skuId.join('-') : cookieArr[x].skuId;
                var dataIndex = obj.getDataIndexFromGoodsList(s, cookieArr[x].promoteType, obj.goodsPool);
                if (dataIndex === false) {
                    missingGoods.push(cookieArr[x]);
                }
            }
        })();
        return missingGoods;
    }

    this.updateGoodsInPool = function(dataIndex, amount)
    {
        this.goodsPool[dataIndex].AMOUNT = parseInt(amount);
        if (this.goodsPool[dataIndex].stairprice.length !== 0) {
            var currPrice = this.getLadderPrice(this.goodsPool[dataIndex].AMOUNT, this.goodsPool[dataIndex].stairprice);
            if (currPrice !== false) {
                this.goodsPool[dataIndex].PRICE_NAME = tx[84];
                this.goodsPool[dataIndex].GOODS_PRICE = parseFloat(currPrice[0]);
            } else {
                this.goodsPool[dataIndex].PRICE_NAME = this.goodsPool[dataIndex].PRICE_NAME_NOSTAIR;
                this.goodsPool[dataIndex].GOODS_PRICE = parseFloat(this.goodsPool[dataIndex].GOODS_PRICE_NOSTAIR);
            }
        }
        return this.goodsPool[dataIndex];
    }

    this.getInstanceName = function()
    {
        for (var a in window) {
            if (window[a] == this) {
                return a.toString();
            }
        }
        return false;
    }

    this.initCartPanel = function()
    {
        this.initMainCartPanel();
        this.initTopCartPanel();
    }

    this.refurCartPanel = function()
    {
        this.refurMainCartPanel();
        this.refurTopCartPanel();
    }

    this.cleanCartPanel = function()
    {
        this.cleanMainCartPanel();
        this.cleanTopCartPanel();
    }

    this.addToGoodsPool = function(goodsList)
    {
        for (x in goodsList)
        {
            if (this.getDataIndex(goodsList[x].SKU_ID, goodsList[x].PROMOTION_TYPE) === false) {
                //console.log(goodsList[x].PROMOTION_TYPE);
                if(goodsList[x].PROMOTION_TYPE != 'v'){//为了排除掉换购商品
                    this.goodsPool.push(goodsList[x]);
                    //console.log(goodsList[x]);
                }
                
            }
        }
    }

    this.showLoading = function()
    {
        $("#station_title").hide();
        $("#open_cart_prolist").show();
        $("#station_title_2").hide();
        $("#open_cart_prolist_2").hide();

        var loadingDom = $('<div class="tt_loading"><img src="' + web_img_path + 'index2012/tt_loading.gif"></div>');
        $('#open_cart_prolist').empty().append(loadingDom);
    }

    this.showBusy = function()
    {
        var busyDom = $('<div class="failed_to_load">' + tx[92] + '<a href="javascript:void(0);" onclick="' + this.instanceName + '.getCartDetail();">' + tx[93] + '</a>' + tx[94] + '</div>');
        $('#open_cart_prolist').empty().append(busyDom);
    }

    this.getCartDetail = function()
    {
        if (this.lock === true) {
            return;
        }
        var obj = this;
        obj.lock = true;
        $.ajax({
            type: "GET",
            url: obj.listUrl,
            timeout: 15000,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function(result) {
                obj.lock = false;
                obj.data = result;

                obj.data.totalNum = 0;
                for (x in obj.data.subStatinonGoods) {
                    obj.data.totalNum += obj.data.subStatinonGoods[x].totalNum;
                    obj.addToGoodsPool(obj.data.subStatinonGoods[x].goodsInfoList);
                }
                obj.refurCartPanel();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                obj.lock = false;
                obj.showBusy();
            }
        });
    }

    this.appendMainCartDom = function()
    {

    }

    this.refurCartNumByCookie = function()
    {
        var cartArr = this.getCartArrFromCookie();
        var num = 0;
        (function() {
            for (x in cartArr) {
                if(cartArr[x].promoteType != 'v'){
                    num += cartArr[x].amount;
                }
            }
        })();
        this.refurCartNum(num);
    }
    this.getCartGoodsNum = function() {
        var cartArr = this.getCartArrFromCookie();
        var num = 0;
        (function() {
            for (x in cartArr) {
                num += cartArr[x].amount;
            }
        })();
        return num;
    }

    this.setMainCartHandlers = function()
    {
        var obj = this;
        //open the main cart panel
        $("#showcarts").click(function() {
            $("#cart_bord").show();
            var cartStr = $.cookies.get($car.cartCookieName);
            if (Boolean(cartStr)) {
                obj.refreshCartPanel();
            } else {
                obj.cleanCartPanel();
            }
        });
        //close the main cart panel
        $("#close_button").click(function() {
            $("#cart_bord").hide();
        });
        //register event handler for modify and delete operation
        this.checkoutChange();
        //to checkout
        $('#open_cart_check').bind('click', {
            obj: $car
        }, function(e){ 
            window._vaq= window._vaq || [];
            _vaq.push(['trackEvent', "right_checkOut_button", "click", "allPage", 0]);            
            $car.check(e);  
           
           } );
    }

    this.initMainCartPanel = function()
    {
        this.appendMainCartDom();
        this.refurCartNumByCookie();
        this.setMainCartHandlers();
    }

    this.initTopCartPanel = function()
    {
        this.setTopCartHandlers();
    }

    this.setTopCartHandlers = function()
    {
        $('#cart_checkout').bind('click', {
            obj: $car
        }, $car.check);
    }

    this.check = function(event) {
        _gaq.push(['_trackPageview', '/c_cart.html']);
        if (event.data.obj.isCartNotEmpty()) {
            window.location = event.data.obj.getCartPageUrl();
        } else {
            myAlert(tx[33]);
        }
        return false;
    }

    this.getCartPageUrl = function() {
        if (language == 'zh_cn')
            return web_pay_domain + 'cart-zh_cn.html';
        else
            return web_pay_domain + 'cart-en.html';
    }

    this.isCartNotEmpty = function()
    {
        var cartArr = this.getCartArrFromCookie();
        if (cartArr.length == 0) {
            return false;
        }
        return true;
    }

    this.refurTopCartPanel = function()
    {
    }

    this.refurMainCartPanel = function()
    {
        if (this.data.totalNum == 0) {
            this.cleanMainCartPanel();
            return;
        }

        $("#empty_sum").hide();//购物车为空时的统计信息一栏屏蔽
        this.refurCartNumByCookie();
        this.refurCartNum(this.data.totalNum); //totalNum的更新，恐怕对小篮子还是有意义的

        //因为只有2个分站，可简单实现，灵活的同时，复杂度也会增加，等第三个分站出现时，购物车皮肤恐怕早就改版N次了
        if (this.data.subStatinonGoods.length == 2) {
            if (this.data.USER_SUBSTATION == this.data.subStatinonGoods[0].subStationID)
                this.fillInPanel(0);
            else
                this.fillInPanel(1);
        }
        else if (this.data.subStatinonGoods.length == 1) {
            this.fillPartInPanel(0);
        }
        else {
            this.cleanMainCartPanel();
        }
        this.uninstallFoldEffective();
        this.installFoldEffective();
    }

    this.uninstallFoldEffective = function()
    {
        $(".minicart_swing_man").removeClass('minicart_swing_man');
        $("#minicart_unfold").remove();
        $("#minicart_fold").remove();
    }

    this.installFoldEffective = function()
    {
        if (this.data.subStatinonGoods.length > 1) {
            var userStationIndexInData = 0;
            if (this.data.USER_SUBSTATION == this.data.subStatinonGoods[1].subStationID) {
                userStationIndexInData = 1;
            }
            if (this.data.subStatinonGoods[userStationIndexInData].goodsInfoList.length > 2) {
                this.foldMiniCart();
                if (!this.isFold) {
                    this.unfoldMiniCart();
                }
            }
        }
    }

    this.unfoldMiniCart = function()
    {
        $("#minicart_unfold").trigger('click');
    }

    this.foldMiniCart = function()
    {
        var cartObj = this;
        $("#open_cart_prolist>ul>li").each(function(i) {
            //console.log(cartObj.foldLength * 2 - 1);
            if (i > (cartObj.foldLength * 2 - 1)) {
                $(this).addClass('minicart_swing_man').hide();
            }
            if (i == ($("#open_cart_prolist>ul>li").length - 1)) {
                var unfoldButtonDom = $('<p id="minicart_unfold" class="more_goods"><a href="###" ><img src="' + web_img_path + '/index2012/shoppcart5b.jpg"></a></p>');
                var foldButtonDom = $('<p id="minicart_fold" class="more_goods" style="display:none;"><a href="###" ><img src="' + web_img_path + '/index2012/shoppcart5b_h.jpg"></a></p>');
                $(this).after(unfoldButtonDom).after(foldButtonDom);
                $("#minicart_unfold").click(function() {
                    $(".minicart_swing_man").show();
                    $("#minicart_unfold").hide();
                    $("#minicart_fold").show();
                    cartObj.isFold = false;
                });
                $("#minicart_fold").click(function() {
                    $(".minicart_swing_man").hide();
                    $("#minicart_unfold").show();
                    $("#minicart_fold").hide();
                    cartObj.isFold = true;
                });
            }
        });
    }

    this.fillInPanel = function(index)
    {
        $("#mini_station_name").html(this.data.subStatinonGoods[index].subStationName);
        $("#mini_station_total_num").html(this.data.subStatinonGoods[index].totalNum);
        $("#mini_station_sum").html(this.data.subStatinonGoods[index].goodsCallFee);
        this.data.goodsList = this.data.subStatinonGoods[index].goodsInfoList;
        this.fillInGoodsList("#open_cart_prolist");//goodsList

        $("#mini_station_name2").html(this.data.subStatinonGoods[1 - index].subStationName);
        $("#mini_station_total_num2").html(this.data.subStatinonGoods[1 - index].totalNum);
        $("#mini_station_sum2").html(this.data.subStatinonGoods[1 - index].goodsCallFee);
        this.data.goodsList = this.data.subStatinonGoods[1 - index].goodsInfoList;
        this.fillInGoodsList("#open_cart_prolist_2");//goodsList

        $("#station_title").show();
        $("#open_cart_prolist").show();
        $("#station_title_2").show();
        $("#open_cart_prolist_2").show();
    }

    this.fillPartInPanel = function(index)
    {
        $("#mini_station_name").html(this.data.subStatinonGoods[index].subStationName);
        $("#mini_station_total_num").html(this.data.subStatinonGoods[index].totalNum);
        $("#mini_station_sum").html(this.data.subStatinonGoods[index].goodsCallFee);
        this.data.goodsList = this.data.subStatinonGoods[index].goodsInfoList;
        this.fillInGoodsList("#open_cart_prolist");//goodsList

        $("#station_title").show();
        $("#open_cart_prolist").show();
        $("#station_title_2").hide();
        $("#open_cart_prolist_2").hide();
    }

    this.fillInGoodsList = function(who)
    {

        var mainCartDom = $('<ul class="newshopp_goods_list"></ul');
        if (this.lastChangeGoods !== null) {
            var record1 = {"skuId": this.lastChangeGoods.skuId, "promoteType": this.lastChangeGoods.promoteType};
        }
        for (index in this.data.goodsList)
        {
            if(this.data.goodsList[index].PROMOTION_TYPE != 'v'){//这个是为了屏蔽兑换商品
            var mainCartItem = $('<li></li>');
            if (typeof record1 !== 'undefined') {
                var record2 = {"skuId": this.data.goodsList[index].SKU_ID, "promoteType": this.data.goodsList[index].PROMOTION_TYPE};
                if (this.getIsHit(record1, record2) === true) {
                    var mainCartItem = $('<li class="goods_list_new"></li>');
                }
            }
            //amount
            var mainItem1 = $('<div class="newshopp_goods_list1"></div>');
            mainItem1.append('<div class="newshopp_number_l"><input type="text" class="newshopp_number" value="' + this.data.goodsList[index].AMOUNT + '" skuId="' + this.data.goodsList[index].SKU_ID + '" promoteType="' + this.data.goodsList[index].PROMOTION_TYPE + '" lastAmount="' + this.data.goodsList[index].AMOUNT + '" minBuyNum="' + this.data.goodsList[index].MIN_BUY_NUM + '" maxBuyNum="' + this.data.goodsList[index].MAX_BUY_NUM + '"/></div>');
            mainItem1.append('<div class="newshopp_number_r">'
                    + '<p class="newshopp_number_rtop" ><a at="' + this.instanceName + '.addOne" href="javascript:void(0);"></a></p>'
                    + '<p class="newshopp_number_rbottom"><a at="' + this.instanceName + '.subOne" href="javascript:void(0);"></a></p>'
                    );
            //pic
            var mainItem2 = $('<div class="newshopp_goods_list2"></div>');
            if (this.data.goodsList[index].DETAIL_LINK != "") {
                mainItem2.append('<a href="' + this.data.goodsList[index].DETAIL_LINK + '"target="_blank"><img src="' + this.data.goodsList[index].PIC50 + '" onerror="this.src=\'' + web_img_path + 'notfound_50.gif\';"></a>');
            } else {
                mainItem2.append('<img src="' + this.data.goodsList[index].PIC50 + '" onerror="this.src=\'' + web_img_path + 'notfound_50.gif\';">');
            }
            //name
            var mainItem3 = $('<div class="newshopp_goods_list3"></div>');
            var nameStr = '';
            if (this.data.goodsList[index].IS_IN_PROMOTION === '1') {
                if (this.data.goodsList[index].DETAIL_LINK != "") {
                    nameStr = '<p class="newshopp_goods_list3name"><span>[ ' + tx[68] + ' ] </span><a target="_blank" href="' + this.data.goodsList[index].DETAIL_LINK + '">' + this.data.goodsList[index].GOODS_TITLE + '</a></p>';
                } else {
                    nameStr = '<p class="newshopp_goods_list3name"><span>[ ' + tx[68] + ' ] </span>' + this.data.goodsList[index].GOODS_TITLE + '</p>';
                }
            }
            else {
                if (this.data.goodsList[index].DETAIL_LINK != "") {
                    nameStr = '<p class="newshopp_goods_list3name"><a target="_blank" href="' + this.data.goodsList[index].DETAIL_LINK + '">' + this.data.goodsList[index].GOODS_TITLE + '</a></p>';
                } else {
                    nameStr = '<p class="newshopp_goods_list3name">' + this.data.goodsList[index].GOODS_TITLE + '</p>';
                }
            }
            mainItem3.append(nameStr);
            //gift
            if (this.data.goodsList[index].gift != null)
            {
                var giftStr = '<p class="newshopp_goods_list3name font_gray" ><span>[' + tx[69] + ']</span>' + this.data.goodsList[index].gift.GOODS_TITLE + '&nbsp;' + tx[63] + this.data.goodsList[index].gift.AMOUNT + '</p>';
                mainItem3.append(giftStr);
            }
            //price
            var priceDom = $('<div class="newshopp_goods_list3name"></div>');
            var ladderArea = $('<div class="shopping_ladder_price"></div>');
            //ladder price
            if (this.data.goodsList[index].stairprice.length != 0)
            {
                var ladderSwitchDom = $('<a href="javascript:void(0);" class="ladderswitch"><img src="' + web_img_path + 'index2012/shopping_ladder_price.png"></a>');
                ladderSwitchDom.hover(function() {
                    $(this).siblings(".ladder").show();
                }, function() {
                    $(this).siblings(".ladder").hide();
                });
                ladderArea.append(ladderSwitchDom);
                if(index>2 && index>=this.data.goodsList.length-2){
                    var ladderCont = $('<div class="shopping_ladder_price1a ladder" style="display:none;"></div>');
                }else{
                    var ladderCont = $('<div class="shopping_ladder_price1 ladder" style="display:none;"></div>');
                }
                var ladderContext = '<div class="shopping_ladder_price2"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="ladder_price_list"><tbody><tr><td><strong>' + tx[85] + '</strong></td><td width="35%"><strong>' + tx[84] + '</strong></td><td width="35%"><strong>' + tx[86] + '</strong></td></tr>';
                var ladderText = '';
                for (x in this.data.goodsList[index].stairprice) {
                    var ladderItem = '<tr>'
                            + '<td>' + this.data.goodsList[index].stairprice[x].START_NUM + '-' + this.data.goodsList[index].stairprice[x].END_NUM + '/' + this.data.goodsList[index].MARKETING_NAME + '</td>'
                            + '<td>' + tx[58] + parseFloat(this.data.goodsList[index].stairprice[x].GOODS_PRICE_SALES).toFixed(2) + tx[71] + '/' + this.data.goodsList[index].MARKETING_NAME + '</td>'
                            + '<td>' + tx[58] + (parseFloat(this.data.goodsList[index].BASE_PRICE) - parseFloat(this.data.goodsList[index].stairprice[x].GOODS_PRICE_SALES)).toFixed(2) + tx[71] + '/' + this.data.goodsList[index].MARKETING_NAME + '</td>'
                            + '</tr>';
                    ladderText = ladderItem + ladderText;
                }
                ladderContext += ladderText + '</tbody></table></div>';
                ladderCont.append(ladderContext);
                ladderArea.append(ladderCont);

            }
            priceDom.append('<div class="newshopp_left_price">' + this.data.goodsList[index].PRICE_NAME + tx[76] + '<span style="font-family:verdana;">' + tx[58] + '</span>' + parseFloat(this.data.goodsList[index].GOODS_PRICE).toFixed(2) + '&nbsp' + '/' + '&nbsp' + this.data.goodsList[index].MARKETING_NAME + '</div>');
            priceDom.append(ladderArea);
            mainItem3.append(priceDom);
            //delButton
            var mainItem4 = $('<div class="newshopp_goods_list4"></div>');
            var mainDelBtn = $('<a href="javascript:void(0);" title="' + tx[25] + '" at="' + this.instanceName + '.delOne" skuId="' + this.data.goodsList[index].SKU_ID + '" promoteType="' + this.data.goodsList[index].PROMOTION_TYPE + '"><img src="' + web_img_path + 'index2012/newshopp_img16.jpg"></a>');
            mainItem4.append(mainDelBtn);
            //composite
            mainCartItem.append(mainItem1).append(mainItem2).append(mainItem3).append(mainItem4);
            mainCartDom.append(mainCartItem);

            var seperator = $('<li class="newshopp_border"> </li>');

            mainCartDom.append(seperator);
        }
        }

        $(who).html(mainCartDom);
    }

    this.cleanMainCartPanel = function()
    {
        this.refurCartNum(0);
        $("#shopp_news_amount").html(0);
        $("#open_cart_allprice").html(0);
        $("#continueBuy").hide();
        $("#empty_sum").show();
        $("#station_title").hide();
        $("#station_title_2").hide();
        $("#open_cart_prolist_2").hide();
        $("#open_cart_prolist").html('<div id="open_cart_nopro" class="newshopp_goods_no"><img src="' + web_img_path + 'index2012/newshopp_img18.jpg"></div>');
    }

    this.cleanTopCartPanel = function()
    {
    }

    this.checkoutChange = function() {
        var cartObj = this;
        $("#open_cart_prolist, #open_cart_prolist_2").delegate("a", "click", function() {
            if ($(this).attr('at')) {
                var at = $(this).attr('at');
                eval(at + "(this);");
            }
        });
        $("#open_cart_prolist, #open_cart_prolist_2").delegate(".newshopp_goods_list1", "mouseleave", function() {
            var obj = $(this).find('input');
            var skuId = $(obj).attr('skuId');
            var promoteType = $(obj).attr('promoteType');
            var lastAmount = Number($(obj).attr('lastAmount'));
            var minBuyNum = Number($(obj).attr('minBuyNum'));
            var maxBuyNum = Number($(obj).attr('maxBuyNum'));
            if (minBuyNum==0) {
                minBuyNum = 1;
            }
            if (maxBuyNum==0) {
                maxBuyNum = 999;
            }
            var currAmount = Number($(obj).val());
            if (currAmount != lastAmount) {
                if (cartObj.modifyGoods(skuId, currAmount, promoteType, minBuyNum, maxBuyNum) === false) {
                    $(obj).val(lastAmount);
                }
            }
        });
    };

    this.addOne = function(obj) {
        var inputDom = $(obj).closest('.newshopp_goods_list1').find('input');
        var maxBuyNum = isNaN(Number($(obj).attr('maxBuyNum'))) ? 999 : Number($(obj).attr('maxBuyNum'));
        if (Number($(inputDom).val()) + 1 > maxBuyNum)
            return false;
        $(inputDom).val(Number($(inputDom).val()) + 1);
        return true;
    };

    this.subOne = function(obj) {
        var inputDom = $(obj).closest('.newshopp_goods_list1').find('input');
        var minBuyNum = isNaN(Number($(obj).attr('minBuyNum'))) ? 1 : Number($(obj).attr('minBuyNum'));
        if (Number($(inputDom).val()) - 1 < minBuyNum)
            return false;
        $(inputDom).val(Number($(inputDom).val()) - 1);
        return true;
    };

    this.delOne = function(obj) {
        var skuId = $(obj).attr('skuId');
        var promoteType = $(obj).attr('promoteType');
        this.delGoods(skuId, promoteType);
    }

    this.delOne4CartPage = function(obj) {
        var skuId = $(obj).attr('skuId');
        var promoteType = $(obj).attr('promoteType');
        this.delGoods4CartPage(skuId, promoteType);
    }

    this.checkOne = function(obj) {
        var skuId = $(obj).attr('skuId');
        var cartMethod = $(obj).attr('cartMethod');
        var isChecked = $(obj).attr('checked');
        var isDisabled = $(obj).attr('disabled');
        if (isDisabled) {
            return false;
        }
        this.checkGoods(skuId, cartMethod, isChecked);
    };

    this.checkGoods = function(skuId, promoteType, isChecked)
    {
        var cartArr = this.getCartArrFromCookie();
        var index = this.getIndex(skuId, promoteType, cartArr);
        if (index === false) {
            myAlert(tx[38]);
            return false;
        }
        if (isChecked) {
            cartArr[index].checked = '1';
        } else {
            cartArr[index].checked = '0';
        }
        var newCookieCart = this.arr2Str(cartArr);
        if (typeof newCookieCart != 'string') {
            return false;
        } else {
            $.cookies.set(this.cartCookieName, newCookieCart, {path: '/', hoursToLive: 720, domain: this.cartCookieDomain});
            return true;
        }
    }


    this.checkAmount = function(amount, minBuyNum, maxBuyNum)
    {
        var amountInt = parseInt(amount);
        var minBuyNumInt = isNaN(parseInt(minBuyNum)) ? 1 : parseInt(minBuyNum);
        var maxBuyNumInt = isNaN(parseInt(maxBuyNum)) ? 999 : parseInt(maxBuyNum);
        if (isNaN(amountInt) || !numberRange(amountInt, minBuyNumInt, maxBuyNumInt)) {
            myAlert(tx[61] + '[' + minBuyNumInt + '-' + maxBuyNumInt + ']' + tx['62']);
            return false;
        }
        return true;
    }

    this.getCartArrFromCookie = function()
    {
        var cartCookie = $.cookies.get(this.cartCookieName);
        var arr = this.str2Arr(cartCookie);
        return arr === false ? new Array() : arr;
    }
    /**
     * 获取当前购物车中的兑换商品列表
     */
    this.getCartSkuIdFromCookieToStr = function(){
      var cartArr = this.getCartArrFromCookie();
      if(cartArr){
        var skuIds = '';
        for(var i in cartArr){
          if(cartArr[i]['promoteType'] == this.saleTyVoucher){
            skuIds += cartArr[i]['skuId'] + '#';
          }
        }
        return skuIds;
      }
    }

    this.getIndex = function(skuId, promoteType, cartArr)
    {   
        var record1 = {"skuId": skuId, "promoteType": promoteType};
        for (x in cartArr)
        {
            var sid = cartArr[x].promoteType == this.saleTypeNy ? cartArr[x].skuId.join('-') : cartArr[x].skuId;
            var record2 = {"skuId": sid, "promoteType": cartArr[x].promoteType};
            if (this.getIsHit(record1, record2) === true) {
                return x;
            }
        }
        return false;
    }

    this.getDataIndex = function(skuId, promoteType)
    {
        if (this.data == null)
            return false;
        if (typeof this.data.goodsList == 'undefined' || this.data.goodsList == null)
            return false;
        return this.getDataIndexFromGoodsList(skuId, promoteType, this.data.goodsList);
    }

    this.getDataIndexFromGoodsList = function(skuId, promoteType, goodsList)
    {
        if (goodsList == null)
            return false;
        var record1 = {"skuId": skuId, "promoteType": promoteType};
        for (listIndex in goodsList) {
            var record2 = {"skuId": goodsList[listIndex].SKU_ID, "promoteType": goodsList[listIndex].PROMOTION_TYPE};
            if (this.getIsHit(record1, record2) === true)
                return listIndex;
        }
        return false;
    }

    this.getIsHit = function(record1, record2)
    {
        if (record1.skuId == record2.skuId) {
            if (record1.promoteType == record2.promoteType) {
                return true;
            }
            else if (this.getIsGeneralPrmt(record1.promoteType) && this.getIsGeneralPrmt(record2.promoteType)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    this.getIsGeneralPrmt = function(prmtType)
    {
        return (prmtType == this.saleTypeNone || prmtType == this.saleTypeDiscount
                || prmtType == this.saleTypeGoodsAmountGift || prmtType == this.saleTypeGoodsNumGift
                || prmtType == this.saleTypeMn
                );
    }

    this.getAmountChanged = function(skuId, amount, promoteType)
    {
        if (promoteType == this.saleTypeNy) {
            sid = skuId.split('-');
            return sid.length * parseInt(amount);
        } else {
            return parseInt(amount)
        }
    }

    this.getIsMainCartOpen = function()
    {
        return $("#cart_bord").is(":visible");
    }

    this.getLadderPrice = function(amount, stairPrice)
    {
        for (x in stairPrice)
        {
            if (amount >= stairPrice[x].START_NUM && amount <= stairPrice[x].END_NUM) {
                return [stairPrice[x].GOODS_PRICE_SALES, stairPrice[x].GOODS_PRICE];
            }
        }
        return false;
    }

    this.str2Arr = function(string)
    {
        var exp = new RegExp(this.cartPattern);
        if (!exp.test(string))
            return false;
        var arr = string.split(this.delimiter);
        var myArr = new Array();
        for (x in arr)
        {
            var record = arr[x].split(this.separator);
            var myRecord = new Array();
            myRecord["skuId"] = record[0];
            myRecord["amount"] = record[1];
            myRecord["buyFrom"] = record[2];
            myRecord["promoteType"] = record[3];
            if (myRecord["promoteType"] == "8") {
                myRecord["skuId"] = myRecord["skuId"].split(this.nyPrefix);
            }
            var isSkuIdArray = myRecord["skuId"] instanceof Array;
            if (isSkuIdArray)
            {
                for (y in myRecord["skuId"])
                    myRecord["skuId"][y] = parseInt(myRecord["skuId"][y]);
            } else {
                myRecord["skuId"] = parseInt(myRecord["skuId"]);
            }
            myRecord["amount"] = parseInt(myRecord["amount"]);
            if (typeof record[4] == 'undefined')
                myRecord["checked"] = '1';
            else
                myRecord["checked"] = record[4];
            if (typeof record[5] == 'undefined')
                myRecord["stationId"] = '1'; //todo 默认北京站
            else
                myRecord["stationId"] = record[5];
            myArr.push(myRecord);
        }
        return myArr;
    }

    this.arr2Str = function(array)
    {
        var str = "";
        for (x in array)
        {
            if (typeof array[x]['skuId'] == 'undefined' || !(typeof array[x]['skuId'] == 'number' || array[x]['skuId'] instanceof Array))
                return -1;
            if (typeof array[x]['amount'] == 'undefined' || typeof array[x]['amount'] != 'number')
                return -2;
            if (typeof array[x]['buyFrom'] == 'undefined' || typeof array[x]['buyFrom'] != 'string')
                return -3;
            if (typeof array[x]['promoteType'] == 'undefined' || typeof array[x]['promoteType'] != 'string' || array[x]['promoteType'].length != this.promoteTypeLength)
                return -4;
            if ((array[x]['promoteType'] == this.saleTypeNy && !array[x]['skuId'] instanceof Array) || (array[x]['promoteType'] != this.saleTypeNy && array[x]['skuId'] instanceof Array))
                return -5;
            if (array[x]['promoteType'] == this.saleTypeNy)
                array[x]['skuId'] = array[x]['skuId'].join(this.nyPrefix);
            var itemStr = "";
            for (y in array[x])
                itemStr += array[x][y] + this.separator;
            itemStr = itemStr.substr(0, itemStr.length - 1);
            str += itemStr + this.delimiter;
        }
        return str === "" ? str : str.substr(0, str.length - 1);
    }

    this.fly = function(obj, proPic) {
        var carObj = this;
        if (this.getIsMainCartOpen()) {
            carObj.refurCartNumByCookie();
            return false;
        }
        var ballDom = $('<img class="ball" src="' + proPic + '" onerror="this.src=\'' + web_img_path + 'notfound_50.gif\';" style="width:30px;height:30px;position:absolute;z-index:1000000;border:1px solid #841027;"/>')
        $("body").append(ballDom);
        ballDom.css({
            'top': $(obj).offset().top,
            'left': $(obj).offset().left
        });
        ballDom.animate({
            top: $(document).scrollTop() + $(window).height() - 310 - 36 - 200,
            left: $(window).scrollLeft() + $(window).width() - 35 - 10
        }, 1000, function() {
            $(this).animate({
                top: $(document).scrollTop() + $(window).height() - 310 - 36 - 100
            }, 1000, function() {
                $(this).remove();
                carObj.refurCartNumByCookie();
				if (carObj.afterFly!==null) {
					carObj.afterFly();
				}
            })
        });
        return true;
    }

    this.fly4Checkout = function(obj, proPic) {
        var carObj = this;
        if (this.getIsMainCartOpen()) {
            carObj.refurCartNumByCookie();
            return false;
        }
        var ballDom = $('<img class="ball" src="' + proPic + '" onerror="this.src=\'' + web_img_path + 'notfound_50.gif\';" style="width:30px;height:30px;position:absolute;z-index:1000000;border:1px solid #841027;"/>')
        $("body").append(ballDom);
        ballDom.css({
            'top': $(obj).offset().top,
            'left': $(obj).offset().left
        });
        ballDom.animate({
            top: 200,
            left: ($(window).width())/2
        }, 1000, function() {
            $(this).remove();
            refreshPage4Bfd();
        });
        return true;
    }

    this.toCheck = function(obj) {
        var carObj = this;
        carObj.refurCartNumByCookie();
        $(obj).bind('click', {obj: $car}, $car.check);
        $(obj).trigger('click');
        return true;
    }
}


/*****************************************************************************
 * public function
 */



function header(url)
{
    window.location.href = url.replace(/#.*$/,'');
    if(document.all)
        window.event.returnValue = false;
    return false;
}

/*****************************************************
 * get GET values-LLY
 *****************************************************/
function $_GET(key) {
    var searchString = document.location.search.toString();
    var returnValue = '';
    if (searchString.substr(0, 1) == '?' && searchString.length > 1)
    {
        var queryString = searchString.substring(1, searchString.length)
        var queryList = queryString.split('&');
        for (var i = 0; i < queryList.length; i++)
        {
            var oneQuery = queryList[i].split('=');
            if (oneQuery[0] == key && oneQuery.length == 2)
            {
                returnValue = oneQuery[1];
            }
        }
    }
    return returnValue;
}

/*****************************************************
 * Verification code-LLY
 *
 * parameters:
 * t:the image's object(JQ Selector string)
 * v:SESSION name
 * w:width
 * h:height
 *
 *****************************************************/
function vcode(t, v, w, h) {
    target = $(t);
    if (target && v) {
        imgPath = '/vcode.php?w=' + w + '&h=' + h + '&v=' + v + '&x=' + Math.round(Math.random() * 100000);
        target[0].src = imgPath;
        target.css("cursor", "pointer");
        target.click(function() {
            this.src = imgPath + '&y=' + Math.round(Math.random() * 100000);
        });
    }
    var Fn = function(c) {
        return getJson('/vcode.php', 'c=' + c + '&v=' + v + '&x=' + Math.round(Math.random() * 100000));
    }
    return Fn;
}

/*****************************************************
 * check the verification code
 *
 * parameters:
 * fn:verification function
 * i:input box's object(JQ selector string)
 * m:the result object of check the output string(JQ selector string)
 *
 *****************************************************/
function checkVcode(fn, i, m) {
    var target = $(i);
    var msg;
    target.blur(function() {
        if (fn(target[0].value)) {
            msg = '';//'correct';
        } else {
            msg = '';//'correct';
        }
        $(m).html(msg);
    });
}

/******************************************************
 *the verifiction of the buyer's infos
 *
 *****************************************************/

function lengthmix(str)
{
    var reg = /^[\u4e00-\u9fa5]{1}$/;
    var len = str.length;
    var len2 = str.length;
    for (var i = 0; i < len2; i++)
    {
        var re = new RegExp(reg);
        if (re.test(str.charAt(i)))
            len++;
    }
    return len;
}

String.prototype.check = function(type) {
    if (typeof (type) != "string") {
        return false;
    }
    var reg;
    if (type == 'nickname') {
        var roughReg = /^([a-zA-Z0-9\-_\u4e00-\u9fa5]+)$/;
        var re = new RegExp(roughReg);
        if (lengthmix(this) > 15 || lengthmix(this) < 4) {
            return false;
        } else if (!re.test(this)) {
            return false;
        } else {
            return true;
        }
    }
    else {
        switch (type) {
            case 'email'://Required,6-50 english or number characters,must include '@','.',no space.
               // reg = /^([a-z0-9+_]|\-|\.)+@(([a-z0-9_]|\-)+\.)+[a-z]{2,6}$/i;
                reg = /^[a-z0-9]([a-z0-9_]|\-|\.)+@(([a-z0-9_]|\-)+\.)+[a-z]{2,6}$/i;
                break;
            case 'pass'://Required,6-20 english or number characters,when it's all of the number or english or Symbol characters are weakly;when it's all of the number and the lower letter characters is medium;otherwise when it's include the number and lower or upper letter and symbol characters are high.
                reg = /^[a-zA-Z0-9~!@#$%^&\*()_\+|<>?:"';,\./`\[\]\\\={}]{6,20}$/;
                break;
                //case 'nickname'://Required,4-16 characters,one chinese is include two characters.Allow include chinese and lower or upper english and number characters,not allowed the special characters(except the - and _),It's not allowed modified when successfully registered.
                //    reg = /^([a-zA-Z0-9\-_]{4,15}|[\u4e00-\u9fa5]{2,5})$/;
                //    break;
            case 'answer'://Required,4-50 characters.It's composed of the chinese , a-z , 0-9 , '.' , '-' , ' _'.One chinese is include two characters.It's allowed modified when successfully registered.
                reg = /^[a-zA-Z0-9\u4e00-\u9fa5\.\-_]{2,50}$/;

                break;
            default:
                reg = type;
                break;
        }

        var re = new RegExp(reg);
        if (re.test(this))
            return true;
        else
            return false;

    }

    var re = new RegExp(reg);
    if (re.test(this))
        return true;
    else
        return false;
}

function getJson(url, data) {
    var tempValue = new Object;
    $.ajax({
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        async: false,
        success: function(msg) {
            tempValue = msg;
        }
    });
    return tempValue;
}

//translate JSON to String
var O2String = function(O) {
    //return JSON.stringify(jsonobj);
    var S = [];
    var J = "";
    if (Object.prototype.toString.apply(O) === '[object Array]') {
        for (var i = 0; i < O.length; i++)
            S.push(O2String(O[i]));
        J = '[' + S.join(',') + ']';
    }
    else if (Object.prototype.toString.apply(O) === '[object Date]') {
        J = "new Date(" + O.getTime() + ")";
    }
    else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]') {
        J = O.toString();
    }
    else if (Object.prototype.toString.apply(O) === '[object Object]') {
        for (var i in O) {
            O[i] = typeof (O[i]) == 'string' ? '"' + O[i] + '"' : (typeof (O[i]) === 'object' ? O2String(O[i]) : O[i]);
            fi = typeof i == 'string' ? '"' + i + '"' : i;
            S.push(fi + ':' + O[i]);
        }
        J = '{' + S.join(',') + '}';
    }

    return J;
};


/**
 Mask layer-LLY
 return close function
 */
overlay = function() {
    var lay = null;
    if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
        $("html").css({
            height: "100%",
            width: "100%"
        });
        $("html").css("overflow", "hidden");
        if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
            lay = $("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
            $("body").append(lay);
        }
    } else {//all others
        if (document.getElementById("TB_overlay") === null) {
            lay = $("<div id='TB_overlay'></div><div id='TB_window'></div>");
            $("body").append(lay);
        }
    }

    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox') != -1) {
        $("#TB_overlay").addClass("TB_overlayMacFFBGHack");
    } else {
        $("#TB_overlay").addClass("TB_overlayBG");
    }

    return function() {
        lay.remove();
    }

}

/* set the address-LLY */
setAddress = function(callback) {

    var closeLay = overlay();
    var addressDom = $('<div id="set-address"><a href="javascript:closeAddress();" >' + tx[36] + '</a></div>');

    window.closeAddress = function() {
        addressDom.remove();
        closeLay();
    }

    window.AddressCallBack = callback;

    var dt = new Date();
    url = '/address.php?act=set&callback=AddressCallBack&sid=' + dt.getTime();
    addressDom.load(url);

    $('body').append(addressDom);
}
/* set the address-LLY */
function getGiftDiv(callbackF, action) {
    // var callback    =function(info){window.location.reload();}
    window.setGift(callbackF, action);
}
setGift = function(callback, action) {
    var closeLay = overlay();
    var giftDom = $('<div id="set-address"></div>');
    window.closeGift = function() {
        var skuid = $('#allSkuid').val();
        var allSkuid = skuid.split(',');
        for (index in allSkuid) {
            var id = allSkuid[index];
            $gift.getGift();
            if (id != '' && ($gift.data[id] == undefined || $gift.data[id] == '')) {
                var gid = $('#gift' + id + '_1').val();
                $gift.setData(id, gid);
            }
        }
        giftDom.remove();
        closeLay();
    }
    window.CallBackGift = callback;
    var dt = new Date();
    url = '/promote_gift.php?' + action;
    url = url.replace(/[ ]/g, "");
    giftDom.load(url);
    $('body').append(giftDom);
}
/* set the address-LLY */
setAddresssdc = function(callback) {
    var closeLay = overlay();
    var addressDom = $('<div id="set-address"></div>');

    window.closeAddress = function() {
        addressDom.remove();
        closeLay();
    }

    window.AddressCallBack = callback;

    var dt = new Date();
    url = '/address.php?sdc=1&act=set&callback=AddressCallBack&sid=' + dt.getTime();
    addressDom.load(url);

    $('body').append(addressDom);
}


/**********************************************************
 *  myAlert - self definition dialog-LLY
 *==========================================================
 *  parameters:
 *  {
 *  msg: dialog info(string|int)
 *  cls: Whether show the close button of the dialog(boolean)
 *  btn: button(array) [{text:button text,fn:callback}]
 *
 *  *Set the value to msg when the parameter's type is not object,otherwise get the default value.
 *
 *  Example:myAlert('text test');
 *  myAlert({msg:'parameter test',title:'tip title',cls:false,btn:[{text:'ok(callback texta)',fn:texta},{text:'ok(callback textb)',fn:textb}]});
 ***********************************************************/
myAlert = function(conf) {
    var isClose = true;
    var msg = '';
    var title = '';
    var btn = [{
            text: tx[35],
            fn: function() {
                return true;
            }
        },
        {
            text: tx[36],
            fn: function() {
                return true;
            }
        }
    ];

    var closeLay = overlay();

    if (typeof (conf) == 'object') {
        if (typeof (conf.cls) == 'boolean') {
            isClose = conf.cls;
        }
        if (typeof (conf.btn) == 'object') {
            btn = conf.btn;
        }
        msg = conf.msg.toString();
        if(conf.title){
            title = conf.title.toString();
        }
    } else {
        msg = conf.toString();
    }

    var alertDom = $('<div class="tip_detail"></div>');
    var tipBg = $('<div class="tipbg"></a>');
    var imgClose = $('<a href="javascript:;" class="udel"><img src="' + web_img_path + 'cart/cart_cols.png"></a>');
    var tipText = $('<div class="tip_text"></div>');
    var imgIco = $('<s><img src="' + web_img_path + 'tip-box/tip_ico.png"></s>');
    var tipCon = $('<div class="tip_content"></div>');
    var tipMsg = $('<p>'+msg+'</p>');
    var tipTitle = $('<h3>'+title+'</h3>');
    var tipBox = $('<div class="tip_btn_box"></div>');
    
    alertDom.append(tipBg);    
    tipText.append(imgIco,tipCon);
    tipCon.append(tipTitle,tipMsg,tipBox);
        
    /*给按钮绑定事件,默认取消，有传回调则绑定*/
    var btnItem = new Array();
    for (index in btn) {
        if(index != 1){
            btnItem[index] = $('<a href="javascript:;">' + btn[index].text + '</a>');
        }else{
            btnItem[index] = $('<a href="javascript:;" class="tip_quit">' + btn[index].text + '</a>');
        }
        btnItem[index].bind("click", function() {
            alertDom.remove();
        });
        btnItem[index].bind("click", function() {
            closeLay();
        });
        btnItem[index].bind("click", btn[index].fn);
        tipBox.append(btnItem[index]);
    }
    
    /*可定制--是否添加右上角的取消按钮*/
    if (isClose) {
        tipBg.append(imgClose,tipText);
        imgClose.click(function() {
            alertDom.remove();
            closeLay();
            return true;
        });
    }else{
        tipBg.append(tipText);
    }

    alertDom = $('<div id="my-alert1" class="tip_order"></div>').append(alertDom);
    $('body').append(alertDom);
//    scroll(0, 0);
};

/****************************************************************
 * Preview the window of the list page
 */


/******************************************************************
 *            check the complexity of the password
 *****************************************************************/
$.fn.extend({
    pwdStrongCheck: function() {

        checkpassword = function(tar) {
            var pwd = $(tar).val();
            //if(pwd=="")   return;
            var strongvalue = 0;
            var tmpchar = "", hasUpperCase = false, hasLowerCase = false, hasOther = false, hasNumber = false;
            var regU = /[A-Z]/;
            var regL = /[a-z]/;
            var regN = /[0-9]/;
            var regO = /[~!@#$%^&\*()_\+|<>?:"';,\./`\[\]\\]/;
            hasUpperCase = regU.test(pwd);
            hasLowerCase = regL.test(pwd);
            hasNumber = regN.test(pwd);
            hasOther = regO.test(pwd);
            strongvalue = 0 + (hasNumber ? 1 : 0) + (hasUpperCase ? 1 : 0) + (hasLowerCase ? 1 : 0) + (hasOther ? 1 : 0);

            switch (strongvalue) {
                case 1:
                    $("#pwdstrongimg").attr("src", web_img_path + "btn/mess-1.gif");
                    $("#pwdstrongimg").show();
                    //level='33px';
                    //show="弱";
                    break;
                case 2:
                    $("#pwdstrongimg").attr("src", web_img_path + "btn/mess-2.gif");
                    $("#pwdstrongimg").show();
                    //level="66%";
                    //show="中";
                    break;
                case 3:
                case 4:
                    $("#pwdstrongimg").attr("src", web_img_path + "btn/mess-3.gif");
                    $("#pwdstrongimg").show();
                    //level="100%"
                    //show="强"
                    break;
                default:
                    $("#pwdstrongimg").hide();
                    //level = "0%"
                    break;
            }
        }
        $(this).keyup(function() {
            checkpassword(this);
        });
        $(this).blur(function() {
            checkpassword(this);
        });
    }
}
);

function myfavorite(gid) {
    if(buyerInfo.getIsGuest(true)){
        buyerInfo.popUpSimpleLoginLayer();  
        event.preventDefault();
        return false;    
    }
    $.get("/index.php?r=tFavorite/new", {goods_id: gid}, function(ret) {
        if (ret == 1) {
            myAlert(tx[37]);
        }
        else if (ret == 2) {
            myAlert(tx[38]);
        }
        else if (ret == 3) {
            myAlert(tx[39]);
        }
        else if (ret == 4) {
            myAlert(tx[40]);
        }
        else if (ret == 5) {
            myAlert(tx[41]);
        }
        else if (typeof (eval("(" + ret + ")")) == "object") {
            var arr = eval("(" + ret + ")");
            myAlert(arr['err_msg']);
        }
        else {
            myAlert(tx[42]);
        }
    });
}

/**
 * format the weight-LLY
 **/
function format_weight(weight) {
    value = Math.round((weight / 500), 2);
    if (value == 1) {
        value = '';
    }
    return value + tx[43];
}

/**
 * format the price-LLY
 **/
function format_price(value) {
    var fixed = 2;
    var currency = '';
    isNaN(parseFloat(value)) ? value = 0 : value = parseFloat(value);
    v = value.toFixed(fixed).toString();
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.' + ps[1] : '';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;
    if (v.charAt(0) == '-') {
        return currency + '-' + '&yen;&nbsp;' + v.substr(1);
    }
    return currency + '&yen;&nbsp;' + v;
}

/**
 * get url's GET value
 *
 * @param name
 * @return
 */
function $_Get(name)
{
    var uri = window.location.search;
    var reg = new RegExp("" + name + "=([^&?]*)", "ig");
    return ((uri.match(reg)) ? (uri.match(reg)[0].substr(name.length + 1)) : '');
}

/////////////////////////////////////////////////
//
//
//
/////////////////////////////////////////////////
function search(inputId) {
    var input = document.getElementById(inputId);
    if (input.value != '') {
        // location.href = '/browernode.php'+'?input='+input.value;
        location.href = 'category-' + input.value + '.html';
    } else {
        myAlert(tx[52]);
    }
}

/////////////////////////////////////////////////
//
//  show preview window
//
/////////////////////////////////////////////////
previewWin = function(objectId) {
    var closeLay = overlay();
    window.closePreWin = function() {
        closeLay();
        $('#my-alert').remove();

    }
    alertDom = $('<div id="my-alert" style="width:710px;height:560px;margin-left:-360px; top:20px; margin-top:20px;"></div>');
    var closeDom = $('<div class="my-alert-close">' + tx[36] + '</div>');
    closeDom.click(function() {
        closeLay();
        return true;
    });
    alertDom.append(closeDom);
    var dt = new Date();
    alertDom.load('/preview.php?gid=' + objectId + '&sid=' + dt.getTime());

    $('body').append(alertDom);
}

/*preload pictures*/
preloadImages = function() {
    for (var i = 0; i < arguments.length; i++) {
        var imgSrc = arguments[i];
        $(document).ready(function() {
            $("<img>").attr("src", imgSrc);
        });
    }
}

///////////////////////////////////////////////
//
// show feedback window
///////////////////////////////////////////////
var hasinput = false;
feedBackWin = function() {
    if (hasinput == true) {
        return false;
    }
    hasinput = true;
    var closeLay = overlay();
    window.closePreWin = function() {
        closeLay();
        $('#my-alert').remove();
        hasinput = false;
    }

    alertDom = $('<div id="my-alert" style="background:#fff;width:560px;margin-left:-280px; top:40px; margin-top:20px;border:4px solid #333"></div>');
    var closeDom = $('<div class="my-alert-close">' + tx[36] + '</div>');
    closeDom.click(function() {
        closeLay();
        return true;
    });
    alertDom.append(closeDom);
    var dt = new Date();
    alertDom.load('/feedback.php');

    $('body').append(alertDom);
}

/**
 *show wishlist window
 */
goodsNoticeWin = function(goodsid) {
    if (hasinput2 == true) {
        return false;
    }
    hasinput2 = true;
    var closeLay = overlay();
    window.closePreWin = function() {
        closeLay();
        $('#my-alert').remove();
        hasinput2 = false;
    }

    alertDom = $('<div id="my-alert" class="qun_boxborder" style="width:570px;height:328px;margin-left:-280px; top:40px; margin-top:0px;border:4px solid #fff;padding-top:0px;background-color:#fff"></div>');
    // var closeDom = $('<div class="my-alert-close">'+tx[36]+'</div>');
    //     closeDom.click(function(){
    //         closeLay();
    //         return true;
    //     });
    //     alertDom.append(closeDom);
    var dt = new Date();
    alertDom.load('/goodsnotice.php?goodsid=' + goodsid + '&sid=' + dt.getTime());

    $('body').append(alertDom);
}


//===========================
function JT_init() {
    $("a.jTip")
            .hover(function() {
        JT_show(this.href, this.id, this.name)
    }, function() {
        $('#JT').remove()
    })
            .click(function() {
        return false
    });
}

function JT_show(url, linkId, title) {
    if (title == false)
        title = "&nbsp;";
    var de = document.documentElement;
    var w = self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var hasArea = w - getAbsoluteLeft(linkId);
    var clickElementy = getAbsoluteTop(linkId) - 3; //set y position

    var queryString = url.replace(/^[^\?]+\??/, '');
    var params = parseQuery(queryString);
    if (params['width'] === undefined) {
        params['width'] = 250
    }
    ;
    if (params['bgcolor'] === undefined) {
        params['bgcolor'] = '#FFF'
    }
    ;
    if (params['tbgcolor'] === undefined) {
        params['bgcolor'] = '#DDD'
    }
    ;
    if (params['link'] !== undefined) {
        $('#' + linkId).bind('click', function() {
            window.location = params['link']
        });
        $('#' + linkId).css('cursor', 'pointer');
    }

    if (hasArea > ((params['width'] * 1) + 75)) {
        $("body").append("<div id='JT' style='width:" + params['width'] * 1 + "px;border-color:" + params['tbgcolor'] + ";background-color:" + params['bgcolor'] + ";'><div id='JT_arrow_left' style='background-color:" + params['tbgcolor'] + ";'></div><div id='JT_close_left' style='background-color:" + params['tbgcolor'] + ";'>" + title + "</div><div id='JT_copy'><div class='JT_loader'><div></div></div>");//right side
        var arrowOffset = getElementWidth(linkId) + 11;
        var clickElementx = getAbsoluteLeft(linkId) + arrowOffset; //set x position
    } else {
        $("body").append("<div id='JT' style='width:" + params['width'] * 1 + "px;border-color:" + params['tbgcolor'] + ";background-color:" + params['bgcolor'] + ";'><div id='JT_arrow_right' style='background-color:" + params['tbgcolor'] + ";left:" + ((params['width'] * 1) + 1) + "px'></div><div id='JT_close_right' style='background-color:" + params['tbgcolor'] + ";'>" + title + "</div><div id='JT_copy'><div class='JT_loader'><div></div></div>");//left side
        var clickElementx = getAbsoluteLeft(linkId) - ((params['width'] * 1) + 15); //set x position
    }

    $('#JT').css({left: clickElementx + "px", top: clickElementy + "px"});
    $('#JT').show();
    $('#JT_copy').load(url);

}

function getElementWidth(objectId) {
    x = document.getElementById(objectId);
    return x.offsetWidth;
}

function getAbsoluteLeft(objectId) {
    // Get an object left position from the upper left viewport corner
    o = document.getElementById(objectId)
    oLeft = o.offsetLeft            // Get left position from the parent object
    while (o.offsetParent != null) {   // Parse the parent hierarchy up to the document element
        oParent = o.offsetParent    // Get parent object reference
        oLeft += oParent.offsetLeft // Add parent left position
        o = oParent
    }
    return oLeft
}

function getAbsoluteTop(objectId) {
    // Get an object top position from the upper left viewport corner
    o = document.getElementById(objectId)
    oTop = o.offsetTop            // Get top position from the parent object
    while (o.offsetParent != null) { // Parse the parent hierarchy up to the document element
        oParent = o.offsetParent  // Get parent object reference
        oTop += oParent.offsetTop // Add parent top position
        o = oParent
    }
    return oTop
}

function parseQuery(query) {
    var Params = new Object();
    if (!query)
        return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2)
            continue;
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}

function blockEvents(evt) {
    if (evt.target) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}
(function($) {

    //Attach this new method to jQuery
    $.fn.extend({
        //This is where you write your plugin's name
        slidebox: function(urOpts) {
            var defaultOpts = {interval: 3000, fadeInTime: 300, fadeOutTime: 200};
            urOpts = $.extend({}, defaultOpts, urOpts);
            var interval = urOpts.interval;
            var fadeInTime = urOpts.fadeInTime;
            var fadeOutTime = urOpts.fadeOutTime;
            //Iterate over the current set of matched elements
            return this.each(function(i) {
                var _titles = $("ul.slide-txt li", this);
                var _titles_bg = $("ul.op li", this);
                var _bodies = $("ul.slide-pic li", this);
                var _count = _titles.length;
                var _current = 0;
                var _intervalID = null;
                var stop = function() {
                    window.clearInterval(_intervalID);
                };
                var slide = function(opts) {
                    if (opts) {
                        _current = opts.current || 0;
                    } else {
                        _current = (_current >= (_count - 1)) ? 0 : (++_current);
                    }
                    ;
                    _bodies.filter(":visible").fadeOut(fadeOutTime, function() {
                        _bodies.eq(_current).fadeIn(fadeInTime);
                        _bodies.removeClass("cur").eq(_current).addClass("cur");
                    });
                    _titles.removeClass("cur").eq(_current).addClass("cur");
                    _titles_bg.removeClass("cur").eq(_current).addClass("cur");
                }; //endof slide
                var go = function() {
                    _intervalID = window.setInterval(function() {
                        slide();
                    }, interval);
                }; //endof go
                var itemMouseOver = function(target, items) {
                    stop();
                    var i = $.inArray(target, items);
                    slide({current: i});
                }; //endof itemMouseOver
                _titles.hover(function() {
                    if ($(this).attr('class') != 'cur') {
                        itemMouseOver(this, _titles);
                    } else {
                        stop();
                    }
                }, go);
                //_titles_bg.hover(function() { itemMouseOver(this, _titles_bg); }, go);
                _bodies.hover(stop, go);
                //trigger the slidebox
                go();
            });
        }
    });

    //pass jQuery to the function,
    //So that we will able to use any valid Javascript variable name
    //to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )
})(jQuery);

/**
 * goods preview JS
 *
 * @param level		operate type
 * @param goodsId	goods ID
 * @param divid		Browsing history's div id
 * level's value:
 * 1:Count of goods(need GOODSID)
 * 2:Add to browsing history(need GOODSID)
 * 3:1+2(need GOODSID)
 * 4:get history info,and set the result to the div where the id is divid(need divid)
 * 5:1+4(need GOODSID and divid)
 * 6:2+4(need GOODSID and divid)
 * 7:1+2+4(need GOODSID and divid)
 */

function goodsVisitJs(level, goodsId, divid) {
    var par = '';
    if (level == 1 || level == 3 || level == 5 || level == 7 || level == 6) {
        par += par ? '&counter=true' : 'counter=true';
        var needid = 1;
    }
    if (level == 2 || level == 3 || level == 6 || level == 7) {
        par += par ? '&history=true' : 'history=true';
        var needid = 1;
    }
    if (level == 4 || level == 5 || level == 6 || level == 7 || level == 8) {
        par += par ? '&act=gethistorylist' : 'act=gethistorylist';
    }
    if (level == 7 || level == 8) {
        par += par ? '&tpl_type=html_v3' : 'tpl_type=html_v3';
    }
    if (level == 6) {
        par += par ? '&tpl_type=html_v4' : 'tpl_type=html_v4';
    }
    if (par != '') {
        var urlpar = par + (needid == 1 ? '&gid=' + goodsId : '') + '&isajax=1';
        $.ajax({
            url: '/index.php?r=tGcounter/index',
            type: 'GET',
            cache: false,
            async: false,
            data: urlpar,
            dataType: 'json',
            timeout: 1000,
            error: function() {
                //alert('Error loading history!');
            },
            success: function(res) {
                if (res.errno == 0) {
                    if (level == 4 || level == 5 || level == 6 || level == 7 || level == 8) {
                        $('#' + divid).html(res.content);
                    }
                }
            }
        })
    }

}

/*================================================================================
 *  ad function
 *  Jingyi
 */
var ShowAds = function(dom_id, pos) {
    return;
    pos = (pos == undefined) ? 0 : pos;
    if (pos != 0) {
        $.get("/show_ads.php", {
            pos: pos
        }, function(data) {
            $('#' + dom_id).html(data);
            if (data == "") {
                /*
                 $('#' + dom_id).attr("style", "background: black;");
                 if ($('#' + dom_id).attr("class") == "tspace-l"){
                 $('#' + dom_id).attr("class", "tspace-l com_left_img");
                 }
                 */
                $('#' + dom_id).hide();
            }
        });
    }
}

/*================================================================================
 *  ad function
 *  used by sale pages
 */
var ShowSalePageAds = function(dom_id, num, p_num, callback) {
    num = (num == undefined) ? 0 : num;
    if (num != 0) {
        $.ajax({
            type: "GET",
            url: web_domain + "show_sale_page_ads.php?num=" + num + "&p_num=" + p_num,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function(data) {
                $('#' + dom_id).html(data);
                if (data == "") {
                    $('#' + dom_id).hide();
                }
                if (callback !== undefined)
                    eval(callback + '();');
            }
        });
    }
}


var InitFourPicDl = function(dom_id, num) {
    var i = 0;
    var tmp;
    $("#" + dom_id).find('dl').each(function() {
        $(this).mouseover(function() {
            var one_dom = $("#" + dom_id).find('dl')[0];
            if (this != $("#" + dom_id).find('dl')[0]) {
                $(one_dom).removeClass("show0");
            }
            $(this).addClass("show0");
        });
        $(this).mouseout(function() {
            var one_dom = $("#" + dom_id).find('dl')[0];
            $(this).removeClass("show0");
            $(one_dom).addClass("show0");
        });
        ++i;
        //$(this).find("dd").show();
    });
}

/**
 * Author: Jingyi Xiao, jingyi.it@gmail.com
 * Version: v-0.11
 * Usage:
 * var slide_horiz = new AdsHorizSlide("slide_horiz"); Note:Here the object variable name and the parameter string must be equal.
 * slide_horiz.initGoodsList(Size range, main dom's ID, left move picture's ID, right move picture's ID);
 * Example tpl: templates/ads/five_goods_horiz_slide.tpl
 */
var AdsHorizSlide = function(new_obj_str) {
    this.ads_goods_obj_ls = new Array();
    this.index = 0;
    //add by qiu to solve die-foreach
    this.tmpClickLeftStr = '';
    this.tmpClickRightStr = '';

    this.clickLeftStr = new_obj_str + ".clickLeft();";
    this.clickRightStr = new_obj_str + ".clickRight();";
    this.pos_max_no = 4;

    this.initGoodsList = function(pos_max, dom_id, left_button_id, right_button_id) {
        this.ads_goods_obj_ls = new Array();
        var i = 0;
        var obj = this;
        this.step = 1;
        this.ads_pos_max = pos_max;
        this.left_button_id = left_button_id;
        this.right_button_id = right_button_id;

        $('#' + dom_id + ' li').each(function() {
            obj.ads_goods_obj_ls[i++] = this;
            if ($(this).html() == "") {
                obj.step = 2;
            }
            else {
                //alert($(this).html());
            }
        });

        if (this.ads_goods_obj_ls.length * this.step <= pos_max) {
            $("#" + this.left_button_id + " a").attr("href", "javascript:;;");
            $("#" + this.right_button_id + " a").attr("href", "javascript:;;");
            return;
        }

        for (var i = 0; i < this.ads_goods_obj_ls.length; i += 1) {
            if (i >= this.ads_pos_max * this.step) {
                $(this.ads_goods_obj_ls[i]).hide();
            }
        }

        if (this.ads_goods_obj_ls.length < this.ads_pos_max * this.step) {
            //alert($(this.ads_goods_obj_ls[this.ads_goods_obj_ls.length]).html());
            $(this.ads_goods_obj_ls[this.ads_goods_obj_ls.length - 1]).hide();
        }

        //add by qiu to solve die-foreach
        this.tmpClickRightStr = "";
        for (var i = 0; i < pos_max; i++) {
            this.tmpClickRightStr += this.clickRightStr;
        }

        this.tmpClickLeftStr = "";
        for (var i = 0; i < pos_max; i++) {
            this.tmpClickLeftStr += this.clickLeftStr;
        }

        /*
         $("#"+this.left_button_id+" a").attr("href", "javascript: ;");
         if (this.ads_goods_obj_ls.length <= this.index + this.ads_pos_max * this.step){
         $("#"+this.right_button_id+" a").attr("href", "javascript: ;");
         }*/

        $("#" + this.left_button_id + " a").attr("href", "javascript:" + this.tmpClickLeftStr);//fix by qiu@2012.05.09
        $("#" + this.right_button_id + " a").attr("href", "javascript:" + this.tmpClickRightStr);

    }

    this.clickLeft = function() {
        if (this.index <= 0) {
            return;
        }
        //alert("1:" + this.index+":"+this.ads_goods_obj_ls.length+":"+this.index);
        this.index -= this.step;
        $(this.ads_goods_obj_ls[this.index]).show();
        if (this.step > 1)
            $(this.ads_goods_obj_ls[this.index + 1]).show();
        $(this.ads_goods_obj_ls[this.index + this.ads_pos_max * this.step ]).hide();
        if (this.step > 1)
            $(this.ads_goods_obj_ls[this.index + this.ads_pos_max * this.step + 1]).hide();
        if (Math.floor((this.ads_goods_obj_ls.length - this.step) / (this.ads_pos_max * this.step)) >= Math.floor((this.index) / (this.ads_pos_max * this.step))) {
            $("#" + this.right_button_id + " a").attr("href", "javascript:" + this.tmpClickRightStr);
            if (typeof (rightBtnImgEn) != "undefined") {
                $("#" + this.right_button_id + " a img").attr("src", rightBtnImgEn);
            }
        }
        if (0 >= this.index) {
            $("#" + this.left_button_id + " a").attr("href", "javascript: ;");
            if (typeof (leftBtnImgUn) != "undefined") {
                $("#" + this.left_button_id + " a img").attr("src", leftBtnImgUn);
            }
            return
        }
    }

    this.clickRight = function() {
        //alert("2:" + this.index+":"+this.ads_goods_obj_ls.length+":"+this.index);
        if (Math.floor((this.ads_goods_obj_ls.length - this.step) / (this.ads_pos_max * this.step)) <= Math.floor((this.index) / (this.ads_pos_max * this.step))) {
            return;
        }
        $(this.ads_goods_obj_ls[this.index]).hide();
        if (this.step > 1)
            $(this.ads_goods_obj_ls[this.index + 1]).hide();
        $(this.ads_goods_obj_ls[this.index + this.ads_pos_max * this.step ]).show();
        if (this.step > 1) {
            //alert(this.ads_goods_obj_ls.length - this.index - this.step + ":" + this.ads_pos_max * this.step);
            if (this.ads_goods_obj_ls.length - this.index - this.step > this.ads_pos_max * this.step) {
                $(this.ads_goods_obj_ls[this.index + this.ads_pos_max * this.step + 1]).show();
            }
        }
        this.index += this.step;
        if (this.index > 0) {
            $("#" + this.left_button_id + " a").attr("href", "javascript:" + this.tmpClickLeftStr);
            if (typeof (leftBtnImgEn) != "undefined") {
                $("#" + this.left_button_id + " a img").attr("src", leftBtnImgEn);
            }
        }
        if (Math.floor((this.ads_goods_obj_ls.length - this.step) / (this.ads_pos_max * this.step)) <= Math.floor((this.index) / (this.ads_pos_max * this.step))) {
            $("#" + this.right_button_id + " a").attr("href", "javascript: ;");
            if (typeof (rightBtnImgUn) != "undefined") {
                $("#" + this.right_button_id + " a img").attr("src", rightBtnImgUn);
            }
            return
        }
    }
}
/* ad function end
 *=======================================================================================*/

/**
 * add to shopping cart
 */
function addCart(skuid, amountId, pt, minn, maxn, cartReturn, substationId) {

    nowSkuId = amountId + "Result";
    sku = amountId;
    var restoreValue = $('#' + amountId)[0].value;
    maxn = parseInt(maxn, 10);
    restoreValue = parseInt(restoreValue, 10);
    // var goodsTitle = $('#'+amountId).parent().parent().parent().find('div:first >.pdname >a').html();
    if (maxn != 0 && restoreValue > maxn) {
        myAlert(tx[61] + '[ ' + minn + '-' + maxn + ' ]' + tx[62]);
        return false;
    }
    id = skuid;
    notice_sku_id = skuid;
    $car.addGoods(skuid, $('#' + amountId)[0].value, pt, minn, maxn, cartReturn, '0', substationId);
    //丰灵统计
    window._vaq = window._vaq || [];
    _vaq.push(['addCart',skuid,'','','',restoreValue ]);
}
/**
 *
 * The callback after add to shopping cart.
 */
function cart_callback() {
    $("#goods_notice_" + notice_sku_id).hide('fast');
    $("#goods_notice_" + notice_sku_id).show('slow');
}
function hotsale_cart_callback() {
    $("#hotsale_goods_notice_" + notice_sku_id).hide('fast');
    $("#hotsale_goods_notice_" + notice_sku_id).show('slow');
}
/*
 * =====================================================================================*/
//show/hide the category trees
function catpanelSH(obj, id) {
    $('#cat_panel' + id + ' >li.show').removeClass();
    $(obj).addClass('show');
}

/**
 * turnpage JS,use to ajax turnpage,need procedures to support
 */

/**
 * get the turnpage data
 *
 * @param servUrl		get data's url
 * @param pageParName          parameter's name of the turn page,example:page
 * @param pageDiv		the container id or name of the turn page's position
 * @param contentDiv           the container id or name of the datas
 * @param pageNum		The pages of the current
 * @param style			The style of turn page show,now only one,if there is more then add to more
 *
 * @returns
 */
function ajaxPage(servUrl, pageParName, pageDiv, contentDiv, pageNum, style) {
    var oldContent = $(contentDiv).html();
    $(contentDiv).html('');
    var url = servUrl + (servUrl.replace('?', '') == servUrl ? '?' : '&') + pageParName + "=" + pageNum;

    $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        async: false,
        dataType: 'json',
        timeout: 1000,
        error: function() {
            //alert('Error loading ajaxPage!');
            $(contentDiv).html(oldContent);
        },
        success: function(res) {
            if (res.errno == 0) {
                $(contentDiv).html(res.content);
                var pageCount = res.pagecount;
                writePageDiv(servUrl, pageParName, pageDiv, contentDiv, pageNum, pageCount, style)
            } else {
                //alert(res.error);
                $(contentDiv).html(oldContent);
            }
        }
    })
    oldContent = '';
}

/*
 * search submit
 */
function sch(kw) {
    window._vaq= window._vaq || [];
    _vaq.push(['trackEvent', "head_search", "click", kw, 0,{'ttad_pos':'search','tp':5}]);  
    urlCreater = new urlCreater;
    url = urlCreater.geturl({"name": "search", "input": kw});
    //var url = (lang == 'en') ? web_en_domain : web_domain;
    //url = url + 'index.php?r=tGoods/search&input=' + encodeURIComponent(kw);
    document.location.href = url;
}

/**
 * AJAX turn page class
 *
 * @param servUrl		get data's url
 * @param pageParName          parameter's name of the turn page,example:page
 * @param pageDiv		the container id or name of the turn page's position
 * @param contentDiv           the container id or name of the datas
 * @param pageNum		The pages of the current
 * @param pageCount		total page number
 * @param style			The style of turn page show,now only one,if there is more then add to more
 * @returns
 * the return data type of the php's json is:
 *
 * array(
 * 	'errno'=>0,//If error then greater than 0,the different error return the different error code,if there is no error then return 0.
 * 	'error'=>'',//If there are errors then return error code,otherwise return null.
 * 	'content'=>'',//The html code of the current goods list,put it to contentDiv.
 * 	'pagecount'=>10,//total pages
 * )
 *
 */
function writePageDiv(servUrl, pageParName, pageDiv, contentDiv, pageNum, pageCount, style) {

    var url = servUrl + (servUrl.replace('?', '') == servUrl ? '?' : '&') + pageParName + "=" + pageNum;
    var prePage = (pageNum - 1) < 1 ? 1 : (pageNum - 1);
    var nextPage = (pageNum + 1) > pageCount ? pageCount : (pageNum + 1);
    var pageStr = '';
    var preFunc = prePage == pageNum ? "void(0);" : ("ajaxPage('" + servUrl + "','" + pageParName + "','" + pageDiv + "','" + contentDiv + "'," + prePage + ",'" + style + "')");
    var nextFunc = nextPage <= pageNum ? "void(0);" : ("ajaxPage('" + servUrl + "','" + pageParName + "','" + pageDiv + "','" + contentDiv + "'," + nextPage + ",'" + style + "')");

    if (style == '1') {
        pageStr = '<A href="#3" onclick="' + preFunc + '"><IMG src="' + web_img_path + 'ico/list_jt1.gif" ></A>';
        pageStr += pageNum + '/' + pageCount;
        pageStr += '<A href="#3" onclick="' + nextFunc + '"><IMG src="' + web_img_path + 'ico/list_jt2.gif" ></A>';
    }
    $(pageDiv).html(pageStr);
}

function getShowPrice(promotionType, shopPrice, realPrice, disflag, goods_id, appendtxt) {
    var isDiscount;
    var basePriceName = tx[54];
    var basePrice = shopPrice;
    var priceName;
    var price;

    /**get userDiscount*/

    var userDiscount = 1;
    var userDiscount_1 = $.cookies.get("bd");
    var userGoods_Discount = $.cookies.get("bs");
    if (disflag == 2)//2=GOODS_DIS_FLAG_VIPDISCOUNT 0=GOODS_DIS_FLAG_DISCOUNT
    {
        userDiscount = userGoods_Discount;
    } else if (disflag == 0) {
        userDiscount = userDiscount_1;
    }

    if (userDiscount == null) {
        userDiscount = 1;
    }
    //alert(disflag + "##" + userDiscount + "##" + userGoods_Discount);

    if (promotionType == 1) {
        priceName = tx[55];
        price = realPrice;
        isDiscount = 1;
    } else if (disflag == 0 && userDiscount != 0 && userDiscount != 1) {
        priceName = tx[56];
        price = shopPrice * userDiscount;
        isDiscount = 1;
    } else if (disflag == 2 && userDiscount != 0 && userDiscount != 1) {

        //alert("####");
        priceName = tx[56];
        price = shopPrice * userDiscount;
        isDiscount = 1;
    } else {

        priceName = tx[57];
        price = realPrice;
        isDiscount = 0;
    }

    $('.C_' + goods_id).html(priceName + ":" + tx[58] + "&nbsp;" + price.toFixed(2) + appendtxt);
    // document.write(priceName+": "+price.toFixed(2));
}
$ttGift = function() {
    this.data = new Array();
    this.saveGift = function() {
        var strGifts = '[';
        for (index in this.data) {
            var strGift = "{";
            if (index && this.data[index]) {
                strGift += "s:" + index;
                strGift += ",g:" + this.data[index];
                strGift += "},";
                strGifts += strGift;
            }
        }

        if (strGifts.charAt(strGifts.length - 1) == ',') {
            strGifts = strGifts.substr(0, strGifts.length - 1);
        }
        strGifts += ']';
        cookieConfig('gift_' + buyerInfo.BUYER_ID, strGifts, 720);

    }
    this.getGift = function() {//get the gift list from cookie
        //$.cookies.get('gift_'+buyerInfo.id);
        var strCookie = $.cookies.get('gift_' + buyerInfo.BUYER_ID);

        if (strCookie) {
            var arrCookie = eval(strCookie);
            var getArr = new Array();
            for (index in arrCookie) {
                if (arrCookie[index] != '') {
                    getArr[arrCookie[index].s] = arrCookie[index].g;
                }
            }
            this.data = getArr;
        }
    }
    this.setData = function(skuId, giftSkuid) {
        this.data[skuId] = giftSkuid;
        this.saveGift();
    }
    this.changeAmount = function(skuId, goodsNumLimit, amount) {
        if (amount < goodsNumLimit) {
            this.setData(skuId, '');
            this.saveGift();
        }
    }
}

/**
 * This object used in preview the approve pics on goods detail
 * Author: jingyi.it@gmail.com
 * Version: v1.0
 *
 * Usage:
 * Just add the float box's id and the link's(the link to make the float box showed) id
 * Then, do init. All things will be OK!~~~
 * Any questions, ask me. :-)
 * Good Luck!
 *
 * Example:
 * preview_core = new PreviewDetailTags();
 * preview_core.addFriends("float_box_id", "cat_a_id");
 * preview_core.addFriends("....", "....");
 * .......
 * preview_core.init();
 *
 */
var PreviewDetailTags = function() {
    this.friends = new Array();

    this.addFriends = function(float_id, a_id) {
        var one_team = new Object();
        one_team.a_id = a_id;
        one_team.float_id = float_id;
        this.friends.push(one_team);
    }

    this.init = function() {
        for (var i = 0; i < this.friends.length; i += 1) {
            this.bindShow(this.friends[i].a_id, this.friends[i].float_id);
            var obj = this;
            $('#' + this.friends[i].float_id + " .safety_certification_tit span a").attr("href", "javascript:void(0);");
            $('#' + this.friends[i].float_id + " .safety_certification_tit span a").click(function() {
                obj.closeAll();
            });
        }
    }

    this.closeAll = function(a_id) {
        for (var i = 0; i < this.friends.length; i += 1) {
            if (this.friends[i].a_id != a_id) {
                $('#' + this.friends[i].float_id).hide();
            }
        }
    }

    this.bindShow = function(a_id, float_id) {
        var obj = this;
        $('#' + a_id).mouseover(function(e) {
            obj.closeAll(a_id);
            $('#' + float_id).fadeIn().show();
            $('#' + float_id).css('top', parseInt(e.pageY / 80) * 80 + 45);
            $('#' + float_id).css('left', e.pageX - 500);
        });
    }

    this.getByAid = function(a_id) {
        for (var i = 0; i < this.friends.length; i += 1) {
            if (this.friends[i].a_id == a_id)
                return a_id;
        }
        return false;
    }

    this.getByFid = function(f_id) {
        for (var i = 0; i < this.friends.length; i += 1) {
            if (this.friends[i].float_id == f_id)
                return f_id;
        }
        return false;
    }

    this.bindClose = function(float_id) {
    }
}

/**
 * The header shows ad js code.
 * from_array is used to define the ad source string array.from_str is used to define "tt"'s value,this value is correspond the "from_array"'s key.
 * need to maintain the "from_array" and "from_str".
 **/
var headad = function() {
    this.from_array = new Array();
    this.from_array["bdcard"] = '<div class="title_banner"><a href="/help/payment.html#hdfk"><img src="' + web_img_path + 'banner_ka2.jpg" /></a></div>';
    this.from_array["tgad"] = '<div class="tit_banner"><img src="http://img01.ttmimg.com/C8/03/1334111048520.jpg" width="996" height="90" border="0" usemap="#Map"><map name="Map" id="Map"><area shape="poly" coords="1,-1,299,1,299,88,3,87" href="' + web_domain + 'product-1014222.html?ttad_source=ttad&ttad_pos=adtop_01" target="_blank"/><area shape="rect" coords="302,1,589,89" href="' + web_domain + 'product-1021035.html?ttad_source=ttad&ttad_pos=adtop_02" target="_blank"/><area shape="rect" coords="592,0,995,89" href="' + web_domain + 'product-1004198.html?ttad_source=ttad&ttad_pos=adtop_03" target="_blank"/></map></div>';
    this.from_array["bdtg"] = '';
//    this.from_array["tgad"] = '';//wtt changed @2012/1/30
    this.from_str = ",bdcard,tgad,bdtg,";
    this.strurl = document.location.toString();
    this.ttIncStr = ".tootoo.cn";
    this.setcookie = function() {
        var ttpos = this.strurl.indexOf(this.ttIncStr);
        var intpos = this.strurl.indexOf("tt=");
        if (ttpos != -1 && intpos != -1) {
            var strRight = this.strurl.substr(intpos + 3);
            var arrTmp = strRight.split("&");
            var word = arrTmp[0];
            if (word != "" && this.from_str.indexOf("," + word + ",") != -1) {
                cookieConfig('tt', word, 72);
            }
        }
    }
    this.init = function() {
        var showpage = new Array(/^category-(.*)\.html/, /^browernode.php/, /^product-(\d+)\.html/, /^actlist-goods.html/, /^rank.html/, /^actlist.html/, /^index-ads.html/, /^fruits-vegetables.html/, /^poultry-custard.html/, /^delicacies.html/, /^oil-foods.html/, /^specialty.html/, /^imported.html/, /^health-care.html/, /^tea-water-wine.html/);
        var upos = this.strurl.indexOf(".tootoo.cn");
        var url = (upos) ? this.strurl.substr(upos + 11) : "";
        var showimg = false;
        var istop = false;
        for (var i = 0; i < showpage.length; i++) {
            var opt = url.match(showpage[i]);
            if (opt) {
                showimg = true;
                istop = (showpage[i] == "/^index-ads.html/") ? true : istop;
                break;
            }
        }
        istop = true;
        showimg = false;    //not show images ad
        if (showimg) {
            this.setcookie();
        }
        var word = $.cookies.get('tt');
        if (word != "" && word != null) {
            if (typeof (this.from_array[word]) != "undefined") {
                if (showimg) {
                    if (word == "bdcard") {
                        $("body").prepend(this.from_array[word]);
                    } else if (word == "tgad") {
                        if (istop) {
                            $("div.too_search").before(this.from_array[word]);
                        } else {
                            $("div.too_search").after(this.from_array[word]);
                        }
                    } else if (word == "bdtg") {
                        $("body").prepend(this.from_array["bdcard"]);
                        if (istop) {
                            $("div.too_search").before(this.from_array["tgad"]);
                        } else {
                            $("div.too_search").after(this.from_array["tgad"]);
                        }
                    }
                }
                $("ul.too_nav_c a:contains(" + tx[67] + ")").attr("href", "/index-ads.html");
            }
        }
    }
}
/**
 *Summary:load images when it's need
 *Condition:need modify the img's "src" attribute to "initSrc"
 *Parameters:lineH:line's height,The current line height,default is 0
 *       noDefImgH:init the default height that the height is not defined.
 *Example:
 *$(document).ready(function(){
 var loadimg = new needLoadImg(251,222);
 var defImg = '/images/tmploading.gif'
 loadimg.loadDefImg(defImg);
 loadimg.init();
 window.onscroll = function(){
 setTimeout(function(){loadimg.init()},1);
 }
 window.onresize = function(){
 setTimeout(function(){loadimg.init()},1);
 }
 })
 **/
var needLoadImg = function(lineH, noDefImgH) {
    var ElementIsVisible = function(elm) {
        if (typeof (elm.style) != "undefined" &&
                (
                        (typeof (elm.style.display) != "undefined"
                                && elm.style.display == "none")
                        ||
                        (typeof (elm.style.visibility) != "undefined"
                                && elm.style.visibility == "hidden")
                        )
                )
        {
            return false;
        }
        else if (typeof (elm.parentNode) != "undefined"
                && elm.parentNode != null
                && elm.parentNode != elm)
        {
            return ElementIsVisible(elm.parentNode);
        }
        return true;
    };

    this.getImgList = function() {
        var imgList = $('img[initSrc]').not(".zz").filter(function(index) {
            return    ElementIsVisible(this);
        });
        return imgList;
    };

    this.checkImg = function(scrollTop) {
        var winH = $(window).height();
        var winT = $(window).scrollTop();
        imgList = this.getImgList();
        imgList.each(function() {
            var img = this;
            var imgH = img.height;
            var oTop = $(img).offset().top;
            if (imgH <= 1) {
                imgH = noDefImgH;
                oTop = oTop - imgH;
            }
            lineH = (lineH <= imgH) ? imgH : lineH;
            var imgH10 = parseInt(imgH / 10);
            if ((((oTop + lineH) - scrollTop) > 0 && (oTop - scrollTop) < winH) || ((oTop + imgH >= winT) && (winT + winH >= oTop + imgH10))) {
                if (img.getAttribute("initSrc")) {
                    img.src = img.getAttribute("initSrc");
                    img.removeAttribute("initSrc");
                }
            }
        });
        var t = $('img[initSrc]');
        if (t.length == 0) {
            window.onresize = null;
            window.onscroll = null;
        }
    }
    this.init = function() {
        this.checkImg(document.documentElement.scrollTop);
    }

    //触发图片延迟加载，通常用于AJAX后页面DOM变更以后
    this.triggerImgLazyLoad = function() {
        loadimg.init();

        var t = $('img[initSrc]');
        if (t.length != 0) {
            if (window.onresize == null) {
                window.onresize = function() {
                    loadimg.init();
                }
            }

            if (window.onscroll == null) {
                window.onscroll = function() {
                    loadimg.init();
                }
            }
        }
    }

    this.loadDefImg = function(defImg) {
        for (var i = 0; i < imgList.length; i++) {
            var imgs = imgList[i];
            imgs.src = defImg;
        }
    }
}

var laterScriptsRun = function() {
    var scripts = "";
    $(".laterScripts").each(function() {
        scripts += $(this).text();
    });
    var script_dom = $("<script type='text/javascript'>" + scripts + "</script>");
    $("body").append(script_dom);
}
/**
 *parameters:
 *  selector:the Container's id
 *  childSelector:The dom that need to add event to it.belong the selector container.
 *  event:the type of the event
 *  childSelectorAttr:the childSelector's attribute.it's value is the event's function name.
 *Example:delegateFun('goodslist','a','click','ac');
 */
var delegateFun = function(selector, childSelector, event, childSelectorAttr) {
    $("#" + selector).delegate(childSelector, event, function() {
        if ($(this).attr(childSelectorAttr)) {
            var jsfun = $(this).attr(childSelectorAttr);
            eval(jsfun + "(this)");
        }
    });
}
var acAddCart = function(obj) {
    addCart($(obj).attr('ac_sku_id'), $(obj).attr('ac_amountId'), $(obj).attr('ac_promotion_type'), $(obj).attr('ac_min_buy_num'), $(obj).attr('ac_max_buy_num'), eval($(obj).attr('ac_cart_callback')), $(obj).attr('ac_substation_id'));
    if ($(obj).attr('ac_gaq') != "") {
        _gaq.push(['_trackPageview', $(obj).attr('ac_gaq')]);
    }
}
var atGoodsNoticeWin = function(obj) {
    goodsNoticeWin($(obj).attr('at_goods_id'));
}
/**
 * juge now time is between the starttime and endtime.
 * start:2012-07-18
 * end:2012-08-17
 * return bool
 */
var timeRange = function(start, end) {
    var startdate = Date.parse(start.replace(/-/g, "/"));
    var enddate = Date.parse(end.replace(/-/g, "/"));

    var now = new Date();
    var nowtime = now.getTime();

    if (nowtime > startdate && nowtime < enddate) {
        return true;
    } else {
        return false;
    }
};

var numberRange = function(number, min, max) {
    if (number < min || number > max)
        return false;
    return true;
};

var parseIntArray = function(value) {
    var arr = [];
    if (value instanceof Array) {
        for (valueIndex in value)
            arr[valueIndex] = parseInt(value[valueIndex]);
    }
    return arr;
};
/**
 * address area cookies info
 */
var psSaveToCookie = function(provId, cityId, distId, areaId) {
    _intoObj.setGeos(provId, cityId, distId, areaId);
};


/**
 * The end of this js, all function defined must below this
 */
var buyerInfo = language === 'en' ? new Buyer_En : new Buyer;
buyerInfo.init();
$().ready(initJs);

//baidu tongji
var _bdhm_top = 0;
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
var _bdhm_tim = new Image(1, 1);
_bdhm_tim.id = "bdhmPerimg";
_bdhm_tim.src = _bdhmProtocol + "hm.baidu.com/_tt.gif?si=75ac2f3027882fb20cb9d19d76557025&rnd=" + Math.round(Math.random() * 2147483647);
_bdhm_tim.onload = function() {
    _bdhm_top = 1;
}




//url
//urlCreater.geturl({"name":"search","val":"苹果"}) 搜索
//urlCreater.geturl({"name":"cat","id":"12311"}) 分类
//urlCreater.geturl({"name":"brand","id":"12311"}) 品牌
var urlCreater = function() {
    this.url = 'index.html';
    this.testListParams = {"name": "cat", "id": 14180};
    this.domain = '';
    this.lang = language;
    this.ps = '';
    this.setDomain = function(domain) {
        this.domain = domain;
    };
    this.getDomain = function() {
        if (this.domain == '')
            return web_domain;
        return this.domain;
    };
    this.setPs = function(ps) {
        this.ps = ps;
    };
    this.getPs = function() {
        if (this.ps != '')
            return this.ps;
        var ps = $.cookies.get('ps');
        if (ps == '' || ps == null)
            return '1,2,3,0';

        ps = ps.replace(/\-/g, ",");
        return ps;
    };
    this.getStationStr = function(){
        return 's'+_intoObj.getSubStationID();
    }
    this.createProductUrl = function(gid, goto) {
        var curdomain = this.getDomain();
        var tourl = curdomain + 'product-' + this.getStationStr() + '-' + gid + "-" + this.lang + ".html";
        if (goto == '1')
            header(tourl);
        return tourl;
    };
    this.geturl = function(obj) {
        if (typeof obj.name == 'undefined') {
            return false;
        }
        switch (obj.name) {
            //列表页分类
            case ('cat'):
                this.categoryUrl(obj);
                break;
                //列表页品牌
            case ('brand'):
                this.brandUrl(obj);
                break;
                //列表页搜索
            case ('search'):
                this.searchUrl(obj);
                break;
            case ('list'):
                this.listUrl(obj);
                break;
                //我的限时抢购页
            case ('actlist-goods'):
                this.actlistGoodsUrl(obj);
                break;
                //促销快报页
            case ('actlist'):
                this.actlistUrl();
                break;
                //商品详情
            case ('product'):
                this.productUrl(obj);
                break;
            case ('tuangou'):
                this.tuangouUrl();
                break;
                //首页
            case ('index'):
                this.indexUrl();
                break;
                //登陆
            case ('login'):
                this.loginUrl();
                break;
            case ('allLogin'):
                this.loginAllUrl(obj);
                break;
                //注册
            case ('reg'):
                this.regUrl();
                break;
                //默认
            default:
                break;
        }
        return this.url;
    };
    this.loginUrl = function() {
        if (language == 'zh_cn')
            this.url = 'login.html';
        else
            this.url = 'en/login.html';
    }
    this.loginAllUrl = function(obj){
        var to_url = location.href;
        to_url = to_url.replace('promotion_from', 'p');
        to_url = $_GET('tourl') ? $_GET('tourl') : encodeURIComponent(to_url);
        if (typeof obj.tourl != 'undefined') {
            to_url = obj.tourl;
        }

        this.loginUrl();
        this.url = web_user_domain + this.url;
        if( to_url != '')
            this.url = this.url + '?tourl=' + to_url;
    }
    this.regUrl = function() {
        if (language == 'zh_cn')
            this.url = 'reg.html';
        else
            this.url = 'en/reg.html';
    }
    this.indexUrl = function() {
        this.url = web_domain+'index.html';
    }
    this.searchUrl = function(obj) {
        this.url = web_domain + 'list-' + this.getStationStr() + '-0-0-0-' + encodeURIComponent( obj.input.replace(/\-/g, "") ) + '-' + this.getPs() + '-' + this.lang + '.html';
    }
    this.categoryUrl = function(obj) {
        this.url = web_domain + 'list-' + this.getStationStr() + '-' + obj.id + '-' + this.getPs() + '-' + this.lang + '.html';
    }
    this.brandUrl = function(obj) {
        this.url = web_domain + 'list-' + this.getStationStr() + '-0-' + obj.brand + '-' + this.getPs() + '-' + this.lang + '.html';
    }
    this.listUrl = function(obj) {
        var splist = '-';
        var urlParams = this.parseListUrl();
        urlParams.ps = this.getPs();
        var name = obj.name;
        //alert(typeof obj.ete);
        if (typeof obj.id != 'undefined') {
            urlParams[name] = obj.id;
        }
        if (typeof obj.val != 'undefined') {
            urlParams.input = encodeURIComponent( obj.val.replace(splist, '') );
        }
        this.url = this.assembleListUrl(urlParams);
    };
    this.actlistGoodsUrl = function(obj) {
        var cate = 0;
        var page = 1;
        if (typeof obj.isNav!='undefined' && obj.isNav==1){
            cate = 0;
            page = 1;
        } else {
            var url = window.location.href;
            var params = url.split('-');
            cate = params[2];
            page = params[3];
        }
        this.url = web_domain + 'actlist-goods-' + cate + '-' + page + '-' + this.lang + '-' + this.getPs() + '.html';
    };
    this.actlistUrl = function() {
        var lang = this.lang;
        var ps = this.getPs();
        this.url = web_domain + 'actlist-' + lang + '-' + ps + '.html';
    };
    this.productUrl = function(obj) {
        //this.url = web_domain+'product-' + obj.id+"-"+this.lang+"-"+this.getPs()+".html";
        this.url = web_domain + 'product-s' + _intoObj.getSubStationID() + '-' + obj.id + "-" + this.lang + ".html";
    };
    this.parseListUrl = function() {
        var hrefStr = window.location.href;
        var tmpHPage = hrefStr.split("/");
        var thisHPage = tmpHPage[ tmpHPage.length - 1 ];
        var result = null;
        var obj = {"cat": 0, "brand": 0, "special": 0, "input": "","origin":0,"price":0, "page": 0, "sort": 0, "other": 0, "substation": 0, "ps": '1,2,3,0', "lang": 'zh_cn'};
        //匹配全url
        if (result = thisHPage.match(/^list(?:-s\d)?-(\d+)-(\d+(?:,\d+)*)-(\d+(?:,\d+)*)-([^-]*)-([12],\d+|0)-(\d+(?:,\d+)*)-(\d+)-(\d+)-(\d+)-(\d+)-(\d+\,\d+\,\d+\,\d+)-(.*?).html/)) {
            obj.cat = result[1];
            obj.brand = result[2];
            obj.special = result[3];
            obj.input = result[4];
            obj.origin = result[5];
            obj.price = result[6];
            obj.page = result[7];
            obj.sort = result[8];
            obj.other = result[9];
            obj.substation = result[10];
            obj.ps = result[11];
            obj.lang = result[12];
            //匹配 分类+品牌+偏好筛选+搜索地址
        } else if (result = thisHPage.match(/^list(?:-s\d)?-(\d*)-(\d+(?:,\d+)*)-(\d+(?:,\d+)*)-([^-]*)-(\d+\,\d+\,\d+\,\d+)-(.*?)\.html/)) {
            obj.cat = result[1];
            obj.brand = result[2];
            obj.special = result[3];
            obj.input = result[4];
            obj.ps = result[5];
            obj.lang = result[6];
            //匹配 分类+品牌+偏好筛选地址
        } else if (result = thisHPage.match(/^list(?:-s\d)?-(\d*)-(\d+(?:,\d+)*)-(\d+(?:,\d+)*)-(\d+\,\d+\,\d+\,\d+)-(.*?)\.html/)) {
            obj.cat = result[1];
            obj.brand = result[2];
            obj.special = result[3];
            obj.ps = result[4];
            obj.lang = result[5];
            //匹配 分类+品牌地址
        } else if (result = thisHPage.match(/^list(?:-s\d)?-(\d*)-(\d+(?:,\d+)*)-(\d+\,\d+\,\d+\,\d+)-(.*?)\.html/)) {
            obj.cat = result[1];
            obj.brand = result[2];
            obj.ps = result[3];
            obj.lang = result[4];
        } else if (result = thisHPage.match(/^list(?:-s\d)?-(\d*)-(\d+\,\d+\,\d+\,\d+)-(.*?)\.html/)) {
            obj.cat = result[1];
            obj.ps = result[2];
            obj.lang = result[3];
        }
        return obj;
    }
    this.assembleListUrl = function(param) {
        // @var string 分类url模板
        var templateCategory = 'list-{station}-{cat}-{ps}-{lang}.html';
        //@var string 分类+品牌模板
        var templateBrand = 'list-{station}-{cat}-{brand}-{ps}-{lang}.html';
        //@var string 分类+品牌+偏好筛选
        var templateSpecial = 'list-{station}-{cat}-{brand}-{special}-{ps}-{lang}.html';
        //@var string 分类+品牌+偏好筛选+搜索
        var templateSearch = 'list-{station}-{cat}-{brand}-{special}-{input}-{ps}-{lang}.html';
        //@var string 完整url模板
        var templateFull = 'list-{station}-{cat}-{brand}-{special}-{input}-{origin}-{price}-{page}-{sort}-{other}-{substation}-{ps}-{lang}.html';
        var template = templateFull;
        if (param.page != 0 || param.sort != 0 || param.other != 0
         || param.substation != 0 || param.origin!=0 || param.price!=0 ) {
        } else if (param.input != '') {
            template = templateSearch;
        } else if (param.special != 0) {
            template = templateSpecial;
        } else if (param.brand != 0) {
            template = templateBrand;
        } else if (param.cat != 0) {
            template = templateCategory;
        }
        function replaceArray(obj, str) {
            for (i in obj) {
                str = str.replace('{' + i + '}', obj[i]);
            }
            return str;
        }
        var replaceParam = {"station":this.getStationStr(),"cat": 0, "brand": 0, "special": 0, "input": "", "origin":0, "price":0, "page": 0, "sort": 0, "other": 0, "substation": 0, "ps": '1,2,3,0', "lang": 'zh_cn'};
        'cat' in param        && (replaceParam.cat         = parseInt(param.cat)||0 );
        'brand' in param      && (replaceParam.brand       = param.brand );
        'special' in param    && (replaceParam.special     = param.special );
        'input' in param      && (replaceParam.input       = param.input );
        'origin' in param     && (replaceParam.origin      = param.origin );
        'price' in param      && (replaceParam.price       = param.price );
        'page' in param       && (replaceParam.page        = parseInt(param.page)||0 );
        'sort' in param       && (replaceParam.sort        = parseInt(param.sort)||0 );
        'other' in param      && (replaceParam.other       = parseInt(param.other)||0 );
        'substation' in param && (replaceParam.substation  = parseInt(param.substation)||0 );
        'ps' in param         && (replaceParam.ps          = param.ps);
        'lang' in param       && (replaceParam.lang        = param.lang);
        url = replaceArray(replaceParam, template);
        return web_domain + url;
    }

    this.tuangouUrl = function() {
        var stationID = _intoObj.getSubStationID();

        if (stationID == 1 || stationID == '')
            this.url = 'index.html';
        else
            this.url = 'index_' + stationID + '.html';
    }
};

var getShowPriceName = function(promotionType, disFlag) {
    var priceName = tx[106];
    if (promotionType == '1') {
        return tx[107];
    }
    if (disFlag == '0' && buyerInfo.BUYER_TYPE == '11')
        priceName = tx[108];
    if (disFlag == '0' && buyerInfo.BUYER_TYPE != null)
        priceName = tx[109];
    return priceName;
}
var getShowPrice4Detail = function(promotionType, dealPrice, vipPrice) {
    var jsonVipPrice = $.parseJSON(vipPrice);
    var price = dealPrice;
    if (promotionType == '1') {
        return price;
    }
    var levelId;
    if (jsonVipPrice) {
        for (i = 0; i < jsonVipPrice.length; i++) {
            levelId = jsonVipPrice[i].buyerLevelId;
            if (levelId == buyerInfo.BUYER_TYPE) {
                price = jsonVipPrice[i].goodsPrice;
            }
        }
    }
    return price;
}

function showLogRegDiv(funName, closeId) {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: web_user_domain + "index.php?r=tBuyer/quickLog&callback=?",
        timeout: 10000,
        success: function(data) {
            $("body").append('<div id="easysss" style="width:100%;height:100%; position:absolute;left:0;top:0;z-index:2147483647">' + '</div>');
            $("#easysss").html(data);
            //增加js start
            
            var top=0;                        
            $("#needstrs").css('margin-top','0px');
            $("#needstrs").css('padding-top','0px');
            if( $(window).height() - $("#needstrs").height() >20 )
            {
                top= (  $(window).height() - $("#needstrs").height() )/2 -20;                                 
                $("#needstrs").css('position',"fixed");
            }   
            else
            {
                top=( $(window).height() / 2 ) + $(window).scrollTop() - ($("#easysss").height() / 2);
               if( top <20 ) top=20;
               $("#needstrs").css('position', "inherit");

            }
            $("#needstrs").css('top',top+'px');
             //增加js end
            $("#function_name").val(funName);
            $("#close_id").val(closeId);
            if($.cookies.get('u').split('|')[2] != '')
            $("#email").val($.cookies.get('u').split('|')[2]);

        }
    });
}

function checkTime(funName,closeId) {
    var cookie_scope = '11101';
    if (language == 'en')
        cookie_scope = '21101';
    $.ajax({
        type: "GET",
        url: web_sapi_domain + 'authorize/MainServlet?method=verifySession&req_fmt_type=jsonp&auth_type=1&cookie_scope=' + cookie_scope + '&check_level=2',
        timeout: 5000,
        dataType: "jsonp",
        jsonp: 'callback',
        //jsonpCallback:'jsonp_back('+funName+')',
        success: function(data) {
            var res = data.Result.Header.resultID;
            var msg = data.Result.Header.resultMessage;
            if (res == 0)
            {
                eval(funName + "()");
                //showLogRegDiv(funName);
            }
            else
            {
                if (res == 100200){
                    showLogRegDiv(funName, closeId);
                }

            }
        }
    });
}

function checkTime3(funName,closeId) {
    if(closeId == 'commitOrder'){
        $('#order-loading').hide();
    }
    var cookie_scope = '11101';
    if (language == 'en')
        cookie_scope = '21101';
    $.ajax({
        type: "GET",
        url: web_sapi_domain  + 'authorize/MainServlet?method=verifySession&req_fmt_type=jsonp&auth_type=1&cookie_scope=' + cookie_scope + '&check_level=3',
        timeout: 5000,
        dataType: "jsonp",
        jsonp: 'callback',
        //jsonpCallback:'jsonp_back('+funName+')',
        success: function(data) {
            var res = data.Result.Header.resultID;
            var msg = data.Result.Header.resultMessage;
            if (res == 0)
            {
                eval(funName + "()");
                //showLogRegDiv(funName);
            }
            else
            {
                if (res == 100200){
                    showLogRegDiv(funName, closeId);
                }

            }
        }
    });
}

function checkTime3WeChatPay(funName,closeId,callBackFunName) {
    if(closeId == 'commitOrder'){
        $('#order-loading').hide();
    }
    var cookie_scope = '11101';
    if (language == 'en')
        cookie_scope = '21101';
    $.ajax({
        type: "GET",
        url: web_sapi_domain  + 'authorize/MainServlet?method=verifySession&req_fmt_type=jsonp&auth_type=1&cookie_scope=' + cookie_scope + '&check_level=3',
        timeout: 5000,
        dataType: "jsonp",
        jsonp: 'callback',
        success: function(data) {
            var res = data.Result.Header.resultID;
            var msg = data.Result.Header.resultMessage;
            if (res == 0)
            {
                eval(funName + "()");
            }
            else
            {
                if (res == 100200){
                    window.clearInterval(weChat2dOrder.checkTime);
                    showLogRegDiv(callBackFunName, closeId);
                }
            }
        }
    });
}


/*
 * ajax即时获取价格和库存
 * @param  ids 传入的ids  array
 * @param  scope          string  当前网站的scope
 * @param pageCallback    function 页面的处理回调函数
 * 回调函数:pageCallback(goodsList)    goodsList以key为键,商品信息为值的map:例 ["1":{"goodsID":1,"theOriginalPrice":1,"promotionPrice":1,"priceType":1,"maxNum":"1"}]
 * 注意回调函数可能是多次回调.回调处理需注意
 */
var goodsPriceAndStockUpdate = function(ids,scope,pageCallback){
    //ids处理
    for(var i=0;i<ids.length;i+=32){
        var goodsIdArr = ids.slice(i,i+32);
        ajaxGetGoodsPriceAndStock(scope,goodsIdArr,pageCallback);
    }
}
/*
 * @param {string} scope
 * @param {array} goodsIdArr
 * @param {funcion} pageCallback
 * @returns {undefined}
 */
var ajaxGetGoodsPriceAndStock =function(scope,goodsIdArr,pageCallback){
    var goodsIdObj = new Array();
    var reArr      = new Object();
    $.each(goodsIdArr,function(j,n){
        goodsIdObj[j] = {"goodsID":n};
        reArr[n]      = null;
    })
    $.ajax({
        type: "get",
        url : web_sapi_domain + 'shopping/MainServlet?method=getGoodsPriceAndStockInfo&req_fmt_type=jsonp',
        data: 'req_str=' + JSON.stringify( {"scope":scope,"goodsList":goodsIdObj} ),
        timeout: 5000,
        dataType: "jsonp",
        success: function(result){
            try{
                var code      = result.Result.Header.resultID;
                var goodsInfo = result.Result.Data.goodsInfo;
            }catch(e){
                code = -1;
                goodsInfo = null;
            }
            if( code==0&&goodsInfo!=null&&goodsInfo.length>0 ){
                //组装 reArr
                for( var i=0;i<goodsInfo.length;i++){
                    if( reArr[ goodsInfo[i]['goodsID'] ]!==undefined ){
                        reArr[ goodsInfo[i]['goodsID'] ] = goodsInfo[i];
                    }
                }
            }
            pageCallback( reArr );
        },
        error:function(){
            //加载失败
            pageCallback( reArr );
        }
    })
}

/*
 function jsonp_back(funName)
 {
 alert(funName);
 alert(json);
 var result=false;
 var res = json.Result.Header.resultID;
 var msg = json.Result.Header.resultMessage;
 if(res != 0)
 {
 if(res == 100200)
 showLogRegDiv();
 }
 else
 {
 result = true;
 }
 return result;
 }
 */


var wapLocationApp = function(){
    this.userClientType;           //用户客户端
    this.userSelectedClientType;   //用户选择的客户端类型
    this.currentDomainType;        //当前网站类型

    var URL_TYPE_INDEX  = 1;
    var URL_TYPE_DETAIL = 2;
    var URL_TYPE_LIST   = 3;
    this.init = function(){
        this.userClientType         = this.getUserClientType();
        this.userSelectedClientType = this.getUserSelectedClientType();
        this.currentDomainType      = this.getCurrentDomainType();
        if( language==="zh_cn" && this.userClientType!=='pc'&& this.currentDomainType==='pc' && this.userSelectedClientType!=='pc' ){
            //手机客户端访问pc端网站 并且选择的是wap站
            var url_type = this.getCurrentUrlType();
            if( url_type===URL_TYPE_INDEX ){
                window.location.href = web_domain+"sale/wap.html?t="+this.userClientType;
            }else if( url_type===URL_TYPE_DETAIL|| url_type===URL_TYPE_LIST ){
//                console.log( this.getUrlByType("wap") );
                window.location.href = this.getUrlByType("wap");
            }
        }else if( language==="zh_cn" && this.userClientType!=='pc' && this.currentDomainType==='pc' && this.userSelectedClientType==='pc' ){
            if( this.getCurrentUrlType()>0 ){
                var self = this;
                $("document").ready(function(){
                    $(".tcoot_count ul").append('<li>你的浏览器更适合浏览触屏版&nbsp;&nbsp;<a style="text-decoration:underline" onclick="wapLocationObj.setUserSelectedClientType(\'wap\');window.location.href=wapLocationObj.getCurrentWapUrl();" href="javascript:void(0);">沱沱工社触屏版</a></li>');
                });
            }
        }
    }

    this.setUserClientType = function(){
        var browser={
            versions:function(){
                var a=navigator.userAgent;
                return{
                    mobile:!!a.match(/AppleWebKit.*Mobile.*/),
                    ios:!!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    android:-1<a.indexOf("Android")||-1<a.indexOf("Linux"),
                    iPhone:-1<a.indexOf("iPhone"),
                    iPad:-1<a.indexOf("iPad"),
                    webApp:-1==a.indexOf("Safari")
                }
            }()
        };
        if(browser.versions.iPhone || browser.versions.iPad ){
            this.userClientType = 'ios';
        }else if( browser.versions.mobile||browser.versions.android){
            this.userClientType = 'android';
        }else{
            this.userClientType =  'pc';
        }
    }
    //通过浏览器获取用户客户端
    this.getUserClientType = function(){
        if( typeof this.userClientType==="undefined" ){
            this.setUserClientType();
        }
        return this.userClientType;
    }

    //获取用户所选择的客户端类型  没有cookie则默认为用户选择浏览器客户端
    this.getUserSelectedClientType = function(){
        if( typeof this.userSelectedClientType==="undefined" ){
            var userSelectedClientType = $.cookies.get('selectedClient');
            if( typeof userSelectedClientType=='undefined' || !userSelectedClientType || userSelectedClientType=='undefined' ){
                this.setUserSelectedClientType( this.getUserClientType() );
            }else{
                this.setUserSelectedClientType( userSelectedClientType );
            }
        }
        return this.userSelectedClientType;
    }

    this.setUserSelectedClientType = function( type ){
        cookieConfig('selectedClient', type, 0.5);
        this.userSelectedClientType = type;
    }

    //判断是否需要进行跳转的url 首页,详情页,列表页需要进行跳转
    this.getCurrentUrlType = function(){
        var currentPath = window.location.pathname;
        if( /^\/($|index\.html|index-)/.test(currentPath) ){
            return URL_TYPE_INDEX;
        }else if( /^\/list-/.test(currentPath) ){
            return URL_TYPE_LIST;
        }else if( /^\/product-/.test(currentPath) ){
            return URL_TYPE_DETAIL;
        }
        return 0;
    }

    //获取用户当前的域名类型
    this.getCurrentDomainType = function(){
        var currentHost = window.location.host;
        if( currentHost===web_wap_domain.replace("http://","").replace("/","") ){
            return 'wap';
        }else{
            return "pc";
        }
    }

    /*
     * 获取wap和网站对应的url
     * @param {string} type   可以取值 wap 和 pc
     * @returns 如果是详情列表页首页,则返回相对应的wap或网站url,否则返回首页url;
     */
    this.getUrlByType = function(type){
        var currentUrl     = window.location.href;
        var currentUrlType = this.getCurrentUrlType();
        if( currentUrlType===URL_TYPE_INDEX ){
            return type==="wap" ? web_wap_domain : web_domain;
        }else if( currentUrlType===URL_TYPE_DETAIL){
            return type==="wap" ? currentUrl.replace(web_domain,web_wap_domain) : currentUrl.replace(web_wap_domain,web_domain);
        }else if( currentUrlType===URL_TYPE_LIST){
            return type==="wap" ? currentUrl.replace(web_domain,web_wap_domain) : currentUrl.replace(web_wap_domain,web_domain);
        }else{
            return type==="wap" ? web_wap_domain : web_domain;
        }
    }

    //获取当前网站url对应的wap站url
    this.getCurrentWapUrl = function(){
        var currentUrl     = window.location.href;
        if( this.getCurrentDomainType()==='wap' ){
            return currentUrl;
        }else{
            return this.getUrlByType("wap");
        }
    }

    this.getCurrentPcUrl = function(){
        var currentUrl     = window.location.href;
        if( this.getCurrentDomainType()==='pc' ){
            return currentUrl;
        }else{
            return this.getUrlByType("pc");
        }
    }
}
var wapLocationObj = new wapLocationApp;
wapLocationObj.init();

/**
 * 搜索词联想推荐
 */
$(document).ready(function(){
	if (language!=='en') {
		var suggCallVersion = 0; //版本控制是否当前最后一次ajax
		var suggTimeout = 0; // 用于减少ajax数
		var callSugg = function(prefix){
			var version = ++suggCallVersion;
			$.ajax({
				type: "GET",
				url: web_domain + 'index.php?r=tSugg/get&prefix=' + prefix,
				timeout: 15000,
				dataType: "jsonp",
				jsonp: 'callback',
				success: function(data) {
					if (version === suggCallVersion) {
						$(".tsearch_count").find(".shelper").remove();
						if (data.code===200) {
							$(".tsearch_count").prepend(data.info);
							$(".shelper").mouseleave(function(){
								$(this).remove();
                });
            }
        }
    }
			});
        };

		$("#search_input").keyup(function(event){
				var specialKeys = [38,40,37,39,13,27];
				if ($.inArray(event.which, specialKeys)===-1) {
						clearTimeout(suggTimeout);
						var prefix = $(this).val();
						suggTimeout = setTimeout(function(){callSugg(prefix);}, 300);
            }
		});

		var suggCursor = {
				goUp: function(){
						if ($(".sugg_row").length === 0) { //长度为0
								return;
						} else if ($(".sugg_row").length === 1) { //长度为1
								this.goto(0);
								return;
						} else { //长度大于1
								var isCurrExists = $(".shelper_glide").length > 0;
								if (!isCurrExists) { //初始情况，没有任何一个高亮
										this.goto( $(".sugg_row").length-1 );
										return;
								} else if ($(".sugg_row").index($(".shelper_glide"))===0) {
										this.goto( $(".sugg_row").length-1 ); //临界情况，从第一个回到最后一个
										return;
								} else {
										this.goto( $(".sugg_row").index($(".shelper_glide"))-1 ); //一般情况，向上一格
										return;
    }
        }
				},

				goDown: function(){
						if ($(".sugg_row").length === 0) { //长度为0
								return;
						} else if ($(".sugg_row").length === 1) { //长度为1
								this.goto(0);
								return;
						} else { //长度大于1
								var isCurrExists = $(".shelper_glide").length > 0;
								if (!isCurrExists) { //初始情况，没有任何一个高亮
										this.goto( 0 );
										return;
								} else if ( $(".sugg_row").index($(".shelper_glide")) === ($(".sugg_row").length-1) ) {
										this.goto( 0 ); //临界情况，从第一个回到最后一个
										return;
								} else {
										this.goto( $(".sugg_row").index($(".shelper_glide"))+1 ); //一般情况，向上一格
										return;
        }
    }
				},
				goto: function(index){
						$(".sugg_row").removeClass('shelper_glide');
						$(".sugg_row").eq(index).addClass('shelper_glide');
						var suggWord = $(".shelper_glide").attr('sugg_wd');
						$("#search_input").val(suggWord);
				},
				close: function(){
						$(".shelper").remove();
				},
				select: function(){
						if ($(".shelper_glide").length > 0) {
								$(".shelper_glide").click();
						} else {
								sch($("#search_input").val());
        }
    }

        }


		$("#search_input").keydown(function(event){
				switch(event.which){
					case 38:
						suggCursor.goUp();
						break;
					case 40:
						suggCursor.goDown();
						break;
					case 13:
						suggCursor.select();
						break;
					case 27:
						suggCursor.close();
						break;
					default:
						break;
        }
		});
    }
});
//这个是兑换券相关的逻辑
var Voucher = function(){
    this.vCode = '';//获取该兑换券的所有商品
    //获取我的所有兑换券列表
    this.getAllVoucherList = function(_call){
        var url = web_sapi_domain + 'shopping/MainServlet?method=queryMyVoucher&req_fmt_type=jsonp&req_str=' + this.getParamForMyVoucher();
        $.ajax({
            url:url,
            type:'GET',
            async:false,
            dataType:'jsonp',
            jsonp: 'callback',
            success:function(res){
                if(res.Result.Header && res.Result.Header.resultID == 0 && res.Result.Data){
                    var data = res.Result.Data;
                    _call(data);
                }else if(res.Result.Header && res.Result.Header.resultID == 170000){
                    //View.updateCheckBoxStatus(true);
                    $('#exchange_voucher_checked_input').attr('checked', false).attr('_show','0');
                    $('#exchange_voucher_div').hide();
                    showLogRegDiv();
                }else{
                    $("#cart_lock_screen").hide();
                    View.selectedExchangeVoucher();
                    View.showVoucherErrorInfo("<font style='color:red'>" + res.Result.Header.resultMessage + '</font>');
                }
            },
            error:function(){
                $("#cart_lock_screen").hide();
            }
    });
    }
    //根据兑换券获取商品列表
    this.getAllGoodsListByCode = function(_call){
        var url = web_sapi_domain + 'shopping/MainServlet?method=getVolumeGoods&req_fmt_type=jsonp&req_str=' + this.getParamForVoucherGoods();
        $.ajax({
            url:url,
            type:'GET',
            async:false,
            dataType:'jsonp',
            jsonp: 'callback',
            success:function(res){
                if(res.Result.Header && res.Result.Header.resultID == 0 && res.Result.Data){
                    var data = res.Result.Data;
                    _call(data);
                }else if(res.Result.Header && res.Result.Header.resultID == 170000){
                    //View.updateCheckBoxStatus(true);
                    $('#exchange_voucher_checked_input').attr('checked', false).attr('_show','0');
                    $('#exchange_voucher_div').hide();
                    showLogRegDiv();
                }else{
                    $("#cart_lock_screen").hide();
                    var voucher_error_msg = "<font style='color:red'>" + res.Result.Header.resultMessage + '</font>';
                    if(res.Result.Header && res.Result.Header.resultID == 164111){
                        voucher_error_msg += '&nbsp;&nbsp;<a href="' + web_user_domain + 'index.php?r=tBuyer/toBindMobile" class="sblue" target="_blank">去绑定手机号>></a></div>';
                    }
                    View.showVoucherErrorInfo(voucher_error_msg);
                }
            },
            error:function(){
                $("#cart_lock_screen").hide();
            }
        });
    };
    this.setVCodeValue = function(vCode){
        this.vCode = vCode;
    }
    //获取我的优惠券列表的参数
    this.getParamForMyVoucher = function(){
        var voucher = {};
            voucher.pageNo = 1;
            voucher.pageSize = 99;
            voucher.voucherStatus = '2';
            voucher.scope = this.getScope();
        return JSON.stringify(voucher);
    };
    //获取优惠券对应的商品信息
    this.getParamForVoucherGoods = function(){
        if(this.vCode){
            var voucher = {};
                voucher.voucherSn = this.vCode;
                voucher.addressId = this.getGeoID();
                voucher.subStationId = this.getSubStationID();
                voucher.scope = this.getScope();
            return JSON.stringify(voucher);      
        }
    };
    //获取购物车中兑换券信息
    this.getVoucherInfoFromCookie = function(){
        return $.cookies.get(Voucher.voucherCartCookieName);
    }
    //获取scope
    this.getScope = function(){
        return '11101';
    }
    //获取地址的末级节点
    this.getGeoID = function(){
        var geoID = 0;
        var addressID = _intoObj.getGeos();
        if(addressID[9]){
            geoID = addressID[9];
        }else{
            geoID = addressID[6];
        }
        return parseInt(geoID);
    }
    //获取分站ID
    this.getSubStationID = function(){
        return _intoObj.getSubStationID();
    }
}
//丰灵统计
$(function(){
    
    //菜单
    $("#nav .tnav_list li").each(function(i){
        var txt= $(this).find("a").eq(0).text();
        var fcode="N"+ ( '0000' + ( parseInt(i)+1 ) ).slice(-2) + "_topNav_"+txt;
        var scode="N"+ ( '0000' + ( parseInt(i)+1 ) ).slice(-2)+"A01_"+txt;
        var tcode="N"+ ( '0000' + ( parseInt(i)+1 ) ).slice(-2)+"A01L01_"+txt;
        $(this).find("a").click(function(){
             window._vaq= window._vaq || [];
             _vaq.push(['trackEvent', fcode, scode, tcode, 0,{'ttad_pos':'navigation','tp':3}]);      
        });
    });
    
    //一级分类
    $("#hideindex .tall_menu_list li").each(function(i){
            var obj= this;
            var txt= $(this).find("span a").eq(0).text();
            var fcode="C"+ ( '0000' + ( parseInt(i)+1 ) ).slice(-2) + "_topCategory_"+txt;
            
            $(this).find("span a").click(function(){ 
                var scode="C"+ ( '0000' + ( parseInt(i)+1 ) ).slice(-2)+"A01_"+txt;
                var tcode="C"+ ( '0000' + ( parseInt(i)+1 ) ).slice(-2)+"A01L01_"+txt;
                 window._vaq= window._vaq || [];
                _vaq.push(['trackEvent', fcode, scode, tcode, 0,{'ttad_pos':'category','tp':4}]);                
            });
            //二级分类
            $(this).find(".menu_count a").each(function(){
                var cat=$(this).attr("cat");
                var stxt=$(this).text();
                var aobj= $("#hideindex .tall_menu_count").eq(i).find(".span_left a[cat='"+ cat +"']").eq(0);
                var si= $(aobj).closest(".tall_menu_clist").find("li").index( $(aobj).closest("li") );
                var scode="C"+ ( '0000' + ( parseInt(i)+1 )  ).slice(-2)+"A"+  ( '0000' + ( parseInt(si)+1 )  ).slice(-2)  +"_"+stxt;   
                var tcode="C"+ ( '0000' + ( parseInt(i)+1 )  ).slice(-2)+"A"+  ( '0000' + ( parseInt(si)+1 )  ).slice(-2)  +"L01_"+stxt;   
                $(this).click(function(){ 
                    window._vaq= window._vaq || [];
                    _vaq.push(['trackEvent', fcode, scode, tcode, 0,{'ttad_pos':'category','tp':4}]);      
                });
            });
    });
   
   
    $("#hideindex .tall_menu_count").each(function(fi){       
         $(this).find("li").each(function(si){
             
             var ftxt=$("#hideindex .tall_menu_list li").eq(fi).find("span a").eq(0).text();
             var fcode="C"+ ( '0000' +  ( parseInt(fi)+1 ) ).slice(-2) + "_topCategory_"+ftxt;
             var stxt= $(this).find(".span_left a").text();
             var scode="C"+ ( '0000' + ( parseInt(fi)+1 )  ).slice(-2)+"A"+  ( '0000' + ( parseInt(si)+1 )  ).slice(-2)  +"_"+stxt;           
            //二级分类
             $(this).find(".span_left a").click(function(){
                  var tcode="C"+ ( '0000' + ( parseInt(fi)+1 )  ).slice(-2)+"A"+  ( '0000' + ( parseInt(si)+1 )  ).slice(-2)  +"L01_"+stxt;
                  window._vaq= window._vaq || [];
                  _vaq.push(['trackEvent', fcode, scode, tcode, 0,{'ttad_pos':'category','tp':4}]);
                
             });
            
             //三级分类
             $(this).find(".span_right a").each(function(ti){
                 var ttxt=$(this).text();
                 var tcode="C"+ ( '0000' + ( parseInt(fi)+1 )  ).slice(-2)+"A"+  ( '0000' + ( parseInt(si)+1 )  ).slice(-2)  +"L"+ ( '0000' + ( parseInt(ti)+1 )  ).slice(-2) +"_"+ttxt; 
                  $(this).click(function(){
                      window._vaq= window._vaq || [];
                      _vaq.push(['trackEvent', fcode, scode, tcode, 0,{'ttad_pos':'category','tp':4}]);
                  });
                 
             });
             
         });
 
         
    });
    
    
});
