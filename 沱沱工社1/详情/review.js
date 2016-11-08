define(['jquery', 'wx.config', 'user', 'wx', 'cn/js/loginPop', 'wx.cookie'], function ($, config, user, wx, login) {

    var reWd = new Array();
    reWd[13] = '恶意访问';

    var ero_pre_no = "<b>您暂不能对该商品进行评价，可能有以下原因：</b><br/><br/>您可能没有在沱沱工社购买过该商品<br/>您已评价过该商品";


    var review = {};
    review.canReviewCheck = function (a) {
        if (!user.hasLogin()) {
            login("login",function(){});
            return false
        }
        $.get("/index.php?r=tReview/canreview", {
            gid: a
        },
        function (b) {
            if (b == 1) {
                window.location.replace("/index.php?r=tReview/showreplay&gid=" + a)
            } else {
                if (b == 0) {
                    wx.alert(ero_pre_no)
                } else {
                    wx.alert(reWd[13])
                }
            }
        });
        return false
    }

    review.topage = function (a, b, c) {
        $.get("/index.php?r=tReview/getreviewdate", {
            goodsId: a,
            page: b,
            tp: c
        },
        function (e) {
            if (e != "") {
                var d;
                if ($("div.evaluation-manage").length > 0) {
                    d = $("div.evaluation-manage")
                } else {
                    if ($("div.comments-list").length > 0) {
                        d = $("div.comments-list")
                    } else {
                        d = null
                    }
                }
                if (d.length > 0) {
                    var f = d.offset().top;
                    $("html,body").scrollTop(f)
                }
                $("#replylayer").html(e);
                review.setReviewPageWidth();
            }
        })
    }

//全部评论页面的页面宽度要设置成窄一点
review.setReviewPageWidth= function ()
{
    var url=  window.location.pathname;
    if( url.indexOf("/review-")==0 || $(".front-reviews-l").length >0 )
    {
        $("#replylayer .assess-comment-box").css("width","860px");
        $("#replylayer .comment-info").css("width","580px");
        $("#replylayer .comment-user").css("width","260px");
        $("#replylayer .user-reply").css("width","260px");
    }
}
    return review;

});