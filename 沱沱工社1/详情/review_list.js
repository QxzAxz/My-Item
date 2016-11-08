require(['jquery', 'wx.config', 'user', 'wx','cn/js/loginPop' ,'original/review', ,'wx.cookie'], function ($, config, user,wx,login,review) {
    
var reWd = new Array();
reWd[0] = "您还可以输入";
reWd[1] = "字";
reWd[2] = "已超出";
reWd[3] = "您输入的文字超出限制了，请检查后重试！";
reWd[4] = "评论内容不能为空！";
reWd[5] = '您输入的评论内容含有违禁词"[forbidword]",请将其删除后尝试再次提交,感谢您的配合!';
reWd[6] = '请选择星星进行打分!';
reWd[7] = '回复内容不可包含链接地址，请删除后再试！';
reWd[8] = '10分钟之内仅可回复一次，请稍后再试！';
reWd[9] = '回复内容请勿包含链接地址，10分钟之内仅可回复1次！';
reWd[10] = '您的操作过于频繁，请稍后再试！';
reWd[11] = '您的回复操作过于频繁，今天将不可进行回复操作，请明天再试，谢谢！';
reWd[12] = '您已参与过评价。';
reWd[13] = '恶意访问';
reWd[14] = "亲，至少要写10个字哟~~您的评论也会帮助其他用户更好的了解该商品！";
var regStr = /[。|\\]/g;
var ero_pre_no = "<b>您暂不能对该商品进行评价，可能有以下原因：</b><br/><br/>您可能没有在沱沱工社购买过该商品<br/>您已评价过该商品";
var ero_pre_nobuy = "<b>您没有购买过该商品，所以暂不能发表评论！</b><br/><br/>成功发表1条商品评论立即赠送您5个积分，赶快购买该商品，发表获积分咯！";
var ero_pre_had = "<b>您已评论过该商品，不能重复评论哦！</b><br/><br/>再次购买即可发布新评论，赶快下单吧！";
var yesno = "您已参与过评价!";
var ero_rew = "<font color='red'>长度不在2-300个字符之间</font>";
var rpltips = "请填写回复内容，长度在2-300个字符之间。";
var rcontent = "必填，可填写您对该商品的使用心得，如该商品为您带去的帮助，或在使用过程中遇到的问题等。";
var forbidword = "bitch,shit,falun,tianwang,cdjp,bignews,boxun,chinaliberal,chinamz,chinesenewsnet,cnd,creaders,dafa,dajiyuan,dfdz,dpp,falu,falundafa,flg,freechina,freenet,fuck,GCD,hongzhi,hrichina,huanet,hypermart,incest,jiangdongriji,lihongzhi,making,minghui,minghuinews,nacb,naive,nmis,paper,peacehall,playboy,renminbao,renmingbao,rfa,safeweb,sex,simple,svdc,taip,tibetalk,triangle,triangleboy,UltraSurf,unixbox,ustibet,voa,wangce,wstaiji,xinsheng,yuming,zhengjian,zhengjianwang,zhenshanren,zhuanfalun,xxx,anime,censor,hentai,[hz],(hz),[av],(av),[sm],(sm),porn,multimedia,toolbar,downloader,顶级,女優,小泽玛莉亚,强歼,乱交,色友,婊子,蒲团,美女,女女,喷尿,绝版,三級,武腾兰,凌辱,暴干,诱惑,阴唇,小泽圆,插插,坐交,長瀨愛,川島和津實,草莓牛奶,小澤園,飯島愛,星崎未來,及川奈央,朝河蘭,夕樹舞子,大澤惠,金澤文子,三浦愛佳,伊東,慰安妇,女教師,武藤蘭,学生妹,无毛,猛插,护士,自拍,A片,A级,喷精,偷窥,小穴,大片,被虐,黄色,被迫,被逼,强暴,口技,破处,精液,幼交,狂干,兽交,群交,叶子楣,舒淇,翁虹,大陆,露点,露毛,武藤兰,饭岛爱,波霸,少儿不宜,成人,偷情,叫床,上床,制服,亚热,援交,走光,情色,肉欲,美腿,自摸,18禁,捆绑,丝袜,潮吹,肛交,群射,内射,少妇,卡通,臭作,薄格,調教,近親,連發,限制,乱伦,母子,偷拍,更衣,無修正,一本道,1Pondo,櫻井,風花,夜勤病栋,菱恝,虐待,激情,麻衣,吐血,三个代表,一党,多党,民主,专政,行房,自慰,吹萧,色狼,胸罩,内裤,底裤,私处,爽死,变态,妹疼,妹痛,弟疼,弟痛,姐疼,姐痛,哥疼,哥痛,同房,打炮,造爱,作爱,做爱,鸡巴,阴茎,阳具,开苞,肛门,阴道,阴蒂,肉棍,肉棒,肉洞,荡妇,阴囊,睾丸,捅你,捅我,插我,插你,插她,插他,干你,干她,干他,射精,口交,屁眼,阴户,阴门,下体,龟头,阴毛,避孕套,你妈逼,大鸡巴,高潮,政治,大法,弟子,大纪元,真善忍,明慧,洪志,红志,洪智,红智,法轮,法论,法沦,法伦,发轮,发论,发沦,发伦,轮功,轮公,轮攻,沦功,沦公,沦攻,论攻,论功,论公,伦攻,伦功,伦公,打倒,民运,六四,台独,王丹,柴玲,李鹏,天安门,江泽民,朱容基,朱镕基,李长春,李瑞环,胡锦涛,魏京生,台湾独立,藏独,西藏独立,疆独,新疆独立,警察,民警,公安,邓小平,大盖帽,革命,武警,黑社会,交警,消防队,刑警,夜总会,妈个,公款,首长,书记,坐台,腐败,城管,暴动,暴乱,李远哲,司法警官,高干,人大,尉健行,李岚清,黄丽满,于幼军,文字狱,宋祖英,自焚,骗局,猫肉,吸储,张五常,张丕林,空难,温家宝,吴邦国,曾庆红,黄菊,罗干,吴官正,贾庆林,专制,三個代表,一黨,多黨,專政,大紀元,紅志,紅智,法輪,法論,法淪,法倫,發輪,發論,發淪,發倫,輪功,輪公,輪攻,淪功,淪公,淪攻,論攻,論功,論公,倫攻,倫功,倫公,民運,台獨,李鵬,天安門,江澤民,朱鎔基,李長春,李瑞環,胡錦濤,臺灣獨立,藏獨,西藏獨立,疆獨,新疆獨立,鄧小平,大蓋帽,黑社會,消防隊,夜總會,媽個,首長,書記,腐敗,暴動,暴亂,李遠哲,高幹,李嵐清,黃麗滿,於幼軍,文字獄,騙局,貓肉,吸儲,張五常,張丕林,空難,溫家寶,吳邦國,曾慶紅,黃菊,羅幹,賈慶林,專制,八九,八老,巴赫,白立朴,白梦,白皮书,保钓,鲍戈,鲍彤,暴政,北大三角地论坛,北韩,北京当局,北京之春,北美自由论坛,博讯,蔡崇国,曹长青,曹刚川,常劲,陈炳基,陈军,陈蒙,陈破空,陈希同,陈小同,陈宣良,陈一谘,陈总统,程凯,程铁军,程真,迟浩田,持不同政见,赤匪,赤化,春夏自由论坛,达赖,大参考,大纪元新闻网,大纪园,大家论坛,大史,大史记,大史纪,大中国论坛,大中华论坛,大众真人真事,戴相龙,弹劾,登辉,邓笑贫,迪里夏提,地下教会,地下刊物,第四代,电视流氓,钓鱼岛,丁关根,丁元,丁子霖,东北独立,东方红时空,东方时空,东南西北论谈,东社,东土耳其斯坦,东西南北论坛,动乱,独裁,独夫,独立台湾会,杜智富,多维,屙民,俄国,发愣,发正念,反封锁技术,反腐败论坛,反攻,反共,反人类,反社会,方励之,方舟子,飞扬论坛,斐得勒,费良勇,分家在,分裂,粉饰太平,风雨神州,风雨神州论坛,封从德,封杀,冯东海,冯素英,佛展千手法,付申奇,傅申奇,傅志寰,高官,高文谦,高薪养廉,高瞻,高自联,戈扬,鸽派,歌功颂德,蛤蟆,个人崇拜,工自联,功法,共产,共党,共匪,共狗,共军,关卓中,贯通两极法,广闻,郭伯雄,郭罗基,郭平,郭岩华,国家安全,国家机密,国军,国贼,韩东方,韩联潮,何德普,何勇,河殇,红灯区,红色恐怖,宏法,洪传,洪吟,洪哲胜,胡紧掏,胡锦滔,胡锦淘,胡景涛,胡平,胡总书记,护法,花花公子,华建敏,华通时事论坛,华夏文摘,华语世界论坛,华岳时事论坛,黄慈萍,黄祸,黄菊　,黄翔,回民暴动,悔过书,鸡毛信文汇,姬胜德,积克馆,基督,贾廷安,贾育台,建国党,江core,江八点,江流氓,江罗,江绵恒,江青,江戏子,江则民,江泽慧,江贼,江贼民,江折民,江猪,江猪媳,江主席,姜春云,将则民,僵贼,僵贼民,讲法,酱猪媳,交班,教养院,接班,揭批书,金尧如,锦涛,禁看,经文,开放杂志,看中国,抗议,邝锦文,劳动教养所,劳改,劳教,老江,老毛,黎安友,李大师,李登辉,李红痔,李宏志,李洪宽,李继耐,李兰菊,李老师,李录,李禄,李少民,李淑娴,李旺阳,李文斌,李小朋,李小鹏,李月月鸟,李志绥,李总理,李总统,连胜德,联总,廉政大论坛,炼功,梁光烈,梁擎墩,两岸关系,两岸三地论坛,两个中国,两会,两会报道,两会新闻,廖锡龙,林保华,林长盛,林樵清,林慎立,凌锋,刘宾深,刘宾雁,刘刚,刘国凯,刘华清,刘俊国,刘凯中,刘千石,刘青,刘山青,刘士贤,刘文胜,刘晓波,刘晓竹,刘永川,流亡,龙虎豹,陆委会,吕京花,吕秀莲,抡功,轮大,罗礼诗,马大维,马良骏,马三家,马时敏,卖国,毛厕洞,毛贼东,美国参考,美国之音,蒙独,蒙古独立,密穴,绵恒,民国,民进党,民联,民意,民意论坛,民阵,民猪,民主墙,民族矛盾,莫伟强,木犀地,木子论坛,南大自由论坛,闹事,倪育贤,你说我说论坛,潘国平,泡沫经济,迫害,祁建,齐墨,钱达,钱国梁,钱其琛,抢粮记,乔石,亲美,钦本立,秦晋,轻舟快讯,情妇,庆红,全国两会,热比娅,热站政论网,人民报,人民内情真相,人民真实,人民之声论坛,人权,瑞士金融大学,善恶有报,上海帮,上海孤儿院,邵家健,神通加持法,沈彤,升天,盛华仁,盛雪,师父,石戈,时代论坛,时事论坛,世界经济导报,事实独立,双十节,水扁,税力,司马晋,司马璐,司徒华,斯诺,四川独立,宋平,宋书元,苏绍智,苏晓康,台盟,台湾狗,台湾建国运动组织,台湾青年独立联盟,台湾政论区,台湾自由联盟,太子党,汤光中,唐柏桥,唐捷,滕文生,天怒,天葬,童屹,统独,统独论坛,统战,屠杀,外交论坛,外交与方略,万润南,万维读者论坛,万晓东,汪岷,王宝森,王炳章,王策,王超华,王辅臣,王刚,王涵万,王沪宁,王军涛,王力雄,王瑞林,王润生,王若望,王希哲,王秀丽,王冶坪,网特,魏新生,温元凯,文革,无界浏览器,吴百益,吴方城,吴弘达,吴宏达,吴仁华,吴学灿,吴学璨,吾尔开希,五不,伍凡,西藏,洗脑,项怀诚,项小吉,小参考,肖强,邪恶,谢长廷,谢选骏,谢中之,辛灏年,新观察论坛,新华举报,新华内情,新华通论坛,新生网,新闻封锁,新语丝,信用危机,邢铮,熊炎,熊焱,修炼,徐邦秦,徐才厚,徐匡迪,徐水良,许家屯,薛伟,学潮,学联,学习班,学运,学自联,雪山狮子,严家其,严家祺,阎明复,颜射,央视内部晚会,杨怀安,杨建利,杨巍,杨月清,杨周,姚月谦,夜话紫禁城,一中一台,义解,亦凡,异见人士,异议人士,易丹轩,易志熹,尹庆民,由喜贵,游行,幼齿,于大海,于浩成,余英时,舆论,舆论反制,宇明网,圆满,远志明,岳武,在十月,则民,择民,泽民,贼民,曾培炎,张伯笠,张钢,张宏堡,张健,张林,张万年,张伟国,张昭富,张志清,赵海青,赵南,赵品潞,赵晓微,赵紫阳,哲民,真相,真象,镇压,争鸣论坛,正见网,正义党论坛,郑义,包夜,冰火,插B,操B,处女,打飞机,风骚,黄色电影,激情视频,叫春,狂插,狂操,狂搞,露乳,裸聊,裸体,屁股,强奸,三级片,色情,脱光,脱衣,性爱,性感,性高潮,性交,胸部,艳舞,一夜情,欲望,操你,你他妈,傻逼,傻B,TMD,TNND,TND,法轮功,江氏,李洪志,新唐人,淫靡,淫水,六四事件,迷药,迷昏药,窃听器,六合彩,买卖枪支,退党,三唑仑,麻醉药,麻醉乙醚,短信群发器,帝国之梦,毛一鲜,黎阳平,色情服务,对日强硬,出售枪支,摇头丸,西藏天葬,鬼村,军长发威,PK黑社会,恶搞晚会,枪决女犯,投毒杀人,强硬发言,出售假币,监听王,昏药,侦探设备,麻醉钢枪,反华,官商勾结,升达毕业证,手机复制,戴海静,自杀指南,自杀手册,张小平,佳静安定片,蒙汗药粉,古方迷香,强效失意药,迷奸药,透视眼镜,远程偷拍,自制手枪,子女任职名单,激情小电影,黄色小电影,色情小电影,天鹅之旅,盘古乐队,高校暴乱,高校群体事件,大学骚乱,高校骚乱,催情药,拍肩神药,春药,窃听器材,身份证生成器,枪决现场,出售手枪,麻醉枪,办理证件,办理文凭,疆独藏独,高干子弟,高干子女,枪支弹药,血腥图片,反政府,禁书,特码,成人片,成人电影,换妻,发票,增值税,迷幻药,隐形,耳机,法 轮 功,李 宏 志,真 善 忍,宏志,杀死,奖,发抡,拉登,拉丹,法抡,法囵,法仑,法纶,发仑,发囵,国研新闻邮件,自由运动,法轮大法,淫秽,E周刊,龙卷风,正法,三陪,嫖娼,静坐,政变,造反,独立,发轮功,功友,人民大众时事参考,示威,罢工,大法弟子,印尼伊斯兰祈祷团,中俄边界新约,政治运动,压迫,非典,共产党,反革命,十六大,江独裁,台湾,东突厥斯坦伊斯兰运动,一边一国,回民,中华民国,政治风波,古怪歌,突厥斯坦,简鸿章,联总之声传单,人民报讯,东突,人民真实报道,教徒,推翻,小灵通,操你奶奶,操你妈,fa lun,IP17908,fa,falong,陈水扁,主席,改革,他妈的,人民真实报导,开放,杂志,中俄,边界新约,（诽闻）,无能,印尼依斯兰祈祷团,东突厥斯坦依斯兰运动,本拉登,维吾尔自由运动,国际地质科学联合会,中国民主正义党,www.cdjp.org,民主中国,www.chinamz.org,中国民主同盟,支联会,天安门母亲,张戎,西藏流亡政府,邓力群,龙新民,www.bignews.org,www.boxun.com,也就是博讯,www.cnd.org,www.chinesenewsnet.com,纪元,www.dajiyuan.com,大纪元时报,自由亚洲,www.rfa.org ,www.renminbao.com,维基百科,zh.wikipedia.org,根敦.确吉尼玛,根敦.确吉,确吉尼玛 ,西藏论坛,www.tibetalk.com,破网软件,无界,自由门,花园网,我的奋斗";
  
    //评论打分
     $(".criticism-box .ico-item b").each(function(index){
        var ind = index+1;
        $(this).hover(function(){
            if ($("#score").val()=="0"){
                starAdd(0,ind);
                starSub(ind,4);
                $("#scoreTips").html(ind+' 分');
            }
        },function(){
            if ($("#score").val()=="0"){
               starSub(0,5);
                $("#scoreTips").html("（点击心形进行打分）");
            }
        })
        $(this).click(function(){
            starAdd(0,ind);
            starSub(ind,4);
            $("#score").val(ind);
             $("#scoreTips").html(ind+' 分');
            for(var i=0;i<5;i++){
                $(".criticism-box .ico-item b:eq("+i+")").unbind("hover");
            }
        });
    });
    var starAdd = function(s,e){
        
        for(var i=s;i<e;i++){
            $(".criticism-box .ico-item b:eq("+i+")").addClass("hollow");
        }
    }
    var starSub = function(s,e){
         
        for(var j=e;j>=s;j--){
            $(".criticism-box .ico-item b:eq("+j+")").removeClass();
        }
    }
    
    var rContentMax = 300;
    function contentMax() {
        var b = rContentMax - $("#mcontent")[0].value.length;
        if (b >= 0) {
            $("#rContentMax").html(b);
            $("#tips").html(reWd[0] + "<strong class='bold_red'>" + b + "</strong>" + reWd[1]);
            $("#tips").css("color", "black")
        } else {
            var a = $("#mcontent")[0].value.length - rContentMax;
            $("#tips").html(reWd[2] + "<strong class='bold_red'>" + a + "</strong>" + reWd[1]);
            $("#tips").css("color", "red")
        }
    }
    
        if ($("#mcontent")[0] != undefined) {
            $("#mcontent").keyup(function() {
                contentMax()
            });
            $("#mcontent").blur(function() {
                contentMax();
                if ($("#mcontent").val() == "") {
                    $(this).addClass("font_h");
                    $(this).val(rcontent)
                }
            });
            $("#mcontent").focus(function() {
                if ($("#mcontent").val().indexOf(rcontent) != -1) {
                    $(this).removeClass("font_h");
                    $(this).val("")
                }
            });
            $("#imageField").click(function() {
                 var r= checkcont("tips", "mcontent");
                 if( r != false )
                     $(this).closest("form").eq(0).submit();
            });
            if ($("#mcontent").val().indexOf(rcontent) == -1) {
                $("#mcontent").removeClass("font_h")
            }
        }
    
        
function haveForbidWord(e, c) {
    var a = e.split(",");
    var d = "";
    for (var b = 0; b < a.length; b++) {
        if (c.indexOf(a[b]) != -1) {
            d += a[b] + ","
        }
    }
    if (d != "") {
        if (d.substr(d.length - 1) == ",") {
            d = d.substr(0, d.length - 1)
        }
    }
    return d
}
function checkcont(d, b) {
    var c = $("#" + b).val();
    contentClear = c.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/ig, "");
    if ($("#" + d).html().indexOf(reWd[2]) != -1) {
        wx.alert(reWd[3]);
        $("#" + b)[0].focus();
        return false
    } else {
        if (c == "" || c == rcontent || $.trim(c) == reWd[9]) {
            wx.alert(reWd[4]);
            $("#" + b)[0].focus();
            $("#" + b).val("");
            return false
        } else {
            if (b == "mcontent" && contentClear.length < 10) {
                wx.alert(reWd[14]);
                $("#" + b)[0].focus();
                return false
            } else {
                var a = haveForbidWord(forbidword, c);
                if (a != "") {
                    wx.alert(reWd[5].replace("[forbidword]", a));
                    $("#" + b)[0].focus();
                    return false
                }
            }
        }
    }
    if ($("#score") != undefined && b == "mcontent") {
        if ($("#score").val() == 0) {
            wx.alert(reWd[6]);
            return false
        }
    }
    if (b == "mcontent") {
        if (checkUrlForReview(c)) {
            wx.alert(reWd[7]);
            $("#mcontent").focus();
            return false
        }
    }
}

function myclick(e)
{
    $(e).click();
}
 
$("#replylayer").on('click',".user-reply a ,.close_icon_new  a", function(){
    var b=$(this).attr("rid");
    var a=$(this).attr("type");
    var obj=this;
        if (a == "show") {
        if(!user.hasLogin()) {         
            login("login",function(){ $(obj).click(); } );
        } else {
            $("#tips_" + b).html(rpltips);
            $("#rcontent_" + b).val(reWd[9]);
            $("#reply_" + b).show()
        }
    } else {
        if (a == "hide") {
            $("#reply_" + b).hide()
        }
    }
     
});
 

//评论页面设置宽度
review.setReviewPageWidth();

var addReply = function(c) {
    var d = $(c).attr("ac_id");
    var a = checkcont("tips_" + d, "rcontent_" + d);
    if (a === false) {
        return false
    }
    var b = $("#rcontent_" + d).val();
    if (b.length < 2 || b.length > 300) {
        $("#tips_" + d).html(ero_rew);
        $("#rcontent_" + d).focus();
        return false
    }
    if (checkUrlForReview(b)) {
        wx.alert(reWd[7]);
        $("#rcontent_" + d).focus();
        return false
    }
    
    if (wx.cookie("replay" + $(c).attr("ac_gid") + user.BUYER_ID)) {
        wx.alert(reWd[8]);
        $("#reply_" + d).hide();
        return false
    }
    $.get("/index.php?r=tReview/addreplay", {
        reviewid: d,
        goodsid: $(c).attr("ac_gid"),
        orderid: $(c).attr("ac_orderid"),
        orderitemid: $(c).attr("ac_itemid"),
        reviewpage: $(c).attr("ac_reviewpage"),
        reviewtype: $(c).attr("ac_reviewtype"),
        content: encodeURIComponent( $("#rcontent_" + d).val()),
        reviewscore: $(c).attr("ac_score")
    },
    function(e) {
        if (e == -4) {} else {
            if (e == -1 || e == -2 || e == -3) {
                $("#tips_" + d).html("error:" + e)
            } else {
                if (e == -7 || e == -8 || e == -9) {
                    if (e == -7) {
                        wx.alert(reWd[11])
                    } else {
                        if (e == -8) {
                            wx.alert(reWd[10])
                        } else {
                            wx.alert(reWd[7])
                        }
                    }
                    $("#reply_" + d).hide();
                    return false
                } else {
                    var cookietime = new Date(); 
                        cookietime.setTime(new Date().getTime() + (12 * 60 * 1000)); //12分钟
                        wx.cookie("replay" + $(c).attr("ac_gid") + user.BUYER_ID, "1",{expires:cookietime})                  
                    $("#replycont_" + d).html(e);
                    $("#replycont_" + d).css("display","block")
                    review.setReviewPageWidth();
                    $("#reply_" + d).hide();
                    if (!$("#review_" + d).hasClass("comment_reply_bt")) {
                        $("#review_" + d).addClass("comment_reply_bt")
                    }
                }
            }
        }
    })
};
$("#replylayer ").on('click',".comment_submit_buttonr_new a", function(){  addReply(this)  });

function replytopage(e, b, a, d, c) {
    $.get("/index.php?r=tReview/getreplaydate", {
        reviewid: e,
        replaypage: b,
        goodsid: a,
        reviewpage: d,
        reviewtype: c
    },
    function(f) {
        if (f != "") {
            $("#replycont_" + e).html(f)
        }
    })
}
//回复分页
$("#replylayer ").on('click',".reply_box>.tlist_num a", function(){  
    var cs=$(this).attr("class");
    if( cs=="sn_show")
    {
        return false;
    }
    var rid=$(this).attr("rid");
    var gid=$(this).attr("gid");
    var page=$(this).attr("page");
     var type=$(this).attr("type");
     var rp=$(this).attr("rp");
     replytopage(rid,page,gid,rp,type );
});
var useful = function(e) {
    if(!user.hasLogin()) {
         login("login",function(){});
        return false
    } else {
        var b = wx.cookie("rw");
        var i = $(e).attr("ac_id");
        var c = $(e).attr("ac_val");
        var g = $(e).attr("ac_page");
        var h = $(e).attr("ac_type");
        var f = $(e).attr("ac_goodsid");
        var d = $(e).attr("ac_score");
        var a = new RegExp(user.BUYER_ID + "@(,\\d+)*," + i + "(,\\d+)*", "ig");
        if (b == 1) {
            b="";
        }
        if (b == null || b == "" || b.match(a) == null) {
            
            wx.cookie("rw","1",{expires:30});
            $.get("/index.php?r=tReview/reviewuseful", {
                reviewscore: d,
                reviewid: i,
                useful: c,
                reviewpage: g,
                reviewtype: h,
                goodsid: f
            },
            function(n) {
                if ($.trim(n) == "1") {
                    var k = "";
                    if (b != null && b != "") {
                        var m = new RegExp(user.BUYER_ID + "@(,\\d+)*|$", "ig");
                        var l = b.match(m);
                        if (l != null && l != "") {
                            var l = l.toString();
                            l = (l.substr(l.length - 1, 1) == ",") ? l.substr(0, l.length - 1) : l;
                            k = b.replace(l, l + "," + i)
                        } else {
                            k = b + "|" + user.BUYER_ID + "@," + i
                        }
                    } else {
                        k = user.BUYER_ID + "@," + i
                    }
                    
                     wx.cookie("rw",k,{expires:30});
                    if (c == 0) {
                        $("#yes_num_" + i).html(parseInt($("#yes_num_" + i).html()) + 1)
                    } else {
                        if (c == 1) {
                            $("#no_num_" + i).html(parseInt($("#no_num_" + i).html()) + 1)
                        }
                    }
                }
            })
        } else {
            var j = $("html,body").scrollTop();
            wx.alert(reWd[12]);
            $("html,body").scrollTop(j)
        }
    }
}; 
//有用 没用
$("#replylayer").on('click',".user-main a", function(){ useful(this); });

 //评论分页
$("#replylayer").on('click','.tlist_num:last a',function(){  
    var gid=$(this).attr("gid");
    var page=$(this).attr("page");
    var tp=$(this).attr("tp");
    var cs=$(this).attr("class");
   
    if( cs=="sn_show")
    {
        $(this).off();
    }
    else if( cs=="yes_s" )
    {
        var newpage= $(this).parent().find("input").eq(0).val();
        var pagenum=parseInt( $(this).attr("pagenum") );
        newpage=parseInt( newpage );
        if( isNaN(newpage )   || newpage < 1   )
        {
            newpage=1;
        }
        else if(newpage > pagenum)
        {
            newpage = pagenum;
        }
       review.topage(gid,newpage,tp );        
    }
    else
    {
        review.topage(gid,page,tp );         
    }
    review.setReviewPageWidth();
})

$("#replylayer").on("keyup",".tlist_num input[name='topage']",function(){  var s=$(this).val(); $(this).val( s.replace(/[^\d]/g,'') )   })

$("#replylayer").on("focus",".comment_submit_textarea_new",
function() {
    if ($(this).val() == reWd[9]) {
        $(this).val("")
    }
});


function checkUrlForReview(a) {
    var b = /((http:\/\/)?((\w)+[.])+(net|com|cn|org|cc)(((\/[\~]*|\\[\~]*)(\w)+)|[.](\w)+)*(((([\/]?[?](\w)+){1}[=]*))*((\w)+){1}([\&](\w)+[\=](\w)+)*)*)/;
    var c = new RegExp(b);
    a = a.replace(/\s+/g, "");
    a = a.replace(regStr, ".");
    if (c.test(a)) {
        return true
    } else {
        return false
    }
};

$("#replylayer").on("click",".setreview",
function() {
    var gid=$(this).attr("gid");
   review.canReviewCheck(gid);
});
    
    
    
});