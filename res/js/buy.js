/**
 * @author luwenbin@live.com
 */
var autoRunMark;
cp2y.issues={
	simpleIssues:[],
	getSimpleIssues:function(p){
		playDom.MainStep31.show();
		playDom.MainStep32.hide();
		playDom.Zhuihao.html('高级追号');
		playDom.ZhihaoTi.html('普通追号');
		playDom.Zhuihao.off().on('click',function(){
			$(this).html('普通追号');
			playDom.ZhihaoTi.html('高级追号');
			cp2y.issues.getIssues();
		});
		if(p==1){
			Issues.focus();
		}else{
			Muls.focus();
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/commontraceIssueList",
			anysc:false,
			data:{lotteryId:_.bt,random:new Date().getTime()},
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
					var i=0,data,html=[],len,t;
					if(BT.lotto.indexOf(_.bt)!=-1){
						data=data.dataList;len=data.length;
						cp2y.issues.simpleIssues=data;
	html.push('<li><input id="simpleIss1" name="simpleIssueBtn" class="radioType" onclick="cp2y.issues.setSimple3(13);" type="radio"><label for="simpleIss1">追半个月(13期)</label></li>');
	html.push('<li><input id="simpleIss2" name="simpleIssueBtn" class="radioType" onclick="cp2y.issues.setSimple3(39);" type="radio"><label for="simpleIss2">追1个月(39期)</label></li>');
	html.push('<li><input id="simpleIss3" name="simpleIssueBtn" class="radioType" onclick="cp2y.issues.setSimple3(50);" type="radio"><label for="simpleIss3">最大(50期)</label></li>');
					}else{
						data=data.dataList;len=data.length;
						cp2y.issues.simpleIssues=data;
						for(i;i<3;i++){
							t=i==0?"今天":i==1?"明天":"后天";
							html.push('<li><input id="simpleIss'+i+'" class="issueCheck simpleIssueBtn" onclick="cp2y.issues.setSimple();" type="checkbox" data="'+i+'"><label for="simpleIss'+i+'">'+t+data[i].issueList.length+'期</label></li>');
						}
					}
					playDom.SimpleIssues.html(html.join(''));
					
				}
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	setSimple:function(){
		cp2y.buy.issues={};
		var data,i=0,len,ty=$("#muls").val(),simpleIssueBtn=$(".simpleIssueBtn"),datas=[];
		for(i;i<3;i++){
			if(simpleIssueBtn.eq(i).attr('checked')){
				data=this.simpleIssues[i].issueList;
				var j=0,jlen=data.length;
				for(j;j<jlen;j++){
					datas.push(data[j].issueId);
				}
			}
		};i=0;len=datas.length;
		for(i;i<len;i++){
			cp2y.buy.issues[datas[i]]=ty;
		}
	},
	setSimple2:function(_this){
		cp2y.buy.issues={};
		if(!$(_this).val().isInt()){
			$(_this).val(1);
		}
		if(BT.lotto.indexOf(_.bt)!=-1){
			if(!$(_this).val().isInt()){
				$(_this).val(1);
			}else if($(_this).val()>50){
				$(_this).val(50);
			}
			var isNum=$(_this).val(),data,i=0,len,ty=$("#muls").val();
			for(i;i<isNum;i++){
				cp2y.buy.issues[cp2y.issues.simpleIssues[i].issueId]=ty;
			}
		}else{
			var i=0,issues=[],isNum=$(_this).val(),ty=$("#muls").val();
			for(i;i<3;i++){
				var j=0,len=this.simpleIssues[i].issueList.length;
				for(j;j<len;j++){
					issues.push(this.simpleIssues[i].issueList[j].issueId);
				}
			}
			if(isNum>issues.length){
				$(_this).val(issues.length);
				isNum=issues.length;
			};i=0;
			for(i;i<isNum;i++){
				cp2y.buy.issues[issues[i]]=ty;
			}
		}
	},
	setSimple3:function(l){
		cp2y.buy.issues={};
		var i=0,len,ty=$("#muls").val();
		for(i;i<l;i++){
			cp2y.buy.issues[cp2y.issues.simpleIssues[i].issueId]=ty;
		}
	},
	setMul:function(_this){
		if(!$(_this).val().isInt()){
			$(_this).val(1);
		}
		if($(_this).val()>9998){
			$(_this).val(9999);
		}
		var i=0,ty=$(_this).val();
		for(i in cp2y.buy.issues){
			cp2y.buy.issues[i]=ty;
		}
	},
	getIssues:function(){
		playDom.MainStep31.hide();
		playDom.MainStep32.show();
		playDom.Zhuihao.html('普通追号');
		playDom.ZhihaoTi.html('高级追号');
		playDom.Zhuihao.off().on('click',function(){
			$(this).html('高级追号');
			playDom.ZhihaoTi.html('普通追号');
			cp2y.issues.getSimpleIssues();
		});
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/traceIssueList",
			anysc:false,
			data:{lotteryId:_.bt,random:new Date().getTime()},
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
				var issue=data.dataList,i=0,len=issue.length,html=[];
				html.push('<div class="IssuesTop"><span><input id="setIssues" class="input3" type="number" min="0" onblur="cp2y.issues.setIssues(this)"/>期</span>');
				html.push('<span><input id="selfMul" type="number" class="input3" min="0" onblur="cp2y.issues.selfMuls(this)"/>倍</span>');
				html.push('<span>累加<input id="selfMul2" type="number" class="input3" min="0" onblur="cp2y.issues.selfMuls2(this)"/>倍</span></div>');
				html.push('<ul id="IssuesLists">');
				for(i;i<len;i++){
					html.push('<li><span><input class="issueCheck" onclick="cp2y.issues.setIssue(this,-1)" type="checkbox" data="'+issue[i].issueId+'"/>'+cp2y.util.setIssue1(issue[i].issue)+'期</span><span><input class="input2 selfMul" onblur="cp2y.issues.selfMul(this,-1)" type="number"  min="1" max="100" value="0" data="'+issue[i].issueId+'"/>倍</span><span></span></li>');
				}
				html.push('</ul>');
				IssuesList.html(html.join(''));
				}
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	setIssues:function(o){
		var len=$(o).val(),i=0,IssuesLists=$("#IssuesLists"),cur=$("#IssuesLists").children(".cur"),curlen=cur.length,totalL=IssuesLists.children('li').length;
		//清除所有
		if(len>totalL){
			len=totalL;
			$(o).val(totalL);
		}
		for(x in cp2y.buy.issues){
			delete cp2y.buy.issues[x];
		}
		for(i;i<curlen;i++){
			cur.eq(i).removeClass('cur');
			cur.eq(i).find(".issueCheck").attr('checked',null);
			cur.eq(i).find(".selfMul").val(0);
			cur.eq(i).children('span').eq(2).html("");
		}
		i=0;
		//重新计算
		for(i;i<len;i++){
			this.setIssue(IssuesLists.children("li").eq(i).find('.issueCheck'),0,i);
		}
	},
	setIssue:function(obj,type,i){
		var selfMul2=playDom.selfMul2.val(),selfMul=playDom.selfMul.val(),ty;
		if(selfMul2){
			if(!i){i=1;}
			ty=(i+1)*selfMul2;
		}else if(selfMul){
			ty=selfMul;
		}else{
			ty=1;
		}
		if(type==0){
			obj.attr('checked','checked');
			obj.parent().parent().addClass('cur');
			obj.parent().next().children("input").val(ty);
			obj.parent().next().next().html(ty*2);
			cp2y.buy.issues[obj.attr("data")]=ty;
		}else if(type==-1){
			if($(obj).attr('checked')=='checked'){
				$(obj).attr('checked', null);
				$(obj).parent().parent().removeClass('cur');
				$(obj).parent().next().children("input").val(0);
				delete cp2y.buy.issues[$(obj).attr("data")];
				$(obj).parent().next().next().html('');
			}else{
				$(obj).attr('checked','checked');
				$(obj).parent().parent().addClass('cur');
				$(obj).parent().next().children("input").val(ty);
				cp2y.buy.issues[$(obj).attr("data")]=ty;
				$(obj).parent().next().next().html(ty*2);
			}
		}
	},
	selfMuls:function(o){
		$("#selfMul2").val('');
		var i=0,IssuesLists=$("#IssuesLists").children(".cur"),len=IssuesLists.length,val=$(o).val();
		if(!val){val=1;$(o).val(1);}
		for(i;i<len;i++){
			this.selfMul(IssuesLists.eq(i),0,val);
		}
	},
	selfMul:function(obj,type,val){
		if(type==0){
			var o=obj.find(".selfMul");
			o.val(val);
			obj.children("span").eq(2).html(val*2);
			cp2y.buy.issues[o.attr("data")]=val;
		}else if(type==-1){
			var o=$(obj);
			if(o.val()>0){
				o.parent().prev().children("input").attr('checked','checked');
				cp2y.buy.issues[o.attr("data")]=o.val();
				o.parent().next().html(o.val()*2);
			}else if(o.val()==0){
				o.parent().prev().children("input").attr('checked',null);
				o.parent().parent().removeClass('cur');
				delete cp2y.buy.issues[o.attr("data")];
				o.parent().next().html('');
			}
		}
	},
	selfMuls2:function(o){
		$("#selfMul").val('');
		var i=0,IssuesLists=$("#IssuesLists").children(".cur"),len=IssuesLists.length,val=$(o).val(),o;
		if(!val){val=1;$(o).val(1);}
		for(i;i<len;i++){
			o=IssuesLists.eq(i).find(".selfMul");
			o.val((i+1)*val);
			cp2y.buy.issues[o.attr("data")]=(i+1)*val;
			IssuesLists.eq(i).children('span').eq(2).html((i+1)*val*2);
		}
	}
};

cp2y.buy={
	burstIntoStop:0,//快开用
	saleType:false,
	myquota:0,
	minBuy:0,
	baodi:0,
	erm:0,
	burstIntoStop:0,
	prizeStop:0,
	initBuy:function(code,playType){//AMD异步加载彩种,进入玩法
		location.hash="type=buy&code="+code+"&playType="+playType;
		cp2y.index();
		window.scrollTo(0,0);
	},
	init:function(play){
		if( play in _ ){
			$.extend(cp2y.buy,_[play]);
		}else{
			$.extend(cp2y.buy,_.a0);
		}
		this.creatMainPage();//修改标题，填充玩法选择区域
		ChangePlayType.children("b").click(function(){
			cp2y.buy.changePlayType($(this).attr("data"));
			$(this).siblings().removeClass("onn");
			$(this).addClass("onn");
			Title.html("<span>"+cp2y.buy.playName+"</span>-"+$(this).attr("data2"));
			playDom.QRTi.html("<span>"+cp2y.buy.playName+"</span>-投注");
			var	code=cp2y.util.getArgs('code');
			location.hash="type=buy&code="+code+"&playType="+$(this).attr("data");
			CurBets.html(0);
			CurMoney.html(0);
			cp2y.buy.setClear(1);
			playDom.More.click();
		});//预绑定 切换玩法事件。
		this.creatChooseArea();//构造投注区域
		this.step1();
		BetList.html('');
		//清空数据
		this.issues={};
		Bets.html(0);
		Money.html(0);
		BetLists.hide();
		this.countDown();
		cp2y.buy.setClear(1);
		//判断该玩法是否有需要投注
		var has=localStorage.getItem('HasBuy');
		if(has){
			if(localStorage.getItem('lotteryId')==_.bt){
				cp2y.buy.step2();
				cp2y.buy.hasBuy();
			}else{
				localStorage.removeItem('burstIntoStop');
				localStorage.removeItem('prizeStop');
				localStorage.removeItem('lotteryId');
				localStorage.removeItem('issues');
				localStorage.removeItem('getBets');
				localStorage.removeItem('HasBuy');
			}
		}
		
	},
	step1:function(){
		playDom.GoIndex.show();//返回大厅
		playDom.GoSelectArea.hide();//返回投注区
		playDom.GoMyBets.hide();//返回我的选项
		playDom.More.show();//选择玩法
		playDom.Edit.hide();//修改投注区域
		playDom.Zhuihao.hide();//追号类型
		playDom.MainStep1.show();
		playDom.MainStep2.hide();
		playDom.MainStep3.hide();
		playDom.ZhihaoTi.hide();
		playDom.QRTi.hide();
		playDom.header.removeClass('fixed');
		this.setClear(1);
	},
	step2:function(){
		playDom.GoIndex.hide();//返回大厅
		playDom.GoSelectArea.show();//返回投注区
		playDom.GoMyBets.hide();//返回我的选项
		playDom.More.hide();//选择玩法
		playDom.Edit.show();//修改投注区域
		playDom.Zhuihao.hide();//追号类型
		playDom.MainStep1.hide();
		playDom.MainStep2.show();
		playDom.MainStep3.hide();
		playDom.ZhihaoTi.hide();
		playDom.QRTi.show();
		playDom.header.removeClass('fixed');
	},
	step3:function(){
		playDom.GoIndex.hide();//返回大厅
		playDom.GoSelectArea.hide();//返回投注区
		playDom.GoMyBets.show();//返回我的选项
		playDom.More.hide();//选择玩法
		playDom.Edit.hide();//修改投注区域
		playDom.Zhuihao.show();//追号类型
		playDom.MainStep1.hide();
		playDom.MainStep2.hide();
		playDom.MainStep3.show();
		playDom.ZhihaoTi.show();
		playDom.header.addClass('fixed');
		//快开特殊参数
		if(BT.kk.indexOf(_.bt)!=-1){
			playDom.aPrize.addClass('kkBurst');
			if($("#BurstIntoStop2").size()==0){
			playDom.aPrize.prepend('<div id="BurstIntoStop2"><div class="mS1"><input type="checkbox" class="input8" id="burstIntoStop" checked /></div><div class="mS21">追号开始前，号码开出停止追号</div></div>');
			}
		}else{
			playDom.aPrize.removeClass('kkBurst');
			$("#BurstIntoStop2").remove();
		}
	},
	changePlayType:function(play){
		$.extend(cp2y.buy,_[play]);
		//console.log(cp2y.buy);
		this.creatChooseArea();//切换玩法重构投注区域
	},
	editScheme:function(){
		if(playDom.Edit.html()=="编辑"){
			playDom.Edit.html('完成');
			$(".delI").show();
		}else if(playDom.Edit.html()=="完成"){
			playDom.Edit.html('编辑');
			$(".delI").hide();
		}
	},
	creatMainPage:function(){
		Title.html("<span>"+this.playName+"</span>-"+this.playType);
		playDom.QRTi.html("<span>"+cp2y.buy.playName+"</span>-投注");
		$(".MoreLists").hide();
		ChangePlayType.html(_.playTypes).show();
		playDom.More.removeClass("on");
		MoreDetail.hide();
		$("#MoreNav a").removeClass('cur');
		$("#getTz").addClass("cur");
	},
	creatChooseArea:function(){
		Choose.html(this.bet);//构造 投注区域
		this.setClear();
	},
	getBall:function(){
		return Choose.find('a');
	},
	setClear:function(s){
		if(s==1){//默认状态：快速机选，金额，提交
			playDom.Clear.hide();
			playDom.Randoms.show();
			playDom.cancelRandoms.hide();
			playDom.RandomList.hide();
			playDom.Tools2.show();
			playDom.addContent.show();
		}else if(s==2){//打开机选：关闭机选，机选列表
			playDom.Clear.hide();
			playDom.Randoms.hide();
			playDom.cancelRandoms.show();
			playDom.RandomList.show();
			playDom.Tools2.hide();
			playDom.addContent.hide();
		}else if(s==3){//有号码的状态：清除号码，金额，提交
			playDom.Clear.show();
			playDom.Randoms.hide();
			playDom.cancelRandoms.hide();
			playDom.RandomList.hide();
			playDom.Tools2.show();
			playDom.addContent.show();
		}
	},
	clear:function(){
		var o=this.getBall(),i=0,len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				o.eq(i).removeClass("rb");
			}else if(o.eq(i).hasClass("bb")){
				o.eq(i).removeClass("bb");
			}else if(o.eq(i).hasClass("yb")){
				o.eq(i).removeClass("yb");
			}else if(o.eq(i).hasClass("rb2")){
				o.eq(i).removeClass("rb2");
			}else if(o.eq(i).hasClass("rb1")){
				o.eq(i).removeClass("rb1");
			}else if(o.eq(i).hasClass("rb2")){
				o.eq(i).removeClass("rb2");
			}else if(o.eq(i).hasClass("rb3")){
				o.eq(i).removeClass("rb3");
			}else if(o.eq(i).hasClass("rb4")){
				o.eq(i).removeClass("rb4");
			}else if(o.eq(i).hasClass("rb5")){
				o.eq(i).removeClass("rb5");
			}else if(o.eq(i).hasClass("bb2")){
				o.eq(i).removeClass("bb2");
			}
		}
		this.count();
	},
	issues:{},
	getTotalMoney:function(){
		var key,counter = 0,muls=[],money=0,bets=Bets.html();
		for(key in cp2y.buy.issues){
			counter++;
			muls.push(cp2y.buy.issues[key]);
		}
		if(!counter){
			counter=1;
			muls.push(Muls.val());
		}
		var i=0,len=muls.length;
		if((muls.join(',')+',').replace(new RegExp(muls[0]+',','gi'),'')==''){
			Muls2.html(muls[0]);
			money=bets*counter*muls[0]*2;
		}else{
			Muls2.html("不同");
			for(i;i<len;i++){
				money=money+bets*muls[i]*2;
			}
		}
		return [counter,money];
	},
	getBets:function(){
		var a=[],betlist=BetList.find("li"),i=0,len=betlist.length;
		for(i;i<len;i++){
			var o={};
			o.name=this.playName;
			o.playType=this.playType;
			o.bets=betlist.eq(i).attr("data_bets");
			o.input=betlist.eq(i).attr("data_input");
			o.code=betlist.eq(i).attr("data_code");
			a.push(o);
		}
		return a;
	},
	addRecord:function(o){
		if(_.bt==10026){
			if($("#DLTOnly").length==0){
				$("#totalMsgTop").before('<div id="DLTOnly"><input onclick="cp2y.buy.showMoney()" id="additional" type="checkbox"><label for="additional">追加投注</label></div>');
			}
		}else{
			$("#DLTOnly").remove();
		}
		BetList.prepend(o);
		BetLists.show();
		this.step2();
		this.showMoney();
	},
	showMoney:function(){
		var i=0,getBets=this.getBets(),len=getBets.length,x=0;
		for(i;i<len;i++){
			x+=Number(getBets[i].bets);
		}
		Bets.html(x);
		var tf=true;
		for(xx in cp2y.buy.issues){tf=false;}
		if(tf){
			Money.html(x*Muls.val()*Issues.val()*2);
			if(_.bt==10026){
				if($("#additional").attr("checked")){
					Money.html(x*Muls.val()*Issues.val()*2*15/10);
				}
			}else{
				Money.html(x*Muls.val()*Issues.val()*2);
			}
		}else{
			var key,money=0;
			for(key in cp2y.buy.issues){
				money+=x*cp2y.buy.issues[key]*2;
			}
			Money.html(money);
			if(_.bt==10026){
				if($("#additional").attr("checked")){
					money=Number(money)*15/10;
					Money.html(money);
				}
			}
		}
	},
	del:function(o){
		$(o).parent().remove();
		this.showMoney();
	},
	delAll:function(){
		Bets.html(0);
		Money.html(0);
		BetList.html('');
	},
	//快开倒计时
	sellEndTime:"",
	serverTime:"",
	currentIssue:"",
	currentIssueId:"",//当前奖期
	issueStatus:"",
	reCountDown:function(){//从后台切出时重计算
		if(autoRunMark){
			clearTimeout(autoRunMark);
			this.countDown();
		}
	},
	countDown:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/query_cur_issue",
			dataType:'text',
			//anysc:false,
			beforeSend:function(){},
			data:{lotteryId:_.bt,random:new Date().getTime()},
			success : function(result) {
				if (result == "" || result.indexOf('ERROR') != -1){return false;}
				var o = eval("("+result+")");
				if(o.flag!=1){return false;}
				cp2y.buy.serverTime = parseInt(o.time);
				cp2y.buy.currentIssue = o.issue;
				cp2y.buy.currentIssueId = o.issueId;
				//cp2y.buy.issueStatus = o.flag;
				cp2y.buy.sellEndTime = o.sellEndTime;
				if(BT.kk.indexOf(_.bt)!=-1){
					curIssue.html(cp2y.util.setIssue1(o.issue));
				}else{
					curIssue.html(cp2y.util.setIssue2(o.issue));	
				}
				if(cp2y.buy.serverTime>1001){
					cp2y.buy.autoRun();
				}else{
					setTimeout('cp2y.buy.countDown()',5000);
				}
            }
		});
	},
	autoRun:function(){
		cp2y.buy.serverTime -= 1000;
		if (cp2y.buy.serverTime <= 0){
			cp2y.buy.countDown();
		}else{
			var day = Math.floor(cp2y.buy.serverTime / (24 * 60 * 60 * 1000)),tmp,hour,munites,second,html='';
			tmp = cp2y.buy.serverTime - (day * 24 * 60 * 60 * 1000);
			hour = Math.floor(tmp / (60 * 60 * 1000));
			tmp = cp2y.buy.serverTime - (day * 24 * 60 * 60 * 1000) - (hour * 60 * 60 * 1000);
			munites = Math.floor(tmp / (60 * 1000));
			tmp = cp2y.buy.serverTime - (day * 24 * 60 * 60 * 1000) - (hour * 60 * 60 * 1000) - (munites * 60 * 1000);
			second = Math.floor(tmp / 1000);
			if(day){
				html+=day+"天";
			}
			if(hour){
				html+=hour+"小时";
			}
			munites=munites<10?'0'+munites:munites;
			second=second<10?'0'+second:second;
			html+=munites+':'+second;
			curCountDown.html(html);
			try{clearTimeout(autoRunMark);}catch(e){}
			autoRunMark=setTimeout('cp2y.buy.autoRun()', 1000);
		}
	},
	_autoRun:function(){},
	//合买相关参数
	saleType:0,//默认关闭
	myquota:"",//认购金额
	minBuy:"",//最低购买金额
	baodi:"",//保底金额
	schemesDetail:function(){
		//方案详情展示
	},
	pay:function(){//购买
		return cp2y.dialog.confirm("确认付款?",function(){
			cp2y.buy.submit();
		});
	},
	submit:function(){
		cp2y.dialog.closeConfirm();
		this.saleType=0;
		var getBets=this.getBets(),issueIds=[],i=0,len=getBets.length,issueCount=0,multiple=[],burstIntoStop=this.burstIntoStop,prizeStop=this.prizeStop,schemeNumber={},schemeNumbers='',money=Money.html();
		for(i in cp2y.buy.issues){
			issueCount++;
			issueIds.push(i);
			multiple.push(cp2y.buy.issues[i]);
		}
		if(money>100000000){
			return cp2y.dialog.alert('金额过大');
		}
		if(issueCount==0){
			issueCount=1;
			multiple.push(1);
			issueIds.push(this.currentIssueId);
		}//关于奖期
		i=0;
		for(i;i<len;i++){
			if(schemeNumber[getBets[i].input]==undefined){
				schemeNumber[getBets[i].input]=[];
			}
			schemeNumber[getBets[i].input].push(getBets[i].code);
		}
		i=0;
		for(i in schemeNumber){
			schemeNumbers+=i+"="+schemeNumber[i].join("|")+";";
		}//号码拼接
		var data={
			lotteryId:_.bt,//彩票ID
			schemeAmount:money,//方案金额
			buyAmount:money,//购买金额
			buyType:1//方案购买类型
		};
		data.issueId=issueIds[0];//奖期
		data.issueIds=issueIds.join(",");//追号奖期ID
		data.issueCount=issueCount;//购买奖期数
		data.multiple=multiple[0];//倍数
		data.multiples=multiple.join(',');//倍数
		data.schemeNumber=schemeNumbers.substr(0,schemeNumbers.length-1);//方案号码
		data.burstIntoStop=burstIntoStop;//开出停止追号,0/1
		data.prizeStop=prizeStop;//中奖停止追号,0：不限；其他：指
		if(BT.kk.indexOf(_.bt)!=-1){
			data.burstIntoStop=cp2y.buy.burstIntoStop;
		}
		if(_.bt==10026){
			var additional=$("#additional").attr("checked")?1:0;
			data.additional=additional;
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/lottery/buy_lottery",
			data:data,
			type:"post",
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data2){
				cp2y.dialog.clearLoading();
				if(typeof data2=="string"){
					data2=eval("("+data2+")");
				};
				localStorage.setItem('burstIntoStop',data.burstIntoStop);
				localStorage.setItem('prizeStop',data.prizeStop);
				localStorage.setItem('lotteryId',data.lotteryId);
				localStorage.setItem('issues',JSON.stringify(cp2y.buy.issues));
				localStorage.setItem('getBets',JSON.stringify(getBets));
				localStorage.setItem('HasBuy',1);
				if(data2.flag==-1){
					cp2y.user.signInBox();
					cp2y.index();
				}else if(data2.flag==2){
					return cp2y.dialog.confirm("余额不足，去充值？",function(){
						cp2y.user.rechargeBox();
						cp2y.index();
						cp2y.dialog.closeConfirm();
					});
				}else if(data2.flag==1){
					//cp2y.buy.initBuy(_.bt,'a0');
					localStorage.removeItem('burstIntoStop');
					localStorage.removeItem('prizeStop');
					localStorage.removeItem('lotteryId');
					localStorage.removeItem('issues');
					localStorage.removeItem('getBets');
					localStorage.removeItem('HasBuy');
					cp2y.dialog.alert(data2.message);
					//cp2y.user.home();
					cp2y.user.scheme(data2.schemeId);
					Bets.html(0);
					Money.html(0);
					Issues2.html(1);
					Issues.val(1);
					Muls.val(1);
					Muls2.html(1);
					$("#pStop").val('');
					cp2y.index();
				}else{
					cp2y.dialog.alert(data2.message);
				}
			}
		});
	},
	hasBuy:function(){//购买中断回来
		cp2y.buy.burstIntoStop=localStorage.getItem('burstIntoStop');
		cp2y.buy.prizeStop=localStorage.getItem('prizeStop');
		localStorage.getItem('lotteryId');
		var getBets=eval("("+localStorage.getItem('getBets')+")"),i=0,len=getBets.length,html=[];
		cp2y.buy.issues=eval("("+localStorage.getItem('issues')+")");
		for(i;i<len;i++){
			html.push('<li data_input="'+getBets[i].input+'" data_bets="'+getBets[i].bets+'" data_code="'+getBets[i].code+'">');
			html.push('<div>'+getBets[i].code+'</div>');
			html.push('<p>'+getBets[i].playType+'：'+getBets[i].bets+'注'+(getBets[i].bets*2)+'元</p>');
			html.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		BetList.html(html.join(''));
		this.showMoney();
		localStorage.removeItem('burstIntoStop');
		localStorage.removeItem('prizeStop');
		localStorage.removeItem('lotteryId');
		localStorage.removeItem('issues');
		localStorage.removeItem('getBets');
		localStorage.removeItem('HasBuy');
	},
	buy:function(){//合买
		getBets=this.getBets();
		this.saleType=1;
		buyBox.show();
		console.log(getBets);
		console.log(cp2y.buy.issues);
	},
	openMore:function(){
		if(playDom.More.hasClass('on')){
			playDom.More.removeClass('on');
			MoreDetail.hide();
			MoreLocked.hide();
		}else{
			playDom.More.addClass('on');
			MoreDetail.show();
			MoreLocked.show();
		}
	}
};