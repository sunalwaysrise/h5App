/**
 * @author luwenbin@live.com
 */
window.scrollTo(0,0);
try{document.domain='cp2y.com';}catch(e){};
var WebAppUrl={
		RESOURCE_URL : "res/images/",
		HOME_APP_URL : 'http://m.cp2y.com',
		JS_URL:"res/js/play/"
	},
	index=$("#index"),MainPage=$("#mainPage"),mainSection=$("#mainSection"),userCenter=$("#userCenter"),
	drawCenter=$("#drawCenter"),
	Choose=$("#choose"),//缓存投注区域
	Title=$("#Title"),//缓存玩法标题
	ChangePlayType=$("#changePlayType"),//缓存玩法类型
	Muls=$("#muls"),//缓存倍数选择框
	Muls2=$("#muls2"),//缓存倍数选择框
	Issues=$("#issues"),//缓存追期框
	Issues2=$("#issues2"),//缓存追期框
	CurBets=$("#curBets"),//缓存当前注数显示区域
	CurMoney=$("#curMoney"),//缓存当期金额显示区域
	BetLists=$("#betLists"),
	BetList=$("#betList"),//缓存所有投注内容区域
	Bets=$("#bets"),//缓存所有倍数
	Money=$("#money"),//缓存总金额
	Loading=$("#loading"),
	playDom={
		complete:$("#completeZH"),
		header:$("#mainSection header"),
		ZhihaoTi:$("#ZhihaoTi"),
		QRTi:$("#QRTi"),
		GoIndex:$("#GoIndex"),//缓存 返回首页 按钮
		GoSelectArea:$("#GoSelectArea"),//返回投注区域按钮
		GoMyBets:$("#GoMyBets"),//返回我的投注区域
		More:$("#More"),//缓存更多按钮
		Edit:$("#EditBets"),//缓存编辑投注列表按钮
		Zhuihao:$("#Zhuihao"),//缓存追号按钮
		MainStep1:$("#MainStep1"),
		MainStep2:$("#MainStep2"),
		MainStep3:$("#MainStep3"),
		MainStep31:$("#MainStep31"),
		SimpleIssues:$("#simpleIssues"),
		MainStep32:$("#MainStep32"),
		setIssues:$("#setIssues"),
		selfMul:$("#selfMul"),
		selfMul2:$("#selfMul2"),
		Clear:$("#clear"),//清除按钮
		Randoms:$("#Randoms"),//机选按钮
		cancelRandoms:$("#cancelRandoms"),
		RandomList:$("#RandomList"),//机选列表
		Tools2:$("#tools2"),
		addContent:$("#addContent"),
		aPrize:$("#aboutPrize")
	},
	MoreDetail=$("#MoreDetail"),
	MoreLocked=$("#MoreLocked"),
	betListsTitle=$("#betListsTitle"),
	MoreIssuesBtn=$("#MoreIssuesBtn"),
	IssuesList=$("#IssuesList"),
	CountDown=$("#countDown"),//缓存倒计时区域
	curIssue=$("#curIssue"),
	curCountDown=$("#curCountDown"),
	buyBox=$("#buyBox"),
	payBox=$("#payBox"),
	userCenter=$("#userCenter"),
	userPartBox=$("#userPartBox"),
	userDom={
		GoIndex1:$("#GoIndex1"),
		GoIndex2:$("#GoIndex2"),
		GoIndex3:$("#GoIndex3"),
		more:$("#userMore"),
		moreDetail:$("#userMoreDetail"),
		userPartTitle:$("#userPartTitle"),
		userTip3:$("#userTip3"),
		uPDetail:$("#userPartDetail")
	},
	drawDom={
		GoIndex4:$("#GoIndex4"),
		GoIndex5:$("#GoIndex5"),
		GoIndex6:$("#GoIndex6"),
		title:$("#drawCenterTitle"),
		drawContent:$("#drawContentBox"),
		drawDetail:$("#drawDetail")
	},
	BT={
		kk:[10037,10038,10046,10060,10061,10062,10064,10065,10066,10067],
		lotto:[10026,10032],
		jc:[10057,10058,10059,10039,10040,10041,10042],
		selling:[10046,10064,10065,10026,10032,10059,10061]
	},
	cp2y={};
