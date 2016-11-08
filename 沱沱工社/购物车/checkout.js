var checkoutChs = '您确定要删除该商品吗？@@确定@@取消@@该促销最多可领取@@件赠品@@请至少选中一件商品!@@该促销最多可换购@@件商品';
var checkoutEns = 'Are you sure you want to delete the goods?@@Confirm@@Cancel@@The promotion for a maximum of@@Gifts@@Please check at least one of the goods@@The promotion for a maximum of@@Goods';
var checkoutTx = new Array();
if(language == 'en'){
    checkoutTx = checkoutEns.split("@@");
}else{
    checkoutTx = checkoutChs.split("@@");
}

$car = new TTCart;
var checkout_ajax_lock=false
$("document").ready(function(){
        //加载页面内容
        var loadUrl = web_pay_domain+'index.php?r=tCheckout/load';
        $("#stage_middle").load(loadUrl, function(){

                lockScreen = function(showLoading)
                {
                       var dh = $(document).height();
                       $("#shadowMask").css('height', dh+'px');
                       if(showLoading){
                               $("#cart_loading").show();
                       }else{
                               $("#cart_loading").hide();
                       }
                       $("#cart_lock_screen").show();
                }

                unlockScreen = function()
                {
                       $("#cart_lock_screen").hide();
                }

                 showV3Msg();

               //优惠区域，如果没有内容，整个隐藏
                hideYouhuiIfNone();

                 loadimg.triggerImgLazyLoad();

                 //百分点推荐
//                 if(language == 'zh_cn')
//                 {
                         var load_url =  (('https:' == document.location.protocol?'https://ssl-static1':'http://static1')+'.baifendian.com/service/tuotuogongshe/ttgs_cart.js');
                         sync_load(load_url);
//                 }

                 //CMS广告与促销信息只显示4条
                 showPrmtList();

                 var firstStationId = $("#first_station_id").val();
                 updateSubmitButtonStatus(firstStationId);

                 //基准
                confirmShippingBase(firstStationId)

                 //阶梯价浮层开闭
                 $("body").delegate(".cart_ladder_price","mouseover",function(){
                         $(this).find(".shopping_ladder_price0").show();
                 });
                 $("body").delegate(".cart_ladder_price","mouseout",function(){
                         $(this).find(".shopping_ladder_price0").hide();
                 });

                 //礼盒明细开闭
                 $("body").delegate(".box_item_opener", "click", function(){
                         $(this).closest("tr").css('background-color','#FFFDEE').nextUntil(".box_items_end_sperator").css('background-color', '#e2e5d8').show();
                         $(this).hide().siblings('.box_item_closer').show();
                 });
                 $("body").delegate(".box_item_closer", "click", function(){
                         $(this).closest("tr").css('background-color','#FFFDEE').nextUntil(".box_items_end_sperator").hide();
                         $(this).hide().siblings('.box_item_opener').show();
                 });

                 Presenter.diffTime();//用来计算与服务器时间差

                 //分站切换
                 $("body").delegate("#station_nav>li:not(#cart_zhinan)","click",function(){
                          $(this).addClass('curr_sub_station').siblings().removeClass('curr_sub_station');
                          var showAreaDom = $(".station_area").eq($("#station_nav>li").index(this));
                          $(showAreaDom).show().siblings(".station_area").hide();
                          if ( $(showAreaDom).is(':has(.renquan)') ) {
                                 var renquanDom = $(showAreaDom).find('.renquan');
                                 refreshSingleStation(renquanDom);
                         }else if ( $(showAreaDom).is(':has(#target)') ) {
                                 var targetDom = $(showAreaDom).find('#target');
                                 var target = $(targetDom).val();
                                 var psCookie = $.cookies.get('ps');
                                 var psArr = psCookie.split('-');
                                 var targetModified = 1;
                                 (function(){
                                         for(x in psArr){
                                                 if(x>1 && psArr[x]==target){
                                                         targetModified=0;
                                                         break;
                                                 }
                                         }
                                 })();
                                 if(targetModified){
                                         refreshSingleStation(targetDom);
                                 }
                         }
                 });

                 //增加数量
                 $("body").delegate(".addone_cartpage", "click", function(){
                         var inputObj = $(this).closest("tr").find('.amount_cartpage');
                         inputObj.val(parseInt(inputObj.val()) + 1);
                 });

                 //扣减数量
                 $("body").delegate(".subone_cartpage", "click", function(){
                         var inputObj = $(this).closest("tr").find('.amount_cartpage');
                         var amount = parseInt(inputObj.val()) - 1;
                         var minNum = 1;
                         if(inputObj.attr('promoteType')=='d' && inputObj.attr('mnMaster')=='1') //mn特殊处理
                                 minNum = 0;

                         if(amount<minNum){
                                 amount = minNum;
                         }
                         inputObj.val(amount);
                 });

                 //修改数量
                 $("body").delegate(".modify_area_cartpage", "mouseleave", function(){
                         var inputObj = $(this).find('input');
                         var skuId = $(inputObj).attr('skuid');
                         var cartMethod = $(inputObj).attr('cartMethod');
                         var minBuyNum = Number($(inputObj).attr('minBuyNum'));
                         var maxBuyNum = Number($(inputObj).attr('maxBuyNum'));
                         var lastAmount = Number($(inputObj).attr('lastAmount'));
                         var amount = Number($(inputObj).val());
                         if (amount != lastAmount) {
                                 var originalAmount = $car.getGoodsAmountInCart(skuId, cartMethod);
                                 var newAmount = originalAmount + (amount-lastAmount);
                                 if ($car.modifyGoods(skuId, newAmount, cartMethod, minBuyNum, maxBuyNum) === false) {
                                         $(inputObj).val(lastAmount);
                                 }else{
                                     refreshSingleStation(this);
                                 }
                         }
                 });

                 //勾选或取消勾选
                 $("body").delegate(".check_cart_page", 'click', function(){
                         var obj = $(this);
                         $car.checkOne(obj);
                         var stationId = getStationIdByDomPosition(obj);
                         //如果是勾选动作，设置并保存同天送基准
                         var isChecked = $(obj).attr('checked');
                         if(isChecked){
                                 setShippingBaseCookie(obj, stationId);
                         }else{
                                 deleteShippingBaseIfFit(obj, stationId);
                         }

                         refreshSingleStation(this);
                 });

                 //批量勾选或取消
                 $("body").delegate(".total_check_cartpage", "click", function(){
                         var isChecked = $(this).attr('checked');
                         $(this).closest('tr').siblings('tr').find('.check_cart_page').filter(':not(:disabled)').attr('checked', isChecked);
                         $(this).closest('tr').siblings('tr').find('.check_cart_page').filter(':not(:disabled)').each(function(){
                                 $car.checkOne($(this));
                         });
                         //批量取消肯定要删除基准
                         if(!isChecked){
                                 var stationId = getStationIdByDomPosition($(this));
                                 deleteShippingBaseCookie(stationId);
                         }
                          refreshSingleStation(this);
                 });

                 //删除商品
                $("body").delegate(".delone_cartpage", "click", function(){
                         var obj = $(this);
                         myAlert({
                             msg:checkoutTx[0],
                             cls:true,
                             btn:[{
                                 text:checkoutTx[1],
                                 fn:function(){
                                         $car.delOne(obj);
                                         var stationId = getStationIdByDomPosition(obj);
                                         deleteShippingBaseIfFit(obj, stationId);
                                         refreshSingleStation(obj);
                                 }
                             },{
                                 text:checkoutTx[2],
                                 fn:function(){
                                 }
                             }]
                         });
                });

                 //清空分站下所有商品
                 $("body").delegate(".cleanall_cart_page", "click", function(){
                         $(this).closest(".station_area").find(".delone_cartpage").each(function(){
                                 var obj = $(this);
                                 $car.delOne4CartPage(obj);
                         });
                         refreshSingleStation(this);
                 });

                 //放弃或享受满减
                 $("body").delegate(".giveup_mj", 'click', function(){
                         refreshSingleStation(this);
                 });

                 //删除赠品
                $("body").delegate(".delGift_cartpage", "click", function(){
                         var obj = $(this);
                         var skuId = $(obj).attr('skuId');
                         var goodsId = $(obj).attr('goodsId');
                         var amount = $(obj).attr('amount');
                         var promoteType = $(obj).attr('promoteType');
                         var promoteId = $(obj).attr('promoteID');

                          //更新cookie
                         var url = web_pay_domain+'index.php?r=tCheckout/deleteGift&promotionType='+promoteType+'&promotionId='+promoteId+'&skuId='+skuId;
                         $.getJSON(url, function(){});

                        //更新页面上的hasSelected
                        var hasSelected = Number($('#waitingGift_'+promoteType+'_'+promoteId+'_'+skuId).closest('.zengping_area').find("#hasSelected").val());
                        hasSelected--;
                        $('#waitingGift_'+promoteType+'_'+promoteId+'_'+skuId).closest('.zengping_area').find("#hasSelected").val(hasSelected);
                         //商品列表中删除效果
                         $(this).closest('.gift_cartpage').hide();
                         //激活赠品列表的按钮
                         $('#waitingGift_'+promoteType+'_'+promoteId+'_'+skuId).find('.gift_deny').hide();
                         $('#waitingGift_'+promoteType+'_'+promoteId+'_'+skuId).find('.gift_please').show();

                         //更新submitJson
                         deleteGiftFromSubmitJson(this, promoteType, promoteId, goodsId, amount);
                });

                //领取赠品
                $("body").delegate(".gift_please input", "click", function(){
                         var obj = $(this);
                         var skuId = $(obj).attr('skuId');
                         var goodsId = $(obj).attr('goodsId');
                         var amount = $(obj).attr('amount');
                         var promoteType = $(obj).attr('promoteType');
                         var promoteId = $(obj).attr('promoteId');

                         var hasSelected = Number($(obj).closest('.zengping_area').find("#hasSelected").val());
                         var mzGiftNum = Number($(obj).closest('.zengping_area').find("#mzGiftNum").val());
                         if(hasSelected>=mzGiftNum){
                                 var complex = '';
                                 if(language == 'en' && mzGiftNum>1){
                                     complex = 's';
                                 }
                                 alert(checkoutTx[3]+mzGiftNum+checkoutTx[4]+complex);
                                 return false;
                         }

                         //更新cookie
                         var url = web_pay_domain+'index.php?r=tCheckout/addGift&promotionType='+promoteType+'&promotionId='+promoteId+'&skuId='+skuId;
                         $.getJSON(url, function(){});

                        //更新页面上的hasSelected
                        hasSelected++;
                        $(obj).closest('.zengping_area').find("#hasSelected").val(hasSelected);

                         //商品列表中附加效果
                         var goodsDom = $('#gift_'+promoteType+'_'+promoteId+'_'+skuId);
                         $(goodsDom).show().insertBefore($(goodsDom).closest('.tab_cartpage').find('.lock_seperator'));

                         //激活赠品列表的按钮
                         $('#waitingGift_'+promoteType+'_'+promoteId+'_'+skuId).find('.gift_deny').show();
                         $('#waitingGift_'+promoteType+'_'+promoteId+'_'+skuId).find('.gift_please').hide();

                         //更新submitJson
                         addGiftToSubmitJson(this, promoteType, promoteId, goodsId, amount);
                         loadimg.triggerImgLazyLoad();
                });

                 function addGiftToSubmitJson(obj, promoteType, promoteId, goodsId, amount)
                 {
                         var stationDom = $(obj).closest('.station_area');
                         var submitJsonDom = $(stationDom).find('#submitJson');
                         var submitJson = $(submitJsonDom).text();
                         var submitObject = $.parseJSON(submitJson);

                         for(x in submitObject.giftList){
                                 if(submitObject.giftList[x].promotionID == promoteId){
                                         var newGift = new Object;
                                         newGift.goodsID = parseInt(goodsId);
                                         newGift.count = parseInt(amount);
                                         submitObject.giftList[x].giftGoodsID.push(newGift);
                                 }
                         }

                         submitJson = JSON.stringify(submitObject);
                         $(submitJsonDom).text(submitJson);
                 }

                 function deleteGiftFromSubmitJson(obj, promoteType, promoteId, goodsId, amount)
                 {
                         var stationDom = $(obj).closest('.station_area');
                         var submitJsonDom = $(stationDom).find('#submitJson');
                         var submitJson = $(submitJsonDom).text();
                         var submitObject = $.parseJSON(submitJson);

                         deleteGiftStatement:
                         {
                                for(x in submitObject.giftList){
                                        if(submitObject.giftList[x].promotionID == promoteId){
                                                for(y in submitObject.giftList[x].giftGoodsID){
                                                        if(submitObject.giftList[x].giftGoodsID[y].goodsID == goodsId){
                                                                  submitObject.giftList[x].giftGoodsID.splice(y,1);
                                                                   break deleteGiftStatement;
                                                        }
                                                }
                                        }
                                }
                         }

                         submitJson = JSON.stringify(submitObject);
                         $(submitJsonDom).text(submitJson);
                 }


                //提交订单
                $("body").delegate(".sbmt_cartpage", "click", function(){

                         var stationId = getStationIdByDomPosition($(this));
                         deleteShippingBaseCookie(stationId);

                         var stationDom = $(this).closest('.station_area');
                         var submitJsonDom = $(stationDom).find('#submitJson');
                         var submitJson = $(submitJsonDom).text();

                         //判断购物车是否为空～
                         var checkedNum = $("#station_"+stationId).find(".check_cart_page:checked").length;

                         if(checkedNum<1){
                                 myAlert(checkoutTx[5]);
                         }else{
                             if(buyerInfo.getIsGuest()){
                                 //header(new urlCreater().geturl({"name":'allLogin'}));
                                 buyerInfo.popUpSimpleLoginLayer();
                                 return;
                             }
                             if(Presenter.checkVoucherGoodsMoneyFromCart()){
                               return;
                             }
                             //丰灵统计
                              window._vaq = window._vaq || [];
                             _vaq.push(['trackEvent',  "checkOut_button", "click", "cartPage", 0]); 
                             
                             $("#gotoConfirm>input").val(encodeURIComponent(submitJson));
                             $("#gotoConfirm").submit();
                         }
                });

                //选择换购
                $("body").delegate(".saleGiftBtn", "click", function(){
                         addSaleGfit(this);
                });

                 //刷新单个分站页签
                 function refreshSingleStation(obj)
                 {
                    if(checkout_ajax_lock==true){
                        return true;
                    }

                    lockScreen(true);
                    checkout_ajax_lock = true;
                    var stationId = getStationIdByDomPosition(obj);
                    if(! stationId){
                        stationId = _intoObj.getSubStationID();
                    }
                    var mjStatus = getSingleStationMjStatus(stationId);//满减勾选状态
                    confirmShippingBase(stationId);  //如果没基准，就造一个
                    var url = web_pay_domain+'index.php?r=tCheckout/singleStation&stationId='+stationId+'&mjStatus='+mjStatus;
                        
                    $("#station_"+stationId).load(url, function(){
                        checkout_ajax_lock = false;
                        unlockScreen();
                        loadimg.triggerImgLazyLoad();
                        hideYouhuiIfNone(); //优惠区域，如果没有内容，整个隐藏
                        updateSubmitButtonStatus(stationId);
                        removeStationIfEmpty(stationId);
                        showPrmtList();
                    });
                 }

                 //刷新单个分站页签
                refreshPage4Bfd = function()
                {
                         if(checkout_ajax_lock==true){
                                 return true;
                         }

                         lockScreen(true);
                         checkout_ajax_lock = true;

                         var stationId;
                         $(".station_area").each(function(){
                             if(simpleElementIsVisible(this)){
                                 var areaId = $(this).attr('id');
                                 var idArr = areaId.split('_');
                                 stationId = idArr[1];
                             }
                         });
                         if(! stationId){
                            stationId = _intoObj.getSubStationID();
                         }

                         var mjStatus = getSingleStationMjStatus(stationId);//满减勾选状态
                         confirmShippingBase(stationId);  //如果没基准，就造一个

                         var url = web_pay_domain+'index.php?r=tCheckout/singleStation&stationId='+stationId+'&mjStatus='+mjStatus;
                         $("#station_"+stationId).load(url, function(){
                                     checkout_ajax_lock = false;
                                     unlockScreen();
                                     loadimg.triggerImgLazyLoad();
                                     hideYouhuiIfNone(); //优惠区域，如果没有内容，整个隐藏
                                     updateSubmitButtonStatus(stationId);
                                     removeStationIfEmpty(stationId);
                                     showPrmtList();
                         });
                 }

                //刷新所有分站页签
                refreshAllPage = function(){
                    var secondTag = true;
                    var curr_station_id = 1;
                    var tag_num = 0;
                    $('.station_area').each(function(){
                        if($(this).is(':has(.renquan)')){
                            secondTag = false;
                        }
                        if($(this).css('display') == 'block'){
                            var curr_station = $(this).attr('id').split('_');
                            curr_station_id = curr_station[1];
                        }
                        tag_num++;
                    });
                    if((curr_station_id != _intoObj.getSubStationID()) || (tag_num == 2 && secondTag == true)){
                        location.reload();
                    }else{
                        refreshPage4Bfd();
                    }
                }

                 function removeStationIfEmpty(stationId)
                 {
                    var tryAgainNum = $("#station_"+stationId).find("#try_again").length;
                    if (tryAgainNum<=0) {
                        var recordNum = $("#station_"+stationId).find(".cart_goods_record").length;
                        if(recordNum==0){
                            //删除当前分站页签
                            $("#station_"+stationId).hide();
                            $(".cart_tag_station_"+stationId).hide();

                            if($(".station_area").length==1){
                                //如果全部空，则显示无商品状态
                                $("#cart_nogoods_page").show();
                                $("#cart_hasgoods_page").hide();
                            }else{
                                //如果全部空，则显示无商品状态
                                //触发第二个页签去加载内容，不要空着
                                 var tagDOMs = $("#station_nav>li").not("#cart_zhinan");
                                 tagDOMs.trigger('click');
                            }
                        }else{
                            $("#station_"+stationId).show();
                            $(".cart_tag_station_"+stationId).show();
                            $("#cart_nogoods_page").hide();
                            $("#cart_hasgoods_page").show();
                        }
                    }
                 }

                 //如果没有基准，找个基准设置上，规则是勾选的商品集合中，找最早配送日期最早的
                 //补充： 换购方式购买的商品，不能做基准
                 function confirmShippingBase(stationId)
                 {
                         var shippingBase = $.cookies.get('shippingBase');
                         if(typeof shippingBase=='undefined' || shippingBase=="" || shippingBase==null)
                         {
                                 var earliestObj=null;
                                 $("#station_"+stationId).find(".check_cart_page:checked").each(function(){
                                         if($(this).attr('cartMethod')!=='2'){
                                             if(earliestObj==null){
                                                     earliestObj = this;
                                             }else{
                                                     var canSendDayOfEarliest = $(earliestObj).attr('canSendDay');
                                                     var timestampOfEarliest = get_unix_time(canSendDayOfEarliest);

                                                     var canSendDayOfThis = $(this).attr('canSendDay');
                                                     var timestampOfThis = get_unix_time(canSendDayOfThis);

                                                     if(timestampOfThis<timestampOfEarliest)
                                                             earliestObj = this;
                                             }
                                         }
                                 });
                                 if(earliestObj!=null){
                                         setShippingBaseCookie(earliestObj, stationId);
                                 }
                         }
                 }

                 function deleteShippingBaseCookie(stationId)
                 {
                         cookieConfig('shippingBase_'+stationId, '', 0);
                 }

                 function setShippingBaseCookie(checkObj, stationId)
                 {
                         var skuId = $(checkObj).attr('skuId');
                         var cartMethod = $(checkObj).attr('cartMethod');
                         cookieConfig('shippingBase_'+stationId, skuId+'|'+cartMethod, 1);
                 }

                 function getStationIdByDomPosition(obj)
                 {
                         var objId = $(obj).closest('.station_area').attr('id');
                         var idArr = objId.split('_');
                         var stationId = idArr[1];
                         return stationId;
                 }

                 //从复选框的状态获得当前满减策略
                 function getSingleStationMjStatus(stationId)
                 {
                         var mjObj = $("#station_"+stationId).find('.giveup_mj');
                         var mjObjDisabled = $(mjObj).attr('disabled');
                         var mjObjChecked = $(mjObj).attr('checked');
                         var mjStatus = 0;
                         if(mjObjDisabled)
                             mjStatus = 3;
                         else if(mjObjChecked)
                             mjStatus = 2;
                         else
                             mjStatus = 1;
                         return mjStatus;
                 }


                 //添加换购到购物车
                 function addSaleGfit(obj)
                 {
                         var skuId = Number($(obj).attr('skuId'));
                         var amount = Number($(obj).attr('goodsNum'));
                         var hasSelected = Number($(obj).closest('.huangou_area').find("#hasSelected").val());
                         var mzGiftNum = Number($(obj).closest('.huangou_area').find("#mzGiftNum").val());
                         if(hasSelected>=mzGiftNum){
                                 var complex = '';
                                 if(language == 'en' && mzGiftNum>1){
                                         complex = 's';
                                 }
                                 alert(checkoutTx[6]+mzGiftNum+checkoutTx[7]+complex);
                         }else{
                                 var objId = $(obj).closest('.station_area').attr('id');
                                 var idArr = objId.split('_');
                                 var stationId = idArr[1];
                                 $car.addGoods(skuId, amount, '2', 1, 999, function(){refreshSingleStation(obj)}, 0, stationId);
                         }
                 }

                 //更新省市区

                 saveGeoToCookie = function(provId, cityId, distId,areaId)
                 {
                          psSaveToCookie(provId, cityId, distId,areaId);
                          var showAreaDom = $(".station_area:visible");
                          var anyDom = $(showAreaDom).find('#target');
                          refreshSingleStation(anyDom);
                 }

                 function deleteShippingBaseIfFit(obj, stationId)
                 {
                         var shippingBase = $.cookies.get('shippingBase');


                         if(typeof shippingBase!='undefined' && typeof shippingBase!='null' &&shippingBase!="" &&shippingBase!=null){
                                 var shippingBaseArr = shippingBase.split('|');

                                 var shippingBaseskuId = shippingBaseArr[0];
                                 var shippingBasecartMethod = shippingBaseArr[1];

                                 if(shippingBaseskuId == $(obj).attr('skuId')
                                         && (shippingBasecartMethod == $(obj).attr('cartMethod') || shippingBasecartMethod == $(obj).attr('promoteType'))
                                 )
                                         deleteShippingBaseCookie(stationId);
                         }
                 }

                 function updateSubmitButtonStatus(stationId)
                 {
                         var checkedNum = $("#station_"+stationId).find(".check_cart_page:checked").length;
                         if(checkedNum<1){
                               $("#station_"+stationId).find(".grey_sbmit_button").show();
                               $("#station_"+stationId).find(".red_sbmit_button").hide();
                         }else{
                               $("#station_"+stationId).find(".grey_sbmit_button").hide();
                               $("#station_"+stationId).find(".red_sbmit_button").show();
                         }
                 }

                 function showPrmtList()
                 {
                        $(".cart_youhui_list").each(function(){//对每个分站，只显示4条
                               $(this).find('li').each(function(i){
                                       if(i>=4){
                                               $(this).hide();
                                       }
                               });
                               $(this).show();
                        });
                 }

                 function sync_load(url){
                     _BFD.script = document.createElement("script");
                     _BFD.script.type = 'text/javascript';
                     _BFD.script.async = true;
                     _BFD.script.charset = 'utf-8';
                     _BFD.script.src = url;//(('https:' == document.location.protocol?'https://ssl-static1':'http://static1')+'.baifendian.com/service/tuotuogongshe/ttgs_cart.js');
                     document.getElementsByTagName("head")[0].appendChild(_BFD.script);
                 }

                 function get_unix_time(dateStr)
                 {
                     var newstr = dateStr.replace(/-/g,'/');
                     var date =  new Date(newstr);
                     var time_str = date.getTime().toString();
                     return parseInt(time_str.substr(0, 10));
                 }

                 function showV3Msg()
                 {
                        var timeStampNow = (new Date()).valueOf();

                        var str = '2014-11-31';
                        str = str.replace(/-/g,'/');
                        var timeStampDeadLine = (new Date(str)).valueOf();

                        if(timeStampNow<timeStampDeadLine){
                                $("#cart_zhinan").show();
                               var v3msg = $.cookies.get('v3_msg');
                               if (v3msg == '' || typeof v3msg == 'undefined' || v3msg == null) {
                                       $('#v3_msg').show();
                                       lockScreen(false);
                                       cookieConfig('v3_msg', '1', 24 * 60);
                               }
                         }
                 }

               function simpleElementIsVisible(elm)
               {
                    if (typeof (elm.style) != "undefined" && ( (typeof (elm.style.display) != "undefined" && $.trim(elm.style.display) == "none") )
                    ) {
                        return false;
                    } else {
                        return true;
                    }
                };

               function hideYouhuiIfNone()
               {
                    $(".cart_youhui_list").each(function(){
                        var liNum = 0;
                        $(this).find("li").each(function(){
                            if(simpleElementIsVisible(this)){
                                liNum++;
                            }
                        });
                        if(liNum<=0){
                            $(this).closest(".cart_youhui").hide();
                        }
                    });
                }
        });

    //增加兑换券兑换商品功能
var voucherChs = '请输入兑换券号码@@请选择兑换商品！@@兑换券号码无效，请刷新后重试！@@@@取消兑换后，购物车里的兑换品将会被删除哦~~@@兑换券已经过期@@已使用兑换券@@1张@@订单金额要满@@元，才能使用兑换券，再去凑点吧～～～@@很抱歉，当前没有可兑换商品~';
var voucherArr = voucherChs.split('@@');

    //兑换券相关业务逻辑
    VoucherModel = {
        //优惠券促销类型，用于cookie
        saleTyVoucher : 'v',
        //兑换券cookie
        voucherCartCookieName : 'vouchercart',
        //cookie domian
        cartCookieDomain : '.tootoo.cn',

        //获取当前兑换券可兑换商品
        getAllGoodsListByCode : function(){
            var voucher_code = $("input[name='voucher_code']").val();
            if(VoucherModel.checkVoucherCodeIsSafe(voucher_code)){
                lockScreen(true);
                voucher.vCode = voucher_code;
                voucher.getAllGoodsListByCode(View.renderGoodsListForVoucher);
            }else{
                View.showError(voucherArr[0]);
            }
        },
        //获取当前用户所有兑换券列表
        getAllVoucherList : function(){
            voucher.getAllVoucherList(View.updateExchangeVoucher);
        },
        //检查兑换券是否可用
        checkVoucherCodeIsSafe : function(voucher_code){
            if(voucher_code){
                return true;
            }
            return false;
        },
        //获取cookie中的兑换券相关信息
        getVoucherInfoFromCookie : function(){
            var voucherInfo = $.cookies.get(VoucherModel.voucherCartCookieName);
            if(voucherInfo){
                var voucherArr = voucherInfo.split('_');
                return voucherArr;
            }
            return false;
        },
        //清楚购物车中的兑换商品以及兑换券信息
        delCarGoodsForVoucher : function(){
            $car.delVoucherGoods4Cart();
            $.cookies.set(VoucherModel.voucherCartCookieName, '', {path: '/', hoursToLive: 720, domain: VoucherModel.cartCookieDomain});
        },
        //获取购物车中已经勾选的商品总价
        getAllSelectedGoodsTotal : function(){
            var goodsTotal = $('#selectedAllGoodsTotal').html();
            if(!isNaN(goodsTotal)){
                return parseFloat(goodsTotal, 2);
            }
        },
        //将页面中的所有复选框全部选中
        selectedAllCheckboxForVoucher : function(checked){
            $('input[name="voucher_checkbox"]').each(function(){
                if(checked == true){
                    $(this).attr('checked', true).attr('_show', '0');;
                }else{
                    $(this).attr('checked', false).attr('_show', '1');;
                }
            });
        },
        //使用兑换券绑定操作
        exchangeVoucherCheckedInput : function(obj){
            if(obj.attr('checked') == true){
                VoucherModel.selectedAllCheckboxForVoucher(true);
            }else{
                VoucherModel.selectedAllCheckboxForVoucher(false);
            }

            if(Presenter.isLogined('refreshAllPage')){
                if(Presenter.getVoucherInfoFromCookie()){
                    View.updateCheckBoxStatus(obj, true);
                    View.showConfim(voucherArr[4],'Presenter.delCarGoodsForVoucher','View.selectVoucherInput');
                }else{
                    View.selectedExchangeVoucher(obj);
                }
            }else{
                View.updateCheckBoxStatus(obj);
            }
        },
        //更改购物车可退换商品列表
        changeVoucherGoodsFromCar : function(){
            var voucherInfo = VoucherModel.getVoucherInfoFromCookie();
            if(voucherInfo && voucherInfo[0]){
                View.changeVoucherInputValueAndGetAllGoodsList(voucherInfo[0]);
            }else{
                View.showError('请刷新购物车！');
            }
        },
        //如果当前购物车中有兑换商品，则将兑换商品选择，病更新已经选择的商品数量
        selectDefaultVoucherGoods : function(){
            var voucherGoodsInfo = View.getSelectedVoucherGoodsID();
            if(voucherGoodsInfo){
                var goodsInfo = voucherGoodsInfo.split('#');
                if(goodsInfo[0]){
                    var goodsList = goodsInfo[0].split('|');
                    if(goodsList[0]){
                        var goods = goodsList[0].split('_');
                        if(goods[0]){
                            View.selectGoodsFromVoucherList(goods[0]);
                        }
                    }
                }
            }
        }

    };
    //主控制器
    Presenter = {
        difference : 0,
        init : function(){
            //绑定页面事件
            View.addExChangeVoucherHader();
            //订单初始化voucher对象
            voucher = new Voucher();
        },
        //获取当前用户的兑换券列表
        getAllVoucherList : function(){
          VoucherModel.getAllVoucherList();
        },
        //获取当前兑换的所有商品
        getAllGoodsListByCode : function(){
          if(Presenter.isLogined('refreshAllPage')){
            VoucherModel.getAllGoodsListByCode();
          }
        },
        //获取cookie中是否保存有兑换券的信息
        getVoucherInfoFromCookie : function(){
          return VoucherModel.getVoucherInfoFromCookie();
        },
        //清除购物车中的兑换商品
        delCarGoodsForVoucher : function(){
            VoucherModel.delCarGoodsForVoucher();
            refreshAllPage();
        },
        //对优惠券金额进行校验
        checkVoucherGoodsMoneyFromCart : function(){
            if(language == 'en'){
                return false;
            }
          var voucherInfo = VoucherModel.getVoucherInfoFromCookie();
          var goodsTotal = VoucherModel.getAllSelectedGoodsTotal();
          if(voucherInfo && voucherInfo[2] != '0'){
            if(parseFloat(voucherInfo[2], 2) > goodsTotal){
              View.showError(voucherArr[8] + voucherInfo[2] + voucherArr[9]);
              return true;
            }
          }
          if(voucherInfo && goodsTotal && voucherInfo[1] > '0'){
            var date = Date.parse(new Date());
                date = parseInt(date) + Presenter.diffTime;
            if(date > voucherInfo[1]){
                View.showError(voucherArr[5]);
                return true;
            }

          }
          return false;
        },
        //加载完购物车后执行的代码，用来计算当前时间和服务器的时间差
        diffTime : function(){
            var currentTime = Date.parse(new Date());
            var sysDateTime = $('#systemDate').html();
            Presenter.difference = parseInt(sysDateTime) - parseInt(currentTime);
        },
        //判断用户是否登录
        isLogined : function(_call){
          if(buyerInfo.getIsGuest()){
            if(_call){
              buyerInfo.popUpSimpleLoginLayer(_call);
            }else{
              buyerInfo.popUpSimpleLoginLayer();
            }
            return false;
          }
          return true;
      }

    }
    //视图模型，主要用来展示和绑定事件
    View = {
        //绑定兑换商品事件
        addExChangeVoucherHader : function(){
            //绑定选择兑换券信息
            $(".exchange_voucher").live('click',function(){
                var obj = $(this).parent().find('input');
                View.selectedExchangeVoucher(obj);
            });
            //绑定取消兑换券信息
            $("#cancel_exchange_voucher").live('click',function(){
                View.noSelectExchangeVoucher();
            });
            //绑定复选框操作
            $('.exchange_voucher_checked_input').live('click',function(){
                VoucherModel.exchangeVoucherCheckedInput($(this));
            });
            //绑定兑换按钮操作
            $('.do_exchange_voucher').live('click',function(){
                var code = $(this).parent().find('input').val();
                View.setInputValueForVoucherCode(code);
                Presenter.getAllGoodsListByCode();
            });
            //关闭复层按钮
            $('#close_voucher_goods_list').live('click',function(){
                $('#voucher_goods_from_service').hide();
                unlockScreen(true);
            });
            //取消按钮
            $('#cancel_voucher_goods').live('click',function(){
                //将已经选择的商品去掉
                $('#voucher_goods_from_service').hide();
                unlockScreen(true);
            });
            //确定选择按钮
            $('#selected_vourcher_goods').live('click',function(){
                View.selectedGoodsFromVoucherList();
            });
            //复选框按钮
            //$('.voucher_goods_checkbox').live('click',function(){
            //    View.selectGoodsFromVoucherList($(this).val());
            //});
            //列表按钮点击使用
            $('.select_voucher_code_from_voucher_list').live('click',function(){
                View.selectedVoucherCodeFromVoucherList($(this));
            });
            //兑换商品列表左滚动按钮
            $('#roll_left').live('click',function(){
                View.clickLeftRoll();
            });
            //兑换商品列表右滚动按钮
            $('#roll_right').live('click',function(){
                View.clickRightRoll();
            });
            //购物车兑换按钮
            $('.xblue').live('click',function(){
                VoucherModel.changeVoucherGoodsFromCar();
            });
            //选择商品绑定事件
            $('.select_voucher_goods_dt').live('click',function(){
                View.selectGoodsFromVoucherList($(this).attr('_id'));
            });

        },
        //将两个input框中的问题设置为一样的
        setInputValueForVoucherCode : function(code){
            $('input[name="voucher_code"]').each(function(){
                $(this).val(code);
            });
        },
        //点击左边
        clickLeftRoll : function(direction){
          var dc = $('#voucher_goods_list_div dl').length;
          if(typeof lc == 'undefined')
              lc = 0;
          if(typeof rc == 'undefined')
              rc = dc-5;
          $('#roll_right').show();
          if(!lc){
              $('#roll_left').hide();
              return false;
          }else{
              $('#roll_left').show();
          }
          lc--;
          rc++;
          $('#voucher_goods_list_div').animate({left:'+=130px'}, 500);
        },
        //点击右边
        clickRightRoll : function(){
          var dc = $('#voucher_goods_list_div dl').length;
          if(typeof lc == 'undefined')
              lc = 0;
          if(typeof rc == 'undefined')
              rc = dc-5;
          $('#roll_left').show();
          if(!rc){
              $('#roll_right').hide();
              return false;
          }else{
              $('#roll_right').show();
          }
          lc++;
          rc--;
          $('#voucher_goods_list_div').animate({left:'-=130px'}, 500);
        },
        //点击兑换商品
        selectedExchangeVoucher : function(obj){
            var isShow = obj.attr('_show');
            if(isShow == 1){//表明已经展示了
                View.showOrHiddenVoucherListDiv(true);
            }else{
                View.showOrHiddenVoucherListDiv(false);
                $('.exchange_voucher').each(function(){
                    $(this).hide();
                });
                if(obj.attr('_isLoading') == 0){
                    obj.attr('_isLoading','1');
                    Presenter.getAllVoucherList();
                } 
            }
        },
        //展示或隐藏兑换券列表区域
        showOrHiddenVoucherListDiv : function(hidden){
            $('.exchange_voucher_div').each(function(){
                if(hidden == true){
                    $(this).hide();
                }else{
                    $(this).show();
                }
            });
        },
        //点击取消兑换商品
        noSelectExchangeVoucher : function(){
            $('#exchange_voucher').show();
            $('#cancel_exchange_voucher').hide();
            $("#exchange_voucher_div").hide();
            $('#exchange_voucher_checked_input').attr('checked',false);
            //取消兑换需要将已经兑换的商品删除掉
        },
        //将使用兑换券复选框勾选上
        selectVoucherInput : function(){
          $('#exchange_voucher_checked_input').attr('checked',true);
        },
        //将兑换券列表的标示更改为已经选择
        updateExchangeVoucher : function(data){
          data['voucherInfo'] = Presenter.getVoucherInfoFromCookie();
          var html = template('voucher_list',data);
          $('.exchange_voucher_list').each(function(){
            $(this).html(html).show().attr('_isLoading', '1');
          });
          //$('#exchange_voucher_list').html(html).show().attr('_isLoading', '1');
          if(data['voucherInfo'] && data['voucherInfo'][0]){
            $("input[name='voucher_code']").val(data['voucherInfo'][0]);
            if(data['voucherInfo'][3]){
                var voucherTitle = voucherArr[6] + "<font style='color:red;'>" + data['voucherInfo'][3] + "</font>" + voucherArr[7];
                View.showVoucherErrorInfo(voucherTitle);
            }
          }
        },
        //兑换券信息提示
        showVoucherErrorInfo : function(msg){
            $("#cart_lock_screen").hide();
            $('.voucher_title').each(function(){
                $(this).html(msg);
            });
            //$("#voucher_title").html(msg);
        },
        //检查兑换券商品是否已经绑定
        checkVoucherIsLoading : function(){
            if($('#exchange_voucher_list').attr('_isLoading') == '0'){//说明未加载过兑换券列表
                return false;
            }
            return true;
        },
        //显示模版信息
        renderGoodsListForVoucher : function(data){
            if(data['goodsInfo'].length > 0){
                data['vouchercookie'] = $car.getCartSkuIdFromCookieToStr();
                data['vInfo'] = data['voucherSn'] + '_' + data['expireTime'] + '_' + data['orderMoney'] + '_' + data['voucherName'];
                var html = template('voucher_goods_list',data);
                $('#voucher_goods_div').html(html).show();
                $('.select_voucher_goods_dt').each(function(){
                    if($(this).attr('_isChecked') == '1'){
                        View.updateSelectedVourcherGoodsBtn(true);
                        VoucherModel.selectDefaultVoucherGoods();
                    }
                });
            }else{
                View.showVoucherErrorInfo('<font style="color:red;">' + voucherArr[10] + '</font>');
            }
        },
        //兑换商品列表选择商品--
        selectGoodsFromVoucherList : function(skuId){
            if(!skuId)
                return false;
            var max_buy_num = View.getMaxBuyerNumFromVoucher();
            var current_buy_num = 0;
            if(max_buy_num == 1){
                $('.select_voucher_goods_dt').each(function(){
                    $(this).removeClass('curr-item').attr('_isChecked','0');
                });
                $('#voucher_goods_' + skuId).addClass('curr-item').attr('_isChecked','1');
                current_buy_num++;
            }else{//最多可购买不是1件
                var selected_buy_num_from_vourcher = 0;

                if($('#voucher_goods_' + skuId).attr('_isChecked') == '1'){
                    $('#voucher_goods_' + skuId).removeClass('curr-item').attr('_isChecked','0');
                }else{
                    $('#voucher_goods_' + skuId).addClass('curr-item').attr('_isChecked','1');
                }

                $('.select_voucher_goods_dt').each(function(){
                    if($(this).attr('_isChecked') == '1'){
                        selected_buy_num_from_vourcher++;
                        current_buy_num++;   
                    }
                });
                if(selected_buy_num_from_vourcher > max_buy_num){
                    $('#voucher_goods_' + skuId).removeClass('curr-item').attr('_isChecked','0');
                    View.showError('最多可兑换'+max_buy_num+'件');
                    return false;
                }
            }
            
            if(current_buy_num > 0){
                View.updateSelectedVourcherGoodsBtn(true);
            }
            View.updateBuyerNumForVoucher(current_buy_num);
        },
        //更改兑换商品按钮状态
        updateSelectedVourcherGoodsBtn:function(available){
            if(available == true){
                $('#selected_vourcher_goods').addClass('btn_ok').removeClass('btn_quit');
            }else{
                $('#selected_vourcher_goods').addClass('btn_quit').removeClass('btn_ok');
            }
        },

        //兑换商品选择商品并记录cookie
        selectedGoodsFromVoucherList : function(){
            var goodsIds = View.getSelectedVoucherGoodsID();
            if(goodsIds){
                var vInfo = goodsIds.split('#');
                if(vInfo.length == 2){
                    var vcInfo = vInfo[1].split('_');
                    
                    var voucherCode = vcInfo[0];
                    var validityPeriod = vcInfo[1];
                    var voucherAmount = vcInfo[2];
                    var voucherTitle = vcInfo[3];
                    
                    var goodsInfo = vInfo[0].split('|');
                    if(goodsInfo){
                        for(var i = 0; i < goodsInfo.length; i++){
                            if(goodsInfo[i]){
                                var goods = goodsInfo[i].split('_');

                                var skuId = parseInt(goods[0]);
                                var amount = parseInt(goods[1]);
                                var minBuyNum = parseInt(goods[1]) - 1;
                                var maxBuyNum = parseInt(goods[1]) + 1;
                                var myBuyFrom = 'v';
                                var stationId = parseInt(goods[2]);
                                var callback = function(){View.closeVourcherListDiv()};

                                $car.addVoucherGoods(skuId, amount, minBuyNum, maxBuyNum, callback, myBuyFrom, stationId, voucherCode, validityPeriod, voucherAmount, voucherTitle);
                            
                            }
                        }
                    }
                }
            }else{
              View.showError(voucherArr[1]);
            }
        },
        //获取已经选择的商品ID
        getSelectedVoucherGoodsID : function(){
            var goodsIds = '';
            $('.select_voucher_goods_dt').each(function(){
                if($(this).attr('_isChecked') == '1'){
                    goodsIds += $(this).attr('_id') +'_' +$(this).attr('_number') + '_' + $(this).attr('_subStationId') + '|';
                }
            });
            if(goodsIds){
                //后面追加优惠券的信息
                goodsIds += '#' + $("#voucher_info_from_get_volume_goods").val();
            }
            return goodsIds;
        },

        //关闭弹出层按钮
        closeVourcherListDiv : function(){
            $('#voucher_goods_div').hide();
            refreshAllPage();
        },
        //选择兑换券列表中的使用按钮
        selectedVoucherCodeFromVoucherList : function(obj){
          var voucherCode = obj.attr('_voucherCode');
          if(voucherCode){
            if(obj.attr('_isSelected') == '0'){
                View.changeVoucherInputValueAndGetAllGoodsList(voucherCode);
            }
          }else{
              View.showError(voucherArr[2]);
          }
        },
        //更改兑换券中输入框的值，并发起请求
        changeVoucherInputValueAndGetAllGoodsList : function(voucherCode){
            //将兑换券框展开
            Presenter.getAllVoucherList();
            View.showOrHiddenVoucherListDiv(false);
            $("input[name='voucher_code']").val(voucherCode);
            Presenter.getAllGoodsListByCode();
        },
        //获取当前优惠券最大可购买数量
        getMaxBuyerNumFromVoucher : function(){
            var max_buy_num = parseInt($('#max_buy_num_from_voucher_list').html());
            if(isNaN(max_buy_num)){
                max_buy_num = 1;
            }
            return max_buy_num;
        },
        //更新已经选的兑换商品数量
        updateBuyerNumForVoucher : function(num){
            $('#current_buy_num_from_voucher_list').html(num);
        },
        //改变复选框的选中状态
        updateCheckBoxStatus : function(obj, checked){
            var checkbox = obj;
            if(checked == true){
                checkbox.attr('checked', true);
            }else if(checked == false){
                checkbox.attr('checked', false);
            }else{
                if( checkbox.attr('checked') == true ){
                    checkbox.attr('checked', false);
                }else{
                    checkbox.attr('checked', true);
                }
            }
        },

        //显示错误信息
        showError : function(errInfo){
            alert(errInfo);
        },
        //确认弹窗
        showConfim : function(title, confi, cancel){
          myAlert({
              msg:title,
              cls:true,
              btn:[{
                  text:checkoutTx[1],
                  fn:function(){
                    eval(confi + "()");
                  }
              },{
                  text:checkoutTx[2],
                  fn:function(){
                    eval(cancel + "()");
                  }
              }]
          });
        }
    };

    //页面初始化注册事件
    Presenter.init();

});
