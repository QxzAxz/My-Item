require(['jquery','url','vendor/jquery.jqzoom','user','geos','wx','wx.config','cn/js/loginPop','lang','wx.tpl','original/review','wx.countdown'], function($,Url,Zoom,User,Geos,WX,Config,Login,Lang,Tpl,Review) {
    $(init);
    function init(){
        zoom();
    };
    var Presenter = {
        
        init: function(goods){
            if(!goods)
                return false;
            Model.goods = goods;
            Presenter.reloadGoodsInfo();
            View.bindEventHandle();
            Presenter.checkJumpOtherStation();
            Model.getGoodsHistory();
            Presenter.setShareInfo();
            View.navTop = $(View.dom.detailNav).offset().top - ($(View.dom.ttop).height()) + 248;
            View.windowScroll(); 
            
            var ps = WX.cookie('ps');
            var stationID = Geos.getSubStationID();
            if((ps != null && ps.substr(-1,1) == '-') || stationID == ''){
                WX.cookie('ps','');
                WX.cookie('geos','');
            }
            
        },
        
        /**
         *  重新加载商品信息 
         */
        reloadGoodsInfo : function(){
            $(View.dom.loading).show();
            $(View.dom.amountDiv + ',' + View.dom.buyButton + ',' + View.dom.loadFail).hide();
            Model.getGoodsInfo(function(data){
                //成功
                Model.goods = data.Result.Data;
                $(View.dom.loading).hide();
                View.setGoodsInfo();
                View.buyAmountInit();
                View.showGoodsPrice();
                View.showDeliver();
                View.setMultipleAttr();
                View.setPromotionInfo();
                View.showBuyButton();
                Model.setThird();
            },function(){
                //失败
                $(View.dom.loading).hide();
                $(View.dom.loadFail).show();
            });
        },
        
        /**
         * 如果用户分站和当前商品分站不一致，
         * 且用户分站下的销售商品上架且展现时跳转至对应的商品页
         */
        checkJumpOtherStation : function(){
            var userSubstationID = Geos.getSubStationID();
            if(Model.goods.goodsInfo.extendsInfo.jumpSubstationList && userSubstationID != Model.goods.goodsInfo.substationID){
                var otherGoodsID = Model.goods.goodsInfo.extendsInfo.jumpSubstationList[userSubstationID];
                if(otherGoodsID){
                    var goodsUrl = Url.get({name:'product',id:otherGoodsID});
                    $(View.dom.jumpStationTip).show().find(View.dom.jumpA).attr('href', goodsUrl); 
                    setTimeout(function(){
                        location.href = goodsUrl;
                    },1500);
                }
            }
        },
        
        /**
         * 设置分享内容
         */
        setShareInfo : function(){
            loadJs('http://static.bshare.cn/b/buttonLite.js#uuid=&style=-1',function(){
                loadJs('http://static.bshare.cn/b/bshareC1.js',function(){});
                var shareCont = View.getMessInfo('shareLeft') + Model.goods.goodsInfo.goodsTitle + View.getMessInfo('shareRight');
                bShare.addEntry({
                    title: Model.goods.goodsInfo.goodsTitle,
                    url: window.location.href,
                    summary: shareCont,
                    pic: Model.goods.goodsInfo.picInfo.picPaths[0].dealPic.PIC400
                });
            });
        },
        
        //地址回调
        detailPsCallback : function(provId, cityId, distId,areaId,gid,canSend,canBuy){
            Geos.set(provId, cityId, distId,areaId);
            View.showBuyButton(canSend,canBuy);
        }
    }
    
    var Model = {
        goods: {},
        
        /**
         * 获取商品信息
         */
        getGoodsInfo : function(successCallback, errorCallback, goodsID){
            goodsID = !goodsID ? Model.goods.goodsInfo.goodsID : goodsID;
            WX.sendData(Config.url.web + 'index.php?r=tGoods/minidetail', {throttle:false,data:{gid:goodsID}}).success(function(data){
                successCallback(data);
            }).fail(function(data){
                errorCallback(data);
            }).error(function(data){
                errorCallback(data);
            });
        },
        
        /**
         * 获取跨站销售的其它分站
         */
        getOtherSubstations : function(){
            var substations = {};
            for(k in Model.goods.goodsInfo.extendsInfo.otherSubstations){
                substations[Model.goods.goodsInfo.extendsInfo.otherSubstations[k].substationID] = Model.goods.goodsInfo.extendsInfo.otherSubstations[k].substationName;
            }
            return substations;
        },
        
        /**
         * 获取会员价
         */
        getVipPrice : function(){
            if(!Model.goods.goodsInfo.priceInfo.vipPrice) return false;
            var vipPrice = '';
            for(k in Model.goods.goodsInfo.priceInfo.vipPrice){
                if(Model.goods.goodsInfo.priceInfo.vipPrice[k].buyerLevelId == User.BUYER_TYPE){
                    vipPrice = Model.goods.goodsInfo.priceInfo.vipPrice[k].goodsPrice;
                    break;
                }
            }
            return vipPrice;
        },
        
        //收藏
        favorite : function(){
            if(!User.hasLogin()){
                Login('login',function(){Model.favorite();});
                return false;
            }
            $.get("/index.php?r=tFavorite/new", {goods_id: Model.goods.goodsInfo.goodsID}, function(ret) {
                var mess = '';
                var succ = false;
                if (ret == 1) {
                    Login('login',function(){Model.favorite();});
                    return false;
                }else if (ret == 2) {
                    mess = View.getMessInfo('itemDeleted');
                }else if (ret == 3) {
                    mess = View.getMessInfo('alreadyCollected');
                }else if (ret == 4) {
                    mess = View.getMessInfo('collectSucc');
                    succ = true;
                }else {
                    mess = View.getMessInfo('collectErr');
                }
                if(succ || ret == 3){
                    $(View.dom.favoriteInfo).show();
                    $(View.dom.favoriteMess).text(mess);
                    $(View.dom.favoriteMess).siblings("b").hide();
                    if(succ){
                        $(View.dom.favoriteMess).siblings("b").show();
                        $(View.dom.favorites).text(parseInt($(View.dom.favorites).text()) + 1);
                        if(typeof _BFD.AddFav != 'undefined')
                            _BFD.AddFav(Model.goods.goodsInfo.goodsID);
                    }
                }else{
                    WX.alert(mess);
                }
            });
        },
        
        //关闭收藏
        favoriteClose : function(){
            $(View.dom.favoriteInfo).hide();
        },

        //获取浏览历史 
        getGoodsHistory : function(){
            var data = {counter:'true',counter:'true',act:'gethistorylist',tpl_type:'html_v4',gid:Model.goods.goodsInfo.goodsID,isajax:1};
            $.ajax({
                url: Config.url.web + 'index.php?r=tGcounter/index',
                type: 'GET',
                data: data,
                dataType: 'json',
                success: function(res) {
                    if (res.errno == 0) {
                        $(View.dom.goodsHistory).html(res.content).show();
                    }
                },
                error: function() {
                }
            })
        },
        
        //设置第三方js
        setThird : function(){
            var cateAry1 = new Array();
            var cateAry2 = new Array();
            for(k in Model.goods.goodsInfo.saleCatInfo.pcate){
                var tAry = new Array();
                cateAry1.push(Model.goods.goodsInfo.saleCatInfo.pcate[k][1]);
                tAry.push(Model.goods.goodsInfo.saleCatInfo.pcate[k][1],Url.get({name:'cat',id:Model.goods.goodsInfo.saleCatInfo.pcate[k][0]}));
                cateAry2.push(tAry);
            }
           

            var isDel = false;
            if(Model.goods.goodsInfo.maxNum == 0 || Model.goods.goodsInfo.zoneVisbleFlag == 2 || Model.goods.goodsInfo.dealGoodsStatus != 6 || Model.goods.goodsInfo.visibleFlag != 1)
                isDel = true;
            //银行专享商品不做推荐
            if(Model.goods.goodsInfo.skuInfo.promotionID == 52130 || Model.goods.goodsInfo.skuInfo.promotionID == 55673)
                isDel = true;

            var gTags = new Array();
            if(Model.goods.goodsInfo.skuInfo.dealPromotionType == 1)
                gTags.push(View.getMessInfo('promotion'));
            if(Model.goods.goodsInfo.specialInfo.organicEcoert)
                gTags.push(View.getMessInfo('EU'));
            if(Model.goods.goodsInfo.specialInfo.youJi == 1)
                gTags.push(View.getMessInfo('organic'));
            if(Model.goods.goodsInfo.specialInfo.jinKou == 1)
                gTags.push(View.getMessInfo('imported'));
            if(Model.goods.goodsInfo.canReserve)
                gTags.push(View.getMessInfo('preOrder'));

           
            //<!--iDigger Tracking Codes-->

            var catIds = "";
            for(k in Model.goods.goodsInfo.saleCatInfo.pcate){
                catIds += "_";
                catIds += Model.goods.goodsInfo.saleCatInfo.pcate[k][0];
            }
            if(catIds)
                catIds.substr(1);

            var _wmmq = _wmmq || [];
            _wmmq.push( [ "db", "ifc" ] ,[ "sitecode", "T-000123-01" ]);
            _wmmq.push(["gid", Model.goods.goodsInfo.goodsID, 
            "gname", Model.goods.goodsInfo.goodsTitle, 
            "gcate", catIds, 
            "gprice", Model.goods.goodsInfo.skuInfo.dealPrice, //促销价.如果有促销价则为促销价，否则为原价
            "gimgurl", Model.goods.goodsInfo.picInfo.picPaths[0].picPath]);
            _wmmq.push( [ "_trackPoint" ] );

            var ays = document.createElement('script');
            ays.type = 'text/javascript'; ays.async = true;
            ays.src = ('https:' == document.location.prpotocol ? 'https://2' : 'http://1') + '.allyes.com.cn/aywmq.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ays, s);
            
             //<!--iDigger Tracking Codes-->

            //ema start 
            if(Model.goods.env != 'undefined' && Model.goods.env == 'pro'){
                if(Lang.isEn())
                    bfdclient = 'CPro_ttgs_en';
                else
                    bfdclient = 'CPro_ttgs';   
            }else{
                bfdclient = 'CTest_ttgs';           //暂时没有什么意义，百分点判断如果是test就不增加商品
            }
            
            window["_BFD"] = window["_BFD"] || {};
            _BFD.BFD_INFO = {
                    pid : Model.goods.goodsInfo.goodsID,                          //和百分点沟通的结果，值为商品id，即地址栏里的id   //同一商品不同规格，款式的父级ID，string类型；因为当前贵网站目前情况，建议pid和id传一样，如果以后有多个规格的需求，把pid换成正确的即可。
                    id : Model.goods.goodsInfo.skuID,                           //和百分点沟通的结果，值为规格id，即加入购物车用到的id  //这里需要获取的是您网站商品id号，string类型；
                    name : Model.goods.goodsInfo.goodsTitle,                      //当前商品的名称,string类型；
                    item_link : Url.get({name:'product',id:Model.goods.goodsInfo.goodsID}),// 当前商品的完整链接url，string类型 
                    small_image_link : Model.goods.goodsInfo.picInfo.picPaths[0].dealPic.PIC130,// 当前商品的小图片的完整链接url，string类型
                    big_image_link : Model.goods.goodsInfo.picInfo.picPaths[0].dealPic.PIC400,// 当前商品的大图片的完整链接url，string类型
                    market_price : 0,                                             //市场价，如果没有请为0
                    price : Model.goods.goodsInfo.skuInfo.theOriginalPrice,       //网站价；
                    dis_price : Model.goods.goodsInfo.skuInfo.dealPrice,          //促销价.如果有促销价则为促销价，否则为原价
                    //vip_price : Model.goods.skus[$goods.SKU_ID].goodsPrice.PRICE,//贵宾价,如果没有，请为0；如果分等级就去最高的价格
                    unit: Model.goods.goodsInfo.skuInfo.marketingUnit,            //价格单位
                    category_id : cateAry1,                                       //当前商品的类别名称，数组
                    category_tree : cateAry2,                                     // 当前商品的类别详细信息，第一个元素为类别名称，第二个元素为类别地址，2维数组；
                    brand : Model.goods.goodsInfo.brandName ? Model.goods.goodsInfo.brandName : '',                      //当前商品所属品牌名称；
                    tag : gTags,                                                  //商品标签
                    location : Model.goods.goodsInfo.substationName,              //分仓--站点
                    store : Model.goods.goodsInfo.maxNum,                         //当前商品的库存数,只有当所有规格都售完，此值才为0；
                    del : isDel,                                                  //判断商品是否在架，下架和无货都可以为true，在架为false，下架为true，布尔类型；//专享商品也为true
                    addcart:[Model.goods.goodsInfo.skuID,Model.goods.goodsInfo.skuInfo.minBuyNum,Model.goods.goodsInfo.skuInfo.dealCartMethod,Model.goods.goodsInfo.skuInfo.maxBuyNum],//依次是：规格id，最小购买数量，促销类型，最大购买数量。
                    user_id : (!User.BUYER_ID)?'':User.BUYER_ID,                  //当前用户的user_id，string类型。注意：user_id不是用户的真实注册名，而是其注册名的编号,如果匿名用户为0或者为空‘’；
                    language : Lang.get(),
                    ship_cat_id : Model.goods.goodsInfo.shipCatId,                //配送类别：1 本地鲜 2异地鲜 3常温
                    client : bfdclient                                            //百分点技术人员使用的帐号，请您不要修改这句代码！
            };
                _BFD.BFD_INFO.num = 5;//人气组合宽屏推荐5个商品，窄屏推荐4个
            _BFD.script = document.createElement("script");
            _BFD.script.type = 'text/javascript';
            _BFD.script.async = true;
            _BFD.script.charset = 'utf-8';
            if(Config.url.web == 'http://v3beta.tootoo.cn/' || Config.url.web == 'http://test3.tootoo.cn/')
                _BFD.script.src = (('https:' == document.location.protocol?'https://ssl-static1':'http://static1')+'.baifendian.com/service/tuotuogongshe/ttsq_goods_test.js');
            else
            _BFD.script.src = (('https:' == document.location.protocol?'https://ssl-static1':'http://static1')+'.baifendian.com/service/tuotuogongshe/ttsq_goods.js');
            
            document.getElementsByTagName("head")[0].appendChild(_BFD.script);
            //--mediav商品回传的代码 
            var _mvq = window._mvq || [];window._mvq = _mvq;
            _mvq.push(['$setGeneral', 'goodsdetail', '', '', '']);
            _mvq.push(['$logConversion']);
            _mvq.push(['$addGoods', '',  '',  Model.goods.goodsInfo.goodsTitle,
                Model.goods.goodsInfo.goodsID,Model.goods.goodsInfo.skuInfo.dealPrice,Model.goods.goodsInfo.picInfo.picPaths[0].dealPic.PIC400, '', '',  '',  '','','','']);
            _mvq.push(['$logData']);
            //--mediav商品回传的代码  结束
            //if (!(buyerInfo.BUYER_ID))    buyerInfo.init();
            _adwq = (typeof _adwq !== 'undefined') ? _adwq : []; 
            _adwq.push([ '_setDataType',
                'view'  
            ]);

            _adwq.push([ '_setCustomer',
               (!User.BUYER_ID)?'':User.BUYER_ID  
            ]);
            _adwq.push(['_setItem',
                Model.goods.goodsInfo.goodsID,   
                Model.goods.goodsInfo.goodsTitle,     
                Model.goods.goodsInfo.skuInfo.dealPrice,   
                '1']);
            _adwq.push([ '_trackTrans' ]);
            
            //<!-- Criteo代码 begin-->
            //<!--  Product page tag ---->
            var mobilePtn = /^1[0-9]{10}/;
            var emailPtn = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            var einfo = User.BUYER_EMAIL;
            window.criteo_q = window.criteo_q || [];
            window.criteo_q.push(  
                    { event: "setAccount", account: 21547 },
                    { event: "setEmail", email:(mobilePtn.test(einfo) || emailPtn.test(einfo))?einfo:""},//#MD5加密后的邮箱或者手机号码#
                    { event: "setSiteType", type: "d" },//#m for mobile or t for tablet or d for desktop#
                    { event: "viewItem", item: Model.goods.goodsInfo.goodsID }//#Your item id#
            );
            //<!-- Criteo代码 end-->    
            //<!--ema end-->
            
            /*-------- 数客营销代码begin-------*/
            if(Lang.isCn()){
                var sCateAry = [];
                for(var k in Model.goods.goodsInfo.saleCatInfo.pcate){
                    sCateAry.push(Model.goods.goodsInfo.saleCatInfo.pcate[k][1]);
                }
                window.product = {
                        identifier: Model.goods.goodsInfo.goodsID,                  // 产品ID
                        category: sCateAry,           //产品类别路径，需和类别页的路径一样
                        fn: Model.goods.goodsInfo.goodsTitle,                       // 产品名称
                        description: Model.goods.goodsInfo.goodsBrief?Model.goods.goodsInfo.goodsBrief:'',             // 产品叙述
                        brand: Model.goods.goodsInfo.brandName?Model.goods.goodsInfo.brandName:'',                     // 产品品牌
                        price: Model.goods.goodsInfo.skuInfo.dealPrice,             // 折扣价
                        amount: Model.goods.goodsInfo.skuInfo.theOriginalPrice,     // 原价/市场价
                        currency: 'CNY',    
                        url: Url.get({name:'product',id:Model.goods.goodsInfo.goodsID}),
                        photo: Model.goods.goodsInfo.picInfo.picPaths[0].dealPic.PICSOURCE,
                        valid: (Model.goods.goodsInfo.maxNum<=0)?Date.parse(new Date())/1000:'0'  
                        /*
                            如果产品预计于某日下架，请将valid设为产品下架日期的UNIX TIMESTAMP(in second)
                            如果产品已无库存，请将valid设为当日的UNIX TIMESTAMP(in second)
                            否则请将valid设成0
                        */
                };
                
                var s = document.createElement('script');
                var x = document.getElementsByTagName('script')[0];
                s.type = 'text/javascript';
                s.async = true;
                s.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'ap-sonar.sociomantic.com/js/2010-07-01/adpan/tootoo-cn';
                x.parentNode.insertBefore(s, x);
            }
            /*-------- 数客营销代码end-------*/
    
        }
        
    }
    
    var View = {
        navTop : 0,
        
        dom : {
            amountDiv : '#amountDiv',
            buyAmount : '#buy_amount',
            buyAmountAdd : '.choose-btns .btn-add',
            buyAmountSub : '.choose-btns .btn-reduce',
            goodsInfoTab : '#detailInfo_nav li',
            goodsInfoItem : '#detailInfo_list .detailInfo_item',
            proInfo : '#promotionInfo',
            proItem : '.pro-item',
            proMore : '.pro-more',
            proMoreA : '.more-curre',
            proMoreInfo : '.pro-more-info',
            jumpStationTip : '#jumpStationTip',
            jumpA : '.jumpA',
            changeDeliver : '#changeDeliver',
            changeDeliverCurr : '.third-c-cname',
            deliverLayer : '#deliverLayer',
            psInfo : '#psInfo',
            psTip : '#psTip',
            drdTip : '#drdTip',
            drdTipMsg : '.support-msg',
            rollReview : '.rollReview',
            toReview : '.toReview',
            buyButton : '.buyButton',
            buyButton2 : '.buyButton2',
            buyButton3 : '.buyButton3',
            loading : '#loading',
            loadFail : '#loadFail',
            priceInfo : '#priceInfo',
            priceName : '#priceName',
            price : '#price',
            price2 : '#price2',
            originalPrice : '#originalPrice',
            proDownTime : '#proDownTime',
            goodsTitle : '#goodsTitle',
            goodsBrief : '#goodsBrief',
            buyDiv : '#buyDiv',
            multipleAttr : '#multipleAttr',
            addShop : '.add_shop',
            icoItem : '.icoItem',
            icoMess : '.ico-show-msg',
            detailNav : '#detailNav',
            ttop : '.ttop',
            downApp : '.download-app-box a',
            downInfo : '.phone-eject',
            favorites : '#favorites',
            favorite : '#favorite',
            favoriteInfo : '#favoriteInfo',
            favoriteMess : '#favoriteMess',
            favoriteClose : '#favoriteClose',
            goodsHistory : '#goodsHistory',
            historyGoods : '.historyGoods',
            historyAddCar : '.historyAddCar',
            commentNav : '#comment_nav li',
            bfdTJ : '#bfdTJ',
            goodsInfoFloat : '.goodsInfoFloat',
            addShopBox : '.add-shop-box',
            special : '#special'
        },
        className : {
            buyAmountNo : 'btn-no',
            goodsInfoTabCurr : 'info-curr-red',
            proMoreInfoCurr : 'curr-info',
            changeDeliverCurr : 'curr-third-cname',
            detailNavFloat : 'detail_xq_float',
            downCurr : 'download-app-curr',
            addCartDisabled : 'shop-btn-no',
            commentCurr : 'trig-item',
            JsAddCart : 'Js-addCart'    
        },
        messCN : {
            addCart : '加入购物车',
            offLine : '商品已下架',
            refilling : '正在补货',
            undelivered : '无法送达',
            specialBuyer : '专享会员才可以购买！',
            price : '沱<span class="twoword"></span>沱<span class="twoword"></span>价',
            ProPrice : '优<span class="twoword"></span>惠<span class="twoword"></span>价',
            specialPrice : '专<span class="twoword"></span>享<span class="twoword"></span>价',
            vipPrice : '贵<span class="twoword"></span>宾<span class="twoword"></span>价',
            remaining : '剩余',
            day : '天',
            hour : '小时',
            minute : '分',
            second : '秒',
            specialGoods : '温馨提示：此商品为特例商品，不能使用优惠券',
            checkDetail : '查看详细',
            select : '选择',
            proInfo : '促销信息',
            checkInfo : '查看详情',
            morePre : '更多',
            buyNumSection : '购买数量区间',
            stairPrice : '阶梯价',
            spare : '可节省',
            moreProInfo : '更多优惠信息',
            itemDeleted : '商品已被删除！',
            alreadyCollected : '您已经收藏过此商品！',
            collectSucc : '恭喜您收藏成功！',
            collectErr : '收藏出现异常！',
            shareLeft : '我在@沱沱工社 发现了一个很好的商品[',
            shareRight : ']挺不错的，推荐给你试试~~~',
            promotion : '促销',
            EU : '欧盟认证',
            organic : '有机',
            imported : '进口',
            preOrder : '预定'
        },
        messEN : {
            addCart : 'Add to cart',
            offLine : 'Sold out',
            refilling : 'Refilling',
            undelivered : 'Undelivered',
            specialBuyer : '专享会员才可以购买！',
            price : 'price',
            ProPrice : 'Special',
            specialPrice : 'price',
            vipPrice : 'vip price',
            remaining : 'Remaining',
            day : 'Day',
            hour : 'Hour',
            minute : 'Minute',
            second : 'Second',
            specialGoods : 'Notice: This is a special product and it is not available for using coupons.',
            checkDetail : 'Check in details',
            select : 'Select',
            proInfo : 'Promotional information',
            checkInfo : 'Details',
            morePre : 'More',
            buyNumSection : 'Quantity delivered',
            stairPrice : 'Ladder pricing',
            spare : 'Savings',
            moreProInfo : '更多优惠信息',
            itemDeleted : 'The item has been deleted!',
            alreadyCollected : 'You have already collected this item to your wishlist!',
            collectSucc : 'Successfully add to your wishlist!',
            collectErr : 'There is an error when collecting product to the wishlist!',
            shareLeft : 'I found a great choice at TooToo Farm[',
            shareRight : ']It is excellent. Go for a try~',
            promotion : 'Promotion',
            EU : 'EU certification',
            organic : 'Organic',
            imported : 'Imported',
            preOrder : 'Pre-order'
        },
        tpl : {
            preOrderInfoTip : '<span class="support" id="preOrderInfoTip"><s></s><%preOrderInfo%></span>',
            benefitScope : '<p class="prompt-item"><%tip%><a href="<%web%>help/cjwt.html" target="_blank"><%link%></a></p>',
            deliver :  '<%if (otherSubstationGoodsID.length == 0){%>\
                            <div class="third-party-cname" style="cursor: default">\
                                <%substationName%>\
                            </div>\
                        <%}else{%>\
                            <div class="third-c-cname z-third">\
                                <div class="third-party-cname"><%substationName%></div>\
                                <b></b>\
                            </div>\
                            <div class="detail-contenr-third-01" id="deliverLayer" style="display:none;">\
                                <ul>\
                                    <li><a href="javascript:void(0);"><%substationName%></a></li>\
                                    <%for(var i=0,n=otherSubstationGoodsID.length;i<n;i++){%>\
                                        <li><a href="<%otherSubstationGoodsID[i].goodsIDList[0].goodsLink%>"><%otherSubstationGoodsID[i].substationName%></a></li>\
                                    <%}%>\
                                </ul>\
                            </div>\
                        <%}%>',
            multipleAttr : '<%for(var i=0,n=SavInfos.length;i<n;i++){%>\
                            <li class="norms">\
                                <div class="<%if(SavInfos[i].type != 1){%>color-box<%}else{%>norms-box<%}%>">\
                                    <div class="dt"><%choose%><%SavInfos[i].saName%></div>\
                                    <div class="dd" id="sainfo_<%SavInfos[i].saID%>" savVal="0" name="sav">\
                                        <%for(var j=0,nn=SavInfos[i].SavValueInfo.length;j<nn;j++){%>\
                                            <div class="item" id="savinfo_<%SavInfos[i].saID%>_<%SavInfos[i].SavValueInfo[j].savID%>" name="name_savInfo_<%SavInfos[i].saID%>">\
                                                <b></b>\
                                                <a href="javascript:void(0);" class="clickAttribute" saID="<%SavInfos[i].saID%>" savID="<%SavInfos[i].SavValueInfo[j].savID%>"  title="<%SavInfos[i].SavValueInfo[j].savName%>">\
                                                    <%if(SavInfos[i].type == 1){%>\
                                                        <%SavInfos[i].SavValueInfo[j].savName%>\
                                                    <%}else{%>\
                                                        <img src="<%SavInfos[i].SavValueInfo[j].imgUrl%>" alt="<%SavInfos[i].SavValueInfo[j].savName%>" width="60" height="60"/>\
                                                    <%}%>\
                                                </a>\
                                            </div>\
                                            <%}%>\
                                    </div>\
                                </div>\
                            </li>\
                            <%}%>',
            promotionInfo : '<div class="promotion-box">\
                                <%if(lang != "en"){%><div class="title-dt"><%mess.proInfo%></div><%}%>\
                                <div class="main-r">\
                                    <%for(var i=0,n=promotionInfo.length;i<n;i++){%>\
                                    <div class="main-dd pro-item" <%if(i > 2){%>style="display:none;" more<%}%>>\
                                        <div class="pro-text">\
                                            <span class="box-item"><%promotionInfo[i][0].promotionTag%></span><p class="sales_title"><%promotionInfo[i][0].promotionName%></p>\\n\
                                            <%if(promotionInfo[i].length > 1 || promotionInfo[i][0].promotionType == "stair"){%>\
                                                <div class="more more-curre"><a href="javascript:void(0);"><%mess.more%><b></b></a></div>\
                                            <%}%>\
                                        </div>\
                                        <%if(promotionInfo[i].length > 1 || promotionInfo[i][0].promotionType == "stair"){%>\
                                            <div class="pro-more" style="display:none;">\
                                                <div class="open-box">\
                                                    <dl>\
                                                        <dt class="give-dt"><span class="box-item"><%promotionInfo[i][0].promotionTag%></span></dt>\
                                                        <dd class="give-dd">\
                                                            <%if(promotionInfo[i][0].promotionType == "stair"){%>\
                                                                <dl>\
                                                                    <dt class="open-dt"><p><%mess.buyNum%></p><p><%mess.stair%></p><p><%mess.spare%></p></dt>\
                                                                    <%for(var j=0,nn=promotionInfo[i][0].item.length;j<nn;j++){%>\
                                                                    <dd class="open-dd">\
                                                                        <p><%promotionInfo[i][0].item[j].startNum%>-<%promotionInfo[i][0].item[j].endNum%> <%marketingUnit%></p>\
                                                                        <p><b style="color:#FF3300"><%promotionInfo[i][0].item[j].formatPrice%></b>/<%marketingUnit%></p>\
                                                                        <p><b style="color:#FF3300"><%promotionInfo[i][0].item[j].savePrice%></b>/<%marketingUnit%></p>\
                                                                    </dd>\
                                                                    <%}%>\
                                                                </dl>\
                                                            <%}else{%>\
                                                                <ul>\
                                                                    <%for(var j=0,nn=promotionInfo[i].length;j<nn;j++){%>\
                                                                    <li><span><%promotionInfo[i][j].promotionName%></span></li>\
                                                                    <%}%>\
                                                                </ul>\
                                                            <%}%>\
                                                        </dd>\
                                                    </dl>\
                                                </div>\
                                            </div>\
                                        <%}%>\
                                    </div>\
                                    <%}%>\
                                </div>\
                            </div>\
                            <%if(promotionInfo.length > 3){%>\
                            <div class="t-more-info pro-more-info"><a href="javascript:void(0);"><%mess.morePro%><b></b></a></div>\
                            <%}%>'
            
        },
        
        getMessInfo : function(name){
            if(Lang.isEn()){
                return View.messEN[name] ? View.messEN[name] : name;
            }else{
                return View.messCN[name] ? View.messCN[name] : name;
            }
        },
        
        /**
         * 设置商品信息
         */
        setGoodsInfo : function(){
            $(View.dom.goodsTitle).text(Model.goods.goodsInfo.goodsTitle);
            $(View.dom.favorites).text(Model.goods.favorites);
            if(Model.goods.goodsInfo.goodsBrief){
                //推荐语
                if(Model.goods.goodsInfo.goodsBrief.length > 2)
                    Model.goods.goodsInfo.goodsBrief = Model.goods.goodsInfo.goodsBrief.substr(0,69);
                $(View.dom.goodsBrief).find("p").text(Model.goods.goodsInfo.goodsBrief);
            }else{
                $(View.dom.goodsBrief).find("p").hide();
            }
            if(Model.goods.goodsInfo.extendsInfo.preOrderInfo){
                //预定商品提示
                var content = {preOrderInfo:Model.goods.goodsInfo.extendsInfo.preOrderInfo};
                var html =  Tpl.tpl(View.tpl.preOrderInfoTip,content).replace('<%',Config.tplOpenTag).replace('%>',Config.tplCloseTag);
                $(View.dom.psTip).html(html);
            }
            if(Model.goods.goodsInfo.benefitScope == 2){
                //特例商品提示
                var content = {tip:View.getMessInfo('specialGoods'),web:Config.url.web,link:View.getMessInfo('checkDetail')};
                var html =  Tpl.tpl(View.tpl.benefitScope,content).replace('<%',Config.tplOpenTag).replace('%>',Config.tplCloseTag);
                $(View.dom.special).html(html);
            }
            
        },
        
        /**
         * 设置购买按钮状态
         */
        showBuyButton : function(canSend,canBuy){
            if(typeof canSend != 'undefined')
                Model.goods.goodsInfo.canShipping = canSend;
            var infant=Model.goods.goodsInfo.channelType;
            var buyName = View.getMessInfo('addCart');
            $(View.dom.buyButton).addClass(View.className.addCartDisabled);
            $(View.dom.buyButton2).parent('div').hide();
            $(View.dom.buyButton + ',' + View.dom.buyButton2).removeAttr('skuid amount promoteType stationId buyFrom minNum maxNum').off('cart').removeClass(View.className.JsAddCart);
          
            if(Model.goods.goodsInfo.dealGoodsStatus != 6){
                //已下架   按钮:已下架
                buyName = View.getMessInfo('offLine');
                $(View.dom.proInfo + ',' + View.dom.priceInfo + ',' + View.dom.amountDiv).hide();
                $(View.dom.bfdTJ).show();
            }else if(infant!=1){
            	$(View.dom.buyButton).addClass(View.className.addCartDisabled);
            }else if(Model.goods.goodsInfo.visibleFlag != 1){
                //上架 不可展现  按钮:正在补货
                buyName = View.getMessInfo('refilling');
                $(View.dom.proInfo + ',' + View.dom.priceInfo + ',' + View.dom.amountDiv).hide();
                $(View.dom.bfdTJ).show();
            }else if(Model.goods.goodsInfo.maxNum < Model.goods.goodsInfo.skuInfo.minBuyNum){
                //缺货
                buyName = View.getMessInfo('refilling');
            }else if(Model.goods.goodsInfo.zoneVisbleFlag == 2 && User.BUYER_TYPE != 11){
               //专享商品
               $(View.dom.buyButton).after(View.getMessInfo('specialBuyer'));
               $(View.dom.buyButton2).parent('div').hide();
            }else if(Model.goods.goodsInfo.canShipping == 0){
                //无法送达
                buyName = View.getMessInfo('undelivered');
                $(View.dom.amountDiv).hide();
                $(View.dom.bfdTJ).show();
            }else if((Model.goods.goodsInfo.substationID != Geos.getSubStationID() && !Model.getOtherSubstations()[Geos.getSubStationID()]) || (typeof canBuy != 'undefined' && canBuy == 0)){
                //不可跨站销售
                buyName = View.getMessInfo('refilling');
                $(View.dom.amountDiv).hide();
                $(View.dom.bfdTJ).show();
            }else{
                $(View.dom.buyButton).removeClass(View.className.addCartDisabled);
                $(View.dom.proInfo + ',' + View.dom.priceInfo + ',' + View.dom.amountDiv).show();
                $(View.dom.buyButton2).parent('div').show();
                $(View.dom.bfdTJ).hide();
                $(View.dom.buyButton + ',' + View.dom.buyButton2).attr({
                    skuid : Model.goods.goodsInfo.skuID,
                    amount : $(View.dom.buyAmount).val(),
                    promoteType : Model.goods.goodsInfo.skuInfo.dealCartMethod,
                    stationId : Model.goods.goodsInfo.substationID,
                    buyFrom : WX.getParamByName('sharefrom'),
                    minNum : Model.goods.goodsInfo.skuInfo.minBuyNum,
                    maxNum : Model.goods.goodsInfo.skuInfo.maxBuyNum,
                    flyImg : Model.goods.goodsInfo.picInfo.picPaths[0].dealPic.PIC80
                }).on('cart',function(){
                    $(View.dom.addShop).fadeIn();
                    setTimeout(function(){
                        $(View.dom.addShop).fadeOut();
                    },2000);
                    if(ga)
                        ga('_trackPageview', '/vcart.html');
                }).addClass(View.className.JsAddCart);
            }
            $(View.dom.buyButton).show().find("span").text(buyName);
        },
        
        /**
         * 展示商品价格 
         */
        showGoodsPrice : function(){
            var name = View.getMessInfo('price');
            var price = Model.goods.goodsInfo.skuInfo.dealPrice;
            
            if(Model.goods.goodsInfo.skuInfo.dealPromotionType == 1 && parseInt(new Date(Model.goods.goodsInfo.skuInfo.promotionEnd.replace(/-/g, "/")).getTime()) > parseInt(new Date().getTime())){
                name = View.getMessInfo('ProPrice');
                price = Model.goods.goodsInfo.skuInfo.dealPrice;
                View.setProDownTime();
            }else if(Model.goods.goodsInfo.disFlag == 0 && User.BUYER_TYPE == 11 && User.hasLogin()){
                name = View.getMessInfo('specialPrice');
                price = Model.getVipPrice();
            }else if(Model.goods.goodsInfo.disFlag == 0 && User.BUYER_TYPE != null && Model.goods.goodsInfo.priceInfo.vipPrice != '' && User.hasLogin()){
                name = View.getMessInfo('vipPrice');
                price = Model.getVipPrice();
            }
            
            if(Model.goods.goodsInfo.skuInfo.theOriginalPrice - price > 0)
                $(View.dom.originalPrice).show();
            $(View.dom.priceName).html(name);
            $(View.dom.price + ',' + View.dom.price2).html('¥' + price);
            $(View.dom.priceInfo).show();
        },
        
        /**
         * 设置促销倒计时
         */
        setProDownTime : function(){
           var localtime = new Date().getTime();
           var endTime = Model.goods.goodsInfo.skuInfo.promotionEnd.replace(/-/g,'/');
           var proEndTime = new Date(endTime).getTime();
            var endTimeDiff = parseInt(proEndTime - localtime);
            WX.countdown(endTimeDiff, 1,
                function(day,hour,minute,second){
                    var text = View.getMessInfo('remaining')+'<b>'+day+'</b>'+View.getMessInfo('day')+'<b>'+hour+'</b>'+View.getMessInfo('hour')+'<b>'+minute+'</b>'+View.getMessInfo('minute')+'<b>'+second+'</b>'+View.getMessInfo('second');
                    $(View.dom.proDownTime).html(text).show();
                },
                function(index){
                    $(View.dom.proDownTime).hide();
                    Presenter.reloadGoodsInfo();
                }
            );
        },
        
        /**
         * 设置发货地
         */
        showDeliver : function(){
            Model.goods.goodsInfo.extendsInfo.otherSubstationGoodsID = [];
            //写死北京站
            if(Lang.isEn())
                Model.goods.goodsInfo.substationName = 'beijing';
            else
                Model.goods.goodsInfo.substationName = '北京';
            if(Model.goods.goodsInfo.extendsInfo.otherSubstationGoodsID){
                for(k in Model.goods.goodsInfo.extendsInfo.otherSubstationGoodsID){
                    for(kk in Model.goods.goodsInfo.extendsInfo.otherSubstationGoodsID[k].goodsIDList){
                        Model.goods.goodsInfo.extendsInfo.otherSubstationGoodsID[k].goodsIDList[kk]['goodsLink'] = Url.get({name:"product",id:Model.goods.goodsInfo.extendsInfo.otherSubstationGoodsID[k].goodsIDList[kk]['goodsID']});
                    }
                }
            }
            var content = {otherSubstationGoodsID:Model.goods.goodsInfo.extendsInfo.otherSubstationGoodsID,substationName:Model.goods.goodsInfo.substationName};
//            Tpl.helper("urlGet",function(o){return Url.get(o);});
            var html =  Tpl.tpl(View.tpl.deliver, content).replace('<%',Config.tplOpenTag).replace('%>',Config.tplCloseTag);
            $(View.dom.changeDeliver).html(html);
        },
        
        /**
         *  设置多属性 
         */
        setMultipleAttr : function(){
            var html = '';
            if(Model.goods.goodsInfo.savInfo.SavInfos){
                var content = {SavInfos:Model.goods.goodsInfo.savInfo.SavInfos,choose:View.getMessInfo('select')};
                html = Tpl.tpl(View.tpl.multipleAttr, content).replace('<%',Config.tplOpenTag).replace('%>',Config.tplCloseTag);
            }
            $(View.dom.multipleAttr).html(html);
            initAttribute();
        },
        
        /**
         * 设置促销信息        
         */
        setPromotionInfo : function(){
            var html = '';
            if(Model.goods.promotionInfo != ''){
                for(k in Model.goods.promotionInfo){
                    if(Model.goods.promotionInfo[k][0].promotionType == 'stair'){
                        for(kk in Model.goods.promotionInfo[k][0].item){
                            Model.goods.promotionInfo[k][0].item[kk]['formatPrice'] = '¥' + Model.goods.promotionInfo[k][0].item[kk].goodsPrice.toFixed(2);
                            Model.goods.promotionInfo[k][0].item[kk]['savePrice'] = '¥' + (Model.goods.goodsInfo.skuInfo.theOriginalPrice - Model.goods.promotionInfo[k][0].item[kk].goodsPrice).toFixed(2);
                        }
                    }
                }
                var mess = {
                    proInfo : View.getMessInfo('proInfo'),
                    item : View.getMessInfo('checkInfo'),
                    more : View.getMessInfo('morePre'),
                    buyNum : View.getMessInfo('buyNumSection'),
                    stair : View.getMessInfo('stairPrice'),
                    spare : View.getMessInfo('spare'),
                    morePro : View.getMessInfo('moreProInfo')
                };
                var content = {promotionInfo:Model.goods.promotionInfo,theOriginalPrice:Model.goods.goodsInfo.skuInfo.theOriginalPrice,marketingUnit:Model.goods.goodsInfo.skuInfo.marketingUnit,mess:mess,lang:Lang.get()};
                html = Tpl.tpl(View.tpl.promotionInfo, content).replace('<%',Config.tplOpenTag).replace('%>',Config.tplCloseTag);
            }
            $(View.dom.proInfo).html(html);
        },
        
        /*
         * 初始化商品购买数量
         */
        buyAmountInit : function(buyAmount){
            $(View.dom.amountDiv).show();
            var maxNum = Math.min(Model.goods.goodsInfo.maxNum, Model.goods.goodsInfo.skuInfo.maxBuyNum);
            if(buyAmount > maxNum)
                buyAmount = maxNum;
            if(buyAmount < Model.goods.goodsInfo.skuInfo.minBuyNum || !buyAmount)
                buyAmount = Model.goods.goodsInfo.skuInfo.minBuyNum;
            $(View.dom.buyAmount).val(buyAmount);
            $(View.dom.buyButton).attr('amount', buyAmount);
            if($(View.dom.buyAmount).val() >= maxNum)
                $(View.dom.buyAmountAdd).addClass(View.className.buyAmountNo);
            else
                $(View.dom.buyAmountAdd).removeClass(View.className.buyAmountNo);
            
            if($(View.dom.buyAmount).val() <= Model.goods.goodsInfo.skuInfo.minBuyNum)
                $(View.dom.buyAmountSub).addClass(View.className.buyAmountNo);
            else
                $(View.dom.buyAmountSub).removeClass(View.className.buyAmountNo);
        },
        
        //添加商品数量
        buyAmountAdd : function(_this){
            var buyAmount = parseInt($(View.dom.buyAmount).val());
            if(buyAmount < Math.min(Model.goods.goodsInfo.maxNum, Model.goods.goodsInfo.skuInfo.maxBuyNum))
                View.buyAmountInit(buyAmount + 1);
        },
        
        //减少商品数量
        buyAmountSub : function(_this){
            var buyAmount = parseInt($(View.dom.buyAmount).val());
            if(buyAmount > Model.goods.goodsInfo.skuInfo.minBuyNum)
                View.buyAmountInit(buyAmount - 1);
        },
        
        //修改商品数量
        buyAmountBlur : function(_this){
            var buyAmount = parseInt($(View.dom.buyAmount).val());
            View.buyAmountInit(buyAmount);
        },
        
        //商品详情切换
        goodsInfoTab : function(_this){
            $(_this).addClass(View.className.goodsInfoTabCurr).siblings().removeClass(View.className.goodsInfoTabCurr);
            if($(_this).index() == 1)
                $(View.dom.goodsInfoItem).hide().eq($(_this).index()).show();
            else
                $(View.dom.goodsInfoItem).show();
        },
        
        //查看促销详情
        proMoreItem : function(_this, evt){
            if(evt.type == 'mouseover' || evt.type == 'mouseenter')
                $(_this).parents(View.dom.proItem).find(View.dom.proMore).show();
            else
                $(_this).parents(View.dom.proItem).find(View.dom.proMore).hide();
        },
        
        //查看更多促销
        proMoreInfo : function(_this){
            if($(_this).hasClass(View.className.proMoreInfoCurr)){
                $(_this).removeClass(View.className.proMoreInfoCurr);
                $(View.dom.proItem + '[more]').hide();
            }else{
                $(_this).addClass(View.className.proMoreInfoCurr);
                $(View.dom.proItem + '[more]').show();
            }
        },
        
        //选择发货地
        changeDeliver : function(_this, evt){
            if(evt.type == 'mouseover' || evt.type == 'mouseenter'){
                deliverTime = setTimeout(function(){
                    $(_this).find(View.dom.changeDeliverCurr).addClass(View.className.changeDeliverCurr);
                    $(View.dom.deliverLayer).show();
                },500);
            }else{
                $(_this).find(View.dom.changeDeliverCurr).removeClass(View.className.changeDeliverCurr);
                $(View.dom.deliverLayer).hide();
                clearTimeout(deliverTime);
            }
        },
        
        //当日达提示
        toDayShipTip : function(_this, evt){
            if(evt.type == 'mouseover' || evt.type == 'mouseenter'){
                $(_this).find(View.dom.drdTipMsg).show();
            }else{
                $(_this).find(View.dom.drdTipMsg).hide();
            }
        },
        
        //跳转至评论区
        rollReview : function(_this){
            View.goodsInfoTab($(View.dom.goodsInfoTab).eq(1));
            var scrollTop = $(View.dom.goodsInfoTab).offset().top - $(".ttop").height();
            $("html,body").animate({scrollTop: scrollTop}, 500);
        },
        
        //图标描述
        icoMess : function(_this, evt){
            if(evt.type == 'mouseover' || evt.type == 'mouseenter'){
                $(_this).next(View.dom.icoMess).show();
            }else{
                $(_this).next(View.dom.icoMess).hide();
            }
        },
        
        //商品详情、购买评论浮动
        windowScroll : function(){
            var scrollHeight = $(document).scrollTop();
            if(scrollHeight > View.navTop){
                $(View.dom.detailNav).addClass(View.className.detailNavFloat);
            }else{
                $(View.dom.detailNav).removeClass(View.className.detailNavFloat);
            }
        },
        
        //下载app
        downApp : function(_this, evt){
            if(evt.type == 'mouseover' || evt.type == 'mouseenter'){
                $(_this).addClass(View.className.downCurr);
                $(View.dom.downInfo).show();
            }else{
                $(_this).removeClass(View.className.downCurr);
                $(View.dom.downInfo).hide();
            }  
        },
        
        //历史记录商品加购物车
        historyAddCar : function(_this, evt){
            if(evt.type == 'mouseover' || evt.type == 'mouseenter'){
                $(_this).find(View.dom.historyAddCar).show();
            }else{
                $(_this).find(View.dom.historyAddCar).hide();
            }
        },
        
        //切换评论
        changeComment : function(_this){
            if($(_this).hasClass(View.className.commentCurr))
                return false;
            $(_this).addClass(View.className.commentCurr).siblings().removeClass(View.className.commentCurr);
            var tp = $(_this).attr("tp");
            Review.topage(Model.goods.goodsInfo.goodsID,1,tp);
        },
        
        //展示迷你商品详情
        showMiniGoodsInfo : function(_this, evt){
            if(evt.type == 'mouseover' || evt.type == 'mouseenter'){
                $(View.dom.goodsInfoFloat).show();
            }else{
                $(View.dom.goodsInfoFloat).hide();
            }
        },
        
        /**
         * 绑定页面所有的事件
         */
        bindEventHandle : function(){
            //添加商品数量
            $(View.dom.buyAmountAdd).off().click(function(){View.buyAmountAdd(this);});
            //减少商品数量
            $(View.dom.buyAmountSub).off().click(function(){View.buyAmountSub(this);});
            //修改商品数量
            $(View.dom.buyAmount).off().blur(function(){View.buyAmountBlur(this);});
            //商品详情切换
            $(View.dom.goodsInfoTab).off().click(function(){View.goodsInfoTab(this);});
            //查看促销详情
            $(View.dom.proInfo).on('mouseover mouseout', View.dom.proMoreA + ',' + View.dom.proMore, function(evt){View.proMoreItem(this, evt);});
            //查看更多促销
            $(View.dom.proInfo).on('click', View.dom.proMoreInfo, function(){View.proMoreInfo(this);});
            //选择发货地
            $(View.dom.changeDeliver).hover(function(evt){View.changeDeliver(this, evt)}, function(evt){View.changeDeliver(this, evt)});
            //当日达提示
            $(View.dom.psInfo).on('mouseover mouseout', View.dom.drdTip, function(evt){View.toDayShipTip(this, evt);});
            //跳转至评论区
            $(View.dom.rollReview).off().click(function(){View.rollReview(this);});
            //去评论
            $(View.dom.toReview).off().click(function(){Review.canReviewCheck(Model.goods.goodsInfo.goodsID);});
            //重新加载
            $(View.dom.loadFail).off().click(function(){Presenter.reloadGoodsInfo();});
            //图标描述
            $(View.dom.icoItem).on('mouseover mouseout', function(evt){View.icoMess(this, evt);});
            //商品详情、购买评论浮动
            $(window).scroll(function(){View.windowScroll();});
            //下载app
            $(View.dom.downApp).on('mouseover mouseout', function(evt){View.downApp(this, evt);});
            //收藏
            $(View.dom.favorite).off().click(function(){Model.favorite();});
            //关闭收藏
            $(View.dom.favoriteClose).off().click(function(){Model.favoriteClose();});
            //历史记录商品加购物车
            $(View.dom.goodsHistory).on('mouseover mouseout', View.dom.historyGoods, function(evt){View.historyAddCar(this, evt);});
            //切换评论
            $(View.dom.commentNav).off().click(function(){View.changeComment(this)});
            //展示迷你商品详情
            $(View.dom.addShopBox).on('mouseover mouseout', function(evt){View.showMiniGoodsInfo(this, evt);});
        }
        
    }
    Presenter.init(goods);
    window.goodsDetailPsCallback = Presenter.detailPsCallback;
    
    
    
    //兼容原有js程序

    /**********多属性  ****************/
    //多属性
    var css_selected = 'selected-ok';
    var css_nostock = 'no-selected';
    function initAttribute(){
        for(i = 0 ; i < Model.goods.savInfo.length; i++){
            var sav = Model.goods.savInfo[i].savInfo;
            var gid = Model.goods.savInfo[i].goodsID;
            if(gid == Model.goods.goodsInfo.goodsID){
                for(h = 0 ; h< sav.length ; h++ ){
                    var saId = sav[h].saID;
                    var savId = sav[h].savID;
                    $("#multipleAttr  #sainfo_"+saId).attr('savVal',savId);
                    $("#multipleAttr  #savinfo_"+saId+"_"+savId).addClass(css_selected);
                }
                checkAttrSelected();
                updateNostock();
            }
        }
    }
    $("#multipleAttr").on('click','.clickAttribute',function(){
        var saId = $(this).attr('saID');
        var savId = $(this).attr('savID');
     
        var sel = "#savinfo_"+saId+"_"+savId;
        //不可选中的直接return
        if ( $(sel).hasClass(css_nostock) ) { 
            return;
        }

        if( $(sel).hasClass(css_selected) ){
            //已经选中的则取消选中
            $(sel).removeClass(css_selected);
            $("#sainfo_"+saId).attr('savVal','');
        }else{
            //没有选中的  选中并取消选中同属性下的其它值
            $("#sainfo_"+saId).attr('savVal',savId);
            $("#multipleAttr  [name='name_savInfo_"+saId+"']").removeClass(css_selected);
            $("#multipleAttr  #savinfo_"+saId+"_"+savId).addClass(css_selected);
        }
        updateNostock();
        checkAttrSelected();
        return;
    });
    function checkAttrSelected(){
        var goodsId = '0';
        for(i = 0 ; i < Model.goods.savInfo.length; i++){
            var sav = Model.goods.savInfo[i].savInfo;
            goodsId = Model.goods.savInfo[i].goodsID;
            for(j = 0 ; j< sav.length ; j++ ){
                if($("#sainfo_"+sav[j].saID).attr('savVal') != sav[j].savID){
                    goodsId = '0';
                }
            }
            if(goodsId != '0'){
                break;
            }
        }

        if(goodsId != '0' && goodsId != Model.goods.goodsInfo.goodsID){
            Url.jump({name:'product',id:goodsId});
        }
        return ;
    }

    function updateNostock(){
        //先全部设为不可选,然后将能选的再全部选中
        $('#multipleAttr .item').not("."+css_selected).addClass(css_nostock);
        //将选中的属性和要判断是否可点击的属性进行组合,如果是一个商品的一部分,或能组成一个商品,则置为可点击
        var curSav = new Object();
        $('#multipleAttr .item.'+css_selected).each(function(){
            var singleSavInfo = getSingleSavInfoById( $(this).attr("id") );
            if( singleSavInfo!=null ){
                curSav[ singleSavInfo['saID'] ] = singleSavInfo['savID'];
            }
        });
        var savInfoObj = getSavInfoObj();
    //    console.log( savInfoObj );

        $('#multipleAttr .item').each(function(){
            var singleSavInfo = getSingleSavInfoById( $(this).attr("id") );

            //将curSav和当前属性组合为一个新的商品属性
            var newSav = new Object();
            for( i in curSav){
                newSav[i] = curSav[i];
            }
            newSav[ singleSavInfo['saID'] ] = singleSavInfo['savID'];
    //        console.log(newSav);
            //当前选中和判断的属性组合  必须全部存在于一个商品下的多属性才能被点击
            for(i in savInfoObj){
                var flag = true;
                for( j in newSav){
    //                console.log(i,newSav[j],j,savInfoObj[i],savInfoObj[i][j]);
                    if( newSav[j] != savInfoObj[i][j]){
                        flag = false;
                        break;
                    }
                }

                //判断成功 将当前属性置为可点击
                if( flag ){

                    $(this).removeClass(css_nostock);
                }
            }
        });
    }

    function getSingleSavInfoById(id){
        var matched = id.match(/^savinfo\_(\d+)\_(\d+)$/);
        var singleSavInfo = new Object();
        if( matched!=null && matched[1]!=undefined && matched[2]!=undefined){
            singleSavInfo['savID'] = parseInt(matched[2]);
            singleSavInfo['saID'] = parseInt(matched[1]);
        }else{
            singleSavInfo = null;
        }
        return singleSavInfo;
    }
    function getSavInfoObj(){
        var SavInfoObj = new Object();
        for(var i=0; i<Model.goods.savInfo.length; i++){
            SavInfoObj[Model.goods.savInfo[i].goodsID] = new Object();
            for( var j=0; j<Model.goods.savInfo[i].savInfo.length; j++ ){
                SavInfoObj[Model.goods.savInfo[i].goodsID][Model.goods.savInfo[i]['savInfo'][j]['saID']] = Model.goods.savInfo[i]['savInfo'][j]['savID'];
            }
        }
        return SavInfoObj;
    }
    
    /*****************duo shu xing (end)***********************/

     function loadJs(url,cb){
        var scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = url;
        document.getElementsByTagName("head")[0].appendChild(scriptTag);
        scriptTag.onload = function(){
            cb();
        }
    }
    
    
    /*****************放大镜***********************/

    function zoom(){
        var tempLength = 0; //临时变量,当前移动的长度
        var viewNum = 5; //设置每次显示图片的个数量
        var moveNum = 2; //每次移动的数量
        var moveTime = 300; //移动速度,毫秒
        var scrollDiv = $(".thumbnails .thumbnails-c ul"); //进行移动动画的容器
        var scrollItems = $(".thumbnails .thumbnails-c ul li"); //移动容器里的集合
        var moveLength = (scrollItems.eq(0).width()+15) * moveNum; //计算每次移动的长度
        var countLength = (scrollItems.length - viewNum) * (scrollItems.eq(0).width()+15); //计算总长度,总个数*单个长度
         //鼠标经过预览图片函数
        $('.Js-smallProImg img').on('mouseenter',function(){
            $('.Js-bigProImg').attr({'src':$(this).attr('bimg'),'jqimg':$(this).attr('bimg')});
            $(this).parents('a').addClass('thumbnails-curr');
            $(this).parents('.Js-smallProImg').siblings().find('a').removeClass('thumbnails-curr');
        });
        if(scrollItems.length > viewNum){
            $(".Js-next").addClass('pic-chg-r-ok');
        }
        //下一张
        $(".Js-next").on("click",function(){
            if(tempLength < countLength){
                if((countLength - tempLength) > moveLength){
                    scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
                    tempLength += moveLength;
                    $(".Js-pre").addClass('pic-chg-l-ok');
                }else{
                    scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
                    tempLength += (countLength - tempLength);
                    $(".Js-next").removeClass('pic-chg-r-ok');
                    $(".Js-pre").addClass('pic-chg-l-ok');
                }
            }
        });
        //上一张
        $(".Js-pre").on("click",function(){
            if(tempLength > 0){
                if(tempLength > moveLength){
                    scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
                    tempLength -= moveLength;
                    $(".Js-next").addClass('pic-chg-r-ok');
                }else{
                    scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
                     $(".Js-pre").removeClass('pic-chg-l-ok');
                     $(".Js-next").addClass('pic-chg-r-ok');
                    tempLength = 0;
                }
            }
        });

    }
     $(".jqzoom").jqueryzoom({xzoom:398,yzoom:398});

});