cp2y.index=function(){//入口方法。
	var type=cp2y.util.getArgs('type'),code=cp2y.util.getArgs('code'),issue=cp2y.util.getArgs('issue'),
		step=cp2y.util.getArgs('part'),playType=cp2y.util.getArgs('playType'),scheme=cp2y.util.getArgs('scheme');
	if(type=="buy"){//购买模块
		if(scheme=="scheme"){
			index.hide();mainSection.show();userCenter.hide();drawCenter.hide();
			cp2y.buy.step2();
		}else{
			$("#inJs").remove();//清除旧的玩法js
			$.getScript(WebAppUrl.JS_URL+code+".js?v=2014031401",function(){
				cp2y.dialog.clearLoading();
				cp2y.buy.init(playType);//初始化
				index.hide();mainSection.show();userCenter.hide();drawCenter.hide();
			});
		}
	}else if(type=="user"){//用户模块
		index.hide();mainSection.hide();drawCenter.hide();userCenter.show();
		switch (step){
			case "signIn":
			cp2y.user.signInBox();
			break;
			case "signUp":
			cp2y.user.signUpBox();
			break;
			case "findPassword":
			cp2y.user.findPasswordBox();
			break;
			case "home":
			cp2y.user.home();
			break;
			case "scheme":
			cp2y.user.scheme(scheme);
			break;
			case "recharge":
			cp2y.user.rechargeBox();
			break;
		}
	}else if(type=="draw"){//开奖公告
		index.hide();mainSection.hide();userCenter.hide();drawCenter.show();
		switch (step){
			case "index":
			cp2y.draw.index();
			break;
			case "list":
			cp2y.draw.list(playType);
			break;
			case "detail":
			cp2y.draw.detail(playType,issue);
			break;
		}
	}else{
		index.show();mainSection.hide();userCenter.hide();drawCenter.hide();cp2y.mainPage();
	}
};
cp2y.closeBanner=function(){
	$("#banner").hide();
	sessionStorage.setItem('isShowBanner', 1);
};
cp2y.mainPage=function(){
	$.ajax({
		url:WebAppUrl.HOME_APP_URL+"/lottery/lottery_list",
		beforeSend:function(){
			cp2y.dialog.loading();
		},
		success:function(data){
			cp2y.dialog.clearLoading();
			var i=0,len=data.list.length,html=[],hot="a0",tmp='';
			if(sessionStorage.getItem('isShowBanner')!=1){
				html.push('<div class="banner" id="banner"><i onclick="cp2y.closeBanner();" id="closeBanner"></i><a href="/news/rechargesendmoney.jsp" target="_blank"><img src="'+WebAppUrl.RESOURCE_URL+'../activityImages/minActivityBanner0.jpg" /></a></div>');
			}
			for(i;i<len;i++){
				tmp='';
				switch(data.list[i].lotteryId){
					case 10032:
					case 10026:
						tmp='<p><span>'+cp2y.util.setIssue2(data.list[i].lastIssue)+'期奖号:</span>'+cp2y.util.splitNumber2(data.list[i].drawNumber)+'</p>';
						break;
					case 10046:
					case 10061:
					case 10064:
					case 10065:
						tmp='<p><span>'+cp2y.util.setIssue1(data.list[i].lastIssue)+'期奖号:</span>'+cp2y.util.splitNumber1(data.list[i].drawNumber)+'</p>';
						break;
				}
				switch(data.list[i].lotteryId){
					case 10032:
					case 10026:
						hot="a0";
						break;
					case 10046:
						hot="a19";
						break;
					case 10061:
						hot="a0";
						break;
					case 10064:
						hot="a12";
						break;
					case 10065:
						hot="a3";
						break;
				}
				html.push('<div class="playType" onclick="cp2y.buy.initBuy('+data.list[i].lotteryId+',\''+hot+'\')">');
				html.push('<div class="img2"><img src="'+WebAppUrl.RESOURCE_URL+data.list[i].lotteryId+'.png" alt=""/><span>'+data.list[i].lotteryName+'</span></div><div class="playTypeArea">');
				html.push('<p class="p11">'+data.list[i].message+'</p>');
				html.push(tmp);
				html.push('</div></div>');
			}
			html.push('<a href="/caiguanya"><div class="playType">');
			html.push('<div class="img2">');
			html.push('<img src="'+WebAppUrl.RESOURCE_URL+'10059.png" alt=""><span>竞彩足球</span>');
			html.push('</div>');
			html.push('<div class="playTypeArea">');
			html.push('<p class="p11">冠军竞猜</p>');
			html.push('<p>世界杯冠军、欧冠杯冠军</p>');
			html.push('</div></div></a>');
			html.push('<a href="/news/more.jsp"><div class="playType">');
			html.push('<div class="img2">');
			html.push('<img src="'+WebAppUrl.RESOURCE_URL+'more.png" alt="" style="margin-top:13px">');
			html.push('</div>');
			html.push('<div class="playTypeArea">');
			html.push('<p class="p11">更多彩种</p>');
			html.push('<p>竞彩足球、福彩3D、时时彩...</p>');
			html.push('</div></div></a>');
			MainPage.html(html.join(''));
		}
	});
};//构造首页
cp2y.util={
	setIssue1:function(s){
		var sL=s.length;
		return s.substr(sL-2,sL-1);
	},
	setIssue2:function(s){
		var sL=s.length;
		return s.substr(sL-3,sL-1);
	},
	splitNumber1:function(s){
		try{return "<a>"+s.split(",").join("</a><a>")+"</a>";}catch(e){}
	},
	splitNumber2:function(s){
		var s1=s.split("#"),s2=s1[0].split(",");
		return "<a>"+s2.join("</a><a>")+"</a><b>"+s1[1].split(",").join("</b><b>")+"</b>";
	},
	splitBalls:function(b){
		var bolls=[],b0=b.split("#"),b1=b0[0],b2=b0[1];
		if(b2){
			bolls.push('<b class="b1">'+b1+'</b>');
			bolls.push('<b class="b2">'+b2+'</b>');			
		}else{
			bolls.push('<b class="b2">'+b1+'</b>');
		}
		return bolls.join('');
	},
	toggle:function(o,obj,t){
		if($(o).attr("data")=="0"){
			obj.show();
			$(o).html("&gt;&gt;收起").attr({"data":1});
		}else{
			obj.hide();
			$(o).html("&gt;&gt;"+t).attr({"data":0});
		}
	},
	getBanks:function(){
		var html=[];
		html.push('<option value="工商银行" >工商银行(推荐)</option>');
		html.push('<option value="中国农业银行" >中国农业银行(推荐)</option>');
		html.push('<option value="中国建设银行" >中国建设银行(推荐)</option>');
		html.push('<option value="招商银行" >招商银行(推荐)</option>');
		html.push('<option value="交通银行" >交通银行</option>');
		html.push('<option value="中国银行" >中国银行</option>');
		html.push('<option value="中国邮政储蓄银行" >中国邮政储蓄银行</option>');
		html.push('<option value="中国民生银行" >中国民生银行</option>');
		html.push('<option value="兴业银行" >兴业银行</option>');
		html.push('<option value="华夏银行" >华夏银行</option>');
		html.push('<option value="中国光大银行" >中国光大银行</option>');
		html.push('<option value="宁波银行" >宁波银行</option>');
		html.push('<option value="上海浦东发展银行" >上海浦东发展银行</option>');
		html.push('<option value="广东发展银行" >广东发展银行</option>');
		html.push('<option value="深圳发展银行" >深圳发展银行</option>');
		html.push('<option value="中信实业银行" >中信实业银行</option>');
		$("#banks").html(html.join(''));
	},
	getAreas:function(){
		var i=0,len=selectCitys.length,html=[],html2=[];
		for(i;i<len;i++){
			html.push('<option value="'+i+'">'+selectCitys[i].name+'</option>');
		}
		$("#provinces").html(html.join('')).change(function(){
			cp2y.util.setCity($('#provinces').val());
		});
		this.setCity($('#provinces').val());
	},
	setCity:function(i){
		var data=selectCitys[i].cities,i=0,len=data.length,html=[];
		for(i;i<len;i++){
			html.push('<option value="'+data[i]+'">'+data[i]+'</option>');
		}
		$("#city").html(html.join(''));
	},
	getArgs:function(argName){
		if(!argName){return false;}
		var args = {},query = location.hash.substring(1),pairs = query.split("&");
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring(0,pos),value = pairs[i].substring(pos+1);
			value = decodeURIComponent(value);
			if(argName==argname){
				return value;
			}
		}
	},
	getCookies:function(c){
		if (document.cookie.length>0){
			s1=document.cookie.indexOf(c + "=");
			if (s1!=-1){
				s1=s1 + c.length+1;
				s2=document.cookie.indexOf(";",s1);
				if (s2==-1){
					s2=document.cookie.length;
				}
				return unescape(document.cookie.substring(s1,s2));
			}else{
				return false;
			}
		}else{
			return false;
		}
	},
	comp : function(n, m) {
        var n1 = 1, n2 = 1;
        for (var i = n,j = 1; j <= m; n1 *= i--,n2 *= j++);
        return n1 / n2;
    }
};
cp2y.dialog={
	alert:function(x,fn){
		if($("#DBox2").length==0){
      		$("body").append('<div id="DBox2"><div id="DBoxC2">'+x+'</div><div id="IKonw" class="DBoxB DBoxB2">知道了</div></div>');
    	}else{
    		$("#DBoxC2").html(x);
    	}
    	if(fn){
    		$("#IKonw").off().on('click',fn);
    	}else{
    		$("#IKonw").off().on('click',cp2y.dialog.closeAlert);
    	}
    	this.locked=true;
    	cp2y.dialog.lock();
    	$("#DBox2").show();
    	this.setPosition($("#DBox2"));
    	$(window).resize(function(){
    		if(cp2y.dialog.locked){
    			cp2y.dialog.setPosition($("#DBox2"));
    		}
    	});
	},
	closeAlert:function(){
		this.locked=false;
		$("#IKonw").off();
		$("#LockedBg").hide();
    	$("#DBox2").hide();
	},
	tip:function(x){
		$("#userTip3").html(x).addClass('onError');
	},
	clearTip:function(){
		$("#userTip3").html("").removeClass('onError');
	},
	loading:function(){
		Loading.show();
	},
	clearLoading:function(){
		$("#loading").hide();
	},
	setPosition:function(_obj){
		var t = document.documentElement.scrollTop || document.body.scrollTop,
			viewHeight = $(window).height(), viewWidth = $(window).width(), _objHeight = _obj.height(), _objWidth = _obj.width(),
			dialogTop = (viewHeight / 2) - (_objHeight / 2) + t,
			dialogLeft = (viewWidth / 2) - (_objWidth / 2);
		_obj.css({top : dialogTop,left : dialogLeft});
	},
	confirm:function(o,fn){
		if($("#DBox").length==0){
      		$("body").append('<div id="DBox"><div id="DBoxC">'+o+'</div><div id="DBoxFn" class="DBoxB">是</div><div class="DBoxB" onclick="cp2y.dialog.closeConfirm();">否</div></div>');
    	}else{
    		$("#DBoxC").html(o);
    	}
    	$("#DBox").show();
    	$("#DBoxFn").off().on('click',fn);
    	this.locked=true;
    	cp2y.dialog.lock();
    	this.setPosition($("#DBox"));
    	$(window).resize(function(){
    		if(cp2y.dialog.locked){
    			cp2y.dialog.setPosition($("#DBox"));
    		}
    	});
	},
	locked:false,
	lock:function(){
		if($("#LockedBg").length==0){
		  	$("body").append('<div id="LockedBg"></div>');
		}
		$("#LockedBg").show();
	},
	closeConfirm:function(){
		this.locked=false;
		$("#DBoxFn").off();
		$("#LockedBg").hide();
    	$("#DBox").hide();
	}
};
cp2y.pages={
	get:function(url,op){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+url,
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				op(data);
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	cur:0
};
cp2y.draw={
	index:function(){
		drawDom.GoIndex4.show();drawDom.GoIndex5.hide();drawDom.GoIndex6.hide();drawDom.title.html('开奖公告');
		drawDom.drawDetail.hide();drawDom.drawContent.show();
		location.hash="type=draw&part=index";
		cp2y.pages.get('/lottery/issue_notify_all',function(data){
			var i=0,len=data.drawList.length,html=[];
			for(i;i<len;i++){
				var bolls=[],b,b1,b2,j=0,len2,len3;
				if(data.drawList[i].drawNumber){
					b=data.drawList[i].drawNumber.split("#");
					b1=b[0].split(',');
					b2=b[1];
					len2=b1.length;
				}
				if(data.drawList[i].lotteryId ==10059 || data.drawList[i].lotteryId ==10058){
					for(j;j<len2;j++){
						bolls.push('<em >'+b1[j]+'</em>');
					}
				}else{
					for(j;j<len2;j++){
						bolls.push('<a class="draw1">'+b1[j]+'</a>');
					}
				}
				if(b2){
					if(b2.indexOf(",")!=-1){
						b2=b2.split(",");
						j=0;len3=b2.length;
						for(j;j<len3;j++){
							bolls.push('<a class="draw2">'+b2[j]+'</a>');
						}
					}else{
						bolls.push('<a class="draw2">'+b2+'</a>');
					}
				}
				html.push('<div class="playType" onclick="cp2y.draw.list(\''+data.drawList[i].lotteryId+'\')">');
				html.push('<div class="img2"><img src="'+WebAppUrl.RESOURCE_URL+data.drawList[i].lotteryId+'.png"/><span>'+data.drawList[i].lotteryName+'</span></div>');
				html.push('<div class="drawList">');
				html.push('<span>'+data.drawList[i].issue+'期</span><p>'+data.drawList[i].drawTime+'</p>');
				html.push('<div>'+bolls.join('')+'</div>');
				html.push('</div>');
				html.push('</div>');
			}
			drawDom.drawContent.html(html.join(''));
		});
	},
	cur:0,
	list:function(id){
		location.hash="type=draw&part=list&playType="+id;
		drawDom.GoIndex4.hide();drawDom.GoIndex5.show();drawDom.GoIndex6.hide();
		drawDom.drawDetail.hide();
		drawDom.drawContent.show();
		this.cur=0;
		drawDom.drawContent.html('');
		cp2y.pages.get('/lottery/query_his_notify?lotteryId='+id+'&firstRow=0&fetchSize=10',cp2y.draw.getData);
	},
	getMore:function(id){
		$("#getMore").remove();
		cp2y.pages.get('/lottery/query_his_notify?lotteryId='+id+'&firstRow='+this.cur+'&fetchSize=10',cp2y.draw.getData);
	},
	getData:function(data){
		if(data.flag==1){
			cp2y.draw.cur+=10;
			drawDom.title.html(data.lotteryName);
			var i=0,len=data.list.length,html=[];
			for(i;i<len;i++){
				var bolls=[],b,b1,b2,j=0,len2,len3;
				if(data.list[i].drawNumber){
					b=data.list[i].drawNumber.split("#");
					b1=b[0].split(',');
					b2=b[1];
					len2=b1.length;
				}
				if(data.list[i].lotteryId ==10059 || data.list[i].lotteryId ==10058){
					for(j;j<len2;j++){
						bolls.push('<em >'+b1[j]+'</em>');
					}
				}else{
					for(j;j<len2;j++){
						bolls.push('<a class="draw1">'+b1[j]+'</a>');
					}
				}
				if(b2){
					if(b2.indexOf(",")!=-1){
						b2=b2.split(",");
						j=0;len3=b2.length;
						for(j;j<len3;j++){
							bolls.push('<a class="draw2">'+b2[j]+'</a>');
						}
					}else{
						bolls.push('<a class="draw2">'+b2+'</a>');
					}
				}
				html.push('<div class="playType" onclick="cp2y.draw.detail(\''+data.lotteryId+'\','+data.list[i].issue+')">');
				html.push('<div class="drawList"><span>'+data.list[i].issue+'期</span>');
				html.push('<p>'+data.list[i].drawTime+'</p>');
				html.push('<div>'+bolls.join('')+'</div>');
				html.push('</div></div>');
			}
			if(len==0){
				html.push('<div class="btn2" id="getMore">没有了</div>');
			}else{
				html.push('<div class="btn2" id="getMore" onclick="cp2y.draw.getMore('+data.lotteryId+');">查看更多</div>');	
			}
			drawDom.drawContent.append(html.join(''));
		}
	},
	detail:function(id,issue){
		location.hash="type=draw&part=detail&playType="+id+"&issue="+issue;
		drawDom.GoIndex4.hide();drawDom.GoIndex5.hide();drawDom.GoIndex6.show();
		drawDom.drawDetail.show();
		drawDom.drawContent.hide();
		cp2y.pages.get('/lottery/issue_detail?lotteryId='+id+'&issue='+issue,function(data){
			var data=data[0],html=[],i=0,len=data.items.length,bolls=[],b,b1,b2,j=0,len2,len3;
			if(data.drawNumber){
				b=data.drawNumber.split("#");
				b1=b[0].split(',');
				b2=b[1];
				len2=b1.length;
			}
			if(data.lotteryId ==10059 || data.lotteryId ==10058){
				for(j;j<len2;j++){
					bolls.push('<em >'+b1[j]+'</em>');
				}
			}else{
				for(j;j<len2;j++){
					bolls.push('<a class="draw1">'+b1[j]+'</a>');
				}
			}
			if(b2){
				if(b2.indexOf(",")!=-1){
					b2=b2.split(",");
					j=0;len3=b2.length;
					for(j;j<len3;j++){
						bolls.push('<a class="draw2">'+b2[j]+'</a>');
					}
				}else{
					bolls.push('<a class="draw2">'+b2+'</a>');
				}
			}
			drawDom.title.html(data.lotteryName);
			html.push('<div class="playType" ><div class="img2"><img src="'+WebAppUrl.RESOURCE_URL+data.lotteryId+'.png" alt=""/><span>'+data.lotteryName+'</span></div>');
			html.push('<div class="drawList"><span>'+data.issue+'期</span><p>'+data.drawTime+'</p>');
			html.push('<div>');
			html.push('</div>'+bolls.join('')+'</div></div>');
			html.push('<table class="table1">');
			html.push('<thead><tr><td>奖项</td>');
			if(BT.kk.indexOf(data.lotteryId)==-1){
				html.push('<td>中奖数量</td>');
			}
			html.push('<td>奖金</td></tr></thead><tbody>');
			for(i;i<len;i++){
			html.push('<tr><td>'+data.items[i].prizeItem+'</td>');
			if(BT.kk.indexOf(data.lotteryId)==-1){
				html.push('<td>'+data.items[i].number+'</td>');
			}
			html.push('<td>'+data.items[i].prizeAmount+'</td></tr>');
			}
			html.push('</tbody></table>');
			html.push('<div class="fixBottom" onclick="cp2y.buy.initBuy('+data.lotteryId+',\'a0\')">购买'+data.lotteryName+'</div>');
			drawDom.drawDetail.html(html.join(''));
		});
	}
};
//原生对象扩展
$.extend(Array.prototype,{
	indexOf   : function(val){var pos=-1;$(this).each(function(i,v){if(v==val){pos=i;return;}});return pos;},
	del       : function(value){var pos = this.indexOf(value);if(pos==-1)return;this.splice(pos,1);return this;},
	max       : function(){var max;$(this).each(function(i,v){v = Number(v);max = i==0?v:(v>max?v:max);});	return max;},
	min       : function(){var min;$(this).each(function(i,v){v = Number(v);min = i==0?v:(v<min?v:min);});	return min;},
	hasRepeat : function(){var b = {};var a = this;for(var i=0,l=a.length; i<l&&!b[a[i]];b[a[i++]]=1);return i<l;	},
	clone     : function(){var a=[];for(var i=0;i<this.length;i++)a[i] = this[i];return a;},
	del       : function(value,isPos){var pos=!isPos?this.indexOf(value):value;if(pos==-1)return;this.splice(pos,1);return this;},
	random : function(o){
		o = $.extend({
		   	len    : 1,//号码长度
			repeat : false,//是否可以重复
			sort   : false,//是否需要排序
			zero   : false//是否需要补0
	    },o);
		var s=this,a=[],no;
		var r = function(){return s[Math.round(Math.random()*(s.length-1))];};
		while(a.length!=o.len){
			no = r();
			if(!o.repeat && a.indexOf(no)!=-1)continue;
			a.push(no);
		}
		return a;
	},
	inArray2:function(arr1){//判断二维数组包含关系
	    var i=0,len=this.length;
	    for(i=0;i<len;i++){
	        var j=0,jlen=this[i].length,x=0;
	        for(j;j<jlen;j++){
	            if(arr1[j]==this[i][j]){
	                x++;
	            }
	        }
	        if(x==jlen){
	            return true;
	        }
	    }
	    return false;
	}
});
$.extend(String.prototype,{
	isID:function() {
		var errors = [0, '身份证号码位数不对!', '身份证号码出生日期超出范围或含有非法字符!', '身份证号码校验错误!', '身份证地区非法!'],
			area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},
			idcard = this,
			Y,
			JYM,
			S,
			M,
			idcard_array = idcard.split('');
		//地区检验
		if (!area[parseInt(idcard.substr(0, 2))]){
			return errors[4];
		}
		//身份号码位数及格式检验
		switch(idcard.length) {
			case 15:
				var ereg;
				if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 )){
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
				}else{
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
				}
				if (ereg.test(idcard)){
					return errors[0];
				}else{
					return errors[2];
				}
				break;
			case 18:
				if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)){
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
				//闰年出生日期的合
				}else{
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
				}
				//平年出生日期的合法性正则表达式
				if (ereg.test(idcard)) {
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);
					//判断校验位
					if (M == idcard_array[17]){
						return errors[0];
						//检测ID的校验位
					}else{
						return errors[3];
					}
				} else{
					return errors[2];
				}
				break;
			default:
				return errors[1];
		}
	},
	isPhone:function(){
		var r = /^\+?[1-9][0-9]*$/;
		if(!r.test(this) || this.length!=11){
			return false;
		}else{
			return true;
		}
	},
	isInt:function(){
		var r = /^\+?[1-9][0-9]*$/;
	    return r.test(this);
	}
});
$.extend(Number.prototype,{
	addZero   : function(){if(this<10){return "0"+this;}else{return this;}}
});
