define(['jquery','wx.config','user','wx.pop','wx.tpl','wx.cookie','wx.validator'], function ($,config,user,wx) {
    var registerTpl = '<div class="tc_box">\
        <div class="tc_c">\
            <div class="tc_admin">\
                        <a class="bclose Js-dialog-close" href="javascript:;"><img src="'+config.url.img+'images/cn/ticon/cart_cols.png"></a>\
                        <div class="tc_anav">\
                             <ul id="Js-login-tab">\
                                <%if(init=="login"){%>\
                                 <li><a href="javascript:;" class="select">用户登录</a></li>\
                                 <li><a href="javascript:;">用户注册</a></li>\
                                <%} else{%>\
                                 <li><a href="javascript:;">用户登录</a></li>\
                                 <li><a href="javascript:;" class="select">用户注册</a></li>\
                                <%}%>\
                             </ul>\
                            <%if(init=="register"){%>\
                                <div class="tab-line select1"></div>\
                            <%} else{%>\
                                <div class="tab-line select0"></div>\
                            <%}%>\
                        </div>\
                    <div class="static_box">\
                        <div class="move_box">\
                            <form class="hidden lg_n" action="'+config.url.api_s+'authorize/MainServlet?method=login&req_fmt_type=jsonp&cookie_need_auth=1&auth_type=1&cookie_scope=11101" wx-validator-ajax  name="login">\
                                <div class="tc_tip login_phone">\
                                     <span class="tspan prompt_info mt20  single_error hidden"></span>\
                                     <a href="javascript:void(0)" class="Js-quickLogin"><b></b>短信快捷登录</a>\
                                </div>\
                                <div class="tc_list">\
                                     <ul class="Js-loginItem">\
                                         <li id="Js-name"><input wx-validator-rule="required" type="text" wx-validator-placeholder="请输入邮箱地址/卡号/手机号" wx-validator-buyer_name-required ="用户名不能为空，请输入用户名"  name="buyer_name"></li>\
                                         <li class="zctip"><span class="tspan hidden wx-validator-buyer_name-error"></span></li>\
                                         <li id="Js-pwd"><input wx-validator-password-required="请输入密码" wx-validator-placeholder="请输入密码" wx-validator-rule="required|rangelength,6-20" type="password" name="password"></li>\
                                         <li class="zctip">\
                                            <span class="tspan wx-validator-password-rangelength hidden">6-20个字符内，使用字母、数字或符号，区分大小写</span>\
                                            <span class="tspan wx-validator-password-error hidden"></span>\
                                        </li>\
                                         <li id="check_code" class="ma hidden">\
                                            <input type="text" maxlength="4" wx-validator-kup="4" name="pic_check_code" id="get_login_type" wx-validator-pic_check_code-required="请填写图形验证码" wx-validator-placeholder="请输入图形验证码" wx-validator-keyboard="13">\
                                            <div class="yz"><img class="Js-vcode_img vcode_img"></div>\
                                         </li>\
                                         <li class="zctip hidden" id="check_code_err">\
                                         <span class="tspan wx-validator-pic_check_code-error hidden"></span>\
                                         </li>\
                                     </ul>\
                                </div>\
                                <div class="tc_tip">\
                                     <span class="tl"><input type="checkbox" name="remember">&nbsp;&nbsp;30天内自动登录</span>\
                                     <a class="tr" href="'+config.url.user+'getpwd.html">忘记密码？</a>\
                                </div>\
                                <div class="tc_btn">\
                                     <input type="hidden" name="unique_key" class="hidden"/>\
                                     <input type="hidden" name="expire_cookie_days" class="hidden"/>\
                                     <input type="hidden" name="isNew" value="1" class="hidden"/>\
                                     <a class="abtn" href="javascript:;" type="submit">登录</a>\
                                </div>\
                                <div class="tc_it">\
                                     <div class="tc_ittitle">使用合作网站账号登录</div>\
                                     <div class="tc_adbox">\
                                          <div class="tc_adlist">\
                                              <ul>\
                                                  <li><a class="taobao" href="http://www.tootoo.cn/index.php?r=tBuyer/thirdAuth&witch=alipay"></a></li>\
                                                  <li><a class="qq" href="http://www.tootoo.cn/index.php?r=tBuyer/thirdAuth&witch=qq"></a></li>\
                                                  <li><a class="sina" href="http://www.tootoo.cn/index.php?r=tBuyer/thirdAuth&witch=weibo"></a></li>\
                                              </ul>\
                                          </div>\
                                     </div>\
                                </div>\
                          </form>\
                          <form  method="post"   name="quick" wx-validator-ajax  action = "'+config.url.api_s+'authorize/MainServlet?method=quickLogin&req_fmt_type=jsonp&cookie_need_auth=1&auth_type=1&cookie_scope=11101" class="lg_q">\
                                <div class="login_pc tc_tip">\
                                    <span class="tspan prompt_info Js-registerError mt20 hidden"></span>\
                                    <a href="javascript:void(0)" class="Js-pcLogin"><b></b>返回普通登录</a>\
                                </div>\
                                    <div class="tc_zclist" style="margin-top:9px">\
                                        <ul class="Js-regItem">\
                                            <li class="tt">\
                                                <input name="buyer_name"  type="text" wx-validator-rule="required|mobile" wx-validator-placeholder="请输入手机号"/>\
                                            </li>\
                                            <li class="zctip">\
                                                <span class="tspan wx-validator-buyer_name-required hidden">手机号不能为空</span>\
                                                <span id="Js-emailError" class="tspan wx-validator-buyer_name-mobile hidden">手机号格式不正确，请重新输入</span>\
                                            </li>\
                                            <li class="mobile_code mb smscode" style="display:block">\
                                              <div class="code_wrap" style="left:-380px">\
                                                <div  class="code_box">\
                                                  <div class="mb id_code" id="picode" >\
                                                      <input type="text" id="emailcode" wx-validator-placeholder="请输入验证码" wx-validator-kup="4"  maxlength="4" name="picCheckCode" wx-validator-picCheckCode-required="验证码不能为空">\
                                                      <div class="code_img">\
                                                        <a href="javascript:void(0);"><img id="Js-vcodeimg"></a>\
                                                      </div>\
                                                    </div>\
                                                     <div class="zctip" id="picode_err">\
                                                        <span class="tspan wx-validator-picCheckCode-error hidden"></span>\
                                                     </div>\
                                                </div>\
                                                <div class="code_box Js-smsCode">\
                                                    <div id="smscode" class="mb id_code">\
                                                       <input type="text" name="smsCheckCode" maxlength="6" wx-validator-kup="6"  wx-validator-rule="required" wx-validator-placeholder="请输入手机验证码" wx-validator-keyboard="13">\
                                                       <div id="get_vcode">\
                                                          <a id="get_focus" class="pass_time" href="javascript:void(0);">发送验证码</a>\
                                                        </div>\
                                                       <div id="get_vcode_w" class="cx_time hidden">\
                                                          <i id="wait_seconds">60</i>秒重新发送\
                                                        </div>\
                                                   </div>\
                                                   <div class="zctip">\
                                                       <span class="tspan wx-validator-smsCheckCode-required hidden Js-require">请填写验证码</span>\
                                                       <span class="tspan wx-validator-email-empty hidden Js-empty">请先输入网站验证码，才能获取短信验证码</span>\
                                                       <span class="tspan wx-validator-smsCheckCode-ajax hidden"><span class="ajax_error"></span></span>\
                                                       <span id="err_vcode_txt" class="success sucfl hidden Js-suc">验证码发送成功</span>\
                                                   </div>\
                                                </div>\
                                              </div>\
                                            </li>\
                                            <li class="switch_code Js-voice">\
                                                <span class="Js-voi-text">未收到短信?</span>\
                                                <a href="javascript:void(0)" class="switch_img Js-voi-switch" type="voice">切换语音验证码</a>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                    <div class="q_text">\
                                         <span style="display:none;"><span class="tt"><input name="" type="checkbox" value="" />&nbsp;&nbsp;我已阅读并同意<a href="http://www.tootoo.cn/help/agreement.html">《沱沱工社用户协议》</a></span><p class="p_mid"><a href="#">忘记密码？</a></p></span>\
                                         <span style="display:block;"><span class="tt">温馨提示：未注册沱沱的手机号，登录时将自动注册沱沱账号，并代表您已同意\
                                          <a href="http://www.tootoo.cn/help/agreement.html">《沱沱工社用户协议》</a></span></span>\
                                    </div>\
                                    <div class="q_login_btn">\
                                        <input type="hidden" name="uniqueKey" class="hidden"/>\
                                        <input type="hidden" name="sms_code" class="hidden"/>\
                                        <input type="hidden" name="isQuick" value="1" class="hidden"/>\
                                        <input type="hidden" name="password" class="hidden"/>\
                                        <input type="hidden" name="checkCodeType" value="1" class="hidden"/>\
                                        <a href="javascript:void(0);" type="submit"  class="abtn">登录</a>\
                                    </div>\
                                </div>\
                         </form>\
                    </div>\
                 <form class="hidden" name="register" wx-validator-ajax action="'+config.url.api_s+'authorize/MainServlet?method=register&req_fmt_type=jsonp">\
                    <div class="tc_tip">\
                         <span class="tspan Js-registerError mt20 hidden"></span>\
                    </div>\
                    <div class="tc_zclist">\
                         <ul class="Js-regItem">\
                             <li class="tt"><input type="text" name="loginName" wx-validator-rule="required|mobile" wx-validator-placeholder="请输入手机号"></li>\
                             <li class="zctip">\
                                <span class="tspan wx-validator-loginName-required hidden">手机号不能为空</span>\
                                <span class="tspan wx-validator-loginName-mobile hidden">手机号格式不正确，请重新输入</span>\
                                <span id="Js-emailError" class="tspan hidden"></span>\
                                </li>\
                             <li><input type="password" wx-validator-placeholder="请输入密码" wx-validator-rule="required|rangelength,6-20" name="passWord"></li>\
                             <li class="zctip">\
                                <span class="tspan wx-validator-passWord-rangelength hidden">6-20个字符内，使用字母、数字或符号，区分大小写</span>\
                                <span class="tspan wx-validator-passWord-required hidden">登录密码不能为空，请输入密码</span>\
                             </li>\
                             <li><input type="password" wx-validator-rule="required|equalTo,passWord" name="password_again" wx-validator-placeholder="请再次输入密码"></li>\
                             <li class="zctip">\
                                <span class="tspan wx-validator-password_again-equalTo hidden">两次输入的密码不一致！</span>\
                                <span class="tspan wx-validator-password_again-required hidden">请输入确认密码</span>\
                             </li>\
                             <li class="mobile_code mb smscode">\
                              <div class="code_wrap">\
                                <div  class="code_box">\
                                  <div class="mb id_code" id="picode">\
                                      <input type="text" id="emailcode"  wx-validator-placeholder="请输入验证码" wx-validator-rule="required|rangeEqual,4" wx-validator-kup="4"  maxlength="4" name="picCheckCode" wx-validator-picCheckCode-required="验证码不能为空">\
                                      <div class="code_img">\
                                        <a href="javascript:void(0);"><img id="Js-vcodeimg"></a>\
                                      </div>\
                                    </div>\
                                    <div class="zctip" id="picode_err">\
                                        <span class="tspan wx-validator-picCheckCode-error hidden"></span>\
                                    </div>\
                                </div>\
                                <div class="code_box fixwt Js-smsCode hidden">\
                                    <div id="smscode" class="mb id_code">\
                                       <input type="text" name="smsCheckCode" wx-validator-kup="6" maxlength="6" wx-validator-rule="required" wx-validator-placeholder="请输入手机验证码" wx-validator-keyboard="13">\
                                       <div id="get_vcode">\
                                          <a id="get_focus" class="pass_time" href="javascript:;">发送验证码</a>\
                                        </div>\
                                       <div id="get_vcode_w" class="cx_time hidden">\
                                          <i id="wait_seconds">60</i>秒重新发送\
                                        </div>\
                                   </div>\
                                   <div class="zctip">\
                                       <span class="tspan wx-validator-smsCheckCode-required hidden Js-require">请填写验证码</span>\
                                       <span class="tspan wx-validator-email-empty hidden Js-empty">请先输入网站验证码，才能获取短信验证码</span>\
                                       <span class="tspan wx-validator-smsCheckCode-ajax hidden"><span class="ajax_error"></span></span>\
                                       <span id="err_vcode_txt" class="success  hidden Js-suc">验证码发送成功</span>\
                                   </div>\
                                </div>\
                              </div>\
                            </li>\
                            <li class="switch_code Js-voice" style="display:none">\
                                <span class="Js-voi-text">未收到短信?</span>\
                                <a href="javascript:void(0)" class="switch_img Js-voi-switch" type="voice">切换语音验证码</a>\
                            </li>\
                         </ul>\
                    </div>\
                    <div class="tc_ttspan">\
                         <span class="tt"><input type="checkbox" checked wx-validator-rule="required" name="i_agree">&nbsp;&nbsp;我已阅读并同意<a target="_blank" href="http://www.tootoo.cn/help/agreement.html">《沱沱工社用户协议》</a></span>\
                    </div>\
                    <div class="tc_ttspan error hidden wx-validator-i_agree-required">您必须同意沱沱工社用户协议才能注册</div>\
                    <div class="tc_btn">\
                         <input type="hidden" name="inviteBuyerId" value="0" class="hidden"/>\
                         <input type="hidden" name="uniqueKey" class="hidden"/>\
                         <input type="hidden" name="req_str" class="hidden"/>\
                         <input type="hidden" name="scope" value="11101" class="hidden"/>\
                         <input type="hidden" name="isSendMessage" value="1" class="hidden"/>\
                         <input type="hidden" name="loginNameType" value="0" class="hidden"/>\
                         <input type="hidden" name="mobile" class="hidden"/>\
                         <input type="hidden" name="reg_from" value="" class="hidden"/>\
                         <input type="hidden" name="isNew" value="1" class="hidden"/>\
                         <input type="hidden" name="checkCodeType" value="1" class="hidden"/>\
                         <a class="abtn" href="javascript:;" type="submit">注册</a>\
                    </div>\
              </form>\
            </div>\
        </div>\
    </div>';

    return function(initShow,toAction){
      if(user.hasLogin()){
        if($.isFunction(toAction))
            toAction()
        else if(toAction == 'reload')
            location.reload();
        else if(toAction == 'tourl')
            location.href = wx.getParamByName('tourl') || document.refer || config.url.web;
        else if(typeof toAction == 'string')
            location.href = toAction;
        return;
      }
      wx.pop(wx.tpl(registerTpl,{init:initShow}));
      wx.validator();
      require(['cn/js/login','cn/js/register'],function(loginAction,regAction){
          loginAction(toAction);
            $('form[name="quick"] input').attr("tabIndex",-1);
            $('form[name="quick"] a').attr("tabIndex",-1);
          if(initShow == 'login'){
              $('.static_box').show();
              regAction(toAction,'qk');
              $('form[name="register"]').hide();
              $('#Js-login-tab li:eq(0)').addClass('select');
              $('.tab-line').addClass('select0');
          } else {
              $('form[name="register"]').show();
              regAction(toAction);
              $('.static_box').hide();
              $('#Js-login-tab li:eq(1)').addClass('select');
              $('.tab-line').addClass('select1');
          }
          $('#Js-login-tab li').hover(function(){
              $('.tab-line').addClass('hover'+$(this).index());
          },function(){
              $('.tab-line').removeClass('hover'+$(this).index());
          }).click(function(){
              if($(this).index()==0){
                  $(this).addClass('select').next().removeClass('select');
                  $('.static_box').show();
                  regAction(toAction,'qk');
                  $('form[name="register"]').hide();
              } else {
                  $(this).addClass('select').prev().removeClass('select');
                  $('.static_box').hide();
                  regAction(toAction);
                  $('form[name="register"]').show();
              }
              $('.tab-line').removeClass('select0 select1');
              $('.tab-line').addClass('select'+$(this).index());
          });

          $('.Js-quickLogin').click(function(){
             $('.move_box').animate({'left':'-360px'},300,function(){
                  $('.lg_n').hide();
             });
              $('.lg_q').show();
          });
          $('.Js-pcLogin').click(function(){
             $('.move_box').animate({'left':'0px'},300,function(){
                  $('.lg_q').hide();
             });
             $('.lg_n').show();
          });
      });
    }
});