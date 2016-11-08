define(['jquery', 'header','wx.config', 'geos', 'wx.ajax', 'wx.pop', 'wx.validator','wx.cookie'], function ($, header,config, geos, wx) {
   return function(toAction){
    var loginlastMobile,loginForm = $('form[name="login"]');
    var key;
    if(geos.getSubStationID() == '1'){
        $('.Js-bj').show();
    }else{
        $('.Js-sh').show();
    }
    if(wx.cookie('sstk'))
        key = wx.cookie('sstk').split('|')[0]+ new Date().getTime();
    else
        key = new Date().getTime();
    loginForm.on('validator:before', function (event) {
        $(this).find('[name="unique_key"]').val(key);
        $(this).find('[name="expire_cookie_days"]').val($(this).find('[name="remember"]').is(':checked')?30:0);
        $('.single_error').hide();
        return true;
    });
    function checkStatus() {
        var email;
        if (email = $('input[name="buyer_name"]',loginForm).val()) {
            wx.sendData(config.url.api_m + 'ifCheckLogin&req_str={"scope":"11101","loginName":"' + email + '"}', {dataType: 'jsonp'}, function (data) {
                if (data.Result.Data.checkResult){
                    addCodeElement();
                }
            });
        }
    }
    checkStatus();

    $('.Js-vcode_img').unbind('click').click(function(){
        $(this).attr('src',config.url.api+'authorize/MainServlet?method=getCheckPic&req_str={"scope":"11101","uniqueKey":"'+key+'"}&_t='+(new Date()|0));
    }).attr('src',config.url.api+'authorize/MainServlet?method=getCheckPic&req_str={"scope":"11101","uniqueKey":"'+key+'"}');


    $('input[name="buyer_name"]',loginForm).off('validator').on('validator', function (event, isValid) {
        if (isValid) {
            checkStatus();
            $('.single_error').hide();
        }
    });

    $('input[name="password"]',loginForm).off('validator').on('validator', function (event, isValid) {
        if (isValid) {
            $('.single_error').hide();
        }
    });

    $('input[name="pic_check_code"]',loginForm).off('validator').on('validator', function (event, isValid) {
        if (isValid) {
            $('.single_error').hide();
        }
    });

    loginForm.off('validator').on('validator', function (event, data) {
        var status = data.Result.Header.resultID;
        if (config.getStatus(data) == 0) {
            $('.Js-dialog-close').trigger('click');
            header.setUserHeader();
            if($.isFunction(toAction))
                toAction(data)
            else if(toAction == 'reload')
                location.reload();
            else if(toAction == 'tourl')
                location.href = wx.getParamByName('tourl') || document.refer || config.url.web;
            else if(typeof toAction == 'string')
                location.href = toAction;
            else  if($(this).find('[name="comemail_old"]').length)
                wx.sendData(config.url.api_m+'companyEmailSend&req_str={"scope": "11101","companyEmail":"'+$(this).find('[name="comemail_old"]').val()+'"}',
                    function(result){
                    if(config.getStatus(result) == 0){
                        location.href =  config.url.user + 'index.php?r=tBuyer/applyAuthSucc&companyEmail='+ $('input[name="comemail_old"]',loginForm).val();       
                    }
                })
            
            else 
                location.href = wx.getParamByName('tourl') || document.refer || config.url.web;
           

        } else {
            if (status == '100107' || status == '100108' || status == '100109'){
                addCodeElement();
            }
            else if(status == '100101'){
                $('#Js-name').removeClass('yes').addClass('no');
                $('.wx-validator-buyer_name-error',loginForm).text(config.getInfo(data)).show();
            }else if(status == '100110' || status == '100103'){
                
                    $('#Js-pwd').removeClass('yes').addClass('no');
                    $('.wx-validator-password-error',loginForm).text(config.getInfo(data)).show();
                 
            }
            else{
                $('.single_error').text(config.getInfo(data)).show();
            }

                
        }
    });

    function addCodeElement() {
        var $code = $("#get_login_type");
        $code.attr({'wx-validator-rule': 'required'});
        wx.validator['login'].addElement($code[0]);
        if(loginlastMobile != $('input[name="buyer_name"]',loginForm).val() && loginlastMobile){
            $("#check_code .vcode_img").click();
        }else{
            loginlastMobile = $('input[name="buyer_name"]',loginForm).val();
        }
        $('#check_code').show();
        $('#check_code_err').show();
    }
    var station = geos.getSubStationID();
    if (station && station != 1) {
        $(".loginAd").hide();
        $(".loginAd[station='" + station + "']").show();
    }

     $('.Js-loginItem').find('input').on('validator',function(event, isValid){
            if(isValid){
                if($(this).is('[name="pic_check_code"]') || $(this).is('[name="vcode"]')){
                    if($(this)[0].value.length >= $(this).attr('maxlength')){
                        $(this).parent().removeClass('ma_no').addClass('ma_yes');    
                    }else{
                        $(this).parent().removeClass('ma_yes').addClass('ma_no');    
                    }
                }else
                    $(this).parent().removeClass('no').addClass('yes');
            } else {
                if($(this).is('[name="pic_check_code"]') || $(this).is('[name="vcode"]')){
                     if($(this)[0].value.length >= $(this).attr('maxlength')){
                        $(this).parent().removeClass('ma_yes').addClass('ma_no');    
                     }else{
                        $(this).parent().removeClass('ma_yes').addClass('ma_no');    
                     }
                }else
                    $(this).parent().removeClass('yes').addClass('no');
            }
    }).on('focus',function(){
        $('.Js-registerError').text('');
        $(this).parent().addClass('sr');
    }).on('blur',function(){
        $(this).parent().removeClass('sr');
    });

    /**
     * 验证企业邮箱
     */
    $('input[name="comemail_old"]',loginForm).on('validator', function (event, isValid) {
        var $this = $(this);
        $this.parent().removeClass('yes');
        if(!isValid) return;
        wx.sendData(config.url.api_m + 'companyEmailCheck&req_str={"companyEmail":"'+$(this).val()+'","scope":"11101"}', {'throttle': false},function(data){
            if(data.Result.Header.resultID == 0){
                $this.parent().addClass('yes');
            }
            else{
                $this.parent().addClass('no');
                $('.wx-validator-comemail_old-error').text('验证失败,请检查公司邮箱！').show();
            }
        });
    });
    //图形验证码
     $('input[name="pic_check_code"]',loginForm).off('validator').on('validator', function (event, isValid) {
        var $this = $(this);
        if(!isValid){
            $this.parent().addClass('ma_no');
            return;
        } 
        $('.wx-validator-pic_check_code-error').hide();
        $this.parent().removeClass('ma_yes').removeClass('ma_no');
        wx.sendData(config.url.api_m + 'doCheckCode&req_str={"scope":"11101","uniqueKey":"'+key+'","checkCode":"'+$(this).val()+'"}', {throttle: false}).success(function () {
            $('.wx-validator-pic_check_code-error').hide();
            $this.parent().addClass('ma_yes');
        }).fail(function(data){
            $('.wx-validator-pic_check_code-error').text(config.getInfo(data)).show();
            $this.parent().addClass('ma_no');
        });
    });

    }
});