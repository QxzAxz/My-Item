define(['jquery','geos','header','lang', 'wx', 'wx.config', 'wx.ajax','wx.cookie', 'wx.validator'], function ($, geos,header,lang,wx, config) {
return function(toAction,isquick){
    var lastMobile,nedPicCode = true,company_mail_ck = false,scope,registerForm,wxval;
    var smsCheckflag = false;
    var quick = 1;//不写普通登录 1是快捷登录 2是快捷登录且带输入正确图形验证码
    var smsVoiApi = 'getCheckSms';
        scope = '11101';
    if(geos.getSubStationID() == '1'){
        $('.Js-regBjAd').show();
    }else{
        $('.Js-regShAd').show();
    }
    
    if(isquick == 'qk'){
        registerForm = $('form[name="quick"]');    
        wxval = wx.validator['quick'];
    }else{
        registerForm = $('form[name="register"]');
        wxval = wx.validator['register'];
        //IE10兼容问题
        if(!wxval){
            wx.validator();
            wxval = wx.validator['register'];
        }
    }
    
    var key;
    if(wx.cookie('sstk'))
        key = wx.cookie('sstk').split('|')[0] + new Date().getTime();
    else
        key = new Date().getTime();
    registerForm.on('validator:before', function (event) {
        if ($('.wx-validator-email-empty',registerForm).is(':visible') || $('.Js-vcodeOk',registerForm).is(':hidden'))
            return false;
        if($(this).find('input[name="passWord"]').val() != $(this).find('input[name="password_again"]').val()){
            $(this).find('.wx-validator-password_again-equalTo').show();
            $(this).find('input[name="password_again"]').parent().removeClass('yes').addClass('no');
            return false;
        }
        if($(this).find('input[name="comemail_new"]').length){
            if(!company_mail_ck) return false;
        }
        $('.Js-registerError',registerForm).hide();
        $(this).find('input[name="inviteBuyerId"]').val(wx.getParamByName('inviteId')||0);
        $(this).find('[name="uniqueKey"]').val(key);
        $(this).find('[name="regFrom"]').val(wx.cookie('buyersource')||wx.getParamByName('buyersource'));
        $(this).find('[name="mobile"]').val(wx.trim($(this).find('[name="loginName"]').val()));
        $(this).find('[name="req_str"]').val(stringToData($(this).serialize()));
        $(this).find('[name="sms_code"]').val($(this).find('[name="smsCheckCode"]').val());
        return true;
    });




    var stringToData = function(string) {
      var tempURL = string.split('&'), json="";
      for(var i = 0;i<tempURL.length;i++){
        var t = tempURL[i].split('=');
        if(t[0] == 'req_str') continue;
        json += '"'+t[0]+'":"'+decodeURIComponent(t[1])+'",';
      }
      return "{"+json.slice(0,-1)+"}";
    };

    registerForm.off('validator').on('validator', function (event, data){
        if (config.getStatus(data) == 0) {
            header.setUserHeader();
            if(toAction == 'reload'){
                location.reload();
            }else if(toAction == 'tourl'){
                location.href = wx.getParamByName('tourl') || document.refer || config.url.web;
            }else if($(this).find('[name="comemail_new"]').length){
                wx.sendData(config.url.api_m+'companyEmailSend&req_str={"scope": "'+scope+'","companyEmail":"'+$(this).find('[name="comemail_new"]').val()+'"}',{'throttle': false},function(result){
                    if(config.getStatus(result) == 0){
                        location.href = config.url.user + 'index.php?r=tBuyer/companyRegSucc&companyEmail='
                        +$('input[name="comemail_new"]',registerForm).val()+'&email='+$('input[name="loginName"]',registerForm).val();
                    }
                })

            }else if($(this).find('[name="buyer_name"]').length){
                location.href = wx.getParamByName('tourl') || document.refer || config.url.web;
            }else{
               
                var ps = geos.getPs().split('-');
                wx.sendData(config.url.api_m+'insertBuyerRegional&req_str={"buyerSubstationId":"'+geos.getSubStationID()+'","buyerProvincesId":"'+ps[0]+'","buyerCityId":"'+ps[1]+'","scope":"'+scope+'"}',function(){
                        if(data.Result.Data.isInvite=='1')
                            location.href = config.url.user + 'index.php?r=tBuyer/regSuccInvite' + (wx.getParamByName('tourl') ? '&tourl=' + wx.getParamByName('tourl') : '');
                        else
                            location.href = config.url.user + 'index.php?r=tBuyer/regSucc' + (wx.getParamByName('tourl') ? '&tourl=' + wx.getParamByName('tourl') : '');
                })
              
            }
           $('.Js-dialog-close').trigger('click');
        } else {
            if(config.getStatus(data) == 101101){

            }else{
                if($('.Js-registerError',registerForm).length){
                    $('.Js-registerError',registerForm).text(config.getInfo(data)).show();    
                }
            }
            
            //else
              //  wx.alert(config.getInfo(data));
        }

    });

    $('#Js-vcodeimg',registerForm).removeAttr('initsrc').unbind('click').click(function(){
         $('.wx-validator-picCheckCode-success',registerForm).hide();
         wxval.find('picCheckCode').isValid = false;
        $(this).attr('src',config.url.api+'authorize/MainServlet?method=getCheckPic&req_str={"scope":"'+scope+'","uniqueKey":"'+key+'"}&_t='+(new Date()|0));
    }).attr('src',config.url.api+'authorize/MainServlet?method=getCheckPic&req_str={"scope":"'+scope+'","uniqueKey":"'+key+'"}&_t='+new Date().getTime());;
    
    $('input[name="loginName"]',registerForm).off('validator').on('validator', function (event, isValid) {
            $('#Js-emailOk,#Js-emailError',registerForm).hide();
            $(this).parent().removeClass('yes');
        
        if (!isValid){
            $("#smscode",registerForm).slideUp();
	        $('.mobile_code',registerForm).hide();
            $('.Js-voice',registerForm).hide();
            return;
        }
        
        var type = -1, $this = $(this), value = $this.val(),
                email = wxval.find('loginName');
            if (wx.validator.rule.mobile(value))
                 type = 0;
        
           


        /*else if(wx.validator.rule.email(value))
        	type = 1;*/
        else {
            $this.parent().removeClass('yes').addClass('no');
                $('#Js-emailError',registerForm).show().text('手机号格式不正确，请重新输入');
            $('.mobile_code',registerForm).hide();
            $('.Js-voice',registerForm).hide();
            return;
        }

        if (type >= 0) {
            wx.sendData(config.url.api_m + 'checkRegisterInput&req_str={"loginName":"'+value+'","nickName":null,"loginNameType":"'+type+'","scope":"'+scope+'"}', {'throttle': false},function(data){
                if(lastMobile != value){
                    $('.code_wrap',registerForm).animate({'left':'0px'},500,function(){
                        $('.Js-smsCode',registerForm).hide();
                    });
                    $('#picode',registerForm).removeClass('ma_yes');
                    $('#picode_err span',registerForm).hide();
                    $('#Js-vcodeimg',registerForm).trigger('click');
                    $('#emailcode',registerForm).val('');
                    lastMobile = value;
                }
                if(data.Result.Data.loginNameCheckResult == 0){
                    email.isValid = true;
                    $('#Js-emailError',registerForm).hide();
                    $('#Js-emailOk',registerForm).show();
                    $("#smscode",registerForm).slideDown();
                    $('.mobile_code',registerForm).slideDown();
                    $('.Js-voice',registerForm).show();
                    $this.parent().removeClass('no').addClass('yes');
                    //$('#Js-vcodeimg').trigger('click');
                } else {
                    email.isValid = false;
                    if(data.Result.Data.loginNameCheckResult == 100507)
                        $('#Js-emailError',registerForm).show().text('该手机号已经与其他账户绑定，不能用来注册新用户');
                    else
                            $('#Js-emailError',registerForm).show().text('用户名已经存在！');
                    $('#Js-emailOk',registerForm).hide();
                    $("#smscode",registerForm).hide();
                    $('.mobile_code',registerForm).hide();
                    $('.Js-voice',registerForm).hide();
                    $this.parent().removeClass('yes').addClass('no');
                    $('.wx-validator-email-empty,.wx-validator-smsCheckCode-ajax,.wx-validator-smsCheckCode-required',registerForm).hide();
                }
            })
        } 
    });
    /**
     * 验证企业邮箱
     */
    $('input[name="comemail_new"]',registerForm).on('validator', function (event, isValid) {
        var $this = $(this);
        $this.parent().removeClass('yes');
        if(!isValid) return;
        wx.sendData(config.url.api_m + 'companyEmailCheck&req_str={"companyEmail":"'+$(this).val()+'","scope":"'+scope+'"}', {'throttle': false},function(data){
            if(data.Result.Header.resultID == 0){
                $this.parent().addClass('yes');
                company_mail_ck = true;
            }
            else{
                $this.parent().addClass('no');
                wxval.find('comemail_new').isValid = false;
                $('.wx-validator-comemail_new-error').text('验证失败,请检查公司邮箱！').show();
            }
        });
    });
    
    $('input[name="smsCheckCode"]',registerForm).off('validator').on('validator', function (event, isValid) {
        $('#err_vcode_txt',registerForm).hide();
    });
    //图形验证码
    $('input[name="picCheckCode"]',registerForm).off('validator').on('validator', function (event, isValid) {
        $('#Js-picCodeSucc',registerForm).hide();
        if(scope == '21101'){
            $('#validation',registerForm).hide();
        }
        if(!isValid) return;
        wxval.find('picCheckCode').isValid = true;
        var $this = $(this);
        times = 0;
        $('.wx-validator-picCheckCode-error',registerForm).hide();
        $this.parent().removeClass('ma_yes');
        wx.sendData(config.url.api_m + 'doCheckCode&req_str={"scope":"'+scope+'","uniqueKey":"'+key+'","checkCode":"'+$(this).val()+'"}', {throttle: false}).success(function () {
            $('.wx-validator-picCheckCode-error',registerForm).hide();
            $this.parent().addClass('ma_yes');
            $('#Js-picCodeSucc',registerForm).show();
            quick = 2;
            $('#smscode').removeClass('ma_no');
            $('.wx-validator-smsCheckCode-required',registerForm).hide();
            $('.Js-smsCode',registerForm).show();
            $('.code_wrap',registerForm).animate({'left':'-380px'},500,function(){
                $('input[name="smsCheckCode"]',registerForm).focus();
                $('#get_focus',registerForm).trigger('click');
            });
            

        }).fail(function(data){
            //英文站
            if(scope == '21101'){
                 $('#validation',registerForm).show();
            }else{
                 $('.wx-validator-picCheckCode-error',registerForm).text(config.getInfo(data)).show();
                 $('input[name="picCheckCode"]',registerForm).focus();
                 $this.parent().addClass('ma_no');
            }
           
        });
    });

    $('.Js-voi-switch',registerForm).unbind('click').click(function(){
            var type = $(this).attr('type');
            if(type == 'voice'){
                smsVoiApi = 'getVoiceCode';
                $(this).attr('type','sms');
                $('.Js-voi-text',registerForm).text('未收到语音?');
                $('.Js-voi-switch',registerForm).text('切换短信验证码');
                $('#get_focus',registerForm).text('发送语音码');
                $('input[name="smsCheckCode"]',registerForm).attr('placeholder','请输入语音验证码');
                $('.Js-require',registerForm).text('请填写语音验证码');
                $('.Js-empty',registerForm).text('请先输入网站验证码，才能获取语音验证码');
                $('.Js-suc',registerForm).text('电话拨打中，请您留意电话');
                $('input[name="checkCodeType"]',registerForm).val(2);
            }else{
                smsVoiApi = 'getCheckSms';
                $(this).attr('type','voice');
                $('.Js-voi-text',registerForm).text('未收到短信?');
                $('.Js-voi-switch',registerForm).text('切换语音验证码');
                $('#get_focus',registerForm).text('发送验证码');
                $('input[name="smsCheckCode"]',registerForm).attr('placeholder','请输入短信验证码');
                $('.Js-require',registerForm).text('请填写短信验证码');
                $('.Js-empty',registerForm).text('请先输入网站验证码，才能获取短信验证码');
                $('.Js-suc',registerForm).text('短信验证码发送成功');
                $('input[name="checkCodeType"]',registerForm).val(1);
            }
            $('#smscode',registerForm).removeClass('ma_no');
            $('.Js-smsCode > .zctip',registerForm).find('.tspan').hide();
    });

    $('#get_focus',registerForm).unbind("click").click(function () {
        $('.wx-validator-email-empty,.wx-validator-smsCheckCode-ajax,.wx-validator-smsCheckCode-required').hide();
        if($('input[name="buyer_name"]',registerForm).length){
            $('.wx-validator-smsCheckCode-ajax',registerForm).hide();
            wx.sendData(config.url.api_m + smsVoiApi +'&cookie_need_auth=1&req_str={"scope":"'+scope+'","isQuick":"'+quick+'","mobile":"' + $('input[name="buyer_name"]',registerForm).val() + '","uniqueKey":"'+key+'","checkCode":"'+$('input[name="picCheckCode"]',registerForm).val()+'"}', function(result){
                
                if(result.Result.Header.resultID == 0){
                    if(result.Result.Data.isPicCode == '0' || (smsCheckflag && result.Result.Data.isPicCode == '1')){
                       if(smsCheckflag && result.Result.Data.isPicCode == '1'){
                             if(rePicCode()){
                                return;
                             }
                       }
                        $('#err_vcode_txt',registerForm).show();
                        countDown();
                        nedPicCode = false;
                    }else if(result.Result.Data.isPicCode == '1'){
                        smsCheckflag = true;
                        nedPicCode = true;
                        
                        $('#emailcode',registerForm).attr({'wx-validator-rule':'required|rangeEqual,4'});
                        wxval.addElement($('#emailcode')[0]);
                        $('.code_wrap',registerForm).animate({'left':'0px'},500,function(){
                             $('input[name="picCheckCode"]',registerForm).focus();
                             $('.Js-smsCode',registerForm).hide();
                        });
                        $('#Js-vcodeimg',registerForm).trigger('click');
                    }
                    $('#smscode',registerForm).removeClass('ma_no');
                }else{
                    if(result.Result.Header.resultID == 100901 || result.Result.Header.resultID == 100902){
                        $('.code_wrap',registerForm).animate({'left':'0px'},500,function(){
                             $('input[name="picCheckCode"]',registerForm).focus();
                             $('.Js-smsCode',registerForm).hide();
                        });
                        $('#Js-vcodeimg',registerForm).trigger('click');
                        return;
                    }
                    $('.wx-validator-smsCheckCode-ajax',registerForm).show().find('.ajax_error').text(config.getInfo(result));
                    if(smsVoiApi == 'getVoiceCode'){
                        $('#err_vcode_txt',registerForm).hide();
                    }
                }
            })
            return;
        }
        var code = wxval.find('picCheckCode');
        
        if(rePicCode()){
            return;
        }
        
        if (code.isValid){
            $('.wx-validator-smsCheckCode-ajax',registerForm).hide();
            wx.sendData(config.url.api_m + smsVoiApi +'&cookie_need_auth=1&req_str={"scope":"'+scope+'","mobile":"' + $('input[name="loginName"]',registerForm).val() + '","uniqueKey":"'+key+'","checkCode":"'+$('input[name="picCheckCode"]',registerForm).val()+'"}', {throttle: false}).success(function () {
                $('#err_vcode_txt',registerForm).show();
                $('#smscode',registerForm).removeClass('ma_no');
                countDown();
            }).fail(getCodeFail);
        }else {
            $('.wx-validator-smsCheckCode-required',registerForm).hide();
            $('.wx-validator-email-empty',registerForm).show();
        }
    });
    /**
     * 验证手机验证码
     */
    $('input[name="smsCheckCode"]',registerForm).blur(function () {
        var $this = $(this);
        if (wxval.find('smsCheckCode').isValid == false)
            $('#err_vcode_txt').hide();
       
        $('.wx-validator-smsCheckCode-ajax',registerForm).hide().find('span').text('');
        var placeholder = $this.attr('wx-validator-placeholder');
        if($('input[name="smsCheckCode"]',registerForm).val().length == 0 || $('input[name="smsCheckCode"]',registerForm).val() == placeholder){
            return;
        }
        if($('input[name="buyer_name"]',registerForm).length){
            var tel = $('input[name="buyer_name"]',registerForm).val()
        }else{
            var tel = $('input[name="loginName"]',registerForm).val();
        }
        var checkCodeType= $('input[name="checkCodeType"]',registerForm).val();
        checkCodeType=checkCodeType?checkCodeType:'1';
        wx.sendData(config.url.api_m + 'doCheckSms&cookie_need_auth=1&req_str={"scope":"'+scope+'","mobile":"' + tel + '","smsCode":"'+$(this).val()+  '","checkCodeType":"'+ checkCodeType +   '"}', {'throttle': false}, function (data) {
            $('#err_vcode_txt').hide();
            if (config.getStatus(data) == 0) {
                $('.wx-validator-smsCheckCode-ajax',registerForm).hide();
                $('.Js-vcodeOk',registerForm).show();
                $this.parent().addClass('ma_yes').removeClass('ma_no');
            }else if(config.getStatus(data) == 101101){
                $this.parent().addClass('ma_no').removeClass('ma_yes');
                $('.wx-validator-smsCheckCode-ajax',registerForm).show().find('span').text('').text(data.Result.Header.resultMessage);
            }else {//没有获得验证码直接输入
                $('.wx-validator-smsCheckCode-required',registerForm).hide();
                $('.wx-validator-email-empty',registerForm).hide();
                $('.wx-validator-smsCheckCode-ajax',registerForm).show().find('span').text('').text(data.Result.Header.resultMessage);
                $('.Js-vcodeOk',registerForm).hide();
                $this.parent().addClass('ma_no').removeClass('ma_yes');

            }
        });
    });

        $('.Js-regItem',registerForm).find('input').on('validator',function(event, isValid){        
                if(isValid){
                    if($(this).is('[name="picCheckCode"]') || $(this).is('[name="smsCheckCode"]')){
                        if($(this)[0].value.length >= $(this).attr('maxlength')){
                            $(this).parent().removeClass('ma_no').addClass('ma_yes');    
                        }else{
                            $(this).parent().removeClass('ma_yes').addClass('ma_no');    
                        }
                    }else{
                        $(this).parent().removeClass('no').addClass('yes');
                    }
                } else {
                    if($(this).is('[name="picCheckCode"]') || $(this).is('[name="smsCheckCode"]')){
                         if($(this)[0].value.length >= $(this).attr('maxlength')){
                            $(this).parent().removeClass('ma_yes').addClass('ma_no');    
                         }else{
                            $(this).parent().removeClass('ma_yes').addClass('ma_no');    
                         }
                    }else
                        $(this).parent().removeClass('yes').addClass('no');
                }
    }).on('focus',function(){
        $('.Js-registerError').text('').hide();
        $(this).parent().addClass('sr');
    }).on('blur',function(){
        $(this).parent().removeClass('sr');
    });


    var wtimer = 60;
    var whandle = 0;
    var times = 0;
    function countDown() {
        if (wtimer == 0) {
            clearTimeout(whandle);
            $('.Js-voice',registerForm).show();
            $('#get_vcode_w',registerForm).hide();
            $('#get_vcode',registerForm).show();
            $('#get_vcode_1',registerForm).hide();
            $('#err_vcode_txt',registerForm).hide();
            wtimer = 60;
            times += 1;
            quick = 1;
        } else {
            $('.Js-voice',registerForm).hide();
            $('#get_vcode_w',registerForm).show();
            $('#get_vcode',registerForm).hide();
            $('#get_vcode_1',registerForm).show();
            $('#wait_seconds',registerForm).html(wtimer);
            wtimer--;
            whandle = setTimeout(countDown, 1000);
        }
    }
    function rePicCode(){
        if(times > 0){
            $('input[name="picCheckCode"],#vcode',registerForm).val('');
            $('.code_wrap',registerForm).animate({'left':'0px'},500,function(){
                $('input[name="picCheckCode"]',registerForm).val('');
                $('input[name="picCheckCode"]',registerForm).focus();
                $('.Js-smsCode',registerForm).hide();
            });
            $('#Js-picCodeSucc,.Js-vcodeOk',registerForm).hide();
            $('#picode',registerForm).removeClass('ma_yes');
            $('#Js-vcodeimg',registerForm).trigger('click');
            return true;
        }else{
            return false;
        }
    }

    function getCodeFail(data) {
        if(data.Result.Header.resultID == 100901 || data.Result.Header.resultID == 100902){
            $('.code_wrap',registerForm).animate({'left':'0px'},500,function(){
                 $('input[name="picCheckCode"]',registerForm).focus();
                 $('.Js-smsCode',registerForm).hide();
            });
            $('#Js-vcodeimg',registerForm).trigger('click');
            return;
        }
        $('#err_vcode_txt',registerForm).hide();
        $('.wx-validator-smsCheckCode-ajax',registerForm).show().find('.ajax_error').text(data.Result.Header.resultMessage);
    }
    wx.validator.addNewRule('passvalid', '密码输入不正确，密码在6-20个字符内，可使用字母、数字或符号组合密码，区分大小写', function (value) {
        return /^[a-zA-Z0-9~!@#$%^&\*()_\+|<>?:"';,\./`\[\]\\\={}]{6,20}$/.test(value);
    });
    wx.validator.addNewRule('alchar','只能包括英文字母', function (value) {
        return /^[a-zA-Z]+$/.test(value);
    });
    }
});